import { BookMenu } from "@/features/Menu/BookMenu";
import { ChapterSearch } from '@/features/ChapterSearch/ChapterSearch'
import { homeTranslations } from "./locale/translations";
import { t } from "i18next";

export const Home = () : JSX.Element => {
    return (
        <div>
            <h1>{t(homeTranslations.title)}</h1>
            <BookMenu/>
            <ChapterSearch/>
        </div>
    );
}