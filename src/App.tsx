import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import JavascriptLogo from "./components/JavascriptLogo";
import Start from "./pages/Start";
import { useQuestionStore } from "./store/question";
import Game from "./components/Game";

function App() {
  const questions = useQuestionStore((state) => state.questions);
  console.log(questions);
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h2"
            component="h1"
          >
            <JavascriptLogo /> JavaScript Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
