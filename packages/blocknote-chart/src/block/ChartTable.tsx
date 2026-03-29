import React from "react";
import type { ChartTableProps, ChartData } from "../core/types";

export const ChartTable: React.FC<ChartTableProps> = ({ data, onChange }) => {
  const updateDatasetName = (dsIndex: number, value: string) => {
    const next: ChartData = {
      labels: [...data.labels],
      datasets: data.datasets.map((ds, i) =>
        i === dsIndex ? { ...ds, label: value } : { ...ds, data: [...ds.data] },
      ),
    };
    onChange(next);
  };

  const updateLabel = (rowIndex: number, value: string) => {
    const next: ChartData = {
      labels: data.labels.map((l, i) => (i === rowIndex ? value : l)),
      datasets: data.datasets.map((ds) => ({ ...ds, data: [...ds.data] })),
    };
    onChange(next);
  };

  const updateCell = (rowIndex: number, dsIndex: number, value: string) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return;
    const next: ChartData = {
      labels: [...data.labels],
      datasets: data.datasets.map((ds, i) =>
        i === dsIndex
          ? { ...ds, data: ds.data.map((v, j) => (j === rowIndex ? num : v)) }
          : { ...ds, data: [...ds.data] },
      ),
    };
    onChange(next);
  };

  return (
    <div className="bn-chart-table-wrapper" contentEditable={false}>
      <p className="bn-chart-table-heading">Chart Data</p>
      <table className="bn-chart-table">
        <thead>
          <tr>
            <th className="bn-chart-table-th">Label</th>
            {data.datasets.map((ds, i) => (
              <th key={i} className="bn-chart-table-th">
                <input
                  type="text"
                  className="bn-chart-table-input bn-chart-table-input--header"
                  value={ds.label}
                  onChange={(e) => updateDatasetName(i, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.labels.map((label, rowIndex) => (
            <tr key={rowIndex}>
              <td className="bn-chart-table-td">
                <input
                  type="text"
                  className="bn-chart-table-input"
                  value={label}
                  onChange={(e) => updateLabel(rowIndex, e.target.value)}
                />
              </td>
              {data.datasets.map((ds, dsIndex) => (
                <td key={dsIndex} className="bn-chart-table-td">
                  <input
                    type="number"
                    className="bn-chart-table-input"
                    value={ds.data[rowIndex] ?? 0}
                    onChange={(e) => updateCell(rowIndex, dsIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
