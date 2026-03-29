import React, { useState, useRef, useEffect } from "react";
import { useChartBlockConfig } from "./context";
import { defaultIcons, EditIcon } from "./icons";
import type { ChartMenuProps, ChartType } from "../core/types";

const CHART_TYPES: { value: ChartType; label: string; iconKey: keyof typeof defaultIcons }[] = [
  { value: "bar", label: "Bar", iconKey: "barChart" },
  { value: "line", label: "Line", iconKey: "lineChart" },
  { value: "pie", label: "Pie", iconKey: "pieChart" },
];

export const ChartMenu: React.FC<ChartMenuProps> = ({
  chartType,
  onChartTypeChange,
  onViewModeChange,
  onAddDataset,
  onRemoveDataset,
}) => {
  const config = useChartBlockConfig();
  const icons = { ...defaultIcons, ...(config?.icons ?? {}) };
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="bn-chart-menu-trigger-wrapper" ref={containerRef} contentEditable={false}>
      <button
        type="button"
        className="bn-chart-menu-trigger"
        aria-label="Chart options"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <EditIcon className="bn-chart-menu-trigger-icon" />
      </button>
      {open && (
        <div className="bn-chart-dropdown" role="menu">
          <div className="bn-chart-dropdown-section-title">Chart Type</div>
          {CHART_TYPES.map((ct) => {
            const Icon = icons[ct.iconKey];
            return (
              <button
                key={ct.value}
                type="button"
                role="menuitem"
                className={`bn-chart-dropdown-item${chartType === ct.value ? " bn-chart-dropdown-item--active" : ""}`}
                onClick={() => { onChartTypeChange(ct.value); setOpen(false); }}
              >
                {Icon && <Icon className="bn-chart-dropdown-item-icon" />}
                {ct.label}
              </button>
            );
          })}
          <div className="bn-chart-dropdown-divider" />
          <div className="bn-chart-dropdown-section-title">Datasets</div>
          <button
            type="button"
            role="menuitem"
            className="bn-chart-dropdown-item"
            onClick={() => { onAddDataset(); setOpen(false); }}
          >
            {icons.addDataset && <icons.addDataset className="bn-chart-dropdown-item-icon" />}
            Add Dataset
          </button>
          <button
            type="button"
            role="menuitem"
            className="bn-chart-dropdown-item"
            onClick={() => { onRemoveDataset(); setOpen(false); }}
          >
            {icons.removeDataset && <icons.removeDataset className="bn-chart-dropdown-item-icon" />}
            Remove Dataset
          </button>
          <div className="bn-chart-dropdown-divider" />
          <div className="bn-chart-dropdown-section-title">Actions</div>
          <button
            type="button"
            role="menuitem"
            className="bn-chart-dropdown-item"
            onClick={() => { onViewModeChange("table"); setOpen(false); }}
          >
            {icons.tableView && <icons.tableView className="bn-chart-dropdown-item-icon" />}
            Edit Data
          </button>
          <button
            type="button"
            role="menuitem"
            className="bn-chart-dropdown-item"
            onClick={() => { onViewModeChange("csv"); setOpen(false); }}
          >
            {icons.csvImport && <icons.csvImport className="bn-chart-dropdown-item-icon" />}
            Import CSV
          </button>
        </div>
      )}
    </div>
  );
};
