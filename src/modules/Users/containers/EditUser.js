import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export const EditUser = (props) => {
  const history = useNavigate();
  const location = useLocation();
  const { user, setUser, editUser, onEdit } = props;
  const { firstName, lastName, email } = user;
  let { userId } = useParams();

  React.useEffect(() => {
    if (userId) {
      onEdit(userId, 10);
    }
  }, [userId, onEdit]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser((draft) => {
      draft[name] = value;
    });
  };


  const onSubmit = () => {
    editUser.mutate(user);
  };
  const onCancel = () => {
    history(`${location.pathname}`.replace(`/edit/${userId}`, ""));
  };

  return (
    <ContentLayout title={"Users"} subtitle={"Update"}>
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-12">
            <form className="form form-vertical">
              <div className="form-body">
                <div className="col-12">
                <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="first-name-vertical" className="mb-2">
                          First name
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="firstName"
                          placeholder="First Name"
                          value={firstName}
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="last-name-vertical" className="mb-2">
                          Last name
                        </label>
                        <Input
                          type="text"
                          id="last-name-vertical"
                          className="form-control"
                          name="lastName"
                          placeholder="Last name"
                          value={lastName}
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="first-email-vertical" className="mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          id="first-email-vertical"
                          className="form-control"
                          name="email"
                          placeholder="Email address"
                          value={email}
                          onChange={onHandleChange}
                        />
                      </div>
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
