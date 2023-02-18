import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl('https://abdelwahebbouden.com');
  }, []);
  const handleRedirect = () => {
    window.location.href = url;
  };
  return (
    <div className="App">
      <header className="App-header">
      <div>
      <QRCode value={url} onClick={handleRedirect} />
    </div>
      </header>
    </div>
  );
}

export default App;
