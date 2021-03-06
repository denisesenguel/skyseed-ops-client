import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppInternal from "./pages/AppInternal";
import ErrorPage from "./pages/ErrorPage";
import IsPrivate from "./components/IsPrivate";

function App() {
  return (
    <div className="text-primary-cstm">
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/signup" element={ <SignupPage />} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/home/*" element={ <IsPrivate> <AppInternal /> </IsPrivate> }/>
        <Route path="*" element={<ErrorPage status={404} message="Requested URL not found" />}/>
      </Routes>
    </div>
  );
}

export default App;
