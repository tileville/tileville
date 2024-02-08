import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import ConnectButton from './ConnectButton';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { GITHUB_URL } from '../../constants';

export const NavBar = () => {
  return (
    <nav className="pt-2 mb-6">
      <div className="flex items-center justify-center w-full">
        <div className="flex space-x-8">
          <Button variant="outline" size="4" color="jade" highContrast>
            <a
              href={GITHUB_URL}
              target="_blank"
              className="flex items-center gap-2"
            >
              Github
              <GitHubLogoIcon />
            </a>
          </Button>
          <NavLink to="/" label="New Game" />
          <NavLink to="/about" label="About" />
          <NavLink to="/leaderboard" label="Leaderboard" />
          <NavLink to="/settings" label="Settings" />
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Button variant="outline" size="4" radius="none">
      <Link to={to} className="">
        {label}
      </Link>
    </Button>
  );
};

export const AnchorNavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Button variant="outline" size="4" radius="none">
      <a href={to} target="_blank">
        {label}
      </a>
    </Button>
  );
};
