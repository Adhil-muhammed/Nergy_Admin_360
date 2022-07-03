import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ContentLayout } from "shared/components";
import { Input, Button, Table } from "reactstrap";
import { CourseContentModal, useCourse } from "..";
import { useQuery } from "react-query";
import { Axios } from "utils";
import { useImmer } from "use-immer";

export const CreateCourse = (props) => {
  const { createCourse, editCourse } = props;

  const [course, setCourse] = useImmer({
    courseId: 0,
    name: "",
    description: "",
    instructions: "",
    certificateFile: "",
    hasExam: false,
    isContentEnabled: false,
    courseImageFile: "",
    courseContentFile: "",
  });

  const [courseContent, setCourseContent] = useImmer([
    {
      courseId: 0,
      title: "",
      contentFile: "",
      fileName: "",
    },
  ]);

  const { isModalOpen, setIsModalOpen, createCourseContent } = useCourse();
  const { courseId } = useParams();
  const updateMode = courseId !== undefined ? true : false;

  console.log("C_ID: ", courseId);

  const getCourseById = async () => {
    const res = await Axios.get(`/Courses/${courseId}`);
    console.log("C_byID", res.data);
    setCourse((draft) => {
      // draft = res.data;
      draft.courseId = res.data.courseId;
      draft.name = res.data.name;
      draft.description = res.data.description;
      draft.instructions = res.data.instructions;
      draft.hasExam = res.data.hasExam;
      draft.isContentEnabled = res.data.isContentEnabled;
      return draft;
    });
  };

  const { isIdle, data } = useQuery(["details", courseId], getCourseById, {
    enabled: !!courseId,
  });

  console.log("COURSE_STATE: ", course);

  const onHandleChange = (e, index, isContent = false) => {
    const { name, value } = e.target;
    if (isContent) {
      setCourseContent((draft) => {
        draft[index][name] = value;
      });
    } else {
      setCourse((draft) => {
        draft[name] = value;
      });
    }
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setCourse((draft) => {
      draft[name] = checked;
    });
  };

  const handleUpload = (e, index, isContent = false) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (isContent) {
      setCourseContent((draft) => {
        draft[index][name] = file;
      });
    } else {
      setCourse((draft) => {
        draft[name] = file;
      });
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (isContent = false) => {
    if (isContent) {
      createCourseContent.mutate(courseContent);
      setIsModalOpen(false);
    } else {
      updateMode ? editCourse.mutate(course) : createCourse.mutate(course);
    }
  };

  // const onCancel = () => {
  //   // navigate(`${location.pathname}`.replace("/create", ""));
  //   navigate("/courses", { replace: true });
  // };

  const addMoreContent = () => {
    setCourseContent((draft) => {
      draft = [
        ...draft,
        {
          courseId,
          title: "",
          contentFile: "",
          fileName: "",
        },
      ];
      return draft;
    });
  };

  // console.log(courseContent);

  const onRemoveContent = (index) => {
    setCourseContent((draft) => {
      draft = draft.filter((c, idx) => idx !== index);
      return draft;
    });
  };

  return (
    <ContentLayout title={"Courses"} subtitle={updateMode ? "Update" : "Create new"}>
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
                          Name
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="name"
                          placeholder="Course Name"
                          value={course.name}
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="first-description-vertical" className="mb-2">
                          Description
                        </label>
                        <Input
                          type="text"
                          id="first-description-vertical"
                          className="form-control"
                          name="description"
                          placeholder="Description"
                          value={course.description}
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="first-instruction-vertical" className="mb-2">
                          Instructions
                        </label>
                        <Input
                          type="text"
                          id="first-instruction-vertical"
                          className="form-control"
                          name="instructions"
                          placeholder="Instructions"
                          value={course.instructions}
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="courseImageFile" className="form-label">
                          Course image
                        </label>
                        <input
                          id="courseImageFile"
                          type="file"
                          className="form-control"
                          name="courseImageFile"
                          accept=".jpeg, .png, .jpg, .JPG, .JPEG, .PNG"
                          onChange={handleUpload}
                        />
                      </div>
                      {course?.courseImageURL && (
                        <img src={course.courseImageURL} style={{ height: "40px" }} />
                      )}
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
                  <div className="col-12 d-flex justify-content-between mt-4">
                    {updateMode && (
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
                        {updateMode ? "Update" : "Save & close"}
                      </Button>
                      <button
                        type="reset"
                        className="btn btn-light-secondary me-1 mb-1"
                        // onClick={() => {
                        //   onCancel();
                        // }}
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* {data ||
            (!isLoading && (
              <div className="col-12 mt-4">
                <h3>Contents</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>{data.title}</td>
                      <td>{data.title}</td>
                      <td>{data.title}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))} */}
        </div>
      </section>
      {updateMode && (
        <CourseContentModal
          size={"xl"}
          isOpen={isModalOpen}
          title={"Add course content"}
          onSave={() => {
            onSubmit(true);
          }}
          onCancel={() => setIsModalOpen(false)}
        >
          <form className="form">
            <div className="form-body">
              <Table responsive size="">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>File name</th>
                    <th>Content file</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {courseContent?.map((content, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="form-group">
                            <label htmlFor="first-title-vertical" className="mb-2">
                              Title
                            </label>
                            <Input
                              type="text"
                              id="first-title-vertical"
                              className="form-control"
                              name="title"
                              placeholder="Title"
                              value={content.title}
                              onChange={(e) => onHandleChange(e, index, true)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <label htmlFor="first-filename-vertical" className="mb-2">
                              File name
                            </label>
                            <Input
                              type="text"
                              id="first-filename-vertical"
                              className="form-control"
                              name="fileName"
                              placeholder="File name"
                              value={content.fileName}
                              onChange={(e) => onHandleChange(e, index, true)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-group">
                            <label htmlFor="contentFile" className="form-label">
                              Content file
                            </label>
                            <input
                              id="contentFile"
                              type="file"
                              className="form-control"
                              name="contentFile"
                              onChange={(e) => handleUpload(e, index, true)}
                            />
                          </div>
                        </td>
                        <td>
                          <Button
                            color="danger"
                            className="mt-4"
                            disabled={courseContent.length < 2}
                            onClick={() => onRemoveContent(index)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="col-12 d-flex justify-content-start mt-4">
              <Button
                color="primary"
                disabled={courseContent.length > 3}
                onClick={() => {
                  addMoreContent();
                }}
              >
                Add more
              </Button>
            </div>
          </form>
        </CourseContentModal>
      )}
    </ContentLayout>
  );
};
