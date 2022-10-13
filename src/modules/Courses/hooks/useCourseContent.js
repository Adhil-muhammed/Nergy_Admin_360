import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  createCoursesContent,
  deleteCoursesContentById,
  updateCoursesContentById,
  getCourseContentById,
} from "../api";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_COURSECONTENT = "GET_COURSECONTENT";
const GET_COURSECONTENT_BY_ID = "GET_COURSECONTENT_BY_ID";

export const useCourseContent = ({ load = false, contentId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [courseContent, setCourseContent] = useImmer({
    contentId: 0,
    title: "",
    fileName: "",
    fileURL: "",
    isExternal: false,
    isVideo: false,
  });
  const createCourseContent = useMutation(createCoursesContent, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_COURSECONTENT);
      navigate("..", { replace: true });
    },
  });

  const deleteCourseContent = useMutation(deleteCoursesContentById, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(`${GET_COURSECONTENT_BY_ID}_${contentId}`);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const editCourseContent = useMutation(updateCoursesContentById, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_COURSECONTENT);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const courseCotentInfo = useQuery(
    `${GET_COURSECONTENT_BY_ID}_${contentId}`,
    () => getCourseContentById(contentId),
    {
      refetchOnWindowFocus: false,
      enabled: contentId > 0,
    }
  );

  const onDelete = React.useCallback(
    (id) => {
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
      setCourseContent((draft) => {
        draft.contentId = id;
        return draft;
      });
    },
    [setIsConfirmDelete]
  );

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
    deleteCourseContent,
    isConfirmDelete,
    courseContent,
    onToggleModal,
    courseCotentInfo,
    onDelete,
  };
};
