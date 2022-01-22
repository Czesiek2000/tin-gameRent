import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/fragments/Footer";
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import UserDetails from "./components/users/UserDetails";
import UserForm from "./components/users/UserForm";
import UserList from "./components/users/UserList";
import GameList from './components/games/GameList';
import GameForm from './components/games/GameForm';
import GameDetails from './components/games/GameDetails';
import GameRentList from "./components/gameRent/GameRentList";
import GameRentDetails from "./components/gameRent/GameRentDetails";
import GameRentForm from "./components/gameRent/GameRentForm";
import { getCurrentUser, isAdmin } from "./helpers/authHelper";
import LoginForm from "./components/other/LoginForm";
import HistoryList from "./components/other/HistoryList";
import ProtectedRoute from "./components/other/ProtectedRoute";
import { useHistory } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [prevPath, setPrevPath] = useState(null);

  const handleLogin = (user) => {
    console.log(user);
    localStorage.setItem("user", user);
    setUser(user);
    window.location.href = '/';
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = '/';
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [])

  return (
    <Router>
      <div>
        <Header />
        <Navigation handleLogout={handleLogout}/>
        <Switch>
          <Route exact path="/" component={MainContent} />
          
          <ProtectedRoute exact path="/users" component={UserList} />
          <Route exact path="/users/details/:id" component={UserDetails} />
          <Route exact path="/users/add" component={UserForm} />
          <Route exact path="/users/edit/:id" component={UserForm}/>

          <ProtectedRoute exact path="/games/" component={GameList} />
          <Route exact path="/games/details/:id" component={GameDetails} />
          <Route exact path="/games/add" component={GameForm} />
          <Route exact path="/games/edit/:id" component={GameForm} />
          
          <ProtectedRoute exact path="/gameRent" component={GameRentList} />
          <Route exact path="/gameRent/details/:id" component={GameRentDetails} />
          <Route exact path="/gameRent/add" component={GameRentForm} />
          <Route exact path="/gameRent/edit/:id" component={GameRentForm} />
          
          <ProtectedRoute exact path="/history" component={HistoryList}/>

          <Route path="/login" render={(props) => <LoginForm {...props} handleLogin={handleLogin} />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
