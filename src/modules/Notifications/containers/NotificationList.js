import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { NotificationFilter } from "..";
import { Button, Badge } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotification } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const NotificationList = () => {
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
        <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button>
        <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
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

    {
      Header: "Actions",
      accessor: "id",
      id: "actions",
      Cell: ActionButtons,
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Notifications"}
      subtitle={"List"}
      breadcrumb={[{ label: "Notifications", location: "/notifications" }]}
    >
      <NotificationFilter />
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
