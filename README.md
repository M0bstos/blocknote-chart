# @m0bstos/blocknote-chart

Drop-in chart block for [BlockNote](https://www.blocknotejs.org/) editors. Supports bar, line, and pie charts — editable inline with a spreadsheet-style table, or populated via CSV import.

Built on [Chart.js](https://www.chartjs.org/).

**[Live demo](https://blocknote-chart-demo.vercel.app/)**

## Install

```bash
npm install @m0bstos/blocknote-chart
```

Peer dependencies: `@blocknote/core`, `@blocknote/react`, `chart.js`, `react`, `react-dom`.

## Quick start

```tsx
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import { createChartBlock, insertChart } from "@m0bstos/blocknote-chart";
import "@m0bstos/blocknote-chart/style.css";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    chart: createChartBlock(),
  },
});

function Editor() {
  const editor = useCreateBlockNote({ schema });

  return (
    <BlockNoteView editor={editor} slashMenu={false}>
      <SuggestionMenuController
        triggerCharacter="/"
        getItems={async (query) =>
          [...getDefaultReactSlashMenuItems(editor), insertChart(editor)].filter(
            (item) => item.title.toLowerCase().includes(query.toLowerCase())
          )
        }
      />
    </BlockNoteView>
  );
}
```

Type `/` in the editor and pick **Chart** to insert one.

## Configuration

`createChartBlock` accepts an optional config object:

```tsx
createChartBlock({
  colors: {
    palette: ["#6366f1", "#f43f5e", "#10b981"],
    generator: (index) => `hsl(${index * 45}, 70%, 60%)`,
  },
  csv: {
    maxFileSizeBytes: 10 * 1024 * 1024,
  },
  chart: {
    defaultType: "line",
    defaultOptions: { responsive: true },
  },
  icons: { /* swap any icon with your own component */ },
  classNames: { /* override CSS class names per section */ },
});
```

See [`ChartBlockConfig`](packages/blocknote-chart/src/core/types.ts) for the full type.

## What's in the box

| Feature | Details |
|---------|---------|
| Chart types | Bar, Line, Pie (extensible via `ChartType` string) |
| Inline editing | Spreadsheet table with add/remove rows and datasets |
| CSV import | File upload or paste, with size + format validation |
| Theming | CSS custom properties (`--bn-chart-*`), class name overrides |
| Accessibility | ARIA labels, keyboard navigation, focus-visible states |

## Project structure

```
packages/blocknote-chart/   # the published library
apps/demo/                  # demo / landing page
docs/                       # architecture, requirements, implementation guide
```

## Development

```bash
npm install
npm run dev       # starts the demo on localhost
npm run build     # builds the library
npm run test      # runs tests
```

## License

[MIT](LICENSE)
