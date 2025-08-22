import './App.css';
import { useState } from 'react';
import NavBar from './components/NavBar';
import ModalPageSystem from './components/ModalPageSystem';
import PerformanceMonitor from './components/PerformanceMonitor';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (newPage) => {

    setCurrentPage(newPage);
  };

  return (
    <div className="bg-black relative overflow-hidden">
      <PerformanceMonitor />
      
      {/* 기존 도르레 네비게이션 */}
      <NavBar 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
      
      {/* 모달 페이지 시스템 */}
      <ModalPageSystem 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;