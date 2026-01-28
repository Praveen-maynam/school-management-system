
import React, { useState } from 'react';

const TABS = [
  { key: 'sms', label: 'SMS Provider' },
  { key: 'email', label: 'Email Provider' },
  { key: 'payment', label: 'Payment Gateway' },
  { key: 'login', label: 'Login Methods' },
  { key: 'whiteLabel', label: 'White-labeling' },
  { key: 'security', label: 'Security' },
];

const PlatformSettingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sms');
  const [saving, setSaving] = useState(false);

  // Mock state for each section
  const [smsSettings, setSmsSettings] = useState({ provider: 'Twilio', apiKey: '' });
  const [emailSettings, setEmailSettings] = useState({ provider: 'SendGrid', apiKey: '' });
  const [paymentSettings, setPaymentSettings] = useState({ gateway: 'Stripe', publicKey: '', secretKey: '' });
  const [loginSettings, setLoginSettings] = useState({ methods: ['Email', 'Google'] });
  const [whiteLabel, setWhiteLabel] = useState({ enabled: false, logoUrl: '' });
  const [security, setSecurity] = useState({ twoFA: true, allowedIPs: '' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1200); // Simulate API call
    // TODO: Integrate with backend
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Platform Settings</h1>
      <div className="flex gap-2 mb-6 border-b">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === tab.key ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SMS Provider Settings */}
      {activeTab === 'sms' && (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Provider</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={smsSettings.provider}
              onChange={e => setSmsSettings(s => ({ ...s, provider: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">API Key</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={smsSettings.apiKey}
              onChange={e => setSmsSettings(s => ({ ...s, apiKey: e.target.value }))}
            />
          </div>
          <button type="submit" className={`w-full py-2 px-4 rounded text-white font-semibold transition ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={saving}>
            {saving ? 'Saving...' : 'Save SMS Settings'}
          </button>
        </form>
      )}

      {/* Email Provider Settings */}
      {activeTab === 'email' && (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Provider</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={emailSettings.provider}
              onChange={e => setEmailSettings(s => ({ ...s, provider: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">API Key</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={emailSettings.apiKey}
              onChange={e => setEmailSettings(s => ({ ...s, apiKey: e.target.value }))}
            />
          </div>
          <button type="submit" className={`w-full py-2 px-4 rounded text-white font-semibold transition ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={saving}>
            {saving ? 'Saving...' : 'Save Email Settings'}
          </button>
        </form>
      )}

      {/* Payment Gateway Settings */}
      {activeTab === 'payment' && (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gateway</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={paymentSettings.gateway}
              onChange={e => setPaymentSettings(s => ({ ...s, gateway: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Public Key</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={paymentSettings.publicKey}
              onChange={e => setPaymentSettings(s => ({ ...s, publicKey: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Secret Key</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={paymentSettings.secretKey}
              onChange={e => setPaymentSettings(s => ({ ...s, secretKey: e.target.value }))}
            />
          </div>
          <button type="submit" className={`w-full py-2 px-4 rounded text-white font-semibold transition ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={saving}>
            {saving ? 'Saving...' : 'Save Payment Settings'}
          </button>
        </form>
      )}

      {/* Login Methods Settings */}
      {activeTab === 'login' && (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Enabled Methods</label>
            <div className="flex gap-4">
              {['Email', 'Google', 'Microsoft', 'Apple'].map(method => (
                <label key={method} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={loginSettings.methods.includes(method)}
                    onChange={e => {
                      setLoginSettings(s => ({
                        methods: e.target.checked
                          ? [...s.methods, method]
                          : s.methods.filter(m => m !== method),
                      }));
                    }}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className={`w-full py-2 px-4 rounded text-white font-semibold transition ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={saving}>
            {saving ? 'Saving...' : 'Save Login Settings'}
          </button>
        </form>
      )}

      {/* White-labeling Settings */}
      {activeTab === 'whiteLabel' && (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={whiteLabel.enabled}
              onChange={e => setWhiteLabel(s => ({ ...s, enabled: e.target.checked }))}
            />
            <span className="text-gray-700 font-medium">Enable White-labeling</span>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Logo URL</label>
            <input
              type="url"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={whiteLabel.logoUrl}
              onChange={e => setWhiteLabel(s => ({ ...s, logoUrl: e.target.value }))}
              disabled={!whiteLabel.enabled}
            />
          </div>
          <button type="submit" className={`w-full py-2 px-4 rounded text-white font-semibold transition ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={saving}>
            {saving ? 'Saving...' : 'Save White-labeling Settings'}
          </button>
        </form>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={security.twoFA}
              onChange={e => setSecurity(s => ({ ...s, twoFA: e.target.checked }))}
            />
            <span className="text-gray-700 font-medium">Enable 2FA</span>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Allowed IPs (comma separated)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={security.allowedIPs}
              onChange={e => setSecurity(s => ({ ...s, allowedIPs: e.target.value }))}
            />
          </div>
          <button type="submit" className={`w-full py-2 px-4 rounded text-white font-semibold transition ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={saving}>
            {saving ? 'Saving...' : 'Save Security Settings'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PlatformSettingsScreen;
