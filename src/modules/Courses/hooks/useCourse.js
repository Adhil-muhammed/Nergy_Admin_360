import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import {
  getCourses,
  createCourses,
  updateCourses,
  deteleCourses,
  createCoursesContent,
} from "../api";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage } from "utils";

const GetCourseKey = "GET_COURSES_API";
const GetCourseContentKey = "GET_COURSE_CONTENT_API";

export const useCourse = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const coursesQuery = useQuery(GetCourseKey, getCourses, { staleTime: Infinity });
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [isModalOpen, setIsModalOpen] = useImmer(false);
  const [currentCourse, setCurrentCourse] = useImmer({
    courseId: 0,
    name: "",
  });
  // const [course, setCourse] = useImmer({
  //   courseId: 0,
  //   name: "",
  //   description: "",
  //   instructions: "",
  //   courseContentFile: "",
  //   CourseImageFile: "",
  //   certificateFile: "",
  //   contentPath: "",
  // });
  // const [courseContent, setCourseContent] = useImmer([
  //   {
  //     courseId: 0,
  //     title: "",
  //     contentFile: "",
  //     fileName: "",
  //   },
  // ]);

  const createCourse = useMutation(createCourses, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetCourseKey);
      const data = queryClient.getQueryData(GetCourseKey);
      // queryClient.setQueryData(GetCourseKey, (prevData) => {
      //   let updatedData = [...prevData, update];
      //   return updatedData;
      // });
      // return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetCourseKey, previousData);
    },
    onSuccess: () => {
      successMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries(GetCourseKey);
      // navigate(`${location.pathname}`.replace("/create/new", ""));
      navigate("../courses", { replace: true });
    },
  });

  const editCourse = useMutation(updateCourses, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetCourseKey);
      // const data = queryClient.getQueryData(GetCourseKey);
      // queryClient.setQueryData(GetCourseKey, (prevData) => {
      //   let updatedData = prevData.map((p) => {
      //     let newData = { ...p };
      //     if (p.courseId === update.courseId) {
      //       newData.name = update.name;
      //       newData.description = update.description;
      //       newData.instructions = update.instructions;
      //       newData.courseImage = update.courseImage;
      //       newData.courseImageURL = update.courseImageURL;
      //       newData.certificateFile = update.certificateFile;
      //       newData.hasExam = update.hasExam;
      //       newData.isContentEnabled = update.isContentEnabled;
      //     }
      //     return newData;
      //   });
      //   return updatedData;
      // });
      // return data;
    },
    onSuccess: () => {
      successMessage();
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetCourseKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(GetCourseKey);
      // navigate(`${location.pathname}`.replace("/create", ""));
      navigate("../courses", { replace: true });
    },
  });

  const deleteCourse = useMutation(deteleCourses, {
    onMutate: async (courseId) => {
      await queryClient.cancelQueries(GetCourseKey);
      const data = queryClient.getQueryData(GetCourseKey);
      queryClient.setQueryData(GetCourseKey, (prevData) => {
        let updatedData = [...prevData.filter((n) => n.courseId !== courseId)];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetCourseKey, previousData);
    },
    onSuccess: () => {
      successDeletedMessage();
    },
    onSettled: () => {
      // queryClient.invalidateQueries(GetCourseKey);
      onToggleModal(false);
    },
  });

  const createCourseContent = useMutation(createCoursesContent, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetCourseContentKey);
      const data = queryClient.getQueryData(GetCourseContentKey);
      queryClient.setQueryData(GetCourseContentKey, (prevData) => {
        let p = { ...prevData };
        let updatedData = [p, update];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetCourseContentKey, previousData);
    },
    onSuccess: () => {
      successMessage();
      // navigate(`${location.pathname}`.replace("/create", ""));
      navigate("../courses", { replace: true });
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const getSelectedCourse = React.useCallback(
    (id) => {
      console.log(id);
      console.log(coursesQuery.data);

      const selectedCourse = coursesQuery.data.filter((s) => s.courseId === id)[0];
      // setCourse((draft) => {
      //   draft.courseId = selectedCourse.courseId;
      //   draft.name = selectedCourse.name;
      //   draft.description = selectedCourse.description;
      //   draft.instructions = selectedCourse.instructions;
      //   draft.courseContentFile = selectedCourse.courseContentFile;
      //   draft.courseImageURL = selectedCourse.courseImageURL;
      //   draft.certificateFile = selectedCourse.certificateFile;
      //   draft.contentPath = selectedCourse.contentPath;
      //   draft.hasExam = selectedCourse.hasExam;
      //   draft.isContentEnabled = selectedCourse.isContentEnabled;
      //   draft.courseContents = selectedCourse.courseContents;
      //   return draft;
      // });
      setCurrentCourse((draft) => {
        draft.courseId = selectedCourse.courseId;
        draft.name = selectedCourse.name;
        return draft;
      });
    },
    [coursesQuery.data, setCurrentCourse]
  );

  // const onEdit = React.useCallback(
  //   (courseId) => {
  //     getSelectedCourse(courseId);
  //   },
  //   [getSelectedCourse]
  // );

  const onDelete = React.useCallback(
    (courseId) => {
      getSelectedCourse(courseId);
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    },
    [setIsConfirmDelete, getSelectedCourse]
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
    // course,
    // setCourse,
    currentCourse,
    // courseContent,
    // setCourseContent,
    coursesQuery,
    createCourse,
    editCourse,
    // onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteCourse,
    createCourseContent,
    isModalOpen,
    setIsModalOpen,
  };
};
