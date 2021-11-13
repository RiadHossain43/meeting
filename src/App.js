import 'assets/index.scss';
import MainLayout from 'layouts/MainLayout';
import { BrowserRouter, Route, Switch } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/main" render={(props) => <MainLayout {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
