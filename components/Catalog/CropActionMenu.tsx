import { Crop } from '@prisma/client';
import { useDeleteCropMutation } from 'fetch/crops';
import { Icon, Menu, T, useDisclosure } from 'fgui';
import ConfirmationModal from 'fgui/components/Modal/ConfirmationModal';
import React, { useCallback, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import CropModal from './CropModal';

type Props = {
  crop: Crop;
  onChange: () => void;
};
const CropActionMenu: React.FC<Props> = ({ crop, onChange }) => {
  const intl = useIntl();
  const {
    isOpen: isEditCropModalOpen,
    onOpen: openEditCropModal,
    onClose: closeEditCropModal
  } = useDisclosure({
    defaultIsOpen: false
  });
  const {
    isOpen: isDeleteCropModalOpen,
    onOpen: openDeleteCropModal,
    onClose: closeDeleteCropModal
  } = useDisclosure({
    defaultIsOpen: false
  });

  const { mutate: deleteCrop, isLoading: isDeletingCrop } = useDeleteCropMutation({
    onSuccess: () => {
      closeDeleteCropModal();
      onChange();
    }
  });

  const handleDeleteCrop = useCallback(() => {
    deleteCrop({ id: crop.id });
  }, [crop.id, deleteCrop]);

  const firstItemRef = useRef(null);

  return (
    <>
      <Menu initialFocusRef={firstItemRef}>
        <Menu.Button>
          <Icon.MoreVertical />
        </Menu.Button>
        <Menu.List>
          <Menu.Item icon={<Icon.Edit />} onClick={openEditCropModal} ref={firstItemRef}>
            <T.BodyMd>
              <FormattedMessage
                defaultMessage="Edit Crop"
                description="Title of action that opens a modal to edit a crop"
                id="hDg+Vc"
              />
            </T.BodyMd>
          </Menu.Item>
          <Menu.Item icon={<Icon.Trash />} onClick={openDeleteCropModal}>
            <T.BodyMd>
              <FormattedMessage
                defaultMessage="Delete Crop"
                description="Title of action that permanently deletes a crop"
                id="YGiRpx"
              />
            </T.BodyMd>
          </Menu.Item>
        </Menu.List>
      </Menu>
      {isDeleteCropModalOpen && (
        <ConfirmationModal
          confirmText={intl.formatMessage({
            defaultMessage: 'Yes, delete crop',
            id: 'Ptn61H',
            description: 'Submit action on confirmation modal for user trying to delete a crop'
          })}
          isConfirmLoading={isDeletingCrop}
          isDestructive
          onCancel={closeDeleteCropModal}
          onConfirm={handleDeleteCrop}
        >
          <FormattedMessage
            defaultMessage="Are you sure you want to permanently delete this crop?"
            description="Warning message when user is trying to delete a crop"
            id="zV+i6n"
          />
        </ConfirmationModal>
      )}
      {isEditCropModalOpen && (
        <CropModal crop={crop} onChange={onChange} onClose={closeEditCropModal} />
      )}
    </>
  );
};

export default React.memo(CropActionMenu);
