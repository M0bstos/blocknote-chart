import type { BlockNoteEditor } from "@blocknote/core";
import { insertOrUpdateBlockForSlashMenu } from "@blocknote/core/extensions";
import type { DefaultSuggestionItem } from "@blocknote/core/extensions";
import { defaultChartData } from "./data";

export const insertChart = (
  editor: BlockNoteEditor<any, any, any>
): Omit<DefaultSuggestionItem, "key"> & { key: string } => {
  return {
    key: "chart",
    title: "Chart",
    group: "Media",
    aliases: ["chart", "graph", "plot", "bar", "line", "pie"],
    onItemClick: () => {
      insertOrUpdateBlockForSlashMenu(editor, {
        type: "chart",
        props: {
          chartType: "bar",
          chartData: JSON.stringify(defaultChartData),
        },
      });
    },
  };
};
