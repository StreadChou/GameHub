let TYPES: { [key: string]: number } = {
    "uInt32": 0,
    "sInt32": 0,
    "int32": 0,
    "double": 1,
    "string": 2,
    "message": 2,
    "float": 5
}


class Codec {
    private buffer: ArrayBuffer;
    private float32Array: Float32Array;
    private float64Array: Float64Array;
    private uInt8Array: Uint8Array;

    constructor() {
        this.buffer = new ArrayBuffer(8);
        this.float32Array = new Float32Array(this.buffer);
        this.float64Array = new Float64Array(this.buffer);
        this.uInt8Array = new Uint8Array(this.buffer);
    }

    encodeUInt32(_n: any) {
        var n = parseInt(_n);
        if (isNaN(n) || n < 0) {
            return null;
        }

        var result = [];
        do {
            var tmp = n % 128;
            var next = Math.floor(n / 128);

            if (next !== 0) {
                tmp = tmp + 128;
            }
            result.push(tmp);
            n = next;
        } while (n !== 0);

        return result;
    }

    encodeSInt32(_n: string) {
        var n = parseInt(_n);
        if (isNaN(n)) {
            return null;
        }
        n = n < 0 ? (Math.abs(n) * 2 - 1) : n * 2;
        return this.encodeUInt32(n);
    }

    decodeUInt32(bytes: string | any[]) {
        var n = 0;
        for (var i = 0; i < bytes.length; i++) {
            var m = parseInt(bytes[i]);
            n = n + ((m & 0x7f) * Math.pow(2, (7 * i)));
            if (m < 128) {
                return n;
            }
        }

        return n;
    }

    decodeSInt32(bytes: string | any[]) {
        var n = this.decodeUInt32(bytes);
        var flag = ((n % 2) === 1) ? -1 : 1;

        n = ((n % 2 + n) / 2) * flag;

        return n;
    }

    encodeFloat(v: number) {
        this.float32Array[0] = v;
        return this.uInt8Array;
    };

    decodeFloat(bytes: any, offset: number) {
        if (!bytes || bytes.length < (offset + 4)) {
            return null;
        }

        for (var i = 0; i < 4; i++) {
            this.uInt8Array[i] = bytes[offset + i];
        }

        return this.float32Array[0];
    };

    encodeDouble(v: number) {
        this.float64Array[0] = v;
        return this.uInt8Array.subarray(0, 8);
    };

    decodeDouble(bytes: any, offset: number) {
        if (!bytes || bytes.length < (offset + 8)) {
            return null;
        }

        for (var i = 0; i < 8; i++) {
            this.uInt8Array[i] = bytes[offset + i];
        }

        return this.float64Array[0];
    };

    encodeStr(bytes: any, offset: number, str: string) {
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            var codes = this.encode2UTF8(code);

            for (var j = 0; j < codes.length; j++) {
                bytes[offset] = codes[j];
                offset++;
            }
        }

        return offset;
    };

    /**
     * Decode string from utf8 bytes
     */
    decodeStr(bytes: any, offset: number, len: number) {
        var array = [];
        var end = offset + len;

        while (offset < end) {
            var code = 0;

            if (bytes[offset] < 128) {
                code = bytes[offset];

                offset += 1;
            } else if (bytes[offset] < 224) {
                code = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
                offset += 2;
            } else {
                code = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
                offset += 3;
            }

            array.push(code);

        }

        var str = '';
        for (var i = 0; i < array.length;) {
            str += String.fromCharCode.apply(null, array.slice(i, i + 10000));
            i += 10000;
        }

        return str;
    };

    /**
     * Return the byte length of the str use utf8
     */
    byteLength(str: string) {
        if (typeof (str) !== 'string') {
            return -1;
        }

        var length = 0;

        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            length += this.codeLength(code);
        }

        return length;
    };

    /**
     * Encode a unicode16 char code to utf8 bytes
     */
    encode2UTF8(charCode: number) {
        if (charCode <= 0x7f) {
            return [charCode];
        } else if (charCode <= 0x7ff) {
            return [0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f)];
        } else {
            return [0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f)];
        }
    }

    codeLength(code: number) {
        if (code <= 0x7f) {
            return 1;
        } else if (code <= 0x7ff) {
            return 2;
        } else {
            return 3;
        }
    }
}

let codec = new Codec();

let util = {
    isSimpleType: function (type: String) {
        return (type === 'uInt32' ||
            type === 'sInt32' ||
            type === 'int32' ||
            type === 'uInt64' ||
            type === 'sInt64' ||
            type === 'float' ||
            type === 'double');
    }
}

class MsgEncoder {
    private protos: any;

    init(protos: any) {
        this.protos = protos || {};
    }

    encode(route: string, msg: any) {
        //Get protos from protos map use the route as key
        var protos = this.protos[route];

        //Check msg
        if (!this.checkMsg(msg, protos)) {
            return null;
        }

        //Set the length of the buffer 2 times bigger to prevent overflow
        var length = codec.byteLength(JSON.stringify(msg));

        //Init buffer and offset
        var buffer = new ArrayBuffer(length);
        var uInt8Array = new Uint8Array(buffer);
        var offset = 0;

        if (!!protos) {
            offset = this.encodeMsg(uInt8Array, offset, protos, msg);
            if (offset > 0) {
                return uInt8Array.subarray(0, offset);
            }
        }

        return null;
    }

    encodeMsg(buffer: any, offset: number, protos: any, msg: any) {
        for (var name in msg) {
            if (!!protos[name]) {
                var proto = protos[name];

                switch (proto.option) {
                    case 'required':
                    case 'optional':
                        offset = this.writeBytes(buffer, offset, this.encodeTag(proto.type, proto.tag));
                        offset = this.encodeProp(msg[name], proto.type, offset, buffer, protos);
                        break;
                    case 'repeated':
                        if (msg[name].length > 0) {
                            offset = this.encodeArray(msg[name], proto, offset, buffer, protos);
                        }
                        break;
                }
            }
        }
        return offset;
    }

    checkMsg(msg: any, protos: any) {
        if (!protos) {
            return false;
        }
        for (var name in protos) {
            var proto = protos[name];

            //All required element must exist
            switch (proto.option) {
                case 'required':
                    if (typeof (msg[name]) === 'undefined') {
                        console.warn('no property exist for required! name: %j, proto: %j, msg: %j', name, proto, msg);
                        return false;
                    }
                case 'optional':
                    if (typeof (msg[name]) !== 'undefined') {
                        var message = protos.__messages[proto.type] || this.protos['message ' + proto.type];
                        if (!!message && !this.checkMsg(msg[name], message)) {
                            console.warn('inner proto error! name: %j, proto: %j, msg: %j', name, proto, msg);
                            return false;
                        }
                    }
                    break;
                case 'repeated':
                    //Check nest message in repeated elements
                    var message = protos.__messages[proto.type] || this.protos['message ' + proto.type];
                    if (!!msg[name] && !!message) {
                        for (var i = 0; i < msg[name].length; i++) {
                            if (!this.checkMsg(msg[name][i], message)) {
                                return false;
                            }
                        }
                    }
                    break;
            }
        }
        return true;
    }

    encodeProp(value: any, type: string, offset: number, buffer: any, protos: any) {
        switch (type) {
            case 'uInt32':
                offset = this.writeBytes(buffer, offset, codec.encodeUInt32(value));
                break;
            case 'int32':
            case 'sInt32':
                offset = this.writeBytes(buffer, offset, codec.encodeSInt32(value));
                break;
            case 'float':
                this.writeBytes(buffer, offset, codec.encodeFloat(value));
                offset += 4;
                break;
            case 'double':
                this.writeBytes(buffer, offset, codec.encodeDouble(value));
                offset += 8;
                break;
            case 'string':
                var length = codec.byteLength(value);

                //Encode length
                offset = this.writeBytes(buffer, offset, codec.encodeUInt32(length));
                //write string
                codec.encodeStr(buffer, offset, value);
                offset += length;
                break;
            default:
                var message = protos.__messages[type] || this.protos['message ' + type];
                if (!!message) {
                    //Use a tmp buffer to build an internal msg
                    var tmpBuffer = new ArrayBuffer(codec.byteLength(JSON.stringify(value)) * 2);
                    var length = 0;
                    length = this.encodeMsg(tmpBuffer, length, message, value);
                    //Encode length
                    offset = this.writeBytes(buffer, offset, codec.encodeUInt32(length));
                    //contact the object
                    for (var i = 0; i < length; i++) {
                        // @ts-ignore
                        buffer[offset] = tmpBuffer[i];
                        offset++;
                    }
                }
                break;
        }

        return offset;
    }

    /**
     * Encode reapeated properties, simple msg and object are decode differented
     */
    encodeArray(array: any, proto: any, offset: number, buffer: any, protos: any) {
        var i = 0;

        if (util.isSimpleType(proto.type)) {
            offset = this.writeBytes(buffer, offset, this.encodeTag(proto.type, proto.tag));
            offset = this.writeBytes(buffer, offset, codec.encodeUInt32(array.length));
            for (i = 0; i < array.length; i++) {
                offset = this.encodeProp(array[i], proto.type, offset, buffer, null);
            }
        } else {
            for (i = 0; i < array.length; i++) {
                offset = this.writeBytes(buffer, offset, this.encodeTag(proto.type, proto.tag));
                offset = this.encodeProp(array[i], proto.type, offset, buffer, protos);
            }
        }

        return offset;
    }

    writeBytes(buffer: any, offset: number, bytes: any) {
        for (var i = 0; i < bytes.length; i++, offset++) {
            buffer[offset] = bytes[i];
        }

        return offset;
    }

    encodeTag(type: string, tag: number) {
        var value = TYPES[type] || 2;

        return codec.encodeUInt32((tag << 3) | value);
    }
}

class MsgDecoder {
    private buffer: any;
    private offset = 0;
    private protos: any;

    init(protos: any) {
        this.protos = protos || {};
    }

    setProtos(protos: any) {
        if (!!protos) {
            this.protos = protos;
        }
    }

    decode(route: string, buf: any) {
        var protos = this.protos[route];

        this.buffer = buf;
        this.offset = 0;

        if (!!protos) {
            return this.decodeMsg({}, protos, this.buffer.length);
        }

        return null;
    }

    decodeMsg(msg: any, protos: any, length: number) {
        while (this.offset < length) {
            var head = this.getHead();
            var type = head.type;
            var tag = head.tag;
            var name = protos.__tags[tag];

            switch (protos[name].option) {
                case 'optional':
                case 'required':
                    msg[name] = this.decodeProp(protos[name].type, protos);
                    break;
                case 'repeated':
                    if (!msg[name]) {
                        msg[name] = [];
                    }
                    this.decodeArray(msg[name], protos[name].type, protos);
                    break;
            }
        }

        return msg;
    }

    /**
     * Test if the given msg is finished
     */
    isFinish(msg: any, protos: any) {
        return (!protos.__tags[this.peekHead().tag]);
    }

    /**
     * Get property head from protobuf
     */
    getHead() {
        var tag = codec.decodeUInt32(this.getBytes(null));

        return {
            type: tag & 0x7,
            tag: tag >> 3
        };
    }

    /**
     * Get tag head without move the offset
     */
    peekHead() {
        var tag = codec.decodeUInt32(this.peekBytes());

        return {
            type: tag & 0x7,
            tag: tag >> 3
        };
    }

    decodeProp(type: string, protos: any) {
        switch (type) {
            case 'uInt32':
                return codec.decodeUInt32(this.getBytes(null));
            case 'int32':
            case 'sInt32':
                return codec.decodeSInt32(this.getBytes(null));
            case 'float':
                var float = codec.decodeFloat(this.buffer, this.offset);
                this.offset += 4;
                return float;
            case 'double':
                var double = codec.decodeDouble(this.buffer, this.offset);
                this.offset += 8;
                return double;
            case 'string':
                var length = codec.decodeUInt32(this.getBytes(null));

                var str = codec.decodeStr(this.buffer, this.offset, length);
                this.offset += length;

                return str;
            default:
                var message = protos && (protos.__messages[type] || this.protos['message ' + type]);
                if (!!message) {
                    var length = codec.decodeUInt32(this.getBytes(null));
                    var msg = {};
                    this.decodeMsg(msg, message, this.offset + length);
                    return msg;
                }
                break;
        }
    }

    decodeArray(array: Array<any>, type: string, protos: any) {
        if (util.isSimpleType(type)) {
            var length = codec.decodeUInt32(this.getBytes(null));

            for (var i = 0; i < length; i++) {
                array.push(this.decodeProp(type, null));
            }
        } else {
            array.push(this.decodeProp(type, protos));
        }
    }

    getBytes(flag: any) {
        var bytes = [];
        var pos = this.offset;
        flag = flag || false;

        var b;

        do {
            b = this.buffer[pos];
            bytes.push(b);
            pos++;
        } while (b >= 128);

        if (!flag) {
            this.offset = pos;
        }
        return bytes;
    }

    peekBytes() {
        return this.getBytes(true);
    }
}

let encoder = new MsgEncoder();
let decoder = new MsgDecoder();

export let Protobuf = {
    util: util,
    codec: codec,
    encoder: encoder,
    decoder: decoder,

    init: function (opts: any) {
        //On the serverside, use serverProtos to encode messages send to client
        encoder.init(opts.encoderProtos);

        //On the serverside, user clientProtos to decode messages receive from clients
        decoder.init(opts.decoderProtos);
    },

    encode: function (key: string, msg: string) {
        return encoder.encode(key, msg);
    },

    decode: function (key: string, msg: string) {
        return decoder.decode(key, msg);
    }
}