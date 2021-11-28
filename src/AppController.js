import "./styles.css";
import React from "react";
import InfoInput from "./InfoForm";
import Rk4State from "./Rk4";

class AppController extends React.Component {
  state = {
    n: 2,
    x0: 0.0,
    y0: 1.0,
    x_final: 2.0,
    deriv_func: "-x * y^2",
    true_func: "2/((x^2)+(x0^2)+(2/y0))" //not in implementation yet
  };

  handleCallback = (
    n_data,
    x0_data,
    y0_data,
    x_final_data,
    deriv_func_data,
    true_func_data
  ) => {
    this.setState({
      n: n_data,
      x0: x0_data,
      y0: y0_data,
      x_final: x_final_data,
      deriv_func: deriv_func_data,
      true_func: true_func_data
    });
  };

  render() {
    return (
      <div>
        <h1>Runge-Kutta Approximation</h1>
        <div className="RK4Css">
          <Rk4State
            data={[
              this.state.n,
              this.state.x0,
              this.state.y0,
              this.state.x_final,
              this.state.deriv_func,
              this.state.true_func
            ]}
          />
        </div>
        <InfoInput parentCallback={this.handleCallback} />
      </div>
    );
  }
}

export default AppController;
