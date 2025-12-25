import { useEffect } from "react";

import { useParams } from "react-router-dom";

import {
  serviceMap,
  useGetServiceInfo,
  type ServiceMap,
  type ServicePageType,
} from "../hooks/useGetServiceInfo";
import { ServiceMainCard } from "../components/ServiceMainCard";
import { ServiceCard } from "../components/ServiceCard";
import { WhyChangeCard } from "../components/WhyChangeCard";
import { ServiceCostsList } from "../components/ServiceCostsList";
import { NotFoundPage } from "./NotFoundPage";

export const ServicePage = () => {
  const { serviceName } = useParams();

  const { getServiceInfo } = useGetServiceInfo();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceName]);

  if (!serviceName || !(serviceName in serviceMap)) return <NotFoundPage />;

  const serviceInfo: ServicePageType = getServiceInfo(
    serviceName as ServiceMap
  );

  return (
    <>
      <ServiceMainCard serviceName={serviceInfo.serviceName} />
      {serviceInfo.items.map((item, key) => (
        <ServiceCard item={item} key={key} index={key} />
      ))}

      <WhyChangeCard item={serviceInfo.whyChange} />

      <ServiceCostsList item={serviceInfo.servicesCosts} />
    </>
  );
};
