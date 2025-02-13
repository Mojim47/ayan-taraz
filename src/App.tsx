import React from 'react';
import AppRoutes from './routes';
import { DateTime } from './components/common/DateTime';

const MyComponent: React.FC = () => {
  const currentDate = new Date('2025-02-13 16:25:42');
  
  const App = () => {
    return (
      <div>
        <DateTime date={currentDate} />
        <AppRoutes />
        <DateTime 
          date={currentDate}
          format="YYYY/MM/DD"
          showIcon={false}
          showTimeAgo={false}
        />
        <DateTime 
          date={currentDate}
          updateInterval={30000} // به‌روزرسانی هر 30 ثانیه
          variant="body1"
          color="primary"
        />
      </div>
    );
  };

  return <App />;
};

export default MyComponent;