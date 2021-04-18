import React from "react";
import styles from "./App.module";
import { Switch, Route } from "react-router-dom";

import { Detail } from "./container/Detail";
import { Search } from "./container/Search";

import { InputSearch } from "./components/InputSearch";
import { NotFound } from "./common/NotFound/NotFound";
import { Results } from "./container/Results";

export function App() {
  return (
    <>
      <main id="main" className={styles.main}>
        <InputSearch />
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route exact path="/items">
            <Results />
          </Route>
          <Route path="/items/:id">
            <Detail />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
}
