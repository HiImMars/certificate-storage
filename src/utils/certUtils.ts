import * as asn1js from "asn1js";
import { Certificate } from "../types";

export const parseCertificate = (file: File): Promise<Certificate> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const certData = reader.result as ArrayBuffer;
        const asn1Data = asn1js.fromBer(certData);

        if (asn1Data.typeNumber !== asn1js.Class.UNIVERSAL.SEQUENCE) {
          reject(
            new Error("Invalid certificate structure (expected SEQUENCE)")
          );
          return;
        }

        const tbsCertificate = asn1Data.valueBlock
          .value[0] as asn1js.ValueBlock;

        const commonName = tbsCertificate.valueBlock.value
          .find((sub: asn1js.ValueBlock) =>
            sub.valueBlock.value.find((sub: asn1js.ValueBlock) =>
              asn1js.isEqual(
                sub.idBlock,
                new asn1js.ObjectIdentifier.fromString("2.5.4.3")
              )
            )
          )
          ?.valueBlock.value[0].valueBlock.value?.toString();

        const issuerName = tbsCertificate.valueBlock.value.find((sub: any) =>
          sub.valueBlock.value.find((sub: any) =>
            sub.idBlock.isEqualTo(
              new asn1js.ObjectIdentifier.fromString("2.5.4.6")
            )
          )
        )?.valueBlock.value[0].valueBlock.value;

        const validFrom = tbsCertificate.valueBlock.value
          .find((sub: any) =>
            sub.idBlock.isEqualTo(
              new asn1js.ObjectIdentifier.fromString("2.5.29.16")
            )
          )
          ?.valueBlock.value[0].valueBlock.value[0].toDateString();

        const validTo = tbsCertificate.valueBlock.value
          .find((sub: any) =>
            sub.idBlock.isEqualTo(
              new asn1js.ObjectIdentifier.fromString("2.5.29.17")
            )
          )
          ?.valueBlock.value[0].valueBlock.value[0].toDateString();

        resolve({
          commonName: commonName ? commonName.toString() : "",
          issuerName: issuerName ? issuerName.toString() : "",
          validFrom: validFrom || "",
          validTo: validTo || "",
        });
      } catch (error) {
        reject(new Error("Failed to parse certificate file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read certificate file"));
    };

    reader.readAsArrayBuffer(file);
  });
};
