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

class DEQStates extends React.Component {

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

    let midpoint = this.props.data[6];
    let euler = this.props.data[7];
    let rk3 = this.props.data[8];
    let rk4 = this.props.data[9];
    let rkf = this.props.data[10];

    let expr = parser.parse(this.props.data[4]);
    let f = expr.toJSFunction("x, y");

    expr = parser.parse(this.props.data[5]);
    let soln_f = expr.toJSFunction("x0, y0, x");

    const n = this.props.data[0];
    let x_final = parseFloat(this.props.data[3]);
    let x0 = parseFloat(this.props.data[1]);
    let y0 = parseFloat(this.props.data[2]);

    let euler_array = euler_step(f, x0, y0, x_final, n);

    let midpoint_array = midpoint_step(f, x0, y0, x_final, n);

    let rk3_array = rk3_step(f, x0, y0, x_final, n);

    let rk4_array = rk4_step(f, x0, y0, x_final, n);

    let epsilon = this.props.data[11];

    let rkf_array = rkf_step(f, x0, y0, x_final, n, epsilon)

    let methodLabels = []
    let index = 0;
    if(euler === true){
      methodLabels[index] = { name: "Euler", symbol: { fill: "#4c9ca0" } };
      index++;
    }
    if(midpoint === true){
      methodLabels[index] = { name: "Midpoint", symbol: { fill: "#c9d45c" } };
      index++;
    }
    if(rk3 === true){
      methodLabels[index] = { name: "RK 3", symbol: { fill: "#51cda0" } };
      index++;
    }
    if(rk4 === true){
      methodLabels[index] = { name: "RK 4", symbol: { fill: "#df7970" } };
      index++;
    }
    if(rkf === true){
      methodLabels[index] = { name: "RKF", symbol: { fill: "#02796b" } };
      index++;
    }

    /*const true_y = [];
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
    */
    return (
      <div className="Rk4State">
        <VictoryChart
          theme={VictoryTheme.material}
          //containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryLegend
            x={200} //120
            y={20}
            itemsPerRow={2}
            title="Legend"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{
              border: { stroke: "black", fill: "white" },
              title: { fill: "black", fontSize: 15 }
            }}
            /*data={[
              //{ name: "True Function", symbol: { fill: "#51cda0" } },
              (midpoint === true) && ({ name: "Midpoint", symbol: { fill: "#c9d45c" } }),
              (euler === true) && ({ name: "Euler", symbol: { fill: "#4c9ca0" } }),
              (rk3 === true) && ({ name: "RK 3", symbol: { fill: "#51cda0" } }),
              (rk4 === true) && ({ name: "RK 4", symbol: { fill: "#df7970" } }),
              (rkf === true) && ({ name: "RKF", symbol: { fill: "#02796b" } })
            ]}*/
            data={methodLabels}
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
          {/* 
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
          />*/}

          {midpoint === true && (<VictoryLine
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#c9d45c" },
              parent: { border: "1px solid #ccc" }
            }}
            data={midpoint_array}
          />)}

          {euler === true && (<VictoryLine
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#4c9ca0" },
              parent: { border: "1px solid #ccc" }
            }}
            data={euler_array}
          />)}

          {rk3 === true && (<VictoryLine
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#51cda0" },
              parent: { border: "1px solid #ccc" }
            }}
            data={rk3_array}
          />)}

          {rk4 === true && (<VictoryLine
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#df7970" },
              parent: { border: "1px solid #ccc" }
            }}
            data={rk4_array}
          />)}

          {rkf === true && (<VictoryLine
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#02796b" },
              parent: { border: "1px solid #ccc" }
            }}
            data={rkf_array}
          />)}
          
        </VictoryChart>
      </div>
    );
  }
}

function euler_step(f, x0, y0, x_final, n) {
  const h = (x_final - x0) / n;
  let x_i = x0;
  let y_i = y0;
  const y = [{ x: x_i, y: y_i }];
  let arrayIndex = 1;
  for (let i = 0; i < n; i++) {
    y_i = y_i + h * deriv(x_i, y_i, f);
    x_i = x_i + h;
    y[arrayIndex] = { x: x_i, y: y_i };
    arrayIndex++;
  }
  //Returns array of all x and y values computed.
  return y;
}

function midpoint_step(f, x0, y0, x_final, n) {
  const h = (x_final - x0) / n;
  let x_i = x0;
  let y_i = y0;
  const y = [{ x: x_i, y: y_i }];
  let arrayIndex = 1;
  for (let i = 0; i < n; i++) {
    let k1 = deriv(x_i, y_i, f);
    let k2 = deriv(x_i + h/2, y_i + h * k1, f);

    y_i = y_i + h * k2;
    x_i = x_i + h;
    y[arrayIndex] = { x: x_i, y: y_i };
    arrayIndex++;
  }
  //Returns array of all x and y values computed.
  return y;
}

function rk3_step(f, x0, y0, x_final, n) {
  const h = (x_final - x0) / n;
  let x_i = x0;
  let y_i = y0;
  const y = [{ x: x_i, y: y_i }];
  let arrayIndex = 1;
  for (let i = 0; i < n; i++) {
    let k1 = deriv(x_i, y_i, f);
    let k2 = deriv(x_i + h / 2, y_i + (h * k1) / 2, f);
    let k3 = deriv(x_i + h / 2, y_i - (h * k1) + (2 * h * k2), f);
    
    y_i = y_i + (h / 6) * (k1 + 4 * k2 + k3);
    x_i = x_i + h;
    y[arrayIndex] = { x: x_i, y: y_i };
    arrayIndex++;
  }
  //Returns array of all x and y values computed.
  return y;
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

function rkf_step(f, x0, y0, x_final, n, epsilon_) {
  let h = (x_final - x0) / n;
  let epsilon = epsilon_;
  let x_i = x0;
  let y_i = y0;
  const y = [{ x: x_i, y: y_i }];
  let arrayIndex = 1;
  while(x_i < x_final) {
    let k1 = h * deriv(x_i, y_i, f);
    let k2 = h * deriv(x_i + h/4, y_i + k1/4, f);
    let k3 = h * deriv(x_i + 3*h/8, y_i + 3*k1/32 + 9*k2/32, f);
    let k4 = h * deriv(x_i + 12*h/13, y_i + 1932*k1/2197 - 7200*k2/2197 + 7296*k3/2197, f);
    let k5 = h * deriv(x_i + h, y_i + 439*k1/216 - 8*k2 + 3680*k3/513 -845*k4/4104, f);
    let k6 = h * deriv(x_i + h/2, y_i - 8*k1/27 + 2*k2 - 3544*k3/2565 + 1859*k4/4104 - 11*k5/40, f);
    
    let y1 = y_i + 25*k1/216 + 1408*k3/2565 + 2197*k4/4104 - 1*k5/5;
    let y2 = y_i + 16*k1/135 + 6656*k3/12825 + 28561*k4/56430 - 9*k5/50 + 2*k6/55;

    let R = (1/h) * (Math.abs(y2 - y1));

    let delta = 0.84 * (epsilon/R)**(1/4);

    if (R <= epsilon) {
      y_i = y1;
      x_i = x_i + h;
      y[arrayIndex] = { x: x_i, y: y_i };
      h = delta*h;
      arrayIndex++;
    }else{
      h = delta*h;
    }
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

export default DEQStates;
