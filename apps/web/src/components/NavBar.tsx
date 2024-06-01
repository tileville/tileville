"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import ConnectButton from "./ConnectButton";
import {
  GitHubLogoIcon,
  VideoIcon,
  BookmarkIcon,
  PersonIcon,
  ListBulletIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { GITHUB_URL, GAME_TUTORIAL_VIDEO_URL } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import "./../app/globals.css";
// import "./../app/font.css";

export const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const logoClickHandler = () => {
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="mb-6 px-4 pt-2">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex w-full items-center justify-between">
          <div>
            <button className="text-5xl font-black" onClick={logoClickHandler}>
              TileVille
            </button>
            {/* <button className="text-5xl font-black" onClick={() => window.location.reload()}>TileVille</button> */}
          </div>
          <div className="flex space-x-6">
            <Button
              variant="outline"
              size="3"
              color="jade"
              highContrast
              radius="none"
              onClick={logoClickHandler}
            >
              Home
              <HomeIcon />
            </Button>
            <Button
              variant="outline"
              size="3"
              color="jade"
              highContrast
              radius="none"
            >
              <a
                href={GITHUB_URL}
                target="_blank"
                className="flex items-center gap-2"
              >
                Github
                <GitHubLogoIcon />
              </a>
            </Button>{" "}
            <Button
              variant="outline"
              size="3"
              color="jade"
              highContrast
              radius="none"
            >
              <a
                href={GAME_TUTORIAL_VIDEO_URL}
                target="_blank"
                className="flex items-center gap-2"
              >
                Tutorial Video
                <VideoIcon />
              </a>
            </Button>
            <Link href="/about">
              <Button
                variant="outline"
                size="3"
                color="jade"
                highContrast
                radius="none"
              >
                About
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant="outline"
                size="3"
                color="jade"
                highContrast
                radius="none"
              >
                Profile
                <PersonIcon />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button
                variant="outline"
                size="3"
                color="jade"
                highContrast
                radius="none"
              >
                Leaderboard
                <ListBulletIcon />
              </Button>
            </Link>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

// const NavLink = ({ to, label }: { to: string; label: string }) => {
//   return (
//     <Button variant="outline" size="3" radius="none">
//       <Link href={to} className="">
//         {label}
//       </Link>
//     </Button>
//   );
// };

export const AnchorNavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Button variant="outline" size="4" radius="none">
      <a href={to} target="_blank">
        {label}
      </a>
    </Button>
  );
};
