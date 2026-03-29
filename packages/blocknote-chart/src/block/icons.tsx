import React from "react";
import {
  MdBarChart,
  MdShowChart,
  MdPieChart,
  MdTableChart,
  MdUploadFile,
  MdAddCircle,
  MdRemoveCircle,
  MdEdit,
  MdArrowBack,
} from "react-icons/md";
import type { IconComponent } from "../core/types";

export const BarChartIcon: IconComponent = ({ className }) => (
  <MdBarChart className={className} />
);

export const LineChartIcon: IconComponent = ({ className }) => (
  <MdShowChart className={className} />
);

export const PieChartIcon: IconComponent = ({ className }) => (
  <MdPieChart className={className} />
);

export const TableIcon: IconComponent = ({ className }) => (
  <MdTableChart className={className} />
);

export const CsvIcon: IconComponent = ({ className }) => (
  <MdUploadFile className={className} />
);

export const AddRowIcon: IconComponent = ({ className }) => (
  <MdAddCircle className={className} />
);

export const RemoveRowIcon: IconComponent = ({ className }) => (
  <MdRemoveCircle className={className} />
);

export const AddDatasetIcon: IconComponent = ({ className }) => (
  <MdAddCircle className={className} />
);

export const RemoveDatasetIcon: IconComponent = ({ className }) => (
  <MdRemoveCircle className={className} />
);

export const EditIcon: IconComponent = ({ className }) => (
  <MdEdit className={className} />
);

export const BackIcon: IconComponent = ({ className }) => (
  <MdArrowBack className={className} />
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

