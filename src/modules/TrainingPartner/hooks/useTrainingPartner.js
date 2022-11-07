import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";
import {
  getTrainingPartner,
  getTrainingPartnerById,
  createTrPartner,
  updateTrainingPartner,
  deleteTrPartner,
} from "..";

const GET_TRAININGPARTNER = "GET_TRAININGPARTNER";
const GET_TRAININGPARTNER_BY_ID = "GET_TRAININGPARTNER_BY_ID";

export const useTrainingPartner = ({ load = false, trainingPartnerId = undefined }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const trainingPartnerQuery = useQuery(GET_TRAININGPARTNER, getTrainingPartner, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });

  const trainerPartnerInfo = useQuery(
    `${GET_TRAININGPARTNER_BY_ID}_${trainingPartnerId}`,
    () => getTrainingPartnerById(trainingPartnerId),
    {
      refetchOnWindowFocus: false,
      enabled: trainingPartnerId != undefined,
    }
  );

  useEffect(() => {
    if (trainerPartnerInfo.data) {
      setTrainingPartner(trainerPartnerInfo.data);
    }
  }, [trainerPartnerInfo.data]);

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);

  const [trainingPartner, setTrainingPartner] = useImmer({
    trainingPartnerId: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    userStatus: "",
  });

  const createTrainingPartner = useMutation(createTrPartner, {
    onError: (e, newData, previousData) => {
      errorMessage(e.response.data.message);
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_TRAININGPARTNER);
      navigate("..", { replace: true });
    },
  });

  const editTrainingPartner = useMutation(updateTrainingPartner, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_TRAININGPARTNER);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage(e.response.data.message);
    },
  });

  const deleteTrainingPartner = useMutation(deleteTrPartner, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_TRAININGPARTNER);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = React.useCallback(
    (id) => {
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
      setTrainingPartner((draft) => {
        draft.trainingPartnerId = id;
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
    trainingPartner,
    setTrainingPartner,
    trainingPartnerQuery,
    trainerPartnerInfo,
    createTrainingPartner,
    editTrainingPartner,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteTrainingPartner,
  };
};
