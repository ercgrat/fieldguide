import { Button, createStyles, Group } from '@mantine/core';
import { OnboardingStep } from 'pages/onboarding';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const useStyles = createStyles(theme => ({
  actionFooter: {
    position: 'sticky',
    left: 0,
    bottom: 0,
    width: '100%',
    boxShadow: `0px 0px 3px ${theme.colors.davysGrey[1]}`,
    backgroundColor: 'white'
  }
}));

type Props = {
  active: OnboardingStep;
  isLoading: boolean;
  goToStepOne: () => void;
  goToStepTwo: () => void;
  onSubmitForm: () => void;
};
const OnboardingFooter: React.FC<Props> = ({
  active,
  isLoading,
  goToStepOne,
  goToStepTwo,
  onSubmitForm
}) => {
  const { classes } = useStyles();
  return (
    <Group className={classes.actionFooter} p={8} position="right">
      {active === OnboardingStep.One ? (
        <Button onClick={goToStepTwo}>
          <FormattedMessage
            defaultMessage="Next step"
            description="Caption for button for going to the next onboarding step"
          />
        </Button>
      ) : active === OnboardingStep.Two ? (
        <>
          <Button color="davysGrey" onClick={goToStepOne} variant="light">
            <FormattedMessage
              defaultMessage="Back"
              description="Label of button that brings you back one step in the onboarding process"
            />
          </Button>
          <Button loading={isLoading} onClick={onSubmitForm}>
            <FormattedMessage
              defaultMessage="Create farm"
              description="Label of button that creates a new farm in the onboarding process"
            />
          </Button>
        </>
      ) : null}
    </Group>
  );
};

export default React.memo(OnboardingFooter);
