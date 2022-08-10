import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export const StudentTemplateModal = ({ size, isOpen, title, onCancel, children }) => {
  return (
    <Modal isOpen={isOpen} toggle={onCancel} size={size}>
      <ModalHeader toggle={onCancel}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};
