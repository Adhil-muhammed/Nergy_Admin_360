import React, { useMemo } from "react";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { CourseIdFilter } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useCourse } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { useAuthorizeContext } from "master";

export const CourseList = (props) => {
  const { hasPermission } = useAuthorizeContext();
  const hasDeletePermission = hasPermission("Courses", "Delete");
  const hasEditPermission = hasPermission("Courses", "Edit");
  const hasCreatePermission = hasPermission("Courses", "Create");

  const { course, coursesQuery, onDelete, onToggleModal, isConfirmDelete, deleteCourse } =
    useCourse({
      load: true,
    });
  const history = useNavigate();
  const location = useLocation();

  const onConfirm = () => {
    deleteCourse.mutate(course.courseId);
  };

  const onEdit = (courseId) => {
    history(`${location.pathname}/${courseId}`);
  };

  const CheckMarker = ({ value }) => {
    return (
      <span style={{ color: value ? "#3fba2d" : "#da1a1a", fontSize: "24px" }}>
        <i className={`bi ${value ? "bi-check" : "bi-x"}`}></i>
      </span>
    );
  };

  const Thumbnail = ({ value }) => {
    return value ? <img style={{ height: "40px" }} src={value} /> : <span>No Thumbnail</span>;
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
      },
      {
        Header: "Exam",
        accessor: "hasExam",
        Cell: CheckMarker,
      },
      {
        Header: "Content",
        accessor: "isContentEnabled",
        Cell: CheckMarker,
      },
      {
        Header: "Thumbnail",
        accessor: "courseImageURL",
        Cell: Thumbnail,
      },
      {
        Header: "Actions",
        id: "actions",
        accessor: "courseId",
        Cell: ActionButtons,
      },
    ],
    []
  );

  if (coursesQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout title={"Courses"} subtitle={"List"} breadcrumb={[{ label: "Courses" }]}>
      {
        hasCreatePermission && <CourseIdFilter />
      }
      <TableLayout columns={columns} data={coursesQuery.data} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${course.name}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
