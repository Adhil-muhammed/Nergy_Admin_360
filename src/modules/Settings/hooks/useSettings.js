import React from "react";
import { useQuery } from "react-query";
// import { useImmer } from "use-immer";
import { getSettings } from "..";
// import { useLocation, useNavigate } from "react-router-dom";
// import { successMessage, successDeletedMessage } from "utils";

const GetSettingsKey = "GET_SETTINGS_API";

export const useSettings = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const settingsQuery = useQuery(GetSettingsKey, getSettings, { staleTime: Infinity });
  // const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  // const [user, setUser] = useImmer({
  //   userId: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   isActive: true
  // });

  // const createUser = useMutation(createUsers, {
  //   onMutate: async (update) => {
  //     await queryClient.cancelQueries(GetUsersKey);
  //     const data = queryClient.getQueryData(GetUsersKey);
  //     queryClient.setQueryData(GetUsersKey, (prevData) => {
  //       let updatedData = [...prevData, update];
  //       return updatedData;
  //     });
  //     return data;
  //   },
  //   onError: (e, newData, previousData) => {
  //     queryClient.setQueryData(GetUsersKey, previousData);
  //   },
  //   onSuccess: () => {
  //     successMessage();
  //     navigate(`${location.pathname}`.replace("/create", ""));
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries("create");
  //   },
  // });

  // const editUser = useMutation(updateUsers, {
  //   onMutate: async (update) => {
  //     await queryClient.cancelQueries(GetUsersKey);
  //     const data = queryClient.getQueryData(GetUsersKey);
  //     queryClient.setQueryData(GetUsersKey, (prevData) => {
  //       let updatedData = prevData.map((p) => {
  //         let newData = { ...p };
  //         if (p.userId === update.userId) {
  //           newData.firstName = update.firstName;
  //           newData.lastName = update.lastName;
  //           newData.email = update.email;
  //           newData.password = update.password;
  //           newData.confirmPassword = update.confirmPassword;
  //         }
  //         return newData;
  //       });
  //       return updatedData;
  //     });
  //     return data;
  //   },
  //   onSuccess: () => {
  //     successMessage();
  //   },
  //   onError: (e, newData, previousData) => {
  //     queryClient.setQueryData(GetUsersKey, previousData);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries("create");
  //     // navigate(`${location.pathname}`.replace("/create", ""));
  //     navigate("../users", { replace: true });
  //   },
  // });

  // const deleteUser = useMutation(deteleUsers, {
  //   onMutate: async (userId) => {
  //     await queryClient.cancelQueries(GetUsersKey);
  //     const data = queryClient.getQueryData(GetUsersKey);
  //     queryClient.setQueryData(GetUsersKey, (prevData) => {
  //       let updatedData = [...prevData.filter((n) => n.userId !== userId)];
  //       return updatedData;
  //     });
  //     return data;
  //   },
  //   onError: (e, newData, previousData) => {
  //     queryClient.setQueryData(GetUsersKey, previousData);
  //   },
  //   onSuccess: () => {
  //     successDeletedMessage();
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries("create");
  //     onToggleModal(false);
  //   },
  // });

  // const getSelectedUser = React.useCallback(
  //   (id) => {
  //     const selectedUser = usersQuery.data.filter((s) => s.userId === id)[0];
  //     setUser((draft) => {
  //       draft.userId = selectedUser.userId;
  //       draft.firstName = selectedUser.firstName;
  //       draft.lastName = selectedUser.lastName;
  //       draft.email = selectedUser.email;
  //       draft.password = selectedUser.password;
  //       draft.confirmPassword = selectedUser.confirmPassword;
  //       return draft;
  //     });
  //   },
  //   [usersQuery.data, setUser]
  // );

  // const onEdit = React.useCallback(
  //   (userId) => {
  //     getSelectedUser(userId);
  //   },
  //   [getSelectedUser]
  // );

  // const onDelete = React.useCallback(
  //   (id) => {
  //     getSelectedUser(id);
  //     setIsConfirmDelete((draft) => {
  //       draft = true;
  //       return draft;
  //     });
  //   },
  //   [getSelectedUser, setIsConfirmDelete]
  // );

  // const onToggleModal = React.useCallback(
  //   (isOpen) => {
  //     setIsConfirmDelete((draft) => {
  //       draft = isOpen;
  //       return draft;
  //     });
  //   },
  //   [setIsConfirmDelete]
  // );

  return {
    settingsQuery,
  };
};
