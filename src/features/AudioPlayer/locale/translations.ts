export interface AudioPlayerTranslation {
    loading: string;
    error: string;
}

export const audioPlayerTranslations: AudioPlayerTranslation = {
    loading: 'Loading chapter...',
    error: 'An error occurred: {{message}}',
};
