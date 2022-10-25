import React from "react";
import { AuthContext } from "..";

export const useAuthorizeContext = () => React.useContext(AuthContext);