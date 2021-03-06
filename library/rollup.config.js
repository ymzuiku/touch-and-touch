#!/usr/bin/env node

const rollup = require("rollup");
const rollupTypescript = require("rollup-plugin-typescript2");
const { uglify } = require("rollup-plugin-uglify");
const { resolve } = require("path");
const pwd = (...args) => resolve(process.cwd(), ...args);
const fs = require("fs-extra");
const argv = process.argv.splice(2);

function clearDir(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      fs.remove(`$\{dir}/file`);
    });
  }
}
function haveArgv(...args) {
  let isHave = false;
  args.forEach((str) => {
    argv.forEach((v) => {
      if (v === str) {
        isHave = true;
      }
    });
  });

  return isHave;
}

clearDir(pwd("umd"));
fs.copySync(pwd("../example/src/lib"), pwd("lib"));

const watchOptions = [
  {
    external: [
      "mico-db",
      "wait-value",
      "dayjs",
      "vanilla-svg",
      "vanilla-pop",
      "aoife",
      "template-css",
      "template-fn",
      "mockjs",
      "vanilla-message",
      "localfile",
    ],
    input: "./lib/index.ts",
    output: {
      file: "./es/index.js",
      format: "es",
      name: "touchAndTouch",
      sourcemap: true,
    },
    plugins: [
      rollupTypescript({
        extensions: ["js", "ts", "tsx"],
        useTsconfigDeclarationDir: false,
      }),
      // uglify({
      //   sourcemap: true,
      // }),
    ],
  },
];
const watcher = rollup.watch(watchOptions);

// event.code can be one of:
//   START        — the watcher is (re)starting
//   BUNDLE_START — building an individual bundle
//   BUNDLE_END   — finished building a bundle
//   END          — finished building all bundles
//   ERROR        — encountered an error while bundling
//   FATAL        — encountered an unrecoverable error
watcher.on("event", (event) => {
  if (event.code === "ERROR") {
    console.log(event);
  } else if (event.code === "BUNDLE_END") {
    // console.log(event);
    console.log("BUNDLE_END");
  } else if (event.code === "END") {
    if (!haveArgv("--watch", "-w")) {
      watcher.close();
    }

    // 测试拷贝
    fs.copySync(
      "./es",
      "/Users/pillar/Documents/work/hpv/hpv-client/node_modules/touch-and-touch/es"
    );
  }
});
