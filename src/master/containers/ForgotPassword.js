import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useForgotPassword } from "..";
import Nergy360Logo from "../../assets/images/logo/360logo.png";
import SimpleReactValidator from "simple-react-validator";
import { Input, FormFeedback } from "reactstrap";

export function ForgotPassword() {
  const { forgotPasswordAuth, setForgotPassEmail, forgotPassEmail } = useForgotPassword();
  const { mutate, isLoading } = forgotPasswordAuth;
  const { email } = forgotPassEmail;
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  const onsubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (validator.current.allValid()) {
      mutate(email);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <div>
      <title>Forgot password - Mazer Admin Dashboard</title>
      <div id="auth">
        <div className="row h-100">
          <div className="col-lg-5 col-12">
            <div id="auth-left">
              <div className="auth-logo">
                <a href="/">
                  <img style={{ height: "68px" }} src={Nergy360Logo} alt="Logo" />
                </a>
              </div>
              <h1 className="auth-title">Forgot Password.</h1>
              <p className="auth-subtitle mb-5">
                Provide your registered email address.
              </p>
              <form>
                <div className="form-group position-relative has-icon-left mb-4">
                  <Input
                    type="email"
                    className="form-control form-control-xl"
                    placeholder="Email address"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => {
                      setForgotPassEmail((draft) => {
                        draft.email = e.target.value;
                      });
                    }}
                    invalid={validator.current.message("email", email, "required")}
                  />
                  <FormFeedback>
                    {validator.current.message("email", email, "required")}
                  </FormFeedback>
                  <div className="form-control-icon">
                    <i className="bi bi-envelope" />
                  </div>
                </div>
                <button
                  className="btn btn-block btn-lg shadow-lg mt-5 btn-success"
                  disabled={isLoading}
                  onClick={(e) => {
                    onsubmit(e);
                  }}
                >
                  {isLoading ? <Spinner type="border" color="light" /> : "Send"}
                </button>
              </form>
              <div className="text-center mt-5 text-lg fs-4">
                <p className="text-gray-600">
                  Remember your account?{" "}
                  <Link className="font-bold" to="/">Login</Link>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-7 d-none d-lg-block">
            {/* <div id="auth-right"></div> */}
            <div id="auth-right">
              <div className="fade-over"></div>
              <div className="right-wrap-c">
                <h1>Nulla hendrerit dictum justo, non efficitur turpis faucibus eget.</h1>
                <h4>Vivamus imperdiet volutpat eros, vel aliquet sapien sagittis id.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
