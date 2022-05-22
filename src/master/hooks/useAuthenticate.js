import { useImmer } from "use-immer";
import { authenticate } from "..";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const useAuthenticate = () => {
  const [authenticateState, setAuthenticateState] = useImmer({
    credential: { userName: "", password: "" },
    isValidate: false,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(authenticate, {
    onSuccess: (data) => {
      setAuthenticateState((draft) => {
        draft.isValidate = true;
      });
      if (data.isSuccess && data.token) {
        localStorage.setItem("token", data.token);
        navigate("../admin", { replace: true });
      }
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  return { authenticateState, setAuthenticateState, mutation };
};
