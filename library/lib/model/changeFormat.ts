import { loadScriptList } from "../utils/loadAssets";
import waitValue from "wait-value";

loadScriptList(
  "https://unpkg.com/prettier@2.2.1/standalone.js",
  "https://unpkg.com/prettier@2.2.1/standalone.js",
  "https://unpkg.com/prettier@2.2.1/parser-babel.js"
  // "https://unpkg.com/prettier@2.2.1/parser-markdown.js",
  // "https://unpkg.com/prettier@2.2.1/parser-html.js",
  // "https://unpkg.com/prettier@2.2.1/parser-postcss.js"
);

export const changeFormat = async (code: string) => {
  const prettier = await waitValue(() => (window as any).prettier);
  const prettierPlugins = (window as any).prettierPlugins;
  const out = prettier.format(code, {
    parser: "json",
    plugins: prettierPlugins,
    printWidth: 120,
    tabWidth: 2,
    singleQute: false,
    trailingComma: "all",
    jsxBracketSameLine: true,
    singleQuote: true,
    semi: true,
  });

  return out;
};
