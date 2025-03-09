import { BookMenu } from "@/features/Menu/BookMenu";
import { ChapterSearch } from '@/features/ChapterSearch/ChapterSearch'
export const Home = () : JSX.Element => {
    return (
        <div>
            <h1>Lord of the Rings Audiobook</h1>
            <BookMenu/>
            <ChapterSearch/>
        </div>
    );
}