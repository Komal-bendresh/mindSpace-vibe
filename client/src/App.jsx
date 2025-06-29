import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import JournalEntry from "./pages/JournalEntry";
import {ThemeProvider} from "./context/ThemeContext"
import AIChat from "./pages/AIChat";
import LogoutButton from "./components/LogoutButton";


function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
           <Route path="/chat" element={<AIChat />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="/journal" element={<JournalEntry/>}/>
          <Route path="/logout" element={<LogoutButton/>}/>
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
