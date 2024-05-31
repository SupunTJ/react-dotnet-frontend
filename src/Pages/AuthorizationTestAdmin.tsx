import React from "react";
import { withAdminAuth } from "../HOC";

function AuthorizationTestAdmin() {
  return (
    <div>This page can only be accessed if role of logged in user is ADMIN</div>
  );
}

export default withAdminAuth(AuthorizationTestAdmin);
