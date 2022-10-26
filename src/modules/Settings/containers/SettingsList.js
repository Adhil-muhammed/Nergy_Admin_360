import React from "react";
import { useNavigate } from "react-router-dom";
import { ContentLayout } from "shared/components";
import { Button } from "reactstrap";
import { useSettings } from "../hooks";
import { QuillEditor } from "shared/components/QuillEditor";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const SettingsList = () => {
  const { settingsQuery } = useSettings({ load: true });

  const { data, isLoading } = settingsQuery;
  const navigate = useNavigate();

  const inputHandler = () => { };
  const onCancel = () => {
    navigate("/", { replace: true });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Settings"}
      subtitle={"Setting List"}
      breadcrumb={[{ label: "Settings" }]}
    >
      <div className="row">
        <form className="form">
          <div className="row">
            {data.map((field) => {
              return (
                <div className="col-12 mb-3" key={field.settingId}>
                  <div className="form-group">
                    <label htmlFor={"setting-field-" + field.settingId} className="mb-3 fw-bold">
                      {field.key}
                    </label>
                    {field.settingId === 2 || field.settingId === 3 ? (
                      <QuillEditor value={field.content} onChange={inputHandler} />
                    ) : (
                      <input
                        type="text"
                        id={"setting-field-" + field.settingId}
                        className="form-control mb-4"
                        name={field.key}
                        value={field.content}
                        onChange={inputHandler}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-12 d-flex justify-content-end">
            <Button className="me-1 mb-1" color="success" onClick={() => { }}>
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
        </form>
      </div>
    </ContentLayout>
  );
};
