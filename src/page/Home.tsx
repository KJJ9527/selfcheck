import { useState } from 'react';
import { Row, Col, Input, Select, Alert } from 'antd';
import { SceneOptions } from '../constants/filters';
import ProblemList from './ProblemList';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [scene, setScene] = useState<string[]>([]);

  // 生成唯一 key，当 keyword 或 scene 变化时，key 变化，强制重置 ProblemList 内部状态（包括 currentPage）
  const filterKey = `${keyword}-${scene.join(',')}`;

  return (
    <div>
      <Alert title="如果觉得这个文档不错，欢迎点个赞！" showIcon closable />
      <br />
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <h2>支付异常知识库</h2>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Input.Search
            placeholder="筛选知识中心内容"
            allowClear
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
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
      <br />
      {/* 使用 key 强制重置内部状态 */}
      <ProblemList key={filterKey} keyword={keyword} scene={scene} />
    </div>
  );
}