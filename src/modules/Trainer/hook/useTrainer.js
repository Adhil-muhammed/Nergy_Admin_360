import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getTrainer, createTrainers, updateTrainer, deleteTrainerById, getTrainerById } from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_TRAINER = "GET_TRAINER";
const GET_TRAINER_BY_ID = "GET_TRAINER_BY_ID";

export const useTrainer = ({ load = false, trainerId = undefined }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useImmer({
    pageIndex: 1,
    pageSize: 10,
  });

  const trainersQuery = useQuery([GET_TRAINER, page], () => getTrainer(page), {
    keepPreviousData: true,
    enabled: load,
    staleTime: Infinity,
  });

  const trainerInfo = useQuery(
    `${GET_TRAINER_BY_ID}_${trainerId}`,
    () => getTrainerById(trainerId),
    {
      refetchOnWindowFocus: false,
      enabled: trainerId != undefined,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (trainerInfo.data) {
      setTrainer(trainerInfo.data);
    }
  }, [trainerInfo.data]);

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);

  const [trainer, setTrainer] = useImmer({
    trainerId: 0,
    firstName: "",
    lastName: "",
    gender: -1,
    emailAddress: "",
    qualification: "",
    dateOfBirth: "",
    userStatus: -1,
  });

  const createTrainer = useMutation(createTrainers, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      console.log("sss");
      successMessage();
      queryClient.invalidateQueries(GET_TRAINER);
      navigate("..", { replace: true });
    },
    onSettled: () => {
      setPage((draft) => {
        draft.pageIndex = 1;
        draft.pageSize = 2;
      });
    },
  });

  const editTrainer = useMutation(updateTrainer, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_TRAINER);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deleteTrainer = useMutation(deleteTrainerById, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_TRAINER);
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
      setTrainer((draft) => {
        console.log(id);
        draft.trainerId = id;
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

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      setPage((draft) => {
        draft.pageIndex = pageIndex;
        draft.pageSize = pageSize;
      });
    },
    [setPage]
  );

  return {
    trainer,
    setTrainer,
    trainersQuery,
    trainerInfo,
    createTrainer,
    editTrainer,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteTrainer,
    setPage,
    page,
    fetchData,
  };
};
