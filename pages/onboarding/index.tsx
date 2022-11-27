import { Role, UnitSystem } from '@prisma/client';
import RadioCard from 'components/Base/RadioCard';
import { useForm } from 'react-hook-form';
import {
  OrganizationNameCheckQueryKey,
  useCreateOrganizationMutation,
  useCurrentOrganizationsQuery,
  useOrganizationNameCheckQuery
} from 'fetch/organizations';
import { useCurrentUserQuery } from 'fetch/users';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Route } from 'utils/enums';
import { validateEmail, validatePhoneNumber } from 'utils/validation';
import { APIRequestBody } from 'types/backend';
import {
  Box,
  Card,
  Flex,
  FooterPortal,
  HStack,
  Icon,
  Image,
  Radio,
  RadioGroup,
  Spinner,
  T,
  TextInput,
  VStack
} from 'fgui';
import Footer from 'components/Onboarding/Footer';

export enum OnboardingStep {
  One = 1,
  Two = 2,
  Three = 3
}

const Home: NextPage = () => {
  const intl = useIntl();
  const [active, setActive] = useState(OnboardingStep.One);
  const { data: user } = useCurrentUserQuery();
  const {
    data: organizations,
    isSuccess: hasLoadedOrganizations,
    isLoading
  } = useCurrentOrganizationsQuery();
  const router = useRouter();
  const submitButtonRef = useRef(null);

  const [role, setRole] = useState<Role>(Role.Owner);
  const handleChangeRole = useCallback((value: Role) => {
    setRole(value);
  }, []);

  useEffect(() => {
    if (hasLoadedOrganizations && !!organizations?.length && router.pathname !== Route.Home) {
      router.push(Route.Home);
    }
  }, [hasLoadedOrganizations, organizations?.length, router]);

  const {
    reset,
    handleSubmit: handleSubmitWrapper,
    register,
    watch,
    setError
  } = useForm<APIRequestBody.CreateOrganization>({
    defaultValues: {
      name: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      postCode: '',
      email: '',
      phone: '',
      unitSystem: UnitSystem.Imperial
    }
  });

  const { mutate } = useCreateOrganizationMutation({
    onSuccess: () => setActive(OnboardingStep.Three)
  });

  const name = watch('name');
  const unitSystem = watch('unitSystem');
  const {
    data: orgMatches,
    isLoading: isCheckingNameMatches,
    debouncedQueryState
  } = useOrganizationNameCheckQuery(name);
  const isNameCheckStale =
    (debouncedQueryState.key[1] as OrganizationNameCheckQueryKey).name !== name;

  useEffect(() => {
    if (orgMatches?.length) {
      setError('name', {
        message: intl.formatMessage({
          defaultMessage: 'This name is already taken. Please choose a different name.',
          description:
            'Error message shown when the name entered for a new farm matches an existing farm.'
        })
      });
    }
  }, [orgMatches, intl, setError]);

  const goToStepOne = useCallback(() => {
    reset();
    setActive(OnboardingStep.One);
  }, [reset]);
  const goToStepTwo = useCallback(() => {
    setActive(OnboardingStep.Two);
  }, []);

  const handleSubmitOrganization = useCallback(
    (values: APIRequestBody.CreateOrganization) => {
      mutate({ ...values, userId: user?.id ?? '' });
    },
    [mutate, user?.id]
  );

  return (
    <Box m={6}>
      {active === OnboardingStep.One ? (
        <VStack alignItems="flex-start">
          <T.H2>
            <FormattedMessage
              defaultMessage="Are you a farm owner or a farm worker?"
              description="Title of the first onboarding question"
            />
          </T.H2>
          <RadioGroup onChange={handleChangeRole} pt={4} size="lg" value={role}>
            <Flex flexDirection={['column', 'column', 'row']} gap={2}>
              <RadioCard
                label={intl.formatMessage({
                  defaultMessage: 'Owner',
                  description: 'Title of onboarding section for farm owners'
                })}
                selectedValue={role}
                value={Role.Owner}
              >
                <T.Body2>
                  <FormattedMessage
                    defaultMessage="Select this option if you are the owner of a farm business or have never used FieldGuide before."
                    description="Instructions for the 'Create your own farm' option when onboarding a new organization."
                  />
                </T.Body2>
                <Image fit="cover" height={360} my={6} src="owner.jpg" />
              </RadioCard>
              <RadioCard
                label={intl.formatMessage({
                  defaultMessage: 'Worker',
                  description: 'Title of onboarding section for farm workers'
                })}
                selectedValue={role}
                value={Role.Member}
              >
                <T.Body2>
                  <FormattedMessage
                    defaultMessage="Select this option if you are a farm employee and your manager already has a farm set up on FieldGuide."
                    description="Instructions for the 'Join an existing farm' option when onboarding a new organization."
                  />
                </T.Body2>
                <Image fit="cover" height={360} my={6} src="workers.jpg" />
              </RadioCard>
            </Flex>
          </RadioGroup>
        </VStack>
      ) : null}
      {active === OnboardingStep.Two ? (
        <VStack alignItems="flex-start" w="100%">
          <T.H2>
            <FormattedMessage
              defaultMessage="Tell us about your farm"
              description="Message above a form allowing the user to enter details about a farm when creating one as part of onboarding"
            />
          </T.H2>
          <Box alignSelf="center">
            <form onSubmit={handleSubmitWrapper(handleSubmitOrganization)}>
              <Box as="button" display="none" ref={submitButtonRef} type="submit" />
              <Card p={6} shadow="md">
                <VStack alignItems="stretch">
                  <TextInput
                    autoFocus
                    label={intl.formatMessage({
                      defaultMessage: 'Farm Name',
                      description: 'Label for a text input for the name of an organization'
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: "Francine's Fine Fruits",
                      description:
                        'Example name of a farm used as a placeholder in the input for a farm name'
                    })}
                    required
                    {...register('name', {
                      validate: (v: string | undefined) =>
                        v
                          ? undefined
                          : intl.formatMessage({
                              defaultMessage: 'Name is required',
                              description:
                                'Validation message that appears when a user does not type in a company name'
                            })
                    })}
                    rightAddon={
                      isCheckingNameMatches ? (
                        <Spinner size="sm" />
                      ) : name?.length && !isNameCheckStale ? (
                        !orgMatches?.length ? (
                          <Icon.Check />
                        ) : (
                          <Icon.X />
                        )
                      ) : null
                    }
                  />
                  <TextInput
                    label={intl.formatMessage({
                      defaultMessage: 'Email',
                      description: 'Label for a text input for the email address of a farm'
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'your.farm@gmail.com',
                      description:
                        'Example email address of a farm used as a placeholder in the input for a farm email address'
                    })}
                    required
                    {...register('email', {
                      validate: (v: string) =>
                        validateEmail(v)
                          ? undefined
                          : intl.formatMessage({
                              defaultMessage: 'Enter a valid email address',
                              description:
                                'Validation message that appears when a user types in an invalid email address'
                            })
                    })}
                  />
                  <TextInput
                    label={intl.formatMessage({
                      defaultMessage: 'Phone Number',
                      description: 'Label for a text input for the phone number of a farm'
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: '(555) 555-5555',
                      description:
                        'Example phone number of a farm used as a placeholder in the input for a farm phone number'
                    })}
                    required
                    {...register('phone', {
                      validate: (v: string | null) =>
                        validatePhoneNumber(v)
                          ? undefined
                          : intl.formatMessage({
                              defaultMessage: 'Enter a valid phone number',
                              description:
                                'Validation message that appears when a user types in an invalid phone number'
                            })
                    })}
                  />
                  <TextInput
                    label={intl.formatMessage({
                      defaultMessage: 'Address 1',
                      description: 'Label for a text input for the first address line of a farm'
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: '10 Eggplant Blvd',
                      description:
                        'Example address line of a farm used as a placeholder in the input for a farm address 1'
                    })}
                    required
                    {...register('street1')}
                  />
                  <TextInput
                    label={intl.formatMessage({
                      defaultMessage: 'Address 2',
                      description: 'Label for a text input for the second address line of a farm'
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'APT 101',
                      description:
                        'Example address line of a farm used as a placeholder in the input for a farm address 2'
                    })}
                    {...register('street2')}
                  />
                  <HStack justifyContent="space-between">
                    <TextInput
                      label={intl.formatMessage({
                        defaultMessage: 'City',
                        description: 'Label for a text input for the state of a farm address'
                      })}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Farmville',
                        description:
                          'Example city of a farm used as a placeholder in the input for a farm address city'
                      })}
                      required
                      {...register('city')}
                    />
                    <TextInput
                      label={intl.formatMessage({
                        defaultMessage: 'State',
                        description: 'Label for a text input for the state of a farm address'
                      })}
                      maxLength={2}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'NY',
                        description:
                          'Example state of a farm used as a placeholder in the input for a farm address state'
                      })}
                      required
                      {...register('state')}
                    />
                    <TextInput
                      label={intl.formatMessage({
                        defaultMessage: 'Post Code',
                        description: 'Label for a text input for the post code of a farm address'
                      })}
                      placeholder={intl.formatMessage({
                        defaultMessage: '12345',
                        description:
                          'Example post code of a farm used as a placeholder in the input for a farm address post code'
                      })}
                      required
                      {...register('postCode')}
                    />
                  </HStack>
                  <VStack alignItems="flex-start">
                    <T.Label>
                      {intl.formatMessage({
                        defaultMessage: 'System of Units',
                        description:
                          'Label for radio button group selecting the unit system (imperial or metric) for the organization'
                      })}
                    </T.Label>
                    <RadioGroup size="md" value={unitSystem}>
                      <Radio value={UnitSystem.Imperial} {...register('unitSystem')}>
                        {intl.formatMessage({
                          defaultMessage: 'Imperial',
                          description: 'Radio button label for the imperial system of units'
                        })}
                      </Radio>
                      <Radio value={UnitSystem.Metric} {...register('unitSystem')}>
                        {intl.formatMessage({
                          defaultMessage: 'Metric',
                          description: 'Radio button label for the metric system of units'
                        })}
                      </Radio>
                    </RadioGroup>
                  </VStack>
                </VStack>
              </Card>
            </form>
          </Box>
        </VStack>
      ) : null}
      <FooterPortal>
        <Footer
          active={active}
          goToStepOne={goToStepOne}
          goToStepTwo={goToStepTwo}
          isLoading={isLoading}
          onSubmitForm={handleSubmitWrapper(handleSubmitOrganization)}
        />
      </FooterPortal>
    </Box>
  );
};

export default React.memo(Home);
