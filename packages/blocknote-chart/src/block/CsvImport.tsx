import React, { useRef, useState } from "react";
import { useChartBlockConfig } from "./context";
import { parseCsvToChartData } from "../core/csv";
import type { CsvImportProps } from "../core/types";

const DEFAULT_MAX_BYTES = 2 * 1024 * 1024;

export const CsvImport: React.FC<CsvImportProps> = ({ onImport }) => {
  const config = useChartBlockConfig();
  const maxBytes = config?.csv?.maxFileSizeBytes ?? DEFAULT_MAX_BYTES;
  const csvParser = config?.csv?.parseCsv ?? parseCsvToChartData;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pasteValue, setPasteValue] = useState("");

  const processFile = (file: File) => {
    setError(null);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Only .csv files are supported.");
      return;
    }

    if (file.size > maxBytes) {
      setError(`File exceeds the ${(maxBytes / (1024 * 1024)).toFixed(0)} MB size limit.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const raw = e.target?.result;
      if (typeof raw !== "string") return;
      try {
        onImport(csvParser(raw));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to parse CSV.");
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handlePasteImport = () => {
    const raw = pasteValue.trim();
    if (!raw) return;
    setError(null);
    try {
      onImport(csvParser(raw));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse CSV.");
    }
  };

  return (
    <div className="bn-chart-csv" contentEditable={false}>
      <div
        className={`bn-chart-csv-dropzone${isDragging ? " bn-chart-csv-dropzone--active" : ""}`}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <p className="bn-chart-csv-label">Select or drag &amp; drop a .csv file</p>
        <p className="bn-chart-csv-hint">
          Max size: {(maxBytes / (1024 * 1024)).toFixed(0)} MB
        </p>
      </div>
      {error && <p className="bn-chart-csv-error">{error}</p>}
      <div className="bn-chart-csv-paste">
        <textarea
          className="bn-chart-csv-paste-input"
          placeholder="Or paste CSV text here…"
          value={pasteValue}
          onChange={(e) => setPasteValue(e.target.value)}
          rows={4}
        />
        <button
          type="button"
          className="bn-chart-csv-paste-btn"
          disabled={!pasteValue.trim()}
          onClick={handlePasteImport}
        >
          Import
        </button>
      </div>
    </div>
  );
};
