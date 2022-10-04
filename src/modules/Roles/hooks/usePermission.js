import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getRoles, getModulePermissions } from "..";

const GET_ROLES = "GET_ROLES";
const GET_PERMISSIONS = "GET_PERMISSIONS";

export const action_types = {
  View: "View",
  Create: "Create",
  Edit: "Edit",
  Delete: "Delete",
};

export const usePermission = ({ load = false }) => {
  const [userRole, setUserRole] = useImmer("Admin");
  // const { AppState } = useAppStore();
  // const {
  //   user: { role },
  // } = AppState;

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem("localData"));
    // console.log(localUserData);
    // setUserRole(localUserData.user.role);
  }, []);

  const queryClient = useQueryClient();

  const permissionQuery = useQuery(
    `${GET_PERMISSIONS}_${userRole}`,
    async () => await getModulePermissions(userRole),
    {
      refetchOnWindowFocus: false,
      enabled: load,
      staleTime: Infinity,
    }
  );
  const rolesQuery = useQuery(GET_ROLES, async () => await getRoles(), {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });

  const hasPermission = (module, action) => {
    if (permissionQuery.isSuccess && permissionQuery.data) {
      let permissionListLength = permissionQuery.data.length;
      for (let j = 0; j < permissionListLength; j++) {
        if (permissionQuery.data[j].name === module) {
          for (let i = 0; i < permissionQuery.data[j].actions.length; i++) {
            let action_name = permissionQuery.data[j].actions[i].name.split(".").at(-1).toString();
            if (action_name === action) {
              return permissionQuery.data[j].actions[i].allowed;
            }
          }
        }
      }
    }
    return false;
  };

  return {
    userRole,
    setUserRole,
    rolesQuery,
    hasPermission,
    permissionQuery,
  };
};
