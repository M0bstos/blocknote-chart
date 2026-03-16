import type { ChartBlockConfig, ChartData } from "./types";

export const defaultColorPalette: string[] = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#84cc16",
];

export const defaultColorGenerator = (index: number): string => {
  const paletteIndex = index % defaultColorPalette.length;
  return defaultColorPalette[paletteIndex];
};

export const applyColors = (
  chartData: ChartData,
  config?: ChartBlockConfig,
): ChartData => {
  const configuredPalette = config?.colors?.palette;
  const hasPalette = Array.isArray(configuredPalette) && configuredPalette.length > 0;
  const colorGenerator = config?.colors?.generator ?? defaultColorGenerator;

  const resolveColor = (index: number): string => {
    if (hasPalette) {
      const paletteColor = configuredPalette[index % configuredPalette.length];
      if (paletteColor) {
        return paletteColor;
      }
    }

    return colorGenerator(index);
  };

  return {
    labels: [...chartData.labels],
    datasets: chartData.datasets.map((dataset, index) => ({
      ...dataset,
      data: [...dataset.data],
      backgroundColor: resolveColor(index),
    })),
  };
};
