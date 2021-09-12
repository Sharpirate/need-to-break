import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Arrow, { arrowTypes } from './Arrow';
function ViewMoreLess({ viewMoreText, viewLessText, children, isTimeline }) {
  const [active, setActive] = useState(false);

  const contentStyle = `${active ? 'block' : 'hidden'} w-full ${isTimeline ? '900:block' : ''}`;
  const buttonStyle = `${isTimeline ? '900:hidden' : ''}`;

  return (
    <>
      <button 
        className={`flex justify-center items-center gap-6 420:gap-8 font-base text-13 420:text-16 font-sbold tracking-2 text-primary-500 outline-none ${buttonStyle}`}
        onClick={() => setActive(!active)}
        >
        {active ? viewLessText : viewMoreText}
        <div className="pt-4">
          <Arrow type={active ? arrowTypes.up : arrowTypes.down} size={arrowTypes.small} state={arrowTypes.active} />
        </div>
      </button>

      <div className={contentStyle}>
        {children}
      </div>
    </>
  );
}

ViewMoreLess.propTypes = {
  viewMoreText: PropTypes.string,
  viewLessText: PropTypes.string,
  isTimeline: PropTypes.bool
};

export default ViewMoreLess;