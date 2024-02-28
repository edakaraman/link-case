import React, { useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import { contactSchema } from '@/yup/YupValidation';
import { useLink } from '../src/context';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function DialogForm() {
    const { links, setLinks, setIsModalOpen, visible, setVisible } = useLink();
    const toast = useRef(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            linkurl: '',
        },
        validationSchema: contactSchema,
        onSubmit: values => {
            const newLink = {
                name: values.name,
                linkurl: values.linkurl,
                vote: 0,
            };
            const updatedLinks = [newLink, ...links]; // Yeni kaydı listenin başına ekle
            setLinks(updatedLinks);
            localStorage.setItem('links', JSON.stringify(updatedLinks));
            formik.resetForm();
            setIsModalOpen(false);
            handleAddClickWithToast(values.name);
        },
    });

    const handleAddClickWithToast = (name) => {
        toast.current.show({ severity: 'success', detail: `${name} added`, life: 3000 });
    };

    return (
        <Dialog visible={visible} onHide={() => setVisible(false)}
            style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
            <div className="flex justify--content-center items-center">
                <div className="m-auto">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-column">
                            <h1> Add New Link </h1>
                            <div className="flex flex-column gap-3 mb-4 w-17rem">
                                <label htmlFor="name" className='font-bold'>Link Name:</label>
                                <InputText
                                    id="name"
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    placeholder='e.g. Alphabet'
                                />
                                {formik.errors.name && formik.touched.name && (
                                    <div className="text-red-600">{formik.errors.name}</div>
                                )}
                            </div>
                            <div className="flex flex-column gap-3 mb-2 w-17rem">
                                <label htmlFor="linkurl" className='font-bold'>Link Url: </label>
                                <InputText
                                    id="linkurl"
                                    name="linkurl"
                                    type="url"
                                    onChange={formik.handleChange}
                                    value={formik.values.linkurl}
                                    placeholder='e.g. http://abc.xyz'
                                />
                                {formik.errors.linkurl && formik.touched.linkurl && (
                                    <div className="text-red-600">{formik.errors.linkurl}</div>
                                )}
                            </div>
                            <div className="flex flex-column">
                                <Button type="submit" className='border-round bg-gray-900 w-5rem'> Add </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toast ref={toast} />
        </Dialog>
    )
}