import React from "react";
import styled from "styled-components";
import { AnswerObject } from "../App";
import { Question } from "./API";

type Props = {
  question: string;
  answers: string[];
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}: Props) => (
  <MainContainer>
    <Paragraph className="question">
      Question: {questionNumber} / {totalQuestions}
    </Paragraph>
    <Paragraph dangerouslySetInnerHTML={{ __html: question }} />

    <AnswerContainer>
      {answers &&
        answers.map((answer) => (
          <div key={answer}>
            <QuestionsButton
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </QuestionsButton>

            {/* or */}

            {/* <button
            disabled={!!userAnswer}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button> */}
          </div>
        ))}
    </AnswerContainer>
  </MainContainer>
);

export default QuestionCard;

const MainContainer = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 15px;
  padding: 40px 20px;
  width: 100%;
`;
const Paragraph = styled.p`
  color: #fc9708;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${(props) =>
    props.className === "question" ? "1px solid white" : ""};
  border-radius: ${(props) => (props.className === "question" ? "15px" : "")};
  padding: ${(props) => (props.className === "question" ? "10px 10px" : "")};
  box-shadow: ${(props) =>
    props.className === "question" ? "2px 2px 2px rgba(0, 0, 0, 0.25)" : ""};
  background-color: ${(props) => (props.className === "question" ? "" : "")};

  &:hover {
    background-color: ${(props) =>
      props.className === "question" ? "#fc9708" : ""};
    color: ${(props) => (props.className === "question" ? "#fff" : "")};
  }
`;
type QuestionsButtonProps = {
  correct: boolean;
  userClicked: boolean;
};
const QuestionsButton = styled.button<QuestionsButtonProps>`
  cursor: pointer;
  user-select: none;
  font-size: 0.8rem;
  width: 100%;
  height: 40px;
  margin: 5px 0;
  transition: all 0.3s ease;
  background: ${({ correct, userClicked }) =>
    correct
      ? "linear-gradient(90deg, #56ffa4, #59bc86)"
      : !correct && userClicked
      ? "linear-gradient(90deg, #ff5656, #c16868)"
      : "linear-gradient(90deg, #56ccff, #6eafb4)"};
  border: 3px solid #fff;
  box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: #fff;

  &:hover {
    opacity: 0.8;
  }
`;

const AnswerContainer = styled.div``;
