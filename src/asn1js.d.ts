declare module "asn1js" {
  export const Class: {
    UNIVERSAL: {
      SEQUENCE: number;
    };
  };

  export function fromBer(buffer: ArrayBuffer): FromBerResult;

  export class FromBerResult {
    typeNumber: number;
    valueBlock: ValueBlock;
  }

  export class ValueBlock {
    value: ValueBlock[];
  }

  export class ObjectIdentifier {
    static fromString(str: string): ObjectIdentifier;
    isEqualTo(other: ObjectIdentifier): boolean;
    constructor(data: string | number[] | Uint8Array);
  }

  export function isEqual(a: any, b: any): boolean;
}
