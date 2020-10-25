import React, {Component} from 'react';
// todo maybe import some kind of button
import "../css/Portfolio.css"
import { getPortfolio, setPortfolioIsPrivate } from "../Api.js"

let styles = document.documentElement.style;

styles.setProperty('--test-colour', "blue");