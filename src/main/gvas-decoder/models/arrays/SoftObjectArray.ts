// @ts-nocheck
import { Property } from '../properties/index.ts'
import { SerializationError } from '../index.ts';
import { Serializer } from '../../utils/Serializer.ts';

export class SoftObjectArray extends Property {
    constructor() {
        super();
        this.Type = "SoftObjectProperty";
        this.Properties = [];
    }
    get Size() {
        let size = 0;
        this.Properties.forEach((str) => {
            size += str.length + 4;
            size += 4;
        });
        return size;
    }
    get Count() {
        return this.Properties.length;
    }
    deserialize(serial, count) {
        for (let i = 0; i < count; i++) {
            this.Properties.push(serial.readString());
            serial.seek(4);
        }
        return this;
    }
    serialize() {
        let serial = Serializer.alloc(this.Size);
        this.Properties.forEach(str => {
            serial.writeString(str);
            serial.seek(4);
        });
        if (serial.tell !== this.Size)
            throw new SerializationError(this);
        return serial.Data;
    }
    static from(obj) {
        let array = new SoftObjectArray();
        if (obj.Properties !== undefined)
            array.Properties = obj.Properties;
        return array;
    }
}