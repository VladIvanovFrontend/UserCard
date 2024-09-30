import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page: number = 1) => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    return response.data;
});

interface UsersState {
    users: any[];
    status: 'idle' | 'loading' | 'failed';
    page: number;
    totalPages: number;
}

const initialState: UsersState = {
    users: [],
    status: 'idle',
    page: 1,
    totalPages: 1,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'idle';
                state.users = action.payload.data;
                state.page = action.payload.page;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default usersSlice.reducer;
