import React, { useMemo } from "react";
import { useTable } from "react-table";
import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { SupportTicketFilter } from "..";
import { Button, Badge } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSupportTicket } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";

export const SupportTicketList = () => {
  const {
    supportTicket,
    supportTicketsQuery,
    onDelete,
    onToggleModal,
    isConfirmDelete,
    deteleSupportTicket,
  } = useSupportTicket({
    load: true,
  });

  const { data, isLoading } = supportTicketsQuery;
  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deteleSupportTicket.mutate(supportTicket.ticketId);
  };

  const onEdit = (ticketId) => {
    history(`${location.pathname}/edit/${ticketId}`);
  };

  const StatusIndicator = ({ value }) => {
    return (
      <Badge color={value === 0 ? "success" : "secondary"}>
        {value === 0 ? "Active" : "Inactive"}
      </Badge>
    );
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
      Header: "Subject",
      accessor: "subject",
    },
    {
      Header: "Message",
      accessor: "message",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: StatusIndicator,
    },
    {
      Header: "Actions",
      accessor: "ticketId",
      id: "actions",
      Cell: ActionButtons,
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Support Tickets"}
      subtitle={"List"}
      breadcrumb={[{ label: "Support ticket", location: "/supportTicket" }]}
    >
      <SupportTicketFilter />
      <TableLayout columns={columns} data={data} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete ${supportTicket.message} ?`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
