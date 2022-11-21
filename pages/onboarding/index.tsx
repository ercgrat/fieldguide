import {
  Box,
  Center,
  createStyles,
  Group,
  Image,
  Loader,
  Paper,
  Radio,
  SimpleGrid,
  Stack,
  Stepper,
  TextInput,
  ThemeIcon
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Role, UnitSystem } from '@prisma/client';
import Icon from 'components/Base/Icon';
import RadioCard from 'components/Base/RadioCard';
import T from 'components/Base/T';
import OnboardingFooter from 'components/Onboarding/OnboardingFooter';
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
import { useFooterPortal } from 'utils/nav';
import { validateEmail, validatePhoneNumber } from 'utils/validation';

export enum OnboardingStep {
  One = 1,
  Two = 2,
  Three = 3
}

const useStyles = createStyles(() => ({
  stepOneGrid: {
    width: '100%'
  },
  stepTwoForm: {
    width: '450px',
    maxWidth: '100vw'
  },
  cityInput: {
    flexGrow: 1
  },
  stateInput: {
    width: '60px'
  },
  postCodeInput: {
    width: '100px'
  },
  invisible: {
    visibility: 'hidden'
  }
}));

const Home: NextPage = () => {
  const intl = useIntl();
  const { classes } = useStyles();
  const [active, setActive] = useState(OnboardingStep.One);
  const { data: user } = useCurrentUserQuery();
  const { data: organizations, isSuccess: hasLoadedOrganizations } = useCurrentOrganizationsQuery();
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [role, setRole] = useState<Role>(Role.Owner);
  const handleChangeRole = useCallback((value: Role) => {
    setRole(value);
  }, []);

  useEffect(() => {
    if (hasLoadedOrganizations && !!organizations?.length && router.pathname !== Route.Home) {
      router.push(Route.Home);
    }
  }, [hasLoadedOrganizations, organizations?.length, router]);

  const { getInputProps, reset, onSubmit, values, setFieldError } = useForm({
    initialValues: {
      name: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      postCode: '',
      email: '',
      phone: '',
      unitSystem: UnitSystem.Imperial
    },
    validate: {
      name: v =>
        v
          ? undefined
          : intl.formatMessage({
              defaultMessage: 'Name is required',
              description:
                'Validation message that appears when a user does not type in a company name'
            }),
      email: v =>
        validateEmail(v)
          ? undefined
          : intl.formatMessage({
              defaultMessage: 'Enter a valid email address',
              description:
                'Validation message that appears when a user types in an invalid email address'
            }),
      phone: v =>
        validatePhoneNumber(v)
          ? undefined
          : intl.formatMessage({
              defaultMessage: 'Enter a valid phone number',
              description:
                'Validation message that appears when a user types in an invalid phone number'
            })
    },
    validateInputOnChange: true
  });

  const { mutate, isLoading } = useCreateOrganizationMutation({
    onSuccess: () => setActive(OnboardingStep.Three)
  });

  const {
    data: orgMatches,
    isLoading: isCheckingNameMatches,
    debouncedQueryState
  } = useOrganizationNameCheckQuery(values.name);
  const isNameCheckStale =
    (debouncedQueryState.key[1] as OrganizationNameCheckQueryKey).name !== values.name;

  useEffect(() => {
    if (orgMatches?.length) {
      setFieldError(
        'name',
        intl.formatMessage({
          defaultMessage: 'This name is already taken. Please choose a different name.',
          description:
            'Error message shown when the name entered for a new farm matches an existing farm.'
        })
      );
    }
  }, [orgMatches, intl, setFieldError]);

  const goToStepOne = useCallback(() => {
    reset();
    setActive(OnboardingStep.One);
  }, [reset]);
  const goToStepTwo = useCallback(() => {
    setActive(OnboardingStep.Two);
  }, []);

  const handleSubmitOrganization = useCallback(() => {
    mutate({ ...values, userId: user?.id ?? '' });
  }, [mutate, user?.id, values]);

  const FooterPortal = useFooterPortal();

  return (
    <Box m={20}>
      <Stepper active={active} breakpoint="sm" mb={20}>
        <Stepper.Step
          description={intl.formatMessage({
            defaultMessage: 'Tell us about yourself',
            description: 'Caption of the first step of onboarding screen'
          })}
          label={intl.formatMessage({
            defaultMessage: 'First step',
            description: 'Label for the first step of the onboarding process'
          })}
        />
        <Stepper.Step
          description={intl.formatMessage({
            defaultMessage: 'Create your organization',
            description: 'Caption of the second step of onboarding screen'
          })}
          label={intl.formatMessage({
            defaultMessage: 'Second step',
            description: 'Label for the second step of the onboarding process'
          })}
        />
        <Stepper.Step
          description={intl.formatMessage({
            defaultMessage: 'Build your catalog',
            description: 'Caption of the third step of onboarding screen'
          })}
          label={intl.formatMessage({
            defaultMessage: 'Last step',
            description: 'Label for the third step of the onboarding process'
          })}
        />
      </Stepper>
      {active === OnboardingStep.One ? (
        <Box>
          <T.Title mb={12}>
            <FormattedMessage
              defaultMessage="Are you a farm owner or a farm worker?"
              description="Title of the first onboarding question"
            />
          </T.Title>
          <Radio.Group onChange={handleChangeRole} size="lg" value={role}>
            <SimpleGrid
              breakpoints={[
                {
                  maxWidth: 800,
                  cols: 1
                }
              ]}
              className={classes.stepOneGrid}
              cols={2}
            >
              <RadioCard
                label={intl.formatMessage({
                  defaultMessage: 'Owner',
                  description: 'Title of onboarding section for farm owners'
                })}
                selectedValue={role}
                value={Role.Owner}
              >
                <T.Body>
                  <FormattedMessage
                    defaultMessage="Select this option if you are the owner of a farm business or have never used FieldGuide before."
                    description="Instructions for the 'Create your own farm' option when onboarding a new organization."
                  />
                </T.Body>
                <Image height={360} my={6} radius="md" src="owner.jpg" />
              </RadioCard>
              <RadioCard
                label={intl.formatMessage({
                  defaultMessage: 'Worker',
                  description: 'Title of onboarding section for farm workers'
                })}
                selectedValue={role}
                value={Role.Member}
              >
                <T.Body>
                  <FormattedMessage
                    defaultMessage="Select this option if you are a farm employee and your manager already has a farm set up on FieldGuide."
                    description="Instructions for the 'Join an existing farm' option when onboarding a new organization."
                  />
                </T.Body>
                <Image height={360} my={6} radius="md" src="workers.jpg" />
              </RadioCard>
            </SimpleGrid>
          </Radio.Group>
        </Box>
      ) : null}
      {active === OnboardingStep.Two ? (
        <Center>
          <form onSubmit={onSubmit(handleSubmitOrganization)}>
            <button className={classes.invisible} ref={submitButtonRef} type="submit" />
            <Stack spacing="sm">
              <T.Title>
                <FormattedMessage
                  defaultMessage="Tell us about your farm"
                  description="Message above a form allowing the user to enter details about a farm when creating one as part of onboarding"
                />
              </T.Title>
              <Paper className={classes.stepTwoForm} p={16} shadow="md">
                <Stack spacing="sm">
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
                    {...getInputProps('name')}
                    rightSection={
                      isCheckingNameMatches ? (
                        <Loader size="sm" />
                      ) : values.name?.length && !isNameCheckStale ? (
                        !orgMatches?.length ? (
                          <ThemeIcon color="honeydew" variant="filled">
                            <Icon.Check />
                          </ThemeIcon>
                        ) : (
                          <ThemeIcon color="cinnabar" variant="light">
                            <Icon.X />
                          </ThemeIcon>
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
                    {...getInputProps('email')}
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
                    {...getInputProps('phone')}
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
                    {...getInputProps('street1')}
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
                    {...getInputProps('street2')}
                  />
                  <Group align="start" position="apart">
                    <TextInput
                      className={classes.cityInput}
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
                      {...getInputProps('city')}
                    />
                    <TextInput
                      className={classes.stateInput}
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
                      {...getInputProps('state')}
                    />
                    <TextInput
                      className={classes.postCodeInput}
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
                      {...getInputProps('postCode')}
                    />
                  </Group>
                  <Radio.Group
                    label={intl.formatMessage({
                      defaultMessage: 'System of Units',
                      description:
                        'Label for radio button group selecting the unit system (imperial or metric) for the organization'
                    })}
                    {...getInputProps('unitSystem')}
                  >
                    <Radio
                      label={intl.formatMessage({
                        defaultMessage: 'Imperial',
                        description: 'Radio button label for the imperial system of units'
                      })}
                      value={UnitSystem.Imperial}
                    />
                    <Radio
                      label={intl.formatMessage({
                        defaultMessage: 'Metric',
                        description: 'Radio button label for the metric system of units'
                      })}
                      value={UnitSystem.Metric}
                    />
                  </Radio.Group>
                </Stack>
              </Paper>
            </Stack>
          </form>
        </Center>
      ) : null}
      <FooterPortal>
        <OnboardingFooter
          active={active}
          goToStepOne={goToStepOne}
          goToStepTwo={goToStepTwo}
          isLoading={isLoading}
          onSubmitForm={() => submitButtonRef.current?.click()}
        />
      </FooterPortal>
    </Box>
  );
};

export default React.memo(Home);
