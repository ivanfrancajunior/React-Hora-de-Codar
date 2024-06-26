import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import photoService from '../services/photoService';


const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const publishPhoto = createAsyncThunk(
  'photo/publish',
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);
export const getUserPhotos = createAsyncThunk(
  'photo/user/photos',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getUserPhotos(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);

export const deleteUserPhoto = createAsyncThunk(
  'photo/delete',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.deletePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);

export const updateUserPhoto = createAsyncThunk(
  'photo/update',
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token,
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const getPhotoById = createAsyncThunk(
  'photo/get_photo_by_id',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhotoById(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);
export const likePhoto = createAsyncThunk(
  'photo/like_photo',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.likePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);
export const commentPhoto = createAsyncThunk(
  'photo/comment_photo',
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.commentPhoto(
      { comment: photoData.comment },
      photoData.id,
      token,
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  },
);
export const getAllPhotos = createAsyncThunk(
  'photoget_all_photos',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getAllPhotos(token);

    return data;
  },
);

export const searchPhotos = createAsyncThunk(
  'photo/search',
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.searchPhotos(query, token);

    console.log(data);
    console.log(data.errors);

    return data;
  },
);

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = 'Photo published successfully';
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(getUserPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(deleteUserPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteUserPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });
        state.message = action.payload.message;
      })
      .addCase(deleteUserPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(updateUserPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos.map((photo) => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title);
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getPhotoById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhotoById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
      })
      .addCase(getPhotoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })

      .addCase(likePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId);
        }
        state.photos.map((photo) => {
          if (photo._id === action.payload.photoId) {
            return photo.likes.push(action.payload.userId);
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(likePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(commentPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo.comments.push(action.payload.comment);
        state.message = action.payload.message;
      })
      .addCase(commentPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
