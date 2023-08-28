import React from "react";
import { Button } from "@mui/material";
import { useQuestionStore } from "../store/question";

const LIMIT_QUESTIONS = 10;

interface StartProps {}

const Start: React.FC<StartProps> = () => {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions);

  const handleClick = () => {
    console.log("first");
    fetchQuestions(LIMIT_QUESTIONS);
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
    >
      Empezar!!
    </Button>
  );
};

export default Start;
