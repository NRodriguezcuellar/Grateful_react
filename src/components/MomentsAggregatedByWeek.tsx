import React from 'react';

import MomentDropdown from './MomentDropdown';
import { DateTime } from 'luxon';
import MomentListItem from './MomentListItem';
import { AggregatedWeekWithYear } from '../models/Moment';
import { concatenateAndParse, returnWeekLabel } from '../helpers/general';
import { useTranslation } from 'react-i18next';

const MomentsAggregatedByWeek: React.FC<{ moments: AggregatedWeekWithYear[] }> = (props) => {
    const { t } = useTranslation();
    return (
        <>
            {props.moments.map((currentWeek) => (
                <MomentDropdown
                    level={3}
                    key={concatenateAndParse(currentWeek.week, currentWeek.year)}
                    periodKind={'week'}
                    currentId={concatenateAndParse(currentWeek.week, currentWeek.year)}
                    label={returnWeekLabel(currentWeek.year, currentWeek.month, currentWeek.week, t('this_week'), true)}
                >
                    {currentWeek.days.map((day) => (
                        <MomentDropdown
                            level={3}
                            key={concatenateAndParse(currentWeek.week, currentWeek.year, day.day)}
                            periodKind={'day'}
                            currentId={concatenateAndParse(currentWeek.week, currentWeek.year, day.day)}
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
