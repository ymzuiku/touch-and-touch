import dayjs from "dayjs";

export function getTitle(item: any) {
  return item.title || dayjs(item.updateAt).format("MM-DD HH:mm");
}
