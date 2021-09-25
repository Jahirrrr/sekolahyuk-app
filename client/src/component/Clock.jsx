/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */

import React from 'react';
import Timer from '../utils/Timer';

const Clock = ({ testId, time, duration, endTest }) => {
  return (
    <div className="clock" style={{ marginTop: '100px', marginLeft: '80px' }}>
      <h3>Remaining Time</h3>
      <div className="stopwatch-card">
        <p>
          <Timer
            endTest={endTest}
            testId={testId}
            duration={duration}
            time={time}
          />
        </p>
      </div>
    </div>
  );
};

export default Clock;
