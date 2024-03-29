import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timeline from "./Timeline";
import Label, { labelTypes } from "../atoms/Label";
import Button, { buttonTypes } from "../atoms/Button";
import Icon, { iconTypes } from "../atoms/Icon";
import DeletePresetModal from "./cards/DeletePresetModal";
import { blueprintToTimeline, startTimeline } from "../../utils/timelineUtil";
import { parseStartTime } from "../../utils/timeUtil";
import { useRouter } from "next/router";
import { getDetails } from "../../utils/timelineUtil";
import { useAuth } from "../../firebase/Firebase";
import TimelineHasEndedModal from "./cards/TimelineHasEndedModal";

function Preset({ preset }) {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [endedModalIsOpen, setEndedModalIsOpen] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [timeline, setTimeline] = useState();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    setTimeline(blueprintToTimeline(preset));
  }, []);

  function handleStart() {
    if (preset && user) {
      const startTime = parseStartTime(preset.startTime);
      const endTime = startTime + preset.duration * 1000;

      if (Date.now() <= endTime) {
        startTimeline(preset);
        router.push("/timeline");
      } else {
        setEndedModalIsOpen(true);
      }
    }
  }

  const details = getDetails(preset);

  return timeline ? (
    <section className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 932:py-32">
      {/* Icon & Name */}
      <div className="flex flex-col justify-center items-center gap-16 420:gap-24 mb-16 420:mb-24">
        <Icon type={iconTypes.save} />
        <Label size={labelTypes.large} as={labelTypes.h2}>
          {preset.name}
        </Label>
      </div>

      {/* Info List */}
      <ul className="w-full flex flex-col 932:flex-row justify-center items-center 932:justify-evenly 932:items-start gap-24 420:gap-32 932:gap-0 mb-32 420:mb-48">
        <li>
          <Label size={labelTypes.big} as={labelTypes.h3}>
            Type
          </Label>
          <p className="body-sbold text-gray-500">{details.type}</p>
        </li>

        <li>
          <Label size={labelTypes.big} as={labelTypes.h3}>
            Timeline
          </Label>
          <p className="body-sbold text-gray-500">{details.duration}</p>
        </li>

        <li>
          <Label size={labelTypes.big} as={labelTypes.h3}>
            Intervals
          </Label>
          <p className="body-sbold text-gray-500">
            Work: {details.workDuration} min
            <br />
            Break: {details.breakDuration} min
          </p>
        </li>

        {/* <li>
          <Label size={labelTypes.big} as={labelTypes.h3}>Blocked</Label>
          <p className="body-sbold text-gray-500">
            12:00 to 12:30
            <br />
            17:00 to 17:15
          </p>
        </li> */}
      </ul>

      {/* Timeline & Buttons (Able To Reverse Flex Order) */}
      <div className="w-full flex flex-col 932:flex-col-reverse justify-center items-center">
        <div className="grid gap-24 420:gap-32 540:grid-cols-2 540:gap-24 mb-32 420:mb-48 932:mb-0 932:mt-48">
          <Button handleClick={handleStart} type={buttonTypes.primary}>
            Start
          </Button>
          <Button
            handleClick={() => setDeleteModalIsOpen(true)}
            type={buttonTypes.outline}
          >
            Delete
          </Button>
        </div>

        {/* Timeline Block */}
        <ViewMoreLess
          viewMoreText="View Timeline"
          viewLessText="Hide Timeline"
          isTimeline={true}
          active={viewMore}
          handleClick={() => setViewMore(!viewMore)}
        >
          <div className="mt-32 420:mt-48 932:mt-0 w-full">
            <Timeline timeline={timeline} />
          </div>
        </ViewMoreLess>
      </div>

      {/* Delete Preset Modal */}
      <DeletePresetModal
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        name={preset.name}
        id={preset.id}
      />

      {/* Timeline Has Ended */}
      <TimelineHasEndedModal
        isOpen={endedModalIsOpen}
        setIsOpen={setEndedModalIsOpen}
      />
    </section>
  ) : null;
}

Preset.propTypes = {
  name: PropTypes.string,
};

export default Preset;
