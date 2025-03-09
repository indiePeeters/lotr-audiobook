import { useGetBooksQuery } from "@/models/generated/graphql"
import "./BookMenu.scss"
import { BookMenuItem } from "./components/BookMenuItem"

export const BookMenu = () : JSX.Element => {
    const getBooksResults = useGetBooksQuery()
    return (
        <div className="menu">
            { getBooksResults?.data?.book.map((book, index) => 
                <BookMenuItem book={book} key={index}/>
            ) ?? <div/> }
        </div>
    )
}
