---
title: "Regression Model Selection"
path: "/markdown/datasci/regressionmodelsel"
date: "2016-04-15"
draft: false
author: Jay Gatsby
tags:
  - remark
  - Kitchen Sink
  - Images
type: "datasci"
---

Notes on when to use different regression models and how they work. From the book Introduction to Statistical Learning (ISL).

Standard/OLS
------------

Standard regression method where there is no constraint on the mean-squared error (MSE). Estimates the parameters $\beta_0, \beta_1, ... , \beta_p$ using the values that minimize the residual sum of squares (RSS):

$$
RSS = \displaystyle\sum_{i=1}^{n} \Bigg(y_i -\beta_0 - \sum_{j=1}^{p} \beta_j x_{i,j} \Bigg)^2
$$

 

Ridge
-----

*   Uses the L-1 or Taxicab Norm (see below)
*   Penalizes "irrelevant" variables and keeps "relevant" variables when there are many variables in the model
*   Used when the data suffers from multicollinearity (i.e. high correlation across variables)
*   Normality is not to be assumed
*   While $\beta$

Ridge Regression uses a similar method as standard linear regression, but we add a shrinking penalty. When the estimations for $\beta_0, ... , \beta_p$ are close to zero, they shrink even closer to 0 with a shrinking penalty. Mathematically, the shrinking penalty is defined as:

$$
penalty = \lambda \displaystyle\sum_{j=1}^{p} \beta_j ^2
$$

where $\lambda \geq 0$ is a tuning parameter. The shrinkage penalty is added onto the calculation for RSS i.e.

$$
\displaystyle\sum_{i=1}^{n} \Bigg(y_i -\beta_0 - \sum_{j=1}^{p} \beta_j x_{i,j} \Bigg)^2 +  \lambda \displaystyle\sum_{j=1}^{p} \beta_j ^2
$$

*   When $\lambda = 0$ the penalty term will have no effect, but as $\lambda \rightarrow \infty$, the penalty has more impact, and the estimates for the coefficients $\beta_1, ... , \beta_p$ will approach zero.

\[caption id="" align="aligncenter" width="358"\]![geometric interpretation of ridge regression](https://onlinecourses.science.psu.edu/stat857/sites/onlinecourses.science.psu.edu.stat857/files/lesson04/ridge_regression_geomteric/index.png) Found this picture [here](https://onlinecourses.science.psu.edu/stat857/node/155/). "The ellipses correspond to the contours of residual sum of squares (RSS): the inner ellipse has smaller RSS, and RSS is minimized at ordinal least square (OLS) estimates."\[/caption\]  

LASSO
-----

*   Is an acronym for Least Absolute Shrinkage and Selection Operator

![L1_and_L2_balls.svg](https://lkrenn.files.wordpress.com/2018/09/l1_and_l2_balls-svg.png)
------------------------------------------------------------------------------------------

 

Elastic Band
------------

to be completed...