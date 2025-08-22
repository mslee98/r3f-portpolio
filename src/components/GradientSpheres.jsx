import { memo } from "react";

const GradientSpheres = memo(({ sphere1Class, sphere2Class }) => {
  return (
    <>
      <div className={sphere1Class}></div>
      <div className={sphere2Class}></div>
    </>
  );
});

GradientSpheres.displayName = 'GradientSpheres';

export default GradientSpheres;