import React, { FunctionComponent } from 'react';
import { Props } from '../../containers/Options';
import style from './style.scss';

const Options: FunctionComponent<Props> = ({
  isLossy,
  isProgressive,
  isProcessing,
  onClickToggleLossy,
  onClickToggleProgressive,
}) => (
  <details>
    <summary>Options</summary>
    <ul className={style.options}>
      <li className={style.optionItem}>
        <label htmlFor="lossy">
          <input
            id="lossy"
            type="checkbox"
            defaultChecked={isLossy}
            onChange={() => onClickToggleLossy()}
            disabled={isProcessing}
          />{' '}
          lossy
        </label>
        <div className={style.description}>
          オン：減色処理をするため画像容量を大幅に減らせます。
          <br />
          オフ：減色処理をしません。画質の劣化が気になる場合はオフにしてください。
        </div>
      </li>
      <li className={style.optionItem}>
        <label htmlFor="progressive">
          <input
            id="progressive"
            type="checkbox"
            defaultChecked={isProgressive}
            onChange={() => onClickToggleProgressive()}
            disabled={isProcessing}
          />{' '}
          progressive
        </label>
        <div className={style.description}>
          オン：JPEGをprogressive JPEGに変換します。
          <br />
          オフ：変換処理を行いません。
        </div>
      </li>
    </ul>
  </details>
);

export default Options;
