import React from "react";
import { ContentLayout } from "shared/components";
import { Button } from "reactstrap";

export const SettingsList = (props) => {
  const {
    settings: { data, isLoading },
  } = props;
  // console.log(JSON.stringify(data, null, 2));

  const inputHandler = () => {};

  if (isLoading || !data) return "Loading...";

  return (
    <ContentLayout title={"Settings"} subtitle={"Setting List"}>
      <div className="row">
        <form className="form">
          <div className="row">
            {data?.map((field) => {
              return (
                <div className="col-md-6 col-lg-4" key={field.settingId}>
                  <div className="form-group">
                    <label htmlFor={"setting-field-" + field.settingId} className="mb-3 fw-bold">
                      {field.key}
                    </label>
                    <input
                      type="text"
                      id={"setting-field-" + field.settingId}
                      className="form-control mb-4"
                      name={field.key}
                      value={field.content}
                      onChange={inputHandler}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-12 d-flex justify-content-end">
            <Button
              className="me-1 mb-1"
              color="success"
              onClick={() => {}}
            >
              Update
            </Button>
            <button
              type="reset"
              className="btn btn-light-secondary me-1 mb-1"
              onClick={() => {}}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ContentLayout>
  );
};
