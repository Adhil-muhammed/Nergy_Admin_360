import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export const EditCourse = (props) => {
  const history = useNavigate();
  const location = useLocation();
  const { course, setCourse, editCourse, onEdit } = props;
  const { name, description, instructions, hasExam, isContentEnabled } = course;
  let { courseId } = useParams();

  React.useEffect(() => {
    if (courseId) {
      onEdit(parseInt(courseId.toString(), 10));
    }
  }, [courseId, onEdit]);

  const onSubmit = () => {
    editCourse.mutate(course);
  };
  const onCancel = () => {
    history(`${location.pathname}`.replace(`/edit/${courseId}`,""));
  };

  return (
    <ContentLayout title={"Update"}>
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-md-6 col-12">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <form className="form form-vertical">
                    <div className="form-body">
                      <div className="row">
                      <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical">Name</label>
                            <Input
                              type="text"
                              id="first-name-vertical"
                              className="form-control"
                              name="name"
                              placeholder="Course Name"
                              value={name}
                              onChange={(e) => {
                                setCourse((draft) => {
                                  draft.name = e.target.value;
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="first-description-vertical">Description</label>
                            <Input
                              type="text"
                              id="first-description-vertical"
                              className="form-control"
                              name="description"
                              placeholder="Description"
                              value={description}
                              onChange={(e) => {
                                setCourse((draft) => {
                                  draft.description = e.target.value;
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="first-instruction-vertical">Instructions</label>
                            <Input
                              type="text"
                              id="first-instruction-vertical"
                              className="form-control"
                              name="instructions"
                              placeholder="Instructions"
                              value={instructions}
                              onChange={(e) => {
                                setCourse((draft) => {
                                  draft.instructions = e.target.value;
                                });
                              }}
                            />
                          </div>
                          <div className="form-check">
                            <label htmlFor="first-exam-vertical">Has Exam</label>
                            <Input
                              type="checkbox"
                              id="first-exam-vertical"
                              className="form-check-input"
                              name="hasExam"
                              checked={hasExam}
                              onChange={(e) => {
                                setCourse((draft) => {
                                  draft.hasExam = e.target.checked;
                                });
                              }}
                            />
                          </div>
                          <div className="form-check">
                            <label htmlFor="first-content-vertical">Is Content Enabled</label>
                            <Input
                              type="checkbox"
                              id="first-content-vertical"
                              className="form-check-input"
                              name="isContentEnabled"
                              checked={isContentEnabled}
                              onChange={(e) => {
                                setCourse((draft) => {
                                  draft.isContentEnabled = e.target.checked;
                                });
                              }}
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
                          <button type="reset" className="btn btn-light-secondary me-1 mb-1"
                            onClick={() => {
                              onCancel();
                            }}>
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
