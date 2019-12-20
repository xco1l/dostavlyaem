import * as React from 'react';

import './Avatar.scss';
import defaultAvatar from 'assets/img/default_avatar.png';

export interface IAvatarProps {
  href?: string;
}

export const Avatar: React.FC<IAvatarProps> = ({href}) => {
  return (
    <div className="avatar">
      <div className="avatar__inner">
        <img src={href || defaultAvatar} alt="user avatar" />
      </div>
    </div>
  );
};
