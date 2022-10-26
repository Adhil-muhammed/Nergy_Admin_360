import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { ContentLayout, ModalLayout } from "shared";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { CertificateFilter } from "../components";
import { useCertificates } from "../hooks";
import { useAuthorizeContext } from "master";


export const CertificateList = () => {
  const { hasPermission } = useAuthorizeContext();
  const hasCreatePermission = hasPermission("Certificates", "Create");
  const hasDeletePermission = hasPermission("Certificates", "Delete");

  const {
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
  } = useCertificates({
    load: true,
  });

  const { data, isLoading } = certificatesQuery;
  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteCertificate.mutate(deleteInfo.certificateId);
  };

  const onEdit = (certId) => {
    history(`${location.pathname}/edit/${certId}`);
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        {/* <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button> */}
        {
          hasDeletePermission &&
          <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
            <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
          </Button>
        }
      </>
    );
  };

  const columns = [
    {
      Header: "CertId",
      accessor: "certificateId",
    },
    {
      Header: "Batch",
      accessor: "batchName",
    },
    {
      Header: "Course",
      accessor: "courseName",
    },
    {
      Header: "Assessment",
      accessor: "assessmentName",
    },
    {
      Header: "Date Generated",
      accessor: "generatedDate",
    },
  ];

  if (hasDeletePermission) {
    columns.push(
      {
        Header: "Actions",
        accessor: "batchId",
        id: "actions",
        Cell: ActionButtons,
      });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Certificates"}
      subtitle={"List"}
      breadcrumb={[{ label: "Certificates" }]}
    >
      {
        hasCreatePermission &&
        <CertificateFilter />
      }
      {/* <TableLayout columns={columns} data={data} /> */}
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete Certificate ?`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
