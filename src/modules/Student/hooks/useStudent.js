import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getStudents, createStudents, updateStudents, deteleStudents, getStudentById } from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage, errorMessage } from "utils";
import { getInstitutes } from "modules/Institute";
import { getBatches } from "modules/Batch";
import { getCourses } from "modules/Courses";

const GetStudentKey = "GET_BATCHES_API";
const GetBatchKey = "GET_BATCHES_FOR_CREATE_STUDENT";
const GetInstituteKey = "GET_INSTITUTES_FOR_CREATE_STUDENT";
const GetCourseKey = "GET_COURSE_FOR_CREATE_STUDENT";
const Get_STUDENT_BY_ID = "GET_STUDENT_BY_ID";

export const useStudent = ({ load = false, studentId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useImmer({
    pageIndex: 1,
    pageSize: 10,
  });
  const studentsQuery = useQuery([GetStudentKey, page], () => getStudents(page), {
    keepPreviousData: true,
    enabled: load,
    staleTime: Infinity,
  });
  const batchesQuery = useQuery(GetBatchKey, getBatches, { staleTime: Infinity });
  const institutesQuery = useQuery(GetInstituteKey, getInstitutes, { staleTime: Infinity });
  const coursesQuery = useQuery(GetCourseKey, getCourses, { staleTime: Infinity });

  const courses = React.useMemo(() => {
    return coursesQuery.data
      ? coursesQuery.data.map((c) => {
          return { value: c.courseId, label: c.name };
        })
      : [];
  }, [coursesQuery.data]);

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [student, setStudent] = useImmer({
    studentId: "",
    instituteId: -1,
    batchId: -1,
    registrationId: "",
    firstName: "",
    lastName: "",
    gender: -1,
    emailAddress: "",
    qualification: "",
    dateOfBirth: "",
    mobile: "",
    region: "",
    selectedCourses: [],
  });

  const studentInfo = useQuery(
    `${Get_STUDENT_BY_ID}_${studentId}`,
    () => getStudentById(studentId),
    {
      refetchOnWindowFocus: false,
      enabled: studentId !== 0,
    }
  );

  useEffect(() => {
    if (studentInfo.data) {
      setStudent(studentInfo.data);
    }
  }, [studentInfo.data]);

  const createStudent = useMutation(createStudents, {
    onError: (e, newData, previousData) => {
      errorMessage();
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GetStudentKey);
      navigate("..", { replace: true });
    },
    onSettled: () => {
      setPage((draft) => {
        draft.pageIndex = 1;
        draft.pageSize = 2;
      });
    },
  });

  const editStudent = useMutation(updateStudents, {
    onSuccess: () => {
      successMessage();
      navigate("..", { replace: true });
      queryClient.invalidateQueries(GetStudentKey);
    },
    onError: (e, newData, previousData) => {},
  });

  const deleteStudent = useMutation(deteleStudents, {
    onError: (e, newData, previousData) => {
      errorMessage();
    },
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GetStudentKey);
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = React.useCallback(
    (id) => {
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
      setStudent((draft) => {
        draft.studentId = id;
        return draft;
      });
    },
    [setIsConfirmDelete]
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

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      setPage((draft) => {
        draft.pageIndex = pageIndex;
        draft.pageSize = pageSize;
      });
    },
    [setPage]
  );

  return {
    student,
    setStudent,
    studentsQuery,
    createStudent,
    editStudent,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteStudent,
    page,
    setPage,
    fetchData,
    batchesQuery,
    institutesQuery,
    courses,
    studentInfo,
  };
};
