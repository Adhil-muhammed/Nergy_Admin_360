import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getStudents, createStudents, updateStudents, deteleStudents } from "..";
import { useNavigate } from "react-router-dom";
import { successMessage, successDeletedMessage } from "utils";

const GetStudentKey = "GET_BATCHES_API";

export const useStudent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const batchesQuery = useQuery(GetStudentKey, getStudents, { staleTime: Infinity });
  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [student, setStudent] = useImmer({
    studentId: 0,
    studentUserId: "",
    instituteId: 0,
    batchId: 0,
    registrationId: "",
    firstName: "",
    lastName: "",
    gender: 0,
    emailAddress: "",
    qualification: "",
    dateOfBirth: "",
    mobile: "",
    region: "",
  });

  const createStudent = useMutation(createStudents, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetStudentKey);
      const data = queryClient.getQueryData(GetStudentKey);
      queryClient.setQueryData(GetStudentKey, (prevData) => {
        let updatedData = [...prevData, update];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetStudentKey, previousData);
    },
    onSuccess: () => {
      successMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const editStudent = useMutation(updateStudents, {
    onMutate: async (update) => {
      await queryClient.cancelQueries(GetStudentKey);
      const data = queryClient.getQueryData(GetStudentKey);
      queryClient.setQueryData(GetStudentKey, (prevData) => {
        let updatedData = prevData.map((p) => {
          let newData = { ...p };
          if (p.batchId === update.batchId) {
            newData.name = update.name;
            newData.startDate = update.startDate;
            newData.endDate = update.endDate;
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
      queryClient.setQueryData(GetStudentKey, previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      navigate("../batch", { replace: true });
    },
  });

  const deleteStudent = useMutation(deteleStudents, {
    onMutate: async (batchId) => {
      await queryClient.cancelQueries(GetStudentKey);
      const data = queryClient.getQueryData(GetStudentKey);
      queryClient.setQueryData(GetStudentKey, (prevData) => {
        let updatedData = [...prevData.filter((n) => n.batchId !== batchId)];
        return updatedData;
      });
      return data;
    },
    onError: (e, newData, previousData) => {
      queryClient.setQueryData(GetStudentKey, previousData);
    },
    onSuccess: () => {
      successDeletedMessage();
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
      onToggleModal(false);
    },
  });

  const getSelectedStudent = React.useCallback(
    (id) => {
      const selectedStudent = batchesQuery.data.filter((s) => s.studentId === id)[0];
      setStudent((draft) => {
        draft.studentId = selectedStudent.studentId;
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
        return draft;
      });
    },
    [batchesQuery.data, setStudent]
  );

  const onEdit = React.useCallback(
    (studentId) => {
      getSelectedStudent(studentId);
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

  return {
    student,
    setStudent,
    batchesQuery,
    createStudent,
    editStudent,
    onEdit,
    onDelete,
    isConfirmDelete,
    onToggleModal,
    deleteStudent,
  };
};
