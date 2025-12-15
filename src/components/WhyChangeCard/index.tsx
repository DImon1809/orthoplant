import React from "react";
import type { WhyChange } from "../../hooks/useGetServiceInfo";

type Props = {
  item: WhyChange;
};

export const WhyChangeCard = ({ item }: Props) => {
  return (
    <div>
      <h3>{item.title}</h3>

      <div>{item.text}</div>
    </div>
  );
};
