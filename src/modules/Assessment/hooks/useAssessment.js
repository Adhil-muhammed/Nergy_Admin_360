import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { errorMessage, successDeletedMessage, successMessage } from "utils";
import { createAssessments, deleteAssessment, getAssessments, updateAssessments } from "../api";

const GetAssessments = "GET_ASSESSMENTS";

export const useAssessment = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [assessment, setAssessment] = useImmer({ assesmentId: "", name: "" });

  const assessmentQuery = useQuery(GetAssessments, getAssessments, {
    staleTime: Infinity,
  });

  const createAssessment = useMutation(createAssessments, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetAssessments);
    },
    onError: (e, newData, previousData) => {
      errorMessage();
    },
    onSuccess: () => {
      successMessage();
      navigate("../assessments", { replace: true });
    },
    onSettled: () => {
      queryClient.invalidateQueries(GetAssessments);
    },
  });

  const editAssessment = useMutation(updateAssessments, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetAssessments);
    },
    onSuccess: () => {
      successMessage();
      navigate("../assessments", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries(GetAssessments);
    },
  });

  const onDeleteAssessment = useMutation(deleteAssessment, {
    onMutate: async (id) => {
      await queryClient.cancelQueries(GetAssessments);
      const data = queryClient.getQueryData(GetAssessments);
      queryClient.setQueryData(GetAssessments, (prevData) => {
        let updatedData = [...prevData.filter((n) => n.assesmentId !== id)];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      errorMessage();
    },
    onSuccess: () => {
      successDeletedMessage();
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = React.useCallback(
    (value) => {
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
      setAssessment((draft) => {
        draft.assesmentId = value.original.assesmentId;
        draft.name = value.original.name;
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
    assessmentQuery,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteAssessment,
    assessment,
    createAssessment,
    editAssessment,
  };
};
