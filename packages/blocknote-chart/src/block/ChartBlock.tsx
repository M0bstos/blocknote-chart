import { createReactBlockSpec } from "@blocknote/react";
import { defaultProps } from "@blocknote/core";
import React from "react";
import { defaultChartData } from "../core/data";
import type { ChartBlockConfig, ChartType } from "../core/types";
import { ChartBlockConfigContext } from "./context";
import { ChartRenderer } from "./ChartRenderer";

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
          <ChartRenderer block={props.block} editor={props.editor} />
        </ChartBlockConfigContext.Provider>
      ),
    }
  )();
}

export const ChartBlock = createChartBlock();
