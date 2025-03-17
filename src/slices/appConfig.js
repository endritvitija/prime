import { DataKey } from '@/enums/localStorage';
import { getItem } from '@/utils/local-storage';
import { createSlice } from '@reduxjs/toolkit';
import { deepmerge } from '@mui/utils';

const defaultState = {
  themeState: {
    theme: 'light',
  },
  languageState: {
    language: 'en',
  },
};

const initialState = deepmerge(
  defaultState,
  getItem(DataKey.APP_CONFIG) || {},
);

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.themeState.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.languageState.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = appConfigSlice.actions;

export const { name } = appConfigSlice;

export const appConfigReducer = appConfigSlice.reducer;
