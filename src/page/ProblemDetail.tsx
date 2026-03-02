import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Spin } from 'antd';
import problems from '../data/problems.json';

const { Title } = Typography;

export default function ProblemDetail() {
  const { id } = useParams<{ id: string }>();
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  // 查找问题基本信息（用于展示标题）
  const problem = problems.find(p => p.id === id);

  useEffect(() => {
    if (!id) return;

    const base = import.meta.env.BASE_URL; // 获取 /selfcheck/
    // 从 public 目录加载对应的 markdown 文件
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
  }, [id]); // 依赖 id，当 id 变化时重新加载

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

  return (
    <div>
      {problem && <Title level={2}>{problem.title}</Title>}
      {problem && <Title level={3}>{problem.description}</Title>}
      <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}