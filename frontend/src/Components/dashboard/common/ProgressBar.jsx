import React, { useEffect, useState } from 'react';
import {
    Activity,
    AlertCircle,
    ChevronRight,
    Heart
} from 'lucide-react';

const ProgressBar = ({
    start,
    current,
    end,
    type = 'amount',
    className = ''
}) => {
    const [progress, setProgress] = useState(0);
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        let total, achieved;

        if (type === 'amount') {
            total = end - start;
            achieved = current - start;
            const percentage = (achieved / total) * 100;
            setProgress(Math.min(Math.max(percentage, 0), 100));
            setRemaining(total - achieved);
        } else {
            const startTime = new Date(start).getTime();
            const endTime = new Date(end).getTime();
            const currentTime = new Date(current).getTime();

            total = endTime - startTime;
            achieved = currentTime - startTime;
            const percentage = (achieved / total) * 100;
            setProgress(Math.min(Math.max(percentage, 0), 100));
            setRemaining(endTime - currentTime);
        }
    }, [start, current, end, type]);

    const formatValue = (value) => {
        if (type === 'amount') {
            return `NPR ${Number(value).toLocaleString()}`;
        } else {
            return new Date(value).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    const getProgressStatus = () => {
        if (progress >= 80) {
            return {
                icon: AlertCircle,
                color: 'text-red-500',
                bgColor: 'bg-red-100'
            };
        } else if (progress >= 50) {
            return {
                icon: Activity,
                color: 'text-yellow-500',
                bgColor: 'bg-yellow-100'
            };
        }
        return {
            icon: Heart,
            color: 'text-green-500',
            bgColor: 'bg-green-100'
        };
    };

    const status = getProgressStatus();
    const StatusIcon = status.icon;

    const calculateRemaining = () => {
        if (type === 'amount') {
            return `${formatValue(remaining)} remaining`;
        } else {
            const days = Math.ceil(remaining / (1000 * 60 * 60 * 24));
            return `${days} days remaining`;
        }
    };

    return (
        <div className={`relative w-full ${className}`}>
            <h3 className='font-bold'>{type === 'amount' ? "Insurance Amount" : "Insurance Period"}</h3>

            {/* Main Bar */}
            <div className="w-full h-4 bg-gray-400 rounded-full overflow-hidden relative">
                {/* Progress Fill */}
                <div
                    className="h-full transition-all duration-700 ease-out rounded-full bg-green-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{formatValue(start)}</span>
                <span>{formatValue(end)}</span>
            </div>

            {/* Status Text */}
            <div className="mt-1 flex items-center gap-1 text-sm">
                <span className={status.color}>
                    {progress >= 80 ? 'Critical' : progress >= 50 ? 'Moderate' : 'Good'}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">
                    {calculateRemaining()}
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;
