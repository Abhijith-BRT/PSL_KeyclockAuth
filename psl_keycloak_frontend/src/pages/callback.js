import { useEffect } from 'react';
import { useRouter } from 'next/router';
import userManager from '../utils/authConfig';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    userManager.signinRedirectCallback().then(() => {
      router.push('/dashboard');
    }).catch((err) => {
      console.error('Callback error:', err);
    });
  }, [router]);

  return <p>Processing login...</p>;
}
