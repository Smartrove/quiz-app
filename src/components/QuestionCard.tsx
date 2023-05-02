import React from "react";
import styled from "styled-components";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
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
    <Paragraph>
      Question: {questionNumber} / {totalQuestions}
    </Paragraph>
    <Paragraph dangerouslySetInnerHTML={{ __html: question }} />

    <AnswerContainer>
      {answers.map((answer) => (
        <div>
          <button disabled={userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </AnswerContainer>
  </MainContainer>
);

export default QuestionCard;

const MainContainer = styled.div``;
const Paragraph = styled.p``;
const AnswerContainer = styled.div``;
