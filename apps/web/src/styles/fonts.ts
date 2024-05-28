import {
  Press_Start_2P,
  Inter,
  Lora,
  Source_Sans_3,
  Amatic_SC,
  Fjalla_One,
  Montserrat,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const amaticSc = Amatic_SC({
  weight: ["400", "700"],
  variable: "--font-amatic-sc",
  subsets: ["latin"],
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

// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({ weight: "400", subsets: ["latin"] });
const sourceCodePro700 = Source_Sans_3({ weight: "700", preload: false });

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export {
  inter,
  lora,
  sourceCodePro400,
  sourceCodePro700,
  amaticSc,
  fjallaOne,
  monteserrat,
};
