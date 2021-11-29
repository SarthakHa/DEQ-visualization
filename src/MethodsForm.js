import "./styles.css";
import React from "react";

class MethodsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            midpoint: false,
            euler: false,
            rk3: false,
            rk4: true,
            rkf: false
        };
    }

    handleInputChange = (e) => {
        const t = e.target;
            this.setState({[t.name]: t.checked}, () => {this.onTrigger();}
        );
    }

    onTrigger = () => {
        this.props.parentCallback(
            this.state.midpoint,
            this.state.euler,
            this.state.rk3,
            this.state.rk4,
            this.state.rkf
        );
    };

    render () {
        return (
            <div>
                <div>
                <label className="methodLabel">
                    <input
                        type="checkbox"
                        className="methodChecks"
                        required
                        name="midpoint"
                        onChange={this.handleInputChange}
                        checked={this.state.midpoint}
                    />Midpoint</label>
                </div>

                <div>
                <label className="methodLabel">
                    <input
                        type="checkbox"
                        className="methodChecks"
                        required
                        name="euler"
                        onChange={this.handleInputChange}
                        checked={this.state.euler}
                    />Euler's</label>
                </div>
                
                <div>
                <label className="methodLabel">
                    <input
                        type="checkbox"
                        className="methodChecks"
                        required
                        name="rk3"
                        onChange={this.handleInputChange}
                        checked={this.state.rk3}
                    />Runga-Kutta 3rd Order</label>
                </div>

                <div>
                <label className="methodLabel">
                    <input
                        type="checkbox"
                        className="methodChecks"
                        name="RK 4"
                        name="rk4"
                        onChange={this.handleInputChange}
                        checked={this.state.rk4}
                    />Runga-Kutta 4th Order</label>
                </div>
                
                <div>
                <label className="methodLabel">
                    <input
                        type="checkbox"
                        className="methodChecks"
                        required
                        name="rkf"
                        onChange={this.handleInputChange}
                        checked={this.state.rkf}
                    />Runge–Kutta–Fehlberg</label>
                </div>
            </div>
        );
    }
}

export default MethodsForm;