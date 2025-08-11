function Zs(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var Vs = { exports: {} }, p = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mc = Symbol.for("react.transitional.element"), Kd = Symbol.for("react.portal"), Jd = Symbol.for("react.fragment"), wd = Symbol.for("react.strict_mode"), $d = Symbol.for("react.profiler"), Wd = Symbol.for("react.consumer"), kd = Symbol.for("react.context"), Fd = Symbol.for("react.forward_ref"), Id = Symbol.for("react.suspense"), Pd = Symbol.for("react.memo"), Ls = Symbol.for("react.lazy"), gi = Symbol.iterator;
function ly(l) {
  return l === null || typeof l != "object" ? null : (l = gi && l[gi] || l["@@iterator"], typeof l == "function" ? l : null);
}
var Ks = {
  isMounted: function() {
    return !1;
  },
  enqueueForceUpdate: function() {
  },
  enqueueReplaceState: function() {
  },
  enqueueSetState: function() {
  }
}, Js = Object.assign, ws = {};
function ku(l, t, u) {
  this.props = l, this.context = t, this.refs = ws, this.updater = u || Ks;
}
ku.prototype.isReactComponent = {};
ku.prototype.setState = function(l, t) {
  if (typeof l != "object" && typeof l != "function" && l != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, l, t, "setState");
};
ku.prototype.forceUpdate = function(l) {
  this.updater.enqueueForceUpdate(this, l, "forceUpdate");
};
function $s() {
}
$s.prototype = ku.prototype;
function gc(l, t, u) {
  this.props = l, this.context = t, this.refs = ws, this.updater = u || Ks;
}
var Sc = gc.prototype = new $s();
Sc.constructor = gc;
Js(Sc, ku.prototype);
Sc.isPureReactComponent = !0;
var Si = Array.isArray, w = { H: null, A: null, T: null, S: null, V: null }, Ws = Object.prototype.hasOwnProperty;
function bc(l, t, u, a, e, n) {
  return u = n.ref, {
    $$typeof: mc,
    type: l,
    key: t,
    ref: u !== void 0 ? u : null,
    props: n
  };
}
function ty(l, t) {
  return bc(
    l.type,
    t,
    void 0,
    void 0,
    void 0,
    l.props
  );
}
function Ec(l) {
  return typeof l == "object" && l !== null && l.$$typeof === mc;
}
function uy(l) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + l.replace(/[=:]/g, function(u) {
    return t[u];
  });
}
var bi = /\/+/g;
function Gn(l, t) {
  return typeof l == "object" && l !== null && l.key != null ? uy("" + l.key) : t.toString(36);
}
function Ei() {
}
function ay(l) {
  switch (l.status) {
    case "fulfilled":
      return l.value;
    case "rejected":
      throw l.reason;
    default:
      switch (typeof l.status == "string" ? l.then(Ei, Ei) : (l.status = "pending", l.then(
        function(t) {
          l.status === "pending" && (l.status = "fulfilled", l.value = t);
        },
        function(t) {
          l.status === "pending" && (l.status = "rejected", l.reason = t);
        }
      )), l.status) {
        case "fulfilled":
          return l.value;
        case "rejected":
          throw l.reason;
      }
  }
  throw l;
}
function ru(l, t, u, a, e) {
  var n = typeof l;
  (n === "undefined" || n === "boolean") && (l = null);
  var f = !1;
  if (l === null) f = !0;
  else
    switch (n) {
      case "bigint":
      case "string":
      case "number":
        f = !0;
        break;
      case "object":
        switch (l.$$typeof) {
          case mc:
          case Kd:
            f = !0;
            break;
          case Ls:
            return f = l._init, ru(
              f(l._payload),
              t,
              u,
              a,
              e
            );
        }
    }
  if (f)
    return e = e(l), f = a === "" ? "." + Gn(l, 0) : a, Si(e) ? (u = "", f != null && (u = f.replace(bi, "$&/") + "/"), ru(e, t, u, "", function(y) {
      return y;
    })) : e != null && (Ec(e) && (e = ty(
      e,
      u + (e.key == null || l && l.key === e.key ? "" : ("" + e.key).replace(
        bi,
        "$&/"
      ) + "/") + f
    )), t.push(e)), 1;
  f = 0;
  var c = a === "" ? "." : a + ":";
  if (Si(l))
    for (var i = 0; i < l.length; i++)
      a = l[i], n = c + Gn(a, i), f += ru(
        a,
        t,
        u,
        n,
        e
      );
  else if (i = ly(l), typeof i == "function")
    for (l = i.call(l), i = 0; !(a = l.next()).done; )
      a = a.value, n = c + Gn(a, i++), f += ru(
        a,
        t,
        u,
        n,
        e
      );
  else if (n === "object") {
    if (typeof l.then == "function")
      return ru(
        ay(l),
        t,
        u,
        a,
        e
      );
    throw t = String(l), Error(
      "Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead."
    );
  }
  return f;
}
function se(l, t, u) {
  if (l == null) return l;
  var a = [], e = 0;
  return ru(l, a, "", "", function(n) {
    return t.call(u, n, e++);
  }), a;
}
function ey(l) {
  if (l._status === -1) {
    var t = l._result;
    t = t(), t.then(
      function(u) {
        (l._status === 0 || l._status === -1) && (l._status = 1, l._result = u);
      },
      function(u) {
        (l._status === 0 || l._status === -1) && (l._status = 2, l._result = u);
      }
    ), l._status === -1 && (l._status = 0, l._result = t);
  }
  if (l._status === 1) return l._result.default;
  throw l._result;
}
var Ti = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function ny() {
}
p.Children = {
  map: se,
  forEach: function(l, t, u) {
    se(
      l,
      function() {
        t.apply(this, arguments);
      },
      u
    );
  },
  count: function(l) {
    var t = 0;
    return se(l, function() {
      t++;
    }), t;
  },
  toArray: function(l) {
    return se(l, function(t) {
      return t;
    }) || [];
  },
  only: function(l) {
    if (!Ec(l))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return l;
  }
};
p.Component = ku;
p.Fragment = Jd;
p.Profiler = $d;
p.PureComponent = gc;
p.StrictMode = wd;
p.Suspense = Id;
p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w;
p.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(l) {
    return w.H.useMemoCache(l);
  }
};
p.cache = function(l) {
  return function() {
    return l.apply(null, arguments);
  };
};
p.cloneElement = function(l, t, u) {
  if (l == null)
    throw Error(
      "The argument must be a React element, but you passed " + l + "."
    );
  var a = Js({}, l.props), e = l.key, n = void 0;
  if (t != null)
    for (f in t.ref !== void 0 && (n = void 0), t.key !== void 0 && (e = "" + t.key), t)
      !Ws.call(t, f) || f === "key" || f === "__self" || f === "__source" || f === "ref" && t.ref === void 0 || (a[f] = t[f]);
  var f = arguments.length - 2;
  if (f === 1) a.children = u;
  else if (1 < f) {
    for (var c = Array(f), i = 0; i < f; i++)
      c[i] = arguments[i + 2];
    a.children = c;
  }
  return bc(l.type, e, void 0, void 0, n, a);
};
p.createContext = function(l) {
  return l = {
    $$typeof: kd,
    _currentValue: l,
    _currentValue2: l,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }, l.Provider = l, l.Consumer = {
    $$typeof: Wd,
    _context: l
  }, l;
};
p.createElement = function(l, t, u) {
  var a, e = {}, n = null;
  if (t != null)
    for (a in t.key !== void 0 && (n = "" + t.key), t)
      Ws.call(t, a) && a !== "key" && a !== "__self" && a !== "__source" && (e[a] = t[a]);
  var f = arguments.length - 2;
  if (f === 1) e.children = u;
  else if (1 < f) {
    for (var c = Array(f), i = 0; i < f; i++)
      c[i] = arguments[i + 2];
    e.children = c;
  }
  if (l && l.defaultProps)
    for (a in f = l.defaultProps, f)
      e[a] === void 0 && (e[a] = f[a]);
  return bc(l, n, void 0, void 0, null, e);
};
p.createRef = function() {
  return { current: null };
};
p.forwardRef = function(l) {
  return { $$typeof: Fd, render: l };
};
p.isValidElement = Ec;
p.lazy = function(l) {
  return {
    $$typeof: Ls,
    _payload: { _status: -1, _result: l },
    _init: ey
  };
};
p.memo = function(l, t) {
  return {
    $$typeof: Pd,
    type: l,
    compare: t === void 0 ? null : t
  };
};
p.startTransition = function(l) {
  var t = w.T, u = {};
  w.T = u;
  try {
    var a = l(), e = w.S;
    e !== null && e(u, a), typeof a == "object" && a !== null && typeof a.then == "function" && a.then(ny, Ti);
  } catch (n) {
    Ti(n);
  } finally {
    w.T = t;
  }
};
p.unstable_useCacheRefresh = function() {
  return w.H.useCacheRefresh();
};
p.use = function(l) {
  return w.H.use(l);
};
p.useActionState = function(l, t, u) {
  return w.H.useActionState(l, t, u);
};
p.useCallback = function(l, t) {
  return w.H.useCallback(l, t);
};
p.useContext = function(l) {
  return w.H.useContext(l);
};
p.useDebugValue = function() {
};
p.useDeferredValue = function(l, t) {
  return w.H.useDeferredValue(l, t);
};
p.useEffect = function(l, t, u) {
  var a = w.H;
  if (typeof u == "function")
    throw Error(
      "useEffect CRUD overload is not enabled in this build of React."
    );
  return a.useEffect(l, t);
};
p.useId = function() {
  return w.H.useId();
};
p.useImperativeHandle = function(l, t, u) {
  return w.H.useImperativeHandle(l, t, u);
};
p.useInsertionEffect = function(l, t) {
  return w.H.useInsertionEffect(l, t);
};
p.useLayoutEffect = function(l, t) {
  return w.H.useLayoutEffect(l, t);
};
p.useMemo = function(l, t) {
  return w.H.useMemo(l, t);
};
p.useOptimistic = function(l, t) {
  return w.H.useOptimistic(l, t);
};
p.useReducer = function(l, t, u) {
  return w.H.useReducer(l, t, u);
};
p.useRef = function(l) {
  return w.H.useRef(l);
};
p.useState = function(l) {
  return w.H.useState(l);
};
p.useSyncExternalStore = function(l, t, u) {
  return w.H.useSyncExternalStore(
    l,
    t,
    u
  );
};
p.useTransition = function() {
  return w.H.useTransition();
};
p.version = "19.1.0";
Vs.exports = p;
var pl = Vs.exports;
const Tc = /* @__PURE__ */ Zs(pl);
var ks = { exports: {} }, gn = {}, Fs = { exports: {} }, Is = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(l) {
  function t(A, R) {
    var N = A.length;
    A.push(R);
    l: for (; 0 < N; ) {
      var P = N - 1 >>> 1, cl = A[P];
      if (0 < e(cl, R))
        A[P] = R, A[N] = cl, N = P;
      else break l;
    }
  }
  function u(A) {
    return A.length === 0 ? null : A[0];
  }
  function a(A) {
    if (A.length === 0) return null;
    var R = A[0], N = A.pop();
    if (N !== R) {
      A[0] = N;
      l: for (var P = 0, cl = A.length, fe = cl >>> 1; P < fe; ) {
        var ce = 2 * (P + 1) - 1, jn = A[ce], Jt = ce + 1, ie = A[Jt];
        if (0 > e(jn, N))
          Jt < cl && 0 > e(ie, jn) ? (A[P] = ie, A[Jt] = N, P = Jt) : (A[P] = jn, A[ce] = N, P = ce);
        else if (Jt < cl && 0 > e(ie, N))
          A[P] = ie, A[Jt] = N, P = Jt;
        else break l;
      }
    }
    return R;
  }
  function e(A, R) {
    var N = A.sortIndex - R.sortIndex;
    return N !== 0 ? N : A.id - R.id;
  }
  if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var n = performance;
    l.unstable_now = function() {
      return n.now();
    };
  } else {
    var f = Date, c = f.now();
    l.unstable_now = function() {
      return f.now() - c;
    };
  }
  var i = [], y = [], r = 1, m = null, d = 3, v = !1, b = !1, T = !1, D = !1, o = typeof setTimeout == "function" ? setTimeout : null, s = typeof clearTimeout == "function" ? clearTimeout : null, h = typeof setImmediate < "u" ? setImmediate : null;
  function g(A) {
    for (var R = u(y); R !== null; ) {
      if (R.callback === null) a(y);
      else if (R.startTime <= A)
        a(y), R.sortIndex = R.expirationTime, t(i, R);
      else break;
      R = u(y);
    }
  }
  function E(A) {
    if (T = !1, g(A), !b)
      if (u(i) !== null)
        b = !0, M || (M = !0, bt());
      else {
        var R = u(y);
        R !== null && Bn(E, R.startTime - A);
      }
  }
  var M = !1, z = -1, O = 5, I = -1;
  function Y() {
    return D ? !0 : !(l.unstable_now() - I < O);
  }
  function ql() {
    if (D = !1, M) {
      var A = l.unstable_now();
      I = A;
      var R = !0;
      try {
        l: {
          b = !1, T && (T = !1, s(z), z = -1), v = !0;
          var N = d;
          try {
            t: {
              for (g(A), m = u(i); m !== null && !(m.expirationTime > A && Y()); ) {
                var P = m.callback;
                if (typeof P == "function") {
                  m.callback = null, d = m.priorityLevel;
                  var cl = P(
                    m.expirationTime <= A
                  );
                  if (A = l.unstable_now(), typeof cl == "function") {
                    m.callback = cl, g(A), R = !0;
                    break t;
                  }
                  m === u(i) && a(i), g(A);
                } else a(i);
                m = u(i);
              }
              if (m !== null) R = !0;
              else {
                var fe = u(y);
                fe !== null && Bn(
                  E,
                  fe.startTime - A
                ), R = !1;
              }
            }
            break l;
          } finally {
            m = null, d = N, v = !1;
          }
          R = void 0;
        }
      } finally {
        R ? bt() : M = !1;
      }
    }
  }
  var bt;
  if (typeof h == "function")
    bt = function() {
      h(ql);
    };
  else if (typeof MessageChannel < "u") {
    var mi = new MessageChannel(), Ld = mi.port2;
    mi.port1.onmessage = ql, bt = function() {
      Ld.postMessage(null);
    };
  } else
    bt = function() {
      o(ql, 0);
    };
  function Bn(A, R) {
    z = o(function() {
      A(l.unstable_now());
    }, R);
  }
  l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(A) {
    A.callback = null;
  }, l.unstable_forceFrameRate = function(A) {
    0 > A || 125 < A ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : O = 0 < A ? Math.floor(1e3 / A) : 5;
  }, l.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, l.unstable_next = function(A) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var R = 3;
        break;
      default:
        R = d;
    }
    var N = d;
    d = R;
    try {
      return A();
    } finally {
      d = N;
    }
  }, l.unstable_requestPaint = function() {
    D = !0;
  }, l.unstable_runWithPriority = function(A, R) {
    switch (A) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        A = 3;
    }
    var N = d;
    d = A;
    try {
      return R();
    } finally {
      d = N;
    }
  }, l.unstable_scheduleCallback = function(A, R, N) {
    var P = l.unstable_now();
    switch (typeof N == "object" && N !== null ? (N = N.delay, N = typeof N == "number" && 0 < N ? P + N : P) : N = P, A) {
      case 1:
        var cl = -1;
        break;
      case 2:
        cl = 250;
        break;
      case 5:
        cl = 1073741823;
        break;
      case 4:
        cl = 1e4;
        break;
      default:
        cl = 5e3;
    }
    return cl = N + cl, A = {
      id: r++,
      callback: R,
      priorityLevel: A,
      startTime: N,
      expirationTime: cl,
      sortIndex: -1
    }, N > P ? (A.sortIndex = N, t(y, A), u(i) === null && A === u(y) && (T ? (s(z), z = -1) : T = !0, Bn(E, N - P))) : (A.sortIndex = cl, t(i, A), b || v || (b = !0, M || (M = !0, bt()))), A;
  }, l.unstable_shouldYield = Y, l.unstable_wrapCallback = function(A) {
    var R = d;
    return function() {
      var N = d;
      d = R;
      try {
        return A.apply(this, arguments);
      } finally {
        d = N;
      }
    };
  };
})(Is);
Fs.exports = Is;
var fy = Fs.exports, Ps = { exports: {} }, bl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cy = pl;
function l0(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var u = 2; u < arguments.length; u++)
      t += "&args[]=" + encodeURIComponent(arguments[u]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function Et() {
}
var Sl = {
  d: {
    f: Et,
    r: function() {
      throw Error(l0(522));
    },
    D: Et,
    C: Et,
    L: Et,
    m: Et,
    X: Et,
    S: Et,
    M: Et
  },
  p: 0,
  findDOMNode: null
}, iy = Symbol.for("react.portal");
function sy(l, t, u) {
  var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: iy,
    key: a == null ? null : "" + a,
    children: l,
    containerInfo: t,
    implementation: u
  };
}
var ra = cy.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function Sn(l, t) {
  if (l === "font") return "";
  if (typeof t == "string")
    return t === "use-credentials" ? t : "";
}
bl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Sl;
bl.createPortal = function(l, t) {
  var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
    throw Error(l0(299));
  return sy(l, t, null, u);
};
bl.flushSync = function(l) {
  var t = ra.T, u = Sl.p;
  try {
    if (ra.T = null, Sl.p = 2, l) return l();
  } finally {
    ra.T = t, Sl.p = u, Sl.d.f();
  }
};
bl.preconnect = function(l, t) {
  typeof l == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, Sl.d.C(l, t));
};
bl.prefetchDNS = function(l) {
  typeof l == "string" && Sl.d.D(l);
};
bl.preinit = function(l, t) {
  if (typeof l == "string" && t && typeof t.as == "string") {
    var u = t.as, a = Sn(u, t.crossOrigin), e = typeof t.integrity == "string" ? t.integrity : void 0, n = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
    u === "style" ? Sl.d.S(
      l,
      typeof t.precedence == "string" ? t.precedence : void 0,
      {
        crossOrigin: a,
        integrity: e,
        fetchPriority: n
      }
    ) : u === "script" && Sl.d.X(l, {
      crossOrigin: a,
      integrity: e,
      fetchPriority: n,
      nonce: typeof t.nonce == "string" ? t.nonce : void 0
    });
  }
};
bl.preinitModule = function(l, t) {
  if (typeof l == "string")
    if (typeof t == "object" && t !== null) {
      if (t.as == null || t.as === "script") {
        var u = Sn(
          t.as,
          t.crossOrigin
        );
        Sl.d.M(l, {
          crossOrigin: u,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0
        });
      }
    } else t == null && Sl.d.M(l);
};
bl.preload = function(l, t) {
  if (typeof l == "string" && typeof t == "object" && t !== null && typeof t.as == "string") {
    var u = t.as, a = Sn(u, t.crossOrigin);
    Sl.d.L(l, u, {
      crossOrigin: a,
      integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      nonce: typeof t.nonce == "string" ? t.nonce : void 0,
      type: typeof t.type == "string" ? t.type : void 0,
      fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
      referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
      imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
      imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
      media: typeof t.media == "string" ? t.media : void 0
    });
  }
};
bl.preloadModule = function(l, t) {
  if (typeof l == "string")
    if (t) {
      var u = Sn(t.as, t.crossOrigin);
      Sl.d.m(l, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: u,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0
      });
    } else Sl.d.m(l);
};
bl.requestFormReset = function(l) {
  Sl.d.r(l);
};
bl.unstable_batchedUpdates = function(l, t) {
  return l(t);
};
bl.useFormState = function(l, t, u) {
  return ra.H.useFormState(l, t, u);
};
bl.useFormStatus = function() {
  return ra.H.useHostTransitionStatus();
};
bl.version = "19.1.0";
function t0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t0);
    } catch (l) {
      console.error(l);
    }
}
t0(), Ps.exports = bl;
var oy = Ps.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fl = fy, u0 = pl, dy = oy;
function S(l) {
  var t = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var u = 2; u < arguments.length; u++)
      t += "&args[]=" + encodeURIComponent(arguments[u]);
  }
  return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function a0(l) {
  return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
}
function La(l) {
  var t = l, u = l;
  if (l.alternate) for (; t.return; ) t = t.return;
  else {
    l = t;
    do
      t = l, t.flags & 4098 && (u = t.return), l = t.return;
    while (l);
  }
  return t.tag === 3 ? u : null;
}
function e0(l) {
  if (l.tag === 13) {
    var t = l.memoizedState;
    if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Ai(l) {
  if (La(l) !== l)
    throw Error(S(188));
}
function yy(l) {
  var t = l.alternate;
  if (!t) {
    if (t = La(l), t === null) throw Error(S(188));
    return t !== l ? null : l;
  }
  for (var u = l, a = t; ; ) {
    var e = u.return;
    if (e === null) break;
    var n = e.alternate;
    if (n === null) {
      if (a = e.return, a !== null) {
        u = a;
        continue;
      }
      break;
    }
    if (e.child === n.child) {
      for (n = e.child; n; ) {
        if (n === u) return Ai(e), l;
        if (n === a) return Ai(e), t;
        n = n.sibling;
      }
      throw Error(S(188));
    }
    if (u.return !== a.return) u = e, a = n;
    else {
      for (var f = !1, c = e.child; c; ) {
        if (c === u) {
          f = !0, u = e, a = n;
          break;
        }
        if (c === a) {
          f = !0, a = e, u = n;
          break;
        }
        c = c.sibling;
      }
      if (!f) {
        for (c = n.child; c; ) {
          if (c === u) {
            f = !0, u = n, a = e;
            break;
          }
          if (c === a) {
            f = !0, a = n, u = e;
            break;
          }
          c = c.sibling;
        }
        if (!f) throw Error(S(189));
      }
    }
    if (u.alternate !== a) throw Error(S(190));
  }
  if (u.tag !== 3) throw Error(S(188));
  return u.stateNode.current === u ? l : t;
}
function n0(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l;
  for (l = l.child; l !== null; ) {
    if (t = n0(l), t !== null) return t;
    l = l.sibling;
  }
  return null;
}
var K = Object.assign, vy = Symbol.for("react.element"), oe = Symbol.for("react.transitional.element"), da = Symbol.for("react.portal"), bu = Symbol.for("react.fragment"), f0 = Symbol.for("react.strict_mode"), Tf = Symbol.for("react.profiler"), hy = Symbol.for("react.provider"), c0 = Symbol.for("react.consumer"), ct = Symbol.for("react.context"), Ac = Symbol.for("react.forward_ref"), Af = Symbol.for("react.suspense"), zf = Symbol.for("react.suspense_list"), zc = Symbol.for("react.memo"), zt = Symbol.for("react.lazy"), Of = Symbol.for("react.activity"), ry = Symbol.for("react.memo_cache_sentinel"), zi = Symbol.iterator;
function aa(l) {
  return l === null || typeof l != "object" ? null : (l = zi && l[zi] || l["@@iterator"], typeof l == "function" ? l : null);
}
var my = Symbol.for("react.client.reference");
function _f(l) {
  if (l == null) return null;
  if (typeof l == "function")
    return l.$$typeof === my ? null : l.displayName || l.name || null;
  if (typeof l == "string") return l;
  switch (l) {
    case bu:
      return "Fragment";
    case Tf:
      return "Profiler";
    case f0:
      return "StrictMode";
    case Af:
      return "Suspense";
    case zf:
      return "SuspenseList";
    case Of:
      return "Activity";
  }
  if (typeof l == "object")
    switch (l.$$typeof) {
      case da:
        return "Portal";
      case ct:
        return (l.displayName || "Context") + ".Provider";
      case c0:
        return (l._context.displayName || "Context") + ".Consumer";
      case Ac:
        var t = l.render;
        return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case zc:
        return t = l.displayName || null, t !== null ? t : _f(l.type) || "Memo";
      case zt:
        t = l._payload, l = l._init;
        try {
          return _f(l(t));
        } catch {
        }
    }
  return null;
}
var ya = Array.isArray, _ = u0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = dy.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, It = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, Mf = [], Eu = -1;
function lt(l) {
  return { current: l };
}
function dl(l) {
  0 > Eu || (l.current = Mf[Eu], Mf[Eu] = null, Eu--);
}
function $(l, t) {
  Eu++, Mf[Eu] = l.current, l.current = t;
}
var Fl = lt(null), Na = lt(null), xt = lt(null), Qe = lt(null);
function Ce(l, t) {
  switch ($(xt, t), $(Na, l), $(Fl, null), t.nodeType) {
    case 9:
    case 11:
      l = (l = t.documentElement) && (l = l.namespaceURI) ? ps(l) : 0;
      break;
    default:
      if (l = t.tagName, t = t.namespaceURI)
        t = ps(t), l = _d(t, l);
      else
        switch (l) {
          case "svg":
            l = 1;
            break;
          case "math":
            l = 2;
            break;
          default:
            l = 0;
        }
  }
  dl(Fl), $(Fl, l);
}
function Xu() {
  dl(Fl), dl(Na), dl(xt);
}
function Df(l) {
  l.memoizedState !== null && $(Qe, l);
  var t = Fl.current, u = _d(t, l.type);
  t !== u && ($(Na, l), $(Fl, u));
}
function Ze(l) {
  Na.current === l && (dl(Fl), dl(Na)), Qe.current === l && (dl(Qe), Qa._currentValue = It);
}
var pf = Object.prototype.hasOwnProperty, Oc = fl.unstable_scheduleCallback, Xn = fl.unstable_cancelCallback, gy = fl.unstable_shouldYield, Sy = fl.unstable_requestPaint, Il = fl.unstable_now, by = fl.unstable_getCurrentPriorityLevel, i0 = fl.unstable_ImmediatePriority, s0 = fl.unstable_UserBlockingPriority, Ve = fl.unstable_NormalPriority, Ey = fl.unstable_LowPriority, o0 = fl.unstable_IdlePriority, Ty = fl.log, Ay = fl.unstable_setDisableYieldValue, Ka = null, Nl = null;
function Ut(l) {
  if (typeof Ty == "function" && Ay(l), Nl && typeof Nl.setStrictMode == "function")
    try {
      Nl.setStrictMode(Ka, l);
    } catch {
    }
}
var Rl = Math.clz32 ? Math.clz32 : _y, zy = Math.log, Oy = Math.LN2;
function _y(l) {
  return l >>>= 0, l === 0 ? 32 : 31 - (zy(l) / Oy | 0) | 0;
}
var de = 256, ye = 4194304;
function Wt(l) {
  var t = l & 42;
  if (t !== 0) return t;
  switch (l & -l) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return l & 4194048;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return l & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return l;
  }
}
function bn(l, t, u) {
  var a = l.pendingLanes;
  if (a === 0) return 0;
  var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
  l = l.warmLanes;
  var c = a & 134217727;
  return c !== 0 ? (a = c & ~n, a !== 0 ? e = Wt(a) : (f &= c, f !== 0 ? e = Wt(f) : u || (u = c & ~l, u !== 0 && (e = Wt(u))))) : (c = a & ~n, c !== 0 ? e = Wt(c) : f !== 0 ? e = Wt(f) : u || (u = a & ~l, u !== 0 && (e = Wt(u)))), e === 0 ? 0 : t !== 0 && t !== e && !(t & n) && (n = e & -e, u = t & -t, n >= u || n === 32 && (u & 4194048) !== 0) ? t : e;
}
function Ja(l, t) {
  return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
}
function My(l, t) {
  switch (l) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return t + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function d0() {
  var l = de;
  return de <<= 1, !(de & 4194048) && (de = 256), l;
}
function y0() {
  var l = ye;
  return ye <<= 1, !(ye & 62914560) && (ye = 4194304), l;
}
function Qn(l) {
  for (var t = [], u = 0; 31 > u; u++) t.push(l);
  return t;
}
function wa(l, t) {
  l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
}
function Dy(l, t, u, a, e, n) {
  var f = l.pendingLanes;
  l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
  var c = l.entanglements, i = l.expirationTimes, y = l.hiddenUpdates;
  for (u = f & ~u; 0 < u; ) {
    var r = 31 - Rl(u), m = 1 << r;
    c[r] = 0, i[r] = -1;
    var d = y[r];
    if (d !== null)
      for (y[r] = null, r = 0; r < d.length; r++) {
        var v = d[r];
        v !== null && (v.lane &= -536870913);
      }
    u &= ~m;
  }
  a !== 0 && v0(l, a, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t));
}
function v0(l, t, u) {
  l.pendingLanes |= t, l.suspendedLanes &= ~t;
  var a = 31 - Rl(t);
  l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | u & 4194090;
}
function h0(l, t) {
  var u = l.entangledLanes |= t;
  for (l = l.entanglements; u; ) {
    var a = 31 - Rl(u), e = 1 << a;
    e & t | l[a] & t && (l[a] |= t), u &= ~e;
  }
}
function _c(l) {
  switch (l) {
    case 2:
      l = 1;
      break;
    case 8:
      l = 4;
      break;
    case 32:
      l = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      l = 128;
      break;
    case 268435456:
      l = 134217728;
      break;
    default:
      l = 0;
  }
  return l;
}
function Mc(l) {
  return l &= -l, 2 < l ? 8 < l ? l & 134217727 ? 32 : 268435456 : 8 : 2;
}
function r0() {
  var l = G.p;
  return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : qd(l.type));
}
function py(l, t) {
  var u = G.p;
  try {
    return G.p = l, t();
  } finally {
    G.p = u;
  }
}
var Lt = Math.random().toString(36).slice(2), rl = "__reactFiber$" + Lt, zl = "__reactProps$" + Lt, Fu = "__reactContainer$" + Lt, Uf = "__reactEvents$" + Lt, Uy = "__reactListeners$" + Lt, Ny = "__reactHandles$" + Lt, Oi = "__reactResources$" + Lt, $a = "__reactMarker$" + Lt;
function Dc(l) {
  delete l[rl], delete l[zl], delete l[Uf], delete l[Uy], delete l[Ny];
}
function Tu(l) {
  var t = l[rl];
  if (t) return t;
  for (var u = l.parentNode; u; ) {
    if (t = u[Fu] || u[rl]) {
      if (u = t.alternate, t.child !== null || u !== null && u.child !== null)
        for (l = Rs(l); l !== null; ) {
          if (u = l[rl]) return u;
          l = Rs(l);
        }
      return t;
    }
    l = u, u = l.parentNode;
  }
  return null;
}
function Iu(l) {
  if (l = l[rl] || l[Fu]) {
    var t = l.tag;
    if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
      return l;
  }
  return null;
}
function va(l) {
  var t = l.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
  throw Error(S(33));
}
function Ru(l) {
  var t = l[Oi];
  return t || (t = l[Oi] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
}
function sl(l) {
  l[$a] = !0;
}
var m0 = /* @__PURE__ */ new Set(), g0 = {};
function su(l, t) {
  Qu(l, t), Qu(l + "Capture", t);
}
function Qu(l, t) {
  for (g0[l] = t, l = 0; l < t.length; l++)
    m0.add(t[l]);
}
var Ry = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), _i = {}, Mi = {};
function Hy(l) {
  return pf.call(Mi, l) ? !0 : pf.call(_i, l) ? !1 : Ry.test(l) ? Mi[l] = !0 : (_i[l] = !0, !1);
}
function De(l, t, u) {
  if (Hy(t))
    if (u === null) l.removeAttribute(t);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(t);
          return;
        case "boolean":
          var a = t.toLowerCase().slice(0, 5);
          if (a !== "data-" && a !== "aria-") {
            l.removeAttribute(t);
            return;
          }
      }
      l.setAttribute(t, "" + u);
    }
}
function ve(l, t, u) {
  if (u === null) l.removeAttribute(t);
  else {
    switch (typeof u) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(t);
        return;
    }
    l.setAttribute(t, "" + u);
  }
}
function ut(l, t, u, a) {
  if (a === null) l.removeAttribute(u);
  else {
    switch (typeof a) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(u);
        return;
    }
    l.setAttributeNS(t, u, "" + a);
  }
}
var Cn, Di;
function mu(l) {
  if (Cn === void 0)
    try {
      throw Error();
    } catch (u) {
      var t = u.stack.trim().match(/\n( *(at )?)/);
      Cn = t && t[1] || "", Di = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + Cn + l + Di;
}
var Zn = !1;
function Vn(l, t) {
  if (!l || Zn) return "";
  Zn = !0;
  var u = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = {
      DetermineComponentFrameRoot: function() {
        try {
          if (t) {
            var m = function() {
              throw Error();
            };
            if (Object.defineProperty(m.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(m, []);
              } catch (v) {
                var d = v;
              }
              Reflect.construct(l, [], m);
            } else {
              try {
                m.call();
              } catch (v) {
                d = v;
              }
              l.call(m.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (v) {
              d = v;
            }
            (m = l()) && typeof m.catch == "function" && m.catch(function() {
            });
          }
        } catch (v) {
          if (v && d && typeof v.stack == "string")
            return [v.stack, d.stack];
        }
        return [null, null];
      }
    };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var e = Object.getOwnPropertyDescriptor(
      a.DetermineComponentFrameRoot,
      "name"
    );
    e && e.configurable && Object.defineProperty(
      a.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var n = a.DetermineComponentFrameRoot(), f = n[0], c = n[1];
    if (f && c) {
      var i = f.split(`
`), y = c.split(`
`);
      for (e = a = 0; a < i.length && !i[a].includes("DetermineComponentFrameRoot"); )
        a++;
      for (; e < y.length && !y[e].includes(
        "DetermineComponentFrameRoot"
      ); )
        e++;
      if (a === i.length || e === y.length)
        for (a = i.length - 1, e = y.length - 1; 1 <= a && 0 <= e && i[a] !== y[e]; )
          e--;
      for (; 1 <= a && 0 <= e; a--, e--)
        if (i[a] !== y[e]) {
          if (a !== 1 || e !== 1)
            do
              if (a--, e--, 0 > e || i[a] !== y[e]) {
                var r = `
` + i[a].replace(" at new ", " at ");
                return l.displayName && r.includes("<anonymous>") && (r = r.replace("<anonymous>", l.displayName)), r;
              }
            while (1 <= a && 0 <= e);
          break;
        }
    }
  } finally {
    Zn = !1, Error.prepareStackTrace = u;
  }
  return (u = l ? l.displayName || l.name : "") ? mu(u) : "";
}
function xy(l) {
  switch (l.tag) {
    case 26:
    case 27:
    case 5:
      return mu(l.type);
    case 16:
      return mu("Lazy");
    case 13:
      return mu("Suspense");
    case 19:
      return mu("SuspenseList");
    case 0:
    case 15:
      return Vn(l.type, !1);
    case 11:
      return Vn(l.type.render, !1);
    case 1:
      return Vn(l.type, !0);
    case 31:
      return mu("Activity");
    default:
      return "";
  }
}
function pi(l) {
  try {
    var t = "";
    do
      t += xy(l), l = l.return;
    while (l);
    return t;
  } catch (u) {
    return `
Error generating stack: ` + u.message + `
` + u.stack;
  }
}
function jl(l) {
  switch (typeof l) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return l;
    case "object":
      return l;
    default:
      return "";
  }
}
function S0(l) {
  var t = l.type;
  return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Yy(l) {
  var t = S0(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
    l.constructor.prototype,
    t
  ), a = "" + l[t];
  if (!l.hasOwnProperty(t) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
    var e = u.get, n = u.set;
    return Object.defineProperty(l, t, {
      configurable: !0,
      get: function() {
        return e.call(this);
      },
      set: function(f) {
        a = "" + f, n.call(this, f);
      }
    }), Object.defineProperty(l, t, {
      enumerable: u.enumerable
    }), {
      getValue: function() {
        return a;
      },
      setValue: function(f) {
        a = "" + f;
      },
      stopTracking: function() {
        l._valueTracker = null, delete l[t];
      }
    };
  }
}
function Le(l) {
  l._valueTracker || (l._valueTracker = Yy(l));
}
function b0(l) {
  if (!l) return !1;
  var t = l._valueTracker;
  if (!t) return !0;
  var u = t.getValue(), a = "";
  return l && (a = S0(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== u ? (t.setValue(l), !0) : !1;
}
function Ke(l) {
  if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
  try {
    return l.activeElement || l.body;
  } catch {
    return l.body;
  }
}
var qy = /[\n"\\]/g;
function Ql(l) {
  return l.replace(
    qy,
    function(t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    }
  );
}
function Nf(l, t, u, a, e, n, f, c) {
  l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + jl(t)) : l.value !== "" + jl(t) && (l.value = "" + jl(t)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), t != null ? Rf(l, f, jl(t)) : u != null ? Rf(l, f, jl(u)) : a != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + jl(c) : l.removeAttribute("name");
}
function E0(l, t, u, a, e, n, f, c) {
  if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || u != null) {
    if (!(n !== "submit" && n !== "reset" || t != null))
      return;
    u = u != null ? "" + jl(u) : "", t = t != null ? "" + jl(t) : u, c || t === l.value || (l.value = t), l.defaultValue = t;
  }
  a = a ?? e, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f);
}
function Rf(l, t, u) {
  t === "number" && Ke(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
}
function Hu(l, t, u, a) {
  if (l = l.options, t) {
    t = {};
    for (var e = 0; e < u.length; e++)
      t["$" + u[e]] = !0;
    for (u = 0; u < l.length; u++)
      e = t.hasOwnProperty("$" + l[u].value), l[u].selected !== e && (l[u].selected = e), e && a && (l[u].defaultSelected = !0);
  } else {
    for (u = "" + jl(u), t = null, e = 0; e < l.length; e++) {
      if (l[e].value === u) {
        l[e].selected = !0, a && (l[e].defaultSelected = !0);
        return;
      }
      t !== null || l[e].disabled || (t = l[e]);
    }
    t !== null && (t.selected = !0);
  }
}
function T0(l, t, u) {
  if (t != null && (t = "" + jl(t), t !== l.value && (l.value = t), u == null)) {
    l.defaultValue !== t && (l.defaultValue = t);
    return;
  }
  l.defaultValue = u != null ? "" + jl(u) : "";
}
function A0(l, t, u, a) {
  if (t == null) {
    if (a != null) {
      if (u != null) throw Error(S(92));
      if (ya(a)) {
        if (1 < a.length) throw Error(S(93));
        a = a[0];
      }
      u = a;
    }
    u == null && (u = ""), t = u;
  }
  u = jl(t), l.defaultValue = u, a = l.textContent, a === u && a !== "" && a !== null && (l.value = a);
}
function Cu(l, t) {
  if (t) {
    var u = l.firstChild;
    if (u && u === l.lastChild && u.nodeType === 3) {
      u.nodeValue = t;
      return;
    }
  }
  l.textContent = t;
}
var By = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function Ui(l, t, u) {
  var a = t.indexOf("--") === 0;
  u == null || typeof u == "boolean" || u === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, u) : typeof u != "number" || u === 0 || By.has(t) ? t === "float" ? l.cssFloat = u : l[t] = ("" + u).trim() : l[t] = u + "px";
}
function z0(l, t, u) {
  if (t != null && typeof t != "object")
    throw Error(S(62));
  if (l = l.style, u != null) {
    for (var a in u)
      !u.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
    for (var e in t)
      a = t[e], t.hasOwnProperty(e) && u[e] !== a && Ui(l, e, a);
  } else
    for (var n in t)
      t.hasOwnProperty(n) && Ui(l, n, t[n]);
}
function pc(l) {
  if (l.indexOf("-") === -1) return !1;
  switch (l) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var jy = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), Gy = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function pe(l) {
  return Gy.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
}
var Hf = null;
function Uc(l) {
  return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
}
var Au = null, xu = null;
function Ni(l) {
  var t = Iu(l);
  if (t && (l = t.stateNode)) {
    var u = l[zl] || null;
    l: switch (l = t.stateNode, t.type) {
      case "input":
        if (Nf(
          l,
          u.value,
          u.defaultValue,
          u.defaultValue,
          u.checked,
          u.defaultChecked,
          u.type,
          u.name
        ), t = u.name, u.type === "radio" && t != null) {
          for (u = l; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll(
            'input[name="' + Ql(
              "" + t
            ) + '"][type="radio"]'
          ), t = 0; t < u.length; t++) {
            var a = u[t];
            if (a !== l && a.form === l.form) {
              var e = a[zl] || null;
              if (!e) throw Error(S(90));
              Nf(
                a,
                e.value,
                e.defaultValue,
                e.defaultValue,
                e.checked,
                e.defaultChecked,
                e.type,
                e.name
              );
            }
          }
          for (t = 0; t < u.length; t++)
            a = u[t], a.form === l.form && b0(a);
        }
        break l;
      case "textarea":
        T0(l, u.value, u.defaultValue);
        break l;
      case "select":
        t = u.value, t != null && Hu(l, !!u.multiple, t, !1);
    }
  }
}
var Ln = !1;
function O0(l, t, u) {
  if (Ln) return l(t, u);
  Ln = !0;
  try {
    var a = l(t);
    return a;
  } finally {
    if (Ln = !1, (Au !== null || xu !== null) && (Un(), Au && (t = Au, l = xu, xu = Au = null, Ni(t), l)))
      for (t = 0; t < l.length; t++) Ni(l[t]);
  }
}
function Ra(l, t) {
  var u = l.stateNode;
  if (u === null) return null;
  var a = u[zl] || null;
  if (a === null) return null;
  u = a[t];
  l: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
      break l;
    default:
      l = !1;
  }
  if (l) return null;
  if (u && typeof u != "function")
    throw Error(
      S(231, t, typeof u)
    );
  return u;
}
var ht = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), xf = !1;
if (ht)
  try {
    var ea = {};
    Object.defineProperty(ea, "passive", {
      get: function() {
        xf = !0;
      }
    }), window.addEventListener("test", ea, ea), window.removeEventListener("test", ea, ea);
  } catch {
    xf = !1;
  }
var Nt = null, Nc = null, Ue = null;
function _0() {
  if (Ue) return Ue;
  var l, t = Nc, u = t.length, a, e = "value" in Nt ? Nt.value : Nt.textContent, n = e.length;
  for (l = 0; l < u && t[l] === e[l]; l++) ;
  var f = u - l;
  for (a = 1; a <= f && t[u - a] === e[n - a]; a++) ;
  return Ue = e.slice(l, 1 < a ? 1 - a : void 0);
}
function Ne(l) {
  var t = l.keyCode;
  return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
}
function he() {
  return !0;
}
function Ri() {
  return !1;
}
function Ol(l) {
  function t(u, a, e, n, f) {
    this._reactName = u, this._targetInst = e, this.type = a, this.nativeEvent = n, this.target = f, this.currentTarget = null;
    for (var c in l)
      l.hasOwnProperty(c) && (u = l[c], this[c] = u ? u(n) : n[c]);
    return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? he : Ri, this.isPropagationStopped = Ri, this;
  }
  return K(t.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = he);
    },
    stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = he);
    },
    persist: function() {
    },
    isPersistent: he
  }), t;
}
var ou = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(l) {
    return l.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, En = Ol(ou), Wa = K({}, ou, { view: 0, detail: 0 }), Xy = Ol(Wa), Kn, Jn, na, Tn = K({}, Wa, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: Rc,
  button: 0,
  buttons: 0,
  relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  },
  movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== na && (na && l.type === "mousemove" ? (Kn = l.screenX - na.screenX, Jn = l.screenY - na.screenY) : Jn = Kn = 0, na = l), Kn);
  },
  movementY: function(l) {
    return "movementY" in l ? l.movementY : Jn;
  }
}), Hi = Ol(Tn), Qy = K({}, Tn, { dataTransfer: 0 }), Cy = Ol(Qy), Zy = K({}, Wa, { relatedTarget: 0 }), wn = Ol(Zy), Vy = K({}, ou, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), Ly = Ol(Vy), Ky = K({}, ou, {
  clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  }
}), Jy = Ol(Ky), wy = K({}, ou, { data: 0 }), xi = Ol(wy), $y = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Wy = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, ky = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function Fy(l) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(l) : (l = ky[l]) ? !!t[l] : !1;
}
function Rc() {
  return Fy;
}
var Iy = K({}, Wa, {
  key: function(l) {
    if (l.key) {
      var t = $y[l.key] || l.key;
      if (t !== "Unidentified") return t;
    }
    return l.type === "keypress" ? (l = Ne(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Wy[l.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: Rc,
  charCode: function(l) {
    return l.type === "keypress" ? Ne(l) : 0;
  },
  keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  },
  which: function(l) {
    return l.type === "keypress" ? Ne(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }
}), Py = Ol(Iy), lv = K({}, Tn, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
}), Yi = Ol(lv), tv = K({}, Wa, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: Rc
}), uv = Ol(tv), av = K({}, ou, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), ev = Ol(av), nv = K({}, Tn, {
  deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  },
  deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), fv = Ol(nv), cv = K({}, ou, {
  newState: 0,
  oldState: 0
}), iv = Ol(cv), sv = [9, 13, 27, 32], Hc = ht && "CompositionEvent" in window, ma = null;
ht && "documentMode" in document && (ma = document.documentMode);
var ov = ht && "TextEvent" in window && !ma, M0 = ht && (!Hc || ma && 8 < ma && 11 >= ma), qi = " ", Bi = !1;
function D0(l, t) {
  switch (l) {
    case "keyup":
      return sv.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function p0(l) {
  return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
}
var zu = !1;
function dv(l, t) {
  switch (l) {
    case "compositionend":
      return p0(t);
    case "keypress":
      return t.which !== 32 ? null : (Bi = !0, qi);
    case "textInput":
      return l = t.data, l === qi && Bi ? null : l;
    default:
      return null;
  }
}
function yv(l, t) {
  if (zu)
    return l === "compositionend" || !Hc && D0(l, t) ? (l = _0(), Ue = Nc = Nt = null, zu = !1, l) : null;
  switch (l) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length)
          return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return M0 && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var vv = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function ji(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t === "input" ? !!vv[l.type] : t === "textarea";
}
function U0(l, t, u, a) {
  Au ? xu ? xu.push(a) : xu = [a] : Au = a, t = on(t, "onChange"), 0 < t.length && (u = new En(
    "onChange",
    "change",
    null,
    u,
    a
  ), l.push({ event: u, listeners: t }));
}
var ga = null, Ha = null;
function hv(l) {
  Ad(l, 0);
}
function An(l) {
  var t = va(l);
  if (b0(t)) return l;
}
function Gi(l, t) {
  if (l === "change") return t;
}
var N0 = !1;
if (ht) {
  var $n;
  if (ht) {
    var Wn = "oninput" in document;
    if (!Wn) {
      var Xi = document.createElement("div");
      Xi.setAttribute("oninput", "return;"), Wn = typeof Xi.oninput == "function";
    }
    $n = Wn;
  } else $n = !1;
  N0 = $n && (!document.documentMode || 9 < document.documentMode);
}
function Qi() {
  ga && (ga.detachEvent("onpropertychange", R0), Ha = ga = null);
}
function R0(l) {
  if (l.propertyName === "value" && An(Ha)) {
    var t = [];
    U0(
      t,
      Ha,
      l,
      Uc(l)
    ), O0(hv, t);
  }
}
function rv(l, t, u) {
  l === "focusin" ? (Qi(), ga = t, Ha = u, ga.attachEvent("onpropertychange", R0)) : l === "focusout" && Qi();
}
function mv(l) {
  if (l === "selectionchange" || l === "keyup" || l === "keydown")
    return An(Ha);
}
function gv(l, t) {
  if (l === "click") return An(t);
}
function Sv(l, t) {
  if (l === "input" || l === "change")
    return An(t);
}
function bv(l, t) {
  return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
}
var Yl = typeof Object.is == "function" ? Object.is : bv;
function xa(l, t) {
  if (Yl(l, t)) return !0;
  if (typeof l != "object" || l === null || typeof t != "object" || t === null)
    return !1;
  var u = Object.keys(l), a = Object.keys(t);
  if (u.length !== a.length) return !1;
  for (a = 0; a < u.length; a++) {
    var e = u[a];
    if (!pf.call(t, e) || !Yl(l[e], t[e]))
      return !1;
  }
  return !0;
}
function Ci(l) {
  for (; l && l.firstChild; ) l = l.firstChild;
  return l;
}
function Zi(l, t) {
  var u = Ci(l);
  l = 0;
  for (var a; u; ) {
    if (u.nodeType === 3) {
      if (a = l + u.textContent.length, l <= t && a >= t)
        return { node: u, offset: t - l };
      l = a;
    }
    l: {
      for (; u; ) {
        if (u.nextSibling) {
          u = u.nextSibling;
          break l;
        }
        u = u.parentNode;
      }
      u = void 0;
    }
    u = Ci(u);
  }
}
function H0(l, t) {
  return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? H0(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
}
function x0(l) {
  l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
  for (var t = Ke(l.document); t instanceof l.HTMLIFrameElement; ) {
    try {
      var u = typeof t.contentWindow.location.href == "string";
    } catch {
      u = !1;
    }
    if (u) l = t.contentWindow;
    else break;
    t = Ke(l.document);
  }
  return t;
}
function xc(l) {
  var t = l && l.nodeName && l.nodeName.toLowerCase();
  return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
}
var Ev = ht && "documentMode" in document && 11 >= document.documentMode, Ou = null, Yf = null, Sa = null, qf = !1;
function Vi(l, t, u) {
  var a = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
  qf || Ou == null || Ou !== Ke(a) || (a = Ou, "selectionStart" in a && xc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
    anchorNode: a.anchorNode,
    anchorOffset: a.anchorOffset,
    focusNode: a.focusNode,
    focusOffset: a.focusOffset
  }), Sa && xa(Sa, a) || (Sa = a, a = on(Yf, "onSelect"), 0 < a.length && (t = new En(
    "onSelect",
    "select",
    null,
    t,
    u
  ), l.push({ event: t, listeners: a }), t.target = Ou)));
}
function wt(l, t) {
  var u = {};
  return u[l.toLowerCase()] = t.toLowerCase(), u["Webkit" + l] = "webkit" + t, u["Moz" + l] = "moz" + t, u;
}
var _u = {
  animationend: wt("Animation", "AnimationEnd"),
  animationiteration: wt("Animation", "AnimationIteration"),
  animationstart: wt("Animation", "AnimationStart"),
  transitionrun: wt("Transition", "TransitionRun"),
  transitionstart: wt("Transition", "TransitionStart"),
  transitioncancel: wt("Transition", "TransitionCancel"),
  transitionend: wt("Transition", "TransitionEnd")
}, kn = {}, Y0 = {};
ht && (Y0 = document.createElement("div").style, "AnimationEvent" in window || (delete _u.animationend.animation, delete _u.animationiteration.animation, delete _u.animationstart.animation), "TransitionEvent" in window || delete _u.transitionend.transition);
function du(l) {
  if (kn[l]) return kn[l];
  if (!_u[l]) return l;
  var t = _u[l], u;
  for (u in t)
    if (t.hasOwnProperty(u) && u in Y0)
      return kn[l] = t[u];
  return l;
}
var q0 = du("animationend"), B0 = du("animationiteration"), j0 = du("animationstart"), Tv = du("transitionrun"), Av = du("transitionstart"), zv = du("transitioncancel"), G0 = du("transitionend"), X0 = /* @__PURE__ */ new Map(), Bf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  " "
);
Bf.push("scrollEnd");
function wl(l, t) {
  X0.set(l, t), su(t, [l]);
}
var Li = /* @__PURE__ */ new WeakMap();
function Cl(l, t) {
  if (typeof l == "object" && l !== null) {
    var u = Li.get(l);
    return u !== void 0 ? u : (t = {
      value: l,
      source: t,
      stack: pi(t)
    }, Li.set(l, t), t);
  }
  return {
    value: l,
    source: t,
    stack: pi(t)
  };
}
var Bl = [], Mu = 0, Yc = 0;
function zn() {
  for (var l = Mu, t = Yc = Mu = 0; t < l; ) {
    var u = Bl[t];
    Bl[t++] = null;
    var a = Bl[t];
    Bl[t++] = null;
    var e = Bl[t];
    Bl[t++] = null;
    var n = Bl[t];
    if (Bl[t++] = null, a !== null && e !== null) {
      var f = a.pending;
      f === null ? e.next = e : (e.next = f.next, f.next = e), a.pending = e;
    }
    n !== 0 && Q0(u, e, n);
  }
}
function On(l, t, u, a) {
  Bl[Mu++] = l, Bl[Mu++] = t, Bl[Mu++] = u, Bl[Mu++] = a, Yc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
}
function qc(l, t, u, a) {
  return On(l, t, u, a), Je(l);
}
function Pu(l, t) {
  return On(l, null, null, t), Je(l);
}
function Q0(l, t, u) {
  l.lanes |= u;
  var a = l.alternate;
  a !== null && (a.lanes |= u);
  for (var e = !1, n = l.return; n !== null; )
    n.childLanes |= u, a = n.alternate, a !== null && (a.childLanes |= u), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
  return l.tag === 3 ? (n = l.stateNode, e && t !== null && (e = 31 - Rl(u), l = n.hiddenUpdates, a = l[e], a === null ? l[e] = [t] : a.push(t), t.lane = u | 536870912), n) : null;
}
function Je(l) {
  if (50 < pa)
    throw pa = 0, ac = null, Error(S(185));
  for (var t = l.return; t !== null; )
    l = t, t = l.return;
  return l.tag === 3 ? l.stateNode : null;
}
var Du = {};
function Ov(l, t, u, a) {
  this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ul(l, t, u, a) {
  return new Ov(l, t, u, a);
}
function Bc(l) {
  return l = l.prototype, !(!l || !l.isReactComponent);
}
function yt(l, t) {
  var u = l.alternate;
  return u === null ? (u = Ul(
    l.tag,
    t,
    l.key,
    l.mode
  ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = t, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, t = l.dependencies, u.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
}
function C0(l, t) {
  l.flags &= 65011714;
  var u = l.alternate;
  return u === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, t = u.dependencies, l.dependencies = t === null ? null : {
    lanes: t.lanes,
    firstContext: t.firstContext
  }), l;
}
function Re(l, t, u, a, e, n) {
  var f = 0;
  if (a = l, typeof l == "function") Bc(l) && (f = 1);
  else if (typeof l == "string")
    f = Mh(
      l,
      u,
      Fl.current
    ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
  else
    l: switch (l) {
      case Of:
        return l = Ul(31, u, t, e), l.elementType = Of, l.lanes = n, l;
      case bu:
        return Pt(u.children, e, n, t);
      case f0:
        f = 8, e |= 24;
        break;
      case Tf:
        return l = Ul(12, u, t, e | 2), l.elementType = Tf, l.lanes = n, l;
      case Af:
        return l = Ul(13, u, t, e), l.elementType = Af, l.lanes = n, l;
      case zf:
        return l = Ul(19, u, t, e), l.elementType = zf, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null)
          switch (l.$$typeof) {
            case hy:
            case ct:
              f = 10;
              break l;
            case c0:
              f = 9;
              break l;
            case Ac:
              f = 11;
              break l;
            case zc:
              f = 14;
              break l;
            case zt:
              f = 16, a = null;
              break l;
          }
        f = 29, u = Error(
          S(130, l === null ? "null" : typeof l, "")
        ), a = null;
    }
  return t = Ul(f, u, t, e), t.elementType = l, t.type = a, t.lanes = n, t;
}
function Pt(l, t, u, a) {
  return l = Ul(7, l, a, t), l.lanes = u, l;
}
function Fn(l, t, u) {
  return l = Ul(6, l, null, t), l.lanes = u, l;
}
function In(l, t, u) {
  return t = Ul(
    4,
    l.children !== null ? l.children : [],
    l.key,
    t
  ), t.lanes = u, t.stateNode = {
    containerInfo: l.containerInfo,
    pendingChildren: null,
    implementation: l.implementation
  }, t;
}
var pu = [], Uu = 0, we = null, $e = 0, Gl = [], Xl = 0, lu = null, it = 1, st = "";
function kt(l, t) {
  pu[Uu++] = $e, pu[Uu++] = we, we = l, $e = t;
}
function Z0(l, t, u) {
  Gl[Xl++] = it, Gl[Xl++] = st, Gl[Xl++] = lu, lu = l;
  var a = it;
  l = st;
  var e = 32 - Rl(a) - 1;
  a &= ~(1 << e), u += 1;
  var n = 32 - Rl(t) + e;
  if (30 < n) {
    var f = e - e % 5;
    n = (a & (1 << f) - 1).toString(32), a >>= f, e -= f, it = 1 << 32 - Rl(t) + e | u << e | a, st = n + l;
  } else
    it = 1 << n | u << e | a, st = l;
}
function jc(l) {
  l.return !== null && (kt(l, 1), Z0(l, 1, 0));
}
function Gc(l) {
  for (; l === we; )
    we = pu[--Uu], pu[Uu] = null, $e = pu[--Uu], pu[Uu] = null;
  for (; l === lu; )
    lu = Gl[--Xl], Gl[Xl] = null, st = Gl[--Xl], Gl[Xl] = null, it = Gl[--Xl], Gl[Xl] = null;
}
var gl = null, k = null, j = !1, tu = null, Wl = !1, jf = Error(S(519));
function nu(l) {
  var t = Error(S(418, ""));
  throw Ya(Cl(t, l)), jf;
}
function Ki(l) {
  var t = l.stateNode, u = l.type, a = l.memoizedProps;
  switch (t[rl] = l, t[zl] = a, u) {
    case "dialog":
      H("cancel", t), H("close", t);
      break;
    case "iframe":
    case "object":
    case "embed":
      H("load", t);
      break;
    case "video":
    case "audio":
      for (u = 0; u < ja.length; u++)
        H(ja[u], t);
      break;
    case "source":
      H("error", t);
      break;
    case "img":
    case "image":
    case "link":
      H("error", t), H("load", t);
      break;
    case "details":
      H("toggle", t);
      break;
    case "input":
      H("invalid", t), E0(
        t,
        a.value,
        a.defaultValue,
        a.checked,
        a.defaultChecked,
        a.type,
        a.name,
        !0
      ), Le(t);
      break;
    case "select":
      H("invalid", t);
      break;
    case "textarea":
      H("invalid", t), A0(t, a.value, a.defaultValue, a.children), Le(t);
  }
  u = a.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || t.textContent === "" + u || a.suppressHydrationWarning === !0 || Od(t.textContent, u) ? (a.popover != null && (H("beforetoggle", t), H("toggle", t)), a.onScroll != null && H("scroll", t), a.onScrollEnd != null && H("scrollend", t), a.onClick != null && (t.onclick = Hn), t = !0) : t = !1, t || nu(l);
}
function Ji(l) {
  for (gl = l.return; gl; )
    switch (gl.tag) {
      case 5:
      case 13:
        Wl = !1;
        return;
      case 27:
      case 3:
        Wl = !0;
        return;
      default:
        gl = gl.return;
    }
}
function fa(l) {
  if (l !== gl) return !1;
  if (!j) return Ji(l), j = !0, !1;
  var t = l.tag, u;
  if ((u = t !== 3 && t !== 27) && ((u = t === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || sc(l.type, l.memoizedProps)), u = !u), u && k && nu(l), Ji(l), t === 13) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(S(317));
    l: {
      for (l = l.nextSibling, t = 0; l; ) {
        if (l.nodeType === 8)
          if (u = l.data, u === "/$") {
            if (t === 0) {
              k = Jl(l.nextSibling);
              break l;
            }
            t--;
          } else
            u !== "$" && u !== "$!" && u !== "$?" || t++;
        l = l.nextSibling;
      }
      k = null;
    }
  } else
    t === 27 ? (t = k, Kt(l.type) ? (l = yc, yc = null, k = l) : k = t) : k = gl ? Jl(l.stateNode.nextSibling) : null;
  return !0;
}
function ka() {
  k = gl = null, j = !1;
}
function wi() {
  var l = tu;
  return l !== null && (Al === null ? Al = l : Al.push.apply(
    Al,
    l
  ), tu = null), l;
}
function Ya(l) {
  tu === null ? tu = [l] : tu.push(l);
}
var Gf = lt(null), yu = null, ot = null;
function _t(l, t, u) {
  $(Gf, t._currentValue), t._currentValue = u;
}
function vt(l) {
  l._currentValue = Gf.current, dl(Gf);
}
function Xf(l, t, u) {
  for (; l !== null; ) {
    var a = l.alternate;
    if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === u) break;
    l = l.return;
  }
}
function Qf(l, t, u, a) {
  var e = l.child;
  for (e !== null && (e.return = l); e !== null; ) {
    var n = e.dependencies;
    if (n !== null) {
      var f = e.child;
      n = n.firstContext;
      l: for (; n !== null; ) {
        var c = n;
        n = e;
        for (var i = 0; i < t.length; i++)
          if (c.context === t[i]) {
            n.lanes |= u, c = n.alternate, c !== null && (c.lanes |= u), Xf(
              n.return,
              u,
              l
            ), a || (f = null);
            break l;
          }
        n = c.next;
      }
    } else if (e.tag === 18) {
      if (f = e.return, f === null) throw Error(S(341));
      f.lanes |= u, n = f.alternate, n !== null && (n.lanes |= u), Xf(f, u, l), f = null;
    } else f = e.child;
    if (f !== null) f.return = e;
    else
      for (f = e; f !== null; ) {
        if (f === l) {
          f = null;
          break;
        }
        if (e = f.sibling, e !== null) {
          e.return = f.return, f = e;
          break;
        }
        f = f.return;
      }
    e = f;
  }
}
function Fa(l, t, u, a) {
  l = null;
  for (var e = t, n = !1; e !== null; ) {
    if (!n) {
      if (e.flags & 524288) n = !0;
      else if (e.flags & 262144) break;
    }
    if (e.tag === 10) {
      var f = e.alternate;
      if (f === null) throw Error(S(387));
      if (f = f.memoizedProps, f !== null) {
        var c = e.type;
        Yl(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
      }
    } else if (e === Qe.current) {
      if (f = e.alternate, f === null) throw Error(S(387));
      f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(Qa) : l = [Qa]);
    }
    e = e.return;
  }
  l !== null && Qf(
    t,
    l,
    u,
    a
  ), t.flags |= 262144;
}
function We(l) {
  for (l = l.firstContext; l !== null; ) {
    if (!Yl(
      l.context._currentValue,
      l.memoizedValue
    ))
      return !0;
    l = l.next;
  }
  return !1;
}
function fu(l) {
  yu = l, ot = null, l = l.dependencies, l !== null && (l.firstContext = null);
}
function ml(l) {
  return V0(yu, l);
}
function re(l, t) {
  return yu === null && fu(l), V0(l, t);
}
function V0(l, t) {
  var u = t._currentValue;
  if (t = { context: t, memoizedValue: u, next: null }, ot === null) {
    if (l === null) throw Error(S(308));
    ot = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
  } else ot = ot.next = t;
  return u;
}
var _v = typeof AbortController < "u" ? AbortController : function() {
  var l = [], t = this.signal = {
    aborted: !1,
    addEventListener: function(u, a) {
      l.push(a);
    }
  };
  this.abort = function() {
    t.aborted = !0, l.forEach(function(u) {
      return u();
    });
  };
}, Mv = fl.unstable_scheduleCallback, Dv = fl.unstable_NormalPriority, el = {
  $$typeof: ct,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function Xc() {
  return {
    controller: new _v(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function Ia(l) {
  l.refCount--, l.refCount === 0 && Mv(Dv, function() {
    l.controller.abort();
  });
}
var ba = null, Cf = 0, Zu = 0, Yu = null;
function pv(l, t) {
  if (ba === null) {
    var u = ba = [];
    Cf = 0, Zu = ii(), Yu = {
      status: "pending",
      value: void 0,
      then: function(a) {
        u.push(a);
      }
    };
  }
  return Cf++, t.then($i, $i), t;
}
function $i() {
  if (--Cf === 0 && ba !== null) {
    Yu !== null && (Yu.status = "fulfilled");
    var l = ba;
    ba = null, Zu = 0, Yu = null;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
}
function Uv(l, t) {
  var u = [], a = {
    status: "pending",
    value: null,
    reason: null,
    then: function(e) {
      u.push(e);
    }
  };
  return l.then(
    function() {
      a.status = "fulfilled", a.value = t;
      for (var e = 0; e < u.length; e++) (0, u[e])(t);
    },
    function(e) {
      for (a.status = "rejected", a.reason = e, e = 0; e < u.length; e++)
        (0, u[e])(void 0);
    }
  ), a;
}
var Wi = _.S;
_.S = function(l, t) {
  typeof t == "object" && t !== null && typeof t.then == "function" && pv(l, t), Wi !== null && Wi(l, t);
};
var uu = lt(null);
function Qc() {
  var l = uu.current;
  return l !== null ? l : L.pooledCache;
}
function He(l, t) {
  t === null ? $(uu, uu.current) : $(uu, t.pool);
}
function L0() {
  var l = Qc();
  return l === null ? null : { parent: el._currentValue, pool: l };
}
var Pa = Error(S(460)), K0 = Error(S(474)), _n = Error(S(542)), Zf = { then: function() {
} };
function ki(l) {
  return l = l.status, l === "fulfilled" || l === "rejected";
}
function me() {
}
function J0(l, t, u) {
  switch (u = l[u], u === void 0 ? l.push(t) : u !== t && (t.then(me, me), t = u), t.status) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw l = t.reason, Ii(l), l;
    default:
      if (typeof t.status == "string") t.then(me, me);
      else {
        if (l = L, l !== null && 100 < l.shellSuspendCounter)
          throw Error(S(482));
        l = t, l.status = "pending", l.then(
          function(a) {
            if (t.status === "pending") {
              var e = t;
              e.status = "fulfilled", e.value = a;
            }
          },
          function(a) {
            if (t.status === "pending") {
              var e = t;
              e.status = "rejected", e.reason = a;
            }
          }
        );
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw l = t.reason, Ii(l), l;
      }
      throw Ea = t, Pa;
  }
}
var Ea = null;
function Fi() {
  if (Ea === null) throw Error(S(459));
  var l = Ea;
  return Ea = null, l;
}
function Ii(l) {
  if (l === Pa || l === _n)
    throw Error(S(483));
}
var Ot = !1;
function Cc(l) {
  l.updateQueue = {
    baseState: l.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function Vf(l, t) {
  l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
    baseState: l.baseState,
    firstBaseUpdate: l.firstBaseUpdate,
    lastBaseUpdate: l.lastBaseUpdate,
    shared: l.shared,
    callbacks: null
  });
}
function Yt(l) {
  return { lane: l, tag: 0, payload: null, callback: null, next: null };
}
function qt(l, t, u) {
  var a = l.updateQueue;
  if (a === null) return null;
  if (a = a.shared, Q & 2) {
    var e = a.pending;
    return e === null ? t.next = t : (t.next = e.next, e.next = t), a.pending = t, t = Je(l), Q0(l, null, u), t;
  }
  return On(l, a, t, u), Je(l);
}
function Ta(l, t, u) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (u & 4194048) !== 0)) {
    var a = t.lanes;
    a &= l.pendingLanes, u |= a, t.lanes = u, h0(l, u);
  }
}
function Pn(l, t) {
  var u = l.updateQueue, a = l.alternate;
  if (a !== null && (a = a.updateQueue, u === a)) {
    var e = null, n = null;
    if (u = u.firstBaseUpdate, u !== null) {
      do {
        var f = {
          lane: u.lane,
          tag: u.tag,
          payload: u.payload,
          callback: null,
          next: null
        };
        n === null ? e = n = f : n = n.next = f, u = u.next;
      } while (u !== null);
      n === null ? e = n = t : n = n.next = t;
    } else e = n = t;
    u = {
      baseState: a.baseState,
      firstBaseUpdate: e,
      lastBaseUpdate: n,
      shared: a.shared,
      callbacks: a.callbacks
    }, l.updateQueue = u;
    return;
  }
  l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = t : l.next = t, u.lastBaseUpdate = t;
}
var Lf = !1;
function Aa() {
  if (Lf) {
    var l = Yu;
    if (l !== null) throw l;
  }
}
function za(l, t, u, a) {
  Lf = !1;
  var e = l.updateQueue;
  Ot = !1;
  var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
  if (c !== null) {
    e.shared.pending = null;
    var i = c, y = i.next;
    i.next = null, f === null ? n = y : f.next = y, f = i;
    var r = l.alternate;
    r !== null && (r = r.updateQueue, c = r.lastBaseUpdate, c !== f && (c === null ? r.firstBaseUpdate = y : c.next = y, r.lastBaseUpdate = i));
  }
  if (n !== null) {
    var m = e.baseState;
    f = 0, r = y = i = null, c = n;
    do {
      var d = c.lane & -536870913, v = d !== c.lane;
      if (v ? (B & d) === d : (a & d) === d) {
        d !== 0 && d === Zu && (Lf = !0), r !== null && (r = r.next = {
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: null,
          next: null
        });
        l: {
          var b = l, T = c;
          d = t;
          var D = u;
          switch (T.tag) {
            case 1:
              if (b = T.payload, typeof b == "function") {
                m = b.call(D, m, d);
                break l;
              }
              m = b;
              break l;
            case 3:
              b.flags = b.flags & -65537 | 128;
            case 0:
              if (b = T.payload, d = typeof b == "function" ? b.call(D, m, d) : b, d == null) break l;
              m = K({}, m, d);
              break l;
            case 2:
              Ot = !0;
          }
        }
        d = c.callback, d !== null && (l.flags |= 64, v && (l.flags |= 8192), v = e.callbacks, v === null ? e.callbacks = [d] : v.push(d));
      } else
        v = {
          lane: d,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, r === null ? (y = r = v, i = m) : r = r.next = v, f |= d;
      if (c = c.next, c === null) {
        if (c = e.shared.pending, c === null)
          break;
        v = c, c = v.next, v.next = null, e.lastBaseUpdate = v, e.shared.pending = null;
      }
    } while (!0);
    r === null && (i = m), e.baseState = i, e.firstBaseUpdate = y, e.lastBaseUpdate = r, n === null && (e.shared.lanes = 0), Vt |= f, l.lanes = f, l.memoizedState = m;
  }
}
function w0(l, t) {
  if (typeof l != "function")
    throw Error(S(191, l));
  l.call(t);
}
function $0(l, t) {
  var u = l.callbacks;
  if (u !== null)
    for (l.callbacks = null, l = 0; l < u.length; l++)
      w0(u[l], t);
}
var Vu = lt(null), ke = lt(0);
function Pi(l, t) {
  l = gt, $(ke, l), $(Vu, t), gt = l | t.baseLanes;
}
function Kf() {
  $(ke, gt), $(Vu, Vu.current);
}
function Zc() {
  gt = ke.current, dl(Vu), dl(ke);
}
var Ct = 0, U = null, Z = null, ul = null, Fe = !1, qu = !1, cu = !1, Ie = 0, qa = 0, Bu = null, Nv = 0;
function ll() {
  throw Error(S(321));
}
function Vc(l, t) {
  if (t === null) return !1;
  for (var u = 0; u < t.length && u < l.length; u++)
    if (!Yl(l[u], t[u])) return !1;
  return !0;
}
function Lc(l, t, u, a, e, n) {
  return Ct = n, U = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = l === null || l.memoizedState === null ? Mo : Do, cu = !1, n = u(a, e), cu = !1, qu && (n = k0(
    t,
    u,
    a,
    e
  )), W0(l), n;
}
function W0(l) {
  _.H = Pe;
  var t = Z !== null && Z.next !== null;
  if (Ct = 0, ul = Z = U = null, Fe = !1, qa = 0, Bu = null, t) throw Error(S(300));
  l === null || ol || (l = l.dependencies, l !== null && We(l) && (ol = !0));
}
function k0(l, t, u, a) {
  U = l;
  var e = 0;
  do {
    if (qu && (Bu = null), qa = 0, qu = !1, 25 <= e) throw Error(S(301));
    if (e += 1, ul = Z = null, l.updateQueue != null) {
      var n = l.updateQueue;
      n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
    }
    _.H = jv, n = t(u, a);
  } while (qu);
  return n;
}
function Rv() {
  var l = _.H, t = l.useState()[0];
  return t = typeof t.then == "function" ? le(t) : t, l = l.useState()[0], (Z !== null ? Z.memoizedState : null) !== l && (U.flags |= 1024), t;
}
function Kc() {
  var l = Ie !== 0;
  return Ie = 0, l;
}
function Jc(l, t, u) {
  t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~u;
}
function wc(l) {
  if (Fe) {
    for (l = l.memoizedState; l !== null; ) {
      var t = l.queue;
      t !== null && (t.pending = null), l = l.next;
    }
    Fe = !1;
  }
  Ct = 0, ul = Z = U = null, qu = !1, qa = Ie = 0, Bu = null;
}
function El() {
  var l = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return ul === null ? U.memoizedState = ul = l : ul = ul.next = l, ul;
}
function al() {
  if (Z === null) {
    var l = U.alternate;
    l = l !== null ? l.memoizedState : null;
  } else l = Z.next;
  var t = ul === null ? U.memoizedState : ul.next;
  if (t !== null)
    ul = t, Z = l;
  else {
    if (l === null)
      throw U.alternate === null ? Error(S(467)) : Error(S(310));
    Z = l, l = {
      memoizedState: Z.memoizedState,
      baseState: Z.baseState,
      baseQueue: Z.baseQueue,
      queue: Z.queue,
      next: null
    }, ul === null ? U.memoizedState = ul = l : ul = ul.next = l;
  }
  return ul;
}
function $c() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function le(l) {
  var t = qa;
  return qa += 1, Bu === null && (Bu = []), l = J0(Bu, l, t), t = U, (ul === null ? t.memoizedState : ul.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? Mo : Do), l;
}
function Mn(l) {
  if (l !== null && typeof l == "object") {
    if (typeof l.then == "function") return le(l);
    if (l.$$typeof === ct) return ml(l);
  }
  throw Error(S(438, String(l)));
}
function Wc(l) {
  var t = null, u = U.updateQueue;
  if (u !== null && (t = u.memoCache), t == null) {
    var a = U.alternate;
    a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
      data: a.data.map(function(e) {
        return e.slice();
      }),
      index: 0
    })));
  }
  if (t == null && (t = { data: [], index: 0 }), u === null && (u = $c(), U.updateQueue = u), u.memoCache = t, u = t.data[t.index], u === void 0)
    for (u = t.data[t.index] = Array(l), a = 0; a < l; a++)
      u[a] = ry;
  return t.index++, u;
}
function rt(l, t) {
  return typeof t == "function" ? t(l) : t;
}
function xe(l) {
  var t = al();
  return kc(t, Z, l);
}
function kc(l, t, u) {
  var a = l.queue;
  if (a === null) throw Error(S(311));
  a.lastRenderedReducer = u;
  var e = l.baseQueue, n = a.pending;
  if (n !== null) {
    if (e !== null) {
      var f = e.next;
      e.next = n.next, n.next = f;
    }
    t.baseQueue = e = n, a.pending = null;
  }
  if (n = l.baseState, e === null) l.memoizedState = n;
  else {
    t = e.next;
    var c = f = null, i = null, y = t, r = !1;
    do {
      var m = y.lane & -536870913;
      if (m !== y.lane ? (B & m) === m : (Ct & m) === m) {
        var d = y.revertLane;
        if (d === 0)
          i !== null && (i = i.next = {
            lane: 0,
            revertLane: 0,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }), m === Zu && (r = !0);
        else if ((Ct & d) === d) {
          y = y.next, d === Zu && (r = !0);
          continue;
        } else
          m = {
            lane: 0,
            revertLane: y.revertLane,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }, i === null ? (c = i = m, f = n) : i = i.next = m, U.lanes |= d, Vt |= d;
        m = y.action, cu && u(n, m), n = y.hasEagerState ? y.eagerState : u(n, m);
      } else
        d = {
          lane: m,
          revertLane: y.revertLane,
          action: y.action,
          hasEagerState: y.hasEagerState,
          eagerState: y.eagerState,
          next: null
        }, i === null ? (c = i = d, f = n) : i = i.next = d, U.lanes |= m, Vt |= m;
      y = y.next;
    } while (y !== null && y !== t);
    if (i === null ? f = n : i.next = c, !Yl(n, l.memoizedState) && (ol = !0, r && (u = Yu, u !== null)))
      throw u;
    l.memoizedState = n, l.baseState = f, l.baseQueue = i, a.lastRenderedState = n;
  }
  return e === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
}
function lf(l) {
  var t = al(), u = t.queue;
  if (u === null) throw Error(S(311));
  u.lastRenderedReducer = l;
  var a = u.dispatch, e = u.pending, n = t.memoizedState;
  if (e !== null) {
    u.pending = null;
    var f = e = e.next;
    do
      n = l(n, f.action), f = f.next;
    while (f !== e);
    Yl(n, t.memoizedState) || (ol = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), u.lastRenderedState = n;
  }
  return [n, a];
}
function F0(l, t, u) {
  var a = U, e = al(), n = j;
  if (n) {
    if (u === void 0) throw Error(S(407));
    u = u();
  } else u = t();
  var f = !Yl(
    (Z || e).memoizedState,
    u
  );
  f && (e.memoizedState = u, ol = !0), e = e.queue;
  var c = lo.bind(null, a, e, l);
  if (te(2048, 8, c, [l]), e.getSnapshot !== t || f || ul !== null && ul.memoizedState.tag & 1) {
    if (a.flags |= 2048, Lu(
      9,
      Dn(),
      P0.bind(
        null,
        a,
        e,
        u,
        t
      ),
      null
    ), L === null) throw Error(S(349));
    n || Ct & 124 || I0(a, t, u);
  }
  return u;
}
function I0(l, t, u) {
  l.flags |= 16384, l = { getSnapshot: t, value: u }, t = U.updateQueue, t === null ? (t = $c(), U.updateQueue = t, t.stores = [l]) : (u = t.stores, u === null ? t.stores = [l] : u.push(l));
}
function P0(l, t, u, a) {
  t.value = u, t.getSnapshot = a, to(t) && uo(l);
}
function lo(l, t, u) {
  return u(function() {
    to(t) && uo(l);
  });
}
function to(l) {
  var t = l.getSnapshot;
  l = l.value;
  try {
    var u = t();
    return !Yl(l, u);
  } catch {
    return !0;
  }
}
function uo(l) {
  var t = Pu(l, 2);
  t !== null && xl(t, l, 2);
}
function Jf(l) {
  var t = El();
  if (typeof l == "function") {
    var u = l;
    if (l = u(), cu) {
      Ut(!0);
      try {
        u();
      } finally {
        Ut(!1);
      }
    }
  }
  return t.memoizedState = t.baseState = l, t.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: rt,
    lastRenderedState: l
  }, t;
}
function ao(l, t, u, a) {
  return l.baseState = u, kc(
    l,
    Z,
    typeof a == "function" ? a : rt
  );
}
function Hv(l, t, u, a, e) {
  if (pn(l)) throw Error(S(485));
  if (l = t.action, l !== null) {
    var n = {
      payload: e,
      action: l,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function(f) {
        n.listeners.push(f);
      }
    };
    _.T !== null ? u(!0) : n.isTransition = !1, a(n), u = t.pending, u === null ? (n.next = t.pending = n, eo(t, n)) : (n.next = u.next, t.pending = u.next = n);
  }
}
function eo(l, t) {
  var u = t.action, a = t.payload, e = l.state;
  if (t.isTransition) {
    var n = _.T, f = {};
    _.T = f;
    try {
      var c = u(e, a), i = _.S;
      i !== null && i(f, c), ls(l, t, c);
    } catch (y) {
      wf(l, t, y);
    } finally {
      _.T = n;
    }
  } else
    try {
      n = u(e, a), ls(l, t, n);
    } catch (y) {
      wf(l, t, y);
    }
}
function ls(l, t, u) {
  u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
    function(a) {
      ts(l, t, a);
    },
    function(a) {
      return wf(l, t, a);
    }
  ) : ts(l, t, u);
}
function ts(l, t, u) {
  t.status = "fulfilled", t.value = u, no(t), l.state = u, t = l.pending, t !== null && (u = t.next, u === t ? l.pending = null : (u = u.next, t.next = u, eo(l, u)));
}
function wf(l, t, u) {
  var a = l.pending;
  if (l.pending = null, a !== null) {
    a = a.next;
    do
      t.status = "rejected", t.reason = u, no(t), t = t.next;
    while (t !== a);
  }
  l.action = null;
}
function no(l) {
  l = l.listeners;
  for (var t = 0; t < l.length; t++) (0, l[t])();
}
function fo(l, t) {
  return t;
}
function us(l, t) {
  if (j) {
    var u = L.formState;
    if (u !== null) {
      l: {
        var a = U;
        if (j) {
          if (k) {
            t: {
              for (var e = k, n = Wl; e.nodeType !== 8; ) {
                if (!n) {
                  e = null;
                  break t;
                }
                if (e = Jl(
                  e.nextSibling
                ), e === null) {
                  e = null;
                  break t;
                }
              }
              n = e.data, e = n === "F!" || n === "F" ? e : null;
            }
            if (e) {
              k = Jl(
                e.nextSibling
              ), a = e.data === "F!";
              break l;
            }
          }
          nu(a);
        }
        a = !1;
      }
      a && (t = u[0]);
    }
  }
  return u = El(), u.memoizedState = u.baseState = t, a = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: fo,
    lastRenderedState: t
  }, u.queue = a, u = zo.bind(
    null,
    U,
    a
  ), a.dispatch = u, a = Jf(!1), n = li.bind(
    null,
    U,
    !1,
    a.queue
  ), a = El(), e = {
    state: t,
    dispatch: null,
    action: l,
    pending: null
  }, a.queue = e, u = Hv.bind(
    null,
    U,
    e,
    n,
    u
  ), e.dispatch = u, a.memoizedState = l, [t, u, !1];
}
function as(l) {
  var t = al();
  return co(t, Z, l);
}
function co(l, t, u) {
  if (t = kc(
    l,
    t,
    fo
  )[0], l = xe(rt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
    try {
      var a = le(t);
    } catch (f) {
      throw f === Pa ? _n : f;
    }
  else a = t;
  t = al();
  var e = t.queue, n = e.dispatch;
  return u !== t.memoizedState && (U.flags |= 2048, Lu(
    9,
    Dn(),
    xv.bind(null, e, u),
    null
  )), [a, n, l];
}
function xv(l, t) {
  l.action = t;
}
function es(l) {
  var t = al(), u = Z;
  if (u !== null)
    return co(t, u, l);
  al(), t = t.memoizedState, u = al();
  var a = u.queue.dispatch;
  return u.memoizedState = l, [t, a, !1];
}
function Lu(l, t, u, a) {
  return l = { tag: l, create: u, deps: a, inst: t, next: null }, t = U.updateQueue, t === null && (t = $c(), U.updateQueue = t), u = t.lastEffect, u === null ? t.lastEffect = l.next = l : (a = u.next, u.next = l, l.next = a, t.lastEffect = l), l;
}
function Dn() {
  return { destroy: void 0, resource: void 0 };
}
function io() {
  return al().memoizedState;
}
function Ye(l, t, u, a) {
  var e = El();
  a = a === void 0 ? null : a, U.flags |= l, e.memoizedState = Lu(
    1 | t,
    Dn(),
    u,
    a
  );
}
function te(l, t, u, a) {
  var e = al();
  a = a === void 0 ? null : a;
  var n = e.memoizedState.inst;
  Z !== null && a !== null && Vc(a, Z.memoizedState.deps) ? e.memoizedState = Lu(t, n, u, a) : (U.flags |= l, e.memoizedState = Lu(
    1 | t,
    n,
    u,
    a
  ));
}
function ns(l, t) {
  Ye(8390656, 8, l, t);
}
function so(l, t) {
  te(2048, 8, l, t);
}
function oo(l, t) {
  return te(4, 2, l, t);
}
function yo(l, t) {
  return te(4, 4, l, t);
}
function vo(l, t) {
  if (typeof t == "function") {
    l = l();
    var u = t(l);
    return function() {
      typeof u == "function" ? u() : t(null);
    };
  }
  if (t != null)
    return l = l(), t.current = l, function() {
      t.current = null;
    };
}
function ho(l, t, u) {
  u = u != null ? u.concat([l]) : null, te(4, 4, vo.bind(null, t, l), u);
}
function Fc() {
}
function ro(l, t) {
  var u = al();
  t = t === void 0 ? null : t;
  var a = u.memoizedState;
  return t !== null && Vc(t, a[1]) ? a[0] : (u.memoizedState = [l, t], l);
}
function mo(l, t) {
  var u = al();
  t = t === void 0 ? null : t;
  var a = u.memoizedState;
  if (t !== null && Vc(t, a[1]))
    return a[0];
  if (a = l(), cu) {
    Ut(!0);
    try {
      l();
    } finally {
      Ut(!1);
    }
  }
  return u.memoizedState = [a, t], a;
}
function Ic(l, t, u) {
  return u === void 0 || Ct & 1073741824 ? l.memoizedState = t : (l.memoizedState = u, l = fd(), U.lanes |= l, Vt |= l, u);
}
function go(l, t, u, a) {
  return Yl(u, t) ? u : Vu.current !== null ? (l = Ic(l, u, a), Yl(l, t) || (ol = !0), l) : Ct & 42 ? (l = fd(), U.lanes |= l, Vt |= l, t) : (ol = !0, l.memoizedState = u);
}
function So(l, t, u, a, e) {
  var n = G.p;
  G.p = n !== 0 && 8 > n ? n : 8;
  var f = _.T, c = {};
  _.T = c, li(l, !1, t, u);
  try {
    var i = e(), y = _.S;
    if (y !== null && y(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
      var r = Uv(
        i,
        a
      );
      Oa(
        l,
        t,
        r,
        Hl(l)
      );
    } else
      Oa(
        l,
        t,
        a,
        Hl(l)
      );
  } catch (m) {
    Oa(
      l,
      t,
      { then: function() {
      }, status: "rejected", reason: m },
      Hl()
    );
  } finally {
    G.p = n, _.T = f;
  }
}
function Yv() {
}
function $f(l, t, u, a) {
  if (l.tag !== 5) throw Error(S(476));
  var e = bo(l).queue;
  So(
    l,
    e,
    t,
    It,
    u === null ? Yv : function() {
      return Eo(l), u(a);
    }
  );
}
function bo(l) {
  var t = l.memoizedState;
  if (t !== null) return t;
  t = {
    memoizedState: It,
    baseState: It,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: rt,
      lastRenderedState: It
    },
    next: null
  };
  var u = {};
  return t.next = {
    memoizedState: u,
    baseState: u,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: rt,
      lastRenderedState: u
    },
    next: null
  }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
}
function Eo(l) {
  var t = bo(l).next.queue;
  Oa(l, t, {}, Hl());
}
function Pc() {
  return ml(Qa);
}
function To() {
  return al().memoizedState;
}
function Ao() {
  return al().memoizedState;
}
function qv(l) {
  for (var t = l.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var u = Hl();
        l = Yt(u);
        var a = qt(t, l, u);
        a !== null && (xl(a, t, u), Ta(a, t, u)), t = { cache: Xc() }, l.payload = t;
        return;
    }
    t = t.return;
  }
}
function Bv(l, t, u) {
  var a = Hl();
  u = {
    lane: a,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, pn(l) ? Oo(t, u) : (u = qc(l, t, u, a), u !== null && (xl(u, l, a), _o(u, t, a)));
}
function zo(l, t, u) {
  var a = Hl();
  Oa(l, t, u, a);
}
function Oa(l, t, u, a) {
  var e = {
    lane: a,
    revertLane: 0,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (pn(l)) Oo(t, e);
  else {
    var n = l.alternate;
    if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
      try {
        var f = t.lastRenderedState, c = n(f, u);
        if (e.hasEagerState = !0, e.eagerState = c, Yl(c, f))
          return On(l, t, e, 0), L === null && zn(), !1;
      } catch {
      } finally {
      }
    if (u = qc(l, t, e, a), u !== null)
      return xl(u, l, a), _o(u, t, a), !0;
  }
  return !1;
}
function li(l, t, u, a) {
  if (a = {
    lane: 2,
    revertLane: ii(),
    action: a,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, pn(l)) {
    if (t) throw Error(S(479));
  } else
    t = qc(
      l,
      u,
      a,
      2
    ), t !== null && xl(t, l, 2);
}
function pn(l) {
  var t = l.alternate;
  return l === U || t !== null && t === U;
}
function Oo(l, t) {
  qu = Fe = !0;
  var u = l.pending;
  u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t;
}
function _o(l, t, u) {
  if (u & 4194048) {
    var a = t.lanes;
    a &= l.pendingLanes, u |= a, t.lanes = u, h0(l, u);
  }
}
var Pe = {
  readContext: ml,
  use: Mn,
  useCallback: ll,
  useContext: ll,
  useEffect: ll,
  useImperativeHandle: ll,
  useLayoutEffect: ll,
  useInsertionEffect: ll,
  useMemo: ll,
  useReducer: ll,
  useRef: ll,
  useState: ll,
  useDebugValue: ll,
  useDeferredValue: ll,
  useTransition: ll,
  useSyncExternalStore: ll,
  useId: ll,
  useHostTransitionStatus: ll,
  useFormState: ll,
  useActionState: ll,
  useOptimistic: ll,
  useMemoCache: ll,
  useCacheRefresh: ll
}, Mo = {
  readContext: ml,
  use: Mn,
  useCallback: function(l, t) {
    return El().memoizedState = [
      l,
      t === void 0 ? null : t
    ], l;
  },
  useContext: ml,
  useEffect: ns,
  useImperativeHandle: function(l, t, u) {
    u = u != null ? u.concat([l]) : null, Ye(
      4194308,
      4,
      vo.bind(null, t, l),
      u
    );
  },
  useLayoutEffect: function(l, t) {
    return Ye(4194308, 4, l, t);
  },
  useInsertionEffect: function(l, t) {
    Ye(4, 2, l, t);
  },
  useMemo: function(l, t) {
    var u = El();
    t = t === void 0 ? null : t;
    var a = l();
    if (cu) {
      Ut(!0);
      try {
        l();
      } finally {
        Ut(!1);
      }
    }
    return u.memoizedState = [a, t], a;
  },
  useReducer: function(l, t, u) {
    var a = El();
    if (u !== void 0) {
      var e = u(t);
      if (cu) {
        Ut(!0);
        try {
          u(t);
        } finally {
          Ut(!1);
        }
      }
    } else e = t;
    return a.memoizedState = a.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: l,
      lastRenderedState: e
    }, a.queue = l, l = l.dispatch = Bv.bind(
      null,
      U,
      l
    ), [a.memoizedState, l];
  },
  useRef: function(l) {
    var t = El();
    return l = { current: l }, t.memoizedState = l;
  },
  useState: function(l) {
    l = Jf(l);
    var t = l.queue, u = zo.bind(null, U, t);
    return t.dispatch = u, [l.memoizedState, u];
  },
  useDebugValue: Fc,
  useDeferredValue: function(l, t) {
    var u = El();
    return Ic(u, l, t);
  },
  useTransition: function() {
    var l = Jf(!1);
    return l = So.bind(
      null,
      U,
      l.queue,
      !0,
      !1
    ), El().memoizedState = l, [!1, l];
  },
  useSyncExternalStore: function(l, t, u) {
    var a = U, e = El();
    if (j) {
      if (u === void 0)
        throw Error(S(407));
      u = u();
    } else {
      if (u = t(), L === null)
        throw Error(S(349));
      B & 124 || I0(a, t, u);
    }
    e.memoizedState = u;
    var n = { value: u, getSnapshot: t };
    return e.queue = n, ns(lo.bind(null, a, n, l), [
      l
    ]), a.flags |= 2048, Lu(
      9,
      Dn(),
      P0.bind(
        null,
        a,
        n,
        u,
        t
      ),
      null
    ), u;
  },
  useId: function() {
    var l = El(), t = L.identifierPrefix;
    if (j) {
      var u = st, a = it;
      u = (a & ~(1 << 32 - Rl(a) - 1)).toString(32) + u, t = "«" + t + "R" + u, u = Ie++, 0 < u && (t += "H" + u.toString(32)), t += "»";
    } else
      u = Nv++, t = "«" + t + "r" + u.toString(32) + "»";
    return l.memoizedState = t;
  },
  useHostTransitionStatus: Pc,
  useFormState: us,
  useActionState: us,
  useOptimistic: function(l) {
    var t = El();
    t.memoizedState = t.baseState = l;
    var u = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return t.queue = u, t = li.bind(
      null,
      U,
      !0,
      u
    ), u.dispatch = t, [l, t];
  },
  useMemoCache: Wc,
  useCacheRefresh: function() {
    return El().memoizedState = qv.bind(
      null,
      U
    );
  }
}, Do = {
  readContext: ml,
  use: Mn,
  useCallback: ro,
  useContext: ml,
  useEffect: so,
  useImperativeHandle: ho,
  useInsertionEffect: oo,
  useLayoutEffect: yo,
  useMemo: mo,
  useReducer: xe,
  useRef: io,
  useState: function() {
    return xe(rt);
  },
  useDebugValue: Fc,
  useDeferredValue: function(l, t) {
    var u = al();
    return go(
      u,
      Z.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = xe(rt)[0], t = al().memoizedState;
    return [
      typeof l == "boolean" ? l : le(l),
      t
    ];
  },
  useSyncExternalStore: F0,
  useId: To,
  useHostTransitionStatus: Pc,
  useFormState: as,
  useActionState: as,
  useOptimistic: function(l, t) {
    var u = al();
    return ao(u, Z, l, t);
  },
  useMemoCache: Wc,
  useCacheRefresh: Ao
}, jv = {
  readContext: ml,
  use: Mn,
  useCallback: ro,
  useContext: ml,
  useEffect: so,
  useImperativeHandle: ho,
  useInsertionEffect: oo,
  useLayoutEffect: yo,
  useMemo: mo,
  useReducer: lf,
  useRef: io,
  useState: function() {
    return lf(rt);
  },
  useDebugValue: Fc,
  useDeferredValue: function(l, t) {
    var u = al();
    return Z === null ? Ic(u, l, t) : go(
      u,
      Z.memoizedState,
      l,
      t
    );
  },
  useTransition: function() {
    var l = lf(rt)[0], t = al().memoizedState;
    return [
      typeof l == "boolean" ? l : le(l),
      t
    ];
  },
  useSyncExternalStore: F0,
  useId: To,
  useHostTransitionStatus: Pc,
  useFormState: es,
  useActionState: es,
  useOptimistic: function(l, t) {
    var u = al();
    return Z !== null ? ao(u, Z, l, t) : (u.baseState = l, [l, u.queue.dispatch]);
  },
  useMemoCache: Wc,
  useCacheRefresh: Ao
}, ju = null, Ba = 0;
function ge(l) {
  var t = Ba;
  return Ba += 1, ju === null && (ju = []), J0(ju, l, t);
}
function ca(l, t) {
  t = t.props.ref, l.ref = t !== void 0 ? t : null;
}
function Se(l, t) {
  throw t.$$typeof === vy ? Error(S(525)) : (l = Object.prototype.toString.call(t), Error(
    S(
      31,
      l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
    )
  ));
}
function fs(l) {
  var t = l._init;
  return t(l._payload);
}
function po(l) {
  function t(o, s) {
    if (l) {
      var h = o.deletions;
      h === null ? (o.deletions = [s], o.flags |= 16) : h.push(s);
    }
  }
  function u(o, s) {
    if (!l) return null;
    for (; s !== null; )
      t(o, s), s = s.sibling;
    return null;
  }
  function a(o) {
    for (var s = /* @__PURE__ */ new Map(); o !== null; )
      o.key !== null ? s.set(o.key, o) : s.set(o.index, o), o = o.sibling;
    return s;
  }
  function e(o, s) {
    return o = yt(o, s), o.index = 0, o.sibling = null, o;
  }
  function n(o, s, h) {
    return o.index = h, l ? (h = o.alternate, h !== null ? (h = h.index, h < s ? (o.flags |= 67108866, s) : h) : (o.flags |= 67108866, s)) : (o.flags |= 1048576, s);
  }
  function f(o) {
    return l && o.alternate === null && (o.flags |= 67108866), o;
  }
  function c(o, s, h, g) {
    return s === null || s.tag !== 6 ? (s = Fn(h, o.mode, g), s.return = o, s) : (s = e(s, h), s.return = o, s);
  }
  function i(o, s, h, g) {
    var E = h.type;
    return E === bu ? r(
      o,
      s,
      h.props.children,
      g,
      h.key
    ) : s !== null && (s.elementType === E || typeof E == "object" && E !== null && E.$$typeof === zt && fs(E) === s.type) ? (s = e(s, h.props), ca(s, h), s.return = o, s) : (s = Re(
      h.type,
      h.key,
      h.props,
      null,
      o.mode,
      g
    ), ca(s, h), s.return = o, s);
  }
  function y(o, s, h, g) {
    return s === null || s.tag !== 4 || s.stateNode.containerInfo !== h.containerInfo || s.stateNode.implementation !== h.implementation ? (s = In(h, o.mode, g), s.return = o, s) : (s = e(s, h.children || []), s.return = o, s);
  }
  function r(o, s, h, g, E) {
    return s === null || s.tag !== 7 ? (s = Pt(
      h,
      o.mode,
      g,
      E
    ), s.return = o, s) : (s = e(s, h), s.return = o, s);
  }
  function m(o, s, h) {
    if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
      return s = Fn(
        "" + s,
        o.mode,
        h
      ), s.return = o, s;
    if (typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case oe:
          return h = Re(
            s.type,
            s.key,
            s.props,
            null,
            o.mode,
            h
          ), ca(h, s), h.return = o, h;
        case da:
          return s = In(
            s,
            o.mode,
            h
          ), s.return = o, s;
        case zt:
          var g = s._init;
          return s = g(s._payload), m(o, s, h);
      }
      if (ya(s) || aa(s))
        return s = Pt(
          s,
          o.mode,
          h,
          null
        ), s.return = o, s;
      if (typeof s.then == "function")
        return m(o, ge(s), h);
      if (s.$$typeof === ct)
        return m(
          o,
          re(o, s),
          h
        );
      Se(o, s);
    }
    return null;
  }
  function d(o, s, h, g) {
    var E = s !== null ? s.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
      return E !== null ? null : c(o, s, "" + h, g);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case oe:
          return h.key === E ? i(o, s, h, g) : null;
        case da:
          return h.key === E ? y(o, s, h, g) : null;
        case zt:
          return E = h._init, h = E(h._payload), d(o, s, h, g);
      }
      if (ya(h) || aa(h))
        return E !== null ? null : r(o, s, h, g, null);
      if (typeof h.then == "function")
        return d(
          o,
          s,
          ge(h),
          g
        );
      if (h.$$typeof === ct)
        return d(
          o,
          s,
          re(o, h),
          g
        );
      Se(o, h);
    }
    return null;
  }
  function v(o, s, h, g, E) {
    if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
      return o = o.get(h) || null, c(s, o, "" + g, E);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case oe:
          return o = o.get(
            g.key === null ? h : g.key
          ) || null, i(s, o, g, E);
        case da:
          return o = o.get(
            g.key === null ? h : g.key
          ) || null, y(s, o, g, E);
        case zt:
          var M = g._init;
          return g = M(g._payload), v(
            o,
            s,
            h,
            g,
            E
          );
      }
      if (ya(g) || aa(g))
        return o = o.get(h) || null, r(s, o, g, E, null);
      if (typeof g.then == "function")
        return v(
          o,
          s,
          h,
          ge(g),
          E
        );
      if (g.$$typeof === ct)
        return v(
          o,
          s,
          h,
          re(s, g),
          E
        );
      Se(s, g);
    }
    return null;
  }
  function b(o, s, h, g) {
    for (var E = null, M = null, z = s, O = s = 0, I = null; z !== null && O < h.length; O++) {
      z.index > O ? (I = z, z = null) : I = z.sibling;
      var Y = d(
        o,
        z,
        h[O],
        g
      );
      if (Y === null) {
        z === null && (z = I);
        break;
      }
      l && z && Y.alternate === null && t(o, z), s = n(Y, s, O), M === null ? E = Y : M.sibling = Y, M = Y, z = I;
    }
    if (O === h.length)
      return u(o, z), j && kt(o, O), E;
    if (z === null) {
      for (; O < h.length; O++)
        z = m(o, h[O], g), z !== null && (s = n(
          z,
          s,
          O
        ), M === null ? E = z : M.sibling = z, M = z);
      return j && kt(o, O), E;
    }
    for (z = a(z); O < h.length; O++)
      I = v(
        z,
        o,
        O,
        h[O],
        g
      ), I !== null && (l && I.alternate !== null && z.delete(
        I.key === null ? O : I.key
      ), s = n(
        I,
        s,
        O
      ), M === null ? E = I : M.sibling = I, M = I);
    return l && z.forEach(function(ql) {
      return t(o, ql);
    }), j && kt(o, O), E;
  }
  function T(o, s, h, g) {
    if (h == null) throw Error(S(151));
    for (var E = null, M = null, z = s, O = s = 0, I = null, Y = h.next(); z !== null && !Y.done; O++, Y = h.next()) {
      z.index > O ? (I = z, z = null) : I = z.sibling;
      var ql = d(o, z, Y.value, g);
      if (ql === null) {
        z === null && (z = I);
        break;
      }
      l && z && ql.alternate === null && t(o, z), s = n(ql, s, O), M === null ? E = ql : M.sibling = ql, M = ql, z = I;
    }
    if (Y.done)
      return u(o, z), j && kt(o, O), E;
    if (z === null) {
      for (; !Y.done; O++, Y = h.next())
        Y = m(o, Y.value, g), Y !== null && (s = n(Y, s, O), M === null ? E = Y : M.sibling = Y, M = Y);
      return j && kt(o, O), E;
    }
    for (z = a(z); !Y.done; O++, Y = h.next())
      Y = v(z, o, O, Y.value, g), Y !== null && (l && Y.alternate !== null && z.delete(Y.key === null ? O : Y.key), s = n(Y, s, O), M === null ? E = Y : M.sibling = Y, M = Y);
    return l && z.forEach(function(bt) {
      return t(o, bt);
    }), j && kt(o, O), E;
  }
  function D(o, s, h, g) {
    if (typeof h == "object" && h !== null && h.type === bu && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case oe:
          l: {
            for (var E = h.key; s !== null; ) {
              if (s.key === E) {
                if (E = h.type, E === bu) {
                  if (s.tag === 7) {
                    u(
                      o,
                      s.sibling
                    ), g = e(
                      s,
                      h.props.children
                    ), g.return = o, o = g;
                    break l;
                  }
                } else if (s.elementType === E || typeof E == "object" && E !== null && E.$$typeof === zt && fs(E) === s.type) {
                  u(
                    o,
                    s.sibling
                  ), g = e(s, h.props), ca(g, h), g.return = o, o = g;
                  break l;
                }
                u(o, s);
                break;
              } else t(o, s);
              s = s.sibling;
            }
            h.type === bu ? (g = Pt(
              h.props.children,
              o.mode,
              g,
              h.key
            ), g.return = o, o = g) : (g = Re(
              h.type,
              h.key,
              h.props,
              null,
              o.mode,
              g
            ), ca(g, h), g.return = o, o = g);
          }
          return f(o);
        case da:
          l: {
            for (E = h.key; s !== null; ) {
              if (s.key === E)
                if (s.tag === 4 && s.stateNode.containerInfo === h.containerInfo && s.stateNode.implementation === h.implementation) {
                  u(
                    o,
                    s.sibling
                  ), g = e(s, h.children || []), g.return = o, o = g;
                  break l;
                } else {
                  u(o, s);
                  break;
                }
              else t(o, s);
              s = s.sibling;
            }
            g = In(h, o.mode, g), g.return = o, o = g;
          }
          return f(o);
        case zt:
          return E = h._init, h = E(h._payload), D(
            o,
            s,
            h,
            g
          );
      }
      if (ya(h))
        return b(
          o,
          s,
          h,
          g
        );
      if (aa(h)) {
        if (E = aa(h), typeof E != "function") throw Error(S(150));
        return h = E.call(h), T(
          o,
          s,
          h,
          g
        );
      }
      if (typeof h.then == "function")
        return D(
          o,
          s,
          ge(h),
          g
        );
      if (h.$$typeof === ct)
        return D(
          o,
          s,
          re(o, h),
          g
        );
      Se(o, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint" ? (h = "" + h, s !== null && s.tag === 6 ? (u(o, s.sibling), g = e(s, h), g.return = o, o = g) : (u(o, s), g = Fn(h, o.mode, g), g.return = o, o = g), f(o)) : u(o, s);
  }
  return function(o, s, h, g) {
    try {
      Ba = 0;
      var E = D(
        o,
        s,
        h,
        g
      );
      return ju = null, E;
    } catch (z) {
      if (z === Pa || z === _n) throw z;
      var M = Ul(29, z, null, o.mode);
      return M.lanes = g, M.return = o, M;
    } finally {
    }
  };
}
var Ku = po(!0), Uo = po(!1), Vl = lt(null), Pl = null;
function Mt(l) {
  var t = l.alternate;
  $(nl, nl.current & 1), $(Vl, l), Pl === null && (t === null || Vu.current !== null || t.memoizedState !== null) && (Pl = l);
}
function No(l) {
  if (l.tag === 22) {
    if ($(nl, nl.current), $(Vl, l), Pl === null) {
      var t = l.alternate;
      t !== null && t.memoizedState !== null && (Pl = l);
    }
  } else Dt();
}
function Dt() {
  $(nl, nl.current), $(Vl, Vl.current);
}
function dt(l) {
  dl(Vl), Pl === l && (Pl = null), dl(nl);
}
var nl = lt(0);
function ln(l) {
  for (var t = l; t !== null; ) {
    if (t.tag === 13) {
      var u = t.memoizedState;
      if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || dc(u)))
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === l) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === l) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
function tf(l, t, u, a) {
  t = l.memoizedState, u = u(a, t), u = u == null ? t : K({}, t, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
}
var Wf = {
  enqueueSetState: function(l, t, u) {
    l = l._reactInternals;
    var a = Hl(), e = Yt(a);
    e.payload = t, u != null && (e.callback = u), t = qt(l, e, a), t !== null && (xl(t, l, a), Ta(t, l, a));
  },
  enqueueReplaceState: function(l, t, u) {
    l = l._reactInternals;
    var a = Hl(), e = Yt(a);
    e.tag = 1, e.payload = t, u != null && (e.callback = u), t = qt(l, e, a), t !== null && (xl(t, l, a), Ta(t, l, a));
  },
  enqueueForceUpdate: function(l, t) {
    l = l._reactInternals;
    var u = Hl(), a = Yt(u);
    a.tag = 2, t != null && (a.callback = t), t = qt(l, a, u), t !== null && (xl(t, l, u), Ta(t, l, u));
  }
};
function cs(l, t, u, a, e, n, f) {
  return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, f) : t.prototype && t.prototype.isPureReactComponent ? !xa(u, a) || !xa(e, n) : !0;
}
function is(l, t, u, a) {
  l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(u, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(u, a), t.state !== l && Wf.enqueueReplaceState(t, t.state, null);
}
function iu(l, t) {
  var u = t;
  if ("ref" in t) {
    u = {};
    for (var a in t)
      a !== "ref" && (u[a] = t[a]);
  }
  if (l = l.defaultProps) {
    u === t && (u = K({}, u));
    for (var e in l)
      u[e] === void 0 && (u[e] = l[e]);
  }
  return u;
}
var tn = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var t = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(t)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", l);
    return;
  }
  console.error(l);
};
function Ro(l) {
  tn(l);
}
function Ho(l) {
  console.error(l);
}
function xo(l) {
  tn(l);
}
function un(l, t) {
  try {
    var u = l.onUncaughtError;
    u(t.value, { componentStack: t.stack });
  } catch (a) {
    setTimeout(function() {
      throw a;
    });
  }
}
function ss(l, t, u) {
  try {
    var a = l.onCaughtError;
    a(u.value, {
      componentStack: u.stack,
      errorBoundary: t.tag === 1 ? t.stateNode : null
    });
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function kf(l, t, u) {
  return u = Yt(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
    un(l, t);
  }, u;
}
function Yo(l) {
  return l = Yt(l), l.tag = 3, l;
}
function qo(l, t, u, a) {
  var e = u.type.getDerivedStateFromError;
  if (typeof e == "function") {
    var n = a.value;
    l.payload = function() {
      return e(n);
    }, l.callback = function() {
      ss(t, u, a);
    };
  }
  var f = u.stateNode;
  f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
    ss(t, u, a), typeof e != "function" && (Bt === null ? Bt = /* @__PURE__ */ new Set([this]) : Bt.add(this));
    var c = a.stack;
    this.componentDidCatch(a.value, {
      componentStack: c !== null ? c : ""
    });
  });
}
function Gv(l, t, u, a, e) {
  if (u.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
    if (t = u.alternate, t !== null && Fa(
      t,
      u,
      e,
      !0
    ), u = Vl.current, u !== null) {
      switch (u.tag) {
        case 13:
          return Pl === null ? ec() : u.alternate === null && F === 0 && (F = 3), u.flags &= -257, u.flags |= 65536, u.lanes = e, a === Zf ? u.flags |= 16384 : (t = u.updateQueue, t === null ? u.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), vf(l, a, e)), !1;
        case 22:
          return u.flags |= 65536, a === Zf ? u.flags |= 16384 : (t = u.updateQueue, t === null ? (t = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([a])
          }, u.updateQueue = t) : (u = t.retryQueue, u === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : u.add(a)), vf(l, a, e)), !1;
      }
      throw Error(S(435, u.tag));
    }
    return vf(l, a, e), ec(), !1;
  }
  if (j)
    return t = Vl.current, t !== null ? (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = e, a !== jf && (l = Error(S(422), { cause: a }), Ya(Cl(l, u)))) : (a !== jf && (t = Error(S(423), {
      cause: a
    }), Ya(
      Cl(t, u)
    )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, a = Cl(a, u), e = kf(
      l.stateNode,
      a,
      e
    ), Pn(l, e), F !== 4 && (F = 2)), !1;
  var n = Error(S(520), { cause: a });
  if (n = Cl(n, u), Da === null ? Da = [n] : Da.push(n), F !== 4 && (F = 2), t === null) return !0;
  a = Cl(a, u), u = t;
  do {
    switch (u.tag) {
      case 3:
        return u.flags |= 65536, l = e & -e, u.lanes |= l, l = kf(u.stateNode, a, l), Pn(u, l), !1;
      case 1:
        if (t = u.type, n = u.stateNode, (u.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Bt === null || !Bt.has(n))))
          return u.flags |= 65536, e &= -e, u.lanes |= e, e = Yo(e), qo(
            e,
            l,
            u,
            a
          ), Pn(u, e), !1;
    }
    u = u.return;
  } while (u !== null);
  return !1;
}
var Bo = Error(S(461)), ol = !1;
function yl(l, t, u, a) {
  t.child = l === null ? Uo(t, null, u, a) : Ku(
    t,
    l.child,
    u,
    a
  );
}
function os(l, t, u, a, e) {
  u = u.render;
  var n = t.ref;
  if ("ref" in a) {
    var f = {};
    for (var c in a)
      c !== "ref" && (f[c] = a[c]);
  } else f = a;
  return fu(t), a = Lc(
    l,
    t,
    u,
    f,
    n,
    e
  ), c = Kc(), l !== null && !ol ? (Jc(l, t, e), mt(l, t, e)) : (j && c && jc(t), t.flags |= 1, yl(l, t, a, e), t.child);
}
function ds(l, t, u, a, e) {
  if (l === null) {
    var n = u.type;
    return typeof n == "function" && !Bc(n) && n.defaultProps === void 0 && u.compare === null ? (t.tag = 15, t.type = n, jo(
      l,
      t,
      n,
      a,
      e
    )) : (l = Re(
      u.type,
      null,
      a,
      t,
      t.mode,
      e
    ), l.ref = t.ref, l.return = t, t.child = l);
  }
  if (n = l.child, !ti(l, e)) {
    var f = n.memoizedProps;
    if (u = u.compare, u = u !== null ? u : xa, u(f, a) && l.ref === t.ref)
      return mt(l, t, e);
  }
  return t.flags |= 1, l = yt(n, a), l.ref = t.ref, l.return = t, t.child = l;
}
function jo(l, t, u, a, e) {
  if (l !== null) {
    var n = l.memoizedProps;
    if (xa(n, a) && l.ref === t.ref)
      if (ol = !1, t.pendingProps = a = n, ti(l, e))
        l.flags & 131072 && (ol = !0);
      else
        return t.lanes = l.lanes, mt(l, t, e);
  }
  return Ff(
    l,
    t,
    u,
    a,
    e
  );
}
function Go(l, t, u) {
  var a = t.pendingProps, e = a.children, n = l !== null ? l.memoizedState : null;
  if (a.mode === "hidden") {
    if (t.flags & 128) {
      if (a = n !== null ? n.baseLanes | u : u, l !== null) {
        for (e = t.child = l.child, n = 0; e !== null; )
          n = n | e.lanes | e.childLanes, e = e.sibling;
        t.childLanes = n & ~a;
      } else t.childLanes = 0, t.child = null;
      return ys(
        l,
        t,
        a,
        u
      );
    }
    if (u & 536870912)
      t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && He(
        t,
        n !== null ? n.cachePool : null
      ), n !== null ? Pi(t, n) : Kf(), No(t);
    else
      return t.lanes = t.childLanes = 536870912, ys(
        l,
        t,
        n !== null ? n.baseLanes | u : u,
        u
      );
  } else
    n !== null ? (He(t, n.cachePool), Pi(t, n), Dt(), t.memoizedState = null) : (l !== null && He(t, null), Kf(), Dt());
  return yl(l, t, e, u), t.child;
}
function ys(l, t, u, a) {
  var e = Qc();
  return e = e === null ? null : { parent: el._currentValue, pool: e }, t.memoizedState = {
    baseLanes: u,
    cachePool: e
  }, l !== null && He(t, null), Kf(), No(t), l !== null && Fa(l, t, a, !0), null;
}
function qe(l, t) {
  var u = t.ref;
  if (u === null)
    l !== null && l.ref !== null && (t.flags |= 4194816);
  else {
    if (typeof u != "function" && typeof u != "object")
      throw Error(S(284));
    (l === null || l.ref !== u) && (t.flags |= 4194816);
  }
}
function Ff(l, t, u, a, e) {
  return fu(t), u = Lc(
    l,
    t,
    u,
    a,
    void 0,
    e
  ), a = Kc(), l !== null && !ol ? (Jc(l, t, e), mt(l, t, e)) : (j && a && jc(t), t.flags |= 1, yl(l, t, u, e), t.child);
}
function vs(l, t, u, a, e, n) {
  return fu(t), t.updateQueue = null, u = k0(
    t,
    a,
    u,
    e
  ), W0(l), a = Kc(), l !== null && !ol ? (Jc(l, t, n), mt(l, t, n)) : (j && a && jc(t), t.flags |= 1, yl(l, t, u, n), t.child);
}
function hs(l, t, u, a, e) {
  if (fu(t), t.stateNode === null) {
    var n = Du, f = u.contextType;
    typeof f == "object" && f !== null && (n = ml(f)), n = new u(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Wf, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Cc(t), f = u.contextType, n.context = typeof f == "object" && f !== null ? ml(f) : Du, n.state = t.memoizedState, f = u.getDerivedStateFromProps, typeof f == "function" && (tf(
      t,
      u,
      f,
      a
    ), n.state = t.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && Wf.enqueueReplaceState(n, n.state, null), za(t, a, n, e), Aa(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
  } else if (l === null) {
    n = t.stateNode;
    var c = t.memoizedProps, i = iu(u, c);
    n.props = i;
    var y = n.context, r = u.contextType;
    f = Du, typeof r == "object" && r !== null && (f = ml(r));
    var m = u.getDerivedStateFromProps;
    r = typeof m == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, r || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || y !== f) && is(
      t,
      n,
      a,
      f
    ), Ot = !1;
    var d = t.memoizedState;
    n.state = d, za(t, a, n, e), Aa(), y = t.memoizedState, c || d !== y || Ot ? (typeof m == "function" && (tf(
      t,
      u,
      m,
      a
    ), y = t.memoizedState), (i = Ot || cs(
      t,
      u,
      i,
      a,
      d,
      y,
      f
    )) ? (r || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = y), n.props = a, n.state = y, n.context = f, a = i) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
  } else {
    n = t.stateNode, Vf(l, t), f = t.memoizedProps, r = iu(u, f), n.props = r, m = t.pendingProps, d = n.context, y = u.contextType, i = Du, typeof y == "object" && y !== null && (i = ml(y)), c = u.getDerivedStateFromProps, (y = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== m || d !== i) && is(
      t,
      n,
      a,
      i
    ), Ot = !1, d = t.memoizedState, n.state = d, za(t, a, n, e), Aa();
    var v = t.memoizedState;
    f !== m || d !== v || Ot || l !== null && l.dependencies !== null && We(l.dependencies) ? (typeof c == "function" && (tf(
      t,
      u,
      c,
      a
    ), v = t.memoizedState), (r = Ot || cs(
      t,
      u,
      r,
      a,
      d,
      v,
      i
    ) || l !== null && l.dependencies !== null && We(l.dependencies)) ? (y || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, v, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
      a,
      v,
      i
    )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && d === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && d === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = v), n.props = a, n.state = v, n.context = i, a = r) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && d === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && d === l.memoizedState || (t.flags |= 1024), a = !1);
  }
  return n = a, qe(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, u = a && typeof u.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = Ku(
    t,
    l.child,
    null,
    e
  ), t.child = Ku(
    t,
    null,
    u,
    e
  )) : yl(l, t, u, e), t.memoizedState = n.state, l = t.child) : l = mt(
    l,
    t,
    e
  ), l;
}
function rs(l, t, u, a) {
  return ka(), t.flags |= 256, yl(l, t, u, a), t.child;
}
var uf = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null
};
function af(l) {
  return { baseLanes: l, cachePool: L0() };
}
function ef(l, t, u) {
  return l = l !== null ? l.childLanes & ~u : 0, t && (l |= Zl), l;
}
function Xo(l, t, u) {
  var a = t.pendingProps, e = !1, n = (t.flags & 128) !== 0, f;
  if ((f = n) || (f = l !== null && l.memoizedState === null ? !1 : (nl.current & 2) !== 0), f && (e = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
    if (j) {
      if (e ? Mt(t) : Dt(), j) {
        var c = k, i;
        if (i = c) {
          l: {
            for (i = c, c = Wl; i.nodeType !== 8; ) {
              if (!c) {
                c = null;
                break l;
              }
              if (i = Jl(
                i.nextSibling
              ), i === null) {
                c = null;
                break l;
              }
            }
            c = i;
          }
          c !== null ? (t.memoizedState = {
            dehydrated: c,
            treeContext: lu !== null ? { id: it, overflow: st } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, i = Ul(
            18,
            null,
            null,
            0
          ), i.stateNode = c, i.return = t, t.child = i, gl = t, k = null, i = !0) : i = !1;
        }
        i || nu(t);
      }
      if (c = t.memoizedState, c !== null && (c = c.dehydrated, c !== null))
        return dc(c) ? t.lanes = 32 : t.lanes = 536870912, null;
      dt(t);
    }
    return c = a.children, a = a.fallback, e ? (Dt(), e = t.mode, c = an(
      { mode: "hidden", children: c },
      e
    ), a = Pt(
      a,
      e,
      u,
      null
    ), c.return = t, a.return = t, c.sibling = a, t.child = c, e = t.child, e.memoizedState = af(u), e.childLanes = ef(
      l,
      f,
      u
    ), t.memoizedState = uf, a) : (Mt(t), If(t, c));
  }
  if (i = l.memoizedState, i !== null && (c = i.dehydrated, c !== null)) {
    if (n)
      t.flags & 256 ? (Mt(t), t.flags &= -257, t = nf(
        l,
        t,
        u
      )) : t.memoizedState !== null ? (Dt(), t.child = l.child, t.flags |= 128, t = null) : (Dt(), e = a.fallback, c = t.mode, a = an(
        { mode: "visible", children: a.children },
        c
      ), e = Pt(
        e,
        c,
        u,
        null
      ), e.flags |= 2, a.return = t, e.return = t, a.sibling = e, t.child = a, Ku(
        t,
        l.child,
        null,
        u
      ), a = t.child, a.memoizedState = af(u), a.childLanes = ef(
        l,
        f,
        u
      ), t.memoizedState = uf, t = e);
    else if (Mt(t), dc(c)) {
      if (f = c.nextSibling && c.nextSibling.dataset, f) var y = f.dgst;
      f = y, a = Error(S(419)), a.stack = "", a.digest = f, Ya({ value: a, source: null, stack: null }), t = nf(
        l,
        t,
        u
      );
    } else if (ol || Fa(l, t, u, !1), f = (u & l.childLanes) !== 0, ol || f) {
      if (f = L, f !== null && (a = u & -u, a = a & 42 ? 1 : _c(a), a = a & (f.suspendedLanes | u) ? 0 : a, a !== 0 && a !== i.retryLane))
        throw i.retryLane = a, Pu(l, a), xl(f, l, a), Bo;
      c.data === "$?" || ec(), t = nf(
        l,
        t,
        u
      );
    } else
      c.data === "$?" ? (t.flags |= 192, t.child = l.child, t = null) : (l = i.treeContext, k = Jl(
        c.nextSibling
      ), gl = t, j = !0, tu = null, Wl = !1, l !== null && (Gl[Xl++] = it, Gl[Xl++] = st, Gl[Xl++] = lu, it = l.id, st = l.overflow, lu = t), t = If(
        t,
        a.children
      ), t.flags |= 4096);
    return t;
  }
  return e ? (Dt(), e = a.fallback, c = t.mode, i = l.child, y = i.sibling, a = yt(i, {
    mode: "hidden",
    children: a.children
  }), a.subtreeFlags = i.subtreeFlags & 65011712, y !== null ? e = yt(y, e) : (e = Pt(
    e,
    c,
    u,
    null
  ), e.flags |= 2), e.return = t, a.return = t, a.sibling = e, t.child = a, a = e, e = t.child, c = l.child.memoizedState, c === null ? c = af(u) : (i = c.cachePool, i !== null ? (y = el._currentValue, i = i.parent !== y ? { parent: y, pool: y } : i) : i = L0(), c = {
    baseLanes: c.baseLanes | u,
    cachePool: i
  }), e.memoizedState = c, e.childLanes = ef(
    l,
    f,
    u
  ), t.memoizedState = uf, a) : (Mt(t), u = l.child, l = u.sibling, u = yt(u, {
    mode: "visible",
    children: a.children
  }), u.return = t, u.sibling = null, l !== null && (f = t.deletions, f === null ? (t.deletions = [l], t.flags |= 16) : f.push(l)), t.child = u, t.memoizedState = null, u);
}
function If(l, t) {
  return t = an(
    { mode: "visible", children: t },
    l.mode
  ), t.return = l, l.child = t;
}
function an(l, t) {
  return l = Ul(22, l, null, t), l.lanes = 0, l.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  }, l;
}
function nf(l, t, u) {
  return Ku(t, l.child, null, u), l = If(
    t,
    t.pendingProps.children
  ), l.flags |= 2, t.memoizedState = null, l;
}
function ms(l, t, u) {
  l.lanes |= t;
  var a = l.alternate;
  a !== null && (a.lanes |= t), Xf(l.return, t, u);
}
function ff(l, t, u, a, e) {
  var n = l.memoizedState;
  n === null ? l.memoizedState = {
    isBackwards: t,
    rendering: null,
    renderingStartTime: 0,
    last: a,
    tail: u,
    tailMode: e
  } : (n.isBackwards = t, n.rendering = null, n.renderingStartTime = 0, n.last = a, n.tail = u, n.tailMode = e);
}
function Qo(l, t, u) {
  var a = t.pendingProps, e = a.revealOrder, n = a.tail;
  if (yl(l, t, a.children, u), a = nl.current, a & 2)
    a = a & 1 | 2, t.flags |= 128;
  else {
    if (l !== null && l.flags & 128)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && ms(l, u, t);
        else if (l.tag === 19)
          ms(l, u, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    a &= 1;
  }
  switch ($(nl, a), e) {
    case "forwards":
      for (u = t.child, e = null; u !== null; )
        l = u.alternate, l !== null && ln(l) === null && (e = u), u = u.sibling;
      u = e, u === null ? (e = t.child, t.child = null) : (e = u.sibling, u.sibling = null), ff(
        t,
        !1,
        e,
        u,
        n
      );
      break;
    case "backwards":
      for (u = null, e = t.child, t.child = null; e !== null; ) {
        if (l = e.alternate, l !== null && ln(l) === null) {
          t.child = e;
          break;
        }
        l = e.sibling, e.sibling = u, u = e, e = l;
      }
      ff(
        t,
        !0,
        u,
        null,
        n
      );
      break;
    case "together":
      ff(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function mt(l, t, u) {
  if (l !== null && (t.dependencies = l.dependencies), Vt |= t.lanes, !(u & t.childLanes))
    if (l !== null) {
      if (Fa(
        l,
        t,
        u,
        !1
      ), (u & t.childLanes) === 0)
        return null;
    } else return null;
  if (l !== null && t.child !== l.child)
    throw Error(S(153));
  if (t.child !== null) {
    for (l = t.child, u = yt(l, l.pendingProps), t.child = u, u.return = t; l.sibling !== null; )
      l = l.sibling, u = u.sibling = yt(l, l.pendingProps), u.return = t;
    u.sibling = null;
  }
  return t.child;
}
function ti(l, t) {
  return l.lanes & t ? !0 : (l = l.dependencies, !!(l !== null && We(l)));
}
function Xv(l, t, u) {
  switch (t.tag) {
    case 3:
      Ce(t, t.stateNode.containerInfo), _t(t, el, l.memoizedState.cache), ka();
      break;
    case 27:
    case 5:
      Df(t);
      break;
    case 4:
      Ce(t, t.stateNode.containerInfo);
      break;
    case 10:
      _t(
        t,
        t.type,
        t.memoizedProps.value
      );
      break;
    case 13:
      var a = t.memoizedState;
      if (a !== null)
        return a.dehydrated !== null ? (Mt(t), t.flags |= 128, null) : u & t.child.childLanes ? Xo(l, t, u) : (Mt(t), l = mt(
          l,
          t,
          u
        ), l !== null ? l.sibling : null);
      Mt(t);
      break;
    case 19:
      var e = (l.flags & 128) !== 0;
      if (a = (u & t.childLanes) !== 0, a || (Fa(
        l,
        t,
        u,
        !1
      ), a = (u & t.childLanes) !== 0), e) {
        if (a)
          return Qo(
            l,
            t,
            u
          );
        t.flags |= 128;
      }
      if (e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), $(nl, nl.current), a) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Go(l, t, u);
    case 24:
      _t(t, el, l.memoizedState.cache);
  }
  return mt(l, t, u);
}
function Co(l, t, u) {
  if (l !== null)
    if (l.memoizedProps !== t.pendingProps)
      ol = !0;
    else {
      if (!ti(l, u) && !(t.flags & 128))
        return ol = !1, Xv(
          l,
          t,
          u
        );
      ol = !!(l.flags & 131072);
    }
  else
    ol = !1, j && t.flags & 1048576 && Z0(t, $e, t.index);
  switch (t.lanes = 0, t.tag) {
    case 16:
      l: {
        l = t.pendingProps;
        var a = t.elementType, e = a._init;
        if (a = e(a._payload), t.type = a, typeof a == "function")
          Bc(a) ? (l = iu(a, l), t.tag = 1, t = hs(
            null,
            t,
            a,
            l,
            u
          )) : (t.tag = 0, t = Ff(
            null,
            t,
            a,
            l,
            u
          ));
        else {
          if (a != null) {
            if (e = a.$$typeof, e === Ac) {
              t.tag = 11, t = os(
                null,
                t,
                a,
                l,
                u
              );
              break l;
            } else if (e === zc) {
              t.tag = 14, t = ds(
                null,
                t,
                a,
                l,
                u
              );
              break l;
            }
          }
          throw t = _f(a) || a, Error(S(306, t, ""));
        }
      }
      return t;
    case 0:
      return Ff(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 1:
      return a = t.type, e = iu(
        a,
        t.pendingProps
      ), hs(
        l,
        t,
        a,
        e,
        u
      );
    case 3:
      l: {
        if (Ce(
          t,
          t.stateNode.containerInfo
        ), l === null) throw Error(S(387));
        a = t.pendingProps;
        var n = t.memoizedState;
        e = n.element, Vf(l, t), za(t, a, null, u);
        var f = t.memoizedState;
        if (a = f.cache, _t(t, el, a), a !== n.cache && Qf(
          t,
          [el],
          u,
          !0
        ), Aa(), a = f.element, n.isDehydrated)
          if (n = {
            element: a,
            isDehydrated: !1,
            cache: f.cache
          }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
            t = rs(
              l,
              t,
              a,
              u
            );
            break l;
          } else if (a !== e) {
            e = Cl(
              Error(S(424)),
              t
            ), Ya(e), t = rs(
              l,
              t,
              a,
              u
            );
            break l;
          } else {
            switch (l = t.stateNode.containerInfo, l.nodeType) {
              case 9:
                l = l.body;
                break;
              default:
                l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
            }
            for (k = Jl(l.firstChild), gl = t, j = !0, tu = null, Wl = !0, u = Uo(
              t,
              null,
              a,
              u
            ), t.child = u; u; )
              u.flags = u.flags & -3 | 4096, u = u.sibling;
          }
        else {
          if (ka(), a === e) {
            t = mt(
              l,
              t,
              u
            );
            break l;
          }
          yl(
            l,
            t,
            a,
            u
          );
        }
        t = t.child;
      }
      return t;
    case 26:
      return qe(l, t), l === null ? (u = xs(
        t.type,
        null,
        t.pendingProps,
        null
      )) ? t.memoizedState = u : j || (u = t.type, l = t.pendingProps, a = dn(
        xt.current
      ).createElement(u), a[rl] = t, a[zl] = l, hl(a, u, l), sl(a), t.stateNode = a) : t.memoizedState = xs(
        t.type,
        l.memoizedProps,
        t.pendingProps,
        l.memoizedState
      ), null;
    case 27:
      return Df(t), l === null && j && (a = t.stateNode = Dd(
        t.type,
        t.pendingProps,
        xt.current
      ), gl = t, Wl = !0, e = k, Kt(t.type) ? (yc = e, k = Jl(
        a.firstChild
      )) : k = e), yl(
        l,
        t,
        t.pendingProps.children,
        u
      ), qe(l, t), l === null && (t.flags |= 4194304), t.child;
    case 5:
      return l === null && j && ((e = a = k) && (a = vh(
        a,
        t.type,
        t.pendingProps,
        Wl
      ), a !== null ? (t.stateNode = a, gl = t, k = Jl(
        a.firstChild
      ), Wl = !1, e = !0) : e = !1), e || nu(t)), Df(t), e = t.type, n = t.pendingProps, f = l !== null ? l.memoizedProps : null, a = n.children, sc(e, n) ? a = null : f !== null && sc(e, f) && (t.flags |= 32), t.memoizedState !== null && (e = Lc(
        l,
        t,
        Rv,
        null,
        null,
        u
      ), Qa._currentValue = e), qe(l, t), yl(l, t, a, u), t.child;
    case 6:
      return l === null && j && ((l = u = k) && (u = hh(
        u,
        t.pendingProps,
        Wl
      ), u !== null ? (t.stateNode = u, gl = t, k = null, l = !0) : l = !1), l || nu(t)), null;
    case 13:
      return Xo(l, t, u);
    case 4:
      return Ce(
        t,
        t.stateNode.containerInfo
      ), a = t.pendingProps, l === null ? t.child = Ku(
        t,
        null,
        a,
        u
      ) : yl(
        l,
        t,
        a,
        u
      ), t.child;
    case 11:
      return os(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 7:
      return yl(
        l,
        t,
        t.pendingProps,
        u
      ), t.child;
    case 8:
      return yl(
        l,
        t,
        t.pendingProps.children,
        u
      ), t.child;
    case 12:
      return yl(
        l,
        t,
        t.pendingProps.children,
        u
      ), t.child;
    case 10:
      return a = t.pendingProps, _t(t, t.type, a.value), yl(
        l,
        t,
        a.children,
        u
      ), t.child;
    case 9:
      return e = t.type._context, a = t.pendingProps.children, fu(t), e = ml(e), a = a(e), t.flags |= 1, yl(l, t, a, u), t.child;
    case 14:
      return ds(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 15:
      return jo(
        l,
        t,
        t.type,
        t.pendingProps,
        u
      );
    case 19:
      return Qo(l, t, u);
    case 31:
      return a = t.pendingProps, u = t.mode, a = {
        mode: a.mode,
        children: a.children
      }, l === null ? (u = an(
        a,
        u
      ), u.ref = t.ref, t.child = u, u.return = t, t = u) : (u = yt(l.child, a), u.ref = t.ref, t.child = u, u.return = t, t = u), t;
    case 22:
      return Go(l, t, u);
    case 24:
      return fu(t), a = ml(el), l === null ? (e = Qc(), e === null && (e = L, n = Xc(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= u), e = n), t.memoizedState = {
        parent: a,
        cache: e
      }, Cc(t), _t(t, el, e)) : (l.lanes & u && (Vf(l, t), za(t, null, null, u), Aa()), e = l.memoizedState, n = t.memoizedState, e.parent !== a ? (e = { parent: a, cache: a }, t.memoizedState = e, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = e), _t(t, el, a)) : (a = n.cache, _t(t, el, a), a !== e.cache && Qf(
        t,
        [el],
        u,
        !0
      ))), yl(
        l,
        t,
        t.pendingProps.children,
        u
      ), t.child;
    case 29:
      throw t.pendingProps;
  }
  throw Error(S(156, t.tag));
}
function at(l) {
  l.flags |= 4;
}
function gs(l, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4)
    l.flags &= -16777217;
  else if (l.flags |= 16777216, !Nd(t)) {
    if (t = Vl.current, t !== null && ((B & 4194048) === B ? Pl !== null : (B & 62914560) !== B && !(B & 536870912) || t !== Pl))
      throw Ea = Zf, K0;
    l.flags |= 8192;
  }
}
function be(l, t) {
  t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? y0() : 536870912, l.lanes |= t, Ju |= t);
}
function ia(l, t) {
  if (!j)
    switch (l.tailMode) {
      case "hidden":
        t = l.tail;
        for (var u = null; t !== null; )
          t.alternate !== null && (u = t), t = t.sibling;
        u === null ? l.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = l.tail;
        for (var a = null; u !== null; )
          u.alternate !== null && (a = u), u = u.sibling;
        a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
    }
}
function W(l) {
  var t = l.alternate !== null && l.alternate.child === l.child, u = 0, a = 0;
  if (t)
    for (var e = l.child; e !== null; )
      u |= e.lanes | e.childLanes, a |= e.subtreeFlags & 65011712, a |= e.flags & 65011712, e.return = l, e = e.sibling;
  else
    for (e = l.child; e !== null; )
      u |= e.lanes | e.childLanes, a |= e.subtreeFlags, a |= e.flags, e.return = l, e = e.sibling;
  return l.subtreeFlags |= a, l.childLanes = u, t;
}
function Qv(l, t, u) {
  var a = t.pendingProps;
  switch (Gc(t), t.tag) {
    case 31:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return W(t), null;
    case 1:
      return W(t), null;
    case 3:
      return u = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), vt(el), Xu(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (fa(t) ? at(t) : l === null || l.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, wi())), W(t), null;
    case 26:
      return u = t.memoizedState, l === null ? (at(t), u !== null ? (W(t), gs(t, u)) : (W(t), t.flags &= -16777217)) : u ? u !== l.memoizedState ? (at(t), W(t), gs(t, u)) : (W(t), t.flags &= -16777217) : (l.memoizedProps !== a && at(t), W(t), t.flags &= -16777217), null;
    case 27:
      Ze(t), u = xt.current;
      var e = t.type;
      if (l !== null && t.stateNode != null)
        l.memoizedProps !== a && at(t);
      else {
        if (!a) {
          if (t.stateNode === null)
            throw Error(S(166));
          return W(t), null;
        }
        l = Fl.current, fa(t) ? Ki(t) : (l = Dd(e, a, u), t.stateNode = l, at(t));
      }
      return W(t), null;
    case 5:
      if (Ze(t), u = t.type, l !== null && t.stateNode != null)
        l.memoizedProps !== a && at(t);
      else {
        if (!a) {
          if (t.stateNode === null)
            throw Error(S(166));
          return W(t), null;
        }
        if (l = Fl.current, fa(t))
          Ki(t);
        else {
          switch (e = dn(
            xt.current
          ), l) {
            case 1:
              l = e.createElementNS(
                "http://www.w3.org/2000/svg",
                u
              );
              break;
            case 2:
              l = e.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                u
              );
              break;
            default:
              switch (u) {
                case "svg":
                  l = e.createElementNS(
                    "http://www.w3.org/2000/svg",
                    u
                  );
                  break;
                case "math":
                  l = e.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    u
                  );
                  break;
                case "script":
                  l = e.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                  break;
                case "select":
                  l = typeof a.is == "string" ? e.createElement("select", { is: a.is }) : e.createElement("select"), a.multiple ? l.multiple = !0 : a.size && (l.size = a.size);
                  break;
                default:
                  l = typeof a.is == "string" ? e.createElement(u, { is: a.is }) : e.createElement(u);
              }
          }
          l[rl] = t, l[zl] = a;
          l: for (e = t.child; e !== null; ) {
            if (e.tag === 5 || e.tag === 6)
              l.appendChild(e.stateNode);
            else if (e.tag !== 4 && e.tag !== 27 && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break l;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break l;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
          t.stateNode = l;
          l: switch (hl(l, u, a), u) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              l = !!a.autoFocus;
              break l;
            case "img":
              l = !0;
              break l;
            default:
              l = !1;
          }
          l && at(t);
        }
      }
      return W(t), t.flags &= -16777217, null;
    case 6:
      if (l && t.stateNode != null)
        l.memoizedProps !== a && at(t);
      else {
        if (typeof a != "string" && t.stateNode === null)
          throw Error(S(166));
        if (l = xt.current, fa(t)) {
          if (l = t.stateNode, u = t.memoizedProps, a = null, e = gl, e !== null)
            switch (e.tag) {
              case 27:
              case 5:
                a = e.memoizedProps;
            }
          l[rl] = t, l = !!(l.nodeValue === u || a !== null && a.suppressHydrationWarning === !0 || Od(l.nodeValue, u)), l || nu(t);
        } else
          l = dn(l).createTextNode(
            a
          ), l[rl] = t, t.stateNode = l;
      }
      return W(t), null;
    case 13:
      if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
        if (e = fa(t), a !== null && a.dehydrated !== null) {
          if (l === null) {
            if (!e) throw Error(S(318));
            if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(S(317));
            e[rl] = t;
          } else
            ka(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          W(t), e = !1;
        } else
          e = wi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
        if (!e)
          return t.flags & 256 ? (dt(t), t) : (dt(t), null);
      }
      if (dt(t), t.flags & 128)
        return t.lanes = u, t;
      if (u = a !== null, l = l !== null && l.memoizedState !== null, u) {
        a = t.child, e = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (e = a.alternate.memoizedState.cachePool.pool);
        var n = null;
        a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== e && (a.flags |= 2048);
      }
      return u !== l && u && (t.child.flags |= 8192), be(t, t.updateQueue), W(t), null;
    case 4:
      return Xu(), l === null && si(t.stateNode.containerInfo), W(t), null;
    case 10:
      return vt(t.type), W(t), null;
    case 19:
      if (dl(nl), e = t.memoizedState, e === null) return W(t), null;
      if (a = (t.flags & 128) !== 0, n = e.rendering, n === null)
        if (a) ia(e, !1);
        else {
          if (F !== 0 || l !== null && l.flags & 128)
            for (l = t.child; l !== null; ) {
              if (n = ln(l), n !== null) {
                for (t.flags |= 128, ia(e, !1), l = n.updateQueue, t.updateQueue = l, be(t, l), t.subtreeFlags = 0, l = u, u = t.child; u !== null; )
                  C0(u, l), u = u.sibling;
                return $(
                  nl,
                  nl.current & 1 | 2
                ), t.child;
              }
              l = l.sibling;
            }
          e.tail !== null && Il() > nn && (t.flags |= 128, a = !0, ia(e, !1), t.lanes = 4194304);
        }
      else {
        if (!a)
          if (l = ln(n), l !== null) {
            if (t.flags |= 128, a = !0, l = l.updateQueue, t.updateQueue = l, be(t, l), ia(e, !0), e.tail === null && e.tailMode === "hidden" && !n.alternate && !j)
              return W(t), null;
          } else
            2 * Il() - e.renderingStartTime > nn && u !== 536870912 && (t.flags |= 128, a = !0, ia(e, !1), t.lanes = 4194304);
        e.isBackwards ? (n.sibling = t.child, t.child = n) : (l = e.last, l !== null ? l.sibling = n : t.child = n, e.last = n);
      }
      return e.tail !== null ? (t = e.tail, e.rendering = t, e.tail = t.sibling, e.renderingStartTime = Il(), t.sibling = null, l = nl.current, $(nl, a ? l & 1 | 2 : l & 1), t) : (W(t), null);
    case 22:
    case 23:
      return dt(t), Zc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? u & 536870912 && !(t.flags & 128) && (W(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : W(t), u = t.updateQueue, u !== null && be(t, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== u && (t.flags |= 2048), l !== null && dl(uu), null;
    case 24:
      return u = null, l !== null && (u = l.memoizedState.cache), t.memoizedState.cache !== u && (t.flags |= 2048), vt(el), W(t), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(S(156, t.tag));
}
function Cv(l, t) {
  switch (Gc(t), t.tag) {
    case 1:
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 3:
      return vt(el), Xu(), l = t.flags, l & 65536 && !(l & 128) ? (t.flags = l & -65537 | 128, t) : null;
    case 26:
    case 27:
    case 5:
      return Ze(t), null;
    case 13:
      if (dt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
        if (t.alternate === null)
          throw Error(S(340));
        ka();
      }
      return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 19:
      return dl(nl), null;
    case 4:
      return Xu(), null;
    case 10:
      return vt(t.type), null;
    case 22:
    case 23:
      return dt(t), Zc(), l !== null && dl(uu), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
    case 24:
      return vt(el), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function Zo(l, t) {
  switch (Gc(t), t.tag) {
    case 3:
      vt(el), Xu();
      break;
    case 26:
    case 27:
    case 5:
      Ze(t);
      break;
    case 4:
      Xu();
      break;
    case 13:
      dt(t);
      break;
    case 19:
      dl(nl);
      break;
    case 10:
      vt(t.type);
      break;
    case 22:
    case 23:
      dt(t), Zc(), l !== null && dl(uu);
      break;
    case 24:
      vt(el);
  }
}
function ue(l, t) {
  try {
    var u = t.updateQueue, a = u !== null ? u.lastEffect : null;
    if (a !== null) {
      var e = a.next;
      u = e;
      do {
        if ((u.tag & l) === l) {
          a = void 0;
          var n = u.create, f = u.inst;
          a = n(), f.destroy = a;
        }
        u = u.next;
      } while (u !== e);
    }
  } catch (c) {
    V(t, t.return, c);
  }
}
function Zt(l, t, u) {
  try {
    var a = t.updateQueue, e = a !== null ? a.lastEffect : null;
    if (e !== null) {
      var n = e.next;
      a = n;
      do {
        if ((a.tag & l) === l) {
          var f = a.inst, c = f.destroy;
          if (c !== void 0) {
            f.destroy = void 0, e = t;
            var i = u, y = c;
            try {
              y();
            } catch (r) {
              V(
                e,
                i,
                r
              );
            }
          }
        }
        a = a.next;
      } while (a !== n);
    }
  } catch (r) {
    V(t, t.return, r);
  }
}
function Vo(l) {
  var t = l.updateQueue;
  if (t !== null) {
    var u = l.stateNode;
    try {
      $0(t, u);
    } catch (a) {
      V(l, l.return, a);
    }
  }
}
function Lo(l, t, u) {
  u.props = iu(
    l.type,
    l.memoizedProps
  ), u.state = l.memoizedState;
  try {
    u.componentWillUnmount();
  } catch (a) {
    V(l, t, a);
  }
}
function _a(l, t) {
  try {
    var u = l.ref;
    if (u !== null) {
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          var a = l.stateNode;
          break;
        case 30:
          a = l.stateNode;
          break;
        default:
          a = l.stateNode;
      }
      typeof u == "function" ? l.refCleanup = u(a) : u.current = a;
    }
  } catch (e) {
    V(l, t, e);
  }
}
function kl(l, t) {
  var u = l.ref, a = l.refCleanup;
  if (u !== null)
    if (typeof a == "function")
      try {
        a();
      } catch (e) {
        V(l, t, e);
      } finally {
        l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
      }
    else if (typeof u == "function")
      try {
        u(null);
      } catch (e) {
        V(l, t, e);
      }
    else u.current = null;
}
function Ko(l) {
  var t = l.type, u = l.memoizedProps, a = l.stateNode;
  try {
    l: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        u.autoFocus && a.focus();
        break l;
      case "img":
        u.src ? a.src = u.src : u.srcSet && (a.srcset = u.srcSet);
    }
  } catch (e) {
    V(l, l.return, e);
  }
}
function cf(l, t, u) {
  try {
    var a = l.stateNode;
    ih(a, l.type, u, t), a[zl] = t;
  } catch (e) {
    V(l, l.return, e);
  }
}
function Jo(l) {
  return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Kt(l.type) || l.tag === 4;
}
function sf(l) {
  l: for (; ; ) {
    for (; l.sibling === null; ) {
      if (l.return === null || Jo(l.return)) return null;
      l = l.return;
    }
    for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
      if (l.tag === 27 && Kt(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
      l.child.return = l, l = l.child;
    }
    if (!(l.flags & 2)) return l.stateNode;
  }
}
function Pf(l, t, u) {
  var a = l.tag;
  if (a === 5 || a === 6)
    l = l.stateNode, t ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, t) : (t = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, t.appendChild(l), u = u._reactRootContainer, u != null || t.onclick !== null || (t.onclick = Hn));
  else if (a !== 4 && (a === 27 && Kt(l.type) && (u = l.stateNode, t = null), l = l.child, l !== null))
    for (Pf(l, t, u), l = l.sibling; l !== null; )
      Pf(l, t, u), l = l.sibling;
}
function en(l, t, u) {
  var a = l.tag;
  if (a === 5 || a === 6)
    l = l.stateNode, t ? u.insertBefore(l, t) : u.appendChild(l);
  else if (a !== 4 && (a === 27 && Kt(l.type) && (u = l.stateNode), l = l.child, l !== null))
    for (en(l, t, u), l = l.sibling; l !== null; )
      en(l, t, u), l = l.sibling;
}
function wo(l) {
  var t = l.stateNode, u = l.memoizedProps;
  try {
    for (var a = l.type, e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    hl(t, a, u), t[rl] = l, t[zl] = u;
  } catch (n) {
    V(l, l.return, n);
  }
}
var ft = !1, tl = !1, of = !1, Ss = typeof WeakSet == "function" ? WeakSet : Set, il = null;
function Zv(l, t) {
  if (l = l.containerInfo, cc = rn, l = x0(l), xc(l)) {
    if ("selectionStart" in l)
      var u = {
        start: l.selectionStart,
        end: l.selectionEnd
      };
    else
      l: {
        u = (u = l.ownerDocument) && u.defaultView || window;
        var a = u.getSelection && u.getSelection();
        if (a && a.rangeCount !== 0) {
          u = a.anchorNode;
          var e = a.anchorOffset, n = a.focusNode;
          a = a.focusOffset;
          try {
            u.nodeType, n.nodeType;
          } catch {
            u = null;
            break l;
          }
          var f = 0, c = -1, i = -1, y = 0, r = 0, m = l, d = null;
          t: for (; ; ) {
            for (var v; m !== u || e !== 0 && m.nodeType !== 3 || (c = f + e), m !== n || a !== 0 && m.nodeType !== 3 || (i = f + a), m.nodeType === 3 && (f += m.nodeValue.length), (v = m.firstChild) !== null; )
              d = m, m = v;
            for (; ; ) {
              if (m === l) break t;
              if (d === u && ++y === e && (c = f), d === n && ++r === a && (i = f), (v = m.nextSibling) !== null) break;
              m = d, d = m.parentNode;
            }
            m = v;
          }
          u = c === -1 || i === -1 ? null : { start: c, end: i };
        } else u = null;
      }
    u = u || { start: 0, end: 0 };
  } else u = null;
  for (ic = { focusedElem: l, selectionRange: u }, rn = !1, il = t; il !== null; )
    if (t = il, l = t.child, (t.subtreeFlags & 1024) !== 0 && l !== null)
      l.return = t, il = l;
    else
      for (; il !== null; ) {
        switch (t = il, n = t.alternate, l = t.flags, t.tag) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (l & 1024 && n !== null) {
              l = void 0, u = t, e = n.memoizedProps, n = n.memoizedState, a = u.stateNode;
              try {
                var b = iu(
                  u.type,
                  e,
                  u.elementType === u.type
                );
                l = a.getSnapshotBeforeUpdate(
                  b,
                  n
                ), a.__reactInternalSnapshotBeforeUpdate = l;
              } catch (T) {
                V(
                  u,
                  u.return,
                  T
                );
              }
            }
            break;
          case 3:
            if (l & 1024) {
              if (l = t.stateNode.containerInfo, u = l.nodeType, u === 9)
                oc(l);
              else if (u === 1)
                switch (l.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    oc(l);
                    break;
                  default:
                    l.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (l & 1024) throw Error(S(163));
        }
        if (l = t.sibling, l !== null) {
          l.return = t.return, il = l;
          break;
        }
        il = t.return;
      }
}
function $o(l, t, u) {
  var a = u.flags;
  switch (u.tag) {
    case 0:
    case 11:
    case 15:
      Tt(l, u), a & 4 && ue(5, u);
      break;
    case 1:
      if (Tt(l, u), a & 4)
        if (l = u.stateNode, t === null)
          try {
            l.componentDidMount();
          } catch (f) {
            V(u, u.return, f);
          }
        else {
          var e = iu(
            u.type,
            t.memoizedProps
          );
          t = t.memoizedState;
          try {
            l.componentDidUpdate(
              e,
              t,
              l.__reactInternalSnapshotBeforeUpdate
            );
          } catch (f) {
            V(
              u,
              u.return,
              f
            );
          }
        }
      a & 64 && Vo(u), a & 512 && _a(u, u.return);
      break;
    case 3:
      if (Tt(l, u), a & 64 && (l = u.updateQueue, l !== null)) {
        if (t = null, u.child !== null)
          switch (u.child.tag) {
            case 27:
            case 5:
              t = u.child.stateNode;
              break;
            case 1:
              t = u.child.stateNode;
          }
        try {
          $0(l, t);
        } catch (f) {
          V(u, u.return, f);
        }
      }
      break;
    case 27:
      t === null && a & 4 && wo(u);
    case 26:
    case 5:
      Tt(l, u), t === null && a & 4 && Ko(u), a & 512 && _a(u, u.return);
      break;
    case 12:
      Tt(l, u);
      break;
    case 13:
      Tt(l, u), a & 4 && Fo(l, u), a & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = Fv.bind(
        null,
        u
      ), rh(l, u))));
      break;
    case 22:
      if (a = u.memoizedState !== null || ft, !a) {
        t = t !== null && t.memoizedState !== null || tl, e = ft;
        var n = tl;
        ft = a, (tl = t) && !n ? At(
          l,
          u,
          (u.subtreeFlags & 8772) !== 0
        ) : Tt(l, u), ft = e, tl = n;
      }
      break;
    case 30:
      break;
    default:
      Tt(l, u);
  }
}
function Wo(l) {
  var t = l.alternate;
  t !== null && (l.alternate = null, Wo(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Dc(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
}
var J = null, Tl = !1;
function et(l, t, u) {
  for (u = u.child; u !== null; )
    ko(l, t, u), u = u.sibling;
}
function ko(l, t, u) {
  if (Nl && typeof Nl.onCommitFiberUnmount == "function")
    try {
      Nl.onCommitFiberUnmount(Ka, u);
    } catch {
    }
  switch (u.tag) {
    case 26:
      tl || kl(u, t), et(
        l,
        t,
        u
      ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
      break;
    case 27:
      tl || kl(u, t);
      var a = J, e = Tl;
      Kt(u.type) && (J = u.stateNode, Tl = !1), et(
        l,
        t,
        u
      ), Ua(u.stateNode), J = a, Tl = e;
      break;
    case 5:
      tl || kl(u, t);
    case 6:
      if (a = J, e = Tl, J = null, et(
        l,
        t,
        u
      ), J = a, Tl = e, J !== null)
        if (Tl)
          try {
            (J.nodeType === 9 ? J.body : J.nodeName === "HTML" ? J.ownerDocument.body : J).removeChild(u.stateNode);
          } catch (n) {
            V(
              u,
              t,
              n
            );
          }
        else
          try {
            J.removeChild(u.stateNode);
          } catch (n) {
            V(
              u,
              t,
              n
            );
          }
      break;
    case 18:
      J !== null && (Tl ? (l = J, Ns(
        l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
        u.stateNode
      ), Va(l)) : Ns(J, u.stateNode));
      break;
    case 4:
      a = J, e = Tl, J = u.stateNode.containerInfo, Tl = !0, et(
        l,
        t,
        u
      ), J = a, Tl = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      tl || Zt(2, u, t), tl || Zt(4, u, t), et(
        l,
        t,
        u
      );
      break;
    case 1:
      tl || (kl(u, t), a = u.stateNode, typeof a.componentWillUnmount == "function" && Lo(
        u,
        t,
        a
      )), et(
        l,
        t,
        u
      );
      break;
    case 21:
      et(
        l,
        t,
        u
      );
      break;
    case 22:
      tl = (a = tl) || u.memoizedState !== null, et(
        l,
        t,
        u
      ), tl = a;
      break;
    default:
      et(
        l,
        t,
        u
      );
  }
}
function Fo(l, t) {
  if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
    try {
      Va(l);
    } catch (u) {
      V(t, t.return, u);
    }
}
function Vv(l) {
  switch (l.tag) {
    case 13:
    case 19:
      var t = l.stateNode;
      return t === null && (t = l.stateNode = new Ss()), t;
    case 22:
      return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Ss()), t;
    default:
      throw Error(S(435, l.tag));
  }
}
function df(l, t) {
  var u = Vv(l);
  t.forEach(function(a) {
    var e = Iv.bind(null, l, a);
    u.has(a) || (u.add(a), a.then(e, e));
  });
}
function _l(l, t) {
  var u = t.deletions;
  if (u !== null)
    for (var a = 0; a < u.length; a++) {
      var e = u[a], n = l, f = t, c = f;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (Kt(c.type)) {
              J = c.stateNode, Tl = !1;
              break l;
            }
            break;
          case 5:
            J = c.stateNode, Tl = !1;
            break l;
          case 3:
          case 4:
            J = c.stateNode.containerInfo, Tl = !0;
            break l;
        }
        c = c.return;
      }
      if (J === null) throw Error(S(160));
      ko(n, f, e), J = null, Tl = !1, n = e.alternate, n !== null && (n.return = null), e.return = null;
    }
  if (t.subtreeFlags & 13878)
    for (t = t.child; t !== null; )
      Io(t, l), t = t.sibling;
}
var Kl = null;
function Io(l, t) {
  var u = l.alternate, a = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      _l(t, l), Ml(l), a & 4 && (Zt(3, l, l.return), ue(3, l), Zt(5, l, l.return));
      break;
    case 1:
      _l(t, l), Ml(l), a & 512 && (tl || u === null || kl(u, u.return)), a & 64 && ft && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? a : u.concat(a))));
      break;
    case 26:
      var e = Kl;
      if (_l(t, l), Ml(l), a & 512 && (tl || u === null || kl(u, u.return)), a & 4) {
        var n = u !== null ? u.memoizedState : null;
        if (a = l.memoizedState, u === null)
          if (a === null)
            if (l.stateNode === null) {
              l: {
                a = l.type, u = l.memoizedProps, e = e.ownerDocument || e;
                t: switch (a) {
                  case "title":
                    n = e.getElementsByTagName("title")[0], (!n || n[$a] || n[rl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = e.createElement(a), e.head.insertBefore(
                      n,
                      e.querySelector("head > title")
                    )), hl(n, a, u), n[rl] = l, sl(n), a = n;
                    break l;
                  case "link":
                    var f = qs(
                      "link",
                      "href",
                      e
                    ).get(a + (u.href || ""));
                    if (f) {
                      for (var c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && n.getAttribute("rel") === (u.rel == null ? null : u.rel) && n.getAttribute("title") === (u.title == null ? null : u.title) && n.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                          f.splice(c, 1);
                          break t;
                        }
                    }
                    n = e.createElement(a), hl(n, a, u), e.head.appendChild(n);
                    break;
                  case "meta":
                    if (f = qs(
                      "meta",
                      "content",
                      e
                    ).get(a + (u.content || ""))) {
                      for (c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("content") === (u.content == null ? null : "" + u.content) && n.getAttribute("name") === (u.name == null ? null : u.name) && n.getAttribute("property") === (u.property == null ? null : u.property) && n.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && n.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                          f.splice(c, 1);
                          break t;
                        }
                    }
                    n = e.createElement(a), hl(n, a, u), e.head.appendChild(n);
                    break;
                  default:
                    throw Error(S(468, a));
                }
                n[rl] = l, sl(n), a = n;
              }
              l.stateNode = a;
            } else
              Bs(
                e,
                l.type,
                l.stateNode
              );
          else
            l.stateNode = Ys(
              e,
              a,
              l.memoizedProps
            );
        else
          n !== a ? (n === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : n.count--, a === null ? Bs(
            e,
            l.type,
            l.stateNode
          ) : Ys(
            e,
            a,
            l.memoizedProps
          )) : a === null && l.stateNode !== null && cf(
            l,
            l.memoizedProps,
            u.memoizedProps
          );
      }
      break;
    case 27:
      _l(t, l), Ml(l), a & 512 && (tl || u === null || kl(u, u.return)), u !== null && a & 4 && cf(
        l,
        l.memoizedProps,
        u.memoizedProps
      );
      break;
    case 5:
      if (_l(t, l), Ml(l), a & 512 && (tl || u === null || kl(u, u.return)), l.flags & 32) {
        e = l.stateNode;
        try {
          Cu(e, "");
        } catch (v) {
          V(l, l.return, v);
        }
      }
      a & 4 && l.stateNode != null && (e = l.memoizedProps, cf(
        l,
        e,
        u !== null ? u.memoizedProps : e
      )), a & 1024 && (of = !0);
      break;
    case 6:
      if (_l(t, l), Ml(l), a & 4) {
        if (l.stateNode === null)
          throw Error(S(162));
        a = l.memoizedProps, u = l.stateNode;
        try {
          u.nodeValue = a;
        } catch (v) {
          V(l, l.return, v);
        }
      }
      break;
    case 3:
      if (Ge = null, e = Kl, Kl = yn(t.containerInfo), _l(t, l), Kl = e, Ml(l), a & 4 && u !== null && u.memoizedState.isDehydrated)
        try {
          Va(t.containerInfo);
        } catch (v) {
          V(l, l.return, v);
        }
      of && (of = !1, Po(l));
      break;
    case 4:
      a = Kl, Kl = yn(
        l.stateNode.containerInfo
      ), _l(t, l), Ml(l), Kl = a;
      break;
    case 12:
      _l(t, l), Ml(l);
      break;
    case 13:
      _l(t, l), Ml(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (fi = Il()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, df(l, a)));
      break;
    case 22:
      e = l.memoizedState !== null;
      var i = u !== null && u.memoizedState !== null, y = ft, r = tl;
      if (ft = y || e, tl = r || i, _l(t, l), tl = r, ft = y, Ml(l), a & 8192)
        l: for (t = l.stateNode, t._visibility = e ? t._visibility & -2 : t._visibility | 1, e && (u === null || i || ft || tl || Ft(l)), u = null, t = l; ; ) {
          if (t.tag === 5 || t.tag === 26) {
            if (u === null) {
              i = u = t;
              try {
                if (n = i.stateNode, e)
                  f = n.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                else {
                  c = i.stateNode;
                  var m = i.memoizedProps.style, d = m != null && m.hasOwnProperty("display") ? m.display : null;
                  c.style.display = d == null || typeof d == "boolean" ? "" : ("" + d).trim();
                }
              } catch (v) {
                V(i, i.return, v);
              }
            }
          } else if (t.tag === 6) {
            if (u === null) {
              i = t;
              try {
                i.stateNode.nodeValue = e ? "" : i.memoizedProps;
              } catch (v) {
                V(i, i.return, v);
              }
            }
          } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === l) break l;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === l) break l;
            u === t && (u = null), t = t.return;
          }
          u === t && (u = null), t.sibling.return = t.return, t = t.sibling;
        }
      a & 4 && (a = l.updateQueue, a !== null && (u = a.retryQueue, u !== null && (a.retryQueue = null, df(l, u))));
      break;
    case 19:
      _l(t, l), Ml(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, df(l, a)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      _l(t, l), Ml(l);
  }
}
function Ml(l) {
  var t = l.flags;
  if (t & 2) {
    try {
      for (var u, a = l.return; a !== null; ) {
        if (Jo(a)) {
          u = a;
          break;
        }
        a = a.return;
      }
      if (u == null) throw Error(S(160));
      switch (u.tag) {
        case 27:
          var e = u.stateNode, n = sf(l);
          en(l, n, e);
          break;
        case 5:
          var f = u.stateNode;
          u.flags & 32 && (Cu(f, ""), u.flags &= -33);
          var c = sf(l);
          en(l, c, f);
          break;
        case 3:
        case 4:
          var i = u.stateNode.containerInfo, y = sf(l);
          Pf(
            l,
            y,
            i
          );
          break;
        default:
          throw Error(S(161));
      }
    } catch (r) {
      V(l, l.return, r);
    }
    l.flags &= -3;
  }
  t & 4096 && (l.flags &= -4097);
}
function Po(l) {
  if (l.subtreeFlags & 1024)
    for (l = l.child; l !== null; ) {
      var t = l;
      Po(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
    }
}
function Tt(l, t) {
  if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null; )
      $o(l, t.alternate, t), t = t.sibling;
}
function Ft(l) {
  for (l = l.child; l !== null; ) {
    var t = l;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Zt(4, t, t.return), Ft(t);
        break;
      case 1:
        kl(t, t.return);
        var u = t.stateNode;
        typeof u.componentWillUnmount == "function" && Lo(
          t,
          t.return,
          u
        ), Ft(t);
        break;
      case 27:
        Ua(t.stateNode);
      case 26:
      case 5:
        kl(t, t.return), Ft(t);
        break;
      case 22:
        t.memoizedState === null && Ft(t);
        break;
      case 30:
        Ft(t);
        break;
      default:
        Ft(t);
    }
    l = l.sibling;
  }
}
function At(l, t, u) {
  for (u = u && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var a = t.alternate, e = l, n = t, f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        At(
          e,
          n,
          u
        ), ue(4, n);
        break;
      case 1:
        if (At(
          e,
          n,
          u
        ), a = n, e = a.stateNode, typeof e.componentDidMount == "function")
          try {
            e.componentDidMount();
          } catch (y) {
            V(a, a.return, y);
          }
        if (a = n, e = a.updateQueue, e !== null) {
          var c = a.stateNode;
          try {
            var i = e.shared.hiddenCallbacks;
            if (i !== null)
              for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                w0(i[e], c);
          } catch (y) {
            V(a, a.return, y);
          }
        }
        u && f & 64 && Vo(n), _a(n, n.return);
        break;
      case 27:
        wo(n);
      case 26:
      case 5:
        At(
          e,
          n,
          u
        ), u && a === null && f & 4 && Ko(n), _a(n, n.return);
        break;
      case 12:
        At(
          e,
          n,
          u
        );
        break;
      case 13:
        At(
          e,
          n,
          u
        ), u && f & 4 && Fo(e, n);
        break;
      case 22:
        n.memoizedState === null && At(
          e,
          n,
          u
        ), _a(n, n.return);
        break;
      case 30:
        break;
      default:
        At(
          e,
          n,
          u
        );
    }
    t = t.sibling;
  }
}
function ui(l, t) {
  var u = null;
  l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Ia(u));
}
function ai(l, t) {
  l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Ia(l));
}
function $l(l, t, u, a) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; )
      ld(
        l,
        t,
        u,
        a
      ), t = t.sibling;
}
function ld(l, t, u, a) {
  var e = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      $l(
        l,
        t,
        u,
        a
      ), e & 2048 && ue(9, t);
      break;
    case 1:
      $l(
        l,
        t,
        u,
        a
      );
      break;
    case 3:
      $l(
        l,
        t,
        u,
        a
      ), e & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Ia(l)));
      break;
    case 12:
      if (e & 2048) {
        $l(
          l,
          t,
          u,
          a
        ), l = t.stateNode;
        try {
          var n = t.memoizedProps, f = n.id, c = n.onPostCommit;
          typeof c == "function" && c(
            f,
            t.alternate === null ? "mount" : "update",
            l.passiveEffectDuration,
            -0
          );
        } catch (i) {
          V(t, t.return, i);
        }
      } else
        $l(
          l,
          t,
          u,
          a
        );
      break;
    case 13:
      $l(
        l,
        t,
        u,
        a
      );
      break;
    case 23:
      break;
    case 22:
      n = t.stateNode, f = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? $l(
        l,
        t,
        u,
        a
      ) : Ma(l, t) : n._visibility & 2 ? $l(
        l,
        t,
        u,
        a
      ) : (n._visibility |= 2, gu(
        l,
        t,
        u,
        a,
        (t.subtreeFlags & 10256) !== 0
      )), e & 2048 && ui(f, t);
      break;
    case 24:
      $l(
        l,
        t,
        u,
        a
      ), e & 2048 && ai(t.alternate, t);
      break;
    default:
      $l(
        l,
        t,
        u,
        a
      );
  }
}
function gu(l, t, u, a, e) {
  for (e = e && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
    var n = l, f = t, c = u, i = a, y = f.flags;
    switch (f.tag) {
      case 0:
      case 11:
      case 15:
        gu(
          n,
          f,
          c,
          i,
          e
        ), ue(8, f);
        break;
      case 23:
        break;
      case 22:
        var r = f.stateNode;
        f.memoizedState !== null ? r._visibility & 2 ? gu(
          n,
          f,
          c,
          i,
          e
        ) : Ma(
          n,
          f
        ) : (r._visibility |= 2, gu(
          n,
          f,
          c,
          i,
          e
        )), e && y & 2048 && ui(
          f.alternate,
          f
        );
        break;
      case 24:
        gu(
          n,
          f,
          c,
          i,
          e
        ), e && y & 2048 && ai(f.alternate, f);
        break;
      default:
        gu(
          n,
          f,
          c,
          i,
          e
        );
    }
    t = t.sibling;
  }
}
function Ma(l, t) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) {
      var u = l, a = t, e = a.flags;
      switch (a.tag) {
        case 22:
          Ma(u, a), e & 2048 && ui(
            a.alternate,
            a
          );
          break;
        case 24:
          Ma(u, a), e & 2048 && ai(a.alternate, a);
          break;
        default:
          Ma(u, a);
      }
      t = t.sibling;
    }
}
var ha = 8192;
function vu(l) {
  if (l.subtreeFlags & ha)
    for (l = l.child; l !== null; )
      td(l), l = l.sibling;
}
function td(l) {
  switch (l.tag) {
    case 26:
      vu(l), l.flags & ha && l.memoizedState !== null && ph(
        Kl,
        l.memoizedState,
        l.memoizedProps
      );
      break;
    case 5:
      vu(l);
      break;
    case 3:
    case 4:
      var t = Kl;
      Kl = yn(l.stateNode.containerInfo), vu(l), Kl = t;
      break;
    case 22:
      l.memoizedState === null && (t = l.alternate, t !== null && t.memoizedState !== null ? (t = ha, ha = 16777216, vu(l), ha = t) : vu(l));
      break;
    default:
      vu(l);
  }
}
function ud(l) {
  var t = l.alternate;
  if (t !== null && (l = t.child, l !== null)) {
    t.child = null;
    do
      t = l.sibling, l.sibling = null, l = t;
    while (l !== null);
  }
}
function sa(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var u = 0; u < t.length; u++) {
        var a = t[u];
        il = a, ed(
          a,
          l
        );
      }
    ud(l);
  }
  if (l.subtreeFlags & 10256)
    for (l = l.child; l !== null; )
      ad(l), l = l.sibling;
}
function ad(l) {
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      sa(l), l.flags & 2048 && Zt(9, l, l.return);
      break;
    case 3:
      sa(l);
      break;
    case 12:
      sa(l);
      break;
    case 22:
      var t = l.stateNode;
      l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Be(l)) : sa(l);
      break;
    default:
      sa(l);
  }
}
function Be(l) {
  var t = l.deletions;
  if (l.flags & 16) {
    if (t !== null)
      for (var u = 0; u < t.length; u++) {
        var a = t[u];
        il = a, ed(
          a,
          l
        );
      }
    ud(l);
  }
  for (l = l.child; l !== null; ) {
    switch (t = l, t.tag) {
      case 0:
      case 11:
      case 15:
        Zt(8, t, t.return), Be(t);
        break;
      case 22:
        u = t.stateNode, u._visibility & 2 && (u._visibility &= -3, Be(t));
        break;
      default:
        Be(t);
    }
    l = l.sibling;
  }
}
function ed(l, t) {
  for (; il !== null; ) {
    var u = il;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Zt(8, u, t);
        break;
      case 23:
      case 22:
        if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
          var a = u.memoizedState.cachePool.pool;
          a != null && a.refCount++;
        }
        break;
      case 24:
        Ia(u.memoizedState.cache);
    }
    if (a = u.child, a !== null) a.return = u, il = a;
    else
      l: for (u = l; il !== null; ) {
        a = il;
        var e = a.sibling, n = a.return;
        if (Wo(a), a === u) {
          il = null;
          break l;
        }
        if (e !== null) {
          e.return = n, il = e;
          break l;
        }
        il = n;
      }
  }
}
var Lv = {
  getCacheForType: function(l) {
    var t = ml(el), u = t.data.get(l);
    return u === void 0 && (u = l(), t.data.set(l, u)), u;
  }
}, Kv = typeof WeakMap == "function" ? WeakMap : Map, Q = 0, L = null, x = null, B = 0, X = 0, Dl = null, Rt = !1, la = !1, ei = !1, gt = 0, F = 0, Vt = 0, au = 0, ni = 0, Zl = 0, Ju = 0, Da = null, Al = null, lc = !1, fi = 0, nn = 1 / 0, fn = null, Bt = null, vl = 0, jt = null, wu = null, Gu = 0, tc = 0, uc = null, nd = null, pa = 0, ac = null;
function Hl() {
  if (Q & 2 && B !== 0)
    return B & -B;
  if (_.T !== null) {
    var l = Zu;
    return l !== 0 ? l : ii();
  }
  return r0();
}
function fd() {
  Zl === 0 && (Zl = !(B & 536870912) || j ? d0() : 536870912);
  var l = Vl.current;
  return l !== null && (l.flags |= 32), Zl;
}
function xl(l, t, u) {
  (l === L && (X === 2 || X === 9) || l.cancelPendingCommit !== null) && ($u(l, 0), Ht(
    l,
    B,
    Zl,
    !1
  )), wa(l, u), (!(Q & 2) || l !== L) && (l === L && (!(Q & 2) && (au |= u), F === 4 && Ht(
    l,
    B,
    Zl,
    !1
  )), tt(l));
}
function cd(l, t, u) {
  if (Q & 6) throw Error(S(327));
  var a = !u && (t & 124) === 0 && (t & l.expiredLanes) === 0 || Ja(l, t), e = a ? $v(l, t) : yf(l, t, !0), n = a;
  do {
    if (e === 0) {
      la && !a && Ht(l, t, 0, !1);
      break;
    } else {
      if (u = l.current.alternate, n && !Jv(u)) {
        e = yf(l, t, !1), n = !1;
        continue;
      }
      if (e === 2) {
        if (n = t, l.errorRecoveryDisabledLanes & n)
          var f = 0;
        else
          f = l.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
        if (f !== 0) {
          t = f;
          l: {
            var c = l;
            e = Da;
            var i = c.current.memoizedState.isDehydrated;
            if (i && ($u(c, f).flags |= 256), f = yf(
              c,
              f,
              !1
            ), f !== 2) {
              if (ei && !i) {
                c.errorRecoveryDisabledLanes |= n, au |= n, e = 4;
                break l;
              }
              n = Al, Al = e, n !== null && (Al === null ? Al = n : Al.push.apply(
                Al,
                n
              ));
            }
            e = f;
          }
          if (n = !1, e !== 2) continue;
        }
      }
      if (e === 1) {
        $u(l, 0), Ht(l, t, 0, !0);
        break;
      }
      l: {
        switch (a = l, n = e, n) {
          case 0:
          case 1:
            throw Error(S(345));
          case 4:
            if ((t & 4194048) !== t) break;
          case 6:
            Ht(
              a,
              t,
              Zl,
              !Rt
            );
            break l;
          case 2:
            Al = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(S(329));
        }
        if ((t & 62914560) === t && (e = fi + 300 - Il(), 10 < e)) {
          if (Ht(
            a,
            t,
            Zl,
            !Rt
          ), bn(a, 0, !0) !== 0) break l;
          a.timeoutHandle = Md(
            bs.bind(
              null,
              a,
              u,
              Al,
              fn,
              lc,
              t,
              Zl,
              au,
              Ju,
              Rt,
              n,
              2,
              -0,
              0
            ),
            e
          );
          break l;
        }
        bs(
          a,
          u,
          Al,
          fn,
          lc,
          t,
          Zl,
          au,
          Ju,
          Rt,
          n,
          0,
          -0,
          0
        );
      }
    }
    break;
  } while (!0);
  tt(l);
}
function bs(l, t, u, a, e, n, f, c, i, y, r, m, d, v) {
  if (l.timeoutHandle = -1, m = t.subtreeFlags, (m & 8192 || (m & 16785408) === 16785408) && (Xa = { stylesheets: null, count: 0, unsuspend: Dh }, td(t), m = Uh(), m !== null)) {
    l.cancelPendingCommit = m(
      Ts.bind(
        null,
        l,
        t,
        n,
        u,
        a,
        e,
        f,
        c,
        i,
        r,
        1,
        d,
        v
      )
    ), Ht(l, n, f, !y);
    return;
  }
  Ts(
    l,
    t,
    n,
    u,
    a,
    e,
    f,
    c,
    i
  );
}
function Jv(l) {
  for (var t = l; ; ) {
    var u = t.tag;
    if ((u === 0 || u === 11 || u === 15) && t.flags & 16384 && (u = t.updateQueue, u !== null && (u = u.stores, u !== null)))
      for (var a = 0; a < u.length; a++) {
        var e = u[a], n = e.getSnapshot;
        e = e.value;
        try {
          if (!Yl(n(), e)) return !1;
        } catch {
          return !1;
        }
      }
    if (u = t.child, t.subtreeFlags & 16384 && u !== null)
      u.return = t, t = u;
    else {
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function Ht(l, t, u, a) {
  t &= ~ni, t &= ~au, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
  for (var e = t; 0 < e; ) {
    var n = 31 - Rl(e), f = 1 << n;
    a[n] = -1, e &= ~f;
  }
  u !== 0 && v0(l, u, t);
}
function Un() {
  return Q & 6 ? !0 : (ae(0), !1);
}
function ci() {
  if (x !== null) {
    if (X === 0)
      var l = x.return;
    else
      l = x, ot = yu = null, wc(l), ju = null, Ba = 0, l = x;
    for (; l !== null; )
      Zo(l.alternate, l), l = l.return;
    x = null;
  }
}
function $u(l, t) {
  var u = l.timeoutHandle;
  u !== -1 && (l.timeoutHandle = -1, oh(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), ci(), L = l, x = u = yt(l.current, null), B = t, X = 0, Dl = null, Rt = !1, la = Ja(l, t), ei = !1, Ju = Zl = ni = au = Vt = F = 0, Al = Da = null, lc = !1, t & 8 && (t |= t & 32);
  var a = l.entangledLanes;
  if (a !== 0)
    for (l = l.entanglements, a &= t; 0 < a; ) {
      var e = 31 - Rl(a), n = 1 << e;
      t |= l[e], a &= ~n;
    }
  return gt = t, zn(), u;
}
function id(l, t) {
  U = null, _.H = Pe, t === Pa || t === _n ? (t = Fi(), X = 3) : t === K0 ? (t = Fi(), X = 4) : X = t === Bo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Dl = t, x === null && (F = 1, un(
    l,
    Cl(t, l.current)
  ));
}
function sd() {
  var l = _.H;
  return _.H = Pe, l === null ? Pe : l;
}
function od() {
  var l = _.A;
  return _.A = Lv, l;
}
function ec() {
  F = 4, Rt || (B & 4194048) !== B && Vl.current !== null || (la = !0), !(Vt & 134217727) && !(au & 134217727) || L === null || Ht(
    L,
    B,
    Zl,
    !1
  );
}
function yf(l, t, u) {
  var a = Q;
  Q |= 2;
  var e = sd(), n = od();
  (L !== l || B !== t) && (fn = null, $u(l, t)), t = !1;
  var f = F;
  l: do
    try {
      if (X !== 0 && x !== null) {
        var c = x, i = Dl;
        switch (X) {
          case 8:
            ci(), f = 6;
            break l;
          case 3:
          case 2:
          case 9:
          case 6:
            Vl.current === null && (t = !0);
            var y = X;
            if (X = 0, Dl = null, Nu(l, c, i, y), u && la) {
              f = 0;
              break l;
            }
            break;
          default:
            y = X, X = 0, Dl = null, Nu(l, c, i, y);
        }
      }
      wv(), f = F;
      break;
    } catch (r) {
      id(l, r);
    }
  while (!0);
  return t && l.shellSuspendCounter++, ot = yu = null, Q = a, _.H = e, _.A = n, x === null && (L = null, B = 0, zn()), f;
}
function wv() {
  for (; x !== null; ) dd(x);
}
function $v(l, t) {
  var u = Q;
  Q |= 2;
  var a = sd(), e = od();
  L !== l || B !== t ? (fn = null, nn = Il() + 500, $u(l, t)) : la = Ja(
    l,
    t
  );
  l: do
    try {
      if (X !== 0 && x !== null) {
        t = x;
        var n = Dl;
        t: switch (X) {
          case 1:
            X = 0, Dl = null, Nu(l, t, n, 1);
            break;
          case 2:
          case 9:
            if (ki(n)) {
              X = 0, Dl = null, Es(t);
              break;
            }
            t = function() {
              X !== 2 && X !== 9 || L !== l || (X = 7), tt(l);
            }, n.then(t, t);
            break l;
          case 3:
            X = 7;
            break l;
          case 4:
            X = 5;
            break l;
          case 7:
            ki(n) ? (X = 0, Dl = null, Es(t)) : (X = 0, Dl = null, Nu(l, t, n, 7));
            break;
          case 5:
            var f = null;
            switch (x.tag) {
              case 26:
                f = x.memoizedState;
              case 5:
              case 27:
                var c = x;
                if (!f || Nd(f)) {
                  X = 0, Dl = null;
                  var i = c.sibling;
                  if (i !== null) x = i;
                  else {
                    var y = c.return;
                    y !== null ? (x = y, Nn(y)) : x = null;
                  }
                  break t;
                }
            }
            X = 0, Dl = null, Nu(l, t, n, 5);
            break;
          case 6:
            X = 0, Dl = null, Nu(l, t, n, 6);
            break;
          case 8:
            ci(), F = 6;
            break l;
          default:
            throw Error(S(462));
        }
      }
      Wv();
      break;
    } catch (r) {
      id(l, r);
    }
  while (!0);
  return ot = yu = null, _.H = a, _.A = e, Q = u, x !== null ? 0 : (L = null, B = 0, zn(), F);
}
function Wv() {
  for (; x !== null && !gy(); )
    dd(x);
}
function dd(l) {
  var t = Co(l.alternate, l, gt);
  l.memoizedProps = l.pendingProps, t === null ? Nn(l) : x = t;
}
function Es(l) {
  var t = l, u = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = vs(
        u,
        t,
        t.pendingProps,
        t.type,
        void 0,
        B
      );
      break;
    case 11:
      t = vs(
        u,
        t,
        t.pendingProps,
        t.type.render,
        t.ref,
        B
      );
      break;
    case 5:
      wc(t);
    default:
      Zo(u, t), t = x = C0(t, gt), t = Co(u, t, gt);
  }
  l.memoizedProps = l.pendingProps, t === null ? Nn(l) : x = t;
}
function Nu(l, t, u, a) {
  ot = yu = null, wc(t), ju = null, Ba = 0;
  var e = t.return;
  try {
    if (Gv(
      l,
      e,
      t,
      u,
      B
    )) {
      F = 1, un(
        l,
        Cl(u, l.current)
      ), x = null;
      return;
    }
  } catch (n) {
    if (e !== null) throw x = e, n;
    F = 1, un(
      l,
      Cl(u, l.current)
    ), x = null;
    return;
  }
  t.flags & 32768 ? (j || a === 1 ? l = !0 : la || B & 536870912 ? l = !1 : (Rt = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Vl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), yd(t, l)) : Nn(t);
}
function Nn(l) {
  var t = l;
  do {
    if (t.flags & 32768) {
      yd(
        t,
        Rt
      );
      return;
    }
    l = t.return;
    var u = Qv(
      t.alternate,
      t,
      gt
    );
    if (u !== null) {
      x = u;
      return;
    }
    if (t = t.sibling, t !== null) {
      x = t;
      return;
    }
    x = t = l;
  } while (t !== null);
  F === 0 && (F = 5);
}
function yd(l, t) {
  do {
    var u = Cv(l.alternate, l);
    if (u !== null) {
      u.flags &= 32767, x = u;
      return;
    }
    if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !t && (l = l.sibling, l !== null)) {
      x = l;
      return;
    }
    x = l = u;
  } while (l !== null);
  F = 6, x = null;
}
function Ts(l, t, u, a, e, n, f, c, i) {
  l.cancelPendingCommit = null;
  do
    Rn();
  while (vl !== 0);
  if (Q & 6) throw Error(S(327));
  if (t !== null) {
    if (t === l.current) throw Error(S(177));
    if (n = t.lanes | t.childLanes, n |= Yc, Dy(
      l,
      u,
      n,
      f,
      c,
      i
    ), l === L && (x = L = null, B = 0), wu = t, jt = l, Gu = u, tc = n, uc = e, nd = a, t.subtreeFlags & 10256 || t.flags & 10256 ? (l.callbackNode = null, l.callbackPriority = 0, Pv(Ve, function() {
      return gd(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, t.subtreeFlags & 13878 || a) {
      a = _.T, _.T = null, e = G.p, G.p = 2, f = Q, Q |= 4;
      try {
        Zv(l, t, u);
      } finally {
        Q = f, G.p = e, _.T = a;
      }
    }
    vl = 1, vd(), hd(), rd();
  }
}
function vd() {
  if (vl === 1) {
    vl = 0;
    var l = jt, t = wu, u = (t.flags & 13878) !== 0;
    if (t.subtreeFlags & 13878 || u) {
      u = _.T, _.T = null;
      var a = G.p;
      G.p = 2;
      var e = Q;
      Q |= 4;
      try {
        Io(t, l);
        var n = ic, f = x0(l.containerInfo), c = n.focusedElem, i = n.selectionRange;
        if (f !== c && c && c.ownerDocument && H0(
          c.ownerDocument.documentElement,
          c
        )) {
          if (i !== null && xc(c)) {
            var y = i.start, r = i.end;
            if (r === void 0 && (r = y), "selectionStart" in c)
              c.selectionStart = y, c.selectionEnd = Math.min(
                r,
                c.value.length
              );
            else {
              var m = c.ownerDocument || document, d = m && m.defaultView || window;
              if (d.getSelection) {
                var v = d.getSelection(), b = c.textContent.length, T = Math.min(i.start, b), D = i.end === void 0 ? T : Math.min(i.end, b);
                !v.extend && T > D && (f = D, D = T, T = f);
                var o = Zi(
                  c,
                  T
                ), s = Zi(
                  c,
                  D
                );
                if (o && s && (v.rangeCount !== 1 || v.anchorNode !== o.node || v.anchorOffset !== o.offset || v.focusNode !== s.node || v.focusOffset !== s.offset)) {
                  var h = m.createRange();
                  h.setStart(o.node, o.offset), v.removeAllRanges(), T > D ? (v.addRange(h), v.extend(s.node, s.offset)) : (h.setEnd(s.node, s.offset), v.addRange(h));
                }
              }
            }
          }
          for (m = [], v = c; v = v.parentNode; )
            v.nodeType === 1 && m.push({
              element: v,
              left: v.scrollLeft,
              top: v.scrollTop
            });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < m.length; c++) {
            var g = m[c];
            g.element.scrollLeft = g.left, g.element.scrollTop = g.top;
          }
        }
        rn = !!cc, ic = cc = null;
      } finally {
        Q = e, G.p = a, _.T = u;
      }
    }
    l.current = t, vl = 2;
  }
}
function hd() {
  if (vl === 2) {
    vl = 0;
    var l = jt, t = wu, u = (t.flags & 8772) !== 0;
    if (t.subtreeFlags & 8772 || u) {
      u = _.T, _.T = null;
      var a = G.p;
      G.p = 2;
      var e = Q;
      Q |= 4;
      try {
        $o(l, t.alternate, t);
      } finally {
        Q = e, G.p = a, _.T = u;
      }
    }
    vl = 3;
  }
}
function rd() {
  if (vl === 4 || vl === 3) {
    vl = 0, Sy();
    var l = jt, t = wu, u = Gu, a = nd;
    t.subtreeFlags & 10256 || t.flags & 10256 ? vl = 5 : (vl = 0, wu = jt = null, md(l, l.pendingLanes));
    var e = l.pendingLanes;
    if (e === 0 && (Bt = null), Mc(u), t = t.stateNode, Nl && typeof Nl.onCommitFiberRoot == "function")
      try {
        Nl.onCommitFiberRoot(
          Ka,
          t,
          void 0,
          (t.current.flags & 128) === 128
        );
      } catch {
      }
    if (a !== null) {
      t = _.T, e = G.p, G.p = 2, _.T = null;
      try {
        for (var n = l.onRecoverableError, f = 0; f < a.length; f++) {
          var c = a[f];
          n(c.value, {
            componentStack: c.stack
          });
        }
      } finally {
        _.T = t, G.p = e;
      }
    }
    Gu & 3 && Rn(), tt(l), e = l.pendingLanes, u & 4194090 && e & 42 ? l === ac ? pa++ : (pa = 0, ac = l) : pa = 0, ae(0);
  }
}
function md(l, t) {
  (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Ia(t)));
}
function Rn(l) {
  return vd(), hd(), rd(), gd();
}
function gd() {
  if (vl !== 5) return !1;
  var l = jt, t = tc;
  tc = 0;
  var u = Mc(Gu), a = _.T, e = G.p;
  try {
    G.p = 32 > u ? 32 : u, _.T = null, u = uc, uc = null;
    var n = jt, f = Gu;
    if (vl = 0, wu = jt = null, Gu = 0, Q & 6) throw Error(S(331));
    var c = Q;
    if (Q |= 4, ad(n.current), ld(
      n,
      n.current,
      f,
      u
    ), Q = c, ae(0, !1), Nl && typeof Nl.onPostCommitFiberRoot == "function")
      try {
        Nl.onPostCommitFiberRoot(Ka, n);
      } catch {
      }
    return !0;
  } finally {
    G.p = e, _.T = a, md(l, t);
  }
}
function As(l, t, u) {
  t = Cl(u, t), t = kf(l.stateNode, t, 2), l = qt(l, t, 2), l !== null && (wa(l, 2), tt(l));
}
function V(l, t, u) {
  if (l.tag === 3)
    As(l, l, u);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        As(
          t,
          l,
          u
        );
        break;
      } else if (t.tag === 1) {
        var a = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Bt === null || !Bt.has(a))) {
          l = Cl(u, l), u = Yo(2), a = qt(t, u, 2), a !== null && (qo(
            u,
            a,
            t,
            l
          ), wa(a, 2), tt(a));
          break;
        }
      }
      t = t.return;
    }
}
function vf(l, t, u) {
  var a = l.pingCache;
  if (a === null) {
    a = l.pingCache = new Kv();
    var e = /* @__PURE__ */ new Set();
    a.set(t, e);
  } else
    e = a.get(t), e === void 0 && (e = /* @__PURE__ */ new Set(), a.set(t, e));
  e.has(u) || (ei = !0, e.add(u), l = kv.bind(null, l, t, u), t.then(l, l));
}
function kv(l, t, u) {
  var a = l.pingCache;
  a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, L === l && (B & u) === u && (F === 4 || F === 3 && (B & 62914560) === B && 300 > Il() - fi ? !(Q & 2) && $u(l, 0) : ni |= u, Ju === B && (Ju = 0)), tt(l);
}
function Sd(l, t) {
  t === 0 && (t = y0()), l = Pu(l, t), l !== null && (wa(l, t), tt(l));
}
function Fv(l) {
  var t = l.memoizedState, u = 0;
  t !== null && (u = t.retryLane), Sd(l, u);
}
function Iv(l, t) {
  var u = 0;
  switch (l.tag) {
    case 13:
      var a = l.stateNode, e = l.memoizedState;
      e !== null && (u = e.retryLane);
      break;
    case 19:
      a = l.stateNode;
      break;
    case 22:
      a = l.stateNode._retryCache;
      break;
    default:
      throw Error(S(314));
  }
  a !== null && a.delete(t), Sd(l, u);
}
function Pv(l, t) {
  return Oc(l, t);
}
var cn = null, Su = null, nc = !1, sn = !1, hf = !1, eu = 0;
function tt(l) {
  l !== Su && l.next === null && (Su === null ? cn = Su = l : Su = Su.next = l), sn = !0, nc || (nc = !0, th());
}
function ae(l, t) {
  if (!hf && sn) {
    hf = !0;
    do
      for (var u = !1, a = cn; a !== null; ) {
        if (l !== 0) {
          var e = a.pendingLanes;
          if (e === 0) var n = 0;
          else {
            var f = a.suspendedLanes, c = a.pingedLanes;
            n = (1 << 31 - Rl(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
          }
          n !== 0 && (u = !0, zs(a, n));
        } else
          n = B, n = bn(
            a,
            a === L ? n : 0,
            a.cancelPendingCommit !== null || a.timeoutHandle !== -1
          ), !(n & 3) || Ja(a, n) || (u = !0, zs(a, n));
        a = a.next;
      }
    while (u);
    hf = !1;
  }
}
function lh() {
  bd();
}
function bd() {
  sn = nc = !1;
  var l = 0;
  eu !== 0 && (sh() && (l = eu), eu = 0);
  for (var t = Il(), u = null, a = cn; a !== null; ) {
    var e = a.next, n = Ed(a, t);
    n === 0 ? (a.next = null, u === null ? cn = e : u.next = e, e === null && (Su = u)) : (u = a, (l !== 0 || n & 3) && (sn = !0)), a = e;
  }
  ae(l);
}
function Ed(l, t) {
  for (var u = l.suspendedLanes, a = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
    var f = 31 - Rl(n), c = 1 << f, i = e[f];
    i === -1 ? (!(c & u) || c & a) && (e[f] = My(c, t)) : i <= t && (l.expiredLanes |= c), n &= ~c;
  }
  if (t = L, u = B, u = bn(
    l,
    l === t ? u : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), a = l.callbackNode, u === 0 || l === t && (X === 2 || X === 9) || l.cancelPendingCommit !== null)
    return a !== null && a !== null && Xn(a), l.callbackNode = null, l.callbackPriority = 0;
  if (!(u & 3) || Ja(l, u)) {
    if (t = u & -u, t === l.callbackPriority) return t;
    switch (a !== null && Xn(a), Mc(u)) {
      case 2:
      case 8:
        u = s0;
        break;
      case 32:
        u = Ve;
        break;
      case 268435456:
        u = o0;
        break;
      default:
        u = Ve;
    }
    return a = Td.bind(null, l), u = Oc(u, a), l.callbackPriority = t, l.callbackNode = u, t;
  }
  return a !== null && a !== null && Xn(a), l.callbackPriority = 2, l.callbackNode = null, 2;
}
function Td(l, t) {
  if (vl !== 0 && vl !== 5)
    return l.callbackNode = null, l.callbackPriority = 0, null;
  var u = l.callbackNode;
  if (Rn() && l.callbackNode !== u)
    return null;
  var a = B;
  return a = bn(
    l,
    l === L ? a : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), a === 0 ? null : (cd(l, a, t), Ed(l, Il()), l.callbackNode != null && l.callbackNode === u ? Td.bind(null, l) : null);
}
function zs(l, t) {
  if (Rn()) return null;
  cd(l, t, !0);
}
function th() {
  dh(function() {
    Q & 6 ? Oc(
      i0,
      lh
    ) : bd();
  });
}
function ii() {
  return eu === 0 && (eu = d0()), eu;
}
function Os(l) {
  return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : pe("" + l);
}
function _s(l, t) {
  var u = t.ownerDocument.createElement("input");
  return u.name = t.name, u.value = t.value, l.id && u.setAttribute("form", l.id), t.parentNode.insertBefore(u, t), l = new FormData(l), u.parentNode.removeChild(u), l;
}
function uh(l, t, u, a, e) {
  if (t === "submit" && u && u.stateNode === e) {
    var n = Os(
      (e[zl] || null).action
    ), f = a.submitter;
    f && (t = (t = f[zl] || null) ? Os(t.formAction) : f.getAttribute("formAction"), t !== null && (n = t, f = null));
    var c = new En(
      "action",
      "action",
      null,
      a,
      e
    );
    l.push({
      event: c,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (a.defaultPrevented) {
              if (eu !== 0) {
                var i = f ? _s(e, f) : new FormData(e);
                $f(
                  u,
                  {
                    pending: !0,
                    data: i,
                    method: e.method,
                    action: n
                  },
                  null,
                  i
                );
              }
            } else
              typeof n == "function" && (c.preventDefault(), i = f ? _s(e, f) : new FormData(e), $f(
                u,
                {
                  pending: !0,
                  data: i,
                  method: e.method,
                  action: n
                },
                n,
                i
              ));
          },
          currentTarget: e
        }
      ]
    });
  }
}
for (var rf = 0; rf < Bf.length; rf++) {
  var mf = Bf[rf], ah = mf.toLowerCase(), eh = mf[0].toUpperCase() + mf.slice(1);
  wl(
    ah,
    "on" + eh
  );
}
wl(q0, "onAnimationEnd");
wl(B0, "onAnimationIteration");
wl(j0, "onAnimationStart");
wl("dblclick", "onDoubleClick");
wl("focusin", "onFocus");
wl("focusout", "onBlur");
wl(Tv, "onTransitionRun");
wl(Av, "onTransitionStart");
wl(zv, "onTransitionCancel");
wl(G0, "onTransitionEnd");
Qu("onMouseEnter", ["mouseout", "mouseover"]);
Qu("onMouseLeave", ["mouseout", "mouseover"]);
Qu("onPointerEnter", ["pointerout", "pointerover"]);
Qu("onPointerLeave", ["pointerout", "pointerover"]);
su(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
su(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
su("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
su(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
su(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
su(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var ja = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), nh = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ja)
);
function Ad(l, t) {
  t = (t & 4) !== 0;
  for (var u = 0; u < l.length; u++) {
    var a = l[u], e = a.event;
    a = a.listeners;
    l: {
      var n = void 0;
      if (t)
        for (var f = a.length - 1; 0 <= f; f--) {
          var c = a[f], i = c.instance, y = c.currentTarget;
          if (c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = y;
          try {
            n(e);
          } catch (r) {
            tn(r);
          }
          e.currentTarget = null, n = i;
        }
      else
        for (f = 0; f < a.length; f++) {
          if (c = a[f], i = c.instance, y = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = y;
          try {
            n(e);
          } catch (r) {
            tn(r);
          }
          e.currentTarget = null, n = i;
        }
    }
  }
}
function H(l, t) {
  var u = t[Uf];
  u === void 0 && (u = t[Uf] = /* @__PURE__ */ new Set());
  var a = l + "__bubble";
  u.has(a) || (zd(t, l, 2, !1), u.add(a));
}
function gf(l, t, u) {
  var a = 0;
  t && (a |= 4), zd(
    u,
    l,
    a,
    t
  );
}
var Ee = "_reactListening" + Math.random().toString(36).slice(2);
function si(l) {
  if (!l[Ee]) {
    l[Ee] = !0, m0.forEach(function(u) {
      u !== "selectionchange" && (nh.has(u) || gf(u, !1, l), gf(u, !0, l));
    });
    var t = l.nodeType === 9 ? l : l.ownerDocument;
    t === null || t[Ee] || (t[Ee] = !0, gf("selectionchange", !1, t));
  }
}
function zd(l, t, u, a) {
  switch (qd(t)) {
    case 2:
      var e = Hh;
      break;
    case 8:
      e = xh;
      break;
    default:
      e = vi;
  }
  u = e.bind(
    null,
    t,
    u,
    l
  ), e = void 0, !xf || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (e = !0), a ? e !== void 0 ? l.addEventListener(t, u, {
    capture: !0,
    passive: e
  }) : l.addEventListener(t, u, !0) : e !== void 0 ? l.addEventListener(t, u, {
    passive: e
  }) : l.addEventListener(t, u, !1);
}
function Sf(l, t, u, a, e) {
  var n = a;
  if (!(t & 1) && !(t & 2) && a !== null)
    l: for (; ; ) {
      if (a === null) return;
      var f = a.tag;
      if (f === 3 || f === 4) {
        var c = a.stateNode.containerInfo;
        if (c === e) break;
        if (f === 4)
          for (f = a.return; f !== null; ) {
            var i = f.tag;
            if ((i === 3 || i === 4) && f.stateNode.containerInfo === e)
              return;
            f = f.return;
          }
        for (; c !== null; ) {
          if (f = Tu(c), f === null) return;
          if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            a = n = f;
            continue l;
          }
          c = c.parentNode;
        }
      }
      a = a.return;
    }
  O0(function() {
    var y = n, r = Uc(u), m = [];
    l: {
      var d = X0.get(l);
      if (d !== void 0) {
        var v = En, b = l;
        switch (l) {
          case "keypress":
            if (Ne(u) === 0) break l;
          case "keydown":
          case "keyup":
            v = Py;
            break;
          case "focusin":
            b = "focus", v = wn;
            break;
          case "focusout":
            b = "blur", v = wn;
            break;
          case "beforeblur":
          case "afterblur":
            v = wn;
            break;
          case "click":
            if (u.button === 2) break l;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Hi;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Cy;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = uv;
            break;
          case q0:
          case B0:
          case j0:
            v = Ly;
            break;
          case G0:
            v = ev;
            break;
          case "scroll":
          case "scrollend":
            v = Xy;
            break;
          case "wheel":
            v = fv;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Jy;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Yi;
            break;
          case "toggle":
          case "beforetoggle":
            v = iv;
        }
        var T = (t & 4) !== 0, D = !T && (l === "scroll" || l === "scrollend"), o = T ? d !== null ? d + "Capture" : null : d;
        T = [];
        for (var s = y, h; s !== null; ) {
          var g = s;
          if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || o === null || (g = Ra(s, o), g != null && T.push(
            Ga(s, g, h)
          )), D) break;
          s = s.return;
        }
        0 < T.length && (d = new v(
          d,
          b,
          null,
          u,
          r
        ), m.push({ event: d, listeners: T }));
      }
    }
    if (!(t & 7)) {
      l: {
        if (d = l === "mouseover" || l === "pointerover", v = l === "mouseout" || l === "pointerout", d && u !== Hf && (b = u.relatedTarget || u.fromElement) && (Tu(b) || b[Fu]))
          break l;
        if ((v || d) && (d = r.window === r ? r : (d = r.ownerDocument) ? d.defaultView || d.parentWindow : window, v ? (b = u.relatedTarget || u.toElement, v = y, b = b ? Tu(b) : null, b !== null && (D = La(b), T = b.tag, b !== D || T !== 5 && T !== 27 && T !== 6) && (b = null)) : (v = null, b = y), v !== b)) {
          if (T = Hi, g = "onMouseLeave", o = "onMouseEnter", s = "mouse", (l === "pointerout" || l === "pointerover") && (T = Yi, g = "onPointerLeave", o = "onPointerEnter", s = "pointer"), D = v == null ? d : va(v), h = b == null ? d : va(b), d = new T(
            g,
            s + "leave",
            v,
            u,
            r
          ), d.target = D, d.relatedTarget = h, g = null, Tu(r) === y && (T = new T(
            o,
            s + "enter",
            b,
            u,
            r
          ), T.target = h, T.relatedTarget = D, g = T), D = g, v && b)
            t: {
              for (T = v, o = b, s = 0, h = T; h; h = hu(h))
                s++;
              for (h = 0, g = o; g; g = hu(g))
                h++;
              for (; 0 < s - h; )
                T = hu(T), s--;
              for (; 0 < h - s; )
                o = hu(o), h--;
              for (; s--; ) {
                if (T === o || o !== null && T === o.alternate)
                  break t;
                T = hu(T), o = hu(o);
              }
              T = null;
            }
          else T = null;
          v !== null && Ms(
            m,
            d,
            v,
            T,
            !1
          ), b !== null && D !== null && Ms(
            m,
            D,
            b,
            T,
            !0
          );
        }
      }
      l: {
        if (d = y ? va(y) : window, v = d.nodeName && d.nodeName.toLowerCase(), v === "select" || v === "input" && d.type === "file")
          var E = Gi;
        else if (ji(d))
          if (N0)
            E = Sv;
          else {
            E = mv;
            var M = rv;
          }
        else
          v = d.nodeName, !v || v.toLowerCase() !== "input" || d.type !== "checkbox" && d.type !== "radio" ? y && pc(y.elementType) && (E = Gi) : E = gv;
        if (E && (E = E(l, y))) {
          U0(
            m,
            E,
            u,
            r
          );
          break l;
        }
        M && M(l, d, y), l === "focusout" && y && d.type === "number" && y.memoizedProps.value != null && Rf(d, "number", d.value);
      }
      switch (M = y ? va(y) : window, l) {
        case "focusin":
          (ji(M) || M.contentEditable === "true") && (Ou = M, Yf = y, Sa = null);
          break;
        case "focusout":
          Sa = Yf = Ou = null;
          break;
        case "mousedown":
          qf = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          qf = !1, Vi(m, u, r);
          break;
        case "selectionchange":
          if (Ev) break;
        case "keydown":
        case "keyup":
          Vi(m, u, r);
      }
      var z;
      if (Hc)
        l: {
          switch (l) {
            case "compositionstart":
              var O = "onCompositionStart";
              break l;
            case "compositionend":
              O = "onCompositionEnd";
              break l;
            case "compositionupdate":
              O = "onCompositionUpdate";
              break l;
          }
          O = void 0;
        }
      else
        zu ? D0(l, u) && (O = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (O = "onCompositionStart");
      O && (M0 && u.locale !== "ko" && (zu || O !== "onCompositionStart" ? O === "onCompositionEnd" && zu && (z = _0()) : (Nt = r, Nc = "value" in Nt ? Nt.value : Nt.textContent, zu = !0)), M = on(y, O), 0 < M.length && (O = new xi(
        O,
        l,
        null,
        u,
        r
      ), m.push({ event: O, listeners: M }), z ? O.data = z : (z = p0(u), z !== null && (O.data = z)))), (z = ov ? dv(l, u) : yv(l, u)) && (O = on(y, "onBeforeInput"), 0 < O.length && (M = new xi(
        "onBeforeInput",
        "beforeinput",
        null,
        u,
        r
      ), m.push({
        event: M,
        listeners: O
      }), M.data = z)), uh(
        m,
        l,
        y,
        u,
        r
      );
    }
    Ad(m, t);
  });
}
function Ga(l, t, u) {
  return {
    instance: l,
    listener: t,
    currentTarget: u
  };
}
function on(l, t) {
  for (var u = t + "Capture", a = []; l !== null; ) {
    var e = l, n = e.stateNode;
    if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = Ra(l, u), e != null && a.unshift(
      Ga(l, e, n)
    ), e = Ra(l, t), e != null && a.push(
      Ga(l, e, n)
    )), l.tag === 3) return a;
    l = l.return;
  }
  return [];
}
function hu(l) {
  if (l === null) return null;
  do
    l = l.return;
  while (l && l.tag !== 5 && l.tag !== 27);
  return l || null;
}
function Ms(l, t, u, a, e) {
  for (var n = t._reactName, f = []; u !== null && u !== a; ) {
    var c = u, i = c.alternate, y = c.stateNode;
    if (c = c.tag, i !== null && i === a) break;
    c !== 5 && c !== 26 && c !== 27 || y === null || (i = y, e ? (y = Ra(u, n), y != null && f.unshift(
      Ga(u, y, i)
    )) : e || (y = Ra(u, n), y != null && f.push(
      Ga(u, y, i)
    ))), u = u.return;
  }
  f.length !== 0 && l.push({ event: t, listeners: f });
}
var fh = /\r\n?/g, ch = /\u0000|\uFFFD/g;
function Ds(l) {
  return (typeof l == "string" ? l : "" + l).replace(fh, `
`).replace(ch, "");
}
function Od(l, t) {
  return t = Ds(t), Ds(l) === t;
}
function Hn() {
}
function C(l, t, u, a, e, n) {
  switch (u) {
    case "children":
      typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Cu(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Cu(l, "" + a);
      break;
    case "className":
      ve(l, "class", a);
      break;
    case "tabIndex":
      ve(l, "tabindex", a);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      ve(l, u, a);
      break;
    case "style":
      z0(l, a, n);
      break;
    case "data":
      if (t !== "object") {
        ve(l, "data", a);
        break;
      }
    case "src":
    case "href":
      if (a === "" && (t !== "a" || u !== "href")) {
        l.removeAttribute(u);
        break;
      }
      if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
        l.removeAttribute(u);
        break;
      }
      a = pe("" + a), l.setAttribute(u, a);
      break;
    case "action":
    case "formAction":
      if (typeof a == "function") {
        l.setAttribute(
          u,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        typeof n == "function" && (u === "formAction" ? (t !== "input" && C(l, t, "name", e.name, e, null), C(
          l,
          t,
          "formEncType",
          e.formEncType,
          e,
          null
        ), C(
          l,
          t,
          "formMethod",
          e.formMethod,
          e,
          null
        ), C(
          l,
          t,
          "formTarget",
          e.formTarget,
          e,
          null
        )) : (C(l, t, "encType", e.encType, e, null), C(l, t, "method", e.method, e, null), C(l, t, "target", e.target, e, null)));
      if (a == null || typeof a == "symbol" || typeof a == "boolean") {
        l.removeAttribute(u);
        break;
      }
      a = pe("" + a), l.setAttribute(u, a);
      break;
    case "onClick":
      a != null && (l.onclick = Hn);
      break;
    case "onScroll":
      a != null && H("scroll", l);
      break;
    case "onScrollEnd":
      a != null && H("scrollend", l);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a))
          throw Error(S(61));
        if (u = a.__html, u != null) {
          if (e.children != null) throw Error(S(60));
          l.innerHTML = u;
        }
      }
      break;
    case "multiple":
      l.multiple = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "muted":
      l.muted = a && typeof a != "function" && typeof a != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
        l.removeAttribute("xlink:href");
        break;
      }
      u = pe("" + a), l.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        u
      );
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, "" + a) : l.removeAttribute(u);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
      break;
    case "capture":
    case "download":
      a === !0 ? l.setAttribute(u, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(u, a) : l.removeAttribute(u);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(u, a) : l.removeAttribute(u);
      break;
    case "rowSpan":
    case "start":
      a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(u) : l.setAttribute(u, a);
      break;
    case "popover":
      H("beforetoggle", l), H("toggle", l), De(l, "popover", a);
      break;
    case "xlinkActuate":
      ut(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        a
      );
      break;
    case "xlinkArcrole":
      ut(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        a
      );
      break;
    case "xlinkRole":
      ut(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        a
      );
      break;
    case "xlinkShow":
      ut(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        a
      );
      break;
    case "xlinkTitle":
      ut(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        a
      );
      break;
    case "xlinkType":
      ut(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        a
      );
      break;
    case "xmlBase":
      ut(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        a
      );
      break;
    case "xmlLang":
      ut(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        a
      );
      break;
    case "xmlSpace":
      ut(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        a
      );
      break;
    case "is":
      De(l, "is", a);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = jy.get(u) || u, De(l, u, a));
  }
}
function fc(l, t, u, a, e, n) {
  switch (u) {
    case "style":
      z0(l, a, n);
      break;
    case "dangerouslySetInnerHTML":
      if (a != null) {
        if (typeof a != "object" || !("__html" in a))
          throw Error(S(61));
        if (u = a.__html, u != null) {
          if (e.children != null) throw Error(S(60));
          l.innerHTML = u;
        }
      }
      break;
    case "children":
      typeof a == "string" ? Cu(l, a) : (typeof a == "number" || typeof a == "bigint") && Cu(l, "" + a);
      break;
    case "onScroll":
      a != null && H("scroll", l);
      break;
    case "onScrollEnd":
      a != null && H("scrollend", l);
      break;
    case "onClick":
      a != null && (l.onclick = Hn);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!g0.hasOwnProperty(u))
        l: {
          if (u[0] === "o" && u[1] === "n" && (e = u.endsWith("Capture"), t = u.slice(2, e ? u.length - 7 : void 0), n = l[zl] || null, n = n != null ? n[u] : null, typeof n == "function" && l.removeEventListener(t, n, e), typeof a == "function")) {
            typeof n != "function" && n !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(t, a, e);
            break l;
          }
          u in l ? l[u] = a : a === !0 ? l.setAttribute(u, "") : De(l, u, a);
        }
  }
}
function hl(l, t, u) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      H("error", l), H("load", l);
      var a = !1, e = !1, n;
      for (n in u)
        if (u.hasOwnProperty(n)) {
          var f = u[n];
          if (f != null)
            switch (n) {
              case "src":
                a = !0;
                break;
              case "srcSet":
                e = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(S(137, t));
              default:
                C(l, t, n, f, u, null);
            }
        }
      e && C(l, t, "srcSet", u.srcSet, u, null), a && C(l, t, "src", u.src, u, null);
      return;
    case "input":
      H("invalid", l);
      var c = n = f = e = null, i = null, y = null;
      for (a in u)
        if (u.hasOwnProperty(a)) {
          var r = u[a];
          if (r != null)
            switch (a) {
              case "name":
                e = r;
                break;
              case "type":
                f = r;
                break;
              case "checked":
                i = r;
                break;
              case "defaultChecked":
                y = r;
                break;
              case "value":
                n = r;
                break;
              case "defaultValue":
                c = r;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (r != null)
                  throw Error(S(137, t));
                break;
              default:
                C(l, t, a, r, u, null);
            }
        }
      E0(
        l,
        n,
        c,
        i,
        y,
        f,
        e,
        !1
      ), Le(l);
      return;
    case "select":
      H("invalid", l), a = f = n = null;
      for (e in u)
        if (u.hasOwnProperty(e) && (c = u[e], c != null))
          switch (e) {
            case "value":
              n = c;
              break;
            case "defaultValue":
              f = c;
              break;
            case "multiple":
              a = c;
            default:
              C(l, t, e, c, u, null);
          }
      t = n, u = f, l.multiple = !!a, t != null ? Hu(l, !!a, t, !1) : u != null && Hu(l, !!a, u, !0);
      return;
    case "textarea":
      H("invalid", l), n = e = a = null;
      for (f in u)
        if (u.hasOwnProperty(f) && (c = u[f], c != null))
          switch (f) {
            case "value":
              a = c;
              break;
            case "defaultValue":
              e = c;
              break;
            case "children":
              n = c;
              break;
            case "dangerouslySetInnerHTML":
              if (c != null) throw Error(S(91));
              break;
            default:
              C(l, t, f, c, u, null);
          }
      A0(l, a, e, n), Le(l);
      return;
    case "option":
      for (i in u)
        if (u.hasOwnProperty(i) && (a = u[i], a != null))
          switch (i) {
            case "selected":
              l.selected = a && typeof a != "function" && typeof a != "symbol";
              break;
            default:
              C(l, t, i, a, u, null);
          }
      return;
    case "dialog":
      H("beforetoggle", l), H("toggle", l), H("cancel", l), H("close", l);
      break;
    case "iframe":
    case "object":
      H("load", l);
      break;
    case "video":
    case "audio":
      for (a = 0; a < ja.length; a++)
        H(ja[a], l);
      break;
    case "image":
      H("error", l), H("load", l);
      break;
    case "details":
      H("toggle", l);
      break;
    case "embed":
    case "source":
    case "link":
      H("error", l), H("load", l);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (y in u)
        if (u.hasOwnProperty(y) && (a = u[y], a != null))
          switch (y) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(S(137, t));
            default:
              C(l, t, y, a, u, null);
          }
      return;
    default:
      if (pc(t)) {
        for (r in u)
          u.hasOwnProperty(r) && (a = u[r], a !== void 0 && fc(
            l,
            t,
            r,
            a,
            u,
            void 0
          ));
        return;
      }
  }
  for (c in u)
    u.hasOwnProperty(c) && (a = u[c], a != null && C(l, t, c, a, u, null));
}
function ih(l, t, u, a) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var e = null, n = null, f = null, c = null, i = null, y = null, r = null;
      for (v in u) {
        var m = u[v];
        if (u.hasOwnProperty(v) && m != null)
          switch (v) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = m;
            default:
              a.hasOwnProperty(v) || C(l, t, v, null, a, m);
          }
      }
      for (var d in a) {
        var v = a[d];
        if (m = u[d], a.hasOwnProperty(d) && (v != null || m != null))
          switch (d) {
            case "type":
              n = v;
              break;
            case "name":
              e = v;
              break;
            case "checked":
              y = v;
              break;
            case "defaultChecked":
              r = v;
              break;
            case "value":
              f = v;
              break;
            case "defaultValue":
              c = v;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (v != null)
                throw Error(S(137, t));
              break;
            default:
              v !== m && C(
                l,
                t,
                d,
                v,
                a,
                m
              );
          }
      }
      Nf(
        l,
        f,
        c,
        i,
        y,
        r,
        n,
        e
      );
      return;
    case "select":
      v = f = c = d = null;
      for (n in u)
        if (i = u[n], u.hasOwnProperty(n) && i != null)
          switch (n) {
            case "value":
              break;
            case "multiple":
              v = i;
            default:
              a.hasOwnProperty(n) || C(
                l,
                t,
                n,
                null,
                a,
                i
              );
          }
      for (e in a)
        if (n = a[e], i = u[e], a.hasOwnProperty(e) && (n != null || i != null))
          switch (e) {
            case "value":
              d = n;
              break;
            case "defaultValue":
              c = n;
              break;
            case "multiple":
              f = n;
            default:
              n !== i && C(
                l,
                t,
                e,
                n,
                a,
                i
              );
          }
      t = c, u = f, a = v, d != null ? Hu(l, !!u, d, !1) : !!a != !!u && (t != null ? Hu(l, !!u, t, !0) : Hu(l, !!u, u ? [] : "", !1));
      return;
    case "textarea":
      v = d = null;
      for (c in u)
        if (e = u[c], u.hasOwnProperty(c) && e != null && !a.hasOwnProperty(c))
          switch (c) {
            case "value":
              break;
            case "children":
              break;
            default:
              C(l, t, c, null, a, e);
          }
      for (f in a)
        if (e = a[f], n = u[f], a.hasOwnProperty(f) && (e != null || n != null))
          switch (f) {
            case "value":
              d = e;
              break;
            case "defaultValue":
              v = e;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (e != null) throw Error(S(91));
              break;
            default:
              e !== n && C(l, t, f, e, a, n);
          }
      T0(l, d, v);
      return;
    case "option":
      for (var b in u)
        if (d = u[b], u.hasOwnProperty(b) && d != null && !a.hasOwnProperty(b))
          switch (b) {
            case "selected":
              l.selected = !1;
              break;
            default:
              C(
                l,
                t,
                b,
                null,
                a,
                d
              );
          }
      for (i in a)
        if (d = a[i], v = u[i], a.hasOwnProperty(i) && d !== v && (d != null || v != null))
          switch (i) {
            case "selected":
              l.selected = d && typeof d != "function" && typeof d != "symbol";
              break;
            default:
              C(
                l,
                t,
                i,
                d,
                a,
                v
              );
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var T in u)
        d = u[T], u.hasOwnProperty(T) && d != null && !a.hasOwnProperty(T) && C(l, t, T, null, a, d);
      for (y in a)
        if (d = a[y], v = u[y], a.hasOwnProperty(y) && d !== v && (d != null || v != null))
          switch (y) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (d != null)
                throw Error(S(137, t));
              break;
            default:
              C(
                l,
                t,
                y,
                d,
                a,
                v
              );
          }
      return;
    default:
      if (pc(t)) {
        for (var D in u)
          d = u[D], u.hasOwnProperty(D) && d !== void 0 && !a.hasOwnProperty(D) && fc(
            l,
            t,
            D,
            void 0,
            a,
            d
          );
        for (r in a)
          d = a[r], v = u[r], !a.hasOwnProperty(r) || d === v || d === void 0 && v === void 0 || fc(
            l,
            t,
            r,
            d,
            a,
            v
          );
        return;
      }
  }
  for (var o in u)
    d = u[o], u.hasOwnProperty(o) && d != null && !a.hasOwnProperty(o) && C(l, t, o, null, a, d);
  for (m in a)
    d = a[m], v = u[m], !a.hasOwnProperty(m) || d === v || d == null && v == null || C(l, t, m, d, a, v);
}
var cc = null, ic = null;
function dn(l) {
  return l.nodeType === 9 ? l : l.ownerDocument;
}
function ps(l) {
  switch (l) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function _d(l, t) {
  if (l === 0)
    switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return l === 1 && t === "foreignObject" ? 0 : l;
}
function sc(l, t) {
  return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var bf = null;
function sh() {
  var l = window.event;
  return l && l.type === "popstate" ? l === bf ? !1 : (bf = l, !0) : (bf = null, !1);
}
var Md = typeof setTimeout == "function" ? setTimeout : void 0, oh = typeof clearTimeout == "function" ? clearTimeout : void 0, Us = typeof Promise == "function" ? Promise : void 0, dh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Us < "u" ? function(l) {
  return Us.resolve(null).then(l).catch(yh);
} : Md;
function yh(l) {
  setTimeout(function() {
    throw l;
  });
}
function Kt(l) {
  return l === "head";
}
function Ns(l, t) {
  var u = t, a = 0, e = 0;
  do {
    var n = u.nextSibling;
    if (l.removeChild(u), n && n.nodeType === 8)
      if (u = n.data, u === "/$") {
        if (0 < a && 8 > a) {
          u = a;
          var f = l.ownerDocument;
          if (u & 1 && Ua(f.documentElement), u & 2 && Ua(f.body), u & 4)
            for (u = f.head, Ua(u), f = u.firstChild; f; ) {
              var c = f.nextSibling, i = f.nodeName;
              f[$a] || i === "SCRIPT" || i === "STYLE" || i === "LINK" && f.rel.toLowerCase() === "stylesheet" || u.removeChild(f), f = c;
            }
        }
        if (e === 0) {
          l.removeChild(n), Va(t);
          return;
        }
        e--;
      } else
        u === "$" || u === "$?" || u === "$!" ? e++ : a = u.charCodeAt(0) - 48;
    else a = 0;
    u = n;
  } while (u);
  Va(t);
}
function oc(l) {
  var t = l.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var u = t;
    switch (t = t.nextSibling, u.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        oc(u), Dc(u);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (u.rel.toLowerCase() === "stylesheet") continue;
    }
    l.removeChild(u);
  }
}
function vh(l, t, u, a) {
  for (; l.nodeType === 1; ) {
    var e = u;
    if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
        break;
    } else if (a) {
      if (!l[$a])
        switch (t) {
          case "meta":
            if (!l.hasAttribute("itemprop")) break;
            return l;
          case "link":
            if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
              break;
            if (n !== e.rel || l.getAttribute("href") !== (e.href == null || e.href === "" ? null : e.href) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin) || l.getAttribute("title") !== (e.title == null ? null : e.title))
              break;
            return l;
          case "style":
            if (l.hasAttribute("data-precedence")) break;
            return l;
          case "script":
            if (n = l.getAttribute("src"), (n !== (e.src == null ? null : e.src) || l.getAttribute("type") !== (e.type == null ? null : e.type) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
              break;
            return l;
          default:
            return l;
        }
    } else if (t === "input" && l.type === "hidden") {
      var n = e.name == null ? null : "" + e.name;
      if (e.type === "hidden" && l.getAttribute("name") === n)
        return l;
    } else return l;
    if (l = Jl(l.nextSibling), l === null) break;
  }
  return null;
}
function hh(l, t, u) {
  if (t === "") return null;
  for (; l.nodeType !== 3; )
    if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Jl(l.nextSibling), l === null)) return null;
  return l;
}
function dc(l) {
  return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
}
function rh(l, t) {
  var u = l.ownerDocument;
  if (l.data !== "$?" || u.readyState === "complete")
    t();
  else {
    var a = function() {
      t(), u.removeEventListener("DOMContentLoaded", a);
    };
    u.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
  }
}
function Jl(l) {
  for (; l != null; l = l.nextSibling) {
    var t = l.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        break;
      if (t === "/$") return null;
    }
  }
  return l;
}
var yc = null;
function Rs(l) {
  l = l.previousSibling;
  for (var t = 0; l; ) {
    if (l.nodeType === 8) {
      var u = l.data;
      if (u === "$" || u === "$!" || u === "$?") {
        if (t === 0) return l;
        t--;
      } else u === "/$" && t++;
    }
    l = l.previousSibling;
  }
  return null;
}
function Dd(l, t, u) {
  switch (t = dn(u), l) {
    case "html":
      if (l = t.documentElement, !l) throw Error(S(452));
      return l;
    case "head":
      if (l = t.head, !l) throw Error(S(453));
      return l;
    case "body":
      if (l = t.body, !l) throw Error(S(454));
      return l;
    default:
      throw Error(S(451));
  }
}
function Ua(l) {
  for (var t = l.attributes; t.length; )
    l.removeAttributeNode(t[0]);
  Dc(l);
}
var Ll = /* @__PURE__ */ new Map(), Hs = /* @__PURE__ */ new Set();
function yn(l) {
  return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
}
var St = G.d;
G.d = {
  f: mh,
  r: gh,
  D: Sh,
  C: bh,
  L: Eh,
  m: Th,
  X: zh,
  S: Ah,
  M: Oh
};
function mh() {
  var l = St.f(), t = Un();
  return l || t;
}
function gh(l) {
  var t = Iu(l);
  t !== null && t.tag === 5 && t.type === "form" ? Eo(t) : St.r(l);
}
var ta = typeof document > "u" ? null : document;
function pd(l, t, u) {
  var a = ta;
  if (a && typeof t == "string" && t) {
    var e = Ql(t);
    e = 'link[rel="' + l + '"][href="' + e + '"]', typeof u == "string" && (e += '[crossorigin="' + u + '"]'), Hs.has(e) || (Hs.add(e), l = { rel: l, crossOrigin: u, href: t }, a.querySelector(e) === null && (t = a.createElement("link"), hl(t, "link", l), sl(t), a.head.appendChild(t)));
  }
}
function Sh(l) {
  St.D(l), pd("dns-prefetch", l, null);
}
function bh(l, t) {
  St.C(l, t), pd("preconnect", l, t);
}
function Eh(l, t, u) {
  St.L(l, t, u);
  var a = ta;
  if (a && l && t) {
    var e = 'link[rel="preload"][as="' + Ql(t) + '"]';
    t === "image" && u && u.imageSrcSet ? (e += '[imagesrcset="' + Ql(
      u.imageSrcSet
    ) + '"]', typeof u.imageSizes == "string" && (e += '[imagesizes="' + Ql(
      u.imageSizes
    ) + '"]')) : e += '[href="' + Ql(l) + '"]';
    var n = e;
    switch (t) {
      case "style":
        n = Wu(l);
        break;
      case "script":
        n = ua(l);
    }
    Ll.has(n) || (l = K(
      {
        rel: "preload",
        href: t === "image" && u && u.imageSrcSet ? void 0 : l,
        as: t
      },
      u
    ), Ll.set(n, l), a.querySelector(e) !== null || t === "style" && a.querySelector(ee(n)) || t === "script" && a.querySelector(ne(n)) || (t = a.createElement("link"), hl(t, "link", l), sl(t), a.head.appendChild(t)));
  }
}
function Th(l, t) {
  St.m(l, t);
  var u = ta;
  if (u && l) {
    var a = t && typeof t.as == "string" ? t.as : "script", e = 'link[rel="modulepreload"][as="' + Ql(a) + '"][href="' + Ql(l) + '"]', n = e;
    switch (a) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        n = ua(l);
    }
    if (!Ll.has(n) && (l = K({ rel: "modulepreload", href: l }, t), Ll.set(n, l), u.querySelector(e) === null)) {
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (u.querySelector(ne(n)))
            return;
      }
      a = u.createElement("link"), hl(a, "link", l), sl(a), u.head.appendChild(a);
    }
  }
}
function Ah(l, t, u) {
  St.S(l, t, u);
  var a = ta;
  if (a && l) {
    var e = Ru(a).hoistableStyles, n = Wu(l);
    t = t || "default";
    var f = e.get(n);
    if (!f) {
      var c = { loading: 0, preload: null };
      if (f = a.querySelector(
        ee(n)
      ))
        c.loading = 5;
      else {
        l = K(
          { rel: "stylesheet", href: l, "data-precedence": t },
          u
        ), (u = Ll.get(n)) && oi(l, u);
        var i = f = a.createElement("link");
        sl(i), hl(i, "link", l), i._p = new Promise(function(y, r) {
          i.onload = y, i.onerror = r;
        }), i.addEventListener("load", function() {
          c.loading |= 1;
        }), i.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, je(f, t, a);
      }
      f = {
        type: "stylesheet",
        instance: f,
        count: 1,
        state: c
      }, e.set(n, f);
    }
  }
}
function zh(l, t) {
  St.X(l, t);
  var u = ta;
  if (u && l) {
    var a = Ru(u).hoistableScripts, e = ua(l), n = a.get(e);
    n || (n = u.querySelector(ne(e)), n || (l = K({ src: l, async: !0 }, t), (t = Ll.get(e)) && di(l, t), n = u.createElement("script"), sl(n), hl(n, "link", l), u.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, a.set(e, n));
  }
}
function Oh(l, t) {
  St.M(l, t);
  var u = ta;
  if (u && l) {
    var a = Ru(u).hoistableScripts, e = ua(l), n = a.get(e);
    n || (n = u.querySelector(ne(e)), n || (l = K({ src: l, async: !0, type: "module" }, t), (t = Ll.get(e)) && di(l, t), n = u.createElement("script"), sl(n), hl(n, "link", l), u.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, a.set(e, n));
  }
}
function xs(l, t, u, a) {
  var e = (e = xt.current) ? yn(e) : null;
  if (!e) throw Error(S(446));
  switch (l) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof u.precedence == "string" && typeof u.href == "string" ? (t = Wu(u.href), u = Ru(
        e
      ).hoistableStyles, a = u.get(t), a || (a = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, u.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
        l = Wu(u.href);
        var n = Ru(
          e
        ).hoistableStyles, f = n.get(l);
        if (f || (e = e.ownerDocument || e, f = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, n.set(l, f), (n = e.querySelector(
          ee(l)
        )) && !n._p && (f.instance = n, f.state.loading = 5), Ll.has(l) || (u = {
          rel: "preload",
          as: "style",
          href: u.href,
          crossOrigin: u.crossOrigin,
          integrity: u.integrity,
          media: u.media,
          hrefLang: u.hrefLang,
          referrerPolicy: u.referrerPolicy
        }, Ll.set(l, u), n || _h(
          e,
          l,
          u,
          f.state
        ))), t && a === null)
          throw Error(S(528, ""));
        return f;
      }
      if (t && a !== null)
        throw Error(S(529, ""));
      return null;
    case "script":
      return t = u.async, u = u.src, typeof u == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ua(u), u = Ru(
        e
      ).hoistableScripts, a = u.get(t), a || (a = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, u.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(S(444, l));
  }
}
function Wu(l) {
  return 'href="' + Ql(l) + '"';
}
function ee(l) {
  return 'link[rel="stylesheet"][' + l + "]";
}
function Ud(l) {
  return K({}, l, {
    "data-precedence": l.precedence,
    precedence: null
  });
}
function _h(l, t, u, a) {
  l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
    return a.loading |= 1;
  }), t.addEventListener("error", function() {
    return a.loading |= 2;
  }), hl(t, "link", u), sl(t), l.head.appendChild(t));
}
function ua(l) {
  return '[src="' + Ql(l) + '"]';
}
function ne(l) {
  return "script[async]" + l;
}
function Ys(l, t, u) {
  if (t.count++, t.instance === null)
    switch (t.type) {
      case "style":
        var a = l.querySelector(
          'style[data-href~="' + Ql(u.href) + '"]'
        );
        if (a)
          return t.instance = a, sl(a), a;
        var e = K({}, u, {
          "data-href": u.href,
          "data-precedence": u.precedence,
          href: null,
          precedence: null
        });
        return a = (l.ownerDocument || l).createElement(
          "style"
        ), sl(a), hl(a, "style", e), je(a, u.precedence, l), t.instance = a;
      case "stylesheet":
        e = Wu(u.href);
        var n = l.querySelector(
          ee(e)
        );
        if (n)
          return t.state.loading |= 4, t.instance = n, sl(n), n;
        a = Ud(u), (e = Ll.get(e)) && oi(a, e), n = (l.ownerDocument || l).createElement("link"), sl(n);
        var f = n;
        return f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), hl(n, "link", a), t.state.loading |= 4, je(n, u.precedence, l), t.instance = n;
      case "script":
        return n = ua(u.src), (e = l.querySelector(
          ne(n)
        )) ? (t.instance = e, sl(e), e) : (a = u, (e = Ll.get(n)) && (a = K({}, u), di(a, e)), l = l.ownerDocument || l, e = l.createElement("script"), sl(e), hl(e, "link", a), l.head.appendChild(e), t.instance = e);
      case "void":
        return null;
      default:
        throw Error(S(443, t.type));
    }
  else
    t.type === "stylesheet" && !(t.state.loading & 4) && (a = t.instance, t.state.loading |= 4, je(a, u.precedence, l));
  return t.instance;
}
function je(l, t, u) {
  for (var a = u.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), e = a.length ? a[a.length - 1] : null, n = e, f = 0; f < a.length; f++) {
    var c = a[f];
    if (c.dataset.precedence === t) n = c;
    else if (n !== e) break;
  }
  n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = u.nodeType === 9 ? u.head : u, t.insertBefore(l, t.firstChild));
}
function oi(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
}
function di(l, t) {
  l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
}
var Ge = null;
function qs(l, t, u) {
  if (Ge === null) {
    var a = /* @__PURE__ */ new Map(), e = Ge = /* @__PURE__ */ new Map();
    e.set(u, a);
  } else
    e = Ge, a = e.get(u), a || (a = /* @__PURE__ */ new Map(), e.set(u, a));
  if (a.has(l)) return a;
  for (a.set(l, null), u = u.getElementsByTagName(l), e = 0; e < u.length; e++) {
    var n = u[e];
    if (!(n[$a] || n[rl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
      var f = n.getAttribute(t) || "";
      f = l + f;
      var c = a.get(f);
      c ? c.push(n) : a.set(f, [n]);
    }
  }
  return a;
}
function Bs(l, t, u) {
  l = l.ownerDocument || l, l.head.insertBefore(
    u,
    t === "title" ? l.querySelector("head > title") : null
  );
}
function Mh(l, t, u) {
  if (u === 1 || t.itemProp != null) return !1;
  switch (l) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
        break;
      return !0;
    case "link":
      if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
        break;
      switch (t.rel) {
        case "stylesheet":
          return l = t.disabled, typeof t.precedence == "string" && l == null;
        default:
          return !0;
      }
    case "script":
      if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
        return !0;
  }
  return !1;
}
function Nd(l) {
  return !(l.type === "stylesheet" && !(l.state.loading & 3));
}
var Xa = null;
function Dh() {
}
function ph(l, t, u) {
  if (Xa === null) throw Error(S(475));
  var a = Xa;
  if (t.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && !(t.state.loading & 4)) {
    if (t.instance === null) {
      var e = Wu(u.href), n = l.querySelector(
        ee(e)
      );
      if (n) {
        l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (a.count++, a = vn.bind(a), l.then(a, a)), t.state.loading |= 4, t.instance = n, sl(n);
        return;
      }
      n = l.ownerDocument || l, u = Ud(u), (e = Ll.get(e)) && oi(u, e), n = n.createElement("link"), sl(n);
      var f = n;
      f._p = new Promise(function(c, i) {
        f.onload = c, f.onerror = i;
      }), hl(n, "link", u), t.instance = n;
    }
    a.stylesheets === null && (a.stylesheets = /* @__PURE__ */ new Map()), a.stylesheets.set(t, l), (l = t.state.preload) && !(t.state.loading & 3) && (a.count++, t = vn.bind(a), l.addEventListener("load", t), l.addEventListener("error", t));
  }
}
function Uh() {
  if (Xa === null) throw Error(S(475));
  var l = Xa;
  return l.stylesheets && l.count === 0 && vc(l, l.stylesheets), 0 < l.count ? function(t) {
    var u = setTimeout(function() {
      if (l.stylesheets && vc(l, l.stylesheets), l.unsuspend) {
        var a = l.unsuspend;
        l.unsuspend = null, a();
      }
    }, 6e4);
    return l.unsuspend = t, function() {
      l.unsuspend = null, clearTimeout(u);
    };
  } : null;
}
function vn() {
  if (this.count--, this.count === 0) {
    if (this.stylesheets) vc(this, this.stylesheets);
    else if (this.unsuspend) {
      var l = this.unsuspend;
      this.unsuspend = null, l();
    }
  }
}
var hn = null;
function vc(l, t) {
  l.stylesheets = null, l.unsuspend !== null && (l.count++, hn = /* @__PURE__ */ new Map(), t.forEach(Nh, l), hn = null, vn.call(l));
}
function Nh(l, t) {
  if (!(t.state.loading & 4)) {
    var u = hn.get(l);
    if (u) var a = u.get(null);
    else {
      u = /* @__PURE__ */ new Map(), hn.set(l, u);
      for (var e = l.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), n = 0; n < e.length; n++) {
        var f = e[n];
        (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (u.set(f.dataset.precedence, f), a = f);
      }
      a && u.set(null, a);
    }
    e = t.instance, f = e.getAttribute("data-precedence"), n = u.get(f) || a, n === a && u.set(null, e), u.set(f, e), this.count++, a = vn.bind(this), e.addEventListener("load", a), e.addEventListener("error", a), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), t.state.loading |= 4;
  }
}
var Qa = {
  $$typeof: ct,
  Provider: null,
  Consumer: null,
  _currentValue: It,
  _currentValue2: It,
  _threadCount: 0
};
function Rh(l, t, u, a, e, n, f, c) {
  this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Qn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Qn(0), this.hiddenUpdates = Qn(null), this.identifierPrefix = a, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function Rd(l, t, u, a, e, n, f, c, i, y, r, m) {
  return l = new Rh(
    l,
    t,
    u,
    f,
    c,
    i,
    y,
    m
  ), t = 1, n === !0 && (t |= 24), n = Ul(3, null, null, t), l.current = n, n.stateNode = l, t = Xc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
    element: a,
    isDehydrated: u,
    cache: t
  }, Cc(n), l;
}
function Hd(l) {
  return l ? (l = Du, l) : Du;
}
function xd(l, t, u, a, e, n) {
  e = Hd(e), a.context === null ? a.context = e : a.pendingContext = e, a = Yt(t), a.payload = { element: u }, n = n === void 0 ? null : n, n !== null && (a.callback = n), u = qt(l, a, t), u !== null && (xl(u, l, t), Ta(u, l, t));
}
function js(l, t) {
  if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
    var u = l.retryLane;
    l.retryLane = u !== 0 && u < t ? u : t;
  }
}
function yi(l, t) {
  js(l, t), (l = l.alternate) && js(l, t);
}
function Yd(l) {
  if (l.tag === 13) {
    var t = Pu(l, 67108864);
    t !== null && xl(t, l, 67108864), yi(l, 67108864);
  }
}
var rn = !0;
function Hh(l, t, u, a) {
  var e = _.T;
  _.T = null;
  var n = G.p;
  try {
    G.p = 2, vi(l, t, u, a);
  } finally {
    G.p = n, _.T = e;
  }
}
function xh(l, t, u, a) {
  var e = _.T;
  _.T = null;
  var n = G.p;
  try {
    G.p = 8, vi(l, t, u, a);
  } finally {
    G.p = n, _.T = e;
  }
}
function vi(l, t, u, a) {
  if (rn) {
    var e = hc(a);
    if (e === null)
      Sf(
        l,
        t,
        a,
        mn,
        u
      ), Gs(l, a);
    else if (qh(
      e,
      l,
      t,
      u,
      a
    ))
      a.stopPropagation();
    else if (Gs(l, a), t & 4 && -1 < Yh.indexOf(l)) {
      for (; e !== null; ) {
        var n = Iu(e);
        if (n !== null)
          switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var f = Wt(n.pendingLanes);
                if (f !== 0) {
                  var c = n;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                    var i = 1 << 31 - Rl(f);
                    c.entanglements[1] |= i, f &= ~i;
                  }
                  tt(n), !(Q & 6) && (nn = Il() + 500, ae(0));
                }
              }
              break;
            case 13:
              c = Pu(n, 2), c !== null && xl(c, n, 2), Un(), yi(n, 2);
          }
        if (n = hc(a), n === null && Sf(
          l,
          t,
          a,
          mn,
          u
        ), n === e) break;
        e = n;
      }
      e !== null && a.stopPropagation();
    } else
      Sf(
        l,
        t,
        a,
        null,
        u
      );
  }
}
function hc(l) {
  return l = Uc(l), hi(l);
}
var mn = null;
function hi(l) {
  if (mn = null, l = Tu(l), l !== null) {
    var t = La(l);
    if (t === null) l = null;
    else {
      var u = t.tag;
      if (u === 13) {
        if (l = e0(t), l !== null) return l;
        l = null;
      } else if (u === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        l = null;
      } else t !== l && (l = null);
    }
  }
  return mn = l, null;
}
function qd(l) {
  switch (l) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (by()) {
        case i0:
          return 2;
        case s0:
          return 8;
        case Ve:
        case Ey:
          return 32;
        case o0:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var rc = !1, Gt = null, Xt = null, Qt = null, Ca = /* @__PURE__ */ new Map(), Za = /* @__PURE__ */ new Map(), pt = [], Yh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function Gs(l, t) {
  switch (l) {
    case "focusin":
    case "focusout":
      Gt = null;
      break;
    case "dragenter":
    case "dragleave":
      Xt = null;
      break;
    case "mouseover":
    case "mouseout":
      Qt = null;
      break;
    case "pointerover":
    case "pointerout":
      Ca.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Za.delete(t.pointerId);
  }
}
function oa(l, t, u, a, e, n) {
  return l === null || l.nativeEvent !== n ? (l = {
    blockedOn: t,
    domEventName: u,
    eventSystemFlags: a,
    nativeEvent: n,
    targetContainers: [e]
  }, t !== null && (t = Iu(t), t !== null && Yd(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, e !== null && t.indexOf(e) === -1 && t.push(e), l);
}
function qh(l, t, u, a, e) {
  switch (t) {
    case "focusin":
      return Gt = oa(
        Gt,
        l,
        t,
        u,
        a,
        e
      ), !0;
    case "dragenter":
      return Xt = oa(
        Xt,
        l,
        t,
        u,
        a,
        e
      ), !0;
    case "mouseover":
      return Qt = oa(
        Qt,
        l,
        t,
        u,
        a,
        e
      ), !0;
    case "pointerover":
      var n = e.pointerId;
      return Ca.set(
        n,
        oa(
          Ca.get(n) || null,
          l,
          t,
          u,
          a,
          e
        )
      ), !0;
    case "gotpointercapture":
      return n = e.pointerId, Za.set(
        n,
        oa(
          Za.get(n) || null,
          l,
          t,
          u,
          a,
          e
        )
      ), !0;
  }
  return !1;
}
function Bd(l) {
  var t = Tu(l.target);
  if (t !== null) {
    var u = La(t);
    if (u !== null) {
      if (t = u.tag, t === 13) {
        if (t = e0(u), t !== null) {
          l.blockedOn = t, py(l.priority, function() {
            if (u.tag === 13) {
              var a = Hl();
              a = _c(a);
              var e = Pu(u, a);
              e !== null && xl(e, u, a), yi(u, a);
            }
          });
          return;
        }
      } else if (t === 3 && u.stateNode.current.memoizedState.isDehydrated) {
        l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
        return;
      }
    }
  }
  l.blockedOn = null;
}
function Xe(l) {
  if (l.blockedOn !== null) return !1;
  for (var t = l.targetContainers; 0 < t.length; ) {
    var u = hc(l.nativeEvent);
    if (u === null) {
      u = l.nativeEvent;
      var a = new u.constructor(
        u.type,
        u
      );
      Hf = a, u.target.dispatchEvent(a), Hf = null;
    } else
      return t = Iu(u), t !== null && Yd(t), l.blockedOn = u, !1;
    t.shift();
  }
  return !0;
}
function Xs(l, t, u) {
  Xe(l) && u.delete(t);
}
function Bh() {
  rc = !1, Gt !== null && Xe(Gt) && (Gt = null), Xt !== null && Xe(Xt) && (Xt = null), Qt !== null && Xe(Qt) && (Qt = null), Ca.forEach(Xs), Za.forEach(Xs);
}
function Te(l, t) {
  l.blockedOn === t && (l.blockedOn = null, rc || (rc = !0, fl.unstable_scheduleCallback(
    fl.unstable_NormalPriority,
    Bh
  )));
}
var Ae = null;
function Qs(l) {
  Ae !== l && (Ae = l, fl.unstable_scheduleCallback(
    fl.unstable_NormalPriority,
    function() {
      Ae === l && (Ae = null);
      for (var t = 0; t < l.length; t += 3) {
        var u = l[t], a = l[t + 1], e = l[t + 2];
        if (typeof a != "function") {
          if (hi(a || u) === null)
            continue;
          break;
        }
        var n = Iu(u);
        n !== null && (l.splice(t, 3), t -= 3, $f(
          n,
          {
            pending: !0,
            data: e,
            method: u.method,
            action: a
          },
          a,
          e
        ));
      }
    }
  ));
}
function Va(l) {
  function t(i) {
    return Te(i, l);
  }
  Gt !== null && Te(Gt, l), Xt !== null && Te(Xt, l), Qt !== null && Te(Qt, l), Ca.forEach(t), Za.forEach(t);
  for (var u = 0; u < pt.length; u++) {
    var a = pt[u];
    a.blockedOn === l && (a.blockedOn = null);
  }
  for (; 0 < pt.length && (u = pt[0], u.blockedOn === null); )
    Bd(u), u.blockedOn === null && pt.shift();
  if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
    for (a = 0; a < u.length; a += 3) {
      var e = u[a], n = u[a + 1], f = e[zl] || null;
      if (typeof n == "function")
        f || Qs(u);
      else if (f) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (e = n, f = n[zl] || null)
            c = f.formAction;
          else if (hi(e) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? u[a + 1] = c : (u.splice(a, 3), a -= 3), Qs(u);
      }
    }
}
function ri(l) {
  this._internalRoot = l;
}
xn.prototype.render = ri.prototype.render = function(l) {
  var t = this._internalRoot;
  if (t === null) throw Error(S(409));
  var u = t.current, a = Hl();
  xd(u, a, l, t, null, null);
};
xn.prototype.unmount = ri.prototype.unmount = function() {
  var l = this._internalRoot;
  if (l !== null) {
    this._internalRoot = null;
    var t = l.containerInfo;
    xd(l.current, 2, null, l, null, null), Un(), t[Fu] = null;
  }
};
function xn(l) {
  this._internalRoot = l;
}
xn.prototype.unstable_scheduleHydration = function(l) {
  if (l) {
    var t = r0();
    l = { blockedOn: null, target: l, priority: t };
    for (var u = 0; u < pt.length && t !== 0 && t < pt[u].priority; u++) ;
    pt.splice(u, 0, l), u === 0 && Bd(l);
  }
};
var Cs = u0.version;
if (Cs !== "19.1.0")
  throw Error(
    S(
      527,
      Cs,
      "19.1.0"
    )
  );
G.findDOMNode = function(l) {
  var t = l._reactInternals;
  if (t === void 0)
    throw typeof l.render == "function" ? Error(S(188)) : (l = Object.keys(l).join(","), Error(S(268, l)));
  return l = yy(t), l = l !== null ? n0(l) : null, l = l === null ? null : l.stateNode, l;
};
var jh = {
  bundleType: 0,
  version: "19.1.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: _,
  reconcilerVersion: "19.1.0"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ze = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ze.isDisabled && ze.supportsFiber)
    try {
      Ka = ze.inject(
        jh
      ), Nl = ze;
    } catch {
    }
}
gn.createRoot = function(l, t) {
  if (!a0(l)) throw Error(S(299));
  var u = !1, a = "", e = Ro, n = Ho, f = xo, c = null;
  return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (e = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (c = t.unstable_transitionCallbacks)), t = Rd(
    l,
    1,
    !1,
    null,
    null,
    u,
    a,
    e,
    n,
    f,
    c,
    null
  ), l[Fu] = t.current, si(l), new ri(t);
};
gn.hydrateRoot = function(l, t, u) {
  if (!a0(l)) throw Error(S(299));
  var a = !1, e = "", n = Ro, f = Ho, c = xo, i = null, y = null;
  return u != null && (u.unstable_strictMode === !0 && (a = !0), u.identifierPrefix !== void 0 && (e = u.identifierPrefix), u.onUncaughtError !== void 0 && (n = u.onUncaughtError), u.onCaughtError !== void 0 && (f = u.onCaughtError), u.onRecoverableError !== void 0 && (c = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (i = u.unstable_transitionCallbacks), u.formState !== void 0 && (y = u.formState)), t = Rd(
    l,
    1,
    !0,
    t,
    u ?? null,
    a,
    e,
    n,
    f,
    c,
    i,
    y
  ), t.context = Hd(null), u = t.current, a = Hl(), a = _c(a), e = Yt(a), e.callback = null, qt(u, e, a), u = a, t.current.lanes = u, wa(t, u), tt(t), l[Fu] = t.current, si(l), new xn(t);
};
gn.version = "19.1.0";
function jd() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jd);
    } catch (l) {
      console.error(l);
    }
}
jd(), ks.exports = gn;
var Gd = ks.exports;
const Gh = /* @__PURE__ */ Zs(Gd);
var Xh = Object.defineProperty, Qh = (l, t, u) => t in l ? Xh(l, t, { enumerable: !0, configurable: !0, writable: !0, value: u }) : l[t] = u, Oe = (l, t, u) => Qh(l, typeof t != "symbol" ? t + "" : t, u);
const Ch = {
  stringify: (l) => l ? "true" : "false",
  parse: (l) => /^[ty1-9]/i.test(l)
}, Zh = {
  stringify: (l) => l.name,
  parse: (l, t, u) => {
    const a = (() => {
      if (typeof window < "u" && l in window)
        return window[l];
      if (typeof global < "u" && l in global)
        return global[l];
    })();
    return typeof a == "function" ? a.bind(u) : void 0;
  }
}, Vh = {
  stringify: (l) => JSON.stringify(l),
  parse: (l) => JSON.parse(l)
}, Lh = {
  stringify: (l) => `${l}`,
  parse: (l) => parseFloat(l)
}, Kh = {
  stringify: (l) => l,
  parse: (l) => l
}, Ef = {
  string: Kh,
  number: Lh,
  boolean: Ch,
  function: Zh,
  json: Vh
};
function Jh(l) {
  return l.replace(
    /([a-z0-9])([A-Z])/g,
    (t, u, a) => `${u}-${a.toLowerCase()}`
  );
}
const _e = Symbol.for("r2wc.render"), Me = Symbol.for("r2wc.connected"), $t = Symbol.for("r2wc.context"), nt = Symbol.for("r2wc.props");
function wh(l, t, u) {
  var a, e, n;
  t.props || (t.props = l.propTypes ? Object.keys(l.propTypes) : []), t.events || (t.events = []);
  const f = Array.isArray(t.props) ? t.props.slice() : Object.keys(t.props), c = Array.isArray(t.events) ? t.events.slice() : Object.keys(t.events), i = {}, y = {}, r = {}, m = {};
  for (const v of f) {
    i[v] = Array.isArray(t.props) ? "string" : t.props[v];
    const b = Jh(v);
    r[v] = b, m[b] = v;
  }
  for (const v of c)
    y[v] = Array.isArray(t.events) ? {} : t.events[v];
  class d extends HTMLElement {
    constructor() {
      super(), Oe(this, n, !0), Oe(this, e), Oe(this, a, {}), Oe(this, "container"), t.shadow ? this.container = this.attachShadow({
        mode: t.shadow
      }) : this.container = this, this[nt].container = this.container;
      for (const b of f) {
        const T = r[b], D = this.getAttribute(T), o = i[b], s = o ? Ef[o] : null;
        s != null && s.parse && D && (this[nt][b] = s.parse(D, T, this));
      }
      for (const b of c)
        this[nt][b] = (T) => {
          const D = b.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(
            new CustomEvent(D, { detail: T, ...y[b] })
          );
        };
    }
    static get observedAttributes() {
      return Object.keys(m);
    }
    connectedCallback() {
      this[Me] = !0, this[_e]();
    }
    disconnectedCallback() {
      this[Me] = !1, this[$t] && u.unmount(this[$t]), delete this[$t];
    }
    attributeChangedCallback(b, T, D) {
      const o = m[b], s = i[o], h = s ? Ef[s] : null;
      o in i && h != null && h.parse && D && (this[nt][o] = h.parse(D, b, this), this[_e]());
    }
    [(n = Me, e = $t, a = nt, _e)]() {
      this[Me] && (this[$t] ? u.update(this[$t], this[nt]) : this[$t] = u.mount(
        this.container,
        l,
        this[nt]
      ));
    }
  }
  for (const v of f) {
    const b = r[v], T = i[v];
    Object.defineProperty(d.prototype, v, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[nt][v];
      },
      set(D) {
        this[nt][v] = D;
        const o = T ? Ef[T] : null;
        if (o != null && o.stringify) {
          const s = o.stringify(D, b, this);
          this.getAttribute(b) !== s && this.setAttribute(b, s);
        } else
          this[_e]();
      }
    });
  }
  return d;
}
function $h(l, t, u) {
  const a = Gd.createRoot(l), e = Tc.createElement(t, u);
  return a.render(e), {
    root: a,
    ReactComponent: t
  };
}
function Wh({ root: l, ReactComponent: t }, u) {
  const a = Tc.createElement(t, u);
  l.render(a);
}
function kh({ root: l }) {
  l.unmount();
}
function Fh(l, t = {}) {
  return wh(l, t, { mount: $h, update: Wh, unmount: kh });
}
var Xd = { exports: {} }, Yn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ih = Symbol.for("react.transitional.element"), Ph = Symbol.for("react.fragment");
function Qd(l, t, u) {
  var a = null;
  if (u !== void 0 && (a = "" + u), t.key !== void 0 && (a = "" + t.key), "key" in t) {
    u = {};
    for (var e in t)
      e !== "key" && (u[e] = t[e]);
  } else u = t;
  return t = u.ref, {
    $$typeof: Ih,
    type: l,
    key: a,
    ref: t !== void 0 ? t : null,
    props: u
  };
}
Yn.Fragment = Ph;
Yn.jsx = Qd;
Yn.jsxs = Qd;
Xd.exports = Yn;
var q = Xd.exports;
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l1 = (l) => l.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Cd = (...l) => l.filter((t, u, a) => !!t && t.trim() !== "" && a.indexOf(t) === u).join(" ").trim();
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var t1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u1 = pl.forwardRef(
  ({
    color: l = "currentColor",
    size: t = 24,
    strokeWidth: u = 2,
    absoluteStrokeWidth: a,
    className: e = "",
    children: n,
    iconNode: f,
    ...c
  }, i) => pl.createElement(
    "svg",
    {
      ref: i,
      ...t1,
      width: t,
      height: t,
      stroke: l,
      strokeWidth: a ? Number(u) * 24 / Number(t) : u,
      className: Cd("lucide", e),
      ...c
    },
    [
      ...f.map(([y, r]) => pl.createElement(y, r)),
      ...Array.isArray(n) ? n : [n]
    ]
  )
);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qn = (l, t) => {
  const u = pl.forwardRef(
    ({ className: a, ...e }, n) => pl.createElement(u1, {
      ref: n,
      iconNode: t,
      className: Cd(`lucide-${l1(l)}`, a),
      ...e
    })
  );
  return u.displayName = `${l}`, u;
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a1 = qn("CircleArrowUp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m16 12-4-4-4 4", key: "177agl" }],
  ["path", { d: "M12 16V8", key: "1sbj14" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e1 = qn("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n1 = qn("CreditCard", [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f1 = qn("Utensils", [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
]), Zd = (l) => {
  const t = new Date(l);
  if (isNaN(t.valueOf()))
    throw new Error("Invalid Date");
  return t;
}, c1 = (l) => {
  try {
    const t = Zd(l);
    return [
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    ];
  } catch {
    throw new Error("cannot destruct Date");
  }
}, i1 = (l) => {
  try {
    const t = Zd(l), [u, a, e] = c1(t), n = a + 1, f = n < 10 ? `0${n}` : `${n}`, c = e < 10 ? `0${e}` : `${e}`;
    return `${u}-${f}-${c}`;
  } catch {
    throw new Error("cannot format Date");
  }
}, s1 = ({
  sabreId: l,
  checkIn: t,
  nights: u = 1,
  numOfPeople: a = "2"
}) => {
  try {
    const e = i1(t);
    return `https://sabre-nodejs-9tia3.ondigitalocean.app/public/hotel/sabre/${l}/select-rooms-price/?check_in=${e}&nights=${u}&number_of_people=${a}`;
  } catch {
    throw new Error("cannot generate Sabre API Endpoint. Invalid checkIn value is given.");
  }
};
function o1({
  // 외부로부터 주입 받는 값
  checkIn: l,
  numOfPeople: t = "2",
  sabreId: u,
  nights: a = 1
}) {
  const [e, n] = pl.useState(), [f, c] = pl.useState(!1), [i, y] = pl.useState();
  return pl.useEffect(() => {
    (async () => {
      c(!0);
      try {
        const m = s1({ sabreId: u, checkIn: l, nights: a, numOfPeople: t }), d = await fetch(m, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          mode: "cors"
          // CORS 명시적 설정
        });
        if (!d.ok)
          throw new Error(`HTTP error! status: ${d.status}`);
        const v = await d.text(), b = JSON.parse(v);
        n(b);
      } catch (m) {
        console.error("Fetch error:", m), m instanceof TypeError && m.message.includes("Failed to fetch") && console.error("CORS error or network issue. Check browser console for details."), n(null);
      } finally {
        c(!1);
      }
    })();
  }, [l, a, t, u]), pl.useEffect(() => {
    try {
      if (e === null)
        throw new Error("no resData");
      const r = e == null ? void 0 : e.roomDescriptions;
      if (!(r != null && r.length) || (r == null ? void 0 : r.length) <= 0)
        throw new Error("no roomDescription");
      const m = r == null ? void 0 : r.sort((v, b) => ((v == null ? void 0 : v.price) || 0) - (b.price || 0)), d = (m == null ? void 0 : m[4]) || (m == null ? void 0 : m[0]);
      if (typeof (e == null ? void 0 : e.propertyNameKor) != "string" && typeof (e == null ? void 0 : e.propertyNameEng) != "string" || typeof d.price != "number" || typeof d.roomDescription != "string" || typeof d.cancelDeadLine != "string" || !/^\d{8}$/.test(d.cancelDeadLine))
        throw new Error("invalid room description data");
      y({
        hotelName: e.propertyNameKor || e.propertyNameEng,
        ...d,
        cancelDeadLine: d.cancelDeadLine.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
      });
    } catch {
      y("카카오톡 상담 필요");
    }
  }, [e]), /* @__PURE__ */ q.jsxs(
    "div",
    {
      className: "overflow-hidden bg-white shadow-md md:shadow-none rounded-xl",
      style: {
        border: "1px solid #e5398f",
        marginTop: "30px"
      },
      children: [
        /* @__PURE__ */ q.jsx("header", { className: "bg-[#e5398f] text-white p-3 text-center sm:text-left font-medium", children: "럭셔리 셀렉트 - 후불 현장 결제" }),
        /* @__PURE__ */ q.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 lg:gap-0 items-start justify-stretch", children: [
          /* @__PURE__ */ q.jsx("div", { className: "lg:col-span-3 p-4 sm:p-6 lg:p-8 lg:pr-4 px-0 py-0", children: /* @__PURE__ */ q.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 md:gap-6 items-start", children: /* @__PURE__ */ q.jsxs("div", { className: "sm:col-span-2 flex flex-col gap-3 p-4 md:p-0", children: [
            /* @__PURE__ */ q.jsx("span", { className: "font-semibold text-blue-600", children: "[후불 현장 결제]" }),
            f || !i ? /* @__PURE__ */ q.jsx("div", { className: "w-48 h-6 animate-pulse bg-gray-200 rounded-sm" }) : typeof i != "string" && /* @__PURE__ */ q.jsx("span", { className: "font-bold", children: i.hotelName }),
            /* @__PURE__ */ q.jsx(
              "div",
              {
                className: "flex items-center gap-1.5 text-blue-600",
                children: f || !i ? /* @__PURE__ */ q.jsx("div", { className: "w-60 h-5 animate-pulse bg-gray-200 rounded-sm" }) : typeof i != "string" && /* @__PURE__ */ q.jsxs(q.Fragment, { children: [
                  /* @__PURE__ */ q.jsx(
                    "img",
                    {
                      src: "https://static.priviatravel.com/images/front/mtravel/svg/ico-check-blue-circle.svg",
                      alt: "Free cancellation icon",
                      width: 20,
                      height: 20
                    }
                  ),
                  /* @__PURE__ */ q.jsxs("span", { className: "text-sm font-medium", children: [
                    i.cancelDeadLine,
                    " 까지 무료 취소"
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ q.jsx("div", { className: "pt-3 mt-1", children: /* @__PURE__ */ q.jsx("ul", { className: "space-y-2", children: [
              {
                icon: /* @__PURE__ */ q.jsx(f1, { className: "w-4 h-4 text-gray-500 px-0 py-0" }),
                benefit: "2인 조식 포함"
              },
              {
                icon: /* @__PURE__ */ q.jsx(n1, { className: "w-4 h-4 text-gray-500" }),
                benefit: "$100 크레딧 제공"
              },
              {
                icon: /* @__PURE__ */ q.jsx(a1, { className: "w-4 h-4 text-gray-500" }),
                benefit: "객실 무료 업그레이드 (현장 가능시)"
              },
              {
                icon: /* @__PURE__ */ q.jsx(e1, { className: "w-4 h-4 text-gray-500" }),
                benefit: "얼리체크인 & 레이트 체크아웃 (현장 가능시)"
              }
            ].map((r, m) => /* @__PURE__ */ q.jsxs(
              "li",
              {
                className: "flex items-center gap-2 text-sm text-gray-600",
                children: [
                  typeof r.icon == "string" ? /* @__PURE__ */ q.jsx(
                    "img",
                    {
                      src: r.icon || "/placeholder.svg",
                      alt: "",
                      width: 16,
                      height: 16
                    }
                  ) : r.icon,
                  /* @__PURE__ */ q.jsx("span", { children: r.benefit })
                ]
              },
              m
            )) }) })
          ] }) }) }),
          /* @__PURE__ */ q.jsxs("div", { className: "lg:col-span-2 p-4 sm:p-6 lg:p-8 lg:border-l lg:border-dashed lg:border-gray-300 flex flex-col justify-between h-full lg:pl-12 border-t border-dashed lg:border-t-0", children: [
            /* @__PURE__ */ q.jsxs("div", { className: "flex flex-row sm:justify-between sm:items-end mb-4 w-full gap-2 justify-between items-end", children: [
              /* @__PURE__ */ q.jsx("span", { className: "text-sm text-gray-500", children: "객실 요금" }),
              /* @__PURE__ */ q.jsxs("div", { className: "text-left sm:text-right", children: [
                /* @__PURE__ */ q.jsxs("div", { className: "text-gray-500 hidden sm:block text-left", children: [
                  a,
                  "박 예상결제가"
                ] }),
                /* @__PURE__ */ q.jsx("div", { className: "font-bold text-gray-800 text-2xl", children: f || !i ? /* @__PURE__ */ q.jsx("div", { className: "w-40 h-8 animate-pulse bg-gray-200 rounded-sm" }) : typeof i == "string" ? i : `${i.price.toLocaleString("ko-KR")}원 ~` })
              ] })
            ] }),
            /* @__PURE__ */ q.jsxs("div", { className: "w-full text-right space-y-4 mt-auto", children: [
              /* @__PURE__ */ q.jsx("div", { className: "text-xs text-red-500 text-left sm:text-right", children: /* @__PURE__ */ q.jsx("div", { children: "※ 현장 결제시 환율에 따라 최종 원화 결제 금액이 변동될 수 있습니다." }) }),
              /* @__PURE__ */ q.jsx(
                "a",
                {
                  href: "https://pf.kakao.com/_cxmxgNG/chat",
                  className: "inline-block bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors w-full sm:w-auto text-center font-medium",
                  children: "카카오톡 상담"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
typeof window < "u" && (window.React = Tc, window.ReactDOM = Gh);
const Vd = Fh(o1, {
  props: {
    sabreId: "number",
    checkIn: "string",
    nights: "number",
    numOfPeople: "string"
  }
});
typeof customElements < "u" && !customElements.get("select-hotel-product") && customElements.define("select-hotel-product", Vd);
typeof window < "u" && (window.SelectHotelProductWidget = Vd);
//# sourceMappingURL=select-hotel-product-widget-standalone.es.js.map
