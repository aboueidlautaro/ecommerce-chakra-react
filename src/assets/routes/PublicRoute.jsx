export const PublicRoute = ({ component: Component, authState, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !authState ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
