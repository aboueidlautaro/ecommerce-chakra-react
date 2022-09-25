import { Navigate } from "react-router-dom";

const LayoutRequireAuth = ({ authState, children }) => {
  if (!authState.status) {
    console.log(authState);
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default LayoutRequireAuth;
