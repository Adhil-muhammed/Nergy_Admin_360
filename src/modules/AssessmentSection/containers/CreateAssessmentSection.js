import { useQuestion } from "modules/Questions";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormFeedback } from "reactstrap";
import { ContentLayout } from "shared";
import InputControl from "shared/components/InputControl";
import SimpleReactValidator from "simple-react-validator";
import { useImmer } from "use-immer";
import { Axios } from "utils";

const CreateAssessmentSection = ({ createAssessmentSection, editAssessmentSection }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateMode = id !== undefined ? true : false;
  const { questionsQuery } = useQuestion();
  const { data: questions } = questionsQuery;
  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  const [assessmentSection, setAssessmentSection] = useImmer({
    data: { name: "", questions: [] },
  });

  console.log(assessmentSection.data.name);

  const getAssessmentById = async () => {
    const res = await Axios.get(`/AssessmentSections/${id}`);
    setAssessmentSection((draft) => {
      draft.data = res.data;
    });
  };

  const { data } = useQuery(["AssessmentSectionDetails", id], getAssessmentById, {
    enabled: !!id,
  });
  const questionsList = React.useMemo(() => {
    return questions
      ? questions.map((c) => {
          return { value: c.questionId, label: c.description };
        })
      : [];
  }, [questions]);
  const onChange = (e) => {
    const { name, value } = e.target;
    setAssessmentSection((draft) => {
      draft.data[name] = value;
    });
  };
  const onSelectChange = (e) => {
    const requiredFormat = e.map((c) => {
      return { questionId: c.value, score: 1 };
    });

    setAssessmentSection((draft) => {
      draft.data.questions = requiredFormat;
    });
  };
  const res = questions?.filter((el) => {
    return assessmentSection?.data.questions.find((element) => {
      return element.questionId === el.questionId;
    });
  });

  const getValue = () => {
    let res = [];
    questionsList.forEach((element) => {
      assessmentSection.data.questions.forEach((el) => {
        if (element.value === el.questionId) {
          res.push(element);
        }
      });
    });
    return res;
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
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="first-name-vertical">Name*</label>
                            <InputControl
                              type="react-select"
                              isMulti
                              options={questionsList}
                              name="questionId"
                              value={getValue()}
                              isValid={
                                !validator.current.message(
                                  "Questions",
                                  assessmentSection.data.questions,
                                  "required"
                                )
                              }
                              onChange={(e) => onSelectChange(e)}
                            />
                            <div className="text-danger">
                              {validator.current.message(
                                "Questions",
                                assessmentSection.data.questions,
                                "required"
                              )}
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
    </ContentLayout>
  );
};

export default CreateAssessmentSection;
