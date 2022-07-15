import React, { useState, useRef } from "react";
import { ContentLayout } from "shared/components";
import { Input, Button, FormFeedback } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { useInstitute } from "../hooks";
import { LoadingButton } from "shared/components/LoadingButton";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const AddOrEditInstitute = () => {
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  let { instituteId } = useParams();

  const editMode = instituteId > 0;
  const { institute, setInstitute, createInstitute, instituteInfo, editInstitute } = useInstitute({
    load: false,
    instituteId: instituteId,
  });
  const { name } = institute;
  const navigate = useNavigate();

  const onSubmit = () => {
    if (validator.current.allValid()) {
      editMode ? editInstitute.mutate(institute) : createInstitute.mutate(institute);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
  const onCancel = () => {
    navigate("..", { replace: true });
  };

  if (instituteInfo.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout title={"Institutes"} subtitle={editMode ? "Update" : "Create"}>
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
                          placeholder="Institute Name"
                          value={name}
                          onChange={(e) => {
                            setInstitute((draft) => {
                              draft.name = e.target.value;
                            });
                          }}
                          invalid={validator.current.message("name", name, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("name", name, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <LoadingButton
                    isLoading={editInstitute.isLoading || createInstitute.isLoading}
                    className="me-1 mb-1"
                    color="success"
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    {editMode ? "Update" : "Create"}
                  </LoadingButton>
                  <button
                    disabled={editInstitute.isLoading || createInstitute.isLoading}
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
            </form>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
