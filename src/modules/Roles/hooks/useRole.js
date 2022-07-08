import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getRoles, createRoles, updateRoles, deteleRoles, getRoleById } from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_ROLES = "GET_ROLES";
const GET_ROLE_BY_ID = "GET_ROLE_BY_ID";

export const useRole = ({ load = false, roleId = 0 }) => {
  const navigate = useNavigate();
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [role, setRole] = useImmer({
    roleId: "",
    name: "",
  });

  const queryClient = useQueryClient();
  const rolesQuery = useQuery(GET_ROLES, getRoles, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });

  const roleInfo = useQuery(`${GET_ROLE_BY_ID}_${roleId}`, () => getRoleById(roleId), {
    refetchOnWindowFocus: false,
    enabled: roleId ? true : false,
  });

  useEffect(() => {
    if (roleInfo.data) {
      setRole(roleInfo.data);
    }
  }, [roleInfo.data]);

  const createRole = useMutation(createRoles, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_ROLES);
      navigate("..", { replace: true });
    },
  });

  const editRole = useMutation(updateRoles, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_ROLES);
      navigate("..", { replace: true });
    },
  });

  const deleteRole = useMutation(deteleRoles, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_ROLES);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (roleId) => {
    const selectedRole = rolesQuery.data.find((c) => c.roleId === roleId);
    if (selectedRole) setRole(selectedRole);
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
    role,
    setRole,
    roleInfo,
    rolesQuery,
    createRole,
    editRole,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteRole,
  };
};
