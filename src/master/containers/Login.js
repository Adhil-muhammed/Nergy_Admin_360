import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useAppStore } from "store/AppStore";
import { useAuthenticate } from "..";
import Nergy360Logo from "../../assets/images/logo/360logo.png";
import appInfo from "../../../package.json";
export function Login() {
  const { authenticateState, setAuthenticateState, mutation } = useAuthenticate();
  const { AppState } = useAppStore();
  const navigate = useNavigate();
  const { mutate, isLoading } = mutation;
  const onsubmit = () => {
    setAuthenticateState((draft) => {
      draft.isValidate = true;
    });
    mutate(authenticateState.credential);
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
                  <input
                    type="text"
                    className="form-control form-control-xl"
                    placeholder="Username"
                    value={authenticateState.userName}
                    disabled={isLoading}
                    onChange={(e) => {
                      setAuthenticateState((draft) => {
                        draft.credential.userName = e.target.value;
                      });
                    }}
                  />
                  <div className="form-control-icon">
                    <i className="bi bi-person" />
                  </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                  <input
                    type="password"
                    className="form-control form-control-xl"
                    placeholder="Password"
                    disabled={isLoading}
                    value={authenticateState.password}
                    onChange={(e) => {
                      setAuthenticateState((draft) => {
                        draft.credential.password = e.target.value;
                      });
                    }}
                  />
                  <div className="form-control-icon">
                    <i className="bi bi-shield-lock" />
                  </div>
                </div>
                <div className="form-check form-check-lg d-flex align-items-end">
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
                </div>
                <button
                  className="btn btn-block btn-lg shadow-lg mt-5 btn-success"
                  disabled={isLoading}
                  onClick={(e) => {
                    onsubmit();
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
    </div>
  );
}
