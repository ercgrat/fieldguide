import { Box, Button, Group, Image, Paper, Stepper } from '@mantine/core';
import T from 'components/Base/T';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

enum Step {
  One = 1,
  Two = 2
}

const Home: NextPage = () => {
  const intl = useIntl();
  const [active] = useState(Step.One);
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
              <Button mt={8}>
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
    </Box>
  );
};

export default React.memo(Home);
