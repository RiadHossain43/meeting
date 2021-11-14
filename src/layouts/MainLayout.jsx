import React from "react";
import routes from "routes";
import { Route, Switch } from "react-router-dom";
export default function MainLayout(props) {
  function getRouts(routes) {
    return routes.map((route, key) => {
      if (route.layout === "/main") {
        let { component: Component, path, layout } = route;
        return (
          <Route
            key={key}
            exact
            path={`${layout}${path}`}
            render={(props) => <Component {...props} key={key} />}
          />
        );
      } else return null;
    });
  }
  return (
    <div>
      <Switch>{getRouts(routes)}</Switch>
    </div>
  );
}
