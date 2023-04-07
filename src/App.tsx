import { Route, Routes, HashRouter } from 'react-router-dom';
import { SignUp } from "./components/SignUp"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Home } from './components/Home';
import { SignIn } from './components/SignIn';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <HashRouter>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
							<Route path="/" element={<SignUp />} />
							<Route path="/signin" element={<SignIn />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/home" element={<Home />} />
						</Routes>
    </ThemeProvider>
    </HashRouter>
  )
}

export default App
