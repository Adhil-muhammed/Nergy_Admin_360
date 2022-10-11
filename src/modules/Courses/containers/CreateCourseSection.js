import { useQuestion } from "modules/Questions";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input,Button, FormFeedback, Table } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";
import InputControl from "shared/components/InputControl";
import { LoadingButton } from "shared/components/LoadingButton";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import SimpleReactValidator from "simple-react-validator";
import { useCourseSection } from "../hooks";

const CreateCourseSection = () => {
  const {
    createCourseSection,
    setCourseSection,
    courseSection,
    updateCourseSectionById,
}=useCourseSection({
    load: false,
    courseSectionId: id,
  });
  const [update, forceUpdate] = useState();
    const { id } = useParams();
    const validator = useRef(
      new SimpleReactValidator({
        autoForceUpdate: { forceUpdate: forceUpdate },
      })
    );
    const {title, description } = courseSection;
    const navigate = useNavigate();
    const updateMode = id > 0;

    let { sectionId } = useParams();

    const editMode = !!sectionId;



    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setCourseSection((draft) => {
          draft[name] = value;
        });
      };

      const onSubmit = () => {
        if (validator.current.allValid()) {
          updateMode
            ? updateCourseSectionById.mutate(courseSection.data)
            : createCourseSection.mutate(courseSection.data);
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

    return(
    <>
    <ContentLayout
      title={"Course Sections"}
      subtitle={editMode ? "Update" : "Create new"}
      breadcrumb={[
        { label: "Courses", location: "/admin/course/section" },
        { label: `${editMode ? "Edit" : "Create"}` },
      ]}
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
                          name="name"
                          placeholder="Name"
                          value={title}
                          onChange={onChangeHandler}
                          invalid={validator.current.message("name", title, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("name", title, "required")}
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
                          value={description}
                          onChange={onChangeHandler}
                          invalid={validator.current.message(
                            "description",
                            description,
                            "required"
                          )}
                        />
                        <FormFeedback>
                          {validator.current.message("description", description, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <LoadingButton
                    isLoading={updateCourseSectionById.isLoading || createCourseSection.isLoading}
                    className="me-1 mb-1"
                    color="success"
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    {editMode ? "Update" : "Create"}
                  </LoadingButton>
                  <button
                    disabled={updateCourseSectionById.isLoading || createCourseSection.isLoading}
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
  )
};

export default CreateCourseSection;
