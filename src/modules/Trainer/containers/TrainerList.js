import React from "react";
import { ContentLayout, PaginationTableLayout, ModalLayout } from "shared/components";
import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useTrainer } from "../hook";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { TrainerFilter } from "..";
import { useAuthorizeContext } from "master";

export const TrainerList = () => {
  const { hasPermission } = useAuthorizeContext();
  const hasCreatePermission = hasPermission("Trainer", "Create");
  const hasEditPermission = hasPermission("Trainer", "Edit");
  const hasDeletePermission = hasPermission("Trainer", "Delete");

  const {
    trainer,
    trainersQuery,
    onDelete,
    onToggleModal,
    isConfirmDelete,
    deleteTrainer,
    fetchData,
    setPage,
    page,
  } = useTrainer({ load: true });

  const { data, isLoading } = trainersQuery;

  const { data: traines, totalPages, hasNext, hasPrevious } = !isLoading && data;

  const history = useNavigate();
  const location = useLocation();
  const onConfirm = () => {
    deleteTrainer.mutate(trainer.trainerId);
  };

  const onEdit = (trainerId) => {
    history(`${location.pathname}/edit/${trainerId}`);
  };

  const ActionButtons = ({ value }) => {
    return (
      <>
        {
          hasEditPermission && <Button outline color="primary" size="sm" onClick={() => onEdit(value)}>
            <i className="bi bi-pencil-square" style={{ fontSize: "10px" }}></i> <span>Edit</span>
          </Button>
        }
        {
          hasDeletePermission && <Button color="danger" size="sm" onClick={() => onDelete(value)} className="ms-3">
            <i className="bi bi-trash" style={{ fontSize: "10px" }}></i> <span>Delete</span>
          </Button>
        }
      </>
    );
  };

  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },

  ];

  if (hasDeletePermission && hasEditPermission) {
    columns.push({
      Header: "Actions",
      accessor: "trainerId",
      id: "actions",
      Cell: ActionButtons,
    });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout title={"Trainer"} subtitle={"Trainer List"} breadcrumb={[{ label: "Trainer" }]}>
      {
        hasCreatePermission && <TrainerFilter />
      }
      <PaginationTableLayout
        columns={columns}
        data={traines}
        controlledPageCount={totalPages}
        controlledpageNo={page.pageIndex}
        controlledpageSize={page.pageSize}
        fetchData={fetchData}
        setPage={setPage}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      ></PaginationTableLayout>

      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete students ${trainer.firstName}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
