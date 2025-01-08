import {
  Inter,
  Source_Sans_3,
  Fjalla_One,
  Montserrat,
  Bilbo_Swash_Caps,
  Roboto,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fjallaOne = Fjalla_One({
  weight: "400",
  variable: "--font-fjalla-one",
  subsets: ["latin"],
});

const monteserrat = Montserrat({
  variable: "--font-monteserrat",
  subsets: ["latin"],
});

const bibloSwashCaps = Bilbo_Swash_Caps({
  weight: "400",
  variable: "--font-biblo",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({ weight: "400", subsets: ["latin"] });
const sourceCodePro700 = Source_Sans_3({ weight: "700", preload: false });

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export {
  inter,
  sourceCodePro400,
  sourceCodePro700,
  fjallaOne,
  monteserrat,
  bibloSwashCaps,
  roboto, // Add roboto to exports
};
