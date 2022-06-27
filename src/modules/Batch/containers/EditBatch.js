import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import Datetime from "react-datetime";
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

export const EditBatch = (props) => {
  const { batch, setBatch, editBatch, onEdit } = props;
  const { name, startDate, endDate } = batch;
  const endDateVal = moment(endDate, "YYYY-MM-DD");
  const startDateVal = moment(startDate, "YYYY-MM-DD");

  let { batchId } = useParams();
  const history = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (batchId) {
      onEdit(parseInt(batchId.toString(), 10));
    }
  }, [batchId, onEdit]);

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

  const onSubmit = () => {
    editBatch.mutate(batch);
  };

  const onCancel = () => {
    history(`${location.pathname}`.replace(`/edit/${batchId}`, ""));
  };
  return (
    <ContentLayout title={"Update"}>
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-12">
            <form className="form form-vertical">
              <div className="form-body">
                <div className="col-12">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Name</label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="name"
                          placeholder="Batch Name"
                          value={name}
                          onChange={(e) => {
                            setBatch((draft) => {
                              draft.name = e.target.value;
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-info-vertical">Start Date</label>
                        <Datetime
                          dateformat="YYYY-MM-DD"
                          timeformat="{false}"
                          name="startDate"
                          selected={startDateVal}
                          value={startDateVal}
                          onChange={onStartDateChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-info-vertical">End Date</label>
                        <Datetime
                          dateformat="YYYY-MM-DD"
                          timeformat="{false}"
                          name="endDate"
                          selected={endDateVal}
                          value={endDateVal}
                          onChange={onEndDateChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-end">
                    <Button
                      className="me-1 mb-1"
                      color="success"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      Update
                    </Button>
                    <button
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
