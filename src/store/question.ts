import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Question } from "../types/types";
import confetti from "canvas-confetti";
import { getAllQuestions } from "../services/getAllQuestions";

interface QuestionState {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => void;
  selectAnswer: (quwestionId: number, answerIndex: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionStore = create<QuestionState>()(
  devtools(
    persist(
      (set, get) => ({
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
          const questions = await getAllQuestions(limit);
          set({ questions }, false, "FETCH_QUESTIONS");
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();
          // usar structuredClone para clonar el array de preguntas
          const newQuestions = structuredClone(questions);

          // encontrar lel indice de la pregunta actual
          const questionIndex = newQuestions.findIndex(
            (q: Question) => q.id === questionId
          );

          // obtenemos la info de la pregunta actual
          const questionInfo = newQuestions[questionIndex];

          // averiguamos si la respuesta es correcta
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          if (isCorrectUserAnswer) confetti();

          //actualizar el estado
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          set(
            {
              questions: newQuestions,
            },
            false,
            "SELECT_ANSWER"
          );
        },

        goToNextQuestion: () => {
          const { questions, currentQuestion } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set(
              {
                currentQuestion: nextQuestion,
              },
              false,
              "GO_TO_NEXT_QUESTION"
            );
          }
        },

        goToPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;

          if (previousQuestion >= 0) {
            set(
              {
                currentQuestion: previousQuestion,
              },
              false,
              "GO_TO_PREVIOUS_QUESTION"
            );
          }
        },
        reset: () => {
          set(
            {
              questions: [],
              currentQuestion: 0,
            },
            false,
            "RESET"
          );
        },
      }),
      {
        name: "question-storage",
      }
    )
  )
);
