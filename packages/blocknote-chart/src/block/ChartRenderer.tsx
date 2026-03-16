import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
} from "chart.js";
import { parseChartData, defaultChartData } from "../core/data";
import { applyColors } from "../core/colors";
import { useChartBlockConfig } from "./context";
import { ChartMenu } from "./ChartMenu";
import { ChartTable } from "./ChartTable";
import { CsvImport } from "./CsvImport";
import type { ChartData, ChartViewMode } from "../core/types";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
);

interface ChartRendererProps {
  block: {
    id: string;
    props: {
      chartType: string;
      chartData: string;
      textColor: string;
      backgroundColor: string;
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editor: any;
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({ block, editor }) => {
  const config = useChartBlockConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);
  const [viewMode, setViewMode] = useState<ChartViewMode>("chart");
  const [chartError, setChartError] = useState(false);

  const parsedData = useMemo<ChartData>(
    () => parseChartData(block.props.chartData) ?? defaultChartData,
    [block.props.chartData],
  );

  const coloredData = useMemo(
    () => applyColors(parsedData, config),
    [parsedData, config],
  );

  const handleDataChange = (nextData: ChartData) => {
    editor.updateBlock(block, {
      type: "chart",
      props: { ...block.props, chartData: JSON.stringify(nextData) },
    });
  };

  const addDataset = () => {
    handleDataChange({
      labels: [...parsedData.labels],
      datasets: [
        ...parsedData.datasets,
        {
          label: `Dataset ${parsedData.datasets.length + 1}`,
          data: parsedData.labels.map(() => 0),
          backgroundColor: "#94a3b8",
        },
      ],
    });
  };

  const removeDataset = () => {
    if (parsedData.datasets.length <= 1) return;
    handleDataChange({
      labels: [...parsedData.labels],
      datasets: parsedData.datasets.slice(0, -1),
    });
  };

  const addRow = () => {
    handleDataChange({
      labels: [...parsedData.labels, `Label ${parsedData.labels.length + 1}`],
      datasets: parsedData.datasets.map((ds) => ({ ...ds, data: [...ds.data, 0] })),
    });
  };

  const removeRow = () => {
    if (parsedData.labels.length <= 1) return;
    handleDataChange({
      labels: parsedData.labels.slice(0, -1),
      datasets: parsedData.datasets.map((ds) => ({ ...ds, data: ds.data.slice(0, -1) })),
    });
  };

  useEffect(() => {
    if (viewMode !== "chart" || !canvasRef.current) return;

    try {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      chartRef.current = new ChartJS(canvasRef.current, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: block.props.chartType as any,
        data: {
          labels: coloredData.labels,
          datasets: coloredData.datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...(config?.chart?.defaultOptions ?? {}),
        },
      });
      setChartError(false);
    } catch {
      setChartError(true);
    }

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  // config is stable for the lifetime of the block spec — intentionally omitted from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.props.chartType, coloredData, viewMode]);

  const ActiveChartMenu = config?.components?.ChartMenu ?? ChartMenu;
  const ActiveChartTable = config?.components?.ChartTable ?? ChartTable;
  const ActiveCsvImport = config?.components?.CsvImport ?? CsvImport;

  return (
    <div className="bn-chart-root" contentEditable={false}>
      <ActiveChartMenu
        chartType={block.props.chartType}
        viewMode={viewMode}
        onChartTypeChange={(type) =>
          editor.updateBlock(block, {
            type: "chart",
            props: { ...block.props, chartType: type },
          })
        }
        onViewModeChange={setViewMode}
        onAddDataset={addDataset}
        onRemoveDataset={removeDataset}
        onAddRow={addRow}
        onRemoveRow={removeRow}
      />
      <div className="bn-chart-canvas-wrapper">
        {viewMode === "table" && (
          <ActiveChartTable data={parsedData} onChange={handleDataChange} />
        )}
        {viewMode === "csv" && (
          <ActiveCsvImport
            onImport={(next) => {
              handleDataChange(next);
              setViewMode("chart");
            }}
          />
        )}
        {viewMode === "chart" &&
          (chartError ? (
            <div className="bn-chart-fallback">Chart could not be rendered.</div>
          ) : (
            <canvas ref={canvasRef} />
          ))}
      </div>
    </div>
  );
};
