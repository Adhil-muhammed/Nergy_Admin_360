import React, { useState, useRef } from "react";
import { ContentLayout } from "shared/components";
import { Input, Button, FormFeedback } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { useQuestionBanks } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";

export const CreateOrEditQuestionBanks = () => {
  let { questionBankId } = useParams();
  const { questionBank, setQuestionBank, createQuestionBank, questionBankInfo, editQuestionBank } =
    useQuestionBanks({
      load: false,
      questionBankId: questionBankId,
    });
  const editMode = questionBankId > 0;
  const { name } = questionBank;
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  const navigate = useNavigate();

  const onSubmit = () => {
    if (validator.current.allValid()) {
      editMode ? editQuestionBank.mutate(questionBank) : createQuestionBank.mutate(questionBank);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onCancel = () => {
    navigate("..", { replace: true });
  };

  if (questionBankInfo.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <ContentLayout
      subtitle={editMode ? "Update" : "Create"}
      title={"Question Bank"}
      breadcrumb={[
        { label: "Question Bank", location: "/questionbanks" },
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
                        <label className="mb-2" htmlFor="first-name-vertical">
                          Name
                        </label>
                        <Input
                          type="text"
                          id="first-name-vertical"
                          className="form-control"
                          name="name"
                          placeholder="Question Bank Name"
                          value={name}
                          onChange={(e) => {
                            setQuestionBank((draft) => {
                              draft.name = e.target.value;
                            });
                          }}
                          invalid={validator.current.message("name", name, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("name", name, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-end">
                    <LoadingButton
                      isLoading={createQuestionBank.isLoading || editQuestionBank.isLoading}
                      className="me-1 mb-1"
                      color="success"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      {editMode ? "Update" : "Create"}
                    </LoadingButton>
                    <button
                      disabled={createQuestionBank.isLoading || editQuestionBank.isLoading}
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
