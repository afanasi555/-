import React from 'react';

function VPN() {
  const startVPN = () => {
    // Логика подключения к VPN (необходимо интегрировать с внешним VPN-сервисом)
    console.log('VPN started');
  };

  return (
    <div>
      <h2>VPN</h2>
      <button onClick={startVPN}>Start VPN</button>
    </div>
  );
}

export default VPN;
