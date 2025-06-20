import { useEffect, useState } from 'react';
import Head from 'next/head';
import userManager from '../utils/authConfig';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    userManager.getUser().then((user) => {
      if (user && !user.expired) {
        setUser(user.profile);
        axios.get('http://192.168.200.120:5000/profile', {
          headers: {
            Authorization: `Bearer ${user.access_token}`
          }
        }).then(res => {
          console.log('Profile data from backend:', res.data);
        }).catch(err => {
          console.error('API error:', err);
        });
      } else {
        userManager.signinRedirect(); // redirect again if token expired
      }
    });
  }, []);

  if (!user) return <p>Loading user info...</p>;

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1>Welcome, {user.name || user.preferred_username}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button
          onClick={() => userManager.signoutRedirect()}
          style={{
            padding: "8px 16px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </main>
    </>
  );
}
