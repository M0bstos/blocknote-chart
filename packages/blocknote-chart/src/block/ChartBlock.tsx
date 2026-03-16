import { createReactBlockSpec } from "@blocknote/react";
import { defaultProps } from "@blocknote/core";
import { defaultChartData } from "../core/data";
import type { ChartBlockConfig, ChartType } from "../core/types";
import React, { createContext, useContext } from "react";

const ChartBlockConfigContext = createContext<ChartBlockConfig | undefined>(undefined);
export const useChartBlockConfig = () => useContext(ChartBlockConfigContext);

const chartPropSchema = {
  textColor: defaultProps.textColor,
  backgroundColor: defaultProps.backgroundColor,
  chartType: {
    default: "bar" as ChartType,
  },
  chartData: {
    default: JSON.stringify(defaultChartData),
  },
};

export function createChartBlock(config?: ChartBlockConfig) {
  return createReactBlockSpec(
    {
      type: "chart",
      propSchema: chartPropSchema,
      content: "none",
    },
    {
      render: (props) => (
        <ChartBlockConfigContext.Provider value={config}>
          <div data-chart-type={props.block.props.chartType} />
        </ChartBlockConfigContext.Provider>
      ),
    }
  );
}

export const ChartBlock = createChartBlock();
