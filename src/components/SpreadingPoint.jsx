export const SpredingPoint = () => {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <div
        className="absolute w-14 h-14 border border-white rounded-full animate-pingOuter"
      ></div>
      <div
        className="absolute w-10 h-10 border border-white rounded-full animate-pingInner"
      ></div>
      <div className="w-2.5 h-2.5 bg-white rounded-full z-10"></div>
    </div>
  );
};