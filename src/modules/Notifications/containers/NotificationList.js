import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { NotificationFilter } from "..";
import { Button, Badge } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotification } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { useAuthorizeContext } from "master";


export const NotificationList = () => {
  const { hasPermission } = useAuthorizeContext();
  const hasCreatePermission = hasPermission("Notifications", "Create");
  const hasEditPermission = hasPermission("Notifications", "Edit");
  const hasDeletePermission = hasPermission("Notifications", "Delete");

  const {
    notification,
    notificationsQuery,
    onDelete,
    onToggleModal,
    isConfirmDelete,
    deleteNotification,
  } = useNotification({
    load: true,
  });

  const { data, isLoading } = notificationsQuery;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteNotification.mutate(notification.id);
  };

  const onEdit = (notificationId) => {
    history(`${location.pathname}/edit/${notificationId}`);
  };

  const StatusIndicator = ({ value }) => {
    return <Badge color={value ? "success" : "secondary"}>{value ? "Active" : "Inactive"}</Badge>;
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        {
          hasEditPermission && <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
            <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
          </Button>
        }
        {
          hasDeletePermission && <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
            <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
          </Button>
        }
      </>
    );
  };

  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Status",
      accessor: "isActive",
      Cell: StatusIndicator,
    },
  ];

  if (hasDeletePermission || hasEditPermission) {
    columns.push({
      Header: "Actions",
      accessor: "id",
      id: "actions",
      Cell: ActionButtons,
    });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Notifications"}
      subtitle={"List"}
      breadcrumb={[{ label: "Notifications", location: "/notifications" }]}
    >
      {
        hasCreatePermission && <NotificationFilter />
      }
      <TableLayout columns={columns} data={data} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${notification.title}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
