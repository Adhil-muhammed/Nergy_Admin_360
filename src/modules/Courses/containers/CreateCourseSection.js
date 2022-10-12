import React, { useRef, useState } from "react";
import { useNavigate, useSearchParams, } from "react-router-dom";
import { Input, FormFeedback, Label } from "reactstrap";
import { ContentLayout, } from "shared";
import { LoadingButton } from "shared/components/LoadingButton";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import SimpleReactValidator from "simple-react-validator";
import { useCourseSection } from "../hooks";

export const CreateCourseSection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const courseId = searchParams.get("courseId");

  const [update, forceUpdate] = useState();
  const { createCourseSections, setCourseSection, courseSection, } =
    useCourseSection({
      load: false,
      courseSectionId: 0,
      sections: [],
      courseId,
    });

  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCourseSection((draft) => {
      draft[name] = value;
    });
  };

  const onCheckBoxChangeHandler = (e) => {
    const { name } = e.target;
    setCourseSection((draft) => {
      draft[name] = !draft[name];
    });
  };

  const onSubmit = () => {
    if (validator.current.allValid()) {
      createCourseSections.mutate(courseSection);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  if (courseSection.isLoading) {
    return <LoadingSpinner />;
  }

  const onCancel = () => {
    navigate("..", { replace: true });
  };

  return (
    <>
      <ContentLayout
        title={"Course Sections"}
        subtitle="Create new Section"
        breadcrumb={[{ label: "Courses", location: "/admin/course/section" }, { label: "Create" }]}
      ></ContentLayout>
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
                          Name
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="title"
                          placeholder="Name"
                          value={courseSection.title}
                          onChange={onChangeHandler}
                          invalid={validator.current.message(
                            "name",
                            courseSection.title,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("name", courseSection.title, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-description-vertical">
                          Description
                        </label>
                        <Input
                          type="text"
                          id="first-description-vertical"
                          className="form-control"
                          name="description"
                          placeholder="Description"
                          value={courseSection.description}
                          onChange={onChangeHandler}
                          invalid={validator.current.message(
                            "description",
                            courseSection.description,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message(
                            "description",
                            courseSection.description,
                            "required"
                          )}
                        </FormFeedback>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-description-vertical">
                          Sort Order
                        </label>
                        <Input
                          type="text"
                          id="first-description-vertical"
                          className="form-control"
                          name="sortOrder"
                          placeholder="Sortorder"
                          value={courseSection.sortOrder}
                          onChange={onChangeHandler}
                          invalid={validator.current.message(
                            "sortorder",
                            courseSection.sortOrder,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message(
                            "sortorder",
                            courseSection.sortOrder,
                            "required"
                          )}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <Input
                          type="checkbox"
                          name="isEnable"
                          onChange={onCheckBoxChangeHandler}
                          value={courseSection.isEnable}
                          checked={courseSection.isEnable}
                        />
                        <Label check>Enabled</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <LoadingButton
                    className="me-1 mb-1"
                    color="success"
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    Create
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
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
