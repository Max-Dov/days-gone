import React, { HTMLAttributes } from 'react';
import './icon.styles.scss';


interface IconProps extends HTMLAttributes<HTMLDivElement> {
  name: keyof typeof ICONS;
}

/**
 * Svg icon provider.
 */
export const Icon = ({ name, ...containerProps }: IconProps) =>
  <div className="icon" {...containerProps}>
    {ICONS[name]}
  </div>;

/**
 * When adding icon to list, make sure:
 *   1. Icon height is 1em and width is proportional to that. That allows convenient rescale via "font-size" CSS prop.
 *   2. Parts of icon with customizable colors to be "currentColor". That value takes current CSS "color" prop.
 */
const ICONS = {

} as const;