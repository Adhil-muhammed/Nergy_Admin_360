import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentLayout, ModalLayout, LoadingButton, LoadingSpinner } from "shared/components";
import { Input, Button, FormFeedback } from "reactstrap";
import { SectionList } from "..";
import { useCourse } from "../hooks";
import { QuillEditor } from "shared/components/QuillEditor";
import SimpleReactValidator from "simple-react-validator";

export const EditCourse = () => {
  const { courseId } = useParams();
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

  const {
    courseSection,
    course,
    setCourse,
    createCourse,
    editCourse,
    courseInfo,
    onToggleModal,
    isConfirmDelete,
    onSectionDelete,
    deleteCourseSection
  } = useCourse({
    load: false,
    courseId: courseId,
  });
  console.log('courseSection: ', courseSection);

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setCourse((draft) => {
      draft[name] = value;
    });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setCourse((draft) => {
      draft[name] = file;
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
      editCourse.mutate(course);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };


  const onCancel = () => {
    navigate("..", { replace: true });
  };

  const onConfirm = () => {
    deleteCourseSection.mutate(courseSection.sectionId)
  };

  if (courseInfo.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Edit Course"}
      subtitle={"Update"}
      breadcrumb={[
        { label: "Courses", location: "/admin/courses" },
        { label: "Edit Course" },
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
                        />
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
                  <div className="col-12 mt-4">
                    <SectionList
                      sections={course.courseSections ? course.courseSections : []}
                      courseId={courseId}
                      onSectionDelete={onSectionDelete}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-between mt-4">
                    <div>
                      <Button
                        className="me-1 mb-1"
                        color="primary"
                        onClick={() => navigate(`../section/create?courseId=${courseId}`)}
                      >
                        Add Section
                      </Button>
                    </div>
                    <div>
                      <LoadingButton
                        isLoading={createCourse.isLoading || editCourse.isLoading}
                        className="me-1 mb-1"
                        color="success"
                        onClick={() => {
                          onSubmit(false);
                        }}
                      >
                        {"Update"}
                      </LoadingButton>
                      <button
                        disabled={createCourse.isLoading || editCourse.isLoading}
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

      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${courseSection.title}?`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
