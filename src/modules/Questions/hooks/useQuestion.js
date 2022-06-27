import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { successDeletedMessage, successMessage } from "utils";
import { createNewQuestion, deleteQuestion, getQuestions } from "../api";

const GetQuestionKey = "GET_QUESTION_API";

export const useQuestion = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [question, setQuestion] = useImmer({ questionId: 0, name: "" });
  const [state, setState] = useImmer({
    data: {
      description: "",
      shuffleChoice: false,
      difficultyLevelCode: 0,
      questionBankId: 1,
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

  const questionsQuery = useQuery(GetQuestionKey, getQuestions, {
    staleTime: Infinity,
  });

  const createQuestion = useMutation(createNewQuestion, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetQuestionKey);
      const data = queryClient.getQueryData(GetQuestionKey);
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetQuestionKey, previousData);
    },
    onSuccess: () => {
      successMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      navigate("../questions", { replace: true });
    },
  });

  const onDeleteQuestion = useMutation(deleteQuestion, {
    onMutate: async (questionId) => {
      await queryClient.cancelQueries(GetQuestionKey);
      const data = queryClient.getQueryData(GetQuestionKey);
      queryClient.setQueryData(GetQuestionKey, (prevData) => {
        let updatedData = [...prevData.filter((n) => n.questionId !== questionId)];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetQuestionKey, previousData);
    },
    onSuccess: () => {
      successDeletedMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      onToggleModal(false);
    },
  });

  const getSelectedQuestion = React.useCallback(
    (id) => {
      const selectedQuestion = questionsQuery.data.filter((s) => s.questionId === id)[0];
      setQuestion((draft) => {
        draft.questionId = selectedQuestion.questionId;
        draft.name = selectedQuestion.description;
        return draft;
      });
    },
    [questionsQuery.data, setQuestion]
  );

  const onDelete = React.useCallback(
    (value) => {
      getSelectedQuestion(value.original.questionId);
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    },
    [getSelectedQuestion, setIsConfirmDelete]
  );

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
    state,
    setState,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteQuestion,
    question,
    createQuestion,
  };
};
