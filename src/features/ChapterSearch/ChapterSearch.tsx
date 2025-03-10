import { TextField } from '@mui/material';
import { useState } from 'react';
import './ChapterSearch.scss'
import { ChapterGrid } from './components/ChapterGrid';
import { chapterSearchTranslations } from './locale/translations';
import { t } from "i18next";

export const ChapterSearch = () => {
    // State and hooks
    const [searchQuery, setSearchQuery] = useState('')

    // JSX
    return (
        <div>
            <h2>{t(chapterSearchTranslations.title)}</h2>
            <TextField 
                className='chapter-search' 
                value={searchQuery} 
                label="Search" 
                variant="outlined" 
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <ChapterGrid search={searchQuery} />
        </div>
    )
    }