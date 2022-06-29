import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { successDeletedMessage, successMessage } from "utils";
import {
  createAssessmentSections,
  deleteAssessmentSections,
  getAssessmentSections,
  updateAssessmentSections,
} from "../api";

const GetAssessmentSections = "GET_ASSESSMENTSECTIONS";

export const useAssessmentSection = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [assessment, setAssessment] = useImmer({ id: 0, name: "" });

  const assessmentSectionQuery = useQuery(GetAssessmentSections, getAssessmentSections, {
    staleTime: Infinity,
  });

  const createAssessmentSection = useMutation(createAssessmentSections, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetAssessmentSections);
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetAssessmentSections, previousData);
    },
    onSuccess: () => {
      successMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries(GetAssessmentSections);
      navigate("../assessmentSection", { replace: true });
    },
  });

  const editAssessmentSection = useMutation(updateAssessmentSections, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetAssessmentSections);
    },
    onSuccess: () => {
      successMessage();
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetAssessmentSections, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(GetAssessmentSections);
      navigate("../assessmentSection", { replace: true });
    },
  });

  const onDeleteAssessmentSection = useMutation(deleteAssessmentSections, {
    onMutate: async (id) => {
      await queryClient.cancelQueries(GetAssessmentSections);
      const data = queryClient.getQueryData(GetAssessmentSections);
      queryClient.setQueryData(GetAssessmentSections, (prevData) => {
        let updatedData = [...prevData.filter((n) => n.sectionId !== id)];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetAssessmentSections, previousData);
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
        draft.id = value.original.sectionId;
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
    assessmentSectionQuery,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteAssessmentSection,
    assessment,
    createAssessmentSection,
    editAssessmentSection,
  };
};
