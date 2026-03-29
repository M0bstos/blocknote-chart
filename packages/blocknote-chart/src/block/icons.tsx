import React from "react";
import type { IconComponent } from "../core/types";

const s = { width: "1em", height: "1em", flexShrink: 0 as const };

export const BarChartIcon: IconComponent = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" style={s} className={className} aria-hidden="true">
    <rect x="1" y="8" width="3" height="7" rx="0.5" />
    <rect x="6" y="4" width="3" height="11" rx="0.5" />
    <rect x="11" y="6" width="3" height="9" rx="0.5" />
  </svg>
);

export const LineChartIcon: IconComponent = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={s}
    className={className}
    aria-hidden="true"
  >
    <polyline points="1,13 4,8 7,10 10,4 13,6 15,3" />
  </svg>
);

export const PieChartIcon: IconComponent = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" style={s} className={className} aria-hidden="true">
    <path d="M8 2v6h6a6 6 0 1 1-6-6z" opacity="0.55" />
    <path d="M9 1.07A6 6 0 0 1 14.93 7H9V1.07z" />
  </svg>
);

export const TableIcon: IconComponent = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    style={s}
    className={className}
    aria-hidden="true"
  >
    <rect x="1.5" y="1.5" width="13" height="13" rx="1" />
    <line x1="1.5" y1="5.5" x2="14.5" y2="5.5" />
    <line x1="6" y1="1.5" x2="6" y2="14.5" />
  </svg>
);

export const CsvIcon: IconComponent = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" style={s} className={className} aria-hidden="true">
    <path d="M3 1h7l3 3v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" opacity="0.3" />
    <path d="M10 1l3 3h-2.5A.5.5 0 0 1 10 3.5V1z" />
    <path
      d="M4 10.5l1-2.5 1 2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 8.5c.75-.6 2-.3 2 .75s-1.25.5-1.25 1.5h1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AddRowIcon: IconComponent = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    style={s}
    className={className}
    aria-hidden="true"
  >
    <rect x="1.5" y="1.5" width="13" height="8" rx="1" />
    <line x1="1.5" y1="5.5" x2="14.5" y2="5.5" />
    <line x1="6" y1="1.5" x2="6" y2="9.5" />
    <line x1="8" y1="12.25" x2="8" y2="15.75" />
    <line x1="6.25" y1="14" x2="9.75" y2="14" />
  </svg>
);

export const RemoveRowIcon: IconComponent = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    style={s}
    className={className}
    aria-hidden="true"
  >
    <rect x="1.5" y="1.5" width="13" height="8" rx="1" />
    <line x1="1.5" y1="5.5" x2="14.5" y2="5.5" />
    <line x1="6" y1="1.5" x2="6" y2="9.5" />
    <line x1="6.25" y1="14" x2="9.75" y2="14" />
  </svg>
);

export const AddDatasetIcon: IconComponent = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    stroke="currentColor"
    strokeLinecap="round"
    style={s}
    className={className}
    aria-hidden="true"
  >
    <rect x="1" y="9" width="3" height="6" rx="0.5" opacity="0.55" strokeWidth="0" />
    <rect x="6" y="6" width="3" height="9" rx="0.5" opacity="0.55" strokeWidth="0" />
    <line x1="12" y1="9.5" x2="12" y2="15.5" strokeWidth="1.5" />
    <line x1="9.25" y1="12.5" x2="14.75" y2="12.5" strokeWidth="1.5" />
  </svg>
);

export const RemoveDatasetIcon: IconComponent = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    stroke="currentColor"
    strokeLinecap="round"
    style={s}
    className={className}
    aria-hidden="true"
  >
    <rect x="1" y="9" width="3" height="6" rx="0.5" opacity="0.55" strokeWidth="0" />
    <rect x="6" y="6" width="3" height="9" rx="0.5" opacity="0.55" strokeWidth="0" />
    <line x1="9.25" y1="12.5" x2="14.75" y2="12.5" strokeWidth="1.5" />
  </svg>
);

export const defaultIcons = {
  barChart: BarChartIcon,
  lineChart: LineChartIcon,
  pieChart: PieChartIcon,
  tableView: TableIcon,
  csvImport: CsvIcon,
  addRow: AddRowIcon,
  removeRow: RemoveRowIcon,
  addDataset: AddDatasetIcon,
  removeDataset: RemoveDatasetIcon,
};
