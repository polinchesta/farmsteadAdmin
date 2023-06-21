import { createSlice } from '@reduxjs/toolkit';
import { LanguageType } from '../../types/languageTypes';

interface SettingsStateType {
    language: LanguageType;
}

const languages: LanguageType[] = ['en', 'ru', "by", "pl"];

const getInitialState = (): SettingsStateType => {
    let language = localStorage.getItem('language') as LanguageType;
    if (!languages.includes(language)) {
        language = 'ru';
    }
    return {
        language,
    };
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: getInitialState(),
    reducers: {
        toggleLanguage: (state) => {
            if (state.language === 'ru') {
                state.language = 'en';
            } else if (state.language === 'en') {
                state.language = 'by';
            } else if (state.language === 'by') {
                state.language = 'pl';
            } else {
                state.language = 'ru';
            }
            localStorage.setItem('language', state.language);
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
            localStorage.setItem('language', state.language);
        },
    },
});

export const settingsActions = {
    ...settingsSlice.actions,
};

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
