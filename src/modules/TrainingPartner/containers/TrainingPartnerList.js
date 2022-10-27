import { ContentLayout, TableLayout, ModalLayout } from "shared/components";
import { TrainingPartnerFilter } from "..";
import { useTrainingPartner } from "../hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import { LoadingSpinner } from "shared/components/LoadingSpinner";
import { useAuthorizeContext } from "master";

export const TrainingPartnerList = () => {
  const { hasPermission } = useAuthorizeContext();
  const hasCreatePermission = hasPermission("TrainingPartner", "Create");
  const hasEditPermission = hasPermission("TrainingPartner", "Edit");
  const hasDeletePermission = hasPermission("TrainingPartner", "Delete");

  const {
    trainingPartner,
    trainingPartnerQuery,
    onDelete,
    isConfirmDelete,
    deleteTrainingPartner,
    onToggleModal,
  } = useTrainingPartner({
    load: true,
  });

  const history = useNavigate();
  const location = useLocation();

  const { data, isLoading } = trainingPartnerQuery;

  const onEdit = (trainingPartnerId) => {
    history(`${location.pathname}/edit/${trainingPartnerId}`);
  };

  const onConfirm = () => {
    deleteTrainingPartner.mutate(trainingPartner.trainingPartnerId);
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
      Header: "Name",
      accessor: "firstName",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "E-Mail",
      accessor: "emailAddress",
    },
  ];

  if (hasDeletePermission || hasEditPermission) {
    columns.push(
      {
        Header: "Actions",
        accessor: "trainingPartnerId",
        id: "actions",
        Cell: ActionButtons,
      });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ContentLayout
      title={"Training Partner"}
      subtitle={"Training Partner List"}
      breadcrumb={[{ label: "Training Partner", location: "/trainingpartner" }]}
    >
      {
        hasCreatePermission && <TrainingPartnerFilter />
      }
      <TableLayout columns={columns} data={data} />
      <ModalLayout
        isOpen={isConfirmDelete}
        title={"Confirm"}
        message={`Are you sure? Do you want to delete students ${trainingPartner.firstName}`}
        onConfirm={() => {
          onConfirm();
        }}
        onCancel={() => onToggleModal(false)}
      />
    </ContentLayout>
  );
};
