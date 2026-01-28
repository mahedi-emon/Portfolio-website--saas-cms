import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { refresh } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-sm rounded border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          This is a mocked login. Any input will sign you in as admin.
        </p>
      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          localStorage.setItem('portfolio.mockAuth', '{"isAuthenticated":true,"role":"admin"}');
          refresh();
          const next = new URLSearchParams(location.search).get('next') ?? '/admin/dashboard';
          navigate(next);
        }}
      >
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Email
            <input
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Password
            <input
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Sign in
        </button>
      </form>
      </div>
    </div>
  );
}
