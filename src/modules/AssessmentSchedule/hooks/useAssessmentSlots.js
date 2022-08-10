import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { successDeletedMessage, errorMessage, successMessage } from "utils";
import {
  deleteAssessmentSlot,
  getAllSlotsByScheduleID,
  editAssessmentSlot,
} from "../api/AssessmentSlotsApi";
import moment from "moment";

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
  const [isOpenSlotModal, setIsOpenSlotModal] = useImmer(false);

  const [deleteProperties, setDeleteProperties] = useImmer({ slotId: "", scheduleId: "" });
  const [slotProperties, setSlotProperties] = useImmer({
    slotId: "",
    userLimit: 0,
    startAt: "",
    endAt: "",
  });

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

  const editAssessmentSlots = useMutation(editAssessmentSlot, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(`${GET_ASSESSMENT_SLOT_ID}_${scheduleId}`);
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
    onSettled: () => {
      setIsOpenSlotModal(false);
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

  const onEdit = (id) => {
    const selectedSlot = assessmentScheduleInfo.data.find((item, index) => item.slotId === id);
    setDeleteProperties((draft) => {
      draft.scheduleId = scheduleId;
    });
    setSlotProperties((draft) => {
      draft.slotId = selectedSlot.slotId;
      draft.userLimit = selectedSlot.userLimit;
      draft.startAt = moment(selectedSlot.startAt, "HH:mm").format("YYYY-MM-DDTHH:mm:ss");
      draft.endAt = moment(selectedSlot.endAt, "HH:mm").format("YYYY-MM-DDTHH:mm:ss");
      return draft;
    });
    setIsOpenSlotModal((draft) => {
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
    assessmentScheduleInfo,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteAssessmentSlots,
    deleteProperties,
    editAssessmentSlots,
    isOpenSlotModal,
    setIsOpenSlotModal,
    slotProperties,
    setSlotProperties,
    onEdit,
  };
};
