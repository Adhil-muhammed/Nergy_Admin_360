import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";

export const CreateUser = (props) => {
  const { user, setUser, createUser } = props;
  const { firstName, lastName, email, password, confirmPassword } = user;

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser((draft) => {
      draft[name] = value;
    });
  };

  const history = useNavigate();
  const location = useLocation();

  const onSubmit = () => {
    createUser.mutate(user);
  };

  const onCancel = () => {
    history(`${location.pathname}`.replace("/create", ""));
  };

  return (
    <ContentLayout title={"Users"} subtitle={"New"}>
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
                        />
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
                        />
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
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="user-role-select" className="mb-2">
                          Role
                        </label>
                        <select className="form-select">
                          <option selected>--Select Role--</option>
                          <option value="0">Admin</option>
                          <option value="1">Role 1</option>
                        </select>
                        {/* <Input
                          type="email"
                          id="user-role-select"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          value={password}
                          onChange={onHandleChange}
                        /> */}
                      </div>
                    </div>
                  </div>
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
                        />
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
                      Create
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
