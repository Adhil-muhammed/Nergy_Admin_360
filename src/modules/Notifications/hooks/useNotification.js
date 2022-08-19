import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  getNotifications,
  createNotifications,
  updateNotifications,
  deteleNotifications,
  getNotificationById,
} from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
const GET_NOTIFICATION_BY_ID = "GET_NOTIFICATION_BY_ID";

export const useNotification = ({ load = false, notificationId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery(GET_NOTIFICATIONS, getNotifications, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });
  const notificationInfo = useQuery(
    `${GET_NOTIFICATION_BY_ID}_${notificationId}`,
    () => getNotificationById(notificationId),
    {
      refetchOnWindowFocus: false,
      enabled: !!notificationId,
    }
  );

  useEffect(() => {
    if (notificationInfo.data) {
      setNotification(notificationInfo.data);
    }
  }, [notificationInfo.data]);

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [notification, setNotification] = useImmer({
    title: "",
    content: "",
    isActive: true,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setNotification((draft) => {
      draft[name] = value;
    });
  };

  const createNotification = useMutation(createNotifications, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_NOTIFICATIONS);
      navigate("..", { replace: true });
    },
  });

  const editNotification = useMutation(updateNotifications, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_NOTIFICATIONS);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deleteNotification = useMutation(deteleNotifications, {
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_NOTIFICATIONS);
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedNotification = notificationsQuery.data.find((n) => n.id === id);
    if (selectedNotification) setNotification(selectedNotification);

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
    notification,
    setNotification,
    notificationsQuery,
    notificationInfo,
    createNotification,
    editNotification,
    deleteNotification,
    onDelete,
    onChange,
    isConfirmDelete,
    onToggleModal,
  };
};
