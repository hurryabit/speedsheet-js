import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Log from './Log';
import Sheet from './Sheet';
import 'bootstrap/dist/css/bootstrap.css';

const App: React.FC = () =>
  <React.Fragment>
    <div className="container">
      <Header />

      <div className="row">
        <Sheet />
        <Log />
      </div>
    </div>

    <Footer />
  </React.Fragment>;

export default App;
