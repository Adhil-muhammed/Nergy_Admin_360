import { useQuestionBanks } from "modules/QuestionBanks";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { ModalLayout, TableLayout } from "shared";
import InputControl from "shared/components/InputControl";
import { useImmer } from "use-immer";
import { getQuestionBankById } from "../api";

const GET_QUESTIONBANK_BY_ID_DETAILS = "GET_QUESTIONBANK_BY_ID_DETAILS";
const QuestionsPreview = ({ isOpen, onCancel, existingQuestions, onConfirmQuestions }) => {
  const queryClient = useQueryClient();
  const { questionBanksQuery } = useQuestionBanks({ load: true });
  const { data: questionBanks } = questionBanksQuery;
  const [state, setState] = useImmer({
    questionBank: { value: 0, label: "" },
    selectedQuestions: [],
    questions: [],
  });

  const questionsList = useQuery(
    `${GET_QUESTIONBANK_BY_ID_DETAILS}_${state.questionBank.value}`,
    () => getQuestionBankById(state.questionBank.value),
    {
      refetchOnWindowFocus: false,
      enabled: state.questionBank.value > 0,
    }
  );

  useEffect(() => {
    if (questionsList.data?.questions.length > 0) {
      setState((draft) => {
        draft.questions = questionsList.data.questions;
      });
    }
  }, [questionsList.data]);

  const questionBanksList = React.useMemo(() => {
    return questionBanks
      ? questionBanks.map((c) => {
          return { value: c.questionBankId, label: c.name };
        })
      : [];
  }, [questionBanks]);

  const onQuestionBankChange = (e) => {
    setState((draft) => {
      draft.questionBank = e;
    });
  };

  const onselectionchange = (question) => {
    if (state.selectedQuestions.some((item) => item.questionId === question.questionId)) {
      const filtered = state.selectedQuestions.filter(
        (item) => item.questionId !== question.questionId
      );
      setState((draft) => {
        draft.selectedQuestions = filtered;
      });
    } else {
      setState((draft) => {
        draft.selectedQuestions = [
          ...state.selectedQuestions,
          {
            questionId: question.questionId,
            description: question.description,
            score: "",
          },
        ];
      });
    }
  };

  const ActionButtons = ({ row }) => {
    return (
      <>
        <div className="form-check form-check-inline">
          <InputControl
            type="checkbox"
            id="first-content-vertical"
            className="form-check-input"
            disabled={existingQuestions.some((item) => item.questionId === row.original.questionId)}
            checked={
              state.selectedQuestions.some((item) => item.questionId === row.original.questionId) ||
              existingQuestions.some((item) => item.questionId === row.original.questionId)
            }
            onChange={() => onselectionchange(row.original)}
          />
        </div>
      </>
    );
  };

  const columns = [
    {
      Header: "Question",
      accessor: "description",
    },
    {
      Header: "Actions",
      accessor: "batchId",
      id: "actions",
      Cell: ActionButtons,
    },
  ];

  const onConfirm = () => {
    onConfirmQuestions(state.selectedQuestions);
    setState((draft) => {
      draft.selectedQuestions = [];
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={onCancel} centered={true} size="xl">
        <ModalBody>
          {
            <>
              <div className="head">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="first-name-vertical">QuestionBank</label>
                    <InputControl
                      type="react-select"
                      options={questionBanksList}
                      name="questionId"
                      onChange={onQuestionBankChange}
                      value={state.questionBank}
                      isValid={true}
                    />
                  </div>
                </div>
              </div>
              <div className="questions-container">
                {state.questionBank.value ? (
                  <TableLayout columns={columns} data={state.questions} />
                ) : (
                  <div>Please select a Question Bank</div>
                )}
              </div>
            </>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onConfirm()}>
            Confirm
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default QuestionsPreview;
