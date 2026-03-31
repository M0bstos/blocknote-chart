import type { ChartBlockConfig, ChartData } from "./types";

export const defaultColorPalette: string[] = [
  "#b5c8f0",
  "#f0b5c8",
  "#b5f0d4",
  "#f0e0b5",
  "#d4b5f0",
  "#b5eef0",
  "#f0ccb5",
  "#c8f0b5",
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
