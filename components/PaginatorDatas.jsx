import { useLink } from '@/src/context';
import React from 'react'
import { Paginator } from 'primereact/paginator';

export default function PaginatorDatas() {

  const { setFirst, setRows, first, rows, links } = useLink();
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <Paginator first={first} rows={rows} totalRecords={links.length} onPageChange={onPageChange}>
    </Paginator>
  )
}
