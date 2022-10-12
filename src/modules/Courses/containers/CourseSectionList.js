import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { CourseIdFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useCourseSection } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const CourseSectionList = (props) => {
  const { sections } = props;
  const { courseSection, onDelete, onDeletecoursesection, isConfirmDelete, onToggleModal } =
    useCourseSection({
      load: true,
      courseSectionId: 0,
      sections,
    });

  const history = useNavigate();
  const location = useLocation();

  const onConfirm = () => {
    onDeletecoursesection.mutate(courseSection.courseId);
  };

  const onEdit = (sectionId) => {
    history(`${location.pathname}/edit/${sectionId}`);
  };

  const CheckMarker = ({ value }) => {
    return (
      <span style={{ color: value ? "#3fba2d" : "#da1a1a", fontSize: "24px" }}>
        <i className={`bi ${value ? "bi-check" : "bi-x"}`}></i>
      </span>
    );
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
    <ContentLayout title={"Courses Section"} breadcrumb={[{ label: "CourseSection" }]}>
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
