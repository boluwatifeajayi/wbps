import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userAuthService from './userAuthService'

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'))


// initial states
const initialState = {
	user: user ? user: null, 
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// register user
// createAsyncThunk is what is responsible for the asyc logic on the addCase extra reducer parts below
export const register = createAsyncThunk('userauth/register', async (user, thunkAPI) => {
	try{
		// userAuthService.register is the function to register user from userauthservice file
		return await userAuthService.register(user)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// login user
export const login = createAsyncThunk('userauth/login', async (user, thunkAPI) => {
	try{
		return await userAuthService.login(user)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// logout
export const logout =  createAsyncThunk('userauth/logout', async () => {
	await userAuthService.logout()
})

export const userAuthSlice = createSlice({
	name: 'userauth',
	initialState,

	// standard reducer logic, with auto-generated action types per reducer
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
		}
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle various state as needed
		builder
			// register actions
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})

			// login
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})

			// logout
			.addCase(logout.fulfilled, (state) => {
				state.user = null
			})
	}
})

export const {reset} = userAuthSlice.actions
export default userAuthSlice.reducer

