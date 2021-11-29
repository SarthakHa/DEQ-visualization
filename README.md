# DEQ-visualization

A visualizer to show how differential equations can be numerically approximated using different Runge-Kutta numerical methods.

## Quick Start
View this react app on netlify by clicking on the badge below.

[![Netlify Status](https://api.netlify.com/api/v1/badges/a732c035-b9ca-4200-85f4-1ff300caf34f/deploy-status)](https://sarthak-deq.netlify.app/)

**Scroll down on the webpage to edit the function that is being approximated.**

Here are the parameters and what they mean:
- n = number of steps to take. Is used to calculate h (step size) as <img src="https://render.githubusercontent.com/render/math?math=\frac{x-final - x-initial}{ 2}">
- x-initial = Initial value of x at starting point
- y-initial = Initial value of y at starting point
- x-final = point at which we are trying to estimate y
- epsilon = the threshold at which step-size is recalculated AND y-value is recalculated, essentially the error threshold beyond which approximation is recomputed
- Derivative function = this is the differential function that we are approximating

### Supports: 
- Euler's method
- Midpoint method
- Runge-Kutta 3rd Order (RK3) method
- Runge-Kutta 4th Order (RK4) method
- Runge-Kutta-Fehlberg (RK45/RKF) method
