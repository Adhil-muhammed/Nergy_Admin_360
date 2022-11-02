import React, { useMemo } from "react";
import { TableLayout } from "shared/components";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSection } from "..";

export const SectionList = (props) => {
  const { sections, courseId, onSectionDelete } = props;

  const history = useNavigate();
  const { courseSection, onDelete, deleteCourseSection } = useSection({ sectionId: 0, courseId });

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
        <Button color="danger" size="sm" onClick={() => onSectionDelete(value)} className="ms-3">
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
        Header: "Actions",
        id: "actions",
        accessor: "sectionId",
        Cell: ActionButtons,
      },
    ],
    []
  );

  return (
    <>
      <h2>Sections</h2>
      <TableLayout columns={columns} data={sections} />
    </>
  );
};
