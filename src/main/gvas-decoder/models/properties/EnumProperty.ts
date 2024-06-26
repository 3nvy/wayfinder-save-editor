// @ts-nocheck
import { Serializer } from '../../utils/Serializer.ts';
import { SerializationError } from '../PropertyErrors.ts';
import { Property } from './index.ts';

export class EnumProperty extends Property {
    constructor() {
        super();
        this.EnumType = "";
        this.Property = "";
    }
    get Size() {
        return this.Name.length + 4
            + this.Type.length + 4
            + this.Property.length + 4
            + this.EnumType.length + 4
            + 9;
    }
    deserialize(serial) {
        serial.seek(4);
        this.EnumType = serial.readString();
        serial.seek(1);
        this.Property = serial.readString();
        return this;
    }
    serialize() {
        let serial = Serializer.alloc(this.Size);
        serial.writeString(this.Name);
        serial.writeString(this.Type);
        serial.writeInt32(this.Property.length + 4);
        serial.seek(4);
        serial.writeString(this.EnumType);
        serial.seek(1);
        serial.writeString(this.Property);
        if (serial.tell !== this.Size)
            throw new SerializationError(this);
        return serial.Data;
    }
    static from(obj) {
        let prop = new EnumProperty();
        Object.assign(prop, obj);
        return prop;
    }
}
