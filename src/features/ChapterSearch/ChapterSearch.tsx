import { Chapter, useGetChaptersByNameLazyQuery } from '@/models/generated/graphql';
import { useNavigate } from "react-router-dom";
import HeadsetIcon from '@mui/icons-material/Headset';
import { Alert, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import './ChapterSearch.scss'
import Routes from '@/shared/enums/routes';

export const ChapterSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState<Chapter[]>([])
  const navigate = useNavigate()
  const [fetchChapters, { data, error, loading }] = useGetChaptersByNameLazyQuery()

  const columns = [
      { field: 'image', headerName: '', width: 60, sortable: false, renderCell: (params : any) => { return (<img className="chapter-image" src={params?.row?.imageUrl}/>) }} ,
      { field: "title", headerName: "Title", width: 200 },
      { field: "bookTitle", headerName: "Book",  width: 200, renderCell: (params : any) => { return params?.row?.Chapter_Book.title } },
      { field: "audio", headerName: '', width: 40, sortable: false, renderCell: (params : any) => { return (<a><HeadsetIcon onClick={() => onListenToChapterClicked(params?.row.id, params.row.bookId)}/></a>) }} 
  ]

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchChapters({ 
        variables: { 
          name: `%${searchQuery}%`, 
          limit: pageSize, 
          offset: page * pageSize 
        }
      });
    }, 500); 
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, pageSize, page, fetchChapters]);

  useEffect(() => {
    if (data) {
      setCount(data.chapter_aggregate?.aggregate?.count ?? 0);
      setRows(data.chapter as Chapter[]);
    }
  }, [data]);

  const onListenToChapterClicked = (id: string, bookId: string) => {
      if (id && bookId) {
          navigate(Routes.ListenToChapter.replace(':bookId', bookId).replace(":chapterId", id));
      }
  }

  const onPaginationModelChange = (model : GridPaginationModel) => {
      setPageSize(model.pageSize);
      setPage(model.page);
  }

  return (
    <div>
      <h2>Search for a specific chapter</h2>
      <TextField 
        className='chapter-search' 
        value={searchQuery} 
        label="Search" 
        variant="outlined" 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <div className="chapter-grid">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">Error: {error.message}</Alert>
        ) : !data?.chapter || data.chapter.length === 0 ? (
          <p>No data available</p>
        ) : (
          <DataGrid
            paginationMode="server"
            onPaginationModelChange={(value) => onPaginationModelChange(value)}
            pageSizeOptions={[10, 20, 30]}
            paginationModel={{ page, pageSize }}
            rows={rows}
            rowCount={count}
            columns={columns}
            sx={{
              '.MuiTablePagination-selectLabel': { color: 'white !important' },
              '.MuiTablePagination-displayedRows': { color: 'white !important' },
              '.MuiDataGrid-columnHeader': { backgroundColor: 'black !important' }
            }}
          />
        )}
      </div>
    </div>
  )
}