import { ContentLayout } from "shared/components";
import { Input, Button, FormFeedback } from "reactstrap";
import Datetime from "react-datetime";
import React, { useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { useBatch } from "../hooks";
import { useProgram } from "modules/Program";
import SimpleReactValidator from "simple-react-validator";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";
import InputControl from "shared/components/InputControl";

export const AddOrEditBatch = (props) => {
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  let { batchId } = useParams();

  const editMode = batchId > 0;

  const { batch, setBatch, createBatch, editBatch, batchInfo, onChange } = useBatch({
    load: false,
    batchId: batchId,
  });

  const { programsQuery } = useProgram({ load: true });
  const { data: programData } = programsQuery;

  const { name, startDate, endDate, status, expiryDate, programId } = batch;

  const endDateVal = moment(endDate, "YYYY-MM-DD");
  const startDateVal = moment(startDate, "YYYY-MM-DD");
  const expiryDateVal = moment(expiryDate, "YYYY-MM-DD");

  const navigate = useNavigate();
  const onStartDateChange = (m) => {
    const date = m.format("YYYY-MM-DD").toString();
    setBatch((draft) => {
      draft.startDate = date;
    });
  };
  const onEndDateChange = (m) => {
    const date = m.format("YYYY-MM-DD").toString();
    setBatch((draft) => {
      draft.endDate = date;
    });
  };

  const onExpiryDateChange = (m) => {
    const date = m.format("YYYY-MM-DD").toString();
    setBatch((draft) => {
      draft.expiryDate = date;
    });
  };

  const onSelectChange = (e, name) => {
    const { value } = e;
    setBatch((draft) => {
      draft[name] = value;
    });
  };

  const programIdList = React.useMemo(() => {
    return programData
      ? programData.map((p) => {
        return { value: p.id, label: p.name };
      })
      : [];
  }, [programData]);

  const onSubmit = () => {
    if (
      validator.current.allValid() &&
      startDateVal.isValid() &&
      endDateVal.isValid() &&
      expiryDateVal.isValid()
    ) {
      editMode ? editBatch.mutate(batch) : createBatch.mutate(batch);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
  const onCancel = () => {
    navigate("..", { replace: true });
  };
  if (batchInfo.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <ContentLayout
      subtitle={editMode ? "Update" : "Create"}
      title={"Batch"}
      breadcrumb={[
        { label: "Batch", location: "/batch" },
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
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Name
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="name"
                          placeholder="Batch Name"
                          value={name}
                          onChange={onChange}
                          invalid={validator.current.message("Name", name, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("Name", name, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-info-vertical">
                          Start Date
                        </label>
                        <Datetime
                          dateformat="YYYY-MM-DD"
                          timeformat="{false}"
                          name="startDate"
                          closeOnSelect={true}
                          selected={startDateVal}
                          value={startDateVal}
                          onChange={onStartDateChange}
                        />
                        <div className="text-danger">
                          {update && !startDateVal.isValid() ? "Please select start date" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-info-vertical">
                          End Date
                        </label>
                        <Datetime
                          dateformat="YYYY-MM-DD"
                          timeformat="{false}"
                          name="endDate"
                          closeOnSelect={true}
                          selected={endDateVal}
                          value={endDateVal}
                          onChange={onEndDateChange}
                        />
                        <div className="text-danger">
                          {update && !endDateVal.isValid() ? "Please select end date" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-status-vertical">
                          Status
                        </label>
                        <Input
                          value={status}
                          id="first-status-vertical"
                          name="status"
                          type="select"
                          onChange={(e) => {
                            setBatch((draft) => {
                              draft.status = parseInt(e.target.value, 10);
                            });
                          }}
                          invalid={validator.current.message("Status", status, "required")}
                          disabled={!editMode}
                        >
                          <option value="">---Select---</option>
                          <option value={0}>Active</option>
                          <option value={1}>Inactive</option>
                        </Input>
                        <FormFeedback>
                          {validator.current.message("Status", status, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="batch-expiryDate-vertical">
                          Expiry Date
                        </label>
                        <Datetime
                          dateformat="YYYY-MM-DD"
                          timeformat="{false}"
                          name="expiryDate"
                          closeOnSelect={true}
                          selected={expiryDateVal}
                          value={expiryDateVal}
                          onChange={onExpiryDateChange}
                        />
                        <div className="text-danger">
                          {update && !expiryDateVal.isValid() ? "Please select expiry date" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-programId-vertical">
                          Program Id
                        </label>
                        <InputControl
                          type="react-select"
                          options={programIdList}
                          name="programId"
                          value={
                            programId !== "" && programIdList.find((c) => c.value == programId)
                          }
                          isValid={!validator.current.message("programId", programId, "required")}
                          onChange={(e) => onSelectChange(e, "programId")}
                        />
                        <div className="text-danger">
                          {validator.current.message("programId", programId, "required")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-end">
                    <LoadingButton
                      isLoading={createBatch.isLoading || editBatch.isLoading}
                      className="me-1 mb-1"
                      color="success"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      {editMode ? "Update" : "Save"}
                    </LoadingButton>
                    <button
                      disabled={createBatch.isLoading || editBatch.isLoading}
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
