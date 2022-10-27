import { useImmer } from "use-immer";
import { authenticate, getForgotPassword, resetPassword } from "..";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppScopeContext } from "master";
import { errorMessage, Axios } from "utils";

export const useAuthenticate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAppState } = useAppScopeContext();
  const [authenticateState, setAuthenticateState] = useImmer({
    credential: { userName: "", password: "" },
    isValidate: false,
  });

  const mutation = useMutation(authenticate, {
    onSuccess: (data) => {
      setAuthenticateState((draft) => {
        draft.isValidate = true;
      });
      if (data.token) {
        setAppState((draft) => data);
        navigate("/", { replace: true });
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
    window.location.href = "/admin/login";
  };

  return {
    authenticateState,
    setAuthenticateState,
    mutation,
    userSignOut,
  };
};
