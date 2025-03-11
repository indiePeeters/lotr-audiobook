import { Chapter, useGetChaptersByNameLazyQuery } from "@/models/generated/graphql"
import { CircularProgress } from "@mui/material"
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import HeadsetIcon from '@mui/icons-material/Headset';
import { useNavigate } from "react-router-dom";
import Routes from "@/shared/enums/routes";
import { t } from "i18next";
import { chapterSearchTranslations } from "../locale/translations";
import './ChapterGrid.scss';

interface ChapterGridProps {
    search : string
}

export const ChapterGrid = ({ search } : ChapterGridProps) : JSX.Element => {
    // State and hooks
    const navigate = useNavigate()
    const [fetchChapters, { data, error, loading }] = useGetChaptersByNameLazyQuery()
    const [count, setCount] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [page, setPage] = useState(0)
    const [rows, setRows] = useState<Chapter[]>([])
    const [columns] = useState([
        { field: 'image', headerName: '', width: 60, sortable: false, renderCell: (params : any) => { return (<img className="chapter-image" src={params?.row?.imageUrl}/>) }} ,
        { field: "title", headerName: "Title", width: 200 },
        { field: "bookTitle", headerName: "Book",  width: 200, renderCell: (params : any) => { return params?.row?.Chapter_Book.title } },
        { field: "audio", headerName: '', width: 40, sortable: false, renderCell: (params : any) => { return (<a><HeadsetIcon onClick={() => onListenToChapterClicked(params?.row.id, params.row.bookId)}/></a>) }} 
    ])

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchChapters({ 
                variables: { 
                name: `%${search}%`, 
                limit: pageSize, 
                offset: page * pageSize 
                }
            });
            }, 500); 
        return () => clearTimeout(debounceTimeout);
    }, [search, pageSize, page, fetchChapters]);

    useEffect(() => {
        if (data) {
            setCount(data.chapter_aggregate?.aggregate?.count ?? 0);
            setRows(data.chapter as Chapter[]);
        }
    }, [data]);

    // Event handlers
    const onListenToChapterClicked = (id: string, bookId: string) => {
        if (id && bookId) {
            navigate(Routes.ListenToChapter.replace(':bookId', bookId).replace(":chapterId", id));
        }
    }

    const onPaginationModelChange = (model : GridPaginationModel) => {
        setPageSize(model.pageSize);
        setPage(model.page);
    }

    // JSX
    if (loading) { 
        return ( 
            <div className='loader chapter-grid'>
                <div className='spinner'>
                    <CircularProgress />
                </div>
                <span>{ t(chapterSearchTranslations.chapterGrid.loading)}</span>
            </div>
        );
    }

    if (error) { 
        return <p>{ t(chapterSearchTranslations.chapterGrid.error, error.message)}</p>
    }

    return (
        <DataGrid
            className="chapter-grid"
            columns={columns}
            rows={rows}
            rowCount={count}
            paginationMode="server"
            disableColumnResize={true}
            onPaginationModelChange={(value) => onPaginationModelChange(value)}
            pageSizeOptions={[10, 20, 30]}
            paginationModel={{ page, pageSize }}

            sx={{
            '.MuiTablePagination-selectLabel': { color: 'white !important' },
            '.MuiTablePagination-displayedRows': { color: 'white !important' },
            '.MuiDataGrid-columnHeader': { backgroundColor: 'black !important' }
            }}
        />
    )
}