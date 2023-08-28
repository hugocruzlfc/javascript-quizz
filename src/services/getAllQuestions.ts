export const getAllQuestions = async (limit: number) => {
  const response = await fetch("http://localhost:5173/data/data.json");
  const data = await response.json();
  const questions = data.sort(() => Math.random() - 0.5).slice(0, limit);
  return questions;
};
