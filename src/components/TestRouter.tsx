import React from 'react';
import { Link } from 'react-router-dom';

const TestRouter = function () {
  return (
    <div>
      <br />
      <Link to="/usersTest">Users Test</Link>
      <br />
      <Link to="/decksTest">Decks Test</Link>
      <br />
      <Link to="/home">Private Home Page</Link>
    </div>
  );
};

export default TestRouter;
