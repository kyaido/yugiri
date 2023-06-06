import React, { useCallback, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { toggleLossy, toggleProgressive, State as OptionsState } from '../../state/modules/optionsSlice';
import { State as MainState } from '../../state/modules/mainSlice';
import Options from '../components/Options/component';

export type Props = {
  isLossy: OptionsState['isLossy'];
  isProgressive: OptionsState['isProgressive'];
  isProcessing: MainState['isProcessing'];
  onClickToggleLossy: () => void;
  onClickToggleProgressive: () => void;
};

interface OwnProps {}

const OptionsContainer: FunctionComponent<OwnProps> = (ownProps) => {
  const isLossy = useSelector((state: RootState) => state.options.isLossy);
  const isProgressive = useSelector((state: RootState) => state.options.isProgressive);
  const isProcessing = useSelector((state: RootState) => state.main.isProcessing);

  const dispatch = useDispatch();
  const onClickToggleLossy = useCallback(() => {
    dispatch(toggleLossy());
  }, [dispatch]);
  const onClickToggleProgressive = useCallback(() => {
    dispatch(toggleProgressive());
  }, [dispatch]);

  const props = { isLossy, isProgressive, isProcessing, onClickToggleLossy, onClickToggleProgressive, ...ownProps };

  return <Options {...props} />;
};

export default OptionsContainer;
