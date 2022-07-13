import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";
import {
  createAssessmentSchedules,
  deteleAssessmentSchedules,
  getAssessmentSchedule,
  getAssessmentScheduleById,
  updateAssessmentSchedule,
} from "../api";

const GET_ASSESSMENT_SCHEDULE = "GET_ASSESSMENT_SCHEDULE";
const GET_ASSESSMENT_SCHEDULE_BY_ID = "ASSESSMENT_SCHEDULE_BY_ID";

export const useAssessmentSchedule = ({ load = false, scheduleId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const assessmentScheduleQuery = useQuery(GET_ASSESSMENT_SCHEDULE, getAssessmentSchedule, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });
  const assessmentScheduleInfo = useQuery(
    `${GET_ASSESSMENT_SCHEDULE_BY_ID}_${scheduleId}`,
    () => getAssessmentScheduleById(scheduleId),
    {
      refetchOnWindowFocus: false,
      enabled: scheduleId > 0,
    }
  );

  useEffect(() => {
    if (assessmentScheduleInfo.data) {
      setAssessmentSchedule(assessmentScheduleInfo.data);
    }
  }, [assessmentScheduleInfo.data]);

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [assesmentSchedule, setAssessmentSchedule] = useImmer({
    assessmentId: "",
    scheduledDate: "",
    slots: [
      {
        userLimit: 1,
        startAt: "",
        endAt: "",
      },
    ],
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setAssessmentSchedule((draft) => {
      draft[name] = value;
    });
  };

  const createAssessmentSchedule = useMutation(createAssessmentSchedules, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_ASSESSMENT_SCHEDULE);
      navigate("..", { replace: true });
    },
  });

  const editAssessmentSchedule = useMutation(updateAssessmentSchedule, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_ASSESSMENT_SCHEDULE);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deleteAssessmentSchedule = useMutation(deteleAssessmentSchedules, {
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_ASSESSMENT_SCHEDULE);
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedAssessmentSchedule = assessmentScheduleQuery.data.find(
      (c) => c.scheduleId === id
    );

    if (selectedAssessmentSchedule) setAssessmentSchedule(selectedAssessmentSchedule);

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
    assesmentSchedule,
    setAssessmentSchedule,
    assessmentScheduleQuery,
    assessmentScheduleInfo,
    createAssessmentSchedule,
    editAssessmentSchedule,
    onDelete,
    onChange,
    isConfirmDelete,
    onToggleModal,
    deleteAssessmentSchedule,
  };
};
