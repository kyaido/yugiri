import React, { useCallback, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropReceiver from '../components/DropReciver/component';
import {
  setDragState,
  optimizeFiles,
  State as MainState,
  SetDragStatePayload,
  OptimizeFilesPayload,
} from '../../state/modules/mainSlice';
import { State as OptionsState } from '../../state/modules/optionsSlice';
import { RootState } from '../../state/store';

export type Props = {
  main: MainState;
  isLossy: OptionsState['isLossy'];
  isProgressive: OptionsState['isProgressive'];
  onSetDragState: (payload: SetDragStatePayload) => void;
  onOptimizeFiles: (payload: OptimizeFilesPayload) => void;
};

interface OwnProps {}

const DropReceiverContainer: FunctionComponent<OwnProps> = (ownProps) => {
  const main = useSelector((state: RootState) => state.main);
  const isLossy = useSelector((state: RootState) => state.options.isLossy);
  const isProgressive = useSelector((state: RootState) => state.options.isProgressive);

  const dispatch = useDispatch();
  const onSetDragState = useCallback(
    (payload) => {
      dispatch(setDragState(payload));
    },
    [dispatch]
  );
  const onOptimizeFiles = useCallback(
    (payload) => {
      dispatch(optimizeFiles(payload));
    },
    [dispatch]
  );

  const props = { main, isLossy, isProgressive, onSetDragState, onOptimizeFiles, ...ownProps };

  return <DropReceiver {...props} />;
};

export default DropReceiverContainer;
