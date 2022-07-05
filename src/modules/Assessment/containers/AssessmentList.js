import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { Button } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";

const AssessmentList = (props) => {
  const { data, isConfirmDelete, onToggleModal, onDelete, assessment, onDeleteAssessment } = props;
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
        <Button outline color="primary" size="sm" onClick={() => onEdit(row.original.assessmentId)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button>
        <Button color="danger" size="sm" onClick={() => onDelete(row)} className="ms-3">
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
      </>
    );
  };

  const columns = useMemo(
    () => [
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
      {
        Header: "Actions",
        id: "actions",
        accessor: "assessmentId",
        Cell: ActionButtons,
      },
    ],
    []
  );

  return (
    <>
      <ContentLayout title="Assessments" subtitle="List">
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
export default AssessmentList;