import { createContext, useContext } from "react";
import type { ChartBlockConfig } from "../core/types";

export const ChartBlockConfigContext = createContext<ChartBlockConfig | undefined>(undefined);

export const useChartBlockConfig = () => useContext(ChartBlockConfigContext);
