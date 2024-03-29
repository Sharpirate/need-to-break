import PropTypes from "prop-types";

const types = {
  navBar: "navBar",
  pagination: "pagination",
};

export { types as tabTypes };
function Tab({ children, type, active, first, last, value, handleClick }) {
  return (
    <li>
      <button
        className={getStyle(type, active, first, last)}
        onClick={() => handleClick(value)}
      >
        {children}
      </button>
    </li>
  );
}

Tab.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClick: PropTypes.func,
};

function getStyle(type, active, first, last) {
  switch (type) {
    case types.navBar:
      return getNavBarStyle(active, first, last);
    case types.pagination:
      return getPaginationStyle(active, first, last);
    default:
      return "";
  }
}

function getNavBarStyle(active, first, last) {
  let baseStyle =
    "w-full block outline-none text-center text-white body-med p-6 border-b border-white 420:p-8 420:text-16 732:font-sbold 732:py-8 732:px-32 732:border-t-2 732:border-b-2 732:border-r-2 732:border-primary-500 732:focus-visible:bg-primary-600 732:focus-visible:text-white";

  let activeStyle = "";

  if (active) {
    activeStyle = "border-opacity-100 732:bg-primary-500 732:text-white";
  } else {
    activeStyle =
      "border-opacity-0 732:border-opacity-100 732:bg-white 732:text-primary-500";
  }

  let borderStyle = "";

  if (first) {
    borderStyle = "732:border-2 732:rounded-l-20";
  } else if (last) {
    borderStyle = "732:border-2 732:border-l-0 732:rounded-r-20";
  }

  return `${baseStyle} ${activeStyle} ${borderStyle}`;
}

function getPaginationStyle(active, first, last) {
  let baseStyle =
    "block outline-none text-center body-sbold py-2 420:py-0 px-8 border-t-2 border-b-2 border-r-2 border-primary-500 focus-visible:bg-primary-600 focus-visible:text-white";

  let activeStyle = "";

  if (active) {
    activeStyle = "bg-primary-500 text-white";
  } else {
    activeStyle = "bg-white text-primary-500";
  }

  let borderStyle = "";

  if (first) {
    borderStyle = "border-2 rounded-l-6";
  } else if (last) {
    borderStyle = "border-2 border-l-0 rounded-r-6";
  }

  return `${baseStyle} ${activeStyle} ${borderStyle}`;
}

export default Tab;
