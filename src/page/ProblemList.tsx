import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, List, Tag, Pagination } from 'antd';
import problems from '../data/problems.json';

interface SceneItem {
  [key: string]: string | undefined;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  scene: SceneItem[];
  hot?: boolean;
  shortDescription?: string;
  solution?: string;
}

interface GroupedProblems {
  [title: string]: Problem[];
}

export default function ProblemList({ keyword, scene }: { keyword: string; scene: string[] }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // 每页显示 12 个卡片（即 12 个标题分组）

  // 根据关键字和场景筛选题目
  const filtered = useMemo(
    () =>
      problems.filter((p) => {
        const matchWord =
          keyword === '' ||
          p.title.includes(keyword) ||
          p.description.includes(keyword) ||
          p.scene.some((s) => Object.values(s).some((v) => v?.includes(keyword)));

        const matchScene =
          scene.length === 0 ||
          p.scene.some((s) => Object.keys(s).some((v) => v && scene.includes(v)));

        return matchWord && matchScene;
      }),
    [keyword, scene]
  );

  // 按标题分组
  const grouped = useMemo(() => {
    return filtered.reduce((acc: GroupedProblems, p: Problem) => {
      if (!acc[p.title]) acc[p.title] = [];
      acc[p.title].push(p);
      return acc;
    }, {});
  }, [filtered]);

  // 获取分组后的键值对数组
  const groupedEntries = Object.entries(grouped);
  const totalCards = groupedEntries.length; // 分组数即卡片数

  // 计算当前页要显示的分组
  const paginatedEntries = groupedEntries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Row gutter={[16, 16]}>
        {paginatedEntries.map(([title, list]) => (
          <Col key={title} xs={24} sm={24} md={8} lg={8}>
            <Card
              hoverable
              title={title}
              onClick={() => navigate(`/problem/${list[0].id}`)}
            >
              <List
                itemLayout="vertical"
                dataSource={list}
                renderItem={(item: Problem) => (
                  <List.Item className="cursor-pointer">
                    <List.Item.Meta description={item.description} />
                    {item.scene.map((value) => {
                      const tagText = Object.values(value)[0];
                      return tagText ? <Tag key={tagText}>{tagText}</Tag> : null;
                    })}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <br />
      {totalCards > 0 && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalCards}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          style={{ textAlign: 'center' }}
        />
      )}
    </>
  );
}