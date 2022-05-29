import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export const ModalLayout = (props) => {
  const { isOpen, title, message, onConfirm, onCancel } = props;
  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onConfirm}>
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
