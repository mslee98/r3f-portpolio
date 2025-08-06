import { memo, useCallback } from "react";
import { navItems } from "../constants";

const NavBar = memo(() => {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const id = href.replace('#', '');
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="w-full flex-center fixed z-50 top-0 left-0 md:p-0 px-5">
      <div className="mx-5 md:my-10 my-5 flex items-center justify-between">
        <span>Mslee PortFolio</span>
        <div className="md:flex items-center gap-7 hidden">
            {navItems.map((item, index) => (
                <div key={index} className="group relative">
                <a
                    className="gradient-title text-lg inline-block pb-1"
                    href={item.href}
                    onClick={handleClick}
                >
                    {item.name}
                </a>
                <span
                    className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-200
                    transform scale-x-0 group-hover:scale-x-100 origin-left
                    transition-transform duration-300 ease-in-out"
                />
                </div>
            ))}
            </div>
      </div>
    </div>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;