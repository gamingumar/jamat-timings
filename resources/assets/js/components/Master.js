import React, {Component} from 'react';
import Navbar from './Navbar';

export default class Master extends Component {
  render() {
    return (
      <div className="container">
        <div className={'row justify-content-center'}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Welcome to Masjid Dashboard</div>
              <div className="card-body">
                <div className={'row'}>
                  <Navbar />
                  <div className={'col-sm-12 col-md-8'}>
                    {this.props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

