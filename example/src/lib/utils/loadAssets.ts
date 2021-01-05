const cache = {} as any;

const iconfonts = document.createElement("style");
iconfonts.id = "iconfonts";
iconfonts.textContent = `
.icon {
width: 100%; height: 100%;
vertical-align: -0.15em;
fill: currentColor;
overflow: hidden;
}
  `;
document.head.append(iconfonts);

const waitingCached = (src: string) => {
  return new Promise((res) => {
    const relaod = () => {
      setTimeout(() => {
        if (cache[src] === 2) {
          res(void 0);
        } else {
          relaod();
        }
      }, 50);
    };
    relaod();
  });
};

export function loadScript(href: string) {
  if (cache[href] === 1) {
    return waitingCached(href);
  }
  cache[href] = 1;
  return new Promise((res) => {
    const el = document.createElement("script");
    // el.setAttribute("src", href);
    el.src = href;
    // el.setAttribute("type", "text/javascript");
    el.onload = () => {
      res(void 0);
      cache[href] = 2;
    };
    document.head.append(el);
  });
}

export function loadScriptList(...srcs: string[]) {
  return Promise.all(srcs.map((src) => loadScript(src)));
}

export function loadCss(href: string) {
  if (cache[href] === 1) {
    return waitingCached(href);
  }
  cache[href] = 1;

  return new Promise((res) => {
    const el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = href;
    // el.setAttribute("href", href);
    el.onload = () => {
      res(void 0);
      cache[href] = 2;
    };
    document.head.append(el);
  });
}

export function loadCssList(...hrefs: string[]) {
  return Promise.all(hrefs.map((href) => loadCss(href)));
}

export function loadHTMLIcon(href: string) {
  if (cache[href] === 1) {
    return waitingCached(href);
  }
  cache[href] = 1;
  return new Promise((res) => {
    const el = document.createElement("link");
    el.setAttribute("rel", "icon");
    el.setAttribute("href", href);
    el.onload = () => {
      res(void 0);
      cache[href] = 2;
    };
    document.head.append(el);
  });
}

export function loadAssets(...string: string[]) {
  const js = string.filter((s) => /.js/.test(s));
  const css = string.filter((s) => /.css/.test(s));
  return Promise.all([
    ...css.map((s) => loadCss(s)),
    ...js.map((s) => loadScript(s)),
  ]);
}

