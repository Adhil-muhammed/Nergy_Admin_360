import React, { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContentLayout } from "shared";
import { Input, FormFeedback, Label } from "reactstrap";
import { CourseContentModal } from "..";
import { LoadingButton } from "shared/components/LoadingButton";
import InputControl from "shared/components/InputControl";
import { useContent } from "../hooks";
import SimpleReactValidator from "simple-react-validator";

export const AddContent = () => {
  const [searchParams] = useSearchParams();

  const sectionId = searchParams.get("sectionId");
  const courseId = searchParams.get("courseId");

  const navigate = useNavigate();

  const { createCourseContent, courseContent, setCourseContent } = useContent({
    contentId: 0,
    sectionId,
    courseId,
  });

  const [update, forceUpdate] = useState();

  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const handleUpload = (e, isContent = false) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (isContent) {
      setCourseContent((draft) => {
        draft[name] = file;
      });
    } else {
      setCourseContent((draft) => {
        draft[name] = file;
      });
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCourseContent((draft) => {
      draft[name] = value;
    });
  };

  const onSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (validator.current.allValid()) {
      createCourseContent.mutate(courseContent);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onCancel = () => {
    navigate(`../section/edit?sectionId=${sectionId}&courseId=${courseId}`, { replace: true });
  };

  return (
    <ContentLayout
      title={"Content Section"}
      subtitle="Create new Content"
      breadcrumb={[
        { label: "Courses", location: "/admin/course/section" },
        { label: "Edit Courses", location: `../${courseId}` },
        {
          label: "Edit Section",
          location: `../section/edit?sectionId=${sectionId}&courseId=${courseId}`,
        },
        { label: "Create Content" },
      ]}
    >
      <div>
        <form className="form">
          <div className="form-body">
            <div className="col-sm-6">
              <div className="form-group">
                <InputControl
                  label="Title"
                  name="title"
                  placeholder="Title"
                  value={courseContent.title}
                  onChange={(e) => onChangeHandler(e, true)}
                  invalid={validator.current.message("name", courseContent.title, "required")}
                />
                <FormFeedback>
                  {validator.current.message("Title", courseContent.title, "required")}
                </FormFeedback>
              </div>
              <div className="form-group">
                <label className="mb-2" htmlFor="first-name-vertical">
                  Content Type
                </label>
                <Input
                  value={courseContent.contentType}
                  id="first-name-vertical"
                  name="contentType"
                  type="select"
                  onChange={(e) => {
                    setCourseContent((draft) => {
                      draft.contentType = parseInt(e.target.value, 10);
                    });
                  }}
                  invalid={validator.current.message(
                    "contentType",
                    courseContent.contentType,
                    "required"
                  )}
                >
                  <option value={-1}>---Select---</option>
                  <option value={0}>PDF</option>
                  <option value={1}>Video</option>
                  <option value={2}>Video Link</option>
                  <option value={3}>External Link</option>
                </Input>
                <FormFeedback>
                  {validator.current.message("contentType", courseContent.contentType, "required")}
                </FormFeedback>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                {(courseContent.contentType === 3 || courseContent.contentType === 2) && (
                  <InputControl
                    label="Content/File URL"
                    name="fileName"
                    placeholder="Content/File URL"
                    onChange={(e) => onChangeHandler(e, true)}
                  />
                )}
                {(courseContent.contentType === 0 || courseContent.contentType === 1) && (
                  <>
                    <InputControl
                      label="File"
                      type="file"
                      placeholder="File"
                      name="contentFile"
                      onChange={(e) => handleUpload(e, true)}
                      invalid={validator.current.message(
                        "ContentFile",
                        courseContent.contentFile,
                        "required"
                      )}
                    />
                    <FormFeedback>
                      {validator.current.message(
                        "ContentFile",
                        courseContent.contentFile,
                        "required"
                      )}
                    </FormFeedback>
                  </>
                )}
              </div>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <LoadingButton className="me-1 mb-1" color="success" onClick={(e) => onSubmit(e)}>
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
    </ContentLayout>
  );
};
