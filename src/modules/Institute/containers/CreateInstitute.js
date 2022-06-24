import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const CreateInstitute = (props) => {
  const { institute, setInstitute, createInstitute } = props;
  const { name } = institute;

  const history = useNavigate();
  const location = useLocation();

  const onSubmit = () => {
    createInstitute.mutate(institute);
  };

  const onCancel = () => {
    history(`${location.pathname}`.replace("/create", ""));
  };

  return (
    <ContentLayout title={"Create New"}>
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
                              placeholder="Institute Name"
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
                            className="me-1 mb-1"
                            color="success"
                            onClick={() => {
                              onSubmit();
                            }}
                          >
                            Create
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
