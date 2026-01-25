import React from 'react'
import withAuth from '../utils/withAuth.jsx';

function HomeComponent() {
  return (
    <div>
      <h1>Welcome to PingUp</h1>
    </div>
  )
}

export default withAuth(HomeComponent);
