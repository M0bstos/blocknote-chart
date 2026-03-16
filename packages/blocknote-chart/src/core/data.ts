import type { ChartData } from "./types";

export const defaultChartData: ChartData = {
  labels: ["A", "B", "C"],
  datasets: [{ label: "Series 1", data: [10, 20, 30], backgroundColor: "#999" }],
};

const isChartData = (value: unknown): value is ChartData => {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<ChartData>;
  if (!Array.isArray(data.labels) || !Array.isArray(data.datasets)) return false;

  return data.datasets.every(
    (dataset) =>
      dataset &&
      typeof dataset.label === "string" &&
      Array.isArray(dataset.data) &&
      dataset.data.every((point) => typeof point === "number" && Number.isFinite(point)),
  );
};

export const parseChartData = (input: string | ChartData | null | undefined): ChartData | null => {
  if (input == null) return null;
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return isChartData(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  return isChartData(input) ? input : null;
};
