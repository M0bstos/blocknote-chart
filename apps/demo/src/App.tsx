import { useState } from "react";
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

const initialContent: any[] = [
  {
    type: "heading",
    props: { level: 2 },
    content: "Weekly Active Users",
  },
  {
    type: "paragraph",
    content: "Visitors vs. signups across the last four weeks.",
  },
  {
    type: "chart",
    props: {
      chartType: "line",
      chartData: JSON.stringify({
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          { label: "Visitors", data: [1200, 1850, 1600, 2300] },
          { label: "Signups", data: [340, 520, 410, 680] },
        ],
      }),
    },
  },
  {
    type: "paragraph",
    content: "",
  },
];

const INSTALL_CMD = "npm install @m0bstos/blocknote-chart";

export default function App() {
  const editor = useCreateBlockNote({ schema, initialContent });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <span className="hero-badge">@m0bstos/blocknote-chart</span>
        <h1 className="hero-title">Chart blocks<br />for BlockNote.</h1>
        <p className="hero-desc">
          A plug-and-play chart block extension for BlockNote editors.
          Bar, line, and pie charts — editable inline, importable from CSV.
        </p>
        <button className="hero-install" onClick={handleCopy}>
          <span className="hero-install-prefix">$</span>
          <span className="hero-install-cmd">{INSTALL_CMD}</span>
          <span className="hero-install-copy">{copied ? "copied!" : "copy"}</span>
        </button>
        <p className="hero-hint">Type <kbd>/</kbd> in the editor and select <strong>Chart</strong></p>
      </div>
      <div className="hero-right">
        <div className="editor-window">
          <div className="editor-chrome">
            <span className="chrome-dot" />
            <span className="chrome-dot" />
            <span className="chrome-dot" />
            <span className="chrome-url">yourapp.com</span>
          </div>
          <div className="editor-body">
            <BlockNoteView editor={editor} theme="dark" slashMenu={false}>
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
      </div>
    </div>
  );
}
