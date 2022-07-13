import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { successDeletedMessage, errorMessage } from "utils";
import { deleteAssessmentSlot, getAllSlotsByScheduleID } from "../api/AssessmentSlotsApi";

const GET_ASSESSMENT_SLOT_ID = "ASSESSMENT_SLOT_BY_ID";

export const useAssessmentSlots = ({ scheduleId = 0 }) => {
  const queryClient = useQueryClient();

  const assessmentScheduleInfo = useQuery(
    `${GET_ASSESSMENT_SLOT_ID}_${scheduleId}`,
    () => getAllSlotsByScheduleID(scheduleId),
    {
      refetchOnWindowFocus: false,
      enabled: scheduleId > 0,
    }
  );

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [deleteProperties, setDeleteProperties] = useImmer({ slotId: "", scheduleId: "" });

  const deleteAssessmentSlots = useMutation(deleteAssessmentSlot, {
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(`${GET_ASSESSMENT_SLOT_ID}_${scheduleId}`);
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    setIsConfirmDelete((draft) => {
      draft = true;
      return draft;
    });
    setDeleteProperties((draft) => {
      draft.slotId = id;
      draft.scheduleId = scheduleId;
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
    assessmentScheduleInfo,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteAssessmentSlots,
    deleteProperties,
  };
};
