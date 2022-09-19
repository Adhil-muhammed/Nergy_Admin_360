import React, { useState, useRef } from "react";
import { ContentLayout } from "shared/components";
import { Input, Button, FormFeedback } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { useProgram } from "../hooks";
import { LoadingButton } from "shared/components/LoadingButton";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const AddOrEditProgram = () => {
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  let { programId } = useParams();

  const editMode = !!programId;
  const { program, setProgram, programInfo, createProgram, editProgram } = useProgram({
    load: false,
    programId: programId,
  });
  const { name, description } = program;
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProgram((draft) => {
      draft[name] = value;
    });
  };

  const onSubmit = () => {
    if (validator.current.allValid()) {
      editMode ? editProgram.mutate(program) : createProgram.mutate(program);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
  const onCancel = () => {
    navigate("..", { replace: true });
  };

  if (programInfo.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Program"}
      subtitle={editMode ? "Update" : "Create"}
      breadcrumb={[
        { label: "Program", location: "/admin/program" },
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
                          placeholder="Name"
                          value={name}
                          onChange={onChangeHandler}
                          invalid={validator.current.message("name", name, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("name", name, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-description-vertical">
                          Description
                        </label>
                        <Input
                          type="text"
                          id="first-description-vertical"
                          className="form-control"
                          name="description"
                          placeholder="Description"
                          value={description}
                          onChange={onChangeHandler}
                          invalid={validator.current.message(
                            "description",
                            description,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("description", description, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <LoadingButton
                    isLoading={editProgram.isLoading || createProgram.isLoading}
                    className="me-1 mb-1"
                    color="success"
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    {editMode ? "Update" : "Create"}
                  </LoadingButton>
                  <button
                    disabled={editProgram.isLoading || createProgram.isLoading}
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
