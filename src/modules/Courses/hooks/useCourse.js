import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getCourses, createCourses, updateCourses, deteleCourses } from "..";
import { useLocation, useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage } from "utils";

const GetCourseKey = "GET_COURSES_API";

export const useCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const coursesQuery = useQuery(GetCourseKey, getCourses, { staleTime: Infinity });
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [course, setCourse] = useImmer({
    courseId: 0,
    name: "",
    description: "",
    instructions: "",
    courseImage: "",
    certificateFile: "",
    contentPath: "",
    hasExam: false,
    isContentEnabled: false
  });

  const createCourse = useMutation(createCourses, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetCourseKey);
      const data = queryClient.getQueryData(GetCourseKey);
      queryClient.setQueryData(GetCourseKey, (prevData) => {
        let updatedData = [...prevData, update];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetCourseKey, previousData);
    },
    onSuccess: () => {
      successMessage();
      navigate(`${location.pathname}`.replace("/create", ""));
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const editCourse = useMutation(updateCourses, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetCourseKey);
      const data = queryClient.getQueryData(GetCourseKey);
      queryClient.setQueryData(GetCourseKey, (prevData) => {
        let updatedData = prevData.map((p) => {
          let newData = { ...p };
          if (p.courseId === update.courseId) {
            newData.name = update.name;
            newData.description = update.description;
            newData.instructions = update.instructions;
            newData.courseImage = update.courseImage;
            newData.certificateFile = update.certificateFile;
            newData.contentPath = update.contentPath;
            newData.hasExam = update.hasExam;
            newData.isContentEnabled = update.isContentEnabled;
          }
          return newData;
        });
        return updatedData;
      });
      return data;
    },
    onSuccess: () => {
      successMessage();
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetCourseKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
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
      queryClient.invalidateQueries("create");
      onToggleModal(false);
    },
  });

  const getSelectedCourse = React.useCallback(
    (id) => {
      const selectedCourse = coursesQuery.data.filter((s) => s.courseId === id)[0];
      setCourse((draft) => {
        draft.courseId = selectedCourse.courseId;
        draft.name = selectedCourse.name;
        draft.description = selectedCourse.description;
        draft.instructions = selectedCourse.instructions;
        draft.courseImage = selectedCourse.courseImage;
        draft.certificateFile = selectedCourse.certificateFile;
        draft.contentPath = selectedCourse.contentPath;
        draft.hasExam = selectedCourse.hasExam;
        draft.isContentEnabled = selectedCourse.isContentEnabled;
        return draft;
      });
    },
    [coursesQuery.data, setCourse]
  );

  const onEdit = React.useCallback(
    (courseId) => {
      getSelectedCourse(courseId);
    },
    [getSelectedCourse]
  );

  const onDelete = React.useCallback(
    (id) => {
      getSelectedCourse(id);
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    },
    [getSelectedCourse, setIsConfirmDelete]
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
    course,
    setCourse,
    coursesQuery,
    createCourse,
    editCourse,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteCourse,
  };
};
