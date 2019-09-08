import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Header: React.FC = () =>
  <div className="row">
    <div className="col">
      <div className="jumbotron">
        <h1 className="display-4">SpeedSheet</h1>
        <p className="lead">Like a spreadsheet. But in fast.</p>
      </div>
    </div>
  </div>;

export default Header;
