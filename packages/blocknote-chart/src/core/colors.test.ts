import { describe, it, expect } from "vitest";
import {
  defaultColorPalette,
  defaultColorGenerator,
  applyColors,
} from "./colors";
import type { ChartData, ChartBlockConfig } from "./types";

describe("defaultColorPalette", () => {
  it("has 8 colors", () => {
    expect(defaultColorPalette).toHaveLength(8);
  });

  it("contains only hex color strings", () => {
    for (const color of defaultColorPalette) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});

describe("defaultColorGenerator", () => {
  it("returns a color from the palette for index 0", () => {
    expect(defaultColorGenerator(0)).toBe(defaultColorPalette[0]);
  });

  it("wraps around the palette", () => {
    expect(defaultColorGenerator(8)).toBe(defaultColorPalette[0]);
    expect(defaultColorGenerator(10)).toBe(defaultColorPalette[2]);
  });
});

describe("applyColors", () => {
  const baseData: ChartData = {
    labels: ["A", "B"],
    datasets: [
      { label: "D1", data: [1, 2], backgroundColor: "#000" },
      { label: "D2", data: [3, 4], backgroundColor: "#000" },
    ],
  };

  it("applies default palette colors when no config is provided", () => {
    const result = applyColors(baseData);
    expect(result.datasets[0].backgroundColor).toBe(defaultColorPalette[0]);
    expect(result.datasets[1].backgroundColor).toBe(defaultColorPalette[1]);
  });

  it("does not mutate the input data", () => {
    const original = JSON.parse(JSON.stringify(baseData));
    applyColors(baseData);
    expect(baseData).toEqual(original);
  });

  it("uses a custom palette from config", () => {
    const config: ChartBlockConfig = {
      colors: { palette: ["#aaa", "#bbb", "#ccc"] },
    };
    const result = applyColors(baseData, config);
    expect(result.datasets[0].backgroundColor).toBe("#aaa");
    expect(result.datasets[1].backgroundColor).toBe("#bbb");
  });

  it("wraps custom palette for more datasets than colors", () => {
    const threeDatasets: ChartData = {
      labels: ["A"],
      datasets: [
        { label: "D1", data: [1] },
        { label: "D2", data: [2] },
        { label: "D3", data: [3] },
      ],
    };
    const config: ChartBlockConfig = {
      colors: { palette: ["#111", "#222"] },
    };
    const result = applyColors(threeDatasets, config);
    expect(result.datasets[2].backgroundColor).toBe("#111");
  });

  it("uses custom generator when provided without palette", () => {
    const config: ChartBlockConfig = {
      colors: { generator: (i) => `hsl(${i * 90}, 50%, 50%)` },
    };
    const result = applyColors(baseData, config);
    expect(result.datasets[0].backgroundColor).toBe("hsl(0, 50%, 50%)");
    expect(result.datasets[1].backgroundColor).toBe("hsl(90, 50%, 50%)");
  });

  it("falls back to generator when palette is empty", () => {
    const config: ChartBlockConfig = {
      colors: { palette: [] },
    };
    const result = applyColors(baseData, config);
    expect(result.datasets[0].backgroundColor).toBe(defaultColorPalette[0]);
  });

  it("preserves labels and dataset structure", () => {
    const result = applyColors(baseData);
    expect(result.labels).toEqual(["A", "B"]);
    expect(result.datasets[0].label).toBe("D1");
    expect(result.datasets[0].data).toEqual([1, 2]);
  });
});
