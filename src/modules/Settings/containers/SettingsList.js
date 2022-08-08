import React from "react";
import { ContentLayout } from "shared/components";
import { Button } from "reactstrap";
import { useSettings } from "../hooks";

export const SettingsList = () => {
  const { settingsQuery } = useSettings();

  const { data, isLoading } = settingsQuery;

  const inputHandler = () => {};

  return (
    <ContentLayout
      title={"Settings"}
      subtitle={"Setting List"}
      isLoading={isLoading}
      breadcrumb={[{ label: "Settings" }]}
    >
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
            <Button className="me-1 mb-1" color="success" onClick={() => {}}>
              Update
            </Button>
            <button type="reset" className="btn btn-light-secondary me-1 mb-1" onClick={() => {}}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </ContentLayout>
  );
};
