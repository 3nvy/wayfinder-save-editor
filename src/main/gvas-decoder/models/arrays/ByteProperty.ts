// @ts-nocheck
import { Property } from '../properties/index.ts';
import pako from 'pako';

export class ByteProperty extends Property {
  constructor() {
    super();
  }
  get Size() {
    return this.Data.length;
  }
  deserialize(serial, size) {
    const data = [...serial._data].splice(serial._offset, size);

    // let decompressedData = pako.inflate(new Uint8Array(data), { to: "string" });

    this.Data = data;
    this.Count = size;
    serial.seek(size);

    return data;
  }
  serialize() {
    return Buffer.from(this.Data);
  }
  static from(obj) {
    let prop = new ByteProperty();
    prop.Name = obj.Name;
    prop.Type = obj.Type;
    prop.Data = obj.Data;
    prop.Count = obj.Count;
    if (obj.Property) {
      prop.Property = obj.Property;
      prop.Property = PropertyFactory.create(obj.Property);
    }
    return prop;
  }
}
