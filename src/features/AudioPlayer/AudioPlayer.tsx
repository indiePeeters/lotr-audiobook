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
import { useGetAllChaptersOfBookByChapterIdQuery } from '../../models/generated/graphql';
import Routes from '@/shared/enums/routes';
import { t } from 'i18next';
import ChapterState from './types/chapterState';
import { audioPlayerTranslations } from './locale/translations';
import AudioState from './types/audioState';

export const AudioPlayer = () : JSX.Element => {
    // State and hooks
    const { bookId, chapterId } = useParams();
    const navigate = useNavigate();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioState, setAudioState] = useState<AudioState>({ audioCurrentTime: 0, audioDuration: 0, isPlaying: false })
    const [chapterState, setChapterState] = useState<ChapterState>({ previousChapter: undefined, currentChapter: undefined, nextChapter: undefined });

    const {data, error, loading} = useGetAllChaptersOfBookByChapterIdQuery({ variables: { id: chapterId } });
    
    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            const handleTimeUpdate = () => {
                setAudioState((prevState) => ({
                    ...prevState,
                    audioCurrentTime: audioElement.currentTime,
                    audioDuration: audioElement.duration,
                }));
                if (audioElement.currentTime === audioElement.duration && audioState.isPlaying) {
                    handleNextButton();
                }
            };

            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('loadedmetadata', handleTimeUpdate);

            return () => {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
                audioElement.removeEventListener('loadedmetadata', handleTimeUpdate);
            };
        }
    }, [audioState.isPlaying]);

    useEffect(() => {
        if (data) {
            const currentChapter = data.chapter.find(x => x.id === chapterId);
            const previousChapter = data.chapter.find(x => x.order === (currentChapter?.order - 1));
            const nextChapter = data.chapter.find(x => x.order === (currentChapter?.order + 1));
            setChapterState(prevState => ({ ...prevState, previousChapter, currentChapter, nextChapter }));
        }
    }, [data, chapterId]);

    // Event handlers
    const handlePlayPause = () => {
        if (audioState.isPlaying) {
            audioRef.current?.pause();
            setAudioState(prevState => ({...prevState, isPlaying: false}))
        } else {
            audioRef.current?.play();
            setAudioState(prevState => ({...prevState, isPlaying: true}))
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const time = newValue as number;
        event.NONE;
        if (audioRef.current) {
            audioRef.current.currentTime = (time / 100) * (audioState.audioDuration ?? 0);
            console.log('calling SetAudiostate')
            setAudioState(prevState => ({...prevState, audioCurrentTime: audioRef.current!.currentTime}))
        }
    };

    const handleForwardButton = () => {
        if (audioRef.current) {
            audioRef.current.currentTime += 30;
            setAudioState(prevState => ({...prevState, audioCurrentTime: audioRef.current!.currentTime }))
        }
    };

    const handleReplayButton = () => {
        if (audioRef.current) {
            audioRef.current.currentTime -= 30;
            setAudioState(prevState => ({...prevState, audioCurrentTime: audioRef.current!.currentTime }))
        }
    };
    
    const handleNextButton = () => {
        handlePlayPause();
        if (chapterState.nextChapter) {
            navigate(Routes.ListenToChapter.replace(':bookId', bookId ?? '').replace(':chapterId', chapterState.nextChapter.id));
        }
    };

    const handlePreviousButton = () => {
        handlePlayPause();
        if (chapterState.previousChapter) {
            navigate(Routes.ListenToChapter.replace(':bookId', bookId ?? '').replace(':chapterId', chapterState.previousChapter.id));
        }
    };

    // Derived state and helper functions
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    const isNextButtonDisabled = () => {
        if(!chapterState.nextChapter) {
            return true
        } 
        return false
    }

    const isPreviousButtonDisabled = () => {
        if(!chapterState.previousChapter) {
            return true
        } 
        return false
    }

    // JSX
    if (loading) { 
        return ( 
            <div className='loader'>
                <div className='spinner'>
                    <CircularProgress />
                </div>
                <span>{t(audioPlayerTranslations.loading)}</span>
            </div>
        );
    }

    if (error) { 
        return <p>{t(audioPlayerTranslations.error, error.message)}</p>
    }

    return (
        <div className='audio-player'>
            <div className='audio-header-container'>
                <img className='audio-image' src={chapterState?.currentChapter?.imageUrl} alt="Chapter" />
                <h2 className='audio-title'>{chapterState?.currentChapter?.title}</h2>
                <h3 className='audio-author'>{chapterState?.currentChapter?.author}</h3>
            </div>
            <div>
                <Slider 
                    data-testid="progress-slider"
                    className="slider" 
                    aria-label="small" 
                    onChange={handleSliderChange} 
                    value={(audioState.audioDuration > 0) ? (audioState.audioCurrentTime / audioState.audioDuration) * 100 : 0}
                    aria-labelledby="audio-slider" 
                /> 
                <div className="audio-times">
                    <span>{formatTime(audioState.audioCurrentTime ?? 0)}</span>  
                    <span>{formatTime(audioState.audioDuration ?? 0)}</span>
                </div>
            </div>
            <div>
                <IconButton disabled={isPreviousButtonDisabled()} onClick={handlePreviousButton}>
                    <SkipPreviousIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={handleReplayButton}>
                    <Replay30Icon fontSize="large" />
                </IconButton>
                <IconButton data-testid="play-pauze-button" onClick={handlePlayPause} size='large'>
                    {audioState.isPlaying ? <PauseCircleIcon data-testid="pause-icon" className="play-pause-button" /> : <PlayCircleIcon data-testid="play-icon" className="play-pause-button" />}
                </IconButton>
                <IconButton onClick={handleForwardButton}>
                    <Forward30Icon fontSize="large" />
                </IconButton>
                <IconButton disabled={isNextButtonDisabled()} onClick={handleNextButton}>
                    <SkipNextIcon fontSize="large" />
                </IconButton>
            </div>
            <audio ref={audioRef} src={chapterState?.currentChapter?.audioUrl} onLoadedData={handlePlayPause}></audio>
        </div>
    );
};
