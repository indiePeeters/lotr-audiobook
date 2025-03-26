import { Chapter } from "@/models/generated/graphql";

export default interface ChapterState {
    currentChapter: Chapter | undefined,
    previousChapter: Chapter | undefined,
    nextChapter: Chapter | undefined,
}