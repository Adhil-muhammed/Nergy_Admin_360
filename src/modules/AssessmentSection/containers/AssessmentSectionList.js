import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { useAssessmentSection } from "../hooks";
import { useAuthorizeContext } from "master";


const AssessmentSectionList = () => {
  const { hasPermission } = useAuthorizeContext();
  const hasCreatePermission = hasPermission("AssessmentSections", "Create");
  const hasEditPermission = hasPermission("AssessmentSections", "Edit");
  const hasDeletePermission = hasPermission("AssessmentSections", "Delete");
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
        {
          hasEditPermission &&
          <Button outline color="primary" size="sm" onClick={() => onEdit(row.original.sectionId)}>
            <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
          </Button>
        }
        {
          hasDeletePermission &&
          <Button
            color="danger"
            size="sm"
            onClick={() => onDelete(row.original.sectionId)}
            className="ms-3"
          >
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

  ];

  if (hasEditPermission && hasDeletePermission) {
    columns.push({
      Header: "Actions",
      id: "actions",
      accessor: "sectionId",
      Cell: ActionButtons,
    })
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ContentLayout
        title="Assessment Section"
        subtitle="List"
        isLoading={isLoading}
        breadcrumb={[{ label: "Assessment Section" }]}
      >
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

export default AssessmentSectionList;
