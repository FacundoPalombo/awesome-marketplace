import React from "react";
import styles from "./App.module";
import { Switch, Route } from "react-router-dom";

import { Detail } from "container/Detail";
import { Search } from "container/Search";

import { InputSearch } from "components/InputSearch/InputSearch";
import { NotFound } from "common/NotFound/NotFound";
import { Results } from "container/Results";

export function App() {
  return (
    <>
      <section id="main" className={styles.section}>
        <InputSearch />
        <main className={styles.main}>
          <div className={styles.page}>
            <Switch>
              <Route strict path="/items/:id">
                <Detail />
              </Route>
              <Route exact path="/items">
                <Results />
              </Route>
              <Route exact path="/">
                <Search />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </main>
      </section>
    </>
  );
}
