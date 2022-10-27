import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const UserIdFilter = () => {
  const history = useNavigate();
  const location = useLocation();
  const gotoCreate = () => {
    history(`${location.pathname}/create`);
  };
  const gotoRoles = () => {
    history('/admin/role');
  };
  return (
    <div>
      <div className="mb-4">
        <Button color="primary" size="sm" onClick={gotoCreate}>
          Create New
        </Button>
        <Button className="ms-3" color="success" size="sm" onClick={gotoRoles}>
          Roles
        </Button>
      </div>
    </div>
  );
};