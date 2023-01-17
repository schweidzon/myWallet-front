import RegistarPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage";
import GlobalStyle from "./style/globalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/cadastro" element={ <RegistarPage />} />
          <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;