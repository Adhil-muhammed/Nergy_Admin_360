import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { Button } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";
import { useAssessmentSection } from "../hooks";

const AssessmentSectionList = () => {
  const {
    assessmentSectionQuery,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteAssessmentSection,
    assessmentSection,
  } = useAssessmentSection({ load: true });

  const { data, isLoading } = assessmentSectionQuery;

  const history = useNavigate();
  const location = useLocation();

  const gotoCreate = () => {
    history(`${location.pathname}/create/new`);
  };

  const onConfirm = () => {
    onDeleteAssessmentSection.mutate(assessmentSection.data.sectionId);
  };

  const onEdit = (sectionId) => {
    history(`${location.pathname}/edit/${sectionId}`);
  };

  const ActionButtons = ({ row }) => {
    return (
      <>
        <Button outline color="primary" size="sm" onClick={() => onEdit(row.original.sectionId)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={() => onDelete(row.original.sectionId)}
          className="ms-3"
        >
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
      </>
    );
  };

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Actions",
      id: "actions",
      accessor: "sectionId",
      Cell: ActionButtons,
    },
  ];

  return (
    <>
      <ContentLayout title="Questions" subtitle="List" isLoading={isLoading}>
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

export default AssessmentSectionList;
