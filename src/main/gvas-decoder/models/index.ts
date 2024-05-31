// @ts-nocheck
import { PropertyFactory } from './factories/index.ts'
import {
    ArrayProperty,
    BoolProperty,
    EnumProperty,
    FloatProperty,
    IntProperty,
    ObjectProperty,
    SoftObjectProperty,
    StrProperty,
    StructProperty,
    Tuple,
    Guid,

} from './properties/index.ts'

import {
    IntArray,
    SoftObjectArray,
    StructArray,
    ByteProperty
} from './arrays/index.ts'

PropertyFactory.Properties['ArrayProperty'] = ArrayProperty;
PropertyFactory.Properties['BoolProperty'] = BoolProperty;
PropertyFactory.Properties['EnumProperty'] = EnumProperty;
PropertyFactory.Properties['FloatProperty'] = FloatProperty;
PropertyFactory.Properties['IntProperty'] = IntProperty;
PropertyFactory.Properties['ObjectProperty'] = ObjectProperty;
PropertyFactory.Properties['SoftObjectProperty'] = SoftObjectProperty;
PropertyFactory.Properties['StrProperty'] = StrProperty;
PropertyFactory.Properties['StructProperty'] = StructProperty;
PropertyFactory.Properties['Tuple'] = Tuple;
PropertyFactory.Properties['Guid'] = Guid;
PropertyFactory.Arrays['IntArray'] = IntArray;
PropertyFactory.Arrays['SoftObjectArray'] = SoftObjectArray;
PropertyFactory.Arrays['StructProperty'] = StructArray;
PropertyFactory.Arrays['IntProperty'] = IntArray;
PropertyFactory.Arrays['SoftObjectProperty'] = SoftObjectArray;
PropertyFactory.Arrays['SoftObjectProperty'] = SoftObjectArray;
PropertyFactory.Arrays["ByteProperty"] = ByteProperty;

export { PropertyFactory }
export { Gvas } from './Gvas.ts'
export { GvasHeader } from './GvasHeader.ts'
export * from './PropertyErrors.ts'
export * from './properties/index.ts'
export * from './arrays/index.ts'
