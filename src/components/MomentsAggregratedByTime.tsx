import React from 'react';
import { Moment } from '../models/Moment';

import { MomentAggregator } from '../helpers/aggregate';
import MomentsAggregatedRecursively from './MomentsAggregatedRecursively';

const AggregatedMoments: React.FC<{ aggregrationType: string; moments: Moment[] }> = (props) => {
    const aggregatedMoments = new MomentAggregator(props.moments);

    switch (props.aggregrationType) {
        case 'year':
            return <> {MomentsAggregatedRecursively({ moments: aggregatedMoments.byYear() })}</>;
        case 'month':
            return <> {MomentsAggregatedRecursively({ moments: aggregatedMoments.byMonth() })}</>;
        case 'week':
            return <> {MomentsAggregatedRecursively({ moments: aggregatedMoments.byWeek() })}</>;
        default:
            return <div>Something went wrong...</div>;
    }
};

export default AggregatedMoments;
