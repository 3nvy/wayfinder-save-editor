// @ts-nocheck
import { SerializationError } from './index.ts';
import { PropertyFactory } from './factories/index.ts'
import { Serializer } from '../utils/Serializer.ts';

export class GvasHeader {
    constructor() {
        this.Format = 'GVAS';
        this.SaveGameVersion = 0;
        this.PackageVersion = 0;
        this.EngineVersion = {
            Major: 0,
            Minor: 0,
            Patch: 0,
            Build: 0,
            BuildId: ""
        }
        this.CustomFormatVersion = 0;
        this.CustomFormatData = {
            Count: 0,
            Entries: []
        }
        this.SaveGameType = "";
    }
    get Size() {
        let size = this.Format.length;
        size += 18;
        size += this.EngineVersion.BuildId.length + 4;
        size += 8;
        this.CustomFormatData.Entries.forEach(guid => {
            size += guid.Size; // 20
        })
        size += this.SaveGameType.length + 4;
        return size;
    }
    deserialize(serial) {
        this.SaveGameVersion = serial.readInt32();
        this.PackageVersion = serial.readInt32();
        this.EngineVersion.Major = serial.readInt16();
        this.EngineVersion.Minor = serial.readInt16();
        this.EngineVersion.Patch = serial.readInt16();
        this.EngineVersion.Build = serial.readInt32();
        this.EngineVersion.BuildId = serial.readString();
        this.CustomFormatVersion = serial.readInt32();
        this.CustomFormatData.Count = serial.readInt32();
        for (let i = 0; i < this.CustomFormatData.Count; i++) {
            let guid = PropertyFactory.create({ Type: 'Guid' })
            this.CustomFormatData.Entries.push(guid.deserialize(serial));
        }
        this.SaveGameType = serial.readString();
        return this;
    }
    serialize() {
        let serial = Serializer.alloc(this.Size);
        serial.write(Buffer.from(this.Format));
        serial.writeInt32(this.SaveGameVersion);
        serial.writeInt32(this.PackageVersion);

        serial.writeInt16(this.EngineVersion.Major);
        serial.writeInt16(this.EngineVersion.Minor);
        serial.writeInt16(this.EngineVersion.Patch);
        serial.writeInt32(this.EngineVersion.Build);
        serial.writeString(this.EngineVersion.BuildId);

        serial.writeInt32(this.CustomFormatVersion);
        serial.writeInt32(this.CustomFormatData.Count);
        this.CustomFormatData.Entries.forEach(guid => serial.write(guid.serialize()));
        serial.writeString(this.SaveGameType);
        if (serial.tell != this.Size)
            throw new SerializationError(this);
        return serial.Data;
    }
    static from(obj) {
        let header = new GvasHeader();
        header.SaveGameVersion = obj.SaveGameVersion;
        header.PackageVersion = obj.PackageVersion;
        header.EngineVersion = obj.EngineVersion;
        header.CustomFormatVersion = obj.CustomFormatVersion;
        header.CustomFormatData.Count = obj.CustomFormatData.Count;
        obj.CustomFormatData.Entries.forEach(guid => {
            header.CustomFormatData.Entries.push(PropertyFactory.create(guid));
        });
        header.SaveGameType = obj.SaveGameType;
        return header;
    }
}