import React from "react";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { AssessmentScheduleFilter } from "../components/AssessmentScheduleFilter";
import { useAssessmentSchedule } from "../hooks";
import { useAssessment } from "modules/Assessment/hooks";
import { GenerateAssessmentSchedule } from "./GenerateAssessmentSchedule";

export const AssessmentScheduleList = (props) => {
  const { assessmentQuery } = useAssessment({ load: true });

  const {
    assesmentSchedule,
    assessmentScheduleQuery,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteAssessmentSchedule,
  } = useAssessmentSchedule({
    load: true,
  });

  const { data, isLoading } = assessmentScheduleQuery;
  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteAssessmentSchedule.mutate(assesmentSchedule.scheduleId);
  };

  const onEdit = (scheduleId) => {
    history(`${location.pathname}/slots/${scheduleId}`);
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i>{" "}
          <span>View Slots</span>
        </Button>
        <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
      </>
    );
  };

  const columns = [
    {
      Header: "Assessment Name",
      accessor: "assessmentId",
      Cell: ({ row }) => {
        return (
          <div>
            {
              assessmentQuery?.data?.find(
                (assessment) => assessment.assessmentId === row.original.assessmentId
              )?.name
            }
          </div>
        );
      },
    },
    {
      Header: "User Limit",
      accessor: "userLimit",
    },
    {
      Header: "Scheduled Date",
      accessor: "scheduledDate",
    },

    {
      Header: "Actions",
      accessor: "scheduleId",
      id: "actions",
      Cell: ActionButtons,
    },
  ];

  return (
    <ContentLayout title={"Assessment Schedule"} subtitle={"List"} isLoading={isLoading}>
      <AssessmentScheduleFilter />
      <GenerateAssessmentSchedule />

      <TableLayout columns={columns} data={data} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
