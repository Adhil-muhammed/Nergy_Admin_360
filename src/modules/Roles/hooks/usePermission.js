import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { updateModulePermissions, getModulePermissions } from "..";
import { successMessage, errorMessage } from "utils";
import { useImmer } from "use-immer";

const GET_PERMISSIONS = "GET_PERMISSIONS";

export const usePermission = ({ userRole = "" }) => {
  const queryClient = useQueryClient();
  const [modulePermissions, setmodulePermissions] = useImmer([]);

  const permissionQuery = useQuery(
    `${GET_PERMISSIONS}_${userRole}`,
    async () => await getModulePermissions(userRole),
    {
      refetchOnWindowFocus: false,
      enabled: userRole != "",
      staleTime: Infinity,
    }
  );

  React.useEffect(() => {
    if (permissionQuery.data) {
      setmodulePermissions((draft) => {
        draft = permissionQuery.data;
        return draft;
      })
    }

  }, [permissionQuery.data])

  const updatePermission = useMutation(updateModulePermissions, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(`${GET_PERMISSIONS}_${userRole}`);
      successMessage();
    },
    onError: (data) => {
      errorMessage();
    },
    onSettled: () => {
    },
  });

  return {
    permissionQuery,
    updatePermission,
    modulePermissions,
    setmodulePermissions
  };
};
