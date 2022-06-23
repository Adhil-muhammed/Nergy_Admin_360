import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { successDeletedMessage } from "utils";
import { deleteQuestion, getQuestions } from "../api";

const GetQuestionKey = "GET_QUESTION_API";

export const useQuestion = () => {
  const queryClient = useQueryClient();

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [state, setState] = useImmer({
    data: {
      description: "",
      shuffleChoice: false,
      difficultyLevelCode: 0,
      questionBankId: 0,
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

  const onDeleteQuestion = useMutation(deleteQuestion, {
    onMutate: async (questionBankId) => {
      await queryClient.cancelQueries(GetQuestionKey);
      const data = queryClient.getQueryData(GetQuestionKey);
      queryClient.setQueryData(GetQuestionKey, (prevData) => {
        let updatedData = [...prevData.filter((n) => n.questionBankId !== questionBankId)];
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

  const onDelete = React.useCallback(
    (id) => {
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    },
    [setIsConfirmDelete]
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
  };
};
