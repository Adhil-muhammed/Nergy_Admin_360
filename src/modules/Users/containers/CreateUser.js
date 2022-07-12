import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentLayout } from "shared/components";
import { Input, Button, FormFeedback } from "reactstrap";
import { useUser } from "../hooks";
import { useRole } from "../../Roles/hooks";
import SimpleReactValidator from "simple-react-validator";

export const CreateUser = () => {
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  let { userId } = useParams();
  const editMode = userId ? true : false;

  const { rolesQuery } = useRole({ load: true });
  const { user, setUser, createUser, editUser, userInfo } = useUser({
    load: false,
    userId: userId,
  });
  const { firstName, lastName, email, password, confirmPassword, role } = user;

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser((draft) => {
      draft[name] = value;
    });
  };

  const navigate = useNavigate();

  const onSubmit = () => {
    if (validator.current.allValid()) {
      editMode ? editUser.mutate(user) : createUser.mutate(user);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onCancel = () => {
    navigate("..", { replace: true });
  };

  return (
    <ContentLayout
      subtitle={editMode ? "Update" : "Create"}
      title={"Users"}
      isLoading={userInfo.isLoading}
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
                        <label htmlFor="first-name-vertical" className="mb-2">
                          First name
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="firstName"
                          placeholder="First Name"
                          value={firstName}
                          onChange={onHandleChange}
                          invalid={validator.current.message("firstName", firstName, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("firstName", firstName, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="last-name-vertical" className="mb-2">
                          Last name
                        </label>
                        <Input
                          type="text"
                          id="last-name-vertical"
                          className="form-control"
                          name="lastName"
                          placeholder="Last name"
                          value={lastName}
                          onChange={onHandleChange}
                          invalid={validator.current.message("lastName", lastName, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("lastName", lastName, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="first-email-vertical" className="mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          id="first-email-vertical"
                          className="form-control"
                          name="email"
                          placeholder="Email address"
                          value={email}
                          onChange={onHandleChange}
                          invalid={validator.current.message("email", email, "required|email")}
                        />
                        <FormFeedback>
                          {validator.current.message("email", email, "required|email")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="user-role-select" className="mb-2">
                          Role
                        </label>
                        <Input
                          value={role}
                          id="first-name-vertical"
                          name="role"
                          type="select"
                          onChange={onHandleChange}
                          invalid={validator.current.message("role", role, "required")}
                        >
                          <option value={""}>Select</option>
                          {rolesQuery.isSuccess &&
                            rolesQuery.data
                              .filter((c) => c.name !== "Student")
                              .map((role) => {
                                return (
                                  <option key={`role_${role.roleId}`} value={role.name}>
                                    {role.name}
                                  </option>
                                );
                              })}
                        </Input>
                        <FormFeedback>
                          {validator.current.message("role", role, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  {!editMode && (
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="first-password-vertical" className="mb-2">
                            Password
                          </label>
                          <Input
                            type="email"
                            id="first-password-vertical"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onHandleChange}
                            invalid={validator.current.message(
                              "password",
                              password,
                              "required|min:8"
                            )}
                          />
                          <FormFeedback>
                            {validator.current.message("password", password, "required|min:8")}
                          </FormFeedback>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="first-confirm-password-vertical" className="mb-2">
                            Confirm Password
                          </label>
                          <Input
                            type="email"
                            id="first-confirm-password-vertical"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={onHandleChange}
                            invalid={
                              (confirmPassword && confirmPassword !== password) ||
                              validator.current.message(
                                "confirmPassword",
                                confirmPassword,
                                "required"
                              )
                            }
                          />
                          {confirmPassword && confirmPassword !== password && (
                            <div className="text-danger">Password must be same</div>
                          )}
                          <FormFeedback>
                            {validator.current.message(
                              "confirmPassword",
                              confirmPassword,
                              "required"
                            )}
                          </FormFeedback>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-12 d-flex justify-content-end">
                    <Button
                      className="me-1 mb-1"
                      color="success"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      {editMode ? "Update" : "Create"}
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
