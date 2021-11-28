import React from "react";
import "./styles.css";
import { VictoryLine } from "victory";
import { VictoryChart } from "victory";
import { VictoryTheme } from "victory";
import {
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryLegend
} from "victory";
import { Parser } from "expr-eval";

class Rk4State extends React.Component {
  render() {
    var parser = new Parser({
      operators: {
        // These default to true, but are included to be explicit
        add: true,
        concatenate: true,
        conditional: true,
        divide: true,
        factorial: true,
        multiply: true,
        power: true,
        remainder: true,
        subtract: true,

        // Disable and, or, not, <, ==, !=, etc.
        logical: false,
        comparison: false,

        // Disable 'in' and = operators
        in: false,
        assignment: false
      }
    });

    let expr = parser.parse(this.props.data[4]);
    let f = expr.toJSFunction("x, y");

    expr = parser.parse(this.props.data[5]);
    let soln_f = expr.toJSFunction("x0, y0, x");

    const n = this.props.data[0];
    let x_final = parseFloat(this.props.data[3]);
    let x0 = parseFloat(this.props.data[1]);
    let y0 = parseFloat(this.props.data[2]);
    let c = rk4_step(f, x0, y0, x_final, n);
    const true_y = [];
    let h = (x_final - x0) / n;
    let nAdd = n;
    let i = 0;
    for (i = 0; i < nAdd; i++) {
      let temp_solution = solution(x0, y0, x0 + h * i, soln_f);
      let temp_error = ((temp_solution - c[i].y) / temp_solution) * 100.0;
      temp_error = Math.abs(temp_error);
      true_y[i] = { x: x0 + h * i, y: temp_solution, e: temp_error };
    }
    let temp_solution = solution(x0, y0, x0 + h * i, soln_f);
    let temp_error = ((temp_solution - c[i].y) / temp_solution) * 100.0;
    temp_error = Math.abs(temp_error);
    true_y[i] = { x: x0 + h * i, y: temp_solution, e: temp_error };
    return (
      <div className="Rk4State">
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryLegend
            x={170}
            y={20}
            title="Legend"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{
              border: { stroke: "black", fill: "white" },
              title: { fill: "black", fontSize: 15 }
            }}
            data={[
              { name: "True Function", symbol: { fill: "#51cda0" } },
              { name: "RK4", symbol: { fill: "#df7970" } }
            ]}
          />
          <VictoryAxis
            //label="x"
            style={{
              axis: { stroke: "#c9d45c" },
              axisLabel: { fontSize: 20, padding: 30 },
              grid: { stroke: "none" },
              ticks: { stroke: "#c9d45c", size: 5 },
              tickLabels: { fill: "#ffffff", fontSize: 15, padding: 5 }
            }}
          />
          <VictoryAxis
            dependentAxis
            //label="y"
            style={{
              axis: { stroke: "#c9d45c" },
              axisLabel: { fontSize: 20, padding: 30 },
              grid: { stroke: "none" },
              ticks: { stroke: "#c9d45c", size: 5 },
              tickLabels: { fill: "#ffffff", fontSize: 15, padding: 5 }
            }}
          />
          <VictoryLine
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#df7970" },
              parent: { border: "1px solid #ccc" }
            }}
            data={c}
          />
          <VictoryLine
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#51cda0" },
              parent: { border: "1px solid #ccc" }
            }}
            data={true_y}
            labels={({ datum }) => "Error: er".replace("er", datum.e)}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>
      </div>
    );
  }
}

function rk4_step(f, x0, y0, x_final, n) {
  const h = (x_final - x0) / n;
  let x_i = x0;
  let y_i = y0;
  const y = [{ x: x_i, y: y_i }];
  let arrayIndex = 1;
  for (let i = 0; i < n; i++) {
    let k1 = deriv(x_i, y_i, f);
    let k2 = deriv(x_i + h / 2, y_i + (h * k1) / 2, f);
    let k3 = deriv(x_i + h / 2, y_i + (h * k2) / 2, f);
    let k4 = deriv(x_i + h, y_i + h * k3, f);
    y_i = y_i + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    x_i = x_i + h;
    y[arrayIndex] = { x: x_i, y: y_i };
    arrayIndex++;
  }
  //Returns array of all x and y values computed.
  return y;
}

function deriv(x_in, y_in, f) {
  return f(x_in, y_in);
}

function solution(x0, y0, x, f) {
  return f(x0, y0, x);
}

export default Rk4State;
