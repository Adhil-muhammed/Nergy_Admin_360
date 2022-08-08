import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormFeedback, Input, Table } from "reactstrap";
import { ContentLayout } from "shared";
import SimpleReactValidator from "simple-react-validator";
import Select from "react-select";
import { useQuestionBanks } from "modules/QuestionBanks";
import InputControl from "shared/components/InputControl";
import { useQuestion } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";

export const CreateQuestion = () => {
  const { id } = useParams();
  const updateMode = id > 0;
  const { question, setQuestion, createQuestion, editQuestion, questionsInfo } = useQuestion({
    load: false,
    questionId: id,
  });
  const { questionBanksQuery } = useQuestionBanks({ load: true });
  const navigate = useNavigate();
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  const questionBanks = React.useMemo(() => {
    return questionBanksQuery.data
      ? questionBanksQuery.data.map((c) => {
          return { value: c.questionBankId, label: c.name };
        })
      : [];
  }, [questionBanksQuery.data]);

  const onSubmit = () => {
    if (validator.current.allValid()) {
      updateMode ? editQuestion.mutate(question.data) : createQuestion.mutate(question.data);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onSelectChange = (e, name) => {
    setQuestion((draft) => {
      draft.data[name] = e.value;
    });
  };

  const onChange = (e, index, isChoice = false) => {
    const { name, value } = e.target;
    if (isChoice) {
      setQuestion((draft) => {
        draft.data.choices[index][name] = value;
        return draft;
      });
    } else {
      setQuestion((draft) => {
        draft.data[name] = value;
      });
    }
  };
  const handleChecked = (e, index, isChoice = false) => {
    const { name, checked } = e.target;
    if (isChoice) {
      setQuestion((draft) => {
        draft.data.choices[index][name] = checked;
        return draft;
      });
    } else {
      setQuestion((draft) => {
        draft.data[name] = checked;
      });
    }
  };
  const difficultyLevelData = [
    { value: 1, label: "Easy" },
    { value: 2, label: "Medium" },
    { value: 3, label: "Hard" },
  ];

  const handleIsAnswer = (e, index) => {
    let choices = JSON.parse(JSON.stringify(question.data.choices));
    choices.forEach((choice, i) => {
      if (i === index) {
        choice.isAnswer = !choice.isAnswer;
      } else {
        choice.isAnswer = false;
      }
    });
    setQuestion((draft) => {
      draft.data.choices = choices;
      return draft;
    });
  };

  const addChoice = () => {
    setQuestion((draft) => {
      draft.data.choices = [
        ...draft.data.choices,
        {
          code: "",
          description: "",
          isAnswer: false,
        },
      ];
      return draft;
    });
  };

  const onDeleteChoice = (index) => {
    setQuestion((draft) => {
      draft.data.choices = draft.data.choices.filter((n, i) => i !== index);
      return draft;
    });
  };

  if (questionsInfo.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Questions"}
      subtitle={updateMode ? "Edit" : "Create"}
      breadcrumb={[
        { label: "Questions", location: "/admin/questions" },
        { label: `${updateMode ? "Edit" : "Create"}` },
      ]}
    >
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
                            <label htmlFor="first-name-vertical">Description*</label>
                            <Input
                              type="text"
                              id="first-name-vertical"
                              className="form-control"
                              name="description"
                              placeholder="Question description"
                              value={question.data.description}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Description",
                                question.data.description,
                                "required"
                              )}
                            />
                            <FormFeedback>
                              {validator.current.message(
                                "Description",
                                question.data.description,
                                "required"
                              )}
                            </FormFeedback>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical">Difficulty Level*</label>
                            <Input
                              id="first-name-vertical"
                              name="difficultyLevelCode"
                              type="select"
                              value={question.data.difficultyLevelCode}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Difficulty Level",
                                question.data.difficultyLevelCode,
                                "required"
                              )}
                            >
                              <option value={-1}>---Select---</option>
                              {difficultyLevelData.map((item) => {
                                return (
                                  <option key={item.value} value={item.value}>
                                    {item.label}
                                  </option>
                                );
                              })}
                            </Input>

                            <FormFeedback>
                              {validator.current.message(
                                "Difficulty Level",
                                question.data.difficultyLevelCode,
                                "required"
                              )}
                            </FormFeedback>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical">QuestionBank*</label>
                            <InputControl
                              type="react-select"
                              options={questionBanks}
                              name="questionBankId"
                              value={
                                questionBanks.length > 0 &&
                                question.data.questionBankId &&
                                questionBanks.find(
                                  (item) => item.value === question.data.questionBankId
                                )
                              }
                              isValid={
                                !validator.current.message(
                                  "Question Bank",
                                  question.data.questionBankId,
                                  "required"
                                )
                              }
                              onChange={(e) => onSelectChange(e, "questionBankId")}
                            />

                            <div className="text-danger">
                              {validator.current.message(
                                "Question Bank",
                                question.data.questionBankId,
                                "required"
                              )}
                            </div>
                          </div>
                        </div>
                        <h5 className="mt-3">Choices</h5>
                        <Table responsive size="">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>code</th>
                              <th>description</th>
                              <th>isAnswer</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {question.data.choices.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    <div className="col-6">
                                      <div className="form-group">
                                        <Input
                                          type="text"
                                          id="first-name-vertical"
                                          className="form-control"
                                          name="code"
                                          placeholder="Question Code"
                                          value={item.code}
                                          onChange={(e) => onChange(e, index, true)}
                                          invalid={validator.current.message(
                                            "Question Code",
                                            item.code,
                                            "required"
                                          )}
                                        />
                                        <FormFeedback>
                                          {validator.current.message(
                                            "Question Code",
                                            item.code,
                                            "required"
                                          )}
                                        </FormFeedback>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="col-6">
                                      <div className="form-group">
                                        <Input
                                          type="text"
                                          id="first-name-vertical"
                                          className="form-control"
                                          name="description"
                                          placeholder="Choice description"
                                          value={item.description}
                                          onChange={(e) => onChange(e, index, true)}
                                          invalid={validator.current.message(
                                            "Question description",
                                            item.description,
                                            "required"
                                          )}
                                        />
                                        <FormFeedback>
                                          {validator.current.message(
                                            "Question description",
                                            item.description,
                                            "required"
                                          )}
                                        </FormFeedback>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        type="radio"
                                        id="first-content-vertical"
                                        className="form-check-input"
                                        name="isAnswer"
                                        checked={item.isAnswer}
                                        onChange={(e) => handleIsAnswer(e, index)}
                                        invalid={validator.current.message(
                                          "Answer",
                                          question.data.choices.some((item) => item.isAnswer),
                                          "required|accepted"
                                        )}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <Button
                                      color="danger"
                                      disabled={question.data.choices.length < 3}
                                      onClick={() => onDeleteChoice(index)}
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        <div className="text-danger">
                          {update &&
                            (question.data.choices.some((item) => item.isAnswer)
                              ? ""
                              : "Please select an answer")}
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                          <Button
                            className="me-1 mb-1"
                            color="secondary"
                            disabled={question.data.choices.length > 3}
                            onClick={() => {
                              question.data.choices.length < 4 && addChoice();
                            }}
                          >
                            Add Choice
                          </Button>
                        </div>

                        <div className="mt-4">
                          <div className="form-check form-check-inline">
                            <label htmlFor="first-exam-vertical">Shuffle Choice</label>
                            <Input
                              type="checkbox"
                              id="first-exam-vertical"
                              className="form-check-input"
                              name="shuffleChoice"
                              value={question.data.shuffleChoice}
                              onChange={handleChecked}
                            />
                          </div>
                          <div className="form-check form-check-inline">
                            <label htmlFor="first-content-vertical">Review</label>
                            <Input
                              type="checkbox"
                              id="first-content-vertical"
                              className="form-check-input"
                              name="review"
                              value={question.data.review}
                              onChange={handleChecked}
                            />
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                          <LoadingButton
                            isLoading={createQuestion.isLoading || editQuestion.isLoading}
                            className="me-1 mb-1"
                            color="success"
                            onClick={() => {
                              onSubmit();
                            }}
                          >
                            {updateMode ? "Update" : "Create"}
                          </LoadingButton>
                          <button
                            disabled={createQuestion.isLoading || editQuestion.isLoading}
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
    </ContentLayout>
  );
};
