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
  // getCourseContentById,
  deleteCoursesContentById,
} from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_COURSES = "GET_COURSES";
const GET_COURSE_BY_ID = "GET_COURSE_BY_ID";
// const GET_COURSE_CONTENT_BY_ID = "GET_COURSE_CONTENT_BY_ID";

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

  // const courseContentInfo = useQuery(
  //   `${GET_COURSE_CONTENT_BY_ID}_${courseId}`,
  //   () => getCourseContentById(courseId),
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: courseId > 0,
  //   }
  // );

  const [course, setCourse] = useImmer({
    courseId: 0,
    name: "",
    description: "",
    instructions: "",
    courseContentFile: "",
    CourseImageFile: "",
    certificateFile: "",
    contentPath: "",
    courseContents: [],
  });

  const [courseContents, setCourseContents] = useImmer([
    {
      contentId: 0,
      title: "",
      fileName: "",
      fileURL: "",
      isExternal: false,
      isVideo: false,
    },
  ]);

  const [courseContent, setCourseContent] = useImmer([
    {
      courseId: 0,
      title: "",
      contentFile: "",
      fileName: "",
    },
  ]);

  useEffect(() => {
    if (courseInfo.data) {
      setCourse(courseInfo.data);
    }
  }, [courseInfo.data]);

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
      successMessage();
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id, isContent = false) => {
    if (isContent) {
      const selected = course.courseContents.find((item) => item.contentId === id);
      if (selected) setCourseContents(selected);
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    } else {
      const selectedCourse = coursesQuery.data.find((c) => c.courseId === id);
      if (selectedCourse) setCourse(selectedCourse);

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
