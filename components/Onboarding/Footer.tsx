import { Button, HStack } from 'fgui';
import { OnboardingStep } from 'pages/onboarding';
import React from 'react';
import { FormattedMessage } from 'react-intl';

type Props = {
  active: OnboardingStep;
  isLoading: boolean;
  goToStepOne: () => void;
  goToStepTwo: () => void;
  onSubmitForm: () => void;
};
const Footer: React.FC<Props> = ({ active, isLoading, goToStepOne, goToStepTwo, onSubmitForm }) => {
  return (
    <HStack justifyContent="flex-end">
      {active === OnboardingStep.One ? (
        <Button onClick={goToStepTwo} variant="primary">
          <FormattedMessage
            defaultMessage="Next step"
            description="Caption for button for going to the next onboarding step"
            id="oDTEsb"
          />
        </Button>
      ) : active === OnboardingStep.Two ? (
        <>
          <Button onClick={goToStepOne}>
            <FormattedMessage
              defaultMessage="Back"
              description="Label of button that brings you back one step in the onboarding process"
              id="HiPcVN"
            />
          </Button>
          <Button loading={isLoading} onClick={onSubmitForm} variant="primary">
            <FormattedMessage
              defaultMessage="Create farm"
              description="Label of button that creates a new farm in the onboarding process"
              id="uJeC/9"
            />
          </Button>
        </>
      ) : null}
    </HStack>
  );
};

export default React.memo(Footer);
