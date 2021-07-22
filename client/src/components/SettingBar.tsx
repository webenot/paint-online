import React, { ChangeEvent, FC, ReactElement, useCallback } from 'react';

import '@Styles/toolbar.sass';

import toolState from '@Store/toolState';

type TProps = {
  children?: never;
}

export const SettingBar: FC<TProps> = (): ReactElement => {

  const setLineWidthHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    toolState.setLineWidth(+e.target.value);
  }, []);

  const selectColorHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    toolState.setStrokeColor(e.target.value);
  }, []);

  return (
    <div className="toolbar setting-bar">
      <label htmlFor="line-width">Line Width</label>
      <input
        type="number"
        min={1}
        max={50}
        defaultValue={1}
        id="line-width"
        style={{ margin: '0 1rem' }}
        onChange={setLineWidthHandler}
      />
      <label htmlFor="line-color">Line Color</label>
      <input
        type="color"
        onChange={selectColorHandler}
        id="line-color"
      />
    </div>
  );
};
