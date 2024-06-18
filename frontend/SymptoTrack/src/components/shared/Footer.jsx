import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="text-center text-white" style={{ backgroundColor: '#f1f1f1' }}>
      <div className="container">
        <section>
          <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://github.com/Ray-Alessandro/SymptoTrack" target="_blank" rel="noopener noreferrer" role="button">
            <i className="fab fa-github"></i>
          </a>
          <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://www.linkedin.com/in/ray-alessandro-del-carmen-zorrilla-081352174/" target="_blank" rel="noopener noreferrer" role="button">
            <i className="fab fa-linkedin"></i>
          </a>
        </section>
      </div>

      <div className="text-center text-dark p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright: SympoTrack
      </div>
    </footer>
  );
}

export default FooterComponent;
