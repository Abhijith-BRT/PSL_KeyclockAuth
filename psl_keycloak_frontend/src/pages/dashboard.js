import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/profile', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <p style={{ textAlign: 'center', marginTop: '5rem' }}>Not logged in. Redirecting...</p>;

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1>Welcome, {user.name || user.preferred_username}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <a
          href="http://localhost:5000/auth/logout"
          style={{
            padding: "8px 16px",
            backgroundColor: "red",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            marginTop: "1rem",
            display: "inline-block"
          }}
        >
          Logout
        </a>
      </main>
    </>
  );
}
