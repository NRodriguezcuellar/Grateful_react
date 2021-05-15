import { AggregatedDay, AggregatedMoment, AggregatedMonth, AggregatedWeek, MomentWithDateData } from '../models/Moment';
import MomentDropdown from './MomentDropdown';
import { concatenateAndParse, returnDayLabel, returnMonthLabel, returnWeekLabel } from '../helpers/general';
import MomentListItem from './MomentListItem';
import React from 'react';

const MomentsAggregatedRecursively: React.FC<{ moments: any }> = ({ moments }) => {
    return moments.map((moment: AggregatedWeek | AggregatedMonth | AggregatedDay | AggregatedMoment) => {
        const keys = Object.keys(moment);

        if (keys.includes('weeks')) {
            const momentObject = moment as AggregatedMonth;
            return (
                <MomentDropdown
                    level={3}
                    key={concatenateAndParse(momentObject.year)}
                    periodKind={'month'}
                    currentId={concatenateAndParse(momentObject.year)}
                    label={returnMonthLabel(momentObject.year, momentObject.month, true)}
                >
                    {MomentsAggregatedRecursively({ moments: momentObject.weeks })}
                </MomentDropdown>
            );
        }

        if (keys.includes('days')) {
            const momentObject = moment as AggregatedWeek;
            console.log(momentObject);
            return (
                <MomentDropdown
                    level={3}
                    key={concatenateAndParse(momentObject.week, momentObject.year)}
                    periodKind={'week'}
                    currentId={concatenateAndParse(momentObject.year, momentObject.year)}
                    label={returnWeekLabel(momentObject.year, momentObject.month, momentObject.week, true)}
                >
                    {MomentsAggregatedRecursively({ moments: momentObject.days })}
                </MomentDropdown>
            );
        }

        if (keys.includes('moments')) {
            const momentObject = moment as AggregatedDay;
            return (
                <MomentDropdown
                    level={3}
                    key={concatenateAndParse(momentObject.week, momentObject.year, momentObject.day)}
                    periodKind={'day'}
                    currentId={concatenateAndParse(momentObject.year, momentObject.year, momentObject.day)}
                    label={returnDayLabel(momentObject.year, momentObject.month, momentObject.week)}
                >
                    {momentObject.moments.map((moment: MomentWithDateData) => (
                        <MomentListItem key={moment.id} moment={moment} currentItemIndex={moment.id} />
                    ))}
                </MomentDropdown>
            );
        }

        if (keys.includes('months')) {
            const momentObject = moment as AggregatedMoment;
            return (
                <MomentDropdown
                    level={5}
                    key={momentObject.year}
                    periodKind={'year'}
                    currentId={momentObject.year}
                    label={momentObject.year.toString()}
                >
                    {MomentsAggregatedRecursively({ moments: momentObject.months })}
                </MomentDropdown>
            );
        }
    });
};

export default MomentsAggregatedRecursively;
