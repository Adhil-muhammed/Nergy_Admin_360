import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { Button } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";
import { useImmer } from "use-immer";

export const QuestionsList = (props) => {
  const { data, isConfirmDelete, onToggleModal, onDelete, onDeleteQuestion } = props;
  const history = useNavigate();
  const location = useLocation();

  const gotoCreate = () => {
    history(`${location.pathname}/create`);
  };

  const onConfirm = () => {
    onDeleteQuestion.mutate("");
  };

  const onEdit = (questionBankId) => {
    // history(`${location.pathname}/edit/${questionBankId}`);
  };

  const EditCell = ({ value }) => {
    return (
      <Button outline color="primary" onClick={() => onEdit(value)}>
        Edit
      </Button>
    );
  };

  const DeleteCell = ({ row }) => {
    return (
      <Button color="danger" onClick={() => onDelete(row)}>
        Delete
      </Button>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Difficulty Level",
        accessor: "difficultyLevel",
      },
      {
        Header: "Question Bank",
        accessor: (row) => row.questionBank.name,
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
    data: data,
  });
  return (
    <>
      <ContentLayout title="Questions" subtitle="List">
        <div className="mb-4">
          <Button color="primary" size="sm" onClick={gotoCreate}>
            Create New
          </Button>
        </div>
        <TableLayout table={table} />
        <ModalLayout
          isOpen={isConfirmDelete}
          title="Confirm"
          message={`Are you sure?`}
          onConfirm={() => {
            onConfirm();
          }}
          onCancel={() => onToggleModal(false)}
        />
      </ContentLayout>
    </>
  );
};
