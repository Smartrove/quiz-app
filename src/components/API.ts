import axios from "axios";
import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correctAnswer: string;
  difficulty: string;
  incorrectAnswers: string[];
  question: { text: string };
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export const getQuiz = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://the-trivia-api.com/v2/questions?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  try {
    const { data } = await axios.get(endpoint);
    console.log(data);
    return data.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrectAnswers,
        question.correctAnswer,
      ]),
    }));
  } catch (error) {
    console.log(error);
  }
};
