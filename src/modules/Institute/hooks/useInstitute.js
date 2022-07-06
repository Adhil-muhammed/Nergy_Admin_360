import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  getInstitutes,
  createInstitutes,
  updateInstitutes,
  deteleInstitutes,
  getInstituteById,
} from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_INSTITUTES = "GET_INSTITUTES";
const GET_INSTITUTE_BY_ID = "GET_INSTITUTE_BY_ID";

export const useInstitute = ({ load = false, instituteId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const institutesQuery = useQuery(GET_INSTITUTES, getInstitutes, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });
  const instituteInfo = useQuery(
    `${GET_INSTITUTE_BY_ID}_${instituteId}`,
    () => getInstituteById(instituteId),
    {
      refetchOnWindowFocus: false,
      enabled: instituteId > 0,
    }
  );
  useEffect(() => {
    console.log(instituteInfo.data);
    if (instituteInfo.data) {
      setInstitute(instituteInfo.data);
    }
  }, [instituteInfo.data]);
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [institute, setInstitute] = useImmer({
    instituteId: 0,
    name: "",
  });

  const createInstitute = useMutation(createInstitutes, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_INSTITUTES);
      navigate("..", { replace: true });
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const editInstitute = useMutation(updateInstitutes, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_INSTITUTES);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deleteInstitute = useMutation(deteleInstitutes, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_INSTITUTES);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedInstitute = institutesQuery.data.find((c) => c.instituteId === id);
    if (selectedInstitute) setInstitute(selectedInstitute);

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
    institute,
    setInstitute,
    institutesQuery,
    instituteInfo,
    createInstitute,
    editInstitute,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteInstitute,
  };
};
