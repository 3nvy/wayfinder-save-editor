// @ts-nocheck
import { TypeNotImplementedError } from '../index.ts';

class Factory {
    constructor() {
        this.Properties = {}
        this.Arrays = {}
    }
    create(obj) {
        let type = obj.Type.split('\0')[0]

        if (this.Properties[type] === undefined)
            throw new TypeNotImplementedError(type);

        return this.Properties[type].from(obj);
    }
    createArray(obj) {
        let type = obj.Type.split('\0')[0]

        if (this.Arrays[type] === undefined)
            throw new TypeNotImplementedError(type);

        return this.Arrays[type].from(obj);
    }
}

export const PropertyFactory = new Factory();