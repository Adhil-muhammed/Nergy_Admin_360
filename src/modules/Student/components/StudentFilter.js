import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const StudentFilter = () => {
  const history = useNavigate();
  const location = useLocation();
  const gotoCreate = () => {
    history(`${location.pathname}/create`);
  };
  return (
    <div>
      <div className="mb-4">
        <Button color="primary" size="sm" onClick={gotoCreate}>
          Create New
        </Button>
      </div>
    </div>
  );
};
