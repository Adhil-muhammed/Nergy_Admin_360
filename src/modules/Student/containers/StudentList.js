import React, { useMemo } from "react";
import { ContentLayout, PaginationTableLayout, ModalLayout } from "shared/components";
import { StudentTemplateModal } from "..";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useStudent } from "../hooks";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { Axios } from "utils";
import fileDownload from "js-file-download";
import { useDropzone } from "react-dropzone";

export const StudentList = () => {
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

  const FileUploader = (props) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      onDrop: (files) => {
        setStudentCsv((draft) => {
          draft.templateFile = files;
          return draft;
        });
      },
      accept: {
        "text/csv": [".csv"],
      },
      maxFiles: 1,
    });

    const selectedFiles = acceptedFiles?.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    return (
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })} style={dropzone}>
          <input {...getInputProps()} />
          <p style={{ marginBottom: 0 }}>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <ul>{selectedFiles}</ul>
        </aside>
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
    if (studentCsv.templateFile) {
      uploadStudentTemplate.mutate(studentCsv.templateFile);
    }
  };

  console.log(studentCsv.templateFile);

  const ActionButtons = ({ value }) => {
    return (
      <>
        <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
          <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
        </Button>
        <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
          <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
        </Button>
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
          <Button color="primary" size="sm" onClick={gotoCreate}>
            Create New
          </Button>
          <Button className="ms-3" color="success" size="sm" onClick={getStudentsTemplate}>
            Download template {"("}.csv{")"}
          </Button>
          <Button
            className="ms-3"
            color="warning"
            style={{ color: "black" }}
            size="sm"
            onClick={() => setIsTemplateModalShow(true)}
          >
            Upload template {"("}.csv{")"}
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
        <FileUploader />
        <div style={{ textAlign: "center" }}>
          <Button color="success" onClick={onUpload}>
            Upload file
          </Button>
        </div>
      </StudentTemplateModal>
    </ContentLayout>
  );
};
