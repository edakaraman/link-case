import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function EditModal({ initialName, initialUrl, onSave, onCancel }) {
    const [name, setName] = useState(initialName);
    const [url, setUrl] = useState(initialUrl);

    const handleSave = () => {
        onSave(name, url);
        setName('');
        setUrl('');
    };

    return (
        <div className="flex flex-column edit-modal gap-3">
            <InputText value={name} onChange={(e) => setName(e.target.value)} />
            <InputText value={url} onChange={(e) => setUrl(e.target.value)} />
            <div className='flex gap-3'>
                <Button label="Save" severity='success' onClick={handleSave} />
                <Button label="Cancel" severity='danger' onClick={onCancel} />
            </div>

        </div>
    );
}
