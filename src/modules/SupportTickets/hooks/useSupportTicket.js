import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  getSupportTickets,
  getSupportTicketById,
  createSupportTicket,
  updateSupportTicket,
  deteleSupportTickets,
  createSupportTicketReply,
  deleteTicketsReply,
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
    subject: "",
    message: "",
    studentId: "",
    userId: "",
    status: -1,
    replies: [],
  });

  const [reply, setReply] = useImmer({
    replyMessage: "",
    ticketId: "",
    userId: "",
  });

  const [ticketReply, setTicketReply] = useImmer({
    replyId: "",
    replyMessage: "",
  });

  const [isModalOpen, setIsModalOpen] = useImmer(false);

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

  const createSupportTicketsReply = useMutation(createSupportTicketReply, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(`${GET_SUPPORT_TICKETS_BY_ID}_${ticketId}`);
      setIsModalOpen(false);
    },
  });

  const deleteTicketReply = useMutation(deleteTicketsReply, {
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(`${GET_SUPPORT_TICKETS_BY_ID}_${ticketId}`);
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const selectedReplyInfo = (id) => {
    const selectedReply = supportTicketInfo.data.replies.find((c) => c.replyId === id);
    console.log(selectedReply);
    if (selectedReply) setTicketReply(selectedReply);
  };

  const onDelete = (id, isReply = false) => {
    if (isReply) {
      selectedReplyInfo(id);
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    } else {
      const selectedTicket = supportTicketsQuery.data.find((c) => c.ticketId === id);
      if (selectedTicket) setSupportTicket(selectedTicket);

      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    }
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
    createSupportTicketsReply,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deteleSupportTicket,
    reply,
    setReply,
    isModalOpen,
    setIsModalOpen,
    ticketReply,
    deleteTicketReply,
  };
};
