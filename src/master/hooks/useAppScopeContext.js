import React from "react";
import { AppContext } from "..";

export const useAppScopeContext = () => React.useContext(AppContext);