import {
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Image,
  Paper,
  Radio,
  Stack,
  Stepper,
  TextInput
} from '@mantine/core';
import { UnitSystem } from '@prisma/client';
import T from 'components/Base/T';
import { NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

enum Step {
  One = 1,
  Two = 2,
  Three = 3
}

const useStyles = createStyles(() => ({
  stepTwoForm: {
    width: '500px',
    maxWidth: '100vh'
  }
}));

const Home: NextPage = () => {
  const intl = useIntl();
  const { classes } = useStyles();
  const [active, setActive] = useState(Step.One);

  const goToStepOne = useCallback(() => {
    setActive(Step.One);
  }, []);
  const goToStepTwo = useCallback(() => {
    setActive(Step.Two);
  }, []);
  const handleSubmitOrganization = useCallback(() => {
    setActive(Step.Three);
  }, []);

  return (
    <Box m={20}>
      <Stepper active={active} mb={20}>
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
      {active === Step.One ? (
        <>
          <T.Title mb={12}>
            <FormattedMessage
              defaultMessage="Are you a farm owner or a farm employee?"
              description="Title of the first onboarding question"
            />
          </T.Title>
          <Group align="start" grow position="apart">
            <Paper p={16} shadow="sm">
              <T.Subtitle>
                <FormattedMessage
                  defaultMessage="Owner"
                  description="Title of onboarding section for farm owners"
                />
              </T.Subtitle>
              <T.Body>
                <FormattedMessage
                  defaultMessage="Select this option if you are the owner of a farm business or have never used FieldGuide before."
                  description="Instructions for the 'Create your own farm' option when onboarding a new organization."
                />
              </T.Body>
              <Image height={360} my={6} radius="md" src="owner.jpg" />
              <Button mt={8} onClick={goToStepTwo}>
                <FormattedMessage
                  defaultMessage="Create your own farm"
                  description="Button caption to start the creation of a new farm organization when onboarding."
                />
              </Button>
            </Paper>
            <Paper p={16} shadow="sm">
              <T.Subtitle>
                <FormattedMessage
                  defaultMessage="Worker"
                  description="Title of onboarding section for farm workers"
                />
              </T.Subtitle>
              <T.Body>
                <FormattedMessage
                  defaultMessage="Select this option if you are a farm employee and your manager already has a farm set up on FieldGuide."
                  description="Instructions for the 'Join an existing farm' option when onboarding a new organization."
                />
              </T.Body>
              <Image height={360} my={6} radius="md" src="workers.jpg" />
              <Button mt={8}>
                <FormattedMessage
                  defaultMessage="Find your farm"
                  description="Button caption find an existing farm organization when onboarding."
                />
              </Button>
            </Paper>
          </Group>
        </>
      ) : null}
      {active === Step.Two ? (
        <Center>
          <Stack>
            <T.Title>
              <FormattedMessage
                defaultMessage="Tell us about your farm"
                description="Message above a form allowing the user to enter details about a farm when creating one as part of onboarding"
              />
            </T.Title>
            <Paper className={classes.stepTwoForm} p={16} shadow="md">
              <Stack spacing="sm">
                <TextInput
                  label={intl.formatMessage({
                    defaultMessage: 'Name',
                    description: 'Label for a text input for the name of an organization'
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: "e.g. Francine's Fine Fruits",
                    description:
                      'Example name of a farm used as a placeholder in the input for a farm name'
                  })}
                />
                <Radio.Group
                  label={intl.formatMessage({
                    defaultMessage: 'System of units',
                    description:
                      'Label for radio button group selecting the unit system (imperial or metric) for the organization'
                  })}
                  value={UnitSystem.Imperial}
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
              <Group position="right">
                <Button color="davysGrey" onClick={goToStepOne} variant="light">
                  <FormattedMessage
                    defaultMessage="Back"
                    description="Label of button that brings you back one step in the onboarding process"
                  />
                </Button>
                <Button onClick={handleSubmitOrganization}>
                  <FormattedMessage
                    defaultMessage="Submit farm details"
                    description="Label of button that creates a new farm in the onboarding process"
                  />
                </Button>
              </Group>
            </Paper>
          </Stack>
        </Center>
      ) : null}
    </Box>
  );
};

export default React.memo(Home);
