import { Book } from "@/models/generated/graphql"
import { useNavigate } from "react-router-dom";
import Routes from '@/shared/enums/routes';
import './BookMenuItem.scss'

interface BookMenuItemProps {
    book: Book;
  }

export const BookMenuItem = ({book} : BookMenuItemProps) : JSX.Element => {
    const navigate = useNavigate();

    const onBookClicked = () => {
        navigate(Routes.ChapterOverview.replace(':bookId', book.id));
    }

    return (
        <div className="book-cover">
            <a onClick={onBookClicked}>
                <img className="cover-image" src={book.cover_url}/>
                <span className="title">{book.title}</span>
            </a>
        </div>
    )
}