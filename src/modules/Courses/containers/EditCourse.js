import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export const EditCourse = (props) => {
  const history = useNavigate();
  const location = useLocation();
  const { course, setCourse, editCourse, onEdit } = props;
  const { name, description, instructions, hasExam, isContentEnabled, courseImage } = course;
  let { courseId } = useParams();

  React.useEffect(() => {
    if (courseId) {
      onEdit(parseInt(courseId.toString(), 10));
    }
  }, [courseId, onEdit]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setCourse((draft) => {
      draft[name] = value;
    });
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setCourse((draft) => {
      draft[name] = checked;
    });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const name = e.target.name
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        const result = evt.target.result
        setCourse((draft) => {
          draft[name] = result
        });
      };
    }
  };

  const onSubmit = () => {
    editCourse.mutate(course);
  };
  const onCancel = () => {
    history(`${location.pathname}`.replace(`/edit/${courseId}`, ""));
  };

  return (
    <ContentLayout title={"Courses"} subtitle={"Update"}>
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
                          value={name}
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
                          value={description}
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
                          value={instructions}
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="courseImage" className="form-label">
                          Course image
                        </label>
                        <input
                          id="courseImage"
                          type="file"
                          className="form-control"
                          name="courseImage"
                          accept=".jpeg, .png, .jpg"
                          onChange={handleUpload}
                        />
                        {courseImage && <img style={{ height: "100px" }} src={courseImage} />}
                        {/* <div style={{fontSize: '10px', width:'400px', height: '40px', overflow: 'auto'}}>{JSON.stringify(courseImage)}</div> */}
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
                        value={hasExam}
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
                        value={isContentEnabled}
                        onChange={handleChecked}
                      />
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
                      Update
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
            </form>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
