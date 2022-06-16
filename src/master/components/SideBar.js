import { NavLink } from "react-router-dom";
import Nergy360Logo from "../../assets/images/logo/360logo.png";

export function SideBar() {
  return (
    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active">
        <div className="sidebar-header">
          <div className="d-flex justify-content-between">
            <div className="logo">
              <a href="/">
                <img style={{height: '54px'}} src={Nergy360Logo} alt="Logo" />
              </a>
            </div>
            <div className="toggler">
              <a href="#" className="sidebar-hide d-xl-none d-block">
                <i className="bi bi-x bi-middle" />
              </a>
            </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-title">Menu</li>
            <li className="sidebar-item  ">
              <NavLink to={"/admin"} className="sidebar-link">
                <i className="bi bi-grid-fill" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"batch"} href="index.html" className="sidebar-link">
                <i className="bi bi-people-fill" />
                <span>Batch</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"role"} href="index.html" className="sidebar-link">
                <i className="bi bi-gear-fill" />
                <span>Role</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"student"} href="index.html" className="sidebar-link">
                <i className="bi bi-person-fill" />
                <span>Student</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"institute"} href="index.html" className="sidebar-link">
                <i className="bi bi-house-door-fill" />
                <span>Institute</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"questionbanks"} href="index.html" className="sidebar-link">
                <i className="bi bi-archive-fill" />
                <span>QuestionBanks</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"courses"} href="index.html" className="sidebar-link">
                <i className="bi bi-book-fill" />
                <span>Courses</span>
              </NavLink>
            </li>

            <li className="sidebar-item  has-sub">
              <a className="sidebar-link">
                <i className="bi bi-collection-fill" />
                <span>Extra Components</span>
              </a>
              <ul className="submenu ">
                <li className="submenu-item ">
                  <a href="extra-component-avatar.html">Avatar</a>
                </li>
                <li className="submenu-item ">
                  <a href="extra-component-sweetalert.html">Sweet Alert</a>
                </li>
                <li className="submenu-item ">
                  <a href="extra-component-toastify.html">Toastify</a>
                </li>
                <li className="submenu-item ">
                  <a href="extra-component-rating.html">Rating</a>
                </li>
                <li className="submenu-item ">
                  <a href="extra-component-divider.html">Divider</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <button className="sidebar-toggler btn x">
          <i data-feather="x" />
        </button>
      </div>
    </div>
  );
}
