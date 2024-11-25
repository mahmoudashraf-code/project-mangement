import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import useLocalStorage from "use-local-storage";
import { iUser } from '@/types/iuser';

export default function Auth() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [_, setToken] = useLocalStorage<boolean>("token", false);
  const [user] = useLocalStorage<iUser>("user", {
    email: "admin",
    password: "admin",
    name: "admin"
  });

  const validateSignIn = () => {
    if (!signInEmail || !signInPassword) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields for sign in.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateSignIn()) return; // Validate before proceeding

    try {
      if (signInEmail == user.email && signInPassword == user.password) {
        saveAndNavigate();
      } else {
        throw new Error("Not found")
      }
    } catch (error) {
      toast({
        title: 'Daily Tasks',
        description: 'Failed to sign in. Please check your credentials.',
        variant: 'destructive',
      });
    }
  };

  const saveAndNavigate = async () => {
    setToken(() => {
      navigate('/app');
      return true
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className='w-[500px]'>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Access your account by signing in.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signInEmail">Email</Label>
            <Input
              id="signInEmail"
              type="email"
              placeholder="Enter your email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signInPassword">Password</Label>
            <Input
              id="signInPassword"
              type="password"
              placeholder="Enter your password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleSignIn}>
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
