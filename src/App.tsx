import React, { useState } from "react";
import styled from "styled-components";
import QuestionCard from "./components/QuestionCard";
import { getQuiz } from "./components/API";
import { Difficulty } from "./components/API";
import { QuestionState } from "./components/API";
import { GlobalStyle } from "./App.styles";

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

  const checkAnswers = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //this is user answer
      const answer = event.currentTarget.value;

      //check if user answer is correct
      const correct = questions[number].correctAnswer === answer;

      if (correct) setScore((prev) => prev + 1);

      //save answers in the array for user answers
      const answerObject: any = {
        question: questions[number].question.text,
        answer,
        correct,
        correctAnswer: questions[number].correctAnswer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //if not the last question, then next
    const next: any = number + 1;
    if (next === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(next);
    }
  };
  return (
    <MainContainer className="App">
      <GlobalStyle />
      <HeaderText>Quiz</HeaderText>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <Button onClick={startApiCalls} className="start">
          Start Quiz
        </Button>
      ) : null}

      {!gameOver ? <Paragraph>Score: {score}</Paragraph> : null}
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
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <Button className="next" onClick={nextQuestion}>
          Next
        </Button>
      ) : null}
    </MainContainer>
  );
}

export default App;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderText = styled.h1`
  color: #e9eff1;
`;
const Button = styled.button`
  background-color: ${(props) =>
    props.className === "next" ? "#F09512" : "#7f9c9c"};
  border-radius: 25px;
  padding: 10px 10px;
  width: ${(props) => (props.className === "start" ? "100%" : "30%")};
  cursor: pointer;
`;
const Paragraph = styled.p`
  color: #ffffff;
`;
