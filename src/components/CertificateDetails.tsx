import React from "react";
import { Certificate } from "../types";

interface CertificateDetailsProps {
  certificate: Certificate | null;
}

const CertificateDetails: React.FC<CertificateDetailsProps> = ({
  certificate,
}) => {
  if (!certificate) {
    return <div>No certificate selected.</div>;
  }

  return (
    <div>
      <h2>Certificate Details</h2>
      <p>Common Name: {certificate.commonName}</p>
      <p>
        Issuer CN: {certificate.issuerName && certificate.issuerName.toString()}
      </p>
      <p>Valid From: {certificate.validFrom}</p>
      <p>Valid To: {certificate.validTo}</p>
    </div>
  );
};

export default CertificateDetails;
