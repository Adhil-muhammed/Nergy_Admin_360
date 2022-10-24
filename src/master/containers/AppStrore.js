import React, { useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import { AppContext } from "..";
import { useAuthorize } from "..";

export const AppStore = (props) => {
    const initial = {
        isAuthenticated: false,
        user: "",
        token: "",
        error: null,
    };

    const localData = JSON.parse(localStorage.getItem("localData"));
    const [AppState, setAppState] = useImmer(localData || initial);

    const { hasPermission } = useAuthorize(AppState.token);

    useEffect(() => {
        localStorage.setItem("localData", JSON.stringify(AppState));
        return () => { };
    }, [AppState]);

    return (
        <AppContext.Provider
            value={{
                AppState,
                setAppState,
                hasPermission
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

