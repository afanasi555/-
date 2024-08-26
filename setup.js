const fs = require('fs');
const path = require('path');

// Функция для записи файла с кодом
const writeFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created: ${filePath}`);
};

// Определите структуру проекта и коды файлов
const files = {
  'src/App.js': `
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './components/Profile';
import Room from './pages/Room';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/room/:id" component={Room} />
      </Switch>
    </Router>
  );
}

export default App;
`,
  'src/index.js': `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
`,
  'src/components/Chat.js': `
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(\`/api/room/${'{roomId}'}/chat\`);
      setMessages(response.data);
    };
    fetchMessages();
  }, [roomId]);

  const sendMessage = async () => {
    await axios.post(\`/api/room/${'{roomId}'}/chat\`, { message });
    setMessage('');
    const response = await axios.get(\`/api/room/${'{roomId}'}/chat\`);
    setMessages(response.data);
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
`,
  'src/components/Profile.js': `
import React, { useState } from 'react';
import axios from 'axios';

function Profile() {
  const [nick, setNick] = useState('');
  const [avatar, setAvatar] = useState('');
  const [description, setDescription] = useState('');

  const updateProfile = async () => {
    await axios.post('/api/profile', { nick, avatar, description });
  };

  return (
    <div>
      <h1>Profile</h1>
      <input
        type="text"
        placeholder="Nick"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
}

export default Profile;
`,
  'src/components/Settings.js': `
import React from 'react';

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      {/* Добавьте настройки здесь */}
    </div>
  );
}

export default Settings;
`,
  'src/components/VideoPlayer.js': `
import React from 'react';

function VideoPlayer({ videoUrl }) {
  return (
    <div>
      <h1>Video Player</h1>
      <video width="600" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
`,
  'src/pages/Home.js': `
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/profile">Profile</Link>
      <br />
      <Link to="/settings">Settings</Link>
    </div>
  );
}

export default Home;
`,
  'src/pages/Login.js': `
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await axios.post('/api/login', { email, password });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
`,
  'src/pages/Register.js': `
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await axios.post('/api/register', { nick, email, password });
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Nick"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
`,
  'src/pages/Room.js': `
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';
import Chat from '../components/Chat';

function Room({ match }) {
  const { id } = match.params;
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchRoomData = async () => {
      const response = await axios.get(\`/api/room/${'{id}'}`);
      setVideoUrl(response.data.videoUrl);
    };
    fetchRoomData();
  }, [id]);

  return (
    <div>
      <h1>Room: {id}</h1>
      <VideoPlayer videoUrl={videoUrl} />
      <Chat roomId={id} />
    </div>
  );
}

export default Room;
`,
  'public/index.html': `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`,
  'public/favicon.ico': '',  // Вы можете добавить иконку, если нужно
  'package.json': `
{
  "name": "webapp",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^0.21.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.1.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
`,
  'README.md': `
# WebApp

This is a web application created using React.

## Getting Started

1. **Install Dependencies:**

   \`\`\`
   npm install
   \`\`\`

2. **Start the Application:**

   \`\`\`
   npm start
   \`\`\`

3. **Build for Production:**

   \`\`\`
   npm run build
   \`\`\`

4. **Deploy to GitHub Pages:**

   \`\`\`
   npm run deploy
   \`\`\`
`
};

// Создайте необходимые каталоги и файлы
const createProjectStructure = () => {
  // Создание каталога src и всех подкаталогов
  const srcDir = path.join(__dirname, 'src');
  if (!fs.existsSync(srcDir)){
    fs.mkdirSync(srcDir);
  }

  // Создание файлов
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    writeFile(fullPath, content);
  }
};

createProjectStructure();
