export const SpredingPoint = ({ delay = '0s' }) => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div
        className="absolute w-10 h-10 border border-white rounded-full animate-pingOuter"
        style={{ animationDelay: delay }}
      ></div>
      <div
        className="absolute w-6 h-6 border border-white rounded-full animate-pingInner"
        style={{ animationDelay: delay }}
      ></div>
      <div className="w-2.5 h-2.5 bg-white rounded-full z-10"></div>
    </div>
  );
};