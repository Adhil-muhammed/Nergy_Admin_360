import React from "react";
import { useQuery } from "react-query";
import { getPermission } from "..";

const GET_USER_PERMISSION = "GET_USER_PERMISSION";

export const useAuthorize = () => {
    const userPermissionQuery = useQuery(GET_USER_PERMISSION, getPermission, {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    const hasPermission = React.useCallback((module, action) => {
        return true;

    }, [])

    return { hasPermission }
}