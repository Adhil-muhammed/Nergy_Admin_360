import React, { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContentLayout } from "shared";
import { Input, FormFeedback, Label } from "reactstrap";
import { CourseContentModal } from "..";
import { LoadingButton } from "shared/components/LoadingButton";
import InputControl from "shared/components/InputControl";
import { useContent } from "../hooks";
import SimpleReactValidator from "simple-react-validator";

export const EditContent = () => {
    const [searchParams] = useSearchParams();

    const sectionId = searchParams.get("sectionId");
    const contentId = searchParams.get("contentId");
    const navigate = useNavigate();

    const { editCourseContent, courseContent, setCourseContent } = useContent({
        contentId,
        sectionId,
    });
    // const [update, forceUpdate] = useState();

    // const validator = useRef(
    //   new SimpleReactValidator({
    //     autoForceUpdate: { forceUpdate: forceUpdate },
    //   })
    // );

    const handleContentChecked = (e) => {
        const { name, checked } = e.target;
        setCourseContent((draft) => {
            draft[name] = checked;
            draft.fileName = name === "isExternal" ? "" : draft.fileName;
        });
    };

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

    const onSubmit = () => {
        //if (validator.current.allValid()) {
        editCourseContent.mutate(courseContent);
        // } else {
        //   validator.current.showMessages();
        //   forceUpdate(1);
        // }
    };

    const onCancel = () => {
        navigate("..", { replace: true });
    };

    return (
        <ContentLayout
            title={"Conent Section"}
            subtitle="Create new Content"
            breadcrumb={[{ label: "Content", location: "/" }, { label: "Create" }]}
        >
            <div>
                <form className="form">
                    <div className="form-body">
                        <InputControl
                            label="Title"
                            name="title"
                            placeholder="Title"
                            value={courseContent.title}
                            onChange={(e) => onChangeHandler(e, true)}
                        //invalid={validator.current.message("name", courseContent.title, "required")}
                        />
                        <FormFeedback>
                            {/* {validator.current.message("Title", courseContent.title, "required")} */}
                        </FormFeedback>
                        {courseContent.isExternal === true && (
                            <InputControl
                                label="Content/File URL"
                                name="filefileURL"
                                placeholder="Content/File URL"
                                onChange={(e) => onChangeHandler(e, true)}
                            />
                        )}
                        {courseContent.isExternal === false && (
                            <>
                                <InputControl
                                    label="File"
                                    type="file"
                                    placeholder="File"
                                    name="fileName"
                                    onChange={(e) => handleUpload(e, true)}
                                // invalid={validator.current.message(
                                //   "ContentFile",
                                //   courseContent.fileName,
                                //   "required"
                                // )}
                                />
                                <FormFeedback>
                                    {/* {validator.current.message("ContentFile", courseContent.fileURL, "required")} */}
                                </FormFeedback>
                            </>
                        )}
                        <div className="mt-4">
                            <div className="form-check form-check-inline">
                                <label htmlFor="isExternal">Is an external link</label>
                                <Input
                                    type="checkbox"
                                    id="isExternal"
                                    className="form-check-input"
                                    name="isExternal"
                                    checked={courseContent.isExternal}
                                    onChange={handleContentChecked}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="form-check form-check-inline">
                                <label htmlFor="isVideo">Video</label>
                                <Input
                                    type="checkbox"
                                    id="isVideo"
                                    className="form-check-input"
                                    name="isVideo"
                                    checked={courseContent.isVideo}
                                    onChange={handleContentChecked}
                                />
                            </div>
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                            <LoadingButton className="me-1 mb-1" color="success" onClick={() => onSubmit()}>
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
        </ContentLayout >
    );
};
