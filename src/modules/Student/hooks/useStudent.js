import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getStudents, createStudents, updateStudents, deteleStudents } from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage } from "utils";
import { getInstitutes } from "modules/Institute";
import { getBatches } from "modules/Batch";
import { getCourses } from "modules/Courses";

const GetStudentKey = "GET_BATCHES_API";
const GetBatchKey = "GET_BATCHES_FOR_CREATE_STUDENT";
const GetInstituteKey = "GET_INSTITUTES_FOR_CREATE_STUDENT";
const GetCourseKey = "GET_COURSE_FOR_CREATE_STUDENT";

export const useStudent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useImmer({
    pageIndex: 1,
    pageSize: 10,
  });
  const studentsQuery = useQuery([GetStudentKey, page], () => getStudents(page), {
    keepPreviousData: true,
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
    studentUserId: "",
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

  const createStudent = useMutation(createStudents, {
    // onMutate: async (update) => {
    //   await queryClient.cancelQueries([
    //     GetStudentKey,
    //     {
    //       pageIndex: 1,
    //       pageSize: 2,
    //     },
    //   ]);
    //   const data = queryClient.getQueryData([
    //     GetStudentKey,
    //     {
    //       pageIndex: 1,
    //       pageSize: 2,
    //     },
    //   ]);
    //   queryClient.setQueryData(
    //     [
    //       GetStudentKey,
    //       {
    //         pageIndex: 1,
    //         pageSize: 2,
    //       },
    //     ],
    //     (prevData) => {
    //       let updatedData = {
    //         paging: { pageNo: 1, ...prevData.paging },
    //         value: [...prevData, update],
    //       };
    //       return updatedData;
    //     }
    //   );
    //   return data;
    // },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData([GetStudentKey, page], previousData);
    },
    onSuccess: () => {
      successMessage();
    },
    onSettled: () => {
      setPage((draft) => {
        draft.pageIndex = 1;
        draft.pageSize = 2;
      });
      navigate("../student", { replace: true });
    },
  });

  const editStudent = useMutation(updateStudents, {
    onMutate: async (update) => {
      await queryClient.cancelQueries([GetStudentKey, page]);
      const data = queryClient.getQueryData([GetStudentKey, page]);
      queryClient.setQueryData([GetStudentKey, page], (prevData) => {
        let updatedValue = prevData.value.map((p) => {
          let newData = { ...p };
          if (p.studentUserId === update.studentUserId) {
            newData.studentUserId = update.studentUserId;
            newData.instituteId = update.instituteId;
            newData.batchId = update.batchId;
            newData.registrationId = update.registrationId;
            newData.firstName = update.firstName;
            newData.lastName = update.lastName;
            newData.gender = update.gender;
            newData.emailAddress = update.emailAddress;
            newData.qualification = update.qualification;
            newData.dateOfBirth = update.dateOfBirth;
            newData.mobile = update.mobile;
            newData.region = update.region;
            newData.selectedCourses = update.selectedCourses;
          }
          return newData;
        });
        let updatedData = { ...prevData, value: updatedValue };
        return updatedData;
      });
      return data;
    },
    onSuccess: () => {
      successMessage();
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData([GetStudentKey, page], previousData);
    },
    onSettled: () => {
      navigate("../student", { replace: true });
    },
  });

  const deleteStudent = useMutation(deteleStudents, {
    onError: (e, newData, previousData) => {
      queryClient.setQueryData([GetStudentKey, page], previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([GetStudentKey, page]);
      successDeletedMessage();
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const getSelectedStudent = React.useCallback(
    (id) => {
      const selectedStudent = studentsQuery.data.value.filter((s) => s.studentUserId === id)[0];
      setStudent((draft) => {
        draft.studentUserId = selectedStudent.studentUserId;
        draft.instituteId = selectedStudent.instituteId;
        draft.batchId = selectedStudent.batchId;
        draft.registrationId = selectedStudent.registrationId;
        draft.firstName = selectedStudent.firstName;
        draft.lastName = selectedStudent.lastName;
        draft.gender = selectedStudent.gender;
        draft.emailAddress = selectedStudent.emailAddress;
        draft.qualification = selectedStudent.qualification;
        draft.dateOfBirth = selectedStudent.dateOfBirth;
        draft.mobile = selectedStudent.mobile;
        draft.region = selectedStudent.region;
        draft.selectedCourses = selectedStudent.selectedCourses;
        return draft;
      });
    },
    [studentsQuery.data, setStudent]
  );

  const onEdit = React.useCallback(
    (studentUserId) => {
      if (studentUserId) {
        getSelectedStudent(studentUserId);
      }
    },
    [getSelectedStudent]
  );

  const onDelete = React.useCallback(
    (id) => {
      getSelectedStudent(id);
      setIsConfirmDelete((draft) => {
        draft = true;
        return draft;
      });
    },
    [getSelectedStudent, setIsConfirmDelete]
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
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteStudent,
    page,
    fetchData,
    batchesQuery,
    institutesQuery,
    courses,
  };
};
