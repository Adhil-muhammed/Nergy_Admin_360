import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { Button } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";

const AssessmentSectionList = ({
  data,
  onDeleteAssessmentSection,
  isConfirmDelete,
  assessment,
  onToggleModal,
  onDelete,
}) => {
  const history = useNavigate();
  const location = useLocation();

  const gotoCreate = () => {
    history(`${location.pathname}/create/new`);
  };

  const onConfirm = () => {
    onDeleteAssessmentSection.mutate(assessment.id);
  };

  const onEdit = (sectionId) => {
    history(`${location.pathname}/edit/${sectionId}`);
  };

  const EditCell = ({ row }) => {
    return (
      <Button outline color="primary" onClick={() => onEdit(row.original.sectionId)}>
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

  return (
    <>
      <ContentLayout title="Questions" subtitle="List">
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
