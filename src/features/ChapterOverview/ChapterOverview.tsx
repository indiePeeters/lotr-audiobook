import { useGetChaptersBybookIdQuery } from "../../models/generated/graphql"
import { useNavigate, useParams } from "react-router-dom";
import './ChapterOverview.scss'
import { useGetBooksByIdDQuery } from "../../models/generated/graphql";
import Routes from "../../shared/enums/routes";
import { CircularProgress } from "@mui/material";

export const ChapterOverview = () : JSX.Element => {
    const { bookId } = useParams()
    const navigate = useNavigate()
    const bookByIdResult = useGetBooksByIdDQuery({
        variables: { id: bookId}
    })
    const chaptersByBookResult = useGetChaptersBybookIdQuery({
        variables: { bookId: bookId }
    });

    const onChapterClicked = (id: string, bookId : string) => {
        navigate(Routes.ListenToChapter.replace(':bookId', bookId).replace(":chapterId", id));
    }

    if (chaptersByBookResult.loading) {
        return (
            <div>
                <div className='spinner'>
                    <CircularProgress />
                </div>
                <span>Loading chapters...</span>
            </div>
        )
    }
    if (chaptersByBookResult.error) return <p>An error occurred: {chaptersByBookResult.error.message}</p>;

    return (
        <div className="chapter-overview">
            <h2>{bookByIdResult.data?.book[0].title}</h2>
            <div className="chapters">
                {
                    chaptersByBookResult.data?.chapter.map(c => (
                        <div key={c.id} className="chapter" onClick={ () => onChapterClicked(c.id, bookId ?? '')}>
                            <img src={c.imageUrl}/>
                            <h3> {c.title} </h3>
                            <span> by {c.author} </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}