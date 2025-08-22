import { useState, useEffect } from 'react';
import ScrollCards from '../components/ScrollCards';

const ProjectsNew = ({ isActive, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      // 약간의 지연 후 표시 (페이지 전환 효과)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  const handleClose = () => {
    console.log('ProjectsNew: handleClose called');
    if (onClose) onClose();
  };

  // isActive가 false이고 isVisible도 false면 렌더링하지 않음
  if (!isActive && !isVisible) {
    return null;
  }

  return (
    <ScrollCards 
      isVisible={isVisible} 
      onClose={handleClose}
    />
  );
};

export default ProjectsNew;