import { describe, it, expect } from "vitest";
import { defaultChartData, parseChartData } from "./data";

describe("defaultChartData", () => {
  it("has labels and at least one dataset", () => {
    expect(defaultChartData.labels.length).toBeGreaterThan(0);
    expect(defaultChartData.datasets.length).toBeGreaterThan(0);
    expect(defaultChartData.datasets[0].data.length).toBe(defaultChartData.labels.length);
  });
});

describe("parseChartData", () => {
  const valid = {
    labels: ["A", "B"],
    datasets: [{ label: "D1", data: [1, 2] }],
  };

  it("parses a valid JSON string", () => {
    const result = parseChartData(JSON.stringify(valid));
    expect(result).toEqual(valid);
  });

  it("accepts a valid ChartData object directly", () => {
    expect(parseChartData(valid)).toEqual(valid);
  });

  it("accepts dataset with explicit backgroundColor", () => {
    const withColor = {
      labels: ["X"],
      datasets: [{ label: "D", data: [5], backgroundColor: "#ff0000" }],
    };
    expect(parseChartData(withColor)).toEqual(withColor);
  });

  it("returns null for null input", () => {
    expect(parseChartData(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(parseChartData(undefined)).toBeNull();
  });

  it("returns null for invalid JSON string", () => {
    expect(parseChartData("{bad json")).toBeNull();
  });

  it("returns null for a valid JSON string that is not ChartData", () => {
    expect(parseChartData(JSON.stringify({ foo: "bar" }))).toBeNull();
  });

  it("returns null when labels are not strings", () => {
    expect(parseChartData({ labels: [1, 2], datasets: [] } as any)).toBeNull();
  });

  it("returns null when datasets is not an array", () => {
    expect(parseChartData({ labels: ["A"], datasets: "nope" } as any)).toBeNull();
  });

  it("returns null when dataset.data contains non-finite numbers", () => {
    const bad = { labels: ["A"], datasets: [{ label: "D", data: [NaN] }] };
    expect(parseChartData(bad)).toBeNull();
  });

  it("returns null when dataset.data contains Infinity", () => {
    const bad = { labels: ["A"], datasets: [{ label: "D", data: [Infinity] }] };
    expect(parseChartData(bad)).toBeNull();
  });

  it("returns null when dataset.label is not a string", () => {
    const bad = { labels: ["A"], datasets: [{ label: 42, data: [1] }] };
    expect(parseChartData(bad as any)).toBeNull();
  });

  it("returns null when backgroundColor is not a string", () => {
    const bad = {
      labels: ["A"],
      datasets: [{ label: "D", data: [1], backgroundColor: 123 }],
    };
    expect(parseChartData(bad as any)).toBeNull();
  });

  it("returns null for a primitive string that is not JSON", () => {
    expect(parseChartData("hello")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(parseChartData("")).toBeNull();
  });
});
