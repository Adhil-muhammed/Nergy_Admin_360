import React, { useRef, useState } from "react";
import { Button, FormFeedback, Input, Table } from "reactstrap";
import { ContentLayout } from "shared";
import SimpleReactValidator from "simple-react-validator";

export const CreateQuestion = (props) => {
  const { state, setState, createQuestion } = props;
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const onSubmit = () => {
    if (validator.current.allValid()) {
      createQuestion.mutate(state.data);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const onChange = (e, index, isChoice = false) => {
    const { name, value } = e.target;
    if (isChoice) {
      setState((draft) => {
        draft.data.choices[index][name] = value;
        return draft;
      });
    } else {
      setState((draft) => {
        draft.data[name] = value;
      });
    }
  };
  const handleChecked = (e, index, isChoice = false) => {
    const { name, checked } = e.target;
    if (isChoice) {
      setState((draft) => {
        draft.data.choices[index][name] = checked;
        return draft;
      });
    } else {
      setState((draft) => {
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
    let choices = JSON.parse(JSON.stringify(state.data.choices));
    choices.forEach((choice, i) => {
      if (i === index) {
        choice.isAnswer = !choice.isAnswer;
      } else {
        choice.isAnswer = false;
      }
    });
    setState((draft) => {
      draft.data.choices = choices;
      return draft;
    });
  };

  const addChoice = () => {
    setState((draft) => {
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
    setState((draft) => {
      draft.data.choices = draft.data.choices.filter((n, i) => i !== index);
      return draft;
    });
  };

  console.log("state", state.data);

  return (
    <ContentLayout title="Create New">
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
                            <label htmlFor="first-name-vertical">Description</label>
                            <Input
                              type="text"
                              id="first-name-vertical"
                              className="form-control"
                              name="description"
                              placeholder="Question description"
                              value={state.data.description}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Description",
                                state.data.description,
                                "required"
                              )}
                            />
                            <FormFeedback>
                              {validator.current.message(
                                "Description",
                                state.data.description,
                                "required"
                              )}
                            </FormFeedback>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical">Difficulty Level</label>
                            <Input
                              id="first-name-vertical"
                              name="difficultyLevelCode"
                              type="select"
                              value={state.data.difficultyLevelCode}
                              onChange={onChange}
                              invalid={validator.current.message(
                                "Difficulty Level",
                                state.data.difficultyLevelCode,
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
                                state.data.difficultyLevelCode,
                                "required"
                              )}
                            </FormFeedback>
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
                            {state.data.choices.map((item, index) => {
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
                                          placeholder="Question description"
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
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <Button
                                      color="danger"
                                      disabled={state.data.choices.length < 3}
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
                            (state.data.choices.some((item) => item.isAnswer)
                              ? ""
                              : "Please select an answer")}
                        </div>

                        <div className="col-12 d-flex justify-content-end">
                          <Button
                            className="me-1 mb-1"
                            color="secondary"
                            disabled={state.data.choices.length > 3}
                            onClick={() => {
                              state.data.choices.length < 4 && addChoice();
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
                              value={state.data.shuffleChoice}
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
                              value={state.data.review}
                              onChange={handleChecked}
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
