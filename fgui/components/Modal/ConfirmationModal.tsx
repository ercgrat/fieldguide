import { Button, Modal } from 'fgui';
import { FormattedMessage } from 'react-intl';

type Props = {
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText?: string;
  isDestructive?: boolean;
  isConfirmLoading?: boolean;
};
const ConfirmationModal: React.FC<Props> = ({
  children,
  confirmText,
  cancelText,
  isDestructive,
  isConfirmLoading,
  onCancel,
  onConfirm
}) => {
  return (
    <Modal isOpen onClose={onCancel} size="sm">
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel}>
          {cancelText ?? (
            <FormattedMessage
              defaultMessage="Cancel"
              description="Generic cancel option in a confirmation modal for any workflow where the user does not want to perform the prompt action"
              id="1sRbOT"
            />
          )}
        </Button>
        <Button
          loading={isConfirmLoading}
          onClick={onConfirm}
          variant={isDestructive ? 'danger' : 'primary'}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
