import type { ChartData } from "./types";

export const defaultChartData: ChartData = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "Series 1",
      data: [12, 19, 8],
      backgroundColor: "#94a3b8",
    },
  ],
};

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isChartData = (value: unknown): value is ChartData => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const data = value as Partial<ChartData>;
  if (!Array.isArray(data.labels) || !Array.isArray(data.datasets)) {
    return false;
  }

  if (!data.labels.every((label) => typeof label === "string")) {
    return false;
  }

  return data.datasets.every(
    (dataset) =>
      dataset &&
      typeof dataset.label === "string" &&
      Array.isArray(dataset.data) &&
      dataset.data.every(isFiniteNumber) &&
      (dataset.backgroundColor === undefined ||
        typeof dataset.backgroundColor === "string"),
  );
};

export const parseChartData = (input: string | ChartData | null | undefined): ChartData | null => {
  if (input == null) {
    return null;
  }

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
