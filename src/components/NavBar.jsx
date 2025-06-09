import { navItems } from "../constants";

const NavBar = () => {
  return (
    <div className="w-full flex-center fixed z-50 top-0 left-0 md:p-0 px-5">
      <div className="mx-5 md:my-10 my-5 flex items-center justify-between">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="md:size-12 object-center ml-2"
        />
        <div className="md:flex items-center gap-7 hidden">
            {navItems.map((item, index) => (
                <div key={index} className="group relative">
                <a
                    className="gradient-title text-lg inline-block pb-1"
                    href={item.href}
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
};

export default NavBar;