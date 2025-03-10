export interface ChapterSearchTranslation {
  title: string;
  chapterGrid: {
    loading: string;
    error: string;
    noData: string;
  }
}

export const chapterSearchTranslations: ChapterSearchTranslation = {
  title: 'Search for a specific chapter',
  chapterGrid: {
    loading: 'Loading chapters...',
    error: 'An error occurred: {{message}}',
    noData: 'It\'s very empty here',
  }
};