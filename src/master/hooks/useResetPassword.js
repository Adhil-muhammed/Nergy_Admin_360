import { useImmer } from "use-immer";
import { resetPassword } from "..";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { errorMessage } from "utils";
import React from "react";

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const passwordResetToken = searchParams.get('token');
  const [resetPasswordState, setResetPasswordState] = useImmer({
    credential: { emailAddress: "", newPassword: "", confirmPassword: "", passwordResetToken: "" },
    isValidate: false,
  });

  React.useEffect(() => {
    if (passwordResetToken) {
      setResetPasswordState((draft) => {
        draft.credential.passwordResetToken = passwordResetToken;
        return draft;
      });
    }
  }, [passwordResetToken]);

  const resetPasswordAuth = useMutation(resetPassword, {
    onSuccess: (data) => {
      setResetPasswordState((draft) => {
        draft.isValidate = true;
      });
      if (data) {
        navigate("/", { replace: true });
      } else {
        navigate("/forgotPassword", { replace: true });
      }
    },
    onError: (data) => {
      errorMessage(data.response.data.errors[0]);
      setResetPasswordState((draft) => {
        draft.credential = { emailAddress: "", newPassword: "", confirmPassword: "", passwordResetToken: "" };
        return draft;
      });
    },
    onSettled: () => {
    },
  });

  return {
    resetPasswordAuth,
    resetPasswordState,
    setResetPasswordState
  }

}