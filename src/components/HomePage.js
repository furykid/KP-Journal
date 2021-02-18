import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import loadingImg from './loading.gif';

function HomePage(props) {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'dev-eigcmqux.us.auth0.com';
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: ['read:journalEntries', 'write:journalEntries'],
        });
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { user_metadata } = await metadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserMetadata();
  }, []);

  if (isLoading) {
    return <img src={loadingImg} alt='loading...' />;
  }

  if (isAuthenticated) {
    return (
      <>
        <div className='jumbotron'>
          <h1> Home Page </h1>
          <div>{user.sub}</div>
          <Button
            className='btn btn-info'
            onClick={() => {
              props.history.push(`/journalEntries`);
            }}
          >
            Open Journal
          </Button>
          <div>
            {userMetadata ? (
              <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
            ) : (
              'no metadata defined'
            )}
          </div>
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
