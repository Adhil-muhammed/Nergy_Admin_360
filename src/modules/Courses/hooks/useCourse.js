import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  getCourses,
  getCourseById,
  createCourses,
  updateCourses,
  deteleCourses,
  deleteCourseSectionById,
  getCourseType,
} from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_COURSES = "GET_COURSES";
const GET_COURSE_BY_ID = "GET_COURSE_BY_ID";
const GET_COURSE_TYPE = "GET_COURSE_TYPE";

export const useCourse = ({ load = false, courseId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const coursesQuery = useQuery(GET_COURSES, getCourses, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  const courseInfo = useQuery(`${GET_COURSE_BY_ID}_${courseId}`, () => getCourseById(courseId), {
    refetchOnWindowFocus: false,
    enabled: courseId > 0,
  });
  const coursesTypeQuery = useQuery(GET_COURSE_TYPE, getCourseType, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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
    courseSections: [],
    courseType: "",
    courseImageURL: "",
  });

  const [courseSection, setCourseSection] = useImmer({
    sectionId: 0,
    title: "",
    description: "",
    isEnable: false,
    courseId: 0,
    sortOrder: 0,
  });

  useEffect(() => {
    if (courseInfo.data) {
      setCourse(courseInfo.data);
    }
  }, [courseInfo.data]);

  useEffect(() => {
    if (course.description === "<p><br></p>") {
      setCourse((draft) => {
        draft.description = "";
        return draft;
      });
    }
  }, [course.description]);

  useEffect(() => {
    if (course.instructions === "<p><br></p>") {
      setCourse((draft) => {
        draft.instructions = "";
        return draft;
      });
    }
  }, [course.instructions]);

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
      onToggleModal();
    },
  });

  const onDelete = (id) => {
    const selectedCourse = coursesQuery.data.find((c) => c.courseId === id);
    if (selectedCourse) {
      setCourse(selectedCourse);
    }
    setIsConfirmDelete((draft) => {
      draft = true;
      return draft;
    });
  };

  const deleteCourseSection = useMutation(deleteCourseSectionById, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(`${GET_COURSE_BY_ID}_${courseId}`);
    },
    onSettled: () => {
      onToggleModal();
    },
  });

  const onToggleModal = React.useCallback(() => {
    setIsConfirmDelete((draft) => {
      draft = !draft;
      return draft;
    });
  }, [setIsConfirmDelete]);

  const onSectionDelete = (id) => {
    const selectedCourse = courseInfo.data.courseSections.find((c) => c.sectionId === id);
    let newSelectedCourse = JSON.parse(JSON.stringify(selectedCourse));
    setCourseSection((draft) => {
      draft = newSelectedCourse;
      return draft;
    });
    onToggleModal();
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
    onSectionDelete,
    courseSection,
    deleteCourseSection,
    coursesTypeQuery,
  };
};
