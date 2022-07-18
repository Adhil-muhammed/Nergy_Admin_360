import { useAssessment } from "modules/Assessment/hooks";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormFeedback } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";
import InputControl from "shared/components/InputControl";
import { LoadingButton } from "shared/components/LoadingButton";
import SimpleReactValidator from "simple-react-validator";
import { useGenerateAssessmentSchedule } from "../hooks";

export const GenerateAssessmentSchedule = () => {
  const { assessmentQuery } = useAssessment({ load: true });
  let navigate = useNavigate();
  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  const { data: assessmentList } = assessmentQuery;
  const assessmentsArray = assessmentList?.map((item) => ({
    value: item.assessmentId,
    label: item.name,
  }));
  const {
    state,
    reset,
    generateSchedules,
    onChange,
    onSelectChange,
    onChangeDate,
    onChangeTime,
    createSchedule,
  } = useGenerateAssessmentSchedule();
  const { assessmentId, date, startAt, timeBetweenSlots, noOfSlots, duration, userLimit } = state;

  return (
    <ContentLayout>
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-12">
            <form className="form form-vertical">
              <div className="form-body">
                <div className="col-12">
                  <div className="row">
                    <div className="col-3">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-info-vertical">
                          Assessment
                        </label>
                        <InputControl
                          type="react-select"
                          options={assessmentsArray}
                          name="assessmentId"
                          value={
                            assessmentId &&
                            assessmentsArray.length > 0 &&
                            assessmentsArray.find((c) => c.value === assessmentId)
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
                    <div className="col-3">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-info-vertical">
                          Date
                        </label>
                        <InputControl
                          type="date"
                          name="date"
                          className="form-control"
                          value={moment(date, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD")}
                          onChange={onChangeDate}
                          invalid={validator.current.message("date", date, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("date", date, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Start Time
                        </label>
                        <InputControl
                          type="time"
                          id="first-name-vertical"
                          className="form-control"
                          name="startAt"
                          placeholder="Start Time"
                          value={moment(startAt, "YYYY-MM-DDTHH:mm:ss").format("HH:mm")}
                          onChange={(e) => onChangeTime(e)}
                          invalid={validator.current.message("start Time", startAt, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("start Time", startAt, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Time Between Slots
                        </label>
                        <InputControl
                          type="number"
                          id="first-name-vertical"
                          className="form-control"
                          name="timeBetweenSlots"
                          placeholder="Time Between Slots in minutes"
                          value={timeBetweenSlots}
                          onChange={onChange}
                          invalid={validator.current.message(
                            "Time between slots",
                            timeBetweenSlots,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message(
                            "Time between slots",
                            timeBetweenSlots,
                            "required"
                          )}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Number Of Slots
                        </label>
                        <InputControl
                          type="number"
                          id="first-name-vertical"
                          className="form-control"
                          name="noOfSlots"
                          placeholder="Number Of Slots"
                          value={noOfSlots}
                          onChange={onChange}
                          invalid={validator.current.message(
                            "Number of slots",
                            noOfSlots,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("Number of slots", noOfSlots, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Duration
                        </label>
                        <InputControl
                          type="number"
                          id="first-name-vertical"
                          className="form-control"
                          name="duration"
                          placeholder="Duration in minutes"
                          value={duration}
                          onChange={onChange}
                          invalid={validator.current.message("Duration", duration, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("Duration", duration, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          User Limit
                        </label>
                        <InputControl
                          type="number"
                          id="first-name-vertical"
                          className="form-control"
                          name="userLimit"
                          placeholder="user limit"
                          value={userLimit}
                          onChange={onChange}
                          invalid={validator.current.message("User limit", userLimit, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("User limit", userLimit, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <LoadingButton
                        isLoading={createSchedule.isLoading}
                        className="me-1 mb-1"
                        color="success"
                        onClick={() => {
                          if (validator.current.allValid()) {
                            generateSchedules();
                          } else {
                            validator.current.showMessages();
                            forceUpdate(1);
                          }
                        }}
                      >
                        Generate Schedules
                      </LoadingButton>
                      <button
                        disabled={createSchedule.isLoading}
                        type="reset"
                        className="btn btn-light-secondary me-1 mb-1"
                        onClick={() => {
                          reset();
                        }}
                      >
                        Reset
                      </button>
                    </div>
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
