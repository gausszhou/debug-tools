import { EnumTools } from "./types";

interface ITool {
  label: string; // 显示的名称
  icon: string; // 图标的 URL 或路径
  value: EnumTools;
}

export const tools: ITool[] = [
  {
    label: "TEXT 对比",
    icon: "",
    value: EnumTools.TEXT_DIFF,
  },
  {
    label: "TEXT 大小",
    icon: "",
    value: EnumTools.TEXT_SIZE,
  },
  {
    label: "URL 解析",
    icon: "",
    value: EnumTools.URL_PARSE,
  },
];
