import { Certificate } from "../types";

interface CertificateListProps {
  certificates: Certificate[];
  onCertificateClick: (cert: Certificate) => void;
}

const CertificateList: React.FC<CertificateListProps> = ({
  certificates,
  onCertificateClick,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Common Name</th>
          <th>Issuer</th>
          <th>Valid From</th>
          <th>Valid To</th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((cert, index) => (
          <tr key={index} onClick={() => onCertificateClick(cert)}>
            <td>{cert.commonName}</td>
            <td>{cert.issuerName}</td>
            <td>{cert.validFrom}</td>
            <td>{cert.validTo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CertificateList;
