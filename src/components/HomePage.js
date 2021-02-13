import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <img src='./loading.gif' alt='loading...' />;
  }

  if (isAuthenticated) {
    return (
      <>
        <div className='jumbotron'>
          <h1> Home Page </h1>
          <div>{JSON.stringify(user.sub)}</div>
          <p>
            Show some stats, maybe a calendar here? Then add a link to the
            journal entries page{' '}
          </p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='jumbotron'>
          <h1>Welcome, please sign in</h1>
        </div>
      </>
    );
  }
}

export default HomePage;
