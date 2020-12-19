export function eventVal(event: any) {
  if (typeof event === "object" && event.target) {
    const target = event.target;
    const type = target.getAttribute("type");
    if (type === "checkbox" || type === "radio") {
      return target.checked;
    }
    return event.target.value;
  }
  return event || "";
}
