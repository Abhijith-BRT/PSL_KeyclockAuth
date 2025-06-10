import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Keycloak Login Example</title>
        <meta name="description" content="Login with Keycloak + PassportJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1>Welcome to PSL Frontend</h1>
        <a
          href="http://localhost:5000/auth/login"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Login with Keycloak
        </a>
      </main>
    </>
  );
}
