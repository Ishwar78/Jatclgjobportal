import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/Layout';
import './Admin.css';
import { getSettingAPI, updateSettingAPI, uploadFileAPI, getBaseUrl } from '../../lib/api';

export default function AdminPopup() {
    const [popupFile, setPopupFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [savedUrl, setSavedUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchPopupSetting();
    }, []);

    const fetchPopupSetting = async () => {
        try {
            const res = await getSettingAPI('home_popup');
            if (res.ok && res.data && res.data.value) {
                setSavedUrl(res.data.value);
            }
        } catch (error) {
            console.log("No popup setting found yet or error fetching.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPopupFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!popupFile) return;
        setLoading(true);
        setMessage('');
        try {
            // Upload the file first
            const uploadRes = await uploadFileAPI(popupFile);
            if (!uploadRes.ok) throw new Error('Upload failed');
            
            const fileUrl = uploadRes.data.file ? uploadRes.data.file.url : uploadRes.data.url;

            // Save the URL to settings
            const saveRes = await updateSettingAPI('home_popup', fileUrl);
            if (!saveRes.ok) throw new Error('Save failed');
            
            setSavedUrl(fileUrl);
            setPopupFile(null);
            setPreviewUrl('');
            setMessage('Popup image updated successfully!');
        } catch (error) {
            setMessage('Failed to upload image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async () => {
        setLoading(true);
        try {
            await updateSettingAPI('home_popup', '');
            setSavedUrl('');
            setMessage('Popup removed successfully!');
        } catch (error) {
            setMessage('Failed to remove popup.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Home Page Popup">
            <div className="admin-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h3>Upload New Popup Image</h3>
                <p>This image will appear as a popup on the home page with a download option.</p>
                
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                
                {previewUrl && (
                    <div style={{ marginBottom: '20px' }}>
                        <p>Preview:</p>
                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid #ccc' }} />
                    </div>
                )}
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-primary" onClick={handleUpload} disabled={!popupFile || loading}>
                        {loading ? 'Uploading...' : 'Save & Publish Popup'}
                    </button>
                </div>

                {message && <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#eef', borderRadius: '4px' }}>{message}</div>}
                
                <hr style={{ margin: '30px 0' }} />

                <h3>Current Popup</h3>
                {savedUrl ? (
                    <div>
                        <img src={`${getBaseUrl()}${savedUrl}`} alt="Current Popup" style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid #ccc', marginBottom: '10px' }} />
                        <br />
                        <button className="btn btn-outline" onClick={handleRemove} disabled={loading} style={{ color: 'red', borderColor: 'red' }}>
                            Remove Popup
                        </button>
                    </div>
                ) : (
                    <p style={{ color: '#666' }}>No active popup currently.</p>
                )}
            </div>
        </AdminLayout>
    );
}
