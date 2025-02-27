enum Routes {
  Root = '/',
  Error = '/error',
  ChapterOverview = '/book/:bookId/chapters',
  ListenToChapter = '/book/:bookId/:chapterId/player'
}

export default Routes;
