import { ContentLayout } from "shared/components";
import { Input, FormFeedback } from "reactstrap";
import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotification } from "../hooks";
import SimpleReactValidator from "simple-react-validator";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";
import { QuillEditor } from "shared/components/QuillEditor";

export const AddOrEditNotification = () => {
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  let { notificationId } = useParams();

  const editMode = !!notificationId;

  const {
    notification,
    setNotification,
    createNotification,
    editNotification,
    notificationInfo,
    onChange,
  } = useNotification({
    load: false,
    notificationId: notificationId,
  });

  const { title, content, isActive } = notification;

  const handleChecked = (e) => {
    setNotification((draft) => {
      draft.isActive = e.target.checked;
    });
  };

  const navigate = useNavigate();

  const onSubmit = () => {
    if (validator.current.allValid()) {
      editMode
        ? editNotification.mutate({ ...notification, notificationId })
        : createNotification.mutate(notification);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
  const onCancel = () => {
    navigate("..", { replace: true });
  };
  if (notificationInfo.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <ContentLayout
      subtitle={editMode ? "Update" : "Create"}
      title={"Notifications"}
      breadcrumb={[
        { label: "Notifications", location: "/admin/notifications" },
        { label: `${editMode ? "Edit" : "Create"}` },
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
                        <label className="mb-2" htmlFor="first-title-vertical">
                          Title
                        </label>
                        <Input
                          type="text"
                          id="first-title-vertical"
                          className="form-control"
                          name="title"
                          placeholder="Title"
                          value={title}
                          onChange={onChange}
                          invalid={validator.current.message("Title", title, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("Title", title, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-content-vertical">
                          Content
                        </label>
                        <Input
                          type="text"
                          id="first-content-vertical"
                          className="form-control"
                          name="content"
                          placeholder="Content"
                          value={content}
                          onChange={onChange}
                          invalid={validator.current.message("Content", content, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("Content", content, "required")}
                        </FormFeedback>
                        {/* <QuillEditor
                          value={content}
                          onChange={(value) => {
                            setNotification((draft) => {
                              draft.content = value;
                            });
                          }}
                        />
                        <div className="text-danger">
                          {validator.current.message("Content", content, "required")}
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="form-check form-check-inline">
                      <label htmlFor="first-active-vertical">Is active</label>
                      <Input
                        type="checkbox"
                        id="first-active-vertical"
                        className="form-check-input"
                        name="isActive"
                        // value={course.hasExam}
                        checked={isActive}
                        onChange={handleChecked}
                      />
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-end">
                    <LoadingButton
                      isLoading={createNotification.isLoading || editNotification.isLoading}
                      className="me-1 mb-1"
                      color="success"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      {editMode ? "Update" : "Save"}
                    </LoadingButton>
                    <button
                      disabled={createNotification.isLoading || editNotification.isLoading}
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
