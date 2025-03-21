import { authApi } from "@/app/services/authApi"
import { RegisteredUser } from "@/app/services/types"
import { RootState } from "@/app/store"
import { createSlice } from "@reduxjs/toolkit"
interface AuthState {
  user: null | RegisteredUser
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload))
      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.user = action.payload
          localStorage.setItem("user", JSON.stringify(action.payload))
        },
      )
      .addMatcher(
        authApi.endpoints.getCurrent.matchFulfilled,
        (state, action) => {
          state.user = action.payload
          localStorage.setItem("user", JSON.stringify(action.payload))
        },
      )
  },
})
export const auth = authSlice.reducer
export const { logout } = authSlice.actions
export const userSelector = (state: RootState) => state.auth.user
