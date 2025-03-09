import { useGetChaptersByNameLazyQuery } from '@/models/generated/graphql';
import { useNavigate } from "react-router-dom";
import HeadsetIcon from '@mui/icons-material/Headset';
import { Alert, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './ChapterSearch.scss'
import Routes from '@/shared/enums/routes';

export const ChapterSearch = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const [fetchChapters, { data, error, loading }] = useGetChaptersByNameLazyQuery({
        variables: { name: `%${searchQuery}%` }
    })

    const rows = data?.chapter || [];
    const columns = [
        { field: 'image', headerName: '', width: 60, sortable: false, renderCell: (params : any) => { return (<img className="chapter-image" src={params?.row?.imageUrl}/>) }},
        { field: "title", headerName: "Title", width: 200},
        { field: "bookTitle", headerName: "Book",  width: 200, renderCell: (params : any) => { return params?.row?.Chapter_Book.title }},
        { field: "audio", headerName: '', width: 40, sortable: false, renderCell: (params : any) => { return (<a><HeadsetIcon onClick={() => onListenToChapterClicked(params?.row.id, params.row.bookId)}/></a>) }}
    ]

    useEffect(() => {
        fetchChapters()
    },[])

    useEffect(() => {
        fetchChapters({ variables: { name: `%${searchQuery}%` } })
    }, [searchQuery])

    const onListenToChapterClicked = (id: string, bookId: string) => {
        if(id && bookId) {
            navigate(Routes.ListenToChapter.replace(':bookId', bookId).replace(":chapterId", id));
        }
    } 

    return (
        <div>
            <h2>Search for a specific chapter</h2>
            <TextField className='chapter-search' value={searchQuery} label="Search" variant="outlined" onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="chapter-grid">
                { loading ? (
                    <CircularProgress />
                    ) : error ? (
                        <Alert severity="error">Error: {error.message}</Alert>
                    ) : !data?.chapter || data.chapter.length === 0 ? (
                        <p>No data available</p>
                    ) : (
                    <DataGrid
                        pageSizeOptions={[10,20,30]}
                        paginationModel={{ page:0, pageSize:10 }}
                        rows={rows} 
                        columns={columns}
                        sx={{
                            '.MuiTablePagination-selectLabel': {
                            color: 'white !important', // Override for Rows per page
                            },
                            '.MuiTablePagination-displayedRows': {
                            color: 'white !important', // Override for the page range text
                            },
                            '.MuiDataGrid-columnHeader': {
                                backgroundColor: 'black !important'
                            }
                        }}
                    />
                    )
                }
            </div>
        </div>
    )
}