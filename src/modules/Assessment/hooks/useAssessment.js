import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { errorMessage, successDeletedMessage, successMessage } from "utils";
import {
  createAssessments,
  deleteAssessment,
  getAssessments,
  updateAssessments,
  getAssessmentById,
} from "..";

const GET_ASSESSMENTS = "GET_ASSESSMENTS";
const GET_ASSESSMENT_BY_ID = "GET_ASSESSMENT_BY_ID";

export const useAssessment = ({ load = false, assessmentId = 0 }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [assessment, setAssessment] = useImmer({
    data: {
      courseId: "",
      name: "",
      maxTime: "",
      maxAttempt: "",
      noOfQuestions: "",
      passMark: "",
      instructions: "",
      assessmentConfig: "",
      isMock: false,
      assessmentStatus: "",
      assessmentBatches: [],
      assessmentSections: [
        {
          sectionId: "",
          passMark: "",
          noOfQuestions: "",
        },
      ],
    },
  });

  const assessmentQuery = useQuery(GET_ASSESSMENTS, getAssessments, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });

  const assessmentInfo = useQuery(
    `${GET_ASSESSMENT_BY_ID}_${assessmentId}`,
    () => getAssessmentById(assessmentId),
    {
      refetchOnWindowFocus: false,
      enabled: assessmentId > 0,
    }
  );
  useEffect(() => {
    if (assessmentInfo.data) {
      setAssessment((draft) => {
        draft.data = assessmentInfo.data;
        return draft;
      });
    }
  }, [assessmentInfo.data]);

  const createAssessment = useMutation(createAssessments, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_ASSESSMENTS);
      navigate("..", { replace: true });
    },
  });

  const editAssessment = useMutation(updateAssessments, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_ASSESSMENTS);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const onDeleteAssessment = useMutation(deleteAssessment, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_ASSESSMENTS);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (value) => {
    const selectedAssessment = assessmentQuery.data.find(
      (c) => c.assessmentId === value.original.assessmentId
    );
    if (selectedAssessment) setAssessment(selectedAssessment);

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
    assessmentQuery,
    assessmentInfo,
    isConfirmDelete,
    onToggleModal,
    onDelete,
    onDeleteAssessment,
    assessment,
    setAssessment,
    createAssessment,
    editAssessment,
  };
};
