
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  gender: string;
  age: number;
  lastLogin: string;
};

type StoredUserCredentials = {
  username: string;
  password: string;
  userId: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    name: string;
    surname: string;
    email: string;
    username?: string;
    gender: string;
    age: number;
    password: string;
  }) => Promise<void>;
  isRegistered: (usernameOrEmail: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const isRegistered = (usernameOrEmail: string): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as StoredUserCredentials[];
    return users.some(
      user => user.username === usernameOrEmail || 
             (user.username.includes('@') && user.username === usernameOrEmail)
    );
  };

  const register = async (userData: {
    name: string;
    surname: string;
    email: string;
    username?: string;
    gender: string;
    age: number;
    password: string;
  }): Promise<void> => {
    const userId = "user-" + Math.random().toString(36).substr(2, 9);
    
    // Use email as username if not provided
    const username = userData.username || userData.email;
    
    // Store user credentials for login
    const users = JSON.parse(localStorage.getItem("users") || "[]") as StoredUserCredentials[];
    
    // Check if username/email already exists
    if (users.some(user => user.username === username || user.username === userData.email)) {
      return Promise.reject("Username or email already registered");
    }
    
    users.push({
      username: username,
      password: userData.password,
      userId: userId
    });
    localStorage.setItem("users", JSON.stringify(users));
    
    // Create full user profile
    const newUser: User = {
      id: userId,
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      username: username,
      gender: userData.gender,
      age: userData.age,
      lastLogin: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    return Promise.resolve();
  };

  const login = async (usernameOrEmail: string, password: string): Promise<void> => {
    // Get stored users
    const users = JSON.parse(localStorage.getItem("users") || "[]") as StoredUserCredentials[];
    
    // Find user by username or email
    const userCredentials = users.find(user => user.username === usernameOrEmail);
    
    if (!userCredentials || userCredentials.password !== password) {
      return Promise.reject("Invalid username/email or password");
    }
    
    // Get full user data
    const allUserProfiles = JSON.parse(localStorage.getItem("allUserProfiles") || "{}");
    let userProfile = allUserProfiles[userCredentials.userId];
    
    if (!userProfile) {
      // If for some reason profile is missing, create a basic one
      userProfile = {
        id: userCredentials.userId,
        name: usernameOrEmail.split("@")[0],
        surname: "",
        email: usernameOrEmail.includes('@') ? usernameOrEmail : "",
        username: userCredentials.username,
        gender: "",
        age: 0,
        lastLogin: new Date().toISOString()
      };
    } else {
      // Update last login time
      userProfile.lastLogin = new Date().toISOString();
    }
    
    // Save updated profile
    allUserProfiles[userCredentials.userId] = userProfile;
    localStorage.setItem("allUserProfiles", JSON.stringify(allUserProfiles));
    
    // Set current user
    setUser(userProfile);
    localStorage.setItem("user", JSON.stringify(userProfile));
    
    return Promise.resolve();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, isRegistered }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
