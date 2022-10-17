import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  createCourseSection,
  updateCourseSectionById,
  deleteCourseSectionById,
  getSectionById,
  deleteCoursesContentById
} from "../api";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { successMessage, successDeletedMessage, errorMessage } from "utils";

const GET_COURSESECTION = "GET_COURSESECTION";
const GET_COURSESECTION_BY_ID = "GET_COURSESECTION_BY_ID";

export const useSection = ({
  sectionId = 0,
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
  const [contents, setContents] = useImmer([]);
  const [selectedContent, setSelectedContent] = useImmer({
    contentId: 0,
    title: "",
    fileName: "",
    fileURL: "",
    isExternal: false,
    isVideo: false,
    sectionId: 0,
  });

  useEffect(() => {
    if (courseId > 0) {
      setCourseSection((draft) => {
        draft.courseId = courseId;
      });
    }
  }, [courseId]);

  const courseSectionInfo = useQuery(
    `${GET_COURSESECTION_BY_ID}_${sectionId}`,
    () => getSectionById(sectionId),
    {
      refetchOnWindowFocus: false,
      enabled: sectionId > 0,
    }
  );

  useEffect(() => {
    if (courseSectionInfo.data) {
      const { sectionId,
        title,
        description,
        isEnable,
        courseId,
        sortOrder,
        courseContents } = courseSectionInfo.data;
      setCourseSection({
        sectionId,
        title,
        description,
        isEnable,
        courseId,
        sortOrder,
      });
      setContents(courseContents);
    }
  }, [courseSectionInfo.data]);

  const createCourseSections = useMutation(createCourseSection, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_COURSESECTION);
      navigate(`../${courseId}`, { replace: true });
    },
  });

  const updateCourseSection = useMutation(updateCourseSectionById, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_COURSESECTION);
      navigate(`../${courseId}`, { replace: true });
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
      onToggleModal();
    },
  });

  const deleteCourseContent = useMutation(deleteCoursesContentById, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDeleteContent = (id) => {
    const sc = contents.find((c) => c.contentId === id);
    let newSc = JSON.parse(JSON.stringify(sc));
    setSelectedContent((draft) => {
      draft = newSc;
      return draft;
    });
    onToggleModal();
  }


  const onToggleModal = React.useCallback(
    () => {
      setIsConfirmDelete((draft) => {
        draft = !draft;
        return draft;
      });
    },
    [setIsConfirmDelete]
  );

  return {
    courseSection,
    courseSectionInfo,
    setCourseSection,
    onToggleModal,
    deleteCourseSection,
    updateCourseSection,
    createCourseSections,
    isConfirmDelete,
    contents,
    onDeleteContent,
    selectedContent,
    deleteCourseContent,
    isConfirmDelete
  };
};
