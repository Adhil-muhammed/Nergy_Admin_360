import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export const SlotModal = ({ size, isOpen, title, onSave, onCancel, children }) => {
  return (
    <Modal isOpen={isOpen} toggle={onCancel} size={size}>
      <ModalHeader toggle={onCancel}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="success" onClick={onSave}>
          Save &amp; close
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
