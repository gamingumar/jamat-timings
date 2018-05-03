import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div className="col-sm-12 col-md-4">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><NavLink to={'/home'} activeStyle={styles.activeStyle}>Home</NavLink></li>
              <li><NavLink to={'/masjid'} activeStyle={styles.activeStyle}>Manage Masjids</NavLink></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const styles = {
  activeStyle: {
    fontWeight: 'bold',
    color: 'blue',
    fontSize: 16
  }
};