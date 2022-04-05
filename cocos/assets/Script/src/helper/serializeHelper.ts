// import "reflect-metadata"
//
// const SerializeMetaKey = "Serialize"
//
// // 装饰器 - 序列化
// export function Serialize(name?: string) {
//     return (target: Object, property: string): void => {
//         Reflect.defineMetadata(SerializeMetaKey, name || property, target, property);
//     };
// }
//
// // 序列化
// export function fromJSON<T>(obj: T, data: any): T {
//     data && Object.keys(obj).forEach(property => {
//         const serialize = Reflect.getMetadata(SerializeMetaKey, obj, property);
//         if (data && serialize && (property in data)) {
//             if(typeof obj[property] == "number"){
//                 obj[property] = Number(data[serialize]);
//             } else if(typeof obj[property] == "string") {
//                 obj[property] = data[serialize];
//             } else if(typeof data[serialize] == "string") {
//                 obj[property] = JSON.parse(data[serialize]);
//             } else {
//                 obj[property] = data[serialize];
//             }
//         }
//     });
//     return obj;
// }
//
// // 反序列化
// export function toJSON<T>(obj: T): any {
//     const dict = {};
//     Object.keys(obj).forEach( property => {
//         const serialize = Reflect.getMetadata(SerializeMetaKey, obj, property);
//         if (serialize) {
//             if(typeof obj[property] == "number"){
//                 dict[serialize] = Number(obj[property]);
//             }else if(typeof  obj[property] == "string"){
//                 dict[serialize] = obj[property];
//             }else{
//                 dict[serialize] = obj[property];
//             }
//         }
//     });
//     return dict;
// }
//
