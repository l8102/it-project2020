import React, {Component} from 'react';
import "../css/Footer.css"

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p className="footer-text">
          &copy; Copyright 2020, Eagle Solutions
        </p>
        <p className="footer-text">
          Gemma Seeley, Glenn Phillips, Jasmine Bond, Michael Lowe
        </p>
      </footer>
    )
  }
}

export default Footer;