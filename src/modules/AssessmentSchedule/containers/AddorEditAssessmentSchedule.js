import { ContentLayout } from "shared/components";
import { Input, Button, FormFeedback, Table } from "reactstrap";
import Datetime from "react-datetime";
import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import SimpleReactValidator from "simple-react-validator";
import { useAssessmentSchedule } from "../hooks";
import { useAssessment } from "modules/Assessment/hooks";
import InputControl from "shared/components/InputControl";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";

export const AddorEditAssessmentSchedule = (props) => {
  const { assessmentQuery } = useAssessment({ load: true });
  const { data } = assessmentQuery;
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  let { scheduleId } = useParams();

  const editMode = scheduleId > 0;

  const {
    assesmentSchedule,
    setAssessmentSchedule,
    createAssessmentSchedule,
    editAssessmentSchedule,
    assessmentScheduleInfo,
    onChange,
  } = useAssessmentSchedule({
    load: false,
    scheduleId: scheduleId,
  });

  const { scheduledDate, assessmentId, slots } = assesmentSchedule;

  const navigate = useNavigate();
  const onSubmit = () => {
    if (validator.current.allValid()) {
      createAssessmentSchedule.mutate(assesmentSchedule);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
  const onCancel = () => {
    navigate("..", { replace: true });
  };
  const onSelectChange = (e, name) => {
    setAssessmentSchedule((draft) => {
      draft[name] = e.value;
    });
  };

  const onChangeSlot = (e, index) => {
    setAssessmentSchedule((draft) => {
      draft.slots[index][e.target.name] = e.target.value;
    });
  };

  const onDeleteSlot = (index) => {
    setAssessmentSchedule((draft) => {
      draft.slots = draft.slots.filter((_, i) => i !== index);
    });
  };

  const addSlot = () => {
    setAssessmentSchedule((draft) => {
      draft.slots.push({
        userLimit: 1,
        startAt: "",
        endAt: "",
      });
    });
  };

  const onChangeDate = (e) => {
    const { name, value } = e.target;
    setAssessmentSchedule((draft) => {
      draft.scheduledDate = moment(value, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm:ss");
    });
  };

  const onChangeTime = (e, index) => {
    const { name, value } = e.target;
    setAssessmentSchedule((draft) => {
      draft.slots[index][name] = moment(value, "HH:mm").format("YYYY-MM-DDTHH:mm:ss");
    });
  };

  const assessmentList = data?.map((item) => ({ value: item.assessmentId, label: item.name }));

  if (assessmentScheduleInfo.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <ContentLayout
      subtitle={editMode ? "Update" : "Create"}
      title={"Assesment Schedule"}
      breadcrumb={[
        { label: "Assessment Schedule", location: "/assessment-schedule" },
        { label: `${editMode ? "Edit" : "Create"}` },
      ]}
    >
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-12">
            <form className="form form-vertical">
              <div className="form-body">
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="first-name-vertical">Assessment</label>
                        <InputControl
                          type="react-select"
                          options={assessmentList}
                          name="assessmentId"
                          value={
                            assessmentId &&
                            assessmentList.length > 0 &&
                            assessmentList.find((c) => c.value === assessmentId)
                          }
                          isValid={
                            !validator.current.message("Assessment", assessmentId, "required")
                          }
                          onChange={(e) => onSelectChange(e, "assessmentId")}
                        />
                        <div className="text-danger">
                          {validator.current.message("assessment", assessmentId, "required")}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-info-vertical">
                          scheduledDate
                        </label>
                        <InputControl
                          type="date"
                          name="scheduledDate"
                          value={moment(scheduledDate, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD")}
                          onChange={onChangeDate}
                          invalid={validator.current.message(
                            "scheduledDate",
                            scheduledDate,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("scheduledDate", scheduledDate, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <h5 className="mt-3">Slot</h5>
                    <Table responsive size="">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>User Limit</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {slots.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                <div className="col-6">
                                  <div className="form-group">
                                    <Input
                                      type="text"
                                      id="first-name-vertical"
                                      className="form-control"
                                      name="userLimit"
                                      placeholder="User Limit"
                                      value={item.userLimit}
                                      onChange={(e) => onChangeSlot(e, index)}
                                      invalid={validator.current.message(
                                        "User Limit",
                                        item.userLimit,
                                        "required"
                                      )}
                                    />
                                    <FormFeedback>
                                      {validator.current.message(
                                        "User Limit",
                                        item.userLimit,
                                        "required"
                                      )}
                                    </FormFeedback>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="col-6">
                                  <div className="form-group">
                                    <Input
                                      type="time"
                                      id="first-name-vertical"
                                      className="form-control"
                                      name="startAt"
                                      placeholder="Start Time"
                                      value={moment(item.startAt, "YYYY-MM-DDTHH:mm:ss").format(
                                        "HH:mm"
                                      )}
                                      onChange={(e) => onChangeTime(e, index)}
                                      invalid={validator.current.message(
                                        "start Time",
                                        item.startAt,
                                        "required"
                                      )}
                                    />
                                    <FormFeedback>
                                      {validator.current.message(
                                        "start Time",
                                        item.startAt,
                                        "required"
                                      )}
                                    </FormFeedback>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="col-6">
                                  <div className="form-group">
                                    <InputControl
                                      type="time"
                                      id="first-content-vertical"
                                      className="form-control"
                                      name="endAt"
                                      placeholder="End Time"
                                      value={moment(item.endAt, "YYYY-MM-DDTHH:mm:ss").format(
                                        "HH:mm"
                                      )}
                                      onChange={(e) => onChangeTime(e, index)}
                                      invalid={validator.current.message(
                                        "End Time",
                                        item.endAt,
                                        "required"
                                      )}
                                    />
                                    <FormFeedback>
                                      {validator.current.message(
                                        "End Time",
                                        item.endAt,
                                        "required"
                                      )}
                                    </FormFeedback>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <Button color="danger" onClick={() => onDeleteSlot(index)}>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    <div className="col-12 d-flex justify-content-end">
                      <Button
                        className="me-1 mb-1"
                        color="secondary"
                        onClick={() => {
                          addSlot();
                        }}
                      >
                        Add Slot
                      </Button>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-end mt-5">
                    <LoadingButton
                      isLoading={
                        createAssessmentSchedule.isLoading || editAssessmentSchedule.isLoading
                      }
                      className="me-1 mb-1"
                      color="success"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      {editMode ? "Update" : "Save"}
                    </LoadingButton>
                    <button
                      disabled={
                        createAssessmentSchedule.isLoading || editAssessmentSchedule.isLoading
                      }
                      type="reset"
                      className="btn btn-light-secondary me-1 mb-1"
                      onClick={() => {
                        onCancel();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
