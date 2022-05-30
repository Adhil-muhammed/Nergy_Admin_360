import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const CreateRole = (props) => {
  const history = useNavigate();
  const location = useLocation();
  const { role, setRole, createRole } = props;
  const { name } = role;

  const onSubmit = () => {
    createRole.mutate(role);
  };

  const onReset = () => {
    setRole((draft) => {
      draft.name = "";
      return draft;
    });
  };

  const onCancel = () => {
    history(`${location.pathname}`.replace("/create",""));
  };

  React.useEffect(() => {
    onReset();
  }, [setRole]);

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
                              placeholder="Role Name"
                              value={name}
                              onChange={(e) => {
                                setRole((draft) => {
                                  draft.name = e.target.value;
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                          <Button
                            className="btn btn-primary me-1 mb-1"
                            onClick={() => {
                              onSubmit();
                            }}
                          >
                            Create
                          </Button>
                          <button type="reset" className="btn btn-light-secondary me-1 mb-1"
                            onClick={() => {
                              onReset();
                            }}>
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
