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

export interface ChartBlockConfig {
  components?: {
    ChartRenderer?: unknown;
    ChartMenu?: unknown;
    ChartTable?: unknown;
    CsvImport?: unknown;
  };
  icons?: Record<string, unknown>;
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
    defaultOptions?: unknown;
  };
  classNames?: Record<string, string>;
}
