// src/components/ChangeHistory.js

import React from 'react';

const ChangeHistory = ({ history }) => {
  if (!history.length) {
    return <div>No change history available.</div>;
  }

  return (
    <div className="change-history">
      <h3>Change History</h3>
      <ul>
        {history.map((change, index) => (
          <li key={index}>
            <strong>{change.date}</strong>: {change.field} changed from "{change.oldValue}" to "{change.newValue}"
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChangeHistory;
