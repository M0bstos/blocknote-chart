import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import { createChartBlock, insertChart } from "@m0bstos/blocknote-chart";
import "@m0bstos/blocknote-chart/style.css";
import "./App.css";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    chart: createChartBlock(),
  },
});

export default function App() {
  const editor = useCreateBlockNote({ schema });

  return (
    <div className="demo-wrapper">
      <h1 className="demo-title">blocknote-chart demo</h1>
      <p className="demo-hint">Type <kbd>/</kbd> and select <strong>Chart</strong> to insert a chart block.</p>
      <div className="demo-editor">
        <BlockNoteView editor={editor} theme="light" slashMenu={false}>
          <SuggestionMenuController
            triggerCharacter="/"
            getItems={async (query) => [
              ...getDefaultReactSlashMenuItems(editor),
              insertChart(editor),
            ].filter((item) =>
              item.title.toLowerCase().includes(query.toLowerCase())
            )}
          />
        </BlockNoteView>
      </div>
    </div>
  );
}
