import Color from 'color';
import { useMemo } from 'react';

function DisappearingOverlay({ color }) {
  const { bgColorFullOpacity, bgColorNoOpacity } = useMemo(() => {
    const bgColor = Color(color);
    const bgColorFullOpacity = bgColor.string();
    const bgColorNoOpacity = Color(bgColor).alpha(0).string();

    return {
      bgColorFullOpacity,
      bgColorNoOpacity,
    };
  }, [color]);

  return (
    <div
      className='absolute w-full h-full'
      style={{
        background: `-webkit-gradient(linear, left top, left bottom, from(${bgColorNoOpacity}), to(${bgColorFullOpacity}))`,
      }}
    ></div>
  );
}

export default DisappearingOverlay;
