import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getInstitutes, createInstitutes, updateInstitutes, deteleInstitutes } from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage } from "utils";

const GetInstituteKey = "GET_INSTITUTE_API";

export const useInstitute = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const institutesQuery = useQuery(GetInstituteKey, getInstitutes, { staleTime: Infinity });
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [institute, setInstitute] = useImmer({
    instituteId: 0,
    name: "string",
  });

  const createInstitute = useMutation(createInstitutes, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetInstituteKey);
      const data = queryClient.getQueryData(GetInstituteKey);
      queryClient.setQueryData(GetInstituteKey, (prevData) => {
        let updatedData = [...prevData, update];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetInstituteKey, previousData);
    },
    onSuccess: () => {
      successMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const editInstitute = useMutation(updateInstitutes, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetInstituteKey);
      const data = queryClient.getQueryData(GetInstituteKey);
      queryClient.setQueryData(GetInstituteKey, (prevData) => {
        let updatedData = prevData.map((p) => {
          let newData = { ...p };
          if (p.instituteId === update.instituteId) {
            newData.name = update.name;
          }
          return newData;
        });
        return updatedData;
      });
      return data;
    },
    onSuccess: () => {
      successMessage();
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetInstituteKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      navigate("../institute", { replace: true });
    },
  });

  const deleteInstitute = useMutation(deteleInstitutes, {
    onMutate: async (instituteId) => {
      await queryClient.cancelQueries(GetInstituteKey);
      const data = queryClient.getQueryData(GetInstituteKey);
      queryClient.setQueryData(GetInstituteKey, (prevData) => {
        let updatedData = [...prevData.filter((n) => n.instituteId !== instituteId)];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetInstituteKey, previousData);
    },
    onSuccess: () => {
      successDeletedMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      onToggleModal(false);
    },
  });

  const getSelectedInstitute = React.useCallback(
    (id) => {
      const selectedInstitute = institutesQuery.data.filter((s) => s.instituteId === id)[0];
      setInstitute((draft) => {
        draft.instituteId = selectedInstitute.instituteId;
        draft.name = selectedInstitute.name;
        return draft;
      });
    },
    [institutesQuery.data, setInstitute]
  );

  const onEdit = React.useCallback(
    (instituteId) => {
      getSelectedInstitute(instituteId);
    },
    [getSelectedInstitute]
  );

  const onDelete = React.useCallback(
    (id) => {
      getSelectedInstitute(id);
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    },
    [getSelectedInstitute, setIsConfirmDelete]
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
    institute,
    setInstitute,
    institutesQuery,
    createInstitute,
    editInstitute,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteInstitute,
  };
};
