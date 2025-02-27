import './AudioPlayer.scss'
import { CircularProgress, IconButton, Slider } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Forward30Icon from '@mui/icons-material/Forward30';
import Replay30Icon from '@mui/icons-material/Replay30';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { useNavigate, useParams } from 'react-router-dom';
import { Chapter, useGetAllChaptersOfBookByChapterIdQuery } from '../../models/generated/graphql';
import Routes from '../../shared/enums/routes';

export const AudioPlayer = () : JSX.Element => {
    // State and hooks
    const { bookId, chapterId } = useParams();
    const navigate = useNavigate();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [audioDuration, setAudioDuration] = useState<number | undefined>(0);
    const [audioCurrentTime, setAudioCurrentTime] = useState<number | undefined>(0);
    const [previousChapter, setPreviousChapter] = useState<Chapter>();
    const [currentChapter, setCurrentChapter] = useState<Chapter>();
    const [nextChapter, setNextChapter] = useState<Chapter>();

    const chapterByIdResult = useGetAllChaptersOfBookByChapterIdQuery({ variables: { id: chapterId } });

    useEffect(() => {
        if (chapterByIdResult.data) {
            const current = chapterByIdResult.data.chapter.find(x => x.id === chapterId);
            const previous = chapterByIdResult.data.chapter.find(x => x.order === (current?.order - 1));
            const next = chapterByIdResult.data.chapter.find(x => x.order === (current?.order + 1));
            setCurrentChapter(current);
            setPreviousChapter(previous);
            setNextChapter(next);
        }
    }, [chapterByIdResult.data, chapterId]);

    useEffect(() => {
        const delay = setTimeout(() => {
            handlePlayPause();
        }, 1200);
        return () => clearTimeout(delay);
    }, [chapterId, bookId]);

    useEffect(() => {
        const audioElement = audioRef.current;
        const updateProgress = () => {
            setAudioCurrentTime(audioElement?.currentTime);
            setAudioDuration(audioElement?.duration);
            if (audioElement?.currentTime === audioElement?.duration) {
                handleNextButton();
            }
        };
        audioElement?.addEventListener('timeupdate', updateProgress);
        audioElement?.addEventListener('loadedmetadata', updateProgress);

        return () => {
            audioElement?.removeEventListener('timeupdate', updateProgress);
            audioElement?.removeEventListener('loadedmetadata', updateProgress);
        };
    }, []);

    // Event handlers
    const handlePlayPause = () => {   
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            audioRef.current?.play();
            setIsPlaying(true);
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const time = newValue as number;
        event.NONE;
        if (audioRef.current) {
            audioRef.current.currentTime = (time / 100) * (audioDuration ?? 0);
        }
    };

    const handleForwardButton = () => {
        if (audioRef.current) {
            audioRef.current.currentTime += 30;
        }
    };

    const handleReplayButton = () => {
        if (audioRef.current) {
            audioRef.current.currentTime -= 30;
        }
    };
    
    const handleNextButton = () => {
        handlePlayPause();
        if (nextChapter) {
            navigate(Routes.ListenToChapter.replace(':bookId', bookId ?? '').replace(':chapterId', nextChapter.id));
        }
    };

    const handlePreviousButton = () => {
        handlePlayPause();
        if (previousChapter) {
            navigate(Routes.ListenToChapter.replace(':bookId', bookId ?? '').replace(':chapterId', previousChapter.id));
        }
    };

    // Derived state and helper functions
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${paddedSeconds}`;
    };

    const isNextButtonDisabled = () => {
        if(!nextChapter) {
            return true
        } 
        return false
    }

    const isPreviousButtonDisabled = () => {
        if(!previousChapter) {
            return true
        } 
        return false
    }

    // JSX
    if (chapterByIdResult.loading) { 
        return ( 
            <div className='loader'>
                <div className='spinner'>
                    <CircularProgress />
                </div>
                <span>Loading chapter...</span>
            </div>
        );
    }

    return (
        <div className='audio-player'>
            <div className='audio-header-container'>
                <img className='audio-image' src={currentChapter?.imageUrl} alt="Chapter" />
                <h2 className='audio-title'>{currentChapter?.title}</h2>
                <h3 className='audio-author'>{currentChapter?.author}</h3>
            </div>
            <div>
                <Slider 
                    className="slider" 
                    aria-label="small" 
                    onChange={handleSliderChange} 
                    value={((audioCurrentTime ?? 0) / (audioDuration ?? 0)) * 100} 
                    aria-labelledby="audio-slider" 
                /> 
                <div className="audio-times">
                    <span>{formatTime(audioCurrentTime ?? 0)}</span>  
                    <span>{formatTime(audioDuration ?? 0)}</span>
                </div>
            </div>
            <div>
                <IconButton disabled={isPreviousButtonDisabled()} onClick={handlePreviousButton}>
                    <SkipPreviousIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={handleReplayButton}>
                    <Replay30Icon fontSize="large" />
                </IconButton>
                <IconButton onClick={handlePlayPause} size='large'>
                    {isPlaying ? <PauseCircleIcon className="play-pause-button" /> : <PlayCircleIcon className="play-pause-button" />}
                </IconButton>
                <IconButton onClick={handleForwardButton}>
                    <Forward30Icon fontSize="large" />
                </IconButton>
                <IconButton disabled={isNextButtonDisabled()} onClick={handleNextButton}>
                    <SkipNextIcon fontSize="large" />
                </IconButton>
            </div>
            <audio ref={audioRef} src={currentChapter?.audioUrl}></audio>
        </div>
    );
};
