import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';// 导入首页组件
import ProblemDetail from './page/ProblemDetail';
// 以后可以导入其他页面，比如 Problem
// import Problem from './pages/Problem';

function App() {
  return (
    <HashRouter>  {/* 使用 HashRouter 避免 GitHub Pages 刷新 404 */}
      <Routes>
        <Route path="/" element={<Home />} />          {/* 首页 */}
        <Route path="/problem/:id" element={<ProblemDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;