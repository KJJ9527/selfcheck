import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Input, Select, Card, List, Divider, Alert } from 'antd';
import problems from '../data/problems.json';
import { SceneOptions } from '../constants/filters';

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

export default function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [scene, setScene] = useState<string[]>([]);

  // 根据关键字筛选题目
  const filtered = useMemo(
    () =>
      problems.filter((p) => {
        const matchWord =
          keyword === '' ||
          p.title.includes(keyword) ||
          p.description.includes(keyword) || p.scene.some((s) => Object.values(s).some((v) => v?.includes(keyword)));

        // scene 为空表示不过滤，非空则要求题目某个场景值在选中列表里
        const matchScene =
          scene.length === 0 ||
          p.scene.some((s) =>
            Object.keys(s).some((v) => v && scene.includes(v))
          )

        return matchWord && matchScene
      }),
    [keyword, scene]
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
      <Alert
        title="如果觉得这个文档不错，欢迎点个赞！"
        showIcon
        closable
      />
      <br />
      <Row gutter={16}>
        <Col xs={24}
          sm={24}
          md={12}
          lg={12}><h2>支付异常知识库</h2></Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col xs={24}
          sm={24}
          md={8}
          lg={8}>
          <Input.Search
            placeholder="筛选知识中心内容"
            allowClear
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col xs={24}
          sm={24}
          md={8}
          lg={8}>
          <Select
            mode="multiple"
            allowClear
            placeholder="选择要筛选的标签"
            style={{ width: '100%' }}
            options={SceneOptions}
            value={scene}
            onChange={setScene}
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
            md={8}
            lg={8}
          >
            <Card hoverable title={title} onClick={() => navigate(`/problem/${list[0].id}`)}>
              <List
                itemLayout="vertical"
                dataSource={list}
                renderItem={(item: Problem) => (
                  <List.Item
                    className="cursor-pointer"
                  >
                    <List.Item.Meta
                      description={item.description}
                    />
                    {/* <Tag color="red">{item.scene}</Tag> */}
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