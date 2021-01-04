import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./HomePage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import JournalEntriesPage from "./JournalEntriesPage";
import JournalEntryPage from "./JournalEntryPage";
import { AppContext } from "../libs/contextLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <div className="container-fluid">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Header />
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
          <Route
            path="/user/:userId/journalEntries/:entryId"
            component={JournalEntryPage}
          />
          <Route path="/user/:userId" component={JournalEntriesPage} />
          <Route path="/user" component={HomePage} />
        </Switch>
      </AppContext.Provider>
    </div>
  );
}

export default App;
