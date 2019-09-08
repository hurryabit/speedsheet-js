import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Footer: React.FC = () =>
  <footer className="fixed-bottom">
    <div className="footer-copyright text-center py-1">
      <span className="text-muted">© 2019 <a href="https://github.com/hurryabit/speedsheet" target="blank">Martin Huschenbett</a></span>
    </div>
  </footer>;

export default Footer;
