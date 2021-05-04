import React from 'react';

import MomentDropdown from './MomentDropdown';
import { DateTime } from 'luxon';
import MomentListItem from './MomentListItem';
import { AggregatedMonthWithYear } from '../models/Moment';

const MomentsAggregatedByMonth: React.FC<{ moments: AggregatedMonthWithYear[] }> = (props) => {
    return (
        <>
            {props.moments.map((month) => (
                <MomentDropdown
                    level={1}
                    key={month.month}
                    periodKind={'month'}
                    currentId={month.month}
                    label={`${DateTime.fromObject({ month: month.month }).toFormat('MMM')} ${month.year}`}
                >
                    {month.weeks.map((week) => (
                        <MomentDropdown
                            level={1}
                            key={week.week}
                            periodKind={'week'}
                            currentId={week.week}
                            label={`Week ${week.week}`}
                        >
                            {week.days.map((day) => (
                                <MomentDropdown
                                    level={1}
                                    key={day.day}
                                    periodKind={'day'}
                                    currentId={day.day}
                                    label={DateTime.fromObject({
                                        day: day.day,
                                        month: month.month,
                                    }).toFormat('EEE')}
                                >
                                    {day.moments.map((moment) => (
                                        <MomentListItem key={moment.id} moment={moment} currentItemIndex={moment.id} />
                                    ))}
                                </MomentDropdown>
                            ))}
                        </MomentDropdown>
                    ))}
                </MomentDropdown>
            ))}
        </>
    );
};

export default MomentsAggregatedByMonth;
