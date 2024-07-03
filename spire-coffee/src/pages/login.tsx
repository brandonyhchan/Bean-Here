import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import strings from "@/config/strings";

const Login = () => {

  return (
    <React.Fragment>
      <Helmet title={strings.login.helmet} />
      <p>Weeeee</p>
    </React.Fragment>
  );
};

export default Login;
