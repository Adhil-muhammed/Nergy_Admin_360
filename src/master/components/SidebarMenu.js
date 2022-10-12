import React, { useState, useEffect } from "react";
import { UncontrolledCollapse } from "reactstrap";
import { NavLink } from "react-router-dom";

const SidebarMenu = ({ title }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const menuData = [
      { id: 1, name: "Dashboard", pathName: "/dashboard", icon: "bi-grid-fill", children: [] },
      { id: 2, name: "Batch", pathName: "batch", icon: "bi-collection-fill", children: [] },
      { id: 3, name: "Student", pathName: "student", icon: "bi-person-fill", children: [] },
      { id: 4, name: "Institute", pathName: "institute", icon: "bi-house-door-fill", children: [] },
      {
        id: 5,
        name: "Assessment",
        pathName: "assessmentSection",
        icon: "bi-check-circle-fill",
        children: [
          {
            id: 1,
            name: "Assessment Section",
            pathName: "assessmentSection",
            icon: "bi-check-circle-fill",
            children: [],
          },
          {
            id: 2,
            name: "Assessments",
            pathName: "assessments",
            icon: "bi-check-circle-fill",
            children: [],
          },
          {
            id: 3,
            name: "Assessment Schedule",
            pathName: "assessment-schedule",
            icon: "bi-check-circle-fill",
            children: [],
          },
        ],
      },
      {
        id: 6,
        name: "QuestionBanks",
        pathName: "questionbanks",
        icon: "bi-archive-fill",
        children: [],
      },
      {
        id: 7,
        name: "Questions",
        pathName: "questions",
        icon: "bi-question-circle-fill",
        children: [],
      },
      { id: 8, name: "Courses", pathName: "courses", icon: "bi-book-fill", children: [] },
      { id: 9, name: "Reports", pathName: "reports", icon: "bi-pie-chart-fill", children: [] },
      {
        id: 10,
        name: "Certificates",
        pathName: "certificates",
        icon: "bi-award-fill",
        children: [],
      },
      {
        id: 11,
        name: "User",
        pathName: "users",
        icon: "bi-people-fill",
        children: [
          {
            id: 1,
            name: "Users",
            pathName: "users",
            icon: "bi-people-fill",
            children: [],
          },
          {
            id: 2,
            name: "Role",
            pathName: "role",
            icon: "bi-people-fill",
            children: [],
          },
        ],
      },
      { id: 12, name: "Settings", pathName: "settings", icon: "bi-gear-fill", children: [] },
      {
        id: 13,
        name: "Notifications",
        pathName: "notifications",
        icon: "bi-chat-right-text-fill",
        children: [],
      },
      {
        id: 14,
        name: "Support Ticket",
        pathName: "supportTicket",
        icon: "bi-tools",
        children: [],
      },
      {
        id: 15,
        name: "Program",
        pathName: "program",
        icon: "bi-file-earmark-text-fill",
        children: [],
      },
    ];

    const returnMenuItem = (item, i) => {
      let menuItem;

      if (item.children.length === 0) {
        menuItem = (
          <li className="sidebar-item" key={i}>
            <NavLink
              to={item.pathName}
              className="toggler sidebar-link"
              id={`toggle-menu-item-${item.id}`}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.name}</span>
            </NavLink>
          </li>
        );
      } else {
        let menuItemChildren = item.children.map((item, i) => {
          let menuItem = returnMenuItem(item, i);
          return menuItem;
        });

        menuItem = (
          <li key={i} className="sidebar-item has-sub">
            <NavLink
              to={item.pathName}
              className="toggler sidebar-link"
              id={`toggle-menu-item-${item.id}`}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.name}</span>
            </NavLink>

            <UncontrolledCollapse
              tag="ul"
              className="children ni-submenu"
              toggler={`#toggle-menu-item-${item.id}`}
            >
              {menuItemChildren}
            </UncontrolledCollapse>
          </li>
        );
      }
      return menuItem;
    };

    const load = async () => {
      setLoading(false);
      let menuItems = menuData.map((item, i) => {
        let menuItem = returnMenuItem(item, i);
        return menuItem;
      });
      setItems(menuItems);
    };

    if (loading) {
      load();
    }
  }, [loading]);

  return (
    <>
      <ul className="menu">
        <li className="sidebar-title">{title}</li>
        {items}
      </ul>
    </>
  );
};

export default SidebarMenu;
