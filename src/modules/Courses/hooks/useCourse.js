import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  getCourses,
  getCourseById,
  createCourses,
  updateCourses,
  deteleCourses,
  createCoursesContent,
  deleteCoursesContentById,
} from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_COURSES = "GET_COURSES";
const GET_COURSE_BY_ID = "GET_COURSE_BY_ID";

export const useCourse = ({ load = false, courseId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const coursesQuery = useQuery(GET_COURSES, getCourses, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });
  const courseInfo = useQuery(`${GET_COURSE_BY_ID}_${courseId}`, () => getCourseById(courseId), {
    refetchOnWindowFocus: false,
    enabled: courseId > 0,
  });

  useEffect(() => {
    if (courseInfo.data) {
      setCourse(courseInfo.data);
    }
  }, [courseInfo.data]);

  const [course, setCourse] = useImmer({
    courseId: 0,
    name: "",
    description: "",
    instructions: "",
    courseContentFile: "",
    courseImageFile: "",
    certificateFile: "",
    contentPath: "",
    courseContents: [],
  });

  const [courseContents, setCourseContents] = useImmer([
    {
      contentId: 0,
      title: "",
    },
  ]);

  const [courseContent, setCourseContent] = useImmer({
    title: "",
    contentFile: "",
    fileName: "",
    isExternal: false,
    isVideo: false,
  });

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [isModalOpen, setIsModalOpen] = useImmer(false);
  const createCourse = useMutation(createCourses, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_COURSES);
      navigate("..", { replace: true });
    },
  });

  const editCourse = useMutation(updateCourses, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_COURSES);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to edit!");
    },
  });

  const deleteCourse = useMutation(deteleCourses, {
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_COURSES);
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const createCourseContent = useMutation(createCoursesContent, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(`${GET_COURSE_BY_ID}_${courseId}`);
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
      queryClient.invalidateQueries(`${GET_COURSE_BY_ID}_${courseId}`);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const selectedCourseContentInfo = (id) => {
    const selected = courseInfo.data.courseContents.find((item) => item.contentId === id);
    if (selected) {
      setCourseContents(selected);
    }
  };

  const onDelete = (id, isContent = false) => {
    if (isContent) {
      selectedCourseContentInfo(id);
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    } else {
      const selectedCourse = coursesQuery.data.find((c) => c.courseId === id);
      if (selectedCourse) { setCourse(selectedCourse); }
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
    course,
    setCourse,
    courseInfo,
    courseContents,
    createCourseContent,
    courseContent,
    setCourseContent,
    coursesQuery,
    createCourse,
    editCourse,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteCourse,
    deleteCourseContent,
    isModalOpen,
    setIsModalOpen,
  };
};
