import { useImmer } from "use-immer";
import { getForgotPassword } from "..";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { errorMessage } from "utils";

export const useForgotPassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [forgotPassEmail, setForgotPassEmail] = useImmer({
    email: "",
    isValidate: false,
  });

  const forgotPasswordAuth = useMutation(getForgotPassword, {
    onSuccess: (data) => {
      setForgotPassEmail((draft) => {
        draft.isValidate = true;
      });
      navigate("/", { replace: true });
    },
    onError: (data) => {
      errorMessage(data.response.data.errors[0]);
    },
    onSettled: () => {
    },
  });


  return {
    forgotPassEmail,
    setForgotPassEmail,
    forgotPasswordAuth
  }

}