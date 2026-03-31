import { describe, it, expect } from "vitest";
import { parseCsvToChartData } from "./csv";

describe("parseCsvToChartData", () => {
  it("parses a valid CSV with one dataset", () => {
    const csv = "Label,Sales\nJan,100\nFeb,200\nMar,150";
    const result = parseCsvToChartData(csv);
    expect(result.labels).toEqual(["Jan", "Feb", "Mar"]);
    expect(result.datasets).toHaveLength(1);
    expect(result.datasets[0].label).toBe("Sales");
    expect(result.datasets[0].data).toEqual([100, 200, 150]);
  });

  it("parses a valid CSV with multiple datasets", () => {
    const csv = "Month,Revenue,Costs\nJan,500,300\nFeb,600,350";
    const result = parseCsvToChartData(csv);
    expect(result.labels).toEqual(["Jan", "Feb"]);
    expect(result.datasets).toHaveLength(2);
    expect(result.datasets[0].label).toBe("Revenue");
    expect(result.datasets[0].data).toEqual([500, 600]);
    expect(result.datasets[1].label).toBe("Costs");
    expect(result.datasets[1].data).toEqual([300, 350]);
  });

  it("handles Windows-style line endings", () => {
    const csv = "Label,Val\r\nA,1\r\nB,2";
    const result = parseCsvToChartData(csv);
    expect(result.labels).toEqual(["A", "B"]);
    expect(result.datasets[0].data).toEqual([1, 2]);
  });

  it("trims whitespace from cells", () => {
    const csv = " Label , Data \n  X , 42 \n  Y , 7 ";
    const result = parseCsvToChartData(csv);
    expect(result.labels).toEqual(["X", "Y"]);
    expect(result.datasets[0].label).toBe("Data");
    expect(result.datasets[0].data).toEqual([42, 7]);
  });

  it("ignores empty lines", () => {
    const csv = "Label,Val\n\nA,1\n\nB,2\n";
    const result = parseCsvToChartData(csv);
    expect(result.labels).toEqual(["A", "B"]);
  });

  it("handles decimal numbers", () => {
    const csv = "Label,Val\nA,3.14\nB,-2.5";
    const result = parseCsvToChartData(csv);
    expect(result.datasets[0].data).toEqual([3.14, -2.5]);
  });

  it("handles zero values", () => {
    const csv = "Label,Val\nA,0\nB,0";
    const result = parseCsvToChartData(csv);
    expect(result.datasets[0].data).toEqual([0, 0]);
  });

  it("uses 'Dataset' as fallback for empty header", () => {
    const csv = "Label,\nA,10";
    const result = parseCsvToChartData(csv);
    expect(result.datasets[0].label).toBe("Dataset");
  });

  it("throws if CSV has fewer than 2 rows", () => {
    expect(() => parseCsvToChartData("Label,Sales")).toThrow(
      "CSV must include a header row and at least one data row.",
    );
  });

  it("throws if CSV is empty", () => {
    expect(() => parseCsvToChartData("")).toThrow();
  });

  it("throws if header has only one column", () => {
    expect(() => parseCsvToChartData("Label\nA")).toThrow(
      "CSV must include at least one dataset column.",
    );
  });

  it("throws if first header cell is empty", () => {
    expect(() => parseCsvToChartData(",Sales\nA,10")).toThrow(
      "CSV header must include a label column in the first position.",
    );
  });

  it("throws on column count mismatch", () => {
    expect(() => parseCsvToChartData("Label,A,B\nX,1")).toThrow(/Row 2 has 2 columns, expected 3/);
  });

  it("throws on empty numeric cell", () => {
    expect(() => parseCsvToChartData("Label,Val\nA,")).toThrow(
      /Invalid number at row 2, column 2: value is empty/,
    );
  });

  it("throws on non-numeric value", () => {
    expect(() => parseCsvToChartData("Label,Val\nA,abc")).toThrow(
      /Invalid number at row 2, column 2: "abc"/,
    );
  });

  it("throws on Infinity", () => {
    expect(() => parseCsvToChartData("Label,Val\nA,Infinity")).toThrow(
      /Invalid number at row 2, column 2/,
    );
  });
});
