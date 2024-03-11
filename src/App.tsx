import React, { useState, useEffect } from "react";
import CertificateList from "./components/CertificateList";
import CertificateDetails from "./components/CertificateDetails";
import DropZone from "./components/DropZone";
import { Certificate } from "./types";
import { parseCertificate } from "./utils/certUtils";

const App: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  useEffect(() => {
    const storedCertificates = localStorage.getItem("certificates");
    if (storedCertificates) {
      setCertificates(JSON.parse(storedCertificates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("certificates", JSON.stringify(certificates));
  }, [certificates]);

  const handleCertificateClick = (cert: Certificate) => {
    setSelectedCertificate(cert);
  };

  const handleDrop = (files: File[]) => {
    const newCertificates = files.map((file) => parseCertificate(file));
    setCertificates([...certificates, ...newCertificates]);
  };

  return (
    <div>
      <h1>Certificate Store</h1>
      <DropZone onDrop={handleDrop} />
      <CertificateList
        certificates={certificates}
        onCertificateClick={handleCertificateClick}
      />
      <CertificateDetails certificate={selectedCertificate} />
    </div>
  );
};

export default App;
