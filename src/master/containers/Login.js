import { Input, Button, Spinner } from "reactstrap";
import { useAuthenticate } from "..";
import Nergy360Logo from "../../assets/images/logo/360logo.png";
export function Login() {
  const { authenticateState, setAuthenticateState, mutation } = useAuthenticate();
  const { mutate, isLoading } = mutation;
  const onsubmit = () => {
    setAuthenticateState((draft) => {
      draft.isValidate = true;
    });
    mutate(authenticateState.credential);
  };

  return (
    <div>
      <title>Login - Mazer Admin Dashboard</title>
      <div id="auth">
        <div className="row h-100">
          <div className="col-lg-5 col-12">
            <div id="auth-left">
              <div className="auth-logo">
                <a href="/">
                  <img style={{height: '68px'}} src={Nergy360Logo} alt="Logo" />
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
                  <Input
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
                  <Input
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
                <Button
                  className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                  disabled={isLoading}
                  onClick={(e) => {
                    onsubmit();
                  }}
                >
                  {isLoading ? <Spinner type="border" color="light" /> : "Log in"}
                </Button>
              </form>
              <div className="text-center mt-5 text-lg fs-4">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a href="auth-register.html" className="font-bold">
                    Sign up
                  </a>
                  .
                </p>
                <p>
                  <a className="font-bold" href="auth-forgot-password.html">
                    Forgot password?
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-7 d-none d-lg-block">
            <div id="auth-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
