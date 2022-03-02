import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import InternalHomePage from "./pages/InternalHomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/signup" element={ <SignupPage />} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/home/*" element={ <InternalHomePage />}/>
        <Route path="*" element={<ErrorPage status={404} message="Requested URL not found" />}/>
      </Routes>
    </div>
  );
}

export default App;
