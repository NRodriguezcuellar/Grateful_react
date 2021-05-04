import React from 'react';

import MomentDropdown from './MomentDropdown';
import { DateTime } from 'luxon';
import MomentListItem from './MomentListItem';
import { AggregatedWeekWithYear } from '../models/Moment';

const MomentsAggregatedByWeek: React.FC<{ moments: AggregatedWeekWithYear[] }> = (props) => {
    return (
        <>
            {props.moments.map((currentWeek) => (
                <MomentDropdown
                    level={1}
                    key={currentWeek.week}
                    periodKind={'week'}
                    currentId={currentWeek.week}
                    label={`Week ${currentWeek.week}`}
                >
                    {currentWeek.days.map((day) => (
                        <MomentDropdown
                            level={1}
                            key={day.day}
                            periodKind={'day'}
                            currentId={day.day}
                            label={DateTime.fromObject({
                                day: day.day,
                                year: currentWeek.year,
                                month: currentWeek.month,
                            }).toFormat('EEE')}
                        >
                            {day.moments.map((moment) => (
                                <MomentListItem key={moment.id} moment={moment} currentItemIndex={moment.id} />
                            ))}
                        </MomentDropdown>
                    ))}
                </MomentDropdown>
            ))}
        </>
    );
};

export default MomentsAggregatedByWeek;
