import LoginView from "./components/Login/LoginView";

const VER_LOGIN = true; 

export default function App() {
  if (VER_LOGIN) return <LoginView />;

}