import React, { useState, useEffect } from 'react';

interface CurrentInfoProps {
  username: string;
}

const CurrentInfo: React.FC<CurrentInfoProps> = ({ username }) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toISOString()
        .replace('T', ' ')
        .slice(0, 19);
      setCurrentDateTime(formatted);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <pre style={{ margin: 0, fontFamily: 'inherit' }}>
      {`Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${currentDateTime}
Current User's Login: ${username}
`}
    </pre>
  );
};

export default CurrentInfo;