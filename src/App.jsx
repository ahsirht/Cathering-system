import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/login/Login.jsx"
import SignUpIndex from "./pages/signup/SignUpIndex.jsx"
import PostSection from "./pages/post-page/index.jsx"
import AdminPage from "./pages/admin-page/AdminPage.jsx"
import ServiceProvider from "./pages/service-provider-dashboard/ServiceProvider.jsx"
import ServiceSeeker from "./pages/service-seeker-dashboard/ServiceSeeker.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUpIndex />} />
        <Route path="/post" element={<PostSection />} />
        <Route path="/admin-dashboard" element={<AdminPage />} />
        <Route path="/service-seeker-dashboard" element={<ServiceProvider />} />
        <Route path="/service-provider-dashboard" element={<ServiceSeeker />} />
      </Routes>
    </Router>
  )
}

export default App
