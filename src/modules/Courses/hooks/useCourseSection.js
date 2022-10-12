import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  createCourseSection,
  updateCourseSectionById,
  deleteCourseSectionById,
  selectCourseSectionById,
} from "../api";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_COURSESECTION = "GET_COURSESECTION";
const GET_COURSESECTION_BY_ID = "GET_COURSESECTION_BY_ID";

export const useCourseSection = ({
  courseSectionId = 0,
  courseId = 0,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [courseSection, setCourseSection] = useImmer({
    sectionId: 0,
    title: "",
    description: "",
    isEnable: false,
    courseId: 0,
    sortOrder: 0,
  });

  useEffect(() => {
    if (courseId > 0) {
      setCourseSection((draft) => {
        draft.courseId = courseId;
      });
    }
  }, [courseId]);

  const courseSectionInfo = useQuery(
    `${GET_COURSESECTION_BY_ID}_${courseSectionId}`,
    () => selectCourseSectionById(courseSectionId),
    {
      refetchOnWindowFocus: false,
      enabled: courseSectionId > 0,
    }
  );

  useEffect(() => {
    if (courseSectionInfo.data) {
      setCourseSection(courseSectionInfo.data);
    }
  }, [courseSectionInfo.data]);

  const createCourseSections = useMutation(createCourseSection, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_COURSESECTION);
      navigate("..", { replace: true });
    },
  });

  const updateCourseSection = useMutation(updateCourseSectionById, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_COURSESECTION);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deleteCourseSection = useMutation(deleteCourseSectionById, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_COURSESECTION);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = () => { }
  // React.useCallback(
  //   (id) => {
  //     const selectedCourseSection = courseSections.find((c) => c.sectionId === id);
  //     if (selectedCourseSection)
  //       setCourseSection((draft) => {
  //         draft = selectedCourseSection;
  //       });
  //     setIsConfirmDelete((draft) => {
  //       draft = true;
  //       return draft;
  //     });
  //   },
  //   [setIsConfirmDelete, courseSections, setCourseSection]
  // );

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
    courseSection,
    courseSectionInfo,
    setCourseSection,
    onDelete,
    onToggleModal,
    deleteCourseSection,
    updateCourseSection,
    createCourseSections,
    isConfirmDelete,
  };
};
