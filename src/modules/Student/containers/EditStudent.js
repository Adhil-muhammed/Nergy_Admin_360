import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import Datetime from "react-datetime";
import React from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import moment from "moment";

export const EditStudent = (props) => {
  const { student, setStudent, editStudent, batchesQuery, institutesQuery, onEdit, courses } =
    props;
  const {
    instituteId,
    batchId,
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
  } = student;
  console.log("selectedCourses", selectedCourses, "courses", courses);

  const dateOfBirthVal = moment(dateOfBirth, "YYYY-MM-DD");

  const selectedCoursesArray = selectedCourses
    ? courses.filter((el) => {
        return selectedCourses.some((f) => {
          return f === el.courseId;
        });
      })
    : [];

  let { studentUserId } = useParams();

  React.useEffect(() => {
    if (studentUserId) {
      onEdit(studentUserId);
    }
  }, [onEdit, studentUserId]);

  const onDateOfBirthChange = (m) => {
    const date = m.format("YYYY-MM-DD").toString();
    setStudent((draft) => {
      draft.dateOfBirth = date;
    });
  };

  const onSubmit = () => {
    editStudent.mutate(student);
  };

  return (
    <ContentLayout title={"Update"}>
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-12">
            <form className="form form-vertical">
              <div className="form-body">
                <div className="col-12">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Registration Id</label>
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
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Institute</label>
                        <Input
                          value={instituteId}
                          id="first-name-vertical"
                          name="select"
                          type="select"
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.instituteId = e.target.value;
                            });
                          }}
                        >
                          <option value={-1}>---Select---</option>
                          {institutesQuery.data.map((institute) => {
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
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Batch</label>
                        <Input
                          value={batchId}
                          id="first-name-vertical"
                          name="select"
                          type="select"
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.batchId = e.target.value;
                            });
                          }}
                        >
                          <option value={-1}>---Select---</option>
                          {batchesQuery.data.map((batch) => {
                            return (
                              <option key={`batch_${batch.batchId}`} value={batch.batchId}>
                                {batch.name}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">First Name</label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="firstname"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.firstName = e.target.value;
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Last Name</label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="lastname"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.lastName = e.target.value;
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Gender</label>
                        <Input
                          value={gender}
                          id="first-name-vertical"
                          name="select"
                          type="select"
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.gender = e.target.value;
                            });
                          }}
                        >
                          <option value={-1}>---Select---</option>
                          <option value={0}>Male</option>
                          <option value={1}>Female</option>
                        </Input>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Email</label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="email"
                          placeholder="Email Address"
                          value={emailAddress}
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.emailAddress = e.target.value;
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Qualification</label>
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
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-info-vertical">Date of birth</label>
                        <Datetime
                          dateformat="YYYY-MM-DD"
                          timeformat="{false}"
                          name="dateofbirth"
                          selected={dateOfBirthVal}
                          value={dateOfBirthVal}
                          onChange={onDateOfBirthChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Mobile</label>
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
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Region</label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="mobile"
                          placeholder="mobile"
                          value={region}
                          onChange={(e) => {
                            setStudent((draft) => {
                              draft.region = e.target.value;
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Courses</label>
                        <Select
                          closeMenuOnSelect={false}
                          defaultValue={selectedCoursesArray}
                          isMulti
                          options={courses}
                          onChange={(selectedOption) => {
                            setStudent((draft) => {
                              draft.selectedCourses = selectedOption.map((o) => {
                                return parseInt(o.value, 10);
                              });
                            });
                          }}
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
                      Click Me
                    </Button>
                    <button type="reset" className="btn btn-light-secondary me-1 mb-1">
                      Reset
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
