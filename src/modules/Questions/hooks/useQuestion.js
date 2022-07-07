import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { errorMessage, successDeletedMessage, successMessage } from "utils";
import {
  createNewQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
  getQuestionById,
} from "..";

const GET_QUESTION = "GET_QUESTION";
const GET_QUESTION_BY_ID = "GET_QUESTION_BY_ID";

export const useQuestion = ({ load = false, questionId = 0 }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [question, setQuestion] = useImmer({
    data: {
      description: "",
      shuffleChoice: false,
      difficultyLevelCode: "",
      questionBankId: "",
      review: false,
      choices: [
        {
          code: "",
          description: "",
          isAnswer: false,
        },
        {
          code: "",
          description: "",
          isAnswer: false,
        },
      ],
    },
  });

  const questionsQuery = useQuery(GET_QUESTION, getQuestions, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: load,
  });

  const questionsInfo = useQuery(
    `${GET_QUESTION_BY_ID}_${questionId}`,
    () => getQuestionById(questionId),
    {
      refetchOnWindowFocus: false,
      enabled: questionId > 0,
    }
  );

  useEffect(() => {
    if (questionsInfo.data) {
      setQuestion((draft) => {
        draft.data = questionsInfo.data;
      });
    }
  }, [questionsInfo.data]);

  const createQuestion = useMutation(createNewQuestion, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_QUESTION);
      navigate("..", { replace: true });
    },
  });

  const editQuestion = useMutation(updateQuestion, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_QUESTION);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const onDeleteQuestion = useMutation(deleteQuestion, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_QUESTION);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (value) => {
    const selectedQuestion = questionsQuery.data.find(
      (c) => c.questionId === value.original.questionId
    );
    if (selectedQuestion) setQuestion(selectedQuestion);

    setIsConfirmDelete((draft) => {
      draft = true;
      return draft;
    });
  };

  const onToggleModal = React.useCallback(
    (isOpen) => {
      setIsConfirmDelete((draft) => {
        draft = isOpen;
        return draft;
      });
    },
    [setIsConfirmDelete]
  );

  return {
    questionsQuery,
    questionsInfo,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteQuestion,
    question,
    setQuestion,
    createQuestion,
    editQuestion,
  };
};
