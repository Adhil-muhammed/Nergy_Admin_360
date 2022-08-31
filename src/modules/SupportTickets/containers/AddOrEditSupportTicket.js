import { ContentLayout } from "shared/components";
import { Input, Button, FormFeedback } from "reactstrap";
import Datetime from "react-datetime";
import React, { useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { useSupportTicket } from "../hooks";
import SimpleReactValidator from "simple-react-validator";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";
import { QuillEditor } from "shared/components/QuillEditor";
import { useUser } from "modules/Users";
import { useStudent } from "modules/Student";

export const AddOrEditSupportTicket = (props) => {
  const { usersQuery } = useUser({ load: true });
  const { studentsQuery } = useStudent({ load: true });
  const { data: userData } = usersQuery;
  const { data: studentData } = studentsQuery;

  const [update, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );
  let { ticketId } = useParams();

  const editMode = !!ticketId;

  const {
    supportTicket,
    setSupportTicket,
    createSupportTickets,
    editSupportTickets,
    supportTicketInfo,
    onChange,
  } = useSupportTicket({
    load: false,
    ticketId: ticketId,
  });

  const { date, subject, message, studentId, userId, status } = supportTicket;

  const userIdList = React.useMemo(() => {
    return userData
      ? userData.map((c) => {
          return { value: c.userId, label: c.userId };
        })
      : [];
  }, [userData]);

  const studentIdList = React.useMemo(() => {
    return studentData
      ? studentData.data.map((c) => {
          return { value: c.studentId, label: c.studentId };
        })
      : [];
  }, [studentData]);

  const ticketDate = moment(date);
  const navigate = useNavigate();
  const onDateChange = (m) => {
    const tdate = m.format("YYYY-MM-DDTHH:mm:ss").toString();
    setSupportTicket((draft) => {
      draft.date = tdate;
    });
  };

  const onSubmit = () => {
    if (validator.current.allValid() && ticketDate.isValid()) {
      editMode
        ? editSupportTickets.mutate(supportTicket)
        : createSupportTickets.mutate(supportTicket);
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };
  const onCancel = () => {
    navigate("..", { replace: true });
  };
  if (supportTicketInfo.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <ContentLayout
      subtitle={editMode ? "Update" : "Create"}
      title={"Support Tickets"}
      breadcrumb={[
        { label: "Support ticket", location: "/admin/supportTicket" },
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
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="contact-date-vertical">
                          Date
                        </label>
                        <Datetime
                          dateformat="YYYY-MM-DD"
                          timeformat="{false}"
                          name="date"
                          closeOnSelect={true}
                          selected={ticketDate}
                          value={ticketDate}
                          onChange={onDateChange}
                        />
                        <div className="text-danger">
                          {update && !ticketDate.isValid() ? "Please select date" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-status-vertical">
                          Status
                        </label>
                        <Input
                          value={status}
                          id="first-status-vertical"
                          name="status"
                          type="select"
                          onChange={(e) => {
                            setSupportTicket((draft) => {
                              draft.status = parseInt(e.target.value, 10);
                            });
                          }}
                          invalid={validator.current.message("Status", status, "required")}
                        >
                          <option value="">---Select---</option>
                          <option value={0}>Active</option>
                          <option value={1}>Inactive</option>
                        </Input>
                        <FormFeedback>
                          {validator.current.message("Status", status, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-userid-vertical">
                          user Id
                        </label>
                        {/* <Input
                          type="text"
                          id="first-userid-vertical"
                          className="form-control"
                          name="userId"
                          placeholder="User Id"
                          value={userId}
                          onChange={onChange}
                          invalid={validator.current.message("userId", userId, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("userId", userId, "required")}
                        </FormFeedback> */}
                        <Input
                          value={userId}
                          id="first-userid-vertical"
                          name="userId"
                          type="select"
                          onChange={onChange}
                          invalid={validator.current.message("userId", userId, "required")}
                        >
                          <option value={""}>Select</option>
                          {userIdList &&
                            userIdList.map((c) => {
                              return (
                                <option key={`userId_${c.label}`} value={c.value}>
                                  {c.label}
                                </option>
                              );
                            })}
                        </Input>
                        <FormFeedback>
                          {validator.current.message("userId", userId, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-studentid-vertical">
                          Student Id
                        </label>
                        {/* <Input
                          type="text"
                          id="first-studentid-vertical"
                          className="form-control"
                          name="studentId"
                          placeholder="Student Id"
                          value={studentId}
                          onChange={onChange}
                          invalid={validator.current.message("studentId", studentId, "required")}
                        />
                        <FormFeedback>
                          {validator.current.message("studentId", studentId, "required")}
                        </FormFeedback> */}
                        <Input
                          value={studentId}
                          id="first-studentid-vertical"
                          name="studentId"
                          type="select"
                          onChange={onChange}
                          invalid={validator.current.message("studentId", studentId, "required")}
                        >
                          <option value={""}>Select</option>
                          {studentIdList &&
                            studentIdList.map((s) => {
                              return (
                                <option key={`userId_${s.label}`} value={s.value}>
                                  {s.label}
                                </option>
                              );
                            })}
                        </Input>
                        <FormFeedback>
                          {validator.current.message("studentId", studentId, "required")}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-subject-vertical">
                          Subject
                        </label>
                        <QuillEditor
                          value={subject}
                          onChange={(value) => {
                            setSupportTicket((draft) => {
                              draft.subject = value;
                            });
                          }}
                        />
                        <div className="text-danger">
                          {validator.current.message("subject", subject, "required")}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-message-vertical">
                          Message
                        </label>
                        <QuillEditor
                          value={message}
                          onChange={(value) => {
                            setSupportTicket((draft) => {
                              draft.message = value;
                            });
                          }}
                        />
                        <div className="text-danger">
                          {validator.current.message("message", message, "required")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 d-flex justify-content-end">
                    <LoadingButton
                      isLoading={createSupportTickets.isLoading || editSupportTickets.isLoading}
                      className="me-1 mb-1"
                      color="success"
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      {editMode ? "Update" : "Save"}
                    </LoadingButton>
                    <button
                      disabled={createSupportTickets.isLoading || editSupportTickets.isLoading}
                      type="reset"
                      className="btn btn-light-secondary me-1 mb-1"
                      onClick={() => {
                        onCancel();
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
