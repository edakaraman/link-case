import React, { useState, useRef } from 'react';
import { useLink } from '../src/context';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import EditModal from './EditModal';
import PaginatorDatas from './PaginatorDatas';

export default function Cards() {
    const { links, setLinks,first,rows } = useLink();
    const toast = useRef(null);

    const [hoveredIndex, setHoveredIndex] = useState(null); //kartın üzerine gelindiğinde
    const [showConfirm, setShowConfirm] = useState(false); //uyarı ekranı
    const [linkToRemove, setLinkToRemove] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const sortOptions = [
        { value: 'asc', label: 'Most Voted (Z -> A)' },
        { value: 'desc', label: 'Less Voted ( A -> Z)' }
    ];

    const sortLinksByVote = (order) => {
        const sortedLinks = [...links];
        sortedLinks.sort((a, b) => {
            if (order === 'asc') {
                return b.vote - a.vote;
            } else {
                return a.vote - b.vote;
            }
        });
        setLinks(sortedLinks);
    };

    // Seçenek değiştiğinde sıralama yap
    const handleSortChange = (event) => {
        const order = event.target.value;
        setSortOrder(order);
        sortLinksByVote(order);
    };

    const handleUpVote = (index) => {
        const updatedLinks = [...links];
        const votedLink = updatedLinks[index];
        votedLink.vote += 1;
        votedLink.lastVotedAt = new Date(); // Son oy kullanma zamanını güncelle
        // Bağlantıları puan sırasına ve son oy kullanma zamanına göre sırala
        updatedLinks.sort((a, b) => {
            if (a.vote === b.vote) {
                // Aynı puan durumunda, daha son oy kullanılanı üstte göster
                return new Date(b.lastVotedAt) - new Date(a.lastVotedAt);
            } else {
                return b.vote - a.vote;
            }
        });
        setLinks(updatedLinks);
    };

    const handleDownVote = (index) => {
        const updatedLinks = [...links];
        const votedLink = updatedLinks[index];
        votedLink.vote -= 1;
        votedLink.lastVotedAt = new Date(); // Son oy kullanma zamanını güncelle
        // Bağlantıları puan sırasına ve son oy kullanma zamanına göre sırala
        updatedLinks.sort((a, b) => {
            if (a.vote === b.vote) {
                // Aynı puan durumunda, daha son oy kullanılanı üstte göster
                return new Date(b.lastVotedAt) - new Date(a.lastVotedAt);
            } else {
                return b.vote - a.vote;
            }
        });
        setLinks(updatedLinks);
    };

    //SİLME İŞLEMİNE ONAY VERİLDİĞİNDE
    const handleConfirm = () => {
        const updatedLinks = links.filter((link, index) => index !== linkToRemove);
        setLinks(updatedLinks);
        setShowConfirm(false);
        handleAddClickWithToast();
    };

    const handleAddClickWithToast = () => {
        toast.current.show({ severity: 'success', detail: `${links[linkToRemove]?.name} removed`, life: 3000 });
    };

    const handleUpdateClickWithToast = () => {
        toast.current.show({ severity: 'success', detail: `${links[editingIndex]?.name} updated`, life: 3000 });
    };

    const handleSaveEdit = (name, url) => {
        const editedLink = links[editingIndex];
        if (editedLink.name !== name || editedLink.linkurl !== url) {
            editedLink.name = name;
            editedLink.linkurl = url;
            setLinks(links);
            setEditingIndex(null);
            handleUpdateClickWithToast();
        } else {
            setEditingIndex(null);
        }
    };
    
    const confirmDialogFooter = (
        <div>
            <Button label="CANCEL" icon="pi pi-times" className="p-button-text" onClick={() => setShowConfirm(false)} />
            <Button label="OK" icon="pi pi-check" className="p-button-text" onClick={handleConfirm} autoFocus />
        </div>
    );

    return (
        <div className='flex flex-column gap-3'>
            {
                links.length > 0 && (
                    <div>
                    <label htmlFor="sort">Sıralama: </label>
                    <select id="sort" value={sortOrder} onChange={handleSortChange} className='p-1'>
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                )
            }
           
            {links.slice(first, first + rows).map((linkItem, index) => (
                <div key={index} className='flex gap-3' onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                    <div className='bg-gray-200 w-5rem h-8rem p-2'>
                        <h2>{linkItem.vote}</h2>
                        <p className='text-gray-900'>POINTS</p>
                    </div>
                    <div>
                        {editingIndex === index ? (
                            <EditModal
                                initialName={linkItem.name}
                                initialUrl={linkItem.linkurl}
                                onSave={(name, url) => handleSaveEdit(name, url)}
                                onCancel={() => setEditingIndex(null)}
                            />
                        ) : (
                            <div>
                                <h3>{linkItem.name}</h3>
                                <p>({linkItem.linkurl})</p>
                            </div>
                        )}
                        {
                            editingIndex != index && (
                                <div className='flex flex-row gap-2 cursor-pointer'>
                                    <i className="pi pi-arrow-up" onClick={() => handleUpVote(index)}> Up Vote </i>
                                    <i className="pi pi-arrow-down" onClick={() => handleDownVote(index)}> Down Vote</i>
                                </div>
                            )
                        }
                    </div>
                    {hoveredIndex === index && (
                        <div className='flex gap-2'>
                            <div className='cursor-pointer' onClick={() => { setLinkToRemove(index); setShowConfirm(true); }}>
                                <i className="pi pi-trash"></i>
                            </div>
                            <div className='cursor-pointer' onClick={() => setEditingIndex(index)}>
                                <i className="pi pi-file-edit"></i>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {
                links.length > 0 && (
                    <PaginatorDatas />
                )
            }
            <ConfirmDialog visible={showConfirm} onHide={() => setShowConfirm(false)} message={`Do you want to remove  ${links[linkToRemove]?.name}?`} header="Remove Link" footer={confirmDialogFooter}></ConfirmDialog>
            <Toast ref={toast} />
        </div>
    );
}