import { useImmer } from "use-immer";
import { authenticate, getForgotPassword, resetPassword } from "..";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "store/AppStore";
import { errorMessage, Axios } from "utils";

export const useAuthenticate = () => {  
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAppState } = useAppStore();
  const [authenticateState, setAuthenticateState] = useImmer({
    credential: { userName: "", password: "" },
    isValidate: false,
  });

  const [forgotPassEmail, setForgotPassEmail] = useImmer({
    email: "",
    isValidate: false,
  }); 


  const mutation = useMutation(authenticate, {
    onSuccess: (data) => {
      setAuthenticateState((draft) => {
        draft.isValidate = true;
      });
      if (data.token) {
        setAppState((draft) => data);
        navigate("../admin", { replace: true });
      }
    },
    onError: (data) => {
      errorMessage(data.response.data.errors[0]);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const forgotPasswordAuth = useMutation(getForgotPassword, {
    onSuccess: (data) => {
      setForgotPassEmail((draft) => {
        draft.isValidate = true;
      });
      if (data) {
        localStorage.setItem("passwordResetToken", data);
        navigate("../resetPassword", { replace: true });
      }
    },
    onError: (data) => {
      errorMessage(data.response.data.errors[0]);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const userSignOut = async () => {
    localStorage.removeItem("localData");
    await Axios.post("/Accounts/SignOut");
  };

  return {
    authenticateState,
    setAuthenticateState,
    mutation,
    forgotPasswordAuth,
    setForgotPassEmail,
    forgotPassEmail,
    userSignOut,
  };
};
