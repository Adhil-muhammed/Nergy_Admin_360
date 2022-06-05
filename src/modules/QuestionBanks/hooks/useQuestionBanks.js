import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  getQuestionBanks,
  createQuestionBanks,
  updateQuestionBanks,
  deteleQuestionBanks,
} from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage } from "utils";

const GetQuestionBanksKey = "GET_QUESTIONBANK_API";

export const useQuestionBanks = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const questionBanksQuery = useQuery(GetQuestionBanksKey, getQuestionBanks, {
    staleTime: Infinity,
  });
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [questionBank, setQuestionBank] = useImmer({
    questionBankId: 0,
    name: "",
  });

  const createQuestionBank = useMutation(createQuestionBanks, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetQuestionBanksKey);
      const data = queryClient.getQueryData(GetQuestionBanksKey);
      queryClient.setQueryData(GetQuestionBanksKey, (prevData) => {
        let updatedData = [...prevData, update];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetQuestionBanksKey, previousData);
    },
    onSuccess: () => {
      successMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      navigate("../questionbanks", { replace: true });
    },
  });

  const editQuestionBank = useMutation(updateQuestionBanks, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetQuestionBanksKey);
      const data = queryClient.getQueryData(GetQuestionBanksKey);
      queryClient.setQueryData(GetQuestionBanksKey, (prevData) => {
        let updatedData = prevData.map((p) => {
          let newData = { ...p };
          if (p.questionBankId === update.questionBankId) {
            newData.name = update.name;
          }
          return newData;
        });
        return updatedData;
      });
      return data;
    },
    onSuccess: () => {
      successMessage();
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetQuestionBanksKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      navigate("../questionbanks", { replace: true });
    },
  });

  const deleteQuestionBank = useMutation(deteleQuestionBanks, {
    onMutate: async (questionBankId) => {
      await queryClient.cancelQueries(GetQuestionBanksKey);
      const data = queryClient.getQueryData(GetQuestionBanksKey);
      queryClient.setQueryData(GetQuestionBanksKey, (prevData) => {
        let updatedData = [...prevData.filter((n) => n.questionBankId !== questionBankId)];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetQuestionBanksKey, previousData);
    },
    onSuccess: () => {
      successDeletedMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      onToggleModal(false);
    },
  });

  const getSelectedQuestionBank = React.useCallback(
    (id) => {
      const selectedQuestionBank = questionBanksQuery.data.filter(
        (s) => s.questionBankId === id
      )[0];
      setQuestionBank((draft) => {
        draft.questionBankId = selectedQuestionBank.questionBankId;
        draft.name = selectedQuestionBank.name;
        return draft;
      });
    },
    [questionBanksQuery.data, setQuestionBank]
  );

  const onEdit = React.useCallback(
    (questionBankId) => {
      getSelectedQuestionBank(questionBankId);
    },
    [getSelectedQuestionBank]
  );

  const onDelete = React.useCallback(
    (id) => {
      getSelectedQuestionBank(id);
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    },
    [getSelectedQuestionBank, setIsConfirmDelete]
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
    questionBank,
    setQuestionBank,
    questionBanksQuery,
    createQuestionBank,
    editQuestionBank,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteQuestionBank,
  };
};
