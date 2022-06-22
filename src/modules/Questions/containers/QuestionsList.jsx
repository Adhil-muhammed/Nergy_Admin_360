import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { Button } from "reactstrap";
import { ContentLayout, ModalLayout, TableLayout } from "shared";
import { useImmer } from "use-immer";

export const QuestionsList = (props) => {
  const { data } = props;
  const history = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useImmer({ isOpen: false, id: "" });
  const gotoCreate = () => {
    history(`${location.pathname}/create`);
  };

  const onDelete = (value) => {
    setModal((draft) => {
      draft.isOpen = !draft.isOpen;
      draft.id = value.id;
    });
  };

  const toggleModal = () => {
    setModal((draft) => {
      draft.isOpen = !draft.isOpen;
      draft.id = "";
    });
  };

  const onConfirm = () => {
    // deleteQuestionBank.mutate(questionBank.questionBankId);
  };

  const onEdit = (questionBankId) => {
    // history(`${location.pathname}/edit/${questionBankId}`);
  };

  const EditCell = ({ value }) => {
    return (
      <Button outline color="primary" onClick={() => onEdit(value)}>
        Edit
      </Button>
    );
  };

  const DeleteCell = ({ row }) => {
    return (
      <Button color="danger" onClick={() => onDelete(row)}>
        Delete
      </Button>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Difficulty Level",
        accessor: "difficultyLevel",
      },
      {
        Header: "Question Bank",
        accessor: (row) => row.questionBank.name,
      },
      {
        Header: "Edit",
        accessor: "questionBankId",
        id: "editQuestionBank",
        Cell: EditCell,
      },
      {
        Header: "Delete",
        id: "deleteInstitute",
        accessor: "questionBankId",
        key: "deleteQuestionBank",
        Cell: DeleteCell,
      },
    ],
    []
  );

  const table = useTable({
    columns,
    data: data,
  });
  return (
    <>
      <ContentLayout title="Questions" subtitle="List">
        <div className="mb-4">
          <Button color="primary" size="sm" onClick={gotoCreate}>
            Create New
          </Button>
        </div>
        <TableLayout table={table} />
        <ModalLayout
          isOpen={modal.isOpen}
          title="Confirm"
          message={`Are you sure? Do you want to delete ${modal.name}`}
          onConfirm={() => {
            onConfirm();
          }}
          onCancel={() => toggleModal()}
        />
      </ContentLayout>
    </>
  );
};
