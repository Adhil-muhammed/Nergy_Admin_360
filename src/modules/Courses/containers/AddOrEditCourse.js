import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentLayout, ModalLayout } from "shared/components";
import { Input, Button, Table, FormFeedback } from "reactstrap";
import { CourseContentModal } from "..";
import { useCourse } from "../hooks";
import InputControl from "shared/components/InputControl";
import { QuillEditor } from "shared/components/QuillEditor";
import SimpleReactValidator from "simple-react-validator";

export const AddOrEditCourse = (props) => {
  const { courseId } = useParams();
  const editMode = courseId > 0;
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const {
    course,
    setCourse,
    createCourse,
    editCourse,
    courseInfo,
    isModalOpen,
    setIsModalOpen,
    courseContents,
    setCourseContent,
    createCourseContent,
    courseContent,
    onDelete,
    onToggleModal,
    isConfirmDelete,
    deleteCourseContent,
  } = useCourse({
    load: false,
    courseId: courseId,
  });
  const navigate = useNavigate();

  const onHandleChange = (e, isContent = false) => {
    const { name, value } = e.target;
    if (isContent) {
      setCourseContent((draft) => {
        draft[name] = value;
      });
    } else {
      setCourse((draft) => {
        draft[name] = value;
      });
    }
  };
  const handleUpload = (e, isContent = false) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (isContent) {
      setCourseContent((draft) => {
        draft[name] = file;
      });
    } else {
      setCourse((draft) => {
        draft[name] = file;
      });
    }
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setCourse((draft) => {
      draft[name] = checked;
    });
  };

  const handleContentChecked = (e) => {
    const { name, checked } = e.target;
    setCourseContent((draft) => {
      draft[name] = checked;
      draft.fileName = name === "isExternal" ? "" : draft.fileName;
      draft.contentFile = name === "isExternal" ? null : draft.contentFile;
    });
  };

  const onSubmit = (isContent = false) => {
    if (validator.current.allValid()) {
      if (isContent) {
        createCourseContent.mutate({ ...courseContent, courseId });
        setIsModalOpen(false);
      } else {
        editMode ? editCourse.mutate(course) : createCourse.mutate(course);
      }
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onCancel = () => {
    navigate("..", { replace: true });
  };

  const onConfirm = () => {
    deleteCourseContent.mutate(courseContents.contentId);
  };

  return (
    <ContentLayout
      title={"Courses"}
      subtitle={editMode ? "Update" : "Create new"}
      isLoading={courseInfo.isLoading}
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
                          // invalid={validator.current.message(
                          //   "File",
                          //   course.courseImageFile,
                          //   "required"
                          // )}
                        />
                        {/* <FormFeedback>
                          {validator.current.message("File", course.courseImageFile, "required")}
                        </FormFeedback> */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="first-description-vertical" className="mb-2">
                          Description
                        </label>
                        <QuillEditor
                          value={course.description}
                          onChange={(value) =>
                            setCourse((draft) => {
                              draft.description = value;
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="Instructions" className="mb-2">
                          Instructions
                        </label>
                        <QuillEditor
                          value={course.instructions}
                          onChange={(value) =>
                            setCourse((draft) => {
                              draft.instructions = value;
                            })
                          }
                        />
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
                        value={course.hasExam}
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
                        value={course.isContentEnabled}
                        checked={course.isContentEnabled}
                        onChange={handleChecked}
                      />
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    {course.courseContents.length > 0 && (
                      <Table responsive size="">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>File name</th>
                            <td>Thumbnail</td>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {course.courseContents?.map((content, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{content.title}</td>
                                {/* <td>{content.fileName}</td>
                                <td>
                                  {content.fileURL ? (
                                    <img src={content.fileURL} style={{ height: "40px" }} />
                                  ) : (
                                    <span>No thumbnail</span>
                                  )}
                                </td> */}
                                <td>
                                  {content.fileName && !content.isExternal ? (
                                    <span>{content.fileName}</span>
                                  ) : (
                                    <a href={content.fileName} target="_blank">
                                      {content.fileName}
                                    </a>
                                  )}
                                </td>
                                <td>
                                  {content.fileURL && !content.isVideo ? (
                                    <img src={content.fileURL} style={{ height: "40px" }} />
                                  ) : content.fileURL && content.isVideo ? (
                                    <video controls width="240" height="">
                                      <source src={content.fileURL} type="video/mp4"></source>
                                    </video>
                                  ) : content.fileURL && content.isVideo && content.isExternal ? (
                                    <iframe
                                      width="240"
                                      height=""
                                      frameborder="0"
                                      src={content.fileURL}
                                    ></iframe>
                                  ) : (
                                    <span>No files</span>
                                  )}
                                </td>
                                <td>
                                  {/* <Button
                                    color="primary"
                                    className="mt-4 me-3"
                                    // disabled={courseContent.length < 2}
                                    onClick={() => onEditContent(index)}
                                  >
                                    Edit
                                  </Button> */}
                                  <Button
                                    color="danger"
                                    className="mt-4"
                                    // disabled={courseContent.length < 2}
                                    onClick={() => onDelete(content.contentId, true)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    )}
                  </div>
                  <div className="col-12 d-flex justify-content-between mt-4">
                    {editMode && (
                      <div>
                        <Button
                          className="me-1 mb-1"
                          color="primary"
                          onClick={() => setIsModalOpen(true)}
                        >
                          Add course content
                        </Button>
                      </div>
                    )}
                    <div>
                      <Button
                        className="me-1 mb-1"
                        color="success"
                        onClick={() => {
                          onSubmit(false);
                        }}
                      >
                        {editMode ? "Update" : "Save & close"}
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
              </div>
            </form>
          </div>
        </div>
      </section>

      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${courseContents.title}?`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />

      {editMode && (
        <CourseContentModal
          size={"lg"}
          isOpen={isModalOpen}
          title={"Add course content"}
          onSave={() => {
            onSubmit(true);
          }}
          onCancel={() => setIsModalOpen(false)}
        >
          <form className="form">
            <div className="form-body">
              <InputControl
                label="Title"
                name="title"
                placeholder="Title"
                value={courseContent.title}
                onChange={(e) => onHandleChange(e, true)}
              />
              {courseContent.isExternal === true && (
                <InputControl
                  label="Content/File URL"
                  name="fileName"
                  placeholder="Content/File URL"
                  value={courseContent.fileName}
                  onChange={(e) => onHandleChange(e, true)}
                />
              )}
              {courseContent.isExternal === false && (
                <InputControl
                  label="File"
                  type="file"
                  placeholder="File"
                  name="contentFile"
                  onChange={(e) => handleUpload(e, true)}
                />
              )}

              <div className="mt-4">
                <div className="form-check form-check-inline">
                  <label htmlFor="isVideo">Video</label>
                  <Input
                    type="checkbox"
                    id="isVideo"
                    className="form-check-input"
                    name="isVideo"
                    value={courseContent.isVideo}
                    checked={courseContent.isVideo}
                    onChange={handleContentChecked}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="form-check form-check-inline">
                  <label htmlFor="isExternal">Is an external link</label>
                  <Input
                    type="checkbox"
                    id="isExternal"
                    className="form-check-input"
                    name="isExternal"
                    value={courseContent.isExternal}
                    checked={courseContent.isExternal}
                    onChange={handleContentChecked}
                  />
                </div>
              </div>
            </div>
          </form>
        </CourseContentModal>
      )}
    </ContentLayout>
  );
};
