import React from "react";
import type { ServicesCosts } from "../../hooks/useGetServiceInfo";

type Props = {
  item: ServicesCosts;
};

export const ServiceCostsList = ({ item }: Props) => {
  return (
    <div>
      <h3>{item.title}</h3>

      <ul>
        {item.costs.map((cost, key) => (
          <li key={key}>
            <div>{cost.service}</div>
            <div>{cost.cost}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
