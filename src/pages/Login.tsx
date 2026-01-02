import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useSiweLogin } from '../hooks/useSiweLogin';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const { isConnected } = useAccount();
  const { login, isLoading } = useSiweLogin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to sign in', {
        description: error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Gate402</CardTitle>
          <CardDescription>
            Sign in with your Ethereum wallet to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {!isConnected && (
             <ConnectButton />
          )}
          
          {isConnected && (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex justify-center w-full">
                 <ConnectButton showBalance={false} />
              </div>
              <Button 
                onClick={handleLogin} 
                disabled={isLoading}
                className="w-full"
                variant="default"
              >
                {isLoading ? 'Signing in...' : 'Sign in with Ethereum'}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
            By connecting your wallet, you agree to our Terms of Service.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
