import { errorTranslations } from "./locale/translations";
import { t } from "i18next";

export const Error = () : JSX.Element => {
    return (
        <div>
            <h2>{t(errorTranslations.text)}</h2>
        </div>
    );
}