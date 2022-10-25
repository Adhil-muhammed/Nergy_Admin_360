import React, { useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import { useAuthorize } from "..";

export const AppContext = React.createContext();

export const AppScope = (props) => {
    const initial = {
        isAuthenticated: false,
        user: "",
        token: "",
        error: null,
    };

    const localData = JSON.parse(localStorage.getItem("localData"));
    const [AppState, setAppState] = useImmer(localData || initial);

    useEffect(() => {
        localStorage.setItem("localData", JSON.stringify(AppState));
        return () => { };
    }, [AppState]);

    return (
        <AppContext.Provider
            value={{
                AppState,
                setAppState,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

