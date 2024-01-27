import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="p-4">
      <div className="flex items-center justify-center w-full">
        <div className="flex space-x-8">
          <AnchorNavLink to="/" label="New Game" />
          <NavLink to="/about" label="About" />
          <NavLink to="/leaderboard" label="Leaderboard" />
          <NavLink to="/settings" label="Settings" />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link
      to={to}
      className="text-[#303030] hover:text-black transition duration-300 text-2xl font-semibold active:text-white leading-8 px-4 py-2 border border-black"
    >
      {label}
    </Link>
  );
};

const AnchorNavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <a
      href={to}
      className="text-[#303030] hover:text-black transition duration-300 text-2xl font-semibold active:text-white leading-8 px-4 py-2 border border-black"
    >
      {label}
    </a>
  );
};
