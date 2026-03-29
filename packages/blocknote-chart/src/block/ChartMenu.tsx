import React from "react";
import { useChartBlockConfig } from "./context";
import { defaultIcons } from "./icons";
import type { ChartMenuProps, ChartType } from "../core/types";

const CHART_TYPES: { value: ChartType; label: string }[] = [
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "pie", label: "Pie" },
];

export const ChartMenu: React.FC<ChartMenuProps> = ({
  chartType,
  viewMode,
  onChartTypeChange,
  onViewModeChange,
  onAddDataset,
  onRemoveDataset,
  onAddRow,
  onRemoveRow,
}) => {
  const config = useChartBlockConfig();
  const icons = { ...defaultIcons, ...(config?.icons ?? {}) };

  return (
    <div className="bn-chart-menu" contentEditable={false}>
      <div className="bn-chart-menu-group">
        {CHART_TYPES.map((ct) => {
          const Icon =
            ct.value === "bar"
              ? icons.barChart
              : ct.value === "line"
                ? icons.lineChart
                : icons.pieChart;
          return (
            <button
              key={ct.value}
              type="button"
              title={`${ct.label} chart`}
              className={`bn-chart-menu-btn${chartType === ct.value ? " bn-chart-menu-btn--active" : ""}`}
              onClick={() => onChartTypeChange(ct.value)}
            >
              {Icon ? <Icon /> : ct.label}
            </button>
          );
        })}
      </div>

      <div className="bn-chart-menu-group">
        <button
          type="button"
          title="Edit table"
          className={`bn-chart-menu-btn${viewMode === "table" ? " bn-chart-menu-btn--active" : ""}`}
          onClick={() => onViewModeChange(viewMode === "table" ? "chart" : "table")}
        >
          {icons.tableView ? <icons.tableView /> : "Table"}
        </button>
        <button
          type="button"
          title="Import CSV"
          className={`bn-chart-menu-btn${viewMode === "csv" ? " bn-chart-menu-btn--active" : ""}`}
          onClick={() => onViewModeChange(viewMode === "csv" ? "chart" : "csv")}
        >
          {icons.csvImport ? <icons.csvImport /> : "CSV"}
        </button>
      </div>

      <div className="bn-chart-menu-group">
        <button type="button" title="Add dataset" className="bn-chart-menu-btn" onClick={onAddDataset}>
          {icons.addDataset ? <icons.addDataset /> : "+ DS"}
        </button>
        <button type="button" title="Remove dataset" className="bn-chart-menu-btn" onClick={onRemoveDataset}>
          {icons.removeDataset ? <icons.removeDataset /> : "- DS"}
        </button>
        <button type="button" title="Add row" className="bn-chart-menu-btn" onClick={onAddRow}>
          {icons.addRow ? <icons.addRow /> : "+ Row"}
        </button>
        <button type="button" title="Remove row" className="bn-chart-menu-btn" onClick={onRemoveRow}>
          {icons.removeRow ? <icons.removeRow /> : "- Row"}
        </button>
      </div>
    </div>
  );
};
