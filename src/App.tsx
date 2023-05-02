import React, { useState } from "react";
import styled from "styled-components";
import QuestionCard from "./components/QuestionCard";
import { getQuiz } from "./components/API";
import { Difficulty } from "./components/API";
import { QuestionState } from "./components/API";

export type AnswerObject = {
  text: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(questions);
  const startApiCalls = async () => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await getQuiz(TOTAL_QUESTIONS, Difficulty.Easy);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};
  return (
    <MainContainer className="App">
      <HeaderText>Quiz</HeaderText>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <Button onClick={startApiCalls}>Start Quiz</Button>
      ) : null}

      {!gameOver ? <Paragraph>Score:</Paragraph> : null}
      {loading && <Paragraph>Loading Questions....</Paragraph>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question.text}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswers}
        />
      )}
      <Button onClick={nextQuestion}>Next</Button>
    </MainContainer>
  );
}

export default App;
const MainContainer = styled.div``;
const HeaderText = styled.h1``;
const Button = styled.button``;
const Paragraph = styled.p``;
