import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';// 导入首页组件
import ProblemDetail from './page/ProblemDetail';
import { FilterProvider } from './contexts/FilterContext';

function App() {
  return (
    <HashRouter>  {/* 使用 HashRouter 避免 GitHub Pages 刷新 404 */}
      <FilterProvider>
        <Routes>
          <Route path="/" element={<Home />} />          {/* 首页 */}
          <Route path="/problem/:id" element={<ProblemDetail />} />
        </Routes>
      </FilterProvider >
    </HashRouter>

  );
}

export default App;