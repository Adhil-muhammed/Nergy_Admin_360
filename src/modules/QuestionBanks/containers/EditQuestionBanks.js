import { ContentLayout } from "shared/components";
import { Input, Button } from "reactstrap";
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const EditQuestionBanks = (props) => {
  const { questionBank, setQuestionBank, editQuestionBank, onEdit } = props;
  const { name } = questionBank;
  let { questionBankId } = useParams();
  const history = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (questionBankId) {
      onEdit(parseInt(questionBankId.toString(), 10));
    }
  }, [questionBankId, onEdit]);

  const onSubmit = () => {
    editQuestionBank.mutate(questionBank);
  };

  const onCancel = () => {
    history(`${location.pathname}`.replace(`/edit/${questionBankId}`, ""));
  };

  return (
    <ContentLayout title={"Update"}>
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-12">
            <form className="form form-vertical">
              <div className="form-body">
                <div className="col-12">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-name-vertical">Name</label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="name"
                          placeholder="Batch Name"
                          value={name}
                          onChange={(e) => {
                            setQuestionBank((draft) => {
                              draft.name = e.target.value;
                            });
                          }}
                        />
                      </div>
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
            </form>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
