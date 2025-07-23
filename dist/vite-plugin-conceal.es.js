var buffer = {}, base64Js = {}, hasRequiredBase64Js;
function requireBase64Js() {
  if (hasRequiredBase64Js) return base64Js;
  hasRequiredBase64Js = 1, base64Js.byteLength = u, base64Js.toByteArray = L, base64Js.fromByteArray = M;
  for (var l = [], h = [], d = typeof Uint8Array < "u" ? Uint8Array : Array, B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, g = B.length; s < g; ++s)
    l[s] = B[s], h[B.charCodeAt(s)] = s;
  h[45] = 62, h[95] = 63;
  function p(c) {
    var y = c.length;
    if (y % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var w = c.indexOf("=");
    w === -1 && (w = y);
    var C = w === y ? 0 : 4 - w % 4;
    return [w, C];
  }
  function u(c) {
    var y = p(c), w = y[0], C = y[1];
    return (w + C) * 3 / 4 - C;
  }
  function _(c, y, w) {
    return (y + w) * 3 / 4 - w;
  }
  function L(c) {
    var y, w = p(c), C = w[0], S = w[1], R = new d(_(c, C, S)), b = 0, $ = S > 0 ? C - 4 : C, F;
    for (F = 0; F < $; F += 4)
      y = h[c.charCodeAt(F)] << 18 | h[c.charCodeAt(F + 1)] << 12 | h[c.charCodeAt(F + 2)] << 6 | h[c.charCodeAt(F + 3)], R[b++] = y >> 16 & 255, R[b++] = y >> 8 & 255, R[b++] = y & 255;
    return S === 2 && (y = h[c.charCodeAt(F)] << 2 | h[c.charCodeAt(F + 1)] >> 4, R[b++] = y & 255), S === 1 && (y = h[c.charCodeAt(F)] << 10 | h[c.charCodeAt(F + 1)] << 4 | h[c.charCodeAt(F + 2)] >> 2, R[b++] = y >> 8 & 255, R[b++] = y & 255), R;
  }
  function A(c) {
    return l[c >> 18 & 63] + l[c >> 12 & 63] + l[c >> 6 & 63] + l[c & 63];
  }
  function U(c, y, w) {
    for (var C, S = [], R = y; R < w; R += 3)
      C = (c[R] << 16 & 16711680) + (c[R + 1] << 8 & 65280) + (c[R + 2] & 255), S.push(A(C));
    return S.join("");
  }
  function M(c) {
    for (var y, w = c.length, C = w % 3, S = [], R = 16383, b = 0, $ = w - C; b < $; b += R)
      S.push(U(c, b, b + R > $ ? $ : b + R));
    return C === 1 ? (y = c[w - 1], S.push(
      l[y >> 2] + l[y << 4 & 63] + "=="
    )) : C === 2 && (y = (c[w - 2] << 8) + c[w - 1], S.push(
      l[y >> 10] + l[y >> 4 & 63] + l[y << 2 & 63] + "="
    )), S.join("");
  }
  return base64Js;
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredIeee754;
function requireIeee754() {
  return hasRequiredIeee754 || (hasRequiredIeee754 = 1, ieee754.read = function(l, h, d, B, s) {
    var g, p, u = s * 8 - B - 1, _ = (1 << u) - 1, L = _ >> 1, A = -7, U = d ? s - 1 : 0, M = d ? -1 : 1, c = l[h + U];
    for (U += M, g = c & (1 << -A) - 1, c >>= -A, A += u; A > 0; g = g * 256 + l[h + U], U += M, A -= 8)
      ;
    for (p = g & (1 << -A) - 1, g >>= -A, A += B; A > 0; p = p * 256 + l[h + U], U += M, A -= 8)
      ;
    if (g === 0)
      g = 1 - L;
    else {
      if (g === _)
        return p ? NaN : (c ? -1 : 1) * (1 / 0);
      p = p + Math.pow(2, B), g = g - L;
    }
    return (c ? -1 : 1) * p * Math.pow(2, g - B);
  }, ieee754.write = function(l, h, d, B, s, g) {
    var p, u, _, L = g * 8 - s - 1, A = (1 << L) - 1, U = A >> 1, M = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, c = B ? 0 : g - 1, y = B ? 1 : -1, w = h < 0 || h === 0 && 1 / h < 0 ? 1 : 0;
    for (h = Math.abs(h), isNaN(h) || h === 1 / 0 ? (u = isNaN(h) ? 1 : 0, p = A) : (p = Math.floor(Math.log(h) / Math.LN2), h * (_ = Math.pow(2, -p)) < 1 && (p--, _ *= 2), p + U >= 1 ? h += M / _ : h += M * Math.pow(2, 1 - U), h * _ >= 2 && (p++, _ /= 2), p + U >= A ? (u = 0, p = A) : p + U >= 1 ? (u = (h * _ - 1) * Math.pow(2, s), p = p + U) : (u = h * Math.pow(2, U - 1) * Math.pow(2, s), p = 0)); s >= 8; l[d + c] = u & 255, c += y, u /= 256, s -= 8)
      ;
    for (p = p << s | u, L += s; L > 0; l[d + c] = p & 255, c += y, p /= 256, L -= 8)
      ;
    l[d + c - y] |= w * 128;
  }), ieee754;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var hasRequiredBuffer;
function requireBuffer() {
  return hasRequiredBuffer || (hasRequiredBuffer = 1, function(l) {
    const h = requireBase64Js(), d = requireIeee754(), B = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    l.Buffer = u, l.SlowBuffer = R, l.INSPECT_MAX_BYTES = 50;
    const s = 2147483647;
    l.kMaxLength = s, u.TYPED_ARRAY_SUPPORT = g(), !u.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function g() {
      try {
        const e = new Uint8Array(1), r = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(e, r), e.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(u.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (u.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(u.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (u.isBuffer(this))
          return this.byteOffset;
      }
    });
    function p(e) {
      if (e > s)
        throw new RangeError('The value "' + e + '" is invalid for option "size"');
      const r = new Uint8Array(e);
      return Object.setPrototypeOf(r, u.prototype), r;
    }
    function u(e, r, t) {
      if (typeof e == "number") {
        if (typeof r == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return U(e);
      }
      return _(e, r, t);
    }
    u.poolSize = 8192;
    function _(e, r, t) {
      if (typeof e == "string")
        return M(e, r);
      if (ArrayBuffer.isView(e))
        return y(e);
      if (e == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e
        );
      if (k(e, ArrayBuffer) || e && k(e.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (k(e, SharedArrayBuffer) || e && k(e.buffer, SharedArrayBuffer)))
        return w(e, r, t);
      if (typeof e == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const n = e.valueOf && e.valueOf();
      if (n != null && n !== e)
        return u.from(n, r, t);
      const i = C(e);
      if (i) return i;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof e[Symbol.toPrimitive] == "function")
        return u.from(e[Symbol.toPrimitive]("string"), r, t);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e
      );
    }
    u.from = function(e, r, t) {
      return _(e, r, t);
    }, Object.setPrototypeOf(u.prototype, Uint8Array.prototype), Object.setPrototypeOf(u, Uint8Array);
    function L(e) {
      if (typeof e != "number")
        throw new TypeError('"size" argument must be of type number');
      if (e < 0)
        throw new RangeError('The value "' + e + '" is invalid for option "size"');
    }
    function A(e, r, t) {
      return L(e), e <= 0 ? p(e) : r !== void 0 ? typeof t == "string" ? p(e).fill(r, t) : p(e).fill(r) : p(e);
    }
    u.alloc = function(e, r, t) {
      return A(e, r, t);
    };
    function U(e) {
      return L(e), p(e < 0 ? 0 : S(e) | 0);
    }
    u.allocUnsafe = function(e) {
      return U(e);
    }, u.allocUnsafeSlow = function(e) {
      return U(e);
    };
    function M(e, r) {
      if ((typeof r != "string" || r === "") && (r = "utf8"), !u.isEncoding(r))
        throw new TypeError("Unknown encoding: " + r);
      const t = b(e, r) | 0;
      let n = p(t);
      const i = n.write(e, r);
      return i !== t && (n = n.slice(0, i)), n;
    }
    function c(e) {
      const r = e.length < 0 ? 0 : S(e.length) | 0, t = p(r);
      for (let n = 0; n < r; n += 1)
        t[n] = e[n] & 255;
      return t;
    }
    function y(e) {
      if (k(e, Uint8Array)) {
        const r = new Uint8Array(e);
        return w(r.buffer, r.byteOffset, r.byteLength);
      }
      return c(e);
    }
    function w(e, r, t) {
      if (r < 0 || e.byteLength < r)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (e.byteLength < r + (t || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let n;
      return r === void 0 && t === void 0 ? n = new Uint8Array(e) : t === void 0 ? n = new Uint8Array(e, r) : n = new Uint8Array(e, r, t), Object.setPrototypeOf(n, u.prototype), n;
    }
    function C(e) {
      if (u.isBuffer(e)) {
        const r = S(e.length) | 0, t = p(r);
        return t.length === 0 || e.copy(t, 0, 0, r), t;
      }
      if (e.length !== void 0)
        return typeof e.length != "number" || Y(e.length) ? p(0) : c(e);
      if (e.type === "Buffer" && Array.isArray(e.data))
        return c(e.data);
    }
    function S(e) {
      if (e >= s)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
      return e | 0;
    }
    function R(e) {
      return +e != e && (e = 0), u.alloc(+e);
    }
    u.isBuffer = function(r) {
      return r != null && r._isBuffer === !0 && r !== u.prototype;
    }, u.compare = function(r, t) {
      if (k(r, Uint8Array) && (r = u.from(r, r.offset, r.byteLength)), k(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), !u.isBuffer(r) || !u.isBuffer(t))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (r === t) return 0;
      let n = r.length, i = t.length;
      for (let o = 0, f = Math.min(n, i); o < f; ++o)
        if (r[o] !== t[o]) {
          n = r[o], i = t[o];
          break;
        }
      return n < i ? -1 : i < n ? 1 : 0;
    }, u.isEncoding = function(r) {
      switch (String(r).toLowerCase()) {
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
          return !0;
        default:
          return !1;
      }
    }, u.concat = function(r, t) {
      if (!Array.isArray(r))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (r.length === 0)
        return u.alloc(0);
      let n;
      if (t === void 0)
        for (t = 0, n = 0; n < r.length; ++n)
          t += r[n].length;
      const i = u.allocUnsafe(t);
      let o = 0;
      for (n = 0; n < r.length; ++n) {
        let f = r[n];
        if (k(f, Uint8Array))
          o + f.length > i.length ? (u.isBuffer(f) || (f = u.from(f)), f.copy(i, o)) : Uint8Array.prototype.set.call(
            i,
            f,
            o
          );
        else if (u.isBuffer(f))
          f.copy(i, o);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        o += f.length;
      }
      return i;
    };
    function b(e, r) {
      if (u.isBuffer(e))
        return e.length;
      if (ArrayBuffer.isView(e) || k(e, ArrayBuffer))
        return e.byteLength;
      if (typeof e != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e
        );
      const t = e.length, n = arguments.length > 2 && arguments[2] === !0;
      if (!n && t === 0) return 0;
      let i = !1;
      for (; ; )
        switch (r) {
          case "ascii":
          case "latin1":
          case "binary":
            return t;
          case "utf8":
          case "utf-8":
            return G(e).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return t * 2;
          case "hex":
            return t >>> 1;
          case "base64":
            return er(e).length;
          default:
            if (i)
              return n ? -1 : G(e).length;
            r = ("" + r).toLowerCase(), i = !0;
        }
    }
    u.byteLength = b;
    function $(e, r, t) {
      let n = !1;
      if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, r >>>= 0, t <= r))
        return "";
      for (e || (e = "utf8"); ; )
        switch (e) {
          case "hex":
            return ar(this, r, t);
          case "utf8":
          case "utf-8":
            return V(this, r, t);
          case "ascii":
            return pr(this, r, t);
          case "latin1":
          case "binary":
            return sr(this, r, t);
          case "base64":
            return cr(this, r, t);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return lr(this, r, t);
          default:
            if (n) throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(), n = !0;
        }
    }
    u.prototype._isBuffer = !0;
    function F(e, r, t) {
      const n = e[r];
      e[r] = e[t], e[t] = n;
    }
    u.prototype.swap16 = function() {
      const r = this.length;
      if (r % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let t = 0; t < r; t += 2)
        F(this, t, t + 1);
      return this;
    }, u.prototype.swap32 = function() {
      const r = this.length;
      if (r % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let t = 0; t < r; t += 4)
        F(this, t, t + 3), F(this, t + 1, t + 2);
      return this;
    }, u.prototype.swap64 = function() {
      const r = this.length;
      if (r % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let t = 0; t < r; t += 8)
        F(this, t, t + 7), F(this, t + 1, t + 6), F(this, t + 2, t + 5), F(this, t + 3, t + 4);
      return this;
    }, u.prototype.toString = function() {
      const r = this.length;
      return r === 0 ? "" : arguments.length === 0 ? V(this, 0, r) : $.apply(this, arguments);
    }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function(r) {
      if (!u.isBuffer(r)) throw new TypeError("Argument must be a Buffer");
      return this === r ? !0 : u.compare(this, r) === 0;
    }, u.prototype.inspect = function() {
      let r = "";
      const t = l.INSPECT_MAX_BYTES;
      return r = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (r += " ... "), "<Buffer " + r + ">";
    }, B && (u.prototype[B] = u.prototype.inspect), u.prototype.compare = function(r, t, n, i, o) {
      if (k(r, Uint8Array) && (r = u.from(r, r.offset, r.byteLength)), !u.isBuffer(r))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
        );
      if (t === void 0 && (t = 0), n === void 0 && (n = r ? r.length : 0), i === void 0 && (i = 0), o === void 0 && (o = this.length), t < 0 || n > r.length || i < 0 || o > this.length)
        throw new RangeError("out of range index");
      if (i >= o && t >= n)
        return 0;
      if (i >= o)
        return -1;
      if (t >= n)
        return 1;
      if (t >>>= 0, n >>>= 0, i >>>= 0, o >>>= 0, this === r) return 0;
      let f = o - i, a = n - t;
      const m = Math.min(f, a), E = this.slice(i, o), I = r.slice(t, n);
      for (let x = 0; x < m; ++x)
        if (E[x] !== I[x]) {
          f = E[x], a = I[x];
          break;
        }
      return f < a ? -1 : a < f ? 1 : 0;
    };
    function W(e, r, t, n, i) {
      if (e.length === 0) return -1;
      if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, Y(t) && (t = i ? 0 : e.length - 1), t < 0 && (t = e.length + t), t >= e.length) {
        if (i) return -1;
        t = e.length - 1;
      } else if (t < 0)
        if (i) t = 0;
        else return -1;
      if (typeof r == "string" && (r = u.from(r, n)), u.isBuffer(r))
        return r.length === 0 ? -1 : H(e, r, t, n, i);
      if (typeof r == "number")
        return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(e, r, t) : Uint8Array.prototype.lastIndexOf.call(e, r, t) : H(e, [r], t, n, i);
      throw new TypeError("val must be string, number or Buffer");
    }
    function H(e, r, t, n, i) {
      let o = 1, f = e.length, a = r.length;
      if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
        if (e.length < 2 || r.length < 2)
          return -1;
        o = 2, f /= 2, a /= 2, t /= 2;
      }
      function m(I, x) {
        return o === 1 ? I[x] : I.readUInt16BE(x * o);
      }
      let E;
      if (i) {
        let I = -1;
        for (E = t; E < f; E++)
          if (m(e, E) === m(r, I === -1 ? 0 : E - I)) {
            if (I === -1 && (I = E), E - I + 1 === a) return I * o;
          } else
            I !== -1 && (E -= E - I), I = -1;
      } else
        for (t + a > f && (t = f - a), E = t; E >= 0; E--) {
          let I = !0;
          for (let x = 0; x < a; x++)
            if (m(e, E + x) !== m(r, x)) {
              I = !1;
              break;
            }
          if (I) return E;
        }
      return -1;
    }
    u.prototype.includes = function(r, t, n) {
      return this.indexOf(r, t, n) !== -1;
    }, u.prototype.indexOf = function(r, t, n) {
      return W(this, r, t, n, !0);
    }, u.prototype.lastIndexOf = function(r, t, n) {
      return W(this, r, t, n, !1);
    };
    function nr(e, r, t, n) {
      t = Number(t) || 0;
      const i = e.length - t;
      n ? (n = Number(n), n > i && (n = i)) : n = i;
      const o = r.length;
      n > o / 2 && (n = o / 2);
      let f;
      for (f = 0; f < n; ++f) {
        const a = parseInt(r.substr(f * 2, 2), 16);
        if (Y(a)) return f;
        e[t + f] = a;
      }
      return f;
    }
    function ir(e, r, t, n) {
      return J(G(r, e.length - t), e, t, n);
    }
    function or(e, r, t, n) {
      return J(Br(r), e, t, n);
    }
    function ur(e, r, t, n) {
      return J(er(r), e, t, n);
    }
    function fr(e, r, t, n) {
      return J(dr(r, e.length - t), e, t, n);
    }
    u.prototype.write = function(r, t, n, i) {
      if (t === void 0)
        i = "utf8", n = this.length, t = 0;
      else if (n === void 0 && typeof t == "string")
        i = t, n = this.length, t = 0;
      else if (isFinite(t))
        t = t >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      const o = this.length - t;
      if ((n === void 0 || n > o) && (n = o), r.length > 0 && (n < 0 || t < 0) || t > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      i || (i = "utf8");
      let f = !1;
      for (; ; )
        switch (i) {
          case "hex":
            return nr(this, r, t, n);
          case "utf8":
          case "utf-8":
            return ir(this, r, t, n);
          case "ascii":
          case "latin1":
          case "binary":
            return or(this, r, t, n);
          case "base64":
            return ur(this, r, t, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return fr(this, r, t, n);
          default:
            if (f) throw new TypeError("Unknown encoding: " + i);
            i = ("" + i).toLowerCase(), f = !0;
        }
    }, u.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function cr(e, r, t) {
      return r === 0 && t === e.length ? h.fromByteArray(e) : h.fromByteArray(e.slice(r, t));
    }
    function V(e, r, t) {
      t = Math.min(e.length, t);
      const n = [];
      let i = r;
      for (; i < t; ) {
        const o = e[i];
        let f = null, a = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
        if (i + a <= t) {
          let m, E, I, x;
          switch (a) {
            case 1:
              o < 128 && (f = o);
              break;
            case 2:
              m = e[i + 1], (m & 192) === 128 && (x = (o & 31) << 6 | m & 63, x > 127 && (f = x));
              break;
            case 3:
              m = e[i + 1], E = e[i + 2], (m & 192) === 128 && (E & 192) === 128 && (x = (o & 15) << 12 | (m & 63) << 6 | E & 63, x > 2047 && (x < 55296 || x > 57343) && (f = x));
              break;
            case 4:
              m = e[i + 1], E = e[i + 2], I = e[i + 3], (m & 192) === 128 && (E & 192) === 128 && (I & 192) === 128 && (x = (o & 15) << 18 | (m & 63) << 12 | (E & 63) << 6 | I & 63, x > 65535 && x < 1114112 && (f = x));
          }
        }
        f === null ? (f = 65533, a = 1) : f > 65535 && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), f = 56320 | f & 1023), n.push(f), i += a;
      }
      return hr(n);
    }
    const X = 4096;
    function hr(e) {
      const r = e.length;
      if (r <= X)
        return String.fromCharCode.apply(String, e);
      let t = "", n = 0;
      for (; n < r; )
        t += String.fromCharCode.apply(
          String,
          e.slice(n, n += X)
        );
      return t;
    }
    function pr(e, r, t) {
      let n = "";
      t = Math.min(e.length, t);
      for (let i = r; i < t; ++i)
        n += String.fromCharCode(e[i] & 127);
      return n;
    }
    function sr(e, r, t) {
      let n = "";
      t = Math.min(e.length, t);
      for (let i = r; i < t; ++i)
        n += String.fromCharCode(e[i]);
      return n;
    }
    function ar(e, r, t) {
      const n = e.length;
      (!r || r < 0) && (r = 0), (!t || t < 0 || t > n) && (t = n);
      let i = "";
      for (let o = r; o < t; ++o)
        i += Er[e[o]];
      return i;
    }
    function lr(e, r, t) {
      const n = e.slice(r, t);
      let i = "";
      for (let o = 0; o < n.length - 1; o += 2)
        i += String.fromCharCode(n[o] + n[o + 1] * 256);
      return i;
    }
    u.prototype.slice = function(r, t) {
      const n = this.length;
      r = ~~r, t = t === void 0 ? n : ~~t, r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < r && (t = r);
      const i = this.subarray(r, t);
      return Object.setPrototypeOf(i, u.prototype), i;
    };
    function T(e, r, t) {
      if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
      if (e + r > t) throw new RangeError("Trying to access beyond buffer length");
    }
    u.prototype.readUintLE = u.prototype.readUIntLE = function(r, t, n) {
      r = r >>> 0, t = t >>> 0, n || T(r, t, this.length);
      let i = this[r], o = 1, f = 0;
      for (; ++f < t && (o *= 256); )
        i += this[r + f] * o;
      return i;
    }, u.prototype.readUintBE = u.prototype.readUIntBE = function(r, t, n) {
      r = r >>> 0, t = t >>> 0, n || T(r, t, this.length);
      let i = this[r + --t], o = 1;
      for (; t > 0 && (o *= 256); )
        i += this[r + --t] * o;
      return i;
    }, u.prototype.readUint8 = u.prototype.readUInt8 = function(r, t) {
      return r = r >>> 0, t || T(r, 1, this.length), this[r];
    }, u.prototype.readUint16LE = u.prototype.readUInt16LE = function(r, t) {
      return r = r >>> 0, t || T(r, 2, this.length), this[r] | this[r + 1] << 8;
    }, u.prototype.readUint16BE = u.prototype.readUInt16BE = function(r, t) {
      return r = r >>> 0, t || T(r, 2, this.length), this[r] << 8 | this[r + 1];
    }, u.prototype.readUint32LE = u.prototype.readUInt32LE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
    }, u.prototype.readUint32BE = u.prototype.readUInt32BE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
    }, u.prototype.readBigUInt64LE = D(function(r) {
      r = r >>> 0, O(r, "offset");
      const t = this[r], n = this[r + 7];
      (t === void 0 || n === void 0) && q(r, this.length - 8);
      const i = t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24, o = this[++r] + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + n * 2 ** 24;
      return BigInt(i) + (BigInt(o) << BigInt(32));
    }), u.prototype.readBigUInt64BE = D(function(r) {
      r = r >>> 0, O(r, "offset");
      const t = this[r], n = this[r + 7];
      (t === void 0 || n === void 0) && q(r, this.length - 8);
      const i = t * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r], o = this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + n;
      return (BigInt(i) << BigInt(32)) + BigInt(o);
    }), u.prototype.readIntLE = function(r, t, n) {
      r = r >>> 0, t = t >>> 0, n || T(r, t, this.length);
      let i = this[r], o = 1, f = 0;
      for (; ++f < t && (o *= 256); )
        i += this[r + f] * o;
      return o *= 128, i >= o && (i -= Math.pow(2, 8 * t)), i;
    }, u.prototype.readIntBE = function(r, t, n) {
      r = r >>> 0, t = t >>> 0, n || T(r, t, this.length);
      let i = t, o = 1, f = this[r + --i];
      for (; i > 0 && (o *= 256); )
        f += this[r + --i] * o;
      return o *= 128, f >= o && (f -= Math.pow(2, 8 * t)), f;
    }, u.prototype.readInt8 = function(r, t) {
      return r = r >>> 0, t || T(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
    }, u.prototype.readInt16LE = function(r, t) {
      r = r >>> 0, t || T(r, 2, this.length);
      const n = this[r] | this[r + 1] << 8;
      return n & 32768 ? n | 4294901760 : n;
    }, u.prototype.readInt16BE = function(r, t) {
      r = r >>> 0, t || T(r, 2, this.length);
      const n = this[r + 1] | this[r] << 8;
      return n & 32768 ? n | 4294901760 : n;
    }, u.prototype.readInt32LE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
    }, u.prototype.readInt32BE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
    }, u.prototype.readBigInt64LE = D(function(r) {
      r = r >>> 0, O(r, "offset");
      const t = this[r], n = this[r + 7];
      (t === void 0 || n === void 0) && q(r, this.length - 8);
      const i = this[r + 4] + this[r + 5] * 2 ** 8 + this[r + 6] * 2 ** 16 + (n << 24);
      return (BigInt(i) << BigInt(32)) + BigInt(t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24);
    }), u.prototype.readBigInt64BE = D(function(r) {
      r = r >>> 0, O(r, "offset");
      const t = this[r], n = this[r + 7];
      (t === void 0 || n === void 0) && q(r, this.length - 8);
      const i = (t << 24) + // Overflow
      this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r];
      return (BigInt(i) << BigInt(32)) + BigInt(this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + n);
    }), u.prototype.readFloatLE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), d.read(this, r, !0, 23, 4);
    }, u.prototype.readFloatBE = function(r, t) {
      return r = r >>> 0, t || T(r, 4, this.length), d.read(this, r, !1, 23, 4);
    }, u.prototype.readDoubleLE = function(r, t) {
      return r = r >>> 0, t || T(r, 8, this.length), d.read(this, r, !0, 52, 8);
    }, u.prototype.readDoubleBE = function(r, t) {
      return r = r >>> 0, t || T(r, 8, this.length), d.read(this, r, !1, 52, 8);
    };
    function N(e, r, t, n, i, o) {
      if (!u.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (r > i || r < o) throw new RangeError('"value" argument is out of bounds');
      if (t + n > e.length) throw new RangeError("Index out of range");
    }
    u.prototype.writeUintLE = u.prototype.writeUIntLE = function(r, t, n, i) {
      if (r = +r, t = t >>> 0, n = n >>> 0, !i) {
        const a = Math.pow(2, 8 * n) - 1;
        N(this, r, t, n, a, 0);
      }
      let o = 1, f = 0;
      for (this[t] = r & 255; ++f < n && (o *= 256); )
        this[t + f] = r / o & 255;
      return t + n;
    }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function(r, t, n, i) {
      if (r = +r, t = t >>> 0, n = n >>> 0, !i) {
        const a = Math.pow(2, 8 * n) - 1;
        N(this, r, t, n, a, 0);
      }
      let o = n - 1, f = 1;
      for (this[t + o] = r & 255; --o >= 0 && (f *= 256); )
        this[t + o] = r / f & 255;
      return t + n;
    }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 1, 255, 0), this[t] = r & 255, t + 1;
    }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 2, 65535, 0), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
    }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 2, 65535, 0), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
    }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 4, 4294967295, 0), this[t + 3] = r >>> 24, this[t + 2] = r >>> 16, this[t + 1] = r >>> 8, this[t] = r & 255, t + 4;
    }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 4, 4294967295, 0), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
    };
    function z(e, r, t, n, i) {
      tr(r, n, i, e, t, 7);
      let o = Number(r & BigInt(4294967295));
      e[t++] = o, o = o >> 8, e[t++] = o, o = o >> 8, e[t++] = o, o = o >> 8, e[t++] = o;
      let f = Number(r >> BigInt(32) & BigInt(4294967295));
      return e[t++] = f, f = f >> 8, e[t++] = f, f = f >> 8, e[t++] = f, f = f >> 8, e[t++] = f, t;
    }
    function K(e, r, t, n, i) {
      tr(r, n, i, e, t, 7);
      let o = Number(r & BigInt(4294967295));
      e[t + 7] = o, o = o >> 8, e[t + 6] = o, o = o >> 8, e[t + 5] = o, o = o >> 8, e[t + 4] = o;
      let f = Number(r >> BigInt(32) & BigInt(4294967295));
      return e[t + 3] = f, f = f >> 8, e[t + 2] = f, f = f >> 8, e[t + 1] = f, f = f >> 8, e[t] = f, t + 8;
    }
    u.prototype.writeBigUInt64LE = D(function(r, t = 0) {
      return z(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
    }), u.prototype.writeBigUInt64BE = D(function(r, t = 0) {
      return K(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
    }), u.prototype.writeIntLE = function(r, t, n, i) {
      if (r = +r, t = t >>> 0, !i) {
        const m = Math.pow(2, 8 * n - 1);
        N(this, r, t, n, m - 1, -m);
      }
      let o = 0, f = 1, a = 0;
      for (this[t] = r & 255; ++o < n && (f *= 256); )
        r < 0 && a === 0 && this[t + o - 1] !== 0 && (a = 1), this[t + o] = (r / f >> 0) - a & 255;
      return t + n;
    }, u.prototype.writeIntBE = function(r, t, n, i) {
      if (r = +r, t = t >>> 0, !i) {
        const m = Math.pow(2, 8 * n - 1);
        N(this, r, t, n, m - 1, -m);
      }
      let o = n - 1, f = 1, a = 0;
      for (this[t + o] = r & 255; --o >= 0 && (f *= 256); )
        r < 0 && a === 0 && this[t + o + 1] !== 0 && (a = 1), this[t + o] = (r / f >> 0) - a & 255;
      return t + n;
    }, u.prototype.writeInt8 = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[t] = r & 255, t + 1;
    }, u.prototype.writeInt16LE = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 2, 32767, -32768), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
    }, u.prototype.writeInt16BE = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 2, 32767, -32768), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
    }, u.prototype.writeInt32LE = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 4, 2147483647, -2147483648), this[t] = r & 255, this[t + 1] = r >>> 8, this[t + 2] = r >>> 16, this[t + 3] = r >>> 24, t + 4;
    }, u.prototype.writeInt32BE = function(r, t, n) {
      return r = +r, t = t >>> 0, n || N(this, r, t, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
    }, u.prototype.writeBigInt64LE = D(function(r, t = 0) {
      return z(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), u.prototype.writeBigInt64BE = D(function(r, t = 0) {
      return K(this, r, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function Z(e, r, t, n, i, o) {
      if (t + n > e.length) throw new RangeError("Index out of range");
      if (t < 0) throw new RangeError("Index out of range");
    }
    function Q(e, r, t, n, i) {
      return r = +r, t = t >>> 0, i || Z(e, r, t, 4), d.write(e, r, t, n, 23, 4), t + 4;
    }
    u.prototype.writeFloatLE = function(r, t, n) {
      return Q(this, r, t, !0, n);
    }, u.prototype.writeFloatBE = function(r, t, n) {
      return Q(this, r, t, !1, n);
    };
    function v(e, r, t, n, i) {
      return r = +r, t = t >>> 0, i || Z(e, r, t, 8), d.write(e, r, t, n, 52, 8), t + 8;
    }
    u.prototype.writeDoubleLE = function(r, t, n) {
      return v(this, r, t, !0, n);
    }, u.prototype.writeDoubleBE = function(r, t, n) {
      return v(this, r, t, !1, n);
    }, u.prototype.copy = function(r, t, n, i) {
      if (!u.isBuffer(r)) throw new TypeError("argument should be a Buffer");
      if (n || (n = 0), !i && i !== 0 && (i = this.length), t >= r.length && (t = r.length), t || (t = 0), i > 0 && i < n && (i = n), i === n || r.length === 0 || this.length === 0) return 0;
      if (t < 0)
        throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
      if (i < 0) throw new RangeError("sourceEnd out of bounds");
      i > this.length && (i = this.length), r.length - t < i - n && (i = r.length - t + n);
      const o = i - n;
      return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, i) : Uint8Array.prototype.set.call(
        r,
        this.subarray(n, i),
        t
      ), o;
    }, u.prototype.fill = function(r, t, n, i) {
      if (typeof r == "string") {
        if (typeof t == "string" ? (i = t, t = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string")
          throw new TypeError("encoding must be a string");
        if (typeof i == "string" && !u.isEncoding(i))
          throw new TypeError("Unknown encoding: " + i);
        if (r.length === 1) {
          const f = r.charCodeAt(0);
          (i === "utf8" && f < 128 || i === "latin1") && (r = f);
        }
      } else typeof r == "number" ? r = r & 255 : typeof r == "boolean" && (r = Number(r));
      if (t < 0 || this.length < t || this.length < n)
        throw new RangeError("Out of range index");
      if (n <= t)
        return this;
      t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, r || (r = 0);
      let o;
      if (typeof r == "number")
        for (o = t; o < n; ++o)
          this[o] = r;
      else {
        const f = u.isBuffer(r) ? r : u.from(r, i), a = f.length;
        if (a === 0)
          throw new TypeError('The value "' + r + '" is invalid for argument "value"');
        for (o = 0; o < n - t; ++o)
          this[o + t] = f[o % a];
      }
      return this;
    };
    const P = {};
    function j(e, r, t) {
      P[e] = class extends t {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: r.apply(this, arguments),
            writable: !0,
            configurable: !0
          }), this.name = `${this.name} [${e}]`, this.stack, delete this.name;
        }
        get code() {
          return e;
        }
        set code(i) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: i,
            writable: !0
          });
        }
        toString() {
          return `${this.name} [${e}]: ${this.message}`;
        }
      };
    }
    j(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(e) {
        return e ? `${e} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      },
      RangeError
    ), j(
      "ERR_INVALID_ARG_TYPE",
      function(e, r) {
        return `The "${e}" argument must be of type number. Received type ${typeof r}`;
      },
      TypeError
    ), j(
      "ERR_OUT_OF_RANGE",
      function(e, r, t) {
        let n = `The value of "${e}" is out of range.`, i = t;
        return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = rr(String(t)) : typeof t == "bigint" && (i = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = rr(i)), i += "n"), n += ` It must be ${r}. Received ${i}`, n;
      },
      RangeError
    );
    function rr(e) {
      let r = "", t = e.length;
      const n = e[0] === "-" ? 1 : 0;
      for (; t >= n + 4; t -= 3)
        r = `_${e.slice(t - 3, t)}${r}`;
      return `${e.slice(0, t)}${r}`;
    }
    function yr(e, r, t) {
      O(r, "offset"), (e[r] === void 0 || e[r + t] === void 0) && q(r, e.length - (t + 1));
    }
    function tr(e, r, t, n, i, o) {
      if (e > t || e < r) {
        const f = typeof r == "bigint" ? "n" : "";
        let a;
        throw r === 0 || r === BigInt(0) ? a = `>= 0${f} and < 2${f} ** ${(o + 1) * 8}${f}` : a = `>= -(2${f} ** ${(o + 1) * 8 - 1}${f}) and < 2 ** ${(o + 1) * 8 - 1}${f}`, new P.ERR_OUT_OF_RANGE("value", a, e);
      }
      yr(n, i, o);
    }
    function O(e, r) {
      if (typeof e != "number")
        throw new P.ERR_INVALID_ARG_TYPE(r, "number", e);
    }
    function q(e, r, t) {
      throw Math.floor(e) !== e ? (O(e, t), new P.ERR_OUT_OF_RANGE("offset", "an integer", e)) : r < 0 ? new P.ERR_BUFFER_OUT_OF_BOUNDS() : new P.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${r}`,
        e
      );
    }
    const wr = /[^+/0-9A-Za-z-_]/g;
    function xr(e) {
      if (e = e.split("=")[0], e = e.trim().replace(wr, ""), e.length < 2) return "";
      for (; e.length % 4 !== 0; )
        e = e + "=";
      return e;
    }
    function G(e, r) {
      r = r || 1 / 0;
      let t;
      const n = e.length;
      let i = null;
      const o = [];
      for (let f = 0; f < n; ++f) {
        if (t = e.charCodeAt(f), t > 55295 && t < 57344) {
          if (!i) {
            if (t > 56319) {
              (r -= 3) > -1 && o.push(239, 191, 189);
              continue;
            } else if (f + 1 === n) {
              (r -= 3) > -1 && o.push(239, 191, 189);
              continue;
            }
            i = t;
            continue;
          }
          if (t < 56320) {
            (r -= 3) > -1 && o.push(239, 191, 189), i = t;
            continue;
          }
          t = (i - 55296 << 10 | t - 56320) + 65536;
        } else i && (r -= 3) > -1 && o.push(239, 191, 189);
        if (i = null, t < 128) {
          if ((r -= 1) < 0) break;
          o.push(t);
        } else if (t < 2048) {
          if ((r -= 2) < 0) break;
          o.push(
            t >> 6 | 192,
            t & 63 | 128
          );
        } else if (t < 65536) {
          if ((r -= 3) < 0) break;
          o.push(
            t >> 12 | 224,
            t >> 6 & 63 | 128,
            t & 63 | 128
          );
        } else if (t < 1114112) {
          if ((r -= 4) < 0) break;
          o.push(
            t >> 18 | 240,
            t >> 12 & 63 | 128,
            t >> 6 & 63 | 128,
            t & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return o;
    }
    function Br(e) {
      const r = [];
      for (let t = 0; t < e.length; ++t)
        r.push(e.charCodeAt(t) & 255);
      return r;
    }
    function dr(e, r) {
      let t, n, i;
      const o = [];
      for (let f = 0; f < e.length && !((r -= 2) < 0); ++f)
        t = e.charCodeAt(f), n = t >> 8, i = t % 256, o.push(i), o.push(n);
      return o;
    }
    function er(e) {
      return h.toByteArray(xr(e));
    }
    function J(e, r, t, n) {
      let i;
      for (i = 0; i < n && !(i + t >= r.length || i >= e.length); ++i)
        r[i + t] = e[i];
      return i;
    }
    function k(e, r) {
      return e instanceof r || e != null && e.constructor != null && e.constructor.name != null && e.constructor.name === r.name;
    }
    function Y(e) {
      return e !== e;
    }
    const Er = function() {
      const e = "0123456789abcdef", r = new Array(256);
      for (let t = 0; t < 16; ++t) {
        const n = t * 16;
        for (let i = 0; i < 16; ++i)
          r[n + i] = e[t] + e[i];
      }
      return r;
    }();
    function D(e) {
      return typeof BigInt > "u" ? gr : e;
    }
    function gr() {
      throw new Error("BigInt not supported");
    }
  }(buffer)), buffer;
}
var bufferExports = requireBuffer();
const encode = (l) => l.map((h) => {
  const d = {};
  for (const B in h)
    if (Object.prototype.hasOwnProperty.call(h, B)) {
      const s = JSON.stringify(h[B]);
      d[B] = bufferExports.Buffer.from(s).toString("base64");
    }
  return d;
}), parseObject = (l) => {
  try {
    return JSON.parse(l);
  } catch (h) {
    return console.error(h), l;
  }
}, decode = (l) => Array.isArray(l) ? l.map((d) => {
  const B = {};
  for (const s in d)
    if (Object.prototype.hasOwnProperty.call(d, s))
      try {
        const g = bufferExports.Buffer.from(d[s], "base64").toString("utf-8");
        B[s] = parseObject(g);
      } catch {
        B[s] = d[s];
      }
  return B;
}) : l;
function evaluate(code) {
  const transformed = code.replace(/^export\s+default/, "return"), wrapped = `(function() { ${transformed} })()`;
  return eval(wrapped);
}
const plugin = (l = {}) => {
  const h = l.pattern ?? /\.conceal\.(js|ts)x?$/;
  return {
    name: "vite-plugin-conceal",
    async transform(d, B) {
      if (h.test(B)) {
        try {
          const s = evaluate(d);
          if (!s || !Array.isArray(s))
            return this.warn(`vite-plugin-conceal: No valid default export found in ${B}`), null;
          const g = encode(s);
          return {
            code: `
          import { decode } from 'vite-plugin-conceal';
          export default decode(${JSON.stringify(g)});
        `,
            map: null
          };
        } catch (s) {
          this.error(`vite-plugin-conceal: Failed to load ${B} — ${s}`);
        }
        return null;
      }
    }
  };
};
export {
  decode,
  plugin as default,
  encode
};
//# sourceMappingURL=vite-plugin-conceal.es.js.map
