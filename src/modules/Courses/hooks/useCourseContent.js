import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
    createCoursesContent,
    deleteCoursesContentById,
    updateCoursesContentById,
    getCourseContentById,
} from '../api';
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_COURSECONTENT = "GET_COURSECONTENT";
const GET_COURSECONTENT_BY_ID = "GET_COURSECONTENT_BY_ID";

export const useCourse = ({ load = false, courseContentId = 0 }) => {
    const createCourseContent = useMutation(createCoursesContent, {
        onError: (e, newData, previousData) => {
        errorMessage("Unable to create!");
        },
        onSuccess: () => {
        successMessage();
        queryClient.invalidateQueries(`${GET_COURSECONTENT_BY_ID}_${courseContentId}`);
        },
        onSettled: () => {
        setIsModalOpen(false);
    },
  });

  const deleteCourseContent = useMutation(deleteCoursesContentById, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(`${GET_COURSECONTENT_BY_ID}_${courseContentId}`);
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

  const assessmentSectionInfo = useQuery(
    `${GET_ASSESSMENTSECTIONS_BY_ID}_${courseContentId}`,
    () => getCourseContentById(courseContentId),
    {
      refetchOnWindowFocus: false,
      enabled: sectionId > 0,
    }
  ); 

}