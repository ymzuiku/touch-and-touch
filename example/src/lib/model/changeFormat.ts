import { loadScriptList } from "../utils/loadAssets";
import waitValue from "wait-value";
import Message from "vanilla-message";

loadScriptList(
  "https://unpkg.com/prettier@2.2.1/standalone.js",
  "https://unpkg.com/prettier@2.2.1/standalone.js",
  "https://unpkg.com/prettier@2.2.1/parser-babel.js"
);

export const changeFormat = async (code: string = ""): Promise<any> => {
  const prettier = await waitValue(() => (window as any).prettier, 1000 * 20);
  if (!prettier) {
    Message.error("Unload prettier, check the network, please.", {
      style: { zIndex: 16000 },
    });
    return false;
  }
  const prettierPlugins = (window as any).prettierPlugins;
  try {
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
    }) as string;
    return out;
  } catch (err) {
    Message.error(err.toString(), { style: { zIndex: 16000 } });
  }
};
