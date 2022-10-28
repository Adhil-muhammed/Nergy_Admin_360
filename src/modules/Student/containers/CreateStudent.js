import React, { useState, useRef } from "react";
import { ContentLayout } from "shared/components";
import { Input, Button, FormFeedback } from "reactstrap";
import Datetime from "react-datetime";
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import { useStudent } from "../hooks";
import { useParams, useNavigate } from "react-router-dom";
import InputControl from "shared/components/InputControl";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";

export const CreateStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const editMode = studentId !== undefined;
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  const {
    student,
    setStudent,
    createStudent,
    batches,
    institutesQuery,
    courses,
    editStudent,
    studentInfo,
  } = useStudent({ load: false, studentId: studentId });
  const {
    instituteId,
    registrationId,
    firstName,
    lastName,
    gender,
    emailAddress,
    qualification,
    dateOfBirth,
    mobile,
    region,
    selectedCourses,
    userStatus,
    selectedBatches,
  } = student;

  const onChangeDate = (e) => {
    const { name, value } = e.target;
    setStudent((draft) => {
      draft.dateOfBirth = moment(value, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm:ss");
    });
  };

  const onSelectChange = (e, name) => {
    const requiredFormat = e.map((item) => item.value);
    setStudent((draft) => {
      draft[name] = requiredFormat;
    });
  };

  const onSubmit = () => {
    if (validator.current.allValid()) {
      if (editMode) editStudent.mutate(student);
      else createStudent.mutate(student);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onCancel = () => {
    navigate("..", { replace: true });
  };

  if (studentInfo.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Student"}
      subtitle={editMode ? "Update" : "Create"}
      breadcrumb={[
        { label: "Student", location: "/student" },
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
                          Registration Id
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="Registration Id"
                          placeholder="Registration Id"
                          value={registrationId}
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.registrationId = e.target.value;
                            });
                          }}
                          invalid={validator.current.message(
                            "Registration Id",
                            registrationId,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("Registration Id", registrationId, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Institute
                        </label>
                        <Input
                          value={instituteId}
                          id="first-name-vertical"
                          name="instituteId"
                          type="select"
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.instituteId = e.target.value;
                            });
                          }}
                          invalid={validator.current.message(
                            "instituteId",
                            instituteId,
                            "required"
                          )}
                        >
                          <option value="">---Select---</option>
                          {institutesQuery?.data?.map((institute) => {
                            return (
                              <option
                                key={`institute_${institute.instituteId}`}
                                value={institute.instituteId}
                              >
                                {institute.name}
                              </option>
                            );
                          })}
                        </Input>
                        <FormFeedback>
                          {validator.current.message("instituteId", instituteId, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Batch
                        </label>
                        <InputControl
                          type="react-select"
                          isMulti
                          options={batches}
                          name="selectedBatches"
                          value={
                            batches.length > 0 &&
                            batches.filter((item) => selectedBatches.indexOf(item.value) > -1)
                          }
                          isValid={
                            !validator.current.message(
                              "selectedBatches",
                              selectedBatches,
                              "required"
                            )
                          }
                          onChange={(e) => onSelectChange(e, "selectedBatches")}
                        />
                        <div className="text-danger">
                          {validator.current.message(
                            "selectedBatches",
                            selectedBatches,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
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
                            setStudent((draft) => {
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
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Last Name
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="lastName"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => {
                            setStudent((draft) => {
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
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Gender
                        </label>
                        <Input
                          value={gender}
                          id="first-name-vertical"
                          name="gender"
                          type="select"
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.gender = parseInt(e.target.value, 10);
                            });
                          }}
                          invalid={validator.current.message("gender", gender, "required")}
                        >
                          <option value="">---Select---</option>
                          <option value={0}>Male</option>
                          <option value={1}>Female</option>
                        </Input>
                        <FormFeedback>
                          {validator.current.message("gender", gender, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Email
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="emailAddress"
                          placeholder="Email Address"
                          value={emailAddress}
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.emailAddress = e.target.value;
                            });
                          }}
                          invalid={validator.current.message(
                            "Email",
                            emailAddress,
                            "required|email"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("Email", emailAddress, "required|email")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Qualification
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="qualification"
                          placeholder="Qualification"
                          value={qualification}
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.qualification = e.target.value;
                            });
                          }}
                          invalid={validator.current.message(
                            "qualification",
                            qualification,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("qualification", qualification, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-info-vertical">
                          Date of birth
                        </label>
                        <InputControl
                          type="date"
                          name="dateofBirth"
                          max={moment(new Date(), "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD")}
                          value={moment(dateOfBirth, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD")}
                          onChange={onChangeDate}
                          invalid={validator.current.message(
                            "date Of Birth",
                            dateOfBirth,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("date Of Birth", dateOfBirth, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Mobile
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="mobile"
                          placeholder="mobile"
                          value={mobile}
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.mobile = e.target.value;
                            });
                          }}
                          invalid={validator.current.message("mobile", mobile, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("mobile", mobile, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Region
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="region"
                          placeholder="region"
                          value={region}
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.region = e.target.value;
                            });
                          }}
                          invalid={validator.current.message("region", region, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("region", region, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-status-vertical">
                          Status
                        </label>
                        <Input
                          value={userStatus}
                          id="first-status-vertical"
                          name="status"
                          type="select"
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.userStatus = parseInt(e.target.value, 10);
                            });
                          }}
                          invalid={validator.current.message("Status", userStatus, "required")}
                        >
                          <option value="">---Select---</option>
                          <option value={0}>Active</option>
                          <option value={1}>Inactive</option>
                          <option value={2}>Pending Invite</option>
                          <option value={3}>Invited</option>
                        </Input>
                        <FormFeedback>
                          {validator.current.message("Status", userStatus, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Courses*
                        </label>
                        <InputControl
                          type="react-select"
                          isMulti
                          options={courses}
                          name="selectedCourses"
                          value={
                            selectedCourses.length > 0 &&
                            courses.filter((item) => selectedCourses.indexOf(item.value) > -1)
                          }
                          isValid={
                            !validator.current.message(
                              "selectedCourses",
                              selectedCourses,
                              "required"
                            )
                          }
                          onChange={(e) => onSelectChange(e, "selectedCourses")}
                        />
                        <div className="text-danger">
                          {validator.current.message(
                            "assessmentStatus",
                            selectedCourses,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-end">
                    <LoadingButton
                      isLoading={createStudent.isLoading || editStudent.isLoading}
                      className="me-1 mb-1"
                      color="success"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      Save
                    </LoadingButton>
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
