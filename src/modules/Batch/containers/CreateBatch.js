import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import Datetime from "react-datetime";
import { useNavigate, useLocation } from "react-router-dom";

export const CreateBatch = (props) => {
  const { batch, setBatch, createBatch } = props;
  const { name, startDate, endDate } = batch;

  const history = useNavigate();
  const location = useLocation();

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
    createBatch.mutate(batch);
  };

  const onCancel = () => {
    history(`${location.pathname}`.replace("/create",""));
  };

  return (
    <ContentLayout title={"Create New"}>
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-md-6 col-12">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <form className="form form-vertical">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical">Name</label>
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
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="contact-info-vertical">Start Date</label>
                            <Datetime
                              dateformat="YYYY-MM-DD"
                              timeformat="{false}"
                              name="startDate"
                              selected={startDate}
                              onChange={onStartDateChange}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="contact-info-vertical">End Date</label>
                            <Datetime
                              dateformat="YYYY-MM-DD"
                              timeformat="{false}"
                              name="endDate"
                              selected={endDate}
                              onChange={onEndDateChange}
                            />
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
                            Click Me
                          </Button>
                          <button type="reset" className="btn btn-light-secondary me-1 mb-1">
                            Reset
                          </button>
                          <button type="reset" className="btn btn-light-secondary me-1 mb-1"
                            onClick={() => {
                              onCancel();
                            }}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
