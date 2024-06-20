import React from 'react';

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    const getColor = (): string => {
        if (percentage < 45) return 'red';
        if (percentage < 80) return 'orange';
        return 'green';
    };

    const containerStyles: React.CSSProperties = {
        height: '20px',
        width: '200px',
        backgroundColor: '#e0e0df',
        borderRadius: '50px',
        margin: '10px 0',
    };

    const fillerStyles: React.CSSProperties = {
        height: '100%',
        width: `${percentage}%`,
        backgroundColor: getColor(),
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 0.2s ease-in',
    };

    const labelStyles: React.CSSProperties = {
        padding: '5px',
        color: 'black',
        fontWeight: 'bold',
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${percentage}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
