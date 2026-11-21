import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

export const LoginPage: React.FC = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData.email, loginData.password);
    if (success) {
      // Check user role and redirect accordingly
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.role === 'ADMIN') {
          toast.success('Welcome Admin! Redirecting to admin dashboard...');
          navigate('/admin/dashboard');
        } else {
          toast.success('Login successful!');
          navigate(from, { replace: true });
        }
      }
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (signupData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const success = await signup(
      signupData.name,
      signupData.email,
      signupData.mobile,
      signupData.address,
      signupData.password
    );

    if (success) {
      toast.success('Account created successfully!');
      navigate(from, { replace: true });
    } else {
      toast.error('Email already exists');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="mb-2">Welcome to Shree Krushi Kendra</h1>
          <p className="text-gray-600">Login or create an account to continue</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email / Mobile Number</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="text"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>

                <Button type="button" variant="link" className="px-0 text-sm">
                  Forgot Password?
                </Button>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name *</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-email">Email Address *</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-mobile">Mobile Number *</Label>
                  <Input
                    id="signup-mobile"
                    name="mobile"
                    type="tel"
                    value={signupData.mobile}
                    onChange={handleSignupChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-address">Address *</Label>
                  <Input
                    id="signup-address"
                    name="address"
                    value={signupData.address}
                    onChange={handleSignupChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-password">Password *</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-confirm">Confirm Password *</Label>
                  <Input
                    id="signup-confirm"
                    name="confirmPassword"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
