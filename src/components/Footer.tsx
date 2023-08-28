import React from "react";
import { useQuestionData } from "../hooks/useQuestionData";
import { Button } from "@mui/material";
import { useQuestionStore } from "../store/question";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { correct, incorrect, unanswered } = useQuestionData();
  const reset = useQuestionStore((state) => state.reset);

  return (
    <footer
      style={{
        marginTop: "16px",
      }}
    >
      <strong>{`✅ ${correct}correctas -  ❌ ${incorrect} incorrectas - ❓${unanswered} sin responder`}</strong>
      <div
        style={{
          marginTop: "16px",
        }}
      >
        <Button onClick={() => reset()}>Reiniciar juego!</Button>
      </div>
    </footer>
  );
};

export default Footer;
