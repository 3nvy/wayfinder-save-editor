// @ts-nocheck
import { Property } from './index.ts'
import { Serializer } from '../../utils/index.ts';
import { SerializationError } from '../PropertyErrors.ts';

export class BoolProperty extends Property {
    constructor() {
        super();
        this.Property = false;
    }
    get Size() {
        return this.Name.length + 4
            + this.Type.length + 4
            + 10;
    }
    deserialize(serial) {
        serial.seek(4);
        this.Property = serial.readUInt8() === 1;
        serial.seek(1);
        return this;
    }
    serialize() {
        let serial = Serializer.alloc(this.Size);
        serial.writeString(this.Name);
        serial.writeString(this.Type);
        serial.seek(8);
        serial.writeUInt8(this.Property === true ? 1 : 0);
        serial.seek(1);
        if (serial.tell !== this.Size)
            throw new SerializationError(this)
        return serial.Data;
    }
    static from(obj) {
        let prop = new BoolProperty();
        Object.assign(prop, obj);
        return prop;
    }
}
