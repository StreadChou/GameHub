import "reflect-metadata"

const SerializeMetaKey = "Serialize"

export interface SerializeOptions {
    type?: "string" | "number" | string
}

// 装饰器 - 序列化
export function Serialize(option: SerializeOptions = {}) {
    return (target: Object, property: string): void => {
        Reflect.defineMetadata(SerializeMetaKey, option, target, property);
    };
}

// 序列化
export function fromJSON<T>(obj: T, data: any): T {
    Object.keys(data).forEach(key => {
        const options: SerializeOptions = Reflect.getMetadata(SerializeMetaKey, obj, key);
        if (!options) return undefined;
        switch (options.type) {
            case "string":
                obj[key] = data[key].toString();
                break;
            case "number":
                obj[key] = parseInt(data[key]);
                break;
            default:
                obj[key] = data[key];
        }
    })
    return obj;
}

// 反序列化
export function toJSON<T>(obj: T): any {
    const dict = {};
    Object.keys(obj).forEach(property => {
        const options = Reflect.getMetadata(SerializeMetaKey, obj, property);
        if (!options) return undefined;
        if (options) {
            if (typeof obj[property] == "number") {
                dict[property] = Number(obj[property]);
            } else if (typeof obj[property] == "string") {
                dict[property] = obj[property];
            } else {
                dict[property] = obj[property];
            }
        }
    });
    return dict;
}


const FastDtoKey = "FastDto"

export interface FastDtoKeyOptions {
    enumKey: Array<number>,
}

// 装饰器 - 序列化
export function FastDto(option: FastDtoKeyOptions) {
    return (target: Object, property: string): void => {
        Reflect.defineMetadata(FastDtoKey, option, target, property);
    };
}

export function toDto<T>(obj: T, enumKey: number): any {
    const dict = {};
    Object.keys(obj).forEach(property => {
        const options: FastDtoKeyOptions = Reflect.getMetadata(FastDtoKey, obj, property);
        if (!options) return undefined;
        if (options.enumKey.includes(enumKey)) {
            dict[property] = obj[property]
        }
    })
    return dict;
}