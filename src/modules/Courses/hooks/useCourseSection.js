import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  createCourseSection,
  updateCourseSectionById,
  deleteCourseSection,
  selectCourseSectionById,
  selectCourseSection,
} from "../api";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_COURSESECTION = "GET_COURSESECTION";
const GET_COURSESECTION_BY_ID = "GET_COURSESECTION_BY_ID";

export const useCourseSection = ({
  load = false,
  courseSectionId = 0,
  sections = [],
  courseId = 0,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [courseSections, setCourseSections] = useImmer([]);
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
    if (sections.length > 0) {
      setCourseSections((draft) => {
        draft = sections;
      });
    }
    if (courseId > 0) {
      setCourseSection((draft) => {
        draft.courseId = courseId;
      });
    }
  }, [sections, courseId]);

  const coursesectionInfo = useQuery(
    `${GET_COURSESECTION_BY_ID}_${courseSectionId}`,
    () => selectCourseSectionById(courseSectionId),
    {
      refetchOnWindowFocus: false,
      enabled: courseSectionId > 0,
    }
  );

  useEffect(() => {
    if (coursesectionInfo.data) {
      setCourseSection(coursesectionInfo.data);
    }
  }, [coursesectionInfo.data]);

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

  const editcoursesection = useMutation(updateCourseSectionById, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_COURSESECTION);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const onDeletecoursesection = useMutation(deleteCourseSection, {
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

  const onDelete = (id) => {
    const selectedCourseSection = courseSections.data.find((c) => c.sectionId === id);
    if (selectedCourseSection)
      setCourseSection((draft) => {
        draft.data = selectedCourseSection;
      });

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
    courseSection,
    coursesectionInfo,
    setCourseSection,
    onDelete,
    onToggleModal,
    onDeletecoursesection,
    editcoursesection,
    createCourseSections,
    isConfirmDelete,
  };
};
