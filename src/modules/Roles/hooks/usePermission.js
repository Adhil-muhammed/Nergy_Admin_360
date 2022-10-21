import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { updateModulePermissions, getModulePermissions } from "..";
import { successMessage, errorMessage } from "utils";
import { useImmer } from "use-immer";


const GET_PERMISSIONS = "GET_PERMISSIONS";

export const action_types = {
  View: "View",
  Create: "Create",
  Edit: "Edit",
  Delete: "Delete",
};

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

  // const rolesQuery = useQuery(GET_ROLES, async () => await getRoles(), {
  //   refetchOnWindowFocus: false,
  //   enabled: load,
  //   staleTime: Infinity,
  // });

  // const hasPermission = (module, action) => {
  //   if (permissionQuery.isSuccess && permissionQuery.data) {
  //     let permissionListLength = permissionQuery.data.length;
  //     for (let j = 0; j < permissionListLength; j++) {
  //       if (permissionQuery.data[j].name === module) {
  //         for (let i = 0; i < permissionQuery.data[j].actions.length; i++) {
  //           let action_name = permissionQuery.data[j].actions[i].name.split(".").at(-1).toString();
  //           if (action_name === action) {
  //             return permissionQuery.data[j].actions[i].allowed;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // };




  return {
    permissionQuery,
    updatePermission,
    modulePermissions,
    setmodulePermissions
  };
};
