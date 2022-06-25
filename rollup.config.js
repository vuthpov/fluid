import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import multi from "@rollup/plugin-multi-entry";
import svgr from "@svgr/rollup";
import url from "rollup-plugin-url";

const packageJson = require("./package.json");

export default {
  input: ["src/index.tsx", "src/**/index.tsx"],
  output: [
    {
      format: "cjs",
      sourcemap: true,
      file: packageJson.main,
      exports: "named",
    },
  ],

  plugins: [
    url(),
    svgr({ icon: true, ref: true }),
    multi(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      exclude: ["**/__tests__", "**/*.test.*]"],
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
  ],
};
