export function getHref(href: string) {
  const list = href.split(window.location.host);
  return list[1] || "/";
}
