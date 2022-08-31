import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  getSupportTickets,
  getSupportTicketById,
  createSupportTicket,
  updateSupportTicket,
  deteleSupportTickets,
} from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_SUPPORT_TICKETS = "GET_SUPPORT_TICKETS";
const GET_SUPPORT_TICKETS_BY_ID = "GET_SUPPORT_TICKETS_BY_ID";

export const useSupportTicket = ({ load = false, ticketId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const supportTicketsQuery = useQuery(GET_SUPPORT_TICKETS, getSupportTickets, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });
  const supportTicketInfo = useQuery(
    `${GET_SUPPORT_TICKETS_BY_ID}_${ticketId}`,
    () => getSupportTicketById(ticketId),
    {
      refetchOnWindowFocus: false,
      enabled: !!ticketId,
    }
  );

  useEffect(() => {
    if (supportTicketInfo.data) {
      setSupportTicket(supportTicketInfo.data);
    }
  }, [supportTicketInfo.data]);

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [supportTicket, setSupportTicket] = useImmer({
    date: "",
    subject: "",
    message: "",
    studentId: "",
    userId: "",
    status: 0,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setSupportTicket((draft) => {
      draft[name] = value;
    });
  };

  const createSupportTickets = useMutation(createSupportTicket, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_SUPPORT_TICKETS);
      navigate("..", { replace: true });
    },
  });

  const editSupportTickets = useMutation(updateSupportTicket, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_SUPPORT_TICKETS);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deteleSupportTicket = useMutation(deteleSupportTickets, {
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_SUPPORT_TICKETS);
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedTicket = supportTicketsQuery.data.find((c) => c.ticketId === id);
    if (selectedTicket) setSupportTicket(selectedTicket);

    setIsConfirmDelete((draft) => {
      draft = true;
      return draft;
    });
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

  return {
    supportTicket,
    setSupportTicket,
    supportTicketsQuery,
    supportTicketInfo,
    createSupportTickets,
    editSupportTickets,
    onDelete,
    onChange,
    isConfirmDelete,
    onToggleModal,
    deteleSupportTicket,
  };
};
