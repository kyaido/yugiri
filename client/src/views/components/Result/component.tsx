import React, { FunctionComponent } from 'react';
import prettyBytes from 'pretty-bytes';
import axios from 'axios';
import JSZip from 'jszip';
import filesaver from 'file-saver';
import { MainProps as Props } from '../DropReciver/component';
import style from './style.scss';

const Reslut: FunctionComponent<Props> = (props) => {
  const createZip = () => {
    const zip = new JSZip();
    Promise.all(
      props.files
        .filter((e) => e.output.url)
        .map(async (file) => {
          try {
            const image = await axios.get(file.output.url as string, {
              responseType: 'arraybuffer',
            });
            const date = new Date();
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
            zip.file(file.name, image.data, {
              date: localDate,
            });
          } catch (err) {
            console.error(err);
          }
        })
    ).then(async () => {
      const content = await zip.generateAsync({ type: 'blob' });
      filesaver.saveAs(content, 'optimized.zip');
    });
  };

  const getDownloadLink = (url: string | null) => {
    if (!url) {
      return <span>Failed</span>;
    }

    return (
      <a href={url} target="_blank">
        Download
      </a>
    );
  };

  return props.files.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>File name</th>
          <th>Original size</th>
          <th>Optimized size</th>
          <th>% Savings</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.files.map((file, index) => (
          <tr key={index}>
            <td>{file.name}</td>
            <td>{prettyBytes(file.input.size)}</td>
            <td>{file.output.size && file.output.size > 0 ? prettyBytes(file.output.size) : '-'}</td>
            <td>{file.output.ratio && file.output.ratio > 0 ? `${file.output.ratio.toFixed(1)}%` : '-'}</td>
            <td>{file.isLoading ? 'waiting...' : getDownloadLink(file.output.url)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>All</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>
            {!props.isProcessing && props.files.length !== props.skippedFileCount ? (
              <button className={style.downloadAll} onClick={createZip}>
                Download All
              </button>
            ) : null}
          </td>
        </tr>
      </tfoot>
    </table>
  ) : null;
};

export default Reslut;
