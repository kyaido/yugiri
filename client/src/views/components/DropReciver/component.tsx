import React, { FunctionComponent } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import Options from '../../containers/Options';
import { Props } from '../../containers/DropReceiver';
import Header from '../Header/component';
import Result from '../Result/component';
import Footer from '../Footer/component';
import style from './style.scss';

export type MainProps = Props['main'];

const defaultTitle = document.title;

const DropReceiver: FunctionComponent<Props> = ({ main, isLossy, isProgressive, onSetDragState, onOptimizeFiles }) => {
  const dropzoneClass = classNames({
    [style.dropzoneButton]: true,
    [style.isDragging]: main.isDragging,
    [style.isProcessing]: main.isProcessing,
  });

  const onDragEnter = () => onSetDragState(true);
  const onDragLeave = () => onSetDragState(false);
  const onDrop = (files: File[]) => onOptimizeFiles({ files, isLossy, isProgressive });
  const { getRootProps, getInputProps, open } = useDropzone({
    onDragEnter,
    onDragLeave,
    onDrop,
    disabled: main.isProcessing,
    noClick: true,
    noKeyboard: true,
    accept: 'image/jpeg, image/png, image/svg+xml, image/gif',
  });

  return (
    <>
      <div {...getRootProps({ className: style.dropReceiver })}>
        <Helmet defer={false}>
          {main.isProcessing ? <title>Processing... / {defaultTitle}</title> : <title>{defaultTitle}</title>}
        </Helmet>
        <Header />
        <main className={style.main}>
          <div className={style.dropzoneButtonWrapper}>
            <input {...getInputProps()} />
            <button type="button" className={dropzoneClass} onClick={open}>
              <p>Try dropping some files here, or click to select files to upload.</p>
              <p>クリックしてファイルを選択するか、ファイルをドロップしてください</p>
            </button>
            {main.isProcessing ? (
              <div className={style.loaderWrapper}>
                <div className={style.loader}>Loading...</div>
              </div>
            ) : null}
          </div>
          <Options />
          <Result {...main} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DropReceiver;
