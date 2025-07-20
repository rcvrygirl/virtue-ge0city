// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [username, setUsername] = useState(null);
//   const [sessionId, setSessionId] = useState(null);

//   useEffect(() => {
//     // Load username and session ID from localStorage on init
//     const storedUsername = localStorage.getItem('hallOfFameUsername');
//     const storedSessionId = localStorage.getItem('userSessionId');
    
//     if (storedUsername) setUsername(storedUsername);
//     if (storedSessionId) setSessionId(storedSessionId);
//   }, []);

//   const setUser = (name) => {
//     localStorage.setItem('hallOfFameUsername', name);
    
//     // Generate session ID if none exists
//     if (!sessionId) {
//       const newSessionId = crypto.randomUUID();
//       localStorage.setItem('userSessionId', newSessionId);
//       setSessionId(newSessionId);
//     }
    
//     setUsername(name);
//   };

//   const clearUser = () => {
//     localStorage.removeItem('hallOfFameUsername');
//     setUsername(null);
//     // Keep session ID for voting tracking
//   };

//   return (
//     <AuthContext.Provider value={{ username, sessionId, setUser, clearUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Load from localStorage on init
    const user = localStorage.getItem('hallOfFameUsername');
    const session = localStorage.getItem('userSessionId');
    if (user) setCurrentUser(user);
    if (session) setSessionId(session);
  }, []);

  const value = {
    currentUser,
    sessionId,
    login: (username) => {
      localStorage.setItem('hallOfFameUsername', username);
      const newSessionId = crypto.randomUUID();
      localStorage.setItem('userSessionId', newSessionId);
      setCurrentUser(username);
      setSessionId(newSessionId);
    },
    logout: () => {
      localStorage.removeItem('hallOfFameUsername');
      setCurrentUser(null);
      // Keep sessionId for voting tracking
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}