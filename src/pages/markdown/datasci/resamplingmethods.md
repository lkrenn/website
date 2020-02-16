---
title: Resampling Methods
path: "/markdown/datasci/resample"
date: "2016-04-15"
draft: false
author: Jay Gatsby
tags:
  - remark
  - Kitchen Sink
  - Images
type: "datasci"
---

As taken from an Introduction to Statistical Learning (ISL)

Overview
--------

Resampling methods involve taking different samples of your whole training data set and fitting  a model on these smaller samples to obtain additional information about the fitted model. Some examples include repeatedly drawing different samples from the training data to examine how the variances among the samples differ. Can be computationally expensive

Cross-Validation
----------------

Can be used to estimate the test error associated with a given statistical learning method in order to evaluate its performance, or to select the appropriate level of flexibility Training Error Rate - The error rate associated with your model on the training data Test Error Rate - Average error that results from using a model on a new set of data (not used in your training data) Model Assessment - The process of evaluating a model's performance Model Selection - The process of selecting the proper level of flexibility

### Validation Set Approach

Randomly dividing the available set of observations into two parts, training and validation/hold-out The model is fit on the training set and the fitted model is used to predict the responses for the observations in the validation set. The resulting "validation set error rate" (typically the mean squared error) provides an estimate of the test error rate. This can be done multiple times to get a better understanding of how the MSE changes. Q: What would make the MSE so high vs so low? Simple, easy to implement but has two drawbacks:

1.  The validation estimate of the test error can be highly variable depending on precisely which observations are included in the validation set
2.  Only a subset is used to fit the model. May perform worse on fewer observations and overestimate the test error rate for the model fit on the entire data set

Q: Would it be correct to say that it would work best when n is large? Something about the central limit theorem?

### Leave-One-Out Cross Validation

Attempts to address the drawbacks of the validation set Approach A single observation is used as the test data and the model is fit on the n-1 observations. The excluded observation's MSE provides an approximately unbiased estimate for the test error. One drawback is that it may provide a poor estimate because it would be highly variable, but the point of this method is to run the model over all n observations and then take the average Advantages over Validation Set Approach:

1.  It has far less bias since each iteration of fitting the data contains n-1 observations
    *   Tends to not overestimate the test error rate as much as VSA
2.  Since VSA yields different results when applied repeatedly, performing LOOCV multiple times will  always yield the same results i.e. no randomness

LOOCV can be expensive to implement if n is large, but when using least squares or polynomial regression, there's a shortcut that makes the cost the same as a single fit

$\frac{1}{n} \displaystyle\sum_{i=1}^{n} \left( \frac{y\_i - \hat{y}\_i }{1-h_i} \right)^2$

LOOCV is very general and can be applied to any predictive modelling method.  

### k-Folds Cross Validation

Same idea as before, only difference is you split the data into k equal sections and leave one of the k sections as the validation set. The rest of the k-1 sets of data are used as the training data. LOOCV is a special case of k-Fold Cross Validation in which k=n Typically k=5 or k=10 is used. There are some advantages and disadvantages including:

1.  Less computationally expensive when compared to LOOCV
2.  Very general and can be applied to almost any statistical learning method
3.  There are other advantages involving the bias-variance trade-off

Q: Is the auto data a good example to use? There are not many observations so naturally k-fold will look a lot like LOOCV

### Bias-Variance Trade-off for k-Folds CV

We know one of the advantages for k-Folds CV is it's computational advantage, but it also often gives more accurate estimates of the test error rate than LOOCV Since VSA only uses half of the data, it can lead to overestimates of the test error rate. With LOOCV it will give you an almost unbiased estimate of the test error rate, and so it would be the most effective in the perspective of bias reduction It turns out that LOOCV has higher variance than k-fold with k<n. Why is this? When we use LOOCV, we are averaging outputs of n fitted models which are all almost identical, therefore highly correlated. In contrast, k-Fold CV averages the output of only k-fitted models that are somewhat less correlated as the overlap between training sets is smaller. Since the mean of highly correlated quantities has higher variance than many quantities that are not as highly correlated, the test error estimate resulting from LOOCV tends to have higher variance than does the test error estimate resulting from k-folds.  

Cross-Validation on Classification Problems
-------------------------------------------

Cross validation can be a useful approach in the classification setting when Y is qualitative. In this case, rather than looking at MSE, we will use the number of mis-classified observations. Logistic regression does not have enough flexibility to model the Bayes decision boundary in this setting, we can instead extend the logistic regression to obtain a non-linear decision boundary by using polynomial functions of the predictors. For example, a quadratic logistic regression model would be of the form:

$log\left( \frac{p}{1-p} \right) = \beta\_0 + \beta\_1 X\_1 + \beta\_2 X\_1^2 + \beta\_3 X\_2 + \beta\_4 X_2 ^2$

We can use cross validation to see how well our model compares across different polynomials. Q: figure 5.8 why does the blue line go to 0? The training error rate declines as the method becomes more flexible and so we see that the training error rate cannot be used to select the optimal value for k

Bootstrap
---------

Used to quantify the uncertainty associated with a given estimator or statistical learning method. For example, the bootstrap can be used to estimate the standard errors of the coefficients from a linear regression fit. Rather than repeatedly obtaining independent data sets from the population, we instead obtain distinct data sets by repeatedly sampling observations from the original data set. The advantage of the bootstrap is that it can be applied to a wide range of statistical learning methods including some for which a measure of variability is otherwise difficult to obtain and is not automatically output by statistical software Not really useful for linear regression since R can output the standard errors automatically. Basically, the process is as follows:

1.  Take samples of n observations (with replacement) to produce a bootstrap data set
2.  Use the new bootstrap sets to produce estimates for your parameter
3.  Repeat B times to get B different estimates for your parameter
4.  Use the following equation to compute the standard error of these estimates:

$SE\_B (\hat{\alpha}) = \sqrt{\frac{1}{B-1} \displaystyle\sum\_{r=1}^{B} \left( \hat{\alpha} ^ {\star r} - \frac{1}{B} \displaystyle\sum_{r' = 1}^{B} \hat{\alpha} ^ {\star r'} \right) ^2 }$

Q: Since the bootstrap data sets need to be distinct, is the maximum amount of datasets equal to n^n Time series and other dependent data makes the bootstrap hard to work with, so you might want to use block bootstrap instead In R, there is a sample function to implement bootstrapping: sample( 1:n , size = n) # Given this set of n numbers, give me a random sample of n for each sample, refit the model & extract the parameters. The distribution of the parameters is the bootstrap estimate of the parameters which can be used to get the confidence interval of the parameter. Bootstrapping can be trivially distributed i.e. if you have 1000 computers, you can distribute the problem easily.   BB Notes: Small sample sizes means that the bootstrap is also hard to work with. There is almost always a better solution than the bootstrap when sample size is low. Worked out in a lot of cases, and as long as your data set is large, you're fine Cross validation is for estimating oos error bootstrapp is for estimating variation in a parameter estimate bootstrapping a small sample for the mean is fine, but a data set with 4 data points for variance, you may get all the same aka variance is 0. Locations (mean median) are fine, but scales and dispersion/uncertainty of dispersion where scales are anything in higher moments.   End BB Notes

Motivation
----------

*   When we perform cross-validation our goal might be to determine how well a procedure can be expected to perform on independent data.
    *   In this case, the estimate of the MSE would be of interest
*   Other times we are interested only in the location of the minimum point in the estimates MSE curve
    *   If we are using different models or the same model with different flexibilities, we want to find the one with the lowest MSE.