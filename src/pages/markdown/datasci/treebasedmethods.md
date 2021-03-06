---
title: Tree Based Methods
path: "/markdown/datasci/treebasedmethods"
date: "2016-04-15"
draft: false
author: Jay Gatsby
tags:
  - remark
  - Kitchen Sink
  - Images
type: "datasci"
---

Overview
========

The point of tree-based methods is to segment our data into "branches" which can then be used as a generalization of all observations that fall into that specific segment.

Decision Trees
--------------

Regression trees are better than other regression models because they are easier to interpret and have nicer graphical representations Question: What are some other commonly used stopping criterion?

Tree Pruning
------------

Use cross validation to find the optimal number of "branches" to cut from the tree, making the tree more efficient Question: Are the lines for each of the branches proportional to the number of observations that "pass" through the criterion?

Classification Tree
-------------------

In contrast to regression trees, in classification trees, each observation is predicted to be the most commonly occurring class of training observations in the region to which it belongs. There are various ways of scoring qualitative classification trees, including Classification Error Rate, Gini Index, and Entropy, although Classification Error Rate is the best to use when the ultimate goal is prediction accuracy

Bagging
-------

Taking the average across many fitted decision trees to decrease variance. Question: What are some other approaches for bagging classification trees for qualitative variables besides majority vote? Question: Why does the test error flatline in figure 8.8 on text page 318? Why is the out of bag error so much lower?

Random Forests
--------------

Similar to bagging, just using a smaller number of variables (m), and uncorrelated trees (rather than bagging which tends to have correlated trees). Using a small number of  m will be helpful when there is a large number of correlated predictors.

Boosting
--------

Grows trees sequentially so that each tree is grown on information from the previous tree. Learns slowly but tends to be more accurate/effective when compared to the other methods.  

*   Put the splits between the first and second observation, that's a simple problem to find the optimal value, so a single scan can find the best split fairly easily
    *   For any split, you know RSS, so you choose the split that optimizes RSS
    *   Looping over splits within each predictor and over the predictors and you're finding the RSS that optimizes
*   How small should Gini be?
    *   Two answers: No real rule of thumb, much like RSS, it's hard to come up with an intuition, root mean squared is better than RSS
    *   50/50 isn't necessarily the worst case, only if two classes that are at 50% proportion in the overall dataset
*   Can you use importance from trees to then pick your variables to do prediction? No.
    *   Inferential reason: unless your second stage accounts for the first stage in variable selection, the second stage (i.e. not trees) is not going to know that you looked at the data and handpicked the "important" variables which may mean overfitting
        *   Special case: doctors can measure 200 things, but that's not practical, what 5 things can the doctor measure that will give the best prediction? Bolker would prefer to do aggressive pruning. You can run something else with the handpicked variables in this case, but it's better to just pick one strong method rather than a combination of two
        *   Examples include having one really strong knot to hold a load rather than tying two or three small knots, same goes with cryptography with many ciphers rather than just having one very strong level of security
        *   If you can find a strong principle method, it's better to have that than anything else