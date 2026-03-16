import type { ChartOptions } from "chart.js";
import type { ComponentType } from "react";

export type ChartType = string;

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export type ChartViewMode = "chart" | "table" | "csv";

export interface ChartRendererProps {
  chartType: ChartType;
  chartData: ChartData;
}

export interface ChartMenuProps {
  chartType: ChartType;
  viewMode: ChartViewMode;
}

export interface ChartTableProps {
  data: ChartData;
  onChange: (nextData: ChartData) => void;
}

export interface CsvImportProps {
  onImport: (nextData: ChartData) => void;
}

export type IconComponent = ComponentType<{ className?: string }>;

export interface ChartClassNames {
  root?: string;
  canvasWrapper?: string;
  menu?: string;
  table?: string;
  csvImport?: string;
}

export interface ChartBlockConfig {
  components?: {
    ChartRenderer?: ComponentType<ChartRendererProps>;
    ChartMenu?: ComponentType<ChartMenuProps>;
    ChartTable?: ComponentType<ChartTableProps>;
    CsvImport?: ComponentType<CsvImportProps>;
  };
  icons?: {
    barChart?: IconComponent;
    lineChart?: IconComponent;
    pieChart?: IconComponent;
    tableView?: IconComponent;
    csvImport?: IconComponent;
    addRow?: IconComponent;
    removeRow?: IconComponent;
    addDataset?: IconComponent;
    removeDataset?: IconComponent;
  };
  csv?: {
    parseCsv?: (rawCsv: string) => ChartData;
    maxFileSizeBytes?: number;
  };
  colors?: {
    palette?: string[];
    generator?: (index: number) => string;
  };
  chart?: {
    defaultType?: ChartType;
    defaultData?: ChartData;
    defaultOptions?: ChartOptions;
  };
  classNames?: ChartClassNames;
}
