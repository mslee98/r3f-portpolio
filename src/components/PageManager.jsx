import PageTransition from './PageTransition';
import Hero from '../sections/Hero';
import About2 from '../sections/About2';
// import Projects from '../sections/Projects'; // 주석처리
import Contact from '../sections/Contact';

const PageManager = ({ currentPage }) => {
  // 페이지별 컴포넌트 매핑
  const pageComponents = {
    home: Hero,
    about: About2,
    // projects: Projects, // 주석처리
    contact: Contact
  };

  // 페이지별 슬라이드 방향 설정
  const getSlideDirection = (pageName) => {
    const directions = {
      'home': 'down',    // 위에서 아래로
      'about': 'right',  // 왼쪽에서 오른쪽으로
      // 'projects': 'up',  // 아래에서 위로 - 주석처리
      'contact': 'left'  // 오른쪽에서 왼쪽으로
    };
    return directions[pageName] || 'right';
  };

  const CurrentPageComponent = pageComponents[currentPage];
  const slideDirection = getSlideDirection(currentPage);

  return (
    <div className="w-full h-screen overflow-hidden">
      <PageTransition
        direction={slideDirection}
        isActive={true}
        pageName={currentPage}
      >
        <CurrentPageComponent />
      </PageTransition>
    </div>
  );
};

export default PageManager;