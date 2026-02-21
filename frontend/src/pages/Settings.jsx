import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import { Settings as SettingsIcon, Save, Key, Globe, ShieldCheck, Loader2 } from 'lucide-react';

const Settings = () => {
    const [apiKey, setApiKey] = useState('');
    const [detectedProvider, setDetectedProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetchCurrentKey();
    }, []);

    const fetchCurrentKey = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/settings');
            const data = await response.json();
            const provider = data['ai.provider'] || 'gemini';
            const key = data[`${provider}.key`] || '';
            setApiKey(key);
            detectProvider(key);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const detectProvider = (key) => {
        if (!key) {
            setDetectedProvider(null);
            return;
        }
        if (key.startsWith('AIza')) {
            setDetectedProvider({ id: 'gemini', name: 'Google Gemini', color: 'text-blue-400' });
        } else if (key.startsWith('hf_')) {
            setDetectedProvider({ id: 'huggingface', name: 'Hugging Face', color: 'text-yellow-400' });
        } else if (key.length > 20) {
            setDetectedProvider({ id: 'cohere', name: 'Cohere AI', color: 'text-purple-400' });
        } else {
            setDetectedProvider(null);
        }
    };

    const handleKeyChange = (e) => {
        const val = e.target.value.trim();
        setApiKey(val);
        detectProvider(val);
    };

    const handleSave = async () => {
        if (!detectedProvider) {
            setStatus({ type: 'error', message: 'Invalid or unrecognized API key format.' });
            return;
        }

        setSaving(true);
        setStatus(null);

        const payload = {
            'ai.provider': detectedProvider.id,
            [`${detectedProvider.id}.key`]: apiKey
        };

        try {
            const response = await fetch('http://localhost:8080/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: `Successfully activated ${detectedProvider.name} engine!` });
            } else {
                throw new Error('Failed to update settings');
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Connection failed. Please check your network.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen bg-[#030712] items-center justify-center text-indigo-400">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#030712]">
            <Sidebar />

            <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-3xl mx-auto">
                    <header className="mb-12">
                        <h1 className="text-4xl font-extrabold mb-3 premium-gradient-text flex items-center gap-4">
                            <SettingsIcon size={36} className="text-indigo-400" />
                            AI Activation
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Paste your API key below. Our neural engine will automatically detect the provider.
                        </p>
                    </header>

                    <div className="space-y-8">
                        {/* Smart Key Input */}
                        <div className="glass-card p-10 border-indigo-500/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Key size={120} className="text-indigo-400 rotate-12" />
                            </div>

                            <div className="relative z-10">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 block">
                                    Neural Access Key
                                </label>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={apiKey}
                                            onChange={handleKeyChange}
                                            placeholder="Paste Gemini, Cohere, or Hugging Face key here..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none transition-all placeholder:text-gray-800"
                                        />
                                        {detectedProvider && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 animate-in fade-in zoom-in">
                                                <div className={`w-2 h-2 rounded-full bg-current ${detectedProvider.color} animate-pulse`}></div>
                                                <span className={`text-sm font-bold ${detectedProvider.color}`}>
                                                    {detectedProvider.name} Detected
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-40">
                                        <KeyGuide label="Gemini" prefix="AIza..." />
                                        <KeyGuide label="Hugging Face" prefix="hf_..." />
                                        <KeyGuide label="Cohere" prefix="Trial/Prod Keys" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Controls */}
                        <div className="flex flex-col items-center gap-6 pt-4">
                            <button
                                onClick={handleSave}
                                disabled={saving || !detectedProvider}
                                className={`premium-btn px-12 py-5 text-lg group ${(!detectedProvider || saving) ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Syncing Credentials...
                                    </>
                                ) : (
                                    <>
                                        <Save size={24} className="group-hover:scale-110 transition-transform" />
                                        Activate Neural Engine
                                    </>
                                )}
                            </button>

                            <div className="flex items-center gap-2 text-gray-600 text-sm italic">
                                <ShieldCheck size={16} className="text-green-900" />
                                Keys are encrypted and stored in your private local database.
                            </div>
                        </div>

                        {status && (
                            <div className={`p-6 rounded-2xl border text-base font-medium text-center animate-in fade-in slide-in-from-bottom-4 shadow-xl ${status.type === 'success'
                                ? 'bg-green-500/10 border-green-500/20 text-green-400 shadow-green-500/5'
                                : 'bg-red-500/10 border-red-500/20 text-red-400 shadow-red-500/5'
                                }`}>
                                {status.message}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

const KeyGuide = ({ label, prefix }) => (
    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center">
        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{label}</div>
        <div className="text-xs text-gray-400 font-mono">{prefix}</div>
    </div>
);

export default Settings;
