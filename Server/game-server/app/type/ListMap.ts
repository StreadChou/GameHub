export class ListMap<T> {
    private List: Array<T> = new Array<T>();
    private readonly Key: keyof T;
    private Map: Map<any, T> = new Map();

    get length(): number {
        return this.List.length;
    }

    constructor(key?: keyof T) {
        if (key) {
            this.Key = key;
        }
    }

    static from<T>(data: Array<T>, key?: keyof T): ListMap<T> {
        const self: ListMap<T> = new ListMap<T>(key);
        data.forEach(ele => {
            self.push(ele);
        })
        return self;
    }

    static of<T>(...args: Array<T>): ListMap<T> {
        return ListMap.from(args);
    }

    toString(): string {
        return this.List.toString();
    }


    /* ********************************************
     *  获取
     * ********************************************/

    list(): Array<T> {
        return this.List;
    }

    index(index: number): T | undefined {
        return this.List[index]
    }

    key(mapKey: number | string): T | undefined {
        return this.Map.get(mapKey)
    }


    /* ********************************************
     *  插入
     * ********************************************/


    // 在数组前面增加元素
    unshift(...items: T[]): number {
        if (this.Key) {
            items.forEach(ele => {
                const mapKey = ele[this.Key];
                if (this.Map.has(mapKey)) throw new Error("错误: unshift 原因: Map中已经有元素了");
                this.Map.set(mapKey, ele);
            })
        }
        return this.List.unshift(...items);
    }

    // 在数组后面增加元素
    push(...items: T[]): number {
        if (this.Key) {
            items.forEach(ele => {
                const mapKey = ele[this.Key];
                if (this.Map.has(mapKey)) {
                    throw new Error("错误: push 原因: Map中已经有元素了");
                }
                this.Map.set(mapKey, ele);
            })
        }
        return this.List.push(...items)
    }


    /* ********************************************
     *  移除
     * ********************************************/


    // 删除数组的第一个元素并返回删除的元素。
    shift(): T | undefined {
        const ele: T = this.List.shift();
        if (!ele === undefined) return ele;
        if (this.Key) {
            const mapKey = ele[this.Key];
            if (!this.Map.has(mapKey)) throw new Error("错误: shift 原因: Map中没有对应的数组");
            this.Map.delete(mapKey);
        }
        return ele;
    }


    // 删除数组的最后一个元素并返回删除的元素。
    pop(): T | undefined {
        const ele: T = this.List.pop();
        if (!ele === undefined) return ele;
        if (this.Key) {
            const mapKey = ele[this.Key];
            if (!this.Map.has(mapKey)) throw new Error("错误: pop 原因: Map中没有对应的数组");
            this.Map.delete(mapKey);
        }
        return ele;
    }

    // 删除一个元素, 返回的是新的长度
    delete(ele: T): number {
        const index = this.List.indexOf(ele);
        if (index >= 0) {
            this.splice(index, 1);
        }

        const mapKey = ele[this.Key];
        if (this.Map.has(mapKey)) {
            this.Map.delete(mapKey);
        }

        return this.List.length;
    }


    // 删除一个Index, 返回的是被删除的元素
    deleteIndex(index: number): undefined | T {
        if (!this.List[index]) return undefined;
        const ele = this.List[index]
        this.splice(index, 1);

        const mapKey = ele[this.Key];
        if (this.Map.has(mapKey)) {
            this.Map.delete(mapKey);
        }

        return ele;
    }


    // 删除一个Key, 返回的是被删除的元素
    deleteKey(mapKey): undefined | T {
        if (!this.Map.has(mapKey)) return undefined;

        const ele = this.Map.get(mapKey);
        this.delete(ele);

        return ele;
    }

    /* ********************************************
     *  移除并新增
     * ********************************************/

    // 删除和新增
    splice(start: number, deleteCount: number, ...items: T[]): T[] {
        if (this.Key && items && items.length >= 0) {
            items.forEach(ele => {
                const mapKey = ele[this.Key];
                if (this.Map.has(mapKey)) throw new Error("错误: splice 原因: Map中已经有元素了");
                this.Map.set(mapKey, ele);
            })
        }
        const temp = this.List.splice(start, deleteCount, ...items);
        temp.forEach(ele => {
            const mapKey = ele[this.Key];
            if (this.Map.has(mapKey)) this.Map.delete(mapKey);
        })

        return temp
    }


    /* ********************************************
     *  操作
     * ********************************************/

    // 查询元素的Index, fromIndex 不支持传参, 因为规定了List中不可重复
    indexOf(searchElement: T): number {
        return this.List.indexOf(searchElement);
    }

    // 查询元素是否包含, fromIndex 不支持传参, 因为规定了List中不可重复
    includes(searchElement: T) {
        return this.List.includes(searchElement);
    }

    // 获取指定的数组, 左包右不包
    slice(start?: number, end?: number): T[] {
        return this.List.slice(start, end);
    }

    // 按规则查找, 只返回第一个
    find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined {
        return this.List.find(predicate, thisArg);
    }

    // 筛选
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[] {
        return this.List.filter(predicate, thisArg);
    }

    // 按规则查找 Index, 不存在返回 -1
    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number {
        return this.List.findIndex(predicate, thisArg);
    }


    // 根据元素创建一个新数组
    map<U>(callbackFn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
        return this.List.map(callbackFn, thisArg);
    }

    // 遍历
    forEach(callbackFn: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        return this.List.forEach(callbackFn, thisArg);
    }


    // 排序, 会改变原数组
    sort(compareFn?: (a: T, b: T) => number): T[] {
        return this.List.sort(compareFn);
    }

    // 颠倒, 会改变原数组
    reverse(): T[] {
        return this.List.reverse();
    }


    // 检查数组中的内容是否都满足条件
    every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        return this.List.every(predicate, thisArg);
    }

    // 判断是否存在符合某个条件的
    some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        return this.List.some(predicate);
    }


    // 组合
    concat(...items: Array<ListMap<T> | T | Array<T>>): ListMap<T> {
        const newType: ListMap<T> = ListMap.from(this.List, this.Key);

        for (let item of items) {
            if (item instanceof ListMap) {
                newType.push(...item.List);
            } else if (Array.isArray(item)) {
                newType.push(...item);
            } else {
                newType.push(item);
            }
        }
        return newType;
    }


    /* ********************************************
     *  其他(暂不支持)
     * ********************************************/


    // 将内容转换成字符串, 并且拼接, 这不是一个简单类型, 这个方法是没有意义的
    // join(separator?: string): string {
    //     return this.List.join(separator);
    // }
    //
    //
    //
    // 最后一次出现的地方, 因为 key 的存在, 导致list中不可能有重复, 所以不支持
    // lastIndexOf(searchElement: T, fromIndex?: number): number {
    //     return this.List.lastIndexOf(searchElement, fromIndex);
    // }
    //
    //
    //
    // reduce(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    // reduce(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    // reduce<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U {
    //
    // }
    //
    // reduceRight(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    // reduceRight(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    // reduceRight<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U {
    //
    // }
}