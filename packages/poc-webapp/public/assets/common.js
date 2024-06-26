(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer2;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer2.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer2.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function Buffer2(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer2.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer2.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer2.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer2, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer2.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer2.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer2.alloc(+length);
      }
      Buffer2.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer2.prototype;
      };
      Buffer2.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
        if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer2.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer2.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer2.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer2.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer2.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer2.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer2.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer2.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer2.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer2.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
      Buffer2.prototype.equals = function equals(b) {
        if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer2.compare(this, b) === 0;
      };
      Buffer2.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
      }
      Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer2.from(target, target.offset, target.byteLength);
        }
        if (!Buffer2.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer2.from(val, encoding);
        }
        if (Buffer2.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer2.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer2.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer2.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer2.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/supercop/dist/cjs/supercop.wasm.js
  var require_supercop_wasm = __commonJS({
    "node_modules/supercop/dist/cjs/supercop.wasm.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.binary = void 0;
      exports.binary = Buffer.from("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GX4gByAlfnwgCUETbKwiMSAnfnwgMCAgfnwgLiAofnwgKSAIfnwgJiAjfnwgGyALfnwgHyAkfnwgISASfnwgA0ETbKwgHX4gByAZfnwgMSAgfnwgMCAifnwgLiAIfnwgKSAGfnwgJiALfnwgGyAPfnwgHyASfnwgISAWfnwiMUKAgIAQfCIyQhqHfCIzQoCAgAh8IjRCGYd8IjAgMEKAgIAQfCI1QoCAgOAPg30+AgggACAEIAh+IAcgKH58IAogI358IA0gC358IBEgJH58IBQgEn58IBggJX58IBkgGqwiMH58IB8gJ358ICEgIH58IC9CGod8Ii8gL0KAgIAIfCIvQoCAgPAPg30+AhwgACAEIBJ+IAcgJH58IAogJX58IA0gGX58IC4gJ358ICkgIH58ICYgKH58IBsgCH58IB8gI358ICEgC358IDVCGod8Ih8gH0KAgIAIfCIfQoCAgPAPg30+AgwgACAEICJ+IAcgIH58IAogCH58IA0gBn58IBEgC358IBQgD358IBggEn58IDAgFn58IBkgHqwiG358ICEgHX58IC9CGYd8IiEgIUKAgIAQfCIhQoCAgOAPg30+AiAgACAsIC1CgICA8A+DfSAfQhmHICogK0KAgIBgg318Ih9CgICAEHwiJkIaiHw+AhQgACAfICZCgICA4A+DfT4CECAAIAQgIH4gByAnfnwgCiAofnwgDSAIfnwgESAjfnwgFCALfnwgGCAkfnwgMCASfnwgGyAlfnwgGSACrH58ICFCGod8IgcgB0KAgIAIfCIHQoCAgPAPg30+AiQgACAzIDRCgICA8A+DfSAHQhmHQhN+IDEgMkKAgIBgg318IgdCgICAEHwiCEIaiHw+AgQgACAHIAhCgICA4A+DfT4CAAs2AQF/I4CAgIAAQSBrIgEkgICAgAAgASAAEJWAgIAAIAEtAAAhACABQSBqJICAgIAAIABBAXEL9gQBCn8gACABKAIkIgJBE2xBgICACGpBGXUgASgCACIDakEadSABKAIEIgRqQRl1IAEoAggiBWpBGnUgASgCDCIGakEZdSABKAIQIgdqQRp1IAEoAhQiCGpBGXUgASgCGCIJakEadSABKAIcIgpqQRl1IAEoAiAiC2pBGnUgAmpBGXVBE2wgA2oiAToAACAAIAFBEHY6AAIgACABQQh2OgABIAAgBCAB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AmogBCAEQeADahCcgICAACAEQaABaiAEQcACahCigICAACAEQYAFaiICIARBoAFqEJ+AgIAAIARBwAJqIAQgAhCcgICAACAEQaABaiAEQcACahCigICAACAEQaAGaiICIARBoAFqEJ+AgIAAIARBwAJqIAQgAhCcgICAACAEQaABaiAEQcACahCigICAACAEQcAHaiICIARBoAFqEJ+AgIAAIARBwAJqIAQgAhCcgICAACAEQaABaiAEQcACahCigICAACAEQeAIaiICIARBoAFqEJ+AgIAAIARBwAJqIAQgAhCcgICAACAEQaABaiAEQcACahCigICAACAEQYAKaiICIARBoAFqEJ+AgIAAIARBwAJqIAQgAhCcgICAACAEQaABaiAEQcACahCigICAACAEQaALaiICIARBoAFqEJ+AgIAAIARBwAJqIAQgAhCcgICAACAEQaABaiAEQcACahCigICAACAEQcAMaiAEQaABahCfgICAACAAEIqAgIAAIABBKGoQi4CAgAAgAEHQAGoQi4CAgABB/wEhAgJAAkADQCAEQeAPaiACai0AAA0BIARB4A1qIAJqLQAADQEgAkF/aiICQX9HDQAMAgsLIAJBAEgNAANAIARBwAJqIAAQoYCAgAACQAJAIARB4A9qIAIiA2osAAAiAkEBSA0AIARBoAFqIARBwAJqEKKAgIAAIARBwAJqIARBoAFqIARB4ANqIAJB/gFxQQF2QaABbGoQnICAgAAMAQsgAkF/Sg0AIARBoAFqIARBwAJqEKKAgIAAIARBwAJqIARBoAFqIARB4ANqQQAgAmtB/gFxQQF2QaABbGoQo4CAgAALAkACQCAEQeANaiADaiwAACICQQFIDQAgBEGgAWogBEHAAmoQooCAgAAgBEHAAmogBEGgAWogAkH+AXFBAXZB+ABsQYCIgIAAahCkgICAAAwBCyACQX9KDQAgBEGgAWogBEHAAmoQooCAgAAgBEHAAmogBEGgAWpBACACa0H+AXFBAXZB+ABsQYCIgIAAahClgICAAAsgACAEQcACahCmgICAACADQX9qIQIgA0EASg0ACwsgBEHgEWokgICAgAALmwIBCX9BACECA0AgACACaiABIAJBA3ZqLQAAIAJBB3F2QQFxOgAAIAJBAWoiAkGAAkcNAAsgAEEBaiEDQQAhBANAIAQiBUEBaiEEAkAgACAFaiIGLQAARQ0AIAVB/gFLDQBBASEHIAUhCCAEIQIDQAJAIAAgAmoiASwAACICRQ0AAkAgAiAHdCICIAYsAAAiCWoiCkEPSg0AIAYgCjoAACABQQA6AAAMAQsgCSACayICQXFIDQIgBiACOgAAIAghAgNAAkAgAyACaiIBLQAADQAgAUEBOgAADAILIAFBADoAACACQQFqIgJB/wFJDQALCyAHQQVLDQEgCEEBaiEIIAdBAWoiByAFaiICQYACSQ0ACwsgBEGAAkcNAAsLTgEBfyAAIAFBKGoiAiABEIyAgIAAIABBKGogAiABEJuAgIAAIABB0ABqIAFB0ABqEI+AgIAAIABB+ABqIAFB+ABqQaCQgIAAEJOAgIAACy4AIAAgARCPgICAACAAQShqIAFBKGoQj4CAgAAgAEHQAGogAUHQAGoQj4CAgAALngEBBX8jgICAgABBMGsiAiSAgICAACAAIAEQkoCAgAAgAEHQAGoiAyABQShqIgQQkoCAgAAgAEH4AGoiBSABQdAAahCagICAACAAQShqIgYgASAEEIyAgIAAIAIgBhCSgICAACAGIAMgABCMgICAACADIAMgABCbgICAACAAIAIgBhCbgICAACAFIAUgAxCbgICAACACQTBqJICAgIAAC1ABA38gACABIAFB+ABqIgIQk4CAgAAgAEEoaiABQShqIgMgAUHQAGoiBBCTgICAACAAQdAAaiAEIAIQk4CAgAAgAEH4AGogASADEJOAgIAAC80BAQR/I4CAgIAAQTBrIgMkgICAgAAgACABQShqIgQgARCMgICAACAAQShqIgUgBCABEJuAgIAAIABB0ABqIgQgACACQShqEJOAgIAAIAUgBSACEJOAgIAAIABB+ABqIgYgAkH4AGogAUH4AGoQk4CAgAAgACABQdAAaiACQdAAahCTgICAACADIAAgABCMgICAACAAIAQgBRCbgICAACAFIAQgBRCMgICAACAEIAMgBhCbgICAACAGIAMgBhCMgICAACADQTBqJICAgIAAC78BAQR/I4CAgIAAQTBrIgMkgICAgAAgACABQShqIgQgARCMgICAACAAQShqIgUgBCABEJuAgIAAIABB0ABqIgQgACACEJOAgIAAIAUgBSACQShqEJOAgIAAIABB+ABqIgYgAkHQAGogAUH4AGoQk4CAgAAgAyABQdAAaiIBIAEQjICAgAAgACAEIAUQm4CAgAAgBSAEIAUQjICAgAAgBCADIAYQjICAgAAgBiADIAYQm4CAgAAgA0EwaiSAgICAAAu/AQEEfyOAgICAAEEwayIDJICAgIAAIAAgAUEoaiIEIAEQjICAgAAgAEEoaiIFIAQgARCbgICAACAAQdAAaiIEIAAgAkEoahCTgICAACAFIAUgAhCTgICAACAAQfgAaiIGIAJB0ABqIAFB+ABqEJOAgIAAIAMgAUHQAGoiASABEIyAgIAAIAAgBCAFEJuAgIAAIAUgBCAFEIyAgIAAIAQgAyAGEJuAgIAAIAYgAyAGEIyAgIAAIANBMGokgICAgAALPgEBfyAAIAEgAUH4AGoiAhCTgICAACAAQShqIAFBKGogAUHQAGoiARCTgICAACAAQdAAaiABIAIQk4CAgAALvQMBA38jgICAgABB8AFrIgIkgICAgAAgAEEoaiIDIAEQkICAgAAgAEHQAGoiBBCLgICAACACQcABaiADEJKAgIAAIAJBkAFqIAJBwAFqQcCPgIAAEJOAgIAAIAJBwAFqIAJBwAFqIAQQm4CAgAAgAkGQAWogAkGQAWogBBCMgICAACACQeAAaiACQZABahCSgICAACACQeAAaiACQeAAaiACQZABahCTgICAACAAIAJB4ABqEJKAgIAAIAAgACACQZABahCTgICAACAAIAAgAkHAAWoQk4CAgAAgACAAEJmAgIAAIAAgACACQeAAahCTgICAACAAIAAgAkHAAWoQk4CAgAAgAkEwaiAAEJKAgIAAIAJBMGogAkEwaiACQZABahCTgICAACACIAJBMGogAkHAAWoQm4CAgAACQAJAIAIQloCAgABFDQAgAiACQTBqIAJBwAFqEIyAgIAAQX8hBCACEJaAgIAADQEgACAAQfCPgIAAEJOAgIAACwJAIAAQlICAgAAgAS0AH0EHdkcNACAAIAAQmICAgAALIABB+ABqIAAgAxCTgICAAEEAIQQLIAJB8AFqJICAgIAAIAQLLQAgABCKgICAACAAQShqEIuAgIAAIABB0ABqEIuAgIAAIABB+ABqEIqAgIAAC30BAX8jgICAgABBkAFrIgIkgICAgAAgAkHgAGogAUHQAGoQkYCAgAAgAkEwaiABIAJB4ABqEJOAgIAAIAIgAUEoaiACQeAAahCTgICAACAAIAIQlYCAgAAgACACQTBqEJSAgIAAQQd0IAAtAB9zOgAfIAJBkAFqJICAgIAAC5wEAQR/I4CAgIAAQeADayICJICAgIAAQQAhAyACQaACaiEEA0AgBEEBaiABIANqLQAAIgVBBHY6AAAgBCAFQQ9xOgAAIARBAmohBCADQQFqIgNBIEcNAAtBACEEQQAhAwNAIAJBoAJqIARqIgUgBS0AACADaiIDIANBGHRBgICAwABqIgNBGHVB8AFxazoAACADQRx1IQMgBEEBaiIEQT9HDQALIAIgAi0A3wIgA2o6AN8CIAAQqICAgABBACEDQQEhBANAIAJBCGogAyACQaACaiAEaiwAABCrgICAACACQYABaiAAIAJBCGoQpICAgAAgACACQYABahCigICAACADQQFqIQMgBEE+SSEFIARBAmohBCAFDQALIAJB6AJqIAAQoICAgAAgAkGAAWogAkHoAmoQoYCAgAAgAkHoAmogAkGAAWoQpoCAgAAgAkGAAWogAkHoAmoQoYCAgAAgAkHoAmogAkGAAWoQpoCAgAAgAkGAAWogAkHoAmoQoYCAgAAgAkHoAmogAkGAAWoQpoCAgAAgAkGAAWogAkHoAmoQoYCAgAAgACACQYABahCigICAAEEAIQNBACEEA0AgAkEIaiADIAJBoAJqIARqLAAAEKuAgIAAIAJBgAFqIAAgAkEIahCkgICAACAAIAJBgAFqEKKAgIAAIANBAWohAyAEQT5JIQUgBEECaiEEIAUNAAsgAkHgA2okgICAgAALrQMBBH8jgICAgABBgAFrIgMkgICAgAAgABCLgICAACAAQShqIgQQi4CAgAAgAEHQAGoiBRCKgICAACAAIAFBwAdsIgFB0JCAgABqIAIgAkEHdSACcUEBdGsiBkEBc61C/wGDQn98Qj+IpxCsgICAACAAIAFByJGAgABqIAZBAnOtQv8Bg0J/fEI/iKcQrICAgAAgACABQcCSgIAAaiAGQQNzrUL/AYNCf3xCP4inEKyAgIAAIAAgAUG4k4CAAGogBkEEc61C/wGDQn98Qj+IpxCsgICAACAAIAFBsJSAgABqIAZBBXOtQv8Bg0J/fEI/iKcQrICAgAAgACABQaiVgIAAaiAGQQZzrUL/AYNCf3xCP4inEKyAgIAAIAAgAUGgloCAAGogBkEHc61C/wGDQn98Qj+IpxCsgICAACAAIAFBmJeAgABqIAZBCHOtQv8Bg0J/fEI/iKcQrICAgAAgA0EIaiAEEI+AgIAAIANBCGpBKGogABCPgICAACADQQhqQdAAaiAFEJiAgIAAIAAgA0EIaiACQYABcUEHdhCsgICAACADQYABaiSAgICAAAs0ACAAIAEgAhCNgICAACAAQShqIAFBKGogAhCNgICAACAAQdAAaiABQdAAaiACEI2AgIAAC30BAX8jgICAgABBkAFrIgIkgICAgAAgAkHgAGogAUHQAGoQkYCAgAAgAkEwaiABIAJB4ABqEJOAgIAAIAIgAUEoaiACQeAAahCTgICAACAAIAIQlYCAgAAgACACQTBqEJSAgIAAQQd0IAAtAB9zOgAfIAJBkAFqJICAgIAAC58GAQJ/I4CAgIAAQfACayIDJICAgIAAQQAhBANAIANB0AJqIARqIAIgBGotAAA6AAAgBEEBaiIEQSBHDQALIAMgAy0A0AJB+AFxOgDQAiADIAMtAO8CQT9xQcAAcjoA7wIgA0GgAmogARCQgICAACADEIuAgIAAIANBMGogA0GgAmogAxCMgICAACADIAMgA0GgAmoQm4CAgAAgAyADEJGAgIAAIANBoAJqIANBMGogAxCTgICAACADQfABahCLgICAACADQcABahCKgICAACADQZABaiADQaACahCPgICAACADQeAAahCLgICAAEH+ASEEQQAhAQNAIANB8AFqIANBkAFqIANB0AJqIARBA3ZqLQAAIARBB3F2QQFxIgIgAXMiARCOgICAACADQcABaiADQeAAaiABEI6AgIAAIANBMGogA0GQAWogA0HgAGoQm4CAgAAgAyADQfABaiADQcABahCbgICAACADQfABaiADQfABaiADQcABahCMgICAACADQcABaiADQZABaiADQeAAahCMgICAACADQeAAaiADQTBqIANB8AFqEJOAgIAAIANBwAFqIANBwAFqIAMQk4CAgAAgA0EwaiADEJKAgIAAIAMgA0HwAWoQkoCAgAAgA0GQAWogA0HgAGogA0HAAWoQjICAgAAgA0HAAWogA0HgAGogA0HAAWoQm4CAgAAgA0HwAWogAyADQTBqEJOAgIAAIAMgAyADQTBqEJuAgIAAIANBwAFqIANBwAFqEJKAgIAAIANB4ABqIAMQl4CAgAAg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////AIMiBkIEhiAIQhGIhDwACiAAIAJCFYcgCkL///8Ag3wiA0IKiDwAESAAIANCAog8ABAgACACQv///wCDIgdCAYYgBkIUiIQ8AA0gACADQhWHIAtC////AIN8IgJCDYg8ABQgACACQgWIPAATIAAgA0L///8AgyIGQgaGIAdCD4iEPAAPIAAgAkIVhyAMQv///wCDfCIDPAAVIAAgAkIDhiAGQhKIhDwAEiAAIANCCIg8ABYgACADQhWHIA1C////AIN8IgJCC4g8ABkgACACQgOIPAAYIAAgAkIVhyAOQv///wCDfCIGQgaIPAAbIAAgAkL///8AgyICQgWGIANCEIhCH4OEPAAXIAAgBkIVhyAFQv///wCDfCIDQhGIPAAfIAAgA0IJiDwAHiAAIANCAYg8AB0gACAGQv///wCDIgZCAoYgAkITiIQ8ABogACADQgeGIAZCDoiEPAAcC8cjATh+IAAgAjEAGEIIhiACMQAXIgSEIAIxABlCEIaEIAIxABoiBUIYhoRCBYhC////AIMiBiABMQAbQgiGIAExABoiB4QgATEAHCIIQhCGhEICiEL///8AgyIJfiACMwAVIARCEIZCgID8AIOEIgQgATEAHUIIhiAIhCABMQAeQhCGhCABMQAfQhiGhEIHiCIIfnwgAjEAG0IIhiAFhCACMQAcIgpCEIaEQgKIQv///wCDIgUgATEAGEIIhiABMQAXIguEIAExABlCEIaEIAdCGIaEQgWIQv///wCDIgd+fCACMQAdQgiGIAqEIAIxAB5CEIaEIAIxAB9CGIaEQgeIIgogATMAFSALQhCGQoCA/ACDhCILfnwgBCAJfiACMQATQgiGIAIxABIiDIQgAjEAFEIQhoRCA4giDSAIfnwgBiAHfnwgBSALfnwgCiABMQATQgiGIAExABIiDoQgATEAFEIQhoRCA4giD358IhBCgIDAAHwiEUIVh3wiEkKAgMAAfCITQhWHIAUgCX4gBiAIfnwgCiAHfnwiFCAUQoCAwAB8IhRCgICA////////AIN9fCIVQpjaHH4gCiAJfiAFIAh+fCAUQhWIfCIUIBRCgIDAAHwiFkKAgID///////8Ag30iF0KT2Ch+fCASIBNCgICAf4N9IhhC5/YnfnwgDSAJfiACMQAQQgiGIAIxAA8iEoQgAjEAEUIQhoQgDEIYhoRCBohC////AIMiDCAIfnwgBCAHfnwgBiALfnwgBSAPfnwgCiABMQAQQgiGIAExAA8iE4QgATEAEUIQhoQgDkIYhoRCBohC////AIMiDn58IAwgCX4gAjEADkIIhiACMQANIhmEIBJCEIaEQgGIQv///wCDIhIgCH58IA0gB358IAQgC358IAYgD358IAUgDn58IAogATEADkIIhiABMQANIhqEIBNCEIaEQgGIQv///wCDIhN+fCIbQoCAwAB8IhxCFYd8Ih1CgIDAAHwiHkIVhyAQIBFCgICAf4N9fCIfQtOMQ358IAIxAANCCIYgAjEAAiIRhCACMQAEQhCGhCACMQAFIhRCGIaEQgWIQv///wCDIhAgC34gAjMAACARQhCGQoCA/ACDhCIRIAd+fCACMQAGQgiGIBSEIAIxAAciIEIQhoRCAohC////AIMiFCAPfnwgAjEACEIIhiAghCACMQAJQhCGhCACMQAKIiFCGIaEQgeIQv///wCDIiAgDn58IAIxAAtCCIYgIYQgAjEADEIQhoQgGUIYhoRCBIhC////AIMiGSATfnwgEiABMQALQgiGIAExAAoiIYQgATEADEIQhoQgGkIYhoRCBIhC////AIMiGn58IAwgATEACEIIhiABMQAHIiKEIAExAAlCEIaEICFCGIaEQgeIQv///wCDIiF+fCANIAExAAZCCIYgATEABSIjhCAiQhCGhEICiEL///8AgyIifnwgBCABMQADQgiGIAExAAIiJIQgATEABEIQhoQgI0IYhoRCBYhC////AIMiI358IAYgATMAACAkQhCGQoCA/ACDhCIkfnwgAzEAGEIIhiADMQAXIiWEIAMxABlCEIaEIAMxABoiJkIYhoRCBYhC////AIN8IBAgD34gESALfnwgFCAOfnwgICATfnwgGSAafnwgEiAhfnwgDCAifnwgDSAjfnwgBCAkfnwgAzMAFXwgJUIQhkKAgPwAg3wiJUKAgMAAfCInQhWIfCIofCAoQoCAwAB8IihCgICAf4N9IBhCmNocfiAVQpPYKH58IB9C5/YnfnwgECAOfiARIA9+fCAUIBN+fCAgIBp+fCAZICF+fCASICJ+fCAMICN+fCANICR+fCADMQATQgiGIAMxABIiKYQgAzEAFEIQhoRCA4h8IBAgE34gESAOfnwgFCAafnwgICAhfnwgGSAi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IgMkgICAgAAgA0HAAGpC+cL4m5Gjs/DbADcDACADQThqQuv6htq/tfbBHzcDACADQTBqQp/Y+dnCkdqCm383AwAgA0EoakLRhZrv+s+Uh9EANwMAIANBIGpC8e30+KWn/aelfzcDACADQRhqQqvw0/Sv7ry3PDcDACADQRBqQrvOqqbY0Ouzu383AwAgA0KIkvOd/8z5hOoANwMIIANCADcDACADQQA2AkhBASEEAkAgAyAAIAEQs4CAgAANACADIAIQtYCAgABBAEchBAsgA0HQAWokgICAgAAgBAuDAgEBfyOAgICAAEHwA2siBSSAgICAACAFQaACahCygICAABogBUGgAmogBEEgakEgELOAgIAAGiAFQaACaiABIAIQs4CAgAAaIAVBoAJqIAVBoAFqELWAgIAAGiAFQaABahCwgICAACAFIAVBoAFqEKqAgIAAIAAgBRCpgICAACAFQaACahCygICAABogBUGgAmogAEEgELOAgIAAGiAFQaACaiADQSAQs4CAgAAaIAVBoAJqIAEgAhCzgICAABogBUGgAmogBUHgAWoQtYCAgAAaIAVB4AFqELCAgIAAIABBIGogBUHgAWogBCAFQaABahCxgICAACAFQfADaiSAgICAAAvzBAECfyOAgICAAEHQBGsiBCSAgICAAEEAIQUCQCAALQA/QR9LDQAgBEGAAWogAxCngICAAA0AIARBoAJqELKAgIAAGiAEQaACaiAAQSAQs4CAgAAaIARBoAJqIANBIBCzgICAABogBEGgAmogASACELOAgIAAGiAEQaACaiAEQZAEahC1gICAABogBEGQBGoQsICAgAAgBEEIaiAEQZAEaiAEQYABaiAAQSBqEJ2AgIAAIARB8ANqIARBCGoQrYCAgAAgAC0AASAELQDxA3MgAC0AACAELQDwA3NyIAAtAAIgBC0A8gNzciAALQADIAQtAPMDc3IgAC0ABCAELQD0A3NyIAAtAAUgBC0A9QNzciAALQAGIAQtAPYDc3IgAC0AByAELQD3A3NyIAAtAAggBC0A+ANzciAALQAJIAQtAPkDc3IgAC0ACiAELQD6A3NyIAAtAAsgBC0A+wNzciAALQAMIAQtAPwDc3IgAC0ADSAELQD9A3NyIAAtAA4gBC0A/gNzciAALQAPIAQtAP8Dc3IgAC0AECAELQCABHNyIAAt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", "base64");
    }
  });

  // node_modules/supercop/dist/cjs/index.js
  var require_cjs = __commonJS({
    "node_modules/supercop/dist/cjs/index.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.keyExchange = exports.verify = exports.sign = exports.createKeyPair = exports.keyPairFrom = exports.KeyPair = exports.isSecretKey = exports.isSignature = exports.isPublicKey = exports.isSeed = exports.createSeed = void 0;
      var supercop_wasm_1 = require_supercop_wasm();
      var Module = (() => __awaiter(void 0, void 0, void 0, function* () {
        const memory = new WebAssembly.Memory({ initial: 4 });
        const imports = { env: { memory } };
        if ("function" === typeof WebAssembly.Global) {
          imports.env.__heap_base = new WebAssembly.Global({ value: "i32", mutable: true });
        }
        const program = yield WebAssembly.instantiate(supercop_wasm_1.binary, imports);
        return {
          memory,
          instance: program.instance,
          exports: program.instance.exports
        };
      }))();
      function randomBytes(length) {
        return Buffer.from(new Array(length).fill(0).map(() => Math.floor(Math.random() * 256)));
      }
      function createSeed() {
        return randomBytes(32);
      }
      exports.createSeed = createSeed;
      function xIsBuffer(data) {
        return Buffer.isBuffer(data);
      }
      function isSeed(data) {
        if (!xIsBuffer(data))
          return false;
        return data.length === 32;
      }
      exports.isSeed = isSeed;
      function isPublicKey(data) {
        if (!xIsBuffer(data))
          return false;
        return data.length === 32;
      }
      exports.isPublicKey = isPublicKey;
      function isSignature(data) {
        if (!xIsBuffer(data))
          return false;
        return data.length === 64;
      }
      exports.isSignature = isSignature;
      function isSecretKey(data) {
        if (!xIsBuffer(data))
          return false;
        return data.length === 64;
      }
      exports.isSecretKey = isSecretKey;
      var KeyPair = class {
        constructor() {
        }
        // Passes signing on to the exported stand-alone method
        // Async, so the error = promise rejection
        sign(message) {
          return __awaiter(this, void 0, void 0, function* () {
            if (!isSecretKey(this.secretKey))
              throw new Error("No secret key on this keypair, only verification is possible");
            if (!isPublicKey(this.publicKey))
              throw new Error("Invalid public key");
            return sign(message, this.publicKey, this.secretKey);
          });
        }
        // Passes verification on to the exported stand-alone method
        verify(signature, message) {
          if (!isPublicKey(this.publicKey))
            throw new Error("Invalid public key");
          return verify(signature, message, this.publicKey);
        }
        keyExchange(theirPublicKey) {
          if (!isSecretKey(this.secretKey))
            throw new Error("Invalid secret key");
          return keyExchange(theirPublicKey, this.secretKey);
        }
        toJSON() {
          return {
            publicKey: this.publicKey ? [...this.publicKey] : void 0,
            secretKey: this.secretKey ? [...this.secretKey] : void 0
          };
        }
        static create(seed) {
          return createKeyPair(seed);
        }
        static from(data) {
          return keyPairFrom(data);
        }
      };
      exports.KeyPair = KeyPair;
      function keyPairFrom(data) {
        if ("object" !== typeof data)
          throw new Error("Invalid input data");
        if (!data)
          throw new Error("Invalid input data");
        data = Object.assign({}, data);
        if (Array.isArray(data.publicKey))
          data.publicKey = Buffer.from(data.publicKey);
        if (Array.isArray(data.secretKey))
          data.secretKey = Buffer.from(data.secretKey);
        if (!isPublicKey(data.publicKey))
          throw new Error("Invalid public key");
        const keypair = new KeyPair();
        Object.assign(keypair, data);
        return keypair;
      }
      exports.keyPairFrom = keyPairFrom;
      function createKeyPair(seed) {
        return __awaiter(this, void 0, void 0, function* () {
          const fn = (yield Module).exports;
          const mem = (yield Module).memory;
          if (Array.isArray(seed))
            seed = Buffer.from(seed);
          if (!isSeed(seed))
            throw new Error("Invalid seed");
          const seedPtr = fn._malloc(32);
          const publicKeyPtr = fn._malloc(32);
          const secretKeyPtr = fn._malloc(64);
          const seedBuf = new Uint8Array(mem.buffer, seedPtr, 32);
          const publicKey = new Uint8Array(mem.buffer, publicKeyPtr, 32);
          const secretKey = new Uint8Array(mem.buffer, secretKeyPtr, 64);
          seedBuf.set(seed);
          fn.create_keypair(publicKeyPtr, secretKeyPtr, seedPtr);
          fn._free(seedPtr);
          fn._free(publicKeyPtr);
          fn._free(secretKeyPtr);
          return keyPairFrom({
            publicKey: Buffer.from(publicKey),
            secretKey: Buffer.from(secretKey)
          });
        });
      }
      exports.createKeyPair = createKeyPair;
      function sign(message, publicKey, secretKey) {
        return __awaiter(this, void 0, void 0, function* () {
          const fn = (yield Module).exports;
          const mem = (yield Module).memory;
          if (Array.isArray(publicKey))
            publicKey = Buffer.from(publicKey);
          if (Array.isArray(secretKey))
            secretKey = Buffer.from(secretKey);
          if (!isPublicKey(publicKey))
            throw new Error("Invalid public key");
          if (!isSecretKey(secretKey))
            throw new Error("Invalid secret key");
          if ("string" === typeof message)
            message = Buffer.from(message);
          const messageLen = message.length;
          const messageArrPtr = fn._malloc(messageLen);
          const messageArr = new Uint8Array(mem.buffer, messageArrPtr, messageLen);
          const publicKeyArrPtr = fn._malloc(32);
          const publicKeyArr = new Uint8Array(mem.buffer, publicKeyArrPtr, 32);
          const secretKeyArrPtr = fn._malloc(64);
          const secretKeyArr = new Uint8Array(mem.buffer, secretKeyArrPtr, 64);
          const sigPtr = fn._malloc(64);
          const sig = new Uint8Array(mem.buffer, sigPtr, 64);
          messageArr.set(message);
          publicKeyArr.set(publicKey);
          secretKeyArr.set(secretKey);
          yield fn.sign(sigPtr, messageArrPtr, messageLen, publicKeyArrPtr, secretKeyArrPtr);
          fn._free(messageArrPtr);
          fn._free(publicKeyArrPtr);
          fn._free(secretKeyArrPtr);
          fn._free(sigPtr);
          return Buffer.from(sig);
        });
      }
      exports.sign = sign;
      function verify(signature, message, publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
          const fn = (yield Module).exports;
          const mem = (yield Module).memory;
          if (Array.isArray(signature))
            signature = Buffer.from(signature);
          if (Array.isArray(publicKey))
            publicKey = Buffer.from(publicKey);
          if (!isPublicKey(publicKey))
            throw new Error("Invalid public key");
          if (!isSignature(signature))
            throw new Error("Invalid signature");
          if ("string" === typeof message)
            message = Buffer.from(message);
          const messageLen = message.length;
          const messageArrPtr = fn._malloc(messageLen);
          const messageArr = new Uint8Array(mem.buffer, messageArrPtr, messageLen);
          const signatureArrPtr = fn._malloc(64);
          const signatureArr = new Uint8Array(mem.buffer, signatureArrPtr, 64);
          const publicKeyArrPtr = fn._malloc(32);
          const publicKeyArr = new Uint8Array(mem.buffer, publicKeyArrPtr, 32);
          messageArr.set(message);
          signatureArr.set(signature);
          publicKeyArr.set(publicKey);
          const res = fn.verify(signatureArrPtr, messageArrPtr, messageLen, publicKeyArrPtr) === 1;
          fn._free(messageArrPtr);
          fn._free(signatureArrPtr);
          fn._free(publicKeyArrPtr);
          return res;
        });
      }
      exports.verify = verify;
      function keyExchange(theirPublicKey, ourSecretKey) {
        return __awaiter(this, void 0, void 0, function* () {
          const fn = (yield Module).exports;
          const mem = (yield Module).memory;
          if (Array.isArray(theirPublicKey))
            theirPublicKey = Buffer.from(theirPublicKey);
          if (Array.isArray(ourSecretKey))
            ourSecretKey = Buffer.from(ourSecretKey);
          if (!isPublicKey(theirPublicKey))
            throw new Error("Invalid public key");
          if (!isSecretKey(ourSecretKey))
            throw new Error("Invalid secret key");
          const sharedSecretArrPtr = fn._malloc(32);
          const sharedSecretArr = new Uint8Array(mem.buffer, sharedSecretArrPtr, 32);
          const publicKeyArrPtr = fn._malloc(32);
          const publicKeyArr = new Uint8Array(mem.buffer, publicKeyArrPtr, 32);
          const secretKeyArrPtr = fn._malloc(64);
          const secretKeyArr = new Uint8Array(mem.buffer, secretKeyArrPtr, 64);
          publicKeyArr.set(theirPublicKey);
          secretKeyArr.set(ourSecretKey);
          fn.key_exchange(sharedSecretArrPtr, publicKeyArrPtr, secretKeyArrPtr);
          fn._free(sharedSecretArrPtr);
          fn._free(publicKeyArrPtr);
          fn._free(secretKeyArrPtr);
          return Buffer.from(sharedSecretArr);
        });
      }
      exports.keyExchange = keyExchange;
      exports.default = KeyPair;
    }
  });

  // src/common.js
  window.Buffer = require_buffer().Buffer;
  window.supercop = require_cjs();
  [...document.body.querySelectorAll("[href]")].forEach((el) => {
    if (el.tagName.toLowerCase() == "a") return;
    if (getComputedStyle(el).display == "none") return;
    el.onclick = () => document.location.href = el.getAttribute("href");
    el.style.cursor = "pointer";
  });
  window.sha2_256 = async function(subject, e) {
    return Buffer.from(await window.crypto.subtle.digest("SHA-256", window.Buffer.from(subject, e)));
  };
  window.base64url = {
    _padString(subject) {
      const diff = subject.length % 4;
      if (!diff) return subject;
      return subject + "=".repeat(4 - diff);
    },
    decode(subject) {
      subject = subject.toString();
      return base64url._padString(subject).replace(/\-/g, "+").replace(/_/g, "/");
    },
    encode(subject) {
      return subject.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    },
    toBuffer(subject) {
      return Buffer.from(base64url.decode(subject), "base64");
    },
    fromBuffer(subject) {
      return base64url.encode(Buffer.from(subject).toString("base64"));
    }
  };
  window.getdoc = function(path) {
    const rawdoc = window.localStorage.getItem(path);
    if (!rawdoc) return null;
    let [body, signature] = rawdoc.split(".");
    const data = JSON.parse(base64url.toBuffer(body).toString());
    signature = base64url.toBuffer(signature);
    return Object.assign(/* @__PURE__ */ Object.create({
      _signature: signature,
      _signatureData: body
    }), data);
  };
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
