import React from "react";
import {
  IconButton,
  Stack,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useQuestionStore } from "../store/question";
import { type Question as QuestionType } from "../types/types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";
import Footer from "./Footer";

interface GameProps {}

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  //usar no ha seleccionado nada
  if (userSelectedAnswer == null) return "transparent";

  //si ya selecciono pero la solucion es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";

  //si ya selecciono y la solucion es correcta
  if (index === correctAnswer) return "green";

  // si esta seleccionado y no es la solucion
  if (index === userSelectedAnswer) return "red";

  //si no es nunguna d las anteriores
  return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "#222",
        p: 2,
        textAlign: "left",
        marginTop: 4,
      }}
    >
      <Typography variant="h4">{info.question}</Typography>
      <SyntaxHighlighter
        language="javascript"
        style={gradientDark}
      >
        {info.code}
      </SyntaxHighlighter>
      <List
        disablePadding
        sx={{
          bgcolor: "#333",
        }}
      >
        {info.answers.map((answer, index) => (
          <ListItem
            key={index}
            disablePadding
            divider
          >
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index),
              }}
            >
              <ListItemText
                primary={answer}
                sx={{
                  textAlign: "center",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

const Game: React.FC<GameProps> = () => {
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);
  const goToNextQuestion = useQuestionStore((state) => state.goToNextQuestion);
  const goToPreviousQuestion = useQuestionStore(
    (state) => state.goToPreviousQuestion
  );

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          disabled={currentQuestion === 0}
          onClick={goToPreviousQuestion}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1}/{questions.length}
        <IconButton
          disabled={currentQuestion === questions.length - 1}
          onClick={goToNextQuestion}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};

export default Game;
