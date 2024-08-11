import { Modal } from 'antd';

import AddTimerForm, { AddTimerFormProps } from './Add-timer-form';

export interface ModalProps {
  open: boolean;
  onCancel: () => void;
  footer: null;
}

export interface AddTimerFormModalProps extends ModalProps {
  onSubmit: AddTimerFormProps['onSubmit'];
}

export default function AddTimerFormModal({ onSubmit, ...rest }: AddTimerFormModalProps) {
  return (
    <Modal
      title={<p className="text-center text-xl ">Add new timer</p>}
      {...rest}
    >
      <AddTimerForm onSubmit={onSubmit} />
    </Modal>
  );
}
