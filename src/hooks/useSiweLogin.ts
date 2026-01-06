import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';
import api from '../lib/api';

export function useSiweLogin() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (!address) throw new Error('Wallet not connected');
    setIsLoading(true);

    try {
      // 1. Get Nonce
      const { data: { nonce } } = await api.post('/api/auth/siwe/nonce', { address });

      // 2. Prepare Message
      // Ideally use a library like `siwe` to generate this string to ensure strict compliance
      const message = `Sign in with Ethereum to Gate402\nNonce: ${nonce}`;

      // 3. Sign Message
      const signature = await signMessageAsync({ message });

      // 4. Verify & Login
      const { data } = await api.post('/api/auth/siwe/verify', {
        message,
        signature,
      });

      // 5. Return data for AuthContext
      return { user: data.user, tokens: data.tokens };

    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
