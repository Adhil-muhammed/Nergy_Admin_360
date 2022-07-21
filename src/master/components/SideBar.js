import React from "react";
import { Link } from "react-router-dom";
import Nergy360Logo from "../../assets/images/logo/360logo.png";
import SidebarMenu from "./SidebarMenu";

export function SideBar() {
  return (
    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active">
        <div className="sidebar-header">
          <div className="d-flex justify-content-between">
            <div className="logo">
              <Link to="/admin">
                <img style={{ height: "54px" }} src={Nergy360Logo} alt="Logo" />
              </Link>
            </div>
            <div className="toggler">
              <a href="#" className="sidebar-hide d-xl-none d-block">
                <i className="bi bi-x bi-middle" />
              </a>
            </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <SidebarMenu title="Menu" />
          {/* <ul className="menu">
            <li className="sidebar-title">Menu</li>
            
            <li className="sidebar-item">
              <NavLink to={"/admin"} className="sidebar-link">
                <i className="bi bi-grid-fill" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"batch"} className="sidebar-link">
                <i className="bi bi-collection-fill"></i>
                <span>Batch</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"student"} className="sidebar-link">
                <i className="bi bi-person-fill" />
                <span>Student</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"institute"} className="sidebar-link">
                <i className="bi bi-house-door-fill" />
                <span>Institute</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"assessmentSection"} className="sidebar-link">
                <i className="bi bi-archive-fill" />
                <span>Assessment Section</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"assessments"} className="sidebar-link">
                <i className="bi bi-archive-fill" />
                <span>Assessments</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"assessment-schedule"} className="sidebar-link">
                <i className="bi bi-archive-fill" />
                <span>Assessment Schedule</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"questionbanks"} className="sidebar-link">
                <i className="bi bi-archive-fill" />
                <span>QuestionBanks</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"questions"} className="sidebar-link">
                <i className="bi bi-question-circle-fill" />
                <span>Questions</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"courses"} className="sidebar-link">
                <i className="bi bi-book-fill" />
                <span>Courses</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"reports"} className="sidebar-link">
                <i className="bi bi-book-fill" />
                <span>Reports</span>
              </NavLink>
            </li>
            <li className="sidebar-item  ">
              <NavLink to={"users"} className="sidebar-link">
                <i className="bi bi-people-fill" />
                <span>Users</span>
              </NavLink>
            </li>
            //
            <li className="sidebar-item has-sub">
              <NavLink to={"users"} className="sidebar-link">
                <i className="bi bi-people-fill" />
                <span>Users</span>
              </NavLink>
              <ul class="submenu">
                <li class="submenu-item ">
                  <a href="extra-component-avatar.html">Avatar</a>
                </li>
                <li class="submenu-item ">
                  <a href="extra-component-sweetalert.html">Sweet Alert</a>
                </li>
              </ul>
            </li> 
            //
            <li className="sidebar-item  ">
              <NavLink to={"settings"} className="sidebar-link">
                <i className="bi bi-gear-fill" />
                <span>Settings</span>
              </NavLink>
            </li> 
          </ul>*/}
        </div>
        <button className="sidebar-toggler btn x">
          <i data-feather="x" />
        </button>
      </div>
    </div>
  );
}
