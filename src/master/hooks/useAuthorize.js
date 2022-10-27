import React from "react";
import { useQuery } from "react-query";
import { getPermission } from "..";

const GET_USER_PERMISSION = "GET_USER_PERMISSION";

export const useAuthorize = (token = "") => {
    const userPermissionQuery = useQuery(GET_USER_PERMISSION, getPermission, {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        enabled: token != ""
    });

    const hasPermission = React.useCallback((moduleName, actionName) => {
        if (userPermissionQuery.status === "success") {
            const module = userPermissionQuery.data.find(d => d.name === moduleName);
            if (!module) {
                return false;
            } else {
                const action = module.actions.find(d => d.title === actionName);
                if (action) {
                    return action.allowed;
                }
                else {
                    return false
                }
            }
        }
        else {
            return false;
        }
    }, [userPermissionQuery.data])

    return { hasPermission, userPermissionQuery }
}