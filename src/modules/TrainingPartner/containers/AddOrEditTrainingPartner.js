import React, { useState, useRef } from "react";
import { ContentLayout } from "shared";
import { useParams, useNavigate } from "react-router-dom";
import { useTrainingPartner } from "../hooks";
import { Input, FormFeedback } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import { LoadingButton } from "shared/components/LoadingButton";

export const AddOrEditTrainingPartner = (props) => {
  let { trainingPartnerId } = useParams();
  const editMode = trainingPartnerId != undefined;
  const [update, forceUpdate] = useState();
  const navigate = useNavigate();

  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const { trainingPartner, setTrainingPartner, createTrainingPartner, editTrainingPartner } =
    useTrainingPartner({
      load: false,
      trainingPartnerId,
    });

  const { firstName, lastName, address, gender, phoneNumber, emailAddress, userStatus, password } =
    trainingPartner;

  const onSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (validator.current.allValid()) {
      editMode
        ? editTrainingPartner.mutate(trainingPartner)
        : createTrainingPartner.mutate(trainingPartner);
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
      title={"Training Partner"}
      breadcrumb={[
        { label: "Training Partner", location: "/trainingpartner" },
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
                          First Name
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="firstName"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => {
                            setTrainingPartner((draft) => {
                              draft.firstName = e.target.value;
                            });
                          }}
                          invalid={validator.current.message("First Name", firstName, "required")}
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
                          onChange={(e) => {
                            setTrainingPartner((draft) => {
                              draft.lastName = e.target.value;
                            });
                          }}
                          invalid={validator.current.message("lastName", lastName, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("lastName", lastName, "required")}
                        </FormFeedback>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="last-name-vertical" className="mb-2">
                          Address
                        </label>
                        <Input
                          type="text"
                          id="last-name-vertical"
                          className="form-control"
                          name="address"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => {
                            setTrainingPartner((draft) => {
                              draft.address = e.target.value;
                            });
                          }}
                          invalid={validator.current.message("Address", address, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("Address", address, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="user-gender-select" className="mb-3">
                          Gender
                        </label>
                        <Input
                          value={gender}
                          id="first-name-vertical"
                          name="select"
                          type="select"
                          onChange={(e) => {
                            setTrainingPartner((draft) => {
                              draft.gender = parseInt(e.target.value);
                            });
                          }}
                          invalid={validator.current.message("gender", gender, "required")}
                        >
                          <option value={-1}>---Select---</option>
                          <option value={0}>Male</option>
                          <option value={1}>Female</option>
                        </Input>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="last-name-vertical" className="mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="text"
                          id="last-name-vertical"
                          className="form-control"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => {
                            setTrainingPartner((draft) => {
                              draft.phoneNumber = e.target.value;
                            });
                          }}
                          invalid={validator.current.message(
                            "phone number",
                            phoneNumber,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("PhoneNumber", phoneNumber, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="last-name-vertical" className="mb-2">
                          Email Address
                        </label>
                        <Input
                          type="text"
                          id="last-name-vertical"
                          className="form-control"
                          name="emailAddress"
                          placeholder="Email Address"
                          value={emailAddress}
                          onChange={(e) => {
                            setTrainingPartner((draft) => {
                              draft.emailAddress = e.target.value;
                            });
                          }}
                          invalid={validator.current.message(
                            "Email Address",
                            emailAddress,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("Email Address", emailAddress, "required")}
                        </FormFeedback>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        {editMode ? (
                          <div></div>
                        ) : (
                          <div className="form-group">
                            <label htmlFor="first-email-vertical" className="mb-2">
                              Password
                            </label>
                            <Input
                              type="password"
                              id="first-password-vertical"
                              className="form-control"
                              name="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => {
                                setTrainingPartner((draft) => {
                                  draft.password = e.target.value;
                                });
                              }}
                              invalid={validator.current.message("password", password, "required")}
                            />
                            <div>
                              Password should contain Uppercase, Lowercase, number & special
                              character
                            </div>
                            <FormFeedback>
                              {validator.current.message("password", password, "required")}
                            </FormFeedback>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-6">
                        <label className="mb-2" htmlFor="first-status-vertical">
                          Status
                        </label>
                        <Input
                          value={userStatus}
                          id="first-status-vertical"
                          name="status"
                          type="select"
                          onChange={(e) => {
                            setTrainingPartner((draft) => {
                              draft.userStatus = parseInt(e.target.value, 10);
                            });
                          }}
                          invalid={validator.current.message("Status", userStatus, "required")}
                        >
                          <option value={-1}>---Select---</option>
                          <option value={0}>Active</option>
                          <option value={1}>Inactive</option>
                        </Input>
                        <FormFeedback>
                          {validator.current.message("Status", userStatus, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <LoadingButton
                  isLoading={createTrainingPartner.isLoading || createTrainingPartner.isLoading}
                  className="me-1 mb-1"
                  color="success"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  {editMode ? "Update" : "Save"}
                </LoadingButton>
                <button
                  disabled={createTrainingPartner.isLoading || createTrainingPartner.isLoading}
                  type="reset"
                  className="btn btn-light-secondary me-1 mb-1"
                  onClick={() => {
                    onCancel();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
