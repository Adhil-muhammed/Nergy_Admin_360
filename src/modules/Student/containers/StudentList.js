import React, { useMemo, useCallback } from "react";
import { ContentLayout, PaginationTableLayout, ModalLayout } from "shared/components";
import { StudentTemplateModal } from "..";
import { Button, Badge } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useStudent } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { Axios } from "utils";
import fileDownload from "js-file-download";
import { useDropzone } from "react-dropzone";

export const StudentList = (props) => {
  const { hasPermission } = props;
  const hasCreatePermission = hasPermission("Batches", "Create");
  const hasEditPermission = hasPermission("Batches", "Edit");
  const hasDeletePermission = hasPermission("Batches", "Delete");

  const {
    student,
    studentsQuery,
    onDelete,
    onToggleModal,
    isConfirmDelete,
    deleteStudent,
    fetchData,
    page,
    setPage,
    isTemplateModalShow,
    setIsTemplateModalShow,
    uploadStudentTemplate,
    studentCsv,
    setStudentCsv,
  } = useStudent({
    load: true,
  });
  const { data, isLoading } = studentsQuery;
  const { data: students, totalPages, hasNext, hasPrevious, totalCount } = !isLoading && data;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteStudent.mutate(student.studentId);
  };

  const gotoCreate = () => {
    history(`${location.pathname}/create`);
  };

  const dropzone = {
    padding: "20px",
    border: "2px dashed #bbbce1",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
  };

  const onDrop = useCallback(
    (files) => {
      if (files.length > 0) {
        setStudentCsv(files);
      }
    },
    [setStudentCsv]
  );

  const FileDrop = (props) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
        "text/csv": [".csv"],
      },
      maxFiles: 1,
    });

    return (
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })} style={dropzone}>
          <input {...getInputProps()} />
          <p style={{ marginBottom: 0 }}>
            {studentCsv && studentCsv[0].name ? (
              <strong style={{ color: "black" }}>{studentCsv[0].name}</strong>
            ) : (
              "Drag 'n' drop some files here, or click to select files"
            )}
          </p>
        </div>
      </section>
    );
  };

  // DOWNLOAD STUDENT TEMPLATE
  const getStudentsTemplate = async () => {
    const res = await Axios.get("/Students/DownloadImportStudentTemplate");
    fileDownload(res.data, "student-template.csv");
  };

  const onEdit = (studentId) => {
    history(`${location.pathname}/edit/${studentId}`);
  };

  const onUpload = () => {
    if (studentCsv) {
      uploadStudentTemplate.mutate(studentCsv);
    }
  };

  const StatusIndicator = ({ value }) => {
    return (
      <Badge
        color={
          value === 3 ? "warning" : value === 2 ? "primary" : value === 1 ? "secondary" : "success"
        }
      >
        {value === 3
          ? "Invited"
          : value === 2
            ? "Pending Invite"
            : value === 1
              ? "Inactive"
              : "Active"}
      </Badge>
    );
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        {
          hasEditPermission &&
          <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
            <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
          </Button>
        }
        {
          hasDeletePermission &&
          <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
            <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
          </Button>
        }
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Registration Id",
        accessor: "registrationId",
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "emailAddress",
      },
      {
        Header: "Status",
        accessor: "userStatus",
        Cell: StatusIndicator,
      },
      {
        Header: "Actions",
        accessor: "studentId",
        id: "actions",
        Cell: ActionButtons,
      },
    ],
    []
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout title={"Student"} subtitle={"List"} breadcrumb={[{ label: "Student" }]}>
      <div>
        <div className="mb-4">
          {
            hasCreatePermission && <Button color="primary" size="sm" onClick={gotoCreate}>
              Create New
            </Button>
          }
          <Button className="ms-3" color="success" size="sm" onClick={getStudentsTemplate}>
            <i style={{ fontSize: "12px" }} className="bi bi-file-earmark-arrow-down"></i>{" "}
            <span>
              Download template {"("}.csv{")"}
            </span>
          </Button>
          <Button
            className="ms-3"
            color="warning"
            style={{ color: "black" }}
            size="sm"
            onClick={() => setIsTemplateModalShow(true)}
          >
            <i style={{ fontSize: "12px" }} className="bi bi-file-earmark-arrow-up"></i>{" "}
            <span>
              Upload template {"("}.csv{")"}
            </span>
          </Button>
        </div>
      </div>
      <PaginationTableLayout
        columns={columns}
        data={students}
        controlledPageCount={totalPages}
        controlledpageNo={page.pageIndex}
        controlledpageSize={page.pageSize}
        fetchData={fetchData}
        setPage={setPage}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete students ${student.firstName}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
      <StudentTemplateModal
        isOpen={isTemplateModalShow}
        title="Upload file (.csv)"
        size={"lg"}
        onCancel={() => setIsTemplateModalShow(false)}
      >
        <FileDrop />
        <div style={{ textAlign: "center" }}>
          <Button color="success" onClick={onUpload}>
            Upload file
          </Button>
        </div>
      </StudentTemplateModal>
    </ContentLayout>
  );
};
