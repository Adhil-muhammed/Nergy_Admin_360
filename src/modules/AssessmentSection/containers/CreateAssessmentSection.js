import { useQuestion } from "modules/Questions";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormFeedback, Table } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";
import InputControl from "shared/components/InputControl";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import { Axios } from "utils";
import QuestionsPreview from "../components/QuestionsPreview";

const CreateAssessmentSection = ({ createAssessmentSection, editAssessmentSection }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateMode = id !== undefined ? true : false;
  const { questionsQuery } = useQuestion({ load: false });
  const { data: questions } = questionsQuery;
  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  const [assessmentSection, setAssessmentSection] = useImmer({
    modal: { isOpen: false },
    data: {
      name: "",
      questions: [],
    },
  });

  const getAssessmentById = async () => {
    const res = await Axios.get(`/AssessmentSections/${id}`);
    setAssessmentSection((draft) => {
      draft.data = res.data;
    });
  };

  const { data } = useQuery(["AssessmentSectionDetails", id], getAssessmentById, {
    enabled: !!id,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setAssessmentSection((draft) => {
      draft.data[name] = value;
    });
  };

  const onSubmit = () => {
    if (validator.current.allValid()) {
      updateMode
        ? editAssessmentSection.mutate(assessmentSection.data)
        : createAssessmentSection.mutate(assessmentSection.data);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const toggleQuestionListModal = () => {
    setAssessmentSection((draft) => {
      draft.modal.isOpen = !draft.modal.isOpen;
    });
  };

  const onDeleteQuestions = (id) => {
    setAssessmentSection((draft) => {
      draft.data.questions = draft.data.questions.filter((item) => item.questionId !== id);
    });
  };

  const onChangeScore = (e, index) => {
    setAssessmentSection((draft) => {
      draft.data.questions[index].score = e.target.value;
    });
  };

  const onConfirmQuestions = (questions) => {
    setAssessmentSection((draft) => {
      draft.modal.isOpen = false;
      draft.data.questions = [...draft.data.questions, ...questions];
    });
  };
  return (
    <ContentLayout title={updateMode ? "Edit" : "Create New"}>
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-12">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <form className="form form-vertical">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical">Name*</label>
                            <InputControl
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={assessmentSection.data.name}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Name",
                                assessmentSection.data.name,
                                "required"
                              )}
                            />
                            <FormFeedback>
                              {validator.current.message(
                                "Name",
                                assessmentSection.data.name,
                                "required"
                              )}
                            </FormFeedback>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical">Questions</label>

                            <Table responsive size="">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Question</th>
                                  <th>Score</th>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {assessmentSection.data.questions.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <div className="col-6">
                                          <div className="form-group">{index + 1}</div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="col-6">
                                          <div className="form-group">{item.description}</div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="col-10">
                                          <div className="form-group">
                                            <label htmlFor="first-name-vertical">Score</label>
                                            <InputControl
                                              type="number"
                                              name="score"
                                              placeholder="score"
                                              value={item.score}
                                              onChange={(e) => onChangeScore(e, index)}
                                              invalid={validator.current.message(
                                                "score",
                                                item.score,
                                                "required"
                                              )}
                                            />
                                            <FormFeedback>
                                              {validator.current.message(
                                                "score",
                                                item.score,
                                                "required"
                                              )}
                                            </FormFeedback>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <Button
                                          color="danger"
                                          size="sm"
                                          onClick={() => onDeleteQuestions(item.questionId)}
                                          className="ms-3"
                                        >
                                          <i
                                            className="bi bi-trash"
                                            style={{ fontSize: "10px" }}
                                          ></i>{" "}
                                          <span>Delete</span>
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end mb-5">
                          <Button
                            className="me-1 mb-1"
                            color="secondary"
                            onClick={() => {
                              toggleQuestionListModal();
                            }}
                          >
                            Add Question
                          </Button>
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                          <Button
                            className="me-1 mb-1"
                            color="success"
                            onClick={() => {
                              onSubmit();
                            }}
                          >
                            {updateMode ? "Update" : "Create"}
                          </Button>
                          <button
                            onClick={() => navigate(-1)}
                            type="reset"
                            className="btn btn-light-secondary me-1 mb-1"
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
      <QuestionsPreview
        isOpen={assessmentSection.modal.isOpen}
        onCancel={toggleQuestionListModal}
        existingQuestions={assessmentSection.data.questions}
        onConfirmQuestions={onConfirmQuestions}
      />
    </ContentLayout>
  );
};

export default CreateAssessmentSection;
