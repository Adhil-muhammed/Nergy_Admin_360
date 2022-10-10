import React, { useEffect } from "react";
import {useQuery} from "react-query"
import {
    createCourseSection,
    updateCourseSectionById,
    deleteCourseSection,
    selectCourseSectionById,
} from '../api';

const GET_COURSESECTION = "GET_COURSESECTION";
const GET_COURSESECTION_BY_ID = "GET_COURSESECTION_BY_ID";

export const useCoutseSection = ({ load = false, courseSectionId = 0 }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const coursesectionQuery=useQuery(
        `${GET_COURSESECTION_BY_ID}_${courseSectionId}`,
        () => selectCourseSectionById(courseSectionId),
        {
            refetchOnWindowFocus: false,
            enabled: courseSectionId > 0,
        }
    )

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

      const deletecoursesection = useMutation(deleteCourseSection, {
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
    };