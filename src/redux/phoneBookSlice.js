import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { deleteContact , fetchContacts, addContact  } from 'services/fetchContacts';

const contactInitialState = {
    contacts: [],
    isLoading: false,
    error: null
};

const onPending = (state) => {
    state.isLoading = true;
    state.error = null;
};

const onRejected = (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
};

const arrOfActs = [fetchContacts, addContact , deleteContact ];

const addStatusToActs = status =>
    arrOfActs.map((el) => el[status]);

export const phoneBookSlice = createSlice({
    name: 'phoneBook',
    initialState: contactInitialState,
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.contacts = payload;
                state.error = null;
            })
            .addCase(addContact .fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.contacts = [...state.contacts, payload]
                state.error = null;
            })
            .addCase(deleteContact .fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.contacts = state.contacts.filter(contact => contact.id !== payload.id)
                state.error = null;
            })
            .addMatcher(isAnyOf(...addStatusToActs('pending')), onPending)
            .addMatcher(isAnyOf(...addStatusToActs('rejected')), onRejected)
    }
});

export const getPhoneBookValue = state => state.phoneBook.contacts;
export const getIsLoading = state => state.phoneBook.isLoading;
export const getError = state => state.phoneBook.error;