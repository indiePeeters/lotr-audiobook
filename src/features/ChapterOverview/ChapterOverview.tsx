import { useGetChaptersBybookIdQuery } from "../../models/generated/graphql"
import { useNavigate, useParams } from "react-router-dom";
import './ChapterOverview.scss'
import { useGetBooksByIdDQuery } from "../../models/generated/graphql";
import Routes from '@/shared/enums/routes';
import { CircularProgress } from "@mui/material";
import { chapterOverviewTranslations } from "./locale/translations";
import { t } from "i18next";

export const ChapterOverview = () : JSX.Element => {
    // State and hooks
    const { bookId } = useParams()
    const navigate = useNavigate()
    const { data: bookdata } = useGetBooksByIdDQuery({
        variables: { id: bookId}
    })
    
    const { data: chapterData, error: chapterError, loading: chapterLoading }  = useGetChaptersBybookIdQuery({
        variables: { bookId: bookId }
    });

    // Event handlers
    const onChapterClicked = (id: string, bookId : string) => {
        navigate(Routes.ListenToChapter.replace(':bookId', bookId).replace(":chapterId", id));
    }

    // Derived state and helper functions

    // JSX
    if (chapterLoading) {
        return (
            <div>
                <div className='spinner'>
                    <CircularProgress />
                </div>
                <span>{t(chapterOverviewTranslations.loading)}</span>
            </div>
        )
    }

    if (chapterError) { 
        return <p>{t(chapterOverviewTranslations.error, chapterError.message)}</p>
    }

    return (
        <div className="chapter-overview">
            <h2>{bookdata?.book[0].title}</h2>
            <div className="chapters">
                {
                    chapterData?.chapter.map(c => (
                        <div key={c.id} className="chapter" onClick={ () => onChapterClicked(c.id, bookId ?? '')}>
                            <img src={c.imageUrl}/>
                            <h3> {c.title} </h3>
                            <span> {t(chapterOverviewTranslations.readBy)} {c.author} </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}