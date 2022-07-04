import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export const ModalLayout = (props) => {
  const { isOpen, title, message, onConfirm, onCancel, centered = false, size = "md" } = props;
  return (
    <Modal isOpen={isOpen} toggle={onCancel} centered={centered} size={size}>
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
