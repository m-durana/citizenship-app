import type { Path } from "../../types/path";
import { irelandDescent } from "./ireland";
import { lithuaniaDescent } from "./lithuania";
import { slovakiaDescent } from "./slovakia";
import { czechiaDescent } from "./czechia";
import { croatiaDescent } from "./croatia";
import { romaniaDescent } from "./romania";
import { latviaDescent } from "./latvia";
import { bulgariaDescent } from "./bulgaria";
import { italyDescent } from "./italy";
import { polandDescent } from "./poland";
import { germanyDescent, germanyArticle116 } from "./germany";
import { hungaryDescent } from "./hungary";
import { greeceDescent } from "./greece";
import { spainDescent, spainExileDescendant } from "./spain";
import { portugalDescent, portugalSephardicClosed } from "./portugal";
import { israelLawOfReturn } from "./israel";
import { armeniaDescent } from "./armenia";
import { mexicoDescent, argentinaDescent, brazilDescent } from "./latam";
import { ukAncestryVisa } from "./uk";
import {
  spainMarriage,
  italyMarriage,
  portugalMarriage,
  irelandMarriage,
  germanyMarriage,
} from "./marriage";

export const allPaths: Path[] = [
  irelandDescent,
  lithuaniaDescent,
  slovakiaDescent,
  czechiaDescent,
  croatiaDescent,
  romaniaDescent,
  latviaDescent,
  bulgariaDescent,
  italyDescent,
  polandDescent,
  germanyDescent,
  germanyArticle116,
  hungaryDescent,
  greeceDescent,
  spainDescent,
  spainExileDescendant,
  portugalDescent,
  portugalSephardicClosed,
  israelLawOfReturn,
  armeniaDescent,
  mexicoDescent,
  argentinaDescent,
  brazilDescent,
  ukAncestryVisa,
  spainMarriage,
  italyMarriage,
  portugalMarriage,
  irelandMarriage,
  germanyMarriage,
];
