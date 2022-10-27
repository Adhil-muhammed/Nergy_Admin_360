import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { Button } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { useAssessment } from "../hooks";
import { useAuthorizeContext } from "master";

export const AssessmentList = () => {
  const { hasPermission } = useAuthorizeContext();
  const hasCreatePermission = hasPermission("Assessments", "Create");
  const hasEditPermission = hasPermission("Assessments", "Edit");
  const hasDeletePermission = hasPermission("Assessments", "Delete");

  const {
    assessmentQuery,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    assessment,
    onDeleteAssessment,
  } = useAssessment({
    load: true,
  });

  const { data, isLoading } = assessmentQuery;
  const history = useNavigate();
  const location = useLocation();

  const gotoCreate = () => {
    history(`${location.pathname}/create/new`);
  };

  const onConfirm = () => {
    onDeleteAssessment.mutate(assessment.assessmentId);
  };

  const onEdit = (id) => {
    history(`${location.pathname}/edit/${id}`);
  };

  const ActionButtons = ({ row }) => {
    return (
      <>
        {
          hasEditPermission && <Button outline color="primary" size="sm" onClick={() => onEdit(row.original.assessmentId)}>
            <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
          </Button>
        }
        {
          hasDeletePermission && <Button color="danger" size="sm" onClick={() => onDelete(row)} className="ms-3">
            <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
          </Button>
        }
      </>
    );
  };

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Mock",
      accessor: (row) => {
        return row.isMock ? "Yes" : "No";
      },
    },
    {
      Header: "Max Attempt",
      accessor: "maxAttempt",
    },
    {
      Header: "Max Time",
      accessor: "maxTime",
    },
    {
      Header: "Total Questions",
      accessor: "noOfQuestions",
    },
    {
      Header: "Pass Mark",
      accessor: "passMark",
    },
  ];

  if (hasEditPermission || hasDeletePermission) {
    columns.push({
      Header: "Actions",
      id: "actions",
      accessor: "assessmentId",
      Cell: ActionButtons,
    })
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ContentLayout title="Assessments" subtitle="List" breadcrumb={[{ label: "Assessments" }]}>
        {
          hasCreatePermission && <div className="mb-4">
            <Button color="primary" size="sm" onClick={gotoCreate}>
              Create New
            </Button>
          </div>
        }
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
