import "./styles.css";
import React from "react";
import { Parser } from "expr-eval";

class InfoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 2,
      x_final: 2.0,
      x_final_to_send: 2.0,
      x0: 0.0,
      x0_to_send: 0.0,
      y0: 1.0,
      y0_to_send: 1.0,
      deriv_func: "-x * y^2",
      deriv_func_to_send: "-x * y^2",
      deriv_func_status: "Good function",
      true_func: "2/((x^2)+(x0^2)+(2/y0))",
      true_func_to_send: "2/((x^2)+(x0^2)+(2/y0))",
      true_func_status: "Good function",
      epsilon: 0.00001,
      epsilon_to_send: 0.00001,
      epsilon_status: ""
    };
  }

  handleEpsilonChange = (e) => {
    if (e.target.value === "") {
      this.setState({ epsilon: e.target.value }, () => {});
    } else if(e.target.value <= 0.0){
      this.setState({ epsilon: e.target.value, epsilon_status: "(Re-enter, must be positive value)" }, () => {});
    }else {
      this.setState({ epsilon: e.target.value, epsilon_to_send: e.target.value, epsilon_status: "" }, () => {
        this.onTrigger();
      });
    }
  }

  handleNChange = (e) => {
    this.setState({ n: e.target.value }, () => {
      this.onTrigger();
    });
  };

  handlex0Change = (e) => {
    if (e.target.value === "") {
      this.setState({ x0: e.target.value }, () => {});
    } else {
      this.setState({ x0: e.target.value, x0_to_send: e.target.value }, () => {
        this.onTrigger();
      });
    }
  };

  handley0Change = (e) => {
    if (e.target.value === "") {
      this.setState({ y0: e.target.value }, () => {});
    } else {
      this.setState({ y0: e.target.value, y0_to_send: e.target.value }, () => {
        this.onTrigger();
      });
    }
  };

  handlexfinalChange = (e) => {
    if (e.target.value === "") {
      this.setState({ x_final: e.target.value }, () => {});
    } else {
      this.setState(
        { x_final: e.target.value, x_final_to_send: e.target.value },
        () => {
          this.onTrigger();
        }
      );
    }
  };

  handleDerivFuncChange = (e) => {
    try {
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

      let expr = parser.parse(e.target.value);
      let f = expr.toJSFunction("x, y");
      f(2, 3);
      this.setState(
        {
          deriv_func_to_send: e.target.value,
          deriv_func: e.target.value,
          deriv_func_status: "Good function"
        },
        () => {
          this.onTrigger();
        }
      );
    } catch (error) {
      if (error.message === "unexpected TEOF: EOF") {
        this.setState({
          deriv_func: e.target.value,
          deriv_func_status: "Badly formatted function, please re-enter"
        });
      } else {
        this.setState({
          deriv_func: e.target.value,
          deriv_func_status: "Badly formatted function, er".replace(
            "er",
            error.message
          )
        });
      }
    }
  };

  handleTrueFuncChange = (e) => {
    try {
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

      let expr = parser.parse(e.target.value);
      let f = expr.toJSFunction("x0, y0, x");
      f(2, 3, 1);
      this.setState(
        {
          true_func_to_send: e.target.value,
          true_func: e.target.value,
          true_func_status: "Good function"
        },
        () => {
          this.onTrigger();
        }
      );
    } catch (error) {
      if (error.message === "unexpected TEOF: EOF") {
        this.setState({
          true_func: e.target.value,
          true_func_status: "Badly formatted function, please re-enter"
        });
      } else {
        this.setState({
          true_func: e.target.value,
          true_func_status: "Badly formatted function, er".replace(
            "er",
            error.message
          )
        });
      }
    }
  };

  onTrigger = () => {
    this.props.parentCallback(
      this.state.n,
      this.state.x0_to_send,
      this.state.y0_to_send,
      this.state.x_final_to_send,
      this.state.deriv_func_to_send,
      this.state.true_func_to_send,
      this.state.epsilon_to_send
    );
  };

  render() {
    return (
      <div>
        <form>
          <label>n = {this.state.n}</label>
          <input
            type="range"
            min="1"
            max="50"
            required
            value={this.state.n}
            onChange={this.handleNChange}
          />
          <label>x-initial</label>
          <input
            type="number"
            required
            value={this.state.x0}
            onChange={this.handlex0Change}
          />
          <label>y-initial</label>
          <input
            type="number"
            required
            value={this.state.y0}
            onChange={this.handley0Change}
          />
          <label>x-final</label>
          <input
            type="number"
            required
            value={this.state.x_final}
            onChange={this.handlexfinalChange}
          />
          <label>epsilon - threshold for Runge-Kutta Fehlberg Method {this.state.epsilon_status}</label>
          <input
            type="number"
            required
            value={this.state.epsilon}
            onChange={this.handleEpsilonChange}
          />
          <label>Derivative function ({this.state.deriv_func_status})</label>
          <input
            type="text"
            required
            value={this.state.deriv_func}
            onChange={this.handleDerivFuncChange}
          />
          {/*<label>True solution function ({this.state.true_func_status})</label>
          <input
            type="text"
            required
            value={this.state.true_func}
            onChange={this.handleTrueFuncChange}
          />*/}
        </form>
      </div>
    );
  }
}

export default InfoInput;
