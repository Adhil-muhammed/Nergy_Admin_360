import React from "react";
import { useAppStore } from "store/AppStore";
import { useImmer } from "use-immer";
import Avatar from "../../assets/images/faces/1.jpg";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ModalLayout } from "shared/components";
import { useAuthenticate } from "../hooks";

export function Header() {
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [isDropDown, setIsDropDown] = useImmer(false);
  const navigate = useNavigate();
  const { AppState } = useAppStore();
  const {
    user: { email, firstName },
  } = AppState;

  const { userSignOut } = useAuthenticate();

  const toggleDropdown = () => {
    setIsDropDown((state) => !state);
  };
  const navigateTo = (path) => {
    navigate(path, { replace: true });
  };
  const onToggleModal = React.useCallback(
    (isOpen) => {
      setIsConfirmDelete((draft) => {
        draft = isOpen;
        return draft;
      });
    },
    [setIsConfirmDelete]
  );
  return (
    <>
      <header className="mb-3">
        <nav className="navbar navbar-expand navbar-light ">
          <div className="container-fluid">
            <a className="burger-btn d-block">
              <i className="bi bi-justify fs-3" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown me-1">
                  <a
                    className="nav-link active dropdown-toggle text-gray-600"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-envelope bi-sub fs-4" />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <h6 className="dropdown-header">Mail</h6>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        No new mail
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown me-3">
                  <a
                    className="nav-link active dropdown-toggle text-gray-600"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-bell bi-sub fs-4" />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <h6 className="dropdown-header">Notifications</h6>
                    </li>
                    <li>
                      <a className="dropdown-item">No notification available</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div>
                <Dropdown className="dropdown" isOpen={isDropDown} toggle={toggleDropdown}>
                  <DropdownToggle tag="a" style={{ cursor: "pointer" }}>
                    <div className="user-menu d-flex">
                      <div className="user-name text-end me-3">
                        <h6 className="mb-0 text-gray-600">{firstName}</h6>
                        <p className="mb-0 text-sm text-gray-600">{email}</p>
                      </div>
                      <div className="user-img d-flex align-items-center">
                        <div className="avatar">
                          <img src={Avatar} />
                        </div>
                      </div>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Hello, {firstName}!</DropdownItem>
                    <DropdownItem onClick={() => navigateTo("/admin")}>
                      <i className="icon-mid bi bi-house-door me-2" /> Dashboard
                    </DropdownItem>
                    <DropdownItem onClick={() => navigateTo("/admin/settings")}>
                      <i className="icon-mid bi bi-gear me-2" /> Settings
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => onToggleModal(true)}>
                      <i className="icon-mid bi bi-box-arrow-left me-2" /> Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to logout?`}
        onConfirm={() => userSignOut()}
        onCancel={() => onToggleModal(false)}
      />
    </>
  );
}
