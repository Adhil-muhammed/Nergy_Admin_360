import React, { useState, useRef } from "react";
import { ContentLayout } from "shared";
import { useParams, useNavigate } from "react-router-dom";
import { useTrainingPartner } from "../hooks";
import { Input, FormFeedback } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
import { LoadingButton } from "shared/components/LoadingButton";
import InputControl from "shared/components/InputControl";

export const AddOrEditTrainingPartner = (props) => {
  let { trainingPartnerId } = useParams();
  const editMode = trainingPartnerId != undefined;
  const [update, forceUpdate] = useState();
  const navigate = useNavigate();

  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
      validators: {
        pass: {
          message:
            "The :attribute  should contain Uppercase, Lowercase, number & special character :values.",
          rule: (val, params, validator) => {
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/i
              ) && params.indexOf(val) === -1
            );
          },
          messageReplace: (message, params) =>
            message.replace(":values", this.helpers.toSentence(params)), // optional
          required: true,
        },
      },
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

  const optionsGender = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
  ];

  const optionsStatus = [
    { value: 0, label: "Active" },
    { value: 1, label: "Inactive" },
  ];

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
                        <InputControl
                          type="react-select"
                          name="gender"
                          value={optionsGender.filter((item) => item.value === gender)}
                          options={optionsGender}
                          onChange={(e) => {
                            setTrainingPartner((draft) => {
                              draft.gender = parseInt(e.value, 10);
                            });
                          }}
                          isValid={!validator.current.message("gender", gender, "required")}
                        />
                        <div className="text-danger">
                          {validator.current.message("gender", gender, "required")}
                        </div>
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
                            "required|email"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message(
                            "Email Address",
                            emailAddress,
                            "required|email"
                          )}
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
                              invalid={validator.current.message(
                                "password",
                                password,
                                "required|pass"
                              )}
                            />
                            <FormFeedback>
                              {validator.current.message("password", password, "required|pass")}
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
                        <InputControl
                          type="react-select"
                          name="status"
                          value={optionsStatus.filter((item) => item.value === userStatus)}
                          options={optionsStatus}
                          onChange={(e) => {
                            setTrainingPartner((draft) => {
                              draft.userStatus = parseInt(e.value, 10);
                            });
                          }}
                          isValid={!validator.current.message("userStatus", userStatus, "required")}
                        />
                        <div className="text-danger">
                          {validator.current.message("userStatus", userStatus, "required")}
                        </div>
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
