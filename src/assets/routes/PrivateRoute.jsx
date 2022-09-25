export const PrivateRoute = ({ component: Component, authState, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authState ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
