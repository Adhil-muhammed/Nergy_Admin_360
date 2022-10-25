import React from "react";
import { useAppScopeContext, useAuthorize } from "..";

export const AuthContext = React.createContext();

export const AuthorizeScope = (props) => {
    const { AppState } = useAppScopeContext();
    const { hasPermission, userPermissionQuery } = useAuthorize(AppState.token);

    return (
        <AuthContext.Provider
            value={{
                hasPermission
            }}
        >
            {userPermissionQuery.data ? props.children : null}
        </AuthContext.Provider>
    );
};