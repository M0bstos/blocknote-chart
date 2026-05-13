import type {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  PartialBlock,
  StyleSchema,
} from "@blocknote/core";
import { insertOrUpdateBlockForSlashMenu } from "@blocknote/core/extensions";
import type { DefaultSuggestionItem } from "@blocknote/core/extensions";
import { defaultChartData } from "./data";

export const insertChart = <
  BSchema extends BlockSchema,
  ISchema extends InlineContentSchema,
  SSchema extends StyleSchema,
>(
  editor: BlockNoteEditor<BSchema, ISchema, SSchema>
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
      } as PartialBlock<BSchema, ISchema, SSchema>);
    },
  };
};
