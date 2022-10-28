import React, { useState, useRef } from "react";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { Input, Button, FormFeedback, Table } from "reactstrap";
import { useParams } from "react-router-dom";
import { useAssessmentSlots } from "../hooks/useAssessmentSlots";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { SlotModal } from "../components/SlotModal";
import moment from "moment";
import InputControl from "shared/components/InputControl";
import SimpleReactValidator from "simple-react-validator";

export const AssessmentSlots = () => {
  const { scheduleId } = useParams();
  const {
    deleteProperties,
    assessmentScheduleInfo,
    deleteAssessmentSlots,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    editAssessmentSlots,
    isOpenSlotModal,
    slotProperties,
    setSlotProperties,
    setIsOpenSlotModal,
    onEdit,
  } = useAssessmentSlots({ scheduleId: scheduleId });

  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const { data, isLoading } = assessmentScheduleInfo;
  const onConfirm = () => {
    deleteAssessmentSlots.mutate(deleteProperties);
  };
  const onChangeSlot = (e) => {
    setSlotProperties((draft) => {
      draft[e.target.name] = e.target.value;
    });
  };

  const updateSlote = () => {
    if (validator.current.allValid()) {
      editAssessmentSlots.mutate({ deleteProperties: { scheduleId }, slotProperties });
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onChangeTime = (e) => {
    const { name, value } = e.target;
    setSlotProperties((draft) => {
      draft[name] = moment(value, "HH:mm").format("YYYY-MM-DDTHH:mm:ss");
    });
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button>
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
    <ContentLayout
      title={"Assessment Slots"}
      subtitle={"List"}
      breadcrumb={[
        { label: "Assessment Schedule", location: "/assessment-schedule" },
        { label: `Assessment slot ${scheduleId}` },
      ]}
    >
      {/* <AssessmentScheduleFilter /> */}
      <TableLayout columns={columns} data={data} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete?`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
      <SlotModal
        size="lg"
        isOpen={isOpenSlotModal}
        title="Edit Slot"
        onSave={() => {
          updateSlote();
        }}
        onCancel={() => setIsOpenSlotModal(false)}
      >
        <>
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="first-limit-vertical" className="mb-2">
                  User limit*
                </label>
                <Input
                  type="text"
                  id="first-limit-vertical"
                  className="form-control"
                  name="userLimit"
                  placeholder="User Limit"
                  value={slotProperties.userLimit}
                  onChange={onChangeSlot}
                  invalid={validator.current.message(
                    "User Limit",
                    slotProperties.userLimit,
                    "required"
                  )}
                />
                <FormFeedback>
                  {validator.current.message("User Limit", slotProperties.userLimit, "required")}
                </FormFeedback>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="first-start-vertical" className="mb-2">
                  Start at*
                </label>
                <Input
                  type="time"
                  id="first-start-vertical"
                  className="form-control"
                  name="startAt"
                  placeholder="Start Time"
                  value={moment(slotProperties.startAt, "YYYY-MM-DDTHH:mm:ss").format("HH:mm")}
                  onChange={onChangeTime}
                  invalid={validator.current.message(
                    "start Time",
                    slotProperties.startAt,
                    "required"
                  )}
                />
                <FormFeedback>
                  {validator.current.message("start Time", slotProperties.startAt, "required")}
                </FormFeedback>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="first-end-vertical" className="mb-2">
                  End at*
                </label>
                <InputControl
                  type="time"
                  id="first-end-vertical"
                  className="form-control"
                  name="endAt"
                  placeholder="End Time"
                  value={moment(slotProperties.endAt, "YYYY-MM-DDTHH:mm:ss").format("HH:mm")}
                  onChange={onChangeTime}
                  invalid={validator.current.message("End Time", slotProperties.endAt, "required")}
                />
                <FormFeedback>
                  {validator.current.message("End Time", slotProperties.endAt, "required")}
                </FormFeedback>
              </div>
            </div>
          </div>
        </>
      </SlotModal>
    </ContentLayout>
  );
};
