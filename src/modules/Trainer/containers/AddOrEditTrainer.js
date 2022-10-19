import React, { useState, useRef } from "react";
import { ContentLayout } from "shared/components";
import { useNavigate, useParams } from "react-router-dom";
import Datetime from "react-datetime";
import moment from "moment";
import { Input, FormFeedback } from "reactstrap";
import { useTrainer } from "../hook";
import SimpleReactValidator from "simple-react-validator";
import { LoadingButton } from "shared/components/LoadingButton";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const AddOrEditTrainer = (props) => {
  const navigate = useNavigate();
  let { trainerId } = useParams();

  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const { trainer, setTrainer, createTrainer, trainerInfo, editTrainer } = useTrainer({
    load: false,
    trainerId,
  });

  const {
    firstName,
    lastName,
    emailAddress,
    gender,
    password,
    dateOfBirth,
    userStatus,
    qualification,
  } = trainer;

  const editMode = trainerId != undefined;

  const dateOfBirthVal = moment(dateOfBirth, "YYYY-MM-DD");

  const onDateOfBirthChange = (m) => {
    const date = m.format("YYYY-MM-DD").toString();
    setTrainer((draft) => {
      draft.dateOfBirth = date;
    });
  };

  const handleChecked = (e) => {
    setTrainer((draft) => {
      draft.userStatus = Number(e.target.checked);
    });
  };

  const onSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (validator.current.allValid()) {
      editMode ? editTrainer.mutate(trainer) : createTrainer.mutate(trainer);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
  const onCancel = () => {
    navigate("..", { replace: true });
  };

  if (trainerInfo.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ContentLayout
        title={"Trainer"}
        subtitle={editMode ? "Update" : "Create"}
        breadcrumb={[
          { label: "Trainer", location: "/admin/trainer" },
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
                              setTrainer((draft) => {
                                draft.firstName = e.target.value;
                              });
                            }}
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
                            onChange={(e) => {
                              setTrainer((draft) => {
                                draft.lastName = e.target.value;
                              });
                            }}
                            invalid={validator.current.message("firstName", firstName, "required")}
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
                            value={emailAddress}
                            onChange={(e) => {
                              setTrainer((draft) => {
                                draft.emailAddress = e.target.value;
                              });
                            }}
                            invalid={validator.current.message(
                              "emailAddress",
                              emailAddress,
                              "required"
                            )}
                          />
                          <FormFeedback>
                            {validator.current.message("emailAddress", emailAddress, "required")}
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
                              setTrainer((draft) => {
                                draft.gender = parseInt(e.target.value);
                              });
                            }}
                            invalid={validator.current.message("gender", gender, "required")}
                          >
                            <option value="">---Select---</option>
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                          </Input>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="mb-2" htmlFor="contact-info-vertical">
                            Date of birth
                          </label>
                          <Datetime
                            dateformat="YYYY-MM-DD"
                            timeformat="{false}"
                            name="dateofbirth"
                            closeOnSelect={true}
                            selected={dateOfBirthVal}
                            value={dateOfBirthVal}
                            onChange={onDateOfBirthChange}
                            className={
                              update && !dateOfBirthVal.isValid() && "form-control is-invalid"
                            }
                          />
                          <div className="text-danger">
                            {update && !dateOfBirthVal.isValid()
                              ? "Please select date of birth"
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="first-qualification-vertical" className="mb-2">
                            Qualification
                          </label>
                          <Input
                            type="text"
                            id="first-qualification-vertical"
                            className="form-control"
                            name="qualification"
                            value={qualification}
                            placeholder="Qualification"
                            onChange={(e) => {
                              setTrainer((draft) => {
                                draft.qualification = e.target.value;
                              });
                            }}
                          />
                          <FormFeedback></FormFeedback>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        {!editMode && (
                          <div className="form-group">
                            <label htmlFor="first-email-vertical" className="mb-2">
                              Password
                            </label>
                            <Input
                              type="text"
                              id="first-password-vertical"
                              className="form-control"
                              name="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => {
                                setTrainer((draft) => {
                                  draft.password = e.target.value;
                                });
                              }}
                              invalid={validator.current.message("password", password, "required")}
                            />
                            <FormFeedback>
                              {validator.current.message("password", password, "required")}
                            </FormFeedback>
                          </div>
                        )}
                        <div className="mt-4">
                          <div className="form-check form-check-inline">
                            <label htmlFor="first-exam-vertical">User Status</label>
                            <Input
                              type="checkbox"
                              id="first-exam-vertical"
                              className="form-check-input"
                              name="userStatus"
                              checked={userStatus}
                              onChange={handleChecked}
                            />
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                          <LoadingButton
                            isLoading={createTrainer.isLoading || editTrainer.isLoading}
                            className="me-1 mb-1"
                            color="success"
                            onClick={() => {
                              onSubmit();
                            }}
                          >
                            {editMode ? "Update" : "Save"}
                          </LoadingButton>
                          <button
                            disabled={createTrainer.isLoading || editTrainer.isLoading}
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
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </ContentLayout>
    </>
  );
};
