import { OrbitingCircles } from "./OrbitingCircles";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Frameworks() {
  const containerRef = useRef();
  const isInView = useInView(containerRef, { once: false, threshold: 0.1 });

  const skills = [
    "antd",
    "aws",
    "figma",
    "git",
    "github",
    "javascript",
    "nestjs",
    "nextjs2",
    "postgresql",
    "react",
    "reactquery",
    "redux",
    "spring",
    "typescript",
    "vitejs",
    "vuejs",
    "tailwindcss"
  ];

  return (
    <div ref={containerRef} className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      {isInView && (
        <>
          <OrbitingCircles iconSize={40}>
            {skills.map((skill, index) => (
              <Icon key={index} src={`/assets/images/logos/${skill}.svg`} />
            ))}
          </OrbitingCircles>
          <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
            {skills.reverse().map((skill, index) => (
              <Icon key={index} src={`/assets/images/logos/${skill}.svg`} />
            ))}
          </OrbitingCircles>
        </>
      )}
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);