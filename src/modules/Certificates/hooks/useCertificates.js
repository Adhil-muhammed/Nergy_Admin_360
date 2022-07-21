import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { errorMessage, successDeletedMessage, successMessage } from "utils";
import {
  createCertificates,
  deleteCertificate,
  deleteCertificates,
  getCeritificatesById,
  getCertificates,
} from "../api";

const GET_CERTIFICATES = "GET_CERTIFICATES";
const GET_CERTIFICATE_BY_ID = "GET_CERTIFICATE_BY_ID";

export const useCertificates = ({ load = false, certId = 0 }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const certificatesQuery = useQuery(GET_CERTIFICATES, getCertificates, {
    refetchOnWindowFocus: false,
    enabled: load,
    staleTime: Infinity,
  });

  const certificateInfo = useQuery(
    `${GET_CERTIFICATE_BY_ID}_${certId}`,
    () => getCeritificatesById(certId),
    {
      refetchOnWindowFocus: false,
      enabled: certId > 0,
    }
  );

  useEffect(() => {
    if (certificateInfo.data) {
      setCertificate(certificateInfo.data);
    }
  }, [certificateInfo.data]);

  const [isConfirmDelete, setIsConfirmDelete] = useImmer(false);
  const [deleteInfo, setDeleteInfo] = useImmer({ certificateId: "" });
  const [certificate, setCertificate] = useImmer({
    batchId: "",
    courseId: "",
    studentId: "",
    assessmentId: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setCertificate((draft) => {
      draft[name] = value;
    });
  };

  const createCertificate = useMutation(createCertificates, {
    onError: (e, newData, previousData) => {
      errorMessage("Unable to create!");
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries(GET_CERTIFICATES);
      navigate("..", { replace: true });
    },
  });

  const deleteCertificate = useMutation(deleteCertificates, {
    onSuccess: () => {
      successDeletedMessage();
      queryClient.invalidateQueries(GET_CERTIFICATES);
    },
    onError: (e, newData, previousData) => {
      errorMessage("Unable to delete!");
    },
    onSettled: () => {
      onToggleModal(false);
    },
  });

  const onDelete = (id) => {
    const selectedBatch = certificatesQuery.data.find((c) => c.batchId === id);
    if (selectedBatch) setCertificate(selectedBatch);

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

  const onSelectChange = (e, name) => {
    const { value } = e;
    setCertificate((draft) => {
      draft[name] = value;
    });
  };

  return {
    certificate,
    setCertificate,
    certificatesQuery,
    certificateInfo,
    createCertificate,
    onDelete,
    onChange,
    isConfirmDelete,
    onToggleModal,
    deleteCertificate,
    deleteInfo,
    onSelectChange,
  };
};
