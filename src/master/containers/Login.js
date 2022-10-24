import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useAuthenticate, useAppStore } from "..";
import Nergy360Logo from "../../assets/images/logo/360logo.png";
import appInfo from "../../../package.json";
import SimpleReactValidator from "simple-react-validator";
import { Input, FormFeedback } from "reactstrap";


export function Login() {
  const { authenticateState, setAuthenticateState, mutation } = useAuthenticate();
  const { userName, password } = authenticateState.credential;
  const { AppState } = useAppStore();
  const navigate = useNavigate();
  const { mutate, isLoading } = mutation;
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
      mutate(authenticateState.credential);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  useEffect(() => {
    if (AppState.token) return navigate("/admin");
  }, [AppState.token]);

  return (
    <div>
      <div id="auth">
        <div className="row h-100">
          <div className="col-lg-5 col-12">
            <div id="auth-left">
              <div className="auth-logo">
                <a href="/">
                  <img style={{ height: "68px" }} src={Nergy360Logo} alt="Logo" />
                </a>
              </div>
              <h1 className="auth-title">Log in.</h1>
              <p className="auth-subtitle mb-5">
                Log in with your data that you entered during registration.
              </p>
              <form>
                <div className="form-group position-relative has-icon-left mb-4">
                  <Input
                    type="text"
                    name="userName"
                    className="form-control form-control-xl"
                    placeholder="Username"
                    value={userName}
                    disabled={isLoading}
                    onChange={(e) => {
                      setAuthenticateState((draft) => {
                        draft.credential.userName = e.target.value;
                      });
                    }}
                    invalid={validator.current.message("username", userName, "required")}
                  />
                  <FormFeedback>
                    {validator.current.message("username", userName, "required")}
                  </FormFeedback>
                  <div className="form-control-icon">
                    <i className="bi bi-person" />
                  </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                  <Input
                    type="password"
                    name="password"
                    className="form-control form-control-xl"
                    placeholder="Password"
                    disabled={isLoading}
                    value={authenticateState.password}
                    onChange={(e) => {
                      setAuthenticateState((draft) => {
                        draft.credential.password = e.target.value;
                      });
                    }}
                    invalid={validator.current.message("password", password, "required")}
                  />
                  <FormFeedback>
                    {validator.current.message("password", password, "required")}
                  </FormFeedback>
                  <div className="form-control-icon">
                    <i className="bi bi-shield-lock" />
                  </div>
                </div>
                {/* <div className="form-check form-check-lg d-flex align-items-end">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    disabled={isLoading}
                    defaultValue
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label text-gray-600" htmlFor="flexCheckDefault">
                    Keep me logged in
                  </label>
                </div> */}
                <button
                  className="btn btn-block btn-lg shadow-lg mt-5 btn-success"
                  disabled={isLoading}
                  onClick={(e) => {
                    onsubmit(e);
                  }}
                >
                  {isLoading ? <Spinner type="border" color="light" /> : "Log in"}
                </button>
              </form>

              <div className="text-center mt-5 text-lg fs-4">
                <p>
                  <Link className="font-bold" to="/forgotPassword">
                    Forgot password?
                  </Link>
                  .
                </p>
                <small>v {appInfo.version}</small>
              </div>
            </div>
          </div>
          <div className="col-lg-7 d-none d-lg-block">
            {/* <div id="auth-right"></div> */}
            <div id="auth-right">
              <div className="fade-over"></div>
              {/* <div className="right-wrap-c">
                <h1>Nulla hendrerit dictum justo, non efficitur turpis faucibus eget.</h1>
                <h4>Vivamus imperdiet volutpat eros, vel aliquet sapien sagittis id.</h4>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
