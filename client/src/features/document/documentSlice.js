import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import documentService from './documentService'
import axios from 'axios'


axios.defaults.withCredentials = true



const initialState = {
  documents: [],
  singleDocument: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  docmessage: '',
}

// Create new document
export const createDocument = createAsyncThunk(
  'documents/create',
  async (documentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token
      return await documentService.createDocument(documentData, token)
    } catch (error) {
      const docmessage =
        (error.response &&
          error.response.data &&
          error.response.data.docmessage) ||
        error.docmessage ||
        error.toString()
      return thunkAPI.rejectWithValue(docmessage)
    }
  }
)


// get all documents
export const allDocuments = createAsyncThunk(
	'documents/allDocuments',
	async (_, thunkAPI) => {
	  try {
		return await documentService.allDocuments()
	  } catch (error) {
		const docmessage =
		  (error.response &&
			error.response.data &&
			error.response.data.docmessage) ||
		  error.docmessage ||
		  error.toString()
		return thunkAPI.rejectWithValue(docmessage)
	  }
	}
  )

  export const stationDocuments = createAsyncThunk(
    'documents/stationDocuments',
    async (stationname, thunkAPI) => {
      try {
      return await documentService.stationDocuments(stationname)
      } catch (error) {
      const docmessage =
        (error.response &&
        error.response.data &&
        error.response.data.docmessage) ||
        error.docmessage ||
        error.toString()
      return thunkAPI.rejectWithValue(docmessage)
      }
    }
    )

  // get one documents
export const GetSingleDocument = createAsyncThunk(
	'documents/singleDocument',
	async (id, thunkAPI) => {
	  try {
		return await documentService.GetSingleDocument(id)
	  } catch (error) {
		const docmessage =
		  (error.response &&
			error.response.data &&
			error.response.data.docmessage) ||
		  error.docmessage ||
		  error.toString()
		return thunkAPI.rejectWithValue(docmessage)
	  }
	}
  )

  

// Get user documents
export const getDocuments = createAsyncThunk(
  'documents/getAll',
  async (_, thunkAPI) => {
    try {
	  const token = thunkAPI.getState().userauth.user.token
      return await documentService.getDocuments(token)
    } catch (error) {
      const docmessage =
        (error.response &&
          error.response.data &&
          error.response.data.docmessage) ||
        error.docmessage ||
        error.toString()
      return thunkAPI.rejectWithValue(docmessage)
    }
  }
)

// apply for document
export const MessageDocument = createAsyncThunk(
  'documents/message',
  async ({messageData, documentId}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().stationauth.station.token
      return await documentService.MessageDocument(messageData, documentId, token)
    } catch (error) {
      const docmessage =
        (error.response &&
          error.response.data &&
          error.response.data.docmessage) ||
        error.docmessage ||
        error.toString()
      return thunkAPI.rejectWithValue(docmessage)
    }
  }
)



 
  



export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  // state management for functions 
  extraReducers: (builder) => {
    builder
    // create document
      .addCase(createDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documents.push(action.payload)
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.docmessage = action.payload
      })

      // get all documents
	  .addCase(allDocuments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(allDocuments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documents = action.payload
      })
      .addCase(allDocuments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.docmessage = action.payload
      })
      .addCase(stationDocuments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(stationDocuments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documents = action.payload
      })
      .addCase(stationDocuments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.docmessage = action.payload
      })
      // user documents
      .addCase(getDocuments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.documents = action.payload
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.docmessage = action.payload
      })


      // get single document
      .addCase(GetSingleDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(GetSingleDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleDocument = action.payload
      })
      .addCase(GetSingleDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.docmessage = action.payload
      })
      // docmessage document
      .addCase(MessageDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(MessageDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleDocument = action.payload
      })
      .addCase(MessageDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.docmessage = action.payload
      })

      

     

     

     
  },
})

export const { reset } = documentSlice.actions
export default documentSlice.reducer
