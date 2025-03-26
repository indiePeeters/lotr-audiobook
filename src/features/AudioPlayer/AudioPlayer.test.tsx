import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock} from 'vitest';
import { AudioPlayer } from './AudioPlayer';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { useGetAllChaptersOfBookByChapterIdQuery } from '@/models/generated/graphql';

vi.mock('@/models/generated/graphql', () => ({
  useGetAllChaptersOfBookByChapterIdQuery: vi.fn(),
}));

describe('AudioPlayer', () => {
  let mockedUseGetAllChaptersOfBookByChapterIdQuery : Mock
  beforeEach(() => {
    // Restore all mocks before each test
    vi.restoreAllMocks();

    // Get the mocked function from vi.mock()
    mockedUseGetAllChaptersOfBookByChapterIdQuery = useGetAllChaptersOfBookByChapterIdQuery as Mock;

    //set mock for sideEffects
    mockedUseGetAllChaptersOfBookByChapterIdQuery.mockReturnValue({
      data: { chapter: [{ id: 1, name: 'Chapter 1' }, { id: 2, name: 'Chapter 2' }] },
      isLoading: false,
      isError: false,
    });

    // Mock the play and pause methods globally
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  });

  it('should toggle play/pause when the play button is clicked', async () => {
    render(
      <MemoryRouter>
        <AudioPlayer />
      </MemoryRouter>
    );

    const playButton = screen.getByTestId('play-pauze-button');

    expect(playButton).toBeInTheDocument();

    fireEvent.click(playButton);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    
    expect(screen.queryByTestId('play-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pause-icon')).toBeInTheDocument();

    fireEvent.click(playButton);
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();

    expect(screen.queryByTestId('play-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
  });
});
