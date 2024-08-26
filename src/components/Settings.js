import React from 'react';

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <div>
        <h3>Notifications</h3>
        <label>
          <input type="checkbox" /> Enable Notifications
        </label>
      </div>
      <div>
        <h3>Privacy</h3>
        <label>
          <input type="checkbox" /> Private Account
        </label>
      </div>
    </div>
  );
}

export default Settings;
