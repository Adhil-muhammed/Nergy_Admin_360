import moment from "moment";
import { useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { errorMessage, successMessage } from "utils";
import { generateSchedule } from "../api/GenerateScheduleApi";

const GENERATE_SCHEDULE = "GENERATE_SCHEDULE";
export const useGenerateAssessmentSchedule = () => {
  const queryClient = useQueryClient();
  const [state, setState] = useImmer({
    assessmentId: "",
    date: "",
    startAt: "",
    timeBetweenSlots: "",
    noOfSlots: "",
    duration: "",
    userLimit: "",
  });

  const createSchedule = useMutation(generateSchedule, {
    onError: () => {
      errorMessage();
    },
    onSuccess: () => {
      successMessage();
      queryClient.invalidateQueries("GET_ASSESSMENT_SCHEDULE");
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((draft) => {
      draft[name] = value;
    });
  };

  const onSelectChange = (e, name) => {
    const { value } = e;
    setState((draft) => {
      draft[name] = value;
    });
  };
  const onChangeDate = (e) => {
    const { name, value } = e.target;
    setState((draft) => {
      draft[name] = moment(value, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm:ss");
    });
  };
  const onChangeTime = (e) => {
    const { name, value } = e.target;
    setState((draft) => {
      draft[name] = moment(value, "HH:mm").format("YYYY-MM-DDTHH:mm:ss");
    });
  };
  const generateSchedules = () => {
    createSchedule.mutate(state);
  };
  const reset = () => {
    setState((draft) => {
      draft.assessmentId = "";
      draft.date = "";
      draft.startAt = "";
      draft.timeBetweenSlots = "";
      draft.noOfSlots = "";
      draft.duration = "";
      draft.userLimit = "";
    });
  };
  return {
    state,
    reset,
    generateSchedules,
    onChange,
    onSelectChange,
    onChangeDate,
    onChangeTime,
    createSchedule,
  };
};
