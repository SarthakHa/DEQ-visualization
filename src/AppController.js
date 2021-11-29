import "./styles.css";
import React from "react";
import InfoInput from "./InfoForm";
import DEQStates from "./DEQStates";
import MethodsForm from "./MethodsForm";

class AppController extends React.Component {
  state = {
    n: 2,
    x0: 0.0,
    y0: 1.0,
    x_final: 2.0,
    deriv_func: "-x * y^2",
    true_func: "2/((x^2)+(x0^2)+(2/y0))",
    midpoint: false,
    euler: false,
    rk3: false,
    rk4: true,
    rkf: false,
    epsilon: 0.00001
  };

  handleCallback = (
    n_data,
    x0_data,
    y0_data,
    x_final_data,
    deriv_func_data,
    true_func_data,
    epsilon_data
  ) => {
    this.setState({
      n: n_data,
      x0: x0_data,
      y0: y0_data,
      x_final: x_final_data,
      deriv_func: deriv_func_data,
      true_func: true_func_data,
      epsilon: epsilon_data
    });
    
  };

  handleMethodsCallback = (
    midpoint,
    euler,
    rk3,
    rk4,
    rkf
  ) => {
    this.setState({
      midpoint: midpoint,
      euler: euler,
      rk3: rk3,
      rk4: rk4,
      rkf: rkf
    });
  };

  render() {
    return (
      <div>
        <h1>ODE Approximation using Runge-Kutta Methods</h1>
        <div>
          <div className="checklist">
            <MethodsForm parentCallback={this.handleMethodsCallback}/>
          </div>
          <div className="DEQCss">
            <DEQStates
              data={[
                this.state.n,
                this.state.x0,
                this.state.y0,
                this.state.x_final,
                this.state.deriv_func,
                this.state.true_func,
                this.state.midpoint,
                this.state.euler,
                this.state.rk3,
                this.state.rk4,
                this.state.rkf,
                this.state.epsilon
              ]}
            />
          </div>
        </div>
        <div>
          <InfoInput parentCallback={this.handleCallback} />
        </div>
      </div>
    );
  }
}

export default AppController;
