import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { errorMessage, successDeletedMessage, successMessage } from "utils";
import {
  createAssessmentSections,
  deleteAssessmentSections,
  getAssessmentSections,
  updateAssessmentSections,
  findAssessmentSection,
} from "../api";

const GET_ASSESSMENTSECTIONS = "GET_ASSESSMENTSECTIONS";
const GET_ASSESSMENTSECTIONS_BY_ID = "GET_ASSESSMENTSECTIONS_BY_ID";

export const useAssessmentSection = ({ load = false, sectionId = 0 }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const assessmentSectionQuery = useQuery(GET_ASSESSMENTSECTIONS, getAssessmentSections, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });
  const assessmentSectionInfo = useQuery(
    `${GET_ASSESSMENTSECTIONS_BY_ID}_${sectionId}`,
    () => findAssessmentSection(sectionId),
    {
      refetchOnWindowFocus: false,
      enabled: sectionId > 0,
    }
  );

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [assessmentSection, setAssessmentSection] = useImmer({
    modal: { isOpen: false },
    data: {
      sectionId: "",
      name: "",
      questions: [],
    },
  });

  useEffect(() => {
    if (assessmentSectionInfo.data) {
      setAssessmentSection((draft) => {
        draft.data = assessmentSectionInfo.data;
      });
    }
  }, [assessmentSectionInfo.data]);

  const createAssessmentSection = useMutation(createAssessmentSections, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_ASSESSMENTSECTIONS);
      navigate("..", { replace: true });
    },
  });

  const editAssessmentSection = useMutation(updateAssessmentSections, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_ASSESSMENTSECTIONS);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const onDeleteAssessmentSection = useMutation(deleteAssessmentSections, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_ASSESSMENTSECTIONS);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedSection = assessmentSectionQuery.data.find((c) => c.sectionId === id);
    if (selectedSection)
      setAssessmentSection((draft) => {
        draft.data = selectedSection;
      });

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
    assessmentSectionInfo,
    assessmentSection,
    setAssessmentSection,
    assessmentSectionQuery,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteAssessmentSection,
    createAssessmentSection,
    editAssessmentSection,
  };
};
