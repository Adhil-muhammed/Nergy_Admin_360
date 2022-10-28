import React, { useState, useEffect } from "react";
import { UncontrolledCollapse } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useAuthorizeContext } from "master";

const SidebarMenu = ({ title }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { hasPermission } = useAuthorizeContext();

  useEffect(() => {
    const menuData = [
      { id: 1, name: "Dashboard", pathName: "/", icon: "bi-grid-fill", show: true, children: [] },
      {
        id: 2,
        name: "Batch",
        pathName: "batch",
        show: hasPermission("Batches", "View"),
        icon: "bi-collection-fill",
        children: [],
      },
      {
        id: 3,
        name: "Student",
        pathName: "student",
        show: hasPermission("Students", "View"),
        icon: "bi-person-fill",
        children: [],
      },
      {
        id: 4,
        name: "Institute",
        pathName: "institute",
        show: hasPermission("Institutes", "View"),
        icon: "bi-house-door-fill",
        children: [],
      },
      {
        id: 5,
        name: "Assessment",
        pathName: "assessmentSection",
        icon: "bi-check-circle-fill",
        show:
          hasPermission("AssessmentSections", "View") ||
          hasPermission("Assessments", "View") ||
          hasPermission("AssessmentSchedule", "View"),
        children: [
          {
            id: 1,
            name: "Assessment Section",
            pathName: "assessmentSection",
            show: hasPermission("AssessmentSections", "View"),
            icon: "bi-check-circle-fill",
            children: [],
          },
          {
            id: 2,
            name: "Assessments",
            pathName: "assessments",
            show: hasPermission("Assessments", "View"),
            icon: "bi-check-circle-fill",
            children: [],
          },
          {
            id: 3,
            name: "Assessment Schedule",
            pathName: "assessment-schedule",
            show: hasPermission("AssessmentSchedule", "View"),
            icon: "bi-check-circle-fill",
            children: [],
          },
        ],
      },
      {
        id: 6,
        name: "QuestionBanks",
        pathName: "questionbanks",
        show: hasPermission("QuestionBanks", "View"),
        icon: "bi-archive-fill",
        children: [],
      },
      {
        id: 7,
        name: "Questions",
        pathName: "questions",
        show: hasPermission("Questions", "View"),
        icon: "bi-question-circle-fill",
        children: [],
      },
      {
        id: 8,
        name: "Courses",
        pathName: "courses",
        show: hasPermission("Courses", "View"),
        icon: "bi-book-fill",
        children: [],
      },
      {
        id: 9,
        name: "Reports",
        pathName: "reports",
        show: true,
        icon: "bi-pie-chart-fill",
        children: [],
      },
      {
        id: 10,
        name: "Certificates",
        pathName: "certificates",
        show: hasPermission("Certificates", "View"),
        icon: "bi-award-fill",
        children: [],
      },
      {
        id: 11,
        name: "User",
        pathName: "users",
        icon: "bi-people-fill",
        show: hasPermission("Users", "View") || hasPermission("UserRoles", "View"),
        children: [
          {
            id: 1,
            name: "Users",
            pathName: "users",
            show: hasPermission("Users", "View"),
            icon: "bi-people-fill",
            children: [],
          },
          {
            id: 2,
            name: "Role",
            pathName: "role",
            show: hasPermission("UserRoles", "View"),
            icon: "bi-people-fill",
            children: [],
          },
        ],
      },
      {
        id: 12,
        name: "Settings",
        pathName: "settings",
        show: hasPermission("Settings", "View"),
        icon: "bi-gear-fill",
        children: [],
      },
      {
        id: 13,
        name: "Notifications",
        pathName: "notifications",
        show: hasPermission("Notifications", "View"),
        icon: "bi-chat-right-text-fill",
        children: [],
      },
      {
        id: 14,
        name: "Support Ticket",
        pathName: "supportTicket",
        show: hasPermission("SupportTickets", "View"),
        icon: "bi-tools",
        children: [],
      },
      {
        id: 15,
        name: "Program",
        pathName: "program",
        icon: "bi-file-earmark-text-fill",
        show: hasPermission("Program", "View"),
        children: [],
      },
      {
        id: 16,
        name: "Trainer",
        pathName: "trainer",
        icon: "bi-file-earmark-text-fill",
        show: true,
        children: [],
      },
      {
        id: 17,
        name: "Training Partner",
        pathName: "trainingpartner",
        show: true,
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
        if (item.show) {
          let menuItem = returnMenuItem(item, i);
          return menuItem;
        }
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
