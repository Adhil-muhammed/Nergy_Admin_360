import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  getQuestionBanks,
  createQuestionBanks,
  updateQuestionBanks,
  deteleQuestionBanks,
  getQuestionBanksById,
} from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_QUESTIONBANK = "GET_QUESTIONBANK";
const GET_QUESTIONBANK_BY_ID = "GET_QUESTIONBANK_BY_ID";

export const useQuestionBanks = ({ load = false, questionBankId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const questionBanksQuery = useQuery(GET_QUESTIONBANK, getQuestionBanks, {
    staleTime: Infinity,
  });
  const questionBankInfo = useQuery(
    `${GET_QUESTIONBANK_BY_ID}_${questionBankId}`,
    () => getQuestionBanksById(questionBankId),
    {
      refetchOnWindowFocus: false,
      enabled: questionBankId > 0,
    }
  );
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [questionBank, setQuestionBank] = useImmer({
    questionBankId: 0,
    name: "",
  });

  useEffect(() => {
    if (questionBankInfo.data) {
      setQuestionBank(questionBankInfo.data);
    }
  }, [questionBankInfo.data]);

  const createQuestionBank = useMutation(createQuestionBanks, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_QUESTIONBANK);
      navigate("..", { replace: true });
    },
  });

  const editQuestionBank = useMutation(updateQuestionBanks, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_QUESTIONBANK);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deleteQuestionBank = useMutation(deteleQuestionBanks, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_QUESTIONBANK);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedQuestionBank = questionBanksQuery.data.find((c) => c.questionBankId === id);
    if (selectedQuestionBank) setQuestionBank(selectedQuestionBank);

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
    questionBank,
    setQuestionBank,
    questionBankInfo,
    questionBanksQuery,
    createQuestionBank,
    editQuestionBank,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteQuestionBank,
  };
};
