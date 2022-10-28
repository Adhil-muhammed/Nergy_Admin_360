import { useAssessment } from "modules/Assessment";
import { useBatch } from "modules/Batch";
import { useCourse } from "modules/Courses";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentLayout } from "shared";
import InputControl from "shared/components/InputControl";
import { LoadingButton } from "shared/components/LoadingButton";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import SimpleReactValidator from "simple-react-validator";
import { useCertificates } from "../hooks";

export const AddorEditCertificates = () => {
  const { assessmentQuery } = useAssessment({ load: true });
  const { data } = assessmentQuery;
  const { batchesQuery } = useBatch({ load: true });
  const { coursesQuery } = useCourse({ load: true });
  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  let { certId } = useParams();

  const editMode = certId > 0;

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
    onSelectChange,
  } = useCertificates({ load: false, certId: certId });

  const { batchId, courseId, studentId, assessmentId } = certificate;

  const navigate = useNavigate();
  const onSubmit = () => {
    if (validator.current.allValid()) {
      createCertificate.mutate(certificate);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const courses = React.useMemo(() => {
    return coursesQuery.data
      ? coursesQuery.data.map((c) => {
          return { value: c.courseId, label: c.name };
        })
      : [];
  }, [coursesQuery.data]);

  const batches = React.useMemo(() => {
    return batchesQuery.data
      ? batchesQuery.data.map((c) => {
          return { value: c.batchId, label: c.name };
        })
      : [];
  }, [batchesQuery.data]);

  const assessmentList = data?.map((item) => ({ value: item.assessmentId, label: item.name }));

  if (certificateInfo.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <ContentLayout
      subtitle={"Create"}
      title={"Certificate"}
      breadcrumb={[
        { label: "Certificates", location: "/certificates" },
        { label: `${editMode ? "Edit" : "Create"}` },
      ]}
    >
      <section id="basic-vertical-layouts">
        <div className="row match-height">
          <div className="col-12">
            <form className="form form-vertical">
              <div className="form-body">
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="first-name-vertical">Assessment</label>
                        <InputControl
                          type="react-select"
                          options={assessmentList}
                          name="assessmentId"
                          value={
                            assessmentId &&
                            assessmentList.length > 0 &&
                            assessmentList.find((c) => c.value === assessmentId)
                          }
                          isValid={
                            !validator.current.message("Assessment", assessmentId, "required")
                          }
                          onChange={(e) => onSelectChange(e, "assessmentId")}
                        />
                        <div className="text-danger">
                          {validator.current.message("assessment", assessmentId, "required")}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="first-name-vertical">Batch</label>
                        <InputControl
                          type="react-select"
                          options={batches}
                          name="assessmentId"
                          value={
                            batchId &&
                            batches.length > 0 &&
                            batches.find((c) => c.value === batchId)
                          }
                          isValid={!validator.current.message("Batch", batchId, "required")}
                          onChange={(e) => onSelectChange(e, "batchId")}
                        />
                        <div className="text-danger">
                          {validator.current.message("Batch", batchId, "required")}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="first-name-vertical">course</label>
                        <InputControl
                          type="react-select"
                          options={courses}
                          name="courseId"
                          value={
                            courseId &&
                            courses.length > 0 &&
                            courses.find((c) => c.value === courseId)
                          }
                          isValid={!validator.current.message("course", courseId, "required")}
                          onChange={(e) => onSelectChange(e, "courseId")}
                        />
                        <div className="text-danger">
                          {validator.current.message("course", courseId, "required")}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="first-name-vertical">Student</label>
                        <InputControl
                          type="react-select"
                          // options={assessmentList}
                          // name="studentId"
                          // value={
                          //   studentId &&
                          //   assessmentList.length > 0 &&
                          //   assessmentList.find((c) => c.value === studentId)
                          // }
                          isValid={!validator.current.message("student", studentId, "required")}
                          onChange={(e) => onSelectChange(e, "studentId")}
                        />
                        <div className="text-danger">
                          {validator.current.message("student", studentId, "required")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-end mt-5">
                    <LoadingButton
                      isLoading={createCertificate.isLoading}
                      className="me-1 mb-1"
                      color="success"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      {editMode ? "Update" : "Save"}
                    </LoadingButton>
                    <button
                      disabled={createCertificate.isLoading}
                      type="reset"
                      className="btn btn-light-secondary me-1 mb-1"
                      onClick={() => {
                        navigate("..");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};
