import './App.css';
import { useState } from 'react';
import NavBar from './components/NavBar';
import ModalPageSystem from './components/ModalPageSystem';
// import PerformanceMonitor from './components/PerformanceMonitor';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 로딩 완료 핸들러
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-black relative overflow-hidden">
      {/* <PerformanceMonitor /> */}
      
      {/* 기존 도르레 네비게이션 - 로딩 중에는 숨김 */}
      <NavBar 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
      
      {/* 모달 페이지 시스템 */}
      <ModalPageSystem 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLoadingComplete={handleLoadingComplete}
      />
    </div>
  );
}

export default App;