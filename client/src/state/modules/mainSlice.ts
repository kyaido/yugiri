import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import throat from 'throat';
import { AppDispatch } from '../store';
import { State as OptionsState } from './optionsSlice';

type FileOutputType = {
  size: number | null;
  savedSize: number | null;
  ratio: number | null;
  url: string | null;
};

type FileType = {
  name: string;
  isLoading: boolean;
  input: {
    size: number;
  };
  output: FileOutputType;
};

export type State = {
  files: FileType[];
  isDragging: boolean;
  isProcessing: boolean;
  skippedFileCount: number;
};

type Response = {
  input: {
    size: number;
  };
  output: {
    size: number;
    savedSize: number;
    ratio: number;
    lossy: boolean;
    progressive: boolean;
    duration: string;
    url: string;
  };
};

const initialState: State = {
  files: [],
  isDragging: false,
  isProcessing: false,
  skippedFileCount: 0,
};

export type SetDragStatePayload = boolean;

export type OptimizeFilesPayload = {
  files: File[];
  isLossy: OptionsState['isLossy'];
  isProgressive: OptionsState['isProgressive'];
};

const DATA_FIELD_NAME = 'inputFile';
const CONCURRENCY = 5;

const optimizeFiles = createAsyncThunk<void, OptimizeFilesPayload, { dispatch: AppDispatch }>(
  'main/optimizeFiles',
  async (args, thunkAPI) => {
    try {
      await Promise.all(
        Array.from(args.files).map(
          throat(CONCURRENCY, (file) => {
            return new Promise<void>((resolve, _rejected) => {
              const parallel = throat(CONCURRENCY);
              parallel(async () => {
                const filename = file.name;
                const formData = new FormData();
                formData.append(DATA_FIELD_NAME, file, filename);

                try {
                  const query = `?isLossy=${args.isLossy}&isProgressive=${args.isProgressive}`;
                  const { data } = await axios.post<Response>(`/optimize${query}`, formData);
                  thunkAPI.dispatch(succeededOptimization({ filename, response: data }));
                  resolve();
                } catch (err) {
                  thunkAPI.dispatch(failedOptimization(filename));
                  resolve();
                }
              });
            });
          })
        )
      );
    } catch (err) {
      console.log(err);
    }
  }
);

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setDragState(state, action: PayloadAction<SetDragStatePayload>) {
      state.isDragging = action.payload;
    },
    succeededOptimization(state, action: PayloadAction<{ filename: FileType['name'] } & { response: Response }>) {
      const index = state.files.findIndex((e) => e.name === action.payload.filename);
      state.files[index].isLoading = false;
      state.files[index].output.size = action.payload.response.output.size;
      state.files[index].output.savedSize = action.payload.response.output.savedSize;
      state.files[index].output.ratio = action.payload.response.output.ratio;
      state.files[index].output.url = action.payload.response.output.url;
    },
    failedOptimization(state, action: PayloadAction<FileType['name']>) {
      const index = state.files.findIndex((e) => e.name === action.payload);
      state.files[index].isLoading = false;
      state.skippedFileCount = state.skippedFileCount + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(optimizeFiles.pending, (state, action) => {
      state.files = [];
      state.skippedFileCount = 0;
      Array.from(action.meta.arg.files).forEach((file) => {
        const _file: FileType = {
          name: file.name,
          isLoading: true,
          input: {
            size: file.size,
          },
          output: {
            size: null,
            savedSize: null,
            ratio: null,
            url: null,
          },
        };
        state.files.push(_file);
      });
      state.isProcessing = true;
    });
    builder.addCase(optimizeFiles.fulfilled, (state) => {
      state.isProcessing = false;
    });
    builder.addCase(optimizeFiles.rejected, (state) => {
      state.isProcessing = false;
    });
  },
});

const { setDragState, succeededOptimization, failedOptimization } = mainSlice.actions;

export { setDragState, optimizeFiles };

export default mainSlice.reducer;
