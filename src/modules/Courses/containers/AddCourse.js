import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentLayout, ModalLayout } from "shared/components";
import { Input, FormFeedback } from "reactstrap";
import { useCourse } from "../hooks";
import { QuillEditor } from "shared/components/QuillEditor";
import SimpleReactValidator from "simple-react-validator";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";
import InputControl from "shared/components/InputControl";

export const AddCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const contentValidator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const { course, setCourse, createCourse, coursesTypeQuery } = useCourse({
    load: false,
    courseId: courseId,
  });
  const { data: courseTypeData } = coursesTypeQuery;

  const courseTypeList = React.useMemo(() => {
    return courseTypeData
      ? courseTypeData.map((p) => {
          return { value: p.value, label: p.name };
        })
      : [];
  }, [courseTypeData]);

  const onSelectChange = (e, name) => {
    const { value } = e;
    setCourse((draft) => {
      draft[name] = value;
    });
  };

  const onHandleChange = (e, isContent = false) => {
    const { name, value } = e.target;
    setCourse((draft) => {
      draft[name] = value;
    });
  };

  const handleUpload = (e, isContent = false) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const objectUrl = URL.createObjectURL(file);
    setCourse((draft) => {
      draft[name] = file;
      draft.courseImageURL = objectUrl;
    });
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setCourse((draft) => {
      draft[name] = checked;
    });
  };

  const onSubmit = () => {
    if (validator.current.allValid()) {
      createCourse.mutate(course);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onCancel = () => {
    navigate("..", { replace: true });
  };

  const selectedCourseType = courseTypeList.find((c) => c.value === course.courseType);

  return (
    <ContentLayout
      title={"Courses"}
      subtitle={"Create new"}
      breadcrumb={[{ label: "Courses", location: "/courses" }, { label: "Create" }]}
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
                          Name*
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="name"
                          placeholder="Course Name"
                          value={course.name}
                          onChange={onHandleChange}
                          invalid={validator.current.message("Name", course.name, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("Name", course.name, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="courseImageFile" className="form-label">
                            Course image*
                          </label>
                          <Input
                            id="courseImageFile"
                            type="file"
                            className="form-control"
                            name="courseImageFile"
                            accept=".jpeg, .png, .jpg, .JPG, .JPEG, .PNG"
                            onChange={handleUpload}
                            invalid={validator.current.message(
                              "courseImageFile",
                              course.courseImageFile,
                              "required"
                            )}
                          />
                          <FormFeedback>
                            {validator.current.message("Image", course.courseImageFile, "required")}
                          </FormFeedback>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <img style={{ height: "70px" }} src={course.courseImageURL} />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="first-description-vertical" className="mb-2">
                          Description*
                        </label>
                        <QuillEditor
                          value={course.description}
                          onChange={(value) =>
                            setCourse((draft) => {
                              draft.description = value;
                            })
                          }
                        />
                        <div className="text-danger">
                          {validator.current.message("Description", course.description, "required")}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="Instructions" className="mb-2">
                          Instructions*
                        </label>
                        <QuillEditor
                          value={course.instructions}
                          onChange={(value) =>
                            setCourse((draft) => {
                              draft.instructions = value;
                            })
                          }
                        />
                        <div className="text-danger">
                          {validator.current.message(
                            "Instructions",
                            course.instructions,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-programId-vertical">
                          Course Type
                        </label>
                        <InputControl
                          type="react-select"
                          options={courseTypeList}
                          name="courseType"
                          value={selectedCourseType}
                          isValid={
                            !validator.current.message("courseType", course.courseType, "required")
                          }
                          onChange={(e) => onSelectChange(e, "courseType")}
                        />
                        <div className="text-danger">
                          {validator.current.message("courseType", course.courseType, "required")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="form-check form-check-inline">
                      <label htmlFor="first-exam-vertical">Has Exam</label>
                      <Input
                        type="checkbox"
                        id="first-exam-vertical"
                        className="form-check-input"
                        name="hasExam"
                        checked={course.hasExam}
                        onChange={handleChecked}
                      />
                    </div>
                    <div className="form-check form-check-inline">
                      <label htmlFor="first-content-vertical">Is Content Enabled</label>
                      <Input
                        type="checkbox"
                        id="first-content-vertical"
                        className="form-check-input"
                        name="isContentEnabled"
                        checked={course.isContentEnabled}
                        onChange={handleChecked}
                      />
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-between mt-4">
                    <div>
                      <LoadingButton
                        isLoading={createCourse.isLoading}
                        className="me-1 mb-1"
                        color="success"
                        onClick={() => {
                          onSubmit(false);
                        }}
                      >
                        {"Save & close"}
                      </LoadingButton>
                      <button
                        disabled={createCourse.isLoading}
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
            </form>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
