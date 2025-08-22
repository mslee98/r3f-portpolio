# BentoGrid Component

재사용 가능한 벤토 그리드 레이아웃 컴포넌트입니다. About 섹션의 디자인을 기반으로 제작되었습니다.

## 특징

- ✨ **반응형 디자인**: 모바일과 데스크톱에서 자동 조정
- 🎨 **다양한 스타일**: 3가지 기본 색상 테마 제공
- 🔄 **애니메이션**: IntersectionObserver 기반 스크롤 애니메이션
- 🧩 **완전 커스터마이징**: 원하는 콘텐츠로 자유롭게 구성
- ⚡ **성능 최적화**: memo와 Intersection Observer로 최적화

## 기본 사용법

```jsx
import BentoGrid from '../components/BentoGrid';

function MyComponent() {
  return (
    <BentoGrid 
      title="내 그리드" 
      subtitle="설명 텍스트"
    />
  );
}
```

## 커스텀 그리드 아이템

```jsx
const customItems = [
  {
    id: 'item1',
    className: 'grid-special-color grid-1 cursor-pointer grid-item grid-slide-left',
    content: (
      <div>
        <h3>커스텀 콘텐츠</h3>
        <p>원하는 내용을 넣을 수 있습니다</p>
      </div>
    )
  },
  // ... 더 많은 아이템들
];

<BentoGrid 
  title="커스텀 그리드" 
  gridItems={customItems}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Bento Grid" | 그리드 제목 |
| `subtitle` | string | "Beautiful grid layout" | 그리드 부제목 |
| `gridItems` | array | [] | 커스텀 그리드 아이템 배열 |

## Grid Item 구조

```jsx
{
  id: 'unique-id',           // 고유 식별자
  ref: useRef(),             // React ref (자동 생성됨)
  className: 'grid-classes', // CSS 클래스
  content: <div>...</div>    // 렌더링할 JSX 콘텐츠
}
```

## CSS 클래스

### 그리드 위치 클래스
- `grid-1`: 1번 그리드 (md:col-span-4, 큰 영역)
- `grid-2`: 2번 그리드 (md:col-span-2, 중간 영역)
- `grid-3`: 3번 그리드 (md:col-span-2, 중간 영역)
- `grid-4`: 4번 그리드 (md:col-span-2, 중간 영역)
- `grid-5`: 5번 그리드 (md:col-span-4, 큰 영역)

### 색상 테마 클래스
- `grid-default-color`: 기본 파란색 그라데이션
- `grid-special-color`: 보라색 그라데이션
- `grid-black-color`: 검은색 그라데이션

### 애니메이션 클래스
- `grid-slide-left`: 왼쪽에서 슬라이드
- `grid-slide-right`: 오른쪽에서 슬라이드
- `grid-slide-up`: 위에서 슬라이드
- `grid-slide-down`: 아래에서 슬라이드
- `grid-scale-in`: 스케일 애니메이션

## 내장 컴포넌트

기본 그리드에는 다음 컴포넌트들이 포함됩니다:

- **GridExperience**: 3D 그리드 애니메이션
- **Globe**: 3D 지구본
- **Frameworks**: 기술 스택 오버빗 애니메이션

## 스타일 커스터마이징

CSS에서 새로운 색상 테마를 추가할 수 있습니다:

```css
.grid-custom-color {
  @apply p-6 bg-gradient-to-b from-[#your-color] to-[#your-color] rounded-2xl;
}
```

## 예제

완전한 예제는 `src/sections/Features.jsx` 파일을 참조하세요.