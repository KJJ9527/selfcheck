import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Spin, Space, Tag, Breadcrumb } from 'antd';
import problems from '../data/problems.json';

const { Title, Text } = Typography;

// 计算阅读时间（基于单词数，粗略估计）
const estimateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} 分钟阅读`;
};

export default function ProblemDetail() {
  const { id } = useParams<{ id: string }>();
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const problem = problems.find(p => p.id === id);

  useEffect(() => {
    if (!id) return;
    const base = import.meta.env.BASE_URL;
    fetch(`${base}problems/${id}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Markdown not found');
        return res.text();
      })
      .then(text => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => {
        setMarkdown('### 未找到该问题的详细内容');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

  return (
    <div className="problem-detail-container">
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">知识库</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{problem?.title || '加载中...'}</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={1} className="problem-title">
        {problem?.title}
      </Title>

      {/* 标签和阅读时间行 */}
      <Space wrap style={{ marginBottom: 24, marginTop: 8 }}>
        {problem?.scene?.map((sceneObj, index) => {
          const label = Object.values(sceneObj)[0];
          return <Tag key={index} color="blue">{label}</Tag>;
        })}
        <Text type="secondary">{estimateReadingTime(markdown)}</Text>
      </Space>

      {/* 问题描述（简短） */}
      {problem?.description && (
        <Text type="secondary" style={{ display: 'block', marginBottom: 24, fontSize: 16 }}>
          {problem.description}
        </Text>
      )}

      {/* 内容卡片 */}
      <div className="markdown-card">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}