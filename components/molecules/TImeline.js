import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';
import Tab, { tabTypes } from '../atoms/Tab';
import { getIsMobileTimeline } from '../../utils/tailwindUtil';
import NoSSRWrapper from '../../utils/NoSSRWrapper';

const hoursArray = [
  // 5 min
  [
    '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55',
    '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55',
    '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55',
    '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55',
    '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55',
    '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55',
    '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55',
    '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55',
    '20:00'
  ],
  // 15 min
  [
    '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45',
    '19:00', '19:15', '19:30', '19:45',
    '20:00'
  ],
  // 30 min
  [
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30',
    '18:00', '18:30',
    '19:00', '19:30',
    '20:00'
  ],
  // 60 min
  [
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00'
  ]
];

const intervals = [
  { name: '12:00', url: '' },
  { name: '13:00', url: '' },
  { name: '14:00', url: '' },
  { name: '15:00', url: '' },
  { name: '16:00', url: '' },
  { name: '17:00', url: '' },
  { name: '18:00', url: '' },
  { name: '19:00', url: '' },
  { name: '20:00', url: '' },
];

function genRandomTimeline(length) {
  const timeline = [];

  for (let i = 0; i < length; i++) {
    switch (Math.floor(Math.random() * 2)) {
      case 0:
        timeline.push("work")
        break;
      case 1:
        timeline.push("break")
        break;
      case 2:
        timeline.push("floating")
        break;
      case 3:
        timeline.push("blocked")
        break;
      default:
        break;
    }
  }

  return timeline;
}

const timeline = genRandomTimeline(12 * 8);

function getStepBoundsIndex(x, intevals) {
  const step = 1 / (intevals - 1);
  return Math.round(x / step);
}

function Timeline() {
  const [currentInterval, setCurrentInterval] = useState(0);
  const [scrollTarget, setScrollTarget] = useState({ value: null, smooth: null });
  const [scale, setScale] = useState(1);
  const [hours, setHours] = useState(hoursArray[1]);
  const [scroll, setScroll] = useState(0);
  const timelineRef = useRef();

  const isMobile = getIsMobileTimeline();

  // Listen for scroll event
  useLayoutEffect(() => {
    const timeline = timelineRef.current;

    if (timeline) {
      const { clientWidth, scrollWidth } = timeline;
      const scrollableWidth = scrollWidth - clientWidth;

      const handleScroll = e => {
        const currentScroll = e.target.scrollLeft / scrollableWidth;

        if (scrollTarget.value === currentScroll) {
          setScrollTarget({ value: null, smooth: null });
          console.log('target reached')
        }

        setScroll(currentScroll);
      };

      timeline.addEventListener('scroll', handleScroll);
    }

    return () => timeline.removeEventListener('scroll', handleScroll);
  }, [timelineRef, scrollTarget.value]);

  // Update the current interval while scrolling
  useEffect(() => {
    // console.log('scroll: ', scroll)
    const nextInterval = getStepBoundsIndex(scroll, intervals.length);

    if (currentInterval !== nextInterval && scrollTarget.value === null) {
      setCurrentInterval(nextInterval);
    }
  }, [scroll]);

  // Programatically scroll to a certain scroll target
  useLayoutEffect(() => {
    if (scrollTarget.value !== null && scrollTarget.smooth !== null) {
      console.log('new scroll target: ', scrollTarget.value)
      scrollTo(scrollTarget);
    }
  }, [scrollTarget.value, scrollTarget.smooth]);

  const scrollTo = ({ value, smooth }) => {
    const timeline = timelineRef.current;

    if (timeline) {
      const { clientWidth, scrollWidth } = timeline;
      const scrollableWidth = scrollWidth - clientWidth;

      timeline.scrollTo({
        left: value  * scrollableWidth,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  }

  const handleIntervalChange = index => {
    setCurrentInterval(index);
    setScrollTarget({
      value: index / (intervals.length - 1),
      smooth: true
    });
  }

  const handleScaleChange = index => {
    if (index !== scale) {
      setScrollTarget({
        value: scroll,
        smooth: false
      });
      setScale(index);
      setHours(hoursArray[index]);
    }
  }

  const timelineProps = {
    timeline,
    timelineRef,
    hours,
    intervals,
    currentInterval,
    handleIntervalChange,
    scale,
    handleScaleChange,
    progress: 50,
  };

  return isMobile ? <MobileTimeline {...timelineProps} /> : <RegularTimeline {...timelineProps} />;
}

const RegularTimeline = ({ timeline, hours, intervals, currentInterval, scale, handleIntervalChange, handleScaleChange, progress, timelineRef }) => {
  return (
    <div> 
      <div
        tabIndex={0}
        ref={timelineRef}
        className="overflow-x-auto pb-64 custom-scroll px-[50%] focus:outline-none"
        onMouseEnter={() => timelineRef.current.focus()}
      >
        <div
          style={{
            width: `${(156 * (hours.length - 1))}px`,
            // (label width in px * 3) * (number of labels - 1)
            // minWidth: `${1376 - 52}px`
            // minWidth: `${timelineRef.current.clientWidth - 52}px`
            // clientWidth - monopadding
          }}
        >
          <Arrow
            isMobile={false}
            visible={true}
            type={intervalTypes.work}
            progress={progress}
          />

          <ul className='flex flex-row'>
            {timeline.map((interval, index) => (
              <Interval key={index} type={interval} first={index === 0} last={index === timeline.length - 1} />
              ))}
          </ul>

          <ul className='flex flex-row justify-between mt-24 -mx-monopad'>
            {hours.map((hour, index) => (
              <Hour key={index}>{hour}</Hour>
            ))}
          </ul>
        </div>
      </div>

      <Pagination
        intervals={intervals}
        currentInterval={currentInterval}
        handleIntervalChange={handleIntervalChange}
        scales={[
          { name: '5 min', url: '' },
          { name: '15 min', url: '' },
          { name: '30 min', url: '' },
          { name: '60 min', url: '' },
        ]}
        currentScale={scale}
        handleScaleChange={handleScaleChange}
      />

    </div>
  );
};

function MobileTimeline({ timeline, hours, intervals, currentInterval, scale, handleIntervalChange, handleScaleChange, progress, timelineRef }) {
  return (
    <div>
      <Pagination
        intervals={intervals}
        currentInterval={currentInterval}
        handleIntervalChange={handleIntervalChange}
        scales={[
          { name: '5 min', url: '' },
          { name: '15 min', url: '' },
          { name: '30 min', url: '' },
          { name: '60 min', url: '' },
        ]}
        currentScale={scale}
        handleScaleChange={handleScaleChange}
        isMobile={true}
      />
      
      <div
        ref={timelineRef}
        id="timeline"
        // className="overflow-x-auto pb-64 custom-scroll px-[50%] focus:outline-none"
        // className='relative inline-flex flex-row-reverse justify-center'
      >
        <div
          className="relative"
          style={{
            height: `${(156 * (hours.length - 1))}px`,
            // width: `${(156 * (hours.length - 1))}px`,
            // (label width in px * 3) * (number of labels - 1)
            // minWidth: `${1376 - 52}px`
            // clientWidth - monopadding
          }}
        >
          {/* <Arrow
            isMobile={true}
            visible={true}
            type={intervalTypes.work}
            progress={progress}
          /> */}

          <ul className='inline-flex flex-col h-full py-8 420:py-12'>
            {timeline.map((interval, index) => (
              <Interval key={index} type={interval} first={index === 0} last={index === timeline.length - 1} />
              ))}
          </ul>

          <ul className='absolute top-0 flex flex-col h-full justify-between'>
          {/* <ul className='absolute top-0 h-full -left-16 420:-left-24 -translate-x-full flex flex-col justify-between'> */}
            {hours.map((hour, index) => (
              <Hour key={index}>{hour}</Hour>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
  Timeline.propTypes = {
  timeline: PropTypes.array,
  hours: PropTypes.array,
  showArrow: PropTypes.bool
};

function Hour({ children }) {
  return (
    <li className="mono-med text-gray-500 select-none">{children}</li>
  );
}
function Arrow({ type, visible, progress, isMobile }) {
  let colorStyle = '';

  switch (type) {
    case intervalTypes.work:
    case intervalTypes.break:
      colorStyle = 'fill-primary-500';
      break;
    case intervalTypes.blocked:
    case intervalTypes.floating:
    colorStyle = 'fill-blocked-500';
      break;
    default:
      break;
  }

  const visibilityStyle = visible ? "visible" : "invisible";

  return (isMobile ? (
    <div className={`${visibilityStyle} absolute left-full top-8 420:top-12 bottom-8 420:bottom-12`}>
      <svg
        className="relative w-16 h-16 420:w-20 420:h-20 ml-8 -translate-y-1/2"
        style={{ top: `${progress}%` }}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
      <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
      </svg>
    </div>
  ) : (
    <div className={`${visibilityStyle}`}>
      <svg
        className="relative mb-8 w-20 h-20 -rotate-90 -translate-x-1/2"
        style={{ left: `${progress}%` }}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
      </svg>
    </div>
  ));
}

Arrow.propTypes = {
  type: PropTypes.string,
  visible: PropTypes.bool,
  progress: PropTypes.number
};

function Pages({ pages, currentPage, handlePageChange }) {
  return (
    <ul className="flex">
      {pages.map((page, index) => (
        <Tab
          key={page.url}
          type={tabTypes.pagination}
          first={index === 0}
          active={index === currentPage}
          last={index === pages.length - 1}
          url={page.url}
          handleClick={() => handlePageChange(index)}
        >
          {page.name}
        </Tab>
      ))}
    </ul>
  );
}

function Pagination({ intervals, currentInterval, handleIntervalChange, scales, currentScale, handleScaleChange, isMobile }) {
  return isMobile ? (
    <div className="flex justify-center py-32 420:py-48 sticky top-0 z-10 bg-white">
    {/* <div className="flex justify-center py-32 420:py-48 sticky top-0 z-10 bg-white"> */}
      <Pages
        pages={scales}
        currentPage={currentScale}
        handlePageChange={handleScaleChange}  
      />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center gap-24 pb-0 pt-48">
      <Pages
        pages={intervals}
        currentPage={currentInterval}
        handlePageChange={handleIntervalChange}
      />
      <Pages
        pages={scales}
        currentPage={currentScale}
        handlePageChange={handleScaleChange}
      />
    </div>
  );
}

export default Timeline;