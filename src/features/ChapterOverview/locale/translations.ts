export interface ChapterOverviewTranslation {
  loading: string;
  error: string;
  noData: string;
  readBy: string;
}

export const chapterOverviewTranslations: ChapterOverviewTranslation = {
    loading: 'Loading chapters...',
    error: 'An error occurred: {{message}}',
    noData: 'It\'s very empty here',
    readBy: "by"
};
