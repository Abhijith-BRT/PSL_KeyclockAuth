import Head from 'next/head';
import userManager from '../utils/authConfig';

export default function Home() {
  const handleLogin = () => {
    userManager.signinRedirect({ useReplaceToNavigate: true });
  };

  return (
    <>
      <Head>
        <title>Keycloak Login Example</title>
      </Head>

      <main style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1>Welcome to PSL Frontend</h1>
        <button
          onClick={handleLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login with Keycloak
        </button>
      </main>
    </>
  );
}
