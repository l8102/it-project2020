import React, { Component } from 'react';
import "../css/Footer.css"

// Footer explains Pear team member and copyright of website
class Footer extends Component {
  render() {
    return (
      <footer>
        <p>&copy; Copyright 2020, Eagle Solutions</p>
        <p>Gemma Seeley, Glenn Phillips, Jasmine Bond, Michael Lowe</p>
      </footer>
    )
  }
}

export default Footer;