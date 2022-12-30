import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import stationAuthService from './stationAuthService'

// get station from local storage
const station = JSON.parse(localStorage.getItem('station'))


// initial states
const initialState = {
	station: station ? station: null, 
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
	stations: [],
	singleStation: {}
}

// register station
// createAsyncThunk is what is responsible for the asyc logic on the addCase extra reducer parts below
export const registerStation = createAsyncThunk('stationauth/registerStation', async (station, thunkAPI) => {
	try{
		// stationauthService.register is the function to register station from stationauthservice file
		return await stationAuthService.registerStation(station)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// loginstation station
export const loginStation = createAsyncThunk('stationauth/loginStation', async (station, thunkAPI) => {
	try{
		return await stationAuthService.loginStation(station)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// get all stations
export const getStations = createAsyncThunk(
	'stationauth/getstations',
	async (_, thunkAPI) => {
	  try {
		return await stationAuthService.getStations()
	  } catch (error) {
		const message =
		  (error.response &&
			error.response.data &&
			error.response.data.message) ||
		  error.message ||
		  error.toString()
		return thunkAPI.rejectWithValue(message)
	  }
	}
  )


// get single station
export const GetSingleStation = createAsyncThunk(
	'stationauth/singleStation',
	async (id, thunkAPI) => {
	  try {
		return await stationAuthService.GetSingleStation(id)
	  } catch (error) {
		const message =
		  (error.response &&
			error.response.data &&
			error.response.data.message) ||
		  error.message ||
		  error.toString()
		return thunkAPI.rejectWithValue(message)
	  }
	}
  )
// logout
export const logoutStation =  createAsyncThunk('stationauth/logoutStation', async () => {
	await stationAuthService.logoutStation()
})

export const stationAuthSlice = createSlice({
	name: 'stationauth',
	initialState,

	// standard reducer logic, with auto-generated action types per reducer
	reducers: {
		stationreset: (state) => {
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
			.addCase(registerStation.pending, (state) => {
				state.isLoading = true
			})
			.addCase(registerStation.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.station = action.payload
			})
			.addCase(registerStation.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.station = null
			})
			// loginstation
			.addCase(loginStation.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loginStation.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.station = action.payload
			})
			.addCase(loginStation.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.station = null
			})
			// all stations
			.addCase(getStations.pending, (state) => {
				state.isLoading = true
			  })
			  .addCase(getStations.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.stations = action.payload
			  })
			  .addCase(getStations.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			  })


      // get single document
      .addCase(GetSingleStation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(GetSingleStation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleStation = action.payload
      })
      .addCase(GetSingleStation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

			// logout
			.addCase(logoutStation.fulfilled, (state) => {
				state.station = null
			})
	}
})

export const {stationreset} = stationAuthSlice.actions
export default stationAuthSlice.reducer

