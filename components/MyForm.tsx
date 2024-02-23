import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import Cards from './Cards';
import { useLink } from '../src/context';
import { Toast } from 'primereact/toast';
import { contactSchema } from '@/yup/YupValidation';

export default function MyForm() {
  const [isModalOpen, setIsModalOpen] = useState(false); //Form modalı için
  const { links, setLinks } = useLink();
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {!isModalOpen && (
        <div className='w-18rem bg-gray-300 m-auto h-5rem'>
          <div className='flex mb-5'>
            <Button icon="pi pi-plus" type="button" className='border-none bg-gray-600 m-3' onClick={openModal} />
            <p className='font-bold text-900'> SUBMIT A LINK</p>
          </div>
          <Cards />
        </div>
      )}
      <Toast ref={toast} />
      {isModalOpen && (
        <div className="flex justify-center items-center">
          <div className="m-auto">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-column">
                <div className="cursor-pointer" onClick={closeModal}>
                  <span>&lt; Return to List</span>
                </div>
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
      )}
    </div>
  );
}
