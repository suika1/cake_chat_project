import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h3>Sorry, it's wrong URL</h3>
    <p>
      You can navigate to <Link to="/">Home</Link> page:
    </p>
  </div>
);

export default NotFoundPage;
