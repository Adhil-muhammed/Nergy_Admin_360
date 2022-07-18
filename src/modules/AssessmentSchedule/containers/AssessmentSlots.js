import React from "react";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useAssessmentSlots } from "../hooks/useAssessmentSlots";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const AssessmentSlots = () => {
  const { scheduleId } = useParams();
  const {
    deleteProperties,
    assessmentScheduleInfo,
    deleteAssessmentSlots,
    onDelete,
    isConfirmDelete,
    onToggleModal,
  } = useAssessmentSlots({ scheduleId: scheduleId });

  const { data, isLoading } = assessmentScheduleInfo;
  const onConfirm = () => {
    deleteAssessmentSlots.mutate(deleteProperties);
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
      </>
    );
  };

  const columns = [
    {
      Header: "User Limit",
      accessor: "userLimit",
    },
    {
      Header: "start Time",
      accessor: "startAt",
    },
    {
      Header: "End Time",
      accessor: "endAt",
    },

    {
      Header: "Actions",
      accessor: "slotId",
      id: "actions",
      Cell: ActionButtons,
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout title={"Assessment Slots"} subtitle={"List"}>
      {/* <AssessmentScheduleFilter /> */}
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
