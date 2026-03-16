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

  const labels: string[] = [];
  const datasets: ChartDataset[] = headers.slice(1).map((header) => ({
    label: header || "Dataset",
    data: [],
    backgroundColor: "#999",
  }));

  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const cells = rows[rowIndex].split(",").map((cell) => cell.trim());
    if (cells.length !== headers.length) {
      throw new Error(
        `Row ${rowIndex + 1} has ${cells.length} columns, expected ${headers.length}.`,
      );
    }

    labels.push(cells[0]);
    for (let colIndex = 1; colIndex < cells.length; colIndex += 1) {
      const value = Number(cells[colIndex]);
      if (!Number.isFinite(value)) {
        throw new Error(
          `Invalid number at row ${rowIndex + 1}, column ${colIndex + 1}.`,
        );
      }
      datasets[colIndex - 1].data.push(value);
    }
  }

  return { labels, datasets };
};
