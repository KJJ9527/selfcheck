import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card } from 'antd';
import problems from '../data/problems.json';
import ReactMarkdown from 'react-markdown';

const { Title, Paragraph } = Typography;

interface Problem {
  id: string;
  title: string;
  description: string;
  solution: string;
}

const ProblemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const problem: Problem | undefined = problems.find((p: Problem) => p.id === id);

  if (!problem) {
    return (
      <Card>
        <Title level={4}>问题不存在</Title>
      </Card>
    );
  }

  return (
    <Card>
      <Typography>
        <Title level={2}>{problem.title}</Title>
        <Paragraph>{problem.description}</Paragraph>
        <Paragraph>
          <ReactMarkdown>{problem.solution}</ReactMarkdown>
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default ProblemDetail;