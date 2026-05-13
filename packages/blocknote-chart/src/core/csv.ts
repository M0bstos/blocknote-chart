import type { ChartData, ChartDataset } from "./types";

interface CsvRow {
  cells: string[];
  rowNumber: number;
}

const parseCsvRows = (rawCsv: string): CsvRow[] => {
  const rows: CsvRow[] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  let rowNumber = 1;

  const pushCell = () => {
    row.push(cell.trim());
    cell = "";
  };

  const pushRow = () => {
    pushCell();
    if (row.some((value) => value.length > 0)) {
      rows.push({ cells: row, rowNumber });
    }
    row = [];
    rowNumber += 1;
  };

  for (let i = 0; i < rawCsv.length; i += 1) {
    const char = rawCsv[i];

    if (inQuotes) {
      if (char === "\"") {
        if (rawCsv[i + 1] === "\"") {
          cell += "\"";
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === "\"") {
      if (cell.trim().length === 0) {
        cell = "";
        inQuotes = true;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === ",") {
      pushCell();
      continue;
    }

    if (char === "\n" || char === "\r") {
      pushRow();
      if (char === "\r" && rawCsv[i + 1] === "\n") {
        i += 1;
      }
      continue;
    }

    cell += char;
  }

  if (inQuotes) {
    throw new Error("CSV contains an unterminated quoted value.");
  }

  pushRow();
  return rows;
};

export const parseCsvToChartData = (rawCsv: string): ChartData => {
  const rows = parseCsvRows(rawCsv);

  if (rows.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const headers = rows[0].cells;
  if (headers.length < 2) {
    throw new Error("CSV must include at least one dataset column.");
  }

  if (!headers[0]) {
    throw new Error("CSV header must include a label column in the first position.");
  }

  const labels: string[] = [];
  const datasets: ChartDataset[] = headers.slice(1).map((header) => ({
    label: header || "Dataset",
    data: [],
    backgroundColor: "#94a3b8",
  }));

  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const csvRowNumber = rows[rowIndex].rowNumber;
    const cells = rows[rowIndex].cells;
    if (cells.length !== headers.length) {
      throw new Error(
        `Row ${csvRowNumber} has ${cells.length} columns, expected ${headers.length}.`,
      );
    }

    labels.push(cells[0]);
    for (let colIndex = 1; colIndex < cells.length; colIndex += 1) {
      const rawValue = cells[colIndex];
      if (rawValue === "") {
        throw new Error(
          `Invalid number at row ${csvRowNumber}, column ${colIndex + 1}: value is empty.`,
        );
      }

      const value = Number(rawValue);
      if (!Number.isFinite(value)) {
        throw new Error(
          `Invalid number at row ${csvRowNumber}, column ${colIndex + 1}: "${rawValue}".`,
        );
      }
      datasets[colIndex - 1].data.push(value);
    }
  }

  return { labels, datasets };
};
