import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Log: React.FC = () =>
  <div className="col-3">
    <div className="form-group">
      <textarea /*id="log"*/ readOnly className="form-control"></textarea>
    </div>
    <div className="form-group">
      <button /*id="clear"*/ type="button" className="btn btn-primary col-12">Clear computation log</button>
    </div>
  </div>;

export default Log;
