import { Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const QuestionBanksFilter = () => {
  const history = useNavigate();
  const location = useLocation();
  const gotoCreate = () => {
    history(`${location.pathname}/create`);
  };
  return (
    <div>
      <div>
        <Button color="primary" onClick={gotoCreate}>
          Create New
        </Button>
      </div>
    </div>
  );
};
