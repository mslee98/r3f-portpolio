import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = ({ isVisible = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
      updateMousePosition(e);
      
      // 간단한 호버 감지
      const target = e.target;
      if (target && target.tagName) {
        const tagName = target.tagName.toLowerCase();
        const isClickable = ['button', 'a', 'input', 'select', 'textarea'].includes(tagName);
        setIsHovering(isClickable);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousemove', handleMouseMove);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: mousePosition.x - 40,
        y: mousePosition.y - 40,
      }}
      animate={{
        scale: isHovering ? 1.2 : 1,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    >
      <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <span className="text-white text-xs font-bold tracking-wider">
          {isHovering ? 'CLICK' : 'DRAG'}
        </span>
      </div>
      
      {isHovering && (
        <motion.div
          className="absolute inset-0 border-2 border-white/50 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
};

export default CustomCursor;
