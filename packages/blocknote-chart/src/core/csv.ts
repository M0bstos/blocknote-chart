import type { ChartData, ChartDataset } from "./types";

export const parseCsvToChartData = (rawCsv: string): ChartData => {
  const rows = rawCsv
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter((row) => row.length > 0);

  if (rows.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const headers = rows[0].split(",").map((cell) => cell.trim());
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
    const csvRowNumber = rowIndex + 1;
    const cells = rows[rowIndex].split(",").map((cell) => cell.trim());
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
