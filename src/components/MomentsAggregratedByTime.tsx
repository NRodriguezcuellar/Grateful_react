import React from 'react';
import { Moment } from '../models/Moment';

import MomentsAggregatedByYear from './MomentsAggregatedByYear';
import { MomentAggregator } from '../helpers/aggregate';
import MomentsAggregatedByMonth from './MomentsAggregatedByMonth';
import MomentsAggregatedByWeek from './MomentsAggregatedByWeek';

const AggregatedMoments: React.FC<{ aggregrationType: string; moments: Moment[] }> = (props) => {
    const aggregatedMoments = new MomentAggregator(props.moments);

    switch (props.aggregrationType) {
        case 'year':
            return MomentsAggregatedByYear({ moments: aggregatedMoments.byYear() });
        case 'month':
            return MomentsAggregatedByMonth({ moments: aggregatedMoments.byMonth() });
        case 'week':
            return MomentsAggregatedByWeek({ moments: aggregatedMoments.byWeek() });
        default:
            return <div>Something went wrong...</div>;
    }
};

export default AggregatedMoments;
