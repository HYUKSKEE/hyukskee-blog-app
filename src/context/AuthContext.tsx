import { ReactNode, createContext, useState, useEffect } from "react";

// User 인터페이스를 직접 정의
export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

interface AuthProps {
  children: ReactNode;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // localStorage에서 사용자 정보 로드
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // localStorage에서 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      const currentUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      setCurrentUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const signup = async (email: string, password: string) => {
    // 기존 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 이미 존재하는 이메일인지 확인
    if (users.find((u: any) => u.email === email)) {
      throw new Error("이미 존재하는 이메일입니다.");
    }

    // 새 사용자 생성
    const newUser = {
      uid: Date.now().toString(),
      email,
      password,
      displayName: email.split("@")[0],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
