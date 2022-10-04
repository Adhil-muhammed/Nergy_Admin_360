import { ContentLayout } from "shared/components";
import { Input, Button, FormFeedback } from "reactstrap";
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { useRole, usePermission, action_types } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";

export const CreateRole = (props) => {
  const { hasPermission } = usePermission({ load: true });
  const navigate = useNavigate();
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  let { roleId } = useParams();

  const editMode = roleId ? true : false;
  const { role, setRole, createRole, editRole, roleInfo } = useRole({
    load: false,
    roleId: roleId,
  });
  const { name } = role;

  const onSubmit = () => {
    if (validator.current.allValid()) {
      editMode ? editRole.mutate(role) : createRole.mutate(role);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onReset = () => {
    setRole((draft) => {
      draft.name = "";
      return draft;
    });
  };

  const onCancel = () => {
    navigate("..", { replace: true });
  };

  if (roleInfo.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={editMode ? "Update" : "Create New"}
      breadcrumb={[
        { label: "Roles", location: "/admin/role" },
        { label: `${editMode ? "Edit" : "Create"}` },
      ]}
    >
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-md-6 col-12">
            <div className="card">
              {/* test purpose only starts */}
              {hasPermission("UserRoles", action_types.View) && "Can view this module!"}
              {hasPermission("UserRoles", action_types.Create) && <button>Create</button>}
              {hasPermission("UserRoles", action_types.Edit) && <button>Edit</button>}
              {hasPermission("UserRoles", action_types.Delete) && <button>Delete</button>}
              {/* test purpose only ends */}

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
                              invalid={validator.current.message("name", name, "required")}
                            />
                            <FormFeedback>
                              {validator.current.message("name", name, "required")}
                            </FormFeedback>
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                          <LoadingButton
                            isLoading={createRole.isLoading || editRole.isLoading}
                            className="me-1 mb-1"
                            color="success"
                            onClick={() => {
                              onSubmit();
                            }}
                          >
                            {editMode ? "Update" : "Create"}
                          </LoadingButton>
                          <button
                            disabled={createRole.isLoading || editRole.isLoading}
                            type="reset"
                            className="btn btn-light-secondary me-1 mb-1"
                            onClick={() => {
                              onReset();
                            }}
                          >
                            Reset
                          </button>
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
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
