import React from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Grid } from 'react-loader-spinner';

import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loaderWrapper}>
      <Grid
        className={s.loader}
        color="rgb(204, 127, 194)"
        height={80}
        width={80}
      />
    </div>
  );
};
export default Loader;
