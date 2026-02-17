import React, { useState } from 'react';
import { onboardUser } from '../../services/onboardingService';

const roles = [
  { id: 'admin', name: 'Admin' },
  { id: 'teacher', name: 'Teacher' },
  { id: 'student', name: 'Student' },
  { id: 'parent', name: 'Parent' },
  { id: 'superadmin', name: 'Super Admin' },
  { id: 'staff', name: 'Staff' },
];

const OnboardingForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');
    const result = await onboardUser({ name, email, role });
    if (result.success) {
      setFeedback('User onboarded successfully!');
      setName('');
      setEmail('');
      setRole('');
    } else {
      setFeedback(result.message || 'Onboarding failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>Onboard New User</h2>
      <div>
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required type="email" />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={e => setRole(e.target.value)} required>
          <option value="">Select role</option>
          {roles.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading}>Onboard</button>
      {feedback && <div style={{ marginTop: 10 }}>{feedback}</div>}
    </form>
  );
};

export default OnboardingForm;
