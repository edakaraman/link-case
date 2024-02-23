import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useLink } from '../src/context';

export default function EditModal({ initialName, initialUrl, onSave, onCancel, readValue }) {
    const [name, setName] = useState(initialName);
    const [url, setUrl] = useState(initialUrl);
    const { setVisible, editModalVisible } = useLink();

    const handleSave = () => {
        onSave(name, url);
        setVisible(false);
    };

    const handleCancel = () => {
        onCancel();
        setVisible(false);
    };

    return (
        <Dialog visible={editModalVisible} onHide={handleCancel} style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
            <div className="flex flex-column edit-modal gap-3">
                <h2 className='text-center'> {readValue ? 'View Link Info' : 'Update Link Info'}  </h2>
                <label htmlFor='l-name'> <b> Link Name </b> </label>
                <InputText id="l-name" value={name} onChange={(e) => setName(e.target.value)} readOnly={readValue} />
                <label htmlFor='l-url'> <b> Link Url </b> </label>
                <InputText id='l-url' value={url} onChange={(e) => setUrl(e.target.value)} readOnly={readValue} />
                {
                    !readValue && (
                        <div className='flex gap-3'>
                            <Button label="Save" severity='success' onClick={handleSave} />
                            <Button label="Cancel" severity='danger' onClick={handleCancel} />
                        </div>
                    )
                }

            </div>
        </Dialog>
    );
}
