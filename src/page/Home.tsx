import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Input, Select, Card, List, Tag, Divider } from 'antd';
import problems from '../data/problems.json';

interface Problem {
  id: string;
  title: string;
  category: string;
  description: string;
  hot?: boolean;
  scene: string[];
  tags: string[];
}
interface GroupedProblems {
  [title: string]: Problem[];
}

export default function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [order, setOrder] = useState<'new' | 'hot'>('new');

  // 所有标签选项
  const tagOptions = useMemo(
    () =>
      Array.from(new Set(problems.map((p) => p.title))).map((c) => ({
        label: c,
        value: c,
      })),
    []
  );

  // 根据关键字和标签筛选题目
  const filtered = useMemo(
    () =>
      problems.filter((p) => {
        const matchWord =
          keyword === '' ||
          p.title.includes(keyword) ||
          p.description.includes(keyword);
        const matchTag = tags.length === 0 || tags.includes(p.title);
        return matchWord && matchTag;
      }),
    [keyword, tags]
  );

  // 分组
  const grouped = useMemo(
    () =>
      filtered.reduce((acc: GroupedProblems, p: Problem) => {
        if (!acc[p.title]) acc[p.title] = [];
        acc[p.title].push(p);
        return acc;
      }, {}),
    [filtered]
  );

  return (
    <div>
      {/* 搜索/筛选行 */}
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={8}>
          <Input.Search
            placeholder="筛选知识中心内容"
            allowClear
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={24} md={10}>
          <Select
            mode="multiple"
            allowClear
            placeholder="选择要筛选的标签"
            style={{ width: '100%' }}
            options={tagOptions}
            value={tags}
            onChange={setTags}
          />
        </Col>
        <Col xs={0} md={6}>
          <Select
            style={{ width: '100%' }}
            value={order}
            onChange={(v) => setOrder(v as any)}
            options={[
              { label: '最新', value: 'new' },
              { label: '最热', value: 'hot' },
            ]}
          />
        </Col>
      </Row>

      <Divider />

      {/* 卡片布局 */}
      <Row gutter={[16, 16]}>
        {Object.entries(grouped).map(([title, list]) => (
          <Col
            key={title}
            xs={24}
            sm={24}
            md={12}
            lg={12}           /* 大屏、中屏每行两个 */
          >
            <Card hoverable title={title}>
              <List
                itemLayout="vertical"
                dataSource={list}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => navigate(`/problem/${item.id}`)}
                    className="cursor-pointer"
                  >
                    <List.Item.Meta
                      description={item.description}
                    />
                    {item.hot && <Tag color="red">{item.scene}</Tag>}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}