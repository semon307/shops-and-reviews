import React, { FC } from 'react';
import { Color } from '../ui/color';

type StarProps = {
  backgroundColor: Color;
};
export const Star: FC<StarProps> = (props) => (
  <svg width={'34'} height={'32'} viewBox={'0 0 36 32'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
    <path
      d={'M18 0L22.0413 12.0922L35.119 12.0922L24.5389 19.5656L28.5801 31.6578L18 24.1844L7.41987 31.6578L11.4611 19.5656L0.880983 12.0922L13.9587 12.0922L18 0Z'}
      fill={props.backgroundColor}
    />
  </svg>
);
