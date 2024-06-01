import { Spinner } from "@nghinv/react-native-loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createFavorite,
  getFavorites,
  deleteFavorite,
} from "../actions/favoriteAction";

export type FavoriteState = Partial<{
  entities: Favorite[];
}>;

const initialState: FavoriteState = {
  entities: [],
};

const actions = [createFavorite, getFavorites, deleteFavorite];

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers(builder) {
    actions.forEach((thunk) =>
      builder.addCase(thunk.pending, () => {
        Spinner.show();
      })
    );
    actions.forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        Spinner.hide();
      })
    );
    builder.addCase(
      createFavorite.fulfilled,
      (state, { payload }: PayloadAction<Favorite>) => {
        Spinner.hide();
      }
    );
    builder.addCase(
      getFavorites.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.entities = payload;
        Spinner.hide();
      }
    );
    builder.addCase(
      deleteFavorite.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        Spinner.hide();
      }
    );
  },
});

export const favoriteActions = {
  ...favoriteSlice.actions,
  createFavorite,
  getFavorites,
  deleteFavorite,
};

export default favoriteSlice;
