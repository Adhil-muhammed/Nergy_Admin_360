import { ContentLayout, ModalLayout } from "shared/components";
import { Input, Button, FormFeedback, Table } from "reactstrap";
import Datetime from "react-datetime";
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { useSupportTicket } from "../hooks";
import SimpleReactValidator from "simple-react-validator";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { LoadingButton } from "shared/components/LoadingButton";
import { QuillEditor } from "shared/components/QuillEditor";
import { useUser } from "modules/Users";
import { useStudent } from "modules/Student";
import InputControl from "shared/components/InputControl";
import { ReplyModal } from "../components/ReplyModal";

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
  const ReplyValidator = useRef(
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
    createSupportTicketsReply,
    reply,
    setReply,
    isModalOpen,
    setIsModalOpen,
    ticketReply,
    isConfirmDelete,
    onToggleModal,
    deleteTicketReply,
    onDelete,
  } = useSupportTicket({
    load: false,
    ticketId: ticketId,
  });

  const { date, subject, message, studentId, userId, status } = supportTicket;

  useEffect(() => {
    setReply((draft) => {
      draft.ticketId = ticketId;
    });
  }, [ticketId]);

  const onConfirm = () => {
    deleteTicketReply.mutate(ticketReply.replyId);
  };

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

  const replyTicketDate = moment(reply.date);

  const onReplyDateChange = (m) => {
    const tdate = m.format("YYYY-MM-DDTHH:mm:ss").toString();
    setReply((draft) => {
      draft.date = tdate;
    });
  };

  const onSelectChange = (e, name) => {
    const { value } = e;
    setSupportTicket((draft) => {
      draft[name] = value;
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

  const onReplySubmit = () => {
    if (ReplyValidator.current.allValid() && ticketDate.isValid()) {
      createSupportTicketsReply.mutate(reply);
    } else {
      ReplyValidator.current.showMessages();
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
                          timeformat={false}
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
                          User Id
                        </label>
                        <InputControl
                          type="react-select"
                          options={userIdList}
                          name="userId"
                          value={userId !== "" && userIdList.find((c) => c.value == userId)}
                          isValid={!validator.current.message("userId", userId, "required")}
                          onChange={(e) => onSelectChange(e, "userId")}
                        />
                        <div className="text-danger">
                          {validator.current.message("userId", userId, "required")}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="mb-2" htmlFor="first-studentid-vertical">
                          Student Id
                        </label>
                        <InputControl
                          type="react-select"
                          options={studentIdList}
                          name="studentId"
                          value={
                            studentId !== "" && studentIdList.find((c) => c.value == studentId)
                          }
                          isValid={!validator.current.message("studentId", studentId, "required")}
                          onChange={(e) => onSelectChange(e, "studentId")}
                        />
                        <div className="text-danger">
                          {validator.current.message("studentId", studentId, "required")}
                        </div>
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

                  <div className="col-12 d-flex justify-content-end mt-4">
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
      {editMode && (
        <div className="col-12 mt-4">
          {supportTicket.replies.length > 0 && (
            <>
              <h4 className="mb-4">Reply messages</h4>
              <Table responsive size="">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Reply message</th>
                    <td>Date</td>
                    <th style={{ width: "220px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supportTicket.replies.map((reply, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <span>{index + 1}</span>
                        </td>
                        <td>
                          <span>{reply.replyMessage}</span>
                        </td>
                        <td>
                          <span>{reply.date}</span>
                        </td>
                        <td>
                          <Button
                            color="danger"
                            className="mt-4"
                            size="sm"
                            onClick={() => onDelete(reply.replyId, true)}
                          >
                            <i className="bi bi-trash" style={{ fontSize: "10px" }}></i>{" "}
                            <span>Delete</span>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          )}
          <div className="row">
            <div>
              <Button
                disabled={createSupportTickets.isLoading || editSupportTickets.isLoading}
                type="button"
                color="primary"
                className="mb-1"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Add reply message
              </Button>
            </div>
          </div>

          <ReplyModal
            size={"lg"}
            isOpen={isModalOpen}
            title={"Add reply"}
            onSave={() => {
              onReplySubmit();
            }}
            onCancel={() => setIsModalOpen(false)}
          >
            <form className="form">
              <div className="form-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="mb-2" htmlFor="contact-replydate-vertical">
                        Date
                      </label>
                      <Datetime
                        dateformat="YYYY-MM-DD"
                        timeformat={false}
                        name="date"
                        closeOnSelect={true}
                        selected={reply.date}
                        value={reply.date}
                        onChange={onReplyDateChange}
                      />
                      <div className="text-danger">
                        {update && !replyTicketDate.isValid() ? "Please select date" : ""}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="mb-2" htmlFor="first-ticketid-vertical">
                        Ticket Id
                      </label>
                      <Input
                        type="text"
                        id="first-ticketid-vertical"
                        className="form-control"
                        name="ticketId"
                        placeholder="Ticket Id"
                        value={reply.ticketId}
                        // onChange={(e) => {
                        //   setReply((draft) => {
                        //     draft.ticketId = e.target.value;
                        //   });
                        // }}
                        // invalid={ReplyValidator.current.message(
                        //   "tiketId",
                        //   reply.ticketId,
                        //   "required"
                        // )}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="mb-2" htmlFor="first-ruserid-vertical">
                        User Id
                      </label>
                      <InputControl
                        type="react-select"
                        options={userIdList}
                        name="userId"
                        value={
                          reply.userId !== "" && userIdList.find((c) => c.value == reply.userId)
                        }
                        isValid={
                          !ReplyValidator.current.message("userId", reply.userId, "required")
                        }
                        onChange={(e) => {
                          setReply((draft) => {
                            draft.userId = e.value;
                          });
                        }}
                      />
                      <div className="text-danger">
                        {ReplyValidator.current.message("userId", reply.userId, "required")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="mb-2" htmlFor="first-replyMessage-vertical">
                        Reply Message
                      </label>
                      <QuillEditor
                        value={reply.replyMessage}
                        onChange={(value) => {
                          setReply((draft) => {
                            draft.replyMessage = value;
                          });
                        }}
                      />
                      <div className="text-danger">
                        {ReplyValidator.current.message(
                          "replyMessage",
                          reply.replyMessage,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </ReplyModal>
          <ModalLayout
            isOpen={isConfirmDelete}
            title={"Confirm"}
            message={`Are you sure? Do you want to delete ${ticketReply.replyMessage}?`}
            onConfirm={() => {
              onConfirm();
            }}
            onCancel={() => onToggleModal(false)}
          />
        </div>
      )}
    </ContentLayout>
  );
};
