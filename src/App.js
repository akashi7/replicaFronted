import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './Context/HomeContext';
import { Homepage } from './Pages/Homepage';
import { SignUp } from './Pages/Signup';
import { ToLogin } from './Pages/Login';
import { Aftersignup } from './Pages/AfterSignup';
import { Dashboard } from './Pages/Userdashboard';
import { ViewForum } from './Pages/ViewForum';
import { EditForum } from './Pages/EditForum';
import { EditForumTopic } from './Pages/EditTopicForum';
import { userProfile } from './Pages/Profile';
import { UserViewOtherProfiles } from './Pages/ViewProfile';
import { MessageUser } from './Pages/MessageUser';
import { About } from './Pages/About';
import { Admindashboard } from './Pages/Admin';
import { AdminViewOne } from './Pages/AdminViewOne';

function App() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <Route path="/" component={Homepage} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/login" component={ToLogin} exact />
          <Route path="/aftersignup" component={Aftersignup} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/forum/:id" component={ViewForum} exact />
          <Route path="/editForum/:id" component={EditForum} exact />
          <Route path="/ForumTopic/:id" component={EditForumTopic} exact />
          <Route path="/profile" component={userProfile} exact />
          <Route path="/U_profile/:id" component={UserViewOtherProfiles} exact />
          <Route path="/message/:id" component={MessageUser} exact />
          <Route path="/about" component={About} exact />
          <Route path="/admin" component={Admindashboard} exact />
          <Route path="/viewuser" component={AdminViewOne} exact />
        </UserProvider>
      </Switch>
    </Router>
  );
}

export default App;
