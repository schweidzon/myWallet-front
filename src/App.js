import RegistarPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage";
import NewEntryPage from "./pages/NewEntryPage";
import NewExitPage from './pages/NewExitPage'
import GlobalStyle from "./style/globalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppProvider from "./context/Provider";
import EditEntryPage from "./pages/EditEntryPage";
import EditExitPage from "./pages/EditExitPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegistarPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-entrada?/:id" element={<NewEntryPage />} />
          <Route path="/nova-saida?/:id" element={<NewExitPage />} />
          <Route path="/editar-entrada?/:id" element={<EditEntryPage />} />
          <Route path="/editar-saida?/:id" element={<EditExitPage />} />
        </Routes>
        </AppProvider >
    </BrowserRouter>

  );
}

export default App;