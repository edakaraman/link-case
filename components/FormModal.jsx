
import { Button } from 'primereact/button';
import React from 'react';
import Cards from './Cards';
import DialogForm from "../components/DialogForm"
import { useLink } from '@/src/context';

export default function FormModal() {
    const {setVisible} = useLink();
    return (
        <div className="card flex justify-content-center">
            <div className='w-18rem bg-gray-300 m-auto h-5rem'>
                <div className='flex mb-5'>
                    <Button icon="pi pi-plus" type="button" className='border-none bg-gray-600 m-3' onClick={() => setVisible(true)} />
                    <p className='font-bold text-900'> SUBMIT A LINK</p>
                </div>
                <Cards />
            </div>
            <DialogForm/>
        </div>
    )
}