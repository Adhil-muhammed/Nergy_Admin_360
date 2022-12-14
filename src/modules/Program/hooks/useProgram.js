import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getPrograms, createPrograms, updatePrograms, detelePrograms, getProgramById } from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";
import { getCourses } from "modules/Courses";

const GET_PROGRAMS = "GET_PROGRAMS";
const GET_PROGRAMS_BY_ID = "GET_PROGRAMS_BY_ID";
const GetCourseKey = "GET_COURSE_FOR_CREATE_STUDENT";

export const useProgram = ({ load = false, programId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [program, setProgram] = useImmer({
    name: "",
    description: "",
    selectedCourses: [],
    hasAssessment: false,
    hasCertificate: false,
    hasPracticals: false,
    hasOJT: false,
    isActive: false,
  });

  const programsQuery = useQuery(GET_PROGRAMS, getPrograms, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });

  const programInfo = useQuery(
    `${GET_PROGRAMS_BY_ID}_${programId}`,
    () => getProgramById(programId),
    {
      refetchOnWindowFocus: false,
      enabled: !!programId,
    }
  );

  const coursesQuery = useQuery(GetCourseKey, getCourses, { staleTime: Infinity });
  const courses = React.useMemo(() => {
    return coursesQuery.data
      ? coursesQuery.data.map((c) => {
          return { value: c.courseId, label: c.name };
        })
      : [];
  }, [coursesQuery.data]);

  useEffect(() => {
    if (programInfo.data) {
      setProgram(programInfo.data);
    }
  }, [programInfo.data]);

  const createProgram = useMutation(createPrograms, {
    onError: (e, newData, previousData) => {
      errorMessage(e.response.data.message);
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_PROGRAMS);
      navigate("..", { replace: true });
    },
  });

  const editProgram = useMutation(updatePrograms, {
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_PROGRAMS);
      navigate("..", { replace: true });
    },
    onError: (e, newData, previousData) => {
      errorMessage(e.response.data.message);
    },
  });

  const deteleProgram = useMutation(detelePrograms, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_PROGRAMS);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedProgram = programsQuery.data.find((c) => c.id === id);
    if (selectedProgram) setProgram(selectedProgram);

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
    program,
    setProgram,
    programsQuery,
    programInfo,
    createProgram,
    editProgram,
    deteleProgram,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    courses,
  };
};
