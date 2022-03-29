import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import multi from '@rollup/plugin-multi-entry';

const packageJson = require("./package.json");

export default {
  input: ["src/index.tsx", "src/**/index.tsx"],
  output: [
    {
      format: "cjs",
      sourcemap: true,
      file: packageJson.main,
    },
    // {
    //   format: "cjs",
    //   sourcemap: true,
    //   dir: "build",
    //   exports: "auto"
    // }
  ],
 
  plugins: [
    multi(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true,  exclude: ["**/__tests__", "**/*.test.tsx"] }),
  ]
};