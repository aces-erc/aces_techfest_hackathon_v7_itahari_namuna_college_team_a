import {
    Activity,
    AlertCircle,
    ChevronRight,
    Heart
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ProgressBar = ({
    start,
    current,
    end,
    type = 'amount',
    className = ''
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Calculate progress percentage
        const total = end - start;
        const achieved = current - start;
        const percentage = (achieved / total) * 100;
        setProgress(Math.min(Math.max(percentage, 0), 100));
    }, [start, current, end]);

    // Format values based on type
    const formatValue = (value) => {
        if (type === 'amount') {
            return `NPR ${value.toLocaleString()}`;
        } else {
            // Assuming value is in days
            return value === 1 ? '1 day' : `${value} days`;
        }
    };

    // Get appropriate icon and color based on progress
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

    return (
        <div className={`relative w-full ${className}`}>
            {/* Main Bar */}
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden relative">
                {/* Progress Fill */}
                <div
                    className="h-full transition-all duration-700 ease-out rounded-full bg-green-500"
                    style={{ width: `${progress}%` }}
                />

                {/* Floating Icon */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out`}
                    style={{ left: `${progress}%` }}
                >

                </div>
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
                    {type === 'amount'
                        ? `${Math.round(100 - progress)}% remaining`
                        : `${formatValue(end - current)} remaining`}
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;
