import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { Button } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { useImmer } from "use-immer";
import { useQuestion } from "../hooks";
export const QuestionsList = (props) => {
  const { questionsQuery, isConfirmDelete, onToggleModal, onDelete, onDeleteQuestion, question } =
    useQuestion({ load: true });
  const history = useNavigate();
  const location = useLocation();

  const { data, isLoading } = questionsQuery;

  const gotoCreate = () => {
    history(`${location.pathname}/create/new`);
  };

  const onConfirm = () => {
    onDeleteQuestion.mutate(question.questionId);
  };

  const onEdit = (questionBankId) => {
    history(`${location.pathname}/edit/${questionBankId}`);
  };

  const ActionButtons = ({ row }) => {
    return (
      <>
        <Button outline color="primary" size="sm" onClick={() => onEdit(row.original.questionId)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button>
        <Button color="danger" size="sm" onClick={() => onDelete(row)} className="ms-3">
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
      </>
    );
  };

  const columns = [
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
      Header: "Actions",
      id: "actions",
      accessor: "questionId",
      Cell: ActionButtons,
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ContentLayout title="Questions" subtitle="List" breadcrumb={[{ label: "Questions" }]}>
        <div className="mb-4">
          <Button color="primary" size="sm" onClick={gotoCreate}>
            Create New
          </Button>
        </div>
        <TableLayout columns={columns} data={data} />
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
