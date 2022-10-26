import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { QuestionBanksFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuestionBanks } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { useAuthorizeContext } from "master";

export const QuestionBanksList = () => {
  const { hasPermission } = useAuthorizeContext();
  const hasCreatePermission = hasPermission("QuestionBanks", "Create");
  const hasEditPermission = hasPermission("QuestionBanks", "Edit");
  const hasDeletePermission = hasPermission("QuestionBanks", "Delete");

  const history = useNavigate();
  const location = useLocation();

  const {
    questionBank,
    questionBanksQuery,
    onDelete,
    onToggleModal,
    isConfirmDelete,
    deleteQuestionBank,
  } = useQuestionBanks({ load: true });
  const { data, isLoading } = questionBanksQuery;

  const onConfirm = () => {
    deleteQuestionBank.mutate(questionBank.questionBankId);
  };

  const onEdit = (questionBankId) => {
    history(`${location.pathname}/edit/${questionBankId}`);
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        {
          hasEditPermission && <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
            <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
          </Button>
        }
        {
          hasDeletePermission && <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
            <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
          </Button>
        }
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      }
    ],
    []
  );

  if (hasCreatePermission || hasDeletePermission) {
    columns.push({
      Header: "Actions",
      accessor: "questionBankId",
      id: "actions",
      Cell: ActionButtons,
    })
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Question Bank"}
      subtitle={"List"}
      breadcrumb={[{ label: "Question Bank" }]}
    >
      {
        hasCreatePermission && <QuestionBanksFilter />
      }
      <TableLayout columns={columns} data={data} />
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
