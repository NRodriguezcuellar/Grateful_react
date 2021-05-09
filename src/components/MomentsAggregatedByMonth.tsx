import React from 'react';

import MomentDropdown from './MomentDropdown';
import { DateTime } from 'luxon';
import MomentListItem from './MomentListItem';
import { AggregatedMonthWithYear } from '../models/Moment';
import { concatenateAndParse, returnMonthLabel, returnWeekLabel } from '../helpers/general';
import { useTranslation } from 'react-i18next';

const MomentsAggregatedByMonth: React.FC<{ moments: AggregatedMonthWithYear[] }> = (props) => {
    const { t } = useTranslation();
    return (
        <>
            {props.moments.map((month) => (
                <MomentDropdown
                    level={3}
                    key={concatenateAndParse(month.month, month.year)}
                    periodKind={'month'}
                    currentId={concatenateAndParse(month.month, month.year)}
                    label={returnMonthLabel(month.year, month.month, t('this_month'), true)}
                >
                    {month.weeks.map((week) => (
                        <MomentDropdown
                            level={3}
                            key={concatenateAndParse(week.week, month.year)}
                            periodKind={'week'}
                            currentId={concatenateAndParse(week.week, month.year)}
                            label={returnWeekLabel(month.year, month.month, week.week, t('this_week'))}
                        >
                            {week.days.map((day) => (
                                <MomentDropdown
                                    level={3}
                                    key={concatenateAndParse(week.week, month.year, day.day)}
                                    periodKind={'day'}
                                    currentId={concatenateAndParse(week.week, month.year, day.day)}
                                    label={DateTime.fromObject({
                                        day: day.day,
                                        month: month.month,
                                        year: month.year,
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
