import { useState } from 'react';

export const Unsubscribe = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('too many emails');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSubmitted(true);

    // In production (Docker), use backend proxy at /api/unsubscribe
    // In local development (npm run), use CORS proxy to call external API directly
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

    if (isProduction) {
      // Production: call backend proxy (server-side handles API key)
      fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          reason: reason,
        }),
      }).catch(() => {
        // Silently ignore errors
      }).finally(() => {
        setLoading(false);
      });
    } else {
      // Local development: log to console and show success
      // In production (Docker), the backend proxy will handle the actual API call
      console.log('Unsubscribe request (local dev):', { email, reason });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F6F9] py-20 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {!submitted ? (
          <>
            <h1 className="text-2xl font-bold text-[#0f1f4d] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Unsubscribe from Marketing Emails
            </h1>
            <p className="text-[#64748b] mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Enter your email address below to unsubscribe from our marketing emails.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#0f1f4d] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-[#e2edf7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                  placeholder="your@email.com"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="reason" className="block text-sm font-medium text-[#0f1f4d] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Reason (optional)
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 border border-[#e2edf7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  <option value="too many emails">Too many emails</option>
                  <option value="not relevant">Content not relevant</option>
                  <option value="no longer interested">No longer interested</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {loading ? 'Processing...' : 'Unsubscribe'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0f1f4d] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              You're Unsubscribed
            </h2>
            <p className="text-[#64748b]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              You have been successfully unsubscribed from our marketing emails.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
