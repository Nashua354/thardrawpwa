'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import DynamicForm from '@/components/DynamicForm';
import { loadDraftSchema, saveDraftSchema, loadPublishedSchema, savePublishedSchema } from '@/lib/storage';
import { FormSchema, DEFAULT_FORM_SCHEMA } from '@/lib/schema';
import { showToast } from '@/lib/toast';

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
    const [schemaText, setSchemaText] = useState('');
    const [previewSchema, setPreviewSchema] = useState<FormSchema>(DEFAULT_FORM_SCHEMA);

    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'changeme';
    const allowSaveLocal = process.env.NEXT_PUBLIC_ALLOW_SAVE_LOCAL === 'true';
    const schemaUrl = process.env.NEXT_PUBLIC_SCHEMA_URL;

    useEffect(() => {
        // Load draft schema on mount
        const draft = loadDraftSchema();
        if (draft) {
            setSchemaText(JSON.stringify(draft, null, 2));
            setPreviewSchema(draft);
        } else {
            setSchemaText(JSON.stringify(DEFAULT_FORM_SCHEMA, null, 2));
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === adminPassword) {
            setIsAuthenticated(true);
            showToast.success('Welcome to admin interface');
        } else {
            showToast.error('Invalid password');
        }
    };

    const handleSchemaChange = (value: string) => {
        setSchemaText(value);
        try {
            const parsed = JSON.parse(value);
            setPreviewSchema(parsed);
        } catch (error) {
            console.warn('Invalid JSON:', error);
        }
    };

    const handleSaveDraft = () => {
        try {
            const parsed = JSON.parse(schemaText);
            saveDraftSchema(parsed);
            showToast.success('Draft saved to localStorage');
        } catch (error) {
            showToast.error('Invalid JSON format');
        }
    };

    const handlePublish = async () => {
        try {
            const parsed = JSON.parse(schemaText);

            if (allowSaveLocal) {
                savePublishedSchema(parsed);
                showToast.success('Schema published to localStorage');
            } else {
                showToast.error('Local publishing disabled');
            }
        } catch (error) {
            showToast.error('Invalid JSON format');
        }
    };

    const handleLoadFromUrl = async () => {
        if (!schemaUrl) {
            showToast.error('No schema URL configured');
            return;
        }

        try {
            const response = await fetch(schemaUrl);
            if (!response.ok) throw new Error('Failed to fetch');

            const schema = await response.json();
            const formatted = JSON.stringify(schema, null, 2);
            setSchemaText(formatted);
            setPreviewSchema(schema);
            showToast.success('Schema loaded from URL');
        } catch (error) {
            showToast.error('Failed to load from URL');
        }
    };

    const handleLoadPublished = async () => {
        try {
            const schema = await loadPublishedSchema();
            const formatted = JSON.stringify(schema, null, 2);
            setSchemaText(formatted);
            setPreviewSchema(schema);
            showToast.success('Published schema loaded');
        } catch (error) {
            showToast.error('Failed to load published schema');
        }
    };

    if (!isAuthenticated) {
        return (
            <AppShell title="Admin Login">
                <div className="max-w-sm mx-auto space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-off-white">Admin Access</h1>
                        <p className="text-sand/80">Enter password to access schema editor</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-sand mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-charcoal/30 border border-sand/30 rounded-xl text-off-white placeholder-sand/50 focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand"
                                placeholder="Enter admin password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-sand text-charcoal font-bold py-3 rounded-2xl hover:bg-sand/90 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sand/50"
                        >
                            Login
                        </button>
                    </form>

                    <div className="text-center">
                        <button
                            onClick={() => router.push('/')}
                            className="text-sand/70 hover:text-sand text-sm transition-colors"
                        >
                            Back to App
                        </button>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell showBackButton title="Schema Editor">
            <div className="space-y-6">
                {/* Tab Navigation */}
                <div className="flex bg-charcoal/30 rounded-xl p-1">
                    <button
                        onClick={() => setActiveTab('editor')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === 'editor'
                                ? 'bg-sand text-charcoal'
                                : 'text-sand hover:text-off-white'
                            }`}
                    >
                        Schema JSON
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === 'preview'
                                ? 'bg-sand text-charcoal'
                                : 'text-sand hover:text-off-white'
                            }`}
                    >
                        Preview
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    {schemaUrl && (
                        <button
                            onClick={handleLoadFromUrl}
                            className="bg-olive text-off-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-olive/90 transition-colors"
                        >
                            Load From URL
                        </button>
                    )}

                    <button
                        onClick={handleLoadPublished}
                        className="bg-charcoal/50 border border-sand/30 text-sand py-2 px-4 rounded-xl text-sm font-medium hover:bg-sand/10 transition-colors"
                    >
                        Load Published
                    </button>

                    <button
                        onClick={handleSaveDraft}
                        className="bg-charcoal/50 border border-sand/30 text-sand py-2 px-4 rounded-xl text-sm font-medium hover:bg-sand/10 transition-colors"
                    >
                        Save Draft
                    </button>

                    {allowSaveLocal && (
                        <button
                            onClick={handlePublish}
                            className="bg-accent-red text-off-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-accent-red/90 transition-colors"
                        >
                            Publish
                        </button>
                    )}
                </div>

                {/* Content */}
                {activeTab === 'editor' ? (
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-sand">
                            Form Schema JSON
                        </label>
                        <textarea
                            value={schemaText}
                            onChange={(e) => handleSchemaChange(e.target.value)}
                            className="w-full h-96 px-4 py-3 bg-charcoal/30 border border-sand/30 rounded-xl text-off-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand resize-none"
                            placeholder="Enter form schema JSON..."
                        />
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-sand">
                                Live Preview
                            </label>
                            <span className="text-xs text-sand/60">
                                Changes reflect in real-time
                            </span>
                        </div>
                        <div className="border border-sand/20 rounded-xl p-4 bg-charcoal/20">
                            <DynamicForm
                                schema={previewSchema}
                                onSubmit={(data) => {
                                    console.log('Preview form submitted:', data);
                                    showToast.success('Preview form submitted (check console)');
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Help Text */}
                <div className="bg-sand/5 border border-sand/10 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-sand mb-2">Quick Help</h3>
                    <ul className="text-xs text-off-white/80 space-y-1">
                        <li>• Edit JSON in Schema tab, see live preview in Preview tab</li>
                        <li>• Save Draft stores locally, Publish makes it live for users</li>
                        <li>• Conditional fields: use showWhen: "field_name == 'value'"</li>
                        <li>• Field types: text, email, phone, number, select, radio, checkbox, date</li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}
