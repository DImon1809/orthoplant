import React from "react";

import { useParams } from "react-router-dom";

export const ServicePage = () => {
  const { serviceName } = useParams();

  console.log(serviceName);

  return <div>ServicePage</div>;
};
