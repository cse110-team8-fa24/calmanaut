import React, { useEffect, useState } from 'react';

const ProgressTracker: React.FC = () => {
    const [streak, setStreak] = useState<number>(0);

    useEffect(() => {
        const fetchStreak = async () => {
            try {
                const userId = 73; // Replace this with dynamic user authentication logic
                const response = await fetch(`/api/progress/streak/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch streak data');
                }
                const data = await response.json();
                setStreak(data.streak || 0);
            } catch (error) {
                console.error('Error fetching streak:', error);
            }
        };

        fetchStreak();
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>🔥 Progress Tracker</h1>
            <h2>Current Streak: {streak} days</h2>
        </div>
    );
};

export default ProgressTracker;
