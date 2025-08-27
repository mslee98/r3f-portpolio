import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HexagonGrid = () => {
  const canvasRef = useRef(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 마우스 이벤트 리스너
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // 마우스 위치에 따른 카테고리 감지
      let newHoveredCategory = null;
      categories.forEach((category, catIndex) => {
        const pos = getCategoryPosition(catIndex, canvas.width, canvas.height);
        const distance = Math.sqrt(
          Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2)
        );
        if (distance < 150) {
          newHoveredCategory = category.name;
        }
      });
      
      setHoveredCategory(newHoveredCategory);
    };

    const handleMouseLeave = () => {
      setHoveredCategory(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // 카테고리 데이터
    const categories = [
      { 
        name: '프론트엔드', 
        color: '#0080ff', 
        techs: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'Three.js', 'Vue.js']
      },
      { 
        name: '백엔드', 
        color: '#00ff80', 
        techs: ['Spring', 'Spring Boot', 'Node.js', 'Express', 'REST API', 'GraphQL']
      },
      { 
        name: '데이터베이스', 
        color: '#0080ff', 
        techs: ['PostgreSQL', 'SQLite', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch']
      },
      { 
        name: '데브옵스', 
        color: '#ff8000', 
        techs: ['Docker', 'Jenkins', 'GitHub Actions', 'AWS', 'Kubernetes', 'Terraform']
      },
      { 
        name: '협업툴', 
        color: '#808080', 
        techs: ['GitHub', 'Git', 'Notion', 'Slack', 'Jira', 'Confluence']
      },
      { 
        name: '언어', 
        color: '#00ffff', 
        techs: ['TypeScript', 'JavaScript', 'Java', 'Python', 'HTML/CSS', 'C++']
      }
    ];

    // 카테고리 위치 계산 함수
    function getCategoryPosition(index, width, height) {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;
      
      const angles = [
        -Math.PI * 2/3,  // 11시 - 프론트엔드
        -Math.PI * 1/3,  // 1시 - 백엔드
        0,                // 3시 - 데이터베이스
        Math.PI * 1/3,   // 5시 - 데브옵스
        Math.PI * 2/3,   // 7시 - 협업툴
        Math.PI           // 9시 - 언어
      ];
      
      return {
        x: centerX + Math.cos(angles[index]) * radius,
        y: centerY + Math.sin(angles[index]) * radius
      };
    }

    // 육각형 그리기 함수
    function drawHexagon(x, y, size, color, fill = true, stroke = true) {
      ctx.save();
      ctx.translate(x, y);
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hexX = Math.cos(angle) * size;
        const hexY = Math.sin(angle) * size;
        if (i === 0) {
          ctx.moveTo(hexX, hexY);
        } else {
          ctx.lineTo(hexX, hexY);
        }
      }
      ctx.closePath();
      
      if (fill) {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        gradient.addColorStop(0, `${color}ff`);
        gradient.addColorStop(0.7, `${color}80`);
        gradient.addColorStop(1, `${color}20`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      if (stroke) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      ctx.restore();
    }

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 배경 그라데이션
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      bgGradient.addColorStop(0, 'rgba(20, 22, 34, 0.8)');
      bgGradient.addColorStop(1, 'rgba(10, 10, 10, 0.9)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 각 카테고리 그리기
      categories.forEach((category, catIndex) => {
        const pos = getCategoryPosition(catIndex, canvas.width, canvas.height);
        const isHovered = hoveredCategory === category.name;
        
        // 큰 육각형 테두리
        if (isHovered) {
          drawHexagon(pos.x, pos.y, 140, category.color, false, true);
        }
        
        // 기술 육각형들
        category.techs.forEach((tech, techIndex) => {
          const hexSize = 25;
          const hexRadius = 80;
          
          // 육각형 모양으로 배치
          let techX, techY;
          if (techIndex === 0) {
            techX = pos.x;
            techY = pos.y - hexRadius;
          } else if (techIndex === 1) {
            techX = pos.x + hexRadius * Math.cos(Math.PI / 6);
            techY = pos.y - hexRadius * Math.sin(Math.PI / 6);
          } else if (techIndex === 2) {
            techX = pos.x + hexRadius * Math.cos(Math.PI / 6);
            techY = pos.y + hexRadius * Math.sin(Math.PI / 6);
          } else if (techIndex === 3) {
            techX = pos.x;
            techY = pos.y + hexRadius;
          } else if (techIndex === 4) {
            techX = pos.x - hexRadius * Math.cos(Math.PI / 6);
            techY = pos.y + hexRadius * Math.sin(Math.PI / 6);
          } else if (techIndex === 5) {
            techX = pos.x - hexRadius * Math.cos(Math.PI / 6);
            techY = pos.y - hexRadius * Math.sin(Math.PI / 6);
          }
          
          // 육각형 그리기
          drawHexagon(techX, techY, hexSize, category.color, true, true);
          
          // 기술 이름 그리기
          ctx.save();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.font = 'bold 10px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.shadowBlur = 3;
          ctx.fillText(tech, techX, techY);
          ctx.restore();
        });
      });
      
      // 중앙 가이드 텍스트
      ctx.save();
      const gradient = ctx.createLinearGradient(
        canvas.width / 2 - 150, canvas.height / 2,
        canvas.width / 2 + 150, canvas.height / 2
      );
      gradient.addColorStop(0, '#00ffff');
      gradient.addColorStop(0.5, '#0080ff');
      gradient.addColorStop(1, '#00ffff');
      
      ctx.fillStyle = gradient;
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 15;
      ctx.fillText('✨ 기술 스택에 마우스를 올려보세요 ✨', canvas.width / 2, canvas.height / 2);
      ctx.restore();
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoveredCategory]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default HexagonGrid; 