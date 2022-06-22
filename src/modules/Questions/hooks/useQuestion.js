import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import { getQuestions } from "../api";

const GetQuestionKey = "GET_QUESTION_API";

export const useQuestion = () => {
  const queryClient = useQueryClient();
  const questionsQuery = useQuery(GetQuestionKey, getQuestions, {
    staleTime: Infinity,
  });
  const [state, setState] = useImmer({
    data: {
      description: "",
      shuffleChoice: false,
      difficultyLevelCode: 0,
      questionBankId: 0,
      review: false,
      choices: [
        {
          code: "",
          description: "",
          isAnswer: false,
        },
        {
          code: "",
          description: "",
          isAnswer: false,
        },
      ],
    },
  });
  return { questionsQuery, state, setState };
};
