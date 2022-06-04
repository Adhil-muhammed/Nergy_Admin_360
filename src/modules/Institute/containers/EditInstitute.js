import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import React from "react";
import { useParams } from "react-router-dom";

export const EditInstitute = (props) => {
  const { institute, setInstitute, editInstitute, onEdit } = props;

  const { name } = institute;

  let { instituteId } = useParams();

  React.useEffect(() => {
    if (instituteId) {
      onEdit(parseInt(instituteId.toString(), 10));
    }
  }, [instituteId, onEdit]);

  const onSubmit = () => {
    editInstitute.mutate(institute);
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
                              placeholder="Batch Name"
                              value={name}
                              onChange={(e) => {
                                setInstitute((draft) => {
                                  draft.name = e.target.value;
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                          <Button
                            className="btn btn-primary me-1 mb-1"
                            onClick={() => {
                              onSubmit();
                            }}
                          >
                            Update
                          </Button>
                          <button type="reset" className="btn btn-light-secondary me-1 mb-1">
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
