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



  const [course, setCourse] = useImmer({
    courseId: 0,
    name: "",
    description: "",
    instructions: "",
    courseContentFile: "",
    courseImageFile: "",
    certificateFile: "",
    contentPath: "",
    courseSections: []
  });

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

  const onDelete = (id) => {
    const selectedCourse = coursesQuery.data.find((c) => c.courseId === id);
    if (selectedCourse) { setCourse(selectedCourse); }
    setIsConfirmDelete((draft) => {
      draft = true;
      return draft;
    });
  };

  const onToggleModal = React.useCallback(
    () => {
      setIsConfirmDelete((draft) => {
        draft = !draft;
        return draft;
      });
    },
    [setIsConfirmDelete]
  );

  console.log(course);

  const onSectionDelete = () => {


  };

  return {
    course,
    setCourse,
    courseInfo,
    coursesQuery,
    createCourse,
    editCourse,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteCourse,
    isModalOpen,
    setIsModalOpen,
    onSectionDelete
  };
};
