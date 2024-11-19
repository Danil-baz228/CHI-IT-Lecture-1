import axiosInstance from '../../api/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchExhibits = createAsyncThunk(
    'exhibits/fetchExhibits',
    async (page: number = 1) => {
        const response = await axiosInstance.get(`/api/exhibits`, {
            params: { page },
        });
        console.log("Fetched exhibits:", response.data); 
        return {
            exhibits: response.data.data,
            page: response.data.page,
            lastPage: response.data.lastPage,
        };
    }
);



export const fetchMyPosts = createAsyncThunk(
    'exhibits/fetchMyPosts',
    async (page: number = 1) => {
        const response = await axiosInstance.get(`/api/exhibits/my-posts`, {
            params: { page },
        });
        console.log("Fetched my posts:", response.data); 
        return response.data.data; 
    }
);


export const createPost = createAsyncThunk(
    'exhibits/createPost',
    async (postData: { image: File; description: string }, thunkAPI) => {  
        try {
            const formData = new FormData();
            formData.append('image', postData.image);  
            formData.append('description', postData.description);

            const response = await axiosInstance.post('/api/exhibits', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create post');
        }
    }
);

export const deletePost = createAsyncThunk(
    'exhibits/deletePost',
    async (postId: number, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/api/exhibits/${postId}`);
            return postId;
        } catch (error) {
            return rejectWithValue('Failed to delete post');
        }
    }
);



export async function getServerSideProps(context: any) {
    const page = context.query.page ? parseInt(context.query.page, 10) : 1; // Отримання сторінки з URL
    console.log('Fetching data for page:', page);
  
    try {
      const response = await axiosInstance.get('/api/exhibits', { params: { page } });
      console.log('Server response:', response.data);
  
      return {
        props: {
          exhibits: response.data.data,
          currentPage: response.data.page,
          lastPage: response.data.lastPage,
        },
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        props: {
          exhibits: [],
          currentPage: 1,
          lastPage: 1,
        },
      };
    }
  }
  


