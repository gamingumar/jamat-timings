import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div className="col-sm-12 col-md-2">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><Link to={'/home'}>Home</Link></li>
              <li><Link to={'/masjid'}>Masjid</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}