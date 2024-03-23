import { Box } from "@mui/material";
import { routing } from "./routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alerts from "./common/alert/alerts";
function App() {

  return (
    <Box>
      <Router>
        <Routes>
          {routing.map((item) => (
            <Route
              key={item.name}
              index={item.index}
              path={item.path}
              element={item.element}
            />
          ))}
        </Routes>
      </Router>
      <Alerts />
    </Box>
  );
}

export default App;
