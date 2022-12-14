import { useAssessmentSection } from "modules/AssessmentSection/hooks";
import { useBatch } from "modules/Batch";
import { useCourse } from "modules/Courses";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormFeedback, Table } from "reactstrap";
import { ContentLayout } from "shared";
import InputControl from "shared/components/InputControl";
import SimpleReactValidator from "simple-react-validator";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAssessment } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";

export const CreateAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateMode = id > 0;
  const { createAssessment, editAssessment, assessment, setAssessment, assessmentInfo } =
    useAssessment({
      load: false,
      assessmentId: id,
    });
  const { coursesQuery } = useCourse({ load: true });
  const { batchesQuery } = useBatch({ load: true });
  const { assessmentSectionQuery } = useAssessmentSection({ load: true });
  const { data: courses } = coursesQuery;
  const { data: batches } = batchesQuery;
  const { data: assessmentSections } = assessmentSectionQuery;
  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const courseList = React.useMemo(() => {
    return courses
      ? courses.map((c) => {
          return { value: c.courseId, label: c.name };
        })
      : [];
  }, [courses]);

  const batchesList = React.useMemo(() => {
    return batches
      ? batches.map((c) => {
          return { value: c.batchId, label: c.name };
        })
      : [];
  }, [batches]);

  const assessmentSectionList = React.useMemo(() => {
    return assessmentSections
      ? assessmentSections.map((c) => {
          return { value: c.sectionId, label: c.name };
        })
      : [];
  }, [assessmentSections]);

  const onChange = (e, index, isSection) => {
    const { name, value } = e.target;
    if (isSection) {
      setAssessment((draft) => {
        draft.data.assessmentSections[index][name] = value;
      });
    } else {
      setAssessment((draft) => {
        draft.data[name] = value;
      });
    }
  };

  const onSelectChange = (e, name) => {
    if (name === "assessmentBatches") {
      const requiredFormat = e.map((item) => item.value);

      setAssessment((draft) => {
        draft.data[name] = requiredFormat;
      });
    } else {
      const { value } = e;
      setAssessment((draft) => {
        draft.data[name] = value;
      });
    }
  };

  const onSectionDropdownChange = (e, index) => {
    setAssessment((draft) => {
      draft.data.assessmentSections[index].sectionId = e.value;
    });
  };
  const onSubmit = () => {
    if (validator.current.allValid()) {
      updateMode
        ? editAssessment.mutate({
            ...assessment.data,
            assessmentStatus: +assessment.data.assessmentStatus,
          })
        : createAssessment.mutate({
            ...assessment.data,
            assessmentStatus: +assessment.data.assessmentStatus,
          });
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setAssessment((draft) => {
      draft.data[name] = checked;
    });
  };

  const assessmentStatusList = [
    { label: "Draft", value: "0" },
    { label: "Published", value: "1" },
    { label: "Inactive", value: "2" },
  ];

  const onDeleteSection = (index) => {
    setAssessment((draft) => {
      draft.data.assessmentSections = draft.data.assessmentSections.filter(
        (item, i) => i !== index
      );
    });
  };

  const addSection = () => {
    setAssessment((draft) => {
      draft.data.assessmentSections = [
        ...draft.data.assessmentSections,
        { sectionId: "", passMark: "", noOfQuestions: "" },
      ];
    });
  };

  const handleEditorChange = (value, name) => {
    setAssessment((draft) => {
      draft.data[name] = value;
    });
  };

  const onCancel = () => {
    navigate("..", { replace: true });
  };

  if (assessmentInfo.isLoading) {
    return <LoadingSpinner />;
  }

  console.log(assessment.data);

  return (
    <ContentLayout
      subtitle={updateMode ? "Update" : "Create"}
      title={"Assessments"}
      breadcrumb={[
        { label: "Assessments", location: "/assessments" },
        { label: `${updateMode ? "Edit" : "Create"}` },
      ]}
    >
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-12">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <form className="form form-vertical">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical" className="mb-2">
                              Name*
                            </label>
                            <InputControl
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={assessment.data.name}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Name",
                                assessment.data.name,
                                "required"
                              )}
                            />
                            <FormFeedback>
                              {validator.current.message("Name", assessment.data.name, "required")}
                            </FormFeedback>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical" className="mb-2">
                              Course
                            </label>
                            <InputControl
                              type="react-select"
                              options={courseList}
                              name="courseId"
                              value={
                                assessment.data.courseId &&
                                courseList.length > 0 &&
                                courseList.find((c) => c.value === assessment.data.courseId)
                              }
                              isValid={true}
                              onChange={(e) => onSelectChange(e, "courseId")}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical" className="mb-2">
                              Maximum Time*
                            </label>
                            <InputControl
                              type="number"
                              name="maxTime"
                              placeholder="Max time"
                              value={assessment.data.maxTime}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Max time",
                                assessment.data.maxTime,
                                "required"
                              )}
                            />
                            <FormFeedback>
                              {validator.current.message(
                                "Max time",
                                assessment.data.maxTime,
                                "required"
                              )}
                            </FormFeedback>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical" className="mb-2">
                              Maximum Attempt*
                            </label>
                            <InputControl
                              type="number"
                              name="maxAttempt"
                              placeholder="Max Attempt"
                              value={assessment.data.maxAttempt}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Max Attempt",
                                assessment.data.maxAttempt,
                                "required"
                              )}
                            />
                            <FormFeedback>
                              {validator.current.message(
                                "Max Attempt",
                                assessment.data.maxAttempt,
                                "required"
                              )}
                            </FormFeedback>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical" className="mb-2">
                              Number Of Questions*
                            </label>
                            <InputControl
                              type="number"
                              name="noOfQuestions"
                              placeholder="Number of questions"
                              value={assessment.data.noOfQuestions}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Number Of Questions",
                                assessment.data.noOfQuestions,
                                "required"
                              )}
                            />
                            <FormFeedback>
                              {validator.current.message(
                                "Number Of Questions",
                                assessment.data.noOfQuestions,
                                "required"
                              )}
                            </FormFeedback>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical" className="mb-2">
                              Pass Mark*
                            </label>
                            <InputControl
                              type="number"
                              name="passMark"
                              placeholder="passMark"
                              value={assessment.data.passMark}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Pass mark",
                                assessment.data.passMark,
                                "required"
                              )}
                            />
                            <FormFeedback>
                              {validator.current.message(
                                "Pass mark",
                                assessment.data.passMark,
                                "required"
                              )}
                            </FormFeedback>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical" className="mb-2">
                              Assessment Status*
                            </label>
                            <InputControl
                              type="react-select"
                              options={assessmentStatusList}
                              name="assessmentStatus"
                              value={
                                assessment.data.assessmentStatus !== "" &&
                                assessmentStatusList.find(
                                  (c) => c.value == assessment.data.assessmentStatus
                                )
                              }
                              isValid={
                                !validator.current.message(
                                  "assessmentStatus",
                                  assessment.data.assessmentStatus,
                                  "required"
                                )
                              }
                              onChange={(e) => onSelectChange(e, "assessmentStatus")}
                            />
                            <div className="text-danger">
                              {validator.current.message(
                                "assessmentStatus",
                                assessment.data.assessmentStatus,
                                "required"
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical" className="mb-2">
                              Batches*
                            </label>
                            <InputControl
                              type="react-select"
                              options={batchesList}
                              name="assessmentBatches"
                              isMulti
                              value={
                                assessment.data.assessmentBatches?.length > 0 &&
                                batchesList.filter((item) => {
                                  return (
                                    assessment.data.assessmentBatches?.indexOf(item.value) > -1
                                  );
                                })
                              }
                              isValid={
                                !validator.current.message(
                                  "Batches",
                                  assessment.data.assessmentBatches,
                                  "required"
                                )
                              }
                              onChange={(e) => onSelectChange(e, "assessmentBatches")}
                            />
                            <div className="text-danger">
                              {validator.current.message(
                                "Batches",
                                assessment.data.assessmentBatches,
                                "required"
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 mt-4 mb-3">
                          <label htmlFor="first-instructions-vertical" className="mb-2">
                            Instructions
                          </label>
                          <ReactQuill
                            theme="snow"
                            value={assessment.data.instructions}
                            onChange={(e) => handleEditorChange(e, "instructions")}
                          />
                        </div>
                        <div className="col-12 mt-4 mb-3">
                          <label htmlFor="first-help-vertical" className="mb-2">
                            Help
                          </label>
                          <ReactQuill
                            theme="snow"
                            value={assessment.data.help}
                            onChange={(e) => handleEditorChange(e, "help")}
                          />
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <h5 className="mt-3">Sections</h5>
                            <Table>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Section</th>
                                  <th>Passmark</th>
                                  <th>No. of questions</th>

                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {assessment.data.assessmentSections?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <th scope="row">{index + 1}</th>
                                      <td>
                                        <div className="col-6">
                                          <div className="form-group">
                                            <InputControl
                                              type="react-select"
                                              options={assessmentSectionList}
                                              name="sectionId"
                                              value={
                                                assessmentSectionList.length > 0 &&
                                                assessmentSectionList.find(
                                                  (c) => c.value === item.sectionId
                                                )
                                              }
                                              isValid={
                                                !validator.current.message(
                                                  "section",
                                                  item.sectionId,
                                                  "required"
                                                )
                                              }
                                              onChange={(e) => onSectionDropdownChange(e, index)}
                                            />
                                            <div className="text-danger">
                                              {validator.current.message(
                                                "section",
                                                item.sectionId,
                                                "required"
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="col-6">
                                          <div className="form-group">
                                            <InputControl
                                              type="number"
                                              id="first-name-vertical"
                                              className="form-control"
                                              name="passMark"
                                              value={item.passMark}
                                              onChange={(e) => onChange(e, index, true)}
                                              invalid={validator.current.message(
                                                "PassMark",
                                                item.passMark,
                                                "required"
                                              )}
                                            />
                                            <FormFeedback>
                                              {validator.current.message(
                                                "PassMark",
                                                item.passMark,
                                                "required"
                                              )}
                                            </FormFeedback>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="col-6">
                                          <div className="form-group">
                                            <InputControl
                                              type="number"
                                              id="first-name-vertical"
                                              className="form-control"
                                              name="noOfQuestions"
                                              value={item.noOfQuestions}
                                              onChange={(e) => onChange(e, index, true)}
                                              invalid={validator.current.message(
                                                "No of questions",
                                                item.noOfQuestions,
                                                "required"
                                              )}
                                            />
                                            <FormFeedback>
                                              {validator.current.message(
                                                "No of questions",
                                                item.noOfQuestions,
                                                "required"
                                              )}
                                            </FormFeedback>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <Button
                                          color="danger"
                                          disabled={assessment.data.assessmentSections.length < 2}
                                          onClick={() => onDeleteSection(index)}
                                        >
                                          Delete
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end">
                          <Button
                            className="mb-1"
                            color="secondary"
                            onClick={() => {
                              addSection();
                            }}
                          >
                            Add Assessment
                          </Button>
                        </div>

                        <div className="form-group mt-3">
                          <div className="form-check form-check-inline">
                            <label htmlFor="first-content-vertical">isMock</label>
                            <InputControl
                              type="checkbox"
                              id="first-content-vertical"
                              className="form-check-input"
                              name="isMock"
                              checked={assessment.data.isMock}
                              onChange={handleChecked}
                            />
                          </div>
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                          <LoadingButton
                            isLoading={createAssessment.isLoading || editAssessment.isLoading}
                            className="me-1 mb-1"
                            color="success"
                            onClick={() => {
                              onSubmit();
                            }}
                          >
                            {updateMode ? "Update" : "Create"}
                          </LoadingButton>
                          <button
                            disabled={createAssessment.isLoading || editAssessment.isLoading}
                            onClick={() => onCancel()}
                            type="reset"
                            className="btn btn-light-secondary me-1 mb-1"
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
