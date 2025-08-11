import av, { forwardRef as Yb, createElement as xg, useState as Rg, useEffect as xb } from "react";
import Gb from "react-dom";
import { jsxs as Ou, jsx as Mt, Fragment as KS } from "react/jsx-runtime";
var Hg = { exports: {} }, l0 = {}, Pp = { exports: {} }, Og = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hb;
function $S() {
  return Hb || (Hb = 1, function(q) {
    function J(E, Q) {
      var Z = E.length;
      E.push(Q);
      e: for (; 0 < Z; ) {
        var ne = Z - 1 >>> 1, fe = E[ne];
        if (0 < de(fe, Q))
          E[ne] = Q, E[Z] = fe, Z = ne;
        else break e;
      }
    }
    function ce(E) {
      return E.length === 0 ? null : E[0];
    }
    function U(E) {
      if (E.length === 0) return null;
      var Q = E[0], Z = E.pop();
      if (Z !== Q) {
        E[0] = Z;
        e: for (var ne = 0, fe = E.length, ft = fe >>> 1; ne < ft; ) {
          var le = 2 * (ne + 1) - 1, Ye = E[le], We = le + 1, El = E[We];
          if (0 > de(Ye, Z))
            We < fe && 0 > de(El, Ye) ? (E[ne] = El, E[We] = Z, ne = We) : (E[ne] = Ye, E[le] = Z, ne = le);
          else if (We < fe && 0 > de(El, Z))
            E[ne] = El, E[We] = Z, ne = We;
          else break e;
        }
      }
      return Q;
    }
    function de(E, Q) {
      var Z = E.sortIndex - Q.sortIndex;
      return Z !== 0 ? Z : E.id - Q.id;
    }
    if (q.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var ke = performance;
      q.unstable_now = function() {
        return ke.now();
      };
    } else {
      var yt = Date, Bt = yt.now();
      q.unstable_now = function() {
        return yt.now() - Bt;
      };
    }
    var w = [], ut = [], ae = 1, pe = null, oe = 3, Te = !1, me = !1, qt = !1, Ve = !1, Ce = typeof setTimeout == "function" ? setTimeout : null, Ut = typeof clearTimeout == "function" ? clearTimeout : null, mt = typeof setImmediate < "u" ? setImmediate : null;
    function ql(E) {
      for (var Q = ce(ut); Q !== null; ) {
        if (Q.callback === null) U(ut);
        else if (Q.startTime <= E)
          U(ut), Q.sortIndex = Q.expirationTime, J(w, Q);
        else break;
        Q = ce(ut);
      }
    }
    function ma(E) {
      if (qt = !1, ql(E), !me)
        if (ce(w) !== null)
          me = !0, Yt || (Yt = !0, ze());
        else {
          var Q = ce(ut);
          Q !== null && hl(ma, Q.startTime - E);
        }
    }
    var Yt = !1, Ke = -1, Al = 5, te = -1;
    function xt() {
      return Ve ? !0 : !(q.unstable_now() - te < Al);
    }
    function lt() {
      if (Ve = !1, Yt) {
        var E = q.unstable_now();
        te = E;
        var Q = !0;
        try {
          e: {
            me = !1, qt && (qt = !1, Ut(Ke), Ke = -1), Te = !0;
            var Z = oe;
            try {
              t: {
                for (ql(E), pe = ce(w); pe !== null && !(pe.expirationTime > E && xt()); ) {
                  var ne = pe.callback;
                  if (typeof ne == "function") {
                    pe.callback = null, oe = pe.priorityLevel;
                    var fe = ne(
                      pe.expirationTime <= E
                    );
                    if (E = q.unstable_now(), typeof fe == "function") {
                      pe.callback = fe, ql(E), Q = !0;
                      break t;
                    }
                    pe === ce(w) && U(w), ql(E);
                  } else U(w);
                  pe = ce(w);
                }
                if (pe !== null) Q = !0;
                else {
                  var ft = ce(ut);
                  ft !== null && hl(
                    ma,
                    ft.startTime - E
                  ), Q = !1;
                }
              }
              break e;
            } finally {
              pe = null, oe = Z, Te = !1;
            }
            Q = void 0;
          }
        } finally {
          Q ? ze() : Yt = !1;
        }
      }
    }
    var ze;
    if (typeof mt == "function")
      ze = function() {
        mt(lt);
      };
    else if (typeof MessageChannel < "u") {
      var dl = new MessageChannel(), qa = dl.port2;
      dl.port1.onmessage = lt, ze = function() {
        qa.postMessage(null);
      };
    } else
      ze = function() {
        Ce(lt, 0);
      };
    function hl(E, Q) {
      Ke = Ce(function() {
        E(q.unstable_now());
      }, Q);
    }
    q.unstable_IdlePriority = 5, q.unstable_ImmediatePriority = 1, q.unstable_LowPriority = 4, q.unstable_NormalPriority = 3, q.unstable_Profiling = null, q.unstable_UserBlockingPriority = 2, q.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, q.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Al = 0 < E ? Math.floor(1e3 / E) : 5;
    }, q.unstable_getCurrentPriorityLevel = function() {
      return oe;
    }, q.unstable_next = function(E) {
      switch (oe) {
        case 1:
        case 2:
        case 3:
          var Q = 3;
          break;
        default:
          Q = oe;
      }
      var Z = oe;
      oe = Q;
      try {
        return E();
      } finally {
        oe = Z;
      }
    }, q.unstable_requestPaint = function() {
      Ve = !0;
    }, q.unstable_runWithPriority = function(E, Q) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var Z = oe;
      oe = E;
      try {
        return Q();
      } finally {
        oe = Z;
      }
    }, q.unstable_scheduleCallback = function(E, Q, Z) {
      var ne = q.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? ne + Z : ne) : Z = ne, E) {
        case 1:
          var fe = -1;
          break;
        case 2:
          fe = 250;
          break;
        case 5:
          fe = 1073741823;
          break;
        case 4:
          fe = 1e4;
          break;
        default:
          fe = 5e3;
      }
      return fe = Z + fe, E = {
        id: ae++,
        callback: Q,
        priorityLevel: E,
        startTime: Z,
        expirationTime: fe,
        sortIndex: -1
      }, Z > ne ? (E.sortIndex = Z, J(ut, E), ce(w) === null && E === ce(ut) && (qt ? (Ut(Ke), Ke = -1) : qt = !0, hl(ma, Z - ne))) : (E.sortIndex = fe, J(w, E), me || Te || (me = !0, Yt || (Yt = !0, ze()))), E;
    }, q.unstable_shouldYield = xt, q.unstable_wrapCallback = function(E) {
      var Q = oe;
      return function() {
        var Z = oe;
        oe = Q;
        try {
          return E.apply(this, arguments);
        } finally {
          oe = Z;
        }
      };
    };
  }(Og)), Og;
}
var Mg = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cb;
function kS() {
  return Cb || (Cb = 1, function(q) {
    process.env.NODE_ENV !== "production" && function() {
      function J() {
        if (ma = !1, te) {
          var E = q.unstable_now();
          ze = E;
          var Q = !0;
          try {
            e: {
              mt = !1, ql && (ql = !1, Ke(xt), xt = -1), Ut = !0;
              var Z = Ce;
              try {
                t: {
                  for (yt(E), Ve = U(Te); Ve !== null && !(Ve.expirationTime > E && w()); ) {
                    var ne = Ve.callback;
                    if (typeof ne == "function") {
                      Ve.callback = null, Ce = Ve.priorityLevel;
                      var fe = ne(
                        Ve.expirationTime <= E
                      );
                      if (E = q.unstable_now(), typeof fe == "function") {
                        Ve.callback = fe, yt(E), Q = !0;
                        break t;
                      }
                      Ve === U(Te) && de(Te), yt(E);
                    } else de(Te);
                    Ve = U(Te);
                  }
                  if (Ve !== null) Q = !0;
                  else {
                    var ft = U(me);
                    ft !== null && ut(
                      Bt,
                      ft.startTime - E
                    ), Q = !1;
                  }
                }
                break e;
              } finally {
                Ve = null, Ce = Z, Ut = !1;
              }
              Q = void 0;
            }
          } finally {
            Q ? dl() : te = !1;
          }
        }
      }
      function ce(E, Q) {
        var Z = E.length;
        E.push(Q);
        e: for (; 0 < Z; ) {
          var ne = Z - 1 >>> 1, fe = E[ne];
          if (0 < ke(fe, Q))
            E[ne] = Q, E[Z] = fe, Z = ne;
          else break e;
        }
      }
      function U(E) {
        return E.length === 0 ? null : E[0];
      }
      function de(E) {
        if (E.length === 0) return null;
        var Q = E[0], Z = E.pop();
        if (Z !== Q) {
          E[0] = Z;
          e: for (var ne = 0, fe = E.length, ft = fe >>> 1; ne < ft; ) {
            var le = 2 * (ne + 1) - 1, Ye = E[le], We = le + 1, El = E[We];
            if (0 > ke(Ye, Z))
              We < fe && 0 > ke(El, Ye) ? (E[ne] = El, E[We] = Z, ne = We) : (E[ne] = Ye, E[le] = Z, ne = le);
            else if (We < fe && 0 > ke(El, Z))
              E[ne] = El, E[We] = Z, ne = We;
            else break e;
          }
        }
        return Q;
      }
      function ke(E, Q) {
        var Z = E.sortIndex - Q.sortIndex;
        return Z !== 0 ? Z : E.id - Q.id;
      }
      function yt(E) {
        for (var Q = U(me); Q !== null; ) {
          if (Q.callback === null) de(me);
          else if (Q.startTime <= E)
            de(me), Q.sortIndex = Q.expirationTime, ce(Te, Q);
          else break;
          Q = U(me);
        }
      }
      function Bt(E) {
        if (ql = !1, yt(E), !mt)
          if (U(Te) !== null)
            mt = !0, te || (te = !0, dl());
          else {
            var Q = U(me);
            Q !== null && ut(
              Bt,
              Q.startTime - E
            );
          }
      }
      function w() {
        return ma ? !0 : !(q.unstable_now() - ze < lt);
      }
      function ut(E, Q) {
        xt = Yt(function() {
          E(q.unstable_now());
        }, Q);
      }
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), q.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var ae = performance;
        q.unstable_now = function() {
          return ae.now();
        };
      } else {
        var pe = Date, oe = pe.now();
        q.unstable_now = function() {
          return pe.now() - oe;
        };
      }
      var Te = [], me = [], qt = 1, Ve = null, Ce = 3, Ut = !1, mt = !1, ql = !1, ma = !1, Yt = typeof setTimeout == "function" ? setTimeout : null, Ke = typeof clearTimeout == "function" ? clearTimeout : null, Al = typeof setImmediate < "u" ? setImmediate : null, te = !1, xt = -1, lt = 5, ze = -1;
      if (typeof Al == "function")
        var dl = function() {
          Al(J);
        };
      else if (typeof MessageChannel < "u") {
        var qa = new MessageChannel(), hl = qa.port2;
        qa.port1.onmessage = J, dl = function() {
          hl.postMessage(null);
        };
      } else
        dl = function() {
          Yt(J, 0);
        };
      q.unstable_IdlePriority = 5, q.unstable_ImmediatePriority = 1, q.unstable_LowPriority = 4, q.unstable_NormalPriority = 3, q.unstable_Profiling = null, q.unstable_UserBlockingPriority = 2, q.unstable_cancelCallback = function(E) {
        E.callback = null;
      }, q.unstable_forceFrameRate = function(E) {
        0 > E || 125 < E ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : lt = 0 < E ? Math.floor(1e3 / E) : 5;
      }, q.unstable_getCurrentPriorityLevel = function() {
        return Ce;
      }, q.unstable_next = function(E) {
        switch (Ce) {
          case 1:
          case 2:
          case 3:
            var Q = 3;
            break;
          default:
            Q = Ce;
        }
        var Z = Ce;
        Ce = Q;
        try {
          return E();
        } finally {
          Ce = Z;
        }
      }, q.unstable_requestPaint = function() {
        ma = !0;
      }, q.unstable_runWithPriority = function(E, Q) {
        switch (E) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            E = 3;
        }
        var Z = Ce;
        Ce = E;
        try {
          return Q();
        } finally {
          Ce = Z;
        }
      }, q.unstable_scheduleCallback = function(E, Q, Z) {
        var ne = q.unstable_now();
        switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? ne + Z : ne) : Z = ne, E) {
          case 1:
            var fe = -1;
            break;
          case 2:
            fe = 250;
            break;
          case 5:
            fe = 1073741823;
            break;
          case 4:
            fe = 1e4;
            break;
          default:
            fe = 5e3;
        }
        return fe = Z + fe, E = {
          id: qt++,
          callback: Q,
          priorityLevel: E,
          startTime: Z,
          expirationTime: fe,
          sortIndex: -1
        }, Z > ne ? (E.sortIndex = Z, ce(me, E), U(Te) === null && E === U(me) && (ql ? (Ke(xt), xt = -1) : ql = !0, ut(Bt, Z - ne))) : (E.sortIndex = fe, ce(Te, E), mt || Ut || (mt = !0, te || (te = !0, dl()))), E;
      }, q.unstable_shouldYield = w, q.unstable_wrapCallback = function(E) {
        var Q = Ce;
        return function() {
          var Z = Ce;
          Ce = Q;
          try {
            return E.apply(this, arguments);
          } finally {
            Ce = Z;
          }
        };
      }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(Mg)), Mg;
}
var Nb;
function Vb() {
  return Nb || (Nb = 1, process.env.NODE_ENV === "production" ? Pp.exports = $S() : Pp.exports = kS()), Pp.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bb;
function WS() {
  if (Bb) return l0;
  Bb = 1;
  var q = Vb(), J = av, ce = Gb;
  function U(l) {
    var n = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        n += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function de(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function ke(l) {
    var n = l, u = l;
    if (l.alternate) for (; n.return; ) n = n.return;
    else {
      l = n;
      do
        n = l, n.flags & 4098 && (u = n.return), l = n.return;
      while (l);
    }
    return n.tag === 3 ? u : null;
  }
  function yt(l) {
    if (l.tag === 13) {
      var n = l.memoizedState;
      if (n === null && (l = l.alternate, l !== null && (n = l.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function Bt(l) {
    if (ke(l) !== l)
      throw Error(U(188));
  }
  function w(l) {
    var n = l.alternate;
    if (!n) {
      if (n = ke(l), n === null) throw Error(U(188));
      return n !== l ? null : l;
    }
    for (var u = l, c = n; ; ) {
      var s = u.return;
      if (s === null) break;
      var r = s.alternate;
      if (r === null) {
        if (c = s.return, c !== null) {
          u = c;
          continue;
        }
        break;
      }
      if (s.child === r.child) {
        for (r = s.child; r; ) {
          if (r === u) return Bt(s), l;
          if (r === c) return Bt(s), n;
          r = r.sibling;
        }
        throw Error(U(188));
      }
      if (u.return !== c.return) u = s, c = r;
      else {
        for (var y = !1, m = s.child; m; ) {
          if (m === u) {
            y = !0, u = s, c = r;
            break;
          }
          if (m === c) {
            y = !0, c = s, u = r;
            break;
          }
          m = m.sibling;
        }
        if (!y) {
          for (m = r.child; m; ) {
            if (m === u) {
              y = !0, u = r, c = s;
              break;
            }
            if (m === c) {
              y = !0, c = r, u = s;
              break;
            }
            m = m.sibling;
          }
          if (!y) throw Error(U(189));
        }
      }
      if (u.alternate !== c) throw Error(U(190));
    }
    if (u.tag !== 3) throw Error(U(188));
    return u.stateNode.current === u ? l : n;
  }
  function ut(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l;
    for (l = l.child; l !== null; ) {
      if (n = ut(l), n !== null) return n;
      l = l.sibling;
    }
    return null;
  }
  var ae = Object.assign, pe = Symbol.for("react.element"), oe = Symbol.for("react.transitional.element"), Te = Symbol.for("react.portal"), me = Symbol.for("react.fragment"), qt = Symbol.for("react.strict_mode"), Ve = Symbol.for("react.profiler"), Ce = Symbol.for("react.provider"), Ut = Symbol.for("react.consumer"), mt = Symbol.for("react.context"), ql = Symbol.for("react.forward_ref"), ma = Symbol.for("react.suspense"), Yt = Symbol.for("react.suspense_list"), Ke = Symbol.for("react.memo"), Al = Symbol.for("react.lazy"), te = Symbol.for("react.activity"), xt = Symbol.for("react.memo_cache_sentinel"), lt = Symbol.iterator;
  function ze(l) {
    return l === null || typeof l != "object" ? null : (l = lt && l[lt] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var dl = Symbol.for("react.client.reference");
  function qa(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === dl ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case me:
        return "Fragment";
      case Ve:
        return "Profiler";
      case qt:
        return "StrictMode";
      case ma:
        return "Suspense";
      case Yt:
        return "SuspenseList";
      case te:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Te:
          return "Portal";
        case mt:
          return (l.displayName || "Context") + ".Provider";
        case Ut:
          return (l._context.displayName || "Context") + ".Consumer";
        case ql:
          var n = l.render;
          return l = l.displayName, l || (l = n.displayName || n.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Ke:
          return n = l.displayName || null, n !== null ? n : qa(l.type) || "Memo";
        case Al:
          n = l._payload, l = l._init;
          try {
            return qa(l(n));
          } catch {
          }
      }
    return null;
  }
  var hl = Array.isArray, E = J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = ce.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ne = [], fe = -1;
  function ft(l) {
    return { current: l };
  }
  function le(l) {
    0 > fe || (l.current = ne[fe], ne[fe] = null, fe--);
  }
  function Ye(l, n) {
    fe++, ne[fe] = l.current, l.current = n;
  }
  var We = ft(null), El = ft(null), Ze = ft(null), Xs = ft(null);
  function ko(l, n) {
    switch (Ye(Ze, n), Ye(El, l), Ye(We, null), n.nodeType) {
      case 9:
      case 11:
        l = (l = n.documentElement) && (l = l.namespaceURI) ? pu(l) : 0;
        break;
      default:
        if (l = n.tagName, n = n.namespaceURI)
          n = pu(n), l = Do(n, l);
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
    le(We), Ye(We, l);
  }
  function tn() {
    le(We), le(El), le(Ze);
  }
  function Mu(l) {
    l.memoizedState !== null && Ye(Xs, l);
    var n = We.current, u = Do(n, l.type);
    n !== u && (Ye(El, l), Ye(We, u));
  }
  function Wo(l) {
    El.current === l && (le(We), le(El)), Xs.current === l && (le(Xs), Wl._currentValue = Z);
  }
  var Qs = Object.prototype.hasOwnProperty, Ti = q.unstable_scheduleCallback, sh = q.unstable_cancelCallback, uv = q.unstable_shouldYield, Ai = q.unstable_requestPaint, Il = q.unstable_now, Fo = q.unstable_getCurrentPriorityLevel, n0 = q.unstable_ImmediatePriority, rh = q.unstable_UserBlockingPriority, Io = q.unstable_NormalPriority, dh = q.unstable_LowPriority, Hc = q.unstable_IdlePriority, iv = q.log, u0 = q.unstable_setDisableYieldValue, Cc = null, zl = null;
  function Kn(l) {
    if (typeof iv == "function" && u0(l), zl && typeof zl.setStrictMode == "function")
      try {
        zl.setStrictMode(Cc, l);
      } catch {
      }
  }
  var Yl = Math.clz32 ? Math.clz32 : cv, hh = Math.log, i0 = Math.LN2;
  function cv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (hh(l) / i0 | 0) | 0;
  }
  var Nc = 256, $n = 4194304;
  function Pl(l) {
    var n = l & 42;
    if (n !== 0) return n;
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
  function Uu(l, n, u) {
    var c = l.pendingLanes;
    if (c === 0) return 0;
    var s = 0, r = l.suspendedLanes, y = l.pingedLanes;
    l = l.warmLanes;
    var m = c & 134217727;
    return m !== 0 ? (c = m & ~r, c !== 0 ? s = Pl(c) : (y &= m, y !== 0 ? s = Pl(y) : u || (u = m & ~l, u !== 0 && (s = Pl(u))))) : (m = c & ~r, m !== 0 ? s = Pl(m) : y !== 0 ? s = Pl(y) : u || (u = c & ~l, u !== 0 && (s = Pl(u)))), s === 0 ? 0 : n !== 0 && n !== s && !(n & r) && (r = s & -s, u = n & -n, r >= u || r === 32 && (u & 4194048) !== 0) ? n : s;
  }
  function ln(l, n) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & n) === 0;
  }
  function Lt(l, n) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
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
        return n + 5e3;
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
  function xu() {
    var l = Nc;
    return Nc <<= 1, !(Nc & 4194048) && (Nc = 256), l;
  }
  function Ei() {
    var l = $n;
    return $n <<= 1, !($n & 62914560) && ($n = 4194304), l;
  }
  function Hu(l) {
    for (var n = [], u = 0; 31 > u; u++) n.push(l);
    return n;
  }
  function zi(l, n) {
    l.pendingLanes |= n, n !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function c0(l, n, u, c, s, r) {
    var y = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var m = l.entanglements, g = l.expirationTimes, R = l.hiddenUpdates;
    for (u = y & ~u; 0 < u; ) {
      var V = 31 - Yl(u), X = 1 << V;
      m[V] = 0, g[V] = -1;
      var M = R[V];
      if (M !== null)
        for (R[V] = null, V = 0; V < M.length; V++) {
          var H = M[V];
          H !== null && (H.lane &= -536870913);
        }
      u &= ~X;
    }
    c !== 0 && Po(l, c, 0), r !== 0 && s === 0 && l.tag !== 0 && (l.suspendedLanes |= r & ~(y & ~n));
  }
  function Po(l, n, u) {
    l.pendingLanes |= n, l.suspendedLanes &= ~n;
    var c = 31 - Yl(n);
    l.entangledLanes |= n, l.entanglements[c] = l.entanglements[c] | 1073741824 | u & 4194090;
  }
  function ef(l, n) {
    var u = l.entangledLanes |= n;
    for (l = l.entanglements; u; ) {
      var c = 31 - Yl(u), s = 1 << c;
      s & n | l[c] & n && (l[c] |= n), u &= ~s;
    }
  }
  function Ya(l) {
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
  function js(l) {
    return l &= -l, 2 < l ? 8 < l ? l & 134217727 ? 32 : 268435456 : 8 : 2;
  }
  function o0() {
    var l = Q.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : vm(l.type));
  }
  function ov(l, n) {
    var u = Q.p;
    try {
      return Q.p = l, n();
    } finally {
      Q.p = u;
    }
  }
  var Gt = Math.random().toString(36).slice(2), Jt = "__reactFiber$" + Gt, Dl = "__reactProps$" + Gt, Bc = "__reactContainer$" + Gt, ws = "__reactEvents$" + Gt, f0 = "__reactListeners$" + Gt, Zs = "__reactHandles$" + Gt, s0 = "__reactResources$" + Gt, k = "__reactMarker$" + Gt;
  function tf(l) {
    delete l[Jt], delete l[Dl], delete l[ws], delete l[f0], delete l[Zs];
  }
  function el(l) {
    var n = l[Jt];
    if (n) return n;
    for (var u = l.parentNode; u; ) {
      if (n = u[Bc] || u[Jt]) {
        if (u = n.alternate, n.child !== null || u !== null && u.child !== null)
          for (l = cl(l); l !== null; ) {
            if (u = l[Jt]) return u;
            l = cl(l);
          }
        return n;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function Di(l) {
    if (l = l[Jt] || l[Bc]) {
      var n = l.tag;
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3)
        return l;
    }
    return null;
  }
  function lf(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l.stateNode;
    throw Error(U(33));
  }
  function kn(l) {
    var n = l[s0];
    return n || (n = l[s0] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Vt(l) {
    l[k] = !0;
  }
  var af = /* @__PURE__ */ new Set(), ea = {};
  function Cu(l, n) {
    Nu(l, n), Nu(l + "Capture", n);
  }
  function Nu(l, n) {
    for (ea[l] = n, l = 0; l < n.length; l++)
      af.add(n[l]);
  }
  var r0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ls = {}, yh = {};
  function d0(l) {
    return Qs.call(yh, l) ? !0 : Qs.call(Ls, l) ? !1 : r0.test(l) ? yh[l] = !0 : (Ls[l] = !0, !1);
  }
  function Wn(l, n, u) {
    if (d0(n))
      if (u === null) l.removeAttribute(n);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(n);
            return;
          case "boolean":
            var c = n.toLowerCase().slice(0, 5);
            if (c !== "data-" && c !== "aria-") {
              l.removeAttribute(n);
              return;
            }
        }
        l.setAttribute(n, "" + u);
      }
  }
  function nf(l, n, u) {
    if (u === null) l.removeAttribute(n);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(n);
          return;
      }
      l.setAttribute(n, "" + u);
    }
  }
  function an(l, n, u, c) {
    if (c === null) l.removeAttribute(u);
    else {
      switch (typeof c) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(n, u, "" + c);
    }
  }
  var Js, mh;
  function Ri(l) {
    if (Js === void 0)
      try {
        throw Error();
      } catch (u) {
        var n = u.stack.trim().match(/\n( *(at )?)/);
        Js = n && n[1] || "", mh = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Js + l + mh;
  }
  var Rl = !1;
  function Bu(l, n) {
    if (!l || Rl) return "";
    Rl = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var c = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var X = function() {
                throw Error();
              };
              if (Object.defineProperty(X.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(X, []);
                } catch (H) {
                  var M = H;
                }
                Reflect.construct(l, [], X);
              } else {
                try {
                  X.call();
                } catch (H) {
                  M = H;
                }
                l.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (H) {
                M = H;
              }
              (X = l()) && typeof X.catch == "function" && X.catch(function() {
              });
            }
          } catch (H) {
            if (H && M && typeof H.stack == "string")
              return [H.stack, M.stack];
          }
          return [null, null];
        }
      };
      c.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        c.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        c.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var r = c.DetermineComponentFrameRoot(), y = r[0], m = r[1];
      if (y && m) {
        var g = y.split(`
`), R = m.split(`
`);
        for (s = c = 0; c < g.length && !g[c].includes("DetermineComponentFrameRoot"); )
          c++;
        for (; s < R.length && !R[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (c === g.length || s === R.length)
          for (c = g.length - 1, s = R.length - 1; 1 <= c && 0 <= s && g[c] !== R[s]; )
            s--;
        for (; 1 <= c && 0 <= s; c--, s--)
          if (g[c] !== R[s]) {
            if (c !== 1 || s !== 1)
              do
                if (c--, s--, 0 > s || g[c] !== R[s]) {
                  var V = `
` + g[c].replace(" at new ", " at ");
                  return l.displayName && V.includes("<anonymous>") && (V = V.replace("<anonymous>", l.displayName)), V;
                }
              while (1 <= c && 0 <= s);
            break;
          }
      }
    } finally {
      Rl = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? Ri(u) : "";
  }
  function Oi(l) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ri(l.type);
      case 16:
        return Ri("Lazy");
      case 13:
        return Ri("Suspense");
      case 19:
        return Ri("SuspenseList");
      case 0:
      case 15:
        return Bu(l.type, !1);
      case 11:
        return Bu(l.type.render, !1);
      case 1:
        return Bu(l.type, !0);
      case 31:
        return Ri("Activity");
      default:
        return "";
    }
  }
  function ph(l) {
    try {
      var n = "";
      do
        n += Oi(l), l = l.return;
      while (l);
      return n;
    } catch (u) {
      return `
Error generating stack: ` + u.message + `
` + u.stack;
    }
  }
  function yl(l) {
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
  function uf(l) {
    var n = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function vh(l) {
    var n = uf(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      n
    ), c = "" + l[n];
    if (!l.hasOwnProperty(n) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var s = u.get, r = u.set;
      return Object.defineProperty(l, n, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(y) {
          c = "" + y, r.call(this, y);
        }
      }), Object.defineProperty(l, n, {
        enumerable: u.enumerable
      }), {
        getValue: function() {
          return c;
        },
        setValue: function(y) {
          c = "" + y;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[n];
        }
      };
    }
  }
  function qu(l) {
    l._valueTracker || (l._valueTracker = vh(l));
  }
  function Mi(l) {
    if (!l) return !1;
    var n = l._valueTracker;
    if (!n) return !0;
    var u = n.getValue(), c = "";
    return l && (c = uf(l) ? l.checked ? "true" : "false" : l.value), l = c, l !== u ? (n.setValue(l), !0) : !1;
  }
  function qc(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var fv = /[\n"\\]/g;
  function pa(l) {
    return l.replace(
      fv,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ks(l, n, u, c, s, r, y, m) {
    l.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? l.type = y : l.removeAttribute("type"), n != null ? y === "number" ? (n === 0 && l.value === "" || l.value != n) && (l.value = "" + yl(n)) : l.value !== "" + yl(n) && (l.value = "" + yl(n)) : y !== "submit" && y !== "reset" || l.removeAttribute("value"), n != null ? cf(l, y, yl(n)) : u != null ? cf(l, y, yl(u)) : c != null && l.removeAttribute("value"), s == null && r != null && (l.defaultChecked = !!r), s != null && (l.checked = s && typeof s != "function" && typeof s != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? l.name = "" + yl(m) : l.removeAttribute("name");
  }
  function $s(l, n, u, c, s, r, y, m) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (l.type = r), n != null || u != null) {
      if (!(r !== "submit" && r !== "reset" || n != null))
        return;
      u = u != null ? "" + yl(u) : "", n = n != null ? "" + yl(n) : u, m || n === l.value || (l.value = n), l.defaultValue = n;
    }
    c = c ?? s, c = typeof c != "function" && typeof c != "symbol" && !!c, l.checked = m ? l.checked : !!c, l.defaultChecked = !!c, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (l.name = y);
  }
  function cf(l, n, u) {
    n === "number" && qc(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function Ui(l, n, u, c) {
    if (l = l.options, n) {
      n = {};
      for (var s = 0; s < u.length; s++)
        n["$" + u[s]] = !0;
      for (u = 0; u < l.length; u++)
        s = n.hasOwnProperty("$" + l[u].value), l[u].selected !== s && (l[u].selected = s), s && c && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + yl(u), n = null, s = 0; s < l.length; s++) {
        if (l[s].value === u) {
          l[s].selected = !0, c && (l[s].defaultSelected = !0);
          return;
        }
        n !== null || l[s].disabled || (n = l[s]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function gh(l, n, u) {
    if (n != null && (n = "" + yl(n), n !== l.value && (l.value = n), u == null)) {
      l.defaultValue !== n && (l.defaultValue = n);
      return;
    }
    l.defaultValue = u != null ? "" + yl(u) : "";
  }
  function bh(l, n, u, c) {
    if (n == null) {
      if (c != null) {
        if (u != null) throw Error(U(92));
        if (hl(c)) {
          if (1 < c.length) throw Error(U(93));
          c = c[0];
        }
        u = c;
      }
      u == null && (u = ""), n = u;
    }
    u = yl(n), l.defaultValue = u, c = l.textContent, c === u && c !== "" && c !== null && (l.value = c);
  }
  function Yc(l, n) {
    if (n) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = n;
        return;
      }
    }
    l.textContent = n;
  }
  var h0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ks(l, n, u) {
    var c = n.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? c ? l.setProperty(n, "") : n === "float" ? l.cssFloat = "" : l[n] = "" : c ? l.setProperty(n, u) : typeof u != "number" || u === 0 || h0.has(n) ? n === "float" ? l.cssFloat = u : l[n] = ("" + u).trim() : l[n] = u + "px";
  }
  function of(l, n, u) {
    if (n != null && typeof n != "object")
      throw Error(U(62));
    if (l = l.style, u != null) {
      for (var c in u)
        !u.hasOwnProperty(c) || n != null && n.hasOwnProperty(c) || (c.indexOf("--") === 0 ? l.setProperty(c, "") : c === "float" ? l.cssFloat = "" : l[c] = "");
      for (var s in n)
        c = n[s], n.hasOwnProperty(s) && u[s] !== c && ks(l, s, c);
    } else
      for (var r in n)
        n.hasOwnProperty(r) && ks(l, r, n[r]);
  }
  function xi(l) {
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
  var sv = /* @__PURE__ */ new Map([
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
  ]), y0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ff(l) {
    return y0.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  var Hi = null;
  function Ws(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Gc = null, Vc = null;
  function m0(l) {
    var n = Di(l);
    if (n && (l = n.stateNode)) {
      var u = l[Dl] || null;
      e: switch (l = n.stateNode, n.type) {
        case "input":
          if (Ks(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), n = u.name, u.type === "radio" && n != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + pa(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < u.length; n++) {
              var c = u[n];
              if (c !== l && c.form === l.form) {
                var s = c[Dl] || null;
                if (!s) throw Error(U(90));
                Ks(
                  c,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (n = 0; n < u.length; n++)
              c = u[n], c.form === l.form && Mi(c);
          }
          break e;
        case "textarea":
          gh(l, u.value, u.defaultValue);
          break e;
        case "select":
          n = u.value, n != null && Ui(l, !!u.multiple, n, !1);
      }
    }
  }
  var Sh = !1;
  function _c(l, n, u) {
    if (Sh) return l(n, u);
    Sh = !0;
    try {
      var c = l(n);
      return c;
    } finally {
      if (Sh = !1, (Gc !== null || Vc !== null) && (fc(), Gc && (n = Gc, l = Vc, Vc = Gc = null, m0(n), l)))
        for (n = 0; n < l.length; n++) m0(l[n]);
    }
  }
  function Ci(l, n) {
    var u = l.stateNode;
    if (u === null) return null;
    var c = u[Dl] || null;
    if (c === null) return null;
    u = c[n];
    e: switch (n) {
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
        (c = !c.disabled) || (l = l.type, c = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !c;
        break e;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function")
      throw Error(
        U(231, n, typeof u)
      );
    return u;
  }
  var nn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Fs = !1;
  if (nn)
    try {
      var Fn = {};
      Object.defineProperty(Fn, "passive", {
        get: function() {
          Fs = !0;
        }
      }), window.addEventListener("test", Fn, Fn), window.removeEventListener("test", Fn, Fn);
    } catch {
      Fs = !1;
    }
  var In = null, Xc = null, Ni = null;
  function Th() {
    if (Ni) return Ni;
    var l, n = Xc, u = n.length, c, s = "value" in In ? In.value : In.textContent, r = s.length;
    for (l = 0; l < u && n[l] === s[l]; l++) ;
    var y = u - l;
    for (c = 1; c <= y && n[u - c] === s[r - c]; c++) ;
    return Ni = s.slice(l, 1 < c ? 1 - c : void 0);
  }
  function tl(l) {
    var n = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && n === 13 && (l = 13)) : l = n, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Is() {
    return !0;
  }
  function Ps() {
    return !1;
  }
  function Ol(l) {
    function n(u, c, s, r, y) {
      this._reactName = u, this._targetInst = s, this.type = c, this.nativeEvent = r, this.target = y, this.currentTarget = null;
      for (var m in l)
        l.hasOwnProperty(m) && (u = l[m], this[m] = u ? u(r) : r[m]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Is : Ps, this.isPropagationStopped = Ps, this;
    }
    return ae(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Is);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Is);
      },
      persist: function() {
      },
      isPersistent: Is
    }), n;
  }
  var Yu = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, er = Ol(Yu), sf = ae({}, Yu, { view: 0, detail: 0 }), p0 = Ol(sf), Ah, tr, rf, Bi = ae({}, sf, {
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
    getModifierState: Pn,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== rf && (rf && l.type === "mousemove" ? (Ah = l.screenX - rf.screenX, tr = l.screenY - rf.screenY) : tr = Ah = 0, rf = l), Ah);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : tr;
    }
  }), Eh = Ol(Bi), v0 = ae({}, Bi, { dataTransfer: 0 }), g0 = Ol(v0), rv = ae({}, sf, { relatedTarget: 0 }), zh = Ol(rv), dv = ae({}, Yu, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), hv = Ol(dv), yv = ae({}, Yu, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), df = Ol(yv), b0 = ae({}, Yu, { data: 0 }), Dh = Ol(b0), S0 = {
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
  }, T0 = {
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
  }, Rh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function A0(l) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(l) : (l = Rh[l]) ? !!n[l] : !1;
  }
  function Pn() {
    return A0;
  }
  var qi = ae({}, sf, {
    key: function(l) {
      if (l.key) {
        var n = S0[l.key] || l.key;
        if (n !== "Unidentified") return n;
      }
      return l.type === "keypress" ? (l = tl(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? T0[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Pn,
    charCode: function(l) {
      return l.type === "keypress" ? tl(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? tl(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Ga = Ol(qi), ta = ae({}, Bi, {
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
  }), hf = Ol(ta), lr = ae({}, sf, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pn
  }), Oh = Ol(lr), Gl = ae({}, Yu, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), E0 = Ol(Gl), ar = ae({}, Bi, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Yi = Ol(ar), Mh = ae({}, Yu, {
    newState: 0,
    oldState: 0
  }), z0 = Ol(Mh), D0 = [9, 13, 27, 32], yf = nn && "CompositionEvent" in window, mf = null;
  nn && "documentMode" in document && (mf = document.documentMode);
  var Uh = nn && "TextEvent" in window && !mf, un = nn && (!yf || mf && 8 < mf && 11 >= mf), xh = " ", nr = !1;
  function pf(l, n) {
    switch (l) {
      case "keyup":
        return D0.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Gu(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Vu = !1;
  function Hh(l, n) {
    switch (l) {
      case "compositionend":
        return Gu(n);
      case "keypress":
        return n.which !== 32 ? null : (nr = !0, xh);
      case "textInput":
        return l = n.data, l === xh && nr ? null : l;
      default:
        return null;
    }
  }
  function Gi(l, n) {
    if (Vu)
      return l === "compositionend" || !yf && pf(l, n) ? (l = Th(), Ni = Xc = In = null, Vu = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return un && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var R0 = {
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
  function ur(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n === "input" ? !!R0[l.type] : n === "textarea";
  }
  function ir(l, n, u, c) {
    Gc ? Vc ? Vc.push(c) : Vc = [c] : Gc = c, n = zo(n, "onChange"), 0 < n.length && (u = new er(
      "onChange",
      "change",
      null,
      u,
      c
    ), l.push({ event: u, listeners: n }));
  }
  var Va = null, _a = null;
  function Ch(l) {
    hc(l, 0);
  }
  function cn(l) {
    var n = lf(l);
    if (Mi(n)) return l;
  }
  function Nh(l, n) {
    if (l === "change") return n;
  }
  var Bh = !1;
  if (nn) {
    var Vi;
    if (nn) {
      var _i = "oninput" in document;
      if (!_i) {
        var qh = document.createElement("div");
        qh.setAttribute("oninput", "return;"), _i = typeof qh.oninput == "function";
      }
      Vi = _i;
    } else Vi = !1;
    Bh = Vi && (!document.documentMode || 9 < document.documentMode);
  }
  function Qc() {
    Va && (Va.detachEvent("onpropertychange", Yh), _a = Va = null);
  }
  function Yh(l) {
    if (l.propertyName === "value" && cn(_a)) {
      var n = [];
      ir(
        n,
        _a,
        l,
        Ws(l)
      ), _c(Ch, n);
    }
  }
  function cr(l, n, u) {
    l === "focusin" ? (Qc(), Va = n, _a = u, Va.attachEvent("onpropertychange", Yh)) : l === "focusout" && Qc();
  }
  function _u(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return cn(_a);
  }
  function eu(l, n) {
    if (l === "click") return cn(n);
  }
  function Gh(l, n) {
    if (l === "input" || l === "change")
      return cn(n);
  }
  function Vh(l, n) {
    return l === n && (l !== 0 || 1 / l === 1 / n) || l !== l && n !== n;
  }
  var ll = typeof Object.is == "function" ? Object.is : Vh;
  function Xu(l, n) {
    if (ll(l, n)) return !0;
    if (typeof l != "object" || l === null || typeof n != "object" || n === null)
      return !1;
    var u = Object.keys(l), c = Object.keys(n);
    if (u.length !== c.length) return !1;
    for (c = 0; c < u.length; c++) {
      var s = u[c];
      if (!Qs.call(n, s) || !ll(l[s], n[s]))
        return !1;
    }
    return !0;
  }
  function Qu(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function it(l, n) {
    var u = Qu(l);
    l = 0;
    for (var c; u; ) {
      if (u.nodeType === 3) {
        if (c = l + u.textContent.length, l <= n && c >= n)
          return { node: u, offset: n - l };
        l = c;
      }
      e: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = Qu(u);
    }
  }
  function vf(l, n) {
    return l && n ? l === n ? !0 : l && l.nodeType === 3 ? !1 : n && n.nodeType === 3 ? vf(l, n.parentNode) : "contains" in l ? l.contains(n) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function _h(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var n = qc(l.document); n instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof n.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = n.contentWindow;
      else break;
      n = qc(l.document);
    }
    return n;
  }
  function gf(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n && (n === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || n === "textarea" || l.contentEditable === "true");
  }
  var Xi = nn && "documentMode" in document && 11 >= document.documentMode, on = null, Xa = null, ju = null, Qi = !1;
  function or(l, n, u) {
    var c = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Qi || on == null || on !== qc(c) || (c = on, "selectionStart" in c && gf(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
      anchorNode: c.anchorNode,
      anchorOffset: c.anchorOffset,
      focusNode: c.focusNode,
      focusOffset: c.focusOffset
    }), ju && Xu(ju, c) || (ju = c, c = zo(Xa, "onSelect"), 0 < c.length && (n = new er(
      "onSelect",
      "select",
      null,
      n,
      u
    ), l.push({ event: n, listeners: c }), n.target = on)));
  }
  function tu(l, n) {
    var u = {};
    return u[l.toLowerCase()] = n.toLowerCase(), u["Webkit" + l] = "webkit" + n, u["Moz" + l] = "moz" + n, u;
  }
  var ji = {
    animationend: tu("Animation", "AnimationEnd"),
    animationiteration: tu("Animation", "AnimationIteration"),
    animationstart: tu("Animation", "AnimationStart"),
    transitionrun: tu("Transition", "TransitionRun"),
    transitionstart: tu("Transition", "TransitionStart"),
    transitioncancel: tu("Transition", "TransitionCancel"),
    transitionend: tu("Transition", "TransitionEnd")
  }, va = {}, Qa = {};
  nn && (Qa = document.createElement("div").style, "AnimationEvent" in window || (delete ji.animationend.animation, delete ji.animationiteration.animation, delete ji.animationstart.animation), "TransitionEvent" in window || delete ji.transitionend.transition);
  function fn(l) {
    if (va[l]) return va[l];
    if (!ji[l]) return l;
    var n = ji[l], u;
    for (u in n)
      if (n.hasOwnProperty(u) && u in Qa)
        return va[l] = n[u];
    return l;
  }
  var O0 = fn("animationend"), Xh = fn("animationiteration"), M0 = fn("animationstart"), Qh = fn("transitionrun"), fr = fn("transitionstart"), U0 = fn("transitioncancel"), jh = fn("transitionend"), wh = /* @__PURE__ */ new Map(), jc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  jc.push("scrollEnd");
  function ga(l, n) {
    wh.set(l, n), Cu(n, [l]);
  }
  var Zh = /* @__PURE__ */ new WeakMap();
  function la(l, n) {
    if (typeof l == "object" && l !== null) {
      var u = Zh.get(l);
      return u !== void 0 ? u : (n = {
        value: l,
        source: n,
        stack: ph(n)
      }, Zh.set(l, n), n);
    }
    return {
      value: l,
      source: n,
      stack: ph(n)
    };
  }
  var Vl = [], wu = 0, sn = 0;
  function ja() {
    for (var l = wu, n = sn = wu = 0; n < l; ) {
      var u = Vl[n];
      Vl[n++] = null;
      var c = Vl[n];
      Vl[n++] = null;
      var s = Vl[n];
      Vl[n++] = null;
      var r = Vl[n];
      if (Vl[n++] = null, c !== null && s !== null) {
        var y = c.pending;
        y === null ? s.next = s : (s.next = y.next, y.next = s), c.pending = s;
      }
      r !== 0 && Zc(u, s, r);
    }
  }
  function Zu(l, n, u, c) {
    Vl[wu++] = l, Vl[wu++] = n, Vl[wu++] = u, Vl[wu++] = c, sn |= c, l.lanes |= c, l = l.alternate, l !== null && (l.lanes |= c);
  }
  function wc(l, n, u, c) {
    return Zu(l, n, u, c), bf(l);
  }
  function rn(l, n) {
    return Zu(l, null, null, n), bf(l);
  }
  function Zc(l, n, u) {
    l.lanes |= u;
    var c = l.alternate;
    c !== null && (c.lanes |= u);
    for (var s = !1, r = l.return; r !== null; )
      r.childLanes |= u, c = r.alternate, c !== null && (c.childLanes |= u), r.tag === 22 && (l = r.stateNode, l === null || l._visibility & 1 || (s = !0)), l = r, r = r.return;
    return l.tag === 3 ? (r = l.stateNode, s && n !== null && (s = 31 - Yl(u), l = r.hiddenUpdates, c = l[s], c === null ? l[s] = [n] : c.push(n), n.lane = u | 536870912), r) : null;
  }
  function bf(l) {
    if (50 < go)
      throw go = 0, Zy = null, Error(U(185));
    for (var n = l.return; n !== null; )
      l = n, n = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Lc = {};
  function x0(l, n, u, c) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _l(l, n, u, c) {
    return new x0(l, n, u, c);
  }
  function Sf(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function wa(l, n) {
    var u = l.alternate;
    return u === null ? (u = _l(
      l.tag,
      n,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = n, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, n = l.dependencies, u.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function De(l, n) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = n, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, n = u.dependencies, l.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), l;
  }
  function j(l, n, u, c, s, r) {
    var y = 0;
    if (c = l, typeof l == "function") Sf(l) && (y = 1);
    else if (typeof l == "string")
      y = sp(
        l,
        u,
        We.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      e: switch (l) {
        case te:
          return l = _l(31, u, n, s), l.elementType = te, l.lanes = r, l;
        case me:
          return ba(u.children, s, r, n);
        case qt:
          y = 8, s |= 24;
          break;
        case Ve:
          return l = _l(12, u, n, s | 2), l.elementType = Ve, l.lanes = r, l;
        case ma:
          return l = _l(13, u, n, s), l.elementType = ma, l.lanes = r, l;
        case Yt:
          return l = _l(19, u, n, s), l.elementType = Yt, l.lanes = r, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Ce:
              case mt:
                y = 10;
                break e;
              case Ut:
                y = 9;
                break e;
              case ql:
                y = 11;
                break e;
              case Ke:
                y = 14;
                break e;
              case Al:
                y = 16, c = null;
                break e;
            }
          y = 29, u = Error(
            U(130, l === null ? "null" : typeof l, "")
          ), c = null;
      }
    return n = _l(y, u, n, s), n.elementType = l, n.type = c, n.lanes = r, n;
  }
  function ba(l, n, u, c) {
    return l = _l(7, l, c, n), l.lanes = u, l;
  }
  function Jc(l, n, u) {
    return l = _l(6, l, null, n), l.lanes = u, l;
  }
  function pt(l, n, u) {
    return n = _l(
      4,
      l.children !== null ? l.children : [],
      l.key,
      n
    ), n.lanes = u, n.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, n;
  }
  var Lu = [], Ju = 0, Tf = null, Kc = 0, Sa = [], Xl = 0, lu = null, Za = 1, bt = "";
  function Be(l, n) {
    Lu[Ju++] = Kc, Lu[Ju++] = Tf, Tf = l, Kc = n;
  }
  function sr(l, n, u) {
    Sa[Xl++] = Za, Sa[Xl++] = bt, Sa[Xl++] = lu, lu = l;
    var c = Za;
    l = bt;
    var s = 32 - Yl(c) - 1;
    c &= ~(1 << s), u += 1;
    var r = 32 - Yl(n) + s;
    if (30 < r) {
      var y = s - s % 5;
      r = (c & (1 << y) - 1).toString(32), c >>= y, s -= y, Za = 1 << 32 - Yl(n) + s | u << s | c, bt = r + l;
    } else
      Za = 1 << r | u << s | c, bt = l;
  }
  function wi(l) {
    l.return !== null && (Be(l, 1), sr(l, 1, 0));
  }
  function dn(l) {
    for (; l === Tf; )
      Tf = Lu[--Ju], Lu[Ju] = null, Kc = Lu[--Ju], Lu[Ju] = null;
    for (; l === lu; )
      lu = Sa[--Xl], Sa[Xl] = null, bt = Sa[--Xl], Sa[Xl] = null, Za = Sa[--Xl], Sa[Xl] = null;
  }
  var Ot = null, Xe = null, _e = !1, Ta = null, Aa = !1, Zi = Error(U(519));
  function au(l) {
    var n = Error(U(418, ""));
    throw Wc(la(n, l)), Zi;
  }
  function Af(l) {
    var n = l.stateNode, u = l.type, c = l.memoizedProps;
    switch (n[Jt] = l, n[Dl] = c, u) {
      case "dialog":
        ge("cancel", n), ge("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        ge("load", n);
        break;
      case "video":
      case "audio":
        for (u = 0; u < cs.length; u++)
          ge(cs[u], n);
        break;
      case "source":
        ge("error", n);
        break;
      case "img":
      case "image":
      case "link":
        ge("error", n), ge("load", n);
        break;
      case "details":
        ge("toggle", n);
        break;
      case "input":
        ge("invalid", n), $s(
          n,
          c.value,
          c.defaultValue,
          c.checked,
          c.defaultChecked,
          c.type,
          c.name,
          !0
        ), qu(n);
        break;
      case "select":
        ge("invalid", n);
        break;
      case "textarea":
        ge("invalid", n), bh(n, c.value, c.defaultValue, c.children), qu(n);
    }
    u = c.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || n.textContent === "" + u || c.suppressHydrationWarning === !0 || nm(n.textContent, u) ? (c.popover != null && (ge("beforetoggle", n), ge("toggle", n)), c.onScroll != null && ge("scroll", n), c.onScrollEnd != null && ge("scrollend", n), c.onClick != null && (n.onclick = Sd), n = !0) : n = !1, n || au(l);
  }
  function Lh(l) {
    for (Ot = l.return; Ot; )
      switch (Ot.tag) {
        case 5:
        case 13:
          Aa = !1;
          return;
        case 27:
        case 3:
          Aa = !0;
          return;
        default:
          Ot = Ot.return;
      }
  }
  function $c(l) {
    if (l !== Ot) return !1;
    if (!_e) return Lh(l), _e = !0, !1;
    var n = l.tag, u;
    if ((u = n !== 3 && n !== 27) && ((u = n === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Cn(l.type, l.memoizedProps)), u = !u), u && Xe && au(l), Lh(l), n === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(U(317));
      e: {
        for (l = l.nextSibling, n = 0; l; ) {
          if (l.nodeType === 8)
            if (u = l.data, u === "/$") {
              if (n === 0) {
                Xe = Wa(l.nextSibling);
                break e;
              }
              n--;
            } else
              u !== "$" && u !== "$!" && u !== "$?" || n++;
          l = l.nextSibling;
        }
        Xe = null;
      }
    } else
      n === 27 ? (n = Xe, si(l.type) ? (l = ri, ri = null, Xe = l) : Xe = n) : Xe = Ot ? Wa(l.stateNode.nextSibling) : null;
    return !0;
  }
  function kc() {
    Xe = Ot = null, _e = !1;
  }
  function Jh() {
    var l = Ta;
    return l !== null && (Jl === null ? Jl = l : Jl.push.apply(
      Jl,
      l
    ), Ta = null), l;
  }
  function Wc(l) {
    Ta === null ? Ta = [l] : Ta.push(l);
  }
  var Ef = ft(null), nu = null, La = null;
  function uu(l, n, u) {
    Ye(Ef, n._currentValue), n._currentValue = u;
  }
  function hn(l) {
    l._currentValue = Ef.current, le(Ef);
  }
  function rr(l, n, u) {
    for (; l !== null; ) {
      var c = l.alternate;
      if ((l.childLanes & n) !== n ? (l.childLanes |= n, c !== null && (c.childLanes |= n)) : c !== null && (c.childLanes & n) !== n && (c.childLanes |= n), l === u) break;
      l = l.return;
    }
  }
  function Kh(l, n, u, c) {
    var s = l.child;
    for (s !== null && (s.return = l); s !== null; ) {
      var r = s.dependencies;
      if (r !== null) {
        var y = s.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var m = r;
          r = s;
          for (var g = 0; g < n.length; g++)
            if (m.context === n[g]) {
              r.lanes |= u, m = r.alternate, m !== null && (m.lanes |= u), rr(
                r.return,
                u,
                l
              ), c || (y = null);
              break e;
            }
          r = m.next;
        }
      } else if (s.tag === 18) {
        if (y = s.return, y === null) throw Error(U(341));
        y.lanes |= u, r = y.alternate, r !== null && (r.lanes |= u), rr(y, u, l), y = null;
      } else y = s.child;
      if (y !== null) y.return = s;
      else
        for (y = s; y !== null; ) {
          if (y === l) {
            y = null;
            break;
          }
          if (s = y.sibling, s !== null) {
            s.return = y.return, y = s;
            break;
          }
          y = y.return;
        }
      s = y;
    }
  }
  function Fc(l, n, u, c) {
    l = null;
    for (var s = n, r = !1; s !== null; ) {
      if (!r) {
        if (s.flags & 524288) r = !0;
        else if (s.flags & 262144) break;
      }
      if (s.tag === 10) {
        var y = s.alternate;
        if (y === null) throw Error(U(387));
        if (y = y.memoizedProps, y !== null) {
          var m = s.type;
          ll(s.pendingProps.value, y.value) || (l !== null ? l.push(m) : l = [m]);
        }
      } else if (s === Xs.current) {
        if (y = s.alternate, y === null) throw Error(U(387));
        y.memoizedState.memoizedState !== s.memoizedState.memoizedState && (l !== null ? l.push(Wl) : l = [Wl]);
      }
      s = s.return;
    }
    l !== null && Kh(
      n,
      l,
      u,
      c
    ), n.flags |= 262144;
  }
  function zf(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ll(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Ku(l) {
    nu = l, La = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Kt(l) {
    return $h(nu, l);
  }
  function Df(l, n) {
    return nu === null && Ku(l), $h(l, n);
  }
  function $h(l, n) {
    var u = n._currentValue;
    if (n = { context: n, memoizedValue: u, next: null }, La === null) {
      if (l === null) throw Error(U(308));
      La = n, l.dependencies = { lanes: 0, firstContext: n }, l.flags |= 524288;
    } else La = La.next = n;
    return u;
  }
  var Ic = typeof AbortController < "u" ? AbortController : function() {
    var l = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(u, c) {
        l.push(c);
      }
    };
    this.abort = function() {
      n.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, dr = q.unstable_scheduleCallback, H0 = q.unstable_NormalPriority, _t = {
    $$typeof: mt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Pc() {
    return {
      controller: new Ic(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function yn(l) {
    l.refCount--, l.refCount === 0 && dr(H0, function() {
      l.controller.abort();
    });
  }
  var $u = null, Rf = 0, Ea = 0, Xt = null;
  function hr(l, n) {
    if ($u === null) {
      var u = $u = [];
      Rf = 0, Ea = dc(), Xt = {
        status: "pending",
        value: void 0,
        then: function(c) {
          u.push(c);
        }
      };
    }
    return Rf++, n.then(yr, yr), n;
  }
  function yr() {
    if (--Rf === 0 && $u !== null) {
      Xt !== null && (Xt.status = "fulfilled");
      var l = $u;
      $u = null, Ea = 0, Xt = null;
      for (var n = 0; n < l.length; n++) (0, l[n])();
    }
  }
  function C0(l, n) {
    var u = [], c = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        u.push(s);
      }
    };
    return l.then(
      function() {
        c.status = "fulfilled", c.value = n;
        for (var s = 0; s < u.length; s++) (0, u[s])(n);
      },
      function(s) {
        for (c.status = "rejected", c.reason = s, s = 0; s < u.length; s++)
          (0, u[s])(void 0);
      }
    ), c;
  }
  var mr = E.S;
  E.S = function(l, n) {
    typeof n == "object" && n !== null && typeof n.then == "function" && hr(l, n), mr !== null && mr(l, n);
  };
  var mn = ft(null);
  function Of() {
    var l = mn.current;
    return l !== null ? l : at.pooledCache;
  }
  function Li(l, n) {
    n === null ? Ye(mn, mn.current) : Ye(mn, n.pool);
  }
  function pr() {
    var l = Of();
    return l === null ? null : { parent: _t._currentValue, pool: l };
  }
  var ku = Error(U(460)), vr = Error(U(474)), Mf = Error(U(542)), gr = { then: function() {
  } };
  function br(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Uf() {
  }
  function kh(l, n, u) {
    switch (u = l[u], u === void 0 ? l.push(n) : u !== n && (n.then(Uf, Uf), n = u), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw l = n.reason, Fh(l), l;
      default:
        if (typeof n.status == "string") n.then(Uf, Uf);
        else {
          if (l = at, l !== null && 100 < l.shellSuspendCounter)
            throw Error(U(482));
          l = n, l.status = "pending", l.then(
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "fulfilled", s.value = c;
              }
            },
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "rejected", s.reason = c;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw l = n.reason, Fh(l), l;
        }
        throw Ji = n, ku;
    }
  }
  var Ji = null;
  function Wh() {
    if (Ji === null) throw Error(U(459));
    var l = Ji;
    return Ji = null, l;
  }
  function Fh(l) {
    if (l === ku || l === Mf)
      throw Error(U(483));
  }
  var pn = !1;
  function Sr(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Tr(l, n) {
    l = l.updateQueue, n.updateQueue === l && (n.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Ql(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function vn(l, n, u) {
    var c = l.updateQueue;
    if (c === null) return null;
    if (c = c.shared, Je & 2) {
      var s = c.pending;
      return s === null ? n.next = n : (n.next = s.next, s.next = n), c.pending = n, n = bf(l), Zc(l, null, u), n;
    }
    return Zu(l, c, n, u), bf(l);
  }
  function Ki(l, n, u) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (u & 4194048) !== 0)) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, ef(l, u);
    }
  }
  function Ih(l, n) {
    var u = l.updateQueue, c = l.alternate;
    if (c !== null && (c = c.updateQueue, u === c)) {
      var s = null, r = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var y = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          r === null ? s = r = y : r = r.next = y, u = u.next;
        } while (u !== null);
        r === null ? s = r = n : r = r.next = n;
      } else s = r = n;
      u = {
        baseState: c.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: r,
        shared: c.shared,
        callbacks: c.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = n : l.next = n, u.lastBaseUpdate = n;
  }
  var Ph = !1;
  function eo() {
    if (Ph) {
      var l = Xt;
      if (l !== null) throw l;
    }
  }
  function iu(l, n, u, c) {
    Ph = !1;
    var s = l.updateQueue;
    pn = !1;
    var r = s.firstBaseUpdate, y = s.lastBaseUpdate, m = s.shared.pending;
    if (m !== null) {
      s.shared.pending = null;
      var g = m, R = g.next;
      g.next = null, y === null ? r = R : y.next = R, y = g;
      var V = l.alternate;
      V !== null && (V = V.updateQueue, m = V.lastBaseUpdate, m !== y && (m === null ? V.firstBaseUpdate = R : m.next = R, V.lastBaseUpdate = g));
    }
    if (r !== null) {
      var X = s.baseState;
      y = 0, V = R = g = null, m = r;
      do {
        var M = m.lane & -536870913, H = M !== m.lane;
        if (H ? (xe & M) === M : (c & M) === M) {
          M !== 0 && M === Ea && (Ph = !0), V !== null && (V = V.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          e: {
            var P = l, ee = m;
            M = n;
            var je = u;
            switch (ee.tag) {
              case 1:
                if (P = ee.payload, typeof P == "function") {
                  X = P.call(je, X, M);
                  break e;
                }
                X = P;
                break e;
              case 3:
                P.flags = P.flags & -65537 | 128;
              case 0:
                if (P = ee.payload, M = typeof P == "function" ? P.call(je, X, M) : P, M == null) break e;
                X = ae({}, X, M);
                break e;
              case 2:
                pn = !0;
            }
          }
          M = m.callback, M !== null && (l.flags |= 64, H && (l.flags |= 8192), H = s.callbacks, H === null ? s.callbacks = [M] : H.push(M));
        } else
          H = {
            lane: M,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, V === null ? (R = V = H, g = X) : V = V.next = H, y |= M;
        if (m = m.next, m === null) {
          if (m = s.shared.pending, m === null)
            break;
          H = m, m = H.next, H.next = null, s.lastBaseUpdate = H, s.shared.pending = null;
        }
      } while (!0);
      V === null && (g = X), s.baseState = g, s.firstBaseUpdate = R, s.lastBaseUpdate = V, r === null && (s.shared.lanes = 0), hu |= y, l.lanes = y, l.memoizedState = X;
    }
  }
  function Ar(l, n) {
    if (typeof l != "function")
      throw Error(U(191, l));
    l.call(n);
  }
  function xf(l, n) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        Ar(u[l], n);
  }
  var $i = ft(null), Hf = ft(0);
  function $t(l, n) {
    l = du, Ye(Hf, l), Ye($i, n), du = l | n.baseLanes;
  }
  function to() {
    Ye(Hf, du), Ye($i, $i.current);
  }
  function lo() {
    du = Hf.current, le($i), le(Hf);
  }
  var za = 0, ve = null, Le = null, vt = null, Cf = !1, aa = !1, Wu = !1, Ja = 0, na = 0, cu = null, ey = 0;
  function gt() {
    throw Error(U(321));
  }
  function Er(l, n) {
    if (n === null) return !1;
    for (var u = 0; u < n.length && u < l.length; u++)
      if (!ll(l[u], n[u])) return !1;
    return !0;
  }
  function zr(l, n, u, c, s, r) {
    return za = r, ve = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, E.H = l === null || l.memoizedState === null ? my : py, Wu = !1, r = u(c, s), Wu = !1, aa && (r = ty(
      n,
      u,
      c,
      s
    )), Fu(l), r;
  }
  function Fu(l) {
    E.H = Qr;
    var n = Le !== null && Le.next !== null;
    if (za = 0, vt = Le = ve = null, Cf = !1, na = 0, cu = null, n) throw Error(U(300));
    l === null || Qt || (l = l.dependencies, l !== null && zf(l) && (Qt = !0));
  }
  function ty(l, n, u, c) {
    ve = l;
    var s = 0;
    do {
      if (aa && (cu = null), na = 0, aa = !1, 25 <= s) throw Error(U(301));
      if (s += 1, vt = Le = null, l.updateQueue != null) {
        var r = l.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      E.H = ou, r = n(u, c);
    } while (aa);
    return r;
  }
  function N0() {
    var l = E.H, n = l.useState()[0];
    return n = typeof n.then == "function" ? Bf(n) : n, l = l.useState()[0], (Le !== null ? Le.memoizedState : null) !== l && (ve.flags |= 1024), n;
  }
  function Dr() {
    var l = Ja !== 0;
    return Ja = 0, l;
  }
  function ao(l, n, u) {
    n.updateQueue = l.updateQueue, n.flags &= -2053, l.lanes &= ~u;
  }
  function Rr(l) {
    if (Cf) {
      for (l = l.memoizedState; l !== null; ) {
        var n = l.queue;
        n !== null && (n.pending = null), l = l.next;
      }
      Cf = !1;
    }
    za = 0, vt = Le = ve = null, aa = !1, na = Ja = 0, cu = null;
  }
  function ml() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return vt === null ? ve.memoizedState = vt = l : vt = vt.next = l, vt;
  }
  function St() {
    if (Le === null) {
      var l = ve.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = Le.next;
    var n = vt === null ? ve.memoizedState : vt.next;
    if (n !== null)
      vt = n, Le = l;
    else {
      if (l === null)
        throw ve.alternate === null ? Error(U(467)) : Error(U(310));
      Le = l, l = {
        memoizedState: Le.memoizedState,
        baseState: Le.baseState,
        baseQueue: Le.baseQueue,
        queue: Le.queue,
        next: null
      }, vt === null ? ve.memoizedState = vt = l : vt = vt.next = l;
    }
    return vt;
  }
  function Nf() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Bf(l) {
    var n = na;
    return na += 1, cu === null && (cu = []), l = kh(cu, l, n), n = ve, (vt === null ? n.memoizedState : vt.next) === null && (n = n.alternate, E.H = n === null || n.memoizedState === null ? my : py), l;
  }
  function Ht(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Bf(l);
      if (l.$$typeof === mt) return Kt(l);
    }
    throw Error(U(438, String(l)));
  }
  function Or(l) {
    var n = null, u = ve.updateQueue;
    if (u !== null && (n = u.memoCache), n == null) {
      var c = ve.alternate;
      c !== null && (c = c.updateQueue, c !== null && (c = c.memoCache, c != null && (n = {
        data: c.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), u === null && (u = Nf(), ve.updateQueue = u), u.memoCache = n, u = n.data[n.index], u === void 0)
      for (u = n.data[n.index] = Array(l), c = 0; c < l; c++)
        u[c] = xt;
    return n.index++, u;
  }
  function gn(l, n) {
    return typeof n == "function" ? n(l) : n;
  }
  function qf(l) {
    var n = St();
    return Mr(n, Le, l);
  }
  function Mr(l, n, u) {
    var c = l.queue;
    if (c === null) throw Error(U(311));
    c.lastRenderedReducer = u;
    var s = l.baseQueue, r = c.pending;
    if (r !== null) {
      if (s !== null) {
        var y = s.next;
        s.next = r.next, r.next = y;
      }
      n.baseQueue = s = r, c.pending = null;
    }
    if (r = l.baseState, s === null) l.memoizedState = r;
    else {
      n = s.next;
      var m = y = null, g = null, R = n, V = !1;
      do {
        var X = R.lane & -536870913;
        if (X !== R.lane ? (xe & X) === X : (za & X) === X) {
          var M = R.revertLane;
          if (M === 0)
            g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null
            }), X === Ea && (V = !0);
          else if ((za & M) === M) {
            R = R.next, M === Ea && (V = !0);
            continue;
          } else
            X = {
              lane: 0,
              revertLane: R.revertLane,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null
            }, g === null ? (m = g = X, y = r) : g = g.next = X, ve.lanes |= M, hu |= M;
          X = R.action, Wu && u(r, X), r = R.hasEagerState ? R.eagerState : u(r, X);
        } else
          M = {
            lane: X,
            revertLane: R.revertLane,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null
          }, g === null ? (m = g = M, y = r) : g = g.next = M, ve.lanes |= X, hu |= X;
        R = R.next;
      } while (R !== null && R !== n);
      if (g === null ? y = r : g.next = m, !ll(r, l.memoizedState) && (Qt = !0, V && (u = Xt, u !== null)))
        throw u;
      l.memoizedState = r, l.baseState = y, l.baseQueue = g, c.lastRenderedState = r;
    }
    return s === null && (c.lanes = 0), [l.memoizedState, c.dispatch];
  }
  function Ur(l) {
    var n = St(), u = n.queue;
    if (u === null) throw Error(U(311));
    u.lastRenderedReducer = l;
    var c = u.dispatch, s = u.pending, r = n.memoizedState;
    if (s !== null) {
      u.pending = null;
      var y = s = s.next;
      do
        r = l(r, y.action), y = y.next;
      while (y !== s);
      ll(r, n.memoizedState) || (Qt = !0), n.memoizedState = r, n.baseQueue === null && (n.baseState = r), u.lastRenderedState = r;
    }
    return [r, c];
  }
  function Yf(l, n, u) {
    var c = ve, s = St(), r = _e;
    if (r) {
      if (u === void 0) throw Error(U(407));
      u = u();
    } else u = n();
    var y = !ll(
      (Le || s).memoizedState,
      u
    );
    y && (s.memoizedState = u, Qt = !0), s = s.queue;
    var m = ay.bind(null, c, s, l);
    if (Pe(2048, 8, m, [l]), s.getSnapshot !== n || y || vt !== null && vt.memoizedState.tag & 1) {
      if (c.flags |= 2048, jl(
        9,
        _f(),
        ly.bind(
          null,
          c,
          s,
          u,
          n
        ),
        null
      ), at === null) throw Error(U(349));
      r || za & 124 || xr(c, n, u);
    }
    return u;
  }
  function xr(l, n, u) {
    l.flags |= 16384, l = { getSnapshot: n, value: u }, n = ve.updateQueue, n === null ? (n = Nf(), ve.updateQueue = n, n.stores = [l]) : (u = n.stores, u === null ? n.stores = [l] : u.push(l));
  }
  function ly(l, n, u, c) {
    n.value = u, n.getSnapshot = c, ny(n) && Hr(l);
  }
  function ay(l, n, u) {
    return u(function() {
      ny(n) && Hr(l);
    });
  }
  function ny(l) {
    var n = l.getSnapshot;
    l = l.value;
    try {
      var u = n();
      return !ll(l, u);
    } catch {
      return !0;
    }
  }
  function Hr(l) {
    var n = rn(l, 2);
    n !== null && ca(n, l, 2);
  }
  function Gf(l) {
    var n = ml();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), Wu) {
        Kn(!0);
        try {
          u();
        } finally {
          Kn(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = l, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: gn,
      lastRenderedState: l
    }, n;
  }
  function Cr(l, n, u, c) {
    return l.baseState = u, Mr(
      l,
      Le,
      typeof c == "function" ? c : gn
    );
  }
  function B0(l, n, u, c, s) {
    if (Ii(l)) throw Error(U(485));
    if (l = n.action, l !== null) {
      var r = {
        payload: s,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          r.listeners.push(y);
        }
      };
      E.T !== null ? u(!0) : r.isTransition = !1, c(r), u = n.pending, u === null ? (r.next = n.pending = r, Nr(n, r)) : (r.next = u.next, n.pending = u.next = r);
    }
  }
  function Nr(l, n) {
    var u = n.action, c = n.payload, s = l.state;
    if (n.isTransition) {
      var r = E.T, y = {};
      E.T = y;
      try {
        var m = u(s, c), g = E.S;
        g !== null && g(y, m), Vf(l, n, m);
      } catch (R) {
        qr(l, n, R);
      } finally {
        E.T = r;
      }
    } else
      try {
        r = u(s, c), Vf(l, n, r);
      } catch (R) {
        qr(l, n, R);
      }
  }
  function Vf(l, n, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(c) {
        Br(l, n, c);
      },
      function(c) {
        return qr(l, n, c);
      }
    ) : Br(l, n, u);
  }
  function Br(l, n, u) {
    n.status = "fulfilled", n.value = u, uy(n), l.state = u, n = l.pending, n !== null && (u = n.next, u === n ? l.pending = null : (u = u.next, n.next = u, Nr(l, u)));
  }
  function qr(l, n, u) {
    var c = l.pending;
    if (l.pending = null, c !== null) {
      c = c.next;
      do
        n.status = "rejected", n.reason = u, uy(n), n = n.next;
      while (n !== c);
    }
    l.action = null;
  }
  function uy(l) {
    l = l.listeners;
    for (var n = 0; n < l.length; n++) (0, l[n])();
  }
  function Yr(l, n) {
    return n;
  }
  function iy(l, n) {
    if (_e) {
      var u = at.formState;
      if (u !== null) {
        e: {
          var c = ve;
          if (_e) {
            if (Xe) {
              t: {
                for (var s = Xe, r = Aa; s.nodeType !== 8; ) {
                  if (!r) {
                    s = null;
                    break t;
                  }
                  if (s = Wa(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                r = s.data, s = r === "F!" || r === "F" ? s : null;
              }
              if (s) {
                Xe = Wa(
                  s.nextSibling
                ), c = s.data === "F!";
                break e;
              }
            }
            au(c);
          }
          c = !1;
        }
        c && (n = u[0]);
      }
    }
    return u = ml(), u.memoizedState = u.baseState = n, c = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Yr,
      lastRenderedState: n
    }, u.queue = c, u = hy.bind(
      null,
      ve,
      c
    ), c.dispatch = u, c = Gf(!1), r = jf.bind(
      null,
      ve,
      !1,
      c.queue
    ), c = ml(), s = {
      state: n,
      dispatch: null,
      action: l,
      pending: null
    }, c.queue = s, u = B0.bind(
      null,
      ve,
      s,
      r,
      u
    ), s.dispatch = u, c.memoizedState = l, [n, u, !1];
  }
  function bn(l) {
    var n = St();
    return Gr(n, Le, l);
  }
  function Gr(l, n, u) {
    if (n = Mr(
      l,
      n,
      Yr
    )[0], l = qf(gn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var c = Bf(n);
      } catch (y) {
        throw y === ku ? Mf : y;
      }
    else c = n;
    n = St();
    var s = n.queue, r = s.dispatch;
    return u !== n.memoizedState && (ve.flags |= 2048, jl(
      9,
      _f(),
      mv.bind(null, s, u),
      null
    )), [c, r, l];
  }
  function mv(l, n) {
    l.action = n;
  }
  function Vr(l) {
    var n = St(), u = Le;
    if (u !== null)
      return Gr(n, u, l);
    St(), n = n.memoizedState, u = St();
    var c = u.queue.dispatch;
    return u.memoizedState = l, [n, c, !1];
  }
  function jl(l, n, u, c) {
    return l = { tag: l, create: u, deps: c, inst: n, next: null }, n = ve.updateQueue, n === null && (n = Nf(), ve.updateQueue = n), u = n.lastEffect, u === null ? n.lastEffect = l.next = l : (c = u.next, u.next = l, l.next = c, n.lastEffect = l), l;
  }
  function _f() {
    return { destroy: void 0, resource: void 0 };
  }
  function Xf() {
    return St().memoizedState;
  }
  function Iu(l, n, u, c) {
    var s = ml();
    c = c === void 0 ? null : c, ve.flags |= l, s.memoizedState = jl(
      1 | n,
      _f(),
      u,
      c
    );
  }
  function Pe(l, n, u, c) {
    var s = St();
    c = c === void 0 ? null : c;
    var r = s.memoizedState.inst;
    Le !== null && c !== null && Er(c, Le.memoizedState.deps) ? s.memoizedState = jl(n, r, u, c) : (ve.flags |= l, s.memoizedState = jl(
      1 | n,
      r,
      u,
      c
    ));
  }
  function q0(l, n) {
    Iu(8390656, 8, l, n);
  }
  function Y0(l, n) {
    Pe(2048, 8, l, n);
  }
  function cy(l, n) {
    return Pe(4, 2, l, n);
  }
  function Ka(l, n) {
    return Pe(4, 4, l, n);
  }
  function oy(l, n) {
    if (typeof n == "function") {
      l = l();
      var u = n(l);
      return function() {
        typeof u == "function" ? u() : n(null);
      };
    }
    if (n != null)
      return l = l(), n.current = l, function() {
        n.current = null;
      };
  }
  function _r(l, n, u) {
    u = u != null ? u.concat([l]) : null, Pe(4, 4, oy.bind(null, n, l), u);
  }
  function ki() {
  }
  function Wi(l, n) {
    var u = St();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    return n !== null && Er(n, c[1]) ? c[0] : (u.memoizedState = [l, n], l);
  }
  function fy(l, n) {
    var u = St();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    if (n !== null && Er(n, c[1]))
      return c[0];
    if (c = l(), Wu) {
      Kn(!0);
      try {
        l();
      } finally {
        Kn(!1);
      }
    }
    return u.memoizedState = [c, n], c;
  }
  function Qf(l, n, u) {
    return u === void 0 || za & 1073741824 ? l.memoizedState = n : (l.memoizedState = u, l = Ly(), ve.lanes |= l, hu |= l, u);
  }
  function sy(l, n, u, c) {
    return ll(u, n) ? u : $i.current !== null ? (l = Qf(l, u, c), ll(l, n) || (Qt = !0), l) : za & 42 ? (l = Ly(), ve.lanes |= l, hu |= l, n) : (Qt = !0, l.memoizedState = u);
  }
  function G0(l, n, u, c, s) {
    var r = Q.p;
    Q.p = r !== 0 && 8 > r ? r : 8;
    var y = E.T, m = {};
    E.T = m, jf(l, !1, n, u);
    try {
      var g = s(), R = E.S;
      if (R !== null && R(m, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var V = C0(
          g,
          c
        );
        Fi(
          l,
          n,
          V,
          ia(l)
        );
      } else
        Fi(
          l,
          n,
          c,
          ia(l)
        );
    } catch (X) {
      Fi(
        l,
        n,
        { then: function() {
        }, status: "rejected", reason: X },
        ia()
      );
    } finally {
      Q.p = r, E.T = y;
    }
  }
  function pv() {
  }
  function Xr(l, n, u, c) {
    if (l.tag !== 5) throw Error(U(476));
    var s = V0(l).queue;
    G0(
      l,
      s,
      n,
      Z,
      u === null ? pv : function() {
        return no(l), u(c);
      }
    );
  }
  function V0(l) {
    var n = l.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: gn,
        lastRenderedState: Z
      },
      next: null
    };
    var u = {};
    return n.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: gn,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = n, l = l.alternate, l !== null && (l.memoizedState = n), n;
  }
  function no(l) {
    var n = V0(l).next.queue;
    Fi(l, n, {}, ia());
  }
  function Da() {
    return Kt(Wl);
  }
  function ry() {
    return St().memoizedState;
  }
  function _0() {
    return St().memoizedState;
  }
  function X0(l) {
    for (var n = l.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var u = ia();
          l = Ql(u);
          var c = vn(n, l, u);
          c !== null && (ca(c, n, u), Ki(c, n, u)), n = { cache: Pc() }, l.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function dy(l, n, u) {
    var c = ia();
    u = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ii(l) ? Q0(n, u) : (u = wc(l, n, u, c), u !== null && (ca(u, l, c), yy(u, n, c)));
  }
  function hy(l, n, u) {
    var c = ia();
    Fi(l, n, u, c);
  }
  function Fi(l, n, u, c) {
    var s = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ii(l)) Q0(n, s);
    else {
      var r = l.alternate;
      if (l.lanes === 0 && (r === null || r.lanes === 0) && (r = n.lastRenderedReducer, r !== null))
        try {
          var y = n.lastRenderedState, m = r(y, u);
          if (s.hasEagerState = !0, s.eagerState = m, ll(m, y))
            return Zu(l, n, s, 0), at === null && ja(), !1;
        } catch {
        } finally {
        }
      if (u = wc(l, n, s, c), u !== null)
        return ca(u, l, c), yy(u, n, c), !0;
    }
    return !1;
  }
  function jf(l, n, u, c) {
    if (c = {
      lane: 2,
      revertLane: dc(),
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ii(l)) {
      if (n) throw Error(U(479));
    } else
      n = wc(
        l,
        u,
        c,
        2
      ), n !== null && ca(n, l, 2);
  }
  function Ii(l) {
    var n = l.alternate;
    return l === ve || n !== null && n === ve;
  }
  function Q0(l, n) {
    aa = Cf = !0;
    var u = l.pending;
    u === null ? n.next = n : (n.next = u.next, u.next = n), l.pending = n;
  }
  function yy(l, n, u) {
    if (u & 4194048) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, ef(l, u);
    }
  }
  var Qr = {
    readContext: Kt,
    use: Ht,
    useCallback: gt,
    useContext: gt,
    useEffect: gt,
    useImperativeHandle: gt,
    useLayoutEffect: gt,
    useInsertionEffect: gt,
    useMemo: gt,
    useReducer: gt,
    useRef: gt,
    useState: gt,
    useDebugValue: gt,
    useDeferredValue: gt,
    useTransition: gt,
    useSyncExternalStore: gt,
    useId: gt,
    useHostTransitionStatus: gt,
    useFormState: gt,
    useActionState: gt,
    useOptimistic: gt,
    useMemoCache: gt,
    useCacheRefresh: gt
  }, my = {
    readContext: Kt,
    use: Ht,
    useCallback: function(l, n) {
      return ml().memoizedState = [
        l,
        n === void 0 ? null : n
      ], l;
    },
    useContext: Kt,
    useEffect: q0,
    useImperativeHandle: function(l, n, u) {
      u = u != null ? u.concat([l]) : null, Iu(
        4194308,
        4,
        oy.bind(null, n, l),
        u
      );
    },
    useLayoutEffect: function(l, n) {
      return Iu(4194308, 4, l, n);
    },
    useInsertionEffect: function(l, n) {
      Iu(4, 2, l, n);
    },
    useMemo: function(l, n) {
      var u = ml();
      n = n === void 0 ? null : n;
      var c = l();
      if (Wu) {
        Kn(!0);
        try {
          l();
        } finally {
          Kn(!1);
        }
      }
      return u.memoizedState = [c, n], c;
    },
    useReducer: function(l, n, u) {
      var c = ml();
      if (u !== void 0) {
        var s = u(n);
        if (Wu) {
          Kn(!0);
          try {
            u(n);
          } finally {
            Kn(!1);
          }
        }
      } else s = n;
      return c.memoizedState = c.baseState = s, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: s
      }, c.queue = l, l = l.dispatch = dy.bind(
        null,
        ve,
        l
      ), [c.memoizedState, l];
    },
    useRef: function(l) {
      var n = ml();
      return l = { current: l }, n.memoizedState = l;
    },
    useState: function(l) {
      l = Gf(l);
      var n = l.queue, u = hy.bind(null, ve, n);
      return n.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: ki,
    useDeferredValue: function(l, n) {
      var u = ml();
      return Qf(u, l, n);
    },
    useTransition: function() {
      var l = Gf(!1);
      return l = G0.bind(
        null,
        ve,
        l.queue,
        !0,
        !1
      ), ml().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, n, u) {
      var c = ve, s = ml();
      if (_e) {
        if (u === void 0)
          throw Error(U(407));
        u = u();
      } else {
        if (u = n(), at === null)
          throw Error(U(349));
        xe & 124 || xr(c, n, u);
      }
      s.memoizedState = u;
      var r = { value: u, getSnapshot: n };
      return s.queue = r, q0(ay.bind(null, c, r, l), [
        l
      ]), c.flags |= 2048, jl(
        9,
        _f(),
        ly.bind(
          null,
          c,
          r,
          u,
          n
        ),
        null
      ), u;
    },
    useId: function() {
      var l = ml(), n = at.identifierPrefix;
      if (_e) {
        var u = bt, c = Za;
        u = (c & ~(1 << 32 - Yl(c) - 1)).toString(32) + u, n = "«" + n + "R" + u, u = Ja++, 0 < u && (n += "H" + u.toString(32)), n += "»";
      } else
        u = ey++, n = "«" + n + "r" + u.toString(32) + "»";
      return l.memoizedState = n;
    },
    useHostTransitionStatus: Da,
    useFormState: iy,
    useActionState: iy,
    useOptimistic: function(l) {
      var n = ml();
      n.memoizedState = n.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = u, n = jf.bind(
        null,
        ve,
        !0,
        u
      ), u.dispatch = n, [l, n];
    },
    useMemoCache: Or,
    useCacheRefresh: function() {
      return ml().memoizedState = X0.bind(
        null,
        ve
      );
    }
  }, py = {
    readContext: Kt,
    use: Ht,
    useCallback: Wi,
    useContext: Kt,
    useEffect: Y0,
    useImperativeHandle: _r,
    useInsertionEffect: cy,
    useLayoutEffect: Ka,
    useMemo: fy,
    useReducer: qf,
    useRef: Xf,
    useState: function() {
      return qf(gn);
    },
    useDebugValue: ki,
    useDeferredValue: function(l, n) {
      var u = St();
      return sy(
        u,
        Le.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = qf(gn)[0], n = St().memoizedState;
      return [
        typeof l == "boolean" ? l : Bf(l),
        n
      ];
    },
    useSyncExternalStore: Yf,
    useId: ry,
    useHostTransitionStatus: Da,
    useFormState: bn,
    useActionState: bn,
    useOptimistic: function(l, n) {
      var u = St();
      return Cr(u, Le, l, n);
    },
    useMemoCache: Or,
    useCacheRefresh: _0
  }, ou = {
    readContext: Kt,
    use: Ht,
    useCallback: Wi,
    useContext: Kt,
    useEffect: Y0,
    useImperativeHandle: _r,
    useInsertionEffect: cy,
    useLayoutEffect: Ka,
    useMemo: fy,
    useReducer: Ur,
    useRef: Xf,
    useState: function() {
      return Ur(gn);
    },
    useDebugValue: ki,
    useDeferredValue: function(l, n) {
      var u = St();
      return Le === null ? Qf(u, l, n) : sy(
        u,
        Le.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Ur(gn)[0], n = St().memoizedState;
      return [
        typeof l == "boolean" ? l : Bf(l),
        n
      ];
    },
    useSyncExternalStore: Yf,
    useId: ry,
    useHostTransitionStatus: Da,
    useFormState: Vr,
    useActionState: Vr,
    useOptimistic: function(l, n) {
      var u = St();
      return Le !== null ? Cr(u, Le, l, n) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Or,
    useCacheRefresh: _0
  }, Pi = null, uo = 0;
  function jr(l) {
    var n = uo;
    return uo += 1, Pi === null && (Pi = []), kh(Pi, l, n);
  }
  function ec(l, n) {
    n = n.props.ref, l.ref = n !== void 0 ? n : null;
  }
  function pl(l, n) {
    throw n.$$typeof === pe ? Error(U(525)) : (l = Object.prototype.toString.call(n), Error(
      U(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l
      )
    ));
  }
  function vy(l) {
    var n = l._init;
    return n(l._payload);
  }
  function wl(l) {
    function n(z, A) {
      if (l) {
        var D = z.deletions;
        D === null ? (z.deletions = [A], z.flags |= 16) : D.push(A);
      }
    }
    function u(z, A) {
      if (!l) return null;
      for (; A !== null; )
        n(z, A), A = A.sibling;
      return null;
    }
    function c(z) {
      for (var A = /* @__PURE__ */ new Map(); z !== null; )
        z.key !== null ? A.set(z.key, z) : A.set(z.index, z), z = z.sibling;
      return A;
    }
    function s(z, A) {
      return z = wa(z, A), z.index = 0, z.sibling = null, z;
    }
    function r(z, A, D) {
      return z.index = D, l ? (D = z.alternate, D !== null ? (D = D.index, D < A ? (z.flags |= 67108866, A) : D) : (z.flags |= 67108866, A)) : (z.flags |= 1048576, A);
    }
    function y(z) {
      return l && z.alternate === null && (z.flags |= 67108866), z;
    }
    function m(z, A, D, _) {
      return A === null || A.tag !== 6 ? (A = Jc(D, z.mode, _), A.return = z, A) : (A = s(A, D), A.return = z, A);
    }
    function g(z, A, D, _) {
      var $ = D.type;
      return $ === me ? V(
        z,
        A,
        D.props.children,
        _,
        D.key
      ) : A !== null && (A.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === Al && vy($) === A.type) ? (A = s(A, D.props), ec(A, D), A.return = z, A) : (A = j(
        D.type,
        D.key,
        D.props,
        null,
        z.mode,
        _
      ), ec(A, D), A.return = z, A);
    }
    function R(z, A, D, _) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== D.containerInfo || A.stateNode.implementation !== D.implementation ? (A = pt(D, z.mode, _), A.return = z, A) : (A = s(A, D.children || []), A.return = z, A);
    }
    function V(z, A, D, _, $) {
      return A === null || A.tag !== 7 ? (A = ba(
        D,
        z.mode,
        _,
        $
      ), A.return = z, A) : (A = s(A, D), A.return = z, A);
    }
    function X(z, A, D) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = Jc(
          "" + A,
          z.mode,
          D
        ), A.return = z, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case oe:
            return D = j(
              A.type,
              A.key,
              A.props,
              null,
              z.mode,
              D
            ), ec(D, A), D.return = z, D;
          case Te:
            return A = pt(
              A,
              z.mode,
              D
            ), A.return = z, A;
          case Al:
            var _ = A._init;
            return A = _(A._payload), X(z, A, D);
        }
        if (hl(A) || ze(A))
          return A = ba(
            A,
            z.mode,
            D,
            null
          ), A.return = z, A;
        if (typeof A.then == "function")
          return X(z, jr(A), D);
        if (A.$$typeof === mt)
          return X(
            z,
            Df(z, A),
            D
          );
        pl(z, A);
      }
      return null;
    }
    function M(z, A, D, _) {
      var $ = A !== null ? A.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return $ !== null ? null : m(z, A, "" + D, _);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case oe:
            return D.key === $ ? g(z, A, D, _) : null;
          case Te:
            return D.key === $ ? R(z, A, D, _) : null;
          case Al:
            return $ = D._init, D = $(D._payload), M(z, A, D, _);
        }
        if (hl(D) || ze(D))
          return $ !== null ? null : V(z, A, D, _, null);
        if (typeof D.then == "function")
          return M(
            z,
            A,
            jr(D),
            _
          );
        if (D.$$typeof === mt)
          return M(
            z,
            A,
            Df(z, D),
            _
          );
        pl(z, D);
      }
      return null;
    }
    function H(z, A, D, _, $) {
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return z = z.get(D) || null, m(A, z, "" + _, $);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case oe:
            return z = z.get(
              _.key === null ? D : _.key
            ) || null, g(A, z, _, $);
          case Te:
            return z = z.get(
              _.key === null ? D : _.key
            ) || null, R(A, z, _, $);
          case Al:
            var Re = _._init;
            return _ = Re(_._payload), H(
              z,
              A,
              D,
              _,
              $
            );
        }
        if (hl(_) || ze(_))
          return z = z.get(D) || null, V(A, z, _, $, null);
        if (typeof _.then == "function")
          return H(
            z,
            A,
            D,
            jr(_),
            $
          );
        if (_.$$typeof === mt)
          return H(
            z,
            A,
            D,
            Df(A, _),
            $
          );
        pl(A, _);
      }
      return null;
    }
    function P(z, A, D, _) {
      for (var $ = null, Re = null, I = A, ie = A = 0, Ft = null; I !== null && ie < D.length; ie++) {
        I.index > ie ? (Ft = I, I = null) : Ft = I.sibling;
        var Ge = M(
          z,
          I,
          D[ie],
          _
        );
        if (Ge === null) {
          I === null && (I = Ft);
          break;
        }
        l && I && Ge.alternate === null && n(z, I), A = r(Ge, A, ie), Re === null ? $ = Ge : Re.sibling = Ge, Re = Ge, I = Ft;
      }
      if (ie === D.length)
        return u(z, I), _e && Be(z, ie), $;
      if (I === null) {
        for (; ie < D.length; ie++)
          I = X(z, D[ie], _), I !== null && (A = r(
            I,
            A,
            ie
          ), Re === null ? $ = I : Re.sibling = I, Re = I);
        return _e && Be(z, ie), $;
      }
      for (I = c(I); ie < D.length; ie++)
        Ft = H(
          I,
          z,
          ie,
          D[ie],
          _
        ), Ft !== null && (l && Ft.alternate !== null && I.delete(
          Ft.key === null ? ie : Ft.key
        ), A = r(
          Ft,
          A,
          ie
        ), Re === null ? $ = Ft : Re.sibling = Ft, Re = Ft);
      return l && I.forEach(function(pi) {
        return n(z, pi);
      }), _e && Be(z, ie), $;
    }
    function ee(z, A, D, _) {
      if (D == null) throw Error(U(151));
      for (var $ = null, Re = null, I = A, ie = A = 0, Ft = null, Ge = D.next(); I !== null && !Ge.done; ie++, Ge = D.next()) {
        I.index > ie ? (Ft = I, I = null) : Ft = I.sibling;
        var pi = M(z, I, Ge.value, _);
        if (pi === null) {
          I === null && (I = Ft);
          break;
        }
        l && I && pi.alternate === null && n(z, I), A = r(pi, A, ie), Re === null ? $ = pi : Re.sibling = pi, Re = pi, I = Ft;
      }
      if (Ge.done)
        return u(z, I), _e && Be(z, ie), $;
      if (I === null) {
        for (; !Ge.done; ie++, Ge = D.next())
          Ge = X(z, Ge.value, _), Ge !== null && (A = r(Ge, A, ie), Re === null ? $ = Ge : Re.sibling = Ge, Re = Ge);
        return _e && Be(z, ie), $;
      }
      for (I = c(I); !Ge.done; ie++, Ge = D.next())
        Ge = H(I, z, ie, Ge.value, _), Ge !== null && (l && Ge.alternate !== null && I.delete(Ge.key === null ? ie : Ge.key), A = r(Ge, A, ie), Re === null ? $ = Ge : Re.sibling = Ge, Re = Ge);
      return l && I.forEach(function(Mv) {
        return n(z, Mv);
      }), _e && Be(z, ie), $;
    }
    function je(z, A, D, _) {
      if (typeof D == "object" && D !== null && D.type === me && D.key === null && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case oe:
            e: {
              for (var $ = D.key; A !== null; ) {
                if (A.key === $) {
                  if ($ = D.type, $ === me) {
                    if (A.tag === 7) {
                      u(
                        z,
                        A.sibling
                      ), _ = s(
                        A,
                        D.props.children
                      ), _.return = z, z = _;
                      break e;
                    }
                  } else if (A.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === Al && vy($) === A.type) {
                    u(
                      z,
                      A.sibling
                    ), _ = s(A, D.props), ec(_, D), _.return = z, z = _;
                    break e;
                  }
                  u(z, A);
                  break;
                } else n(z, A);
                A = A.sibling;
              }
              D.type === me ? (_ = ba(
                D.props.children,
                z.mode,
                _,
                D.key
              ), _.return = z, z = _) : (_ = j(
                D.type,
                D.key,
                D.props,
                null,
                z.mode,
                _
              ), ec(_, D), _.return = z, z = _);
            }
            return y(z);
          case Te:
            e: {
              for ($ = D.key; A !== null; ) {
                if (A.key === $)
                  if (A.tag === 4 && A.stateNode.containerInfo === D.containerInfo && A.stateNode.implementation === D.implementation) {
                    u(
                      z,
                      A.sibling
                    ), _ = s(A, D.children || []), _.return = z, z = _;
                    break e;
                  } else {
                    u(z, A);
                    break;
                  }
                else n(z, A);
                A = A.sibling;
              }
              _ = pt(D, z.mode, _), _.return = z, z = _;
            }
            return y(z);
          case Al:
            return $ = D._init, D = $(D._payload), je(
              z,
              A,
              D,
              _
            );
        }
        if (hl(D))
          return P(
            z,
            A,
            D,
            _
          );
        if (ze(D)) {
          if ($ = ze(D), typeof $ != "function") throw Error(U(150));
          return D = $.call(D), ee(
            z,
            A,
            D,
            _
          );
        }
        if (typeof D.then == "function")
          return je(
            z,
            A,
            jr(D),
            _
          );
        if (D.$$typeof === mt)
          return je(
            z,
            A,
            Df(z, D),
            _
          );
        pl(z, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (D = "" + D, A !== null && A.tag === 6 ? (u(z, A.sibling), _ = s(A, D), _.return = z, z = _) : (u(z, A), _ = Jc(D, z.mode, _), _.return = z, z = _), y(z)) : u(z, A);
    }
    return function(z, A, D, _) {
      try {
        uo = 0;
        var $ = je(
          z,
          A,
          D,
          _
        );
        return Pi = null, $;
      } catch (I) {
        if (I === ku || I === Mf) throw I;
        var Re = _l(29, I, null, z.mode);
        return Re.lanes = _, Re.return = z, Re;
      } finally {
      }
    };
  }
  var tc = wl(!0), Sn = wl(!1), ua = ft(null), vl = null;
  function fu(l) {
    var n = l.alternate;
    Ye(et, et.current & 1), Ye(ua, l), vl === null && (n === null || $i.current !== null || n.memoizedState !== null) && (vl = l);
  }
  function Tn(l) {
    if (l.tag === 22) {
      if (Ye(et, et.current), Ye(ua, l), vl === null) {
        var n = l.alternate;
        n !== null && n.memoizedState !== null && (vl = l);
      }
    } else An();
  }
  function An() {
    Ye(et, et.current), Ye(ua, ua.current);
  }
  function $a(l) {
    le(ua), vl === l && (vl = null), le(et);
  }
  var et = ft(0);
  function wf(l) {
    for (var n = l; n !== null; ) {
      if (n.tag === 13) {
        var u = n.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || ds(u)))
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if (n.flags & 128) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === l) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === l) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  function Pu(l, n, u, c) {
    n = l.memoizedState, u = u(c, n), u = u == null ? n : ae({}, n, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var wr = {
    enqueueSetState: function(l, n, u) {
      l = l._reactInternals;
      var c = ia(), s = Ql(c);
      s.payload = n, u != null && (s.callback = u), n = vn(l, s, c), n !== null && (ca(n, l, c), Ki(n, l, c));
    },
    enqueueReplaceState: function(l, n, u) {
      l = l._reactInternals;
      var c = ia(), s = Ql(c);
      s.tag = 1, s.payload = n, u != null && (s.callback = u), n = vn(l, s, c), n !== null && (ca(n, l, c), Ki(n, l, c));
    },
    enqueueForceUpdate: function(l, n) {
      l = l._reactInternals;
      var u = ia(), c = Ql(u);
      c.tag = 2, n != null && (c.callback = n), n = vn(l, c, u), n !== null && (ca(n, l, u), Ki(n, l, u));
    }
  };
  function io(l, n, u, c, s, r, y) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(c, r, y) : n.prototype && n.prototype.isPureReactComponent ? !Xu(u, c) || !Xu(s, r) : !0;
  }
  function lc(l, n, u, c) {
    l = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(u, c), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(u, c), n.state !== l && wr.enqueueReplaceState(n, n.state, null);
  }
  function ei(l, n) {
    var u = n;
    if ("ref" in n) {
      u = {};
      for (var c in n)
        c !== "ref" && (u[c] = n[c]);
    }
    if (l = l.defaultProps) {
      u === n && (u = ae({}, u));
      for (var s in l)
        u[s] === void 0 && (u[s] = l[s]);
    }
    return u;
  }
  var Zf = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  };
  function co(l) {
    Zf(l);
  }
  function gy(l) {
    console.error(l);
  }
  function Lf(l) {
    Zf(l);
  }
  function Jf(l, n) {
    try {
      var u = l.onUncaughtError;
      u(n.value, { componentStack: n.stack });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function by(l, n, u) {
    try {
      var c = l.onCaughtError;
      c(u.value, {
        componentStack: u.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function Sy(l, n, u) {
    return u = Ql(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      Jf(l, n);
    }, u;
  }
  function Ty(l) {
    return l = Ql(l), l.tag = 3, l;
  }
  function Zl(l, n, u, c) {
    var s = u.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var r = c.value;
      l.payload = function() {
        return s(r);
      }, l.callback = function() {
        by(n, u, c);
      };
    }
    var y = u.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (l.callback = function() {
      by(n, u, c), typeof s != "function" && (ni === null ? ni = /* @__PURE__ */ new Set([this]) : ni.add(this));
      var m = c.stack;
      this.componentDidCatch(c.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function j0(l, n, u, c, s) {
    if (u.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
      if (n = u.alternate, n !== null && Fc(
        n,
        u,
        s,
        !0
      ), u = ua.current, u !== null) {
        switch (u.tag) {
          case 13:
            return vl === null ? rc() : u.alternate === null && zt === 0 && (zt = 3), u.flags &= -257, u.flags |= 65536, u.lanes = s, c === gr ? u.flags |= 16384 : (n = u.updateQueue, n === null ? u.updateQueue = /* @__PURE__ */ new Set([c]) : n.add(c), md(l, c, s)), !1;
          case 22:
            return u.flags |= 65536, c === gr ? u.flags |= 16384 : (n = u.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([c])
            }, u.updateQueue = n) : (u = n.retryQueue, u === null ? n.retryQueue = /* @__PURE__ */ new Set([c]) : u.add(c)), md(l, c, s)), !1;
        }
        throw Error(U(435, u.tag));
      }
      return md(l, c, s), rc(), !1;
    }
    if (_e)
      return n = ua.current, n !== null ? (!(n.flags & 65536) && (n.flags |= 256), n.flags |= 65536, n.lanes = s, c !== Zi && (l = Error(U(422), { cause: c }), Wc(la(l, u)))) : (c !== Zi && (n = Error(U(423), {
        cause: c
      }), Wc(
        la(n, u)
      )), l = l.current.alternate, l.flags |= 65536, s &= -s, l.lanes |= s, c = la(c, u), s = Sy(
        l.stateNode,
        c,
        s
      ), Ih(l, s), zt !== 4 && (zt = 2)), !1;
    var r = Error(U(520), { cause: c });
    if (r = la(r, u), mo === null ? mo = [r] : mo.push(r), zt !== 4 && (zt = 2), n === null) return !0;
    c = la(c, u), u = n;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = s & -s, u.lanes |= l, l = Sy(u.stateNode, c, l), Ih(u, l), !1;
        case 1:
          if (n = u.type, r = u.stateNode, (u.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (ni === null || !ni.has(r))))
            return u.flags |= 65536, s &= -s, u.lanes |= s, s = Ty(s), Zl(
              s,
              l,
              u,
              c
            ), Ih(u, s), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var Tt = Error(U(461)), Qt = !1;
  function kt(l, n, u, c) {
    n.child = l === null ? Sn(n, null, u, c) : tc(
      n,
      l.child,
      u,
      c
    );
  }
  function w0(l, n, u, c, s) {
    u = u.render;
    var r = n.ref;
    if ("ref" in c) {
      var y = {};
      for (var m in c)
        m !== "ref" && (y[m] = c[m]);
    } else y = c;
    return Ku(n), c = zr(
      l,
      n,
      u,
      y,
      r,
      s
    ), m = Dr(), l !== null && !Qt ? (ao(l, n, s), En(l, n, s)) : (_e && m && wi(n), n.flags |= 1, kt(l, n, c, s), n.child);
  }
  function su(l, n, u, c, s) {
    if (l === null) {
      var r = u.type;
      return typeof r == "function" && !Sf(r) && r.defaultProps === void 0 && u.compare === null ? (n.tag = 15, n.type = r, ac(
        l,
        n,
        r,
        c,
        s
      )) : (l = j(
        u.type,
        null,
        c,
        n,
        n.mode,
        s
      ), l.ref = n.ref, l.return = n, n.child = l);
    }
    if (r = l.child, !Pr(l, s)) {
      var y = r.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Xu, u(y, c) && l.ref === n.ref)
        return En(l, n, s);
    }
    return n.flags |= 1, l = wa(r, c), l.ref = n.ref, l.return = n, n.child = l;
  }
  function ac(l, n, u, c, s) {
    if (l !== null) {
      var r = l.memoizedProps;
      if (Xu(r, c) && l.ref === n.ref)
        if (Qt = !1, n.pendingProps = c = r, Pr(l, s))
          l.flags & 131072 && (Qt = !0);
        else
          return n.lanes = l.lanes, En(l, n, s);
    }
    return Lr(
      l,
      n,
      u,
      c,
      s
    );
  }
  function Zr(l, n, u) {
    var c = n.pendingProps, s = c.children, r = l !== null ? l.memoizedState : null;
    if (c.mode === "hidden") {
      if (n.flags & 128) {
        if (c = r !== null ? r.baseLanes | u : u, l !== null) {
          for (s = n.child = l.child, r = 0; s !== null; )
            r = r | s.lanes | s.childLanes, s = s.sibling;
          n.childLanes = r & ~c;
        } else n.childLanes = 0, n.child = null;
        return nc(
          l,
          n,
          c,
          u
        );
      }
      if (u & 536870912)
        n.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Li(
          n,
          r !== null ? r.cachePool : null
        ), r !== null ? $t(n, r) : to(), Tn(n);
      else
        return n.lanes = n.childLanes = 536870912, nc(
          l,
          n,
          r !== null ? r.baseLanes | u : u,
          u
        );
    } else
      r !== null ? (Li(n, r.cachePool), $t(n, r), An(), n.memoizedState = null) : (l !== null && Li(n, null), to(), An());
    return kt(l, n, s, u), n.child;
  }
  function nc(l, n, u, c) {
    var s = Of();
    return s = s === null ? null : { parent: _t._currentValue, pool: s }, n.memoizedState = {
      baseLanes: u,
      cachePool: s
    }, l !== null && Li(n, null), to(), Tn(n), l !== null && Fc(l, n, c, !0), null;
  }
  function Kf(l, n) {
    var u = n.ref;
    if (u === null)
      l !== null && l.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(U(284));
      (l === null || l.ref !== u) && (n.flags |= 4194816);
    }
  }
  function Lr(l, n, u, c, s) {
    return Ku(n), u = zr(
      l,
      n,
      u,
      c,
      void 0,
      s
    ), c = Dr(), l !== null && !Qt ? (ao(l, n, s), En(l, n, s)) : (_e && c && wi(n), n.flags |= 1, kt(l, n, u, s), n.child);
  }
  function Ay(l, n, u, c, s, r) {
    return Ku(n), n.updateQueue = null, u = ty(
      n,
      c,
      u,
      s
    ), Fu(l), c = Dr(), l !== null && !Qt ? (ao(l, n, r), En(l, n, r)) : (_e && c && wi(n), n.flags |= 1, kt(l, n, u, r), n.child);
  }
  function Jr(l, n, u, c, s) {
    if (Ku(n), n.stateNode === null) {
      var r = Lc, y = u.contextType;
      typeof y == "object" && y !== null && (r = Kt(y)), r = new u(c, r), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = wr, n.stateNode = r, r._reactInternals = n, r = n.stateNode, r.props = c, r.state = n.memoizedState, r.refs = {}, Sr(n), y = u.contextType, r.context = typeof y == "object" && y !== null ? Kt(y) : Lc, r.state = n.memoizedState, y = u.getDerivedStateFromProps, typeof y == "function" && (Pu(
        n,
        u,
        y,
        c
      ), r.state = n.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (y = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), y !== r.state && wr.enqueueReplaceState(r, r.state, null), iu(n, c, r, s), eo(), r.state = n.memoizedState), typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !0;
    } else if (l === null) {
      r = n.stateNode;
      var m = n.memoizedProps, g = ei(u, m);
      r.props = g;
      var R = r.context, V = u.contextType;
      y = Lc, typeof V == "object" && V !== null && (y = Kt(V));
      var X = u.getDerivedStateFromProps;
      V = typeof X == "function" || typeof r.getSnapshotBeforeUpdate == "function", m = n.pendingProps !== m, V || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (m || R !== y) && lc(
        n,
        r,
        c,
        y
      ), pn = !1;
      var M = n.memoizedState;
      r.state = M, iu(n, c, r, s), eo(), R = n.memoizedState, m || M !== R || pn ? (typeof X == "function" && (Pu(
        n,
        u,
        X,
        c
      ), R = n.memoizedState), (g = pn || io(
        n,
        u,
        g,
        c,
        M,
        R,
        y
      )) ? (V || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = c, n.memoizedState = R), r.props = c, r.state = R, r.context = y, c = g) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !1);
    } else {
      r = n.stateNode, Tr(l, n), y = n.memoizedProps, V = ei(u, y), r.props = V, X = n.pendingProps, M = r.context, R = u.contextType, g = Lc, typeof R == "object" && R !== null && (g = Kt(R)), m = u.getDerivedStateFromProps, (R = typeof m == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (y !== X || M !== g) && lc(
        n,
        r,
        c,
        g
      ), pn = !1, M = n.memoizedState, r.state = M, iu(n, c, r, s), eo();
      var H = n.memoizedState;
      y !== X || M !== H || pn || l !== null && l.dependencies !== null && zf(l.dependencies) ? (typeof m == "function" && (Pu(
        n,
        u,
        m,
        c
      ), H = n.memoizedState), (V = pn || io(
        n,
        u,
        V,
        c,
        M,
        H,
        g
      ) || l !== null && l.dependencies !== null && zf(l.dependencies)) ? (R || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(c, H, g), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        c,
        H,
        g
      )), typeof r.componentDidUpdate == "function" && (n.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || y === l.memoizedProps && M === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || y === l.memoizedProps && M === l.memoizedState || (n.flags |= 1024), n.memoizedProps = c, n.memoizedState = H), r.props = c, r.state = H, r.context = g, c = V) : (typeof r.componentDidUpdate != "function" || y === l.memoizedProps && M === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || y === l.memoizedProps && M === l.memoizedState || (n.flags |= 1024), c = !1);
    }
    return r = c, Kf(l, n), c = (n.flags & 128) !== 0, r || c ? (r = n.stateNode, u = c && typeof u.getDerivedStateFromError != "function" ? null : r.render(), n.flags |= 1, l !== null && c ? (n.child = tc(
      n,
      l.child,
      null,
      s
    ), n.child = tc(
      n,
      null,
      u,
      s
    )) : kt(l, n, u, s), n.memoizedState = r.state, l = n.child) : l = En(
      l,
      n,
      s
    ), l;
  }
  function Kr(l, n, u, c) {
    return kc(), n.flags |= 256, kt(l, n, u, c), n.child;
  }
  var $r = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ey(l) {
    return { baseLanes: l, cachePool: pr() };
  }
  function zy(l, n, u) {
    return l = l !== null ? l.childLanes & ~u : 0, n && (l |= Ma), l;
  }
  function Dy(l, n, u) {
    var c = n.pendingProps, s = !1, r = (n.flags & 128) !== 0, y;
    if ((y = r) || (y = l !== null && l.memoizedState === null ? !1 : (et.current & 2) !== 0), y && (s = !0, n.flags &= -129), y = (n.flags & 32) !== 0, n.flags &= -33, l === null) {
      if (_e) {
        if (s ? fu(n) : An(), _e) {
          var m = Xe, g;
          if (g = m) {
            e: {
              for (g = m, m = Aa; g.nodeType !== 8; ) {
                if (!m) {
                  m = null;
                  break e;
                }
                if (g = Wa(
                  g.nextSibling
                ), g === null) {
                  m = null;
                  break e;
                }
              }
              m = g;
            }
            m !== null ? (n.memoizedState = {
              dehydrated: m,
              treeContext: lu !== null ? { id: Za, overflow: bt } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, g = _l(
              18,
              null,
              null,
              0
            ), g.stateNode = m, g.return = n, n.child = g, Ot = n, Xe = null, g = !0) : g = !1;
          }
          g || au(n);
        }
        if (m = n.memoizedState, m !== null && (m = m.dehydrated, m !== null))
          return ds(m) ? n.lanes = 32 : n.lanes = 536870912, null;
        $a(n);
      }
      return m = c.children, c = c.fallback, s ? (An(), s = n.mode, m = Wr(
        { mode: "hidden", children: m },
        s
      ), c = ba(
        c,
        s,
        u,
        null
      ), m.return = n, c.return = n, m.sibling = c, n.child = m, s = n.child, s.memoizedState = Ey(u), s.childLanes = zy(
        l,
        y,
        u
      ), n.memoizedState = $r, c) : (fu(n), kr(n, m));
    }
    if (g = l.memoizedState, g !== null && (m = g.dehydrated, m !== null)) {
      if (r)
        n.flags & 256 ? (fu(n), n.flags &= -257, n = ti(
          l,
          n,
          u
        )) : n.memoizedState !== null ? (An(), n.child = l.child, n.flags |= 128, n = null) : (An(), s = c.fallback, m = n.mode, c = Wr(
          { mode: "visible", children: c.children },
          m
        ), s = ba(
          s,
          m,
          u,
          null
        ), s.flags |= 2, c.return = n, s.return = n, c.sibling = s, n.child = c, tc(
          n,
          l.child,
          null,
          u
        ), c = n.child, c.memoizedState = Ey(u), c.childLanes = zy(
          l,
          y,
          u
        ), n.memoizedState = $r, n = s);
      else if (fu(n), ds(m)) {
        if (y = m.nextSibling && m.nextSibling.dataset, y) var R = y.dgst;
        y = R, c = Error(U(419)), c.stack = "", c.digest = y, Wc({ value: c, source: null, stack: null }), n = ti(
          l,
          n,
          u
        );
      } else if (Qt || Fc(l, n, u, !1), y = (u & l.childLanes) !== 0, Qt || y) {
        if (y = at, y !== null && (c = u & -u, c = c & 42 ? 1 : Ya(c), c = c & (y.suspendedLanes | u) ? 0 : c, c !== 0 && c !== g.retryLane))
          throw g.retryLane = c, rn(l, c), ca(y, l, c), Tt;
        m.data === "$?" || rc(), n = ti(
          l,
          n,
          u
        );
      } else
        m.data === "$?" ? (n.flags |= 192, n.child = l.child, n = null) : (l = g.treeContext, Xe = Wa(
          m.nextSibling
        ), Ot = n, _e = !0, Ta = null, Aa = !1, l !== null && (Sa[Xl++] = Za, Sa[Xl++] = bt, Sa[Xl++] = lu, Za = l.id, bt = l.overflow, lu = n), n = kr(
          n,
          c.children
        ), n.flags |= 4096);
      return n;
    }
    return s ? (An(), s = c.fallback, m = n.mode, g = l.child, R = g.sibling, c = wa(g, {
      mode: "hidden",
      children: c.children
    }), c.subtreeFlags = g.subtreeFlags & 65011712, R !== null ? s = wa(R, s) : (s = ba(
      s,
      m,
      u,
      null
    ), s.flags |= 2), s.return = n, c.return = n, c.sibling = s, n.child = c, c = s, s = n.child, m = l.child.memoizedState, m === null ? m = Ey(u) : (g = m.cachePool, g !== null ? (R = _t._currentValue, g = g.parent !== R ? { parent: R, pool: R } : g) : g = pr(), m = {
      baseLanes: m.baseLanes | u,
      cachePool: g
    }), s.memoizedState = m, s.childLanes = zy(
      l,
      y,
      u
    ), n.memoizedState = $r, c) : (fu(n), u = l.child, l = u.sibling, u = wa(u, {
      mode: "visible",
      children: c.children
    }), u.return = n, u.sibling = null, l !== null && (y = n.deletions, y === null ? (n.deletions = [l], n.flags |= 16) : y.push(l)), n.child = u, n.memoizedState = null, u);
  }
  function kr(l, n) {
    return n = Wr(
      { mode: "visible", children: n },
      l.mode
    ), n.return = l, l.child = n;
  }
  function Wr(l, n) {
    return l = _l(22, l, null, n), l.lanes = 0, l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, l;
  }
  function ti(l, n, u) {
    return tc(n, l.child, null, u), l = kr(
      n,
      n.pendingProps.children
    ), l.flags |= 2, n.memoizedState = null, l;
  }
  function $f(l, n, u) {
    l.lanes |= n;
    var c = l.alternate;
    c !== null && (c.lanes |= n), rr(l.return, n, u);
  }
  function Fr(l, n, u, c, s) {
    var r = l.memoizedState;
    r === null ? l.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: c,
      tail: u,
      tailMode: s
    } : (r.isBackwards = n, r.rendering = null, r.renderingStartTime = 0, r.last = c, r.tail = u, r.tailMode = s);
  }
  function Ir(l, n, u) {
    var c = n.pendingProps, s = c.revealOrder, r = c.tail;
    if (kt(l, n, c.children, u), c = et.current, c & 2)
      c = c & 1 | 2, n.flags |= 128;
    else {
      if (l !== null && l.flags & 128)
        e: for (l = n.child; l !== null; ) {
          if (l.tag === 13)
            l.memoizedState !== null && $f(l, u, n);
          else if (l.tag === 19)
            $f(l, u, n);
          else if (l.child !== null) {
            l.child.return = l, l = l.child;
            continue;
          }
          if (l === n) break e;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === n)
              break e;
            l = l.return;
          }
          l.sibling.return = l.return, l = l.sibling;
        }
      c &= 1;
    }
    switch (Ye(et, c), s) {
      case "forwards":
        for (u = n.child, s = null; u !== null; )
          l = u.alternate, l !== null && wf(l) === null && (s = u), u = u.sibling;
        u = s, u === null ? (s = n.child, n.child = null) : (s = u.sibling, u.sibling = null), Fr(
          n,
          !1,
          s,
          u,
          r
        );
        break;
      case "backwards":
        for (u = null, s = n.child, n.child = null; s !== null; ) {
          if (l = s.alternate, l !== null && wf(l) === null) {
            n.child = s;
            break;
          }
          l = s.sibling, s.sibling = u, u = s, s = l;
        }
        Fr(
          n,
          !0,
          u,
          null,
          r
        );
        break;
      case "together":
        Fr(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function En(l, n, u) {
    if (l !== null && (n.dependencies = l.dependencies), hu |= n.lanes, !(u & n.childLanes))
      if (l !== null) {
        if (Fc(
          l,
          n,
          u,
          !1
        ), (u & n.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && n.child !== l.child)
      throw Error(U(153));
    if (n.child !== null) {
      for (l = n.child, u = wa(l, l.pendingProps), n.child = u, u.return = n; l.sibling !== null; )
        l = l.sibling, u = u.sibling = wa(l, l.pendingProps), u.return = n;
      u.sibling = null;
    }
    return n.child;
  }
  function Pr(l, n) {
    return l.lanes & n ? !0 : (l = l.dependencies, !!(l !== null && zf(l)));
  }
  function Z0(l, n, u) {
    switch (n.tag) {
      case 3:
        ko(n, n.stateNode.containerInfo), uu(n, _t, l.memoizedState.cache), kc();
        break;
      case 27:
      case 5:
        Mu(n);
        break;
      case 4:
        ko(n, n.stateNode.containerInfo);
        break;
      case 10:
        uu(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 13:
        var c = n.memoizedState;
        if (c !== null)
          return c.dehydrated !== null ? (fu(n), n.flags |= 128, null) : u & n.child.childLanes ? Dy(l, n, u) : (fu(n), l = En(
            l,
            n,
            u
          ), l !== null ? l.sibling : null);
        fu(n);
        break;
      case 19:
        var s = (l.flags & 128) !== 0;
        if (c = (u & n.childLanes) !== 0, c || (Fc(
          l,
          n,
          u,
          !1
        ), c = (u & n.childLanes) !== 0), s) {
          if (c)
            return Ir(
              l,
              n,
              u
            );
          n.flags |= 128;
        }
        if (s = n.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), Ye(et, et.current), c) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, Zr(l, n, u);
      case 24:
        uu(n, _t, l.memoizedState.cache);
    }
    return En(l, n, u);
  }
  function L0(l, n, u) {
    if (l !== null)
      if (l.memoizedProps !== n.pendingProps)
        Qt = !0;
      else {
        if (!Pr(l, u) && !(n.flags & 128))
          return Qt = !1, Z0(
            l,
            n,
            u
          );
        Qt = !!(l.flags & 131072);
      }
    else
      Qt = !1, _e && n.flags & 1048576 && sr(n, Kc, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          l = n.pendingProps;
          var c = n.elementType, s = c._init;
          if (c = s(c._payload), n.type = c, typeof c == "function")
            Sf(c) ? (l = ei(c, l), n.tag = 1, n = Jr(
              null,
              n,
              c,
              l,
              u
            )) : (n.tag = 0, n = Lr(
              null,
              n,
              c,
              l,
              u
            ));
          else {
            if (c != null) {
              if (s = c.$$typeof, s === ql) {
                n.tag = 11, n = w0(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              } else if (s === Ke) {
                n.tag = 14, n = su(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              }
            }
            throw n = qa(c) || c, Error(U(306, n, ""));
          }
        }
        return n;
      case 0:
        return Lr(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 1:
        return c = n.type, s = ei(
          c,
          n.pendingProps
        ), Jr(
          l,
          n,
          c,
          s,
          u
        );
      case 3:
        e: {
          if (ko(
            n,
            n.stateNode.containerInfo
          ), l === null) throw Error(U(387));
          c = n.pendingProps;
          var r = n.memoizedState;
          s = r.element, Tr(l, n), iu(n, c, null, u);
          var y = n.memoizedState;
          if (c = y.cache, uu(n, _t, c), c !== r.cache && Kh(
            n,
            [_t],
            u,
            !0
          ), eo(), c = y.element, r.isDehydrated)
            if (r = {
              element: c,
              isDehydrated: !1,
              cache: y.cache
            }, n.updateQueue.baseState = r, n.memoizedState = r, n.flags & 256) {
              n = Kr(
                l,
                n,
                c,
                u
              );
              break e;
            } else if (c !== s) {
              s = la(
                Error(U(424)),
                n
              ), Wc(s), n = Kr(
                l,
                n,
                c,
                u
              );
              break e;
            } else {
              switch (l = n.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (Xe = Wa(l.firstChild), Ot = n, _e = !0, Ta = null, Aa = !0, u = Sn(
                n,
                null,
                c,
                u
              ), n.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
            }
          else {
            if (kc(), c === s) {
              n = En(
                l,
                n,
                u
              );
              break e;
            }
            kt(
              l,
              n,
              c,
              u
            );
          }
          n = n.child;
        }
        return n;
      case 26:
        return Kf(l, n), l === null ? (u = cp(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = u : _e || (u = n.type, l = n.pendingProps, c = xa(
          Ze.current
        ).createElement(u), c[Jt] = n, c[Dl] = l, se(c, u, l), Vt(c), n.stateNode = c) : n.memoizedState = cp(
          n.type,
          l.memoizedProps,
          n.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Mu(n), l === null && _e && (c = n.stateNode = K(
          n.type,
          n.pendingProps,
          Ze.current
        ), Ot = n, Aa = !0, s = Xe, si(n.type) ? (ri = s, Xe = Wa(
          c.firstChild
        )) : Xe = s), kt(
          l,
          n,
          n.pendingProps.children,
          u
        ), Kf(l, n), l === null && (n.flags |= 4194304), n.child;
      case 5:
        return l === null && _e && ((s = c = Xe) && (c = Oo(
          c,
          n.type,
          n.pendingProps,
          Aa
        ), c !== null ? (n.stateNode = c, Ot = n, Xe = Wa(
          c.firstChild
        ), Aa = !1, s = !0) : s = !1), s || au(n)), Mu(n), s = n.type, r = n.pendingProps, y = l !== null ? l.memoizedProps : null, c = r.children, Cn(s, r) ? c = null : y !== null && Cn(s, y) && (n.flags |= 32), n.memoizedState !== null && (s = zr(
          l,
          n,
          N0,
          null,
          null,
          u
        ), Wl._currentValue = s), Kf(l, n), kt(l, n, c, u), n.child;
      case 6:
        return l === null && _e && ((l = u = Xe) && (u = Dv(
          u,
          n.pendingProps,
          Aa
        ), u !== null ? (n.stateNode = u, Ot = n, Xe = null, l = !0) : l = !1), l || au(n)), null;
      case 13:
        return Dy(l, n, u);
      case 4:
        return ko(
          n,
          n.stateNode.containerInfo
        ), c = n.pendingProps, l === null ? n.child = tc(
          n,
          null,
          c,
          u
        ) : kt(
          l,
          n,
          c,
          u
        ), n.child;
      case 11:
        return w0(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 7:
        return kt(
          l,
          n,
          n.pendingProps,
          u
        ), n.child;
      case 8:
        return kt(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 12:
        return kt(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 10:
        return c = n.pendingProps, uu(n, n.type, c.value), kt(
          l,
          n,
          c.children,
          u
        ), n.child;
      case 9:
        return s = n.type._context, c = n.pendingProps.children, Ku(n), s = Kt(s), c = c(s), n.flags |= 1, kt(l, n, c, u), n.child;
      case 14:
        return su(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 15:
        return ac(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 19:
        return Ir(l, n, u);
      case 31:
        return c = n.pendingProps, u = n.mode, c = {
          mode: c.mode,
          children: c.children
        }, l === null ? (u = Wr(
          c,
          u
        ), u.ref = n.ref, n.child = u, u.return = n, n = u) : (u = wa(l.child, c), u.ref = n.ref, n.child = u, u.return = n, n = u), n;
      case 22:
        return Zr(l, n, u);
      case 24:
        return Ku(n), c = Kt(_t), l === null ? (s = Of(), s === null && (s = at, r = Pc(), s.pooledCache = r, r.refCount++, r !== null && (s.pooledCacheLanes |= u), s = r), n.memoizedState = {
          parent: c,
          cache: s
        }, Sr(n), uu(n, _t, s)) : (l.lanes & u && (Tr(l, n), iu(n, null, null, u), eo()), s = l.memoizedState, r = n.memoizedState, s.parent !== c ? (s = { parent: c, cache: c }, n.memoizedState = s, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = s), uu(n, _t, c)) : (c = r.cache, uu(n, _t, c), c !== s.cache && Kh(
          n,
          [_t],
          u,
          !0
        ))), kt(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(U(156, n.tag));
  }
  function zn(l) {
    l.flags |= 4;
  }
  function oo(l, n) {
    if (n.type !== "stylesheet" || n.state.loading & 4)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !om(n)) {
      if (n = ua.current, n !== null && ((xe & 4194048) === xe ? vl !== null : (xe & 62914560) !== xe && !(xe & 536870912) || n !== vl))
        throw Ji = gr, vr;
      l.flags |= 8192;
    }
  }
  function kf(l, n) {
    n !== null && (l.flags |= 4), l.flags & 16384 && (n = l.tag !== 22 ? Ei() : 536870912, l.lanes |= n, yo |= n);
  }
  function fo(l, n) {
    if (!_e)
      switch (l.tailMode) {
        case "hidden":
          n = l.tail;
          for (var u = null; n !== null; )
            n.alternate !== null && (u = n), n = n.sibling;
          u === null ? l.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = l.tail;
          for (var c = null; u !== null; )
            u.alternate !== null && (c = u), u = u.sibling;
          c === null ? n || l.tail === null ? l.tail = null : l.tail.sibling = null : c.sibling = null;
      }
  }
  function ue(l) {
    var n = l.alternate !== null && l.alternate.child === l.child, u = 0, c = 0;
    if (n)
      for (var s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags & 65011712, c |= s.flags & 65011712, s.return = l, s = s.sibling;
    else
      for (s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags, c |= s.flags, s.return = l, s = s.sibling;
    return l.subtreeFlags |= c, l.childLanes = u, n;
  }
  function Ry(l, n, u) {
    var c = n.pendingProps;
    switch (dn(n), n.tag) {
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
        return ue(n), null;
      case 1:
        return ue(n), null;
      case 3:
        return u = n.stateNode, c = null, l !== null && (c = l.memoizedState.cache), n.memoizedState.cache !== c && (n.flags |= 2048), hn(_t), tn(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && ($c(n) ? zn(n) : l === null || l.memoizedState.isDehydrated && !(n.flags & 256) || (n.flags |= 1024, Jh())), ue(n), null;
      case 26:
        return u = n.memoizedState, l === null ? (zn(n), u !== null ? (ue(n), oo(n, u)) : (ue(n), n.flags &= -16777217)) : u ? u !== l.memoizedState ? (zn(n), ue(n), oo(n, u)) : (ue(n), n.flags &= -16777217) : (l.memoizedProps !== c && zn(n), ue(n), n.flags &= -16777217), null;
      case 27:
        Wo(n), u = Ze.current;
        var s = n.type;
        if (l !== null && n.stateNode != null)
          l.memoizedProps !== c && zn(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(U(166));
            return ue(n), null;
          }
          l = We.current, $c(n) ? Af(n) : (l = K(s, c, u), n.stateNode = l, zn(n));
        }
        return ue(n), null;
      case 5:
        if (Wo(n), u = n.type, l !== null && n.stateNode != null)
          l.memoizedProps !== c && zn(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(U(166));
            return ue(n), null;
          }
          if (l = We.current, $c(n))
            Af(n);
          else {
            switch (s = xa(
              Ze.current
            ), l) {
              case 1:
                l = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                l = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    l = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    l = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    l = s.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                    break;
                  case "select":
                    l = typeof c.is == "string" ? s.createElement("select", { is: c.is }) : s.createElement("select"), c.multiple ? l.multiple = !0 : c.size && (l.size = c.size);
                    break;
                  default:
                    l = typeof c.is == "string" ? s.createElement(u, { is: c.is }) : s.createElement(u);
                }
            }
            l[Jt] = n, l[Dl] = c;
            e: for (s = n.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                l.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === n) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === n)
                  break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            n.stateNode = l;
            e: switch (se(l, u, c), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!c.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && zn(n);
          }
        }
        return ue(n), n.flags &= -16777217, null;
      case 6:
        if (l && n.stateNode != null)
          l.memoizedProps !== c && zn(n);
        else {
          if (typeof c != "string" && n.stateNode === null)
            throw Error(U(166));
          if (l = Ze.current, $c(n)) {
            if (l = n.stateNode, u = n.memoizedProps, c = null, s = Ot, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  c = s.memoizedProps;
              }
            l[Jt] = n, l = !!(l.nodeValue === u || c !== null && c.suppressHydrationWarning === !0 || nm(l.nodeValue, u)), l || au(n);
          } else
            l = xa(l).createTextNode(
              c
            ), l[Jt] = n, n.stateNode = l;
        }
        return ue(n), null;
      case 13:
        if (c = n.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (s = $c(n), c !== null && c.dehydrated !== null) {
            if (l === null) {
              if (!s) throw Error(U(318));
              if (s = n.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(U(317));
              s[Jt] = n;
            } else
              kc(), !(n.flags & 128) && (n.memoizedState = null), n.flags |= 4;
            ue(n), s = !1;
          } else
            s = Jh(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return n.flags & 256 ? ($a(n), n) : ($a(n), null);
        }
        if ($a(n), n.flags & 128)
          return n.lanes = u, n;
        if (u = c !== null, l = l !== null && l.memoizedState !== null, u) {
          c = n.child, s = null, c.alternate !== null && c.alternate.memoizedState !== null && c.alternate.memoizedState.cachePool !== null && (s = c.alternate.memoizedState.cachePool.pool);
          var r = null;
          c.memoizedState !== null && c.memoizedState.cachePool !== null && (r = c.memoizedState.cachePool.pool), r !== s && (c.flags |= 2048);
        }
        return u !== l && u && (n.child.flags |= 8192), kf(n, n.updateQueue), ue(n), null;
      case 4:
        return tn(), l === null && lm(n.stateNode.containerInfo), ue(n), null;
      case 10:
        return hn(n.type), ue(n), null;
      case 19:
        if (le(et), s = n.memoizedState, s === null) return ue(n), null;
        if (c = (n.flags & 128) !== 0, r = s.rendering, r === null)
          if (c) fo(s, !1);
          else {
            if (zt !== 0 || l !== null && l.flags & 128)
              for (l = n.child; l !== null; ) {
                if (r = wf(l), r !== null) {
                  for (n.flags |= 128, fo(s, !1), l = r.updateQueue, n.updateQueue = l, kf(n, l), n.subtreeFlags = 0, l = u, u = n.child; u !== null; )
                    De(u, l), u = u.sibling;
                  return Ye(
                    et,
                    et.current & 1 | 2
                  ), n.child;
                }
                l = l.sibling;
              }
            s.tail !== null && Il() > od && (n.flags |= 128, c = !0, fo(s, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (l = wf(r), l !== null) {
              if (n.flags |= 128, c = !0, l = l.updateQueue, n.updateQueue = l, kf(n, l), fo(s, !0), s.tail === null && s.tailMode === "hidden" && !r.alternate && !_e)
                return ue(n), null;
            } else
              2 * Il() - s.renderingStartTime > od && u !== 536870912 && (n.flags |= 128, c = !0, fo(s, !1), n.lanes = 4194304);
          s.isBackwards ? (r.sibling = n.child, n.child = r) : (l = s.last, l !== null ? l.sibling = r : n.child = r, s.last = r);
        }
        return s.tail !== null ? (n = s.tail, s.rendering = n, s.tail = n.sibling, s.renderingStartTime = Il(), n.sibling = null, l = et.current, Ye(et, c ? l & 1 | 2 : l & 1), n) : (ue(n), null);
      case 22:
      case 23:
        return $a(n), lo(), c = n.memoizedState !== null, l !== null ? l.memoizedState !== null !== c && (n.flags |= 8192) : c && (n.flags |= 8192), c ? u & 536870912 && !(n.flags & 128) && (ue(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : ue(n), u = n.updateQueue, u !== null && kf(n, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), c = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (c = n.memoizedState.cachePool.pool), c !== u && (n.flags |= 2048), l !== null && le(mn), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), n.memoizedState.cache !== u && (n.flags |= 2048), hn(_t), ue(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(U(156, n.tag));
  }
  function vv(l, n) {
    switch (dn(n), n.tag) {
      case 1:
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 3:
        return hn(_t), tn(), l = n.flags, l & 65536 && !(l & 128) ? (n.flags = l & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Wo(n), null;
      case 13:
        if ($a(n), l = n.memoizedState, l !== null && l.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(U(340));
          kc();
        }
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 19:
        return le(et), null;
      case 4:
        return tn(), null;
      case 10:
        return hn(n.type), null;
      case 22:
      case 23:
        return $a(n), lo(), l !== null && le(mn), l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 24:
        return hn(_t), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Oy(l, n) {
    switch (dn(n), n.tag) {
      case 3:
        hn(_t), tn();
        break;
      case 26:
      case 27:
      case 5:
        Wo(n);
        break;
      case 4:
        tn();
        break;
      case 13:
        $a(n);
        break;
      case 19:
        le(et);
        break;
      case 10:
        hn(n.type);
        break;
      case 22:
      case 23:
        $a(n), lo(), l !== null && le(mn);
        break;
      case 24:
        hn(_t);
    }
  }
  function Wf(l, n) {
    try {
      var u = n.updateQueue, c = u !== null ? u.lastEffect : null;
      if (c !== null) {
        var s = c.next;
        u = s;
        do {
          if ((u.tag & l) === l) {
            c = void 0;
            var r = u.create, y = u.inst;
            c = r(), y.destroy = c;
          }
          u = u.next;
        } while (u !== s);
      }
    } catch (m) {
      Fe(n, n.return, m);
    }
  }
  function li(l, n, u) {
    try {
      var c = n.updateQueue, s = c !== null ? c.lastEffect : null;
      if (s !== null) {
        var r = s.next;
        c = r;
        do {
          if ((c.tag & l) === l) {
            var y = c.inst, m = y.destroy;
            if (m !== void 0) {
              y.destroy = void 0, s = n;
              var g = u, R = m;
              try {
                R();
              } catch (V) {
                Fe(
                  s,
                  g,
                  V
                );
              }
            }
          }
          c = c.next;
        } while (c !== r);
      }
    } catch (V) {
      Fe(n, n.return, V);
    }
  }
  function ed(l) {
    var n = l.updateQueue;
    if (n !== null) {
      var u = l.stateNode;
      try {
        xf(n, u);
      } catch (c) {
        Fe(l, l.return, c);
      }
    }
  }
  function My(l, n, u) {
    u.props = ei(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (c) {
      Fe(l, n, c);
    }
  }
  function so(l, n) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var c = l.stateNode;
            break;
          case 30:
            c = l.stateNode;
            break;
          default:
            c = l.stateNode;
        }
        typeof u == "function" ? l.refCleanup = u(c) : u.current = c;
      }
    } catch (s) {
      Fe(l, n, s);
    }
  }
  function ka(l, n) {
    var u = l.ref, c = l.refCleanup;
    if (u !== null)
      if (typeof c == "function")
        try {
          c();
        } catch (s) {
          Fe(l, n, s);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (s) {
          Fe(l, n, s);
        }
      else u.current = null;
  }
  function ro(l) {
    var n = l.type, u = l.memoizedProps, c = l.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && c.focus();
          break e;
        case "img":
          u.src ? c.src = u.src : u.srcSet && (c.srcset = u.srcSet);
      }
    } catch (s) {
      Fe(l, l.return, s);
    }
  }
  function Uy(l, n, u) {
    try {
      var c = l.stateNode;
      Av(c, l.type, u, n), c[Dl] = n;
    } catch (s) {
      Fe(l, l.return, s);
    }
  }
  function J0(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && si(l.type) || l.tag === 4;
  }
  function Ra(l) {
    e: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || J0(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && si(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue e;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function uc(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, n) : (n = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, n.appendChild(l), u = u._reactRootContainer, u != null || n.onclick !== null || (n.onclick = Sd));
    else if (c !== 4 && (c === 27 && si(l.type) && (u = l.stateNode, n = null), l = l.child, l !== null))
      for (uc(l, n, u), l = l.sibling; l !== null; )
        uc(l, n, u), l = l.sibling;
  }
  function td(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? u.insertBefore(l, n) : u.appendChild(l);
    else if (c !== 4 && (c === 27 && si(l.type) && (u = l.stateNode), l = l.child, l !== null))
      for (td(l, n, u), l = l.sibling; l !== null; )
        td(l, n, u), l = l.sibling;
  }
  function ld(l) {
    var n = l.stateNode, u = l.memoizedProps;
    try {
      for (var c = l.type, s = n.attributes; s.length; )
        n.removeAttributeNode(s[0]);
      se(n, c, u), n[Jt] = l, n[Dl] = u;
    } catch (r) {
      Fe(l, l.return, r);
    }
  }
  var Dn = !1, At = !1, ad = !1, nd = typeof WeakSet == "function" ? WeakSet : Set, jt = null;
  function xy(l, n) {
    if (l = l.containerInfo, fs = ms, l = _h(l), gf(l)) {
      if ("selectionStart" in l)
        var u = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        e: {
          u = (u = l.ownerDocument) && u.defaultView || window;
          var c = u.getSelection && u.getSelection();
          if (c && c.rangeCount !== 0) {
            u = c.anchorNode;
            var s = c.anchorOffset, r = c.focusNode;
            c = c.focusOffset;
            try {
              u.nodeType, r.nodeType;
            } catch {
              u = null;
              break e;
            }
            var y = 0, m = -1, g = -1, R = 0, V = 0, X = l, M = null;
            t: for (; ; ) {
              for (var H; X !== u || s !== 0 && X.nodeType !== 3 || (m = y + s), X !== r || c !== 0 && X.nodeType !== 3 || (g = y + c), X.nodeType === 3 && (y += X.nodeValue.length), (H = X.firstChild) !== null; )
                M = X, X = H;
              for (; ; ) {
                if (X === l) break t;
                if (M === u && ++R === s && (m = y), M === r && ++V === c && (g = y), (H = X.nextSibling) !== null) break;
                X = M, M = X.parentNode;
              }
              X = H;
            }
            u = m === -1 || g === -1 ? null : { start: m, end: g };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (ss = { focusedElem: l, selectionRange: u }, ms = !1, jt = n; jt !== null; )
      if (n = jt, l = n.child, (n.subtreeFlags & 1024) !== 0 && l !== null)
        l.return = n, jt = l;
      else
        for (; jt !== null; ) {
          switch (n = jt, r = n.alternate, l = n.flags, n.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if (l & 1024 && r !== null) {
                l = void 0, u = n, s = r.memoizedProps, r = r.memoizedState, c = u.stateNode;
                try {
                  var P = ei(
                    u.type,
                    s,
                    u.elementType === u.type
                  );
                  l = c.getSnapshotBeforeUpdate(
                    P,
                    r
                  ), c.__reactInternalSnapshotBeforeUpdate = l;
                } catch (ee) {
                  Fe(
                    u,
                    u.return,
                    ee
                  );
                }
              }
              break;
            case 3:
              if (l & 1024) {
                if (l = n.stateNode.containerInfo, u = l.nodeType, u === 9)
                  rs(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      rs(l);
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
              if (l & 1024) throw Error(U(163));
          }
          if (l = n.sibling, l !== null) {
            l.return = n.return, jt = l;
            break;
          }
          jt = n.return;
        }
  }
  function Hy(l, n, u) {
    var c = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        On(l, u), c & 4 && Wf(5, u);
        break;
      case 1:
        if (On(l, u), c & 4)
          if (l = u.stateNode, n === null)
            try {
              l.componentDidMount();
            } catch (y) {
              Fe(u, u.return, y);
            }
          else {
            var s = ei(
              u.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              l.componentDidUpdate(
                s,
                n,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (y) {
              Fe(
                u,
                u.return,
                y
              );
            }
          }
        c & 64 && ed(u), c & 512 && so(u, u.return);
        break;
      case 3:
        if (On(l, u), c & 64 && (l = u.updateQueue, l !== null)) {
          if (n = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                n = u.child.stateNode;
                break;
              case 1:
                n = u.child.stateNode;
            }
          try {
            xf(l, n);
          } catch (y) {
            Fe(u, u.return, y);
          }
        }
        break;
      case 27:
        n === null && c & 4 && ld(u);
      case 26:
      case 5:
        On(l, u), n === null && c & 4 && ro(u), c & 512 && so(u, u.return);
        break;
      case 12:
        On(l, u);
        break;
      case 13:
        On(l, u), c & 4 && ud(l, u), c & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = gv.bind(
          null,
          u
        ), Rv(l, u))));
        break;
      case 22:
        if (c = u.memoizedState !== null || Dn, !c) {
          n = n !== null && n.memoizedState !== null || At, s = Dn;
          var r = At;
          Dn = c, (At = n) && !r ? ai(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : On(l, u), Dn = s, At = r;
        }
        break;
      case 30:
        break;
      default:
        On(l, u);
    }
  }
  function Cy(l) {
    var n = l.alternate;
    n !== null && (l.alternate = null, Cy(n)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (n = l.stateNode, n !== null && tf(n)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var st = null, al = !1;
  function Rn(l, n, u) {
    for (u = u.child; u !== null; )
      Me(l, n, u), u = u.sibling;
  }
  function Me(l, n, u) {
    if (zl && typeof zl.onCommitFiberUnmount == "function")
      try {
        zl.onCommitFiberUnmount(Cc, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        At || ka(u, n), Rn(
          l,
          n,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        At || ka(u, n);
        var c = st, s = al;
        si(u.type) && (st = u.stateNode, al = !1), Rn(
          l,
          n,
          u
        ), $l(u.stateNode), st = c, al = s;
        break;
      case 5:
        At || ka(u, n);
      case 6:
        if (c = st, s = al, st = null, Rn(
          l,
          n,
          u
        ), st = c, al = s, st !== null)
          if (al)
            try {
              (st.nodeType === 9 ? st.body : st.nodeName === "HTML" ? st.ownerDocument.body : st).removeChild(u.stateNode);
            } catch (r) {
              Fe(
                u,
                n,
                r
              );
            }
          else
            try {
              st.removeChild(u.stateNode);
            } catch (r) {
              Fe(
                u,
                n,
                r
              );
            }
        break;
      case 18:
        st !== null && (al ? (l = st, Ad(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), qn(l)) : Ad(st, u.stateNode));
        break;
      case 4:
        c = st, s = al, st = u.stateNode.containerInfo, al = !0, Rn(
          l,
          n,
          u
        ), st = c, al = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        At || li(2, u, n), At || li(4, u, n), Rn(
          l,
          n,
          u
        );
        break;
      case 1:
        At || (ka(u, n), c = u.stateNode, typeof c.componentWillUnmount == "function" && My(
          u,
          n,
          c
        )), Rn(
          l,
          n,
          u
        );
        break;
      case 21:
        Rn(
          l,
          n,
          u
        );
        break;
      case 22:
        At = (c = At) || u.memoizedState !== null, Rn(
          l,
          n,
          u
        ), At = c;
        break;
      default:
        Rn(
          l,
          n,
          u
        );
    }
  }
  function ud(l, n) {
    if (n.memoizedState === null && (l = n.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        qn(l);
      } catch (u) {
        Fe(n, n.return, u);
      }
  }
  function Ny(l) {
    switch (l.tag) {
      case 13:
      case 19:
        var n = l.stateNode;
        return n === null && (n = l.stateNode = new nd()), n;
      case 22:
        return l = l.stateNode, n = l._retryCache, n === null && (n = l._retryCache = new nd()), n;
      default:
        throw Error(U(435, l.tag));
    }
  }
  function id(l, n) {
    var u = Ny(l);
    n.forEach(function(c) {
      var s = bv.bind(null, l, c);
      u.has(c) || (u.add(c), c.then(s, s));
    });
  }
  function Ml(l, n) {
    var u = n.deletions;
    if (u !== null)
      for (var c = 0; c < u.length; c++) {
        var s = u[c], r = l, y = n, m = y;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (si(m.type)) {
                st = m.stateNode, al = !1;
                break e;
              }
              break;
            case 5:
              st = m.stateNode, al = !1;
              break e;
            case 3:
            case 4:
              st = m.stateNode.containerInfo, al = !0;
              break e;
          }
          m = m.return;
        }
        if (st === null) throw Error(U(160));
        Me(r, y, s), st = null, al = !1, r = s.alternate, r !== null && (r.return = null), s.return = null;
      }
    if (n.subtreeFlags & 13878)
      for (n = n.child; n !== null; )
        Ff(n, l), n = n.sibling;
  }
  var Ul = null;
  function Ff(l, n) {
    var u = l.alternate, c = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ml(n, l), Wt(l), c & 4 && (li(3, l, l.return), Wf(3, l), li(5, l, l.return));
        break;
      case 1:
        Ml(n, l), Wt(l), c & 512 && (At || u === null || ka(u, u.return)), c & 64 && Dn && (l = l.updateQueue, l !== null && (c = l.callbacks, c !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? c : u.concat(c))));
        break;
      case 26:
        var s = Ul;
        if (Ml(n, l), Wt(l), c & 512 && (At || u === null || ka(u, u.return)), c & 4) {
          var r = u !== null ? u.memoizedState : null;
          if (c = l.memoizedState, u === null)
            if (c === null)
              if (l.stateNode === null) {
                e: {
                  c = l.type, u = l.memoizedProps, s = s.ownerDocument || s;
                  t: switch (c) {
                    case "title":
                      r = s.getElementsByTagName("title")[0], (!r || r[k] || r[Jt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = s.createElement(c), s.head.insertBefore(
                        r,
                        s.querySelector("head > title")
                      )), se(r, c, u), r[Jt] = l, Vt(r), c = r;
                      break e;
                    case "link":
                      var y = im(
                        "link",
                        "href",
                        s
                      ).get(c + (u.href || ""));
                      if (y) {
                        for (var m = 0; m < y.length; m++)
                          if (r = y[m], r.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && r.getAttribute("rel") === (u.rel == null ? null : u.rel) && r.getAttribute("title") === (u.title == null ? null : u.title) && r.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                            y.splice(m, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), se(r, c, u), s.head.appendChild(r);
                      break;
                    case "meta":
                      if (y = im(
                        "meta",
                        "content",
                        s
                      ).get(c + (u.content || ""))) {
                        for (m = 0; m < y.length; m++)
                          if (r = y[m], r.getAttribute("content") === (u.content == null ? null : "" + u.content) && r.getAttribute("name") === (u.name == null ? null : u.name) && r.getAttribute("property") === (u.property == null ? null : u.property) && r.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && r.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                            y.splice(m, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), se(r, c, u), s.head.appendChild(r);
                      break;
                    default:
                      throw Error(U(468, c));
                  }
                  r[Jt] = l, Vt(r), c = r;
                }
                l.stateNode = c;
              } else
                cm(
                  s,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = fp(
                s,
                c,
                l.memoizedProps
              );
          else
            r !== c ? (r === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : r.count--, c === null ? cm(
              s,
              l.type,
              l.stateNode
            ) : fp(
              s,
              c,
              l.memoizedProps
            )) : c === null && l.stateNode !== null && Uy(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        Ml(n, l), Wt(l), c & 512 && (At || u === null || ka(u, u.return)), u !== null && c & 4 && Uy(
          l,
          l.memoizedProps,
          u.memoizedProps
        );
        break;
      case 5:
        if (Ml(n, l), Wt(l), c & 512 && (At || u === null || ka(u, u.return)), l.flags & 32) {
          s = l.stateNode;
          try {
            Yc(s, "");
          } catch (H) {
            Fe(l, l.return, H);
          }
        }
        c & 4 && l.stateNode != null && (s = l.memoizedProps, Uy(
          l,
          s,
          u !== null ? u.memoizedProps : s
        )), c & 1024 && (ad = !0);
        break;
      case 6:
        if (Ml(n, l), Wt(l), c & 4) {
          if (l.stateNode === null)
            throw Error(U(162));
          c = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = c;
          } catch (H) {
            Fe(l, l.return, H);
          }
        }
        break;
      case 3:
        if (yi = null, s = Ul, Ul = Ed(n.containerInfo), Ml(n, l), Ul = s, Wt(l), c & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            qn(n.containerInfo);
          } catch (H) {
            Fe(l, l.return, H);
          }
        ad && (ad = !1, By(l));
        break;
      case 4:
        c = Ul, Ul = Ed(
          l.stateNode.containerInfo
        ), Ml(n, l), Wt(l), Ul = c;
        break;
      case 12:
        Ml(n, l), Wt(l);
        break;
      case 13:
        Ml(n, l), Wt(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (jy = Il()), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, id(l, c)));
        break;
      case 22:
        s = l.memoizedState !== null;
        var g = u !== null && u.memoizedState !== null, R = Dn, V = At;
        if (Dn = R || s, At = V || g, Ml(n, l), At = V, Dn = R, Wt(l), c & 8192)
          e: for (n = l.stateNode, n._visibility = s ? n._visibility & -2 : n._visibility | 1, s && (u === null || g || Dn || At || rt(l)), u = null, n = l; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (u === null) {
                g = u = n;
                try {
                  if (r = g.stateNode, s)
                    y = r.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    m = g.stateNode;
                    var X = g.memoizedProps.style, M = X != null && X.hasOwnProperty("display") ? X.display : null;
                    m.style.display = M == null || typeof M == "boolean" ? "" : ("" + M).trim();
                  }
                } catch (H) {
                  Fe(g, g.return, H);
                }
              }
            } else if (n.tag === 6) {
              if (u === null) {
                g = n;
                try {
                  g.stateNode.nodeValue = s ? "" : g.memoizedProps;
                } catch (H) {
                  Fe(g, g.return, H);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === l) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === l) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === l) break e;
              u === n && (u = null), n = n.return;
            }
            u === n && (u = null), n.sibling.return = n.return, n = n.sibling;
          }
        c & 4 && (c = l.updateQueue, c !== null && (u = c.retryQueue, u !== null && (c.retryQueue = null, id(l, u))));
        break;
      case 19:
        Ml(n, l), Wt(l), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, id(l, c)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ml(n, l), Wt(l);
    }
  }
  function Wt(l) {
    var n = l.flags;
    if (n & 2) {
      try {
        for (var u, c = l.return; c !== null; ) {
          if (J0(c)) {
            u = c;
            break;
          }
          c = c.return;
        }
        if (u == null) throw Error(U(160));
        switch (u.tag) {
          case 27:
            var s = u.stateNode, r = Ra(l);
            td(l, r, s);
            break;
          case 5:
            var y = u.stateNode;
            u.flags & 32 && (Yc(y, ""), u.flags &= -33);
            var m = Ra(l);
            td(l, m, y);
            break;
          case 3:
          case 4:
            var g = u.stateNode.containerInfo, R = Ra(l);
            uc(
              l,
              R,
              g
            );
            break;
          default:
            throw Error(U(161));
        }
      } catch (V) {
        Fe(l, l.return, V);
      }
      l.flags &= -3;
    }
    n & 4096 && (l.flags &= -4097);
  }
  function By(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var n = l;
        By(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), l = l.sibling;
      }
  }
  function On(l, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Hy(l, n.alternate, n), n = n.sibling;
  }
  function rt(l) {
    for (l = l.child; l !== null; ) {
      var n = l;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          li(4, n, n.return), rt(n);
          break;
        case 1:
          ka(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && My(
            n,
            n.return,
            u
          ), rt(n);
          break;
        case 27:
          $l(n.stateNode);
        case 26:
        case 5:
          ka(n, n.return), rt(n);
          break;
        case 22:
          n.memoizedState === null && rt(n);
          break;
        case 30:
          rt(n);
          break;
        default:
          rt(n);
      }
      l = l.sibling;
    }
  }
  function ai(l, n, u) {
    for (u = u && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var c = n.alternate, s = l, r = n, y = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          ai(
            s,
            r,
            u
          ), Wf(4, r);
          break;
        case 1:
          if (ai(
            s,
            r,
            u
          ), c = r, s = c.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (R) {
              Fe(c, c.return, R);
            }
          if (c = r, s = c.updateQueue, s !== null) {
            var m = c.stateNode;
            try {
              var g = s.shared.hiddenCallbacks;
              if (g !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < g.length; s++)
                  Ar(g[s], m);
            } catch (R) {
              Fe(c, c.return, R);
            }
          }
          u && y & 64 && ed(r), so(r, r.return);
          break;
        case 27:
          ld(r);
        case 26:
        case 5:
          ai(
            s,
            r,
            u
          ), u && c === null && y & 4 && ro(r), so(r, r.return);
          break;
        case 12:
          ai(
            s,
            r,
            u
          );
          break;
        case 13:
          ai(
            s,
            r,
            u
          ), u && y & 4 && ud(s, r);
          break;
        case 22:
          r.memoizedState === null && ai(
            s,
            r,
            u
          ), so(r, r.return);
          break;
        case 30:
          break;
        default:
          ai(
            s,
            r,
            u
          );
      }
      n = n.sibling;
    }
  }
  function Oa(l, n) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && yn(u));
  }
  function cd(l, n) {
    l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && yn(l));
  }
  function nl(l, n, u, c) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        qy(
          l,
          n,
          u,
          c
        ), n = n.sibling;
  }
  function qy(l, n, u, c) {
    var s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        nl(
          l,
          n,
          u,
          c
        ), s & 2048 && Wf(9, n);
        break;
      case 1:
        nl(
          l,
          n,
          u,
          c
        );
        break;
      case 3:
        nl(
          l,
          n,
          u,
          c
        ), s & 2048 && (l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && yn(l)));
        break;
      case 12:
        if (s & 2048) {
          nl(
            l,
            n,
            u,
            c
          ), l = n.stateNode;
          try {
            var r = n.memoizedProps, y = r.id, m = r.onPostCommit;
            typeof m == "function" && m(
              y,
              n.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (g) {
            Fe(n, n.return, g);
          }
        } else
          nl(
            l,
            n,
            u,
            c
          );
        break;
      case 13:
        nl(
          l,
          n,
          u,
          c
        );
        break;
      case 23:
        break;
      case 22:
        r = n.stateNode, y = n.alternate, n.memoizedState !== null ? r._visibility & 2 ? nl(
          l,
          n,
          u,
          c
        ) : Qe(l, n) : r._visibility & 2 ? nl(
          l,
          n,
          u,
          c
        ) : (r._visibility |= 2, ru(
          l,
          n,
          u,
          c,
          (n.subtreeFlags & 10256) !== 0
        )), s & 2048 && Oa(y, n);
        break;
      case 24:
        nl(
          l,
          n,
          u,
          c
        ), s & 2048 && cd(n.alternate, n);
        break;
      default:
        nl(
          l,
          n,
          u,
          c
        );
    }
  }
  function ru(l, n, u, c, s) {
    for (s = s && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null; ) {
      var r = l, y = n, m = u, g = c, R = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          ru(
            r,
            y,
            m,
            g,
            s
          ), Wf(8, y);
          break;
        case 23:
          break;
        case 22:
          var V = y.stateNode;
          y.memoizedState !== null ? V._visibility & 2 ? ru(
            r,
            y,
            m,
            g,
            s
          ) : Qe(
            r,
            y
          ) : (V._visibility |= 2, ru(
            r,
            y,
            m,
            g,
            s
          )), s && R & 2048 && Oa(
            y.alternate,
            y
          );
          break;
        case 24:
          ru(
            r,
            y,
            m,
            g,
            s
          ), s && R & 2048 && cd(y.alternate, y);
          break;
        default:
          ru(
            r,
            y,
            m,
            g,
            s
          );
      }
      n = n.sibling;
    }
  }
  function Qe(l, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var u = l, c = n, s = c.flags;
        switch (c.tag) {
          case 22:
            Qe(u, c), s & 2048 && Oa(
              c.alternate,
              c
            );
            break;
          case 24:
            Qe(u, c), s & 2048 && cd(c.alternate, c);
            break;
          default:
            Qe(u, c);
        }
        n = n.sibling;
      }
  }
  var ic = 8192;
  function Et(l) {
    if (l.subtreeFlags & ic)
      for (l = l.child; l !== null; )
        K0(l), l = l.sibling;
  }
  function K0(l) {
    switch (l.tag) {
      case 26:
        Et(l), l.flags & ic && l.memoizedState !== null && dp(
          Ul,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Et(l);
        break;
      case 3:
      case 4:
        var n = Ul;
        Ul = Ed(l.stateNode.containerInfo), Et(l), Ul = n;
        break;
      case 22:
        l.memoizedState === null && (n = l.alternate, n !== null && n.memoizedState !== null ? (n = ic, ic = 16777216, Et(l), ic = n) : Et(l));
        break;
      default:
        Et(l);
    }
  }
  function Yy(l) {
    var n = l.alternate;
    if (n !== null && (l = n.child, l !== null)) {
      n.child = null;
      do
        n = l.sibling, l.sibling = null, l = n;
      while (l !== null);
    }
  }
  function cc(l) {
    var n = l.deletions;
    if (l.flags & 16) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          jt = c, Vy(
            c,
            l
          );
        }
      Yy(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Gy(l), l = l.sibling;
  }
  function Gy(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        cc(l), l.flags & 2048 && li(9, l, l.return);
        break;
      case 3:
        cc(l);
        break;
      case 12:
        cc(l);
        break;
      case 22:
        var n = l.stateNode;
        l.memoizedState !== null && n._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (n._visibility &= -3, xl(l)) : cc(l);
        break;
      default:
        cc(l);
    }
  }
  function xl(l) {
    var n = l.deletions;
    if (l.flags & 16) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          jt = c, Vy(
            c,
            l
          );
        }
      Yy(l);
    }
    for (l = l.child; l !== null; ) {
      switch (n = l, n.tag) {
        case 0:
        case 11:
        case 15:
          li(8, n, n.return), xl(n);
          break;
        case 22:
          u = n.stateNode, u._visibility & 2 && (u._visibility &= -3, xl(n));
          break;
        default:
          xl(n);
      }
      l = l.sibling;
    }
  }
  function Vy(l, n) {
    for (; jt !== null; ) {
      var u = jt;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          li(8, u, n);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var c = u.memoizedState.cachePool.pool;
            c != null && c.refCount++;
          }
          break;
        case 24:
          yn(u.memoizedState.cache);
      }
      if (c = u.child, c !== null) c.return = u, jt = c;
      else
        e: for (u = l; jt !== null; ) {
          c = jt;
          var s = c.sibling, r = c.return;
          if (Cy(c), c === u) {
            jt = null;
            break e;
          }
          if (s !== null) {
            s.return = r, jt = s;
            break e;
          }
          jt = r;
        }
    }
  }
  var _y = {
    getCacheForType: function(l) {
      var n = Kt(_t), u = n.data.get(l);
      return u === void 0 && (u = l(), n.data.set(l, u)), u;
    }
  }, $0 = typeof WeakMap == "function" ? WeakMap : Map, Je = 0, at = null, Ue = null, xe = 0, $e = 0, Ll = null, Mn = !1, ho = !1, Xy = !1, du = 0, zt = 0, hu = 0, oc = 0, Un = 0, Ma = 0, yo = 0, mo = null, Jl = null, Qy = !1, jy = 0, od = 1 / 0, po = null, ni = null, ul = 0, xn = null, vo = null, il = 0, fd = 0, sd = null, wy = null, go = 0, Zy = null;
  function ia() {
    if (Je & 2 && xe !== 0)
      return xe & -xe;
    if (E.T !== null) {
      var l = Ea;
      return l !== 0 ? l : dc();
    }
    return o0();
  }
  function Ly() {
    Ma === 0 && (Ma = !(xe & 536870912) || _e ? xu() : 536870912);
    var l = ua.current;
    return l !== null && (l.flags |= 32), Ma;
  }
  function ca(l, n, u) {
    (l === at && ($e === 2 || $e === 9) || l.cancelPendingCommit !== null) && (Hn(l, 0), yu(
      l,
      xe,
      Ma,
      !1
    )), zi(l, u), (!(Je & 2) || l !== at) && (l === at && (!(Je & 2) && (oc |= u), zt === 4 && yu(
      l,
      xe,
      Ma,
      !1
    )), Kl(l));
  }
  function bo(l, n, u) {
    if (Je & 6) throw Error(U(327));
    var c = !u && (n & 124) === 0 && (n & l.expiredLanes) === 0 || ln(l, n), s = c ? Ky(l, n) : rd(l, n, !0), r = c;
    do {
      if (s === 0) {
        ho && !c && yu(l, n, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, r && !k0(u)) {
          s = rd(l, n, !1), r = !1;
          continue;
        }
        if (s === 2) {
          if (r = n, l.errorRecoveryDisabledLanes & r)
            var y = 0;
          else
            y = l.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            n = y;
            e: {
              var m = l;
              s = mo;
              var g = m.current.memoizedState.isDehydrated;
              if (g && (Hn(m, y).flags |= 256), y = rd(
                m,
                y,
                !1
              ), y !== 2) {
                if (Xy && !g) {
                  m.errorRecoveryDisabledLanes |= r, oc |= r, s = 4;
                  break e;
                }
                r = Jl, Jl = s, r !== null && (Jl === null ? Jl = r : Jl.push.apply(
                  Jl,
                  r
                ));
              }
              s = y;
            }
            if (r = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Hn(l, 0), yu(l, n, 0, !0);
          break;
        }
        e: {
          switch (c = l, r = s, r) {
            case 0:
            case 1:
              throw Error(U(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              yu(
                c,
                n,
                Ma,
                !Mn
              );
              break e;
            case 2:
              Jl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(U(329));
          }
          if ((n & 62914560) === n && (s = jy + 300 - Il(), 10 < s)) {
            if (yu(
              c,
              n,
              Ma,
              !Mn
            ), Uu(c, 0, !0) !== 0) break e;
            c.timeoutHandle = Td(
              If.bind(
                null,
                c,
                u,
                Jl,
                po,
                Qy,
                n,
                Ma,
                oc,
                yo,
                Mn,
                r,
                2,
                -0,
                0
              ),
              s
            );
            break e;
          }
          If(
            c,
            u,
            Jl,
            po,
            Qy,
            n,
            Ma,
            oc,
            yo,
            Mn,
            r,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Kl(l);
  }
  function If(l, n, u, c, s, r, y, m, g, R, V, X, M, H) {
    if (l.timeoutHandle = -1, X = n.subtreeFlags, (X & 8192 || (X & 16785408) === 16785408) && (Ho = { stylesheets: null, count: 0, unsuspend: rp }, K0(n), X = fm(), X !== null)) {
      l.cancelPendingCommit = X(
        I0.bind(
          null,
          l,
          n,
          r,
          u,
          c,
          s,
          y,
          m,
          g,
          V,
          1,
          M,
          H
        )
      ), yu(l, r, y, !R);
      return;
    }
    I0(
      l,
      n,
      r,
      u,
      c,
      s,
      y,
      m,
      g
    );
  }
  function k0(l) {
    for (var n = l; ; ) {
      var u = n.tag;
      if ((u === 0 || u === 11 || u === 15) && n.flags & 16384 && (u = n.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var c = 0; c < u.length; c++) {
          var s = u[c], r = s.getSnapshot;
          s = s.value;
          try {
            if (!ll(r(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = n.child, n.subtreeFlags & 16384 && u !== null)
        u.return = n, n = u;
      else {
        if (n === l) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === l) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function yu(l, n, u, c) {
    n &= ~Un, n &= ~oc, l.suspendedLanes |= n, l.pingedLanes &= ~n, c && (l.warmLanes |= n), c = l.expirationTimes;
    for (var s = n; 0 < s; ) {
      var r = 31 - Yl(s), y = 1 << r;
      c[r] = -1, s &= ~y;
    }
    u !== 0 && Po(l, u, n);
  }
  function fc() {
    return Je & 6 ? !0 : (ls(0), !1);
  }
  function ui() {
    if (Ue !== null) {
      if ($e === 0)
        var l = Ue.return;
      else
        l = Ue, La = nu = null, Rr(l), Pi = null, uo = 0, l = Ue;
      for (; l !== null; )
        Oy(l.alternate, l), l = l.return;
      Ue = null;
    }
  }
  function Hn(l, n) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, Ev(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), ui(), at = l, Ue = u = wa(l.current, null), xe = n, $e = 0, Ll = null, Mn = !1, ho = ln(l, n), Xy = !1, yo = Ma = Un = oc = hu = zt = 0, Jl = mo = null, Qy = !1, n & 8 && (n |= n & 32);
    var c = l.entangledLanes;
    if (c !== 0)
      for (l = l.entanglements, c &= n; 0 < c; ) {
        var s = 31 - Yl(c), r = 1 << s;
        n |= l[s], c &= ~r;
      }
    return du = n, ja(), u;
  }
  function Jy(l, n) {
    ve = null, E.H = Qr, n === ku || n === Mf ? (n = Wh(), $e = 3) : n === vr ? (n = Wh(), $e = 4) : $e = n === Tt ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Ll = n, Ue === null && (zt = 1, Jf(
      l,
      la(n, l.current)
    ));
  }
  function W0() {
    var l = E.H;
    return E.H = Qr, l === null ? Qr : l;
  }
  function sc() {
    var l = E.A;
    return E.A = _y, l;
  }
  function rc() {
    zt = 4, Mn || (xe & 4194048) !== xe && ua.current !== null || (ho = !0), !(hu & 134217727) && !(oc & 134217727) || at === null || yu(
      at,
      xe,
      Ma,
      !1
    );
  }
  function rd(l, n, u) {
    var c = Je;
    Je |= 2;
    var s = W0(), r = sc();
    (at !== l || xe !== n) && (po = null, Hn(l, n)), n = !1;
    var y = zt;
    e: do
      try {
        if ($e !== 0 && Ue !== null) {
          var m = Ue, g = Ll;
          switch ($e) {
            case 8:
              ui(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ua.current === null && (n = !0);
              var R = $e;
              if ($e = 0, Ll = null, So(l, m, g, R), u && ho) {
                y = 0;
                break e;
              }
              break;
            default:
              R = $e, $e = 0, Ll = null, So(l, m, g, R);
          }
        }
        dd(), y = zt;
        break;
      } catch (V) {
        Jy(l, V);
      }
    while (!0);
    return n && l.shellSuspendCounter++, La = nu = null, Je = c, E.H = s, E.A = r, Ue === null && (at = null, xe = 0, ja()), y;
  }
  function dd() {
    for (; Ue !== null; ) ky(Ue);
  }
  function Ky(l, n) {
    var u = Je;
    Je |= 2;
    var c = W0(), s = sc();
    at !== l || xe !== n ? (po = null, od = Il() + 500, Hn(l, n)) : ho = ln(
      l,
      n
    );
    e: do
      try {
        if ($e !== 0 && Ue !== null) {
          n = Ue;
          var r = Ll;
          t: switch ($e) {
            case 1:
              $e = 0, Ll = null, So(l, n, r, 1);
              break;
            case 2:
            case 9:
              if (br(r)) {
                $e = 0, Ll = null, Wy(n);
                break;
              }
              n = function() {
                $e !== 2 && $e !== 9 || at !== l || ($e = 7), Kl(l);
              }, r.then(n, n);
              break e;
            case 3:
              $e = 7;
              break e;
            case 4:
              $e = 5;
              break e;
            case 7:
              br(r) ? ($e = 0, Ll = null, Wy(n)) : ($e = 0, Ll = null, So(l, n, r, 7));
              break;
            case 5:
              var y = null;
              switch (Ue.tag) {
                case 26:
                  y = Ue.memoizedState;
                case 5:
                case 27:
                  var m = Ue;
                  if (!y || om(y)) {
                    $e = 0, Ll = null;
                    var g = m.sibling;
                    if (g !== null) Ue = g;
                    else {
                      var R = m.return;
                      R !== null ? (Ue = R, Pf(R)) : Ue = null;
                    }
                    break t;
                  }
              }
              $e = 0, Ll = null, So(l, n, r, 5);
              break;
            case 6:
              $e = 0, Ll = null, So(l, n, r, 6);
              break;
            case 8:
              ui(), zt = 6;
              break e;
            default:
              throw Error(U(462));
          }
        }
        $y();
        break;
      } catch (V) {
        Jy(l, V);
      }
    while (!0);
    return La = nu = null, E.H = c, E.A = s, Je = u, Ue !== null ? 0 : (at = null, xe = 0, ja(), zt);
  }
  function $y() {
    for (; Ue !== null && !uv(); )
      ky(Ue);
  }
  function ky(l) {
    var n = L0(l.alternate, l, du);
    l.memoizedProps = l.pendingProps, n === null ? Pf(l) : Ue = n;
  }
  function Wy(l) {
    var n = l, u = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Ay(
          u,
          n,
          n.pendingProps,
          n.type,
          void 0,
          xe
        );
        break;
      case 11:
        n = Ay(
          u,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          xe
        );
        break;
      case 5:
        Rr(n);
      default:
        Oy(u, n), n = Ue = De(n, du), n = L0(u, n, du);
    }
    l.memoizedProps = l.pendingProps, n === null ? Pf(l) : Ue = n;
  }
  function So(l, n, u, c) {
    La = nu = null, Rr(n), Pi = null, uo = 0;
    var s = n.return;
    try {
      if (j0(
        l,
        s,
        n,
        u,
        xe
      )) {
        zt = 1, Jf(
          l,
          la(u, l.current)
        ), Ue = null;
        return;
      }
    } catch (r) {
      if (s !== null) throw Ue = s, r;
      zt = 1, Jf(
        l,
        la(u, l.current)
      ), Ue = null;
      return;
    }
    n.flags & 32768 ? (_e || c === 1 ? l = !0 : ho || xe & 536870912 ? l = !1 : (Mn = l = !0, (c === 2 || c === 9 || c === 3 || c === 6) && (c = ua.current, c !== null && c.tag === 13 && (c.flags |= 16384))), F0(n, l)) : Pf(n);
  }
  function Pf(l) {
    var n = l;
    do {
      if (n.flags & 32768) {
        F0(
          n,
          Mn
        );
        return;
      }
      l = n.return;
      var u = Ry(
        n.alternate,
        n,
        du
      );
      if (u !== null) {
        Ue = u;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ue = n;
        return;
      }
      Ue = n = l;
    } while (n !== null);
    zt === 0 && (zt = 5);
  }
  function F0(l, n) {
    do {
      var u = vv(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, Ue = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !n && (l = l.sibling, l !== null)) {
        Ue = l;
        return;
      }
      Ue = l = u;
    } while (l !== null);
    zt = 6, Ue = null;
  }
  function I0(l, n, u, c, s, r, y, m, g) {
    l.cancelPendingCommit = null;
    do
      yd();
    while (ul !== 0);
    if (Je & 6) throw Error(U(327));
    if (n !== null) {
      if (n === l.current) throw Error(U(177));
      if (r = n.lanes | n.childLanes, r |= sn, c0(
        l,
        u,
        r,
        y,
        m,
        g
      ), l === at && (Ue = at = null, xe = 0), vo = n, xn = l, il = u, fd = r, sd = s, wy = c, n.subtreeFlags & 10256 || n.flags & 10256 ? (l.callbackNode = null, l.callbackPriority = 0, Sv(Io, function() {
        return Fy(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), c = (n.flags & 13878) !== 0, n.subtreeFlags & 13878 || c) {
        c = E.T, E.T = null, s = Q.p, Q.p = 2, y = Je, Je |= 4;
        try {
          xy(l, n, u);
        } finally {
          Je = y, Q.p = s, E.T = c;
        }
      }
      ul = 1, P0(), es(), hd();
    }
  }
  function P0() {
    if (ul === 1) {
      ul = 0;
      var l = xn, n = vo, u = (n.flags & 13878) !== 0;
      if (n.subtreeFlags & 13878 || u) {
        u = E.T, E.T = null;
        var c = Q.p;
        Q.p = 2;
        var s = Je;
        Je |= 4;
        try {
          Ff(n, l);
          var r = ss, y = _h(l.containerInfo), m = r.focusedElem, g = r.selectionRange;
          if (y !== m && m && m.ownerDocument && vf(
            m.ownerDocument.documentElement,
            m
          )) {
            if (g !== null && gf(m)) {
              var R = g.start, V = g.end;
              if (V === void 0 && (V = R), "selectionStart" in m)
                m.selectionStart = R, m.selectionEnd = Math.min(
                  V,
                  m.value.length
                );
              else {
                var X = m.ownerDocument || document, M = X && X.defaultView || window;
                if (M.getSelection) {
                  var H = M.getSelection(), P = m.textContent.length, ee = Math.min(g.start, P), je = g.end === void 0 ? ee : Math.min(g.end, P);
                  !H.extend && ee > je && (y = je, je = ee, ee = y);
                  var z = it(
                    m,
                    ee
                  ), A = it(
                    m,
                    je
                  );
                  if (z && A && (H.rangeCount !== 1 || H.anchorNode !== z.node || H.anchorOffset !== z.offset || H.focusNode !== A.node || H.focusOffset !== A.offset)) {
                    var D = X.createRange();
                    D.setStart(z.node, z.offset), H.removeAllRanges(), ee > je ? (H.addRange(D), H.extend(A.node, A.offset)) : (D.setEnd(A.node, A.offset), H.addRange(D));
                  }
                }
              }
            }
            for (X = [], H = m; H = H.parentNode; )
              H.nodeType === 1 && X.push({
                element: H,
                left: H.scrollLeft,
                top: H.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < X.length; m++) {
              var _ = X[m];
              _.element.scrollLeft = _.left, _.element.scrollTop = _.top;
            }
          }
          ms = !!fs, ss = fs = null;
        } finally {
          Je = s, Q.p = c, E.T = u;
        }
      }
      l.current = n, ul = 2;
    }
  }
  function es() {
    if (ul === 2) {
      ul = 0;
      var l = xn, n = vo, u = (n.flags & 8772) !== 0;
      if (n.subtreeFlags & 8772 || u) {
        u = E.T, E.T = null;
        var c = Q.p;
        Q.p = 2;
        var s = Je;
        Je |= 4;
        try {
          Hy(l, n.alternate, n);
        } finally {
          Je = s, Q.p = c, E.T = u;
        }
      }
      ul = 3;
    }
  }
  function hd() {
    if (ul === 4 || ul === 3) {
      ul = 0, Ai();
      var l = xn, n = vo, u = il, c = wy;
      n.subtreeFlags & 10256 || n.flags & 10256 ? ul = 5 : (ul = 0, vo = xn = null, ep(l, l.pendingLanes));
      var s = l.pendingLanes;
      if (s === 0 && (ni = null), js(u), n = n.stateNode, zl && typeof zl.onCommitFiberRoot == "function")
        try {
          zl.onCommitFiberRoot(
            Cc,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (c !== null) {
        n = E.T, s = Q.p, Q.p = 2, E.T = null;
        try {
          for (var r = l.onRecoverableError, y = 0; y < c.length; y++) {
            var m = c[y];
            r(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          E.T = n, Q.p = s;
        }
      }
      il & 3 && yd(), Kl(l), s = l.pendingLanes, u & 4194090 && s & 42 ? l === Zy ? go++ : (go = 0, Zy = l) : go = 0, ls(0);
    }
  }
  function ep(l, n) {
    (l.pooledCacheLanes &= n) === 0 && (n = l.pooledCache, n != null && (l.pooledCache = null, yn(n)));
  }
  function yd(l) {
    return P0(), es(), hd(), Fy();
  }
  function Fy() {
    if (ul !== 5) return !1;
    var l = xn, n = fd;
    fd = 0;
    var u = js(il), c = E.T, s = Q.p;
    try {
      Q.p = 32 > u ? 32 : u, E.T = null, u = sd, sd = null;
      var r = xn, y = il;
      if (ul = 0, vo = xn = null, il = 0, Je & 6) throw Error(U(331));
      var m = Je;
      if (Je |= 4, Gy(r.current), qy(
        r,
        r.current,
        y,
        u
      ), Je = m, ls(0, !1), zl && typeof zl.onPostCommitFiberRoot == "function")
        try {
          zl.onPostCommitFiberRoot(Cc, r);
        } catch {
        }
      return !0;
    } finally {
      Q.p = s, E.T = c, ep(l, n);
    }
  }
  function Iy(l, n, u) {
    n = la(u, n), n = Sy(l.stateNode, n, 2), l = vn(l, n, 2), l !== null && (zi(l, 2), Kl(l));
  }
  function Fe(l, n, u) {
    if (l.tag === 3)
      Iy(l, l, u);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Iy(
            n,
            l,
            u
          );
          break;
        } else if (n.tag === 1) {
          var c = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (ni === null || !ni.has(c))) {
            l = la(u, l), u = Ty(2), c = vn(n, u, 2), c !== null && (Zl(
              u,
              c,
              n,
              l
            ), zi(c, 2), Kl(c));
            break;
          }
        }
        n = n.return;
      }
  }
  function md(l, n, u) {
    var c = l.pingCache;
    if (c === null) {
      c = l.pingCache = new $0();
      var s = /* @__PURE__ */ new Set();
      c.set(n, s);
    } else
      s = c.get(n), s === void 0 && (s = /* @__PURE__ */ new Set(), c.set(n, s));
    s.has(u) || (Xy = !0, s.add(u), l = Py.bind(null, l, n, u), n.then(l, l));
  }
  function Py(l, n, u) {
    var c = l.pingCache;
    c !== null && c.delete(n), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, at === l && (xe & u) === u && (zt === 4 || zt === 3 && (xe & 62914560) === xe && 300 > Il() - jy ? !(Je & 2) && Hn(l, 0) : Un |= u, yo === xe && (yo = 0)), Kl(l);
  }
  function em(l, n) {
    n === 0 && (n = Ei()), l = rn(l, n), l !== null && (zi(l, n), Kl(l));
  }
  function gv(l) {
    var n = l.memoizedState, u = 0;
    n !== null && (u = n.retryLane), em(l, u);
  }
  function bv(l, n) {
    var u = 0;
    switch (l.tag) {
      case 13:
        var c = l.stateNode, s = l.memoizedState;
        s !== null && (u = s.retryLane);
        break;
      case 19:
        c = l.stateNode;
        break;
      case 22:
        c = l.stateNode._retryCache;
        break;
      default:
        throw Error(U(314));
    }
    c !== null && c.delete(n), em(l, u);
  }
  function Sv(l, n) {
    return Ti(l, n);
  }
  var pd = null, ii = null, ts = !1, To = !1, vd = !1, ci = 0;
  function Kl(l) {
    l !== ii && l.next === null && (ii === null ? pd = ii = l : ii = ii.next = l), To = !0, ts || (ts = !0, ap());
  }
  function ls(l, n) {
    if (!vd && To) {
      vd = !0;
      do
        for (var u = !1, c = pd; c !== null; ) {
          if (l !== 0) {
            var s = c.pendingLanes;
            if (s === 0) var r = 0;
            else {
              var y = c.suspendedLanes, m = c.pingedLanes;
              r = (1 << 31 - Yl(42 | l) + 1) - 1, r &= s & ~(y & ~m), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (u = !0, ns(c, r));
          } else
            r = xe, r = Uu(
              c,
              c === at ? r : 0,
              c.cancelPendingCommit !== null || c.timeoutHandle !== -1
            ), !(r & 3) || ln(c, r) || (u = !0, ns(c, r));
          c = c.next;
        }
      while (u);
      vd = !1;
    }
  }
  function tp() {
    as();
  }
  function as() {
    To = ts = !1;
    var l = 0;
    ci !== 0 && (vu() && (l = ci), ci = 0);
    for (var n = Il(), u = null, c = pd; c !== null; ) {
      var s = c.next, r = tm(c, n);
      r === 0 ? (c.next = null, u === null ? pd = s : u.next = s, s === null && (ii = u)) : (u = c, (l !== 0 || r & 3) && (To = !0)), c = s;
    }
    ls(l);
  }
  function tm(l, n) {
    for (var u = l.suspendedLanes, c = l.pingedLanes, s = l.expirationTimes, r = l.pendingLanes & -62914561; 0 < r; ) {
      var y = 31 - Yl(r), m = 1 << y, g = s[y];
      g === -1 ? (!(m & u) || m & c) && (s[y] = Lt(m, n)) : g <= n && (l.expiredLanes |= m), r &= ~m;
    }
    if (n = at, u = xe, u = Uu(
      l,
      l === n ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c = l.callbackNode, u === 0 || l === n && ($e === 2 || $e === 9) || l.cancelPendingCommit !== null)
      return c !== null && c !== null && sh(c), l.callbackNode = null, l.callbackPriority = 0;
    if (!(u & 3) || ln(l, u)) {
      if (n = u & -u, n === l.callbackPriority) return n;
      switch (c !== null && sh(c), js(u)) {
        case 2:
        case 8:
          u = rh;
          break;
        case 32:
          u = Io;
          break;
        case 268435456:
          u = Hc;
          break;
        default:
          u = Io;
      }
      return c = lp.bind(null, l), u = Ti(u, c), l.callbackPriority = n, l.callbackNode = u, n;
    }
    return c !== null && c !== null && sh(c), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function lp(l, n) {
    if (ul !== 0 && ul !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (yd() && l.callbackNode !== u)
      return null;
    var c = xe;
    return c = Uu(
      l,
      l === at ? c : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c === 0 ? null : (bo(l, c, n), tm(l, Il()), l.callbackNode != null && l.callbackNode === u ? lp.bind(null, l) : null);
  }
  function ns(l, n) {
    if (yd()) return null;
    bo(l, n, !0);
  }
  function ap() {
    zv(function() {
      Je & 6 ? Ti(
        n0,
        tp
      ) : as();
    });
  }
  function dc() {
    return ci === 0 && (ci = xu()), ci;
  }
  function gd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : ff("" + l);
  }
  function us(l, n) {
    var u = n.ownerDocument.createElement("input");
    return u.name = n.name, u.value = n.value, l.id && u.setAttribute("form", l.id), n.parentNode.insertBefore(u, n), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function np(l, n, u, c, s) {
    if (n === "submit" && u && u.stateNode === s) {
      var r = gd(
        (s[Dl] || null).action
      ), y = c.submitter;
      y && (n = (n = y[Dl] || null) ? gd(n.formAction) : y.getAttribute("formAction"), n !== null && (r = n, y = null));
      var m = new er(
        "action",
        "action",
        null,
        c,
        s
      );
      l.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (c.defaultPrevented) {
                if (ci !== 0) {
                  var g = y ? us(s, y) : new FormData(s);
                  Xr(
                    u,
                    {
                      pending: !0,
                      data: g,
                      method: s.method,
                      action: r
                    },
                    null,
                    g
                  );
                }
              } else
                typeof r == "function" && (m.preventDefault(), g = y ? us(s, y) : new FormData(s), Xr(
                  u,
                  {
                    pending: !0,
                    data: g,
                    method: s.method,
                    action: r
                  },
                  r,
                  g
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var Dt = 0; Dt < jc.length; Dt++) {
    var is = jc[Dt], Tv = is.toLowerCase(), Ee = is[0].toUpperCase() + is.slice(1);
    ga(
      Tv,
      "on" + Ee
    );
  }
  ga(O0, "onAnimationEnd"), ga(Xh, "onAnimationIteration"), ga(M0, "onAnimationStart"), ga("dblclick", "onDoubleClick"), ga("focusin", "onFocus"), ga("focusout", "onBlur"), ga(Qh, "onTransitionRun"), ga(fr, "onTransitionStart"), ga(U0, "onTransitionCancel"), ga(jh, "onTransitionEnd"), Nu("onMouseEnter", ["mouseout", "mouseover"]), Nu("onMouseLeave", ["mouseout", "mouseover"]), Nu("onPointerEnter", ["pointerout", "pointerover"]), Nu("onPointerLeave", ["pointerout", "pointerover"]), Cu(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Cu(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Cu("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Cu(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Cu(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Cu(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var cs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), oi = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(cs)
  );
  function hc(l, n) {
    n = (n & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var c = l[u], s = c.event;
      c = c.listeners;
      e: {
        var r = void 0;
        if (n)
          for (var y = c.length - 1; 0 <= y; y--) {
            var m = c[y], g = m.instance, R = m.currentTarget;
            if (m = m.listener, g !== r && s.isPropagationStopped())
              break e;
            r = m, s.currentTarget = R;
            try {
              r(s);
            } catch (V) {
              Zf(V);
            }
            s.currentTarget = null, r = g;
          }
        else
          for (y = 0; y < c.length; y++) {
            if (m = c[y], g = m.instance, R = m.currentTarget, m = m.listener, g !== r && s.isPropagationStopped())
              break e;
            r = m, s.currentTarget = R;
            try {
              r(s);
            } catch (V) {
              Zf(V);
            }
            s.currentTarget = null, r = g;
          }
      }
    }
  }
  function ge(l, n) {
    var u = n[ws];
    u === void 0 && (u = n[ws] = /* @__PURE__ */ new Set());
    var c = l + "__bubble";
    u.has(c) || (bd(n, l, 2, !1), u.add(c));
  }
  function Ao(l, n, u) {
    var c = 0;
    n && (c |= 4), bd(
      u,
      l,
      c,
      n
    );
  }
  var Eo = "_reactListening" + Math.random().toString(36).slice(2);
  function lm(l) {
    if (!l[Eo]) {
      l[Eo] = !0, af.forEach(function(u) {
        u !== "selectionchange" && (oi.has(u) || Ao(u, !1, l), Ao(u, !0, l));
      });
      var n = l.nodeType === 9 ? l : l.ownerDocument;
      n === null || n[Eo] || (n[Eo] = !0, Ao("selectionchange", !1, n));
    }
  }
  function bd(l, n, u, c) {
    switch (vm(n)) {
      case 2:
        var s = hp;
        break;
      case 8:
        s = yp;
        break;
      default:
        s = mm;
    }
    u = s.bind(
      null,
      n,
      u,
      l
    ), s = void 0, !Fs || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (s = !0), c ? s !== void 0 ? l.addEventListener(n, u, {
      capture: !0,
      passive: s
    }) : l.addEventListener(n, u, !0) : s !== void 0 ? l.addEventListener(n, u, {
      passive: s
    }) : l.addEventListener(n, u, !1);
  }
  function Ua(l, n, u, c, s) {
    var r = c;
    if (!(n & 1) && !(n & 2) && c !== null)
      e: for (; ; ) {
        if (c === null) return;
        var y = c.tag;
        if (y === 3 || y === 4) {
          var m = c.stateNode.containerInfo;
          if (m === s) break;
          if (y === 4)
            for (y = c.return; y !== null; ) {
              var g = y.tag;
              if ((g === 3 || g === 4) && y.stateNode.containerInfo === s)
                return;
              y = y.return;
            }
          for (; m !== null; ) {
            if (y = el(m), y === null) return;
            if (g = y.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              c = r = y;
              continue e;
            }
            m = m.parentNode;
          }
        }
        c = c.return;
      }
    _c(function() {
      var R = r, V = Ws(u), X = [];
      e: {
        var M = wh.get(l);
        if (M !== void 0) {
          var H = er, P = l;
          switch (l) {
            case "keypress":
              if (tl(u) === 0) break e;
            case "keydown":
            case "keyup":
              H = Ga;
              break;
            case "focusin":
              P = "focus", H = zh;
              break;
            case "focusout":
              P = "blur", H = zh;
              break;
            case "beforeblur":
            case "afterblur":
              H = zh;
              break;
            case "click":
              if (u.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              H = Eh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = g0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = Oh;
              break;
            case O0:
            case Xh:
            case M0:
              H = hv;
              break;
            case jh:
              H = E0;
              break;
            case "scroll":
            case "scrollend":
              H = p0;
              break;
            case "wheel":
              H = Yi;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = df;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = hf;
              break;
            case "toggle":
            case "beforetoggle":
              H = z0;
          }
          var ee = (n & 4) !== 0, je = !ee && (l === "scroll" || l === "scrollend"), z = ee ? M !== null ? M + "Capture" : null : M;
          ee = [];
          for (var A = R, D; A !== null; ) {
            var _ = A;
            if (D = _.stateNode, _ = _.tag, _ !== 5 && _ !== 26 && _ !== 27 || D === null || z === null || (_ = Ci(A, z), _ != null && ee.push(
              mu(A, _, D)
            )), je) break;
            A = A.return;
          }
          0 < ee.length && (M = new H(
            M,
            P,
            null,
            u,
            V
          ), X.push({ event: M, listeners: ee }));
        }
      }
      if (!(n & 7)) {
        e: {
          if (M = l === "mouseover" || l === "pointerover", H = l === "mouseout" || l === "pointerout", M && u !== Hi && (P = u.relatedTarget || u.fromElement) && (el(P) || P[Bc]))
            break e;
          if ((H || M) && (M = V.window === V ? V : (M = V.ownerDocument) ? M.defaultView || M.parentWindow : window, H ? (P = u.relatedTarget || u.toElement, H = R, P = P ? el(P) : null, P !== null && (je = ke(P), ee = P.tag, P !== je || ee !== 5 && ee !== 27 && ee !== 6) && (P = null)) : (H = null, P = R), H !== P)) {
            if (ee = Eh, _ = "onMouseLeave", z = "onMouseEnter", A = "mouse", (l === "pointerout" || l === "pointerover") && (ee = hf, _ = "onPointerLeave", z = "onPointerEnter", A = "pointer"), je = H == null ? M : lf(H), D = P == null ? M : lf(P), M = new ee(
              _,
              A + "leave",
              H,
              u,
              V
            ), M.target = je, M.relatedTarget = D, _ = null, el(V) === R && (ee = new ee(
              z,
              A + "enter",
              P,
              u,
              V
            ), ee.target = D, ee.relatedTarget = je, _ = ee), je = _, H && P)
              t: {
                for (ee = H, z = P, A = 0, D = ee; D; D = fi(D))
                  A++;
                for (D = 0, _ = z; _; _ = fi(_))
                  D++;
                for (; 0 < A - D; )
                  ee = fi(ee), A--;
                for (; 0 < D - A; )
                  z = fi(z), D--;
                for (; A--; ) {
                  if (ee === z || z !== null && ee === z.alternate)
                    break t;
                  ee = fi(ee), z = fi(z);
                }
                ee = null;
              }
            else ee = null;
            H !== null && os(
              X,
              M,
              H,
              ee,
              !1
            ), P !== null && je !== null && os(
              X,
              je,
              P,
              ee,
              !0
            );
          }
        }
        e: {
          if (M = R ? lf(R) : window, H = M.nodeName && M.nodeName.toLowerCase(), H === "select" || H === "input" && M.type === "file")
            var $ = Nh;
          else if (ur(M))
            if (Bh)
              $ = Gh;
            else {
              $ = _u;
              var Re = cr;
            }
          else
            H = M.nodeName, !H || H.toLowerCase() !== "input" || M.type !== "checkbox" && M.type !== "radio" ? R && xi(R.elementType) && ($ = Nh) : $ = eu;
          if ($ && ($ = $(l, R))) {
            ir(
              X,
              $,
              u,
              V
            );
            break e;
          }
          Re && Re(l, M, R), l === "focusout" && R && M.type === "number" && R.memoizedProps.value != null && cf(M, "number", M.value);
        }
        switch (Re = R ? lf(R) : window, l) {
          case "focusin":
            (ur(Re) || Re.contentEditable === "true") && (on = Re, Xa = R, ju = null);
            break;
          case "focusout":
            ju = Xa = on = null;
            break;
          case "mousedown":
            Qi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Qi = !1, or(X, u, V);
            break;
          case "selectionchange":
            if (Xi) break;
          case "keydown":
          case "keyup":
            or(X, u, V);
        }
        var I;
        if (yf)
          e: {
            switch (l) {
              case "compositionstart":
                var ie = "onCompositionStart";
                break e;
              case "compositionend":
                ie = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ie = "onCompositionUpdate";
                break e;
            }
            ie = void 0;
          }
        else
          Vu ? pf(l, u) && (ie = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (ie = "onCompositionStart");
        ie && (un && u.locale !== "ko" && (Vu || ie !== "onCompositionStart" ? ie === "onCompositionEnd" && Vu && (I = Th()) : (In = V, Xc = "value" in In ? In.value : In.textContent, Vu = !0)), Re = zo(R, ie), 0 < Re.length && (ie = new Dh(
          ie,
          l,
          null,
          u,
          V
        ), X.push({ event: ie, listeners: Re }), I ? ie.data = I : (I = Gu(u), I !== null && (ie.data = I)))), (I = Uh ? Hh(l, u) : Gi(l, u)) && (ie = zo(R, "onBeforeInput"), 0 < ie.length && (Re = new Dh(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          V
        ), X.push({
          event: Re,
          listeners: ie
        }), Re.data = I)), np(
          X,
          l,
          R,
          u,
          V
        );
      }
      hc(X, n);
    });
  }
  function mu(l, n, u) {
    return {
      instance: l,
      listener: n,
      currentTarget: u
    };
  }
  function zo(l, n) {
    for (var u = n + "Capture", c = []; l !== null; ) {
      var s = l, r = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || r === null || (s = Ci(l, u), s != null && c.unshift(
        mu(l, s, r)
      ), s = Ci(l, n), s != null && c.push(
        mu(l, s, r)
      )), l.tag === 3) return c;
      l = l.return;
    }
    return [];
  }
  function fi(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function os(l, n, u, c, s) {
    for (var r = n._reactName, y = []; u !== null && u !== c; ) {
      var m = u, g = m.alternate, R = m.stateNode;
      if (m = m.tag, g !== null && g === c) break;
      m !== 5 && m !== 26 && m !== 27 || R === null || (g = R, s ? (R = Ci(u, r), R != null && y.unshift(
        mu(u, R, g)
      )) : s || (R = Ci(u, r), R != null && y.push(
        mu(u, R, g)
      ))), u = u.return;
    }
    y.length !== 0 && l.push({ event: n, listeners: y });
  }
  var oa = /\r\n?/g, am = /\u0000|\uFFFD/g;
  function up(l) {
    return (typeof l == "string" ? l : "" + l).replace(oa, `
`).replace(am, "");
  }
  function nm(l, n) {
    return n = up(n), up(l) === n;
  }
  function Sd() {
  }
  function he(l, n, u, c, s, r) {
    switch (u) {
      case "children":
        typeof c == "string" ? n === "body" || n === "textarea" && c === "" || Yc(l, c) : (typeof c == "number" || typeof c == "bigint") && n !== "body" && Yc(l, "" + c);
        break;
      case "className":
        nf(l, "class", c);
        break;
      case "tabIndex":
        nf(l, "tabindex", c);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        nf(l, u, c);
        break;
      case "style":
        of(l, c, r);
        break;
      case "data":
        if (n !== "object") {
          nf(l, "data", c);
          break;
        }
      case "src":
      case "href":
        if (c === "" && (n !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (c == null || typeof c == "function" || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = ff("" + c), l.setAttribute(u, c);
        break;
      case "action":
      case "formAction":
        if (typeof c == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" && (u === "formAction" ? (n !== "input" && he(l, n, "name", s.name, s, null), he(
            l,
            n,
            "formEncType",
            s.formEncType,
            s,
            null
          ), he(
            l,
            n,
            "formMethod",
            s.formMethod,
            s,
            null
          ), he(
            l,
            n,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (he(l, n, "encType", s.encType, s, null), he(l, n, "method", s.method, s, null), he(l, n, "target", s.target, s, null)));
        if (c == null || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = ff("" + c), l.setAttribute(u, c);
        break;
      case "onClick":
        c != null && (l.onclick = Sd);
        break;
      case "onScroll":
        c != null && ge("scroll", l);
        break;
      case "onScrollEnd":
        c != null && ge("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(U(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(U(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "muted":
        l.muted = c && typeof c != "function" && typeof c != "symbol";
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
        if (c == null || typeof c == "function" || typeof c == "boolean" || typeof c == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = ff("" + c), l.setAttributeNS(
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
        c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "" + c) : l.removeAttribute(u);
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
        c && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        c === !0 ? l.setAttribute(u, "") : c !== !1 && c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        c != null && typeof c != "function" && typeof c != "symbol" && !isNaN(c) && 1 <= c ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        c == null || typeof c == "function" || typeof c == "symbol" || isNaN(c) ? l.removeAttribute(u) : l.setAttribute(u, c);
        break;
      case "popover":
        ge("beforetoggle", l), ge("toggle", l), Wn(l, "popover", c);
        break;
      case "xlinkActuate":
        an(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          c
        );
        break;
      case "xlinkArcrole":
        an(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          c
        );
        break;
      case "xlinkRole":
        an(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          c
        );
        break;
      case "xlinkShow":
        an(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          c
        );
        break;
      case "xlinkTitle":
        an(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          c
        );
        break;
      case "xlinkType":
        an(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          c
        );
        break;
      case "xmlBase":
        an(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          c
        );
        break;
      case "xmlLang":
        an(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          c
        );
        break;
      case "xmlSpace":
        an(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          c
        );
        break;
      case "is":
        Wn(l, "is", c);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = sv.get(u) || u, Wn(l, u, c));
    }
  }
  function C(l, n, u, c, s, r) {
    switch (u) {
      case "style":
        of(l, c, r);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(U(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(U(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof c == "string" ? Yc(l, c) : (typeof c == "number" || typeof c == "bigint") && Yc(l, "" + c);
        break;
      case "onScroll":
        c != null && ge("scroll", l);
        break;
      case "onScrollEnd":
        c != null && ge("scrollend", l);
        break;
      case "onClick":
        c != null && (l.onclick = Sd);
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
        if (!ea.hasOwnProperty(u))
          e: {
            if (u[0] === "o" && u[1] === "n" && (s = u.endsWith("Capture"), n = u.slice(2, s ? u.length - 7 : void 0), r = l[Dl] || null, r = r != null ? r[u] : null, typeof r == "function" && l.removeEventListener(n, r, s), typeof c == "function")) {
              typeof r != "function" && r !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(n, c, s);
              break e;
            }
            u in l ? l[u] = c : c === !0 ? l.setAttribute(u, "") : Wn(l, u, c);
          }
    }
  }
  function se(l, n, u) {
    switch (n) {
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
        ge("error", l), ge("load", l);
        var c = !1, s = !1, r;
        for (r in u)
          if (u.hasOwnProperty(r)) {
            var y = u[r];
            if (y != null)
              switch (r) {
                case "src":
                  c = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(U(137, n));
                default:
                  he(l, n, r, y, u, null);
              }
          }
        s && he(l, n, "srcSet", u.srcSet, u, null), c && he(l, n, "src", u.src, u, null);
        return;
      case "input":
        ge("invalid", l);
        var m = r = y = s = null, g = null, R = null;
        for (c in u)
          if (u.hasOwnProperty(c)) {
            var V = u[c];
            if (V != null)
              switch (c) {
                case "name":
                  s = V;
                  break;
                case "type":
                  y = V;
                  break;
                case "checked":
                  g = V;
                  break;
                case "defaultChecked":
                  R = V;
                  break;
                case "value":
                  r = V;
                  break;
                case "defaultValue":
                  m = V;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (V != null)
                    throw Error(U(137, n));
                  break;
                default:
                  he(l, n, c, V, u, null);
              }
          }
        $s(
          l,
          r,
          m,
          g,
          R,
          y,
          s,
          !1
        ), qu(l);
        return;
      case "select":
        ge("invalid", l), c = y = r = null;
        for (s in u)
          if (u.hasOwnProperty(s) && (m = u[s], m != null))
            switch (s) {
              case "value":
                r = m;
                break;
              case "defaultValue":
                y = m;
                break;
              case "multiple":
                c = m;
              default:
                he(l, n, s, m, u, null);
            }
        n = r, u = y, l.multiple = !!c, n != null ? Ui(l, !!c, n, !1) : u != null && Ui(l, !!c, u, !0);
        return;
      case "textarea":
        ge("invalid", l), r = s = c = null;
        for (y in u)
          if (u.hasOwnProperty(y) && (m = u[y], m != null))
            switch (y) {
              case "value":
                c = m;
                break;
              case "defaultValue":
                s = m;
                break;
              case "children":
                r = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(U(91));
                break;
              default:
                he(l, n, y, m, u, null);
            }
        bh(l, c, s, r), qu(l);
        return;
      case "option":
        for (g in u)
          if (u.hasOwnProperty(g) && (c = u[g], c != null))
            switch (g) {
              case "selected":
                l.selected = c && typeof c != "function" && typeof c != "symbol";
                break;
              default:
                he(l, n, g, c, u, null);
            }
        return;
      case "dialog":
        ge("beforetoggle", l), ge("toggle", l), ge("cancel", l), ge("close", l);
        break;
      case "iframe":
      case "object":
        ge("load", l);
        break;
      case "video":
      case "audio":
        for (c = 0; c < cs.length; c++)
          ge(cs[c], l);
        break;
      case "image":
        ge("error", l), ge("load", l);
        break;
      case "details":
        ge("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        ge("error", l), ge("load", l);
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
        for (R in u)
          if (u.hasOwnProperty(R) && (c = u[R], c != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(U(137, n));
              default:
                he(l, n, R, c, u, null);
            }
        return;
      default:
        if (xi(n)) {
          for (V in u)
            u.hasOwnProperty(V) && (c = u[V], c !== void 0 && C(
              l,
              n,
              V,
              c,
              u,
              void 0
            ));
          return;
        }
    }
    for (m in u)
      u.hasOwnProperty(m) && (c = u[m], c != null && he(l, n, m, c, u, null));
  }
  function Av(l, n, u, c) {
    switch (n) {
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
        var s = null, r = null, y = null, m = null, g = null, R = null, V = null;
        for (H in u) {
          var X = u[H];
          if (u.hasOwnProperty(H) && X != null)
            switch (H) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = X;
              default:
                c.hasOwnProperty(H) || he(l, n, H, null, c, X);
            }
        }
        for (var M in c) {
          var H = c[M];
          if (X = u[M], c.hasOwnProperty(M) && (H != null || X != null))
            switch (M) {
              case "type":
                r = H;
                break;
              case "name":
                s = H;
                break;
              case "checked":
                R = H;
                break;
              case "defaultChecked":
                V = H;
                break;
              case "value":
                y = H;
                break;
              case "defaultValue":
                m = H;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null)
                  throw Error(U(137, n));
                break;
              default:
                H !== X && he(
                  l,
                  n,
                  M,
                  H,
                  c,
                  X
                );
            }
        }
        Ks(
          l,
          y,
          m,
          g,
          R,
          V,
          r,
          s
        );
        return;
      case "select":
        H = y = m = M = null;
        for (r in u)
          if (g = u[r], u.hasOwnProperty(r) && g != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                H = g;
              default:
                c.hasOwnProperty(r) || he(
                  l,
                  n,
                  r,
                  null,
                  c,
                  g
                );
            }
        for (s in c)
          if (r = c[s], g = u[s], c.hasOwnProperty(s) && (r != null || g != null))
            switch (s) {
              case "value":
                M = r;
                break;
              case "defaultValue":
                m = r;
                break;
              case "multiple":
                y = r;
              default:
                r !== g && he(
                  l,
                  n,
                  s,
                  r,
                  c,
                  g
                );
            }
        n = m, u = y, c = H, M != null ? Ui(l, !!u, M, !1) : !!c != !!u && (n != null ? Ui(l, !!u, n, !0) : Ui(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        H = M = null;
        for (m in u)
          if (s = u[m], u.hasOwnProperty(m) && s != null && !c.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                he(l, n, m, null, c, s);
            }
        for (y in c)
          if (s = c[y], r = u[y], c.hasOwnProperty(y) && (s != null || r != null))
            switch (y) {
              case "value":
                M = s;
                break;
              case "defaultValue":
                H = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(U(91));
                break;
              default:
                s !== r && he(l, n, y, s, c, r);
            }
        gh(l, M, H);
        return;
      case "option":
        for (var P in u)
          if (M = u[P], u.hasOwnProperty(P) && M != null && !c.hasOwnProperty(P))
            switch (P) {
              case "selected":
                l.selected = !1;
                break;
              default:
                he(
                  l,
                  n,
                  P,
                  null,
                  c,
                  M
                );
            }
        for (g in c)
          if (M = c[g], H = u[g], c.hasOwnProperty(g) && M !== H && (M != null || H != null))
            switch (g) {
              case "selected":
                l.selected = M && typeof M != "function" && typeof M != "symbol";
                break;
              default:
                he(
                  l,
                  n,
                  g,
                  M,
                  c,
                  H
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
        for (var ee in u)
          M = u[ee], u.hasOwnProperty(ee) && M != null && !c.hasOwnProperty(ee) && he(l, n, ee, null, c, M);
        for (R in c)
          if (M = c[R], H = u[R], c.hasOwnProperty(R) && M !== H && (M != null || H != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null)
                  throw Error(U(137, n));
                break;
              default:
                he(
                  l,
                  n,
                  R,
                  M,
                  c,
                  H
                );
            }
        return;
      default:
        if (xi(n)) {
          for (var je in u)
            M = u[je], u.hasOwnProperty(je) && M !== void 0 && !c.hasOwnProperty(je) && C(
              l,
              n,
              je,
              void 0,
              c,
              M
            );
          for (V in c)
            M = c[V], H = u[V], !c.hasOwnProperty(V) || M === H || M === void 0 && H === void 0 || C(
              l,
              n,
              V,
              M,
              c,
              H
            );
          return;
        }
    }
    for (var z in u)
      M = u[z], u.hasOwnProperty(z) && M != null && !c.hasOwnProperty(z) && he(l, n, z, null, c, M);
    for (X in c)
      M = c[X], H = u[X], !c.hasOwnProperty(X) || M === H || M == null && H == null || he(l, n, X, M, c, H);
  }
  var fs = null, ss = null;
  function xa(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function pu(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Do(l, n) {
    if (l === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && n === "foreignObject" ? 0 : l;
  }
  function Cn(l, n) {
    return l === "textarea" || l === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Ro = null;
  function vu() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Ro ? !1 : (Ro = l, !0) : (Ro = null, !1);
  }
  var Td = typeof setTimeout == "function" ? setTimeout : void 0, Ev = typeof clearTimeout == "function" ? clearTimeout : void 0, ip = typeof Promise == "function" ? Promise : void 0, zv = typeof queueMicrotask == "function" ? queueMicrotask : typeof ip < "u" ? function(l) {
    return ip.resolve(null).then(l).catch(Nn);
  } : Td;
  function Nn(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function si(l) {
    return l === "head";
  }
  function Ad(l, n) {
    var u = n, c = 0, s = 0;
    do {
      var r = u.nextSibling;
      if (l.removeChild(u), r && r.nodeType === 8)
        if (u = r.data, u === "/$") {
          if (0 < c && 8 > c) {
            u = c;
            var y = l.ownerDocument;
            if (u & 1 && $l(y.documentElement), u & 2 && $l(y.body), u & 4)
              for (u = y.head, $l(u), y = u.firstChild; y; ) {
                var m = y.nextSibling, g = y.nodeName;
                y[k] || g === "SCRIPT" || g === "STYLE" || g === "LINK" && y.rel.toLowerCase() === "stylesheet" || u.removeChild(y), y = m;
              }
          }
          if (s === 0) {
            l.removeChild(r), qn(n);
            return;
          }
          s--;
        } else
          u === "$" || u === "$?" || u === "$!" ? s++ : c = u.charCodeAt(0) - 48;
      else c = 0;
      u = r;
    } while (u);
    qn(n);
  }
  function rs(l) {
    var n = l.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var u = n;
      switch (n = n.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          rs(u), tf(u);
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
  function Oo(l, n, u, c) {
    for (; l.nodeType === 1; ) {
      var s = u;
      if (l.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!c && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (c) {
        if (!l[k])
          switch (n) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (r = l.getAttribute("rel"), r === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (r !== s.rel || l.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || l.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (r = l.getAttribute("src"), (r !== (s.src == null ? null : s.src) || l.getAttribute("type") !== (s.type == null ? null : s.type) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && r && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (n === "input" && l.type === "hidden") {
        var r = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && l.getAttribute("name") === r)
          return l;
      } else return l;
      if (l = Wa(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Dv(l, n, u) {
    if (n === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Wa(l.nextSibling), l === null)) return null;
    return l;
  }
  function ds(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
  }
  function Rv(l, n) {
    var u = l.ownerDocument;
    if (l.data !== "$?" || u.readyState === "complete")
      n();
    else {
      var c = function() {
        n(), u.removeEventListener("DOMContentLoaded", c);
      };
      u.addEventListener("DOMContentLoaded", c), l._reactRetry = c;
    }
  }
  function Wa(l) {
    for (; l != null; l = l.nextSibling) {
      var n = l.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = l.data, n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F")
          break;
        if (n === "/$") return null;
      }
    }
    return l;
  }
  var ri = null;
  function cl(l) {
    l = l.previousSibling;
    for (var n = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (n === 0) return l;
          n--;
        } else u === "/$" && n++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function K(l, n, u) {
    switch (n = xa(u), l) {
      case "html":
        if (l = n.documentElement, !l) throw Error(U(452));
        return l;
      case "head":
        if (l = n.head, !l) throw Error(U(453));
        return l;
      case "body":
        if (l = n.body, !l) throw Error(U(454));
        return l;
      default:
        throw Error(U(451));
    }
  }
  function $l(l) {
    for (var n = l.attributes; n.length; )
      l.removeAttributeNode(n[0]);
    tf(l);
  }
  var Rt = /* @__PURE__ */ new Map(), gl = /* @__PURE__ */ new Set();
  function Ed(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var gu = Q.d;
  Q.d = {
    f: zd,
    r: Dd,
    D: bu,
    C: Rd,
    L: di,
    m: bl,
    X: hi,
    S: kl,
    M: um
  };
  function zd() {
    var l = gu.f(), n = fc();
    return l || n;
  }
  function Dd(l) {
    var n = Di(l);
    n !== null && n.tag === 5 && n.type === "form" ? no(n) : gu.r(l);
  }
  var ol = typeof document > "u" ? null : document;
  function Fa(l, n, u) {
    var c = ol;
    if (c && typeof n == "string" && n) {
      var s = pa(n);
      s = 'link[rel="' + l + '"][href="' + s + '"]', typeof u == "string" && (s += '[crossorigin="' + u + '"]'), gl.has(s) || (gl.add(s), l = { rel: l, crossOrigin: u, href: n }, c.querySelector(s) === null && (n = c.createElement("link"), se(n, "link", l), Vt(n), c.head.appendChild(n)));
    }
  }
  function bu(l) {
    gu.D(l), Fa("dns-prefetch", l, null);
  }
  function Rd(l, n) {
    gu.C(l, n), Fa("preconnect", l, n);
  }
  function di(l, n, u) {
    gu.L(l, n, u);
    var c = ol;
    if (c && l && n) {
      var s = 'link[rel="preload"][as="' + pa(n) + '"]';
      n === "image" && u && u.imageSrcSet ? (s += '[imagesrcset="' + pa(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (s += '[imagesizes="' + pa(
        u.imageSizes
      ) + '"]')) : s += '[href="' + pa(l) + '"]';
      var r = s;
      switch (n) {
        case "style":
          r = Mo(l);
          break;
        case "script":
          r = Ha(l);
      }
      Rt.has(r) || (l = ae(
        {
          rel: "preload",
          href: n === "image" && u && u.imageSrcSet ? void 0 : l,
          as: n
        },
        u
      ), Rt.set(r, l), c.querySelector(s) !== null || n === "style" && c.querySelector(Uo(r)) || n === "script" && c.querySelector(yc(r)) || (n = c.createElement("link"), se(n, "link", l), Vt(n), c.head.appendChild(n)));
    }
  }
  function bl(l, n) {
    gu.m(l, n);
    var u = ol;
    if (u && l) {
      var c = n && typeof n.as == "string" ? n.as : "script", s = 'link[rel="modulepreload"][as="' + pa(c) + '"][href="' + pa(l) + '"]', r = s;
      switch (c) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = Ha(l);
      }
      if (!Rt.has(r) && (l = ae({ rel: "modulepreload", href: l }, n), Rt.set(r, l), u.querySelector(s) === null)) {
        switch (c) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(yc(r)))
              return;
        }
        c = u.createElement("link"), se(c, "link", l), Vt(c), u.head.appendChild(c);
      }
    }
  }
  function kl(l, n, u) {
    gu.S(l, n, u);
    var c = ol;
    if (c && l) {
      var s = kn(c).hoistableStyles, r = Mo(l);
      n = n || "default";
      var y = s.get(r);
      if (!y) {
        var m = { loading: 0, preload: null };
        if (y = c.querySelector(
          Uo(r)
        ))
          m.loading = 5;
        else {
          l = ae(
            { rel: "stylesheet", href: l, "data-precedence": n },
            u
          ), (u = Rt.get(r)) && Md(l, u);
          var g = y = c.createElement("link");
          Vt(g), se(g, "link", l), g._p = new Promise(function(R, V) {
            g.onload = R, g.onerror = V;
          }), g.addEventListener("load", function() {
            m.loading |= 1;
          }), g.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, Od(y, n, c);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: m
        }, s.set(r, y);
      }
    }
  }
  function hi(l, n) {
    gu.X(l, n);
    var u = ol;
    if (u && l) {
      var c = kn(u).hoistableScripts, s = Ha(l), r = c.get(s);
      r || (r = u.querySelector(yc(s)), r || (l = ae({ src: l, async: !0 }, n), (n = Rt.get(s)) && Ud(l, n), r = u.createElement("script"), Vt(r), se(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function um(l, n) {
    gu.M(l, n);
    var u = ol;
    if (u && l) {
      var c = kn(u).hoistableScripts, s = Ha(l), r = c.get(s);
      r || (r = u.querySelector(yc(s)), r || (l = ae({ src: l, async: !0, type: "module" }, n), (n = Rt.get(s)) && Ud(l, n), r = u.createElement("script"), Vt(r), se(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function cp(l, n, u, c) {
    var s = (s = Ze.current) ? Ed(s) : null;
    if (!s) throw Error(U(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (n = Mo(u.href), u = kn(
          s
        ).hoistableStyles, c = u.get(n), c || (c = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = Mo(u.href);
          var r = kn(
            s
          ).hoistableStyles, y = r.get(l);
          if (y || (s = s.ownerDocument || s, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(l, y), (r = s.querySelector(
            Uo(l)
          )) && !r._p && (y.instance = r, y.state.loading = 5), Rt.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, Rt.set(l, u), r || op(
            s,
            l,
            u,
            y.state
          ))), n && c === null)
            throw Error(U(528, ""));
          return y;
        }
        if (n && c !== null)
          throw Error(U(529, ""));
        return null;
      case "script":
        return n = u.async, u = u.src, typeof u == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Ha(u), u = kn(
          s
        ).hoistableScripts, c = u.get(n), c || (c = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(U(444, l));
    }
  }
  function Mo(l) {
    return 'href="' + pa(l) + '"';
  }
  function Uo(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function xo(l) {
    return ae({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function op(l, n, u, c) {
    l.querySelector('link[rel="preload"][as="style"][' + n + "]") ? c.loading = 1 : (n = l.createElement("link"), c.preload = n, n.addEventListener("load", function() {
      return c.loading |= 1;
    }), n.addEventListener("error", function() {
      return c.loading |= 2;
    }), se(n, "link", u), Vt(n), l.head.appendChild(n));
  }
  function Ha(l) {
    return '[src="' + pa(l) + '"]';
  }
  function yc(l) {
    return "script[async]" + l;
  }
  function fp(l, n, u) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var c = l.querySelector(
            'style[data-href~="' + pa(u.href) + '"]'
          );
          if (c)
            return n.instance = c, Vt(c), c;
          var s = ae({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return c = (l.ownerDocument || l).createElement(
            "style"
          ), Vt(c), se(c, "style", s), Od(c, u.precedence, l), n.instance = c;
        case "stylesheet":
          s = Mo(u.href);
          var r = l.querySelector(
            Uo(s)
          );
          if (r)
            return n.state.loading |= 4, n.instance = r, Vt(r), r;
          c = xo(u), (s = Rt.get(s)) && Md(c, s), r = (l.ownerDocument || l).createElement("link"), Vt(r);
          var y = r;
          return y._p = new Promise(function(m, g) {
            y.onload = m, y.onerror = g;
          }), se(r, "link", c), n.state.loading |= 4, Od(r, u.precedence, l), n.instance = r;
        case "script":
          return r = Ha(u.src), (s = l.querySelector(
            yc(r)
          )) ? (n.instance = s, Vt(s), s) : (c = u, (s = Rt.get(r)) && (c = ae({}, u), Ud(c, s)), l = l.ownerDocument || l, s = l.createElement("script"), Vt(s), se(s, "link", c), l.head.appendChild(s), n.instance = s);
        case "void":
          return null;
        default:
          throw Error(U(443, n.type));
      }
    else
      n.type === "stylesheet" && !(n.state.loading & 4) && (c = n.instance, n.state.loading |= 4, Od(c, u.precedence, l));
    return n.instance;
  }
  function Od(l, n, u) {
    for (var c = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = c.length ? c[c.length - 1] : null, r = s, y = 0; y < c.length; y++) {
      var m = c[y];
      if (m.dataset.precedence === n) r = m;
      else if (r !== s) break;
    }
    r ? r.parentNode.insertBefore(l, r.nextSibling) : (n = u.nodeType === 9 ? u.head : u, n.insertBefore(l, n.firstChild));
  }
  function Md(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.title == null && (l.title = n.title);
  }
  function Ud(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.integrity == null && (l.integrity = n.integrity);
  }
  var yi = null;
  function im(l, n, u) {
    if (yi === null) {
      var c = /* @__PURE__ */ new Map(), s = yi = /* @__PURE__ */ new Map();
      s.set(u, c);
    } else
      s = yi, c = s.get(u), c || (c = /* @__PURE__ */ new Map(), s.set(u, c));
    if (c.has(l)) return c;
    for (c.set(l, null), u = u.getElementsByTagName(l), s = 0; s < u.length; s++) {
      var r = u[s];
      if (!(r[k] || r[Jt] || l === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = r.getAttribute(n) || "";
        y = l + y;
        var m = c.get(y);
        m ? m.push(r) : c.set(y, [r]);
      }
    }
    return c;
  }
  function cm(l, n, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      n === "title" ? l.querySelector("head > title") : null
    );
  }
  function sp(l, n, u) {
    if (u === 1 || n.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return l = n.disabled, typeof n.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function om(l) {
    return !(l.type === "stylesheet" && !(l.state.loading & 3));
  }
  var Ho = null;
  function rp() {
  }
  function dp(l, n, u) {
    if (Ho === null) throw Error(U(475));
    var c = Ho;
    if (n.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && !(n.state.loading & 4)) {
      if (n.instance === null) {
        var s = Mo(u.href), r = l.querySelector(
          Uo(s)
        );
        if (r) {
          l = r._p, l !== null && typeof l == "object" && typeof l.then == "function" && (c.count++, c = hs.bind(c), l.then(c, c)), n.state.loading |= 4, n.instance = r, Vt(r);
          return;
        }
        r = l.ownerDocument || l, u = xo(u), (s = Rt.get(s)) && Md(u, s), r = r.createElement("link"), Vt(r);
        var y = r;
        y._p = new Promise(function(m, g) {
          y.onload = m, y.onerror = g;
        }), se(r, "link", u), n.instance = r;
      }
      c.stylesheets === null && (c.stylesheets = /* @__PURE__ */ new Map()), c.stylesheets.set(n, l), (l = n.state.preload) && !(n.state.loading & 3) && (c.count++, n = hs.bind(c), l.addEventListener("load", n), l.addEventListener("error", n));
    }
  }
  function fm() {
    if (Ho === null) throw Error(U(475));
    var l = Ho;
    return l.stylesheets && l.count === 0 && ys(l, l.stylesheets), 0 < l.count ? function(n) {
      var u = setTimeout(function() {
        if (l.stylesheets && ys(l, l.stylesheets), l.unsuspend) {
          var c = l.unsuspend;
          l.unsuspend = null, c();
        }
      }, 6e4);
      return l.unsuspend = n, function() {
        l.unsuspend = null, clearTimeout(u);
      };
    } : null;
  }
  function hs() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) ys(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Co = null;
  function ys(l, n) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Co = /* @__PURE__ */ new Map(), n.forEach(fa, l), Co = null, hs.call(l));
  }
  function fa(l, n) {
    if (!(n.state.loading & 4)) {
      var u = Co.get(l);
      if (u) var c = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Co.set(l, u);
        for (var s = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < s.length; r++) {
          var y = s[r];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (u.set(y.dataset.precedence, y), c = y);
        }
        c && u.set(null, c);
      }
      s = n.instance, y = s.getAttribute("data-precedence"), r = u.get(y) || c, r === c && u.set(null, s), u.set(y, s), this.count++, c = hs.bind(this), s.addEventListener("load", c), s.addEventListener("error", c), r ? r.parentNode.insertBefore(s, r.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(s, l.firstChild)), n.state.loading |= 4;
    }
  }
  var Wl = {
    $$typeof: mt,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function Ov(l, n, u, c, s, r, y, m) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Hu(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Hu(0), this.hiddenUpdates = Hu(null), this.identifierPrefix = c, this.onUncaughtError = s, this.onCaughtError = r, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function sm(l, n, u, c, s, r, y, m, g, R, V, X) {
    return l = new Ov(
      l,
      n,
      u,
      y,
      m,
      g,
      R,
      X
    ), n = 1, r === !0 && (n |= 24), r = _l(3, null, null, n), l.current = r, r.stateNode = l, n = Pc(), n.refCount++, l.pooledCache = n, n.refCount++, r.memoizedState = {
      element: c,
      isDehydrated: u,
      cache: n
    }, Sr(r), l;
  }
  function rm(l) {
    return l ? (l = Lc, l) : Lc;
  }
  function dm(l, n, u, c, s, r) {
    s = rm(s), c.context === null ? c.context = s : c.pendingContext = s, c = Ql(n), c.payload = { element: u }, r = r === void 0 ? null : r, r !== null && (c.callback = r), u = vn(l, c, n), u !== null && (ca(u, l, n), Ki(u, l, n));
  }
  function hm(l, n) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < n ? u : n;
    }
  }
  function xd(l, n) {
    hm(l, n), (l = l.alternate) && hm(l, n);
  }
  function ym(l) {
    if (l.tag === 13) {
      var n = rn(l, 67108864);
      n !== null && ca(n, l, 67108864), xd(l, 67108864);
    }
  }
  var ms = !0;
  function hp(l, n, u, c) {
    var s = E.T;
    E.T = null;
    var r = Q.p;
    try {
      Q.p = 2, mm(l, n, u, c);
    } finally {
      Q.p = r, E.T = s;
    }
  }
  function yp(l, n, u, c) {
    var s = E.T;
    E.T = null;
    var r = Q.p;
    try {
      Q.p = 8, mm(l, n, u, c);
    } finally {
      Q.p = r, E.T = s;
    }
  }
  function mm(l, n, u, c) {
    if (ms) {
      var s = Hd(c);
      if (s === null)
        Ua(
          l,
          n,
          c,
          Cd,
          u
        ), mc(l, c);
      else if (pp(
        s,
        l,
        n,
        u,
        c
      ))
        c.stopPropagation();
      else if (mc(l, c), n & 4 && -1 < mp.indexOf(l)) {
        for (; s !== null; ) {
          var r = Di(s);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var y = Pl(r.pendingLanes);
                  if (y !== 0) {
                    var m = r;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; y; ) {
                      var g = 1 << 31 - Yl(y);
                      m.entanglements[1] |= g, y &= ~g;
                    }
                    Kl(r), !(Je & 6) && (od = Il() + 500, ls(0));
                  }
                }
                break;
              case 13:
                m = rn(r, 2), m !== null && ca(m, r, 2), fc(), xd(r, 2);
            }
          if (r = Hd(c), r === null && Ua(
            l,
            n,
            c,
            Cd,
            u
          ), r === s) break;
          s = r;
        }
        s !== null && c.stopPropagation();
      } else
        Ua(
          l,
          n,
          c,
          null,
          u
        );
    }
  }
  function Hd(l) {
    return l = Ws(l), pm(l);
  }
  var Cd = null;
  function pm(l) {
    if (Cd = null, l = el(l), l !== null) {
      var n = ke(l);
      if (n === null) l = null;
      else {
        var u = n.tag;
        if (u === 13) {
          if (l = yt(n), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          l = null;
        } else n !== l && (l = null);
      }
    }
    return Cd = l, null;
  }
  function vm(l) {
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
        switch (Fo()) {
          case n0:
            return 2;
          case rh:
            return 8;
          case Io:
          case dh:
            return 32;
          case Hc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var No = !1, Bn = null, Su = null, Tu = null, ps = /* @__PURE__ */ new Map(), vs = /* @__PURE__ */ new Map(), mi = [], mp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function mc(l, n) {
    switch (l) {
      case "focusin":
      case "focusout":
        Bn = null;
        break;
      case "dragenter":
      case "dragleave":
        Su = null;
        break;
      case "mouseover":
      case "mouseout":
        Tu = null;
        break;
      case "pointerover":
      case "pointerout":
        ps.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vs.delete(n.pointerId);
    }
  }
  function pc(l, n, u, c, s, r) {
    return l === null || l.nativeEvent !== r ? (l = {
      blockedOn: n,
      domEventName: u,
      eventSystemFlags: c,
      nativeEvent: r,
      targetContainers: [s]
    }, n !== null && (n = Di(n), n !== null && ym(n)), l) : (l.eventSystemFlags |= c, n = l.targetContainers, s !== null && n.indexOf(s) === -1 && n.push(s), l);
  }
  function pp(l, n, u, c, s) {
    switch (n) {
      case "focusin":
        return Bn = pc(
          Bn,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "dragenter":
        return Su = pc(
          Su,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "mouseover":
        return Tu = pc(
          Tu,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "pointerover":
        var r = s.pointerId;
        return ps.set(
          r,
          pc(
            ps.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
      case "gotpointercapture":
        return r = s.pointerId, vs.set(
          r,
          pc(
            vs.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
    }
    return !1;
  }
  function gm(l) {
    var n = el(l.target);
    if (n !== null) {
      var u = ke(n);
      if (u !== null) {
        if (n = u.tag, n === 13) {
          if (n = yt(u), n !== null) {
            l.blockedOn = n, ov(l.priority, function() {
              if (u.tag === 13) {
                var c = ia();
                c = Ya(c);
                var s = rn(u, c);
                s !== null && ca(s, u, c), xd(u, c);
              }
            });
            return;
          }
        } else if (n === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function gs(l) {
    if (l.blockedOn !== null) return !1;
    for (var n = l.targetContainers; 0 < n.length; ) {
      var u = Hd(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var c = new u.constructor(
          u.type,
          u
        );
        Hi = c, u.target.dispatchEvent(c), Hi = null;
      } else
        return n = Di(u), n !== null && ym(n), l.blockedOn = u, !1;
      n.shift();
    }
    return !0;
  }
  function bs(l, n, u) {
    gs(l) && u.delete(n);
  }
  function Bo() {
    No = !1, Bn !== null && gs(Bn) && (Bn = null), Su !== null && gs(Su) && (Su = null), Tu !== null && gs(Tu) && (Tu = null), ps.forEach(bs), vs.forEach(bs);
  }
  function Nd(l, n) {
    l.blockedOn === n && (l.blockedOn = null, No || (No = !0, q.unstable_scheduleCallback(
      q.unstable_NormalPriority,
      Bo
    )));
  }
  var vc = null;
  function bm(l) {
    vc !== l && (vc = l, q.unstable_scheduleCallback(
      q.unstable_NormalPriority,
      function() {
        vc === l && (vc = null);
        for (var n = 0; n < l.length; n += 3) {
          var u = l[n], c = l[n + 1], s = l[n + 2];
          if (typeof c != "function") {
            if (pm(c || u) === null)
              continue;
            break;
          }
          var r = Di(u);
          r !== null && (l.splice(n, 3), n -= 3, Xr(
            r,
            {
              pending: !0,
              data: s,
              method: u.method,
              action: c
            },
            c,
            s
          ));
        }
      }
    ));
  }
  function qn(l) {
    function n(g) {
      return Nd(g, l);
    }
    Bn !== null && Nd(Bn, l), Su !== null && Nd(Su, l), Tu !== null && Nd(Tu, l), ps.forEach(n), vs.forEach(n);
    for (var u = 0; u < mi.length; u++) {
      var c = mi[u];
      c.blockedOn === l && (c.blockedOn = null);
    }
    for (; 0 < mi.length && (u = mi[0], u.blockedOn === null); )
      gm(u), u.blockedOn === null && mi.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (c = 0; c < u.length; c += 3) {
        var s = u[c], r = u[c + 1], y = s[Dl] || null;
        if (typeof r == "function")
          y || bm(u);
        else if (y) {
          var m = null;
          if (r && r.hasAttribute("formAction")) {
            if (s = r, y = r[Dl] || null)
              m = y.formAction;
            else if (pm(s) !== null) continue;
          } else m = y.action;
          typeof m == "function" ? u[c + 1] = m : (u.splice(c, 3), c -= 3), bm(u);
        }
      }
  }
  function Sm(l) {
    this._internalRoot = l;
  }
  Bd.prototype.render = Sm.prototype.render = function(l) {
    var n = this._internalRoot;
    if (n === null) throw Error(U(409));
    var u = n.current, c = ia();
    dm(u, c, l, n, null, null);
  }, Bd.prototype.unmount = Sm.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var n = l.containerInfo;
      dm(l.current, 2, null, l, null, null), fc(), n[Bc] = null;
    }
  };
  function Bd(l) {
    this._internalRoot = l;
  }
  Bd.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var n = o0();
      l = { blockedOn: null, target: l, priority: n };
      for (var u = 0; u < mi.length && n !== 0 && n < mi[u].priority; u++) ;
      mi.splice(u, 0, l), u === 0 && gm(l);
    }
  };
  var Tm = J.version;
  if (Tm !== "19.1.0")
    throw Error(
      U(
        527,
        Tm,
        "19.1.0"
      )
    );
  Q.findDOMNode = function(l) {
    var n = l._reactInternals;
    if (n === void 0)
      throw typeof l.render == "function" ? Error(U(188)) : (l = Object.keys(l).join(","), Error(U(268, l)));
    return l = w(n), l = l !== null ? ut(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Hl = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ss = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ss.isDisabled && Ss.supportsFiber)
      try {
        Cc = Ss.inject(
          Hl
        ), zl = Ss;
      } catch {
      }
  }
  return l0.createRoot = function(l, n) {
    if (!de(l)) throw Error(U(299));
    var u = !1, c = "", s = co, r = gy, y = Lf, m = null;
    return n != null && (n.unstable_strictMode === !0 && (u = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (r = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (m = n.unstable_transitionCallbacks)), n = sm(
      l,
      1,
      !1,
      null,
      null,
      u,
      c,
      s,
      r,
      y,
      m,
      null
    ), l[Bc] = n.current, lm(l), new Sm(n);
  }, l0.hydrateRoot = function(l, n, u) {
    if (!de(l)) throw Error(U(299));
    var c = !1, s = "", r = co, y = gy, m = Lf, g = null, R = null;
    return u != null && (u.unstable_strictMode === !0 && (c = !0), u.identifierPrefix !== void 0 && (s = u.identifierPrefix), u.onUncaughtError !== void 0 && (r = u.onUncaughtError), u.onCaughtError !== void 0 && (y = u.onCaughtError), u.onRecoverableError !== void 0 && (m = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (g = u.unstable_transitionCallbacks), u.formState !== void 0 && (R = u.formState)), n = sm(
      l,
      1,
      !0,
      n,
      u ?? null,
      c,
      s,
      r,
      y,
      m,
      g,
      R
    ), n.context = rm(null), u = n.current, c = ia(), c = Ya(c), s = Ql(c), s.callback = null, vn(u, s, c), u = c, n.current.lanes = u, zi(n, u), Kl(n), l[Bc] = n.current, lm(l), new Bd(n);
  }, l0.version = "19.1.0", l0;
}
var a0 = {};
/**
 * @license React
 * react-dom-client.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qb;
function FS() {
  return qb || (qb = 1, process.env.NODE_ENV !== "production" && function() {
    function q(e, t) {
      for (e = e.memoizedState; e !== null && 0 < t; )
        e = e.next, t--;
      return e;
    }
    function J(e, t, a, i) {
      if (a >= t.length) return i;
      var o = t[a], f = he(e) ? e.slice() : Ee({}, e);
      return f[o] = J(e[o], t, a + 1, i), f;
    }
    function ce(e, t, a) {
      if (t.length !== a.length)
        console.warn("copyWithRename() expects paths of the same length");
      else {
        for (var i = 0; i < a.length - 1; i++)
          if (t[i] !== a[i]) {
            console.warn(
              "copyWithRename() expects paths to be the same except for the deepest key"
            );
            return;
          }
        return U(e, t, a, 0);
      }
    }
    function U(e, t, a, i) {
      var o = t[i], f = he(e) ? e.slice() : Ee({}, e);
      return i + 1 === t.length ? (f[a[i]] = f[o], he(f) ? f.splice(o, 1) : delete f[o]) : f[o] = U(
        e[o],
        t,
        a,
        i + 1
      ), f;
    }
    function de(e, t, a) {
      var i = t[a], o = he(e) ? e.slice() : Ee({}, e);
      return a + 1 === t.length ? (he(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = de(e[i], t, a + 1), o);
    }
    function ke() {
      return !1;
    }
    function yt() {
      return null;
    }
    function Bt() {
    }
    function w() {
      console.error(
        "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
      );
    }
    function ut() {
      console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      );
    }
    function ae() {
    }
    function pe(e) {
      var t = [];
      return e.forEach(function(a) {
        t.push(a);
      }), t.sort().join(", ");
    }
    function oe(e, t, a, i) {
      return new mf(e, t, a, i);
    }
    function Te(e, t) {
      e.context === qo && (Fe(e.current, 2, t, e, null, null), ac());
    }
    function me(e, t) {
      if (Gn !== null) {
        var a = t.staleFamilies;
        t = t.updatedFamilies, oo(), yf(
          e.current,
          t,
          a
        ), ac();
      }
    }
    function qt(e) {
      Gn = e;
    }
    function Ve(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Ce(e) {
      var t = e, a = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, t.flags & 4098 && (a = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? a : null;
    }
    function Ut(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function mt(e) {
      if (Ce(e) !== e)
        throw Error("Unable to find node on an unmounted component.");
    }
    function ql(e) {
      var t = e.alternate;
      if (!t) {
        if (t = Ce(e), t === null)
          throw Error("Unable to find node on an unmounted component.");
        return t !== e ? null : e;
      }
      for (var a = e, i = t; ; ) {
        var o = a.return;
        if (o === null) break;
        var f = o.alternate;
        if (f === null) {
          if (i = o.return, i !== null) {
            a = i;
            continue;
          }
          break;
        }
        if (o.child === f.child) {
          for (f = o.child; f; ) {
            if (f === a) return mt(o), e;
            if (f === i) return mt(o), t;
            f = f.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (a.return !== i.return) a = o, i = f;
        else {
          for (var d = !1, h = o.child; h; ) {
            if (h === a) {
              d = !0, a = o, i = f;
              break;
            }
            if (h === i) {
              d = !0, i = o, a = f;
              break;
            }
            h = h.sibling;
          }
          if (!d) {
            for (h = f.child; h; ) {
              if (h === a) {
                d = !0, a = f, i = o;
                break;
              }
              if (h === i) {
                d = !0, i = f, a = o;
                break;
              }
              h = h.sibling;
            }
            if (!d)
              throw Error(
                "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
              );
          }
        }
        if (a.alternate !== i)
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
      }
      if (a.tag !== 3)
        throw Error("Unable to find node on an unmounted component.");
      return a.stateNode.current === a ? e : t;
    }
    function ma(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = ma(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    function Yt(e) {
      return e === null || typeof e != "object" ? null : (e = nm && e[nm] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function Ke(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Sd ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case ge:
          return "Fragment";
        case Eo:
          return "Profiler";
        case Ao:
          return "StrictMode";
        case zo:
          return "Suspense";
        case fi:
          return "SuspenseList";
        case am:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case hc:
            return "Portal";
          case Ua:
            return (e.displayName || "Context") + ".Provider";
          case bd:
            return (e._context.displayName || "Context") + ".Consumer";
          case mu:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case os:
            return t = e.displayName || null, t !== null ? t : Ke(e.type) || "Memo";
          case oa:
            t = e._payload, e = e._init;
            try {
              return Ke(e(t));
            } catch {
            }
        }
      return null;
    }
    function Al(e) {
      return typeof e.tag == "number" ? te(e) : typeof e.name == "string" ? e.name : null;
    }
    function te(e) {
      var t = e.type;
      switch (e.tag) {
        case 31:
          return "Activity";
        case 24:
          return "Cache";
        case 9:
          return (t._context.displayName || "Context") + ".Consumer";
        case 10:
          return (t.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 26:
        case 27:
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Ke(t);
        case 8:
          return t === Ao ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 14:
        case 15:
          if (typeof t == "function")
            return t.displayName || t.name || null;
          if (typeof t == "string") return t;
          break;
        case 29:
          if (t = e._debugInfo, t != null) {
            for (var a = t.length - 1; 0 <= a; a--)
              if (typeof t[a].name == "string") return t[a].name;
          }
          if (e.return !== null)
            return te(e.return);
      }
      return null;
    }
    function xt(e) {
      return { current: e };
    }
    function lt(e, t) {
      0 > xa ? console.error("Unexpected pop.") : (t !== ss[xa] && console.error("Unexpected Fiber popped."), e.current = fs[xa], fs[xa] = null, ss[xa] = null, xa--);
    }
    function ze(e, t, a) {
      xa++, fs[xa] = e.current, ss[xa] = a, e.current = t;
    }
    function dl(e) {
      return e === null && console.error(
        "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
      ), e;
    }
    function qa(e, t) {
      ze(Cn, t, e), ze(Do, e, e), ze(pu, null, e);
      var a = t.nodeType;
      switch (a) {
        case 9:
        case 11:
          a = a === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? $e(t) : Oc;
          break;
        default:
          if (a = t.tagName, t = t.namespaceURI)
            t = $e(t), t = Ll(
              t,
              a
            );
          else
            switch (a) {
              case "svg":
                t = oh;
                break;
              case "math":
                t = Jp;
                break;
              default:
                t = Oc;
            }
      }
      a = a.toLowerCase(), a = gh(null, a), a = {
        context: t,
        ancestorInfo: a
      }, lt(pu, e), ze(pu, a, e);
    }
    function hl(e) {
      lt(pu, e), lt(Do, e), lt(Cn, e);
    }
    function E() {
      return dl(pu.current);
    }
    function Q(e) {
      e.memoizedState !== null && ze(Ro, e, e);
      var t = dl(pu.current), a = e.type, i = Ll(t.context, a);
      a = gh(t.ancestorInfo, a), i = { context: i, ancestorInfo: a }, t !== i && (ze(Do, e, e), ze(pu, i, e));
    }
    function Z(e) {
      Do.current === e && (lt(pu, e), lt(Do, e)), Ro.current === e && (lt(Ro, e), Pm._currentValue = Vs);
    }
    function ne(e) {
      return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
    }
    function fe(e) {
      try {
        return ft(e), !1;
      } catch {
        return !0;
      }
    }
    function ft(e) {
      return "" + e;
    }
    function le(e, t) {
      if (fe(e))
        return console.error(
          "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          ne(e)
        ), ft(e);
    }
    function Ye(e, t) {
      if (fe(e))
        return console.error(
          "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          ne(e)
        ), ft(e);
    }
    function We(e) {
      if (fe(e))
        return console.error(
          "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
          ne(e)
        ), ft(e);
    }
    function El(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled) return !0;
      if (!t.supportsFiber)
        return console.error(
          "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
        ), !0;
      try {
        ri = t.inject(e), cl = t;
      } catch (a) {
        console.error("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Ze(e) {
      if (typeof Rv == "function" && Wa(e), cl && typeof cl.setStrictMode == "function")
        try {
          cl.setStrictMode(ri, e);
        } catch (t) {
          $l || ($l = !0, console.error(
            "React instrumentation encountered an error: %s",
            t
          ));
        }
    }
    function Xs(e) {
      K = e;
    }
    function ko() {
      K !== null && typeof K.markCommitStopped == "function" && K.markCommitStopped();
    }
    function tn(e) {
      K !== null && typeof K.markComponentRenderStarted == "function" && K.markComponentRenderStarted(e);
    }
    function Mu() {
      K !== null && typeof K.markComponentRenderStopped == "function" && K.markComponentRenderStopped();
    }
    function Wo(e) {
      K !== null && typeof K.markRenderStarted == "function" && K.markRenderStarted(e);
    }
    function Qs() {
      K !== null && typeof K.markRenderStopped == "function" && K.markRenderStopped();
    }
    function Ti(e, t) {
      K !== null && typeof K.markStateUpdateScheduled == "function" && K.markStateUpdateScheduled(e, t);
    }
    function sh(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Ed(e) / gu | 0) | 0;
    }
    function uv(e) {
      if (e & 1) return "SyncHydrationLane";
      if (e & 2) return "Sync";
      if (e & 4) return "InputContinuousHydration";
      if (e & 8) return "InputContinuous";
      if (e & 16) return "DefaultHydration";
      if (e & 32) return "Default";
      if (e & 128) return "TransitionHydration";
      if (e & 4194048) return "Transition";
      if (e & 62914560) return "Retry";
      if (e & 67108864) return "SelectiveHydration";
      if (e & 134217728) return "IdleHydration";
      if (e & 268435456) return "Idle";
      if (e & 536870912) return "Offscreen";
      if (e & 1073741824) return "Deferred";
    }
    function Ai(e) {
      var t = e & 42;
      if (t !== 0) return t;
      switch (e & -e) {
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
          return e & 4194048;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
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
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), e;
      }
    }
    function Il(e, t, a) {
      var i = e.pendingLanes;
      if (i === 0) return 0;
      var o = 0, f = e.suspendedLanes, d = e.pingedLanes;
      e = e.warmLanes;
      var h = i & 134217727;
      return h !== 0 ? (i = h & ~f, i !== 0 ? o = Ai(i) : (d &= h, d !== 0 ? o = Ai(d) : a || (a = h & ~e, a !== 0 && (o = Ai(a))))) : (h = i & ~f, h !== 0 ? o = Ai(h) : d !== 0 ? o = Ai(d) : a || (a = i & ~e, a !== 0 && (o = Ai(a)))), o === 0 ? 0 : t !== 0 && t !== o && !(t & f) && (f = o & -o, a = t & -t, f >= a || f === 32 && (a & 4194048) !== 0) ? t : o;
    }
    function Fo(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function n0(e, t) {
      switch (e) {
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
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), -1;
      }
    }
    function rh() {
      var e = zd;
      return zd <<= 1, !(zd & 4194048) && (zd = 256), e;
    }
    function Io() {
      var e = Dd;
      return Dd <<= 1, !(Dd & 62914560) && (Dd = 4194304), e;
    }
    function dh(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function Hc(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function iv(e, t, a, i, o, f) {
      var d = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var h = e.entanglements, p = e.expirationTimes, v = e.hiddenUpdates;
      for (a = d & ~a; 0 < a; ) {
        var x = 31 - gl(a), B = 1 << x;
        h[x] = 0, p[x] = -1;
        var O = v[x];
        if (O !== null)
          for (v[x] = null, x = 0; x < O.length; x++) {
            var Y = O[x];
            Y !== null && (Y.lane &= -536870913);
          }
        a &= ~B;
      }
      i !== 0 && u0(e, i, 0), f !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(d & ~t));
    }
    function u0(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var i = 31 - gl(t);
      e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | a & 4194090;
    }
    function Cc(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var i = 31 - gl(a), o = 1 << i;
        o & t | e[i] & t && (e[i] |= t), a &= ~o;
      }
    }
    function zl(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
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
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function Kn(e, t, a) {
      if (Rt)
        for (e = e.pendingUpdatersLaneMap; 0 < a; ) {
          var i = 31 - gl(a), o = 1 << i;
          e[i].add(t), a &= ~o;
        }
    }
    function Yl(e, t) {
      if (Rt)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; 0 < t; ) {
          var o = 31 - gl(t);
          e = 1 << o, o = a[o], 0 < o.size && (o.forEach(function(f) {
            var d = f.alternate;
            d !== null && i.has(d) || i.add(f);
          }), o.clear()), t &= ~e;
        }
    }
    function hh(e) {
      return e &= -e, ol < e ? Fa < e ? e & 134217727 ? bu : Rd : Fa : ol;
    }
    function i0() {
      var e = se.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? bu : vd(e.type));
    }
    function cv(e, t) {
      var a = se.p;
      try {
        return se.p = e, t();
      } finally {
        se.p = a;
      }
    }
    function Nc(e) {
      delete e[bl], delete e[kl], delete e[um], delete e[cp], delete e[Mo];
    }
    function $n(e) {
      var t = e[bl];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[hi] || a[bl]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
            for (e = go(e); e !== null; ) {
              if (a = e[bl])
                return a;
              e = go(e);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Pl(e) {
      if (e = e[bl] || e[hi]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
          return e;
      }
      return null;
    }
    function Uu(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6)
        return e.stateNode;
      throw Error("getNodeFromInstance: Invalid argument.");
    }
    function ln(e) {
      var t = e[Uo];
      return t || (t = e[Uo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
    }
    function Lt(e) {
      e[xo] = !0;
    }
    function xu(e, t) {
      Ei(e, t), Ei(e + "Capture", t);
    }
    function Ei(e, t) {
      Ha[e] && console.error(
        "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
        e
      ), Ha[e] = t;
      var a = e.toLowerCase();
      for (yc[a] = e, e === "onDoubleClick" && (yc.ondblclick = e), e = 0; e < t.length; e++)
        op.add(t[e]);
    }
    function Hu(e, t) {
      fp[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(
        e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
      ), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error(
        "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
      );
    }
    function zi(e) {
      return vu.call(Ud, e) ? !0 : vu.call(Md, e) ? !1 : Od.test(e) ? Ud[e] = !0 : (Md[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
    }
    function c0(e, t, a) {
      if (zi(t)) {
        if (!e.hasAttribute(t)) {
          switch (typeof a) {
            case "symbol":
            case "object":
              return a;
            case "function":
              return a;
            case "boolean":
              if (a === !1) return a;
          }
          return a === void 0 ? void 0 : null;
        }
        return e = e.getAttribute(t), e === "" && a === !0 ? !0 : (le(a, t), e === "" + a ? a : e);
      }
    }
    function Po(e, t, a) {
      if (zi(t))
        if (a === null) e.removeAttribute(t);
        else {
          switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
              e.removeAttribute(t);
              return;
            case "boolean":
              var i = t.toLowerCase().slice(0, 5);
              if (i !== "data-" && i !== "aria-") {
                e.removeAttribute(t);
                return;
              }
          }
          le(a, t), e.setAttribute(t, "" + a);
        }
    }
    function ef(e, t, a) {
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        le(a, t), e.setAttribute(t, "" + a);
      }
    }
    function Ya(e, t, a, i) {
      if (i === null) e.removeAttribute(a);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(a);
            return;
        }
        le(i, a), e.setAttributeNS(t, a, "" + i);
      }
    }
    function js() {
    }
    function o0() {
      if (yi === 0) {
        im = console.log, cm = console.info, sp = console.warn, om = console.error, Ho = console.group, rp = console.groupCollapsed, dp = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: js,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      yi++;
    }
    function ov() {
      if (yi--, yi === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: Ee({}, e, { value: im }),
          info: Ee({}, e, { value: cm }),
          warn: Ee({}, e, { value: sp }),
          error: Ee({}, e, { value: om }),
          group: Ee({}, e, { value: Ho }),
          groupCollapsed: Ee({}, e, { value: rp }),
          groupEnd: Ee({}, e, { value: dp })
        });
      }
      0 > yi && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function Gt(e) {
      if (fm === void 0)
        try {
          throw Error();
        } catch (a) {
          var t = a.stack.trim().match(/\n( *(at )?)/);
          fm = t && t[1] || "", hs = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + fm + e + hs;
    }
    function Jt(e, t) {
      if (!e || Co) return "";
      var a = ys.get(e);
      if (a !== void 0) return a;
      Co = !0, a = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var i = null;
      i = C.H, C.H = null, o0();
      try {
        var o = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var O = function() {
                  throw Error();
                };
                if (Object.defineProperty(O.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(O, []);
                  } catch (W) {
                    var Y = W;
                  }
                  Reflect.construct(e, [], O);
                } else {
                  try {
                    O.call();
                  } catch (W) {
                    Y = W;
                  }
                  e.call(O.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (W) {
                  Y = W;
                }
                (O = e()) && typeof O.catch == "function" && O.catch(function() {
                });
              }
            } catch (W) {
              if (W && Y && typeof W.stack == "string")
                return [W.stack, Y.stack];
            }
            return [null, null];
          }
        };
        o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var f = Object.getOwnPropertyDescriptor(
          o.DetermineComponentFrameRoot,
          "name"
        );
        f && f.configurable && Object.defineProperty(
          o.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var d = o.DetermineComponentFrameRoot(), h = d[0], p = d[1];
        if (h && p) {
          var v = h.split(`
`), x = p.split(`
`);
          for (d = f = 0; f < v.length && !v[f].includes(
            "DetermineComponentFrameRoot"
          ); )
            f++;
          for (; d < x.length && !x[d].includes(
            "DetermineComponentFrameRoot"
          ); )
            d++;
          if (f === v.length || d === x.length)
            for (f = v.length - 1, d = x.length - 1; 1 <= f && 0 <= d && v[f] !== x[d]; )
              d--;
          for (; 1 <= f && 0 <= d; f--, d--)
            if (v[f] !== x[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, 0 > d || v[f] !== x[d]) {
                    var B = `
` + v[f].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && ys.set(e, B), B;
                  }
                while (1 <= f && 0 <= d);
              break;
            }
        }
      } finally {
        Co = !1, C.H = i, ov(), Error.prepareStackTrace = a;
      }
      return v = (v = e ? e.displayName || e.name : "") ? Gt(v) : "", typeof e == "function" && ys.set(e, v), v;
    }
    function Dl(e) {
      var t = Error.prepareStackTrace;
      if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith(`Error: react-stack-top-frame
`) && (e = e.slice(29)), t = e.indexOf(`
`), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react-stack-bottom-frame"), t !== -1 && (t = e.lastIndexOf(
        `
`,
        t
      )), t !== -1)
        e = e.slice(0, t);
      else return "";
      return e;
    }
    function Bc(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return Gt(e.type);
        case 16:
          return Gt("Lazy");
        case 13:
          return Gt("Suspense");
        case 19:
          return Gt("SuspenseList");
        case 0:
        case 15:
          return Jt(e.type, !1);
        case 11:
          return Jt(e.type.render, !1);
        case 1:
          return Jt(e.type, !0);
        case 31:
          return Gt("Activity");
        default:
          return "";
      }
    }
    function ws(e) {
      try {
        var t = "";
        do {
          t += Bc(e);
          var a = e._debugInfo;
          if (a)
            for (var i = a.length - 1; 0 <= i; i--) {
              var o = a[i];
              if (typeof o.name == "string") {
                var f = t, d = o.env, h = Gt(
                  o.name + (d ? " [" + d + "]" : "")
                );
                t = f + h;
              }
            }
          e = e.return;
        } while (e);
        return t;
      } catch (p) {
        return `
Error generating stack: ` + p.message + `
` + p.stack;
      }
    }
    function f0(e) {
      return (e = e ? e.displayName || e.name : "") ? Gt(e) : "";
    }
    function Zs() {
      if (fa === null) return null;
      var e = fa._debugOwner;
      return e != null ? Al(e) : null;
    }
    function s0() {
      if (fa === null) return "";
      var e = fa;
      try {
        var t = "";
        switch (e.tag === 6 && (e = e.return), e.tag) {
          case 26:
          case 27:
          case 5:
            t += Gt(e.type);
            break;
          case 13:
            t += Gt("Suspense");
            break;
          case 19:
            t += Gt("SuspenseList");
            break;
          case 31:
            t += Gt("Activity");
            break;
          case 30:
          case 0:
          case 15:
          case 1:
            e._debugOwner || t !== "" || (t += f0(
              e.type
            ));
            break;
          case 11:
            e._debugOwner || t !== "" || (t += f0(
              e.type.render
            ));
        }
        for (; e; )
          if (typeof e.tag == "number") {
            var a = e;
            e = a._debugOwner;
            var i = a._debugStack;
            e && i && (typeof i != "string" && (a._debugStack = i = Dl(i)), i !== "" && (t += `
` + i));
          } else if (e.debugStack != null) {
            var o = e.debugStack;
            (e = e.owner) && o && (t += `
` + Dl(o));
          } else break;
        var f = t;
      } catch (d) {
        f = `
Error generating stack: ` + d.message + `
` + d.stack;
      }
      return f;
    }
    function k(e, t, a, i, o, f, d) {
      var h = fa;
      tf(e);
      try {
        return e !== null && e._debugTask ? e._debugTask.run(
          t.bind(null, a, i, o, f, d)
        ) : t(a, i, o, f, d);
      } finally {
        tf(h);
      }
      throw Error(
        "runWithFiberInDEV should never be called in production. This is a bug in React."
      );
    }
    function tf(e) {
      C.getCurrentStack = e === null ? null : s0, Wl = !1, fa = e;
    }
    function el(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return We(e), e;
        default:
          return "";
      }
    }
    function Di(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function lf(e) {
      var t = Di(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
        e.constructor.prototype,
        t
      );
      We(e[t]);
      var i = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
        var o = a.get, f = a.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(d) {
            We(d), i = "" + d, f.call(this, d);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        }), {
          getValue: function() {
            return i;
          },
          setValue: function(d) {
            We(d), i = "" + d;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function kn(e) {
      e._valueTracker || (e._valueTracker = lf(e));
    }
    function Vt(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var a = t.getValue(), i = "";
      return e && (i = Di(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== a ? (t.setValue(e), !0) : !1;
    }
    function af(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function ea(e) {
      return e.replace(
        Ov,
        function(t) {
          return "\\" + t.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function Cu(e, t) {
      t.checked === void 0 || t.defaultChecked === void 0 || rm || (console.error(
        "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Zs() || "A component",
        t.type
      ), rm = !0), t.value === void 0 || t.defaultValue === void 0 || sm || (console.error(
        "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Zs() || "A component",
        t.type
      ), sm = !0);
    }
    function Nu(e, t, a, i, o, f, d, h) {
      e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? (le(d, "type"), e.type = d) : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + el(t)) : e.value !== "" + el(t) && (e.value = "" + el(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? Ls(e, d, el(t)) : a != null ? Ls(e, d, el(a)) : i != null && e.removeAttribute("value"), o == null && f != null && (e.defaultChecked = !!f), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? (le(h, "name"), e.name = "" + el(h)) : e.removeAttribute("name");
    }
    function r0(e, t, a, i, o, f, d, h) {
      if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (le(f, "type"), e.type = f), t != null || a != null) {
        if (!(f !== "submit" && f !== "reset" || t != null))
          return;
        a = a != null ? "" + el(a) : "", t = t != null ? "" + el(t) : a, h || t === e.value || (e.value = t), e.defaultValue = t;
      }
      i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = h ? e.checked : !!i, e.defaultChecked = !!i, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (le(d, "name"), e.name = d);
    }
    function Ls(e, t, a) {
      t === "number" && af(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function yh(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? is.Children.forEach(t.children, function(a) {
        a == null || typeof a == "string" || typeof a == "number" || typeof a == "bigint" || hm || (hm = !0, console.error(
          "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
        ));
      }) : t.dangerouslySetInnerHTML == null || xd || (xd = !0, console.error(
        "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
      ))), t.selected == null || dm || (console.error(
        "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
      ), dm = !0);
    }
    function d0() {
      var e = Zs();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    function Wn(e, t, a, i) {
      if (e = e.options, t) {
        t = {};
        for (var o = 0; o < a.length; o++)
          t["$" + a[o]] = !0;
        for (a = 0; a < e.length; a++)
          o = t.hasOwnProperty("$" + e[a].value), e[a].selected !== o && (e[a].selected = o), o && i && (e[a].defaultSelected = !0);
      } else {
        for (a = "" + el(a), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === a) {
            e[o].selected = !0, i && (e[o].defaultSelected = !0);
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function nf(e, t) {
      for (e = 0; e < ms.length; e++) {
        var a = ms[e];
        if (t[a] != null) {
          var i = he(t[a]);
          t.multiple && !i ? console.error(
            "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
            a,
            d0()
          ) : !t.multiple && i && console.error(
            "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
            a,
            d0()
          );
        }
      }
      t.value === void 0 || t.defaultValue === void 0 || ym || (console.error(
        "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
      ), ym = !0);
    }
    function an(e, t) {
      t.value === void 0 || t.defaultValue === void 0 || hp || (console.error(
        "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
        Zs() || "A component"
      ), hp = !0), t.children != null && t.value == null && console.error(
        "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
      );
    }
    function Js(e, t, a) {
      if (t != null && (t = "" + el(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + el(a) : "";
    }
    function mh(e, t, a, i) {
      if (t == null) {
        if (i != null) {
          if (a != null)
            throw Error(
              "If you supply `defaultValue` on a <textarea>, do not pass children."
            );
          if (he(i)) {
            if (1 < i.length)
              throw Error("<textarea> can only have at most one child.");
            i = i[0];
          }
          a = i;
        }
        a == null && (a = ""), t = a;
      }
      a = el(t), e.defaultValue = a, i = e.textContent, i === a && i !== "" && i !== null && (e.value = i);
    }
    function Ri(e, t) {
      return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? Ri(e.children[0], t) : e;
    }
    function Rl(e) {
      return "  " + "  ".repeat(e);
    }
    function Bu(e) {
      return "+ " + "  ".repeat(e);
    }
    function Oi(e) {
      return "- " + "  ".repeat(e);
    }
    function ph(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return e.type;
        case 16:
          return "Lazy";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 0:
        case 15:
          return e = e.type, e.displayName || e.name || null;
        case 11:
          return e = e.type.render, e.displayName || e.name || null;
        case 1:
          return e = e.type, e.displayName || e.name || null;
        default:
          return null;
      }
    }
    function yl(e, t) {
      return yp.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? '{"..."}' : "{" + e.slice(0, t - 7) + '..."}' : "{" + e + "}") : e.length > t ? 5 > t ? '{"..."}' : e.slice(0, t - 3) + "..." : e;
    }
    function uf(e, t, a) {
      var i = 120 - 2 * a;
      if (t === null)
        return Bu(a) + yl(e, i) + `
`;
      if (typeof t == "string") {
        for (var o = 0; o < t.length && o < e.length && t.charCodeAt(o) === e.charCodeAt(o); o++) ;
        return o > i - 8 && 10 < o && (e = "..." + e.slice(o - 8), t = "..." + t.slice(o - 8)), Bu(a) + yl(e, i) + `
` + Oi(a) + yl(t, i) + `
`;
      }
      return Rl(a) + yl(e, i) + `
`;
    }
    function vh(e) {
      return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(t, a) {
        return a;
      });
    }
    function qu(e, t) {
      switch (typeof e) {
        case "string":
          return e = JSON.stringify(e), e.length > t ? 5 > t ? '"..."' : e.slice(0, t - 4) + '..."' : e;
        case "object":
          if (e === null) return "null";
          if (he(e)) return "[...]";
          if (e.$$typeof === oi)
            return (t = Ke(e.type)) ? "<" + t + ">" : "<...>";
          var a = vh(e);
          if (a === "Object") {
            a = "", t -= 2;
            for (var i in e)
              if (e.hasOwnProperty(i)) {
                var o = JSON.stringify(i);
                if (o !== '"' + i + '"' && (i = o), t -= i.length - 2, o = qu(
                  e[i],
                  15 > t ? t : 15
                ), t -= o.length, 0 > t) {
                  a += a === "" ? "..." : ", ...";
                  break;
                }
                a += (a === "" ? "" : ",") + i + ":" + o;
              }
            return "{" + a + "}";
          }
          return a;
        case "function":
          return (t = e.displayName || e.name) ? "function " + t : "function";
        default:
          return String(e);
      }
    }
    function Mi(e, t) {
      return typeof e != "string" || yp.test(e) ? "{" + qu(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? '"..."' : '"' + e.slice(0, t - 5) + '..."' : '"' + e + '"';
    }
    function qc(e, t, a) {
      var i = 120 - a.length - e.length, o = [], f;
      for (f in t)
        if (t.hasOwnProperty(f) && f !== "children") {
          var d = Mi(
            t[f],
            120 - a.length - f.length - 1
          );
          i -= f.length + d.length + 2, o.push(f + "=" + d);
        }
      return o.length === 0 ? a + "<" + e + `>
` : 0 < i ? a + "<" + e + " " + o.join(" ") + `>
` : a + "<" + e + `
` + a + "  " + o.join(`
` + a + "  ") + `
` + a + `>
`;
    }
    function fv(e, t, a) {
      var i = "", o = Ee({}, t), f;
      for (f in e)
        if (e.hasOwnProperty(f)) {
          delete o[f];
          var d = 120 - 2 * a - f.length - 2, h = qu(e[f], d);
          t.hasOwnProperty(f) ? (d = qu(t[f], d), i += Bu(a) + f + ": " + h + `
`, i += Oi(a) + f + ": " + d + `
`) : i += Bu(a) + f + ": " + h + `
`;
        }
      for (var p in o)
        o.hasOwnProperty(p) && (e = qu(
          o[p],
          120 - 2 * a - p.length - 2
        ), i += Oi(a) + p + ": " + e + `
`);
      return i;
    }
    function pa(e, t, a, i) {
      var o = "", f = /* @__PURE__ */ new Map();
      for (v in a)
        a.hasOwnProperty(v) && f.set(
          v.toLowerCase(),
          v
        );
      if (f.size === 1 && f.has("children"))
        o += qc(
          e,
          t,
          Rl(i)
        );
      else {
        for (var d in t)
          if (t.hasOwnProperty(d) && d !== "children") {
            var h = 120 - 2 * (i + 1) - d.length - 1, p = f.get(d.toLowerCase());
            if (p !== void 0) {
              f.delete(d.toLowerCase());
              var v = t[d];
              p = a[p];
              var x = Mi(
                v,
                h
              );
              h = Mi(
                p,
                h
              ), typeof v == "object" && v !== null && typeof p == "object" && p !== null && vh(v) === "Object" && vh(p) === "Object" && (2 < Object.keys(v).length || 2 < Object.keys(p).length || -1 < x.indexOf("...") || -1 < h.indexOf("...")) ? o += Rl(i + 1) + d + `={{
` + fv(
                v,
                p,
                i + 2
              ) + Rl(i + 1) + `}}
` : (o += Bu(i + 1) + d + "=" + x + `
`, o += Oi(i + 1) + d + "=" + h + `
`);
            } else
              o += Rl(i + 1) + d + "=" + Mi(t[d], h) + `
`;
          }
        f.forEach(function(B) {
          if (B !== "children") {
            var O = 120 - 2 * (i + 1) - B.length - 1;
            o += Oi(i + 1) + B + "=" + Mi(a[B], O) + `
`;
          }
        }), o = o === "" ? Rl(i) + "<" + e + `>
` : Rl(i) + "<" + e + `
` + o + Rl(i) + `>
`;
      }
      return e = a.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (f = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (f = "" + t), o += uf(f, "" + e, i + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (o = e == null ? o + uf("" + t, null, i + 1) : o + uf("" + t, void 0, i + 1)), o;
    }
    function Ks(e, t) {
      var a = ph(e);
      if (a === null) {
        for (a = "", e = e.child; e; )
          a += Ks(e, t), e = e.sibling;
        return a;
      }
      return Rl(t) + "<" + a + `>
`;
    }
    function $s(e, t) {
      var a = Ri(e, t);
      if (a !== e && (e.children.length !== 1 || e.children[0] !== a))
        return Rl(t) + `...
` + $s(a, t + 1);
      a = "";
      var i = e.fiber._debugInfo;
      if (i)
        for (var o = 0; o < i.length; o++) {
          var f = i[o].name;
          typeof f == "string" && (a += Rl(t) + "<" + f + `>
`, t++);
        }
      if (i = "", o = e.fiber.pendingProps, e.fiber.tag === 6)
        i = uf(o, e.serverProps, t), t++;
      else if (f = ph(e.fiber), f !== null)
        if (e.serverProps === void 0) {
          i = t;
          var d = 120 - 2 * i - f.length - 2, h = "";
          for (v in o)
            if (o.hasOwnProperty(v) && v !== "children") {
              var p = Mi(o[v], 15);
              if (d -= v.length + p.length + 2, 0 > d) {
                h += " ...";
                break;
              }
              h += " " + v + "=" + p;
            }
          i = Rl(i) + "<" + f + h + `>
`, t++;
        } else
          e.serverProps === null ? (i = qc(
            f,
            o,
            Bu(t)
          ), t++) : typeof e.serverProps == "string" ? console.error(
            "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
          ) : (i = pa(
            f,
            o,
            e.serverProps,
            t
          ), t++);
      var v = "";
      for (o = e.fiber.child, f = 0; o && f < e.children.length; )
        d = e.children[f], d.fiber === o ? (v += $s(d, t), f++) : v += Ks(o, t), o = o.sibling;
      for (o && 0 < e.children.length && (v += Rl(t) + `...
`), o = e.serverTail, e.serverProps === null && t--, e = 0; e < o.length; e++)
        f = o[e], v = typeof f == "string" ? v + (Oi(t) + yl(f, 120 - 2 * t) + `
`) : v + qc(
          f.type,
          f.props,
          Oi(t)
        );
      return a + i + v;
    }
    function cf(e) {
      try {
        return `

` + $s(e, 0);
      } catch {
        return "";
      }
    }
    function Ui(e, t, a) {
      for (var i = t, o = null, f = 0; i; )
        i === e && (f = 0), o = {
          fiber: i,
          children: o !== null ? [o] : [],
          serverProps: i === t ? a : i === e ? null : void 0,
          serverTail: [],
          distanceFromLeaf: f
        }, f++, i = i.return;
      return o !== null ? cf(o).replaceAll(/^[+-]/gm, ">") : "";
    }
    function gh(e, t) {
      var a = Ee({}, e || vm), i = { tag: t };
      return Hd.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), Cd.indexOf(t) !== -1 && (a.pTagInButtonScope = null), mm.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), t === "#document" || t === "html" ? a.containerTagInScope = null : a.containerTagInScope || (a.containerTagInScope = i), e !== null || t !== "#document" && t !== "html" && t !== "body" ? a.implicitRootScope === !0 && (a.implicitRootScope = !1) : a.implicitRootScope = !0, a;
    }
    function bh(e, t, a) {
      switch (t) {
        case "select":
          return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
        case "optgroup":
          return e === "option" || e === "#text";
        case "option":
          return e === "#text";
        case "tr":
          return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return e === "tr" || e === "style" || e === "script" || e === "template";
        case "colgroup":
          return e === "col" || e === "template";
        case "table":
          return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
        case "head":
          return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
        case "html":
          if (a) break;
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          if (!a) return e === "html";
      }
      switch (e) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
        case "rp":
        case "rt":
          return pm.indexOf(t) === -1;
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return t == null;
        case "head":
          return a || t === null;
        case "html":
          return a && t === "#document" || t === null;
        case "body":
          return a && (t === "#document" || t === "html") || t === null;
      }
      return !0;
    }
    function Yc(e, t) {
      switch (e) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t.pTagInButtonScope;
        case "form":
          return t.formTag || t.pTagInButtonScope;
        case "li":
          return t.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return t.dlItemTagAutoclosing;
        case "button":
          return t.buttonTagInScope;
        case "a":
          return t.aTagInScope;
        case "nobr":
          return t.nobrTagInScope;
      }
      return null;
    }
    function h0(e, t) {
      for (; e; ) {
        switch (e.tag) {
          case 5:
          case 26:
          case 27:
            if (e.type === t) return e;
        }
        e = e.return;
      }
      return null;
    }
    function ks(e, t) {
      t = t || vm;
      var a = t.current;
      if (t = (a = bh(
        e,
        a && a.tag,
        t.implicitRootScope
      ) ? null : a) ? null : Yc(e, t), t = a || t, !t) return !0;
      var i = t.tag;
      if (t = String(!!a) + "|" + e + "|" + i, No[t]) return !1;
      No[t] = !0;
      var o = (t = fa) ? h0(t.return, i) : null, f = t !== null && o !== null ? Ui(o, t, null) : "", d = "<" + e + ">";
      return a ? (a = "", i === "table" && e === "tr" && (a += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
        `In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,
        d,
        i,
        a,
        f
      )) : console.error(
        `In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,
        d,
        i,
        f
      ), t && (e = t.return, o === null || e === null || o === e && e._debugOwner === t._debugOwner || k(o, function() {
        console.error(
          `<%s> cannot contain a nested %s.
See this log for the ancestor stack trace.`,
          i,
          d
        );
      })), !1;
    }
    function of(e, t, a) {
      if (a || bh("#text", t, !1))
        return !0;
      if (a = "#text|" + t, No[a]) return !1;
      No[a] = !0;
      var i = (a = fa) ? h0(a, t) : null;
      return a = a !== null && i !== null ? Ui(
        i,
        a,
        a.tag !== 6 ? { children: null } : null
      ) : "", /\S/.test(e) ? console.error(
        `In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,
        t,
        a
      ) : console.error(
        `In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,
        t,
        a
      ), !1;
    }
    function xi(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === 3) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    function sv(e) {
      return e.replace(mi, function(t, a) {
        return a.toUpperCase();
      });
    }
    function y0(e, t, a) {
      var i = t.indexOf("--") === 0;
      i || (-1 < t.indexOf("-") ? mc.hasOwnProperty(t) && mc[t] || (mc[t] = !0, console.error(
        "Unsupported style property %s. Did you mean %s?",
        t,
        sv(t.replace(vs, "ms-"))
      )) : ps.test(t) ? mc.hasOwnProperty(t) && mc[t] || (mc[t] = !0, console.error(
        "Unsupported vendor-prefixed style property %s. Did you mean %s?",
        t,
        t.charAt(0).toUpperCase() + t.slice(1)
      )) : !mp.test(a) || pc.hasOwnProperty(a) && pc[a] || (pc[a] = !0, console.error(
        `Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,
        t,
        a.replace(mp, "")
      )), typeof a == "number" && (isNaN(a) ? pp || (pp = !0, console.error(
        "`NaN` is an invalid value for the `%s` css style property.",
        t
      )) : isFinite(a) || gm || (gm = !0, console.error(
        "`Infinity` is an invalid value for the `%s` css style property.",
        t
      )))), a == null || typeof a == "boolean" || a === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, a) : typeof a != "number" || a === 0 || gs.has(t) ? t === "float" ? e.cssFloat = a : (Ye(a, t), e[t] = ("" + a).trim()) : e[t] = a + "px";
    }
    function ff(e, t, a) {
      if (t != null && typeof t != "object")
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      if (t && Object.freeze(t), e = e.style, a != null) {
        if (t) {
          var i = {};
          if (a) {
            for (var o in a)
              if (a.hasOwnProperty(o) && !t.hasOwnProperty(o))
                for (var f = Bn[o] || [o], d = 0; d < f.length; d++)
                  i[f[d]] = o;
          }
          for (var h in t)
            if (t.hasOwnProperty(h) && (!a || a[h] !== t[h]))
              for (o = Bn[h] || [h], f = 0; f < o.length; f++)
                i[o[f]] = h;
          h = {};
          for (var p in t)
            for (o = Bn[p] || [p], f = 0; f < o.length; f++)
              h[o[f]] = p;
          p = {};
          for (var v in i)
            if (o = i[v], (f = h[v]) && o !== f && (d = o + "," + f, !p[d])) {
              p[d] = !0, d = console;
              var x = t[o];
              d.error.call(
                d,
                "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                x == null || typeof x == "boolean" || x === "" ? "Removing" : "Updating",
                o,
                f
              );
            }
        }
        for (var B in a)
          !a.hasOwnProperty(B) || t != null && t.hasOwnProperty(B) || (B.indexOf("--") === 0 ? e.setProperty(B, "") : B === "float" ? e.cssFloat = "" : e[B] = "");
        for (var O in t)
          v = t[O], t.hasOwnProperty(O) && a[O] !== v && y0(e, O, v);
      } else
        for (i in t)
          t.hasOwnProperty(i) && y0(e, i, t[i]);
    }
    function Hi(e) {
      if (e.indexOf("-") === -1) return !1;
      switch (e) {
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
    function Ws(e) {
      return Nd.get(e) || e;
    }
    function Gc(e, t) {
      if (vu.call(qn, t) && qn[t])
        return !0;
      if (Bd.test(t)) {
        if (e = "aria-" + t.slice(4).toLowerCase(), e = bm.hasOwnProperty(e) ? e : null, e == null)
          return console.error(
            "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
            t
          ), qn[t] = !0;
        if (t !== e)
          return console.error(
            "Invalid ARIA attribute `%s`. Did you mean `%s`?",
            t,
            e
          ), qn[t] = !0;
      }
      if (Sm.test(t)) {
        if (e = t.toLowerCase(), e = bm.hasOwnProperty(e) ? e : null, e == null) return qn[t] = !0, !1;
        t !== e && (console.error(
          "Unknown ARIA attribute `%s`. Did you mean `%s`?",
          t,
          e
        ), qn[t] = !0);
      }
      return !0;
    }
    function Vc(e, t) {
      var a = [], i;
      for (i in t)
        Gc(e, i) || a.push(i);
      t = a.map(function(o) {
        return "`" + o + "`";
      }).join(", "), a.length === 1 ? console.error(
        "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      ) : 1 < a.length && console.error(
        "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      );
    }
    function m0(e, t, a, i) {
      if (vu.call(Hl, t) && Hl[t])
        return !0;
      var o = t.toLowerCase();
      if (o === "onfocusin" || o === "onfocusout")
        return console.error(
          "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
        ), Hl[t] = !0;
      if (typeof a == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction"))
        return !0;
      if (i != null) {
        if (e = i.possibleRegistrationNames, i.registrationNameDependencies.hasOwnProperty(t))
          return !0;
        if (i = e.hasOwnProperty(o) ? e[o] : null, i != null)
          return console.error(
            "Invalid event handler property `%s`. Did you mean `%s`?",
            t,
            i
          ), Hl[t] = !0;
        if (Ss.test(t))
          return console.error(
            "Unknown event handler property `%s`. It will be ignored.",
            t
          ), Hl[t] = !0;
      } else if (Ss.test(t))
        return l.test(t) && console.error(
          "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
          t
        ), Hl[t] = !0;
      if (n.test(t) || u.test(t)) return !0;
      if (o === "innerhtml")
        return console.error(
          "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
        ), Hl[t] = !0;
      if (o === "aria")
        return console.error(
          "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
        ), Hl[t] = !0;
      if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
        return console.error(
          "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
          typeof a
        ), Hl[t] = !0;
      if (typeof a == "number" && isNaN(a))
        return console.error(
          "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
          t
        ), Hl[t] = !0;
      if (vc.hasOwnProperty(o)) {
        if (o = vc[o], o !== t)
          return console.error(
            "Invalid DOM property `%s`. Did you mean `%s`?",
            t,
            o
          ), Hl[t] = !0;
      } else if (t !== o)
        return console.error(
          "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
          t,
          o
        ), Hl[t] = !0;
      switch (t) {
        case "dangerouslySetInnerHTML":
        case "children":
        case "style":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          return !0;
        case "innerText":
        case "textContent":
          return !0;
      }
      switch (typeof a) {
        case "boolean":
          switch (t) {
            case "autoFocus":
            case "checked":
            case "multiple":
            case "muted":
            case "selected":
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
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
            case "capture":
            case "download":
            case "inert":
              return !0;
            default:
              return o = t.toLowerCase().slice(0, 5), o === "data-" || o === "aria-" ? !0 : (a ? console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                a,
                t,
                t,
                a,
                t
              ) : console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                a,
                t,
                t,
                a,
                t,
                t,
                t
              ), Hl[t] = !0);
          }
        case "function":
        case "symbol":
          return Hl[t] = !0, !1;
        case "string":
          if (a === "false" || a === "true") {
            switch (t) {
              case "checked":
              case "selected":
              case "multiple":
              case "muted":
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
              case "inert":
                break;
              default:
                return !0;
            }
            console.error(
              "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
              a,
              t,
              a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
              t,
              a
            ), Hl[t] = !0;
          }
      }
      return !0;
    }
    function Sh(e, t, a) {
      var i = [], o;
      for (o in t)
        m0(e, o, t[o], a) || i.push(o);
      t = i.map(function(f) {
        return "`" + f + "`";
      }).join(", "), i.length === 1 ? console.error(
        "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      ) : 1 < i.length && console.error(
        "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      );
    }
    function _c(e) {
      return c.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function Ci(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    function nn(e) {
      var t = Pl(e);
      if (t && (e = t.stateNode)) {
        var a = e[kl] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (Nu(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (le(t, "name"), a = a.querySelectorAll(
                'input[name="' + ea(
                  "" + t
                ) + '"][type="radio"]'
              ), t = 0; t < a.length; t++) {
                var i = a[t];
                if (i !== e && i.form === e.form) {
                  var o = i[kl] || null;
                  if (!o)
                    throw Error(
                      "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                    );
                  Nu(
                    i,
                    o.value,
                    o.defaultValue,
                    o.defaultValue,
                    o.checked,
                    o.defaultChecked,
                    o.type,
                    o.name
                  );
                }
              }
              for (t = 0; t < a.length; t++)
                i = a[t], i.form === e.form && Vt(i);
            }
            break e;
          case "textarea":
            Js(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && Wn(e, !!a.multiple, t, !1);
        }
      }
    }
    function Fs(e, t, a) {
      if (m) return e(t, a);
      m = !0;
      try {
        var i = e(t);
        return i;
      } finally {
        if (m = !1, (r !== null || y !== null) && (ac(), r && (t = r, e = y, y = r = null, nn(t), e)))
          for (t = 0; t < e.length; t++) nn(e[t]);
      }
    }
    function Fn(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var i = a[kl] || null;
      if (i === null) return null;
      a = i[t];
      e: switch (t) {
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
          (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (a && typeof a != "function")
        throw Error(
          "Expected `" + t + "` listener to be a function, instead got a value of `" + typeof a + "` type."
        );
      return a;
    }
    function In() {
      if (H) return H;
      var e, t = M, a = t.length, i, o = "value" in X ? X.value : X.textContent, f = o.length;
      for (e = 0; e < a && t[e] === o[e]; e++) ;
      var d = a - e;
      for (i = 1; i <= d && t[a - i] === o[f - i]; i++) ;
      return H = o.slice(e, 1 < i ? 1 - i : void 0);
    }
    function Xc(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Ni() {
      return !0;
    }
    function Th() {
      return !1;
    }
    function tl(e) {
      function t(a, i, o, f, d) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = f, this.target = d, this.currentTarget = null;
        for (var h in e)
          e.hasOwnProperty(h) && (a = e[h], this[h] = a ? a(f) : f[h]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Ni : Th, this.isPropagationStopped = Th, this;
      }
      return Ee(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Ni);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Ni);
        },
        persist: function() {
        },
        isPersistent: Ni
      }), t;
    }
    function Is(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = $b[e]) ? !!t[e] : !1;
    }
    function Ps() {
      return Is;
    }
    function Ol(e, t) {
      switch (e) {
        case "keyup":
          return iS.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Bg;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Yu(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    function er(e, t) {
      switch (e) {
        case "compositionend":
          return Yu(t);
        case "keypress":
          return t.which !== Yg ? null : (Vg = !0, Gg);
        case "textInput":
          return e = t.data, e === Gg && Vg ? null : e;
        default:
          return null;
      }
    }
    function sf(e, t) {
      if (qd)
        return e === "compositionend" || !Uv && Ol(e, t) ? (e = In(), H = M = X = null, qd = !1, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return qg && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    function p0(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!oS[e.type] : t === "textarea";
    }
    function Ah(e) {
      if (!g) return !1;
      e = "on" + e;
      var t = e in document;
      return t || (t = document.createElement("div"), t.setAttribute(e, "return;"), t = typeof t[e] == "function"), t;
    }
    function tr(e, t, a, i) {
      r ? y ? y.push(i) : y = [i] : r = i, t = Ff(t, "onChange"), 0 < t.length && (a = new ee(
        "onChange",
        "change",
        null,
        a,
        i
      ), e.push({ event: a, listeners: t }));
    }
    function rf(e) {
      Rn(e, 0);
    }
    function Bi(e) {
      var t = Uu(e);
      if (Vt(t)) return e;
    }
    function Eh(e, t) {
      if (e === "change") return t;
    }
    function v0() {
      Em && (Em.detachEvent("onpropertychange", g0), zm = Em = null);
    }
    function g0(e) {
      if (e.propertyName === "value" && Bi(zm)) {
        var t = [];
        tr(
          t,
          zm,
          e,
          Ci(e)
        ), Fs(rf, t);
      }
    }
    function rv(e, t, a) {
      e === "focusin" ? (v0(), Em = t, zm = a, Em.attachEvent("onpropertychange", g0)) : e === "focusout" && v0();
    }
    function zh(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Bi(zm);
    }
    function dv(e, t) {
      if (e === "click") return Bi(t);
    }
    function hv(e, t) {
      if (e === "input" || e === "change")
        return Bi(t);
    }
    function yv(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    function df(e, t) {
      if (sa(e, t)) return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length) return !1;
      for (i = 0; i < a.length; i++) {
        var o = a[i];
        if (!vu.call(t, o) || !sa(e[o], t[o]))
          return !1;
      }
      return !0;
    }
    function b0(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Dh(e, t) {
      var a = b0(e);
      e = 0;
      for (var i; a; ) {
        if (a.nodeType === 3) {
          if (i = e + a.textContent.length, e <= t && i >= t)
            return { node: a, offset: t - e };
          e = i;
        }
        e: {
          for (; a; ) {
            if (a.nextSibling) {
              a = a.nextSibling;
              break e;
            }
            a = a.parentNode;
          }
          a = void 0;
        }
        a = b0(a);
      }
    }
    function S0(e, t) {
      return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? S0(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
    }
    function T0(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = af(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = !1;
        }
        if (a) e = t.contentWindow;
        else break;
        t = af(e.document);
      }
      return t;
    }
    function Rh(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function A0(e, t, a) {
      var i = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      Hv || Yd == null || Yd !== af(i) || (i = Yd, "selectionStart" in i && Rh(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      }), Dm && df(Dm, i) || (Dm = i, i = Ff(xv, "onSelect"), 0 < i.length && (t = new ee(
        "onSelect",
        "select",
        null,
        t,
        a
      ), e.push({ event: t, listeners: i }), t.target = Yd)));
    }
    function Pn(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    function qi(e) {
      if (Cv[e]) return Cv[e];
      if (!Gd[e]) return e;
      var t = Gd[e], a;
      for (a in t)
        if (t.hasOwnProperty(a) && a in Xg)
          return Cv[e] = t[a];
      return e;
    }
    function Ga(e, t) {
      Lg.set(e, t), xu(t, [e]);
    }
    function ta(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = Bv.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: ws(t)
        }, Bv.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: ws(t)
      };
    }
    function hf() {
      for (var e = Vd, t = qv = Vd = 0; t < e; ) {
        var a = Yn[t];
        Yn[t++] = null;
        var i = Yn[t];
        Yn[t++] = null;
        var o = Yn[t];
        Yn[t++] = null;
        var f = Yn[t];
        if (Yn[t++] = null, i !== null && o !== null) {
          var d = i.pending;
          d === null ? o.next = o : (o.next = d.next, d.next = o), i.pending = o;
        }
        f !== 0 && E0(a, o, f);
      }
    }
    function lr(e, t, a, i) {
      Yn[Vd++] = e, Yn[Vd++] = t, Yn[Vd++] = a, Yn[Vd++] = i, qv |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
    }
    function Oh(e, t, a, i) {
      return lr(e, t, a, i), ar(e);
    }
    function Gl(e, t) {
      return lr(e, null, null, t), ar(e);
    }
    function E0(e, t, a) {
      e.lanes |= a;
      var i = e.alternate;
      i !== null && (i.lanes |= a);
      for (var o = !1, f = e.return; f !== null; )
        f.childLanes |= a, i = f.alternate, i !== null && (i.childLanes |= a), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & vp || (o = !0)), e = f, f = f.return;
      return e.tag === 3 ? (f = e.stateNode, o && t !== null && (o = 31 - gl(a), e = f.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = a | 536870912), f) : null;
    }
    function ar(e) {
      if (Km > HS)
        throw Ns = Km = 0, $m = rg = null, Error(
          "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
        );
      Ns > CS && (Ns = 0, $m = null, console.error(
        "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
      )), e.alternate === null && e.flags & 4098 && ka(e);
      for (var t = e, a = t.return; a !== null; )
        t.alternate === null && t.flags & 4098 && ka(e), t = a, a = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    function Yi(e) {
      if (Gn === null) return e;
      var t = Gn(e);
      return t === void 0 ? e : t.current;
    }
    function Mh(e) {
      if (Gn === null) return e;
      var t = Gn(e);
      return t === void 0 ? e != null && typeof e.render == "function" && (t = Yi(e.render), e.render !== t) ? (t = { $$typeof: mu, render: t }, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
    }
    function z0(e, t) {
      if (Gn === null) return !1;
      var a = e.elementType;
      t = t.type;
      var i = !1, o = typeof t == "object" && t !== null ? t.$$typeof : null;
      switch (e.tag) {
        case 1:
          typeof t == "function" && (i = !0);
          break;
        case 0:
          (typeof t == "function" || o === oa) && (i = !0);
          break;
        case 11:
          (o === mu || o === oa) && (i = !0);
          break;
        case 14:
        case 15:
          (o === os || o === oa) && (i = !0);
          break;
        default:
          return !1;
      }
      return !!(i && (e = Gn(a), e !== void 0 && e === Gn(t)));
    }
    function D0(e) {
      Gn !== null && typeof WeakSet == "function" && (_d === null && (_d = /* @__PURE__ */ new WeakSet()), _d.add(e));
    }
    function yf(e, t, a) {
      var i = e.alternate, o = e.child, f = e.sibling, d = e.tag, h = e.type, p = null;
      switch (d) {
        case 0:
        case 15:
        case 1:
          p = h;
          break;
        case 11:
          p = h.render;
      }
      if (Gn === null)
        throw Error("Expected resolveFamily to be set during hot reload.");
      var v = !1;
      h = !1, p !== null && (p = Gn(p), p !== void 0 && (a.has(p) ? h = !0 : t.has(p) && (d === 1 ? h = !0 : v = !0))), _d !== null && (_d.has(e) || i !== null && _d.has(i)) && (h = !0), h && (e._debugNeedsRemount = !0), (h || v) && (i = Gl(e, 2), i !== null && Tt(i, e, 2)), o === null || h || yf(
        o,
        t,
        a
      ), f !== null && yf(
        f,
        t,
        a
      );
    }
    function mf(e, t, a, i) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Kg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
    }
    function Uh(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function un(e, t) {
      var a = e.alternate;
      switch (a === null ? (a = oe(
        e.tag,
        t,
        e.key,
        e.mode
      ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugOwner = e._debugOwner, a._debugStack = e._debugStack, a._debugTask = e._debugTask, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null, a.actualDuration = -0, a.actualStartTime = -1.1), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugInfo = e._debugInfo, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case 0:
        case 15:
          a.type = Yi(e.type);
          break;
        case 1:
          a.type = Yi(e.type);
          break;
        case 11:
          a.type = Mh(e.type);
      }
      return a;
    }
    function xh(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration), e;
    }
    function nr(e, t, a, i, o, f) {
      var d = 0, h = e;
      if (typeof e == "function")
        Uh(e) && (d = 1), h = Yi(h);
      else if (typeof e == "string")
        d = E(), d = So(e, a, d) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else
        e: switch (e) {
          case am:
            return t = oe(31, a, t, o), t.elementType = am, t.lanes = f, t;
          case ge:
            return Gu(
              a.children,
              o,
              f,
              t
            );
          case Ao:
            d = 8, o |= Fl, o |= Au;
            break;
          case Eo:
            return e = a, i = o, typeof e.id != "string" && console.error(
              'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
              typeof e.id
            ), t = oe(12, e, t, i | Cl), t.elementType = Eo, t.lanes = f, t.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, t;
          case zo:
            return t = oe(13, a, t, o), t.elementType = zo, t.lanes = f, t;
          case fi:
            return t = oe(19, a, t, o), t.elementType = fi, t.lanes = f, t;
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case lm:
                case Ua:
                  d = 10;
                  break e;
                case bd:
                  d = 9;
                  break e;
                case mu:
                  d = 11, h = Mh(h);
                  break e;
                case os:
                  d = 14;
                  break e;
                case oa:
                  d = 16, h = null;
                  break e;
              }
            h = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? a = "null" : he(e) ? a = "array" : e !== void 0 && e.$$typeof === oi ? (a = "<" + (Ke(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : a = typeof e, (d = i ? Al(i) : null) && (h += `

Check the render method of \`` + d + "`."), d = 29, a = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (a + "." + h)
            ), h = null;
        }
      return t = oe(d, a, t, o), t.elementType = e, t.type = h, t.lanes = f, t._debugOwner = i, t;
    }
    function pf(e, t, a) {
      return t = nr(
        e.type,
        e.key,
        e.props,
        e._owner,
        t,
        a
      ), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
    }
    function Gu(e, t, a, i) {
      return e = oe(7, e, i, t), e.lanes = a, e;
    }
    function Vu(e, t, a) {
      return e = oe(6, e, null, t), e.lanes = a, e;
    }
    function Hh(e, t, a) {
      return t = oe(
        4,
        e.children !== null ? e.children : [],
        e.key,
        t
      ), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function Gi(e, t) {
      Va(), Xd[Qd++] = bp, Xd[Qd++] = gp, gp = e, bp = t;
    }
    function R0(e, t, a) {
      Va(), Vn[_n++] = bc, Vn[_n++] = Sc, Vn[_n++] = Ts, Ts = e;
      var i = bc;
      e = Sc;
      var o = 32 - gl(i) - 1;
      i &= ~(1 << o), a += 1;
      var f = 32 - gl(t) + o;
      if (30 < f) {
        var d = o - o % 5;
        f = (i & (1 << d) - 1).toString(32), i >>= d, o -= d, bc = 1 << 32 - gl(t) + o | a << o | i, Sc = f + e;
      } else
        bc = 1 << f | a << o | i, Sc = e;
    }
    function ur(e) {
      Va(), e.return !== null && (Gi(e, 1), R0(e, 1, 0));
    }
    function ir(e) {
      for (; e === gp; )
        gp = Xd[--Qd], Xd[Qd] = null, bp = Xd[--Qd], Xd[Qd] = null;
      for (; e === Ts; )
        Ts = Vn[--_n], Vn[_n] = null, Sc = Vn[--_n], Vn[_n] = null, bc = Vn[--_n], Vn[_n] = null;
    }
    function Va() {
      we || console.error(
        "Expected to be hydrating. This is a bug in React. Please file an issue."
      );
    }
    function _a(e, t) {
      if (e.return === null) {
        if (Xn === null)
          Xn = {
            fiber: e,
            children: [],
            serverProps: void 0,
            serverTail: [],
            distanceFromLeaf: t
          };
        else {
          if (Xn.fiber !== e)
            throw Error(
              "Saw multiple hydration diff roots in a pass. This is a bug in React."
            );
          Xn.distanceFromLeaf > t && (Xn.distanceFromLeaf = t);
        }
        return Xn;
      }
      var a = _a(
        e.return,
        t + 1
      ).children;
      return 0 < a.length && a[a.length - 1].fiber === e ? (a = a[a.length - 1], a.distanceFromLeaf > t && (a.distanceFromLeaf = t), a) : (t = {
        fiber: e,
        children: [],
        serverProps: void 0,
        serverTail: [],
        distanceFromLeaf: t
      }, a.push(t), t);
    }
    function Ch(e, t) {
      Tc || (e = _a(e, 0), e.serverProps = null, t !== null && (t = fd(t), e.serverTail.push(t)));
    }
    function cn(e) {
      var t = "", a = Xn;
      throw a !== null && (Xn = null, t = cf(a)), Qc(
        ta(
          Error(
            `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch` + t
          ),
          e
        )
      ), Yv;
    }
    function Nh(e) {
      var t = e.stateNode, a = e.type, i = e.memoizedProps;
      switch (t[bl] = e, t[kl] = i, On(a, i), a) {
        case "dialog":
          Me("cancel", t), Me("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          Me("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < km.length; a++)
            Me(km[a], t);
          break;
        case "source":
          Me("error", t);
          break;
        case "img":
        case "image":
        case "link":
          Me("error", t), Me("load", t);
          break;
        case "details":
          Me("toggle", t);
          break;
        case "input":
          Hu("input", i), Me("invalid", t), Cu(t, i), r0(
            t,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0
          ), kn(t);
          break;
        case "option":
          yh(t, i);
          break;
        case "select":
          Hu("select", i), Me("invalid", t), nf(t, i);
          break;
        case "textarea":
          Hu("textarea", i), Me("invalid", t), an(t, i), mh(
            t,
            i.value,
            i.defaultValue,
            i.children
          ), kn(t);
      }
      a = i.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || i.suppressHydrationWarning === !0 || qy(t.textContent, a) ? (i.popover != null && (Me("beforetoggle", t), Me("toggle", t)), i.onScroll != null && Me("scroll", t), i.onScrollEnd != null && Me("scrollend", t), i.onClick != null && (t.onclick = ru), t = !0) : t = !1, t || cn(e);
    }
    function Bh(e) {
      for (ra = e.return; ra; )
        switch (ra.tag) {
          case 5:
          case 13:
            vi = !1;
            return;
          case 27:
          case 3:
            vi = !0;
            return;
          default:
            ra = ra.return;
        }
    }
    function Vi(e) {
      if (e !== ra) return !1;
      if (!we)
        return Bh(e), we = !0, !1;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Mn(e.type, e.memoizedProps)), a = !a), a && Ct) {
        for (a = Ct; a; ) {
          var i = _a(e, 0), o = fd(a);
          i.serverTail.push(o), a = o.type === "Suspense" ? wy(a) : il(a.nextSibling);
        }
        cn(e);
      }
      if (Bh(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        Ct = wy(e);
      } else
        t === 27 ? (t = Ct, Un(e.type) ? (e = Eg, Eg = null, Ct = e) : Ct = t) : Ct = ra ? il(e.stateNode.nextSibling) : null;
      return !0;
    }
    function _i() {
      Ct = ra = null, Tc = we = !1;
    }
    function qh() {
      var e = As;
      return e !== null && (ya === null ? ya = e : ya.push.apply(
        ya,
        e
      ), As = null), e;
    }
    function Qc(e) {
      As === null ? As = [e] : As.push(e);
    }
    function Yh() {
      var e = Xn;
      if (e !== null) {
        Xn = null;
        for (var t = cf(e); 0 < e.children.length; )
          e = e.children[0];
        k(e.fiber, function() {
          console.error(
            `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s`,
            "https://react.dev/link/hydration-mismatch",
            t
          );
        });
      }
    }
    function cr() {
      jd = Sp = null, wd = !1;
    }
    function _u(e, t, a) {
      ze(Gv, t._currentValue, e), t._currentValue = a, ze(Vv, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Fg && console.error(
        "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
      ), t._currentRenderer = Fg;
    }
    function eu(e, t) {
      e._currentValue = Gv.current;
      var a = Vv.current;
      lt(Vv, t), e._currentRenderer = a, lt(Gv, t);
    }
    function Gh(e, t, a) {
      for (; e !== null; ) {
        var i = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === a) break;
        e = e.return;
      }
      e !== a && console.error(
        "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Vh(e, t, a, i) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var f = o.dependencies;
        if (f !== null) {
          var d = o.child;
          f = f.firstContext;
          e: for (; f !== null; ) {
            var h = f;
            f = o;
            for (var p = 0; p < t.length; p++)
              if (h.context === t[p]) {
                f.lanes |= a, h = f.alternate, h !== null && (h.lanes |= a), Gh(
                  f.return,
                  a,
                  e
                ), i || (d = null);
                break e;
              }
            f = h.next;
          }
        } else if (o.tag === 18) {
          if (d = o.return, d === null)
            throw Error(
              "We just came from a parent so we must have had a parent. This is a bug in React."
            );
          d.lanes |= a, f = d.alternate, f !== null && (f.lanes |= a), Gh(
            d,
            a,
            e
          ), d = null;
        } else d = o.child;
        if (d !== null) d.return = o;
        else
          for (d = o; d !== null; ) {
            if (d === e) {
              d = null;
              break;
            }
            if (o = d.sibling, o !== null) {
              o.return = d.return, d = o;
              break;
            }
            d = d.return;
          }
        o = d;
      }
    }
    function ll(e, t, a, i) {
      e = null;
      for (var o = t, f = !1; o !== null; ) {
        if (!f) {
          if (o.flags & 524288) f = !0;
          else if (o.flags & 262144) break;
        }
        if (o.tag === 10) {
          var d = o.alternate;
          if (d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          if (d = d.memoizedProps, d !== null) {
            var h = o.type;
            sa(o.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
          }
        } else if (o === Ro.current) {
          if (d = o.alternate, d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          d.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(Pm) : e = [Pm]);
        }
        o = o.return;
      }
      e !== null && Vh(
        t,
        e,
        a,
        i
      ), t.flags |= 262144;
    }
    function Xu(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!sa(
          e.context._currentValue,
          e.memoizedValue
        ))
          return !0;
        e = e.next;
      }
      return !1;
    }
    function Qu(e) {
      Sp = e, jd = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function it(e) {
      return wd && console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      ), _h(Sp, e);
    }
    function vf(e, t) {
      return Sp === null && Qu(e), _h(e, t);
    }
    function _h(e, t) {
      var a = t._currentValue;
      if (t = { context: t, memoizedValue: a, next: null }, jd === null) {
        if (e === null)
          throw Error(
            "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
          );
        jd = t, e.dependencies = {
          lanes: 0,
          firstContext: t,
          _debugThenableState: null
        }, e.flags |= 524288;
      } else jd = jd.next = t;
      return a;
    }
    function gf() {
      return {
        controller: new pS(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function Xi(e) {
      e.controller.signal.aborted && console.warn(
        "A cache instance was retained after it was already freed. This likely indicates a bug in React."
      ), e.refCount++;
    }
    function on(e) {
      e.refCount--, 0 > e.refCount && console.warn(
        "A cache instance was released after it was already freed. This likely indicates a bug in React."
      ), e.refCount === 0 && vS(gS, function() {
        e.controller.abort();
      });
    }
    function Xa() {
      var e = Es;
      return Es = 0, e;
    }
    function ju(e) {
      var t = Es;
      return Es = e, t;
    }
    function Qi(e) {
      var t = Es;
      return Es += e, t;
    }
    function or(e) {
      Ca = Zd(), 0 > e.actualStartTime && (e.actualStartTime = Ca);
    }
    function tu(e) {
      if (0 <= Ca) {
        var t = Zd() - Ca;
        e.actualDuration += t, e.selfBaseDuration = t, Ca = -1;
      }
    }
    function ji(e) {
      if (0 <= Ca) {
        var t = Zd() - Ca;
        e.actualDuration += t, Ca = -1;
      }
    }
    function va() {
      if (0 <= Ca) {
        var e = Zd() - Ca;
        Ca = -1, Es += e;
      }
    }
    function Qa() {
      Ca = Zd();
    }
    function fn(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function O0(e, t) {
      if (Rm === null) {
        var a = Rm = [];
        _v = 0, zs = xy(), Ld = {
          status: "pending",
          value: void 0,
          then: function(i) {
            a.push(i);
          }
        };
      }
      return _v++, t.then(Xh, Xh), t;
    }
    function Xh() {
      if (--_v === 0 && Rm !== null) {
        Ld !== null && (Ld.status = "fulfilled");
        var e = Rm;
        Rm = null, zs = 0, Ld = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function M0(e, t) {
      var a = [], i = {
        status: "pending",
        value: null,
        reason: null,
        then: function(o) {
          a.push(o);
        }
      };
      return e.then(
        function() {
          i.status = "fulfilled", i.value = t;
          for (var o = 0; o < a.length; o++) (0, a[o])(t);
        },
        function(o) {
          for (i.status = "rejected", i.reason = o, o = 0; o < a.length; o++)
            (0, a[o])(void 0);
        }
      ), i;
    }
    function Qh() {
      var e = Ds.current;
      return e !== null ? e : ct.pooledCache;
    }
    function fr(e, t) {
      t === null ? ze(Ds, Ds.current, e) : ze(Ds, t.pool, e);
    }
    function U0() {
      var e = Qh();
      return e === null ? null : { parent: fl._currentValue, pool: e };
    }
    function jh() {
      return { didWarnAboutUncachedPromise: !1, thenables: [] };
    }
    function wh(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function jc() {
    }
    function ga(e, t, a) {
      C.actQueue !== null && (C.didUsePromise = !0);
      var i = e.thenables;
      switch (a = i[a], a === void 0 ? i.push(t) : a !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error(
        "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
      )), t.then(jc, jc), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, la(e), e;
        default:
          if (typeof t.status == "string")
            t.then(jc, jc);
          else {
            if (e = ct, e !== null && 100 < e.shellSuspendCounter)
              throw Error(
                "An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
              );
            e = t, e.status = "pending", e.then(
              function(o) {
                if (t.status === "pending") {
                  var f = t;
                  f.status = "fulfilled", f.value = o;
                }
              },
              function(o) {
                if (t.status === "pending") {
                  var f = t;
                  f.status = "rejected", f.reason = o;
                }
              }
            );
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, la(e), e;
          }
          throw Bm = t, Rp = !0, Nm;
      }
    }
    function Zh() {
      if (Bm === null)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var e = Bm;
      return Bm = null, Rp = !1, e;
    }
    function la(e) {
      if (e === Nm || e === Dp)
        throw Error(
          "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
        );
    }
    function Vl(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function wu(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function sn(e) {
      return {
        lane: e,
        tag: l1,
        payload: null,
        callback: null,
        next: null
      };
    }
    function ja(e, t, a) {
      var i = e.updateQueue;
      if (i === null) return null;
      if (i = i.shared, jv === i && !u1) {
        var o = te(e);
        console.error(
          `An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,
          o
        ), u1 = !0;
      }
      return (Ie & ha) !== Ia ? (o = i.pending, o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = ar(e), E0(e, null, a), t) : (lr(e, i, t, a), ar(e));
    }
    function Zu(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, Cc(e, a);
      }
    }
    function wc(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null && (i = i.updateQueue, a === i)) {
        var o = null, f = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var d = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            f === null ? o = f = d : f = f.next = d, a = a.next;
          } while (a !== null);
          f === null ? o = f = t : f = f.next = t;
        } else o = f = t;
        a = {
          baseState: i.baseState,
          firstBaseUpdate: o,
          lastBaseUpdate: f,
          shared: i.shared,
          callbacks: i.callbacks
        }, e.updateQueue = a;
        return;
      }
      e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
    }
    function rn() {
      if (wv) {
        var e = Ld;
        if (e !== null) throw e;
      }
    }
    function Zc(e, t, a, i) {
      wv = !1;
      var o = e.updateQueue;
      Yo = !1, jv = o.shared;
      var f = o.firstBaseUpdate, d = o.lastBaseUpdate, h = o.shared.pending;
      if (h !== null) {
        o.shared.pending = null;
        var p = h, v = p.next;
        p.next = null, d === null ? f = v : d.next = v, d = p;
        var x = e.alternate;
        x !== null && (x = x.updateQueue, h = x.lastBaseUpdate, h !== d && (h === null ? x.firstBaseUpdate = v : h.next = v, x.lastBaseUpdate = p));
      }
      if (f !== null) {
        var B = o.baseState;
        d = 0, x = v = p = null, h = f;
        do {
          var O = h.lane & -536870913, Y = O !== h.lane;
          if (Y ? (Ne & O) === O : (i & O) === O) {
            O !== 0 && O === zs && (wv = !0), x !== null && (x = x.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            e: {
              O = e;
              var W = h, re = t, ot = a;
              switch (W.tag) {
                case a1:
                  if (W = W.payload, typeof W == "function") {
                    wd = !0;
                    var qe = W.call(
                      ot,
                      B,
                      re
                    );
                    if (O.mode & Fl) {
                      Ze(!0);
                      try {
                        W.call(ot, B, re);
                      } finally {
                        Ze(!1);
                      }
                    }
                    wd = !1, B = qe;
                    break e;
                  }
                  B = W;
                  break e;
                case Qv:
                  O.flags = O.flags & -65537 | 128;
                case l1:
                  if (qe = W.payload, typeof qe == "function") {
                    if (wd = !0, W = qe.call(
                      ot,
                      B,
                      re
                    ), O.mode & Fl) {
                      Ze(!0);
                      try {
                        qe.call(ot, B, re);
                      } finally {
                        Ze(!1);
                      }
                    }
                    wd = !1;
                  } else W = qe;
                  if (W == null) break e;
                  B = Ee({}, B, W);
                  break e;
                case n1:
                  Yo = !0;
              }
            }
            O = h.callback, O !== null && (e.flags |= 64, Y && (e.flags |= 8192), Y = o.callbacks, Y === null ? o.callbacks = [O] : Y.push(O));
          } else
            Y = {
              lane: O,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            }, x === null ? (v = x = Y, p = B) : x = x.next = Y, d |= O;
          if (h = h.next, h === null) {
            if (h = o.shared.pending, h === null)
              break;
            Y = h, h = Y.next, Y.next = null, o.lastBaseUpdate = Y, o.shared.pending = null;
          }
        } while (!0);
        x === null && (p = B), o.baseState = p, o.firstBaseUpdate = v, o.lastBaseUpdate = x, f === null && (o.shared.lanes = 0), Xo |= d, e.lanes = d, e.memoizedState = B;
      }
      jv = null;
    }
    function bf(e, t) {
      if (typeof e != "function")
        throw Error(
          "Invalid argument passed as callback. Expected a function. Instead received: " + e
        );
      e.call(t);
    }
    function Lc(e, t) {
      var a = e.shared.hiddenCallbacks;
      if (a !== null)
        for (e.shared.hiddenCallbacks = null, e = 0; e < a.length; e++)
          bf(a[e], t);
    }
    function x0(e, t) {
      var a = e.callbacks;
      if (a !== null)
        for (e.callbacks = null, e = 0; e < a.length; e++)
          bf(a[e], t);
    }
    function _l(e, t) {
      var a = Si;
      ze(Op, a, e), ze(Jd, t, e), Si = a | t.baseLanes;
    }
    function Sf(e) {
      ze(Op, Si, e), ze(
        Jd,
        Jd.current,
        e
      );
    }
    function wa(e) {
      Si = Op.current, lt(Jd, e), lt(Op, e);
    }
    function De() {
      var e = N;
      wn === null ? wn = [e] : wn.push(e);
    }
    function j() {
      var e = N;
      if (wn !== null && (Ec++, wn[Ec] !== e)) {
        var t = te(ye);
        if (!i1.has(t) && (i1.add(t), wn !== null)) {
          for (var a = "", i = 0; i <= Ec; i++) {
            var o = wn[i], f = i === Ec ? e : o;
            for (o = i + 1 + ". " + o; 30 > o.length; )
              o += " ";
            o += f + `
`, a += o;
          }
          console.error(
            `React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,
            t,
            a
          );
        }
      }
    }
    function ba(e) {
      e == null || he(e) || console.error(
        "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
        N,
        typeof e
      );
    }
    function Jc() {
      var e = te(ye);
      o1.has(e) || (o1.add(e), console.error(
        "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
        e
      ));
    }
    function pt() {
      throw Error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      );
    }
    function Lu(e, t) {
      if (Ym) return !1;
      if (t === null)
        return console.error(
          "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
          N
        ), !1;
      e.length !== t.length && console.error(
        `The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,
        N,
        "[" + t.join(", ") + "]",
        "[" + e.join(", ") + "]"
      );
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!sa(e[a], t[a])) return !1;
      return !0;
    }
    function Ju(e, t, a, i, o, f) {
      Go = f, ye = t, wn = e !== null ? e._debugHookTypes : null, Ec = -1, Ym = e !== null && e.type !== t.type, (Object.prototype.toString.call(a) === "[object AsyncFunction]" || Object.prototype.toString.call(a) === "[object AsyncGeneratorFunction]") && (f = te(ye), Zv.has(f) || (Zv.add(f), console.error(
        "%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",
        f === null ? "An unknown Component" : "<" + f + ">"
      ))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, C.H = e !== null && e.memoizedState !== null ? Jv : wn !== null ? f1 : Lv, Os = f = (t.mode & Fl) !== dt;
      var d = Kv(a, i, o);
      if (Os = !1, $d && (d = Kc(
        t,
        a,
        i,
        o
      )), f) {
        Ze(!0);
        try {
          d = Kc(
            t,
            a,
            i,
            o
          );
        } finally {
          Ze(!1);
        }
      }
      return Tf(e, t), d;
    }
    function Tf(e, t) {
      t._debugHookTypes = wn, t.dependencies === null ? Ac !== null && (t.dependencies = {
        lanes: 0,
        firstContext: null,
        _debugThenableState: Ac
      }) : t.dependencies._debugThenableState = Ac, C.H = xp;
      var a = nt !== null && nt.next !== null;
      if (Go = 0, wn = N = It = nt = ye = null, Ec = -1, e !== null && (e.flags & 65011712) !== (t.flags & 65011712) && console.error(
        "Internal React error: Expected static flag was missing. Please notify the React team."
      ), Mp = !1, qm = 0, Ac = null, a)
        throw Error(
          "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
        );
      e === null || Sl || (e = e.dependencies, e !== null && Xu(e) && (Sl = !0)), Rp ? (Rp = !1, e = !0) : e = !1, e && (t = te(t) || "Unknown", c1.has(t) || Zv.has(t) || (c1.add(t), console.error(
        "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
      )));
    }
    function Kc(e, t, a, i) {
      ye = e;
      var o = 0;
      do {
        if ($d && (Ac = null), qm = 0, $d = !1, o >= SS)
          throw Error(
            "Too many re-renders. React limits the number of renders to prevent an infinite loop."
          );
        if (o += 1, Ym = !1, It = nt = null, e.updateQueue != null) {
          var f = e.updateQueue;
          f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
        }
        Ec = -1, C.H = s1, f = Kv(t, a, i);
      } while ($d);
      return f;
    }
    function Sa() {
      var e = C.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? wi(t) : t, e = e.useState()[0], (nt !== null ? nt.memoizedState : null) !== e && (ye.flags |= 1024), t;
    }
    function Xl() {
      var e = Up !== 0;
      return Up = 0, e;
    }
    function lu(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags = (t.mode & Au) !== dt ? t.flags & -402655237 : t.flags & -2053, e.lanes &= ~a;
    }
    function Za(e) {
      if (Mp) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Mp = !1;
      }
      Go = 0, wn = It = nt = ye = null, Ec = -1, N = null, $d = !1, qm = Up = 0, Ac = null;
    }
    function bt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return It === null ? ye.memoizedState = It = e : It = It.next = e, It;
    }
    function Be() {
      if (nt === null) {
        var e = ye.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = nt.next;
      var t = It === null ? ye.memoizedState : It.next;
      if (t !== null)
        It = t, nt = e;
      else {
        if (e === null)
          throw ye.alternate === null ? Error(
            "Update hook called on initial render. This is likely a bug in React. Please file an issue."
          ) : Error("Rendered more hooks than during the previous render.");
        nt = e, e = {
          memoizedState: nt.memoizedState,
          baseState: nt.baseState,
          baseQueue: nt.baseQueue,
          queue: nt.queue,
          next: null
        }, It === null ? ye.memoizedState = It = e : It = It.next = e;
      }
      return It;
    }
    function sr() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function wi(e) {
      var t = qm;
      return qm += 1, Ac === null && (Ac = jh()), e = ga(Ac, e, t), t = ye, (It === null ? t.memoizedState : It.next) === null && (t = t.alternate, C.H = t !== null && t.memoizedState !== null ? Jv : Lv), e;
    }
    function dn(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return wi(e);
        if (e.$$typeof === Ua) return it(e);
      }
      throw Error("An unsupported type was passed to use(): " + String(e));
    }
    function Ot(e) {
      var t = null, a = ye.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var i = ye.alternate;
        i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
          data: i.data.map(function(o) {
            return o.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = { data: [], index: 0 }), a === null && (a = sr(), ye.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0 || Ym)
        for (a = t.data[t.index] = Array(e), i = 0; i < e; i++)
          a[i] = up;
      else
        a.length !== e && console.error(
          "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
          a.length,
          e
        );
      return t.index++, a;
    }
    function Xe(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function _e(e, t, a) {
      var i = bt();
      if (a !== void 0) {
        var o = a(t);
        if (Os) {
          Ze(!0);
          try {
            a(t);
          } finally {
            Ze(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = Ph.bind(
        null,
        ye,
        e
      ), [i.memoizedState, e];
    }
    function Ta(e) {
      var t = Be();
      return Aa(t, nt, e);
    }
    function Aa(e, t, a) {
      var i = e.queue;
      if (i === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      i.lastRenderedReducer = a;
      var o = e.baseQueue, f = i.pending;
      if (f !== null) {
        if (o !== null) {
          var d = o.next;
          o.next = f.next, f.next = d;
        }
        t.baseQueue !== o && console.error(
          "Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."
        ), t.baseQueue = o = f, i.pending = null;
      }
      if (f = e.baseState, o === null) e.memoizedState = f;
      else {
        t = o.next;
        var h = d = null, p = null, v = t, x = !1;
        do {
          var B = v.lane & -536870913;
          if (B !== v.lane ? (Ne & B) === B : (Go & B) === B) {
            var O = v.revertLane;
            if (O === 0)
              p !== null && (p = p.next = {
                lane: 0,
                revertLane: 0,
                action: v.action,
                hasEagerState: v.hasEagerState,
                eagerState: v.eagerState,
                next: null
              }), B === zs && (x = !0);
            else if ((Go & O) === O) {
              v = v.next, O === zs && (x = !0);
              continue;
            } else
              B = {
                lane: 0,
                revertLane: v.revertLane,
                action: v.action,
                hasEagerState: v.hasEagerState,
                eagerState: v.eagerState,
                next: null
              }, p === null ? (h = p = B, d = f) : p = p.next = B, ye.lanes |= O, Xo |= O;
            B = v.action, Os && a(f, B), f = v.hasEagerState ? v.eagerState : a(f, B);
          } else
            O = {
              lane: B,
              revertLane: v.revertLane,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }, p === null ? (h = p = O, d = f) : p = p.next = O, ye.lanes |= B, Xo |= B;
          v = v.next;
        } while (v !== null && v !== t);
        if (p === null ? d = f : p.next = h, !sa(f, e.memoizedState) && (Sl = !0, x && (a = Ld, a !== null)))
          throw a;
        e.memoizedState = f, e.baseState = d, e.baseQueue = p, i.lastRenderedState = f;
      }
      return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
    }
    function Zi(e) {
      var t = Be(), a = t.queue;
      if (a === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      a.lastRenderedReducer = e;
      var i = a.dispatch, o = a.pending, f = t.memoizedState;
      if (o !== null) {
        a.pending = null;
        var d = o = o.next;
        do
          f = e(f, d.action), d = d.next;
        while (d !== o);
        sa(f, t.memoizedState) || (Sl = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), a.lastRenderedState = f;
      }
      return [f, i];
    }
    function au(e, t, a) {
      var i = ye, o = bt();
      if (we) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        var f = a();
        Kd || f === a() || (console.error(
          "The result of getServerSnapshot should be cached to avoid an infinite loop"
        ), Kd = !0);
      } else {
        if (f = t(), Kd || (a = t(), sa(f, a) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Kd = !0)), ct === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        Ne & 124 || Lh(i, t, f);
      }
      return o.memoizedState = f, a = { value: f, getSnapshot: t }, o.queue = a, hr(
        kc.bind(null, i, a, e),
        [e]
      ), i.flags |= 2048, yn(
        jn | sl,
        $u(),
        $c.bind(
          null,
          i,
          a,
          f,
          t
        ),
        null
      ), f;
    }
    function Af(e, t, a) {
      var i = ye, o = Be(), f = we;
      if (f) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        a = a();
      } else if (a = t(), !Kd) {
        var d = t();
        sa(a, d) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Kd = !0);
      }
      (d = !sa(
        (nt || o).memoizedState,
        a
      )) && (o.memoizedState = a, Sl = !0), o = o.queue;
      var h = kc.bind(null, i, o, e);
      if (Xt(2048, sl, h, [e]), o.getSnapshot !== t || d || It !== null && It.memoizedState.tag & jn) {
        if (i.flags |= 2048, yn(
          jn | sl,
          $u(),
          $c.bind(
            null,
            i,
            o,
            a,
            t
          ),
          null
        ), ct === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        f || Go & 124 || Lh(i, t, a);
      }
      return a;
    }
    function Lh(e, t, a) {
      e.flags |= 16384, e = { getSnapshot: t, value: a }, t = ye.updateQueue, t === null ? (t = sr(), ye.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
    }
    function $c(e, t, a, i) {
      t.value = a, t.getSnapshot = i, Jh(t) && Wc(e);
    }
    function kc(e, t, a) {
      return a(function() {
        Jh(t) && Wc(e);
      });
    }
    function Jh(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !sa(e, a);
      } catch {
        return !0;
      }
    }
    function Wc(e) {
      var t = Gl(e, 2);
      t !== null && Tt(t, e, 2);
    }
    function Ef(e) {
      var t = bt();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), Os) {
          Ze(!0);
          try {
            a();
          } finally {
            Ze(!1);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xe,
        lastRenderedState: e
      }, t;
    }
    function nu(e) {
      e = Ef(e);
      var t = e.queue, a = eo.bind(null, ye, t);
      return t.dispatch = a, [e.memoizedState, a];
    }
    function La(e) {
      var t = bt();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Ar.bind(
        null,
        ye,
        !0,
        a
      ), a.dispatch = t, [e, t];
    }
    function uu(e, t) {
      var a = Be();
      return hn(a, nt, e, t);
    }
    function hn(e, t, a, i) {
      return e.baseState = a, Aa(
        e,
        nt,
        typeof i == "function" ? i : Xe
      );
    }
    function rr(e, t) {
      var a = Be();
      return nt !== null ? hn(a, nt, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    }
    function Kh(e, t, a, i, o) {
      if (xf(e))
        throw Error("Cannot update form state while rendering.");
      if (e = t.action, e !== null) {
        var f = {
          payload: o,
          action: e,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(d) {
            f.listeners.push(d);
          }
        };
        C.T !== null ? a(!0) : f.isTransition = !1, i(f), a = t.pending, a === null ? (f.next = t.pending = f, Fc(t, f)) : (f.next = a.next, t.pending = a.next = f);
      }
    }
    function Fc(e, t) {
      var a = t.action, i = t.payload, o = e.state;
      if (t.isTransition) {
        var f = C.T, d = {};
        C.T = d, C.T._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var h = a(o, i), p = C.S;
          p !== null && p(d, h), zf(e, t, h);
        } catch (v) {
          Kt(e, t, v);
        } finally {
          C.T = f, f === null && d._updatedFibers && (e = d._updatedFibers.size, d._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          ));
        }
      } else
        try {
          d = a(o, i), zf(e, t, d);
        } catch (v) {
          Kt(e, t, v);
        }
    }
    function zf(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? (a.then(
        function(i) {
          Ku(e, t, i);
        },
        function(i) {
          return Kt(e, t, i);
        }
      ), t.isTransition || console.error(
        "An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop."
      )) : Ku(e, t, a);
    }
    function Ku(e, t, a) {
      t.status = "fulfilled", t.value = a, Df(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Fc(e, a)));
    }
    function Kt(e, t, a) {
      var i = e.pending;
      if (e.pending = null, i !== null) {
        i = i.next;
        do
          t.status = "rejected", t.reason = a, Df(t), t = t.next;
        while (t !== i);
      }
      e.action = null;
    }
    function Df(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function $h(e, t) {
      return t;
    }
    function Ic(e, t) {
      if (we) {
        var a = ct.formState;
        if (a !== null) {
          e: {
            var i = ye;
            if (we) {
              if (Ct) {
                t: {
                  for (var o = Ct, f = vi; o.nodeType !== 8; ) {
                    if (!f) {
                      o = null;
                      break t;
                    }
                    if (o = il(
                      o.nextSibling
                    ), o === null) {
                      o = null;
                      break t;
                    }
                  }
                  f = o.data, o = f === bg || f === ob ? o : null;
                }
                if (o) {
                  Ct = il(
                    o.nextSibling
                  ), i = o.data === bg;
                  break e;
                }
              }
              cn(i);
            }
            i = !1;
          }
          i && (t = a[0]);
        }
      }
      return a = bt(), a.memoizedState = a.baseState = t, i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $h,
        lastRenderedState: t
      }, a.queue = i, a = eo.bind(
        null,
        ye,
        i
      ), i.dispatch = a, i = Ef(!1), f = Ar.bind(
        null,
        ye,
        !1,
        i.queue
      ), i = bt(), o = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, i.queue = o, a = Kh.bind(
        null,
        ye,
        o,
        f,
        a
      ), o.dispatch = a, i.memoizedState = e, [t, a, !1];
    }
    function dr(e) {
      var t = Be();
      return H0(t, nt, e);
    }
    function H0(e, t, a) {
      if (t = Aa(
        e,
        t,
        $h
      )[0], e = Ta(Xe)[0], typeof t == "object" && t !== null && typeof t.then == "function")
        try {
          var i = wi(t);
        } catch (d) {
          throw d === Nm ? Dp : d;
        }
      else i = t;
      t = Be();
      var o = t.queue, f = o.dispatch;
      return a !== t.memoizedState && (ye.flags |= 2048, yn(
        jn | sl,
        $u(),
        _t.bind(null, o, a),
        null
      )), [i, f, e];
    }
    function _t(e, t) {
      e.action = t;
    }
    function Pc(e) {
      var t = Be(), a = nt;
      if (a !== null)
        return H0(t, a, e);
      Be(), t = t.memoizedState, a = Be();
      var i = a.queue.dispatch;
      return a.memoizedState = e, [t, i, !1];
    }
    function yn(e, t, a, i) {
      return e = {
        tag: e,
        create: a,
        deps: i,
        inst: t,
        next: null
      }, t = ye.updateQueue, t === null && (t = sr(), ye.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (i = a.next, a.next = e, e.next = i, t.lastEffect = e), e;
    }
    function $u() {
      return { destroy: void 0, resource: void 0 };
    }
    function Rf(e) {
      var t = bt();
      return e = { current: e }, t.memoizedState = e;
    }
    function Ea(e, t, a, i) {
      var o = bt();
      i = i === void 0 ? null : i, ye.flags |= e, o.memoizedState = yn(
        jn | t,
        $u(),
        a,
        i
      );
    }
    function Xt(e, t, a, i) {
      var o = Be();
      i = i === void 0 ? null : i;
      var f = o.memoizedState.inst;
      nt !== null && i !== null && Lu(i, nt.memoizedState.deps) ? o.memoizedState = yn(t, f, a, i) : (ye.flags |= e, o.memoizedState = yn(
        jn | t,
        f,
        a,
        i
      ));
    }
    function hr(e, t) {
      (ye.mode & Au) !== dt && (ye.mode & Jg) === dt ? Ea(276826112, sl, e, t) : Ea(8390656, sl, e, t);
    }
    function yr(e, t) {
      var a = 4194308;
      return (ye.mode & Au) !== dt && (a |= 134217728), Ea(a, Nl, e, t);
    }
    function C0(e, t) {
      if (typeof t == "function") {
        e = e();
        var a = t(e);
        return function() {
          typeof a == "function" ? a() : t(null);
        };
      }
      if (t != null)
        return t.hasOwnProperty("current") || console.error(
          "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.",
          "an object with keys {" + Object.keys(t).join(", ") + "}"
        ), e = e(), t.current = e, function() {
          t.current = null;
        };
    }
    function mr(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null;
      var i = 4194308;
      (ye.mode & Au) !== dt && (i |= 134217728), Ea(
        i,
        Nl,
        C0.bind(null, t, e),
        a
      );
    }
    function mn(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null, Xt(
        4,
        Nl,
        C0.bind(null, t, e),
        a
      );
    }
    function Of(e, t) {
      return bt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    }
    function Li(e, t) {
      var a = Be();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      return t !== null && Lu(t, i[1]) ? i[0] : (a.memoizedState = [e, t], e);
    }
    function pr(e, t) {
      var a = bt();
      t = t === void 0 ? null : t;
      var i = e();
      if (Os) {
        Ze(!0);
        try {
          e();
        } finally {
          Ze(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function ku(e, t) {
      var a = Be();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      if (t !== null && Lu(t, i[1]))
        return i[0];
      if (i = e(), Os) {
        Ze(!0);
        try {
          e();
        } finally {
          Ze(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function vr(e, t) {
      var a = bt();
      return br(a, e, t);
    }
    function Mf(e, t) {
      var a = Be();
      return Uf(
        a,
        nt.memoizedState,
        e,
        t
      );
    }
    function gr(e, t) {
      var a = Be();
      return nt === null ? br(a, e, t) : Uf(
        a,
        nt.memoizedState,
        e,
        t
      );
    }
    function br(e, t, a) {
      return a === void 0 || Go & 1073741824 ? e.memoizedState = t : (e.memoizedState = a, e = j0(), ye.lanes |= e, Xo |= e, a);
    }
    function Uf(e, t, a, i) {
      return sa(a, t) ? a : Jd.current !== null ? (e = br(e, a, i), sa(e, t) || (Sl = !0), e) : Go & 42 ? (e = j0(), ye.lanes |= e, Xo |= e, t) : (Sl = !0, e.memoizedState = a);
    }
    function kh(e, t, a, i, o) {
      var f = se.p;
      se.p = f !== 0 && f < Fa ? f : Fa;
      var d = C.T, h = {};
      C.T = h, Ar(e, !1, t, a), h._updatedFibers = /* @__PURE__ */ new Set();
      try {
        var p = o(), v = C.S;
        if (v !== null && v(h, p), p !== null && typeof p == "object" && typeof p.then == "function") {
          var x = M0(
            p,
            i
          );
          iu(
            e,
            t,
            x,
            Zl(e)
          );
        } else
          iu(
            e,
            t,
            i,
            Zl(e)
          );
      } catch (B) {
        iu(
          e,
          t,
          { then: function() {
          }, status: "rejected", reason: B },
          Zl(e)
        );
      } finally {
        se.p = f, C.T = d, d === null && h._updatedFibers && (e = h._updatedFibers.size, h._updatedFibers.clear(), 10 < e && console.warn(
          "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
        ));
      }
    }
    function Ji(e, t, a, i) {
      if (e.tag !== 5)
        throw Error(
          "Expected the form instance to be a HostComponent. This is a bug in React."
        );
      var o = Wh(e).queue;
      kh(
        e,
        o,
        t,
        Vs,
        a === null ? ae : function() {
          return Fh(e), a(i);
        }
      );
    }
    function Wh(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: Vs,
        baseState: Vs,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Xe,
          lastRenderedState: Vs
        },
        next: null
      };
      var a = {};
      return t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Xe,
          lastRenderedState: a
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function Fh(e) {
      C.T === null && console.error(
        "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
      );
      var t = Wh(e).next.queue;
      iu(
        e,
        t,
        {},
        Zl(e)
      );
    }
    function pn() {
      var e = Ef(!1);
      return e = kh.bind(
        null,
        ye,
        e.queue,
        !0,
        !1
      ), bt().memoizedState = e, [!1, e];
    }
    function Sr() {
      var e = Ta(Xe)[0], t = Be().memoizedState;
      return [
        typeof e == "boolean" ? e : wi(e),
        t
      ];
    }
    function Tr() {
      var e = Zi(Xe)[0], t = Be().memoizedState;
      return [
        typeof e == "boolean" ? e : wi(e),
        t
      ];
    }
    function Ql() {
      return it(Pm);
    }
    function vn() {
      var e = bt(), t = ct.identifierPrefix;
      if (we) {
        var a = Sc, i = bc;
        a = (i & ~(1 << 32 - gl(i) - 1)).toString(32) + a, t = "«" + t + "R" + a, a = Up++, 0 < a && (t += "H" + a.toString(32)), t += "»";
      } else
        a = bS++, t = "«" + t + "r" + a.toString(32) + "»";
      return e.memoizedState = t;
    }
    function Ki() {
      return bt().memoizedState = Ih.bind(
        null,
        ye
      );
    }
    function Ih(e, t) {
      for (var a = e.return; a !== null; ) {
        switch (a.tag) {
          case 24:
          case 3:
            var i = Zl(a);
            e = sn(i);
            var o = ja(a, e, i);
            o !== null && (Tt(o, a, i), Zu(o, a, i)), a = gf(), t != null && o !== null && console.error(
              "The seed argument is not enabled outside experimental channels."
            ), e.payload = { cache: a };
            return;
        }
        a = a.return;
      }
    }
    function Ph(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = Zl(e);
      var o = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      xf(e) ? $i(t, o) : (o = Oh(e, t, o, i), o !== null && (Tt(o, e, i), Hf(o, t, i))), Ti(e, i);
    }
    function eo(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = Zl(e), iu(e, t, a, i), Ti(e, i);
    }
    function iu(e, t, a, i) {
      var o = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (xf(e)) $i(t, o);
      else {
        var f = e.alternate;
        if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null)) {
          var d = C.H;
          C.H = zu;
          try {
            var h = t.lastRenderedState, p = f(h, a);
            if (o.hasEagerState = !0, o.eagerState = p, sa(p, h))
              return lr(e, t, o, 0), ct === null && hf(), !1;
          } catch {
          } finally {
            C.H = d;
          }
        }
        if (a = Oh(e, t, o, i), a !== null)
          return Tt(a, e, i), Hf(a, t, i), !0;
      }
      return !1;
    }
    function Ar(e, t, a, i) {
      if (C.T === null && zs === 0 && console.error(
        "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
      ), i = {
        lane: 2,
        revertLane: xy(),
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, xf(e)) {
        if (t)
          throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else
        t = Oh(
          e,
          a,
          i,
          2
        ), t !== null && Tt(t, e, 2);
      Ti(e, 2);
    }
    function xf(e) {
      var t = e.alternate;
      return e === ye || t !== null && t === ye;
    }
    function $i(e, t) {
      $d = Mp = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function Hf(e, t, a) {
      if (a & 4194048) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, Cc(e, a);
      }
    }
    function $t(e) {
      var t = Oe;
      return e != null && (Oe = t === null ? e : t.concat(e)), t;
    }
    function to(e, t, a) {
      for (var i = Object.keys(e.props), o = 0; o < i.length; o++) {
        var f = i[o];
        if (f !== "children" && f !== "key") {
          t === null && (t = pf(e, a.mode, 0), t._debugInfo = Oe, t.return = a), k(
            t,
            function(d) {
              console.error(
                "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                d
              );
            },
            f
          );
          break;
        }
      }
    }
    function lo(e) {
      var t = Gm;
      return Gm += 1, kd === null && (kd = jh()), ga(kd, e, t);
    }
    function za(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function ve(e, t) {
      throw t.$$typeof === cs ? Error(
        `A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`
      ) : (e = Object.prototype.toString.call(t), Error(
        "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
      ));
    }
    function Le(e, t) {
      var a = te(e) || "Component";
      D1[a] || (D1[a] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  root.render(%s)`,
        t,
        t,
        t
      ) : console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  <%s>{%s}</%s>`,
        t,
        t,
        a,
        t,
        a
      ));
    }
    function vt(e, t) {
      var a = te(e) || "Component";
      R1[a] || (R1[a] = !0, t = String(t), e.tag === 3 ? console.error(
        `Symbols are not valid as a React child.
  root.render(%s)`,
        t
      ) : console.error(
        `Symbols are not valid as a React child.
  <%s>%s</%s>`,
        a,
        t,
        a
      ));
    }
    function Cf(e) {
      function t(b, S) {
        if (e) {
          var T = b.deletions;
          T === null ? (b.deletions = [S], b.flags |= 16) : T.push(S);
        }
      }
      function a(b, S) {
        if (!e) return null;
        for (; S !== null; )
          t(b, S), S = S.sibling;
        return null;
      }
      function i(b) {
        for (var S = /* @__PURE__ */ new Map(); b !== null; )
          b.key !== null ? S.set(b.key, b) : S.set(b.index, b), b = b.sibling;
        return S;
      }
      function o(b, S) {
        return b = un(b, S), b.index = 0, b.sibling = null, b;
      }
      function f(b, S, T) {
        return b.index = T, e ? (T = b.alternate, T !== null ? (T = T.index, T < S ? (b.flags |= 67108866, S) : T) : (b.flags |= 67108866, S)) : (b.flags |= 1048576, S);
      }
      function d(b) {
        return e && b.alternate === null && (b.flags |= 67108866), b;
      }
      function h(b, S, T, G) {
        return S === null || S.tag !== 6 ? (S = Vu(
          T,
          b.mode,
          G
        ), S.return = b, S._debugOwner = b, S._debugTask = b._debugTask, S._debugInfo = Oe, S) : (S = o(S, T), S.return = b, S._debugInfo = Oe, S);
      }
      function p(b, S, T, G) {
        var L = T.type;
        return L === ge ? (S = x(
          b,
          S,
          T.props.children,
          G,
          T.key
        ), to(T, S, b), S) : S !== null && (S.elementType === L || z0(S, T) || typeof L == "object" && L !== null && L.$$typeof === oa && Vo(L) === S.type) ? (S = o(S, T.props), za(S, T), S.return = b, S._debugOwner = T._owner, S._debugInfo = Oe, S) : (S = pf(T, b.mode, G), za(S, T), S.return = b, S._debugInfo = Oe, S);
      }
      function v(b, S, T, G) {
        return S === null || S.tag !== 4 || S.stateNode.containerInfo !== T.containerInfo || S.stateNode.implementation !== T.implementation ? (S = Hh(T, b.mode, G), S.return = b, S._debugInfo = Oe, S) : (S = o(S, T.children || []), S.return = b, S._debugInfo = Oe, S);
      }
      function x(b, S, T, G, L) {
        return S === null || S.tag !== 7 ? (S = Gu(
          T,
          b.mode,
          G,
          L
        ), S.return = b, S._debugOwner = b, S._debugTask = b._debugTask, S._debugInfo = Oe, S) : (S = o(S, T), S.return = b, S._debugInfo = Oe, S);
      }
      function B(b, S, T) {
        if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
          return S = Vu(
            "" + S,
            b.mode,
            T
          ), S.return = b, S._debugOwner = b, S._debugTask = b._debugTask, S._debugInfo = Oe, S;
        if (typeof S == "object" && S !== null) {
          switch (S.$$typeof) {
            case oi:
              return T = pf(
                S,
                b.mode,
                T
              ), za(T, S), T.return = b, b = $t(S._debugInfo), T._debugInfo = Oe, Oe = b, T;
            case hc:
              return S = Hh(
                S,
                b.mode,
                T
              ), S.return = b, S._debugInfo = Oe, S;
            case oa:
              var G = $t(S._debugInfo);
              return S = Vo(S), b = B(b, S, T), Oe = G, b;
          }
          if (he(S) || Yt(S))
            return T = Gu(
              S,
              b.mode,
              T,
              null
            ), T.return = b, T._debugOwner = b, T._debugTask = b._debugTask, b = $t(S._debugInfo), T._debugInfo = Oe, Oe = b, T;
          if (typeof S.then == "function")
            return G = $t(S._debugInfo), b = B(
              b,
              lo(S),
              T
            ), Oe = G, b;
          if (S.$$typeof === Ua)
            return B(
              b,
              vf(b, S),
              T
            );
          ve(b, S);
        }
        return typeof S == "function" && Le(b, S), typeof S == "symbol" && vt(b, S), null;
      }
      function O(b, S, T, G) {
        var L = S !== null ? S.key : null;
        if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
          return L !== null ? null : h(b, S, "" + T, G);
        if (typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case oi:
              return T.key === L ? (L = $t(T._debugInfo), b = p(
                b,
                S,
                T,
                G
              ), Oe = L, b) : null;
            case hc:
              return T.key === L ? v(b, S, T, G) : null;
            case oa:
              return L = $t(T._debugInfo), T = Vo(T), b = O(
                b,
                S,
                T,
                G
              ), Oe = L, b;
          }
          if (he(T) || Yt(T))
            return L !== null ? null : (L = $t(T._debugInfo), b = x(
              b,
              S,
              T,
              G,
              null
            ), Oe = L, b);
          if (typeof T.then == "function")
            return L = $t(T._debugInfo), b = O(
              b,
              S,
              lo(T),
              G
            ), Oe = L, b;
          if (T.$$typeof === Ua)
            return O(
              b,
              S,
              vf(b, T),
              G
            );
          ve(b, T);
        }
        return typeof T == "function" && Le(b, T), typeof T == "symbol" && vt(b, T), null;
      }
      function Y(b, S, T, G, L) {
        if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
          return b = b.get(T) || null, h(S, b, "" + G, L);
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case oi:
              return T = b.get(
                G.key === null ? T : G.key
              ) || null, b = $t(G._debugInfo), S = p(
                S,
                T,
                G,
                L
              ), Oe = b, S;
            case hc:
              return b = b.get(
                G.key === null ? T : G.key
              ) || null, v(S, b, G, L);
            case oa:
              var be = $t(G._debugInfo);
              return G = Vo(G), S = Y(
                b,
                S,
                T,
                G,
                L
              ), Oe = be, S;
          }
          if (he(G) || Yt(G))
            return T = b.get(T) || null, b = $t(G._debugInfo), S = x(
              S,
              T,
              G,
              L,
              null
            ), Oe = b, S;
          if (typeof G.then == "function")
            return be = $t(G._debugInfo), S = Y(
              b,
              S,
              T,
              lo(G),
              L
            ), Oe = be, S;
          if (G.$$typeof === Ua)
            return Y(
              b,
              S,
              T,
              vf(S, G),
              L
            );
          ve(S, G);
        }
        return typeof G == "function" && Le(S, G), typeof G == "symbol" && vt(S, G), null;
      }
      function W(b, S, T, G) {
        if (typeof T != "object" || T === null) return G;
        switch (T.$$typeof) {
          case oi:
          case hc:
            Bt(b, S, T);
            var L = T.key;
            if (typeof L != "string") break;
            if (G === null) {
              G = /* @__PURE__ */ new Set(), G.add(L);
              break;
            }
            if (!G.has(L)) {
              G.add(L);
              break;
            }
            k(S, function() {
              console.error(
                "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
                L
              );
            });
            break;
          case oa:
            T = Vo(T), W(b, S, T, G);
        }
        return G;
      }
      function re(b, S, T, G) {
        for (var L = null, be = null, F = null, Se = S, Ae = S = 0, ht = null; Se !== null && Ae < T.length; Ae++) {
          Se.index > Ae ? (ht = Se, Se = null) : ht = Se.sibling;
          var Zt = O(
            b,
            Se,
            T[Ae],
            G
          );
          if (Zt === null) {
            Se === null && (Se = ht);
            break;
          }
          L = W(
            b,
            Zt,
            T[Ae],
            L
          ), e && Se && Zt.alternate === null && t(b, Se), S = f(Zt, S, Ae), F === null ? be = Zt : F.sibling = Zt, F = Zt, Se = ht;
        }
        if (Ae === T.length)
          return a(b, Se), we && Gi(b, Ae), be;
        if (Se === null) {
          for (; Ae < T.length; Ae++)
            Se = B(b, T[Ae], G), Se !== null && (L = W(
              b,
              Se,
              T[Ae],
              L
            ), S = f(
              Se,
              S,
              Ae
            ), F === null ? be = Se : F.sibling = Se, F = Se);
          return we && Gi(b, Ae), be;
        }
        for (Se = i(Se); Ae < T.length; Ae++)
          ht = Y(
            Se,
            b,
            Ae,
            T[Ae],
            G
          ), ht !== null && (L = W(
            b,
            ht,
            T[Ae],
            L
          ), e && ht.alternate !== null && Se.delete(
            ht.key === null ? Ae : ht.key
          ), S = f(
            ht,
            S,
            Ae
          ), F === null ? be = ht : F.sibling = ht, F = ht);
        return e && Se.forEach(function(Uc) {
          return t(b, Uc);
        }), we && Gi(b, Ae), be;
      }
      function ot(b, S, T, G) {
        if (T == null)
          throw Error("An iterable object provided no iterator.");
        for (var L = null, be = null, F = S, Se = S = 0, Ae = null, ht = null, Zt = T.next(); F !== null && !Zt.done; Se++, Zt = T.next()) {
          F.index > Se ? (Ae = F, F = null) : Ae = F.sibling;
          var Uc = O(b, F, Zt.value, G);
          if (Uc === null) {
            F === null && (F = Ae);
            break;
          }
          ht = W(
            b,
            Uc,
            Zt.value,
            ht
          ), e && F && Uc.alternate === null && t(b, F), S = f(Uc, S, Se), be === null ? L = Uc : be.sibling = Uc, be = Uc, F = Ae;
        }
        if (Zt.done)
          return a(b, F), we && Gi(b, Se), L;
        if (F === null) {
          for (; !Zt.done; Se++, Zt = T.next())
            F = B(b, Zt.value, G), F !== null && (ht = W(
              b,
              F,
              Zt.value,
              ht
            ), S = f(
              F,
              S,
              Se
            ), be === null ? L = F : be.sibling = F, be = F);
          return we && Gi(b, Se), L;
        }
        for (F = i(F); !Zt.done; Se++, Zt = T.next())
          Ae = Y(
            F,
            b,
            Se,
            Zt.value,
            G
          ), Ae !== null && (ht = W(
            b,
            Ae,
            Zt.value,
            ht
          ), e && Ae.alternate !== null && F.delete(
            Ae.key === null ? Se : Ae.key
          ), S = f(
            Ae,
            S,
            Se
          ), be === null ? L = Ae : be.sibling = Ae, be = Ae);
        return e && F.forEach(function(JS) {
          return t(b, JS);
        }), we && Gi(b, Se), L;
      }
      function qe(b, S, T, G) {
        if (typeof T == "object" && T !== null && T.type === ge && T.key === null && (to(T, null, b), T = T.props.children), typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case oi:
              var L = $t(T._debugInfo);
              e: {
                for (var be = T.key; S !== null; ) {
                  if (S.key === be) {
                    if (be = T.type, be === ge) {
                      if (S.tag === 7) {
                        a(
                          b,
                          S.sibling
                        ), G = o(
                          S,
                          T.props.children
                        ), G.return = b, G._debugOwner = T._owner, G._debugInfo = Oe, to(T, G, b), b = G;
                        break e;
                      }
                    } else if (S.elementType === be || z0(
                      S,
                      T
                    ) || typeof be == "object" && be !== null && be.$$typeof === oa && Vo(be) === S.type) {
                      a(
                        b,
                        S.sibling
                      ), G = o(S, T.props), za(G, T), G.return = b, G._debugOwner = T._owner, G._debugInfo = Oe, b = G;
                      break e;
                    }
                    a(b, S);
                    break;
                  } else t(b, S);
                  S = S.sibling;
                }
                T.type === ge ? (G = Gu(
                  T.props.children,
                  b.mode,
                  G,
                  T.key
                ), G.return = b, G._debugOwner = b, G._debugTask = b._debugTask, G._debugInfo = Oe, to(T, G, b), b = G) : (G = pf(
                  T,
                  b.mode,
                  G
                ), za(G, T), G.return = b, G._debugInfo = Oe, b = G);
              }
              return b = d(b), Oe = L, b;
            case hc:
              e: {
                for (L = T, T = L.key; S !== null; ) {
                  if (S.key === T)
                    if (S.tag === 4 && S.stateNode.containerInfo === L.containerInfo && S.stateNode.implementation === L.implementation) {
                      a(
                        b,
                        S.sibling
                      ), G = o(
                        S,
                        L.children || []
                      ), G.return = b, b = G;
                      break e;
                    } else {
                      a(b, S);
                      break;
                    }
                  else t(b, S);
                  S = S.sibling;
                }
                G = Hh(
                  L,
                  b.mode,
                  G
                ), G.return = b, b = G;
              }
              return d(b);
            case oa:
              return L = $t(T._debugInfo), T = Vo(T), b = qe(
                b,
                S,
                T,
                G
              ), Oe = L, b;
          }
          if (he(T))
            return L = $t(T._debugInfo), b = re(
              b,
              S,
              T,
              G
            ), Oe = L, b;
          if (Yt(T)) {
            if (L = $t(T._debugInfo), be = Yt(T), typeof be != "function")
              throw Error(
                "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
              );
            var F = be.call(T);
            return F === T ? (b.tag !== 0 || Object.prototype.toString.call(b.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(F) !== "[object Generator]") && (E1 || console.error(
              "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
            ), E1 = !0) : T.entries !== be || kv || (console.error(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), kv = !0), b = ot(
              b,
              S,
              F,
              G
            ), Oe = L, b;
          }
          if (typeof T.then == "function")
            return L = $t(T._debugInfo), b = qe(
              b,
              S,
              lo(T),
              G
            ), Oe = L, b;
          if (T.$$typeof === Ua)
            return qe(
              b,
              S,
              vf(b, T),
              G
            );
          ve(b, T);
        }
        return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (L = "" + T, S !== null && S.tag === 6 ? (a(
          b,
          S.sibling
        ), G = o(S, L), G.return = b, b = G) : (a(b, S), G = Vu(
          L,
          b.mode,
          G
        ), G.return = b, G._debugOwner = b, G._debugTask = b._debugTask, G._debugInfo = Oe, b = G), d(b)) : (typeof T == "function" && Le(b, T), typeof T == "symbol" && vt(b, T), a(b, S));
      }
      return function(b, S, T, G) {
        var L = Oe;
        Oe = null;
        try {
          Gm = 0;
          var be = qe(
            b,
            S,
            T,
            G
          );
          return kd = null, be;
        } catch (ht) {
          if (ht === Nm || ht === Dp) throw ht;
          var F = oe(29, ht, null, b.mode);
          F.lanes = G, F.return = b;
          var Se = F._debugInfo = Oe;
          if (F._debugOwner = b._debugOwner, F._debugTask = b._debugTask, Se != null) {
            for (var Ae = Se.length - 1; 0 <= Ae; Ae--)
              if (typeof Se[Ae].stack == "string") {
                F._debugOwner = Se[Ae], F._debugTask = Se[Ae].debugTask;
                break;
              }
          }
          return F;
        } finally {
          Oe = L;
        }
      };
    }
    function aa(e) {
      var t = e.alternate;
      ze(
        rl,
        rl.current & Fd,
        e
      ), ze(Zn, e, e), bi === null && (t === null || Jd.current !== null || t.memoizedState !== null) && (bi = e);
    }
    function Wu(e) {
      if (e.tag === 22) {
        if (ze(rl, rl.current, e), ze(Zn, e, e), bi === null) {
          var t = e.alternate;
          t !== null && t.memoizedState !== null && (bi = e);
        }
      } else Ja(e);
    }
    function Ja(e) {
      ze(rl, rl.current, e), ze(
        Zn,
        Zn.current,
        e
      );
    }
    function na(e) {
      lt(Zn, e), bi === e && (bi = null), lt(rl, e);
    }
    function cu(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || a.data === Rc || xn(a)))
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    function ey(e) {
      if (e !== null && typeof e != "function") {
        var t = String(e);
        V1.has(t) || (V1.add(t), console.error(
          "Expected the last optional `callback` argument to be a function. Instead received: %s.",
          e
        ));
      }
    }
    function gt(e, t, a, i) {
      var o = e.memoizedState, f = a(i, o);
      if (e.mode & Fl) {
        Ze(!0);
        try {
          f = a(i, o);
        } finally {
          Ze(!1);
        }
      }
      f === void 0 && (t = Ke(t) || "Component", B1.has(t) || (B1.add(t), console.error(
        "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
        t
      ))), o = f == null ? o : Ee({}, o, f), e.memoizedState = o, e.lanes === 0 && (e.updateQueue.baseState = o);
    }
    function Er(e, t, a, i, o, f, d) {
      var h = e.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        if (a = h.shouldComponentUpdate(
          i,
          f,
          d
        ), e.mode & Fl) {
          Ze(!0);
          try {
            a = h.shouldComponentUpdate(
              i,
              f,
              d
            );
          } finally {
            Ze(!1);
          }
        }
        return a === void 0 && console.error(
          "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
          Ke(t) || "Component"
        ), a;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !df(a, i) || !df(o, f) : !0;
    }
    function zr(e, t, a, i) {
      var o = t.state;
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o && (e = te(e) || "Component", U1.has(e) || (U1.add(e), console.error(
        "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
        e
      )), Wv.enqueueReplaceState(
        t,
        t.state,
        null
      ));
    }
    function Fu(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var i in t)
          i !== "ref" && (a[i] = t[i]);
      }
      if (e = e.defaultProps) {
        a === t && (a = Ee({}, a));
        for (var o in e)
          a[o] === void 0 && (a[o] = e[o]);
      }
      return a;
    }
    function ty(e) {
      Fv(e), console.warn(
        `%s

%s
`,
        Id ? "An error occurred in the <" + Id + "> component." : "An error occurred in one of your React components.",
        `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`
      );
    }
    function N0(e) {
      var t = Id ? "The above error occurred in the <" + Id + "> component." : "The above error occurred in one of your React components.", a = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((Iv || "Anonymous") + ".");
      if (typeof e == "object" && e !== null && typeof e.environmentName == "string") {
        var i = e.environmentName;
        e = [
          `%o

%s

%s
`,
          e,
          t,
          a
        ].slice(0), typeof e[0] == "string" ? e.splice(
          0,
          1,
          pb + e[0],
          vb,
          kp + i + kp,
          gb
        ) : e.splice(
          0,
          0,
          pb,
          vb,
          kp + i + kp,
          gb
        ), e.unshift(console), i = ZS.apply(console.error, e), i();
      } else
        console.error(
          `%o

%s

%s
`,
          e,
          t,
          a
        );
    }
    function Dr(e) {
      Fv(e);
    }
    function ao(e, t) {
      try {
        Id = t.source ? te(t.source) : null, Iv = null;
        var a = t.value;
        if (C.actQueue !== null)
          C.thrownErrors.push(a);
        else {
          var i = e.onUncaughtError;
          i(a, { componentStack: t.stack });
        }
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function Rr(e, t, a) {
      try {
        Id = a.source ? te(a.source) : null, Iv = te(t);
        var i = e.onCaughtError;
        i(a.value, {
          componentStack: a.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function ml(e, t, a) {
      return a = sn(a), a.tag = Qv, a.payload = { element: null }, a.callback = function() {
        k(t.source, ao, e, t);
      }, a;
    }
    function St(e) {
      return e = sn(e), e.tag = Qv, e;
    }
    function Nf(e, t, a, i) {
      var o = a.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var f = i.value;
        e.payload = function() {
          return o(f);
        }, e.callback = function() {
          D0(a), k(
            i.source,
            Rr,
            t,
            a,
            i
          );
        };
      }
      var d = a.stateNode;
      d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
        D0(a), k(
          i.source,
          Rr,
          t,
          a,
          i
        ), typeof o != "function" && (jo === null ? jo = /* @__PURE__ */ new Set([this]) : jo.add(this)), TS(this, i), typeof o == "function" || !(a.lanes & 2) && console.error(
          "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
          te(a) || "Unknown"
        );
      });
    }
    function Bf(e, t, a, i, o) {
      if (a.flags |= 32768, Rt && ro(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        if (t = a.alternate, t !== null && ll(
          t,
          a,
          o,
          !0
        ), we && (Tc = !0), a = Zn.current, a !== null) {
          switch (a.tag) {
            case 13:
              return bi === null ? Jr() : a.alternate === null && Nt === Dc && (Nt = lg), a.flags &= -257, a.flags |= 65536, a.lanes = o, i === Xv ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), Ry(e, i, o)), !1;
            case 22:
              return a.flags |= 65536, i === Xv ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([i])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : a.add(i)), Ry(e, i, o)), !1;
          }
          throw Error(
            "Unexpected Suspense handler tag (" + a.tag + "). This is a bug in React."
          );
        }
        return Ry(e, i, o), Jr(), !1;
      }
      if (we)
        return Tc = !0, t = Zn.current, t !== null ? (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== Yv && Qc(
          ta(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
              { cause: i }
            ),
            a
          )
        )) : (i !== Yv && Qc(
          ta(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
              { cause: i }
            ),
            a
          )
        ), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = ta(i, a), o = ml(
          e.stateNode,
          i,
          o
        ), wc(e, o), Nt !== Ms && (Nt = lh)), !1;
      var f = ta(
        Error(
          "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
          { cause: i }
        ),
        a
      );
      if (Lm === null ? Lm = [f] : Lm.push(f), Nt !== Ms && (Nt = lh), t === null) return !0;
      i = ta(i, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = o & -o, a.lanes |= e, e = ml(
              a.stateNode,
              i,
              e
            ), wc(a, e), !1;
          case 1:
            if (t = a.type, f = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (jo === null || !jo.has(f))))
              return a.flags |= 65536, o &= -o, a.lanes |= o, o = St(o), Nf(
                o,
                e,
                a,
                i
              ), wc(a, o), !1;
        }
        a = a.return;
      } while (a !== null);
      return !1;
    }
    function Ht(e, t, a, i) {
      t.child = e === null ? O1(t, null, a, i) : Wd(
        t,
        e.child,
        a,
        i
      );
    }
    function Or(e, t, a, i, o) {
      a = a.render;
      var f = t.ref;
      if ("ref" in i) {
        var d = {};
        for (var h in i)
          h !== "ref" && (d[h] = i[h]);
      } else d = i;
      return Qu(t), tn(t), i = Ju(
        e,
        t,
        a,
        d,
        f,
        o
      ), h = Xl(), Mu(), e !== null && !Sl ? (lu(e, t, o), bn(e, t, o)) : (we && h && ur(t), t.flags |= 1, Ht(e, t, i, o), t.child);
    }
    function gn(e, t, a, i, o) {
      if (e === null) {
        var f = a.type;
        return typeof f == "function" && !Uh(f) && f.defaultProps === void 0 && a.compare === null ? (a = Yi(f), t.tag = 15, t.type = a, Hr(t, f), qf(
          e,
          t,
          a,
          i,
          o
        )) : (e = nr(
          a.type,
          null,
          i,
          t,
          t.mode,
          o
        ), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (f = e.child, !Gr(e, o)) {
        var d = f.memoizedProps;
        if (a = a.compare, a = a !== null ? a : df, a(d, i) && e.ref === t.ref)
          return bn(
            e,
            t,
            o
          );
      }
      return t.flags |= 1, e = un(f, i), e.ref = t.ref, e.return = t, t.child = e;
    }
    function qf(e, t, a, i, o) {
      if (e !== null) {
        var f = e.memoizedProps;
        if (df(f, i) && e.ref === t.ref && t.type === e.type)
          if (Sl = !1, t.pendingProps = i = f, Gr(e, o))
            e.flags & 131072 && (Sl = !0);
          else
            return t.lanes = e.lanes, bn(e, t, o);
      }
      return xr(
        e,
        t,
        a,
        i,
        o
      );
    }
    function Mr(e, t, a) {
      var i = t.pendingProps, o = i.children, f = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden") {
        if (t.flags & 128) {
          if (i = f !== null ? f.baseLanes | a : a, e !== null) {
            for (o = t.child = e.child, f = 0; o !== null; )
              f = f | o.lanes | o.childLanes, o = o.sibling;
            t.childLanes = f & ~i;
          } else t.childLanes = 0, t.child = null;
          return Ur(
            e,
            t,
            i,
            a
          );
        }
        if (a & 536870912)
          t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && fr(
            t,
            f !== null ? f.cachePool : null
          ), f !== null ? _l(t, f) : Sf(t), Wu(t);
        else
          return t.lanes = t.childLanes = 536870912, Ur(
            e,
            t,
            f !== null ? f.baseLanes | a : a,
            a
          );
      } else
        f !== null ? (fr(t, f.cachePool), _l(t, f), Ja(t), t.memoizedState = null) : (e !== null && fr(t, null), Sf(t), Ja(t));
      return Ht(e, t, o, a), t.child;
    }
    function Ur(e, t, a, i) {
      var o = Qh();
      return o = o === null ? null : {
        parent: fl._currentValue,
        pool: o
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: o
      }, e !== null && fr(t, null), Sf(t), Wu(t), e !== null && ll(e, t, i, !0), null;
    }
    function Yf(e, t) {
      var a = t.ref;
      if (a === null)
        e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object")
          throw Error(
            "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
          );
        (e === null || e.ref !== a) && (t.flags |= 4194816);
      }
    }
    function xr(e, t, a, i, o) {
      if (a.prototype && typeof a.prototype.render == "function") {
        var f = Ke(a) || "Unknown";
        X1[f] || (console.error(
          "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
          f,
          f
        ), X1[f] = !0);
      }
      return t.mode & Fl && Eu.recordLegacyContextWarning(
        t,
        null
      ), e === null && (Hr(t, t.type), a.contextTypes && (f = Ke(a) || "Unknown", j1[f] || (j1[f] = !0, console.error(
        "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
        f
      )))), Qu(t), tn(t), a = Ju(
        e,
        t,
        a,
        i,
        void 0,
        o
      ), i = Xl(), Mu(), e !== null && !Sl ? (lu(e, t, o), bn(e, t, o)) : (we && i && ur(t), t.flags |= 1, Ht(e, t, a, o), t.child);
    }
    function ly(e, t, a, i, o, f) {
      return Qu(t), tn(t), Ec = -1, Ym = e !== null && e.type !== t.type, t.updateQueue = null, a = Kc(
        t,
        i,
        a,
        o
      ), Tf(e, t), i = Xl(), Mu(), e !== null && !Sl ? (lu(e, t, f), bn(e, t, f)) : (we && i && ur(t), t.flags |= 1, Ht(e, t, a, f), t.child);
    }
    function ay(e, t, a, i, o) {
      switch (yt(t)) {
        case !1:
          var f = t.stateNode, d = new t.type(
            t.memoizedProps,
            f.context
          ).state;
          f.updater.enqueueSetState(f, d, null);
          break;
        case !0:
          t.flags |= 128, t.flags |= 65536, f = Error("Simulated error coming from DevTools");
          var h = o & -o;
          if (t.lanes |= h, d = ct, d === null)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          h = St(h), Nf(
            h,
            d,
            t,
            ta(f, t)
          ), wc(t, h);
      }
      if (Qu(t), t.stateNode === null) {
        if (d = qo, f = a.contextType, "contextType" in a && f !== null && (f === void 0 || f.$$typeof !== Ua) && !G1.has(a) && (G1.add(a), h = f === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? " However, it is set to a " + typeof f + "." : f.$$typeof === bd ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", console.error(
          "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
          Ke(a) || "Component",
          h
        )), typeof f == "object" && f !== null && (d = it(f)), f = new a(i, d), t.mode & Fl) {
          Ze(!0);
          try {
            f = new a(i, d);
          } finally {
            Ze(!1);
          }
        }
        if (d = t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Wv, t.stateNode = f, f._reactInternals = t, f._reactInternalInstance = M1, typeof a.getDerivedStateFromProps == "function" && d === null && (d = Ke(a) || "Component", x1.has(d) || (x1.add(d), console.error(
          "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
          d,
          f.state === null ? "null" : "undefined",
          d
        ))), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function") {
          var p = h = d = null;
          if (typeof f.componentWillMount == "function" && f.componentWillMount.__suppressDeprecationWarning !== !0 ? d = "componentWillMount" : typeof f.UNSAFE_componentWillMount == "function" && (d = "UNSAFE_componentWillMount"), typeof f.componentWillReceiveProps == "function" && f.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? h = "componentWillReceiveProps" : typeof f.UNSAFE_componentWillReceiveProps == "function" && (h = "UNSAFE_componentWillReceiveProps"), typeof f.componentWillUpdate == "function" && f.componentWillUpdate.__suppressDeprecationWarning !== !0 ? p = "componentWillUpdate" : typeof f.UNSAFE_componentWillUpdate == "function" && (p = "UNSAFE_componentWillUpdate"), d !== null || h !== null || p !== null) {
            f = Ke(a) || "Component";
            var v = typeof a.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            C1.has(f) || (C1.add(f), console.error(
              `Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://react.dev/link/unsafe-component-lifecycles`,
              f,
              v,
              d !== null ? `
  ` + d : "",
              h !== null ? `
  ` + h : "",
              p !== null ? `
  ` + p : ""
            ));
          }
        }
        f = t.stateNode, d = Ke(a) || "Component", f.render || (a.prototype && typeof a.prototype.render == "function" ? console.error(
          "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
          d
        ) : console.error(
          "No `render` method found on the %s instance: you may have forgotten to define `render`.",
          d
        )), !f.getInitialState || f.getInitialState.isReactClassApproved || f.state || console.error(
          "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
          d
        ), f.getDefaultProps && !f.getDefaultProps.isReactClassApproved && console.error(
          "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
          d
        ), f.contextType && console.error(
          "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
          d
        ), a.childContextTypes && !Y1.has(a) && (Y1.add(a), console.error(
          "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
          d
        )), a.contextTypes && !q1.has(a) && (q1.add(a), console.error(
          "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
          d
        )), typeof f.componentShouldUpdate == "function" && console.error(
          "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
          d
        ), a.prototype && a.prototype.isPureReactComponent && typeof f.shouldComponentUpdate < "u" && console.error(
          "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
          Ke(a) || "A pure component"
        ), typeof f.componentDidUnmount == "function" && console.error(
          "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
          d
        ), typeof f.componentDidReceiveProps == "function" && console.error(
          "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
          d
        ), typeof f.componentWillRecieveProps == "function" && console.error(
          "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
          d
        ), typeof f.UNSAFE_componentWillRecieveProps == "function" && console.error(
          "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
          d
        ), h = f.props !== i, f.props !== void 0 && h && console.error(
          "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
          d
        ), f.defaultProps && console.error(
          "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
          d,
          d
        ), typeof f.getSnapshotBeforeUpdate != "function" || typeof f.componentDidUpdate == "function" || H1.has(a) || (H1.add(a), console.error(
          "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
          Ke(a)
        )), typeof f.getDerivedStateFromProps == "function" && console.error(
          "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof f.getDerivedStateFromError == "function" && console.error(
          "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof a.getSnapshotBeforeUpdate == "function" && console.error(
          "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
          d
        ), (h = f.state) && (typeof h != "object" || he(h)) && console.error("%s.state: must be set to an object or null", d), typeof f.getChildContext == "function" && typeof a.childContextTypes != "object" && console.error(
          "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
          d
        ), f = t.stateNode, f.props = i, f.state = t.memoizedState, f.refs = {}, Vl(t), d = a.contextType, f.context = typeof d == "object" && d !== null ? it(d) : qo, f.state === i && (d = Ke(a) || "Component", N1.has(d) || (N1.add(d), console.error(
          "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
          d
        ))), t.mode & Fl && Eu.recordLegacyContextWarning(
          t,
          f
        ), Eu.recordUnsafeLifecycleWarnings(
          t,
          f
        ), f.state = t.memoizedState, d = a.getDerivedStateFromProps, typeof d == "function" && (gt(
          t,
          a,
          d,
          i
        ), f.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (d = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), d !== f.state && (console.error(
          "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
          te(t) || "Component"
        ), Wv.enqueueReplaceState(
          f,
          f.state,
          null
        )), Zc(t, i, f, o), rn(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Au) !== dt && (t.flags |= 134217728), f = !0;
      } else if (e === null) {
        f = t.stateNode;
        var x = t.memoizedProps;
        h = Fu(a, x), f.props = h;
        var B = f.context;
        p = a.contextType, d = qo, typeof p == "object" && p !== null && (d = it(p)), v = a.getDerivedStateFromProps, p = typeof v == "function" || typeof f.getSnapshotBeforeUpdate == "function", x = t.pendingProps !== x, p || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (x || B !== d) && zr(
          t,
          f,
          i,
          d
        ), Yo = !1;
        var O = t.memoizedState;
        f.state = O, Zc(t, i, f, o), rn(), B = t.memoizedState, x || O !== B || Yo ? (typeof v == "function" && (gt(
          t,
          a,
          v,
          i
        ), B = t.memoizedState), (h = Yo || Er(
          t,
          a,
          h,
          i,
          O,
          B,
          d
        )) ? (p || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Au) !== dt && (t.flags |= 134217728)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Au) !== dt && (t.flags |= 134217728), t.memoizedProps = i, t.memoizedState = B), f.props = i, f.state = B, f.context = d, f = h) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Au) !== dt && (t.flags |= 134217728), f = !1);
      } else {
        f = t.stateNode, wu(e, t), d = t.memoizedProps, p = Fu(a, d), f.props = p, v = t.pendingProps, O = f.context, B = a.contextType, h = qo, typeof B == "object" && B !== null && (h = it(B)), x = a.getDerivedStateFromProps, (B = typeof x == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (d !== v || O !== h) && zr(
          t,
          f,
          i,
          h
        ), Yo = !1, O = t.memoizedState, f.state = O, Zc(t, i, f, o), rn();
        var Y = t.memoizedState;
        d !== v || O !== Y || Yo || e !== null && e.dependencies !== null && Xu(e.dependencies) ? (typeof x == "function" && (gt(
          t,
          a,
          x,
          i
        ), Y = t.memoizedState), (p = Yo || Er(
          t,
          a,
          p,
          i,
          O,
          Y,
          h
        ) || e !== null && e.dependencies !== null && Xu(e.dependencies)) ? (B || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(i, Y, h), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
          i,
          Y,
          h
        )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && O === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && O === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = Y), f.props = i, f.state = Y, f.context = h, f = p) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && O === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && O === e.memoizedState || (t.flags |= 1024), f = !1);
      }
      if (h = f, Yf(e, t), d = (t.flags & 128) !== 0, h || d) {
        if (h = t.stateNode, tf(t), d && typeof a.getDerivedStateFromError != "function")
          a = null, Ca = -1;
        else {
          if (tn(t), a = h1(h), t.mode & Fl) {
            Ze(!0);
            try {
              h1(h);
            } finally {
              Ze(!1);
            }
          }
          Mu();
        }
        t.flags |= 1, e !== null && d ? (t.child = Wd(
          t,
          e.child,
          null,
          o
        ), t.child = Wd(
          t,
          null,
          a,
          o
        )) : Ht(e, t, a, o), t.memoizedState = h.state, e = t.child;
      } else
        e = bn(
          e,
          t,
          o
        );
      return o = t.stateNode, f && o.props !== i && (Pd || console.error(
        "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
        te(t) || "a component"
      ), Pd = !0), e;
    }
    function ny(e, t, a, i) {
      return _i(), t.flags |= 256, Ht(e, t, a, i), t.child;
    }
    function Hr(e, t) {
      t && t.childContextTypes && console.error(
        `childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,
        t.displayName || t.name || "Component"
      ), typeof t.getDerivedStateFromProps == "function" && (e = Ke(t) || "Unknown", w1[e] || (console.error(
        "%s: Function components do not support getDerivedStateFromProps.",
        e
      ), w1[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = Ke(t) || "Unknown", Q1[t] || (console.error(
        "%s: Function components do not support contextType.",
        t
      ), Q1[t] = !0));
    }
    function Gf(e) {
      return { baseLanes: e, cachePool: U0() };
    }
    function Cr(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= en), e;
    }
    function B0(e, t, a) {
      var i, o = t.pendingProps;
      ke(t) && (t.flags |= 128);
      var f = !1, d = (t.flags & 128) !== 0;
      if ((i = d) || (i = e !== null && e.memoizedState === null ? !1 : (rl.current & Vm) !== 0), i && (f = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (we) {
          if (f ? aa(t) : Ja(t), we) {
            var h = Ct, p;
            if (!(p = !h)) {
              e: {
                var v = h;
                for (p = vi; v.nodeType !== 8; ) {
                  if (!p) {
                    p = null;
                    break e;
                  }
                  if (v = il(v.nextSibling), v === null) {
                    p = null;
                    break e;
                  }
                }
                p = v;
              }
              p !== null ? (Va(), t.memoizedState = {
                dehydrated: p,
                treeContext: Ts !== null ? { id: bc, overflow: Sc } : null,
                retryLane: 536870912,
                hydrationErrors: null
              }, v = oe(18, null, null, dt), v.stateNode = p, v.return = t, t.child = v, ra = t, Ct = null, p = !0) : p = !1, p = !p;
            }
            p && (Ch(
              t,
              h
            ), cn(t));
          }
          if (h = t.memoizedState, h !== null && (h = h.dehydrated, h !== null))
            return xn(h) ? t.lanes = 32 : t.lanes = 536870912, null;
          na(t);
        }
        return h = o.children, o = o.fallback, f ? (Ja(t), f = t.mode, h = Vf(
          {
            mode: "hidden",
            children: h
          },
          f
        ), o = Gu(
          o,
          f,
          a,
          null
        ), h.return = t, o.return = t, h.sibling = o, t.child = h, f = t.child, f.memoizedState = Gf(a), f.childLanes = Cr(
          e,
          i,
          a
        ), t.memoizedState = eg, o) : (aa(t), Nr(
          t,
          h
        ));
      }
      var x = e.memoizedState;
      if (x !== null && (h = x.dehydrated, h !== null)) {
        if (d)
          t.flags & 256 ? (aa(t), t.flags &= -257, t = Br(
            e,
            t,
            a
          )) : t.memoizedState !== null ? (Ja(t), t.child = e.child, t.flags |= 128, t = null) : (Ja(t), f = o.fallback, h = t.mode, o = Vf(
            {
              mode: "visible",
              children: o.children
            },
            h
          ), f = Gu(
            f,
            h,
            a,
            null
          ), f.flags |= 2, o.return = t, f.return = t, o.sibling = f, t.child = o, Wd(
            t,
            e.child,
            null,
            a
          ), o = t.child, o.memoizedState = Gf(a), o.childLanes = Cr(
            e,
            i,
            a
          ), t.memoizedState = eg, t = f);
        else if (aa(t), we && console.error(
          "We should not be hydrating here. This is a bug in React. Please file a bug."
        ), xn(h)) {
          if (i = h.nextSibling && h.nextSibling.dataset, i) {
            p = i.dgst;
            var B = i.msg;
            v = i.stck;
            var O = i.cstck;
          }
          h = B, i = p, o = v, p = f = O, f = Error(h || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), f.stack = o || "", f.digest = i, i = p === void 0 ? null : p, o = {
            value: f,
            source: null,
            stack: i
          }, typeof i == "string" && Bv.set(
            f,
            o
          ), Qc(o), t = Br(
            e,
            t,
            a
          );
        } else if (Sl || ll(
          e,
          t,
          a,
          !1
        ), i = (a & e.childLanes) !== 0, Sl || i) {
          if (i = ct, i !== null && (o = a & -a, o = o & 42 ? 1 : zl(
            o
          ), o = o & (i.suspendedLanes | a) ? 0 : o, o !== 0 && o !== x.retryLane))
            throw x.retryLane = o, Gl(
              e,
              o
            ), Tt(
              i,
              e,
              o
            ), _1;
          h.data === Rc || Jr(), t = Br(
            e,
            t,
            a
          );
        } else
          h.data === Rc ? (t.flags |= 192, t.child = e.child, t = null) : (e = x.treeContext, Ct = il(
            h.nextSibling
          ), ra = t, we = !0, As = null, Tc = !1, Xn = null, vi = !1, e !== null && (Va(), Vn[_n++] = bc, Vn[_n++] = Sc, Vn[_n++] = Ts, bc = e.id, Sc = e.overflow, Ts = t), t = Nr(
            t,
            o.children
          ), t.flags |= 4096);
        return t;
      }
      return f ? (Ja(t), f = o.fallback, h = t.mode, p = e.child, v = p.sibling, o = un(
        p,
        {
          mode: "hidden",
          children: o.children
        }
      ), o.subtreeFlags = p.subtreeFlags & 65011712, v !== null ? f = un(
        v,
        f
      ) : (f = Gu(
        f,
        h,
        a,
        null
      ), f.flags |= 2), f.return = t, o.return = t, o.sibling = f, t.child = o, o = f, f = t.child, h = e.child.memoizedState, h === null ? h = Gf(a) : (p = h.cachePool, p !== null ? (v = fl._currentValue, p = p.parent !== v ? { parent: v, pool: v } : p) : p = U0(), h = {
        baseLanes: h.baseLanes | a,
        cachePool: p
      }), f.memoizedState = h, f.childLanes = Cr(
        e,
        i,
        a
      ), t.memoizedState = eg, o) : (aa(t), a = e.child, e = a.sibling, a = un(a, {
        mode: "visible",
        children: o.children
      }), a.return = t, a.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function Nr(e, t) {
      return t = Vf(
        { mode: "visible", children: t },
        e.mode
      ), t.return = e, e.child = t;
    }
    function Vf(e, t) {
      return e = oe(22, e, null, t), e.lanes = 0, e.stateNode = {
        _visibility: vp,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }, e;
    }
    function Br(e, t, a) {
      return Wd(t, e.child, null, a), e = Nr(
        t,
        t.pendingProps.children
      ), e.flags |= 2, t.memoizedState = null, e;
    }
    function qr(e, t, a) {
      e.lanes |= t;
      var i = e.alternate;
      i !== null && (i.lanes |= t), Gh(
        e.return,
        t,
        a
      );
    }
    function uy(e, t) {
      var a = he(e);
      return e = !a && typeof Yt(e) == "function", a || e ? (a = a ? "array" : "iterable", console.error(
        "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
        a,
        t,
        a
      ), !1) : !0;
    }
    function Yr(e, t, a, i, o) {
      var f = e.memoizedState;
      f === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: o
      } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = a, f.tailMode = o);
    }
    function iy(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, f = i.tail;
      if (i = i.children, o !== void 0 && o !== "forwards" && o !== "backwards" && o !== "together" && !Z1[o])
        if (Z1[o] = !0, typeof o == "string")
          switch (o.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',
                o,
                o.toLowerCase()
              );
              break;
            case "forward":
            case "backward":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',
                o,
                o.toLowerCase()
              );
              break;
            default:
              console.error(
                '"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
                o
              );
          }
        else
          console.error(
            '%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
            o
          );
      f === void 0 || Pv[f] || (f !== "collapsed" && f !== "hidden" ? (Pv[f] = !0, console.error(
        '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',
        f
      )) : o !== "forwards" && o !== "backwards" && (Pv[f] = !0, console.error(
        '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
        f
      )));
      e: if ((o === "forwards" || o === "backwards") && i !== void 0 && i !== null && i !== !1)
        if (he(i)) {
          for (var d = 0; d < i.length; d++)
            if (!uy(i[d], d)) break e;
        } else if (d = Yt(i), typeof d == "function") {
          if (d = d.call(i))
            for (var h = d.next(), p = 0; !h.done; h = d.next()) {
              if (!uy(h.value, p)) break e;
              p++;
            }
        } else
          console.error(
            'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
            o
          );
      if (Ht(e, t, i, a), i = rl.current, i & Vm)
        i = i & Fd | Vm, t.flags |= 128;
      else {
        if (e !== null && e.flags & 128)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && qr(
                e,
                a,
                t
              );
            else if (e.tag === 19)
              qr(e, a, t);
            else if (e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break e;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
        i &= Fd;
      }
      switch (ze(rl, i, t), o) {
        case "forwards":
          for (a = t.child, o = null; a !== null; )
            e = a.alternate, e !== null && cu(e) === null && (o = a), a = a.sibling;
          a = o, a === null ? (o = t.child, t.child = null) : (o = a.sibling, a.sibling = null), Yr(
            t,
            !1,
            o,
            a,
            f
          );
          break;
        case "backwards":
          for (a = null, o = t.child, t.child = null; o !== null; ) {
            if (e = o.alternate, e !== null && cu(e) === null) {
              t.child = o;
              break;
            }
            e = o.sibling, o.sibling = a, a = o, o = e;
          }
          Yr(
            t,
            !0,
            a,
            null,
            f
          );
          break;
        case "together":
          Yr(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function bn(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), Ca = -1, Xo |= t.lanes, !(a & t.childLanes))
        if (e !== null) {
          if (ll(
            e,
            t,
            a,
            !1
          ), (a & t.childLanes) === 0)
            return null;
        } else return null;
      if (e !== null && t.child !== e.child)
        throw Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        for (e = t.child, a = un(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
          e = e.sibling, a = a.sibling = un(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function Gr(e, t) {
      return e.lanes & t ? !0 : (e = e.dependencies, !!(e !== null && Xu(e)));
    }
    function mv(e, t, a) {
      switch (t.tag) {
        case 3:
          qa(
            t,
            t.stateNode.containerInfo
          ), _u(
            t,
            fl,
            e.memoizedState.cache
          ), _i();
          break;
        case 27:
        case 5:
          Q(t);
          break;
        case 4:
          qa(
            t,
            t.stateNode.containerInfo
          );
          break;
        case 10:
          _u(
            t,
            t.type,
            t.memoizedProps.value
          );
          break;
        case 12:
          a & t.childLanes && (t.flags |= 4), t.flags |= 2048;
          var i = t.stateNode;
          i.effectDuration = -0, i.passiveEffectDuration = -0;
          break;
        case 13:
          if (i = t.memoizedState, i !== null)
            return i.dehydrated !== null ? (aa(t), t.flags |= 128, null) : a & t.child.childLanes ? B0(
              e,
              t,
              a
            ) : (aa(t), e = bn(
              e,
              t,
              a
            ), e !== null ? e.sibling : null);
          aa(t);
          break;
        case 19:
          var o = (e.flags & 128) !== 0;
          if (i = (a & t.childLanes) !== 0, i || (ll(
            e,
            t,
            a,
            !1
          ), i = (a & t.childLanes) !== 0), o) {
            if (i)
              return iy(
                e,
                t,
                a
              );
            t.flags |= 128;
          }
          if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), ze(
            rl,
            rl.current,
            t
          ), i) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, Mr(e, t, a);
        case 24:
          _u(
            t,
            fl,
            e.memoizedState.cache
          );
      }
      return bn(e, t, a);
    }
    function Vr(e, t, a) {
      if (t._debugNeedsRemount && e !== null) {
        a = nr(
          t.type,
          t.key,
          t.pendingProps,
          t._debugOwner || null,
          t.mode,
          t.lanes
        ), a._debugStack = t._debugStack, a._debugTask = t._debugTask;
        var i = t.return;
        if (i === null) throw Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, a._debugInfo = t._debugInfo, t === i.child)
          i.child = a;
        else {
          var o = i.child;
          if (o === null)
            throw Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        return t = i.deletions, t === null ? (i.deletions = [e], i.flags |= 16) : t.push(e), a.flags |= 2, a;
      }
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || t.type !== e.type)
          Sl = !0;
        else {
          if (!Gr(e, a) && !(t.flags & 128))
            return Sl = !1, mv(
              e,
              t,
              a
            );
          Sl = !!(e.flags & 131072);
        }
      else
        Sl = !1, (i = we) && (Va(), i = (t.flags & 1048576) !== 0), i && (i = t.index, Va(), R0(t, bp, i));
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: if (i = t.pendingProps, e = Vo(t.elementType), t.type = e, typeof e == "function")
            Uh(e) ? (i = Fu(
              e,
              i
            ), t.tag = 1, t.type = e = Yi(e), t = ay(
              null,
              t,
              e,
              i,
              a
            )) : (t.tag = 0, Hr(t, e), t.type = e = Yi(e), t = xr(
              null,
              t,
              e,
              i,
              a
            ));
          else {
            if (e != null) {
              if (o = e.$$typeof, o === mu) {
                t.tag = 11, t.type = e = Mh(e), t = Or(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              } else if (o === os) {
                t.tag = 14, t = gn(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              }
            }
            throw t = "", e !== null && typeof e == "object" && e.$$typeof === oa && (t = " Did you wrap a component in React.lazy() more than once?"), e = Ke(e) || e, Error(
              "Element type is invalid. Received a promise that resolves to: " + e + ". Lazy element type must resolve to a class or function." + t
            );
          }
          return t;
        case 0:
          return xr(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 1:
          return i = t.type, o = Fu(
            i,
            t.pendingProps
          ), ay(
            e,
            t,
            i,
            o,
            a
          );
        case 3:
          e: {
            if (qa(
              t,
              t.stateNode.containerInfo
            ), e === null)
              throw Error(
                "Should have a current fiber. This is a bug in React."
              );
            i = t.pendingProps;
            var f = t.memoizedState;
            o = f.element, wu(e, t), Zc(t, i, null, a);
            var d = t.memoizedState;
            if (i = d.cache, _u(t, fl, i), i !== f.cache && Vh(
              t,
              [fl],
              a,
              !0
            ), rn(), i = d.element, f.isDehydrated)
              if (f = {
                element: i,
                isDehydrated: !1,
                cache: d.cache
              }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
                t = ny(
                  e,
                  t,
                  i,
                  a
                );
                break e;
              } else if (i !== o) {
                o = ta(
                  Error(
                    "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                  ),
                  t
                ), Qc(o), t = ny(
                  e,
                  t,
                  i,
                  a
                );
                break e;
              } else {
                switch (e = t.stateNode.containerInfo, e.nodeType) {
                  case 9:
                    e = e.body;
                    break;
                  default:
                    e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
                }
                for (Ct = il(e.firstChild), ra = t, we = !0, As = null, Tc = !1, Xn = null, vi = !0, e = O1(
                  t,
                  null,
                  i,
                  a
                ), t.child = e; e; )
                  e.flags = e.flags & -3 | 4096, e = e.sibling;
              }
            else {
              if (_i(), i === o) {
                t = bn(
                  e,
                  t,
                  a
                );
                break e;
              }
              Ht(
                e,
                t,
                i,
                a
              );
            }
            t = t.child;
          }
          return t;
        case 26:
          return Yf(e, t), e === null ? (e = yu(
            t.type,
            null,
            t.pendingProps,
            null
          )) ? t.memoizedState = e : we || (e = t.type, a = t.pendingProps, i = dl(
            Cn.current
          ), i = xe(
            i
          ).createElement(e), i[bl] = t, i[kl] = a, Et(i, e, a), Lt(i), t.stateNode = i) : t.memoizedState = yu(
            t.type,
            e.memoizedProps,
            t.pendingProps,
            e.memoizedState
          ), null;
        case 27:
          return Q(t), e === null && we && (i = dl(Cn.current), o = E(), i = t.stateNode = Ly(
            t.type,
            t.pendingProps,
            i,
            o,
            !1
          ), Tc || (o = at(
            i,
            t.type,
            t.pendingProps,
            o
          ), o !== null && (_a(t, 0).serverProps = o)), ra = t, vi = !0, o = Ct, Un(t.type) ? (Eg = o, Ct = il(
            i.firstChild
          )) : Ct = o), Ht(
            e,
            t,
            t.pendingProps.children,
            a
          ), Yf(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && we && (f = E(), i = ks(
            t.type,
            f.ancestorInfo
          ), o = Ct, (d = !o) || (d = ni(
            o,
            t.type,
            t.pendingProps,
            vi
          ), d !== null ? (t.stateNode = d, Tc || (f = at(
            d,
            t.type,
            t.pendingProps,
            f
          ), f !== null && (_a(t, 0).serverProps = f)), ra = t, Ct = il(
            d.firstChild
          ), vi = !1, f = !0) : f = !1, d = !f), d && (i && Ch(t, o), cn(t))), Q(t), o = t.type, f = t.pendingProps, d = e !== null ? e.memoizedProps : null, i = f.children, Mn(o, f) ? i = null : d !== null && Mn(o, d) && (t.flags |= 32), t.memoizedState !== null && (o = Ju(
            e,
            t,
            Sa,
            null,
            null,
            a
          ), Pm._currentValue = o), Yf(e, t), Ht(
            e,
            t,
            i,
            a
          ), t.child;
        case 6:
          return e === null && we && (e = t.pendingProps, a = E(), i = a.ancestorInfo.current, e = i != null ? of(
            e,
            i.tag,
            a.ancestorInfo.implicitRootScope
          ) : !0, a = Ct, (i = !a) || (i = ul(
            a,
            t.pendingProps,
            vi
          ), i !== null ? (t.stateNode = i, ra = t, Ct = null, i = !0) : i = !1, i = !i), i && (e && Ch(t, a), cn(t))), null;
        case 13:
          return B0(e, t, a);
        case 4:
          return qa(
            t,
            t.stateNode.containerInfo
          ), i = t.pendingProps, e === null ? t.child = Wd(
            t,
            null,
            i,
            a
          ) : Ht(
            e,
            t,
            i,
            a
          ), t.child;
        case 11:
          return Or(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 7:
          return Ht(
            e,
            t,
            t.pendingProps,
            a
          ), t.child;
        case 8:
          return Ht(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 12:
          return t.flags |= 4, t.flags |= 2048, i = t.stateNode, i.effectDuration = -0, i.passiveEffectDuration = -0, Ht(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 10:
          return i = t.type, o = t.pendingProps, f = o.value, "value" in o || L1 || (L1 = !0, console.error(
            "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
          )), _u(t, i, f), Ht(
            e,
            t,
            o.children,
            a
          ), t.child;
        case 9:
          return o = t.type._context, i = t.pendingProps.children, typeof i != "function" && console.error(
            "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
          ), Qu(t), o = it(o), tn(t), i = Kv(
            i,
            o,
            void 0
          ), Mu(), t.flags |= 1, Ht(
            e,
            t,
            i,
            a
          ), t.child;
        case 14:
          return gn(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 15:
          return qf(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 19:
          return iy(
            e,
            t,
            a
          );
        case 31:
          return i = t.pendingProps, a = t.mode, i = {
            mode: i.mode,
            children: i.children
          }, e === null ? (e = Vf(
            i,
            a
          ), e.ref = t.ref, t.child = e, e.return = t, t = e) : (e = un(e.child, i), e.ref = t.ref, t.child = e, e.return = t, t = e), t;
        case 22:
          return Mr(e, t, a);
        case 24:
          return Qu(t), i = it(fl), e === null ? (o = Qh(), o === null && (o = ct, f = gf(), o.pooledCache = f, Xi(f), f !== null && (o.pooledCacheLanes |= a), o = f), t.memoizedState = {
            parent: i,
            cache: o
          }, Vl(t), _u(t, fl, o)) : (e.lanes & a && (wu(e, t), Zc(t, null, null, a), rn()), o = e.memoizedState, f = t.memoizedState, o.parent !== i ? (o = {
            parent: i,
            cache: i
          }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), _u(t, fl, i)) : (i = f.cache, _u(t, fl, i), i !== o.cache && Vh(
            t,
            [fl],
            a,
            !0
          ))), Ht(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function jl(e) {
      e.flags |= 4;
    }
    function _f(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & Ln) !== Gs)
        e.flags &= -16777217;
      else if (e.flags |= 16777216, !Pf(t)) {
        if (t = Zn.current, t !== null && ((Ne & 4194048) === Ne ? bi !== null : (Ne & 62914560) !== Ne && !(Ne & 536870912) || t !== bi))
          throw Bm = Xv, t1;
        e.flags |= 8192;
      }
    }
    function Xf(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Io() : 536870912, e.lanes |= t, Hs |= t);
    }
    function Iu(e, t) {
      if (!we)
        switch (e.tailMode) {
          case "hidden":
            t = e.tail;
            for (var a = null; t !== null; )
              t.alternate !== null && (a = t), t = t.sibling;
            a === null ? e.tail = null : a.sibling = null;
            break;
          case "collapsed":
            a = e.tail;
            for (var i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
        }
    }
    function Pe(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = 0, i = 0;
      if (t)
        if ((e.mode & Cl) !== dt) {
          for (var o = e.selfBaseDuration, f = e.child; f !== null; )
            a |= f.lanes | f.childLanes, i |= f.subtreeFlags & 65011712, i |= f.flags & 65011712, o += f.treeBaseDuration, f = f.sibling;
          e.treeBaseDuration = o;
        } else
          for (o = e.child; o !== null; )
            a |= o.lanes | o.childLanes, i |= o.subtreeFlags & 65011712, i |= o.flags & 65011712, o.return = e, o = o.sibling;
      else if ((e.mode & Cl) !== dt) {
        o = e.actualDuration, f = e.selfBaseDuration;
        for (var d = e.child; d !== null; )
          a |= d.lanes | d.childLanes, i |= d.subtreeFlags, i |= d.flags, o += d.actualDuration, f += d.treeBaseDuration, d = d.sibling;
        e.actualDuration = o, e.treeBaseDuration = f;
      } else
        for (o = e.child; o !== null; )
          a |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
      return e.subtreeFlags |= i, e.childLanes = a, t;
    }
    function q0(e, t, a) {
      var i = t.pendingProps;
      switch (ir(t), t.tag) {
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
          return Pe(t), null;
        case 1:
          return Pe(t), null;
        case 3:
          return a = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), eu(fl, t), hl(t), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Vi(t) ? (Yh(), jl(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, qh())), Pe(t), null;
        case 26:
          return a = t.memoizedState, e === null ? (jl(t), a !== null ? (Pe(t), _f(
            t,
            a
          )) : (Pe(t), t.flags &= -16777217)) : a ? a !== e.memoizedState ? (jl(t), Pe(t), _f(
            t,
            a
          )) : (Pe(t), t.flags &= -16777217) : (e.memoizedProps !== i && jl(t), Pe(t), t.flags &= -16777217), null;
        case 27:
          Z(t), a = dl(Cn.current);
          var o = t.type;
          if (e !== null && t.stateNode != null)
            e.memoizedProps !== i && jl(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return Pe(t), null;
            }
            e = E(), Vi(t) ? Nh(t) : (e = Ly(
              o,
              i,
              a,
              e,
              !0
            ), t.stateNode = e, jl(t));
          }
          return Pe(t), null;
        case 5:
          if (Z(t), a = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== i && jl(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return Pe(t), null;
            }
            if (o = E(), Vi(t))
              Nh(t);
            else {
              switch (e = dl(Cn.current), ks(a, o.ancestorInfo), o = o.context, e = xe(e), o) {
                case oh:
                  e = e.createElementNS(Bo, a);
                  break;
                case Jp:
                  e = e.createElementNS(
                    bs,
                    a
                  );
                  break;
                default:
                  switch (a) {
                    case "svg":
                      e = e.createElementNS(
                        Bo,
                        a
                      );
                      break;
                    case "math":
                      e = e.createElementNS(
                        bs,
                        a
                      );
                      break;
                    case "script":
                      e = e.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                      break;
                    case "select":
                      e = typeof i.is == "string" ? e.createElement("select", { is: i.is }) : e.createElement("select"), i.multiple ? e.multiple = !0 : i.size && (e.size = i.size);
                      break;
                    default:
                      e = typeof i.is == "string" ? e.createElement(a, {
                        is: i.is
                      }) : e.createElement(a), a.indexOf("-") === -1 && (a !== a.toLowerCase() && console.error(
                        "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                        a
                      ), Object.prototype.toString.call(e) !== "[object HTMLUnknownElement]" || vu.call(
                        sb,
                        a
                      ) || (sb[a] = !0, console.error(
                        "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                        a
                      )));
                  }
              }
              e[bl] = t, e[kl] = i;
              e: for (o = t.child; o !== null; ) {
                if (o.tag === 5 || o.tag === 6)
                  e.appendChild(o.stateNode);
                else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                  o.child.return = o, o = o.child;
                  continue;
                }
                if (o === t) break e;
                for (; o.sibling === null; ) {
                  if (o.return === null || o.return === t)
                    break e;
                  o = o.return;
                }
                o.sibling.return = o.return, o = o.sibling;
              }
              t.stateNode = e;
              e: switch (Et(e, a, i), a) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  e = !!i.autoFocus;
                  break e;
                case "img":
                  e = !0;
                  break e;
                default:
                  e = !1;
              }
              e && jl(t);
            }
          }
          return Pe(t), t.flags &= -16777217, null;
        case 6:
          if (e && t.stateNode != null)
            e.memoizedProps !== i && jl(t);
          else {
            if (typeof i != "string" && t.stateNode === null)
              throw Error(
                "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
              );
            if (e = dl(Cn.current), a = E(), Vi(t)) {
              e = t.stateNode, a = t.memoizedProps, o = !Tc, i = null;
              var f = ra;
              if (f !== null)
                switch (f.tag) {
                  case 3:
                    o && (o = sd(
                      e,
                      a,
                      i
                    ), o !== null && (_a(t, 0).serverProps = o));
                    break;
                  case 27:
                  case 5:
                    i = f.memoizedProps, o && (o = sd(
                      e,
                      a,
                      i
                    ), o !== null && (_a(
                      t,
                      0
                    ).serverProps = o));
                }
              e[bl] = t, e = !!(e.nodeValue === a || i !== null && i.suppressHydrationWarning === !0 || qy(e.nodeValue, a)), e || cn(t);
            } else
              o = a.ancestorInfo.current, o != null && of(
                i,
                o.tag,
                a.ancestorInfo.implicitRootScope
              ), e = xe(e).createTextNode(
                i
              ), e[bl] = t, t.stateNode = e;
          }
          return Pe(t), null;
        case 13:
          if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (o = Vi(t), i !== null && i.dehydrated !== null) {
              if (e === null) {
                if (!o)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
                  throw Error(
                    "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                o[bl] = t, Pe(t), (t.mode & Cl) !== dt && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              } else
                Yh(), _i(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4, Pe(t), (t.mode & Cl) !== dt && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              o = !1;
            } else
              o = qh(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
            if (!o)
              return t.flags & 256 ? (na(t), t) : (na(t), null);
          }
          return na(t), t.flags & 128 ? (t.lanes = a, (t.mode & Cl) !== dt && fn(t), t) : (a = i !== null, e = e !== null && e.memoizedState !== null, a && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), f = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (f = i.memoizedState.cachePool.pool), f !== o && (i.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Xf(t, t.updateQueue), Pe(t), (t.mode & Cl) !== dt && a && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
        case 4:
          return hl(t), e === null && Ny(
            t.stateNode.containerInfo
          ), Pe(t), null;
        case 10:
          return eu(t.type, t), Pe(t), null;
        case 19:
          if (lt(rl, t), o = t.memoizedState, o === null) return Pe(t), null;
          if (i = (t.flags & 128) !== 0, f = o.rendering, f === null)
            if (i) Iu(o, !1);
            else {
              if (Nt !== Dc || e !== null && e.flags & 128)
                for (e = t.child; e !== null; ) {
                  if (f = cu(e), f !== null) {
                    for (t.flags |= 128, Iu(o, !1), e = f.updateQueue, t.updateQueue = e, Xf(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                      xh(a, e), a = a.sibling;
                    return ze(
                      rl,
                      rl.current & Fd | Vm,
                      t
                    ), t.child;
                  }
                  e = e.sibling;
                }
              o.tail !== null && Nn() > Bp && (t.flags |= 128, i = !0, Iu(o, !1), t.lanes = 4194304);
            }
          else {
            if (!i)
              if (e = cu(f), e !== null) {
                if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Xf(t, e), Iu(o, !0), o.tail === null && o.tailMode === "hidden" && !f.alternate && !we)
                  return Pe(t), null;
              } else
                2 * Nn() - o.renderingStartTime > Bp && a !== 536870912 && (t.flags |= 128, i = !0, Iu(o, !1), t.lanes = 4194304);
            o.isBackwards ? (f.sibling = t.child, t.child = f) : (e = o.last, e !== null ? e.sibling = f : t.child = f, o.last = f);
          }
          return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = Nn(), e.sibling = null, a = rl.current, a = i ? a & Fd | Vm : a & Fd, ze(rl, a, t), e) : (Pe(t), null);
        case 22:
        case 23:
          return na(t), wa(t), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? a & 536870912 && !(t.flags & 128) && (Pe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Pe(t), a = t.updateQueue, a !== null && Xf(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== a && (t.flags |= 2048), e !== null && lt(Ds, t), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), eu(fl, t), Pe(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Y0(e, t) {
      switch (ir(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Cl) !== dt && fn(t), t) : null;
        case 3:
          return eu(fl, t), hl(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return Z(t), null;
        case 13:
          if (na(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            _i();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Cl) !== dt && fn(t), t) : null;
        case 19:
          return lt(rl, t), null;
        case 4:
          return hl(t), null;
        case 10:
          return eu(t.type, t), null;
        case 22:
        case 23:
          return na(t), wa(t), e !== null && lt(Ds, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Cl) !== dt && fn(t), t) : null;
        case 24:
          return eu(fl, t), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function cy(e, t) {
      switch (ir(t), t.tag) {
        case 3:
          eu(fl, t), hl(t);
          break;
        case 26:
        case 27:
        case 5:
          Z(t);
          break;
        case 4:
          hl(t);
          break;
        case 13:
          na(t);
          break;
        case 19:
          lt(rl, t);
          break;
        case 10:
          eu(t.type, t);
          break;
        case 22:
        case 23:
          na(t), wa(t), e !== null && lt(Ds, t);
          break;
        case 24:
          eu(fl, t);
      }
    }
    function Ka(e) {
      return (e.mode & Cl) !== dt;
    }
    function oy(e, t) {
      Ka(e) ? (Qa(), ki(t, e), va()) : ki(t, e);
    }
    function _r(e, t, a) {
      Ka(e) ? (Qa(), Wi(
        a,
        e,
        t
      ), va()) : Wi(
        a,
        e,
        t
      );
    }
    function ki(e, t) {
      try {
        var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
        if (i !== null) {
          var o = i.next;
          a = o;
          do {
            if ((a.tag & e) === e && ((e & sl) !== Qn ? K !== null && typeof K.markComponentPassiveEffectMountStarted == "function" && K.markComponentPassiveEffectMountStarted(
              t
            ) : (e & Nl) !== Qn && K !== null && typeof K.markComponentLayoutEffectMountStarted == "function" && K.markComponentLayoutEffectMountStarted(
              t
            ), i = void 0, (e & da) !== Qn && (ih = !0), i = k(
              t,
              AS,
              a
            ), (e & da) !== Qn && (ih = !1), (e & sl) !== Qn ? K !== null && typeof K.markComponentPassiveEffectMountStopped == "function" && K.markComponentPassiveEffectMountStopped() : (e & Nl) !== Qn && K !== null && typeof K.markComponentLayoutEffectMountStopped == "function" && K.markComponentLayoutEffectMountStopped(), i !== void 0 && typeof i != "function")) {
              var f = void 0;
              f = a.tag & Nl ? "useLayoutEffect" : a.tag & da ? "useInsertionEffect" : "useEffect";
              var d = void 0;
              d = i === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof i.then == "function" ? `

It looks like you wrote ` + f + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + f + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching` : " You returned: " + i, k(
                t,
                function(h, p) {
                  console.error(
                    "%s must not return anything besides a function, which is used for clean-up.%s",
                    h,
                    p
                  );
                },
                f,
                d
              );
            }
            a = a.next;
          } while (a !== o);
        }
      } catch (h) {
        ue(t, t.return, h);
      }
    }
    function Wi(e, t, a) {
      try {
        var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
        if (o !== null) {
          var f = o.next;
          i = f;
          do {
            if ((i.tag & e) === e) {
              var d = i.inst, h = d.destroy;
              h !== void 0 && (d.destroy = void 0, (e & sl) !== Qn ? K !== null && typeof K.markComponentPassiveEffectUnmountStarted == "function" && K.markComponentPassiveEffectUnmountStarted(
                t
              ) : (e & Nl) !== Qn && K !== null && typeof K.markComponentLayoutEffectUnmountStarted == "function" && K.markComponentLayoutEffectUnmountStarted(
                t
              ), (e & da) !== Qn && (ih = !0), o = t, k(
                o,
                ES,
                o,
                a,
                h
              ), (e & da) !== Qn && (ih = !1), (e & sl) !== Qn ? K !== null && typeof K.markComponentPassiveEffectUnmountStopped == "function" && K.markComponentPassiveEffectUnmountStopped() : (e & Nl) !== Qn && K !== null && typeof K.markComponentLayoutEffectUnmountStopped == "function" && K.markComponentLayoutEffectUnmountStopped());
            }
            i = i.next;
          } while (i !== f);
        }
      } catch (p) {
        ue(t, t.return, p);
      }
    }
    function fy(e, t) {
      Ka(e) ? (Qa(), ki(t, e), va()) : ki(t, e);
    }
    function Qf(e, t, a) {
      Ka(e) ? (Qa(), Wi(
        a,
        e,
        t
      ), va()) : Wi(
        a,
        e,
        t
      );
    }
    function sy(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        e.type.defaultProps || "ref" in e.memoizedProps || Pd || (a.props !== e.memoizedProps && console.error(
          "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
          te(e) || "instance"
        ), a.state !== e.memoizedState && console.error(
          "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
          te(e) || "instance"
        ));
        try {
          k(
            e,
            x0,
            t,
            a
          );
        } catch (i) {
          ue(e, e.return, i);
        }
      }
    }
    function G0(e, t, a) {
      return e.getSnapshotBeforeUpdate(t, a);
    }
    function pv(e, t) {
      var a = t.memoizedProps, i = t.memoizedState;
      t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || Pd || (t.props !== e.memoizedProps && console.error(
        "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
        te(e) || "instance"
      ), t.state !== e.memoizedState && console.error(
        "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
        te(e) || "instance"
      ));
      try {
        var o = Fu(
          e.type,
          a,
          e.elementType === e.type
        ), f = k(
          e,
          G0,
          t,
          o,
          i
        );
        a = J1, f !== void 0 || a.has(e.type) || (a.add(e.type), k(e, function() {
          console.error(
            "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
            te(e)
          );
        })), t.__reactInternalSnapshotBeforeUpdate = f;
      } catch (d) {
        ue(e, e.return, d);
      }
    }
    function Xr(e, t, a) {
      a.props = Fu(
        e.type,
        e.memoizedProps
      ), a.state = e.memoizedState, Ka(e) ? (Qa(), k(
        e,
        b1,
        e,
        t,
        a
      ), va()) : k(
        e,
        b1,
        e,
        t,
        a
      );
    }
    function V0(e) {
      var t = e.ref;
      if (t !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        if (typeof t == "function")
          if (Ka(e))
            try {
              Qa(), e.refCleanup = t(a);
            } finally {
              va();
            }
          else e.refCleanup = t(a);
        else
          typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error(
            "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
            te(e)
          ), t.current = a;
      }
    }
    function no(e, t) {
      try {
        k(e, V0, e);
      } catch (a) {
        ue(e, t, a);
      }
    }
    function Da(e, t) {
      var a = e.ref, i = e.refCleanup;
      if (a !== null)
        if (typeof i == "function")
          try {
            if (Ka(e))
              try {
                Qa(), k(e, i);
              } finally {
                va(e);
              }
            else k(e, i);
          } catch (o) {
            ue(e, t, o);
          } finally {
            e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
          }
        else if (typeof a == "function")
          try {
            if (Ka(e))
              try {
                Qa(), k(e, a, null);
              } finally {
                va(e);
              }
            else k(e, a, null);
          } catch (o) {
            ue(e, t, o);
          }
        else a.current = null;
    }
    function ry(e, t, a, i) {
      var o = e.memoizedProps, f = o.id, d = o.onCommit;
      o = o.onRender, t = t === null ? "mount" : "update", Ap && (t = "nested-update"), typeof o == "function" && o(
        f,
        t,
        e.actualDuration,
        e.treeBaseDuration,
        e.actualStartTime,
        a
      ), typeof d == "function" && d(
        e.memoizedProps.id,
        t,
        i,
        a
      );
    }
    function _0(e, t, a, i) {
      var o = e.memoizedProps;
      e = o.id, o = o.onPostCommit, t = t === null ? "mount" : "update", Ap && (t = "nested-update"), typeof o == "function" && o(
        e,
        t,
        i,
        a
      );
    }
    function X0(e) {
      var t = e.type, a = e.memoizedProps, i = e.stateNode;
      try {
        k(
          e,
          du,
          i,
          t,
          a,
          e
        );
      } catch (o) {
        ue(e, e.return, o);
      }
    }
    function dy(e, t, a) {
      try {
        k(
          e,
          zt,
          e.stateNode,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        ue(e, e.return, i);
      }
    }
    function hy(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Un(e.type) || e.tag === 4;
    }
    function Fi(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || hy(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && Un(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function jf(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = ru));
      else if (i !== 4 && (i === 27 && Un(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
        for (jf(e, t, a), e = e.sibling; e !== null; )
          jf(e, t, a), e = e.sibling;
    }
    function Ii(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (i !== 4 && (i === 27 && Un(e.type) && (a = e.stateNode), e = e.child, e !== null))
        for (Ii(e, t, a), e = e.sibling; e !== null; )
          Ii(e, t, a), e = e.sibling;
    }
    function Q0(e) {
      for (var t, a = e.return; a !== null; ) {
        if (hy(a)) {
          t = a;
          break;
        }
        a = a.return;
      }
      if (t == null)
        throw Error(
          "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
        );
      switch (t.tag) {
        case 27:
          t = t.stateNode, a = Fi(e), Ii(
            e,
            a,
            t
          );
          break;
        case 5:
          a = t.stateNode, t.flags & 32 && (hu(a), t.flags &= -33), t = Fi(e), Ii(
            e,
            t,
            a
          );
          break;
        case 3:
        case 4:
          t = t.stateNode.containerInfo, a = Fi(e), jf(
            e,
            a,
            t
          );
          break;
        default:
          throw Error(
            "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
          );
      }
    }
    function yy(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        k(
          e,
          ca,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        ue(e, e.return, i);
      }
    }
    function Qr(e, t) {
      if (e = e.containerInfo, Sg = Wp, e = T0(e), Rh(e)) {
        if ("selectionStart" in e)
          var a = {
            start: e.selectionStart,
            end: e.selectionEnd
          };
        else
          e: {
            a = (a = e.ownerDocument) && a.defaultView || window;
            var i = a.getSelection && a.getSelection();
            if (i && i.rangeCount !== 0) {
              a = i.anchorNode;
              var o = i.anchorOffset, f = i.focusNode;
              i = i.focusOffset;
              try {
                a.nodeType, f.nodeType;
              } catch {
                a = null;
                break e;
              }
              var d = 0, h = -1, p = -1, v = 0, x = 0, B = e, O = null;
              t: for (; ; ) {
                for (var Y; B !== a || o !== 0 && B.nodeType !== 3 || (h = d + o), B !== f || i !== 0 && B.nodeType !== 3 || (p = d + i), B.nodeType === 3 && (d += B.nodeValue.length), (Y = B.firstChild) !== null; )
                  O = B, B = Y;
                for (; ; ) {
                  if (B === e) break t;
                  if (O === a && ++v === o && (h = d), O === f && ++x === i && (p = d), (Y = B.nextSibling) !== null) break;
                  B = O, O = B.parentNode;
                }
                B = Y;
              }
              a = h === -1 || p === -1 ? null : { start: h, end: p };
            } else a = null;
          }
        a = a || { start: 0, end: 0 };
      } else a = null;
      for (Tg = {
        focusedElem: e,
        selectionRange: a
      }, Wp = !1, Tl = t; Tl !== null; )
        if (t = Tl, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null)
          e.return = t, Tl = e;
        else
          for (; Tl !== null; ) {
            switch (e = t = Tl, a = e.alternate, o = e.flags, e.tag) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                o & 1024 && a !== null && pv(e, a);
                break;
              case 3:
                if (o & 1024) {
                  if (e = e.stateNode.containerInfo, a = e.nodeType, a === 9)
                    po(e);
                  else if (a === 1)
                    switch (e.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        po(e);
                        break;
                      default:
                        e.textContent = "";
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
                if (o & 1024)
                  throw Error(
                    "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."
                  );
            }
            if (e = t.sibling, e !== null) {
              e.return = t.return, Tl = e;
              break;
            }
            Tl = t.return;
          }
    }
    function my(e, t, a) {
      var i = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Sn(e, a), i & 4 && oy(a, Nl | jn);
          break;
        case 1:
          if (Sn(e, a), i & 4)
            if (e = a.stateNode, t === null)
              a.type.defaultProps || "ref" in a.memoizedProps || Pd || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                te(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                te(a) || "instance"
              )), Ka(a) ? (Qa(), k(
                a,
                $v,
                a,
                e
              ), va()) : k(
                a,
                $v,
                a,
                e
              );
            else {
              var o = Fu(
                a.type,
                t.memoizedProps
              );
              t = t.memoizedState, a.type.defaultProps || "ref" in a.memoizedProps || Pd || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                te(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                te(a) || "instance"
              )), Ka(a) ? (Qa(), k(
                a,
                p1,
                a,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              ), va()) : k(
                a,
                p1,
                a,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            }
          i & 64 && sy(a), i & 512 && no(a, a.return);
          break;
        case 3:
          if (t = Xa(), Sn(e, a), i & 64 && (i = a.updateQueue, i !== null)) {
            if (o = null, a.child !== null)
              switch (a.child.tag) {
                case 27:
                case 5:
                  o = a.child.stateNode;
                  break;
                case 1:
                  o = a.child.stateNode;
              }
            try {
              k(
                a,
                x0,
                i,
                o
              );
            } catch (d) {
              ue(a, a.return, d);
            }
          }
          e.effectDuration += ju(t);
          break;
        case 27:
          t === null && i & 4 && yy(a);
        case 26:
        case 5:
          Sn(e, a), t === null && i & 4 && X0(a), i & 512 && no(a, a.return);
          break;
        case 12:
          if (i & 4) {
            i = Xa(), Sn(e, a), e = a.stateNode, e.effectDuration += Qi(i);
            try {
              k(
                a,
                ry,
                a,
                t,
                Tp,
                e.effectDuration
              );
            } catch (d) {
              ue(a, a.return, d);
            }
          } else Sn(e, a);
          break;
        case 13:
          Sn(e, a), i & 4 && uo(e, a), i & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Wf.bind(
            null,
            a
          ), vo(e, a))));
          break;
        case 22:
          if (i = a.memoizedState !== null || zc, !i) {
            t = t !== null && t.memoizedState !== null || wt, o = zc;
            var f = wt;
            zc = i, (wt = t) && !f ? Tn(
              e,
              a,
              (a.subtreeFlags & 8772) !== 0
            ) : Sn(e, a), zc = o, wt = f;
          }
          break;
        case 30:
          break;
        default:
          Sn(e, a);
      }
    }
    function py(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, py(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Nc(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function ou(e, t, a) {
      for (a = a.child; a !== null; )
        Pi(
          e,
          t,
          a
        ), a = a.sibling;
    }
    function Pi(e, t, a) {
      if (cl && typeof cl.onCommitFiberUnmount == "function")
        try {
          cl.onCommitFiberUnmount(ri, a);
        } catch (f) {
          $l || ($l = !0, console.error(
            "React instrumentation encountered an error: %s",
            f
          ));
        }
      switch (a.tag) {
        case 26:
          wt || Da(a, t), ou(
            e,
            t,
            a
          ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          wt || Da(a, t);
          var i = Pt, o = Na;
          Un(a.type) && (Pt = a.stateNode, Na = !1), ou(
            e,
            t,
            a
          ), k(
            a,
            bo,
            a.stateNode
          ), Pt = i, Na = o;
          break;
        case 5:
          wt || Da(a, t);
        case 6:
          if (i = Pt, o = Na, Pt = null, ou(
            e,
            t,
            a
          ), Pt = i, Na = o, Pt !== null)
            if (Na)
              try {
                k(
                  a,
                  yo,
                  Pt,
                  a.stateNode
                );
              } catch (f) {
                ue(
                  a,
                  t,
                  f
                );
              }
            else
              try {
                k(
                  a,
                  Ma,
                  Pt,
                  a.stateNode
                );
              } catch (f) {
                ue(
                  a,
                  t,
                  f
                );
              }
          break;
        case 18:
          Pt !== null && (Na ? (e = Pt, mo(
            e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
            a.stateNode
          ), dc(e)) : mo(Pt, a.stateNode));
          break;
        case 4:
          i = Pt, o = Na, Pt = a.stateNode.containerInfo, Na = !0, ou(
            e,
            t,
            a
          ), Pt = i, Na = o;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          wt || Wi(
            da,
            a,
            t
          ), wt || _r(
            a,
            t,
            Nl
          ), ou(
            e,
            t,
            a
          );
          break;
        case 1:
          wt || (Da(a, t), i = a.stateNode, typeof i.componentWillUnmount == "function" && Xr(
            a,
            t,
            i
          )), ou(
            e,
            t,
            a
          );
          break;
        case 21:
          ou(
            e,
            t,
            a
          );
          break;
        case 22:
          wt = (i = wt) || a.memoizedState !== null, ou(
            e,
            t,
            a
          ), wt = i;
          break;
        default:
          ou(
            e,
            t,
            a
          );
      }
    }
    function uo(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
        try {
          k(
            t,
            ia,
            e
          );
        } catch (a) {
          ue(t, t.return, a);
        }
    }
    function jr(e) {
      switch (e.tag) {
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new K1()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new K1()), t;
        default:
          throw Error(
            "Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React."
          );
      }
    }
    function ec(e, t) {
      var a = jr(e);
      t.forEach(function(i) {
        var o = li.bind(null, e, i);
        if (!a.has(i)) {
          if (a.add(i), Rt)
            if (eh !== null && th !== null)
              ro(th, eh);
            else
              throw Error(
                "Expected finished root and lanes to be set. This is a bug in React."
              );
          i.then(o, o);
        }
      });
    }
    function pl(e, t) {
      var a = t.deletions;
      if (a !== null)
        for (var i = 0; i < a.length; i++) {
          var o = e, f = t, d = a[i], h = f;
          e: for (; h !== null; ) {
            switch (h.tag) {
              case 27:
                if (Un(h.type)) {
                  Pt = h.stateNode, Na = !1;
                  break e;
                }
                break;
              case 5:
                Pt = h.stateNode, Na = !1;
                break e;
              case 3:
              case 4:
                Pt = h.stateNode.containerInfo, Na = !0;
                break e;
            }
            h = h.return;
          }
          if (Pt === null)
            throw Error(
              "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
            );
          Pi(o, f, d), Pt = null, Na = !1, o = d, f = o.alternate, f !== null && (f.return = null), o.return = null;
        }
      if (t.subtreeFlags & 13878)
        for (t = t.child; t !== null; )
          vy(t, e), t = t.sibling;
    }
    function vy(e, t) {
      var a = e.alternate, i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          pl(t, e), wl(e), i & 4 && (Wi(
            da | jn,
            e,
            e.return
          ), ki(da | jn, e), _r(
            e,
            e.return,
            Nl | jn
          ));
          break;
        case 1:
          pl(t, e), wl(e), i & 512 && (wt || a === null || Da(a, a.return)), i & 64 && zc && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? i : a.concat(i))));
          break;
        case 26:
          var o = Du;
          if (pl(t, e), wl(e), i & 512 && (wt || a === null || Da(a, a.return)), i & 4)
            if (t = a !== null ? a.memoizedState : null, i = e.memoizedState, a === null)
              if (i === null)
                if (e.stateNode === null) {
                  e: {
                    i = e.type, a = e.memoizedProps, t = o.ownerDocument || o;
                    t: switch (i) {
                      case "title":
                        o = t.getElementsByTagName("title")[0], (!o || o[xo] || o[bl] || o.namespaceURI === Bo || o.hasAttribute("itemprop")) && (o = t.createElement(i), t.head.insertBefore(
                          o,
                          t.querySelector("head > title")
                        )), Et(o, i, a), o[bl] = e, Lt(o), i = o;
                        break e;
                      case "link":
                        var f = ky(
                          "link",
                          "href",
                          t
                        ).get(i + (a.href || ""));
                        if (f) {
                          for (var d = 0; d < f.length; d++)
                            if (o = f[d], o.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && o.getAttribute("rel") === (a.rel == null ? null : a.rel) && o.getAttribute("title") === (a.title == null ? null : a.title) && o.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), Et(o, i, a), t.head.appendChild(o);
                        break;
                      case "meta":
                        if (f = ky(
                          "meta",
                          "content",
                          t
                        ).get(i + (a.content || ""))) {
                          for (d = 0; d < f.length; d++)
                            if (o = f[d], le(
                              a.content,
                              "content"
                            ), o.getAttribute("content") === (a.content == null ? null : "" + a.content) && o.getAttribute("name") === (a.name == null ? null : a.name) && o.getAttribute("property") === (a.property == null ? null : a.property) && o.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && o.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), Et(o, i, a), t.head.appendChild(o);
                        break;
                      default:
                        throw Error(
                          'getNodesForType encountered a type it did not expect: "' + i + '". This is a bug in React.'
                        );
                    }
                    o[bl] = e, Lt(o), i = o;
                  }
                  e.stateNode = i;
                } else
                  Wy(
                    o,
                    e.type,
                    e.stateNode
                  );
              else
                e.stateNode = rd(
                  o,
                  i,
                  e.memoizedProps
                );
            else
              t !== i ? (t === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : t.count--, i === null ? Wy(
                o,
                e.type,
                e.stateNode
              ) : rd(
                o,
                i,
                e.memoizedProps
              )) : i === null && e.stateNode !== null && dy(
                e,
                e.memoizedProps,
                a.memoizedProps
              );
          break;
        case 27:
          pl(t, e), wl(e), i & 512 && (wt || a === null || Da(a, a.return)), a !== null && i & 4 && dy(
            e,
            e.memoizedProps,
            a.memoizedProps
          );
          break;
        case 5:
          if (pl(t, e), wl(e), i & 512 && (wt || a === null || Da(a, a.return)), e.flags & 32) {
            t = e.stateNode;
            try {
              k(e, hu, t);
            } catch (x) {
              ue(e, e.return, x);
            }
          }
          i & 4 && e.stateNode != null && (t = e.memoizedProps, dy(
            e,
            t,
            a !== null ? a.memoizedProps : t
          )), i & 1024 && (tg = !0, e.type !== "form" && console.error(
            "Unexpected host component type. Expected a form. This is a bug in React."
          ));
          break;
        case 6:
          if (pl(t, e), wl(e), i & 4) {
            if (e.stateNode === null)
              throw Error(
                "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
              );
            i = e.memoizedProps, a = a !== null ? a.memoizedProps : i, t = e.stateNode;
            try {
              k(
                e,
                oc,
                t,
                a,
                i
              );
            } catch (x) {
              ue(e, e.return, x);
            }
          }
          break;
        case 3:
          if (o = Xa(), Kp = null, f = Du, Du = If(t.containerInfo), pl(t, e), Du = f, wl(e), i & 4 && a !== null && a.memoizedState.isDehydrated)
            try {
              k(
                e,
                Zy,
                t.containerInfo
              );
            } catch (x) {
              ue(e, e.return, x);
            }
          tg && (tg = !1, tc(e)), t.effectDuration += ju(o);
          break;
        case 4:
          i = Du, Du = If(
            e.stateNode.containerInfo
          ), pl(t, e), wl(e), Du = i;
          break;
        case 12:
          i = Xa(), pl(t, e), wl(e), e.stateNode.effectDuration += Qi(i);
          break;
        case 13:
          pl(t, e), wl(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (cg = Nn()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ec(e, i)));
          break;
        case 22:
          o = e.memoizedState !== null;
          var h = a !== null && a.memoizedState !== null, p = zc, v = wt;
          if (zc = p || o, wt = v || h, pl(t, e), wt = v, zc = p, wl(e), i & 8192)
            e: for (t = e.stateNode, t._visibility = o ? t._visibility & ~vp : t._visibility | vp, o && (a === null || h || zc || wt || vl(e)), a = null, t = e; ; ) {
              if (t.tag === 5 || t.tag === 26) {
                if (a === null) {
                  h = a = t;
                  try {
                    f = h.stateNode, o ? k(h, Jl, f) : k(
                      h,
                      jy,
                      h.stateNode,
                      h.memoizedProps
                    );
                  } catch (x) {
                    ue(h, h.return, x);
                  }
                }
              } else if (t.tag === 6) {
                if (a === null) {
                  h = t;
                  try {
                    d = h.stateNode, o ? k(h, Qy, d) : k(
                      h,
                      od,
                      d,
                      h.memoizedProps
                    );
                  } catch (x) {
                    ue(h, h.return, x);
                  }
                }
              } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
              }
              if (t === e) break e;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                  break e;
                a === t && (a = null), t = t.return;
              }
              a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
            }
          i & 4 && (i = e.updateQueue, i !== null && (a = i.retryQueue, a !== null && (i.retryQueue = null, ec(e, a))));
          break;
        case 19:
          pl(t, e), wl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ec(e, i)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          pl(t, e), wl(e);
      }
    }
    function wl(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          k(e, Q0, e);
        } catch (a) {
          ue(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function tc(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          tc(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
        }
    }
    function Sn(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          my(e, t.alternate, t), t = t.sibling;
    }
    function ua(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          _r(
            e,
            e.return,
            Nl
          ), vl(e);
          break;
        case 1:
          Da(e, e.return);
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && Xr(
            e,
            e.return,
            t
          ), vl(e);
          break;
        case 27:
          k(
            e,
            bo,
            e.stateNode
          );
        case 26:
        case 5:
          Da(e, e.return), vl(e);
          break;
        case 22:
          e.memoizedState === null && vl(e);
          break;
        case 30:
          vl(e);
          break;
        default:
          vl(e);
      }
    }
    function vl(e) {
      for (e = e.child; e !== null; )
        ua(e), e = e.sibling;
    }
    function fu(e, t, a, i) {
      var o = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Tn(
            e,
            a,
            i
          ), oy(a, Nl);
          break;
        case 1:
          if (Tn(
            e,
            a,
            i
          ), t = a.stateNode, typeof t.componentDidMount == "function" && k(
            a,
            $v,
            a,
            t
          ), t = a.updateQueue, t !== null) {
            e = a.stateNode;
            try {
              k(
                a,
                Lc,
                t,
                e
              );
            } catch (f) {
              ue(a, a.return, f);
            }
          }
          i && o & 64 && sy(a), no(a, a.return);
          break;
        case 27:
          yy(a);
        case 26:
        case 5:
          Tn(
            e,
            a,
            i
          ), i && t === null && o & 4 && X0(a), no(a, a.return);
          break;
        case 12:
          if (i && o & 4) {
            o = Xa(), Tn(
              e,
              a,
              i
            ), i = a.stateNode, i.effectDuration += Qi(o);
            try {
              k(
                a,
                ry,
                a,
                t,
                Tp,
                i.effectDuration
              );
            } catch (f) {
              ue(a, a.return, f);
            }
          } else
            Tn(
              e,
              a,
              i
            );
          break;
        case 13:
          Tn(
            e,
            a,
            i
          ), i && o & 4 && uo(e, a);
          break;
        case 22:
          a.memoizedState === null && Tn(
            e,
            a,
            i
          ), no(a, a.return);
          break;
        case 30:
          break;
        default:
          Tn(
            e,
            a,
            i
          );
      }
    }
    function Tn(e, t, a) {
      for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; )
        fu(
          e,
          t.alternate,
          t,
          a
        ), t = t.sibling;
    }
    function An(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && Xi(e), a != null && on(a));
    }
    function $a(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (Xi(t), e != null && on(e));
    }
    function et(e, t, a, i) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; )
          wf(
            e,
            t,
            a,
            i
          ), t = t.sibling;
    }
    function wf(e, t, a, i) {
      var o = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          et(
            e,
            t,
            a,
            i
          ), o & 2048 && fy(t, sl | jn);
          break;
        case 1:
          et(
            e,
            t,
            a,
            i
          );
          break;
        case 3:
          var f = Xa();
          et(
            e,
            t,
            a,
            i
          ), o & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (Xi(t), a != null && on(a))), e.passiveEffectDuration += ju(f);
          break;
        case 12:
          if (o & 2048) {
            o = Xa(), et(
              e,
              t,
              a,
              i
            ), e = t.stateNode, e.passiveEffectDuration += Qi(o);
            try {
              k(
                t,
                _0,
                t,
                t.alternate,
                Tp,
                e.passiveEffectDuration
              );
            } catch (h) {
              ue(t, t.return, h);
            }
          } else
            et(
              e,
              t,
              a,
              i
            );
          break;
        case 13:
          et(
            e,
            t,
            a,
            i
          );
          break;
        case 23:
          break;
        case 22:
          f = t.stateNode;
          var d = t.alternate;
          t.memoizedState !== null ? f._visibility & gc ? et(
            e,
            t,
            a,
            i
          ) : io(
            e,
            t
          ) : f._visibility & gc ? et(
            e,
            t,
            a,
            i
          ) : (f._visibility |= gc, Pu(
            e,
            t,
            a,
            i,
            (t.subtreeFlags & 10256) !== 0
          )), o & 2048 && An(d, t);
          break;
        case 24:
          et(
            e,
            t,
            a,
            i
          ), o & 2048 && $a(t.alternate, t);
          break;
        default:
          et(
            e,
            t,
            a,
            i
          );
      }
    }
    function Pu(e, t, a, i, o) {
      for (o = o && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; )
        wr(
          e,
          t,
          a,
          i,
          o
        ), t = t.sibling;
    }
    function wr(e, t, a, i, o) {
      var f = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Pu(
            e,
            t,
            a,
            i,
            o
          ), fy(t, sl);
          break;
        case 23:
          break;
        case 22:
          var d = t.stateNode;
          t.memoizedState !== null ? d._visibility & gc ? Pu(
            e,
            t,
            a,
            i,
            o
          ) : io(
            e,
            t
          ) : (d._visibility |= gc, Pu(
            e,
            t,
            a,
            i,
            o
          )), o && f & 2048 && An(
            t.alternate,
            t
          );
          break;
        case 24:
          Pu(
            e,
            t,
            a,
            i,
            o
          ), o && f & 2048 && $a(t.alternate, t);
          break;
        default:
          Pu(
            e,
            t,
            a,
            i,
            o
          );
      }
    }
    function io(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var a = e, i = t, o = i.flags;
          switch (i.tag) {
            case 22:
              io(
                a,
                i
              ), o & 2048 && An(
                i.alternate,
                i
              );
              break;
            case 24:
              io(
                a,
                i
              ), o & 2048 && $a(
                i.alternate,
                i
              );
              break;
            default:
              io(
                a,
                i
              );
          }
          t = t.sibling;
        }
    }
    function lc(e) {
      if (e.subtreeFlags & _m)
        for (e = e.child; e !== null; )
          ei(e), e = e.sibling;
    }
    function ei(e) {
      switch (e.tag) {
        case 26:
          lc(e), e.flags & _m && e.memoizedState !== null && I0(
            Du,
            e.memoizedState,
            e.memoizedProps
          );
          break;
        case 5:
          lc(e);
          break;
        case 3:
        case 4:
          var t = Du;
          Du = If(
            e.stateNode.containerInfo
          ), lc(e), Du = t;
          break;
        case 22:
          e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = _m, _m = 16777216, lc(e), _m = t) : lc(e));
          break;
        default:
          lc(e);
      }
    }
    function Zf(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function co(e) {
      var t = e.deletions;
      if (e.flags & 16) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Tl = i, by(
              i,
              e
            );
          }
        Zf(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; )
          gy(e), e = e.sibling;
    }
    function gy(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          co(e), e.flags & 2048 && Qf(
            e,
            e.return,
            sl | jn
          );
          break;
        case 3:
          var t = Xa();
          co(e), e.stateNode.passiveEffectDuration += ju(t);
          break;
        case 12:
          t = Xa(), co(e), e.stateNode.passiveEffectDuration += Qi(t);
          break;
        case 22:
          t = e.stateNode, e.memoizedState !== null && t._visibility & gc && (e.return === null || e.return.tag !== 13) ? (t._visibility &= ~gc, Lf(e)) : co(e);
          break;
        default:
          co(e);
      }
    }
    function Lf(e) {
      var t = e.deletions;
      if (e.flags & 16) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Tl = i, by(
              i,
              e
            );
          }
        Zf(e);
      }
      for (e = e.child; e !== null; )
        Jf(e), e = e.sibling;
    }
    function Jf(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Qf(
            e,
            e.return,
            sl
          ), Lf(e);
          break;
        case 22:
          var t = e.stateNode;
          t._visibility & gc && (t._visibility &= ~gc, Lf(e));
          break;
        default:
          Lf(e);
      }
    }
    function by(e, t) {
      for (; Tl !== null; ) {
        var a = Tl, i = a;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            Qf(
              i,
              t,
              sl
            );
            break;
          case 23:
          case 22:
            i.memoizedState !== null && i.memoizedState.cachePool !== null && (i = i.memoizedState.cachePool.pool, i != null && Xi(i));
            break;
          case 24:
            on(i.memoizedState.cache);
        }
        if (i = a.child, i !== null) i.return = a, Tl = i;
        else
          e: for (a = e; Tl !== null; ) {
            i = Tl;
            var o = i.sibling, f = i.return;
            if (py(i), i === a) {
              Tl = null;
              break e;
            }
            if (o !== null) {
              o.return = f, Tl = o;
              break e;
            }
            Tl = f;
          }
      }
    }
    function Sy() {
      DS.forEach(function(e) {
        return e();
      });
    }
    function Ty() {
      var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
      return e || C.actQueue === null || console.error(
        "The current testing environment is not configured to support act(...)"
      ), e;
    }
    function Zl(e) {
      if ((Ie & ha) !== Ia && Ne !== 0)
        return Ne & -Ne;
      var t = C.T;
      return t !== null ? (t._updatedFibers || (t._updatedFibers = /* @__PURE__ */ new Set()), t._updatedFibers.add(e), e = zs, e !== 0 ? e : xy()) : i0();
    }
    function j0() {
      en === 0 && (en = !(Ne & 536870912) || we ? rh() : 536870912);
      var e = Zn.current;
      return e !== null && (e.flags |= 32), en;
    }
    function Tt(e, t, a) {
      if (ih && console.error("useInsertionEffect must not schedule updates."), dg && (qp = !0), (e === ct && (tt === Us || tt === xs) || e.cancelPendingCommit !== null) && (nc(e, 0), su(
        e,
        Ne,
        en,
        !1
      )), Hc(e, a), Ie & ha && e === ct) {
        if (Wl)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              e = He && te(He) || "Unknown", ab.has(e) || (ab.add(e), t = te(t) || "Unknown", console.error(
                "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                t,
                e,
                e
              ));
              break;
            case 1:
              lb || (console.error(
                "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
              ), lb = !0);
          }
      } else
        Rt && Kn(e, t, a), J0(t), e === ct && ((Ie & ha) === Ia && (Qo |= a), Nt === Ms && su(
          e,
          Ne,
          en,
          !1
        )), Ra(e);
    }
    function Qt(e, t, a) {
      if ((Ie & (ha | Ru)) !== Ia)
        throw Error("Should not already be working.");
      var i = !a && (t & 124) === 0 && (t & e.expiredLanes) === 0 || Fo(e, t), o = i ? Ey(e, t) : Kr(e, t, !0), f = i;
      do {
        if (o === Dc) {
          nh && !i && su(e, t, 0, !1);
          break;
        } else {
          if (a = e.current.alternate, f && !w0(a)) {
            o = Kr(e, t, !1), f = !1;
            continue;
          }
          if (o === lh) {
            if (f = t, e.errorRecoveryDisabledLanes & f)
              var d = 0;
            else
              d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
            if (d !== 0) {
              t = d;
              e: {
                o = e;
                var h = d;
                d = Lm;
                var p = o.current.memoizedState.isDehydrated;
                if (p && (nc(
                  o,
                  h
                ).flags |= 256), h = Kr(
                  o,
                  h,
                  !1
                ), h !== lh) {
                  if (ug && !p) {
                    o.errorRecoveryDisabledLanes |= f, Qo |= f, o = Ms;
                    break e;
                  }
                  o = ya, ya = d, o !== null && (ya === null ? ya = o : ya.push.apply(
                    ya,
                    o
                  ));
                }
                o = h;
              }
              if (f = !1, o !== lh) continue;
            }
          }
          if (o === Qm) {
            nc(e, 0), su(e, t, 0, !0);
            break;
          }
          e: {
            switch (i = e, o) {
              case Dc:
              case Qm:
                throw Error("Root did not complete. This is a bug in React.");
              case Ms:
                if ((t & 4194048) !== t) break;
              case Cp:
                su(
                  i,
                  t,
                  en,
                  !_o
                );
                break e;
              case lh:
                ya = null;
                break;
              case lg:
              case $1:
                break;
              default:
                throw Error("Unknown root exit status.");
            }
            if (C.actQueue !== null)
              Ir(
                i,
                a,
                t,
                ya,
                Jm,
                Np,
                en,
                Qo,
                Hs
              );
            else {
              if ((t & 62914560) === t && (f = cg + W1 - Nn(), 10 < f)) {
                if (su(
                  i,
                  t,
                  en,
                  !_o
                ), Il(i, 0, !0) !== 0) break e;
                i.timeoutHandle = rb(
                  kt.bind(
                    null,
                    i,
                    a,
                    ya,
                    Jm,
                    Np,
                    t,
                    en,
                    Qo,
                    Hs,
                    _o,
                    o,
                    US,
                    Ig,
                    0
                  ),
                  f
                );
                break e;
              }
              kt(
                i,
                a,
                ya,
                Jm,
                Np,
                t,
                en,
                Qo,
                Hs,
                _o,
                o,
                OS,
                Ig,
                0
              );
            }
          }
        }
        break;
      } while (!0);
      Ra(e);
    }
    function kt(e, t, a, i, o, f, d, h, p, v, x, B, O, Y) {
      if (e.timeoutHandle = Ys, B = t.subtreeFlags, (B & 8192 || (B & 16785408) === 16785408) && (Im = { stylesheets: null, count: 0, unsuspend: F0 }, ei(t), B = P0(), B !== null)) {
        e.cancelPendingCommit = B(
          Ir.bind(
            null,
            e,
            t,
            f,
            a,
            i,
            o,
            d,
            h,
            p,
            x,
            MS,
            O,
            Y
          )
        ), su(
          e,
          f,
          d,
          !v
        );
        return;
      }
      Ir(
        e,
        t,
        f,
        a,
        i,
        o,
        d,
        h,
        p
      );
    }
    function w0(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
          for (var i = 0; i < a.length; i++) {
            var o = a[i], f = o.getSnapshot;
            o = o.value;
            try {
              if (!sa(f(), o)) return !1;
            } catch {
              return !1;
            }
          }
        if (a = t.child, t.subtreeFlags & 16384 && a !== null)
          a.return = t, t = a;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return !0;
    }
    function su(e, t, a, i) {
      t &= ~ig, t &= ~Qo, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
      for (var o = t; 0 < o; ) {
        var f = 31 - gl(o), d = 1 << f;
        i[f] = -1, o &= ~d;
      }
      a !== 0 && u0(e, a, t);
    }
    function ac() {
      return (Ie & (ha | Ru)) === Ia ? (uc(0), !1) : !0;
    }
    function Zr() {
      if (He !== null) {
        if (tt === Ba)
          var e = He.return;
        else
          e = He, cr(), Za(e), kd = null, Gm = 0, e = He;
        for (; e !== null; )
          cy(e.alternate, e), e = e.return;
        He = null;
      }
    }
    function nc(e, t) {
      var a = e.timeoutHandle;
      a !== Ys && (e.timeoutHandle = Ys, jS(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Zr(), ct = e, He = a = un(e.current, null), Ne = t, tt = Ba, Pa = null, _o = !1, nh = Fo(e, t), ug = !1, Nt = Dc, Hs = en = ig = Qo = Xo = 0, ya = Lm = null, Np = !1, t & 8 && (t |= t & 32);
      var i = e.entangledLanes;
      if (i !== 0)
        for (e = e.entanglements, i &= t; 0 < i; ) {
          var o = 31 - gl(i), f = 1 << o;
          t |= e[o], i &= ~f;
        }
      return Si = t, hf(), t = Wg(), 1e3 < t - kg && (C.recentlyCreatedOwnerStacks = 0, kg = t), Eu.discardPendingWarnings(), a;
    }
    function Kf(e, t) {
      ye = null, C.H = xp, C.getCurrentStack = null, Wl = !1, fa = null, t === Nm || t === Dp ? (t = Zh(), tt = wm) : t === t1 ? (t = Zh(), tt = k1) : tt = t === _1 ? ng : t !== null && typeof t == "object" && typeof t.then == "function" ? ah : jm, Pa = t;
      var a = He;
      if (a === null)
        Nt = Qm, ao(
          e,
          ta(t, e.current)
        );
      else
        switch (a.mode & Cl && tu(a), Mu(), tt) {
          case jm:
            K !== null && typeof K.markComponentErrored == "function" && K.markComponentErrored(
              a,
              t,
              Ne
            );
            break;
          case Us:
          case xs:
          case wm:
          case ah:
          case Zm:
            K !== null && typeof K.markComponentSuspended == "function" && K.markComponentSuspended(
              a,
              t,
              Ne
            );
        }
    }
    function Lr() {
      var e = C.H;
      return C.H = xp, e === null ? xp : e;
    }
    function Ay() {
      var e = C.A;
      return C.A = zS, e;
    }
    function Jr() {
      Nt = Ms, _o || (Ne & 4194048) !== Ne && Zn.current !== null || (nh = !0), !(Xo & 134217727) && !(Qo & 134217727) || ct === null || su(
        ct,
        Ne,
        en,
        !1
      );
    }
    function Kr(e, t, a) {
      var i = Ie;
      Ie |= ha;
      var o = Lr(), f = Ay();
      if (ct !== e || Ne !== t) {
        if (Rt) {
          var d = e.memoizedUpdaters;
          0 < d.size && (ro(e, Ne), d.clear()), Yl(e, t);
        }
        Jm = null, nc(e, t);
      }
      Wo(t), t = !1, d = Nt;
      e: do
        try {
          if (tt !== Ba && He !== null) {
            var h = He, p = Pa;
            switch (tt) {
              case ng:
                Zr(), d = Cp;
                break e;
              case wm:
              case Us:
              case xs:
              case ah:
                Zn.current === null && (t = !0);
                var v = tt;
                if (tt = Ba, Pa = null, ti(e, h, p, v), a && nh) {
                  d = Dc;
                  break e;
                }
                break;
              default:
                v = tt, tt = Ba, Pa = null, ti(e, h, p, v);
            }
          }
          $r(), d = Nt;
          break;
        } catch (x) {
          Kf(e, x);
        }
      while (!0);
      return t && e.shellSuspendCounter++, cr(), Ie = i, C.H = o, C.A = f, Qs(), He === null && (ct = null, Ne = 0, hf()), d;
    }
    function $r() {
      for (; He !== null; ) Dy(He);
    }
    function Ey(e, t) {
      var a = Ie;
      Ie |= ha;
      var i = Lr(), o = Ay();
      if (ct !== e || Ne !== t) {
        if (Rt) {
          var f = e.memoizedUpdaters;
          0 < f.size && (ro(e, Ne), f.clear()), Yl(e, t);
        }
        Jm = null, Bp = Nn() + F1, nc(e, t);
      } else
        nh = Fo(
          e,
          t
        );
      Wo(t);
      e: do
        try {
          if (tt !== Ba && He !== null)
            t: switch (t = He, f = Pa, tt) {
              case jm:
                tt = Ba, Pa = null, ti(
                  e,
                  t,
                  f,
                  jm
                );
                break;
              case Us:
              case xs:
                if (wh(f)) {
                  tt = Ba, Pa = null, kr(t);
                  break;
                }
                t = function() {
                  tt !== Us && tt !== xs || ct !== e || (tt = Zm), Ra(e);
                }, f.then(t, t);
                break e;
              case wm:
                tt = Zm;
                break e;
              case k1:
                tt = ag;
                break e;
              case Zm:
                wh(f) ? (tt = Ba, Pa = null, kr(t)) : (tt = Ba, Pa = null, ti(
                  e,
                  t,
                  f,
                  Zm
                ));
                break;
              case ag:
                var d = null;
                switch (He.tag) {
                  case 26:
                    d = He.memoizedState;
                  case 5:
                  case 27:
                    var h = He;
                    if (!d || Pf(d)) {
                      tt = Ba, Pa = null;
                      var p = h.sibling;
                      if (p !== null) He = p;
                      else {
                        var v = h.return;
                        v !== null ? (He = v, $f(v)) : He = null;
                      }
                      break t;
                    }
                    break;
                  default:
                    console.error(
                      "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                    );
                }
                tt = Ba, Pa = null, ti(
                  e,
                  t,
                  f,
                  ag
                );
                break;
              case ah:
                tt = Ba, Pa = null, ti(
                  e,
                  t,
                  f,
                  ah
                );
                break;
              case ng:
                Zr(), Nt = Cp;
                break e;
              default:
                throw Error(
                  "Unexpected SuspendedReason. This is a bug in React."
                );
            }
          C.actQueue !== null ? $r() : zy();
          break;
        } catch (x) {
          Kf(e, x);
        }
      while (!0);
      return cr(), C.H = i, C.A = o, Ie = a, He !== null ? (K !== null && typeof K.markRenderYielded == "function" && K.markRenderYielded(), Dc) : (Qs(), ct = null, Ne = 0, hf(), Nt);
    }
    function zy() {
      for (; He !== null && !ip(); )
        Dy(He);
    }
    function Dy(e) {
      var t = e.alternate;
      (e.mode & Cl) !== dt ? (or(e), t = k(
        e,
        Vr,
        t,
        e,
        Si
      ), tu(e)) : t = k(
        e,
        Vr,
        t,
        e,
        Si
      ), e.memoizedProps = e.pendingProps, t === null ? $f(e) : He = t;
    }
    function kr(e) {
      var t = k(e, Wr, e);
      e.memoizedProps = e.pendingProps, t === null ? $f(e) : He = t;
    }
    function Wr(e) {
      var t = e.alternate, a = (e.mode & Cl) !== dt;
      switch (a && or(e), e.tag) {
        case 15:
        case 0:
          t = ly(
            t,
            e,
            e.pendingProps,
            e.type,
            void 0,
            Ne
          );
          break;
        case 11:
          t = ly(
            t,
            e,
            e.pendingProps,
            e.type.render,
            e.ref,
            Ne
          );
          break;
        case 5:
          Za(e);
        default:
          cy(t, e), e = He = xh(e, Si), t = Vr(t, e, Si);
      }
      return a && tu(e), t;
    }
    function ti(e, t, a, i) {
      cr(), Za(t), kd = null, Gm = 0;
      var o = t.return;
      try {
        if (Bf(
          e,
          o,
          t,
          a,
          Ne
        )) {
          Nt = Qm, ao(
            e,
            ta(a, e.current)
          ), He = null;
          return;
        }
      } catch (f) {
        if (o !== null) throw He = o, f;
        Nt = Qm, ao(
          e,
          ta(a, e.current)
        ), He = null;
        return;
      }
      t.flags & 32768 ? (we || i === jm ? e = !0 : nh || Ne & 536870912 ? e = !1 : (_o = e = !0, (i === Us || i === xs || i === wm || i === ah) && (i = Zn.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Fr(t, e)) : $f(t);
    }
    function $f(e) {
      var t = e;
      do {
        if (t.flags & 32768) {
          Fr(
            t,
            _o
          );
          return;
        }
        var a = t.alternate;
        if (e = t.return, or(t), a = k(
          t,
          q0,
          a,
          t,
          Si
        ), (t.mode & Cl) !== dt && ji(t), a !== null) {
          He = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          He = t;
          return;
        }
        He = t = e;
      } while (t !== null);
      Nt === Dc && (Nt = $1);
    }
    function Fr(e, t) {
      do {
        var a = Y0(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, He = a;
          return;
        }
        if ((e.mode & Cl) !== dt) {
          ji(e), a = e.actualDuration;
          for (var i = e.child; i !== null; )
            a += i.actualDuration, i = i.sibling;
          e.actualDuration = a;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          He = e;
          return;
        }
        He = e = a;
      } while (e !== null);
      Nt = Cp, He = null;
    }
    function Ir(e, t, a, i, o, f, d, h, p) {
      e.cancelPendingCommit = null;
      do
        oo();
      while (Bl !== Cs);
      if (Eu.flushLegacyContextWarning(), Eu.flushPendingUnsafeLifecycleWarnings(), (Ie & (ha | Ru)) !== Ia)
        throw Error("Should not already be working.");
      if (K !== null && typeof K.markCommitStarted == "function" && K.markCommitStarted(a), t === null) ko();
      else {
        if (a === 0 && console.error(
          "finishedLanes should not be empty during a commit. This is a bug in React."
        ), t === e.current)
          throw Error(
            "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
          );
        if (f = t.lanes | t.childLanes, f |= qv, iv(
          e,
          a,
          f,
          d,
          h,
          p
        ), e === ct && (He = ct = null, Ne = 0), uh = t, wo = e, Zo = a, fg = f, sg = o, tb = i, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Uy(Oo, function() {
          return kf(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), Tp = Zd(), i = (t.flags & 13878) !== 0, t.subtreeFlags & 13878 || i) {
          i = C.T, C.T = null, o = se.p, se.p = ol, d = Ie, Ie |= Ru;
          try {
            Qr(e, t, a);
          } finally {
            Ie = d, se.p = o, C.T = i;
          }
        }
        Bl = I1, En(), Pr(), Z0();
      }
    }
    function En() {
      if (Bl === I1) {
        Bl = Cs;
        var e = wo, t = uh, a = Zo, i = (t.flags & 13878) !== 0;
        if (t.subtreeFlags & 13878 || i) {
          i = C.T, C.T = null;
          var o = se.p;
          se.p = ol;
          var f = Ie;
          Ie |= Ru;
          try {
            eh = a, th = e, vy(t, e), th = eh = null, a = Tg;
            var d = T0(e.containerInfo), h = a.focusedElem, p = a.selectionRange;
            if (d !== h && h && h.ownerDocument && S0(
              h.ownerDocument.documentElement,
              h
            )) {
              if (p !== null && Rh(h)) {
                var v = p.start, x = p.end;
                if (x === void 0 && (x = v), "selectionStart" in h)
                  h.selectionStart = v, h.selectionEnd = Math.min(
                    x,
                    h.value.length
                  );
                else {
                  var B = h.ownerDocument || document, O = B && B.defaultView || window;
                  if (O.getSelection) {
                    var Y = O.getSelection(), W = h.textContent.length, re = Math.min(
                      p.start,
                      W
                    ), ot = p.end === void 0 ? re : Math.min(p.end, W);
                    !Y.extend && re > ot && (d = ot, ot = re, re = d);
                    var qe = Dh(
                      h,
                      re
                    ), b = Dh(
                      h,
                      ot
                    );
                    if (qe && b && (Y.rangeCount !== 1 || Y.anchorNode !== qe.node || Y.anchorOffset !== qe.offset || Y.focusNode !== b.node || Y.focusOffset !== b.offset)) {
                      var S = B.createRange();
                      S.setStart(qe.node, qe.offset), Y.removeAllRanges(), re > ot ? (Y.addRange(S), Y.extend(b.node, b.offset)) : (S.setEnd(b.node, b.offset), Y.addRange(S));
                    }
                  }
                }
              }
              for (B = [], Y = h; Y = Y.parentNode; )
                Y.nodeType === 1 && B.push({
                  element: Y,
                  left: Y.scrollLeft,
                  top: Y.scrollTop
                });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < B.length; h++) {
                var T = B[h];
                T.element.scrollLeft = T.left, T.element.scrollTop = T.top;
              }
            }
            Wp = !!Sg, Tg = Sg = null;
          } finally {
            Ie = f, se.p = o, C.T = i;
          }
        }
        e.current = t, Bl = P1;
      }
    }
    function Pr() {
      if (Bl === P1) {
        Bl = Cs;
        var e = wo, t = uh, a = Zo, i = (t.flags & 8772) !== 0;
        if (t.subtreeFlags & 8772 || i) {
          i = C.T, C.T = null;
          var o = se.p;
          se.p = ol;
          var f = Ie;
          Ie |= Ru;
          try {
            K !== null && typeof K.markLayoutEffectsStarted == "function" && K.markLayoutEffectsStarted(a), eh = a, th = e, my(
              e,
              t.alternate,
              t
            ), th = eh = null, K !== null && typeof K.markLayoutEffectsStopped == "function" && K.markLayoutEffectsStopped();
          } finally {
            Ie = f, se.p = o, C.T = i;
          }
        }
        Bl = eb;
      }
    }
    function Z0() {
      if (Bl === xS || Bl === eb) {
        Bl = Cs, zv();
        var e = wo, t = uh, a = Zo, i = tb, o = (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0;
        o ? Bl = og : (Bl = Cs, uh = wo = null, zn(e, e.pendingLanes), Ns = 0, $m = null);
        var f = e.pendingLanes;
        if (f === 0 && (jo = null), o || so(e), o = hh(a), t = t.stateNode, cl && typeof cl.onCommitFiberRoot == "function")
          try {
            var d = (t.current.flags & 128) === 128;
            switch (o) {
              case ol:
                var h = Ad;
                break;
              case Fa:
                h = rs;
                break;
              case bu:
                h = Oo;
                break;
              case Rd:
                h = ds;
                break;
              default:
                h = Oo;
            }
            cl.onCommitFiberRoot(
              ri,
              t,
              h,
              d
            );
          } catch (B) {
            $l || ($l = !0, console.error(
              "React instrumentation encountered an error: %s",
              B
            ));
          }
        if (Rt && e.memoizedUpdaters.clear(), Sy(), i !== null) {
          d = C.T, h = se.p, se.p = ol, C.T = null;
          try {
            var p = e.onRecoverableError;
            for (t = 0; t < i.length; t++) {
              var v = i[t], x = L0(v.stack);
              k(
                v.source,
                p,
                v.value,
                x
              );
            }
          } finally {
            C.T = d, se.p = h;
          }
        }
        Zo & 3 && oo(), Ra(e), f = e.pendingLanes, a & 4194090 && f & 42 ? (Ep = !0, e === rg ? Km++ : (Km = 0, rg = e)) : Km = 0, uc(0), ko();
      }
    }
    function L0(e) {
      return e = { componentStack: e }, Object.defineProperty(e, "digest", {
        get: function() {
          console.error(
            'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
          );
        }
      }), e;
    }
    function zn(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, on(t)));
    }
    function oo(e) {
      return En(), Pr(), Z0(), kf();
    }
    function kf() {
      if (Bl !== og) return !1;
      var e = wo, t = fg;
      fg = 0;
      var a = hh(Zo), i = bu > a ? bu : a;
      a = C.T;
      var o = se.p;
      try {
        se.p = i, C.T = null, i = sg, sg = null;
        var f = wo, d = Zo;
        if (Bl = Cs, uh = wo = null, Zo = 0, (Ie & (ha | Ru)) !== Ia)
          throw Error("Cannot flush passive effects while already rendering.");
        dg = !0, qp = !1, K !== null && typeof K.markPassiveEffectsStarted == "function" && K.markPassiveEffectsStarted(d);
        var h = Ie;
        if (Ie |= Ru, gy(f.current), wf(
          f,
          f.current,
          d,
          i
        ), K !== null && typeof K.markPassiveEffectsStopped == "function" && K.markPassiveEffectsStopped(), so(f), Ie = h, uc(0, !1), qp ? f === $m ? Ns++ : (Ns = 0, $m = f) : Ns = 0, qp = dg = !1, cl && typeof cl.onPostCommitFiberRoot == "function")
          try {
            cl.onPostCommitFiberRoot(ri, f);
          } catch (v) {
            $l || ($l = !0, console.error(
              "React instrumentation encountered an error: %s",
              v
            ));
          }
        var p = f.current.stateNode;
        return p.effectDuration = 0, p.passiveEffectDuration = 0, !0;
      } finally {
        se.p = o, C.T = a, zn(e, t);
      }
    }
    function fo(e, t, a) {
      t = ta(a, t), t = ml(e.stateNode, t, 2), e = ja(e, t, 2), e !== null && (Hc(e, 2), Ra(e));
    }
    function ue(e, t, a) {
      if (ih = !1, e.tag === 3)
        fo(e, e, a);
      else {
        for (; t !== null; ) {
          if (t.tag === 3) {
            fo(
              t,
              e,
              a
            );
            return;
          }
          if (t.tag === 1) {
            var i = t.stateNode;
            if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (jo === null || !jo.has(i))) {
              e = ta(a, e), a = St(2), i = ja(t, a, 2), i !== null && (Nf(
                a,
                i,
                t,
                e
              ), Hc(i, 2), Ra(i));
              return;
            }
          }
          t = t.return;
        }
        console.error(
          `Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,
          a
        );
      }
    }
    function Ry(e, t, a) {
      var i = e.pingCache;
      if (i === null) {
        i = e.pingCache = new RS();
        var o = /* @__PURE__ */ new Set();
        i.set(t, o);
      } else
        o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
      o.has(a) || (ug = !0, o.add(a), i = vv.bind(null, e, t, a), Rt && ro(e, a), t.then(i, i));
    }
    function vv(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Ty() && C.actQueue === null && console.error(
        `A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`
      ), ct === e && (Ne & a) === a && (Nt === Ms || Nt === lg && (Ne & 62914560) === Ne && Nn() - cg < W1 ? (Ie & ha) === Ia && nc(e, 0) : ig |= a, Hs === Ne && (Hs = 0)), Ra(e);
    }
    function Oy(e, t) {
      t === 0 && (t = Io()), e = Gl(e, t), e !== null && (Hc(e, t), Ra(e));
    }
    function Wf(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), Oy(e, a);
    }
    function li(e, t) {
      var a = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode, o = e.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        case 22:
          i = e.stateNode._retryCache;
          break;
        default:
          throw Error(
            "Pinged unknown suspense boundary type. This is probably a bug in React."
          );
      }
      i !== null && i.delete(t), Oy(e, a);
    }
    function ed(e, t, a) {
      if (t.subtreeFlags & 67117056)
        for (t = t.child; t !== null; ) {
          var i = e, o = t, f = o.type === Ao;
          f = a || f, o.tag !== 22 ? o.flags & 67108864 ? f && k(
            o,
            My,
            i,
            o,
            (o.mode & Jg) === dt
          ) : ed(
            i,
            o,
            f
          ) : o.memoizedState === null && (f && o.flags & 8192 ? k(
            o,
            My,
            i,
            o
          ) : o.subtreeFlags & 67108864 && k(
            o,
            ed,
            i,
            o,
            f
          )), t = t.sibling;
        }
    }
    function My(e, t) {
      var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : !0;
      Ze(!0);
      try {
        ua(t), a && Jf(t), fu(e, t.alternate, t, !1), a && wr(e, t, 0, null, !1, 0);
      } finally {
        Ze(!1);
      }
    }
    function so(e) {
      var t = !0;
      e.current.mode & (Fl | Au) || (t = !1), ed(
        e,
        e.current,
        t
      );
    }
    function ka(e) {
      if ((Ie & ha) === Ia) {
        var t = e.tag;
        if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
          if (t = te(e) || "ReactComponent", Yp !== null) {
            if (Yp.has(t)) return;
            Yp.add(t);
          } else Yp = /* @__PURE__ */ new Set([t]);
          k(e, function() {
            console.error(
              "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead."
            );
          });
        }
      }
    }
    function ro(e, t) {
      Rt && e.memoizedUpdaters.forEach(function(a) {
        Kn(e, a, t);
      });
    }
    function Uy(e, t) {
      var a = C.actQueue;
      return a !== null ? (a.push(t), NS) : Td(e, t);
    }
    function J0(e) {
      Ty() && C.actQueue === null && k(e, function() {
        console.error(
          `An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`,
          te(e)
        );
      });
    }
    function Ra(e) {
      e !== ch && e.next === null && (ch === null ? Gp = ch = e : ch = ch.next = e), Vp = !0, C.actQueue !== null ? yg || (yg = !0, jt()) : hg || (hg = !0, jt());
    }
    function uc(e, t) {
      if (!mg && Vp) {
        mg = !0;
        do
          for (var a = !1, i = Gp; i !== null; ) {
            if (e !== 0) {
              var o = i.pendingLanes;
              if (o === 0) var f = 0;
              else {
                var d = i.suspendedLanes, h = i.pingedLanes;
                f = (1 << 31 - gl(42 | e) + 1) - 1, f &= o & ~(d & ~h), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
              }
              f !== 0 && (a = !0, ad(i, f));
            } else
              f = Ne, f = Il(
                i,
                i === ct ? f : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== Ys
              ), !(f & 3) || Fo(i, f) || (a = !0, ad(i, f));
            i = i.next;
          }
        while (a);
        mg = !1;
      }
    }
    function td() {
      ld();
    }
    function ld() {
      Vp = yg = hg = !1;
      var e = 0;
      Bs !== 0 && (ho() && (e = Bs), Bs = 0);
      for (var t = Nn(), a = null, i = Gp; i !== null; ) {
        var o = i.next, f = Dn(i, t);
        f === 0 ? (i.next = null, a === null ? Gp = o : a.next = o, o === null && (ch = a)) : (a = i, (e !== 0 || f & 3) && (Vp = !0)), i = o;
      }
      uc(e);
    }
    function Dn(e, t) {
      for (var a = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
        var d = 31 - gl(f), h = 1 << d, p = o[d];
        p === -1 ? (!(h & a) || h & i) && (o[d] = n0(h, t)) : p <= t && (e.expiredLanes |= h), f &= ~h;
      }
      if (t = ct, a = Ne, a = Il(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== Ys
      ), i = e.callbackNode, a === 0 || e === t && (tt === Us || tt === xs) || e.cancelPendingCommit !== null)
        return i !== null && nd(i), e.callbackNode = null, e.callbackPriority = 0;
      if (!(a & 3) || Fo(e, a)) {
        if (t = a & -a, t !== e.callbackPriority || C.actQueue !== null && i !== pg)
          nd(i);
        else return t;
        switch (hh(a)) {
          case ol:
          case Fa:
            a = rs;
            break;
          case bu:
            a = Oo;
            break;
          case Rd:
            a = ds;
            break;
          default:
            a = Oo;
        }
        return i = At.bind(null, e), C.actQueue !== null ? (C.actQueue.push(i), a = pg) : a = Td(a, i), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return i !== null && nd(i), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function At(e, t) {
      if (Ep = Ap = !1, Bl !== Cs && Bl !== og)
        return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (oo() && e.callbackNode !== a)
        return null;
      var i = Ne;
      return i = Il(
        e,
        e === ct ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== Ys
      ), i === 0 ? null : (Qt(
        e,
        i,
        t
      ), Dn(e, Nn()), e.callbackNode != null && e.callbackNode === a ? At.bind(null, e) : null);
    }
    function ad(e, t) {
      if (oo()) return null;
      Ap = Ep, Ep = !1, Qt(e, t, !0);
    }
    function nd(e) {
      e !== pg && e !== null && Ev(e);
    }
    function jt() {
      C.actQueue !== null && C.actQueue.push(function() {
        return ld(), null;
      }), wS(function() {
        (Ie & (ha | Ru)) !== Ia ? Td(
          Ad,
          td
        ) : ld();
      });
    }
    function xy() {
      return Bs === 0 && (Bs = rh()), Bs;
    }
    function Hy(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (le(e, "action"), _c("" + e));
    }
    function Cy(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function st(e, t, a, i, o) {
      if (t === "submit" && a && a.stateNode === o) {
        var f = Hy(
          (o[kl] || null).action
        ), d = i.submitter;
        d && (t = (t = d[kl] || null) ? Hy(t.formAction) : d.getAttribute("formAction"), t !== null && (f = t, d = null));
        var h = new ee(
          "action",
          "action",
          null,
          i,
          o
        );
        e.push({
          event: h,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (i.defaultPrevented) {
                  if (Bs !== 0) {
                    var p = d ? Cy(
                      o,
                      d
                    ) : new FormData(o), v = {
                      pending: !0,
                      data: p,
                      method: o.method,
                      action: f
                    };
                    Object.freeze(v), Ji(
                      a,
                      v,
                      null,
                      p
                    );
                  }
                } else
                  typeof f == "function" && (h.preventDefault(), p = d ? Cy(
                    o,
                    d
                  ) : new FormData(o), v = {
                    pending: !0,
                    data: p,
                    method: o.method,
                    action: f
                  }, Object.freeze(v), Ji(
                    a,
                    v,
                    f,
                    p
                  ));
              },
              currentTarget: o
            }
          ]
        });
      }
    }
    function al(e, t, a) {
      e.currentTarget = a;
      try {
        t(e);
      } catch (i) {
        Fv(i);
      }
      e.currentTarget = null;
    }
    function Rn(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        e: {
          var o = void 0, f = i.event;
          if (i = i.listeners, t)
            for (var d = i.length - 1; 0 <= d; d--) {
              var h = i[d], p = h.instance, v = h.currentTarget;
              if (h = h.listener, p !== o && f.isPropagationStopped())
                break e;
              p !== null ? k(
                p,
                al,
                f,
                h,
                v
              ) : al(f, h, v), o = p;
            }
          else
            for (d = 0; d < i.length; d++) {
              if (h = i[d], p = h.instance, v = h.currentTarget, h = h.listener, p !== o && f.isPropagationStopped())
                break e;
              p !== null ? k(
                p,
                al,
                f,
                h,
                v
              ) : al(f, h, v), o = p;
            }
        }
      }
    }
    function Me(e, t) {
      vg.has(e) || console.error(
        'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
        e
      );
      var a = t[um];
      a === void 0 && (a = t[um] = /* @__PURE__ */ new Set());
      var i = e + "__bubble";
      a.has(i) || (id(t, e, 2, !1), a.add(i));
    }
    function ud(e, t, a) {
      vg.has(e) && !t && console.error(
        'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
        e
      );
      var i = 0;
      t && (i |= 4), id(
        a,
        e,
        i,
        t
      );
    }
    function Ny(e) {
      if (!e[_p]) {
        e[_p] = !0, op.forEach(function(a) {
          a !== "selectionchange" && (vg.has(a) || ud(a, !1, e), ud(a, !0, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[_p] || (t[_p] = !0, ud("selectionchange", !1, t));
      }
    }
    function id(e, t, a, i) {
      switch (vd(t)) {
        case ol:
          var o = Sv;
          break;
        case Fa:
          o = pd;
          break;
        default:
          o = ii;
      }
      a = o.bind(
        null,
        t,
        a,
        e
      ), o = void 0, !R || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, a, {
        capture: !0,
        passive: o
      }) : e.addEventListener(t, a, !0) : o !== void 0 ? e.addEventListener(t, a, {
        passive: o
      }) : e.addEventListener(
        t,
        a,
        !1
      );
    }
    function Ml(e, t, a, i, o) {
      var f = i;
      if (!(t & 1) && !(t & 2) && i !== null)
        e: for (; ; ) {
          if (i === null) return;
          var d = i.tag;
          if (d === 3 || d === 4) {
            var h = i.stateNode.containerInfo;
            if (h === o) break;
            if (d === 4)
              for (d = i.return; d !== null; ) {
                var p = d.tag;
                if ((p === 3 || p === 4) && d.stateNode.containerInfo === o)
                  return;
                d = d.return;
              }
            for (; h !== null; ) {
              if (d = $n(h), d === null) return;
              if (p = d.tag, p === 5 || p === 6 || p === 26 || p === 27) {
                i = f = d;
                continue e;
              }
              h = h.parentNode;
            }
          }
          i = i.return;
        }
      Fs(function() {
        var v = f, x = Ci(a), B = [];
        e: {
          var O = Lg.get(e);
          if (O !== void 0) {
            var Y = ee, W = e;
            switch (e) {
              case "keypress":
                if (Xc(a) === 0) break e;
              case "keydown":
              case "keyup":
                Y = Wb;
                break;
              case "focusin":
                W = "focus", Y = Ge;
                break;
              case "focusout":
                W = "blur", Y = Ge;
                break;
              case "beforeblur":
              case "afterblur":
                Y = Ge;
                break;
              case "click":
                if (a.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                Y = Re;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                Y = ie;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                Y = Pb;
                break;
              case Qg:
              case jg:
              case wg:
                Y = Mv;
                break;
              case Zg:
                Y = tS;
                break;
              case "scroll":
              case "scrollend":
                Y = z;
                break;
              case "wheel":
                Y = aS;
                break;
              case "copy":
              case "cut":
              case "paste":
                Y = wb;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                Y = Ng;
                break;
              case "toggle":
              case "beforetoggle":
                Y = uS;
            }
            var re = (t & 4) !== 0, ot = !re && (e === "scroll" || e === "scrollend"), qe = re ? O !== null ? O + "Capture" : null : O;
            re = [];
            for (var b = v, S; b !== null; ) {
              var T = b;
              if (S = T.stateNode, T = T.tag, T !== 5 && T !== 26 && T !== 27 || S === null || qe === null || (T = Fn(b, qe), T != null && re.push(
                Ul(
                  b,
                  T,
                  S
                )
              )), ot) break;
              b = b.return;
            }
            0 < re.length && (O = new Y(
              O,
              W,
              null,
              a,
              x
            ), B.push({
              event: O,
              listeners: re
            }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (O = e === "mouseover" || e === "pointerover", Y = e === "mouseout" || e === "pointerout", O && a !== s && (W = a.relatedTarget || a.fromElement) && ($n(W) || W[hi]))
              break e;
            if ((Y || O) && (O = x.window === x ? x : (O = x.ownerDocument) ? O.defaultView || O.parentWindow : window, Y ? (W = a.relatedTarget || a.toElement, Y = v, W = W ? $n(W) : null, W !== null && (ot = Ce(W), re = W.tag, W !== ot || re !== 5 && re !== 27 && re !== 6) && (W = null)) : (Y = null, W = v), Y !== W)) {
              if (re = Re, T = "onMouseLeave", qe = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (re = Ng, T = "onPointerLeave", qe = "onPointerEnter", b = "pointer"), ot = Y == null ? O : Uu(Y), S = W == null ? O : Uu(W), O = new re(
                T,
                b + "leave",
                Y,
                a,
                x
              ), O.target = ot, O.relatedTarget = S, T = null, $n(x) === v && (re = new re(
                qe,
                b + "enter",
                W,
                a,
                x
              ), re.target = S, re.relatedTarget = ot, T = re), ot = T, Y && W)
                t: {
                  for (re = Y, qe = W, b = 0, S = re; S; S = Wt(S))
                    b++;
                  for (S = 0, T = qe; T; T = Wt(T))
                    S++;
                  for (; 0 < b - S; )
                    re = Wt(re), b--;
                  for (; 0 < S - b; )
                    qe = Wt(qe), S--;
                  for (; b--; ) {
                    if (re === qe || qe !== null && re === qe.alternate)
                      break t;
                    re = Wt(re), qe = Wt(qe);
                  }
                  re = null;
                }
              else re = null;
              Y !== null && By(
                B,
                O,
                Y,
                re,
                !1
              ), W !== null && ot !== null && By(
                B,
                ot,
                W,
                re,
                !0
              );
            }
          }
          e: {
            if (O = v ? Uu(v) : window, Y = O.nodeName && O.nodeName.toLowerCase(), Y === "select" || Y === "input" && O.type === "file")
              var G = Eh;
            else if (p0(O))
              if (_g)
                G = hv;
              else {
                G = zh;
                var L = rv;
              }
            else
              Y = O.nodeName, !Y || Y.toLowerCase() !== "input" || O.type !== "checkbox" && O.type !== "radio" ? v && Hi(v.elementType) && (G = Eh) : G = dv;
            if (G && (G = G(e, v))) {
              tr(
                B,
                G,
                a,
                x
              );
              break e;
            }
            L && L(e, O, v), e === "focusout" && v && O.type === "number" && v.memoizedProps.value != null && Ls(O, "number", O.value);
          }
          switch (L = v ? Uu(v) : window, e) {
            case "focusin":
              (p0(L) || L.contentEditable === "true") && (Yd = L, xv = v, Dm = null);
              break;
            case "focusout":
              Dm = xv = Yd = null;
              break;
            case "mousedown":
              Hv = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Hv = !1, A0(
                B,
                a,
                x
              );
              break;
            case "selectionchange":
              if (fS) break;
            case "keydown":
            case "keyup":
              A0(
                B,
                a,
                x
              );
          }
          var be;
          if (Uv)
            e: {
              switch (e) {
                case "compositionstart":
                  var F = "onCompositionStart";
                  break e;
                case "compositionend":
                  F = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  F = "onCompositionUpdate";
                  break e;
              }
              F = void 0;
            }
          else
            qd ? Ol(e, a) && (F = "onCompositionEnd") : e === "keydown" && a.keyCode === Bg && (F = "onCompositionStart");
          F && (qg && a.locale !== "ko" && (qd || F !== "onCompositionStart" ? F === "onCompositionEnd" && qd && (be = In()) : (X = x, M = "value" in X ? X.value : X.textContent, qd = !0)), L = Ff(
            v,
            F
          ), 0 < L.length && (F = new Cg(
            F,
            e,
            null,
            a,
            x
          ), B.push({
            event: F,
            listeners: L
          }), be ? F.data = be : (be = Yu(a), be !== null && (F.data = be)))), (be = cS ? er(e, a) : sf(e, a)) && (F = Ff(
            v,
            "onBeforeInput"
          ), 0 < F.length && (L = new Lb(
            "onBeforeInput",
            "beforeinput",
            null,
            a,
            x
          ), B.push({
            event: L,
            listeners: F
          }), L.data = be)), st(
            B,
            e,
            v,
            a,
            x
          );
        }
        Rn(B, t);
      });
    }
    function Ul(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function Ff(e, t) {
      for (var a = t + "Capture", i = []; e !== null; ) {
        var o = e, f = o.stateNode;
        if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || f === null || (o = Fn(e, a), o != null && i.unshift(
          Ul(e, o, f)
        ), o = Fn(e, t), o != null && i.push(
          Ul(e, o, f)
        )), e.tag === 3) return i;
        e = e.return;
      }
      return [];
    }
    function Wt(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function By(e, t, a, i, o) {
      for (var f = t._reactName, d = []; a !== null && a !== i; ) {
        var h = a, p = h.alternate, v = h.stateNode;
        if (h = h.tag, p !== null && p === i) break;
        h !== 5 && h !== 26 && h !== 27 || v === null || (p = v, o ? (v = Fn(a, f), v != null && d.unshift(
          Ul(a, v, p)
        )) : o || (v = Fn(a, f), v != null && d.push(
          Ul(a, v, p)
        ))), a = a.return;
      }
      d.length !== 0 && e.push({ event: t, listeners: d });
    }
    function On(e, t) {
      Vc(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Tm || (Tm = !0, e === "select" && t.multiple ? console.error(
        "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
        e
      ) : console.error(
        "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
        e
      ));
      var a = {
        registrationNameDependencies: Ha,
        possibleRegistrationNames: yc
      };
      Hi(e) || typeof t.is == "string" || Sh(e, t, a), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error(
        "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
      );
    }
    function rt(e, t, a, i) {
      t !== a && (a = nl(a), nl(t) !== a && (i[e] = t));
    }
    function ai(e, t, a) {
      t.forEach(function(i) {
        a[Yy(i)] = i === "style" ? cc(e) : e.getAttribute(i);
      });
    }
    function Oa(e, t) {
      t === !1 ? console.error(
        "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",
        e,
        e,
        e
      ) : console.error(
        "Expected `%s` listener to be a function, instead got a value of `%s` type.",
        e,
        typeof t
      );
    }
    function cd(e, t) {
      return e = e.namespaceURI === bs || e.namespaceURI === Bo ? e.ownerDocument.createElementNS(
        e.namespaceURI,
        e.tagName
      ) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
    }
    function nl(e) {
      return fe(e) && (console.error(
        "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
        ne(e)
      ), ft(e)), (typeof e == "string" ? e : "" + e).replace(BS, `
`).replace(qS, "");
    }
    function qy(e, t) {
      return t = nl(t), nl(e) === t;
    }
    function ru() {
    }
    function Qe(e, t, a, i, o, f) {
      switch (a) {
        case "children":
          typeof i == "string" ? (of(i, t, !1), t === "body" || t === "textarea" && i === "" || xi(e, i)) : (typeof i == "number" || typeof i == "bigint") && (of("" + i, t, !1), t !== "body" && xi(e, "" + i));
          break;
        case "className":
          ef(e, "class", i);
          break;
        case "tabIndex":
          ef(e, "tabindex", i);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          ef(e, a, i);
          break;
        case "style":
          ff(e, i, f);
          break;
        case "data":
          if (t !== "object") {
            ef(e, "data", i);
            break;
          }
        case "src":
        case "href":
          if (i === "" && (t !== "a" || a !== "href")) {
            console.error(
              a === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
              a,
              a
            ), e.removeAttribute(a);
            break;
          }
          if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          le(i, a), i = _c("" + i), e.setAttribute(a, i);
          break;
        case "action":
        case "formAction":
          if (i != null && (t === "form" ? a === "formAction" ? console.error(
            "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
          ) : typeof i == "function" && (o.encType == null && o.method == null || jp || (jp = !0, console.error(
            "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
          )), o.target == null || Qp || (Qp = !0, console.error(
            "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
          ))) : t === "input" || t === "button" ? a === "action" ? console.error(
            "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
          ) : t !== "input" || o.type === "submit" || o.type === "image" || Xp ? t !== "button" || o.type == null || o.type === "submit" || Xp ? typeof i == "function" && (o.name == null || ib || (ib = !0, console.error(
            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
          )), o.formEncType == null && o.formMethod == null || jp || (jp = !0, console.error(
            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
          )), o.formTarget == null || Qp || (Qp = !0, console.error(
            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
          ))) : (Xp = !0, console.error(
            'A button can only specify a formAction along with type="submit" or no type.'
          )) : (Xp = !0, console.error(
            'An input can only specify a formAction along with type="submit" or type="image".'
          )) : console.error(
            a === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>."
          )), typeof i == "function") {
            e.setAttribute(
              a,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof f == "function" && (a === "formAction" ? (t !== "input" && Qe(e, t, "name", o.name, o, null), Qe(
              e,
              t,
              "formEncType",
              o.formEncType,
              o,
              null
            ), Qe(
              e,
              t,
              "formMethod",
              o.formMethod,
              o,
              null
            ), Qe(
              e,
              t,
              "formTarget",
              o.formTarget,
              o,
              null
            )) : (Qe(
              e,
              t,
              "encType",
              o.encType,
              o,
              null
            ), Qe(e, t, "method", o.method, o, null), Qe(
              e,
              t,
              "target",
              o.target,
              o,
              null
            )));
          if (i == null || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          le(i, a), i = _c("" + i), e.setAttribute(a, i);
          break;
        case "onClick":
          i != null && (typeof i != "function" && Oa(a, i), e.onclick = ru);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && Oa(a, i), Me("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && Oa(a, i), Me("scrollend", e));
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "multiple":
          e.multiple = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "muted":
          e.muted = i && typeof i != "function" && typeof i != "symbol";
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
          if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
            e.removeAttribute("xlink:href");
            break;
          }
          le(i, a), a = _c("" + i), e.setAttributeNS(qs, "xlink:href", a);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          i != null && typeof i != "function" && typeof i != "symbol" ? (le(i, a), e.setAttribute(a, "" + i)) : e.removeAttribute(a);
          break;
        case "inert":
          i !== "" || wp[a] || (wp[a] = !0, console.error(
            "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
            a
          ));
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
          i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
          break;
        case "capture":
        case "download":
          i === !0 ? e.setAttribute(a, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? (le(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? (le(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "rowSpan":
        case "start":
          i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(a) : (le(i, a), e.setAttribute(a, i));
          break;
        case "popover":
          Me("beforetoggle", e), Me("toggle", e), Po(e, "popover", i);
          break;
        case "xlinkActuate":
          Ya(
            e,
            qs,
            "xlink:actuate",
            i
          );
          break;
        case "xlinkArcrole":
          Ya(
            e,
            qs,
            "xlink:arcrole",
            i
          );
          break;
        case "xlinkRole":
          Ya(
            e,
            qs,
            "xlink:role",
            i
          );
          break;
        case "xlinkShow":
          Ya(
            e,
            qs,
            "xlink:show",
            i
          );
          break;
        case "xlinkTitle":
          Ya(
            e,
            qs,
            "xlink:title",
            i
          );
          break;
        case "xlinkType":
          Ya(
            e,
            qs,
            "xlink:type",
            i
          );
          break;
        case "xmlBase":
          Ya(
            e,
            gg,
            "xml:base",
            i
          );
          break;
        case "xmlLang":
          Ya(
            e,
            gg,
            "xml:lang",
            i
          );
          break;
        case "xmlSpace":
          Ya(
            e,
            gg,
            "xml:space",
            i
          );
          break;
        case "is":
          f != null && console.error(
            'Cannot update the "is" prop after it has been initialized.'
          ), Po(e, "is", i);
          break;
        case "innerText":
        case "textContent":
          break;
        case "popoverTarget":
          cb || i == null || typeof i != "object" || (cb = !0, console.error(
            "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
            i
          ));
        default:
          !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N" ? (a = Ws(a), Po(e, a, i)) : Ha.hasOwnProperty(a) && i != null && typeof i != "function" && Oa(a, i);
      }
    }
    function ic(e, t, a, i, o, f) {
      switch (a) {
        case "style":
          ff(e, i, f);
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "children":
          typeof i == "string" ? xi(e, i) : (typeof i == "number" || typeof i == "bigint") && xi(e, "" + i);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && Oa(a, i), Me("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && Oa(a, i), Me("scrollend", e));
          break;
        case "onClick":
          i != null && (typeof i != "function" && Oa(a, i), e.onclick = ru);
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
          if (Ha.hasOwnProperty(a))
            i != null && typeof i != "function" && Oa(a, i);
          else
            e: {
              if (a[0] === "o" && a[1] === "n" && (o = a.endsWith("Capture"), t = a.slice(2, o ? a.length - 7 : void 0), f = e[kl] || null, f = f != null ? f[a] : null, typeof f == "function" && e.removeEventListener(t, f, o), typeof i == "function")) {
                typeof f != "function" && f !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, i, o);
                break e;
              }
              a in e ? e[a] = i : i === !0 ? e.setAttribute(a, "") : Po(e, a, i);
            }
      }
    }
    function Et(e, t, a) {
      switch (On(t, a), t) {
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
          Me("error", e), Me("load", e);
          var i = !1, o = !1, f;
          for (f in a)
            if (a.hasOwnProperty(f)) {
              var d = a[f];
              if (d != null)
                switch (f) {
                  case "src":
                    i = !0;
                    break;
                  case "srcSet":
                    o = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    Qe(e, t, f, d, a, null);
                }
            }
          o && Qe(e, t, "srcSet", a.srcSet, a, null), i && Qe(e, t, "src", a.src, a, null);
          return;
        case "input":
          Hu("input", a), Me("invalid", e);
          var h = f = d = o = null, p = null, v = null;
          for (i in a)
            if (a.hasOwnProperty(i)) {
              var x = a[i];
              if (x != null)
                switch (i) {
                  case "name":
                    o = x;
                    break;
                  case "type":
                    d = x;
                    break;
                  case "checked":
                    p = x;
                    break;
                  case "defaultChecked":
                    v = x;
                    break;
                  case "value":
                    f = x;
                    break;
                  case "defaultValue":
                    h = x;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (x != null)
                      throw Error(
                        t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    Qe(e, t, i, x, a, null);
                }
            }
          Cu(e, a), r0(
            e,
            f,
            h,
            p,
            v,
            d,
            o,
            !1
          ), kn(e);
          return;
        case "select":
          Hu("select", a), Me("invalid", e), i = d = f = null;
          for (o in a)
            if (a.hasOwnProperty(o) && (h = a[o], h != null))
              switch (o) {
                case "value":
                  f = h;
                  break;
                case "defaultValue":
                  d = h;
                  break;
                case "multiple":
                  i = h;
                default:
                  Qe(
                    e,
                    t,
                    o,
                    h,
                    a,
                    null
                  );
              }
          nf(e, a), t = f, a = d, e.multiple = !!i, t != null ? Wn(e, !!i, t, !1) : a != null && Wn(e, !!i, a, !0);
          return;
        case "textarea":
          Hu("textarea", a), Me("invalid", e), f = o = i = null;
          for (d in a)
            if (a.hasOwnProperty(d) && (h = a[d], h != null))
              switch (d) {
                case "value":
                  i = h;
                  break;
                case "defaultValue":
                  o = h;
                  break;
                case "children":
                  f = h;
                  break;
                case "dangerouslySetInnerHTML":
                  if (h != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  Qe(
                    e,
                    t,
                    d,
                    h,
                    a,
                    null
                  );
              }
          an(e, a), mh(e, i, o, f), kn(e);
          return;
        case "option":
          yh(e, a);
          for (p in a)
            if (a.hasOwnProperty(p) && (i = a[p], i != null))
              switch (p) {
                case "selected":
                  e.selected = i && typeof i != "function" && typeof i != "symbol";
                  break;
                default:
                  Qe(e, t, p, i, a, null);
              }
          return;
        case "dialog":
          Me("beforetoggle", e), Me("toggle", e), Me("cancel", e), Me("close", e);
          break;
        case "iframe":
        case "object":
          Me("load", e);
          break;
        case "video":
        case "audio":
          for (i = 0; i < km.length; i++)
            Me(km[i], e);
          break;
        case "image":
          Me("error", e), Me("load", e);
          break;
        case "details":
          Me("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          Me("error", e), Me("load", e);
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
          for (v in a)
            if (a.hasOwnProperty(v) && (i = a[v], i != null))
              switch (v) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  Qe(e, t, v, i, a, null);
              }
          return;
        default:
          if (Hi(t)) {
            for (x in a)
              a.hasOwnProperty(x) && (i = a[x], i !== void 0 && ic(
                e,
                t,
                x,
                i,
                a,
                void 0
              ));
            return;
          }
      }
      for (h in a)
        a.hasOwnProperty(h) && (i = a[h], i != null && Qe(e, t, h, i, a, null));
    }
    function K0(e, t, a, i) {
      switch (On(t, i), t) {
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
          var o = null, f = null, d = null, h = null, p = null, v = null, x = null;
          for (Y in a) {
            var B = a[Y];
            if (a.hasOwnProperty(Y) && B != null)
              switch (Y) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  p = B;
                default:
                  i.hasOwnProperty(Y) || Qe(
                    e,
                    t,
                    Y,
                    null,
                    i,
                    B
                  );
              }
          }
          for (var O in i) {
            var Y = i[O];
            if (B = a[O], i.hasOwnProperty(O) && (Y != null || B != null))
              switch (O) {
                case "type":
                  f = Y;
                  break;
                case "name":
                  o = Y;
                  break;
                case "checked":
                  v = Y;
                  break;
                case "defaultChecked":
                  x = Y;
                  break;
                case "value":
                  d = Y;
                  break;
                case "defaultValue":
                  h = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  Y !== B && Qe(
                    e,
                    t,
                    O,
                    Y,
                    i,
                    B
                  );
              }
          }
          t = a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null, i = i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null, t || !i || ub || (console.error(
            "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), ub = !0), !t || i || nb || (console.error(
            "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), nb = !0), Nu(
            e,
            d,
            h,
            p,
            v,
            x,
            f,
            o
          );
          return;
        case "select":
          Y = d = h = O = null;
          for (f in a)
            if (p = a[f], a.hasOwnProperty(f) && p != null)
              switch (f) {
                case "value":
                  break;
                case "multiple":
                  Y = p;
                default:
                  i.hasOwnProperty(f) || Qe(
                    e,
                    t,
                    f,
                    null,
                    i,
                    p
                  );
              }
          for (o in i)
            if (f = i[o], p = a[o], i.hasOwnProperty(o) && (f != null || p != null))
              switch (o) {
                case "value":
                  O = f;
                  break;
                case "defaultValue":
                  h = f;
                  break;
                case "multiple":
                  d = f;
                default:
                  f !== p && Qe(
                    e,
                    t,
                    o,
                    f,
                    i,
                    p
                  );
              }
          i = h, t = d, a = Y, O != null ? Wn(e, !!t, O, !1) : !!a != !!t && (i != null ? Wn(e, !!t, i, !0) : Wn(e, !!t, t ? [] : "", !1));
          return;
        case "textarea":
          Y = O = null;
          for (h in a)
            if (o = a[h], a.hasOwnProperty(h) && o != null && !i.hasOwnProperty(h))
              switch (h) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  Qe(e, t, h, null, i, o);
              }
          for (d in i)
            if (o = i[d], f = a[d], i.hasOwnProperty(d) && (o != null || f != null))
              switch (d) {
                case "value":
                  O = o;
                  break;
                case "defaultValue":
                  Y = o;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (o != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  o !== f && Qe(e, t, d, o, i, f);
              }
          Js(e, O, Y);
          return;
        case "option":
          for (var W in a)
            if (O = a[W], a.hasOwnProperty(W) && O != null && !i.hasOwnProperty(W))
              switch (W) {
                case "selected":
                  e.selected = !1;
                  break;
                default:
                  Qe(
                    e,
                    t,
                    W,
                    null,
                    i,
                    O
                  );
              }
          for (p in i)
            if (O = i[p], Y = a[p], i.hasOwnProperty(p) && O !== Y && (O != null || Y != null))
              switch (p) {
                case "selected":
                  e.selected = O && typeof O != "function" && typeof O != "symbol";
                  break;
                default:
                  Qe(
                    e,
                    t,
                    p,
                    O,
                    i,
                    Y
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
          for (var re in a)
            O = a[re], a.hasOwnProperty(re) && O != null && !i.hasOwnProperty(re) && Qe(
              e,
              t,
              re,
              null,
              i,
              O
            );
          for (v in i)
            if (O = i[v], Y = a[v], i.hasOwnProperty(v) && O !== Y && (O != null || Y != null))
              switch (v) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (O != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  Qe(
                    e,
                    t,
                    v,
                    O,
                    i,
                    Y
                  );
              }
          return;
        default:
          if (Hi(t)) {
            for (var ot in a)
              O = a[ot], a.hasOwnProperty(ot) && O !== void 0 && !i.hasOwnProperty(ot) && ic(
                e,
                t,
                ot,
                void 0,
                i,
                O
              );
            for (x in i)
              O = i[x], Y = a[x], !i.hasOwnProperty(x) || O === Y || O === void 0 && Y === void 0 || ic(
                e,
                t,
                x,
                O,
                i,
                Y
              );
            return;
          }
      }
      for (var qe in a)
        O = a[qe], a.hasOwnProperty(qe) && O != null && !i.hasOwnProperty(qe) && Qe(e, t, qe, null, i, O);
      for (B in i)
        O = i[B], Y = a[B], !i.hasOwnProperty(B) || O === Y || O == null && Y == null || Qe(e, t, B, O, i, Y);
    }
    function Yy(e) {
      switch (e) {
        case "class":
          return "className";
        case "for":
          return "htmlFor";
        default:
          return e;
      }
    }
    function cc(e) {
      var t = {};
      e = e.style;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        t[i] = e.getPropertyValue(i);
      }
      return t;
    }
    function Gy(e, t, a) {
      if (t != null && typeof t != "object")
        console.error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      else {
        var i, o = i = "", f;
        for (f in t)
          if (t.hasOwnProperty(f)) {
            var d = t[f];
            d != null && typeof d != "boolean" && d !== "" && (f.indexOf("--") === 0 ? (Ye(d, f), i += o + f + ":" + ("" + d).trim()) : typeof d != "number" || d === 0 || gs.has(f) ? (Ye(d, f), i += o + f.replace(Su, "-$1").toLowerCase().replace(Tu, "-ms-") + ":" + ("" + d).trim()) : i += o + f.replace(Su, "-$1").toLowerCase().replace(Tu, "-ms-") + ":" + d + "px", o = ";");
          }
        i = i || null, t = e.getAttribute("style"), t !== i && (i = nl(i), nl(t) !== i && (a.style = cc(e)));
      }
    }
    function xl(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (le(i, t), e === "" + i)
              return;
        }
      rt(t, e, i, f);
    }
    function Vy(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null) {
        switch (typeof i) {
          case "function":
          case "symbol":
            return;
        }
        if (!i) return;
      } else
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (i) return;
        }
      rt(t, e, i, f);
    }
    function _y(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (le(i, a), e === "" + i)
              return;
        }
      rt(t, e, i, f);
    }
    function $0(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
          default:
            if (isNaN(i)) return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (!isNaN(i) && (le(i, t), e === "" + i))
              return;
        }
      rt(t, e, i, f);
    }
    function Je(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (le(i, t), a = _c("" + i), e === a)
              return;
        }
      rt(t, e, i, f);
    }
    function at(e, t, a, i) {
      for (var o = {}, f = /* @__PURE__ */ new Set(), d = e.attributes, h = 0; h < d.length; h++)
        switch (d[h].name.toLowerCase()) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            f.add(d[h].name);
        }
      if (Hi(t)) {
        for (var p in a)
          if (a.hasOwnProperty(p)) {
            var v = a[p];
            if (v != null) {
              if (Ha.hasOwnProperty(p))
                typeof v != "function" && Oa(p, v);
              else if (a.suppressHydrationWarning !== !0)
                switch (p) {
                  case "children":
                    typeof v != "string" && typeof v != "number" || rt(
                      "children",
                      e.textContent,
                      v,
                      o
                    );
                    continue;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "defaultValue":
                  case "defaultChecked":
                  case "innerHTML":
                  case "ref":
                    continue;
                  case "dangerouslySetInnerHTML":
                    d = e.innerHTML, v = v ? v.__html : void 0, v != null && (v = cd(e, v), rt(
                      p,
                      d,
                      v,
                      o
                    ));
                    continue;
                  case "style":
                    f.delete(p), Gy(e, v, o);
                    continue;
                  case "offsetParent":
                  case "offsetTop":
                  case "offsetLeft":
                  case "offsetWidth":
                  case "offsetHeight":
                  case "isContentEditable":
                  case "outerText":
                  case "outerHTML":
                    f.delete(p.toLowerCase()), console.error(
                      "Assignment to read-only property will result in a no-op: `%s`",
                      p
                    );
                    continue;
                  case "className":
                    f.delete("class"), d = c0(
                      e,
                      "class",
                      v
                    ), rt(
                      "className",
                      d,
                      v,
                      o
                    );
                    continue;
                  default:
                    i.context === Oc && t !== "svg" && t !== "math" ? f.delete(p.toLowerCase()) : f.delete(p), d = c0(
                      e,
                      p,
                      v
                    ), rt(
                      p,
                      d,
                      v,
                      o
                    );
                }
            }
          }
      } else
        for (v in a)
          if (a.hasOwnProperty(v) && (p = a[v], p != null)) {
            if (Ha.hasOwnProperty(v))
              typeof p != "function" && Oa(v, p);
            else if (a.suppressHydrationWarning !== !0)
              switch (v) {
                case "children":
                  typeof p != "string" && typeof p != "number" || rt(
                    "children",
                    e.textContent,
                    p,
                    o
                  );
                  continue;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "value":
                case "checked":
                case "selected":
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "ref":
                  continue;
                case "dangerouslySetInnerHTML":
                  d = e.innerHTML, p = p ? p.__html : void 0, p != null && (p = cd(e, p), d !== p && (o[v] = { __html: d }));
                  continue;
                case "className":
                  xl(
                    e,
                    v,
                    "class",
                    p,
                    f,
                    o
                  );
                  continue;
                case "tabIndex":
                  xl(
                    e,
                    v,
                    "tabindex",
                    p,
                    f,
                    o
                  );
                  continue;
                case "style":
                  f.delete(v), Gy(e, p, o);
                  continue;
                case "multiple":
                  f.delete(v), rt(
                    v,
                    e.multiple,
                    p,
                    o
                  );
                  continue;
                case "muted":
                  f.delete(v), rt(
                    v,
                    e.muted,
                    p,
                    o
                  );
                  continue;
                case "autoFocus":
                  f.delete("autofocus"), rt(
                    v,
                    e.autofocus,
                    p,
                    o
                  );
                  continue;
                case "data":
                  if (t !== "object") {
                    f.delete(v), d = e.getAttribute("data"), rt(
                      v,
                      d,
                      p,
                      o
                    );
                    continue;
                  }
                case "src":
                case "href":
                  if (!(p !== "" || t === "a" && v === "href" || t === "object" && v === "data")) {
                    console.error(
                      v === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                      v,
                      v
                    );
                    continue;
                  }
                  Je(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                case "action":
                case "formAction":
                  if (d = e.getAttribute(v), typeof p == "function") {
                    f.delete(v.toLowerCase()), v === "formAction" ? (f.delete("name"), f.delete("formenctype"), f.delete("formmethod"), f.delete("formtarget")) : (f.delete("enctype"), f.delete("method"), f.delete("target"));
                    continue;
                  } else if (d === YS) {
                    f.delete(v.toLowerCase()), rt(
                      v,
                      "function",
                      p,
                      o
                    );
                    continue;
                  }
                  Je(
                    e,
                    v,
                    v.toLowerCase(),
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkHref":
                  Je(
                    e,
                    v,
                    "xlink:href",
                    p,
                    f,
                    o
                  );
                  continue;
                case "contentEditable":
                  _y(
                    e,
                    v,
                    "contenteditable",
                    p,
                    f,
                    o
                  );
                  continue;
                case "spellCheck":
                  _y(
                    e,
                    v,
                    "spellcheck",
                    p,
                    f,
                    o
                  );
                  continue;
                case "draggable":
                case "autoReverse":
                case "externalResourcesRequired":
                case "focusable":
                case "preserveAlpha":
                  _y(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
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
                  Vy(
                    e,
                    v,
                    v.toLowerCase(),
                    p,
                    f,
                    o
                  );
                  continue;
                case "capture":
                case "download":
                  e: {
                    h = e;
                    var x = d = v, B = o;
                    if (f.delete(x), h = h.getAttribute(x), h === null)
                      switch (typeof p) {
                        case "undefined":
                        case "function":
                        case "symbol":
                          break e;
                        default:
                          if (p === !1) break e;
                      }
                    else if (p != null)
                      switch (typeof p) {
                        case "function":
                        case "symbol":
                          break;
                        case "boolean":
                          if (p === !0 && h === "") break e;
                          break;
                        default:
                          if (le(p, d), h === "" + p)
                            break e;
                      }
                    rt(
                      d,
                      h,
                      p,
                      B
                    );
                  }
                  continue;
                case "cols":
                case "rows":
                case "size":
                case "span":
                  e: {
                    if (h = e, x = d = v, B = o, f.delete(x), h = h.getAttribute(x), h === null)
                      switch (typeof p) {
                        case "undefined":
                        case "function":
                        case "symbol":
                        case "boolean":
                          break e;
                        default:
                          if (isNaN(p) || 1 > p) break e;
                      }
                    else if (p != null)
                      switch (typeof p) {
                        case "function":
                        case "symbol":
                        case "boolean":
                          break;
                        default:
                          if (!(isNaN(p) || 1 > p) && (le(p, d), h === "" + p))
                            break e;
                      }
                    rt(
                      d,
                      h,
                      p,
                      B
                    );
                  }
                  continue;
                case "rowSpan":
                  $0(
                    e,
                    v,
                    "rowspan",
                    p,
                    f,
                    o
                  );
                  continue;
                case "start":
                  $0(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                case "xHeight":
                  xl(
                    e,
                    v,
                    "x-height",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkActuate":
                  xl(
                    e,
                    v,
                    "xlink:actuate",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkArcrole":
                  xl(
                    e,
                    v,
                    "xlink:arcrole",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkRole":
                  xl(
                    e,
                    v,
                    "xlink:role",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkShow":
                  xl(
                    e,
                    v,
                    "xlink:show",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkTitle":
                  xl(
                    e,
                    v,
                    "xlink:title",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkType":
                  xl(
                    e,
                    v,
                    "xlink:type",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xmlBase":
                  xl(
                    e,
                    v,
                    "xml:base",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xmlLang":
                  xl(
                    e,
                    v,
                    "xml:lang",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xmlSpace":
                  xl(
                    e,
                    v,
                    "xml:space",
                    p,
                    f,
                    o
                  );
                  continue;
                case "inert":
                  p !== "" || wp[v] || (wp[v] = !0, console.error(
                    "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                    v
                  )), Vy(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                default:
                  if (!(2 < v.length) || v[0] !== "o" && v[0] !== "O" || v[1] !== "n" && v[1] !== "N") {
                    h = Ws(v), d = !1, i.context === Oc && t !== "svg" && t !== "math" ? f.delete(h.toLowerCase()) : (x = v.toLowerCase(), x = vc.hasOwnProperty(
                      x
                    ) && vc[x] || null, x !== null && x !== v && (d = !0, f.delete(x)), f.delete(h));
                    e: if (x = e, B = h, h = p, zi(B))
                      if (x.hasAttribute(B))
                        x = x.getAttribute(
                          B
                        ), le(
                          h,
                          B
                        ), h = x === "" + h ? h : x;
                      else {
                        switch (typeof h) {
                          case "function":
                          case "symbol":
                            break e;
                          case "boolean":
                            if (x = B.toLowerCase().slice(0, 5), x !== "data-" && x !== "aria-")
                              break e;
                        }
                        h = h === void 0 ? void 0 : null;
                      }
                    else h = void 0;
                    d || rt(
                      v,
                      h,
                      p,
                      o
                    );
                  }
              }
          }
      return 0 < f.size && a.suppressHydrationWarning !== !0 && ai(e, f, o), Object.keys(o).length === 0 ? null : o;
    }
    function Ue(e, t) {
      switch (e.length) {
        case 0:
          return "";
        case 1:
          return e[0];
        case 2:
          return e[0] + " " + t + " " + e[1];
        default:
          return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
      }
    }
    function xe(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function $e(e) {
      switch (e) {
        case Bo:
          return oh;
        case bs:
          return Jp;
        default:
          return Oc;
      }
    }
    function Ll(e, t) {
      if (e === Oc)
        switch (t) {
          case "svg":
            return oh;
          case "math":
            return Jp;
          default:
            return Oc;
        }
      return e === oh && t === "foreignObject" ? Oc : e;
    }
    function Mn(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function ho() {
      var e = window.event;
      return e && e.type === "popstate" ? e === Ag ? !1 : (Ag = e, !0) : (Ag = null, !1);
    }
    function Xy(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function du(e, t, a) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    }
    function zt(e, t, a, i) {
      K0(e, t, a, i), e[kl] = i;
    }
    function hu(e) {
      xi(e, "");
    }
    function oc(e, t, a) {
      e.nodeValue = a;
    }
    function Un(e) {
      return e === "head";
    }
    function Ma(e, t) {
      e.removeChild(t);
    }
    function yo(e, t) {
      (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
    }
    function mo(e, t) {
      var a = t, i = 0, o = 0;
      do {
        var f = a.nextSibling;
        if (e.removeChild(a), f && f.nodeType === 8)
          if (a = f.data, a === Lp) {
            if (0 < i && 8 > i) {
              a = i;
              var d = e.ownerDocument;
              if (a & VS && bo(d.documentElement), a & _S && bo(d.body), a & XS)
                for (a = d.head, bo(a), d = a.firstChild; d; ) {
                  var h = d.nextSibling, p = d.nodeName;
                  d[xo] || p === "SCRIPT" || p === "STYLE" || p === "LINK" && d.rel.toLowerCase() === "stylesheet" || a.removeChild(d), d = h;
                }
            }
            if (o === 0) {
              e.removeChild(f), dc(t);
              return;
            }
            o--;
          } else
            a === Zp || a === Rc || a === Wm ? o++ : i = a.charCodeAt(0) - 48;
        else i = 0;
        a = f;
      } while (a);
      dc(t);
    }
    function Jl(e) {
      e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
    }
    function Qy(e) {
      e.nodeValue = "";
    }
    function jy(e, t) {
      t = t[QS], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
    }
    function od(e, t) {
      e.nodeValue = t;
    }
    function po(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            po(a), Nc(a);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (a.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(a);
      }
    }
    function ni(e, t, a, i) {
      for (; e.nodeType === 1; ) {
        var o = a;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
            break;
        } else if (i) {
          if (!e[xo])
            switch (t) {
              case "meta":
                if (!e.hasAttribute("itemprop")) break;
                return e;
              case "link":
                if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                  break;
                if (f !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title))
                  break;
                return e;
              case "style":
                if (e.hasAttribute("data-precedence")) break;
                return e;
              case "script":
                if (f = e.getAttribute("src"), (f !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                  break;
                return e;
              default:
                return e;
            }
        } else if (t === "input" && e.type === "hidden") {
          le(o.name, "name");
          var f = o.name == null ? null : "" + o.name;
          if (o.type === "hidden" && e.getAttribute("name") === f)
            return e;
        } else return e;
        if (e = il(e.nextSibling), e === null) break;
      }
      return null;
    }
    function ul(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; )
        if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = il(e.nextSibling), e === null)) return null;
      return e;
    }
    function xn(e) {
      return e.data === Wm || e.data === Rc && e.ownerDocument.readyState === fb;
    }
    function vo(e, t) {
      var a = e.ownerDocument;
      if (e.data !== Rc || a.readyState === fb)
        t();
      else {
        var i = function() {
          t(), a.removeEventListener("DOMContentLoaded", i);
        };
        a.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
      }
    }
    function il(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === Zp || t === Wm || t === Rc || t === bg || t === ob)
            break;
          if (t === Lp) return null;
        }
      }
      return e;
    }
    function fd(e) {
      if (e.nodeType === 1) {
        for (var t = e.nodeName.toLowerCase(), a = {}, i = e.attributes, o = 0; o < i.length; o++) {
          var f = i[o];
          a[Yy(f.name)] = f.name.toLowerCase() === "style" ? cc(e) : f.value;
        }
        return { type: t, props: a };
      }
      return e.nodeType === 8 ? { type: "Suspense", props: {} } : e.nodeValue;
    }
    function sd(e, t, a) {
      return a === null || a[GS] !== !0 ? (e.nodeValue === t ? e = null : (t = nl(t), e = nl(e.nodeValue) === t ? null : e.nodeValue), e) : null;
    }
    function wy(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === Lp) {
            if (t === 0)
              return il(e.nextSibling);
            t--;
          } else
            a !== Zp && a !== Wm && a !== Rc || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function go(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === Zp || a === Wm || a === Rc) {
            if (t === 0) return e;
            t--;
          } else a === Lp && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function Zy(e) {
      dc(e);
    }
    function ia(e) {
      dc(e);
    }
    function Ly(e, t, a, i, o) {
      switch (o && ks(e, i.ancestorInfo), t = xe(a), e) {
        case "html":
          if (e = t.documentElement, !e)
            throw Error(
              "React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "head":
          if (e = t.head, !e)
            throw Error(
              "React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "body":
          if (e = t.body, !e)
            throw Error(
              "React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        default:
          throw Error(
            "resolveSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
    }
    function ca(e, t, a, i) {
      if (!a[hi] && Pl(a)) {
        var o = a.tagName.toLowerCase();
        console.error(
          "You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",
          o,
          o,
          o
        );
      }
      switch (e) {
        case "html":
        case "head":
        case "body":
          break;
        default:
          console.error(
            "acquireSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
      for (o = a.attributes; o.length; )
        a.removeAttributeNode(o[0]);
      Et(a, e, t), a[bl] = i, a[kl] = t;
    }
    function bo(e) {
      for (var t = e.attributes; t.length; )
        e.removeAttributeNode(t[0]);
      Nc(e);
    }
    function If(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    function k0(e, t, a) {
      var i = fh;
      if (i && typeof t == "string" && t) {
        var o = ea(t);
        o = 'link[rel="' + e + '"][href="' + o + '"]', typeof a == "string" && (o += '[crossorigin="' + a + '"]'), mb.has(o) || (mb.add(o), e = { rel: e, crossOrigin: a, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), Et(t, "link", e), Lt(t), i.head.appendChild(t)));
      }
    }
    function yu(e, t, a, i) {
      var o = (o = Cn.current) ? If(o) : null;
      if (!o)
        throw Error(
          '"resourceRoot" was expected to exist. This is a bug in React.'
        );
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (a = ui(a.href), t = ln(o).hoistableStyles, i = t.get(a), i || (i = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
            e = ui(a.href);
            var f = ln(o).hoistableStyles, d = f.get(e);
            if (!d && (o = o.ownerDocument || o, d = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: Gs, preload: null }
            }, f.set(e, d), (f = o.querySelector(
              Hn(e)
            )) && !f._p && (d.instance = f, d.state.loading = Fm | Ln), !Jn.has(e))) {
              var h = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy
              };
              Jn.set(e, h), f || W0(
                o,
                e,
                h,
                d.state
              );
            }
            if (t && i === null)
              throw a = `

  - ` + fc(t) + `
  + ` + fc(a), Error(
                "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
              );
            return d;
          }
          if (t && i !== null)
            throw a = `

  - ` + fc(t) + `
  + ` + fc(a), Error(
              "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
            );
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = sc(a), t = ln(o).hoistableScripts, i = t.get(a), i || (i = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(
            'getResource encountered a type it did not expect: "' + e + '". this is a bug in React.'
          );
      }
    }
    function fc(e) {
      var t = 0, a = "<link";
      return typeof e.rel == "string" ? (t++, a += ' rel="' + e.rel + '"') : vu.call(e, "rel") && (t++, a += ' rel="' + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + '"'), typeof e.href == "string" ? (t++, a += ' href="' + e.href + '"') : vu.call(e, "href") && (t++, a += ' href="' + (e.href === null ? "null" : "invalid type " + typeof e.href) + '"'), typeof e.precedence == "string" ? (t++, a += ' precedence="' + e.precedence + '"') : vu.call(e, "precedence") && (t++, a += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (a += " ..."), a + " />";
    }
    function ui(e) {
      return 'href="' + ea(e) + '"';
    }
    function Hn(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function Jy(e) {
      return Ee({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function W0(e, t, a, i) {
      e.querySelector(
        'link[rel="preload"][as="style"][' + t + "]"
      ) ? i.loading = Fm : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
        return i.loading |= Fm;
      }), t.addEventListener("error", function() {
        return i.loading |= hb;
      }), Et(t, "link", a), Lt(t), e.head.appendChild(t));
    }
    function sc(e) {
      return '[src="' + ea(e) + '"]';
    }
    function rc(e) {
      return "script[async]" + e;
    }
    function rd(e, t, a) {
      if (t.count++, t.instance === null)
        switch (t.type) {
          case "style":
            var i = e.querySelector(
              'style[data-href~="' + ea(a.href) + '"]'
            );
            if (i)
              return t.instance = i, Lt(i), i;
            var o = Ee({}, a, {
              "data-href": a.href,
              "data-precedence": a.precedence,
              href: null,
              precedence: null
            });
            return i = (e.ownerDocument || e).createElement("style"), Lt(i), Et(i, "style", o), dd(i, a.precedence, e), t.instance = i;
          case "stylesheet":
            o = ui(a.href);
            var f = e.querySelector(
              Hn(o)
            );
            if (f)
              return t.state.loading |= Ln, t.instance = f, Lt(f), f;
            i = Jy(a), (o = Jn.get(o)) && Ky(i, o), f = (e.ownerDocument || e).createElement("link"), Lt(f);
            var d = f;
            return d._p = new Promise(function(h, p) {
              d.onload = h, d.onerror = p;
            }), Et(f, "link", i), t.state.loading |= Ln, dd(f, a.precedence, e), t.instance = f;
          case "script":
            return f = sc(a.src), (o = e.querySelector(
              rc(f)
            )) ? (t.instance = o, Lt(o), o) : (i = a, (o = Jn.get(f)) && (i = Ee({}, a), $y(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), Lt(o), Et(o, "link", i), e.head.appendChild(o), t.instance = o);
          case "void":
            return null;
          default:
            throw Error(
              'acquireResource encountered a resource type it did not expect: "' + t.type + '". this is a bug in React.'
            );
        }
      else
        t.type === "stylesheet" && (t.state.loading & Ln) === Gs && (i = t.instance, t.state.loading |= Ln, dd(i, a.precedence, e));
      return t.instance;
    }
    function dd(e, t, a) {
      for (var i = a.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), o = i.length ? i[i.length - 1] : null, f = o, d = 0; d < i.length; d++) {
        var h = i[d];
        if (h.dataset.precedence === t) f = h;
        else if (f !== o) break;
      }
      f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function Ky(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function $y(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    function ky(e, t, a) {
      if (Kp === null) {
        var i = /* @__PURE__ */ new Map(), o = Kp = /* @__PURE__ */ new Map();
        o.set(a, i);
      } else
        o = Kp, i = o.get(a), i || (i = /* @__PURE__ */ new Map(), o.set(a, i));
      if (i.has(e)) return i;
      for (i.set(e, null), a = a.getElementsByTagName(e), o = 0; o < a.length; o++) {
        var f = a[o];
        if (!(f[xo] || f[bl] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== Bo) {
          var d = f.getAttribute(t) || "";
          d = e + d;
          var h = i.get(d);
          h ? h.push(f) : i.set(d, [f]);
        }
      }
      return i;
    }
    function Wy(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
    }
    function So(e, t, a) {
      var i = !a.ancestorInfo.containerTagInScope;
      if (a.context === oh || t.itemProp != null)
        return !i || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error(
          "Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",
          e,
          e
        ), !1;
      switch (e) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
            i && console.error(
              'Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.'
            );
            break;
          }
          return !0;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
            if (t.rel === "stylesheet" && typeof t.precedence == "string") {
              e = t.href;
              var o = t.onError, f = t.disabled;
              a = [], t.onLoad && a.push("`onLoad`"), o && a.push("`onError`"), f != null && a.push("`disabled`"), o = Ue(a, "and"), o += a.length === 1 ? " prop" : " props", f = a.length === 1 ? "an " + o : "the " + o, a.length && console.error(
                'React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                e,
                f,
                o
              );
            }
            i && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error(
              "Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"
            ) : (t.onError || t.onLoad) && console.error(
              "Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ));
            break;
          }
          switch (t.rel) {
            case "stylesheet":
              return e = t.precedence, t = t.disabled, typeof e != "string" && i && console.error(
                'Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'
              ), typeof e == "string" && t == null;
            default:
              return !0;
          }
        case "script":
          if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
            i && (e ? t.onLoad || t.onError ? console.error(
              "Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              "Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              'Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'
            ));
            break;
          }
          return !0;
        case "noscript":
        case "template":
          i && console.error(
            "Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",
            e
          );
      }
      return !1;
    }
    function Pf(e) {
      return !(e.type === "stylesheet" && (e.state.loading & yb) === Gs);
    }
    function F0() {
    }
    function I0(e, t, a) {
      if (Im === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var i = Im;
      if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (t.state.loading & Ln) === Gs) {
        if (t.instance === null) {
          var o = ui(a.href), f = e.querySelector(
            Hn(o)
          );
          if (f) {
            e = f._p, e !== null && typeof e == "object" && typeof e.then == "function" && (i.count++, i = es.bind(i), e.then(i, i)), t.state.loading |= Ln, t.instance = f, Lt(f);
            return;
          }
          f = e.ownerDocument || e, a = Jy(a), (o = Jn.get(o)) && Ky(a, o), f = f.createElement("link"), Lt(f);
          var d = f;
          d._p = new Promise(function(h, p) {
            d.onload = h, d.onerror = p;
          }), Et(f, "link", a), t.instance = f;
        }
        i.stylesheets === null && (i.stylesheets = /* @__PURE__ */ new Map()), i.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & yb) === Gs && (i.count++, t = es.bind(i), e.addEventListener("load", t), e.addEventListener("error", t));
      }
    }
    function P0() {
      if (Im === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var e = Im;
      return e.stylesheets && e.count === 0 && hd(e, e.stylesheets), 0 < e.count ? function(t) {
        var a = setTimeout(function() {
          if (e.stylesheets && hd(e, e.stylesheets), e.unsuspend) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, 6e4);
        return e.unsuspend = t, function() {
          e.unsuspend = null, clearTimeout(a);
        };
      } : null;
    }
    function es() {
      if (this.count--, this.count === 0) {
        if (this.stylesheets)
          hd(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    function hd(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, $p = /* @__PURE__ */ new Map(), t.forEach(ep, e), $p = null, es.call(e));
    }
    function ep(e, t) {
      if (!(t.state.loading & Ln)) {
        var a = $p.get(e);
        if (a) var i = a.get(zg);
        else {
          a = /* @__PURE__ */ new Map(), $p.set(e, a);
          for (var o = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), f = 0; f < o.length; f++) {
            var d = o[f];
            (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (a.set(d.dataset.precedence, d), i = d);
          }
          i && a.set(zg, i);
        }
        o = t.instance, d = o.getAttribute("data-precedence"), f = a.get(d) || i, f === i && a.set(zg, o), a.set(d, o), this.count++, i = es.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), f ? f.parentNode.insertBefore(o, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= Ln;
      }
    }
    function yd(e, t, a, i, o, f, d, h) {
      for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = Ys, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = dh(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = dh(0), this.hiddenUpdates = dh(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = f, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
      this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
    }
    function Fy(e, t, a, i, o, f, d, h, p, v, x, B) {
      return e = new yd(
        e,
        t,
        a,
        d,
        h,
        p,
        v,
        B
      ), t = hS, f === !0 && (t |= Fl | Au), Rt && (t |= Cl), f = oe(3, null, null, t), e.current = f, f.stateNode = e, t = gf(), Xi(t), e.pooledCache = t, Xi(t), f.memoizedState = {
        element: i,
        isDehydrated: a,
        cache: t
      }, Vl(f), e;
    }
    function Iy(e) {
      return e ? (e = qo, e) : qo;
    }
    function Fe(e, t, a, i, o, f) {
      if (cl && typeof cl.onScheduleFiberRoot == "function")
        try {
          cl.onScheduleFiberRoot(ri, i, a);
        } catch (d) {
          $l || ($l = !0, console.error(
            "React instrumentation encountered an error: %s",
            d
          ));
        }
      K !== null && typeof K.markRenderScheduled == "function" && K.markRenderScheduled(t), o = Iy(o), i.context === null ? i.context = o : i.pendingContext = o, Wl && fa !== null && !bb && (bb = !0, console.error(
        `Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,
        te(fa) || "Unknown"
      )), i = sn(t), i.payload = { element: a }, f = f === void 0 ? null : f, f !== null && (typeof f != "function" && console.error(
        "Expected the last optional `callback` argument to be a function. Instead received: %s.",
        f
      ), i.callback = f), a = ja(e, i, t), a !== null && (Tt(a, e, t), Zu(a, e, t));
    }
    function md(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function Py(e, t) {
      md(e, t), (e = e.alternate) && md(e, t);
    }
    function em(e) {
      if (e.tag === 13) {
        var t = Gl(e, 67108864);
        t !== null && Tt(t, e, 67108864), Py(e, 67108864);
      }
    }
    function gv() {
      return fa;
    }
    function bv() {
      for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; 31 > a; a++) {
        var i = uv(t);
        e.set(t, i), t *= 2;
      }
      return e;
    }
    function Sv(e, t, a, i) {
      var o = C.T;
      C.T = null;
      var f = se.p;
      try {
        se.p = ol, ii(e, t, a, i);
      } finally {
        se.p = f, C.T = o;
      }
    }
    function pd(e, t, a, i) {
      var o = C.T;
      C.T = null;
      var f = se.p;
      try {
        se.p = Fa, ii(e, t, a, i);
      } finally {
        se.p = f, C.T = o;
      }
    }
    function ii(e, t, a, i) {
      if (Wp) {
        var o = ts(i);
        if (o === null)
          Ml(
            e,
            t,
            i,
            Fp,
            a
          ), ci(e, i);
        else if (ls(
          o,
          e,
          t,
          a,
          i
        ))
          i.stopPropagation();
        else if (ci(e, i), t & 4 && -1 < LS.indexOf(e)) {
          for (; o !== null; ) {
            var f = Pl(o);
            if (f !== null)
              switch (f.tag) {
                case 3:
                  if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                    var d = Ai(f.pendingLanes);
                    if (d !== 0) {
                      var h = f;
                      for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                        var p = 1 << 31 - gl(d);
                        h.entanglements[1] |= p, d &= ~p;
                      }
                      Ra(f), (Ie & (ha | Ru)) === Ia && (Bp = Nn() + F1, uc(0));
                    }
                  }
                  break;
                case 13:
                  h = Gl(f, 2), h !== null && Tt(h, f, 2), ac(), Py(f, 2);
              }
            if (f = ts(i), f === null && Ml(
              e,
              t,
              i,
              Fp,
              a
            ), f === o) break;
            o = f;
          }
          o !== null && i.stopPropagation();
        } else
          Ml(
            e,
            t,
            i,
            null,
            a
          );
      }
    }
    function ts(e) {
      return e = Ci(e), To(e);
    }
    function To(e) {
      if (Fp = null, e = $n(e), e !== null) {
        var t = Ce(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = Ut(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return Fp = e, null;
    }
    function vd(e) {
      switch (e) {
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
          return ol;
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
          return Fa;
        case "message":
          switch (si()) {
            case Ad:
              return ol;
            case rs:
              return Fa;
            case Oo:
            case Dv:
              return bu;
            case ds:
              return Rd;
            default:
              return bu;
          }
        default:
          return bu;
      }
    }
    function ci(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Lo = null;
          break;
        case "dragenter":
        case "dragleave":
          Jo = null;
          break;
        case "mouseover":
        case "mouseout":
          Ko = null;
          break;
        case "pointerover":
        case "pointerout":
          e0.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          t0.delete(t.pointerId);
      }
    }
    function Kl(e, t, a, i, o, f) {
      return e === null || e.nativeEvent !== f ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: i,
        nativeEvent: f,
        targetContainers: [o]
      }, t !== null && (t = Pl(t), t !== null && em(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
    }
    function ls(e, t, a, i, o) {
      switch (t) {
        case "focusin":
          return Lo = Kl(
            Lo,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "dragenter":
          return Jo = Kl(
            Jo,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "mouseover":
          return Ko = Kl(
            Ko,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "pointerover":
          var f = o.pointerId;
          return e0.set(
            f,
            Kl(
              e0.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
        case "gotpointercapture":
          return f = o.pointerId, t0.set(
            f,
            Kl(
              t0.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
      }
      return !1;
    }
    function tp(e) {
      var t = $n(e.target);
      if (t !== null) {
        var a = Ce(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = Ut(a), t !== null) {
              e.blockedOn = t, cv(e.priority, function() {
                if (a.tag === 13) {
                  var i = Zl(a);
                  i = zl(i);
                  var o = Gl(
                    a,
                    i
                  );
                  o !== null && Tt(o, a, i), Py(a, i);
                }
              });
              return;
            }
          } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function as(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = ts(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var i = new a.constructor(
            a.type,
            a
          ), o = i;
          s !== null && console.error(
            "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = o, a.target.dispatchEvent(i), s === null && console.error(
            "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = null;
        } else
          return t = Pl(a), t !== null && em(t), e.blockedOn = a, !1;
        t.shift();
      }
      return !0;
    }
    function tm(e, t, a) {
      as(e) && a.delete(t);
    }
    function lp() {
      Dg = !1, Lo !== null && as(Lo) && (Lo = null), Jo !== null && as(Jo) && (Jo = null), Ko !== null && as(Ko) && (Ko = null), e0.forEach(tm), t0.forEach(tm);
    }
    function ns(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Dg || (Dg = !0, Dt.unstable_scheduleCallback(
        Dt.unstable_NormalPriority,
        lp
      )));
    }
    function ap(e) {
      Ip !== e && (Ip = e, Dt.unstable_scheduleCallback(
        Dt.unstable_NormalPriority,
        function() {
          Ip === e && (Ip = null);
          for (var t = 0; t < e.length; t += 3) {
            var a = e[t], i = e[t + 1], o = e[t + 2];
            if (typeof i != "function") {
              if (To(i || a) === null)
                continue;
              break;
            }
            var f = Pl(a);
            f !== null && (e.splice(t, 3), t -= 3, a = {
              pending: !0,
              data: o,
              method: a.method,
              action: i
            }, Object.freeze(a), Ji(
              f,
              a,
              i,
              o
            ));
          }
        }
      ));
    }
    function dc(e) {
      function t(p) {
        return ns(p, e);
      }
      Lo !== null && ns(Lo, e), Jo !== null && ns(Jo, e), Ko !== null && ns(Ko, e), e0.forEach(t), t0.forEach(t);
      for (var a = 0; a < $o.length; a++) {
        var i = $o[a];
        i.blockedOn === e && (i.blockedOn = null);
      }
      for (; 0 < $o.length && (a = $o[0], a.blockedOn === null); )
        tp(a), a.blockedOn === null && $o.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
        for (i = 0; i < a.length; i += 3) {
          var o = a[i], f = a[i + 1], d = o[kl] || null;
          if (typeof f == "function")
            d || ap(a);
          else if (d) {
            var h = null;
            if (f && f.hasAttribute("formAction")) {
              if (o = f, d = f[kl] || null)
                h = d.formAction;
              else if (To(o) !== null) continue;
            } else h = d.action;
            typeof h == "function" ? a[i + 1] = h : (a.splice(i, 3), i -= 3), ap(a);
          }
        }
    }
    function gd(e) {
      this._internalRoot = e;
    }
    function us(e) {
      this._internalRoot = e;
    }
    function np(e) {
      e[hi] && (e._reactRootContainer ? console.error(
        "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
      ) : console.error(
        "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
      ));
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var Dt = Vb(), is = av, Tv = Gb, Ee = Object.assign, cs = Symbol.for("react.element"), oi = Symbol.for("react.transitional.element"), hc = Symbol.for("react.portal"), ge = Symbol.for("react.fragment"), Ao = Symbol.for("react.strict_mode"), Eo = Symbol.for("react.profiler"), lm = Symbol.for("react.provider"), bd = Symbol.for("react.consumer"), Ua = Symbol.for("react.context"), mu = Symbol.for("react.forward_ref"), zo = Symbol.for("react.suspense"), fi = Symbol.for("react.suspense_list"), os = Symbol.for("react.memo"), oa = Symbol.for("react.lazy"), am = Symbol.for("react.activity"), up = Symbol.for("react.memo_cache_sentinel"), nm = Symbol.iterator, Sd = Symbol.for("react.client.reference"), he = Array.isArray, C = is.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = Tv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Av = Object.freeze({
      pending: !1,
      data: null,
      method: null,
      action: null
    }), fs = [], ss = [], xa = -1, pu = xt(null), Do = xt(null), Cn = xt(null), Ro = xt(null), vu = Object.prototype.hasOwnProperty, Td = Dt.unstable_scheduleCallback, Ev = Dt.unstable_cancelCallback, ip = Dt.unstable_shouldYield, zv = Dt.unstable_requestPaint, Nn = Dt.unstable_now, si = Dt.unstable_getCurrentPriorityLevel, Ad = Dt.unstable_ImmediatePriority, rs = Dt.unstable_UserBlockingPriority, Oo = Dt.unstable_NormalPriority, Dv = Dt.unstable_LowPriority, ds = Dt.unstable_IdlePriority, Rv = Dt.log, Wa = Dt.unstable_setDisableYieldValue, ri = null, cl = null, K = null, $l = !1, Rt = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", gl = Math.clz32 ? Math.clz32 : sh, Ed = Math.log, gu = Math.LN2, zd = 256, Dd = 4194304, ol = 2, Fa = 8, bu = 32, Rd = 268435456, di = Math.random().toString(36).slice(2), bl = "__reactFiber$" + di, kl = "__reactProps$" + di, hi = "__reactContainer$" + di, um = "__reactEvents$" + di, cp = "__reactListeners$" + di, Mo = "__reactHandles$" + di, Uo = "__reactResources$" + di, xo = "__reactMarker$" + di, op = /* @__PURE__ */ new Set(), Ha = {}, yc = {}, fp = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    }, Od = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Md = {}, Ud = {}, yi = 0, im, cm, sp, om, Ho, rp, dp;
    js.__reactDisabledLog = !0;
    var fm, hs, Co = !1, ys = new (typeof WeakMap == "function" ? WeakMap : Map)(), fa = null, Wl = !1, Ov = /[\n"\\]/g, sm = !1, rm = !1, dm = !1, hm = !1, xd = !1, ym = !1, ms = ["value", "defaultValue"], hp = !1, yp = /["'&<>\n\t]|^\s|\s$/, mm = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
      " "
    ), Hd = "applet caption html table td th marquee object template foreignObject desc title".split(
      " "
    ), Cd = Hd.concat(["button"]), pm = "dd dt li option optgroup p rp rt".split(" "), vm = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null,
      containerTagInScope: null,
      implicitRootScope: !1
    }, No = {}, Bn = {
      animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(
        " "
      ),
      background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(
        " "
      ),
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(
        " "
      ),
      borderBlockEnd: [
        "borderBlockEndColor",
        "borderBlockEndStyle",
        "borderBlockEndWidth"
      ],
      borderBlockStart: [
        "borderBlockStartColor",
        "borderBlockStartStyle",
        "borderBlockStartWidth"
      ],
      borderBottom: [
        "borderBottomColor",
        "borderBottomStyle",
        "borderBottomWidth"
      ],
      borderColor: [
        "borderBottomColor",
        "borderLeftColor",
        "borderRightColor",
        "borderTopColor"
      ],
      borderImage: [
        "borderImageOutset",
        "borderImageRepeat",
        "borderImageSlice",
        "borderImageSource",
        "borderImageWidth"
      ],
      borderInlineEnd: [
        "borderInlineEndColor",
        "borderInlineEndStyle",
        "borderInlineEndWidth"
      ],
      borderInlineStart: [
        "borderInlineStartColor",
        "borderInlineStartStyle",
        "borderInlineStartWidth"
      ],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: [
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
        "borderTopLeftRadius",
        "borderTopRightRadius"
      ],
      borderRight: [
        "borderRightColor",
        "borderRightStyle",
        "borderRightWidth"
      ],
      borderStyle: [
        "borderBottomStyle",
        "borderLeftStyle",
        "borderRightStyle",
        "borderTopStyle"
      ],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: [
        "borderBottomWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth"
      ],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(
        " "
      ),
      fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(
        " "
      ),
      gap: ["columnGap", "rowGap"],
      grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(
        " "
      ),
      gridArea: [
        "gridColumnEnd",
        "gridColumnStart",
        "gridRowEnd",
        "gridRowStart"
      ],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: [
        "gridTemplateAreas",
        "gridTemplateColumns",
        "gridTemplateRows"
      ],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(
        " "
      ),
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: [
        "textDecorationColor",
        "textDecorationLine",
        "textDecorationStyle"
      ],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: [
        "transitionDelay",
        "transitionDuration",
        "transitionProperty",
        "transitionTimingFunction"
      ],
      wordWrap: ["overflowWrap"]
    }, Su = /([A-Z])/g, Tu = /^ms-/, ps = /^(?:webkit|moz|o)[A-Z]/, vs = /^-ms-/, mi = /-(.)/g, mp = /;\s*$/, mc = {}, pc = {}, pp = !1, gm = !1, gs = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    ), bs = "http://www.w3.org/1998/Math/MathML", Bo = "http://www.w3.org/2000/svg", Nd = /* @__PURE__ */ new Map([
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
    ]), vc = {
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      fetchpriority: "fetchPriority",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      inert: "inert",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      popover: "popover",
      popovertarget: "popoverTarget",
      popovertargetaction: "popoverTargetAction",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      transformorigin: "transformOrigin",
      "transform-origin": "transformOrigin",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, bm = {
      "aria-current": 0,
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      "aria-hidden": 0,
      "aria-invalid": 0,
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, qn = {}, Sm = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Bd = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Tm = !1, Hl = {}, Ss = /^on./, l = /^on[^A-Z]/, n = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), u = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), c = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, s = null, r = null, y = null, m = !1, g = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), R = !1;
    if (g)
      try {
        var V = {};
        Object.defineProperty(V, "passive", {
          get: function() {
            R = !0;
          }
        }), window.addEventListener("test", V, V), window.removeEventListener("test", V, V);
      } catch {
        R = !1;
      }
    var X = null, M = null, H = null, P = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, ee = tl(P), je = Ee({}, P, { view: 0, detail: 0 }), z = tl(je), A, D, _, $ = Ee({}, je, {
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
      getModifierState: Ps,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== _ && (_ && e.type === "mousemove" ? (A = e.screenX - _.screenX, D = e.screenY - _.screenY) : D = A = 0, _ = e), A);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : D;
      }
    }), Re = tl($), I = Ee({}, $, { dataTransfer: 0 }), ie = tl(I), Ft = Ee({}, je, { relatedTarget: 0 }), Ge = tl(Ft), pi = Ee({}, P, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Mv = tl(pi), jb = Ee({}, P, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), wb = tl(jb), Zb = Ee({}, P, { data: 0 }), Cg = tl(
      Zb
    ), Lb = Cg, Jb = {
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
    }, Kb = {
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
    }, $b = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    }, kb = Ee({}, je, {
      key: function(e) {
        if (e.key) {
          var t = Jb[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Xc(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Kb[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ps,
      charCode: function(e) {
        return e.type === "keypress" ? Xc(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Xc(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Wb = tl(kb), Fb = Ee({}, $, {
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
    }), Ng = tl(Fb), Ib = Ee({}, je, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ps
    }), Pb = tl(Ib), eS = Ee({}, P, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), tS = tl(eS), lS = Ee({}, $, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), aS = tl(lS), nS = Ee({}, P, {
      newState: 0,
      oldState: 0
    }), uS = tl(nS), iS = [9, 13, 27, 32], Bg = 229, Uv = g && "CompositionEvent" in window, Am = null;
    g && "documentMode" in document && (Am = document.documentMode);
    var cS = g && "TextEvent" in window && !Am, qg = g && (!Uv || Am && 8 < Am && 11 >= Am), Yg = 32, Gg = String.fromCharCode(Yg), Vg = !1, qd = !1, oS = {
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
    }, Em = null, zm = null, _g = !1;
    g && (_g = Ah("input") && (!document.documentMode || 9 < document.documentMode));
    var sa = typeof Object.is == "function" ? Object.is : yv, fS = g && "documentMode" in document && 11 >= document.documentMode, Yd = null, xv = null, Dm = null, Hv = !1, Gd = {
      animationend: Pn("Animation", "AnimationEnd"),
      animationiteration: Pn("Animation", "AnimationIteration"),
      animationstart: Pn("Animation", "AnimationStart"),
      transitionrun: Pn("Transition", "TransitionRun"),
      transitionstart: Pn("Transition", "TransitionStart"),
      transitioncancel: Pn("Transition", "TransitionCancel"),
      transitionend: Pn("Transition", "TransitionEnd")
    }, Cv = {}, Xg = {};
    g && (Xg = document.createElement("div").style, "AnimationEvent" in window || (delete Gd.animationend.animation, delete Gd.animationiteration.animation, delete Gd.animationstart.animation), "TransitionEvent" in window || delete Gd.transitionend.transition);
    var Qg = qi("animationend"), jg = qi("animationiteration"), wg = qi("animationstart"), sS = qi("transitionrun"), rS = qi("transitionstart"), dS = qi("transitioncancel"), Zg = qi("transitionend"), Lg = /* @__PURE__ */ new Map(), Nv = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
    Nv.push("scrollEnd");
    var Bv = /* @__PURE__ */ new WeakMap(), vp = 1, gc = 2, Yn = [], Vd = 0, qv = 0, qo = {};
    Object.freeze(qo);
    var Gn = null, _d = null, dt = 0, hS = 1, Cl = 2, Fl = 8, Au = 16, Jg = 64, Kg = !1;
    try {
      var $g = Object.preventExtensions({});
    } catch {
      Kg = !0;
    }
    var Xd = [], Qd = 0, gp = null, bp = 0, Vn = [], _n = 0, Ts = null, bc = 1, Sc = "", ra = null, Ct = null, we = !1, Tc = !1, Xn = null, As = null, vi = !1, Yv = Error(
      "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), kg = 0;
    if (typeof performance == "object" && typeof performance.now == "function")
      var yS = performance, Wg = function() {
        return yS.now();
      };
    else {
      var mS = Date;
      Wg = function() {
        return mS.now();
      };
    }
    var Gv = xt(null), Vv = xt(null), Fg = {}, Sp = null, jd = null, wd = !1, pS = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = {
        aborted: !1,
        addEventListener: function(a, i) {
          e.push(i);
        }
      };
      this.abort = function() {
        t.aborted = !0, e.forEach(function(a) {
          return a();
        });
      };
    }, vS = Dt.unstable_scheduleCallback, gS = Dt.unstable_NormalPriority, fl = {
      $$typeof: Ua,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
      _currentRenderer: null,
      _currentRenderer2: null
    }, Zd = Dt.unstable_now, Ig = -0, Tp = -0, Ca = -1.1, Es = -0, Ap = !1, Ep = !1, Rm = null, _v = 0, zs = 0, Ld = null, Pg = C.S;
    C.S = function(e, t) {
      typeof t == "object" && t !== null && typeof t.then == "function" && O0(e, t), Pg !== null && Pg(e, t);
    };
    var Ds = xt(null), Eu = {
      recordUnsafeLifecycleWarnings: function() {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function() {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    }, Om = [], Mm = [], Um = [], xm = [], Hm = [], Cm = [], Rs = /* @__PURE__ */ new Set();
    Eu.recordUnsafeLifecycleWarnings = function(e, t) {
      Rs.has(e.type) || (typeof t.componentWillMount == "function" && t.componentWillMount.__suppressDeprecationWarning !== !0 && Om.push(e), e.mode & Fl && typeof t.UNSAFE_componentWillMount == "function" && Mm.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Um.push(e), e.mode & Fl && typeof t.UNSAFE_componentWillReceiveProps == "function" && xm.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Hm.push(e), e.mode & Fl && typeof t.UNSAFE_componentWillUpdate == "function" && Cm.push(e));
    }, Eu.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      0 < Om.length && (Om.forEach(function(h) {
        e.add(
          te(h) || "Component"
        ), Rs.add(h.type);
      }), Om = []);
      var t = /* @__PURE__ */ new Set();
      0 < Mm.length && (Mm.forEach(function(h) {
        t.add(
          te(h) || "Component"
        ), Rs.add(h.type);
      }), Mm = []);
      var a = /* @__PURE__ */ new Set();
      0 < Um.length && (Um.forEach(function(h) {
        a.add(
          te(h) || "Component"
        ), Rs.add(h.type);
      }), Um = []);
      var i = /* @__PURE__ */ new Set();
      0 < xm.length && (xm.forEach(
        function(h) {
          i.add(
            te(h) || "Component"
          ), Rs.add(h.type);
        }
      ), xm = []);
      var o = /* @__PURE__ */ new Set();
      0 < Hm.length && (Hm.forEach(function(h) {
        o.add(
          te(h) || "Component"
        ), Rs.add(h.type);
      }), Hm = []);
      var f = /* @__PURE__ */ new Set();
      if (0 < Cm.length && (Cm.forEach(function(h) {
        f.add(
          te(h) || "Component"
        ), Rs.add(h.type);
      }), Cm = []), 0 < t.size) {
        var d = pe(
          t
        );
        console.error(
          `Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,
          d
        );
      }
      0 < i.size && (d = pe(
        i
      ), console.error(
        `Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,
        d
      )), 0 < f.size && (d = pe(
        f
      ), console.error(
        `Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,
        d
      )), 0 < e.size && (d = pe(e), console.warn(
        `componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < a.size && (d = pe(
        a
      ), console.warn(
        `componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < o.size && (d = pe(o), console.warn(
        `componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      ));
    };
    var zp = /* @__PURE__ */ new Map(), e1 = /* @__PURE__ */ new Set();
    Eu.recordLegacyContextWarning = function(e, t) {
      for (var a = null, i = e; i !== null; )
        i.mode & Fl && (a = i), i = i.return;
      a === null ? console.error(
        "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
      ) : !e1.has(e.type) && (i = zp.get(a), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], zp.set(a, i)), i.push(e));
    }, Eu.flushLegacyContextWarning = function() {
      zp.forEach(function(e) {
        if (e.length !== 0) {
          var t = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(o) {
            a.add(te(o) || "Component"), e1.add(o.type);
          });
          var i = pe(a);
          k(t, function() {
            console.error(
              `Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://react.dev/link/legacy-context`,
              i
            );
          });
        }
      });
    }, Eu.discardPendingWarnings = function() {
      Om = [], Mm = [], Um = [], xm = [], Hm = [], Cm = [], zp = /* @__PURE__ */ new Map();
    };
    var Nm = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    ), t1 = Error(
      "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), Dp = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."
    ), Xv = {
      then: function() {
        console.error(
          'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
        );
      }
    }, Bm = null, Rp = !1, Qn = 0, jn = 1, da = 2, Nl = 4, sl = 8, l1 = 0, a1 = 1, n1 = 2, Qv = 3, Yo = !1, u1 = !1, jv = null, wv = !1, Jd = xt(null), Op = xt(0), Kd, i1 = /* @__PURE__ */ new Set(), c1 = /* @__PURE__ */ new Set(), Zv = /* @__PURE__ */ new Set(), o1 = /* @__PURE__ */ new Set(), Go = 0, ye = null, nt = null, It = null, Mp = !1, $d = !1, Os = !1, Up = 0, qm = 0, Ac = null, bS = 0, SS = 25, N = null, wn = null, Ec = -1, Ym = !1, xp = {
      readContext: it,
      use: dn,
      useCallback: pt,
      useContext: pt,
      useEffect: pt,
      useImperativeHandle: pt,
      useLayoutEffect: pt,
      useInsertionEffect: pt,
      useMemo: pt,
      useReducer: pt,
      useRef: pt,
      useState: pt,
      useDebugValue: pt,
      useDeferredValue: pt,
      useTransition: pt,
      useSyncExternalStore: pt,
      useId: pt,
      useHostTransitionStatus: pt,
      useFormState: pt,
      useActionState: pt,
      useOptimistic: pt,
      useMemoCache: pt,
      useCacheRefresh: pt
    }, Lv = null, f1 = null, Jv = null, s1 = null, gi = null, zu = null, Hp = null;
    Lv = {
      readContext: function(e) {
        return it(e);
      },
      use: dn,
      useCallback: function(e, t) {
        return N = "useCallback", De(), ba(t), Of(e, t);
      },
      useContext: function(e) {
        return N = "useContext", De(), it(e);
      },
      useEffect: function(e, t) {
        return N = "useEffect", De(), ba(t), hr(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return N = "useImperativeHandle", De(), ba(a), mr(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        N = "useInsertionEffect", De(), ba(t), Ea(4, da, e, t);
      },
      useLayoutEffect: function(e, t) {
        return N = "useLayoutEffect", De(), ba(t), yr(e, t);
      },
      useMemo: function(e, t) {
        N = "useMemo", De(), ba(t);
        var a = C.H;
        C.H = gi;
        try {
          return pr(e, t);
        } finally {
          C.H = a;
        }
      },
      useReducer: function(e, t, a) {
        N = "useReducer", De();
        var i = C.H;
        C.H = gi;
        try {
          return _e(e, t, a);
        } finally {
          C.H = i;
        }
      },
      useRef: function(e) {
        return N = "useRef", De(), Rf(e);
      },
      useState: function(e) {
        N = "useState", De();
        var t = C.H;
        C.H = gi;
        try {
          return nu(e);
        } finally {
          C.H = t;
        }
      },
      useDebugValue: function() {
        N = "useDebugValue", De();
      },
      useDeferredValue: function(e, t) {
        return N = "useDeferredValue", De(), vr(e, t);
      },
      useTransition: function() {
        return N = "useTransition", De(), pn();
      },
      useSyncExternalStore: function(e, t, a) {
        return N = "useSyncExternalStore", De(), au(
          e,
          t,
          a
        );
      },
      useId: function() {
        return N = "useId", De(), vn();
      },
      useFormState: function(e, t) {
        return N = "useFormState", De(), Jc(), Ic(e, t);
      },
      useActionState: function(e, t) {
        return N = "useActionState", De(), Ic(e, t);
      },
      useOptimistic: function(e) {
        return N = "useOptimistic", De(), La(e);
      },
      useHostTransitionStatus: Ql,
      useMemoCache: Ot,
      useCacheRefresh: function() {
        return N = "useCacheRefresh", De(), Ki();
      }
    }, f1 = {
      readContext: function(e) {
        return it(e);
      },
      use: dn,
      useCallback: function(e, t) {
        return N = "useCallback", j(), Of(e, t);
      },
      useContext: function(e) {
        return N = "useContext", j(), it(e);
      },
      useEffect: function(e, t) {
        return N = "useEffect", j(), hr(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return N = "useImperativeHandle", j(), mr(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        N = "useInsertionEffect", j(), Ea(4, da, e, t);
      },
      useLayoutEffect: function(e, t) {
        return N = "useLayoutEffect", j(), yr(e, t);
      },
      useMemo: function(e, t) {
        N = "useMemo", j();
        var a = C.H;
        C.H = gi;
        try {
          return pr(e, t);
        } finally {
          C.H = a;
        }
      },
      useReducer: function(e, t, a) {
        N = "useReducer", j();
        var i = C.H;
        C.H = gi;
        try {
          return _e(e, t, a);
        } finally {
          C.H = i;
        }
      },
      useRef: function(e) {
        return N = "useRef", j(), Rf(e);
      },
      useState: function(e) {
        N = "useState", j();
        var t = C.H;
        C.H = gi;
        try {
          return nu(e);
        } finally {
          C.H = t;
        }
      },
      useDebugValue: function() {
        N = "useDebugValue", j();
      },
      useDeferredValue: function(e, t) {
        return N = "useDeferredValue", j(), vr(e, t);
      },
      useTransition: function() {
        return N = "useTransition", j(), pn();
      },
      useSyncExternalStore: function(e, t, a) {
        return N = "useSyncExternalStore", j(), au(
          e,
          t,
          a
        );
      },
      useId: function() {
        return N = "useId", j(), vn();
      },
      useActionState: function(e, t) {
        return N = "useActionState", j(), Ic(e, t);
      },
      useFormState: function(e, t) {
        return N = "useFormState", j(), Jc(), Ic(e, t);
      },
      useOptimistic: function(e) {
        return N = "useOptimistic", j(), La(e);
      },
      useHostTransitionStatus: Ql,
      useMemoCache: Ot,
      useCacheRefresh: function() {
        return N = "useCacheRefresh", j(), Ki();
      }
    }, Jv = {
      readContext: function(e) {
        return it(e);
      },
      use: dn,
      useCallback: function(e, t) {
        return N = "useCallback", j(), Li(e, t);
      },
      useContext: function(e) {
        return N = "useContext", j(), it(e);
      },
      useEffect: function(e, t) {
        N = "useEffect", j(), Xt(2048, sl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return N = "useImperativeHandle", j(), mn(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return N = "useInsertionEffect", j(), Xt(4, da, e, t);
      },
      useLayoutEffect: function(e, t) {
        return N = "useLayoutEffect", j(), Xt(4, Nl, e, t);
      },
      useMemo: function(e, t) {
        N = "useMemo", j();
        var a = C.H;
        C.H = zu;
        try {
          return ku(e, t);
        } finally {
          C.H = a;
        }
      },
      useReducer: function(e, t, a) {
        N = "useReducer", j();
        var i = C.H;
        C.H = zu;
        try {
          return Ta(e, t, a);
        } finally {
          C.H = i;
        }
      },
      useRef: function() {
        return N = "useRef", j(), Be().memoizedState;
      },
      useState: function() {
        N = "useState", j();
        var e = C.H;
        C.H = zu;
        try {
          return Ta(Xe);
        } finally {
          C.H = e;
        }
      },
      useDebugValue: function() {
        N = "useDebugValue", j();
      },
      useDeferredValue: function(e, t) {
        return N = "useDeferredValue", j(), Mf(e, t);
      },
      useTransition: function() {
        return N = "useTransition", j(), Sr();
      },
      useSyncExternalStore: function(e, t, a) {
        return N = "useSyncExternalStore", j(), Af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return N = "useId", j(), Be().memoizedState;
      },
      useFormState: function(e) {
        return N = "useFormState", j(), Jc(), dr(e);
      },
      useActionState: function(e) {
        return N = "useActionState", j(), dr(e);
      },
      useOptimistic: function(e, t) {
        return N = "useOptimistic", j(), uu(e, t);
      },
      useHostTransitionStatus: Ql,
      useMemoCache: Ot,
      useCacheRefresh: function() {
        return N = "useCacheRefresh", j(), Be().memoizedState;
      }
    }, s1 = {
      readContext: function(e) {
        return it(e);
      },
      use: dn,
      useCallback: function(e, t) {
        return N = "useCallback", j(), Li(e, t);
      },
      useContext: function(e) {
        return N = "useContext", j(), it(e);
      },
      useEffect: function(e, t) {
        N = "useEffect", j(), Xt(2048, sl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return N = "useImperativeHandle", j(), mn(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return N = "useInsertionEffect", j(), Xt(4, da, e, t);
      },
      useLayoutEffect: function(e, t) {
        return N = "useLayoutEffect", j(), Xt(4, Nl, e, t);
      },
      useMemo: function(e, t) {
        N = "useMemo", j();
        var a = C.H;
        C.H = Hp;
        try {
          return ku(e, t);
        } finally {
          C.H = a;
        }
      },
      useReducer: function(e, t, a) {
        N = "useReducer", j();
        var i = C.H;
        C.H = Hp;
        try {
          return Zi(e, t, a);
        } finally {
          C.H = i;
        }
      },
      useRef: function() {
        return N = "useRef", j(), Be().memoizedState;
      },
      useState: function() {
        N = "useState", j();
        var e = C.H;
        C.H = Hp;
        try {
          return Zi(Xe);
        } finally {
          C.H = e;
        }
      },
      useDebugValue: function() {
        N = "useDebugValue", j();
      },
      useDeferredValue: function(e, t) {
        return N = "useDeferredValue", j(), gr(e, t);
      },
      useTransition: function() {
        return N = "useTransition", j(), Tr();
      },
      useSyncExternalStore: function(e, t, a) {
        return N = "useSyncExternalStore", j(), Af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return N = "useId", j(), Be().memoizedState;
      },
      useFormState: function(e) {
        return N = "useFormState", j(), Jc(), Pc(e);
      },
      useActionState: function(e) {
        return N = "useActionState", j(), Pc(e);
      },
      useOptimistic: function(e, t) {
        return N = "useOptimistic", j(), rr(e, t);
      },
      useHostTransitionStatus: Ql,
      useMemoCache: Ot,
      useCacheRefresh: function() {
        return N = "useCacheRefresh", j(), Be().memoizedState;
      }
    }, gi = {
      readContext: function(e) {
        return ut(), it(e);
      },
      use: function(e) {
        return w(), dn(e);
      },
      useCallback: function(e, t) {
        return N = "useCallback", w(), De(), Of(e, t);
      },
      useContext: function(e) {
        return N = "useContext", w(), De(), it(e);
      },
      useEffect: function(e, t) {
        return N = "useEffect", w(), De(), hr(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return N = "useImperativeHandle", w(), De(), mr(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        N = "useInsertionEffect", w(), De(), Ea(4, da, e, t);
      },
      useLayoutEffect: function(e, t) {
        return N = "useLayoutEffect", w(), De(), yr(e, t);
      },
      useMemo: function(e, t) {
        N = "useMemo", w(), De();
        var a = C.H;
        C.H = gi;
        try {
          return pr(e, t);
        } finally {
          C.H = a;
        }
      },
      useReducer: function(e, t, a) {
        N = "useReducer", w(), De();
        var i = C.H;
        C.H = gi;
        try {
          return _e(e, t, a);
        } finally {
          C.H = i;
        }
      },
      useRef: function(e) {
        return N = "useRef", w(), De(), Rf(e);
      },
      useState: function(e) {
        N = "useState", w(), De();
        var t = C.H;
        C.H = gi;
        try {
          return nu(e);
        } finally {
          C.H = t;
        }
      },
      useDebugValue: function() {
        N = "useDebugValue", w(), De();
      },
      useDeferredValue: function(e, t) {
        return N = "useDeferredValue", w(), De(), vr(e, t);
      },
      useTransition: function() {
        return N = "useTransition", w(), De(), pn();
      },
      useSyncExternalStore: function(e, t, a) {
        return N = "useSyncExternalStore", w(), De(), au(
          e,
          t,
          a
        );
      },
      useId: function() {
        return N = "useId", w(), De(), vn();
      },
      useFormState: function(e, t) {
        return N = "useFormState", w(), De(), Ic(e, t);
      },
      useActionState: function(e, t) {
        return N = "useActionState", w(), De(), Ic(e, t);
      },
      useOptimistic: function(e) {
        return N = "useOptimistic", w(), De(), La(e);
      },
      useMemoCache: function(e) {
        return w(), Ot(e);
      },
      useHostTransitionStatus: Ql,
      useCacheRefresh: function() {
        return N = "useCacheRefresh", De(), Ki();
      }
    }, zu = {
      readContext: function(e) {
        return ut(), it(e);
      },
      use: function(e) {
        return w(), dn(e);
      },
      useCallback: function(e, t) {
        return N = "useCallback", w(), j(), Li(e, t);
      },
      useContext: function(e) {
        return N = "useContext", w(), j(), it(e);
      },
      useEffect: function(e, t) {
        N = "useEffect", w(), j(), Xt(2048, sl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return N = "useImperativeHandle", w(), j(), mn(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return N = "useInsertionEffect", w(), j(), Xt(4, da, e, t);
      },
      useLayoutEffect: function(e, t) {
        return N = "useLayoutEffect", w(), j(), Xt(4, Nl, e, t);
      },
      useMemo: function(e, t) {
        N = "useMemo", w(), j();
        var a = C.H;
        C.H = zu;
        try {
          return ku(e, t);
        } finally {
          C.H = a;
        }
      },
      useReducer: function(e, t, a) {
        N = "useReducer", w(), j();
        var i = C.H;
        C.H = zu;
        try {
          return Ta(e, t, a);
        } finally {
          C.H = i;
        }
      },
      useRef: function() {
        return N = "useRef", w(), j(), Be().memoizedState;
      },
      useState: function() {
        N = "useState", w(), j();
        var e = C.H;
        C.H = zu;
        try {
          return Ta(Xe);
        } finally {
          C.H = e;
        }
      },
      useDebugValue: function() {
        N = "useDebugValue", w(), j();
      },
      useDeferredValue: function(e, t) {
        return N = "useDeferredValue", w(), j(), Mf(e, t);
      },
      useTransition: function() {
        return N = "useTransition", w(), j(), Sr();
      },
      useSyncExternalStore: function(e, t, a) {
        return N = "useSyncExternalStore", w(), j(), Af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return N = "useId", w(), j(), Be().memoizedState;
      },
      useFormState: function(e) {
        return N = "useFormState", w(), j(), dr(e);
      },
      useActionState: function(e) {
        return N = "useActionState", w(), j(), dr(e);
      },
      useOptimistic: function(e, t) {
        return N = "useOptimistic", w(), j(), uu(e, t);
      },
      useMemoCache: function(e) {
        return w(), Ot(e);
      },
      useHostTransitionStatus: Ql,
      useCacheRefresh: function() {
        return N = "useCacheRefresh", j(), Be().memoizedState;
      }
    }, Hp = {
      readContext: function(e) {
        return ut(), it(e);
      },
      use: function(e) {
        return w(), dn(e);
      },
      useCallback: function(e, t) {
        return N = "useCallback", w(), j(), Li(e, t);
      },
      useContext: function(e) {
        return N = "useContext", w(), j(), it(e);
      },
      useEffect: function(e, t) {
        N = "useEffect", w(), j(), Xt(2048, sl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return N = "useImperativeHandle", w(), j(), mn(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return N = "useInsertionEffect", w(), j(), Xt(4, da, e, t);
      },
      useLayoutEffect: function(e, t) {
        return N = "useLayoutEffect", w(), j(), Xt(4, Nl, e, t);
      },
      useMemo: function(e, t) {
        N = "useMemo", w(), j();
        var a = C.H;
        C.H = zu;
        try {
          return ku(e, t);
        } finally {
          C.H = a;
        }
      },
      useReducer: function(e, t, a) {
        N = "useReducer", w(), j();
        var i = C.H;
        C.H = zu;
        try {
          return Zi(e, t, a);
        } finally {
          C.H = i;
        }
      },
      useRef: function() {
        return N = "useRef", w(), j(), Be().memoizedState;
      },
      useState: function() {
        N = "useState", w(), j();
        var e = C.H;
        C.H = zu;
        try {
          return Zi(Xe);
        } finally {
          C.H = e;
        }
      },
      useDebugValue: function() {
        N = "useDebugValue", w(), j();
      },
      useDeferredValue: function(e, t) {
        return N = "useDeferredValue", w(), j(), gr(e, t);
      },
      useTransition: function() {
        return N = "useTransition", w(), j(), Tr();
      },
      useSyncExternalStore: function(e, t, a) {
        return N = "useSyncExternalStore", w(), j(), Af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return N = "useId", w(), j(), Be().memoizedState;
      },
      useFormState: function(e) {
        return N = "useFormState", w(), j(), Pc(e);
      },
      useActionState: function(e) {
        return N = "useActionState", w(), j(), Pc(e);
      },
      useOptimistic: function(e, t) {
        return N = "useOptimistic", w(), j(), rr(e, t);
      },
      useMemoCache: function(e) {
        return w(), Ot(e);
      },
      useHostTransitionStatus: Ql,
      useCacheRefresh: function() {
        return N = "useCacheRefresh", j(), Be().memoizedState;
      }
    };
    var r1 = {
      "react-stack-bottom-frame": function(e, t, a) {
        var i = Wl;
        Wl = !0;
        try {
          return e(t, a);
        } finally {
          Wl = i;
        }
      }
    }, Kv = r1["react-stack-bottom-frame"].bind(r1), d1 = {
      "react-stack-bottom-frame": function(e) {
        var t = Wl;
        Wl = !0;
        try {
          return e.render();
        } finally {
          Wl = t;
        }
      }
    }, h1 = d1["react-stack-bottom-frame"].bind(d1), y1 = {
      "react-stack-bottom-frame": function(e, t) {
        try {
          t.componentDidMount();
        } catch (a) {
          ue(e, e.return, a);
        }
      }
    }, $v = y1["react-stack-bottom-frame"].bind(y1), m1 = {
      "react-stack-bottom-frame": function(e, t, a, i, o) {
        try {
          t.componentDidUpdate(a, i, o);
        } catch (f) {
          ue(e, e.return, f);
        }
      }
    }, p1 = m1["react-stack-bottom-frame"].bind(m1), v1 = {
      "react-stack-bottom-frame": function(e, t) {
        var a = t.stack;
        e.componentDidCatch(t.value, {
          componentStack: a !== null ? a : ""
        });
      }
    }, TS = v1["react-stack-bottom-frame"].bind(v1), g1 = {
      "react-stack-bottom-frame": function(e, t, a) {
        try {
          a.componentWillUnmount();
        } catch (i) {
          ue(e, t, i);
        }
      }
    }, b1 = g1["react-stack-bottom-frame"].bind(g1), S1 = {
      "react-stack-bottom-frame": function(e) {
        e.resourceKind != null && console.error(
          "Expected only SimpleEffects when enableUseEffectCRUDOverload is disabled, got %s",
          e.resourceKind
        );
        var t = e.create;
        return e = e.inst, t = t(), e.destroy = t;
      }
    }, AS = S1["react-stack-bottom-frame"].bind(S1), T1 = {
      "react-stack-bottom-frame": function(e, t, a) {
        try {
          a();
        } catch (i) {
          ue(e, t, i);
        }
      }
    }, ES = T1["react-stack-bottom-frame"].bind(T1), A1 = {
      "react-stack-bottom-frame": function(e) {
        var t = e._init;
        return t(e._payload);
      }
    }, Vo = A1["react-stack-bottom-frame"].bind(A1), kd = null, Gm = 0, Oe = null, kv, E1 = kv = !1, z1 = {}, D1 = {}, R1 = {};
    Bt = function(e, t, a) {
      if (a !== null && typeof a == "object" && a._store && (!a._store.validated && a.key == null || a._store.validated === 2)) {
        if (typeof a._store != "object")
          throw Error(
            "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
          );
        a._store.validated = 1;
        var i = te(e), o = i || "null";
        if (!z1[o]) {
          z1[o] = !0, a = a._owner, e = e._debugOwner;
          var f = "";
          e && typeof e.tag == "number" && (o = te(e)) && (f = `

Check the render method of \`` + o + "`."), f || i && (f = `

Check the top-level render call using <` + i + ">.");
          var d = "";
          a != null && e !== a && (i = null, typeof a.tag == "number" ? i = te(a) : typeof a.name == "string" && (i = a.name), i && (d = " It was passed a child from " + i + ".")), k(t, function() {
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              f,
              d
            );
          });
        }
      }
    };
    var Wd = Cf(!0), O1 = Cf(!1), Zn = xt(null), bi = null, Fd = 1, Vm = 2, rl = xt(0), M1 = {}, U1 = /* @__PURE__ */ new Set(), x1 = /* @__PURE__ */ new Set(), H1 = /* @__PURE__ */ new Set(), C1 = /* @__PURE__ */ new Set(), N1 = /* @__PURE__ */ new Set(), B1 = /* @__PURE__ */ new Set(), q1 = /* @__PURE__ */ new Set(), Y1 = /* @__PURE__ */ new Set(), G1 = /* @__PURE__ */ new Set(), V1 = /* @__PURE__ */ new Set();
    Object.freeze(M1);
    var Wv = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var i = Zl(e), o = sn(i);
        o.payload = t, a != null && (ey(a), o.callback = a), t = ja(e, o, i), t !== null && (Tt(t, e, i), Zu(t, e, i)), Ti(e, i);
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var i = Zl(e), o = sn(i);
        o.tag = a1, o.payload = t, a != null && (ey(a), o.callback = a), t = ja(e, o, i), t !== null && (Tt(t, e, i), Zu(t, e, i)), Ti(e, i);
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = Zl(e), i = sn(a);
        i.tag = n1, t != null && (ey(t), i.callback = t), t = ja(e, i, a), t !== null && (Tt(t, e, a), Zu(t, e, a)), K !== null && typeof K.markForceUpdateScheduled == "function" && K.markForceUpdateScheduled(e, a);
      }
    }, Fv = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    }, Id = null, Iv = null, _1 = Error(
      "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
    ), Sl = !1, X1 = {}, Q1 = {}, j1 = {}, w1 = {}, Pd = !1, Z1 = {}, Pv = {}, eg = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    }, L1 = !1, J1 = null;
    J1 = /* @__PURE__ */ new Set();
    var zc = !1, wt = !1, tg = !1, K1 = typeof WeakSet == "function" ? WeakSet : Set, Tl = null, eh = null, th = null, Pt = null, Na = !1, Du = null, _m = 8192, zS = {
      getCacheForType: function(e) {
        var t = it(fl), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      getOwner: function() {
        return fa;
      }
    };
    if (typeof Symbol == "function" && Symbol.for) {
      var Xm = Symbol.for;
      Xm("selector.component"), Xm("selector.has_pseudo_class"), Xm("selector.role"), Xm("selector.test_id"), Xm("selector.text");
    }
    var DS = [], RS = typeof WeakMap == "function" ? WeakMap : Map, Ia = 0, ha = 2, Ru = 4, Dc = 0, Qm = 1, lh = 2, lg = 3, Ms = 4, Cp = 6, $1 = 5, Ie = Ia, ct = null, He = null, Ne = 0, Ba = 0, jm = 1, Us = 2, wm = 3, k1 = 4, ag = 5, ah = 6, Zm = 7, ng = 8, xs = 9, tt = Ba, Pa = null, _o = !1, nh = !1, ug = !1, Si = 0, Nt = Dc, Xo = 0, Qo = 0, ig = 0, en = 0, Hs = 0, Lm = null, ya = null, Np = !1, cg = 0, W1 = 300, Bp = 1 / 0, F1 = 500, Jm = null, jo = null, OS = 0, MS = 1, US = 2, Cs = 0, I1 = 1, P1 = 2, eb = 3, xS = 4, og = 5, Bl = 0, wo = null, uh = null, Zo = 0, fg = 0, sg = null, tb = null, HS = 50, Km = 0, rg = null, dg = !1, qp = !1, CS = 50, Ns = 0, $m = null, ih = !1, Yp = null, lb = !1, ab = /* @__PURE__ */ new Set(), NS = {}, Gp = null, ch = null, hg = !1, yg = !1, Vp = !1, mg = !1, Bs = 0, pg = {};
    (function() {
      for (var e = 0; e < Nv.length; e++) {
        var t = Nv[e], a = t.toLowerCase();
        t = t[0].toUpperCase() + t.slice(1), Ga(a, "on" + t);
      }
      Ga(Qg, "onAnimationEnd"), Ga(jg, "onAnimationIteration"), Ga(wg, "onAnimationStart"), Ga("dblclick", "onDoubleClick"), Ga("focusin", "onFocus"), Ga("focusout", "onBlur"), Ga(sS, "onTransitionRun"), Ga(rS, "onTransitionStart"), Ga(dS, "onTransitionCancel"), Ga(Zg, "onTransitionEnd");
    })(), Ei("onMouseEnter", ["mouseout", "mouseover"]), Ei("onMouseLeave", ["mouseout", "mouseover"]), Ei("onPointerEnter", ["pointerout", "pointerover"]), Ei("onPointerLeave", ["pointerout", "pointerover"]), xu(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ), xu(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ), xu("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), xu(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ), xu(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ), xu(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var km = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), vg = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(km)
    ), _p = "_reactListening" + Math.random().toString(36).slice(2), nb = !1, ub = !1, Xp = !1, ib = !1, Qp = !1, jp = !1, cb = !1, wp = {}, BS = /\r\n?/g, qS = /\u0000|\uFFFD/g, qs = "http://www.w3.org/1999/xlink", gg = "http://www.w3.org/XML/1998/namespace", YS = "javascript:throw new Error('React form unexpectedly submitted.')", GS = "suppressHydrationWarning", Zp = "$", Lp = "/$", Rc = "$?", Wm = "$!", VS = 1, _S = 2, XS = 4, bg = "F!", ob = "F", fb = "complete", QS = "style", Oc = 0, oh = 1, Jp = 2, Sg = null, Tg = null, sb = { dialog: !0, webview: !0 }, Ag = null, rb = typeof setTimeout == "function" ? setTimeout : void 0, jS = typeof clearTimeout == "function" ? clearTimeout : void 0, Ys = -1, db = typeof Promise == "function" ? Promise : void 0, wS = typeof queueMicrotask == "function" ? queueMicrotask : typeof db < "u" ? function(e) {
      return db.resolve(null).then(e).catch(Xy);
    } : rb, Eg = null, Gs = 0, Fm = 1, hb = 2, yb = 3, Ln = 4, Jn = /* @__PURE__ */ new Map(), mb = /* @__PURE__ */ new Set(), Mc = se.d;
    se.d = {
      f: function() {
        var e = Mc.f(), t = ac();
        return e || t;
      },
      r: function(e) {
        var t = Pl(e);
        t !== null && t.tag === 5 && t.type === "form" ? Fh(t) : Mc.r(e);
      },
      D: function(e) {
        Mc.D(e), k0("dns-prefetch", e, null);
      },
      C: function(e, t) {
        Mc.C(e, t), k0("preconnect", e, t);
      },
      L: function(e, t, a) {
        Mc.L(e, t, a);
        var i = fh;
        if (i && e && t) {
          var o = 'link[rel="preload"][as="' + ea(t) + '"]';
          t === "image" && a && a.imageSrcSet ? (o += '[imagesrcset="' + ea(
            a.imageSrcSet
          ) + '"]', typeof a.imageSizes == "string" && (o += '[imagesizes="' + ea(
            a.imageSizes
          ) + '"]')) : o += '[href="' + ea(e) + '"]';
          var f = o;
          switch (t) {
            case "style":
              f = ui(e);
              break;
            case "script":
              f = sc(e);
          }
          Jn.has(f) || (e = Ee(
            {
              rel: "preload",
              href: t === "image" && a && a.imageSrcSet ? void 0 : e,
              as: t
            },
            a
          ), Jn.set(f, e), i.querySelector(o) !== null || t === "style" && i.querySelector(
            Hn(f)
          ) || t === "script" && i.querySelector(rc(f)) || (t = i.createElement("link"), Et(t, "link", e), Lt(t), i.head.appendChild(t)));
        }
      },
      m: function(e, t) {
        Mc.m(e, t);
        var a = fh;
        if (a && e) {
          var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + ea(i) + '"][href="' + ea(e) + '"]', f = o;
          switch (i) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              f = sc(e);
          }
          if (!Jn.has(f) && (e = Ee({ rel: "modulepreload", href: e }, t), Jn.set(f, e), a.querySelector(o) === null)) {
            switch (i) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (a.querySelector(rc(f)))
                  return;
            }
            i = a.createElement("link"), Et(i, "link", e), Lt(i), a.head.appendChild(i);
          }
        }
      },
      X: function(e, t) {
        Mc.X(e, t);
        var a = fh;
        if (a && e) {
          var i = ln(a).hoistableScripts, o = sc(e), f = i.get(o);
          f || (f = a.querySelector(
            rc(o)
          ), f || (e = Ee({ src: e, async: !0 }, t), (t = Jn.get(o)) && $y(e, t), f = a.createElement("script"), Lt(f), Et(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      },
      S: function(e, t, a) {
        Mc.S(e, t, a);
        var i = fh;
        if (i && e) {
          var o = ln(i).hoistableStyles, f = ui(e);
          t = t || "default";
          var d = o.get(f);
          if (!d) {
            var h = { loading: Gs, preload: null };
            if (d = i.querySelector(
              Hn(f)
            ))
              h.loading = Fm | Ln;
            else {
              e = Ee(
                {
                  rel: "stylesheet",
                  href: e,
                  "data-precedence": t
                },
                a
              ), (a = Jn.get(f)) && Ky(e, a);
              var p = d = i.createElement("link");
              Lt(p), Et(p, "link", e), p._p = new Promise(function(v, x) {
                p.onload = v, p.onerror = x;
              }), p.addEventListener("load", function() {
                h.loading |= Fm;
              }), p.addEventListener("error", function() {
                h.loading |= hb;
              }), h.loading |= Ln, dd(d, t, i);
            }
            d = {
              type: "stylesheet",
              instance: d,
              count: 1,
              state: h
            }, o.set(f, d);
          }
        }
      },
      M: function(e, t) {
        Mc.M(e, t);
        var a = fh;
        if (a && e) {
          var i = ln(a).hoistableScripts, o = sc(e), f = i.get(o);
          f || (f = a.querySelector(
            rc(o)
          ), f || (e = Ee({ src: e, async: !0, type: "module" }, t), (t = Jn.get(o)) && $y(e, t), f = a.createElement("script"), Lt(f), Et(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      }
    };
    var fh = typeof document > "u" ? null : document, Kp = null, Im = null, zg = null, $p = null, Vs = Av, Pm = {
      $$typeof: Ua,
      Provider: null,
      Consumer: null,
      _currentValue: Vs,
      _currentValue2: Vs,
      _threadCount: 0
    }, pb = "%c%s%c ", vb = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", gb = "", kp = " ", ZS = Function.prototype.bind, bb = !1, Sb = null, Tb = null, Ab = null, Eb = null, zb = null, Db = null, Rb = null, Ob = null, Mb = null;
    Sb = function(e, t, a, i) {
      t = q(e, t), t !== null && (a = J(t.memoizedState, a, 0, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = Ee({}, e.memoizedProps), a = Gl(e, 2), a !== null && Tt(a, e, 2));
    }, Tb = function(e, t, a) {
      t = q(e, t), t !== null && (a = de(t.memoizedState, a, 0), t.memoizedState = a, t.baseState = a, e.memoizedProps = Ee({}, e.memoizedProps), a = Gl(e, 2), a !== null && Tt(a, e, 2));
    }, Ab = function(e, t, a, i) {
      t = q(e, t), t !== null && (a = ce(t.memoizedState, a, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = Ee({}, e.memoizedProps), a = Gl(e, 2), a !== null && Tt(a, e, 2));
    }, Eb = function(e, t, a) {
      e.pendingProps = J(e.memoizedProps, t, 0, a), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Gl(e, 2), t !== null && Tt(t, e, 2);
    }, zb = function(e, t) {
      e.pendingProps = de(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Gl(e, 2), t !== null && Tt(t, e, 2);
    }, Db = function(e, t, a) {
      e.pendingProps = ce(
        e.memoizedProps,
        t,
        a
      ), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Gl(e, 2), t !== null && Tt(t, e, 2);
    }, Rb = function(e) {
      var t = Gl(e, 2);
      t !== null && Tt(t, e, 2);
    }, Ob = function(e) {
      yt = e;
    }, Mb = function(e) {
      ke = e;
    };
    var Wp = !0, Fp = null, Dg = !1, Lo = null, Jo = null, Ko = null, e0 = /* @__PURE__ */ new Map(), t0 = /* @__PURE__ */ new Map(), $o = [], LS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    ), Ip = null;
    if (us.prototype.render = gd.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error("Cannot update an unmounted root.");
      var a = arguments;
      typeof a[1] == "function" ? console.error(
        "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ) : Ve(a[1]) ? console.error(
        "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
      ) : typeof a[1] < "u" && console.error(
        "You passed a second argument to root.render(...) but it only accepts one argument."
      ), a = e;
      var i = t.current, o = Zl(i);
      Fe(i, o, a, t, null, null);
    }, us.prototype.unmount = gd.prototype.unmount = function() {
      var e = arguments;
      if (typeof e[0] == "function" && console.error(
        "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ), e = this._internalRoot, e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (Ie & (ha | Ru)) !== Ia && console.error(
          "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
        ), Fe(e.current, 2, null, e, null, null), ac(), t[hi] = null;
      }
    }, us.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = i0();
        e = { blockedOn: null, target: e, priority: t };
        for (var a = 0; a < $o.length && t !== 0 && t < $o[a].priority; a++) ;
        $o.splice(a, 0, e), a === 0 && tp(e);
      }
    }, function() {
      var e = is.version;
      if (e !== "19.1.0")
        throw Error(
          `Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (e + `
  - react-dom:  19.1.0
Learn more: https://react.dev/warnings/version-mismatch`)
        );
    }(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
    ), se.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error(
          "Argument appears to not be a ReactComponent. Keys: " + e
        ));
      return e = ql(t), e = e !== null ? ma(e) : null, e = e === null ? null : e.stateNode, e;
    }, !function() {
      var e = {
        bundleType: 1,
        version: "19.1.0",
        rendererPackageName: "react-dom",
        currentDispatcherRef: C,
        reconcilerVersion: "19.1.0"
      };
      return e.overrideHookState = Sb, e.overrideHookStateDeletePath = Tb, e.overrideHookStateRenamePath = Ab, e.overrideProps = Eb, e.overridePropsDeletePath = zb, e.overridePropsRenamePath = Db, e.scheduleUpdate = Rb, e.setErrorHandler = Ob, e.setSuspenseHandler = Mb, e.scheduleRefresh = me, e.scheduleRoot = Te, e.setRefreshHandler = qt, e.getCurrentFiber = gv, e.getLaneLabelMap = bv, e.injectProfilingHooks = Xs, El(e);
    }() && g && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
      var Ub = window.location.protocol;
      /^(https?|file):$/.test(Ub) && console.info(
        "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (Ub === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq` : ""),
        "font-weight:bold"
      );
    }
    a0.createRoot = function(e, t) {
      if (!Ve(e))
        throw Error("Target container is not a DOM element.");
      np(e);
      var a = !1, i = "", o = ty, f = N0, d = Dr, h = null;
      return t != null && (t.hydrate ? console.warn(
        "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
      ) : typeof t == "object" && t !== null && t.$$typeof === oi && console.error(
        `You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`
      ), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (h = t.unstable_transitionCallbacks)), t = Fy(
        e,
        1,
        !1,
        null,
        null,
        a,
        i,
        o,
        f,
        d,
        h,
        null
      ), e[hi] = t.current, Ny(e), new gd(t);
    }, a0.hydrateRoot = function(e, t, a) {
      if (!Ve(e))
        throw Error("Target container is not a DOM element.");
      np(e), t === void 0 && console.error(
        "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
      );
      var i = !1, o = "", f = ty, d = N0, h = Dr, p = null, v = null;
      return a != null && (a.unstable_strictMode === !0 && (i = !0), a.identifierPrefix !== void 0 && (o = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (d = a.onCaughtError), a.onRecoverableError !== void 0 && (h = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (p = a.unstable_transitionCallbacks), a.formState !== void 0 && (v = a.formState)), t = Fy(
        e,
        1,
        !0,
        t,
        a ?? null,
        i,
        o,
        f,
        d,
        h,
        p,
        v
      ), t.context = Iy(null), a = t.current, i = Zl(a), i = zl(i), o = sn(i), o.callback = null, ja(a, o, i), a = i, t.current.lanes = a, Hc(t, a), Ra(t), e[hi] = t.current, Ny(e), new us(t);
    }, a0.version = "19.1.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), a0;
}
function _b() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_b);
    } catch (q) {
      console.error(q);
    }
  }
}
process.env.NODE_ENV === "production" ? (_b(), Hg.exports = WS()) : Hg.exports = FS();
var IS = Hg.exports, PS = Object.defineProperty, e2 = (q, J, ce) => J in q ? PS(q, J, { enumerable: !0, configurable: !0, writable: !0, value: ce }) : q[J] = ce, ev = (q, J, ce) => e2(q, typeof J != "symbol" ? J + "" : J, ce);
const t2 = {
  stringify: (q) => q ? "true" : "false",
  parse: (q) => /^[ty1-9]/i.test(q)
}, l2 = {
  stringify: (q) => q.name,
  parse: (q, J, ce) => {
    const U = (() => {
      if (typeof window < "u" && q in window)
        return window[q];
      if (typeof global < "u" && q in global)
        return global[q];
    })();
    return typeof U == "function" ? U.bind(ce) : void 0;
  }
}, a2 = {
  stringify: (q) => JSON.stringify(q),
  parse: (q) => JSON.parse(q)
}, n2 = {
  stringify: (q) => `${q}`,
  parse: (q) => parseFloat(q)
}, u2 = {
  stringify: (q) => q,
  parse: (q) => q
}, Ug = {
  string: u2,
  number: n2,
  boolean: t2,
  function: l2,
  json: a2
};
function i2(q) {
  return q.replace(
    /([a-z0-9])([A-Z])/g,
    (J, ce, U) => `${ce}-${U.toLowerCase()}`
  );
}
const tv = Symbol.for("r2wc.render"), lv = Symbol.for("r2wc.connected"), _s = Symbol.for("r2wc.context"), xc = Symbol.for("r2wc.props");
function c2(q, J, ce) {
  var U, de, ke;
  J.props || (J.props = q.propTypes ? Object.keys(q.propTypes) : []), J.events || (J.events = []);
  const yt = Array.isArray(J.props) ? J.props.slice() : Object.keys(J.props), Bt = Array.isArray(J.events) ? J.events.slice() : Object.keys(J.events), w = {}, ut = {}, ae = {}, pe = {};
  for (const Te of yt) {
    w[Te] = Array.isArray(J.props) ? "string" : J.props[Te];
    const me = i2(Te);
    ae[Te] = me, pe[me] = Te;
  }
  for (const Te of Bt)
    ut[Te] = Array.isArray(J.events) ? {} : J.events[Te];
  class oe extends HTMLElement {
    constructor() {
      super(), ev(this, ke, !0), ev(this, de), ev(this, U, {}), ev(this, "container"), J.shadow ? this.container = this.attachShadow({
        mode: J.shadow
      }) : this.container = this, this[xc].container = this.container;
      for (const me of yt) {
        const qt = ae[me], Ve = this.getAttribute(qt), Ce = w[me], Ut = Ce ? Ug[Ce] : null;
        Ut != null && Ut.parse && Ve && (this[xc][me] = Ut.parse(Ve, qt, this));
      }
      for (const me of Bt)
        this[xc][me] = (qt) => {
          const Ve = me.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(
            new CustomEvent(Ve, { detail: qt, ...ut[me] })
          );
        };
    }
    static get observedAttributes() {
      return Object.keys(pe);
    }
    connectedCallback() {
      this[lv] = !0, this[tv]();
    }
    disconnectedCallback() {
      this[lv] = !1, this[_s] && ce.unmount(this[_s]), delete this[_s];
    }
    attributeChangedCallback(me, qt, Ve) {
      const Ce = pe[me], Ut = w[Ce], mt = Ut ? Ug[Ut] : null;
      Ce in w && mt != null && mt.parse && Ve && (this[xc][Ce] = mt.parse(Ve, me, this), this[tv]());
    }
    [(ke = lv, de = _s, U = xc, tv)]() {
      this[lv] && (this[_s] ? ce.update(this[_s], this[xc]) : this[_s] = ce.mount(
        this.container,
        q,
        this[xc]
      ));
    }
  }
  for (const Te of yt) {
    const me = ae[Te], qt = w[Te];
    Object.defineProperty(oe.prototype, Te, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[xc][Te];
      },
      set(Ve) {
        this[xc][Te] = Ve;
        const Ce = qt ? Ug[qt] : null;
        if (Ce != null && Ce.stringify) {
          const Ut = Ce.stringify(Ve, me, this);
          this.getAttribute(me) !== Ut && this.setAttribute(me, Ut);
        } else
          this[tv]();
      }
    });
  }
  return oe;
}
function o2(q, J, ce) {
  const U = IS.createRoot(q), de = av.createElement(J, ce);
  return U.render(de), {
    root: U,
    ReactComponent: J
  };
}
function f2({ root: q, ReactComponent: J }, ce) {
  const U = av.createElement(J, ce);
  q.render(U);
}
function s2({ root: q }) {
  q.unmount();
}
function r2(q, J = {}) {
  return c2(q, J, { mount: o2, update: f2, unmount: s2 });
}
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d2 = (q) => q.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Xb = (...q) => q.filter((J, ce, U) => !!J && J.trim() !== "" && U.indexOf(J) === ce).join(" ").trim();
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var h2 = {
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
const y2 = Yb(
  ({
    color: q = "currentColor",
    size: J = 24,
    strokeWidth: ce = 2,
    absoluteStrokeWidth: U,
    className: de = "",
    children: ke,
    iconNode: yt,
    ...Bt
  }, w) => xg(
    "svg",
    {
      ref: w,
      ...h2,
      width: J,
      height: J,
      stroke: q,
      strokeWidth: U ? Number(ce) * 24 / Number(J) : ce,
      className: Xb("lucide", de),
      ...Bt
    },
    [
      ...yt.map(([ut, ae]) => xg(ut, ae)),
      ...Array.isArray(ke) ? ke : [ke]
    ]
  )
);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nv = (q, J) => {
  const ce = Yb(
    ({ className: U, ...de }, ke) => xg(y2, {
      ref: ke,
      iconNode: J,
      className: Xb(`lucide-${d2(q)}`, U),
      ...de
    })
  );
  return ce.displayName = `${q}`, ce;
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m2 = nv("CircleArrowUp", [
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
const p2 = nv("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v2 = nv("CreditCard", [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g2 = nv("Utensils", [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
]), Qb = (q) => {
  const J = new Date(q);
  if (isNaN(J.valueOf()))
    throw new Error("Invalid Date");
  return J;
}, b2 = (q) => {
  try {
    const J = Qb(q);
    return [
      J.getFullYear(),
      J.getMonth(),
      J.getDate(),
      J.getHours(),
      J.getMinutes(),
      J.getSeconds(),
      J.getMilliseconds()
    ];
  } catch {
    throw new Error("cannot destruct Date");
  }
}, S2 = (q) => {
  try {
    const J = Qb(q), [ce, U, de] = b2(J), ke = U + 1, yt = ke < 10 ? `0${ke}` : `${ke}`, Bt = de < 10 ? `0${de}` : `${de}`;
    return `${ce}-${yt}-${Bt}`;
  } catch {
    throw new Error("cannot format Date");
  }
}, T2 = ({
  sabreId: q,
  checkIn: J,
  nights: ce = 1,
  numOfPeople: U = "2"
}) => {
  try {
    const de = S2(J);
    return `https://sabre-nodejs-9tia3.ondigitalocean.app/public/hotel/sabre/${q}/select-rooms-price/?check_in=${de}&nights=${ce}&number_of_people=${U}`;
  } catch {
    throw new Error("cannot generate Sabre API Endpoint. Invalid checkIn value is given.");
  }
};
function A2({
  // 외부로부터 주입 받는 값
  checkIn: q,
  numOfPeople: J = "2",
  sabreId: ce,
  nights: U = 1
}) {
  const [de, ke] = Rg(), [yt, Bt] = Rg(!1), [w, ut] = Rg();
  return xb(() => {
    (async () => {
      Bt(!0);
      try {
        const pe = T2({ sabreId: ce, checkIn: q, nights: U, numOfPeople: J }), oe = await fetch(pe, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          mode: "cors"
          // CORS 명시적 설정
        });
        if (!oe.ok)
          throw new Error(`HTTP error! status: ${oe.status}`);
        const Te = await oe.text(), me = JSON.parse(Te);
        ke(me);
      } catch (pe) {
        console.error("Fetch error:", pe), pe instanceof TypeError && pe.message.includes("Failed to fetch") && console.error("CORS error or network issue. Check browser console for details."), ke(null);
      } finally {
        Bt(!1);
      }
    })();
  }, [q, U, J, ce]), xb(() => {
    try {
      if (de === null)
        throw new Error("no resData");
      const ae = de == null ? void 0 : de.roomDescriptions;
      if (!(ae != null && ae.length) || (ae == null ? void 0 : ae.length) <= 0)
        throw new Error("no roomDescription");
      const pe = ae == null ? void 0 : ae.sort((Te, me) => ((Te == null ? void 0 : Te.price) || 0) - (me.price || 0)), oe = (pe == null ? void 0 : pe[4]) || (pe == null ? void 0 : pe[0]);
      if (typeof (de == null ? void 0 : de.propertyNameKor) != "string" && typeof (de == null ? void 0 : de.propertyNameEng) != "string" || typeof oe.price != "number" || typeof oe.roomDescription != "string" || typeof oe.cancelDeadLine != "string" || !/^\d{8}$/.test(oe.cancelDeadLine))
        throw new Error("invalid room description data");
      ut({
        hotelName: de.propertyNameKor || de.propertyNameEng,
        ...oe,
        cancelDeadLine: oe.cancelDeadLine.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
      });
    } catch {
      ut("카카오톡 상담 필요");
    }
  }, [de]), /* @__PURE__ */ Ou(
    "div",
    {
      className: "overflow-hidden bg-white shadow-md md:shadow-none rounded-xl",
      style: {
        border: "1px solid #e5398f",
        marginTop: "30px"
      },
      children: [
        /* @__PURE__ */ Mt("header", { className: "bg-[#e5398f] text-white p-3 text-center sm:text-left font-medium", children: "럭셔리 셀렉트 - 후불 현장 결제" }),
        /* @__PURE__ */ Ou("div", { className: "grid grid-cols-1 lg:grid-cols-5 lg:gap-0 items-start justify-stretch", children: [
          /* @__PURE__ */ Mt("div", { className: "lg:col-span-3 p-4 sm:p-6 lg:p-8 lg:pr-4 px-0 py-0", children: /* @__PURE__ */ Mt("div", { className: "grid grid-cols-1 sm:grid-cols-3 md:gap-6 items-start", children: /* @__PURE__ */ Ou("div", { className: "sm:col-span-2 flex flex-col gap-3 p-4 md:p-0", children: [
            /* @__PURE__ */ Mt("span", { className: "font-semibold text-blue-600", children: "[후불 현장 결제]" }),
            yt || !w ? /* @__PURE__ */ Mt("div", { className: "w-48 h-6 animate-pulse bg-gray-200 rounded-sm" }) : typeof w != "string" && /* @__PURE__ */ Mt("span", { className: "font-bold", children: w.hotelName }),
            /* @__PURE__ */ Mt(
              "div",
              {
                className: "flex items-center gap-1.5 text-blue-600",
                children: yt || !w ? /* @__PURE__ */ Mt("div", { className: "w-60 h-5 animate-pulse bg-gray-200 rounded-sm" }) : typeof w != "string" && /* @__PURE__ */ Ou(KS, { children: [
                  /* @__PURE__ */ Mt(
                    "img",
                    {
                      src: "https://static.priviatravel.com/images/front/mtravel/svg/ico-check-blue-circle.svg",
                      alt: "Free cancellation icon",
                      width: 20,
                      height: 20
                    }
                  ),
                  /* @__PURE__ */ Ou("span", { className: "text-sm font-medium", children: [
                    w.cancelDeadLine,
                    " 까지 무료 취소"
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ Mt("div", { className: "pt-3 mt-1", children: /* @__PURE__ */ Mt("ul", { className: "space-y-2", children: [
              {
                icon: /* @__PURE__ */ Mt(g2, { className: "w-4 h-4 text-gray-500 px-0 py-0" }),
                benefit: "2인 조식 포함"
              },
              {
                icon: /* @__PURE__ */ Mt(v2, { className: "w-4 h-4 text-gray-500" }),
                benefit: "$100 크레딧 제공"
              },
              {
                icon: /* @__PURE__ */ Mt(m2, { className: "w-4 h-4 text-gray-500" }),
                benefit: "객실 무료 업그레이드 (현장 가능시)"
              },
              {
                icon: /* @__PURE__ */ Mt(p2, { className: "w-4 h-4 text-gray-500" }),
                benefit: "얼리체크인 & 레이트 체크아웃 (현장 가능시)"
              }
            ].map((ae, pe) => /* @__PURE__ */ Ou(
              "li",
              {
                className: "flex items-center gap-2 text-sm text-gray-600",
                children: [
                  typeof ae.icon == "string" ? /* @__PURE__ */ Mt(
                    "img",
                    {
                      src: ae.icon || "/placeholder.svg",
                      alt: "",
                      width: 16,
                      height: 16
                    }
                  ) : ae.icon,
                  /* @__PURE__ */ Mt("span", { children: ae.benefit })
                ]
              },
              pe
            )) }) })
          ] }) }) }),
          /* @__PURE__ */ Ou("div", { className: "lg:col-span-2 p-4 sm:p-6 lg:p-8 lg:border-l lg:border-dashed lg:border-gray-300 flex flex-col justify-between h-full lg:pl-12 border-t border-dashed lg:border-t-0", children: [
            /* @__PURE__ */ Ou("div", { className: "flex flex-row sm:justify-between sm:items-end mb-4 w-full gap-2 justify-between items-end", children: [
              /* @__PURE__ */ Mt("span", { className: "text-sm text-gray-500", children: "객실 요금" }),
              /* @__PURE__ */ Ou("div", { className: "text-left sm:text-right", children: [
                /* @__PURE__ */ Ou("div", { className: "text-gray-500 hidden sm:block text-left", children: [
                  U,
                  "박 예상결제가"
                ] }),
                /* @__PURE__ */ Mt("div", { className: "font-bold text-gray-800 text-2xl", children: yt || !w ? /* @__PURE__ */ Mt("div", { className: "w-40 h-8 animate-pulse bg-gray-200 rounded-sm" }) : typeof w == "string" ? w : `${w.price.toLocaleString("ko-KR")}원 ~` })
              ] })
            ] }),
            /* @__PURE__ */ Ou("div", { className: "w-full text-right space-y-4 mt-auto", children: [
              /* @__PURE__ */ Mt("div", { className: "text-xs text-red-500 text-left sm:text-right", children: /* @__PURE__ */ Mt("div", { children: "※ 현장 결제시 환율에 따라 최종 원화 결제 금액이 변동될 수 있습니다." }) }),
              /* @__PURE__ */ Mt(
                "a",
                {
                  href: "https://pf.kakao.com/_cxmxgNG/chat",
                  className: "inline-block bg-black text-white py-3 px-8 rounded-sm",
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
const E2 = r2(A2, {
  props: {
    sabreId: "number",
    checkIn: "string",
    nights: "number",
    numOfPeople: "string"
  }
});
customElements.define("select-hotel-product", E2);
export {
  A2 as SelectHotelProductItem,
  E2 as default
};
//# sourceMappingURL=select-hotel-product-widget.es.js.map
