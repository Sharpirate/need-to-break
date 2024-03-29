import PropTypes from "prop-types";

const types = {
  work: "work",
  break: "break",
  blocked: "blocked",
  floating: "floating",
  starting: "starting",
  end: "end",
};

export { types as intervalTypes };

function Interval({ type, first, last, duration }) {
  return (
    <li
      className={getStyle(type, first, last)}
      style={{ flexGrow: duration }}
    />
  );
}

Interval.propTypes = {
  type: PropTypes.string,
  first: PropTypes.bool,
  last: PropTypes.bool,
  duration: PropTypes.number,
};

function getStyle(type, first, last) {
  let baseStyle =
    "block h-full w-32 420:w-40 932:w-auto 932:h-32 1172:h-40 hover:bg-primary-600 hover:cursor-pointer";

  let colorStyle = "";

  switch (type) {
    case types.work:
      colorStyle = "bg-primary-500";
      break;
    case types.break:
      colorStyle = "bg-primary-400";
      break;
    case types.blank:
      colorStyle = "bg-primary-300";
      break;
    case types.blocked:
      colorStyle = "bg-blocked-500";
      break;
    case types.floating:
      colorStyle = "bg-blocked-400";
      break;
    default:
      break;
  }

  let borderStyle = "";

  if (first && last) {
    borderStyle =
      "rounded-t-20 rounded-b-20 932:rounded-0 932:rounded-l-20 932:rounded-r-20";
  } else if (first) {
    borderStyle = "rounded-t-20 932:rounded-0 932:rounded-l-20";
  } else if (last) {
    borderStyle = "rounded-b-20 932:rounded-0 932:rounded-r-20 ";
  }

  return `${baseStyle} ${colorStyle} ${borderStyle}`;
}

export default Interval;
