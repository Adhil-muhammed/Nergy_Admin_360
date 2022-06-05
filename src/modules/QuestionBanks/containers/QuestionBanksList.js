import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { QuestionBanksFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const QuestionBanksList = (props) => {
  const {
    questionBank,
    questionBanks,
    onDelete,
    onToggleModal,
    isConfirmDelete,
    deleteQuestionBank,
  } = props;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteQuestionBank.mutate(questionBank.questionBankId);
  };

  const onEdit = (questionBankId) => {
    history(`${location.pathname}/edit/${questionBankId}`);
  };

  const EditCell = ({ value }) => {
    return (
      <Button className="btn btn-primary me-1 mb-1" onClick={() => onEdit(value)}>
        Edit
      </Button>
    );
  };

  const DeleteCell = ({ value }) => {
    return (
      <Button className="btn btn-primary me-1 mb-1" onClick={() => onDelete(value)}>
        Delete
      </Button>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Edit",
        accessor: "questionBankId",
        id: "editQuestionBank",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteInstitute",
        accessor: "questionBankId",
        key: "deleteQuestionBank",
        Cell: DeleteCell,
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data: questionBanks,
  });

  return (
    <ContentLayout title={"Question Banks"}>
      <QuestionBanksFilter />
      <TableLayout table={table} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${questionBank.name}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
