import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getUsers, createUsers, updateUsers, deteleUsers, getUserById } from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_USERS = "GET_USERS";
const GET_USERS_BY_ID = "GET_USERS_BY_ID";

export const useUser = ({ load = false, userId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const usersQuery = useQuery(GET_USERS, getUsers, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [user, setUser] = useImmer({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const userInfo = useQuery(`${GET_USERS_BY_ID}_${userId}`, () => getUserById(userId), {
    refetchOnWindowFocus: false,
    enabled: userId ? true : false,
  });
  useEffect(() => {
    if (userInfo.data) {
      setUser((draft) => {
        draft.userId = userInfo.data.userId;
        draft.firstName = userInfo.data.firstName;
        draft.lastName = userInfo.data.lastName;
        draft.email = userInfo.data.email;
        draft.password = "";
        draft.confirmPassword = "";
        return draft;
      });
    }
  }, [userInfo.data]);

  const createUser = useMutation(createUsers, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_USERS);
      navigate("..", { replace: true });
    },
  });

  const editUser = useMutation(updateUsers, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_USERS);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deleteUser = useMutation(deteleUsers, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_USERS);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedUser = usersQuery.data.find((c) => c.userId === id);
    if (selectedUser) setUser(selectedUser);

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
    user,
    setUser,
    userInfo,
    usersQuery,
    createUser,
    editUser,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteUser,
  };
};
