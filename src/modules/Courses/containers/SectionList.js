import React, { useMemo } from "react";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useCourseSection } from "..";

export const SectionList = (props) => {
  const { sections, courseId } = props;

  const history = useNavigate();
  const { courseSection,
    onDelete,
    onToggleModal,
    deleteCourseSection,
    isConfirmDelete } = useCourseSection({ courseSectionId: 0, courseId })

  const onConfirm = () => {
    deleteCourseSection.mutate(courseSection.courseId);
  };

  const onEdit = (sectionId) => {
    history(`../section/edit?sectionId=${sectionId}&courseId=${courseId}`);
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button>
        <Button color="danger" size="sm" onClick={() => onDelete(value, false)} className="ms-3">
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        id: "actions",
        accessor: "sectionId",
        Cell: ActionButtons,
      },
    ],
    []
  );

  return (
    <ContentLayout title={"Courses Section"} >
      <TableLayout columns={columns} data={sections} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${courseSection.title}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
