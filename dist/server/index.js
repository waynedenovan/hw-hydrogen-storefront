var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _sessionStorage, _session;
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReact_production_min;
function requireReact_production_min() {
  if (hasRequiredReact_production_min) return react_production_min;
  hasRequiredReact_production_min = 1;
  var l2 = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u2 = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w2 = Symbol.for("react.suspense"), x2 = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
  function A(a2) {
    if (null === a2 || "object" !== typeof a2) return null;
    a2 = z && a2[z] || a2["@@iterator"];
    return "function" === typeof a2 ? a2 : null;
  }
  var B2 = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C = Object.assign, D2 = {};
  function E(a2, b2, e) {
    this.props = a2;
    this.context = b2;
    this.refs = D2;
    this.updater = e || B2;
  }
  E.prototype.isReactComponent = {};
  E.prototype.setState = function(a2, b2) {
    if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a2, b2, "setState");
  };
  E.prototype.forceUpdate = function(a2) {
    this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
  };
  function F2() {
  }
  F2.prototype = E.prototype;
  function G2(a2, b2, e) {
    this.props = a2;
    this.context = b2;
    this.refs = D2;
    this.updater = e || B2;
  }
  var H = G2.prototype = new F2();
  H.constructor = G2;
  C(H, E.prototype);
  H.isPureReactComponent = true;
  var I2 = Array.isArray, J2 = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: true, ref: true, __self: true, __source: true };
  function M(a2, b2, e) {
    var d, c2 = {}, k = null, h = null;
    if (null != b2) for (d in void 0 !== b2.ref && (h = b2.ref), void 0 !== b2.key && (k = "" + b2.key), b2) J2.call(b2, d) && !L.hasOwnProperty(d) && (c2[d] = b2[d]);
    var g2 = arguments.length - 2;
    if (1 === g2) c2.children = e;
    else if (1 < g2) {
      for (var f = Array(g2), m = 0; m < g2; m++) f[m] = arguments[m + 2];
      c2.children = f;
    }
    if (a2 && a2.defaultProps) for (d in g2 = a2.defaultProps, g2) void 0 === c2[d] && (c2[d] = g2[d]);
    return { $$typeof: l2, type: a2, key: k, ref: h, props: c2, _owner: K.current };
  }
  function N(a2, b2) {
    return { $$typeof: l2, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner };
  }
  function O2(a2) {
    return "object" === typeof a2 && null !== a2 && a2.$$typeof === l2;
  }
  function escape(a2) {
    var b2 = { "=": "=0", ":": "=2" };
    return "$" + a2.replace(/[=:]/g, function(a3) {
      return b2[a3];
    });
  }
  var P = /\/+/g;
  function Q(a2, b2) {
    return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b2.toString(36);
  }
  function R(a2, b2, e, d, c2) {
    var k = typeof a2;
    if ("undefined" === k || "boolean" === k) a2 = null;
    var h = false;
    if (null === a2) h = true;
    else switch (k) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a2.$$typeof) {
          case l2:
          case n:
            h = true;
        }
    }
    if (h) return h = a2, c2 = c2(h), a2 = "" === d ? "." + Q(h, 0) : d, I2(c2) ? (e = "", null != a2 && (e = a2.replace(P, "$&/") + "/"), R(c2, b2, e, "", function(a3) {
      return a3;
    })) : null != c2 && (O2(c2) && (c2 = N(c2, e + (!c2.key || h && h.key === c2.key ? "" : ("" + c2.key).replace(P, "$&/") + "/") + a2)), b2.push(c2)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if (I2(a2)) for (var g2 = 0; g2 < a2.length; g2++) {
      k = a2[g2];
      var f = d + Q(k, g2);
      h += R(k, b2, e, f, c2);
    }
    else if (f = A(a2), "function" === typeof f) for (a2 = f.call(a2), g2 = 0; !(k = a2.next()).done; ) k = k.value, f = d + Q(k, g2++), h += R(k, b2, e, f, c2);
    else if ("object" === k) throw b2 = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
    return h;
  }
  function S(a2, b2, e) {
    if (null == a2) return a2;
    var d = [], c2 = 0;
    R(a2, d, "", "", function(a3) {
      return b2.call(e, a3, c2++);
    });
    return d;
  }
  function T(a2) {
    if (-1 === a2._status) {
      var b2 = a2._result;
      b2 = b2();
      b2.then(function(b3) {
        if (0 === a2._status || -1 === a2._status) a2._status = 1, a2._result = b3;
      }, function(b3) {
        if (0 === a2._status || -1 === a2._status) a2._status = 2, a2._result = b3;
      });
      -1 === a2._status && (a2._status = 0, a2._result = b2);
    }
    if (1 === a2._status) return a2._result.default;
    throw a2._result;
  }
  var U = { current: null }, V = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
  function X() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S, forEach: function(a2, b2, e) {
    S(a2, function() {
      b2.apply(this, arguments);
    }, e);
  }, count: function(a2) {
    var b2 = 0;
    S(a2, function() {
      b2++;
    });
    return b2;
  }, toArray: function(a2) {
    return S(a2, function(a3) {
      return a3;
    }) || [];
  }, only: function(a2) {
    if (!O2(a2)) throw Error("React.Children.only expected to receive a single React element child.");
    return a2;
  } };
  react_production_min.Component = E;
  react_production_min.Fragment = p;
  react_production_min.Profiler = r;
  react_production_min.PureComponent = G2;
  react_production_min.StrictMode = q;
  react_production_min.Suspense = w2;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
  react_production_min.act = X;
  react_production_min.cloneElement = function(a2, b2, e) {
    if (null === a2 || void 0 === a2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
    var d = C({}, a2.props), c2 = a2.key, k = a2.ref, h = a2._owner;
    if (null != b2) {
      void 0 !== b2.ref && (k = b2.ref, h = K.current);
      void 0 !== b2.key && (c2 = "" + b2.key);
      if (a2.type && a2.type.defaultProps) var g2 = a2.type.defaultProps;
      for (f in b2) J2.call(b2, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b2[f] && void 0 !== g2 ? g2[f] : b2[f]);
    }
    var f = arguments.length - 2;
    if (1 === f) d.children = e;
    else if (1 < f) {
      g2 = Array(f);
      for (var m = 0; m < f; m++) g2[m] = arguments[m + 2];
      d.children = g2;
    }
    return { $$typeof: l2, type: a2.type, key: c2, ref: k, props: d, _owner: h };
  };
  react_production_min.createContext = function(a2) {
    a2 = { $$typeof: u2, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a2.Provider = { $$typeof: t, _context: a2 };
    return a2.Consumer = a2;
  };
  react_production_min.createElement = M;
  react_production_min.createFactory = function(a2) {
    var b2 = M.bind(null, a2);
    b2.type = a2;
    return b2;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a2) {
    return { $$typeof: v, render: a2 };
  };
  react_production_min.isValidElement = O2;
  react_production_min.lazy = function(a2) {
    return { $$typeof: y, _payload: { _status: -1, _result: a2 }, _init: T };
  };
  react_production_min.memo = function(a2, b2) {
    return { $$typeof: x2, type: a2, compare: void 0 === b2 ? null : b2 };
  };
  react_production_min.startTransition = function(a2) {
    var b2 = V.transition;
    V.transition = {};
    try {
      a2();
    } finally {
      V.transition = b2;
    }
  };
  react_production_min.unstable_act = X;
  react_production_min.useCallback = function(a2, b2) {
    return U.current.useCallback(a2, b2);
  };
  react_production_min.useContext = function(a2) {
    return U.current.useContext(a2);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a2) {
    return U.current.useDeferredValue(a2);
  };
  react_production_min.useEffect = function(a2, b2) {
    return U.current.useEffect(a2, b2);
  };
  react_production_min.useId = function() {
    return U.current.useId();
  };
  react_production_min.useImperativeHandle = function(a2, b2, e) {
    return U.current.useImperativeHandle(a2, b2, e);
  };
  react_production_min.useInsertionEffect = function(a2, b2) {
    return U.current.useInsertionEffect(a2, b2);
  };
  react_production_min.useLayoutEffect = function(a2, b2) {
    return U.current.useLayoutEffect(a2, b2);
  };
  react_production_min.useMemo = function(a2, b2) {
    return U.current.useMemo(a2, b2);
  };
  react_production_min.useReducer = function(a2, b2, e) {
    return U.current.useReducer(a2, b2, e);
  };
  react_production_min.useRef = function(a2) {
    return U.current.useRef(a2);
  };
  react_production_min.useState = function(a2) {
    return U.current.useState(a2);
  };
  react_production_min.useSyncExternalStore = function(a2, b2, e) {
    return U.current.useSyncExternalStore(a2, b2, e);
  };
  react_production_min.useTransition = function() {
    return U.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  return react_production_min;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production_min();
  }
  return react.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = requireReact(), k = Symbol.for("react.element"), l2 = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c2, a2, g2) {
    var b2, d = {}, e = null, h = null;
    void 0 !== g2 && (e = "" + g2);
    void 0 !== a2.key && (e = "" + a2.key);
    void 0 !== a2.ref && (h = a2.ref);
    for (b2 in a2) m.call(a2, b2) && !p.hasOwnProperty(b2) && (d[b2] = a2[b2]);
    if (c2 && c2.defaultProps) for (b2 in a2 = c2.defaultProps, a2) void 0 === d[b2] && (d[b2] = a2[b2]);
    return { $$typeof: k, type: c2, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l2;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var reactExports = requireReact();
const React3 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * react-router v7.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var __typeError2 = (msg) => {
  throw TypeError(msg);
};
var __accessCheck2 = (obj, member, msg) => member.has(obj) || __typeError2("Cannot " + msg);
var __privateGet2 = (obj, member, getter) => (__accessCheck2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd2 = (obj, member, value) => member.has(obj) ? __typeError2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
function invariant$1(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey$1() {
  return Math.random().toString(36).substring(2, 10);
}
function createLocation(current, to2, state = null, key, mask) {
  let location2 = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to2 === "string" ? parsePath(to2) : to2,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to2 && to2.key || key || createKey$1(),
    mask
  };
  return location2;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function createContext(defaultValue) {
  return { defaultValue };
}
var _map;
var RouterContextProvider = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(init) {
    __privateAdd2(this, _map, /* @__PURE__ */ new Map());
    if (init) {
      for (let [context, value] of init) {
        this.set(context, value);
      }
    }
  }
  /**
   * Access a value from the context. If no value has been set for the context,
   * it will return the context's `defaultValue` if provided, or throw an error
   * if no `defaultValue` was set.
   * @param context The context to get the value for
   * @returns The value for the context, or the context's `defaultValue` if no
   * value was set
   */
  get(context) {
    if (__privateGet2(this, _map).has(context)) {
      return __privateGet2(this, _map).get(context);
    }
    if (context.defaultValue !== void 0) {
      return context.defaultValue;
    }
    throw new Error("No value found for context");
  }
  /**
   * Set a value for the context. If the context already has a value set, this
   * will overwrite it.
   *
   * @param context The context to set the value for
   * @param value The value to set for the context
   * @returns {void}
   */
  set(context, value) {
    __privateGet2(this, _map).set(context, value);
  }
};
_map = /* @__PURE__ */ new WeakMap();
var unsupportedLazyRouteObjectKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function isUnsupportedLazyRouteObjectKey(key) {
  return unsupportedLazyRouteObjectKeys.has(
    key
  );
}
var unsupportedLazyRouteFunctionKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function isUnsupportedLazyRouteFunctionKey(key) {
  return unsupportedLazyRouteFunctionKeys.has(
    key
  );
}
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes2, mapRouteProperties2, parentPath = [], manifest = {}, allowInPlaceMutations = false) {
  return routes2.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant$1(
      route.index !== true || !route.children,
      `Cannot specify children on an index route`
    );
    invariant$1(
      allowInPlaceMutations || !manifest[id],
      `Found a route id collision on id "${id}".  Route id's must be globally unique within Data Router usages`
    );
    if (isIndexRoute(route)) {
      let indexRoute = {
        ...route,
        id
      };
      manifest[id] = mergeRouteUpdates(
        indexRoute,
        mapRouteProperties2(indexRoute)
      );
      return indexRoute;
    } else {
      let pathOrLayoutRoute = {
        ...route,
        id,
        children: void 0
      };
      manifest[id] = mergeRouteUpdates(
        pathOrLayoutRoute,
        mapRouteProperties2(pathOrLayoutRoute)
      );
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(
          route.children,
          mapRouteProperties2,
          treePath,
          manifest,
          allowInPlaceMutations
        );
      }
      return pathOrLayoutRoute;
    }
  });
}
function mergeRouteUpdates(route, updates) {
  return Object.assign(route, {
    ...updates,
    ...typeof updates.lazy === "object" && updates.lazy != null ? {
      lazy: {
        ...route.lazy,
        ...updates.lazy
      }
    } : {}
  });
}
function matchRoutes(routes2, locationArg, basename2 = "/") {
  return matchRoutesImpl(routes2, locationArg, basename2, false);
}
function matchRoutesImpl(routes2, locationArg, basename2, allowPartial, precomputedBranches) {
  let location2 = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location2.pathname || "/", basename2);
  if (pathname == null) {
    return null;
  }
  let branches = precomputedBranches ?? flattenAndRankRoutes(routes2);
  let matches = null;
  let decoded = decodePath(pathname);
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    matches = matchRouteBranch(
      branches[i2],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let { route, pathname, params } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    loaderData: loaderData[route.id],
    handle: route.handle
  };
}
function flattenAndRankRoutes(routes2) {
  let branches = flattenRoutes(routes2);
  rankRouteBranches(branches);
  return branches;
}
function flattenRoutes(routes2, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
  let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
    let meta2 = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta2.relativePath.startsWith("/")) {
      if (!meta2.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
        return;
      }
      invariant$1(
        meta2.relativePath.startsWith(parentPath),
        `Absolute route path "${meta2.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta2.relativePath = meta2.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta2.relativePath]);
    let routesMeta = parentsMeta.concat(meta2);
    if (route.children && route.children.length > 0) {
      invariant$1(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(
        route.children,
        branches,
        routesMeta,
        path,
        hasParentOptionalSegments
      );
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes2.forEach((route, index) => {
    var _a2;
    if (route.path === "" || !((_a2 = route.path) == null ? void 0 : _a2.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, true, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a2, b2) => a2.score !== b2.score ? b2.score - a2.score : compareIndexes(
      a2.routesMeta.map((meta2) => meta2.childrenIndex),
      b2.routesMeta.map((meta2) => meta2.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s2) => s2 === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a2, b2) {
  let siblings = a2.length === b2.length && a2.slice(0, -1).every((n, i2) => n === b2[i2]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a2[a2.length - 1] - b2[b2.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta2 = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta2.relativePath, caseSensitive: meta2.caseSensitive, end },
      remainingPathname
    );
    let route = meta2.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta2.relativePath,
          caseSensitive: meta2.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern2, pathname) {
  if (typeof pattern2 === "string") {
    pattern2 = { path: pattern2, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern2.path,
    pattern2.caseSensitive,
    pattern2.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern: pattern2
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (match, paramName, isOptional, index, str) => {
      params.push({ paramName, isOptional: isOptional != null });
      if (isOptional) {
        let nextChar = str.charAt(index + match.length);
        if (nextChar && nextChar !== "/") {
          return "/([^\\/]*)";
        }
        return "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename2) {
  if (basename2 === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename2.toLowerCase())) {
    return null;
  }
  let startIndex = basename2.endsWith("/") ? basename2.length - 1 : basename2.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function prependBasename({
  basename: basename2,
  pathname
}) {
  return pathname === "/" ? basename2 : joinPaths([basename2, pathname]);
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
function resolvePath(to2, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to2 === "string" ? parsePath(to2) : to2;
  let pathname;
  if (toPathname) {
    toPathname = removeDoubleSlashes(toPathname);
    if (toPathname.startsWith("/")) {
      pathname = resolvePathname(toPathname.substring(1), "/");
    } else {
      pathname = resolvePathname(toPathname, fromPathname);
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = removeTrailingSlash(fromPathname).split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to2;
  if (typeof toArg === "string") {
    to2 = parsePath(toArg);
  } else {
    to2 = { ...toArg };
    invariant$1(
      !to2.pathname || !to2.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to2)
    );
    invariant$1(
      !to2.pathname || !to2.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to2)
    );
    invariant$1(
      !to2.search || !to2.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to2)
    );
  }
  let isEmptyPath = toArg === "" || to2.pathname === "";
  let toPathname = isEmptyPath ? "/" : to2.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to2.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to2, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var removeDoubleSlashes = (path) => path.replace(/\/\/+/g, "/");
var joinPaths = (paths) => removeDoubleSlashes(paths.join("/"));
var removeTrailingSlash = (path) => path.replace(/\/+$/, "");
var normalizePathname = (pathname) => removeTrailingSlash(pathname).replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var DataWithResponseInit = class {
  constructor(data2, init) {
    this.type = "DataWithResponseInit";
    this.data = data2;
    this.init = init || null;
  }
};
function data(data2, init) {
  return new DataWithResponseInit(
    data2,
    typeof init === "number" ? { status: init } : init
  );
}
var redirect = (url, init = 302) => {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, { ...responseInit, headers });
};
var redirectDocument = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
var replace = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Replace", "true");
  return response;
};
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
  let parts = matches.map((m) => m.route.path).filter(Boolean);
  return joinPaths(parts) || "/";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename2) {
  let to2 = _to;
  if (typeof to2 !== "string" || !ABSOLUTE_URL_REGEX.test(to2)) {
    return {
      absoluteURL: void 0,
      isExternal: false,
      to: to2
    };
  }
  let absoluteURL = to2;
  let isExternal = false;
  if (isBrowser) {
    try {
      let currentUrl = new URL(window.location.href);
      let targetUrl = to2.startsWith("//") ? new URL(currentUrl.protocol + to2) : new URL(to2);
      let path = stripBasename(targetUrl.pathname, basename2);
      if (targetUrl.origin === currentUrl.origin && path != null) {
        to2 = path + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    } catch (e) {
      warning(
        false,
        `<Link to="${to2}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  }
  return {
    absoluteURL,
    isExternal,
    to: to2
  };
}
var UninstrumentedSymbol = Symbol("Uninstrumented");
function getRouteInstrumentationUpdates(fns, route) {
  let aggregated = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  fns.forEach(
    (fn2) => fn2({
      id: route.id,
      index: route.index,
      path: route.path,
      instrument(i2) {
        let keys = Object.keys(aggregated);
        for (let key of keys) {
          if (i2[key]) {
            aggregated[key].push(i2[key]);
          }
        }
      }
    })
  );
  let updates = {};
  if (typeof route.lazy === "function" && aggregated.lazy.length > 0) {
    let instrumented = wrapImpl(aggregated.lazy, route.lazy, () => void 0);
    if (instrumented) {
      updates.lazy = instrumented;
    }
  }
  if (typeof route.lazy === "object") {
    let lazyObject = route.lazy;
    ["middleware", "loader", "action"].forEach((key) => {
      let lazyFn = lazyObject[key];
      let instrumentations = aggregated[`lazy.${key}`];
      if (typeof lazyFn === "function" && instrumentations.length > 0) {
        let instrumented = wrapImpl(instrumentations, lazyFn, () => void 0);
        if (instrumented) {
          updates.lazy = Object.assign(updates.lazy || {}, {
            [key]: instrumented
          });
        }
      }
    });
  }
  ["loader", "action"].forEach((key) => {
    let handler = route[key];
    if (typeof handler === "function" && aggregated[key].length > 0) {
      let original = handler[UninstrumentedSymbol] ?? handler;
      let instrumented = wrapImpl(
        aggregated[key],
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        if (key === "loader" && original.hydrate === true) {
          instrumented.hydrate = true;
        }
        instrumented[UninstrumentedSymbol] = original;
        updates[key] = instrumented;
      }
    }
  });
  if (route.middleware && route.middleware.length > 0 && aggregated.middleware.length > 0) {
    updates.middleware = route.middleware.map((middleware) => {
      let original = middleware[UninstrumentedSymbol] ?? middleware;
      let instrumented = wrapImpl(
        aggregated.middleware,
        original,
        (...args) => getHandlerInfo(args[0])
      );
      if (instrumented) {
        instrumented[UninstrumentedSymbol] = original;
        return instrumented;
      }
      return middleware;
    });
  }
  return updates;
}
function instrumentHandler(handler, fns) {
  let aggregated = {
    request: []
  };
  fns.forEach(
    (fn2) => fn2({
      instrument(i2) {
        let keys = Object.keys(i2);
        for (let key of keys) {
          if (i2[key]) {
            aggregated[key].push(i2[key]);
          }
        }
      }
    })
  );
  let instrumentedHandler = handler;
  if (aggregated.request.length > 0) {
    instrumentedHandler = wrapImpl(aggregated.request, handler, (...args) => {
      let [request, context] = args;
      return {
        request: getReadonlyRequest(request),
        context: context != null ? getReadonlyContext(context) : context
      };
    });
  }
  return instrumentedHandler;
}
function wrapImpl(impls, handler, getInfo) {
  if (impls.length === 0) {
    return null;
  }
  return async (...args) => {
    let result = await recurseRight(
      impls,
      getInfo(...args),
      () => handler(...args),
      impls.length - 1
    );
    if (result.type === "error") {
      throw result.value;
    }
    return result.value;
  };
}
async function recurseRight(impls, info, handler, index) {
  let impl = impls[index];
  let result;
  if (!impl) {
    try {
      let value = await handler();
      result = { type: "success", value };
    } catch (e) {
      result = { type: "error", value: e };
    }
  } else {
    let handlerPromise = void 0;
    let callHandler = async () => {
      if (handlerPromise) {
        console.error("You cannot call instrumented handlers more than once");
      } else {
        handlerPromise = recurseRight(impls, info, handler, index - 1);
      }
      result = await handlerPromise;
      invariant$1(result, "Expected a result");
      if (result.type === "error" && result.value instanceof Error) {
        return { status: "error", error: result.value };
      }
      return { status: "success", error: void 0 };
    };
    try {
      await impl(callHandler, info);
    } catch (e) {
      console.error("An instrumentation function threw an error:", e);
    }
    if (!handlerPromise) {
      await callHandler();
    }
    await handlerPromise;
  }
  if (result) {
    return result;
  }
  return {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function getHandlerInfo(args) {
  let { request, context, params, pattern: pattern2 } = args;
  return {
    request: getReadonlyRequest(request),
    params: { ...params },
    pattern: pattern2,
    context: getReadonlyContext(context)
  };
}
function getReadonlyRequest(request) {
  return {
    method: request.method,
    url: request.url,
    headers: {
      get: (...args) => request.headers.get(...args)
    }
  };
}
function getReadonlyContext(context) {
  if (isPlainObject(context)) {
    let frozen = { ...context };
    Object.freeze(frozen);
    return frozen;
  } else {
    return {
      get: (ctx) => context.get(ctx)
    };
  }
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(thing) {
  if (thing === null || typeof thing !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
var validMutationMethods = new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  matches: void 0,
  historyAction: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
var defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
function createStaticHandler(routes2, opts) {
  invariant$1(
    routes2.length > 0,
    "You must provide a non-empty routes array to createStaticHandler"
  );
  let manifest = {};
  let basename2 = (opts ? opts.basename : null) || "/";
  let _mapRouteProperties = (opts == null ? void 0 : opts.mapRouteProperties) || defaultMapRouteProperties;
  let mapRouteProperties2 = _mapRouteProperties;
  ({
    ...opts == null ? void 0 : opts.future
  });
  if (opts == null ? void 0 : opts.instrumentations) {
    let instrumentations = opts.instrumentations;
    mapRouteProperties2 = (route) => {
      return {
        ..._mapRouteProperties(route),
        ...getRouteInstrumentationUpdates(
          instrumentations.map((i2) => i2.route).filter(Boolean),
          route
        )
      };
    };
  }
  let dataRoutes = convertRoutesToDataRoutes(
    routes2,
    mapRouteProperties2,
    void 0,
    manifest
  );
  let routeBranches = flattenAndRankRoutes(dataRoutes);
  async function query(request, {
    requestContext,
    filterMatchesToLoad,
    skipLoaderErrorBubbling,
    skipRevalidation,
    dataStrategy,
    generateMiddlewareResponse,
    normalizePath
  } = {}) {
    let normalizePathImpl = normalizePath || defaultNormalizePath;
    let method = request.method;
    let location2 = createLocation(
      "",
      normalizePathImpl(request),
      null,
      "default"
    );
    let matches = matchRoutesImpl(
      dataRoutes,
      location2,
      basename2,
      false,
      routeBranches
    );
    requestContext = requestContext != null ? requestContext : new RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, { method });
      let { matches: methodNotAllowedMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename: basename2,
        location: location2,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return generateMiddlewareResponse ? generateMiddlewareResponse(() => Promise.resolve(staticContext)) : staticContext;
    } else if (!matches) {
      let error = getInternalRouterError(404, { pathname: location2.pathname });
      let { matches: notFoundMatches, route } = getShortCircuitMatches(dataRoutes);
      let staticContext = {
        basename: basename2,
        location: location2,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
      return generateMiddlewareResponse ? generateMiddlewareResponse(() => Promise.resolve(staticContext)) : staticContext;
    }
    if (generateMiddlewareResponse) {
      invariant$1(
        requestContext instanceof RouterContextProvider,
        "When using middleware in `staticHandler.query()`, any provided `requestContext` must be an instance of `RouterContextProvider`"
      );
      try {
        await loadLazyMiddlewareForMatches(
          matches,
          manifest,
          mapRouteProperties2
        );
        let renderedStaticContext;
        let response = await runServerMiddlewarePipeline(
          {
            request,
            url: createDataFunctionUrl(request, location2),
            pattern: getRoutePattern(matches),
            matches,
            params: matches[0].params,
            // If we're calling middleware then it must be enabled so we can cast
            // this to the proper type knowing it's not an `AppLoadContext`
            context: requestContext
          },
          async () => {
            let res = await generateMiddlewareResponse(
              async (revalidationRequest, opts2 = {}) => {
                let result2 = await queryImpl(
                  revalidationRequest,
                  location2,
                  matches,
                  requestContext,
                  dataStrategy || null,
                  skipLoaderErrorBubbling === true,
                  null,
                  "filterMatchesToLoad" in opts2 ? opts2.filterMatchesToLoad ?? null : filterMatchesToLoad ?? null,
                  skipRevalidation === true
                );
                if (isResponse(result2)) {
                  return result2;
                }
                renderedStaticContext = { location: location2, basename: basename2, ...result2 };
                return renderedStaticContext;
              }
            );
            return res;
          },
          async (error, routeId) => {
            var _a2;
            if (isRedirectResponse(error)) {
              return error;
            }
            if (isResponse(error)) {
              try {
                error = new ErrorResponseImpl(
                  error.status,
                  error.statusText,
                  await parseResponseBody(error)
                );
              } catch (e) {
                error = e;
              }
            }
            if (isDataWithResponseInit(error)) {
              error = dataWithResponseInitToErrorResponse(error);
            }
            if (renderedStaticContext) {
              if (routeId in renderedStaticContext.loaderData) {
                renderedStaticContext.loaderData[routeId] = void 0;
              }
              let staticContext = getStaticContextFromError(
                dataRoutes,
                renderedStaticContext,
                error,
                skipLoaderErrorBubbling ? routeId : findNearestBoundary(matches, routeId).route.id
              );
              return generateMiddlewareResponse(
                () => Promise.resolve(staticContext)
              );
            } else {
              let boundaryRouteId = skipLoaderErrorBubbling ? routeId : findNearestBoundary(
                matches,
                ((_a2 = matches.find(
                  (m) => m.route.id === routeId || m.route.loader
                )) == null ? void 0 : _a2.route.id) || routeId
              ).route.id;
              let staticContext = {
                matches,
                location: location2,
                basename: basename2,
                loaderData: {},
                actionData: null,
                errors: {
                  [boundaryRouteId]: error
                },
                statusCode: isRouteErrorResponse(error) ? error.status : 500,
                actionHeaders: {},
                loaderHeaders: {}
              };
              return generateMiddlewareResponse(
                () => Promise.resolve(staticContext)
              );
            }
          }
        );
        invariant$1(isResponse(response), "Expected a response in query()");
        return response;
      } catch (e) {
        if (isResponse(e)) {
          return e;
        }
        throw e;
      }
    }
    let result = await queryImpl(
      request,
      location2,
      matches,
      requestContext,
      dataStrategy || null,
      skipLoaderErrorBubbling === true,
      null,
      filterMatchesToLoad || null,
      skipRevalidation === true
    );
    if (isResponse(result)) {
      return result;
    }
    return { location: location2, basename: basename2, ...result };
  }
  async function queryRoute(request, {
    routeId,
    requestContext,
    dataStrategy,
    generateMiddlewareResponse,
    normalizePath
  } = {}) {
    let normalizePathImpl = normalizePath || defaultNormalizePath;
    let method = request.method;
    let location2 = createLocation(
      "",
      normalizePathImpl(request),
      null,
      "default"
    );
    let matches = matchRoutesImpl(
      dataRoutes,
      location2,
      basename2,
      false,
      routeBranches
    );
    requestContext = requestContext != null ? requestContext : new RouterContextProvider();
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, { method });
    } else if (!matches) {
      throw getInternalRouterError(404, { pathname: location2.pathname });
    }
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location2);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location2.pathname,
        routeId
      });
    } else if (!match) {
      throw getInternalRouterError(404, { pathname: location2.pathname });
    }
    if (generateMiddlewareResponse) {
      invariant$1(
        requestContext instanceof RouterContextProvider,
        "When using middleware in `staticHandler.queryRoute()`, any provided `requestContext` must be an instance of `RouterContextProvider`"
      );
      await loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2);
      let response = await runServerMiddlewarePipeline(
        {
          request,
          url: createDataFunctionUrl(request, location2),
          pattern: getRoutePattern(matches),
          matches,
          params: matches[0].params,
          // If we're calling middleware then it must be enabled so we can cast
          // this to the proper type knowing it's not an `AppLoadContext`
          context: requestContext
        },
        async () => {
          let res = await generateMiddlewareResponse(
            async (innerRequest) => {
              let result2 = await queryImpl(
                innerRequest,
                location2,
                matches,
                requestContext,
                dataStrategy || null,
                false,
                match,
                null,
                false
              );
              let processed = handleQueryResult(result2);
              return isResponse(processed) ? processed : typeof processed === "string" ? new Response(processed) : Response.json(processed);
            }
          );
          return res;
        },
        (error) => {
          if (isDataWithResponseInit(error)) {
            return Promise.resolve(dataWithResponseInitToResponse(error));
          }
          if (isResponse(error)) {
            return Promise.resolve(error);
          }
          throw error;
        }
      );
      return response;
    }
    let result = await queryImpl(
      request,
      location2,
      matches,
      requestContext,
      dataStrategy || null,
      false,
      match,
      null,
      false
    );
    return handleQueryResult(result);
    function handleQueryResult(result2) {
      if (isResponse(result2)) {
        return result2;
      }
      let error = result2.errors ? Object.values(result2.errors)[0] : void 0;
      if (error !== void 0) {
        throw error;
      }
      if (result2.actionData) {
        return Object.values(result2.actionData)[0];
      }
      if (result2.loaderData) {
        return Object.values(result2.loaderData)[0];
      }
      return void 0;
    }
  }
  async function queryImpl(request, location2, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, skipRevalidation) {
    invariant$1(
      request.signal,
      "query()/queryRoute() requests must contain an AbortController signal"
    );
    try {
      if (isMutationMethod(request.method)) {
        let result2 = await submit(
          request,
          location2,
          matches,
          routeMatch || getTargetMatch(matches, location2),
          requestContext,
          dataStrategy,
          skipLoaderErrorBubbling,
          routeMatch != null,
          filterMatchesToLoad,
          skipRevalidation
        );
        return result2;
      }
      let result = await loadRouteData(
        request,
        location2,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        routeMatch,
        filterMatchesToLoad
      );
      return isResponse(result) ? result : {
        ...result,
        actionData: null,
        actionHeaders: {}
      };
    } catch (e) {
      if (isDataStrategyResult(e) && isResponse(e.result)) {
        if (e.type === "error") {
          throw e.result;
        }
        return e.result;
      }
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, location2, matches, actionMatch, requestContext, dataStrategy, skipLoaderErrorBubbling, isRouteRequest, filterMatchesToLoad, skipRevalidation) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: "error",
        error
      };
    } else {
      let dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        location2,
        matches,
        actionMatch,
        [],
        requestContext
      );
      let results = await callDataStrategy(
        request,
        location2,
        dsMatches,
        isRouteRequest,
        requestContext,
        dataStrategy
      );
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest);
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: { [actionMatch.route.id]: result.data },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }
    if (skipRevalidation) {
      if (isErrorResult(result)) {
        let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
        return {
          statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
          actionData: null,
          actionHeaders: {
            ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
          },
          matches,
          loaderData: {},
          errors: {
            [boundaryMatch.route.id]: result.error
          },
          loaderHeaders: {}
        };
      } else {
        return {
          actionData: {
            [actionMatch.route.id]: result.data
          },
          actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {},
          matches,
          loaderData: {},
          errors: null,
          statusCode: result.statusCode || 200,
          loaderHeaders: {}
        };
      }
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let handlerContext2 = await loadRouteData(
        loaderRequest,
        location2,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        null,
        filterMatchesToLoad,
        [boundaryMatch.route.id, result]
      );
      return {
        ...handlerContext2,
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: {
          ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
        }
      };
    }
    let handlerContext = await loadRouteData(
      loaderRequest,
      location2,
      matches,
      requestContext,
      dataStrategy,
      skipLoaderErrorBubbling,
      null,
      filterMatchesToLoad
    );
    return {
      ...handlerContext,
      actionData: {
        [actionMatch.route.id]: result.data
      },
      // action status codes take precedence over loader status codes
      ...result.statusCode ? { statusCode: result.statusCode } : {},
      actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {}
    };
  }
  async function loadRouteData(request, location2, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, filterMatchesToLoad, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch == null ? void 0 : routeMatch.route.loader) && !(routeMatch == null ? void 0 : routeMatch.route.lazy)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }
    let dsMatches;
    if (routeMatch) {
      dsMatches = getTargetedDataStrategyMatches(
        mapRouteProperties2,
        manifest,
        request,
        location2,
        matches,
        routeMatch,
        [],
        requestContext
      );
    } else {
      let maxIdx = pendingActionResult && isErrorResult(pendingActionResult[1]) ? (
        // Up to but not including the boundary
        matches.findIndex((m) => m.route.id === pendingActionResult[0]) - 1
      ) : void 0;
      let pattern2 = getRoutePattern(matches);
      dsMatches = matches.map((match, index) => {
        if (maxIdx != null && index > maxIdx) {
          return getDataStrategyMatch(
            mapRouteProperties2,
            manifest,
            request,
            location2,
            pattern2,
            match,
            [],
            requestContext,
            false
          );
        }
        return getDataStrategyMatch(
          mapRouteProperties2,
          manifest,
          request,
          location2,
          pattern2,
          match,
          [],
          requestContext,
          (match.route.loader || match.route.lazy) != null && (!filterMatchesToLoad || filterMatchesToLoad(match))
        );
      });
    }
    if (!dataStrategy && !dsMatches.some((m) => m.shouldLoad)) {
      return {
        matches,
        loaderData: {},
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {}
      };
    }
    let results = await callDataStrategy(
      request,
      location2,
      dsMatches,
      isRouteRequest,
      requestContext,
      dataStrategy
    );
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest);
    }
    let handlerContext = processRouteLoaderData(
      matches,
      results,
      pendingActionResult,
      true,
      skipLoaderErrorBubbling
    );
    return {
      ...handlerContext,
      matches
    };
  }
  async function callDataStrategy(request, location2, matches, isRouteRequest, requestContext, dataStrategy) {
    let results = await callDataStrategyImpl(
      dataStrategy || defaultDataStrategy,
      request,
      location2,
      matches,
      null,
      requestContext
    );
    let dataResults = {};
    await Promise.all(
      matches.map(async (match) => {
        if (!(match.route.id in results)) {
          return;
        }
        let result = results[match.route.id];
        if (isRedirectDataStrategyResult(result)) {
          let response = result.result;
          throw normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            match.route.id,
            matches,
            basename2
          );
        }
        if (isRouteRequest) {
          if (isResponse(result.result)) {
            throw result;
          } else if (isDataWithResponseInit(result.result)) {
            throw dataWithResponseInitToResponse(result.result);
          }
        }
        dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
      })
    );
    return dataResults;
  }
  return {
    dataRoutes,
    _internalRouteBranches: routeBranches,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes2, handlerContext, error, boundaryId) {
  let errorBoundaryId = boundaryId || handlerContext._deepestRenderedBoundaryId || routes2[0].id;
  return {
    ...handlerContext,
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [errorBoundaryId]: error
    }
  };
}
function throwStaticHandlerAbortedError(request, isRouteRequest) {
  if (request.signal.reason !== void 0) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(
    `${method}() call aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`
  );
}
function defaultNormalizePath(request) {
  let url = new URL(request.url);
  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash
  };
}
function normalizeTo(location2, matches, basename2, to2, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(
    to2 ? to2 : ".",
    getResolveToMatches(contextualMatches),
    stripBasename(location2.pathname, basename2) || location2.pathname,
    relative === "path"
  );
  if (to2 == null) {
    path.search = location2.search;
    path.hash = location2.hash;
  }
  if ((to2 == null || to2 === "" || to2 === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if (basename2 !== "/") {
    path.pathname = prependBasename({ basename: basename2, pathname: path.pathname });
  }
  return createPath(path);
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
var lazyRoutePropertyCache = /* @__PURE__ */ new WeakMap();
var loadLazyRouteProperty = ({
  key,
  route,
  manifest,
  mapRouteProperties: mapRouteProperties2
}) => {
  let routeToUpdate = manifest[route.id];
  invariant$1(routeToUpdate, "No route found in manifest");
  if (!routeToUpdate.lazy || typeof routeToUpdate.lazy !== "object") {
    return;
  }
  let lazyFn = routeToUpdate.lazy[key];
  if (!lazyFn) {
    return;
  }
  let cache = lazyRoutePropertyCache.get(routeToUpdate);
  if (!cache) {
    cache = {};
    lazyRoutePropertyCache.set(routeToUpdate, cache);
  }
  let cachedPromise = cache[key];
  if (cachedPromise) {
    return cachedPromise;
  }
  let propertyPromise = (async () => {
    let isUnsupported = isUnsupportedLazyRouteObjectKey(key);
    let staticRouteValue = routeToUpdate[key];
    let isStaticallyDefined = staticRouteValue !== void 0 && key !== "hasErrorBoundary";
    if (isUnsupported) {
      warning(
        !isUnsupported,
        "Route property " + key + " is not a supported lazy route property. This property will be ignored."
      );
      cache[key] = Promise.resolve();
    } else if (isStaticallyDefined) {
      warning(
        false,
        `Route "${routeToUpdate.id}" has a static property "${key}" defined. The lazy property will be ignored.`
      );
    } else {
      let value = await lazyFn();
      if (value != null) {
        Object.assign(routeToUpdate, { [key]: value });
        Object.assign(routeToUpdate, mapRouteProperties2(routeToUpdate));
      }
    }
    if (typeof routeToUpdate.lazy === "object") {
      routeToUpdate.lazy[key] = void 0;
      if (Object.values(routeToUpdate.lazy).every((value) => value === void 0)) {
        routeToUpdate.lazy = void 0;
      }
    }
  })();
  cache[key] = propertyPromise;
  return propertyPromise;
};
var lazyRouteFunctionCache = /* @__PURE__ */ new WeakMap();
function loadLazyRoute(route, type, manifest, mapRouteProperties2, lazyRoutePropertiesToSkip) {
  let routeToUpdate = manifest[route.id];
  invariant$1(routeToUpdate, "No route found in manifest");
  if (!route.lazy) {
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  }
  if (typeof route.lazy === "function") {
    let cachedPromise = lazyRouteFunctionCache.get(routeToUpdate);
    if (cachedPromise) {
      return {
        lazyRoutePromise: cachedPromise,
        lazyHandlerPromise: cachedPromise
      };
    }
    let lazyRoutePromise2 = (async () => {
      invariant$1(
        typeof route.lazy === "function",
        "No lazy route function found"
      );
      let lazyRoute = await route.lazy();
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let lazyValue = lazyRoute[lazyRouteProperty];
        if (lazyValue === void 0) {
          continue;
        }
        let isUnsupported = isUnsupportedLazyRouteFunctionKey(lazyRouteProperty);
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        if (isUnsupported) {
          warning(
            !isUnsupported,
            "Route property " + lazyRouteProperty + " is not a supported property to be returned from a lazy route function. This property will be ignored."
          );
        } else if (isStaticallyDefined) {
          warning(
            !isStaticallyDefined,
            `Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`
          );
        } else {
          routeUpdates[lazyRouteProperty] = lazyValue;
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...mapRouteProperties2(routeToUpdate),
        lazy: void 0
      });
    })();
    lazyRouteFunctionCache.set(routeToUpdate, lazyRoutePromise2);
    lazyRoutePromise2.catch(() => {
    });
    return {
      lazyRoutePromise: lazyRoutePromise2,
      lazyHandlerPromise: lazyRoutePromise2
    };
  }
  let lazyKeys = Object.keys(route.lazy);
  let lazyPropertyPromises = [];
  let lazyHandlerPromise = void 0;
  for (let key of lazyKeys) {
    if (lazyRoutePropertiesToSkip && lazyRoutePropertiesToSkip.includes(key)) {
      continue;
    }
    let promise = loadLazyRouteProperty({
      key,
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
    if (promise) {
      lazyPropertyPromises.push(promise);
      if (key === type) {
        lazyHandlerPromise = promise;
      }
    }
  }
  let lazyRoutePromise = lazyPropertyPromises.length > 0 ? Promise.all(lazyPropertyPromises).then(() => {
  }) : void 0;
  lazyRoutePromise == null ? void 0 : lazyRoutePromise.catch(() => {
  });
  lazyHandlerPromise == null ? void 0 : lazyHandlerPromise.catch(() => {
  });
  return {
    lazyRoutePromise,
    lazyHandlerPromise
  };
}
function isNonNullable(value) {
  return value !== void 0;
}
function loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2) {
  let promises = matches.map(({ route }) => {
    if (typeof route.lazy !== "object" || !route.lazy.middleware) {
      return void 0;
    }
    return loadLazyRouteProperty({
      key: "middleware",
      route,
      manifest,
      mapRouteProperties: mapRouteProperties2
    });
  }).filter(isNonNullable);
  return promises.length > 0 ? Promise.all(promises) : void 0;
}
async function defaultDataStrategy(args) {
  let matchesToLoad = args.matches.filter((m) => m.shouldLoad);
  let keyedResults = {};
  let results = await Promise.all(matchesToLoad.map((m) => m.resolve()));
  results.forEach((result, i2) => {
    keyedResults[matchesToLoad[i2].route.id] = result;
  });
  return keyedResults;
}
function runServerMiddlewarePipeline(args, handler, errorHandler) {
  return runMiddlewarePipeline(
    args,
    handler,
    processResult,
    isResponse,
    errorHandler
  );
  function processResult(result) {
    return isDataWithResponseInit(result) ? dataWithResponseInitToResponse(result) : result;
  }
}
async function runMiddlewarePipeline(args, handler, processResult, isResult, errorHandler) {
  let { matches, ...dataFnArgs } = args;
  let tuples = matches.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((fn2) => [m.route.id, fn2]) : []
  );
  let result = await callRouteMiddleware(
    dataFnArgs,
    tuples,
    handler,
    processResult,
    isResult,
    errorHandler
  );
  return result;
}
async function callRouteMiddleware(args, middlewares, handler, processResult, isResult, errorHandler, idx = 0) {
  let { request } = args;
  if (request.signal.aborted) {
    throw request.signal.reason ?? new Error(`Request aborted: ${request.method} ${request.url}`);
  }
  let tuple = middlewares[idx];
  if (!tuple) {
    let result = await handler();
    return result;
  }
  let [routeId, middleware] = tuple;
  let nextResult;
  let next = async () => {
    if (nextResult) {
      throw new Error("You may only call `next()` once per middleware");
    }
    try {
      let result = await callRouteMiddleware(
        args,
        middlewares,
        handler,
        processResult,
        isResult,
        errorHandler,
        idx + 1
      );
      nextResult = { value: result };
      return nextResult.value;
    } catch (error) {
      nextResult = { value: await errorHandler(error, routeId, nextResult) };
      return nextResult.value;
    }
  };
  try {
    let value = await middleware(args, next);
    let result = value != null ? processResult(value) : void 0;
    if (isResult(result)) {
      return result;
    } else if (nextResult) {
      return result ?? nextResult.value;
    } else {
      nextResult = { value: await next() };
      return nextResult.value;
    }
  } catch (error) {
    let response = await errorHandler(error, routeId, nextResult);
    return response;
  }
}
function getDataStrategyMatchLazyPromises(mapRouteProperties2, manifest, request, match, lazyRoutePropertiesToSkip) {
  let lazyMiddlewarePromise = loadLazyRouteProperty({
    key: "middleware",
    route: match.route,
    manifest,
    mapRouteProperties: mapRouteProperties2
  });
  let lazyRoutePromises = loadLazyRoute(
    match.route,
    isMutationMethod(request.method) ? "action" : "loader",
    manifest,
    mapRouteProperties2,
    lazyRoutePropertiesToSkip
  );
  return {
    middleware: lazyMiddlewarePromise,
    route: lazyRoutePromises.lazyRoutePromise,
    handler: lazyRoutePromises.lazyHandlerPromise
  };
}
function getDataStrategyMatch(mapRouteProperties2, manifest, request, path, pattern2, match, lazyRoutePropertiesToSkip, scopedContext, shouldLoad, shouldRevalidateArgs = null, callSiteDefaultShouldRevalidate) {
  let isUsingNewApi = false;
  let _lazyPromises = getDataStrategyMatchLazyPromises(
    mapRouteProperties2,
    manifest,
    request,
    match,
    lazyRoutePropertiesToSkip
  );
  return {
    ...match,
    _lazyPromises,
    shouldLoad,
    shouldRevalidateArgs,
    shouldCallHandler(defaultShouldRevalidate) {
      isUsingNewApi = true;
      if (!shouldRevalidateArgs) {
        return shouldLoad;
      }
      if (typeof defaultShouldRevalidate === "boolean") {
        return shouldRevalidateLoader(match, {
          ...shouldRevalidateArgs,
          defaultShouldRevalidate
        });
      }
      return shouldRevalidateLoader(match, shouldRevalidateArgs);
    },
    resolve(handlerOverride) {
      let { lazy, loader: loader2, middleware } = match.route;
      let callHandler = isUsingNewApi || shouldLoad || handlerOverride && !isMutationMethod(request.method) && (lazy || loader2);
      let isMiddlewareOnlyRoute = middleware && middleware.length > 0 && !loader2 && !lazy;
      if (callHandler && (isMutationMethod(request.method) || !isMiddlewareOnlyRoute)) {
        return callLoaderOrAction({
          request,
          path,
          pattern: pattern2,
          match,
          lazyHandlerPromise: _lazyPromises == null ? void 0 : _lazyPromises.handler,
          lazyRoutePromise: _lazyPromises == null ? void 0 : _lazyPromises.route,
          handlerOverride,
          scopedContext
        });
      }
      return Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function getTargetedDataStrategyMatches(mapRouteProperties2, manifest, request, path, matches, targetMatch, lazyRoutePropertiesToSkip, scopedContext, shouldRevalidateArgs = null) {
  return matches.map((match) => {
    if (match.route.id !== targetMatch.route.id) {
      return {
        ...match,
        shouldLoad: false,
        shouldRevalidateArgs,
        shouldCallHandler: () => false,
        _lazyPromises: getDataStrategyMatchLazyPromises(
          mapRouteProperties2,
          manifest,
          request,
          match,
          lazyRoutePropertiesToSkip
        ),
        resolve: () => Promise.resolve({ type: "data", result: void 0 })
      };
    }
    return getDataStrategyMatch(
      mapRouteProperties2,
      manifest,
      request,
      path,
      getRoutePattern(matches),
      match,
      lazyRoutePropertiesToSkip,
      scopedContext,
      true,
      shouldRevalidateArgs
    );
  });
}
async function callDataStrategyImpl(dataStrategyImpl, request, path, matches, fetcherKey, scopedContext, isStaticHandler) {
  if (matches.some((m) => {
    var _a2;
    return (_a2 = m._lazyPromises) == null ? void 0 : _a2.middleware;
  })) {
    await Promise.all(matches.map((m) => {
      var _a2;
      return (_a2 = m._lazyPromises) == null ? void 0 : _a2.middleware;
    }));
  }
  let dataStrategyArgs = {
    request,
    url: createDataFunctionUrl(request, path),
    pattern: getRoutePattern(matches),
    params: matches[0].params,
    context: scopedContext,
    matches
  };
  let runClientMiddleware = () => {
    throw new Error(
      "You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`"
    );
  };
  let results = await dataStrategyImpl({
    ...dataStrategyArgs,
    fetcherKey,
    runClientMiddleware
  });
  try {
    await Promise.all(
      matches.flatMap((m) => {
        var _a2, _b;
        return [
          (_a2 = m._lazyPromises) == null ? void 0 : _a2.handler,
          (_b = m._lazyPromises) == null ? void 0 : _b.route
        ];
      })
    );
  } catch (e) {
  }
  return results;
}
async function callLoaderOrAction({
  request,
  path,
  pattern: pattern2,
  match,
  lazyHandlerPromise,
  lazyRoutePromise,
  handlerOverride,
  scopedContext
}) {
  let result;
  let onReject;
  let isAction = isMutationMethod(request.method);
  let type = isAction ? "action" : "loader";
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_2, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(
          new Error(
            `You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`
          )
        );
      }
      return handler(
        {
          request,
          url: createDataFunctionUrl(request, path),
          pattern: pattern2,
          params: match.params,
          context: scopedContext
        },
        ...ctx !== void 0 ? [ctx] : []
      );
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler());
        return { type: "data", result: val };
      } catch (e) {
        return { type: "error", result: e };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = isAction ? match.route.action : match.route.loader;
    if (lazyHandlerPromise || lazyRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          // Ensure all lazy route promises are resolved before continuing
          lazyHandlerPromise,
          lazyRoutePromise
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await lazyHandlerPromise;
        let handler2 = isAction ? match.route.action : match.route.loader;
        if (handler2) {
          [result] = await Promise.all([runHandler(handler2), lazyRoutePromise]);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return { type: "data", result: void 0 };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
  } catch (e) {
    return { type: "error", result: e };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function parseResponseBody(response) {
  let contentType = response.headers.get("Content-Type");
  if (contentType && /\bapplication\/json\b/.test(contentType)) {
    return response.body == null ? null : response.json();
  }
  return response.text();
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  var _a2, _b, _c, _d, _e2;
  let { result, type } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      data2 = await parseResponseBody(result);
    } catch (e) {
      return { type: "error", error: e };
    }
    if (type === "error") {
      return {
        type: "error",
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: "data",
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === "error") {
    if (isDataWithResponseInit(result)) {
      if (result.data instanceof Error) {
        return {
          type: "error",
          error: result.data,
          statusCode: (_a2 = result.init) == null ? void 0 : _a2.status,
          headers: ((_b = result.init) == null ? void 0 : _b.headers) ? new Headers(result.init.headers) : void 0
        };
      }
      return {
        type: "error",
        error: dataWithResponseInitToErrorResponse(result),
        statusCode: isRouteErrorResponse(result) ? result.status : void 0,
        headers: ((_c = result.init) == null ? void 0 : _c.headers) ? new Headers(result.init.headers) : void 0
      };
    }
    return {
      type: "error",
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDataWithResponseInit(result)) {
    return {
      type: "data",
      data: result.data,
      statusCode: (_d = result.init) == null ? void 0 : _d.status,
      headers: ((_e2 = result.init) == null ? void 0 : _e2.headers) ? new Headers(result.init.headers) : void 0
    };
  }
  return { type: "data", data: result };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename2) {
  let location2 = response.headers.get("Location");
  invariant$1(
    location2,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  );
  if (!isAbsoluteUrl(location2)) {
    let trimmedMatches = matches.slice(
      0,
      matches.findIndex((m) => m.route.id === routeId) + 1
    );
    location2 = normalizeTo(
      new URL(request.url),
      trimmedMatches,
      basename2,
      location2
    );
    response.headers.set("Location", location2);
  }
  return response;
}
function createDataFunctionUrl(request, path) {
  let url = new URL(request.url);
  let parsed = typeof path === "string" ? parsePath(path) : path;
  url.pathname = parsed.pathname || "/";
  if (parsed.search) {
    let searchParams = new URLSearchParams(parsed.search);
    let indexValues = searchParams.getAll("index");
    searchParams.delete("index");
    for (let value of indexValues.filter(Boolean)) {
      searchParams.append("index", value);
    }
    url.search = searchParams.size ? `?${searchParams.toString()}` : "";
  } else {
    url.search = "";
  }
  url.hash = parsed.hash || "";
  return url;
}
function processRouteLoaderData(matches, results, pendingActionResult, isStaticHandler = false, skipLoaderErrorBubbling = false) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach((match) => {
    if (!(match.route.id in results)) {
      return;
    }
    let id = match.route.id;
    let result = results[id];
    invariant$1(
      !isRedirectResult(result),
      "Cannot handle redirect results in processLoaderData"
    );
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      if (!isStaticHandler) {
        loaderData[id] = ResetLoaderDataSymbol;
      }
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      loaderData[id] = result.data;
      if (result.statusCode && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = { [pendingActionResult[0]]: pendingError };
    if (pendingActionResult[2]) {
      loaderData[pendingActionResult[2]] = void 0;
    }
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes2) {
  let route = routes2.length === 1 ? routes2[0] : routes2.find((r) => r.index || !r.path || r.path === "/") || {
    id: `__shim-error-route__`
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route
      }
    ],
    route
  };
}
function getInternalRouterError(status, {
  pathname,
  routeId,
  method,
  type,
  message
} = {}) {
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = `Route "${routeId}" does not match URL "${pathname}"`;
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = `No route matches URL "${pathname}"`;
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (method) {
      errorMessage = `Invalid request method "${method.toUpperCase()}"`;
    }
  }
  return new ErrorResponseImpl(
    status || 500,
    statusText,
    new Error(errorMessage),
    true
  );
}
function dataWithResponseInitToResponse(data2) {
  return Response.json(data2.data, data2.init ?? void 0);
}
function dataWithResponseInitToErrorResponse(data2) {
  var _a2, _b;
  return new ErrorResponseImpl(
    ((_a2 = data2.init) == null ? void 0 : _a2.status) ?? 500,
    ((_b = data2.init) == null ? void 0 : _b.statusText) ?? "Internal Server Error",
    data2.data
  );
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === "data" || result.type === "error");
}
function isRedirectDataStrategyResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isErrorResult(result) {
  return result.type === "error";
}
function isRedirectResult(result) {
  return (result && result.type) === "redirect";
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(result) {
  return isResponse(result) && isRedirectStatusCode(result.status) && result.headers.has("Location");
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toUpperCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toUpperCase());
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location2) {
  let search = typeof location2 === "string" ? parsePath(location2).search : location2.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
var DataRouterContext = reactExports.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = reactExports.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = reactExports.createContext(false);
function useIsRSCRouterContext() {
  return reactExports.useContext(RSCRouterContext);
}
var ViewTransitionContext = reactExports.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = reactExports.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = reactExports.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = reactExports.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = reactExports.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = reactExports.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
  if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
    try {
      let parsed = JSON.parse(digest.slice(28));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") {
        return parsed;
      }
    } catch {
    }
  }
}
function decodeRouteErrorResponseDigest(digest) {
  if (digest.startsWith(
    `${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`
  )) {
    try {
      let parsed = JSON.parse(digest.slice(40));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") {
        return new ErrorResponseImpl(
          parsed.status,
          parsed.statusText,
          parsed.data
        );
      }
    } catch {
    }
  }
}
function useHref(to2, { relative } = {}) {
  invariant$1(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename: basename2, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to2, { relative });
  let joinedPathname = pathname;
  if (basename2 !== "/") {
    joinedPathname = pathname === "/" ? basename2 : joinPaths([basename2, pathname]);
  }
  return navigator2.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  invariant$1(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return reactExports.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant$1(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let { basename: basename2, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    (to2, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to2 === "number") {
        navigator2.go(to2);
        return;
      }
      let path = resolveTo(
        to2,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename2 !== "/") {
        path.pathname = path.pathname === "/" ? basename2 : joinPaths([basename2, path.pathname]);
      }
      (!!options.replace ? navigator2.replace : navigator2.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename2,
      navigator2,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = reactExports.createContext(null);
function useOutletContext() {
  return reactExports.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = reactExports.useContext(RouteContext).outlet;
  return reactExports.useMemo(
    () => outlet && /* @__PURE__ */ reactExports.createElement(OutletContext.Provider, { value: context }, outlet),
    [outlet, context]
  );
}
function useParams() {
  let { matches } = reactExports.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return (routeMatch == null ? void 0 : routeMatch.params) ?? {};
}
function useResolvedPath(to2, { relative } = {}) {
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return reactExports.useMemo(
    () => resolveTo(
      to2,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to2, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutesImpl(routes2, locationArg, dataRouterOpts) {
  invariant$1(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches: parentMatches } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location2;
  {
    location2 = locationFromContext;
  }
  let pathname = location2.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = dataRouterOpts && dataRouterOpts.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    dataRouterOpts.state.matches.map(
      (m) => Object.assign(m, {
        route: dataRouterOpts.manifest[m.route.id] || m.route
      })
    )
  ) : matchRoutes(routes2, { pathname: remainingPathname });
  {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location2.pathname}${location2.search}${location2.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location2.pathname}${location2.search}${location2.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator2.encodeLocation ? navigator2.encodeLocation(
            match.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator2.encodeLocation ? navigator2.encodeLocation(
            match.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterOpts
  );
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ reactExports.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "React Router caught the following error during render",
        error
      );
    }
  }
  render() {
    let error = this.state.error;
    if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
      const decoded = decodeRouteErrorResponseDigest(error.digest);
      if (decoded) error = decoded;
    }
    let result = error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ reactExports.createElement(
      RouteErrorContext.Provider,
      {
        value: error,
        children: this.props.component
      }
    )) : this.props.children;
    if (this.context) {
      return /* @__PURE__ */ reactExports.createElement(RSCErrorHandler, { error }, result);
    }
    return result;
  }
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({
  children,
  error
}) {
  let { basename: basename2 } = reactExports.useContext(NavigationContext);
  if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
    let redirect2 = decodeRedirectErrorDigest(error.digest);
    if (redirect2) {
      let existingRedirect = errorRedirectHandledMap.get(error);
      if (existingRedirect) throw existingRedirect;
      let parsed = parseToInfo(redirect2.location, basename2);
      if (isBrowser && !errorRedirectHandledMap.get(error)) {
        if (parsed.isExternal || redirect2.reloadDocument) {
          window.location.href = parsed.absoluteURL || parsed.to;
        } else {
          const redirectPromise = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(parsed.to, {
              replace: redirect2.replace
            })
          );
          errorRedirectHandledMap.set(error, redirectPromise);
          throw redirectPromise;
        }
      }
      return /* @__PURE__ */ reactExports.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${parsed.absoluteURL || parsed.to}`
        }
      );
    }
  }
  return children;
}
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
  let dataRouterState = dataRouterOpts == null ? void 0 : dataRouterOpts.state;
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0
    );
    invariant$1(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterOpts && dataRouterState) {
    renderFallback = dataRouterState.renderFallback;
    for (let i2 = 0; i2 < renderedMatches.length; i2++) {
      let match = renderedMatches[i2];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i2;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          if (dataRouterOpts.isStatic) {
            renderFallback = true;
          }
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  let onErrorHandler = dataRouterOpts == null ? void 0 : dataRouterOpts.onError;
  let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
    var _a2, _b;
    onErrorHandler(error, {
      location: dataRouterState.location,
      params: ((_b = (_a2 = dataRouterState.matches) == null ? void 0 : _a2[0]) == null ? void 0 : _b.params) ?? {},
      pattern: getRoutePattern(dataRouterState.matches),
      errorInfo
    });
  } : void 0;
  return renderedMatches.reduceRight(
    (outlet, match, index) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index === 0) {
            warningOnce(
              "route-fallback",
              false,
              "No `HydrateFallback` element provided to render during initial hydration"
            );
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ reactExports.createElement(
          RenderedRoute,
          {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          }
        );
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ reactExports.createElement(
        RenderErrorBoundary,
        {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: { outlet: null, matches: matches2, isDataRoute: true },
          onError
        }
      ) : getChildren();
    },
    null
  );
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant$1(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  invariant$1(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  invariant$1(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant$1(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(
    "useRouteId"
    /* UseRouteId */
  );
}
function useNavigation() {
  let state = useDataRouterState(
    "useNavigation"
    /* UseNavigation */
  );
  return reactExports.useMemo(() => {
    let { matches, historyAction, ...rest } = state.navigation;
    return rest;
  }, [state.navigation]);
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext(
    "useRevalidator"
    /* UseRevalidator */
  );
  let state = useDataRouterState(
    "useRevalidator"
    /* UseRevalidator */
  );
  let revalidate = reactExports.useCallback(async () => {
    await dataRouterContext.router.revalidate();
  }, [dataRouterContext.router]);
  return reactExports.useMemo(
    () => ({ revalidate, state: state.revalidation }),
    [revalidate, state.revalidation]
  );
}
function useMatches() {
  let { matches, loaderData } = useDataRouterState(
    "useMatches"
    /* UseMatches */
  );
  return reactExports.useMemo(
    () => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)),
    [matches, loaderData]
  );
}
function useLoaderData() {
  let state = useDataRouterState(
    "useLoaderData"
    /* UseLoaderData */
  );
  let routeId = useCurrentRouteId(
    "useLoaderData"
    /* UseLoaderData */
  );
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  let state = useDataRouterState(
    "useRouteLoaderData"
    /* UseRouteLoaderData */
  );
  return state.loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState(
    "useActionData"
    /* UseActionData */
  );
  let routeId = useCurrentRouteId(
    "useLoaderData"
    /* UseLoaderData */
  );
  return state.actionData ? state.actionData[routeId] : void 0;
}
function useRouteError() {
  var _a2;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(
    "useRouteError"
    /* UseRouteError */
  );
  let routeId = useCurrentRouteId(
    "useRouteError"
    /* UseRouteError */
  );
  if (error !== void 0) {
    return error;
  }
  return (_a2 = state.errors) == null ? void 0 : _a2[routeId];
}
function useAsyncValue() {
  let value = reactExports.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
function useNavigateStable() {
  let { router } = useDataRouterContext(
    "useNavigate"
    /* UseNavigateStable */
  );
  let id = useCurrentRouteId(
    "useNavigate"
    /* UseNavigateStable */
  );
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    async (to2, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to2 === "number") {
        await router.navigate(to2);
      } else {
        await router.navigate(to2, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
var alreadyWarned2 = {};
function warnOnce$1(condition, message) {
  if (!condition && !alreadyWarned2[message]) {
    alreadyWarned2[message] = true;
    console.warn(message);
  }
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    {
      if (route.element) {
        warning(
          false,
          "You should not include both `Component` and `element` on your route - `Component` will be used."
        );
      }
    }
    Object.assign(updates, {
      element: reactExports.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    {
      if (route.hydrateFallbackElement) {
        warning(
          false,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
        );
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: reactExports.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    {
      if (route.errorElement) {
        warning(
          false,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
        );
      }
    }
    Object.assign(updates, {
      errorElement: reactExports.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
reactExports.memo(DataRoutes2);
function DataRoutes2({
  routes: routes2,
  manifest,
  future: future2,
  state,
  isStatic,
  onError
}) {
  return useRoutesImpl(routes2, void 0, {
    manifest,
    state,
    isStatic,
    onError
  });
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP",
  navigator: navigator2,
  static: staticProp = false,
  useTransitions
}) {
  invariant$1(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename2 = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(
    () => ({
      basename: basename2,
      navigator: navigator2,
      static: staticProp,
      useTransitions,
      future: {}
    }),
    [basename2, navigator2, staticProp, useTransitions]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default",
    mask
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename2);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key,
        mask
      },
      navigationType
    };
  }, [basename2, pathname, search, hash, state, key, navigationType, mask]);
  warning(
    locationContext != null,
    `<Router basename="${basename2}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, { children, value: locationContext }));
}
function Await({
  children,
  errorElement,
  resolve
}) {
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let dataRouterStateContext = reactExports.useContext(DataRouterStateContext);
  let onError = reactExports.useCallback(
    (error, errorInfo) => {
      var _a2;
      if (dataRouterContext && dataRouterContext.onError && dataRouterStateContext) {
        dataRouterContext.onError(error, {
          location: dataRouterStateContext.location,
          params: ((_a2 = dataRouterStateContext.matches[0]) == null ? void 0 : _a2.params) || {},
          pattern: getRoutePattern(dataRouterStateContext.matches),
          errorInfo
        });
      }
    },
    [dataRouterContext, dataRouterStateContext]
  );
  return /* @__PURE__ */ reactExports.createElement(
    AwaitErrorBoundary,
    {
      resolve,
      errorElement,
      onError
    },
    /* @__PURE__ */ reactExports.createElement(ResolveAwait, null, children)
  );
}
var AwaitErrorBoundary = class extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "<Await> caught the following error during render",
        error,
        errorInfo
      );
    }
  }
  render() {
    let { children, errorElement, resolve } = this.props;
    let promise = null;
    let status = 0;
    if (!(resolve instanceof Promise)) {
      status = 1;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_data", { get: () => resolve });
    } else if (this.state.error) {
      status = 2;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {
      });
      Object.defineProperty(promise, "_tracked", { get: () => true });
      Object.defineProperty(promise, "_error", { get: () => renderError });
    } else if (resolve._tracked) {
      promise = resolve;
      status = "_error" in promise ? 2 : "_data" in promise ? 1 : 0;
    } else {
      status = 0;
      Object.defineProperty(resolve, "_tracked", { get: () => true });
      promise = resolve.then(
        (data2) => Object.defineProperty(resolve, "_data", { get: () => data2 }),
        (error) => {
          var _a2, _b;
          (_b = (_a2 = this.props).onError) == null ? void 0 : _b.call(_a2, error);
          Object.defineProperty(resolve, "_error", { get: () => error });
        }
      );
    }
    if (status === 2 && !errorElement) {
      throw promise._error;
    }
    if (status === 2) {
      return /* @__PURE__ */ reactExports.createElement(AwaitContext.Provider, { value: promise, children: errorElement });
    }
    if (status === 1) {
      return /* @__PURE__ */ reactExports.createElement(AwaitContext.Provider, { value: promise, children });
    }
    throw promise;
  }
};
function ResolveAwait({
  children
}) {
  let data2 = useAsyncValue();
  let toRender = typeof children === "function" ? children(data2) : children;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, toRender);
}
function useRouteComponentProps() {
  return {
    params: useParams(),
    loaderData: useLoaderData(),
    actionData: useActionData(),
    matches: useMatches()
  };
}
function withComponentProps(Component4) {
  return function WithComponentProps2() {
    const props = useRouteComponentProps();
    return reactExports.createElement(Component4, props);
  };
}
function useErrorBoundaryProps() {
  return {
    params: useParams(),
    loaderData: useLoaderData(),
    actionData: useActionData(),
    error: useRouteError()
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function WithErrorBoundaryProps2() {
    const props = useErrorBoundaryProps();
    return reactExports.createElement(ErrorBoundary3, props);
  };
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
function createSearchParams(init = "") {
  return new URLSearchParams(
    typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo2, key) => {
      let value = init[key];
      return memo2.concat(
        Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
      );
    }, [])
  );
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    defaultSearchParams.forEach((_2, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    });
  }
  return searchParams;
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename2) {
  let method;
  let action2;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action2 = attr ? stripBasename(attr, basename2) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action2 = attr ? stripBasename(attr, basename2) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action2 = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action: action2, method: method.toLowerCase(), encType, formData, body };
}
var HOLE = -1;
var NAN = -2;
var NEGATIVE_INFINITY = -3;
var NEGATIVE_ZERO = -4;
var NULL = -5;
var POSITIVE_INFINITY = -6;
var UNDEFINED = -7;
var TYPE_BIGINT = "B";
var TYPE_DATE = "D";
var TYPE_ERROR = "E";
var TYPE_MAP = "M";
var TYPE_NULL_OBJECT = "N";
var TYPE_PROMISE = "P";
var TYPE_REGEXP = "R";
var TYPE_SET = "S";
var TYPE_SYMBOL = "Y";
var TYPE_URL = "U";
var TYPE_PREVIOUS_RESOLVED = "Z";
var SUPPORTED_ERROR_TYPES = [
  "EvalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
var Deferred2 = class {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
function createLineSplittingTransform() {
  const decoder = new TextDecoder();
  let leftover = "";
  return new TransformStream({
    transform(chunk, controller) {
      const str = decoder.decode(chunk, { stream: true });
      const parts = (leftover + str).split("\n");
      leftover = parts.pop() || "";
      for (const part of parts) {
        controller.enqueue(part);
      }
    },
    flush(controller) {
      if (leftover) {
        controller.enqueue(leftover);
      }
    }
  });
}
var TIME_LIMIT_MS = 1;
var getNow = () => Date.now();
var yieldToMain = () => new Promise((resolve) => setTimeout(resolve, 0));
async function flatten(input) {
  const { indices } = this;
  const existing = indices.get(input);
  if (existing) return [existing];
  if (input === void 0) return UNDEFINED;
  if (input === null) return NULL;
  if (Number.isNaN(input)) return NAN;
  if (input === Number.POSITIVE_INFINITY) return POSITIVE_INFINITY;
  if (input === Number.NEGATIVE_INFINITY) return NEGATIVE_INFINITY;
  if (input === 0 && 1 / input < 0) return NEGATIVE_ZERO;
  const index = this.index++;
  indices.set(input, index);
  const stack = [[input, index]];
  await stringify.call(this, stack);
  return index;
}
async function stringify(stack) {
  const { deferred, indices, plugins, postPlugins } = this;
  const str = this.stringified;
  let lastYieldTime = getNow();
  const flattenValue = (value) => {
    const existing = indices.get(value);
    if (existing) return [existing];
    if (value === void 0) return UNDEFINED;
    if (value === null) return NULL;
    if (Number.isNaN(value)) return NAN;
    if (value === Number.POSITIVE_INFINITY) return POSITIVE_INFINITY;
    if (value === Number.NEGATIVE_INFINITY) return NEGATIVE_INFINITY;
    if (value === 0 && 1 / value < 0) return NEGATIVE_ZERO;
    const index = this.index++;
    indices.set(value, index);
    stack.push([value, index]);
    return index;
  };
  let i2 = 0;
  while (stack.length > 0) {
    const now = getNow();
    if (++i2 % 6e3 === 0 && now - lastYieldTime >= TIME_LIMIT_MS) {
      await yieldToMain();
      lastYieldTime = getNow();
    }
    const [input, index] = stack.pop();
    const partsForObj = (obj) => Object.keys(obj).map((k) => `"_${flattenValue(k)}":${flattenValue(obj[k])}`).join(",");
    let error = null;
    switch (typeof input) {
      case "boolean":
      case "number":
      case "string":
        str[index] = JSON.stringify(input);
        break;
      case "bigint":
        str[index] = `["${TYPE_BIGINT}","${input}"]`;
        break;
      case "symbol": {
        const keyFor = Symbol.keyFor(input);
        if (!keyFor) {
          error = new Error(
            "Cannot encode symbol unless created with Symbol.for()"
          );
        } else {
          str[index] = `["${TYPE_SYMBOL}",${JSON.stringify(keyFor)}]`;
        }
        break;
      }
      case "object": {
        if (!input) {
          str[index] = `${NULL}`;
          break;
        }
        const isArray = Array.isArray(input);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index] += `,${rest.map((v) => flattenValue(v)).join(",")}`;
              }
              str[index] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          let result = isArray ? "[" : "{";
          if (isArray) {
            for (let i22 = 0; i22 < input.length; i22++)
              result += (i22 ? "," : "") + (i22 in input ? flattenValue(input[i22]) : HOLE);
            str[index] = `${result}]`;
          } else if (input instanceof Date) {
            const dateTime = input.getTime();
            str[index] = `["${TYPE_DATE}",${Number.isNaN(dateTime) ? JSON.stringify("invalid") : dateTime}]`;
          } else if (input instanceof URL) {
            str[index] = `["${TYPE_URL}",${JSON.stringify(input.href)}]`;
          } else if (input instanceof RegExp) {
            str[index] = `["${TYPE_REGEXP}",${JSON.stringify(
              input.source
            )},${JSON.stringify(input.flags)}]`;
          } else if (input instanceof Set) {
            if (input.size > 0) {
              str[index] = `["${TYPE_SET}",${[...input].map((val) => flattenValue(val)).join(",")}]`;
            } else {
              str[index] = `["${TYPE_SET}"]`;
            }
          } else if (input instanceof Map) {
            if (input.size > 0) {
              str[index] = `["${TYPE_MAP}",${[...input].flatMap(([k, v]) => [flattenValue(k), flattenValue(v)]).join(",")}]`;
            } else {
              str[index] = `["${TYPE_MAP}"]`;
            }
          } else if (input instanceof Promise) {
            str[index] = `["${TYPE_PROMISE}",${index}]`;
            deferred[index] = input;
          } else if (input instanceof Error) {
            str[index] = `["${TYPE_ERROR}",${JSON.stringify(input.message)}`;
            if (input.name !== "Error") {
              str[index] += `,${JSON.stringify(input.name)}`;
            }
            str[index] += "]";
          } else if (Object.getPrototypeOf(input) === null) {
            str[index] = `["${TYPE_NULL_OBJECT}",{${partsForObj(input)}}]`;
          } else if (isPlainObject2(input)) {
            str[index] = `{${partsForObj(input)}}`;
          } else {
            error = new Error("Cannot encode object with prototype");
          }
        }
        break;
      }
      default: {
        const isArray = Array.isArray(input);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index] += `,${rest.map((v) => flattenValue(v)).join(",")}`;
              }
              str[index] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          error = new Error("Cannot encode function or unexpected type");
        }
      }
    }
    if (error) {
      let pluginHandled = false;
      if (postPlugins) {
        for (const plugin of postPlugins) {
          const pluginResult = plugin(input);
          if (Array.isArray(pluginResult)) {
            pluginHandled = true;
            const [pluginIdentifier, ...rest] = pluginResult;
            str[index] = `[${JSON.stringify(pluginIdentifier)}`;
            if (rest.length > 0) {
              str[index] += `,${rest.map((v) => flattenValue(v)).join(",")}`;
            }
            str[index] += "]";
            break;
          }
        }
      }
      if (!pluginHandled) {
        throw error;
      }
    }
  }
}
var objectProtoNames2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject2(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames2;
}
var globalObj = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : void 0;
function unflatten(parsed) {
  const { hydrated, values } = this;
  if (typeof parsed === "number") return hydrate.call(this, parsed);
  if (!Array.isArray(parsed) || !parsed.length) throw new SyntaxError();
  const startIndex = values.length;
  for (const value of parsed) {
    values.push(value);
  }
  hydrated.length = values.length;
  return hydrate.call(this, startIndex);
}
function hydrate(index) {
  const { hydrated, values, deferred, plugins } = this;
  let result;
  const stack = [
    [
      index,
      (v) => {
        result = v;
      }
    ]
  ];
  let postRun = [];
  while (stack.length > 0) {
    const [index2, set] = stack.pop();
    switch (index2) {
      case UNDEFINED:
        set(void 0);
        continue;
      case NULL:
        set(null);
        continue;
      case NAN:
        set(NaN);
        continue;
      case POSITIVE_INFINITY:
        set(Infinity);
        continue;
      case NEGATIVE_INFINITY:
        set(-Infinity);
        continue;
      case NEGATIVE_ZERO:
        set(-0);
        continue;
    }
    if (hydrated[index2]) {
      set(hydrated[index2]);
      continue;
    }
    const value = values[index2];
    if (!value || typeof value !== "object") {
      hydrated[index2] = value;
      set(value);
      continue;
    }
    if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const [type, b2, c2] = value;
        switch (type) {
          case TYPE_DATE:
            set(hydrated[index2] = new Date(b2));
            continue;
          case TYPE_URL:
            set(hydrated[index2] = new URL(b2));
            continue;
          case TYPE_BIGINT:
            set(hydrated[index2] = BigInt(b2));
            continue;
          case TYPE_REGEXP:
            set(hydrated[index2] = new RegExp(b2, c2));
            continue;
          case TYPE_SYMBOL:
            set(hydrated[index2] = Symbol.for(b2));
            continue;
          case TYPE_SET:
            const newSet = /* @__PURE__ */ new Set();
            hydrated[index2] = newSet;
            for (let i2 = value.length - 1; i2 > 0; i2--)
              stack.push([
                value[i2],
                (v) => {
                  newSet.add(v);
                }
              ]);
            set(newSet);
            continue;
          case TYPE_MAP:
            const map = /* @__PURE__ */ new Map();
            hydrated[index2] = map;
            for (let i2 = value.length - 2; i2 > 0; i2 -= 2) {
              const r = [];
              stack.push([
                value[i2 + 1],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                value[i2],
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                map.set(r[0], r[1]);
              });
            }
            set(map);
            continue;
          case TYPE_NULL_OBJECT:
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index2] = obj;
            for (const key of Object.keys(b2).reverse()) {
              const r = [];
              stack.push([
                b2[key],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                Number(key.slice(1)),
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                obj[r[0]] = r[1];
              });
            }
            set(obj);
            continue;
          case TYPE_PROMISE:
            if (hydrated[b2]) {
              set(hydrated[index2] = hydrated[b2]);
            } else {
              const d = new Deferred2();
              deferred[b2] = d;
              set(hydrated[index2] = d.promise);
            }
            continue;
          case TYPE_ERROR:
            const [, message, errorType] = value;
            let error = errorType && globalObj && SUPPORTED_ERROR_TYPES.includes(errorType) && errorType in globalObj && typeof globalObj[errorType] === "function" ? new globalObj[errorType](message) : new Error(message);
            hydrated[index2] = error;
            set(error);
            continue;
          case TYPE_PREVIOUS_RESOLVED:
            set(hydrated[index2] = hydrated[b2]);
            continue;
          default:
            if (Array.isArray(plugins)) {
              const r = [];
              const vals = value.slice(1);
              for (let i2 = 0; i2 < vals.length; i2++) {
                const v = vals[i2];
                stack.push([
                  v,
                  (v2) => {
                    r[i2] = v2;
                  }
                ]);
              }
              postRun.push(() => {
                for (const plugin of plugins) {
                  const result2 = plugin(value[0], ...r);
                  if (result2) {
                    set(hydrated[index2] = result2.value);
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const array = [];
        hydrated[index2] = array;
        for (let i2 = 0; i2 < value.length; i2++) {
          const n = value[i2];
          if (n !== HOLE) {
            stack.push([
              n,
              (v) => {
                array[i2] = v;
              }
            ]);
          }
        }
        set(array);
        continue;
      }
    } else {
      const object = {};
      hydrated[index2] = object;
      for (const key of Object.keys(value).reverse()) {
        const r = [];
        stack.push([
          value[key],
          (v) => {
            r[1] = v;
          }
        ]);
        stack.push([
          Number(key.slice(1)),
          (k) => {
            r[0] = k;
          }
        ]);
        postRun.push(() => {
          object[r[0]] = r[1];
        });
      }
      set(object);
      continue;
    }
  }
  while (postRun.length > 0) {
    postRun.pop()();
  }
  return result;
}
async function decode(readable, options) {
  const { plugins } = options ?? {};
  const done = new Deferred2();
  const reader = readable.pipeThrough(createLineSplittingTransform()).getReader();
  const decoder = {
    values: [],
    hydrated: [],
    deferred: {},
    plugins
  };
  const decoded = await decodeInitial.call(decoder, reader);
  let donePromise = done.promise;
  if (decoded.done) {
    done.resolve();
  } else {
    donePromise = decodeDeferred.call(decoder, reader).then(done.resolve).catch((reason) => {
      for (const deferred of Object.values(decoder.deferred)) {
        deferred.reject(reason);
      }
      done.reject(reason);
    });
  }
  return {
    done: donePromise.then(() => reader.closed),
    value: decoded.value
  };
}
async function decodeInitial(reader) {
  const read = await reader.read();
  if (!read.value) {
    throw new SyntaxError();
  }
  let line;
  try {
    line = JSON.parse(read.value);
  } catch (reason) {
    throw new SyntaxError();
  }
  return {
    done: read.done,
    value: unflatten.call(this, line)
  };
}
async function decodeDeferred(reader) {
  let read = await reader.read();
  while (!read.done) {
    if (!read.value) continue;
    const line = read.value;
    switch (line[0]) {
      case TYPE_PROMISE: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.resolve(value);
        break;
      }
      case TYPE_ERROR: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.reject(value);
        break;
      }
      default:
        throw new SyntaxError();
    }
    read = await reader.read();
  }
}
function encode(input, options) {
  const { onComplete, plugins, postPlugins, signal } = options ?? {};
  const encoder2 = {
    deferred: {},
    index: 0,
    indices: /* @__PURE__ */ new Map(),
    stringified: [],
    plugins,
    postPlugins,
    signal
  };
  const textEncoder = new TextEncoder();
  let lastSentIndex = 0;
  const readable = new ReadableStream({
    async start(controller) {
      const id = await flatten.call(encoder2, input);
      if (Array.isArray(id)) {
        throw new Error("This should never happen");
      }
      if (id < 0) {
        controller.enqueue(textEncoder.encode(`${id}
`));
      } else {
        controller.enqueue(
          textEncoder.encode(`[${encoder2.stringified.join(",")}]
`)
        );
        lastSentIndex = encoder2.stringified.length - 1;
      }
      const seenPromises = /* @__PURE__ */ new WeakSet();
      let processingChain = Promise.resolve();
      if (Object.keys(encoder2.deferred).length) {
        let raceDone;
        const racePromise = new Promise((resolve, reject) => {
          raceDone = resolve;
          if (signal) {
            const rejectPromise = () => reject(signal.reason || new Error("Signal was aborted."));
            if (signal.aborted) {
              rejectPromise();
            } else {
              signal.addEventListener("abort", (event) => {
                rejectPromise();
              });
            }
          }
        });
        while (Object.keys(encoder2.deferred).length > 0) {
          for (const [deferredId, deferred] of Object.entries(
            encoder2.deferred
          )) {
            if (seenPromises.has(deferred)) continue;
            seenPromises.add(
              // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
              encoder2.deferred[Number(deferredId)] = Promise.race([
                racePromise,
                deferred
              ]).then(
                (resolved) => {
                  processingChain = processingChain.then(async () => {
                    const id2 = await flatten.call(encoder2, resolved);
                    if (Array.isArray(id2)) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_PROMISE}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                        )
                      );
                      encoder2.index++;
                      lastSentIndex++;
                    } else if (id2 < 0) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_PROMISE}${deferredId}:${id2}
`
                        )
                      );
                    } else {
                      const values = encoder2.stringified.slice(lastSentIndex + 1).join(",");
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_PROMISE}${deferredId}:[${values}]
`
                        )
                      );
                      lastSentIndex = encoder2.stringified.length - 1;
                    }
                  });
                  return processingChain;
                },
                (reason) => {
                  processingChain = processingChain.then(async () => {
                    if (!reason || typeof reason !== "object" || !(reason instanceof Error)) {
                      reason = new Error("An unknown error occurred");
                    }
                    const id2 = await flatten.call(encoder2, reason);
                    if (Array.isArray(id2)) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_ERROR}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                        )
                      );
                      encoder2.index++;
                      lastSentIndex++;
                    } else if (id2 < 0) {
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_ERROR}${deferredId}:${id2}
`
                        )
                      );
                    } else {
                      const values = encoder2.stringified.slice(lastSentIndex + 1).join(",");
                      controller.enqueue(
                        textEncoder.encode(
                          `${TYPE_ERROR}${deferredId}:[${values}]
`
                        )
                      );
                      lastSentIndex = encoder2.stringified.length - 1;
                    }
                  });
                  return processingChain;
                }
              ).finally(() => {
                delete encoder2.deferred[Number(deferredId)];
              })
            );
          }
          await Promise.race(Object.values(encoder2.deferred));
        }
        raceDone();
      }
      await Promise.all(Object.values(encoder2.deferred));
      await processingChain;
      controller.close();
      onComplete == null ? void 0 : onComplete();
    }
  });
  return readable;
}
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
var SingleFetchRedirectSymbol = Symbol("SingleFetchRedirect");
var SINGLE_FETCH_REDIRECT_STATUS = 202;
var NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([100, 101, 204, 205]);
function StreamTransfer({
  context,
  identifier,
  reader,
  textDecoder,
  nonce
}) {
  if (!context.renderMeta || !context.renderMeta.didRenderScripts) {
    return null;
  }
  if (!context.renderMeta.streamCache) {
    context.renderMeta.streamCache = {};
  }
  let { streamCache } = context.renderMeta;
  let promise = streamCache[identifier];
  if (!promise) {
    promise = streamCache[identifier] = reader.read().then((result) => {
      streamCache[identifier].result = {
        done: result.done,
        value: textDecoder.decode(result.value, { stream: true })
      };
    }).catch((e) => {
      streamCache[identifier].error = e;
    });
  }
  if (promise.error) {
    throw promise.error;
  }
  if (promise.result === void 0) {
    throw promise;
  }
  let { done, value } = promise.result;
  let scriptTag = value ? /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `window.__reactRouterContext.streamController.enqueue(${escapeHtml(
          JSON.stringify(value)
        )});`
      }
    }
  ) : null;
  if (done) {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, scriptTag, /* @__PURE__ */ reactExports.createElement(
      "script",
      {
        nonce,
        dangerouslySetInnerHTML: {
          __html: `window.__reactRouterContext.streamController.close();`
        }
      }
    ));
  } else {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, scriptTag, /* @__PURE__ */ reactExports.createElement(reactExports.Suspense, null, /* @__PURE__ */ reactExports.createElement(
      StreamTransfer,
      {
        context,
        identifier: identifier + 1,
        reader,
        textDecoder,
        nonce
      }
    )));
  }
}
function singleFetchUrl(reqUrl, basename2, trailingSlashAware, extension) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (trailingSlashAware) {
    if (url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}_.${extension}`;
    } else {
      url.pathname = `${url.pathname}.${extension}`;
    }
  } else {
    if (url.pathname === "/") {
      url.pathname = `_root.${extension}`;
    } else if (basename2 && stripBasename(url.pathname, basename2) === "/") {
      url.pathname = `${removeTrailingSlash(basename2)}/_root.${extension}`;
    } else {
      url.pathname = `${removeTrailingSlash(url.pathname)}.${extension}`;
    }
  }
  return url;
}
function decodeViaTurboStream(body, global2) {
  return decode(body, {
    plugins: [
      (type, ...rest) => {
        if (type === "SanitizedError") {
          let [name, message, stack] = rest;
          let Constructor = Error;
          if (name && SUPPORTED_ERROR_TYPES.includes(name) && name in global2 && // @ts-expect-error
          typeof global2[name] === "function") {
            Constructor = global2[name];
          }
          let error = new Constructor(message);
          error.stack = stack;
          return { value: error };
        }
        if (type === "ErrorResponse") {
          let [data2, status, statusText] = rest;
          return {
            value: new ErrorResponseImpl(status, statusText, data2)
          };
        }
        if (type === "SingleFetchRedirect") {
          return { value: { [SingleFetchRedirectSymbol]: rest[0] } };
        }
        if (type === "SingleFetchClassInstance") {
          return { value: rest[0] };
        }
        if (type === "SingleFetchFallback") {
          return { value: void 0 };
        }
      }
    ]
  });
}
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    void 0) ;
    window.location.reload();
    return new Promise(() => {
    });
  }
}
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    var _a2;
    let module = routeModules[match.route.id];
    let route = manifest.routes[match.route.id];
    return [
      route && route.css ? route.css.map((href) => ({ rel: "stylesheet", href })) : [],
      ((_a2 = module == null ? void 0 : module.links) == null ? void 0 : _a2.call(module)) || []
    ];
  }).flat(2);
  let preloads = getModuleLinkHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links2 = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links2.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location2, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    var _a2;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_a2 = currentMatches[index].route.path) == null ? void 0 : _a2.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      var _a2;
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location2.pathname + location2.search + location2.hash,
            window.origin
          ),
          currentParams: ((_a2 = currentMatches[0]) == null ? void 0 : _a2.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
function RemixRootDefaultHydrateFallback() {
  return /* @__PURE__ */ reactExports.createElement(BoundaryShell, { title: "Loading...", renderScripts: true }, /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://reactrouter.com/start/framework/route-module#hydratefallback " +
                "for more information."
              );
            `
      }
    }
  ));
}
function groupRoutesByParentId$1(manifest) {
  let routes2 = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes2[parentId]) {
        routes2[parentId] = [];
      }
      routes2[parentId].push(route);
    }
  });
  return routes2;
}
function getRouteComponents(route, routeModule, isSpaMode2) {
  let Component4 = getRouteModuleComponent(routeModule);
  let HydrateFallback = routeModule.HydrateFallback && (!isSpaMode2 || route.id === "root") ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0;
  let ErrorBoundary3 = routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ reactExports.createElement(RemixRootDefaultErrorBoundary, { error: useRouteError() }) : void 0;
  if (route.id === "root" && routeModule.Layout) {
    return {
      ...Component4 ? {
        element: /* @__PURE__ */ reactExports.createElement(routeModule.Layout, null, /* @__PURE__ */ reactExports.createElement(Component4, null))
      } : { Component: Component4 },
      ...ErrorBoundary3 ? {
        errorElement: /* @__PURE__ */ reactExports.createElement(routeModule.Layout, null, /* @__PURE__ */ reactExports.createElement(ErrorBoundary3, null))
      } : { ErrorBoundary: ErrorBoundary3 },
      ...HydrateFallback ? {
        hydrateFallbackElement: /* @__PURE__ */ reactExports.createElement(routeModule.Layout, null, /* @__PURE__ */ reactExports.createElement(HydrateFallback, null))
      } : { HydrateFallback }
    };
  }
  return { Component: Component4, ErrorBoundary: ErrorBoundary3, HydrateFallback };
}
function createServerRoutes(manifest, routeModules, future2, isSpaMode2, parentId = "", routesByParentId = groupRoutesByParentId$1(manifest), spaModeLazyPromise = Promise.resolve({ Component: () => null })) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id];
    invariant2(
      routeModule,
      "No `routeModule` available to create server routes"
    );
    let dataRoute = {
      ...getRouteComponents(route, routeModule, isSpaMode2),
      caseSensitive: route.caseSensitive,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModule.handle,
      // For SPA Mode, all routes are lazy except root.  However we tell the
      // router root is also lazy here too since we don't need a full
      // implementation - we just need a `lazy` prop to tell the RR rendering
      // where to stop which is always at the root route in SPA mode
      lazy: isSpaMode2 ? () => spaModeLazyPromise : void 0,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need middleware/action/shouldRevalidate on these routes since
      // they're for a static render
    };
    let children = createServerRoutes(
      manifest,
      routeModules,
      future2,
      isSpaMode2,
      route.id,
      routesByParentId,
      spaModeLazyPromise
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null) return void 0;
  let isEmptyObject = typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0;
  if (!isEmptyObject) {
    return routeModule.default;
  }
}
function shouldHydrateRouteLoader(routeId, clientLoader, hasLoader, isSpaMode2) {
  return isSpaMode2 && routeId !== "root" || clientLoader != null && (clientLoader.hydrate === true || hasLoader !== true);
}
var URL_LIMIT = 7680;
function isFogOfWarEnabled(routeDiscovery2, ssr2) {
  return routeDiscovery2.mode === "lazy" && ssr2 === true;
}
function getPartialManifest({ sri, ...manifest }, router) {
  let routeIds = new Set(router.state.matches.map((m) => m.route.id));
  let segments = router.state.location.pathname.split("/").filter(Boolean);
  let paths = ["/"];
  segments.pop();
  while (segments.length > 0) {
    paths.push(`/${segments.join("/")}`);
    segments.pop();
  }
  paths.forEach((path) => {
    let matches = matchRoutesImpl(
      router.routes,
      path,
      router.basename || "/",
      false,
      router.branches
    );
    if (matches) {
      matches.forEach((m) => routeIds.add(m.route.id));
    }
  });
  let initialRoutes = [...routeIds].reduce(
    (acc, id) => Object.assign(acc, { [id]: manifest.routes[id] }),
    {}
  );
  return {
    ...manifest,
    routes: initialRoutes,
    sri: sri ? true : void 0
  };
}
function getManifestPath(_manifestPath, basename2) {
  let manifestPath = _manifestPath || "/__manifest";
  return basename2 == null ? manifestPath : joinPaths([basename2, manifestPath]);
}
function useDataRouterContext2() {
  let context = reactExports.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = reactExports.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = reactExports.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = reactExports.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = reactExports.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = reactExports.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = reactExports.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry2) => {
          setShouldPrefetch(entry2.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  reactExports.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function getActiveMatches(matches, errors, isSpaMode2) {
  if (isSpaMode2 && !isHydrated) {
    return [matches[0]];
  }
  if (errors) {
    let errorIdx = matches.findIndex((m) => errors[m.route.id] !== void 0);
    return matches.slice(0, errorIdx + 1);
  }
  return matches;
}
var CRITICAL_CSS_DATA_ATTRIBUTE = "data-react-router-critical-css";
function Links({ nonce, crossOrigin }) {
  let { isSpaMode: isSpaMode2, manifest, routeModules, criticalCss } = useFrameworkContext();
  let { errors, matches: routerMatches } = useDataRouterStateContext();
  let matches = getActiveMatches(routerMatches, errors, isSpaMode2);
  let keyedLinks = reactExports.useMemo(
    () => getKeyedLinksForMatches(matches, routeModules, manifest),
    [matches, routeModules, manifest]
  );
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, typeof criticalCss === "string" ? /* @__PURE__ */ reactExports.createElement(
    "style",
    {
      ...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
      nonce,
      dangerouslySetInnerHTML: { __html: criticalCss }
    }
  ) : null, typeof criticalCss === "object" ? /* @__PURE__ */ reactExports.createElement(
    "link",
    {
      ...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
      rel: "stylesheet",
      href: criticalCss.href,
      nonce,
      crossOrigin
    }
  ) : null, keyedLinks.map(
    ({ key, link }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ reactExports.createElement(
      PrefetchPageLinks,
      {
        key,
        nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? crossOrigin
      }
    ) : /* @__PURE__ */ reactExports.createElement(
      "link",
      {
        key,
        nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? crossOrigin
      }
    )
  ));
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let rsc = useIsRSCRouterContext();
  let { router } = useDataRouterContext2();
  let matches = reactExports.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  if (rsc) {
    return /* @__PURE__ */ reactExports.createElement(RSCPrefetchPageLinksImpl, { page, matches, ...linkProps });
  }
  return /* @__PURE__ */ reactExports.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links2) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links2);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function RSCPrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location2 = useLocation();
  let { future: future2 } = useFrameworkContext();
  let { basename: basename2 } = useDataRouterContext2();
  let dataHrefs = reactExports.useMemo(() => {
    if (page === location2.pathname + location2.search + location2.hash) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename2,
      future2.v8_trailingSlashAwareDataRequests,
      "rsc"
    );
    let hasSomeRoutesWithShouldRevalidate = false;
    let targetRoutes = [];
    for (let match of nextMatches) {
      if (typeof match.route.shouldRevalidate === "function") {
        hasSomeRoutesWithShouldRevalidate = true;
      } else {
        targetRoutes.push(match.route.id);
      }
    }
    if (hasSomeRoutesWithShouldRevalidate && targetRoutes.length > 0) {
      url.searchParams.set("_routes", targetRoutes.join(","));
    }
    return [url.pathname + url.search];
  }, [
    basename2,
    future2.v8_trailingSlashAwareDataRequests,
    page,
    location2,
    nextMatches
  ]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })));
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location2 = useLocation();
  let { future: future2, manifest, routeModules } = useFrameworkContext();
  let { basename: basename2 } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location2,
      "data"
    ),
    [page, nextMatches, matches, manifest, location2]
  );
  let newMatchesForAssets = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location2,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location2]
  );
  let dataHrefs = reactExports.useMemo(() => {
    if (page === location2.pathname + location2.search + location2.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      var _a2;
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && ((_a2 = routeModules[m.route.id]) == null ? void 0 : _a2.shouldRevalidate)) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename2,
      future2.v8_trailingSlashAwareDataRequests,
      "data"
    );
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename2,
    future2.v8_trailingSlashAwareDataRequests,
    loaderData,
    location2,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = reactExports.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ reactExports.createElement(
      "link",
      {
        key,
        nonce: linkProps.nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
      }
    )
  )));
}
function Meta() {
  let { isSpaMode: isSpaMode2, routeModules } = useFrameworkContext();
  let {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext();
  let location2 = useLocation();
  let _matches = getActiveMatches(routerMatches, errors, isSpaMode2);
  let error = null;
  if (errors) {
    error = errors[_matches[_matches.length - 1].route.id];
  }
  let meta2 = [];
  let leafMeta = null;
  let matches = [];
  for (let i2 = 0; i2 < _matches.length; i2++) {
    let _match = _matches[i2];
    let routeId = _match.route.id;
    let data2 = loaderData[routeId];
    let params = _match.params;
    let routeModule = routeModules[routeId];
    let routeMeta = [];
    let match = {
      id: routeId,
      data: data2,
      loaderData: data2,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    matches[i2] = match;
    if (routeModule == null ? void 0 : routeModule.meta) {
      routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
        data: data2,
        loaderData: data2,
        params,
        location: location2,
        matches,
        error
      }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta;
    } else if (leafMeta) {
      routeMeta = [...leafMeta];
    }
    routeMeta = routeMeta || [];
    if (!Array.isArray(routeMeta)) {
      throw new Error(
        "The route at " + _match.route.path + " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://reactrouter.com/start/framework/route-module#meta"
      );
    }
    match.meta = routeMeta;
    matches[i2] = match;
    meta2 = [...routeMeta];
    leafMeta = meta2;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, meta2.flat().map((metaProps) => {
    if (!metaProps) {
      return null;
    }
    if ("tagName" in metaProps) {
      let { tagName, ...rest } = metaProps;
      if (!isValidMetaTag(tagName)) {
        console.warn(
          `A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`
        );
        return null;
      }
      let Comp = tagName;
      return /* @__PURE__ */ reactExports.createElement(Comp, { key: JSON.stringify(rest), ...rest });
    }
    if ("title" in metaProps) {
      return /* @__PURE__ */ reactExports.createElement("title", { key: "title" }, String(metaProps.title));
    }
    if ("charset" in metaProps) {
      metaProps.charSet ?? (metaProps.charSet = metaProps.charset);
      delete metaProps.charset;
    }
    if ("charSet" in metaProps && metaProps.charSet != null) {
      return typeof metaProps.charSet === "string" ? /* @__PURE__ */ reactExports.createElement("meta", { key: "charSet", charSet: metaProps.charSet }) : null;
    }
    if ("script:ld+json" in metaProps) {
      try {
        let json = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ reactExports.createElement(
          "script",
          {
            key: `script:ld+json:${json}`,
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: escapeHtml(json) }
          }
        );
      } catch (e) {
        return null;
      }
    }
    return /* @__PURE__ */ reactExports.createElement("meta", { key: JSON.stringify(metaProps), ...metaProps });
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName === "string" && /^(meta|link)$/.test(tagName);
}
var isHydrated = false;
function setIsHydrated() {
  isHydrated = true;
}
function Scripts(scriptProps) {
  let {
    manifest,
    serverHandoffString,
    isSpaMode: isSpaMode2,
    renderMeta,
    routeDiscovery: routeDiscovery2,
    ssr: ssr2
  } = useFrameworkContext();
  let { router, static: isStatic, staticContext } = useDataRouterContext2();
  let { matches: routerMatches } = useDataRouterStateContext();
  let isRSCRouterContext = useIsRSCRouterContext();
  let enableFogOfWar = isFogOfWarEnabled(routeDiscovery2, ssr2);
  if (renderMeta) {
    renderMeta.didRenderScripts = true;
  }
  let matches = getActiveMatches(routerMatches, null, isSpaMode2);
  reactExports.useEffect(() => {
    setIsHydrated();
  }, []);
  let initialScripts = reactExports.useMemo(() => {
    var _a2;
    if (isRSCRouterContext) {
      return null;
    }
    let streamScript = "window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());";
    let contextScript = staticContext ? `window.__reactRouterContext = ${serverHandoffString};${streamScript}` : " ";
    let routeModulesScript = !isStatic ? " " : `${((_a2 = manifest.hmr) == null ? void 0 : _a2.runtime) ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}${!enableFogOfWar ? `import ${JSON.stringify(manifest.url)}` : ""};
${matches.map((match, routeIndex) => {
      let routeVarName = `route${routeIndex}`;
      let manifestEntry = manifest.routes[match.route.id];
      invariant2(manifestEntry, `Route ${match.route.id} not found in manifest`);
      let {
        clientActionModule,
        clientLoaderModule,
        clientMiddlewareModule,
        hydrateFallbackModule,
        module
      } = manifestEntry;
      let chunks = [
        ...clientActionModule ? [
          {
            module: clientActionModule,
            varName: `${routeVarName}_clientAction`
          }
        ] : [],
        ...clientLoaderModule ? [
          {
            module: clientLoaderModule,
            varName: `${routeVarName}_clientLoader`
          }
        ] : [],
        ...clientMiddlewareModule ? [
          {
            module: clientMiddlewareModule,
            varName: `${routeVarName}_clientMiddleware`
          }
        ] : [],
        ...hydrateFallbackModule ? [
          {
            module: hydrateFallbackModule,
            varName: `${routeVarName}_HydrateFallback`
          }
        ] : [],
        { module, varName: `${routeVarName}_main` }
      ];
      if (chunks.length === 1) {
        return `import * as ${routeVarName} from ${JSON.stringify(module)};`;
      }
      let chunkImportsSnippet = chunks.map((chunk) => `import * as ${chunk.varName} from "${chunk.module}";`).join("\n");
      let mergedChunksSnippet = `const ${routeVarName} = {${chunks.map((chunk) => `...${chunk.varName}`).join(",")}};`;
      return [chunkImportsSnippet, mergedChunksSnippet].join("\n");
    }).join("\n")}
  ${enableFogOfWar ? (
      // Inline a minimal manifest with the SSR matches
      `window.__reactRouterManifest = ${JSON.stringify(
        getPartialManifest(manifest, router),
        null,
        2
      )};`
    ) : ""}
  window.__reactRouterRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(
      "script",
      {
        ...scriptProps,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: { __html: contextScript },
        type: void 0
      }
    ), /* @__PURE__ */ reactExports.createElement(
      "script",
      {
        ...scriptProps,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: { __html: routeModulesScript },
        type: "module",
        async: true
      }
    ));
  }, []);
  let preloads = isHydrated || isRSCRouterContext ? [] : [
    // Dedupe through a Set
    ...new Set(
      manifest.entry.imports.concat(
        getModuleLinkHrefs(matches, manifest, {
          includeHydrateFallback: true
        })
      )
    )
  ];
  let sri = typeof manifest.sri === "object" ? manifest.sri : {};
  warnOnce$1(
    !isRSCRouterContext,
    "The <Scripts /> element is a no-op when using RSC and can be safely removed."
  );
  return isHydrated || isRSCRouterContext ? null : /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, typeof manifest.sri === "object" ? /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      ...scriptProps,
      "rr-importmap": "",
      type: "importmap",
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: JSON.stringify({
          integrity: sri
        })
      }
    }
  ) : null, !enableFogOfWar ? /* @__PURE__ */ reactExports.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.url,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[manifest.url],
      nonce: scriptProps.nonce,
      suppressHydrationWarning: true
    }
  ) : null, /* @__PURE__ */ reactExports.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.entry.module,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[manifest.entry.module],
      nonce: scriptProps.nonce,
      suppressHydrationWarning: true
    }
  ), preloads.map((path) => /* @__PURE__ */ reactExports.createElement(
    "link",
    {
      key: path,
      rel: "modulepreload",
      href: path,
      crossOrigin: scriptProps.crossOrigin,
      integrity: sri[path],
      nonce: scriptProps.nonce,
      suppressHydrationWarning: true
    }
  )), initialScripts);
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var RemixErrorBoundary = class extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { error: props.error || null, location: props.location };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return { error: props.error || null, location: props.location };
    }
    return { error: props.error || state.error, location: state.location };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ reactExports.createElement(
        RemixRootDefaultErrorBoundary,
        {
          error: this.state.error,
          isOutsideRemixApp: true
        }
      );
    } else {
      return this.props.children;
    }
  }
};
function RemixRootDefaultErrorBoundary({
  error,
  isOutsideRemixApp
}) {
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."
        );
      `
      }
    }
  );
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ reactExports.createElement(BoundaryShell, { title: "Unhandled Thrown Response!" }, /* @__PURE__ */ reactExports.createElement("h1", { style: { fontSize: "24px" } }, error.status, " ", error.statusText), heyDeveloper);
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ reactExports.createElement(
    BoundaryShell,
    {
      title: "Application Error!",
      isOutsideRemixApp
    },
    /* @__PURE__ */ reactExports.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
    /* @__PURE__ */ reactExports.createElement(
      "pre",
      {
        style: {
          padding: "2rem",
          background: "hsla(10, 50%, 50%, 0.1)",
          color: "red",
          overflow: "auto"
        }
      },
      errorInstance.stack
    ),
    heyDeveloper
  );
}
function BoundaryShell({
  title,
  renderScripts,
  isOutsideRemixApp,
  children
}) {
  var _a2;
  let { routeModules } = useFrameworkContext();
  if (((_a2 = routeModules.root) == null ? void 0 : _a2.Layout) && !isOutsideRemixApp) {
    return children;
  }
  return /* @__PURE__ */ reactExports.createElement("html", { lang: "en" }, /* @__PURE__ */ reactExports.createElement("head", null, /* @__PURE__ */ reactExports.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ reactExports.createElement(
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover"
    }
  ), /* @__PURE__ */ reactExports.createElement("title", null, title)), /* @__PURE__ */ reactExports.createElement("body", null, /* @__PURE__ */ reactExports.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, children, renderScripts ? /* @__PURE__ */ reactExports.createElement(Scripts, null) : null)));
}
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser2) {
    window.__reactRouterVersion = // @ts-expect-error
    "7.17.0";
  }
} catch (e) {
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = reactExports.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    mask,
    state,
    target,
    to: to2,
    preventScrollReset,
    viewTransition,
    defaultShouldRevalidate,
    ...rest
  }, forwardedRef) {
    let { basename: basename2, navigator: navigator2, useTransitions } = reactExports.useContext(NavigationContext);
    let isAbsolute = typeof to2 === "string" && ABSOLUTE_URL_REGEX2.test(to2);
    let parsed = parseToInfo(to2, basename2);
    to2 = parsed.to;
    let href = useHref(to2, { relative });
    let location2 = useLocation();
    let maskedHref = null;
    if (mask) {
      let resolved = resolveTo(
        mask,
        [],
        location2.mask ? location2.mask.pathname : "/",
        true
      );
      if (basename2 !== "/") {
        resolved.pathname = resolved.pathname === "/" ? basename2 : joinPaths([basename2, resolved.pathname]);
      }
      maskedHref = navigator2.createHref(resolved);
    }
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to2, {
      replace: replace2,
      mask,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition,
      defaultShouldRevalidate,
      useTransitions
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let isSpaLink = !(parsed.isExternal || reloadDocument);
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ reactExports.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
          onClick: isSpaLink ? handleClick : onClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, link, /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = reactExports.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to: to2,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to2, { relative: rest.relative });
    let location2 = useLocation();
    let routerState = reactExports.useContext(DataRouterStateContext);
    let { navigator: navigator2, basename: basename2 } = reactExports.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location2.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename2) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename2) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ reactExports.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to: to2,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = reactExports.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action: action2,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    defaultShouldRevalidate,
    ...props
  }, forwardedRef) => {
    let { useTransitions } = reactExports.useContext(NavigationContext);
    let submit = useSubmit();
    let formAction = useFormAction(action2, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action2 === "string" && ABSOLUTE_URL_REGEX2.test(action2);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
      let doSubmit = () => submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition,
        defaultShouldRevalidate
      });
      if (useTransitions && navigate !== false) {
        reactExports.startTransition(() => doSubmit());
      } else {
        doSubmit();
      }
    };
    return /* @__PURE__ */ reactExports.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function ScrollRestoration({
  getKey,
  storageKey,
  ...props
}) {
  let remixContext = reactExports.useContext(FrameworkContext);
  let { basename: basename2 } = reactExports.useContext(NavigationContext);
  let location2 = useLocation();
  let matches = useMatches();
  useScrollRestoration({ getKey, storageKey });
  let ssrKey = reactExports.useMemo(
    () => {
      if (!remixContext || !getKey) return null;
      let userKey = getScrollRestorationKey(
        location2,
        matches,
        basename2,
        getKey
      );
      return userKey !== location2.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (!remixContext || remixContext.isSpaMode) {
    return null;
  }
  let restoreScroll = ((storageKey2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2);
      window.history.replaceState({ key }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(storageKey2);
    }
  }).toString();
  return /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      ...props,
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: `(${restoreScroll})(${escapeHtml(
          JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY)
        )}, ${escapeHtml(JSON.stringify(ssrKey))})`
      }
    }
  );
}
ScrollRestoration.displayName = "ScrollRestoration";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant$1(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useDataRouterState2(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  invariant$1(state, getDataRouterConsoleError2(hookName));
  return state;
}
function useLinkClickHandler(to2, {
  target,
  replace: replaceProp,
  mask,
  state,
  preventScrollReset,
  relative,
  viewTransition,
  defaultShouldRevalidate,
  useTransitions
} = {}) {
  let navigate = useNavigate();
  let location2 = useLocation();
  let path = useResolvedPath(to2, { relative });
  return reactExports.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location2) === createPath(path);
        let doNavigate = () => navigate(to2, {
          replace: replace2,
          mask,
          state,
          preventScrollReset,
          relative,
          viewTransition,
          defaultShouldRevalidate
        });
        if (useTransitions) {
          reactExports.startTransition(() => doNavigate());
        } else {
          doNavigate();
        }
      }
    },
    [
      location2,
      navigate,
      path,
      replaceProp,
      mask,
      state,
      target,
      to2,
      preventScrollReset,
      relative,
      viewTransition,
      defaultShouldRevalidate,
      useTransitions
    ]
  );
}
function useSearchParams(defaultInit) {
  warning(
    typeof URLSearchParams !== "undefined",
    `You cannot use the \`useSearchParams\` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.`
  );
  let defaultSearchParamsRef = reactExports.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = reactExports.useRef(false);
  let location2 = useLocation();
  let searchParams = reactExports.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      getSearchParamsForLocation(
        location2.search,
        hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current
      )
    ),
    [location2.search]
  );
  let navigate = useNavigate();
  let setSearchParams = reactExports.useCallback(
    (nextInit, navigateOptions) => {
      const newSearchParams = createSearchParams(
        typeof nextInit === "function" ? nextInit(new URLSearchParams(searchParams)) : nextInit
      );
      hasSetSearchParamsRef.current = true;
      navigate("?" + newSearchParams, navigateOptions);
    },
    [navigate, searchParams]
  );
  return [searchParams, setSearchParams];
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3(
    "useSubmit"
    /* UseSubmit */
  );
  let { basename: basename2 } = reactExports.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  let routerFetch = router.fetch;
  let routerNavigate = router.navigate;
  return reactExports.useCallback(
    async (target, options = {}) => {
      let { action: action2, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename2
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await routerFetch(key, currentRouteId, options.action || action2, {
          defaultShouldRevalidate: options.defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await routerNavigate(options.action || action2, {
          defaultShouldRevalidate: options.defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [routerFetch, routerNavigate, basename2, currentRouteId]
  );
}
function useFormAction(action2, { relative } = {}) {
  let { basename: basename2 } = reactExports.useContext(NavigationContext);
  let routeContext = reactExports.useContext(RouteContext);
  invariant$1(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action2 ? action2 : ".", { relative }) };
  let location2 = useLocation();
  if (action2 == null) {
    path.search = location2.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action2 || action2 === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename2 !== "/") {
    path.pathname = path.pathname === "/" ? basename2 : joinPaths([basename2, path.pathname]);
  }
  return createPath(path);
}
function useFetcher({
  key
} = {}) {
  var _a2;
  let { router } = useDataRouterContext3(
    "useFetcher"
    /* UseFetcher */
  );
  let state = useDataRouterState2(
    "useFetcher"
    /* UseFetcher */
  );
  let fetcherData = reactExports.useContext(FetchersContext);
  let route = reactExports.useContext(RouteContext);
  let routeId = (_a2 = route.matches[route.matches.length - 1]) == null ? void 0 : _a2.route.id;
  invariant$1(fetcherData, `useFetcher must be used inside a FetchersContext`);
  invariant$1(route, `useFetcher must be used inside a RouteContext`);
  invariant$1(
    routeId != null,
    `useFetcher can only be used on routes that contain a unique "id"`
  );
  let defaultKey = reactExports.useId();
  let [fetcherKey, setFetcherKey] = reactExports.useState(key || defaultKey);
  if (key && key !== fetcherKey) {
    setFetcherKey(key);
  }
  let { deleteFetcher, getFetcher, resetFetcher, fetch: routerFetch } = router;
  reactExports.useEffect(() => {
    getFetcher(fetcherKey);
    return () => deleteFetcher(fetcherKey);
  }, [deleteFetcher, getFetcher, fetcherKey]);
  let load = reactExports.useCallback(
    async (href, opts) => {
      invariant$1(routeId, "No routeId available for fetcher.load()");
      await routerFetch(fetcherKey, routeId, href, opts);
    },
    [fetcherKey, routeId, routerFetch]
  );
  let submitImpl = useSubmit();
  let submit = reactExports.useCallback(
    async (target, opts) => {
      await submitImpl(target, {
        ...opts,
        navigate: false,
        fetcherKey
      });
    },
    [fetcherKey, submitImpl]
  );
  let reset = reactExports.useCallback(
    (opts) => resetFetcher(fetcherKey, opts),
    [resetFetcher, fetcherKey]
  );
  let FetcherForm = reactExports.useMemo(() => {
    let FetcherForm2 = reactExports.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ reactExports.createElement(Form, { ...props, navigate: false, fetcherKey, ref });
      }
    );
    FetcherForm2.displayName = "fetcher.Form";
    return FetcherForm2;
  }, [fetcherKey]);
  let fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER;
  let data2 = fetcherData.get(fetcherKey);
  let fetcherWithComponents = reactExports.useMemo(
    () => ({
      Form: FetcherForm,
      submit,
      load,
      reset,
      ...fetcher,
      data: data2
    }),
    [FetcherForm, submit, load, reset, fetcher, data2]
  );
  return fetcherWithComponents;
}
function useFetchers() {
  let state = useDataRouterState2(
    "useFetchers"
    /* UseFetchers */
  );
  return reactExports.useMemo(
    () => Array.from(state.fetchers.entries()).map(([key, fetcher]) => ({
      ...fetcher,
      key
    })),
    [state.fetchers]
  );
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function getScrollRestorationKey(location2, matches, basename2, getKey) {
  let key = null;
  if (getKey) {
    if (basename2 !== "/") {
      key = getKey(
        {
          ...location2,
          pathname: stripBasename(location2.pathname, basename2) || location2.pathname
        },
        matches
      );
    } else {
      key = getKey(location2, matches);
    }
  }
  if (key == null) {
    key = location2.key;
  }
  return key;
}
function useScrollRestoration({
  getKey,
  storageKey
} = {}) {
  let { router } = useDataRouterContext3(
    "useScrollRestoration"
    /* UseScrollRestoration */
  );
  let { restoreScrollPosition, preventScrollReset } = useDataRouterState2(
    "useScrollRestoration"
    /* UseScrollRestoration */
  );
  let { basename: basename2 } = reactExports.useContext(NavigationContext);
  let location2 = useLocation();
  let matches = useMatches();
  let navigation = useNavigation();
  reactExports.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  usePageHide(
    reactExports.useCallback(() => {
      if (navigation.state === "idle") {
        let key = getScrollRestorationKey(location2, matches, basename2, getKey);
        savedScrollPositions[key] = window.scrollY;
      }
      try {
        sessionStorage.setItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY,
          JSON.stringify(savedScrollPositions)
        );
      } catch (error) {
        warning(
          false,
          `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`
        );
      }
      window.history.scrollRestoration = "auto";
    }, [navigation.state, getKey, basename2, location2, matches, storageKey])
  );
  if (typeof document !== "undefined") {
    reactExports.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY
        );
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
      }
    }, [storageKey]);
    reactExports.useLayoutEffect(() => {
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(
        savedScrollPositions,
        () => window.scrollY,
        getKey ? (location22, matches2) => getScrollRestorationKey(location22, matches2, basename2, getKey) : void 0
      );
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename2, getKey]);
    reactExports.useLayoutEffect(() => {
      if (restoreScrollPosition === false) {
        return;
      }
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      try {
        if (location2.hash) {
          let el = document.getElementById(
            decodeURIComponent(location2.hash.slice(1))
          );
          if (el) {
            el.scrollIntoView();
            return;
          }
        }
      } catch {
        warning(
          false,
          `"${location2.hash.slice(
            1
          )}" is not a decodable element ID. The view will not scroll to it.`
        );
      }
      if (preventScrollReset === true) {
        return;
      }
      window.scrollTo(0, 0);
    }, [location2, restoreScrollPosition, preventScrollReset]);
  }
}
function usePageHide(callback, options) {
  let { capture } = {};
  reactExports.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function useViewTransitionState(to2, { relative } = {}) {
  let vtContext = reactExports.useContext(ViewTransitionContext);
  invariant$1(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: basename2 } = useDataRouterContext3(
    "useViewTransitionState"
    /* useViewTransitionState */
  );
  let path = useResolvedPath(to2, { relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename2) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename2) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
function StaticRouterProvider({
  context,
  router,
  hydrate: hydrate2 = true,
  nonce
}) {
  invariant$1(
    router && context,
    "You must provide `router` and `context` to <StaticRouterProvider>"
  );
  let dataRouterContext = {
    router,
    navigator: getStatelessNavigator(),
    static: true,
    staticContext: context,
    basename: context.basename || "/"
  };
  let fetchersContext = /* @__PURE__ */ new Map();
  let hydrateScript = "";
  if (hydrate2 !== false) {
    let data2 = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors$1(context.errors)
    };
    let json = escapeHtml(JSON.stringify(JSON.stringify(data2)));
    hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json});`;
  }
  let { state } = dataRouterContext.router;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ reactExports.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ reactExports.createElement(FetchersContext.Provider, { value: fetchersContext }, /* @__PURE__ */ reactExports.createElement(ViewTransitionContext.Provider, { value: { isTransitioning: false } }, /* @__PURE__ */ reactExports.createElement(
    Router,
    {
      basename: dataRouterContext.basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator: dataRouterContext.navigator,
      static: dataRouterContext.static,
      useTransitions: false
    },
    /* @__PURE__ */ reactExports.createElement(
      DataRoutes2,
      {
        manifest: router.manifest,
        routes: router.routes,
        future: router.future,
        state,
        isStatic: true
      }
    )
  ))))), hydrateScript ? /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      suppressHydrationWarning: true,
      nonce,
      dangerouslySetInnerHTML: { __html: hydrateScript }
    }
  ) : null);
}
function serializeErrors$1(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.
        ...val.name !== "Error" ? {
          __subType: val.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to2) {
      throw new Error(
        `You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to2)})\` somewhere in your app.`
      );
    },
    replace(to2) {
      throw new Error(
        `You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to2)}, { replace: true })\` somewhere in your app.`
      );
    },
    go(delta) {
      throw new Error(
        `You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`
      );
    },
    back() {
      throw new Error(
        `You cannot use navigator.back() on the server because it is a stateless environment.`
      );
    },
    forward() {
      throw new Error(
        `You cannot use navigator.forward() on the server because it is a stateless environment.`
      );
    }
  };
}
function createStaticRouter(routes2, context, opts = {}) {
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(
    routes2,
    mapRouteProperties,
    void 0,
    manifest
  );
  let matches = context.matches.map((match) => {
    let route = manifest[match.route.id] || match.route;
    return {
      ...match,
      route
    };
  });
  let msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
  return {
    get basename() {
      return context.basename;
    },
    get future() {
      return {
        v8_middleware: false,
        v8_passThroughRequests: false,
        v8_trailingSlashAwareDataRequests: false,
        ...opts == null ? void 0 : opts.future
      };
    },
    get state() {
      return {
        historyAction: "POP",
        location: context.location,
        matches,
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: context.errors,
        initialized: true,
        renderFallback: false,
        navigation: IDLE_NAVIGATION,
        restoreScrollPosition: null,
        preventScrollReset: false,
        revalidation: "idle",
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
    },
    get routes() {
      return dataRoutes;
    },
    get branches() {
      return opts.branches;
    },
    get manifest() {
      return manifest;
    },
    get window() {
      return void 0;
    },
    initialize() {
      throw msg("initialize");
    },
    subscribe() {
      throw msg("subscribe");
    },
    enableScrollRestoration() {
      throw msg("enableScrollRestoration");
    },
    navigate() {
      throw msg("navigate");
    },
    fetch() {
      throw msg("fetch");
    },
    revalidate() {
      throw msg("revalidate");
    },
    createHref,
    encodeLocation,
    getFetcher() {
      return IDLE_FETCHER;
    },
    deleteFetcher() {
      throw msg("deleteFetcher");
    },
    resetFetcher() {
      throw msg("resetFetcher");
    },
    dispose() {
      throw msg("dispose");
    },
    getBlocker() {
      return IDLE_BLOCKER;
    },
    deleteBlocker() {
      throw msg("deleteBlocker");
    },
    patchRoutes() {
      throw msg("patchRoutes");
    },
    _internalFetchControllers: /* @__PURE__ */ new Map(),
    _internalSetRoutes() {
      throw msg("_internalSetRoutes");
    },
    _internalSetStateDoNotUseOrYouWillBreakYourApp() {
      throw msg("_internalSetStateDoNotUseOrYouWillBreakYourApp");
    }
  };
}
function createHref(to2) {
  return typeof to2 === "string" ? to2 : createPath(to2);
}
function encodeLocation(to2) {
  let href = typeof to2 === "string" ? to2 : createPath(to2);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX3.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
var ABSOLUTE_URL_REGEX3 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var dist = {};
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  Object.defineProperty(dist, "__esModule", { value: true });
  dist.parseCookie = parseCookie;
  dist.parse = parseCookie;
  dist.stringifyCookie = stringifyCookie;
  dist.stringifySetCookie = stringifySetCookie;
  dist.serialize = stringifySetCookie;
  dist.parseSetCookie = parseSetCookie;
  dist.stringifySetCookie = stringifySetCookie;
  dist.serialize = stringifySetCookie;
  const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
  const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
  const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
  const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
  const maxAgeRegExp = /^-?\d+$/;
  const __toString = Object.prototype.toString;
  const NullObject = /* @__PURE__ */ (() => {
    const C = function() {
    };
    C.prototype = /* @__PURE__ */ Object.create(null);
    return C;
  })();
  function parseCookie(str, options) {
    const obj = new NullObject();
    const len = str.length;
    if (len < 2)
      return obj;
    const dec = (options == null ? void 0 : options.decode) || decode2;
    let index = 0;
    do {
      const eqIdx = eqIndex(str, index, len);
      if (eqIdx === -1)
        break;
      const endIdx = endIndex(str, index, len);
      if (eqIdx > endIdx) {
        index = str.lastIndexOf(";", eqIdx - 1) + 1;
        continue;
      }
      const key = valueSlice(str, index, eqIdx);
      if (obj[key] === void 0) {
        obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
      }
      index = endIdx + 1;
    } while (index < len);
    return obj;
  }
  function stringifyCookie(cookie, options) {
    const enc = (options == null ? void 0 : options.encode) || encodeURIComponent;
    const cookieStrings = [];
    for (const name of Object.keys(cookie)) {
      const val = cookie[name];
      if (val === void 0)
        continue;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`cookie name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`cookie val is invalid: ${val}`);
      }
      cookieStrings.push(`${name}=${value}`);
    }
    return cookieStrings.join("; ");
  }
  function stringifySetCookie(_name, _val, _opts) {
    const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
    const options = typeof _val === "object" ? _val : _opts;
    const enc = (options == null ? void 0 : options.encode) || encodeURIComponent;
    if (!cookieNameRegExp.test(cookie.name)) {
      throw new TypeError(`argument name is invalid: ${cookie.name}`);
    }
    const value = cookie.value ? enc(cookie.value) : "";
    if (!cookieValueRegExp.test(value)) {
      throw new TypeError(`argument val is invalid: ${cookie.value}`);
    }
    let str = cookie.name + "=" + value;
    if (cookie.maxAge !== void 0) {
      if (!Number.isInteger(cookie.maxAge)) {
        throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
      }
      str += "; Max-Age=" + cookie.maxAge;
    }
    if (cookie.domain) {
      if (!domainValueRegExp.test(cookie.domain)) {
        throw new TypeError(`option domain is invalid: ${cookie.domain}`);
      }
      str += "; Domain=" + cookie.domain;
    }
    if (cookie.path) {
      if (!pathValueRegExp.test(cookie.path)) {
        throw new TypeError(`option path is invalid: ${cookie.path}`);
      }
      str += "; Path=" + cookie.path;
    }
    if (cookie.expires) {
      if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
        throw new TypeError(`option expires is invalid: ${cookie.expires}`);
      }
      str += "; Expires=" + cookie.expires.toUTCString();
    }
    if (cookie.httpOnly) {
      str += "; HttpOnly";
    }
    if (cookie.secure) {
      str += "; Secure";
    }
    if (cookie.partitioned) {
      str += "; Partitioned";
    }
    if (cookie.priority) {
      const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
      switch (priority) {
        case "low":
          str += "; Priority=Low";
          break;
        case "medium":
          str += "; Priority=Medium";
          break;
        case "high":
          str += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${cookie.priority}`);
      }
    }
    if (cookie.sameSite) {
      const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
      switch (sameSite) {
        case true:
        case "strict":
          str += "; SameSite=Strict";
          break;
        case "lax":
          str += "; SameSite=Lax";
          break;
        case "none":
          str += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
      }
    }
    return str;
  }
  function parseSetCookie(str, options) {
    const dec = (options == null ? void 0 : options.decode) || decode2;
    const len = str.length;
    const endIdx = endIndex(str, 0, len);
    const eqIdx = eqIndex(str, 0, endIdx);
    const setCookie2 = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
      name: valueSlice(str, 0, eqIdx),
      value: dec(valueSlice(str, eqIdx + 1, endIdx))
    };
    let index = endIdx + 1;
    while (index < len) {
      const endIdx2 = endIndex(str, index, len);
      const eqIdx2 = eqIndex(str, index, endIdx2);
      const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
      const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
      switch (attr.toLowerCase()) {
        case "httponly":
          setCookie2.httpOnly = true;
          break;
        case "secure":
          setCookie2.secure = true;
          break;
        case "partitioned":
          setCookie2.partitioned = true;
          break;
        case "domain":
          setCookie2.domain = val;
          break;
        case "path":
          setCookie2.path = val;
          break;
        case "max-age":
          if (val && maxAgeRegExp.test(val))
            setCookie2.maxAge = Number(val);
          break;
        case "expires":
          if (!val)
            break;
          const date = new Date(val);
          if (Number.isFinite(date.valueOf()))
            setCookie2.expires = date;
          break;
        case "priority":
          if (!val)
            break;
          const priority = val.toLowerCase();
          if (priority === "low" || priority === "medium" || priority === "high") {
            setCookie2.priority = priority;
          }
          break;
        case "samesite":
          if (!val)
            break;
          const sameSite = val.toLowerCase();
          if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
            setCookie2.sameSite = sameSite;
          }
          break;
      }
      index = endIdx2 + 1;
    }
    return setCookie2;
  }
  function endIndex(str, min, len) {
    const index = str.indexOf(";", min);
    return index === -1 ? len : index;
  }
  function eqIndex(str, min, max) {
    const index = str.indexOf("=", min);
    return index < max ? index : -1;
  }
  function valueSlice(str, min, max) {
    let start = min;
    let end = max;
    do {
      const code = str.charCodeAt(start);
      if (code !== 32 && code !== 9)
        break;
    } while (++start < end);
    while (end > start) {
      const code = str.charCodeAt(end - 1);
      if (code !== 32 && code !== 9)
        break;
      end--;
    }
    return str.slice(start, end);
  }
  function decode2(str) {
    if (str.indexOf("%") === -1)
      return str;
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }
  function isDate(val) {
    return __toString.call(val) === "[object Date]";
  }
  return dist;
}
var distExports = /* @__PURE__ */ requireDist();
var setCookie$1 = { exports: {} };
var hasRequiredSetCookie;
function requireSetCookie() {
  if (hasRequiredSetCookie) return setCookie$1.exports;
  hasRequiredSetCookie = 1;
  var defaultParseOptions = {
    decodeValues: true,
    map: false,
    silent: false
  };
  function isForbiddenKey(key) {
    return typeof key !== "string" || key in {};
  }
  function createNullObj() {
    return /* @__PURE__ */ Object.create(null);
  }
  function isNonEmptyString2(str) {
    return typeof str === "string" && !!str.trim();
  }
  function parseString(setCookieValue, options) {
    var parts = setCookieValue.split(";").filter(isNonEmptyString2);
    var nameValuePairStr = parts.shift();
    var parsed = parseNameValuePair(nameValuePairStr);
    var name = parsed.name;
    var value = parsed.value;
    options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
    if (isForbiddenKey(name)) {
      return null;
    }
    try {
      value = options.decodeValues ? decodeURIComponent(value) : value;
    } catch (e) {
      console.error(
        "set-cookie-parser: failed to decode cookie value. Set options.decodeValues=false to disable decoding.",
        e
      );
    }
    var cookie = createNullObj();
    cookie.name = name;
    cookie.value = value;
    parts.forEach(function(part) {
      var sides = part.split("=");
      var key = sides.shift().trimLeft().toLowerCase();
      if (isForbiddenKey(key)) {
        return;
      }
      var value2 = sides.join("=");
      if (key === "expires") {
        cookie.expires = new Date(value2);
      } else if (key === "max-age") {
        var n = parseInt(value2, 10);
        if (!Number.isNaN(n)) cookie.maxAge = n;
      } else if (key === "secure") {
        cookie.secure = true;
      } else if (key === "httponly") {
        cookie.httpOnly = true;
      } else if (key === "samesite") {
        cookie.sameSite = value2;
      } else if (key === "partitioned") {
        cookie.partitioned = true;
      } else if (key) {
        cookie[key] = value2;
      }
    });
    return cookie;
  }
  function parseNameValuePair(nameValuePairStr) {
    var name = "";
    var value = "";
    var nameValueArr = nameValuePairStr.split("=");
    if (nameValueArr.length > 1) {
      name = nameValueArr.shift();
      value = nameValueArr.join("=");
    } else {
      value = nameValuePairStr;
    }
    return { name, value };
  }
  function parse(input, options) {
    options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
    if (!input) {
      if (!options.map) {
        return [];
      } else {
        return createNullObj();
      }
    }
    if (input.headers) {
      if (typeof input.headers.getSetCookie === "function") {
        input = input.headers.getSetCookie();
      } else if (input.headers["set-cookie"]) {
        input = input.headers["set-cookie"];
      } else {
        var sch = input.headers[Object.keys(input.headers).find(function(key) {
          return key.toLowerCase() === "set-cookie";
        })];
        if (!sch && input.headers.cookie && !options.silent) {
          console.warn(
            "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
          );
        }
        input = sch;
      }
    }
    if (!Array.isArray(input)) {
      input = [input];
    }
    if (!options.map) {
      return input.filter(isNonEmptyString2).map(function(str) {
        return parseString(str, options);
      }).filter(Boolean);
    } else {
      var cookies = createNullObj();
      return input.filter(isNonEmptyString2).reduce(function(cookies2, str) {
        var cookie = parseString(str, options);
        if (cookie && !isForbiddenKey(cookie.name)) {
          cookies2[cookie.name] = cookie;
        }
        return cookies2;
      }, cookies);
    }
  }
  function splitCookiesString(cookiesString) {
    if (Array.isArray(cookiesString)) {
      return cookiesString;
    }
    if (typeof cookiesString !== "string") {
      return [];
    }
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
      while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
        pos += 1;
      }
      return pos < cookiesString.length;
    }
    function notSpecialChar() {
      ch = cookiesString.charAt(pos);
      return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while (pos < cookiesString.length) {
      start = pos;
      cookiesSeparatorFound = false;
      while (skipWhitespace()) {
        ch = cookiesString.charAt(pos);
        if (ch === ",") {
          lastComma = pos;
          pos += 1;
          skipWhitespace();
          nextStart = pos;
          while (pos < cookiesString.length && notSpecialChar()) {
            pos += 1;
          }
          if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
            cookiesSeparatorFound = true;
            pos = nextStart;
            cookiesStrings.push(cookiesString.substring(start, lastComma));
            start = pos;
          } else {
            pos = lastComma + 1;
          }
        } else {
          pos += 1;
        }
      }
      if (!cookiesSeparatorFound || pos >= cookiesString.length) {
        cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
      }
    }
    return cookiesStrings;
  }
  setCookie$1.exports = parse;
  setCookie$1.exports.parse = parse;
  setCookie$1.exports.parseString = parseString;
  setCookie$1.exports.splitCookiesString = splitCookiesString;
  return setCookie$1.exports;
}
var setCookieExports = /* @__PURE__ */ requireSetCookie();
var define_process_env_default = {};
function ServerRouter({
  context,
  url,
  nonce
}) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  let { manifest, routeModules, criticalCss, serverHandoffString } = context;
  let routes2 = createServerRoutes(
    manifest.routes,
    routeModules,
    context.future,
    context.isSpaMode
  );
  context.staticHandlerContext.loaderData = {
    ...context.staticHandlerContext.loaderData
  };
  for (let match of context.staticHandlerContext.matches) {
    let routeId = match.route.id;
    let route = routeModules[routeId];
    let manifestRoute = context.manifest.routes[routeId];
    if (route && manifestRoute && shouldHydrateRouteLoader(
      routeId,
      route.clientLoader,
      manifestRoute.hasLoader,
      context.isSpaMode
    ) && (route.HydrateFallback || !manifestRoute.hasLoader)) {
      delete context.staticHandlerContext.loaderData[routeId];
    }
  }
  let router = createStaticRouter(routes2, context.staticHandlerContext, {
    branches: context.branches
  });
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(
    FrameworkContext.Provider,
    {
      value: {
        manifest,
        routeModules,
        criticalCss,
        serverHandoffString,
        future: context.future,
        ssr: context.ssr,
        isSpaMode: context.isSpaMode,
        routeDiscovery: context.routeDiscovery,
        serializeError: context.serializeError,
        renderMeta: context.renderMeta
      }
    },
    /* @__PURE__ */ reactExports.createElement(RemixErrorBoundary, { location: router.state.location }, /* @__PURE__ */ reactExports.createElement(
      StaticRouterProvider,
      {
        router,
        context: context.staticHandlerContext,
        hydrate: false
      }
    ))
  ), context.serverHandoffStream ? /* @__PURE__ */ reactExports.createElement(reactExports.Suspense, null, /* @__PURE__ */ reactExports.createElement(
    StreamTransfer,
    {
      context,
      identifier: 0,
      reader: context.serverHandoffStream.getReader(),
      textDecoder: new TextDecoder(),
      nonce
    }
  )) : null);
}
var encoder = /* @__PURE__ */ new TextEncoder();
var sign = async (value, secret) => {
  let data2 = encoder.encode(value);
  let key = await createKey(secret, ["sign"]);
  let signature = await crypto.subtle.sign("HMAC", key, data2);
  let hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(
    /=+$/,
    ""
  );
  return value + "." + hash;
};
var unsign = async (cookie, secret) => {
  let index = cookie.lastIndexOf(".");
  let value = cookie.slice(0, index);
  let hash = cookie.slice(index + 1);
  let data2 = encoder.encode(value);
  let key = await createKey(secret, ["verify"]);
  try {
    let signature = byteStringToUint8Array(atob(hash));
    let valid = await crypto.subtle.verify("HMAC", key, signature, data2);
    return valid ? value : false;
  } catch (e) {
    return false;
  }
};
var createKey = async (secret, usages) => crypto.subtle.importKey(
  "raw",
  encoder.encode(secret),
  { name: "HMAC", hash: "SHA-256" },
  false,
  usages
);
function byteStringToUint8Array(byteString) {
  let array = new Uint8Array(byteString.length);
  for (let i2 = 0; i2 < byteString.length; i2++) {
    array[i2] = byteString.charCodeAt(i2);
  }
  return array;
}
var createCookie = (name, cookieOptions = {}) => {
  let { secrets = [], ...options } = {
    path: "/",
    sameSite: "lax",
    ...cookieOptions
  };
  warnOnceAboutExpiresCookie(name, options.expires);
  return {
    get name() {
      return name;
    },
    get isSigned() {
      return secrets.length > 0;
    },
    get expires() {
      return typeof options.maxAge !== "undefined" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
    },
    async parse(cookieHeader, parseOptions) {
      if (!cookieHeader) return null;
      let cookies = distExports.parse(cookieHeader, { ...options, ...parseOptions });
      if (name in cookies) {
        let value = cookies[name];
        if (typeof value === "string" && value !== "") {
          let decoded = await decodeCookieValue(value, secrets);
          return decoded;
        } else {
          return "";
        }
      } else {
        return null;
      }
    },
    async serialize(value, serializeOptions) {
      return distExports.serialize(
        name,
        value === "" ? "" : await encodeCookieValue(value, secrets),
        {
          ...options,
          ...serializeOptions
        }
      );
    }
  };
};
var isCookie = (object) => {
  return object != null && typeof object.name === "string" && typeof object.isSigned === "boolean" && typeof object.parse === "function" && typeof object.serialize === "function";
};
async function encodeCookieValue(value, secrets) {
  let encoded = encodeData(value);
  if (secrets.length > 0) {
    encoded = await sign(encoded, secrets[0]);
  }
  return encoded;
}
async function decodeCookieValue(value, secrets) {
  if (secrets.length > 0) {
    for (let secret of secrets) {
      let unsignedValue = await unsign(value, secret);
      if (unsignedValue !== false) {
        return decodeData(unsignedValue);
      }
    }
    return null;
  }
  return decodeData(value);
}
function encodeData(value) {
  return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
}
function decodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))));
  } catch (e) {
    return {};
  }
}
function myEscape(value) {
  let str = value.toString();
  let result = "";
  let index = 0;
  let chr, code;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (/[\w*+\-./@]/.exec(chr)) {
      result += chr;
    } else {
      code = chr.charCodeAt(0);
      if (code < 256) {
        result += "%" + hex(code, 2);
      } else {
        result += "%u" + hex(code, 4).toUpperCase();
      }
    }
  }
  return result;
}
function hex(code, length) {
  let result = code.toString(16);
  while (result.length < length) result = "0" + result;
  return result;
}
function myUnescape(value) {
  let str = value.toString();
  let result = "";
  let index = 0;
  let chr, part;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (chr === "%") {
      if (str.charAt(index) === "u") {
        part = str.slice(index + 1, index + 5);
        if (/^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 5;
          continue;
        }
      } else {
        part = str.slice(index, index + 2);
        if (/^[\da-f]{2}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 2;
          continue;
        }
      }
    }
    result += chr;
  }
  return result;
}
function warnOnceAboutExpiresCookie(name, expires) {
  warnOnce$1(
    !expires,
    `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`
  );
}
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo, routeId) => {
    let route = manifest[routeId];
    if (route) {
      memo[routeId] = route.module;
    }
    return memo;
  }, {});
}
function isServerMode(value) {
  return value === "development" || value === "production" || value === "test";
}
function sanitizeError(error, serverMode) {
  if (error instanceof Error && serverMode !== "development") {
    let sanitized = new Error("Unexpected Server Error");
    sanitized.stack = void 0;
    return sanitized;
  }
  return error;
}
function sanitizeErrors(errors, serverMode) {
  return Object.entries(errors).reduce((acc, [routeId, error]) => {
    return Object.assign(acc, { [routeId]: sanitizeError(error, serverMode) });
  }, {});
}
function serializeError(error, serverMode) {
  let sanitized = sanitizeError(error, serverMode);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
}
function serializeErrors(errors, serverMode) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      let sanitized = sanitizeError(val, serverMode);
      serialized[key] = {
        message: sanitized.message,
        stack: sanitized.stack,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.  This will only apply
        // in dev mode since all production errors are sanitized to normal
        // Error instances
        ...sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    console.error(
      "The following error is a bug in React Router; please open an issue! https://github.com/remix-run/react-router/issues/new/choose"
    );
    throw new Error(message);
  }
}
function matchServerRoutes(manifest, dataRoutes, branches, pathname, basename2) {
  let matches = matchRoutesImpl(
    dataRoutes,
    pathname,
    basename2 ?? "/",
    false,
    branches
  );
  if (!matches) return null;
  return matches.map((match) => {
    let route = manifest[match.route.id];
    invariant(
      route,
      `Route with id "${match.route.id}" not found in manifest.`
    );
    return {
      params: match.params,
      pathname: match.pathname,
      route
    };
  });
}
async function callRouteHandler(handler, args, future2) {
  let result = await handler({
    request: future2.v8_passThroughRequests ? args.request : stripRoutesParam(stripIndexParam(args.request)),
    url: args.url,
    params: args.params,
    context: args.context,
    pattern: args.pattern
  });
  if (isDataWithResponseInit(result) && result.init && result.init.status && isRedirectStatusCode(result.init.status)) {
    throw new Response(null, result.init);
  }
  return result;
}
function stripIndexParam(request) {
  let url = new URL(request.url);
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  if (init.body) {
    init.duplex = "half";
  }
  return new Request(url.href, init);
}
function stripRoutesParam(request) {
  let url = new URL(request.url);
  url.searchParams.delete("_routes");
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  if (init.body) {
    init.duplex = "half";
  }
  return new Request(url.href, init);
}
function getBuildTimeHeader(request, headerName) {
  if (typeof process !== "undefined") {
    try {
      if (define_process_env_default.hasOwnProperty("IS_RR_BUILD_REQUEST") && define_process_env_default.IS_RR_BUILD_REQUEST === "yes") {
        return request.headers.get(headerName);
      }
    } catch (e) {
    }
  }
  return null;
}
function groupRoutesByParentId(manifest) {
  let routes2 = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes2[parentId]) {
        routes2[parentId] = [];
      }
      routes2[parentId].push(route);
    }
  });
  return routes2;
}
function createStaticHandlerDataRoutes(manifest, future2, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let commonRoute = {
      // Always include root due to default boundaries
      hasErrorBoundary: route.id === "root" || route.module.ErrorBoundary != null,
      id: route.id,
      path: route.path,
      middleware: route.module.middleware,
      // Need to use RR's version in the param typed here to permit the optional
      // context even though we know it'll always be provided in remix
      loader: route.module.loader ? async (args) => {
        let preRenderedData = getBuildTimeHeader(
          args.request,
          "X-React-Router-Prerender-Data"
        );
        if (preRenderedData != null) {
          let encoded = preRenderedData ? decodeURI(preRenderedData) : preRenderedData;
          invariant(encoded, "Missing prerendered data for route");
          let uint8array = new TextEncoder().encode(encoded);
          let stream = new ReadableStream({
            start(controller) {
              controller.enqueue(uint8array);
              controller.close();
            }
          });
          let decoded = await decodeViaTurboStream(stream, global);
          let data2 = decoded.value;
          if (data2 && SingleFetchRedirectSymbol in data2) {
            let result = data2[SingleFetchRedirectSymbol];
            let init = { status: result.status };
            if (result.reload) {
              throw redirectDocument(result.redirect, init);
            } else if (result.replace) {
              throw replace(result.redirect, init);
            } else {
              throw redirect(result.redirect, init);
            }
          } else {
            invariant(
              data2 && route.id in data2,
              "Unable to decode prerendered data"
            );
            let result = data2[route.id];
            invariant(
              "data" in result,
              "Unable to process prerendered data"
            );
            return result.data;
          }
        }
        let val = await callRouteHandler(
          route.module.loader,
          args,
          future2
        );
        return val;
      } : void 0,
      action: route.module.action ? (args) => callRouteHandler(route.module.action, args, future2) : void 0,
      handle: route.module.handle
    };
    return route.index ? {
      index: true,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(
        manifest,
        future2,
        route.id,
        routesByParentId
      ),
      ...commonRoute
    };
  });
}
function createServerHandoffString(serverHandoff) {
  return escapeHtml(JSON.stringify(serverHandoff));
}
function getDocumentHeaders(context, build) {
  return getDocumentHeadersImpl(context, (m) => {
    let route = build.routes[m.route.id];
    invariant(route, `Route with id "${m.route.id}" not found in build`);
    return route.module.headers;
  });
}
function getDocumentHeadersImpl(context, getRouteHeadersFn, _defaultHeaders) {
  let boundaryIdx = context.errors ? context.matches.findIndex((m) => context.errors[m.route.id]) : -1;
  let matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches;
  let errorHeaders;
  if (boundaryIdx >= 0) {
    let { actionHeaders, actionData, loaderHeaders, loaderData } = context;
    context.matches.slice(boundaryIdx).some((match) => {
      let id = match.route.id;
      if (actionHeaders[id] && (!actionData || !actionData.hasOwnProperty(id))) {
        errorHeaders = actionHeaders[id];
      } else if (loaderHeaders[id] && !loaderData.hasOwnProperty(id)) {
        errorHeaders = loaderHeaders[id];
      }
      return errorHeaders != null;
    });
  }
  const defaultHeaders = new Headers(_defaultHeaders);
  return matches.reduce((parentHeaders, match, idx) => {
    let { id } = match.route;
    let loaderHeaders = context.loaderHeaders[id] || new Headers();
    let actionHeaders = context.actionHeaders[id] || new Headers();
    let includeErrorHeaders = errorHeaders != null && idx === matches.length - 1;
    let includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;
    let headersFn = getRouteHeadersFn(match);
    if (headersFn == null) {
      let headers2 = new Headers(parentHeaders);
      if (includeErrorCookies) {
        prependCookies(errorHeaders, headers2);
      }
      prependCookies(actionHeaders, headers2);
      prependCookies(loaderHeaders, headers2);
      return headers2;
    }
    let headers = new Headers(
      typeof headersFn === "function" ? headersFn({
        loaderHeaders,
        parentHeaders,
        actionHeaders,
        errorHeaders: includeErrorHeaders ? errorHeaders : void 0
      }) : headersFn
    );
    if (includeErrorCookies) {
      prependCookies(errorHeaders, headers);
    }
    prependCookies(actionHeaders, headers);
    prependCookies(loaderHeaders, headers);
    prependCookies(parentHeaders, headers);
    return headers;
  }, new Headers(defaultHeaders));
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  if (parentSetCookieString) {
    let cookies = setCookieExports.splitCookiesString(parentSetCookieString);
    let childCookies = new Set(childHeaders.getSetCookie());
    cookies.forEach((cookie) => {
      if (!childCookies.has(cookie)) {
        childHeaders.append("Set-Cookie", cookie);
      }
    });
  }
}
function throwIfPotentialCSRFAttack(headers, allowedActionOrigins2) {
  let originHeader = headers.get("origin");
  let originDomain = null;
  try {
    originDomain = typeof originHeader === "string" && originHeader !== "null" ? new URL(originHeader).host : originHeader;
  } catch {
    throw new Error(
      `\`origin\` header is not a valid URL. Aborting the action.`
    );
  }
  let host = parseHostHeader(headers);
  if (originDomain && (!host || originDomain !== host.value)) {
    if (!isAllowedOrigin(originDomain, allowedActionOrigins2)) {
      if (host) {
        throw new Error(
          `${host.type} header does not match \`origin\` header from a forwarded action request. Aborting the action.`
        );
      } else {
        throw new Error(
          "`x-forwarded-host` or `host` headers are not provided. One of these is needed to compare the `origin` header from a forwarded action request. Aborting the action."
        );
      }
    }
  }
}
function matchWildcardDomain(domain, pattern2) {
  const domainParts = domain.split(".");
  const patternParts = pattern2.split(".");
  if (patternParts.length < 1) {
    return false;
  }
  if (domainParts.length < patternParts.length) {
    return false;
  }
  while (patternParts.length) {
    const patternPart = patternParts.pop();
    const domainPart = domainParts.pop();
    switch (patternPart) {
      case "": {
        return false;
      }
      case "*": {
        if (domainPart) {
          continue;
        } else {
          return false;
        }
      }
      case "**": {
        if (patternParts.length > 0) {
          return false;
        }
        return domainPart !== void 0;
      }
      case void 0:
      default: {
        if (domainPart !== patternPart) {
          return false;
        }
      }
    }
  }
  return domainParts.length === 0;
}
function isAllowedOrigin(originDomain, allowedActionOrigins2 = []) {
  return allowedActionOrigins2.some(
    (allowedOrigin) => allowedOrigin && (allowedOrigin === originDomain || matchWildcardDomain(originDomain, allowedOrigin))
  );
}
function parseHostHeader(headers) {
  var _a2;
  let forwardedHostHeader = headers.get("x-forwarded-host");
  let forwardedHostValue = (_a2 = forwardedHostHeader == null ? void 0 : forwardedHostHeader.split(",")[0]) == null ? void 0 : _a2.trim();
  let hostHeader = headers.get("host");
  return forwardedHostValue ? {
    type: "x-forwarded-host",
    value: forwardedHostValue
  } : hostHeader ? {
    type: "host",
    value: hostHeader
  } : void 0;
}
function getNormalizedPath(request, basename2, future2) {
  basename2 = basename2 || "/";
  let url = new URL(request.url);
  let pathname = url.pathname;
  if (future2 == null ? void 0 : future2.v8_trailingSlashAwareDataRequests) {
    if (pathname.endsWith("/_.data")) {
      pathname = pathname.replace(/_\.data$/, "");
    } else {
      pathname = pathname.replace(/\.data$/, "");
    }
  } else {
    if (stripBasename(pathname, basename2) === "/_root.data") {
      pathname = basename2;
    } else if (pathname.endsWith(".data")) {
      pathname = pathname.replace(/\.data$/, "");
    }
    if (stripBasename(pathname, basename2) !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
  }
  let searchParams = new URLSearchParams(url.search);
  searchParams.delete("_routes");
  let search = searchParams.toString();
  if (search) {
    search = `?${search}`;
  }
  return {
    pathname,
    search,
    // No hashes on the server
    hash: ""
  };
}
var SERVER_NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([
  ...NO_BODY_STATUS_CODES,
  304
]);
async function singleFetchAction(build, serverMode, staticHandler, request, handlerUrl, loadContext, handleError) {
  try {
    try {
      throwIfPotentialCSRFAttack(
        request.headers,
        Array.isArray(build.allowedActionOrigins) ? build.allowedActionOrigins : []
      );
    } catch (e) {
      return handleQueryError(new Error("Bad Request"), 400);
    }
    let handlerRequest = build.future.v8_passThroughRequests ? request : new Request(handlerUrl, {
      method: request.method,
      body: request.body,
      headers: request.headers,
      signal: request.signal,
      ...request.body ? { duplex: "half" } : void 0
    });
    let result = await staticHandler.query(handlerRequest, {
      requestContext: loadContext,
      skipLoaderErrorBubbling: true,
      skipRevalidation: true,
      generateMiddlewareResponse: build.future.v8_middleware ? async (query) => {
        try {
          let innerResult = await query(handlerRequest);
          return handleQueryResult(innerResult);
        } catch (error) {
          return handleQueryError(error);
        }
      } : void 0,
      normalizePath: (r) => getNormalizedPath(r, build.basename, build.future)
    });
    return handleQueryResult(result);
  } catch (error) {
    return handleQueryError(error);
  }
  function handleQueryResult(result) {
    return isResponse(result) ? result : staticContextToResponse(result);
  }
  function handleQueryError(error, status = 500) {
    handleError(error);
    return generateSingleFetchResponse(request, build, serverMode, {
      result: { error },
      headers: new Headers(),
      status
    });
  }
  function staticContextToResponse(context) {
    let headers = getDocumentHeaders(context, build);
    if (isRedirectStatusCode(context.statusCode) && headers.has("Location")) {
      return new Response(null, { status: context.statusCode, headers });
    }
    if (context.errors) {
      Object.values(context.errors).forEach((err) => {
        if (!isRouteErrorResponse(err) || err.error) {
          handleError(err);
        }
      });
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let singleFetchResult;
    if (context.errors) {
      singleFetchResult = { error: Object.values(context.errors)[0] };
    } else {
      singleFetchResult = {
        data: Object.values(context.actionData || {})[0]
      };
    }
    return generateSingleFetchResponse(request, build, serverMode, {
      result: singleFetchResult,
      headers,
      status: context.statusCode
    });
  }
}
async function singleFetchLoaders(build, serverMode, staticHandler, request, handlerUrl, loadContext, handleError) {
  let routesParam = new URL(request.url).searchParams.get("_routes");
  let loadRouteIds = routesParam ? new Set(routesParam.split(",")) : null;
  try {
    let handlerRequest = build.future.v8_passThroughRequests ? request : new Request(handlerUrl, {
      headers: request.headers,
      signal: request.signal
    });
    let result = await staticHandler.query(handlerRequest, {
      requestContext: loadContext,
      filterMatchesToLoad: (m) => !loadRouteIds || loadRouteIds.has(m.route.id),
      skipLoaderErrorBubbling: true,
      generateMiddlewareResponse: build.future.v8_middleware ? async (query) => {
        try {
          let innerResult = await query(handlerRequest);
          return handleQueryResult(innerResult);
        } catch (error) {
          return handleQueryError(error);
        }
      } : void 0,
      normalizePath: (r) => getNormalizedPath(r, build.basename, build.future)
    });
    return handleQueryResult(result);
  } catch (error) {
    return handleQueryError(error);
  }
  function handleQueryResult(result) {
    return isResponse(result) ? result : staticContextToResponse(result);
  }
  function handleQueryError(error) {
    handleError(error);
    return generateSingleFetchResponse(request, build, serverMode, {
      result: { error },
      headers: new Headers(),
      status: 500
    });
  }
  function staticContextToResponse(context) {
    let headers = getDocumentHeaders(context, build);
    if (isRedirectStatusCode(context.statusCode) && headers.has("Location")) {
      return new Response(null, { status: context.statusCode, headers });
    }
    if (context.errors) {
      Object.values(context.errors).forEach((err) => {
        if (!isRouteErrorResponse(err) || err.error) {
          handleError(err);
        }
      });
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let results = {};
    let loadedMatches = new Set(
      context.matches.filter(
        (m) => loadRouteIds ? loadRouteIds.has(m.route.id) : m.route.loader != null
      ).map((m) => m.route.id)
    );
    if (context.errors) {
      for (let [id, error] of Object.entries(context.errors)) {
        results[id] = { error };
      }
    }
    for (let [id, data2] of Object.entries(context.loaderData)) {
      if (!(id in results) && loadedMatches.has(id)) {
        results[id] = { data: data2 };
      }
    }
    return generateSingleFetchResponse(request, build, serverMode, {
      result: results,
      headers,
      status: context.statusCode
    });
  }
}
function generateSingleFetchResponse(request, build, serverMode, {
  result,
  headers,
  status
}) {
  let resultHeaders = new Headers(headers);
  resultHeaders.set("X-Remix-Response", "yes");
  if (SERVER_NO_BODY_STATUS_CODES.has(status)) {
    return new Response(null, { status, headers: resultHeaders });
  }
  resultHeaders.set("Content-Type", "text/x-script");
  resultHeaders.delete("Content-Length");
  return new Response(
    encodeViaTurboStream(
      result,
      request.signal,
      build.entry.module.streamTimeout,
      serverMode
    ),
    {
      status: status || 200,
      headers: resultHeaders
    }
  );
}
function generateSingleFetchRedirectResponse(redirectResponse, request, build, serverMode) {
  let redirect2 = getSingleFetchRedirect(
    redirectResponse.status,
    redirectResponse.headers,
    build.basename
  );
  let headers = new Headers(redirectResponse.headers);
  headers.delete("Location");
  headers.set("Content-Type", "text/x-script");
  return generateSingleFetchResponse(request, build, serverMode, {
    result: request.method === "GET" ? { [SingleFetchRedirectSymbol]: redirect2 } : redirect2,
    headers,
    status: SINGLE_FETCH_REDIRECT_STATUS
  });
}
function getSingleFetchRedirect(status, headers, basename2) {
  let redirect2 = headers.get("Location");
  if (basename2) {
    redirect2 = stripBasename(redirect2, basename2) || redirect2;
  }
  return {
    redirect: redirect2,
    status,
    revalidate: (
      // Technically X-Remix-Revalidate isn't needed here - that was an implementation
      // detail of ?_data requests as our way to tell the front end to revalidate when
      // we didn't have a response body to include that information in.
      // With single fetch, we tell the front end via this revalidate boolean field.
      // However, we're respecting it for now because it may be something folks have
      // used in their own responses
      // TODO(v3): Consider removing or making this official public API
      headers.has("X-Remix-Revalidate") || headers.has("Set-Cookie")
    ),
    reload: headers.has("X-Remix-Reload-Document"),
    replace: headers.has("X-Remix-Replace")
  };
}
function encodeViaTurboStream(data2, requestSignal, streamTimeout, serverMode) {
  let controller = new AbortController();
  let timeoutId = setTimeout(
    () => {
      controller.abort(new Error("Server Timeout"));
      cleanupCallbacks();
    },
    typeof streamTimeout === "number" ? streamTimeout : 4950
  );
  let abortControllerOnRequestAbort = () => {
    controller.abort(requestSignal.reason);
    cleanupCallbacks();
  };
  requestSignal.addEventListener("abort", abortControllerOnRequestAbort);
  let cleanupCallbacks = () => {
    clearTimeout(timeoutId);
    requestSignal.removeEventListener("abort", abortControllerOnRequestAbort);
  };
  return encode(data2, {
    signal: controller.signal,
    onComplete: cleanupCallbacks,
    plugins: [
      (value) => {
        if (value instanceof Error) {
          let { name, message, stack } = sanitizeError(value, serverMode);
          return ["SanitizedError", name, message, stack];
        }
        if (value instanceof ErrorResponseImpl) {
          let { data: data3, status, statusText } = value;
          return ["ErrorResponse", data3, status, statusText];
        }
        if (value && typeof value === "object" && SingleFetchRedirectSymbol in value) {
          return ["SingleFetchRedirect", value[SingleFetchRedirectSymbol]];
        }
      }
    ],
    postPlugins: [
      (value) => {
        if (!value) return;
        if (typeof value !== "object") return;
        return [
          "SingleFetchClassInstance",
          Object.fromEntries(Object.entries(value))
        ];
      },
      () => ["SingleFetchFallback"]
    ]
  });
}
function derive(build, mode) {
  let dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future);
  let serverMode = isServerMode(mode) ? mode : "production";
  let staticHandler = createStaticHandler(dataRoutes, {
    basename: build.basename,
    instrumentations: build.entry.module.instrumentations,
    future: build.future
  });
  let errorHandler = build.entry.module.handleError || ((error, { request }) => {
    if (!request.signal.aborted) {
      console.error(
        // @ts-expect-error This is "private" from users but intended for internal use
        isRouteErrorResponse(error) && error.error ? error.error : error
      );
    }
  });
  let requestHandler = async (request, initialContext) => {
    let params = {};
    let loadContext;
    let handleError = (error) => {
      errorHandler(error, {
        context: loadContext,
        params,
        request
      });
    };
    if (build.future.v8_middleware) {
      if (initialContext && !(initialContext instanceof RouterContextProvider)) {
        let error = new Error(
          "Invalid `context` value provided to `handleRequest`. When middleware is enabled you must return an instance of `RouterContextProvider` from your `getLoadContext` function."
        );
        handleError(error);
        return returnLastResortErrorResponse();
      }
      loadContext = initialContext || new RouterContextProvider();
    } else {
      loadContext = initialContext || {};
    }
    let requestUrl = new URL(request.url);
    let normalizedPathname = getNormalizedPath(
      request,
      build.basename,
      build.future
    ).pathname;
    let isSpaMode2 = getBuildTimeHeader(request, "X-React-Router-SPA-Mode") === "yes";
    if (!build.ssr) {
      let decodedPath = decodeURI(normalizedPathname);
      if (build.basename && build.basename !== "/") {
        let strippedPath = stripBasename(decodedPath, build.basename);
        if (strippedPath == null) {
          errorHandler(
            new ErrorResponseImpl(
              404,
              "Not Found",
              `Refusing to prerender the \`${decodedPath}\` path because it does not start with the basename \`${build.basename}\``
            ),
            {
              context: loadContext,
              params,
              request
            }
          );
          return new Response("Not Found", {
            status: 404,
            statusText: "Not Found"
          });
        }
        decodedPath = strippedPath;
      }
      if (build.prerender.length === 0) {
        isSpaMode2 = true;
      } else if (!build.prerender.includes(decodedPath) && !build.prerender.includes(decodedPath + "/")) {
        if (requestUrl.pathname.endsWith(".data")) {
          errorHandler(
            new ErrorResponseImpl(
              404,
              "Not Found",
              `Refusing to SSR the path \`${decodedPath}\` because \`ssr:false\` is set and the path is not included in the \`prerender\` config, so in production the path will be a 404.`
            ),
            {
              context: loadContext,
              params,
              request
            }
          );
          return new Response("Not Found", {
            status: 404,
            statusText: "Not Found"
          });
        } else {
          isSpaMode2 = true;
        }
      }
    }
    let manifestUrl = getManifestPath(
      build.routeDiscovery.manifestPath,
      build.basename
    );
    if (build.routeDiscovery.mode === "lazy" && requestUrl.pathname === manifestUrl) {
      try {
        let res = await handleManifestRequest(
          build,
          staticHandler.dataRoutes,
          staticHandler._internalRouteBranches,
          requestUrl
        );
        return res;
      } catch (e) {
        handleError(e);
        return new Response("Unknown Server Error", { status: 500 });
      }
    }
    let matches = matchServerRoutes(
      build.routes,
      staticHandler.dataRoutes,
      staticHandler._internalRouteBranches,
      normalizedPathname,
      build.basename
    );
    if (matches && matches.length > 0) {
      Object.assign(params, matches[0].params);
    }
    let response;
    if (requestUrl.pathname.endsWith(".data")) {
      response = await handleSingleFetchRequest(
        serverMode,
        build,
        staticHandler,
        request,
        normalizedPathname,
        loadContext,
        handleError
      );
      if (isRedirectResponse(response)) {
        response = generateSingleFetchRedirectResponse(
          response,
          request,
          build,
          serverMode
        );
      }
      if (build.entry.module.handleDataRequest) {
        response = await build.entry.module.handleDataRequest(response, {
          context: loadContext,
          params: matches ? matches[0].params : {},
          request
        });
        if (isRedirectResponse(response)) {
          response = generateSingleFetchRedirectResponse(
            response,
            request,
            build,
            serverMode
          );
        }
      }
    } else if (!isSpaMode2 && matches && matches[matches.length - 1].route.module.default == null && matches[matches.length - 1].route.module.ErrorBoundary == null) {
      response = await handleResourceRequest(
        serverMode,
        build,
        staticHandler,
        matches.slice(-1)[0].route.id,
        request,
        loadContext,
        handleError
      );
    } else {
      let { pathname } = requestUrl;
      let criticalCss = void 0;
      if (build.unstable_getCriticalCss) {
        criticalCss = await build.unstable_getCriticalCss({ pathname });
      }
      response = await handleDocumentRequest(
        serverMode,
        build,
        staticHandler,
        request,
        loadContext,
        handleError,
        isSpaMode2,
        criticalCss
      );
    }
    if (request.method === "HEAD") {
      return new Response(null, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
      });
    }
    return response;
  };
  if (build.entry.module.instrumentations) {
    requestHandler = instrumentHandler(
      requestHandler,
      build.entry.module.instrumentations.map((i2) => i2.handler).filter(Boolean)
    );
  }
  return {
    serverMode,
    staticHandler,
    errorHandler,
    requestHandler
  };
}
var createRequestHandler = (build, mode) => {
  let _build;
  let serverMode;
  let staticHandler;
  let errorHandler;
  let _requestHandler;
  return async function requestHandler(request, initialContext) {
    _build = typeof build === "function" ? await build() : build;
    if (typeof build === "function") {
      let derived = derive(_build, mode);
      serverMode = derived.serverMode;
      staticHandler = derived.staticHandler;
      errorHandler = derived.errorHandler;
      _requestHandler = derived.requestHandler;
    } else if (!serverMode || !staticHandler || !errorHandler || !_requestHandler) {
      let derived = derive(_build, mode);
      serverMode = derived.serverMode;
      staticHandler = derived.staticHandler;
      errorHandler = derived.errorHandler;
      _requestHandler = derived.requestHandler;
    }
    return _requestHandler(request, initialContext);
  };
};
async function handleManifestRequest(build, dataRoutes, branches, url) {
  if (build.assets.version !== url.searchParams.get("version")) {
    return new Response(null, {
      status: 204,
      headers: {
        "X-Remix-Reload-Document": "true"
      }
    });
  }
  if (url.toString().length > URL_LIMIT) {
    return new Response(null, {
      statusText: "Bad Request",
      status: 400
    });
  }
  let patches = {};
  if (url.searchParams.has("paths")) {
    let paths = /* @__PURE__ */ new Set();
    let pathParam = url.searchParams.get("paths") || "";
    let requestedPaths = pathParam.split(",").filter(Boolean);
    requestedPaths.forEach((path) => {
      if (!path.startsWith("/")) {
        path = `/${path}`;
      }
      let segments = path.split("/").slice(1);
      segments.forEach((_2, i2) => {
        let partialPath = segments.slice(0, i2 + 1).join("/");
        paths.add(`/${partialPath}`);
      });
    });
    for (let path of paths) {
      let matches = matchServerRoutes(
        build.routes,
        dataRoutes,
        branches,
        path,
        build.basename
      );
      if (matches) {
        for (let match of matches) {
          let routeId = match.route.id;
          let route = build.assets.routes[routeId];
          if (route) {
            patches[routeId] = route;
          }
        }
      }
    }
    return Response.json(patches, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  }
  return new Response("Invalid Request", { status: 400 });
}
async function handleSingleFetchRequest(serverMode, build, staticHandler, request, normalizedPath, loadContext, handleError) {
  let handlerUrl = new URL(request.url);
  handlerUrl.pathname = normalizedPath;
  let response = isMutationMethod(request.method) ? await singleFetchAction(
    build,
    serverMode,
    staticHandler,
    request,
    handlerUrl,
    loadContext,
    handleError
  ) : await singleFetchLoaders(
    build,
    serverMode,
    staticHandler,
    request,
    handlerUrl,
    loadContext,
    handleError
  );
  return response;
}
async function handleDocumentRequest(serverMode, build, staticHandler, request, loadContext, handleError, isSpaMode2, criticalCss) {
  try {
    if (isMutationMethod(request.method)) {
      try {
        throwIfPotentialCSRFAttack(
          request.headers,
          Array.isArray(build.allowedActionOrigins) ? build.allowedActionOrigins : []
        );
      } catch (e) {
        handleError(e);
        return new Response("Bad Request", { status: 400 });
      }
    }
    let result = await staticHandler.query(request, {
      requestContext: loadContext,
      generateMiddlewareResponse: build.future.v8_middleware ? async (query) => {
        try {
          let innerResult = await query(request);
          if (!isResponse(innerResult)) {
            innerResult = await renderHtml(innerResult, isSpaMode2);
          }
          return innerResult;
        } catch (error) {
          handleError(error);
          return new Response(null, { status: 500 });
        }
      } : void 0,
      normalizePath: (r) => getNormalizedPath(r, build.basename, build.future)
    });
    if (!isResponse(result)) {
      result = await renderHtml(result, isSpaMode2);
    }
    return result;
  } catch (error) {
    handleError(error);
    return new Response(null, { status: 500 });
  }
  async function renderHtml(context, isSpaMode22) {
    let headers = getDocumentHeaders(context, build);
    if (SERVER_NO_BODY_STATUS_CODES.has(context.statusCode)) {
      return new Response(null, { status: context.statusCode, headers });
    }
    if (context.errors) {
      Object.values(context.errors).forEach((err) => {
        if (!isRouteErrorResponse(err) || err.error) {
          handleError(err);
        }
      });
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let state = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors(context.errors, serverMode)
    };
    let baseServerHandoff = {
      basename: build.basename,
      future: build.future,
      routeDiscovery: build.routeDiscovery,
      ssr: build.ssr,
      isSpaMode: isSpaMode22
    };
    let entryContext = {
      manifest: build.assets,
      branches: staticHandler._internalRouteBranches,
      routeModules: createEntryRouteModules(build.routes),
      staticHandlerContext: context,
      criticalCss,
      serverHandoffString: createServerHandoffString({
        ...baseServerHandoff,
        criticalCss
      }),
      serverHandoffStream: encodeViaTurboStream(
        state,
        request.signal,
        build.entry.module.streamTimeout,
        serverMode
      ),
      renderMeta: {},
      future: build.future,
      ssr: build.ssr,
      routeDiscovery: build.routeDiscovery,
      isSpaMode: isSpaMode22,
      serializeError: (err) => serializeError(err, serverMode)
    };
    let handleDocumentRequestFunction = build.entry.module.default;
    try {
      return await handleDocumentRequestFunction(
        request,
        context.statusCode,
        headers,
        entryContext,
        loadContext
      );
    } catch (error) {
      handleError(error);
      let errorForSecondRender = error;
      if (isResponse(error)) {
        try {
          let data2 = await unwrapResponse(error);
          errorForSecondRender = new ErrorResponseImpl(
            error.status,
            error.statusText,
            data2
          );
        } catch (e) {
        }
      }
      context = getStaticContextFromError(
        staticHandler.dataRoutes,
        context,
        errorForSecondRender
      );
      if (context.errors) {
        context.errors = sanitizeErrors(context.errors, serverMode);
      }
      let state2 = {
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: serializeErrors(context.errors, serverMode)
      };
      entryContext = {
        ...entryContext,
        staticHandlerContext: context,
        serverHandoffString: createServerHandoffString(baseServerHandoff),
        serverHandoffStream: encodeViaTurboStream(
          state2,
          request.signal,
          build.entry.module.streamTimeout,
          serverMode
        ),
        renderMeta: {}
      };
      try {
        return await handleDocumentRequestFunction(
          request,
          context.statusCode,
          headers,
          entryContext,
          loadContext
        );
      } catch (error2) {
        handleError(error2);
        return returnLastResortErrorResponse();
      }
    }
  }
}
async function handleResourceRequest(serverMode, build, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let result = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext,
      generateMiddlewareResponse: build.future.v8_middleware ? async (queryRoute) => {
        try {
          let innerResult = await queryRoute(request);
          return handleQueryRouteResult(innerResult);
        } catch (error) {
          return handleQueryRouteError(error);
        }
      } : void 0,
      normalizePath: (r) => getNormalizedPath(r, build.basename, build.future)
    });
    return handleQueryRouteResult(result);
  } catch (error) {
    return handleQueryRouteError(error);
  }
  function handleQueryRouteResult(result) {
    if (isResponse(result)) {
      return result;
    }
    if (typeof result === "string") {
      return new Response(result);
    }
    return Response.json(result);
  }
  function handleQueryRouteError(error) {
    if (isResponse(error)) {
      return error;
    }
    if (isRouteErrorResponse(error)) {
      handleError(error);
      return errorResponseToJson(error, serverMode);
    }
    if (error instanceof Error && error.message === "Expected a response from queryRoute") {
      let newError = new Error(
        "Expected a Response to be returned from resource route handler"
      );
      handleError(newError);
      return returnLastResortErrorResponse();
    }
    handleError(error);
    return returnLastResortErrorResponse();
  }
}
function errorResponseToJson(errorResponse, serverMode) {
  return Response.json(
    serializeError(
      // @ts-expect-error This is "private" from users but intended for internal use
      errorResponse.error || new Error("Unexpected Server Error"),
      serverMode
    ),
    {
      status: errorResponse.status,
      statusText: errorResponse.statusText
    }
  );
}
function returnLastResortErrorResponse(error, serverMode) {
  let message = "Unexpected Server Error";
  return new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
function unwrapResponse(response) {
  let contentType = response.headers.get("Content-Type");
  return contentType && /\bapplication\/json\b/.test(contentType) ? response.body == null ? null : response.json() : response.text();
}
function flash(name) {
  return `__flash_${name}__`;
}
var createSession = (initialData = {}, id = "") => {
  let map = new Map(Object.entries(initialData));
  return {
    get id() {
      return id;
    },
    get data() {
      return Object.fromEntries(map);
    },
    has(name) {
      return map.has(name) || map.has(flash(name));
    },
    get(name) {
      if (map.has(name)) return map.get(name);
      let flashName = flash(name);
      if (map.has(flashName)) {
        let value = map.get(flashName);
        map.delete(flashName);
        return value;
      }
      return void 0;
    },
    set(name, value) {
      map.set(name, value);
    },
    flash(name, value) {
      map.set(flash(name), value);
    },
    unset(name) {
      map.delete(name);
    }
  };
};
function warnOnceAboutSigningSessionCookie(cookie) {
  warnOnce$1(
    cookie.isSigned,
    `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://reactrouter.com/explanation/sessions-and-cookies#signing-cookies for more information.`
  );
}
function createCookieSessionStorage({ cookie: cookieArg } = {}) {
  let cookie = isCookie(cookieArg) ? cookieArg : createCookie((cookieArg == null ? void 0 : cookieArg.name) || "__session", cookieArg);
  warnOnceAboutSigningSessionCookie(cookie);
  return {
    async getSession(cookieHeader, options) {
      return createSession(
        cookieHeader && await cookie.parse(cookieHeader, options) || {}
      );
    },
    async commitSession(session, options) {
      let serializedCookie = await cookie.serialize(session.data, options);
      if (serializedCookie.length > 4096) {
        throw new Error(
          "Cookie length will exceed browser maximum. Length: " + serializedCookie.length
        );
      }
      return serializedCookie;
    },
    async destroySession(_session2, options) {
      return cookie.serialize("", {
        ...options,
        maxAge: void 0,
        expires: /* @__PURE__ */ new Date(0)
      });
    }
  };
}
new TextEncoder();
(class extends React3.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, location: props.location };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return { error: null, location: props.location };
    }
    return { error: state.error, location: state.location };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ React3.createElement(
        RSCDefaultRootErrorBoundaryImpl,
        {
          error: this.state.error,
          renderAppShell: true
        }
      );
    } else {
      return this.props.children;
    }
  }
});
function ErrorWrapper({
  renderAppShell,
  title,
  children
}) {
  if (!renderAppShell) {
    return children;
  }
  return /* @__PURE__ */ React3.createElement("html", { lang: "en" }, /* @__PURE__ */ React3.createElement("head", null, /* @__PURE__ */ React3.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ React3.createElement(
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover"
    }
  ), /* @__PURE__ */ React3.createElement("title", null, title)), /* @__PURE__ */ React3.createElement("body", null, /* @__PURE__ */ React3.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, children)));
}
function RSCDefaultRootErrorBoundaryImpl({
  error,
  renderAppShell
}) {
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ React3.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."
        );
      `
      }
    }
  );
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ React3.createElement(
      ErrorWrapper,
      {
        renderAppShell,
        title: "Unhandled Thrown Response!"
      },
      /* @__PURE__ */ React3.createElement("h1", { style: { fontSize: "24px" } }, error.status, " ", error.statusText),
      heyDeveloper
    );
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ React3.createElement(ErrorWrapper, { renderAppShell, title: "Application Error!" }, /* @__PURE__ */ React3.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"), /* @__PURE__ */ React3.createElement(
    "pre",
    {
      style: {
        padding: "2rem",
        background: "hsla(10, 50%, 50%, 0.1)",
        color: "red",
        overflow: "auto"
      }
    },
    errorInstance.stack
  ), heyDeveloper);
}
var fullPattern = " daum[ /]| deusu/|(?:^|[^g])news(?!sapphire)|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bots?(?:\\b|_)|(?<!(?:lib))http|(?<!cam)scan|24x7|;\\s\\w+;$|@[a-z][\\w-]+\\.|\\(\\)|\\.com\\b|\\b\\w+\\.ai|\\bbw/|\\bdlc\\b|\\bort/|\\bperl\\b|\\btime/|\\||^[\\w \\.\\-\\(?:\\):%]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)|^[\\w\\-]+/[\\w]+$|^[^ ]{50,}$|^\\d+\\b|^\\W|^\\w*search\\b|^\\w+/[\\w\\(\\)]*$|^\\w+/\\d\\.\\d\\s\\([\\w@]+\\)$|^active|^ad muncher|^amaya|^apache/|^avsdevicesdk/|^azure|^biglotron|^blackbox exporter|^bot|^clamav[ /]|^claude-code/|^client/|^cobweb/|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^email|^exodusmovement|^facebook|^getright/|^gozilla/|^hobbit|^hotzonu|^hwcdn/|^igetter/|^jeode/|^jetty/|^jigsaw|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d\\s[\\w\\.-]+$|^mozilla/\\d\\.\\d\\s\\((?:compatible;)?(?:\\s?[\\w\\d-.]+\\/\\d+\\.\\d+)?\\)$|^navermailapp|^netsurf|^offline|^openai/|^owler|^php|^postman|^ps_daily/|^python|^rank|^read|^reed|^remove\\.bg/|^rest|^rss|^snapchat|^sora |^space bison|^stape/|^svn|^swcd |^taringa|^thumbor/|^track|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^wordpress|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|abuse|advisor|agent\\b|analyzer|archive|ask jeeves/teoma|attracta|audit|bluecoat drtr|browsex|burpcollaborator|capture|catch|check\\b|checker|chrome-lighthouse|chromeframe|classifier|cloudflare|collapsify\\b|convertify|cookiehubverify/|crawl|cursor/|cypress/|dareboost|datanyze|dejaclick|detect|dmbrowser|download|exaleadcloudview|feed|fetcher|firephp|foregenix|functionize|grab|hardenize\\b|headless|hotjar|httrack|hubspot marketing grader|ibisbrowser|infrawatch|insight|inspect|iplabel|java(?!;)|library|linkcheck|linktiger|mail\\.ru/|manager|manus-user/|marketgoo/|measure|monitor\\b|neustar wpm|node\\b|nutch|offbyone|openvas|optimize|pageburst|pagespeed|parser|phantomjs|pingdom|playwright|powermarks|preview|proxy|ptst[ /]\\d|readable/|retriever|rexx;|rigor|rss\\b|scrape|securityheaders|selenium|server|silktide|sindup/|sogou|sparkler/|speedcurve|spider|splash|statuscake|supercleaner|synapse|synthetic|testlocally|tools|torrent|transcoder|upday/|url|validator|virtuoso|wappalyzer|watchtowr|webglance|webkit2png|whatcms/|xtate/";
var naivePattern = /bot|crawl|http|lighthouse|scan|search|spider/i;
var pattern;
function getPattern() {
  if (pattern instanceof RegExp) {
    return pattern;
  }
  try {
    pattern = new RegExp(fullPattern, "i");
  } catch (error) {
    pattern = naivePattern;
  }
  return pattern;
}
var isNonEmptyString = (value) => typeof value === "string" && value !== "";
function isbot(userAgent) {
  return isNonEmptyString(userAgent) && getPattern().test(userAgent);
}
var server_browser = {};
var reactDomServerLegacy_browser_production_min = {};
/**
 * @license React
 * react-dom-server-legacy.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDomServerLegacy_browser_production_min;
function requireReactDomServerLegacy_browser_production_min() {
  if (hasRequiredReactDomServerLegacy_browser_production_min) return reactDomServerLegacy_browser_production_min;
  hasRequiredReactDomServerLegacy_browser_production_min = 1;
  var aa = requireReact();
  function l2(a2) {
    for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
    return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var p = Object.prototype.hasOwnProperty, fa2 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ha2 = {}, ia = {};
  function ja2(a2) {
    if (p.call(ia, a2)) return true;
    if (p.call(ha2, a2)) return false;
    if (fa2.test(a2)) return ia[a2] = true;
    ha2[a2] = true;
    return false;
  }
  function r(a2, b2, c2, d, f, e, g2) {
    this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
    this.attributeName = d;
    this.attributeNamespace = f;
    this.mustUseProperty = c2;
    this.propertyName = a2;
    this.type = b2;
    this.sanitizeURL = e;
    this.removeEmptyString = g2;
  }
  var t = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
    t[a2] = new r(a2, 0, false, a2, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
    var b2 = a2[0];
    t[b2] = new r(b2, 1, false, a2[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
    t[a2] = new r(a2, 2, false, a2.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
    t[a2] = new r(a2, 2, false, a2, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
    t[a2] = new r(a2, 3, false, a2.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
    t[a2] = new r(a2, 3, true, a2, null, false, false);
  });
  ["capture", "download"].forEach(function(a2) {
    t[a2] = new r(a2, 4, false, a2, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a2) {
    t[a2] = new r(a2, 6, false, a2, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a2) {
    t[a2] = new r(a2, 5, false, a2.toLowerCase(), null, false, false);
  });
  var ka2 = /[\-:]([a-z])/g;
  function la(a2) {
    return a2[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
    var b2 = a2.replace(
      ka2,
      la
    );
    t[b2] = new r(b2, 1, false, a2, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
    var b2 = a2.replace(ka2, la);
    t[b2] = new r(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
    var b2 = a2.replace(ka2, la);
    t[b2] = new r(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a2) {
    t[a2] = new r(a2, 1, false, a2.toLowerCase(), null, false, false);
  });
  t.xlinkHref = new r("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a2) {
    t[a2] = new r(a2, 1, false, a2.toLowerCase(), null, true, true);
  });
  var u2 = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, ma2 = ["Webkit", "ms", "Moz", "O"];
  Object.keys(u2).forEach(function(a2) {
    ma2.forEach(function(b2) {
      b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
      u2[b2] = u2[a2];
    });
  });
  var na = /["'&<>]/;
  function v(a2) {
    if ("boolean" === typeof a2 || "number" === typeof a2) return "" + a2;
    a2 = "" + a2;
    var b2 = na.exec(a2);
    if (b2) {
      var c2 = "", d, f = 0;
      for (d = b2.index; d < a2.length; d++) {
        switch (a2.charCodeAt(d)) {
          case 34:
            b2 = "&quot;";
            break;
          case 38:
            b2 = "&amp;";
            break;
          case 39:
            b2 = "&#x27;";
            break;
          case 60:
            b2 = "&lt;";
            break;
          case 62:
            b2 = "&gt;";
            break;
          default:
            continue;
        }
        f !== d && (c2 += a2.substring(f, d));
        f = d + 1;
        c2 += b2;
      }
      a2 = f !== d ? c2 + a2.substring(f, d) : c2;
    }
    return a2;
  }
  var oa2 = /([A-Z])/g, pa = /^ms-/, qa2 = Array.isArray;
  function w2(a2, b2) {
    return { insertionMode: a2, selectedValue: b2 };
  }
  function ra(a2, b2, c2) {
    switch (b2) {
      case "select":
        return w2(1, null != c2.value ? c2.value : c2.defaultValue);
      case "svg":
        return w2(2, null);
      case "math":
        return w2(3, null);
      case "foreignObject":
        return w2(1, null);
      case "table":
        return w2(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return w2(5, null);
      case "colgroup":
        return w2(7, null);
      case "tr":
        return w2(6, null);
    }
    return 4 <= a2.insertionMode || 0 === a2.insertionMode ? w2(1, null) : a2;
  }
  var sa = /* @__PURE__ */ new Map();
  function ta(a2, b2, c2) {
    if ("object" !== typeof c2) throw Error(l2(62));
    b2 = true;
    for (var d in c2) if (p.call(c2, d)) {
      var f = c2[d];
      if (null != f && "boolean" !== typeof f && "" !== f) {
        if (0 === d.indexOf("--")) {
          var e = v(d);
          f = v(("" + f).trim());
        } else {
          e = d;
          var g2 = sa.get(e);
          void 0 !== g2 ? e = g2 : (g2 = v(e.replace(oa2, "-$1").toLowerCase().replace(pa, "-ms-")), sa.set(e, g2), e = g2);
          f = "number" === typeof f ? 0 === f || p.call(u2, d) ? "" + f : f + "px" : v(("" + f).trim());
        }
        b2 ? (b2 = false, a2.push(' style="', e, ":", f)) : a2.push(";", e, ":", f);
      }
    }
    b2 || a2.push('"');
  }
  function x2(a2, b2, c2, d) {
    switch (c2) {
      case "style":
        ta(a2, b2, d);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < c2.length) || "o" !== c2[0] && "O" !== c2[0] || "n" !== c2[1] && "N" !== c2[1]) {
      if (b2 = t.hasOwnProperty(c2) ? t[c2] : null, null !== b2) {
        switch (typeof d) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!b2.acceptsBooleans) return;
        }
        c2 = b2.attributeName;
        switch (b2.type) {
          case 3:
            d && a2.push(" ", c2, '=""');
            break;
          case 4:
            true === d ? a2.push(" ", c2, '=""') : false !== d && a2.push(" ", c2, '="', v(d), '"');
            break;
          case 5:
            isNaN(d) || a2.push(" ", c2, '="', v(d), '"');
            break;
          case 6:
            !isNaN(d) && 1 <= d && a2.push(" ", c2, '="', v(d), '"');
            break;
          default:
            b2.sanitizeURL && (d = "" + d), a2.push(" ", c2, '="', v(d), '"');
        }
      } else if (ja2(c2)) {
        switch (typeof d) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (b2 = c2.toLowerCase().slice(0, 5), "data-" !== b2 && "aria-" !== b2) return;
        }
        a2.push(" ", c2, '="', v(d), '"');
      }
    }
  }
  function y(a2, b2, c2) {
    if (null != b2) {
      if (null != c2) throw Error(l2(60));
      if ("object" !== typeof b2 || !("__html" in b2)) throw Error(l2(61));
      b2 = b2.__html;
      null !== b2 && void 0 !== b2 && a2.push("" + b2);
    }
  }
  function ua2(a2) {
    var b2 = "";
    aa.Children.forEach(a2, function(a3) {
      null != a3 && (b2 += a3);
    });
    return b2;
  }
  function va2(a2, b2, c2, d) {
    a2.push(A(c2));
    var f = c2 = null, e;
    for (e in b2) if (p.call(b2, e)) {
      var g2 = b2[e];
      if (null != g2) switch (e) {
        case "children":
          c2 = g2;
          break;
        case "dangerouslySetInnerHTML":
          f = g2;
          break;
        default:
          x2(a2, d, e, g2);
      }
    }
    a2.push(">");
    y(a2, f, c2);
    return "string" === typeof c2 ? (a2.push(v(c2)), null) : c2;
  }
  var wa2 = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, xa2 = /* @__PURE__ */ new Map();
  function A(a2) {
    var b2 = xa2.get(a2);
    if (void 0 === b2) {
      if (!wa2.test(a2)) throw Error(l2(65, a2));
      b2 = "<" + a2;
      xa2.set(a2, b2);
    }
    return b2;
  }
  function ya2(a2, b2, c2, d, f) {
    switch (b2) {
      case "select":
        a2.push(A("select"));
        var e = null, g2 = null;
        for (n in c2) if (p.call(c2, n)) {
          var h = c2[n];
          if (null != h) switch (n) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g2 = h;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              x2(a2, d, n, h);
          }
        }
        a2.push(">");
        y(a2, g2, e);
        return e;
      case "option":
        g2 = f.selectedValue;
        a2.push(A("option"));
        var k = h = null, m = null;
        var n = null;
        for (e in c2) if (p.call(c2, e)) {
          var q = c2[e];
          if (null != q) switch (e) {
            case "children":
              h = q;
              break;
            case "selected":
              m = q;
              break;
            case "dangerouslySetInnerHTML":
              n = q;
              break;
            case "value":
              k = q;
            default:
              x2(a2, d, e, q);
          }
        }
        if (null != g2) if (c2 = null !== k ? "" + k : ua2(h), qa2(g2)) for (d = 0; d < g2.length; d++) {
          if ("" + g2[d] === c2) {
            a2.push(' selected=""');
            break;
          }
        }
        else "" + g2 === c2 && a2.push(' selected=""');
        else m && a2.push(' selected=""');
        a2.push(">");
        y(a2, n, h);
        return h;
      case "textarea":
        a2.push(A("textarea"));
        n = g2 = e = null;
        for (h in c2) if (p.call(c2, h) && (k = c2[h], null != k)) switch (h) {
          case "children":
            n = k;
            break;
          case "value":
            e = k;
            break;
          case "defaultValue":
            g2 = k;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(l2(91));
          default:
            x2(
              a2,
              d,
              h,
              k
            );
        }
        null === e && null !== g2 && (e = g2);
        a2.push(">");
        if (null != n) {
          if (null != e) throw Error(l2(92));
          if (qa2(n) && 1 < n.length) throw Error(l2(93));
          e = "" + n;
        }
        "string" === typeof e && "\n" === e[0] && a2.push("\n");
        null !== e && a2.push(v("" + e));
        return null;
      case "input":
        a2.push(A("input"));
        k = n = h = e = null;
        for (g2 in c2) if (p.call(c2, g2) && (m = c2[g2], null != m)) switch (g2) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(l2(399, "input"));
          case "defaultChecked":
            k = m;
            break;
          case "defaultValue":
            h = m;
            break;
          case "checked":
            n = m;
            break;
          case "value":
            e = m;
            break;
          default:
            x2(a2, d, g2, m);
        }
        null !== n ? x2(a2, d, "checked", n) : null !== k && x2(a2, d, "checked", k);
        null !== e ? x2(a2, d, "value", e) : null !== h && x2(a2, d, "value", h);
        a2.push("/>");
        return null;
      case "menuitem":
        a2.push(A("menuitem"));
        for (var C in c2) if (p.call(c2, C) && (e = c2[C], null != e)) switch (C) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(l2(400));
          default:
            x2(a2, d, C, e);
        }
        a2.push(">");
        return null;
      case "title":
        a2.push(A("title"));
        e = null;
        for (q in c2) if (p.call(c2, q) && (g2 = c2[q], null != g2)) switch (q) {
          case "children":
            e = g2;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(l2(434));
          default:
            x2(a2, d, q, g2);
        }
        a2.push(">");
        return e;
      case "listing":
      case "pre":
        a2.push(A(b2));
        g2 = e = null;
        for (k in c2) if (p.call(c2, k) && (h = c2[k], null != h)) switch (k) {
          case "children":
            e = h;
            break;
          case "dangerouslySetInnerHTML":
            g2 = h;
            break;
          default:
            x2(a2, d, k, h);
        }
        a2.push(">");
        if (null != g2) {
          if (null != e) throw Error(l2(60));
          if ("object" !== typeof g2 || !("__html" in g2)) throw Error(l2(61));
          c2 = g2.__html;
          null !== c2 && void 0 !== c2 && ("string" === typeof c2 && 0 < c2.length && "\n" === c2[0] ? a2.push("\n", c2) : a2.push("" + c2));
        }
        "string" === typeof e && "\n" === e[0] && a2.push("\n");
        return e;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        a2.push(A(b2));
        for (var D2 in c2) if (p.call(c2, D2) && (e = c2[D2], null != e)) switch (D2) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(l2(399, b2));
          default:
            x2(a2, d, D2, e);
        }
        a2.push("/>");
        return null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return va2(
          a2,
          c2,
          b2,
          d
        );
      case "html":
        return 0 === f.insertionMode && a2.push("<!DOCTYPE html>"), va2(a2, c2, b2, d);
      default:
        if (-1 === b2.indexOf("-") && "string" !== typeof c2.is) return va2(a2, c2, b2, d);
        a2.push(A(b2));
        g2 = e = null;
        for (m in c2) if (p.call(c2, m) && (h = c2[m], null != h)) switch (m) {
          case "children":
            e = h;
            break;
          case "dangerouslySetInnerHTML":
            g2 = h;
            break;
          case "style":
            ta(a2, d, h);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            break;
          default:
            ja2(m) && "function" !== typeof h && "symbol" !== typeof h && a2.push(" ", m, '="', v(h), '"');
        }
        a2.push(">");
        y(a2, g2, e);
        return e;
    }
  }
  function za(a2, b2, c2) {
    a2.push('<!--$?--><template id="');
    if (null === c2) throw Error(l2(395));
    a2.push(c2);
    return a2.push('"></template>');
  }
  function Aa2(a2, b2, c2, d) {
    switch (c2.insertionMode) {
      case 0:
      case 1:
        return a2.push('<div hidden id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
      case 2:
        return a2.push('<svg aria-hidden="true" style="display:none" id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
      case 3:
        return a2.push('<math aria-hidden="true" style="display:none" id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
      case 4:
        return a2.push('<table hidden id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
      case 5:
        return a2.push('<table hidden><tbody id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
      case 6:
        return a2.push('<table hidden><tr id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
      case 7:
        return a2.push('<table hidden><colgroup id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
      default:
        throw Error(l2(397));
    }
  }
  function Ba2(a2, b2) {
    switch (b2.insertionMode) {
      case 0:
      case 1:
        return a2.push("</div>");
      case 2:
        return a2.push("</svg>");
      case 3:
        return a2.push("</math>");
      case 4:
        return a2.push("</table>");
      case 5:
        return a2.push("</tbody></table>");
      case 6:
        return a2.push("</tr></table>");
      case 7:
        return a2.push("</colgroup></table>");
      default:
        throw Error(l2(397));
    }
  }
  var Ca2 = /[<\u2028\u2029]/g;
  function Da2(a2) {
    return JSON.stringify(a2).replace(Ca2, function(a3) {
      switch (a3) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  function Ea2(a2, b2) {
    b2 = void 0 === b2 ? "" : b2;
    return { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: b2 + "P:", segmentPrefix: b2 + "S:", boundaryPrefix: b2 + "B:", idPrefix: b2, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false, generateStaticMarkup: a2 };
  }
  function Fa2(a2, b2, c2, d) {
    if (c2.generateStaticMarkup) return a2.push(v(b2)), false;
    "" === b2 ? a2 = d : (d && a2.push("<!-- -->"), a2.push(v(b2)), a2 = true);
    return a2;
  }
  var B2 = Object.assign, Ga2 = Symbol.for("react.element"), Ha2 = Symbol.for("react.portal"), Ia2 = Symbol.for("react.fragment"), Ja2 = Symbol.for("react.strict_mode"), Ka2 = Symbol.for("react.profiler"), La = Symbol.for("react.provider"), Ma = Symbol.for("react.context"), Na = Symbol.for("react.forward_ref"), Oa2 = Symbol.for("react.suspense"), Pa2 = Symbol.for("react.suspense_list"), Qa2 = Symbol.for("react.memo"), Ra2 = Symbol.for("react.lazy"), Sa2 = Symbol.for("react.scope"), Ta2 = Symbol.for("react.debug_trace_mode"), Ua2 = Symbol.for("react.legacy_hidden"), Va = Symbol.for("react.default_value"), Wa2 = Symbol.iterator;
  function Xa2(a2) {
    if (null == a2) return null;
    if ("function" === typeof a2) return a2.displayName || a2.name || null;
    if ("string" === typeof a2) return a2;
    switch (a2) {
      case Ia2:
        return "Fragment";
      case Ha2:
        return "Portal";
      case Ka2:
        return "Profiler";
      case Ja2:
        return "StrictMode";
      case Oa2:
        return "Suspense";
      case Pa2:
        return "SuspenseList";
    }
    if ("object" === typeof a2) switch (a2.$$typeof) {
      case Ma:
        return (a2.displayName || "Context") + ".Consumer";
      case La:
        return (a2._context.displayName || "Context") + ".Provider";
      case Na:
        var b2 = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Qa2:
        return b2 = a2.displayName || null, null !== b2 ? b2 : Xa2(a2.type) || "Memo";
      case Ra2:
        b2 = a2._payload;
        a2 = a2._init;
        try {
          return Xa2(a2(b2));
        } catch (c2) {
        }
    }
    return null;
  }
  var Ya = {};
  function Za(a2, b2) {
    a2 = a2.contextTypes;
    if (!a2) return Ya;
    var c2 = {}, d;
    for (d in a2) c2[d] = b2[d];
    return c2;
  }
  var E = null;
  function F2(a2, b2) {
    if (a2 !== b2) {
      a2.context._currentValue2 = a2.parentValue;
      a2 = a2.parent;
      var c2 = b2.parent;
      if (null === a2) {
        if (null !== c2) throw Error(l2(401));
      } else {
        if (null === c2) throw Error(l2(401));
        F2(a2, c2);
      }
      b2.context._currentValue2 = b2.value;
    }
  }
  function $a2(a2) {
    a2.context._currentValue2 = a2.parentValue;
    a2 = a2.parent;
    null !== a2 && $a2(a2);
  }
  function ab(a2) {
    var b2 = a2.parent;
    null !== b2 && ab(b2);
    a2.context._currentValue2 = a2.value;
  }
  function bb(a2, b2) {
    a2.context._currentValue2 = a2.parentValue;
    a2 = a2.parent;
    if (null === a2) throw Error(l2(402));
    a2.depth === b2.depth ? F2(a2, b2) : bb(a2, b2);
  }
  function cb(a2, b2) {
    var c2 = b2.parent;
    if (null === c2) throw Error(l2(402));
    a2.depth === c2.depth ? F2(a2, c2) : cb(a2, c2);
    b2.context._currentValue2 = b2.value;
  }
  function G2(a2) {
    var b2 = E;
    b2 !== a2 && (null === b2 ? ab(a2) : null === a2 ? $a2(b2) : b2.depth === a2.depth ? F2(b2, a2) : b2.depth > a2.depth ? bb(b2, a2) : cb(b2, a2), E = a2);
  }
  var db = { isMounted: function() {
    return false;
  }, enqueueSetState: function(a2, b2) {
    a2 = a2._reactInternals;
    null !== a2.queue && a2.queue.push(b2);
  }, enqueueReplaceState: function(a2, b2) {
    a2 = a2._reactInternals;
    a2.replace = true;
    a2.queue = [b2];
  }, enqueueForceUpdate: function() {
  } };
  function eb(a2, b2, c2, d) {
    var f = void 0 !== a2.state ? a2.state : null;
    a2.updater = db;
    a2.props = c2;
    a2.state = f;
    var e = { queue: [], replace: false };
    a2._reactInternals = e;
    var g2 = b2.contextType;
    a2.context = "object" === typeof g2 && null !== g2 ? g2._currentValue2 : d;
    g2 = b2.getDerivedStateFromProps;
    "function" === typeof g2 && (g2 = g2(c2, f), f = null === g2 || void 0 === g2 ? f : B2({}, f, g2), a2.state = f);
    if ("function" !== typeof b2.getDerivedStateFromProps && "function" !== typeof a2.getSnapshotBeforeUpdate && ("function" === typeof a2.UNSAFE_componentWillMount || "function" === typeof a2.componentWillMount)) if (b2 = a2.state, "function" === typeof a2.componentWillMount && a2.componentWillMount(), "function" === typeof a2.UNSAFE_componentWillMount && a2.UNSAFE_componentWillMount(), b2 !== a2.state && db.enqueueReplaceState(a2, a2.state, null), null !== e.queue && 0 < e.queue.length) if (b2 = e.queue, g2 = e.replace, e.queue = null, e.replace = false, g2 && 1 === b2.length) a2.state = b2[0];
    else {
      e = g2 ? b2[0] : a2.state;
      f = true;
      for (g2 = g2 ? 1 : 0; g2 < b2.length; g2++) {
        var h = b2[g2];
        h = "function" === typeof h ? h.call(a2, e, c2, d) : h;
        null != h && (f ? (f = false, e = B2({}, e, h)) : B2(e, h));
      }
      a2.state = e;
    }
    else e.queue = null;
  }
  var fb = { id: 1, overflow: "" };
  function gb(a2, b2, c2) {
    var d = a2.id;
    a2 = a2.overflow;
    var f = 32 - H(d) - 1;
    d &= ~(1 << f);
    c2 += 1;
    var e = 32 - H(b2) + f;
    if (30 < e) {
      var g2 = f - f % 5;
      e = (d & (1 << g2) - 1).toString(32);
      d >>= g2;
      f -= g2;
      return { id: 1 << 32 - H(b2) + f | c2 << f | d, overflow: e + a2 };
    }
    return { id: 1 << e | c2 << f | d, overflow: a2 };
  }
  var H = Math.clz32 ? Math.clz32 : hb, ib = Math.log, jb = Math.LN2;
  function hb(a2) {
    a2 >>>= 0;
    return 0 === a2 ? 32 : 31 - (ib(a2) / jb | 0) | 0;
  }
  function kb(a2, b2) {
    return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
  }
  var lb = "function" === typeof Object.is ? Object.is : kb, I2 = null, ob = null, J2 = null, K = null, L = false, M = false, N = 0, O2 = null, P = 0;
  function Q() {
    if (null === I2) throw Error(l2(321));
    return I2;
  }
  function pb() {
    if (0 < P) throw Error(l2(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function qb() {
    null === K ? null === J2 ? (L = false, J2 = K = pb()) : (L = true, K = J2) : null === K.next ? (L = false, K = K.next = pb()) : (L = true, K = K.next);
    return K;
  }
  function rb() {
    ob = I2 = null;
    M = false;
    J2 = null;
    P = 0;
    K = O2 = null;
  }
  function sb(a2, b2) {
    return "function" === typeof b2 ? b2(a2) : b2;
  }
  function tb(a2, b2, c2) {
    I2 = Q();
    K = qb();
    if (L) {
      var d = K.queue;
      b2 = d.dispatch;
      if (null !== O2 && (c2 = O2.get(d), void 0 !== c2)) {
        O2.delete(d);
        d = K.memoizedState;
        do
          d = a2(d, c2.action), c2 = c2.next;
        while (null !== c2);
        K.memoizedState = d;
        return [d, b2];
      }
      return [K.memoizedState, b2];
    }
    a2 = a2 === sb ? "function" === typeof b2 ? b2() : b2 : void 0 !== c2 ? c2(b2) : b2;
    K.memoizedState = a2;
    a2 = K.queue = { last: null, dispatch: null };
    a2 = a2.dispatch = ub.bind(null, I2, a2);
    return [K.memoizedState, a2];
  }
  function vb(a2, b2) {
    I2 = Q();
    K = qb();
    b2 = void 0 === b2 ? null : b2;
    if (null !== K) {
      var c2 = K.memoizedState;
      if (null !== c2 && null !== b2) {
        var d = c2[1];
        a: if (null === d) d = false;
        else {
          for (var f = 0; f < d.length && f < b2.length; f++) if (!lb(b2[f], d[f])) {
            d = false;
            break a;
          }
          d = true;
        }
        if (d) return c2[0];
      }
    }
    a2 = a2();
    K.memoizedState = [a2, b2];
    return a2;
  }
  function ub(a2, b2, c2) {
    if (25 <= P) throw Error(l2(301));
    if (a2 === I2) if (M = true, a2 = { action: c2, next: null }, null === O2 && (O2 = /* @__PURE__ */ new Map()), c2 = O2.get(b2), void 0 === c2) O2.set(b2, a2);
    else {
      for (b2 = c2; null !== b2.next; ) b2 = b2.next;
      b2.next = a2;
    }
  }
  function wb() {
    throw Error(l2(394));
  }
  function R() {
  }
  var xb = { readContext: function(a2) {
    return a2._currentValue2;
  }, useContext: function(a2) {
    Q();
    return a2._currentValue2;
  }, useMemo: vb, useReducer: tb, useRef: function(a2) {
    I2 = Q();
    K = qb();
    var b2 = K.memoizedState;
    return null === b2 ? (a2 = { current: a2 }, K.memoizedState = a2) : b2;
  }, useState: function(a2) {
    return tb(sb, a2);
  }, useInsertionEffect: R, useLayoutEffect: function() {
  }, useCallback: function(a2, b2) {
    return vb(function() {
      return a2;
    }, b2);
  }, useImperativeHandle: R, useEffect: R, useDebugValue: R, useDeferredValue: function(a2) {
    Q();
    return a2;
  }, useTransition: function() {
    Q();
    return [
      false,
      wb
    ];
  }, useId: function() {
    var a2 = ob.treeContext;
    var b2 = a2.overflow;
    a2 = a2.id;
    a2 = (a2 & ~(1 << 32 - H(a2) - 1)).toString(32) + b2;
    var c2 = S;
    if (null === c2) throw Error(l2(404));
    b2 = N++;
    a2 = ":" + c2.idPrefix + "R" + a2;
    0 < b2 && (a2 += "H" + b2.toString(32));
    return a2 + ":";
  }, useMutableSource: function(a2, b2) {
    Q();
    return b2(a2._source);
  }, useSyncExternalStore: function(a2, b2, c2) {
    if (void 0 === c2) throw Error(l2(407));
    return c2();
  } }, S = null, yb = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function zb(a2) {
    console.error(a2);
    return null;
  }
  function T() {
  }
  function Ab(a2, b2, c2, d, f, e, g2, h, k) {
    var m = [], n = /* @__PURE__ */ new Set();
    b2 = { destination: null, responseState: b2, progressiveChunkSize: void 0 === d ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: n, pingedTasks: m, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: void 0 === f ? zb : f, onAllReady: T, onShellReady: void 0 === g2 ? T : g2, onShellError: T, onFatalError: T };
    c2 = U(b2, 0, null, c2, false, false);
    c2.parentFlushed = true;
    a2 = Bb(b2, a2, null, c2, n, Ya, null, fb);
    m.push(a2);
    return b2;
  }
  function Bb(a2, b2, c2, d, f, e, g2, h) {
    a2.allPendingTasks++;
    null === c2 ? a2.pendingRootTasks++ : c2.pendingTasks++;
    var k = { node: b2, ping: function() {
      var b3 = a2.pingedTasks;
      b3.push(k);
      1 === b3.length && Cb(a2);
    }, blockedBoundary: c2, blockedSegment: d, abortSet: f, legacyContext: e, context: g2, treeContext: h };
    f.add(k);
    return k;
  }
  function U(a2, b2, c2, d, f, e) {
    return { status: 0, id: -1, index: b2, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c2, lastPushedText: f, textEmbedded: e };
  }
  function V(a2, b2) {
    a2 = a2.onError(b2);
    if (null != a2 && "string" !== typeof a2) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a2 + '" instead');
    return a2;
  }
  function W(a2, b2) {
    var c2 = a2.onShellError;
    c2(b2);
    c2 = a2.onFatalError;
    c2(b2);
    null !== a2.destination ? (a2.status = 2, a2.destination.destroy(b2)) : (a2.status = 1, a2.fatalError = b2);
  }
  function Db(a2, b2, c2, d, f) {
    I2 = {};
    ob = b2;
    N = 0;
    for (a2 = c2(d, f); M; ) M = false, N = 0, P += 1, K = null, a2 = c2(d, f);
    rb();
    return a2;
  }
  function Eb(a2, b2, c2, d) {
    var f = c2.render(), e = d.childContextTypes;
    if (null !== e && void 0 !== e) {
      var g2 = b2.legacyContext;
      if ("function" !== typeof c2.getChildContext) d = g2;
      else {
        c2 = c2.getChildContext();
        for (var h in c2) if (!(h in e)) throw Error(l2(108, Xa2(d) || "Unknown", h));
        d = B2({}, g2, c2);
      }
      b2.legacyContext = d;
      X(a2, b2, f);
      b2.legacyContext = g2;
    } else X(a2, b2, f);
  }
  function Fb(a2, b2) {
    if (a2 && a2.defaultProps) {
      b2 = B2({}, b2);
      a2 = a2.defaultProps;
      for (var c2 in a2) void 0 === b2[c2] && (b2[c2] = a2[c2]);
      return b2;
    }
    return b2;
  }
  function Gb(a2, b2, c2, d, f) {
    if ("function" === typeof c2) if (c2.prototype && c2.prototype.isReactComponent) {
      f = Za(c2, b2.legacyContext);
      var e = c2.contextType;
      e = new c2(d, "object" === typeof e && null !== e ? e._currentValue2 : f);
      eb(e, c2, d, f);
      Eb(a2, b2, e, c2);
    } else {
      e = Za(c2, b2.legacyContext);
      f = Db(a2, b2, c2, d, e);
      var g2 = 0 !== N;
      if ("object" === typeof f && null !== f && "function" === typeof f.render && void 0 === f.$$typeof) eb(f, c2, d, e), Eb(a2, b2, f, c2);
      else if (g2) {
        d = b2.treeContext;
        b2.treeContext = gb(d, 1, 0);
        try {
          X(a2, b2, f);
        } finally {
          b2.treeContext = d;
        }
      } else X(a2, b2, f);
    }
    else if ("string" === typeof c2) {
      f = b2.blockedSegment;
      e = ya2(f.chunks, c2, d, a2.responseState, f.formatContext);
      f.lastPushedText = false;
      g2 = f.formatContext;
      f.formatContext = ra(g2, c2, d);
      Hb(a2, b2, e);
      f.formatContext = g2;
      switch (c2) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          f.chunks.push("</", c2, ">");
      }
      f.lastPushedText = false;
    } else {
      switch (c2) {
        case Ua2:
        case Ta2:
        case Ja2:
        case Ka2:
        case Ia2:
          X(a2, b2, d.children);
          return;
        case Pa2:
          X(a2, b2, d.children);
          return;
        case Sa2:
          throw Error(l2(343));
        case Oa2:
          a: {
            c2 = b2.blockedBoundary;
            f = b2.blockedSegment;
            e = d.fallback;
            d = d.children;
            g2 = /* @__PURE__ */ new Set();
            var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g2, errorDigest: null }, k = U(a2, f.chunks.length, h, f.formatContext, false, false);
            f.children.push(k);
            f.lastPushedText = false;
            var m = U(a2, 0, null, f.formatContext, false, false);
            m.parentFlushed = true;
            b2.blockedBoundary = h;
            b2.blockedSegment = m;
            try {
              if (Hb(
                a2,
                b2,
                d
              ), a2.responseState.generateStaticMarkup || m.lastPushedText && m.textEmbedded && m.chunks.push("<!-- -->"), m.status = 1, Y2(h, m), 0 === h.pendingTasks) break a;
            } catch (n) {
              m.status = 4, h.forceClientRender = true, h.errorDigest = V(a2, n);
            } finally {
              b2.blockedBoundary = c2, b2.blockedSegment = f;
            }
            b2 = Bb(a2, e, c2, k, g2, b2.legacyContext, b2.context, b2.treeContext);
            a2.pingedTasks.push(b2);
          }
          return;
      }
      if ("object" === typeof c2 && null !== c2) switch (c2.$$typeof) {
        case Na:
          d = Db(a2, b2, c2.render, d, f);
          if (0 !== N) {
            c2 = b2.treeContext;
            b2.treeContext = gb(c2, 1, 0);
            try {
              X(a2, b2, d);
            } finally {
              b2.treeContext = c2;
            }
          } else X(a2, b2, d);
          return;
        case Qa2:
          c2 = c2.type;
          d = Fb(c2, d);
          Gb(a2, b2, c2, d, f);
          return;
        case La:
          f = d.children;
          c2 = c2._context;
          d = d.value;
          e = c2._currentValue2;
          c2._currentValue2 = d;
          g2 = E;
          E = d = { parent: g2, depth: null === g2 ? 0 : g2.depth + 1, context: c2, parentValue: e, value: d };
          b2.context = d;
          X(a2, b2, f);
          a2 = E;
          if (null === a2) throw Error(l2(403));
          d = a2.parentValue;
          a2.context._currentValue2 = d === Va ? a2.context._defaultValue : d;
          a2 = E = a2.parent;
          b2.context = a2;
          return;
        case Ma:
          d = d.children;
          d = d(c2._currentValue2);
          X(a2, b2, d);
          return;
        case Ra2:
          f = c2._init;
          c2 = f(c2._payload);
          d = Fb(c2, d);
          Gb(
            a2,
            b2,
            c2,
            d,
            void 0
          );
          return;
      }
      throw Error(l2(130, null == c2 ? c2 : typeof c2, ""));
    }
  }
  function X(a2, b2, c2) {
    b2.node = c2;
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case Ga2:
          Gb(a2, b2, c2.type, c2.props, c2.ref);
          return;
        case Ha2:
          throw Error(l2(257));
        case Ra2:
          var d = c2._init;
          c2 = d(c2._payload);
          X(a2, b2, c2);
          return;
      }
      if (qa2(c2)) {
        Ib(a2, b2, c2);
        return;
      }
      null === c2 || "object" !== typeof c2 ? d = null : (d = Wa2 && c2[Wa2] || c2["@@iterator"], d = "function" === typeof d ? d : null);
      if (d && (d = d.call(c2))) {
        c2 = d.next();
        if (!c2.done) {
          var f = [];
          do
            f.push(c2.value), c2 = d.next();
          while (!c2.done);
          Ib(a2, b2, f);
        }
        return;
      }
      a2 = Object.prototype.toString.call(c2);
      throw Error(l2(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(c2).join(", ") + "}" : a2));
    }
    "string" === typeof c2 ? (d = b2.blockedSegment, d.lastPushedText = Fa2(b2.blockedSegment.chunks, c2, a2.responseState, d.lastPushedText)) : "number" === typeof c2 && (d = b2.blockedSegment, d.lastPushedText = Fa2(b2.blockedSegment.chunks, "" + c2, a2.responseState, d.lastPushedText));
  }
  function Ib(a2, b2, c2) {
    for (var d = c2.length, f = 0; f < d; f++) {
      var e = b2.treeContext;
      b2.treeContext = gb(e, d, f);
      try {
        Hb(a2, b2, c2[f]);
      } finally {
        b2.treeContext = e;
      }
    }
  }
  function Hb(a2, b2, c2) {
    var d = b2.blockedSegment.formatContext, f = b2.legacyContext, e = b2.context;
    try {
      return X(a2, b2, c2);
    } catch (k) {
      if (rb(), "object" === typeof k && null !== k && "function" === typeof k.then) {
        c2 = k;
        var g2 = b2.blockedSegment, h = U(a2, g2.chunks.length, null, g2.formatContext, g2.lastPushedText, true);
        g2.children.push(h);
        g2.lastPushedText = false;
        a2 = Bb(a2, b2.node, b2.blockedBoundary, h, b2.abortSet, b2.legacyContext, b2.context, b2.treeContext).ping;
        c2.then(a2, a2);
        b2.blockedSegment.formatContext = d;
        b2.legacyContext = f;
        b2.context = e;
        G2(e);
      } else throw b2.blockedSegment.formatContext = d, b2.legacyContext = f, b2.context = e, G2(e), k;
    }
  }
  function Jb(a2) {
    var b2 = a2.blockedBoundary;
    a2 = a2.blockedSegment;
    a2.status = 3;
    Kb(this, b2, a2);
  }
  function Lb(a2, b2, c2) {
    var d = a2.blockedBoundary;
    a2.blockedSegment.status = 3;
    null === d ? (b2.allPendingTasks--, 2 !== b2.status && (b2.status = 2, null !== b2.destination && b2.destination.push(null))) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, a2 = void 0 === c2 ? Error(l2(432)) : c2, d.errorDigest = b2.onError(a2), d.parentFlushed && b2.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a3) {
      return Lb(a3, b2, c2);
    }), d.fallbackAbortableTasks.clear(), b2.allPendingTasks--, 0 === b2.allPendingTasks && (d = b2.onAllReady, d()));
  }
  function Y2(a2, b2) {
    if (0 === b2.chunks.length && 1 === b2.children.length && null === b2.children[0].boundary) {
      var c2 = b2.children[0];
      c2.id = b2.id;
      c2.parentFlushed = true;
      1 === c2.status && Y2(a2, c2);
    } else a2.completedSegments.push(b2);
  }
  function Kb(a2, b2, c2) {
    if (null === b2) {
      if (c2.parentFlushed) {
        if (null !== a2.completedRootSegment) throw Error(l2(389));
        a2.completedRootSegment = c2;
      }
      a2.pendingRootTasks--;
      0 === a2.pendingRootTasks && (a2.onShellError = T, b2 = a2.onShellReady, b2());
    } else b2.pendingTasks--, b2.forceClientRender || (0 === b2.pendingTasks ? (c2.parentFlushed && 1 === c2.status && Y2(b2, c2), b2.parentFlushed && a2.completedBoundaries.push(b2), b2.fallbackAbortableTasks.forEach(Jb, a2), b2.fallbackAbortableTasks.clear()) : c2.parentFlushed && 1 === c2.status && (Y2(b2, c2), 1 === b2.completedSegments.length && b2.parentFlushed && a2.partialBoundaries.push(b2)));
    a2.allPendingTasks--;
    0 === a2.allPendingTasks && (a2 = a2.onAllReady, a2());
  }
  function Cb(a2) {
    if (2 !== a2.status) {
      var b2 = E, c2 = yb.current;
      yb.current = xb;
      var d = S;
      S = a2.responseState;
      try {
        var f = a2.pingedTasks, e;
        for (e = 0; e < f.length; e++) {
          var g2 = f[e];
          var h = a2, k = g2.blockedSegment;
          if (0 === k.status) {
            G2(g2.context);
            try {
              X(h, g2, g2.node), h.responseState.generateStaticMarkup || k.lastPushedText && k.textEmbedded && k.chunks.push("<!-- -->"), g2.abortSet.delete(g2), k.status = 1, Kb(h, g2.blockedBoundary, k);
            } catch (z) {
              if (rb(), "object" === typeof z && null !== z && "function" === typeof z.then) {
                var m = g2.ping;
                z.then(m, m);
              } else {
                g2.abortSet.delete(g2);
                k.status = 4;
                var n = g2.blockedBoundary, q = z, C = V(h, q);
                null === n ? W(h, q) : (n.pendingTasks--, n.forceClientRender || (n.forceClientRender = true, n.errorDigest = C, n.parentFlushed && h.clientRenderedBoundaries.push(n)));
                h.allPendingTasks--;
                if (0 === h.allPendingTasks) {
                  var D2 = h.onAllReady;
                  D2();
                }
              }
            } finally {
            }
          }
        }
        f.splice(0, e);
        null !== a2.destination && Mb(a2, a2.destination);
      } catch (z) {
        V(a2, z), W(a2, z);
      } finally {
        S = d, yb.current = c2, c2 === xb && G2(b2);
      }
    }
  }
  function Z2(a2, b2, c2) {
    c2.parentFlushed = true;
    switch (c2.status) {
      case 0:
        var d = c2.id = a2.nextSegmentId++;
        c2.lastPushedText = false;
        c2.textEmbedded = false;
        a2 = a2.responseState;
        b2.push('<template id="');
        b2.push(a2.placeholderPrefix);
        a2 = d.toString(16);
        b2.push(a2);
        return b2.push('"></template>');
      case 1:
        c2.status = 2;
        var f = true;
        d = c2.chunks;
        var e = 0;
        c2 = c2.children;
        for (var g2 = 0; g2 < c2.length; g2++) {
          for (f = c2[g2]; e < f.index; e++) b2.push(d[e]);
          f = Nb(a2, b2, f);
        }
        for (; e < d.length - 1; e++) b2.push(d[e]);
        e < d.length && (f = b2.push(d[e]));
        return f;
      default:
        throw Error(l2(390));
    }
  }
  function Nb(a2, b2, c2) {
    var d = c2.boundary;
    if (null === d) return Z2(a2, b2, c2);
    d.parentFlushed = true;
    if (d.forceClientRender) return a2.responseState.generateStaticMarkup || (d = d.errorDigest, b2.push("<!--$!-->"), b2.push("<template"), d && (b2.push(' data-dgst="'), d = v(d), b2.push(d), b2.push('"')), b2.push("></template>")), Z2(a2, b2, c2), a2 = a2.responseState.generateStaticMarkup ? true : b2.push("<!--/$-->"), a2;
    if (0 < d.pendingTasks) {
      d.rootSegmentID = a2.nextSegmentId++;
      0 < d.completedSegments.length && a2.partialBoundaries.push(d);
      var f = a2.responseState;
      var e = f.nextSuspenseID++;
      f = f.boundaryPrefix + e.toString(16);
      d = d.id = f;
      za(b2, a2.responseState, d);
      Z2(a2, b2, c2);
      return b2.push("<!--/$-->");
    }
    if (d.byteSize > a2.progressiveChunkSize) return d.rootSegmentID = a2.nextSegmentId++, a2.completedBoundaries.push(d), za(b2, a2.responseState, d.id), Z2(a2, b2, c2), b2.push("<!--/$-->");
    a2.responseState.generateStaticMarkup || b2.push("<!--$-->");
    c2 = d.completedSegments;
    if (1 !== c2.length) throw Error(l2(391));
    Nb(a2, b2, c2[0]);
    a2 = a2.responseState.generateStaticMarkup ? true : b2.push("<!--/$-->");
    return a2;
  }
  function Ob(a2, b2, c2) {
    Aa2(b2, a2.responseState, c2.formatContext, c2.id);
    Nb(a2, b2, c2);
    return Ba2(b2, c2.formatContext);
  }
  function Pb(a2, b2, c2) {
    for (var d = c2.completedSegments, f = 0; f < d.length; f++) Qb(a2, b2, c2, d[f]);
    d.length = 0;
    a2 = a2.responseState;
    d = c2.id;
    c2 = c2.rootSegmentID;
    b2.push(a2.startInlineScript);
    a2.sentCompleteBoundaryFunction ? b2.push('$RC("') : (a2.sentCompleteBoundaryFunction = true, b2.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'));
    if (null === d) throw Error(l2(395));
    c2 = c2.toString(16);
    b2.push(d);
    b2.push('","');
    b2.push(a2.segmentPrefix);
    b2.push(c2);
    return b2.push('")<\/script>');
  }
  function Qb(a2, b2, c2, d) {
    if (2 === d.status) return true;
    var f = d.id;
    if (-1 === f) {
      if (-1 === (d.id = c2.rootSegmentID)) throw Error(l2(392));
      return Ob(a2, b2, d);
    }
    Ob(a2, b2, d);
    a2 = a2.responseState;
    b2.push(a2.startInlineScript);
    a2.sentCompleteSegmentFunction ? b2.push('$RS("') : (a2.sentCompleteSegmentFunction = true, b2.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'));
    b2.push(a2.segmentPrefix);
    f = f.toString(16);
    b2.push(f);
    b2.push('","');
    b2.push(a2.placeholderPrefix);
    b2.push(f);
    return b2.push('")<\/script>');
  }
  function Mb(a2, b2) {
    try {
      var c2 = a2.completedRootSegment;
      if (null !== c2 && 0 === a2.pendingRootTasks) {
        Nb(a2, b2, c2);
        a2.completedRootSegment = null;
        var d = a2.responseState.bootstrapChunks;
        for (c2 = 0; c2 < d.length - 1; c2++) b2.push(d[c2]);
        c2 < d.length && b2.push(d[c2]);
      }
      var f = a2.clientRenderedBoundaries, e;
      for (e = 0; e < f.length; e++) {
        var g2 = f[e];
        d = b2;
        var h = a2.responseState, k = g2.id, m = g2.errorDigest, n = g2.errorMessage, q = g2.errorComponentStack;
        d.push(h.startInlineScript);
        h.sentClientRenderFunction ? d.push('$RX("') : (h.sentClientRenderFunction = true, d.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'));
        if (null === k) throw Error(l2(395));
        d.push(k);
        d.push('"');
        if (m || n || q) {
          d.push(",");
          var C = Da2(m || "");
          d.push(C);
        }
        if (n || q) {
          d.push(",");
          var D2 = Da2(n || "");
          d.push(D2);
        }
        if (q) {
          d.push(",");
          var z = Da2(q);
          d.push(z);
        }
        if (!d.push(")<\/script>")) {
          a2.destination = null;
          e++;
          f.splice(0, e);
          return;
        }
      }
      f.splice(0, e);
      var ba2 = a2.completedBoundaries;
      for (e = 0; e < ba2.length; e++) if (!Pb(a2, b2, ba2[e])) {
        a2.destination = null;
        e++;
        ba2.splice(0, e);
        return;
      }
      ba2.splice(0, e);
      var ca2 = a2.partialBoundaries;
      for (e = 0; e < ca2.length; e++) {
        var mb = ca2[e];
        a: {
          f = a2;
          g2 = b2;
          var da = mb.completedSegments;
          for (h = 0; h < da.length; h++) if (!Qb(f, g2, mb, da[h])) {
            h++;
            da.splice(0, h);
            var nb = false;
            break a;
          }
          da.splice(0, h);
          nb = true;
        }
        if (!nb) {
          a2.destination = null;
          e++;
          ca2.splice(0, e);
          return;
        }
      }
      ca2.splice(0, e);
      var ea2 = a2.completedBoundaries;
      for (e = 0; e < ea2.length; e++) if (!Pb(a2, b2, ea2[e])) {
        a2.destination = null;
        e++;
        ea2.splice(0, e);
        return;
      }
      ea2.splice(0, e);
    } finally {
      0 === a2.allPendingTasks && 0 === a2.pingedTasks.length && 0 === a2.clientRenderedBoundaries.length && 0 === a2.completedBoundaries.length && b2.push(null);
    }
  }
  function Rb(a2, b2) {
    try {
      var c2 = a2.abortableTasks;
      c2.forEach(function(c3) {
        return Lb(c3, a2, b2);
      });
      c2.clear();
      null !== a2.destination && Mb(a2, a2.destination);
    } catch (d) {
      V(a2, d), W(a2, d);
    }
  }
  function Sb() {
  }
  function Tb(a2, b2, c2, d) {
    var f = false, e = null, g2 = "", h = { push: function(a3) {
      null !== a3 && (g2 += a3);
      return true;
    }, destroy: function(a3) {
      f = true;
      e = a3;
    } }, k = false;
    a2 = Ab(a2, Ea2(c2, b2 ? b2.identifierPrefix : void 0), { insertionMode: 1, selectedValue: null }, Infinity, Sb, void 0, function() {
      k = true;
    });
    Cb(a2);
    Rb(a2, d);
    if (1 === a2.status) a2.status = 2, h.destroy(a2.fatalError);
    else if (2 !== a2.status && null === a2.destination) {
      a2.destination = h;
      try {
        Mb(a2, h);
      } catch (m) {
        V(a2, m), W(a2, m);
      }
    }
    if (f) throw e;
    if (!k) throw Error(l2(426));
    return g2;
  }
  reactDomServerLegacy_browser_production_min.renderToNodeStream = function() {
    throw Error(l2(207));
  };
  reactDomServerLegacy_browser_production_min.renderToStaticMarkup = function(a2, b2) {
    return Tb(a2, b2, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  };
  reactDomServerLegacy_browser_production_min.renderToStaticNodeStream = function() {
    throw Error(l2(208));
  };
  reactDomServerLegacy_browser_production_min.renderToString = function(a2, b2) {
    return Tb(a2, b2, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
  };
  reactDomServerLegacy_browser_production_min.version = "18.3.1";
  return reactDomServerLegacy_browser_production_min;
}
var reactDomServer_browser_production_min = {};
/**
 * @license React
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDomServer_browser_production_min;
function requireReactDomServer_browser_production_min() {
  if (hasRequiredReactDomServer_browser_production_min) return reactDomServer_browser_production_min;
  hasRequiredReactDomServer_browser_production_min = 1;
  var aa = requireReact();
  function k(a2) {
    for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
    return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var l2 = null, n = 0;
  function p(a2, b2) {
    if (0 !== b2.length) if (512 < b2.length) 0 < n && (a2.enqueue(new Uint8Array(l2.buffer, 0, n)), l2 = new Uint8Array(512), n = 0), a2.enqueue(b2);
    else {
      var c2 = l2.length - n;
      c2 < b2.length && (0 === c2 ? a2.enqueue(l2) : (l2.set(b2.subarray(0, c2), n), a2.enqueue(l2), b2 = b2.subarray(c2)), l2 = new Uint8Array(512), n = 0);
      l2.set(b2, n);
      n += b2.length;
    }
  }
  function t(a2, b2) {
    p(a2, b2);
    return true;
  }
  function ba2(a2) {
    l2 && 0 < n && (a2.enqueue(new Uint8Array(l2.buffer, 0, n)), l2 = null, n = 0);
  }
  var ca2 = new TextEncoder();
  function u2(a2) {
    return ca2.encode(a2);
  }
  function w2(a2) {
    return ca2.encode(a2);
  }
  function da(a2, b2) {
    "function" === typeof a2.error ? a2.error(b2) : a2.close();
  }
  var x2 = Object.prototype.hasOwnProperty, ea2 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, fa2 = {}, ha2 = {};
  function ia(a2) {
    if (x2.call(ha2, a2)) return true;
    if (x2.call(fa2, a2)) return false;
    if (ea2.test(a2)) return ha2[a2] = true;
    fa2[a2] = true;
    return false;
  }
  function y(a2, b2, c2, d, f, e, g2) {
    this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
    this.attributeName = d;
    this.attributeNamespace = f;
    this.mustUseProperty = c2;
    this.propertyName = a2;
    this.type = b2;
    this.sanitizeURL = e;
    this.removeEmptyString = g2;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
    z[a2] = new y(a2, 0, false, a2, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
    var b2 = a2[0];
    z[b2] = new y(b2, 1, false, a2[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
    z[a2] = new y(a2, 2, false, a2.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
    z[a2] = new y(a2, 2, false, a2, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
    z[a2] = new y(a2, 3, false, a2.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
    z[a2] = new y(a2, 3, true, a2, null, false, false);
  });
  ["capture", "download"].forEach(function(a2) {
    z[a2] = new y(a2, 4, false, a2, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a2) {
    z[a2] = new y(a2, 6, false, a2, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a2) {
    z[a2] = new y(a2, 5, false, a2.toLowerCase(), null, false, false);
  });
  var ja2 = /[\-:]([a-z])/g;
  function ka2(a2) {
    return a2[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
    var b2 = a2.replace(
      ja2,
      ka2
    );
    z[b2] = new y(b2, 1, false, a2, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
    var b2 = a2.replace(ja2, ka2);
    z[b2] = new y(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
    var b2 = a2.replace(ja2, ka2);
    z[b2] = new y(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a2) {
    z[a2] = new y(a2, 1, false, a2.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new y("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a2) {
    z[a2] = new y(a2, 1, false, a2.toLowerCase(), null, true, true);
  });
  var B2 = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, la = ["Webkit", "ms", "Moz", "O"];
  Object.keys(B2).forEach(function(a2) {
    la.forEach(function(b2) {
      b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
      B2[b2] = B2[a2];
    });
  });
  var oa2 = /["'&<>]/;
  function C(a2) {
    if ("boolean" === typeof a2 || "number" === typeof a2) return "" + a2;
    a2 = "" + a2;
    var b2 = oa2.exec(a2);
    if (b2) {
      var c2 = "", d, f = 0;
      for (d = b2.index; d < a2.length; d++) {
        switch (a2.charCodeAt(d)) {
          case 34:
            b2 = "&quot;";
            break;
          case 38:
            b2 = "&amp;";
            break;
          case 39:
            b2 = "&#x27;";
            break;
          case 60:
            b2 = "&lt;";
            break;
          case 62:
            b2 = "&gt;";
            break;
          default:
            continue;
        }
        f !== d && (c2 += a2.substring(f, d));
        f = d + 1;
        c2 += b2;
      }
      a2 = f !== d ? c2 + a2.substring(f, d) : c2;
    }
    return a2;
  }
  var pa = /([A-Z])/g, qa2 = /^ms-/, ra = Array.isArray, sa = w2("<script>"), ta = w2("<\/script>"), ua2 = w2('<script src="'), va2 = w2('<script type="module" src="'), wa2 = w2('" async=""><\/script>'), xa2 = /(<\/|<)(s)(cript)/gi;
  function ya2(a2, b2, c2, d) {
    return "" + b2 + ("s" === c2 ? "\\u0073" : "\\u0053") + d;
  }
  function za(a2, b2, c2, d, f) {
    a2 = void 0 === a2 ? "" : a2;
    b2 = void 0 === b2 ? sa : w2('<script nonce="' + C(b2) + '">');
    var e = [];
    void 0 !== c2 && e.push(b2, u2(("" + c2).replace(xa2, ya2)), ta);
    if (void 0 !== d) for (c2 = 0; c2 < d.length; c2++) e.push(ua2, u2(C(d[c2])), wa2);
    if (void 0 !== f) for (d = 0; d < f.length; d++) e.push(va2, u2(C(f[d])), wa2);
    return { bootstrapChunks: e, startInlineScript: b2, placeholderPrefix: w2(a2 + "P:"), segmentPrefix: w2(a2 + "S:"), boundaryPrefix: a2 + "B:", idPrefix: a2, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false };
  }
  function D2(a2, b2) {
    return { insertionMode: a2, selectedValue: b2 };
  }
  function Aa2(a2) {
    return D2("http://www.w3.org/2000/svg" === a2 ? 2 : "http://www.w3.org/1998/Math/MathML" === a2 ? 3 : 0, null);
  }
  function Ba2(a2, b2, c2) {
    switch (b2) {
      case "select":
        return D2(1, null != c2.value ? c2.value : c2.defaultValue);
      case "svg":
        return D2(2, null);
      case "math":
        return D2(3, null);
      case "foreignObject":
        return D2(1, null);
      case "table":
        return D2(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return D2(5, null);
      case "colgroup":
        return D2(7, null);
      case "tr":
        return D2(6, null);
    }
    return 4 <= a2.insertionMode || 0 === a2.insertionMode ? D2(1, null) : a2;
  }
  var Ca2 = w2("<!-- -->");
  function Da2(a2, b2, c2, d) {
    if ("" === b2) return d;
    d && a2.push(Ca2);
    a2.push(u2(C(b2)));
    return true;
  }
  var Ea2 = /* @__PURE__ */ new Map(), Fa2 = w2(' style="'), Ga2 = w2(":"), Ha2 = w2(";");
  function Ia2(a2, b2, c2) {
    if ("object" !== typeof c2) throw Error(k(62));
    b2 = true;
    for (var d in c2) if (x2.call(c2, d)) {
      var f = c2[d];
      if (null != f && "boolean" !== typeof f && "" !== f) {
        if (0 === d.indexOf("--")) {
          var e = u2(C(d));
          f = u2(C(("" + f).trim()));
        } else {
          e = d;
          var g2 = Ea2.get(e);
          void 0 !== g2 ? e = g2 : (g2 = w2(C(e.replace(pa, "-$1").toLowerCase().replace(qa2, "-ms-"))), Ea2.set(e, g2), e = g2);
          f = "number" === typeof f ? 0 === f || x2.call(B2, d) ? u2("" + f) : u2(f + "px") : u2(C(("" + f).trim()));
        }
        b2 ? (b2 = false, a2.push(Fa2, e, Ga2, f)) : a2.push(Ha2, e, Ga2, f);
      }
    }
    b2 || a2.push(E);
  }
  var H = w2(" "), I2 = w2('="'), E = w2('"'), Ja2 = w2('=""');
  function J2(a2, b2, c2, d) {
    switch (c2) {
      case "style":
        Ia2(a2, b2, d);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (!(2 < c2.length) || "o" !== c2[0] && "O" !== c2[0] || "n" !== c2[1] && "N" !== c2[1]) {
      if (b2 = z.hasOwnProperty(c2) ? z[c2] : null, null !== b2) {
        switch (typeof d) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!b2.acceptsBooleans) return;
        }
        c2 = u2(b2.attributeName);
        switch (b2.type) {
          case 3:
            d && a2.push(H, c2, Ja2);
            break;
          case 4:
            true === d ? a2.push(H, c2, Ja2) : false !== d && a2.push(H, c2, I2, u2(C(d)), E);
            break;
          case 5:
            isNaN(d) || a2.push(H, c2, I2, u2(C(d)), E);
            break;
          case 6:
            !isNaN(d) && 1 <= d && a2.push(H, c2, I2, u2(C(d)), E);
            break;
          default:
            b2.sanitizeURL && (d = "" + d), a2.push(H, c2, I2, u2(C(d)), E);
        }
      } else if (ia(c2)) {
        switch (typeof d) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (b2 = c2.toLowerCase().slice(0, 5), "data-" !== b2 && "aria-" !== b2) return;
        }
        a2.push(H, u2(c2), I2, u2(C(d)), E);
      }
    }
  }
  var K = w2(">"), Ka2 = w2("/>");
  function L(a2, b2, c2) {
    if (null != b2) {
      if (null != c2) throw Error(k(60));
      if ("object" !== typeof b2 || !("__html" in b2)) throw Error(k(61));
      b2 = b2.__html;
      null !== b2 && void 0 !== b2 && a2.push(u2("" + b2));
    }
  }
  function La(a2) {
    var b2 = "";
    aa.Children.forEach(a2, function(a3) {
      null != a3 && (b2 += a3);
    });
    return b2;
  }
  var Ma = w2(' selected=""');
  function Na(a2, b2, c2, d) {
    a2.push(M(c2));
    var f = c2 = null, e;
    for (e in b2) if (x2.call(b2, e)) {
      var g2 = b2[e];
      if (null != g2) switch (e) {
        case "children":
          c2 = g2;
          break;
        case "dangerouslySetInnerHTML":
          f = g2;
          break;
        default:
          J2(a2, d, e, g2);
      }
    }
    a2.push(K);
    L(a2, f, c2);
    return "string" === typeof c2 ? (a2.push(u2(C(c2))), null) : c2;
  }
  var Oa2 = w2("\n"), Pa2 = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Qa2 = /* @__PURE__ */ new Map();
  function M(a2) {
    var b2 = Qa2.get(a2);
    if (void 0 === b2) {
      if (!Pa2.test(a2)) throw Error(k(65, a2));
      b2 = w2("<" + a2);
      Qa2.set(a2, b2);
    }
    return b2;
  }
  var Ra2 = w2("<!DOCTYPE html>");
  function Sa2(a2, b2, c2, d, f) {
    switch (b2) {
      case "select":
        a2.push(M("select"));
        var e = null, g2 = null;
        for (r in c2) if (x2.call(c2, r)) {
          var h = c2[r];
          if (null != h) switch (r) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g2 = h;
              break;
            case "defaultValue":
            case "value":
              break;
            default:
              J2(a2, d, r, h);
          }
        }
        a2.push(K);
        L(a2, g2, e);
        return e;
      case "option":
        g2 = f.selectedValue;
        a2.push(M("option"));
        var m = h = null, q = null;
        var r = null;
        for (e in c2) if (x2.call(c2, e)) {
          var v = c2[e];
          if (null != v) switch (e) {
            case "children":
              h = v;
              break;
            case "selected":
              q = v;
              break;
            case "dangerouslySetInnerHTML":
              r = v;
              break;
            case "value":
              m = v;
            default:
              J2(a2, d, e, v);
          }
        }
        if (null != g2) if (c2 = null !== m ? "" + m : La(h), ra(g2)) for (d = 0; d < g2.length; d++) {
          if ("" + g2[d] === c2) {
            a2.push(Ma);
            break;
          }
        }
        else "" + g2 === c2 && a2.push(Ma);
        else q && a2.push(Ma);
        a2.push(K);
        L(a2, r, h);
        return h;
      case "textarea":
        a2.push(M("textarea"));
        r = g2 = e = null;
        for (h in c2) if (x2.call(c2, h) && (m = c2[h], null != m)) switch (h) {
          case "children":
            r = m;
            break;
          case "value":
            e = m;
            break;
          case "defaultValue":
            g2 = m;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(k(91));
          default:
            J2(a2, d, h, m);
        }
        null === e && null !== g2 && (e = g2);
        a2.push(K);
        if (null != r) {
          if (null != e) throw Error(k(92));
          if (ra(r) && 1 < r.length) throw Error(k(93));
          e = "" + r;
        }
        "string" === typeof e && "\n" === e[0] && a2.push(Oa2);
        null !== e && a2.push(u2(C("" + e)));
        return null;
      case "input":
        a2.push(M("input"));
        m = r = h = e = null;
        for (g2 in c2) if (x2.call(c2, g2) && (q = c2[g2], null != q)) switch (g2) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(k(399, "input"));
          case "defaultChecked":
            m = q;
            break;
          case "defaultValue":
            h = q;
            break;
          case "checked":
            r = q;
            break;
          case "value":
            e = q;
            break;
          default:
            J2(a2, d, g2, q);
        }
        null !== r ? J2(
          a2,
          d,
          "checked",
          r
        ) : null !== m && J2(a2, d, "checked", m);
        null !== e ? J2(a2, d, "value", e) : null !== h && J2(a2, d, "value", h);
        a2.push(Ka2);
        return null;
      case "menuitem":
        a2.push(M("menuitem"));
        for (var A in c2) if (x2.call(c2, A) && (e = c2[A], null != e)) switch (A) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(k(400));
          default:
            J2(a2, d, A, e);
        }
        a2.push(K);
        return null;
      case "title":
        a2.push(M("title"));
        e = null;
        for (v in c2) if (x2.call(c2, v) && (g2 = c2[v], null != g2)) switch (v) {
          case "children":
            e = g2;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(k(434));
          default:
            J2(a2, d, v, g2);
        }
        a2.push(K);
        return e;
      case "listing":
      case "pre":
        a2.push(M(b2));
        g2 = e = null;
        for (m in c2) if (x2.call(c2, m) && (h = c2[m], null != h)) switch (m) {
          case "children":
            e = h;
            break;
          case "dangerouslySetInnerHTML":
            g2 = h;
            break;
          default:
            J2(a2, d, m, h);
        }
        a2.push(K);
        if (null != g2) {
          if (null != e) throw Error(k(60));
          if ("object" !== typeof g2 || !("__html" in g2)) throw Error(k(61));
          c2 = g2.__html;
          null !== c2 && void 0 !== c2 && ("string" === typeof c2 && 0 < c2.length && "\n" === c2[0] ? a2.push(Oa2, u2(c2)) : a2.push(u2("" + c2)));
        }
        "string" === typeof e && "\n" === e[0] && a2.push(Oa2);
        return e;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        a2.push(M(b2));
        for (var F2 in c2) if (x2.call(c2, F2) && (e = c2[F2], null != e)) switch (F2) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(k(399, b2));
          default:
            J2(a2, d, F2, e);
        }
        a2.push(Ka2);
        return null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return Na(a2, c2, b2, d);
      case "html":
        return 0 === f.insertionMode && a2.push(Ra2), Na(a2, c2, b2, d);
      default:
        if (-1 === b2.indexOf("-") && "string" !== typeof c2.is) return Na(a2, c2, b2, d);
        a2.push(M(b2));
        g2 = e = null;
        for (q in c2) if (x2.call(c2, q) && (h = c2[q], null != h)) switch (q) {
          case "children":
            e = h;
            break;
          case "dangerouslySetInnerHTML":
            g2 = h;
            break;
          case "style":
            Ia2(a2, d, h);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
            break;
          default:
            ia(q) && "function" !== typeof h && "symbol" !== typeof h && a2.push(H, u2(q), I2, u2(C(h)), E);
        }
        a2.push(K);
        L(a2, g2, e);
        return e;
    }
  }
  var Ta2 = w2("</"), Ua2 = w2(">"), Va = w2('<template id="'), Wa2 = w2('"></template>'), Xa2 = w2("<!--$-->"), Ya = w2('<!--$?--><template id="'), Za = w2('"></template>'), $a2 = w2("<!--$!-->"), ab = w2("<!--/$-->"), bb = w2("<template"), cb = w2('"'), db = w2(' data-dgst="');
  w2(' data-msg="');
  w2(' data-stck="');
  var eb = w2("></template>");
  function fb(a2, b2, c2) {
    p(a2, Ya);
    if (null === c2) throw Error(k(395));
    p(a2, c2);
    return t(a2, Za);
  }
  var gb = w2('<div hidden id="'), hb = w2('">'), ib = w2("</div>"), jb = w2('<svg aria-hidden="true" style="display:none" id="'), kb = w2('">'), lb = w2("</svg>"), mb = w2('<math aria-hidden="true" style="display:none" id="'), nb = w2('">'), ob = w2("</math>"), pb = w2('<table hidden id="'), qb = w2('">'), rb = w2("</table>"), sb = w2('<table hidden><tbody id="'), tb = w2('">'), ub = w2("</tbody></table>"), vb = w2('<table hidden><tr id="'), wb = w2('">'), xb = w2("</tr></table>"), yb = w2('<table hidden><colgroup id="'), zb = w2('">'), Ab = w2("</colgroup></table>");
  function Bb(a2, b2, c2, d) {
    switch (c2.insertionMode) {
      case 0:
      case 1:
        return p(a2, gb), p(a2, b2.segmentPrefix), p(a2, u2(d.toString(16))), t(a2, hb);
      case 2:
        return p(a2, jb), p(a2, b2.segmentPrefix), p(a2, u2(d.toString(16))), t(a2, kb);
      case 3:
        return p(a2, mb), p(a2, b2.segmentPrefix), p(a2, u2(d.toString(16))), t(a2, nb);
      case 4:
        return p(a2, pb), p(a2, b2.segmentPrefix), p(a2, u2(d.toString(16))), t(a2, qb);
      case 5:
        return p(a2, sb), p(a2, b2.segmentPrefix), p(a2, u2(d.toString(16))), t(a2, tb);
      case 6:
        return p(a2, vb), p(a2, b2.segmentPrefix), p(a2, u2(d.toString(16))), t(a2, wb);
      case 7:
        return p(
          a2,
          yb
        ), p(a2, b2.segmentPrefix), p(a2, u2(d.toString(16))), t(a2, zb);
      default:
        throw Error(k(397));
    }
  }
  function Cb(a2, b2) {
    switch (b2.insertionMode) {
      case 0:
      case 1:
        return t(a2, ib);
      case 2:
        return t(a2, lb);
      case 3:
        return t(a2, ob);
      case 4:
        return t(a2, rb);
      case 5:
        return t(a2, ub);
      case 6:
        return t(a2, xb);
      case 7:
        return t(a2, Ab);
      default:
        throw Error(k(397));
    }
  }
  var Db = w2('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), Eb = w2('$RS("'), Gb = w2('","'), Hb = w2('")<\/script>'), Ib = w2('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'), Jb = w2('$RC("'), Kb = w2('","'), Lb = w2('")<\/script>'), Mb = w2('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'), Nb = w2('$RX("'), Ob = w2('"'), Pb = w2(")<\/script>"), Qb = w2(","), Rb = /[<\u2028\u2029]/g;
  function Sb(a2) {
    return JSON.stringify(a2).replace(Rb, function(a3) {
      switch (a3) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
      }
    });
  }
  var N = Object.assign, Tb = Symbol.for("react.element"), Ub = Symbol.for("react.portal"), Vb = Symbol.for("react.fragment"), Wb = Symbol.for("react.strict_mode"), Xb = Symbol.for("react.profiler"), Yb = Symbol.for("react.provider"), Zb = Symbol.for("react.context"), $b = Symbol.for("react.forward_ref"), ac = Symbol.for("react.suspense"), bc = Symbol.for("react.suspense_list"), cc = Symbol.for("react.memo"), dc = Symbol.for("react.lazy"), ec = Symbol.for("react.scope"), fc = Symbol.for("react.debug_trace_mode"), gc = Symbol.for("react.legacy_hidden"), hc = Symbol.for("react.default_value"), ic = Symbol.iterator;
  function jc(a2) {
    if (null == a2) return null;
    if ("function" === typeof a2) return a2.displayName || a2.name || null;
    if ("string" === typeof a2) return a2;
    switch (a2) {
      case Vb:
        return "Fragment";
      case Ub:
        return "Portal";
      case Xb:
        return "Profiler";
      case Wb:
        return "StrictMode";
      case ac:
        return "Suspense";
      case bc:
        return "SuspenseList";
    }
    if ("object" === typeof a2) switch (a2.$$typeof) {
      case Zb:
        return (a2.displayName || "Context") + ".Consumer";
      case Yb:
        return (a2._context.displayName || "Context") + ".Provider";
      case $b:
        var b2 = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case cc:
        return b2 = a2.displayName || null, null !== b2 ? b2 : jc(a2.type) || "Memo";
      case dc:
        b2 = a2._payload;
        a2 = a2._init;
        try {
          return jc(a2(b2));
        } catch (c2) {
        }
    }
    return null;
  }
  var kc = {};
  function lc(a2, b2) {
    a2 = a2.contextTypes;
    if (!a2) return kc;
    var c2 = {}, d;
    for (d in a2) c2[d] = b2[d];
    return c2;
  }
  var O2 = null;
  function P(a2, b2) {
    if (a2 !== b2) {
      a2.context._currentValue = a2.parentValue;
      a2 = a2.parent;
      var c2 = b2.parent;
      if (null === a2) {
        if (null !== c2) throw Error(k(401));
      } else {
        if (null === c2) throw Error(k(401));
        P(a2, c2);
      }
      b2.context._currentValue = b2.value;
    }
  }
  function mc(a2) {
    a2.context._currentValue = a2.parentValue;
    a2 = a2.parent;
    null !== a2 && mc(a2);
  }
  function nc(a2) {
    var b2 = a2.parent;
    null !== b2 && nc(b2);
    a2.context._currentValue = a2.value;
  }
  function oc(a2, b2) {
    a2.context._currentValue = a2.parentValue;
    a2 = a2.parent;
    if (null === a2) throw Error(k(402));
    a2.depth === b2.depth ? P(a2, b2) : oc(a2, b2);
  }
  function pc(a2, b2) {
    var c2 = b2.parent;
    if (null === c2) throw Error(k(402));
    a2.depth === c2.depth ? P(a2, c2) : pc(a2, c2);
    b2.context._currentValue = b2.value;
  }
  function Q(a2) {
    var b2 = O2;
    b2 !== a2 && (null === b2 ? nc(a2) : null === a2 ? mc(b2) : b2.depth === a2.depth ? P(b2, a2) : b2.depth > a2.depth ? oc(b2, a2) : pc(b2, a2), O2 = a2);
  }
  var qc = { isMounted: function() {
    return false;
  }, enqueueSetState: function(a2, b2) {
    a2 = a2._reactInternals;
    null !== a2.queue && a2.queue.push(b2);
  }, enqueueReplaceState: function(a2, b2) {
    a2 = a2._reactInternals;
    a2.replace = true;
    a2.queue = [b2];
  }, enqueueForceUpdate: function() {
  } };
  function rc(a2, b2, c2, d) {
    var f = void 0 !== a2.state ? a2.state : null;
    a2.updater = qc;
    a2.props = c2;
    a2.state = f;
    var e = { queue: [], replace: false };
    a2._reactInternals = e;
    var g2 = b2.contextType;
    a2.context = "object" === typeof g2 && null !== g2 ? g2._currentValue : d;
    g2 = b2.getDerivedStateFromProps;
    "function" === typeof g2 && (g2 = g2(c2, f), f = null === g2 || void 0 === g2 ? f : N({}, f, g2), a2.state = f);
    if ("function" !== typeof b2.getDerivedStateFromProps && "function" !== typeof a2.getSnapshotBeforeUpdate && ("function" === typeof a2.UNSAFE_componentWillMount || "function" === typeof a2.componentWillMount)) if (b2 = a2.state, "function" === typeof a2.componentWillMount && a2.componentWillMount(), "function" === typeof a2.UNSAFE_componentWillMount && a2.UNSAFE_componentWillMount(), b2 !== a2.state && qc.enqueueReplaceState(a2, a2.state, null), null !== e.queue && 0 < e.queue.length) if (b2 = e.queue, g2 = e.replace, e.queue = null, e.replace = false, g2 && 1 === b2.length) a2.state = b2[0];
    else {
      e = g2 ? b2[0] : a2.state;
      f = true;
      for (g2 = g2 ? 1 : 0; g2 < b2.length; g2++) {
        var h = b2[g2];
        h = "function" === typeof h ? h.call(a2, e, c2, d) : h;
        null != h && (f ? (f = false, e = N({}, e, h)) : N(e, h));
      }
      a2.state = e;
    }
    else e.queue = null;
  }
  var sc = { id: 1, overflow: "" };
  function tc(a2, b2, c2) {
    var d = a2.id;
    a2 = a2.overflow;
    var f = 32 - uc(d) - 1;
    d &= ~(1 << f);
    c2 += 1;
    var e = 32 - uc(b2) + f;
    if (30 < e) {
      var g2 = f - f % 5;
      e = (d & (1 << g2) - 1).toString(32);
      d >>= g2;
      f -= g2;
      return { id: 1 << 32 - uc(b2) + f | c2 << f | d, overflow: e + a2 };
    }
    return { id: 1 << e | c2 << f | d, overflow: a2 };
  }
  var uc = Math.clz32 ? Math.clz32 : vc, wc = Math.log, xc = Math.LN2;
  function vc(a2) {
    a2 >>>= 0;
    return 0 === a2 ? 32 : 31 - (wc(a2) / xc | 0) | 0;
  }
  function yc(a2, b2) {
    return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
  }
  var zc = "function" === typeof Object.is ? Object.is : yc, R = null, Ac = null, Bc = null, S = null, T = false, Cc = false, U = 0, V = null, Dc = 0;
  function W() {
    if (null === R) throw Error(k(321));
    return R;
  }
  function Ec() {
    if (0 < Dc) throw Error(k(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function Fc() {
    null === S ? null === Bc ? (T = false, Bc = S = Ec()) : (T = true, S = Bc) : null === S.next ? (T = false, S = S.next = Ec()) : (T = true, S = S.next);
    return S;
  }
  function Gc() {
    Ac = R = null;
    Cc = false;
    Bc = null;
    Dc = 0;
    S = V = null;
  }
  function Hc(a2, b2) {
    return "function" === typeof b2 ? b2(a2) : b2;
  }
  function Ic(a2, b2, c2) {
    R = W();
    S = Fc();
    if (T) {
      var d = S.queue;
      b2 = d.dispatch;
      if (null !== V && (c2 = V.get(d), void 0 !== c2)) {
        V.delete(d);
        d = S.memoizedState;
        do
          d = a2(d, c2.action), c2 = c2.next;
        while (null !== c2);
        S.memoizedState = d;
        return [d, b2];
      }
      return [S.memoizedState, b2];
    }
    a2 = a2 === Hc ? "function" === typeof b2 ? b2() : b2 : void 0 !== c2 ? c2(b2) : b2;
    S.memoizedState = a2;
    a2 = S.queue = { last: null, dispatch: null };
    a2 = a2.dispatch = Jc.bind(null, R, a2);
    return [S.memoizedState, a2];
  }
  function Kc(a2, b2) {
    R = W();
    S = Fc();
    b2 = void 0 === b2 ? null : b2;
    if (null !== S) {
      var c2 = S.memoizedState;
      if (null !== c2 && null !== b2) {
        var d = c2[1];
        a: if (null === d) d = false;
        else {
          for (var f = 0; f < d.length && f < b2.length; f++) if (!zc(b2[f], d[f])) {
            d = false;
            break a;
          }
          d = true;
        }
        if (d) return c2[0];
      }
    }
    a2 = a2();
    S.memoizedState = [a2, b2];
    return a2;
  }
  function Jc(a2, b2, c2) {
    if (25 <= Dc) throw Error(k(301));
    if (a2 === R) if (Cc = true, a2 = { action: c2, next: null }, null === V && (V = /* @__PURE__ */ new Map()), c2 = V.get(b2), void 0 === c2) V.set(b2, a2);
    else {
      for (b2 = c2; null !== b2.next; ) b2 = b2.next;
      b2.next = a2;
    }
  }
  function Lc() {
    throw Error(k(394));
  }
  function Mc() {
  }
  var Oc = { readContext: function(a2) {
    return a2._currentValue;
  }, useContext: function(a2) {
    W();
    return a2._currentValue;
  }, useMemo: Kc, useReducer: Ic, useRef: function(a2) {
    R = W();
    S = Fc();
    var b2 = S.memoizedState;
    return null === b2 ? (a2 = { current: a2 }, S.memoizedState = a2) : b2;
  }, useState: function(a2) {
    return Ic(Hc, a2);
  }, useInsertionEffect: Mc, useLayoutEffect: function() {
  }, useCallback: function(a2, b2) {
    return Kc(function() {
      return a2;
    }, b2);
  }, useImperativeHandle: Mc, useEffect: Mc, useDebugValue: Mc, useDeferredValue: function(a2) {
    W();
    return a2;
  }, useTransition: function() {
    W();
    return [false, Lc];
  }, useId: function() {
    var a2 = Ac.treeContext;
    var b2 = a2.overflow;
    a2 = a2.id;
    a2 = (a2 & ~(1 << 32 - uc(a2) - 1)).toString(32) + b2;
    var c2 = Nc;
    if (null === c2) throw Error(k(404));
    b2 = U++;
    a2 = ":" + c2.idPrefix + "R" + a2;
    0 < b2 && (a2 += "H" + b2.toString(32));
    return a2 + ":";
  }, useMutableSource: function(a2, b2) {
    W();
    return b2(a2._source);
  }, useSyncExternalStore: function(a2, b2, c2) {
    if (void 0 === c2) throw Error(k(407));
    return c2();
  } }, Nc = null, Pc = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  function Qc(a2) {
    console.error(a2);
    return null;
  }
  function X() {
  }
  function Rc(a2, b2, c2, d, f, e, g2, h, m) {
    var q = [], r = /* @__PURE__ */ new Set();
    b2 = { destination: null, responseState: b2, progressiveChunkSize: void 0 === d ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: r, pingedTasks: q, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: void 0 === f ? Qc : f, onAllReady: void 0 === e ? X : e, onShellReady: void 0 === g2 ? X : g2, onShellError: void 0 === h ? X : h, onFatalError: void 0 === m ? X : m };
    c2 = Sc(b2, 0, null, c2, false, false);
    c2.parentFlushed = true;
    a2 = Tc(b2, a2, null, c2, r, kc, null, sc);
    q.push(a2);
    return b2;
  }
  function Tc(a2, b2, c2, d, f, e, g2, h) {
    a2.allPendingTasks++;
    null === c2 ? a2.pendingRootTasks++ : c2.pendingTasks++;
    var m = { node: b2, ping: function() {
      var b3 = a2.pingedTasks;
      b3.push(m);
      1 === b3.length && Uc(a2);
    }, blockedBoundary: c2, blockedSegment: d, abortSet: f, legacyContext: e, context: g2, treeContext: h };
    f.add(m);
    return m;
  }
  function Sc(a2, b2, c2, d, f, e) {
    return { status: 0, id: -1, index: b2, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c2, lastPushedText: f, textEmbedded: e };
  }
  function Y2(a2, b2) {
    a2 = a2.onError(b2);
    if (null != a2 && "string" !== typeof a2) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a2 + '" instead');
    return a2;
  }
  function Vc(a2, b2) {
    var c2 = a2.onShellError;
    c2(b2);
    c2 = a2.onFatalError;
    c2(b2);
    null !== a2.destination ? (a2.status = 2, da(a2.destination, b2)) : (a2.status = 1, a2.fatalError = b2);
  }
  function Wc(a2, b2, c2, d, f) {
    R = {};
    Ac = b2;
    U = 0;
    for (a2 = c2(d, f); Cc; ) Cc = false, U = 0, Dc += 1, S = null, a2 = c2(d, f);
    Gc();
    return a2;
  }
  function Xc(a2, b2, c2, d) {
    var f = c2.render(), e = d.childContextTypes;
    if (null !== e && void 0 !== e) {
      var g2 = b2.legacyContext;
      if ("function" !== typeof c2.getChildContext) d = g2;
      else {
        c2 = c2.getChildContext();
        for (var h in c2) if (!(h in e)) throw Error(k(108, jc(d) || "Unknown", h));
        d = N({}, g2, c2);
      }
      b2.legacyContext = d;
      Z2(a2, b2, f);
      b2.legacyContext = g2;
    } else Z2(a2, b2, f);
  }
  function Yc(a2, b2) {
    if (a2 && a2.defaultProps) {
      b2 = N({}, b2);
      a2 = a2.defaultProps;
      for (var c2 in a2) void 0 === b2[c2] && (b2[c2] = a2[c2]);
      return b2;
    }
    return b2;
  }
  function Zc(a2, b2, c2, d, f) {
    if ("function" === typeof c2) if (c2.prototype && c2.prototype.isReactComponent) {
      f = lc(c2, b2.legacyContext);
      var e = c2.contextType;
      e = new c2(d, "object" === typeof e && null !== e ? e._currentValue : f);
      rc(e, c2, d, f);
      Xc(a2, b2, e, c2);
    } else {
      e = lc(c2, b2.legacyContext);
      f = Wc(a2, b2, c2, d, e);
      var g2 = 0 !== U;
      if ("object" === typeof f && null !== f && "function" === typeof f.render && void 0 === f.$$typeof) rc(f, c2, d, e), Xc(a2, b2, f, c2);
      else if (g2) {
        d = b2.treeContext;
        b2.treeContext = tc(d, 1, 0);
        try {
          Z2(a2, b2, f);
        } finally {
          b2.treeContext = d;
        }
      } else Z2(a2, b2, f);
    }
    else if ("string" === typeof c2) {
      f = b2.blockedSegment;
      e = Sa2(f.chunks, c2, d, a2.responseState, f.formatContext);
      f.lastPushedText = false;
      g2 = f.formatContext;
      f.formatContext = Ba2(g2, c2, d);
      $c(a2, b2, e);
      f.formatContext = g2;
      switch (c2) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          f.chunks.push(Ta2, u2(c2), Ua2);
      }
      f.lastPushedText = false;
    } else {
      switch (c2) {
        case gc:
        case fc:
        case Wb:
        case Xb:
        case Vb:
          Z2(a2, b2, d.children);
          return;
        case bc:
          Z2(a2, b2, d.children);
          return;
        case ec:
          throw Error(k(343));
        case ac:
          a: {
            c2 = b2.blockedBoundary;
            f = b2.blockedSegment;
            e = d.fallback;
            d = d.children;
            g2 = /* @__PURE__ */ new Set();
            var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g2, errorDigest: null }, m = Sc(a2, f.chunks.length, h, f.formatContext, false, false);
            f.children.push(m);
            f.lastPushedText = false;
            var q = Sc(a2, 0, null, f.formatContext, false, false);
            q.parentFlushed = true;
            b2.blockedBoundary = h;
            b2.blockedSegment = q;
            try {
              if ($c(
                a2,
                b2,
                d
              ), q.lastPushedText && q.textEmbedded && q.chunks.push(Ca2), q.status = 1, ad(h, q), 0 === h.pendingTasks) break a;
            } catch (r) {
              q.status = 4, h.forceClientRender = true, h.errorDigest = Y2(a2, r);
            } finally {
              b2.blockedBoundary = c2, b2.blockedSegment = f;
            }
            b2 = Tc(a2, e, c2, m, g2, b2.legacyContext, b2.context, b2.treeContext);
            a2.pingedTasks.push(b2);
          }
          return;
      }
      if ("object" === typeof c2 && null !== c2) switch (c2.$$typeof) {
        case $b:
          d = Wc(a2, b2, c2.render, d, f);
          if (0 !== U) {
            c2 = b2.treeContext;
            b2.treeContext = tc(c2, 1, 0);
            try {
              Z2(a2, b2, d);
            } finally {
              b2.treeContext = c2;
            }
          } else Z2(a2, b2, d);
          return;
        case cc:
          c2 = c2.type;
          d = Yc(c2, d);
          Zc(a2, b2, c2, d, f);
          return;
        case Yb:
          f = d.children;
          c2 = c2._context;
          d = d.value;
          e = c2._currentValue;
          c2._currentValue = d;
          g2 = O2;
          O2 = d = { parent: g2, depth: null === g2 ? 0 : g2.depth + 1, context: c2, parentValue: e, value: d };
          b2.context = d;
          Z2(a2, b2, f);
          a2 = O2;
          if (null === a2) throw Error(k(403));
          d = a2.parentValue;
          a2.context._currentValue = d === hc ? a2.context._defaultValue : d;
          a2 = O2 = a2.parent;
          b2.context = a2;
          return;
        case Zb:
          d = d.children;
          d = d(c2._currentValue);
          Z2(a2, b2, d);
          return;
        case dc:
          f = c2._init;
          c2 = f(c2._payload);
          d = Yc(c2, d);
          Zc(a2, b2, c2, d, void 0);
          return;
      }
      throw Error(k(
        130,
        null == c2 ? c2 : typeof c2,
        ""
      ));
    }
  }
  function Z2(a2, b2, c2) {
    b2.node = c2;
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case Tb:
          Zc(a2, b2, c2.type, c2.props, c2.ref);
          return;
        case Ub:
          throw Error(k(257));
        case dc:
          var d = c2._init;
          c2 = d(c2._payload);
          Z2(a2, b2, c2);
          return;
      }
      if (ra(c2)) {
        bd(a2, b2, c2);
        return;
      }
      null === c2 || "object" !== typeof c2 ? d = null : (d = ic && c2[ic] || c2["@@iterator"], d = "function" === typeof d ? d : null);
      if (d && (d = d.call(c2))) {
        c2 = d.next();
        if (!c2.done) {
          var f = [];
          do
            f.push(c2.value), c2 = d.next();
          while (!c2.done);
          bd(a2, b2, f);
        }
        return;
      }
      a2 = Object.prototype.toString.call(c2);
      throw Error(k(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(c2).join(", ") + "}" : a2));
    }
    "string" === typeof c2 ? (d = b2.blockedSegment, d.lastPushedText = Da2(b2.blockedSegment.chunks, c2, a2.responseState, d.lastPushedText)) : "number" === typeof c2 && (d = b2.blockedSegment, d.lastPushedText = Da2(b2.blockedSegment.chunks, "" + c2, a2.responseState, d.lastPushedText));
  }
  function bd(a2, b2, c2) {
    for (var d = c2.length, f = 0; f < d; f++) {
      var e = b2.treeContext;
      b2.treeContext = tc(e, d, f);
      try {
        $c(a2, b2, c2[f]);
      } finally {
        b2.treeContext = e;
      }
    }
  }
  function $c(a2, b2, c2) {
    var d = b2.blockedSegment.formatContext, f = b2.legacyContext, e = b2.context;
    try {
      return Z2(a2, b2, c2);
    } catch (m) {
      if (Gc(), "object" === typeof m && null !== m && "function" === typeof m.then) {
        c2 = m;
        var g2 = b2.blockedSegment, h = Sc(a2, g2.chunks.length, null, g2.formatContext, g2.lastPushedText, true);
        g2.children.push(h);
        g2.lastPushedText = false;
        a2 = Tc(a2, b2.node, b2.blockedBoundary, h, b2.abortSet, b2.legacyContext, b2.context, b2.treeContext).ping;
        c2.then(a2, a2);
        b2.blockedSegment.formatContext = d;
        b2.legacyContext = f;
        b2.context = e;
        Q(e);
      } else throw b2.blockedSegment.formatContext = d, b2.legacyContext = f, b2.context = e, Q(e), m;
    }
  }
  function cd(a2) {
    var b2 = a2.blockedBoundary;
    a2 = a2.blockedSegment;
    a2.status = 3;
    dd(this, b2, a2);
  }
  function ed(a2, b2, c2) {
    var d = a2.blockedBoundary;
    a2.blockedSegment.status = 3;
    null === d ? (b2.allPendingTasks--, 2 !== b2.status && (b2.status = 2, null !== b2.destination && b2.destination.close())) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, a2 = void 0 === c2 ? Error(k(432)) : c2, d.errorDigest = b2.onError(a2), d.parentFlushed && b2.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a3) {
      return ed(a3, b2, c2);
    }), d.fallbackAbortableTasks.clear(), b2.allPendingTasks--, 0 === b2.allPendingTasks && (d = b2.onAllReady, d()));
  }
  function ad(a2, b2) {
    if (0 === b2.chunks.length && 1 === b2.children.length && null === b2.children[0].boundary) {
      var c2 = b2.children[0];
      c2.id = b2.id;
      c2.parentFlushed = true;
      1 === c2.status && ad(a2, c2);
    } else a2.completedSegments.push(b2);
  }
  function dd(a2, b2, c2) {
    if (null === b2) {
      if (c2.parentFlushed) {
        if (null !== a2.completedRootSegment) throw Error(k(389));
        a2.completedRootSegment = c2;
      }
      a2.pendingRootTasks--;
      0 === a2.pendingRootTasks && (a2.onShellError = X, b2 = a2.onShellReady, b2());
    } else b2.pendingTasks--, b2.forceClientRender || (0 === b2.pendingTasks ? (c2.parentFlushed && 1 === c2.status && ad(b2, c2), b2.parentFlushed && a2.completedBoundaries.push(b2), b2.fallbackAbortableTasks.forEach(cd, a2), b2.fallbackAbortableTasks.clear()) : c2.parentFlushed && 1 === c2.status && (ad(b2, c2), 1 === b2.completedSegments.length && b2.parentFlushed && a2.partialBoundaries.push(b2)));
    a2.allPendingTasks--;
    0 === a2.allPendingTasks && (a2 = a2.onAllReady, a2());
  }
  function Uc(a2) {
    if (2 !== a2.status) {
      var b2 = O2, c2 = Pc.current;
      Pc.current = Oc;
      var d = Nc;
      Nc = a2.responseState;
      try {
        var f = a2.pingedTasks, e;
        for (e = 0; e < f.length; e++) {
          var g2 = f[e];
          var h = a2, m = g2.blockedSegment;
          if (0 === m.status) {
            Q(g2.context);
            try {
              Z2(h, g2, g2.node), m.lastPushedText && m.textEmbedded && m.chunks.push(Ca2), g2.abortSet.delete(g2), m.status = 1, dd(h, g2.blockedBoundary, m);
            } catch (G2) {
              if (Gc(), "object" === typeof G2 && null !== G2 && "function" === typeof G2.then) {
                var q = g2.ping;
                G2.then(q, q);
              } else {
                g2.abortSet.delete(g2);
                m.status = 4;
                var r = g2.blockedBoundary, v = G2, A = Y2(h, v);
                null === r ? Vc(h, v) : (r.pendingTasks--, r.forceClientRender || (r.forceClientRender = true, r.errorDigest = A, r.parentFlushed && h.clientRenderedBoundaries.push(r)));
                h.allPendingTasks--;
                if (0 === h.allPendingTasks) {
                  var F2 = h.onAllReady;
                  F2();
                }
              }
            } finally {
            }
          }
        }
        f.splice(0, e);
        null !== a2.destination && fd(a2, a2.destination);
      } catch (G2) {
        Y2(a2, G2), Vc(a2, G2);
      } finally {
        Nc = d, Pc.current = c2, c2 === Oc && Q(b2);
      }
    }
  }
  function gd(a2, b2, c2) {
    c2.parentFlushed = true;
    switch (c2.status) {
      case 0:
        var d = c2.id = a2.nextSegmentId++;
        c2.lastPushedText = false;
        c2.textEmbedded = false;
        a2 = a2.responseState;
        p(b2, Va);
        p(b2, a2.placeholderPrefix);
        a2 = u2(d.toString(16));
        p(b2, a2);
        return t(b2, Wa2);
      case 1:
        c2.status = 2;
        var f = true;
        d = c2.chunks;
        var e = 0;
        c2 = c2.children;
        for (var g2 = 0; g2 < c2.length; g2++) {
          for (f = c2[g2]; e < f.index; e++) p(b2, d[e]);
          f = hd(a2, b2, f);
        }
        for (; e < d.length - 1; e++) p(b2, d[e]);
        e < d.length && (f = t(b2, d[e]));
        return f;
      default:
        throw Error(k(390));
    }
  }
  function hd(a2, b2, c2) {
    var d = c2.boundary;
    if (null === d) return gd(a2, b2, c2);
    d.parentFlushed = true;
    if (d.forceClientRender) d = d.errorDigest, t(b2, $a2), p(b2, bb), d && (p(b2, db), p(b2, u2(C(d))), p(b2, cb)), t(b2, eb), gd(a2, b2, c2);
    else if (0 < d.pendingTasks) {
      d.rootSegmentID = a2.nextSegmentId++;
      0 < d.completedSegments.length && a2.partialBoundaries.push(d);
      var f = a2.responseState;
      var e = f.nextSuspenseID++;
      f = w2(f.boundaryPrefix + e.toString(16));
      d = d.id = f;
      fb(b2, a2.responseState, d);
      gd(a2, b2, c2);
    } else if (d.byteSize > a2.progressiveChunkSize) d.rootSegmentID = a2.nextSegmentId++, a2.completedBoundaries.push(d), fb(b2, a2.responseState, d.id), gd(a2, b2, c2);
    else {
      t(b2, Xa2);
      c2 = d.completedSegments;
      if (1 !== c2.length) throw Error(k(391));
      hd(a2, b2, c2[0]);
    }
    return t(b2, ab);
  }
  function id(a2, b2, c2) {
    Bb(b2, a2.responseState, c2.formatContext, c2.id);
    hd(a2, b2, c2);
    return Cb(b2, c2.formatContext);
  }
  function jd(a2, b2, c2) {
    for (var d = c2.completedSegments, f = 0; f < d.length; f++) kd(a2, b2, c2, d[f]);
    d.length = 0;
    a2 = a2.responseState;
    d = c2.id;
    c2 = c2.rootSegmentID;
    p(b2, a2.startInlineScript);
    a2.sentCompleteBoundaryFunction ? p(b2, Jb) : (a2.sentCompleteBoundaryFunction = true, p(b2, Ib));
    if (null === d) throw Error(k(395));
    c2 = u2(c2.toString(16));
    p(b2, d);
    p(b2, Kb);
    p(b2, a2.segmentPrefix);
    p(b2, c2);
    return t(b2, Lb);
  }
  function kd(a2, b2, c2, d) {
    if (2 === d.status) return true;
    var f = d.id;
    if (-1 === f) {
      if (-1 === (d.id = c2.rootSegmentID)) throw Error(k(392));
      return id(a2, b2, d);
    }
    id(a2, b2, d);
    a2 = a2.responseState;
    p(b2, a2.startInlineScript);
    a2.sentCompleteSegmentFunction ? p(b2, Eb) : (a2.sentCompleteSegmentFunction = true, p(b2, Db));
    p(b2, a2.segmentPrefix);
    f = u2(f.toString(16));
    p(b2, f);
    p(b2, Gb);
    p(b2, a2.placeholderPrefix);
    p(b2, f);
    return t(b2, Hb);
  }
  function fd(a2, b2) {
    l2 = new Uint8Array(512);
    n = 0;
    try {
      var c2 = a2.completedRootSegment;
      if (null !== c2 && 0 === a2.pendingRootTasks) {
        hd(a2, b2, c2);
        a2.completedRootSegment = null;
        var d = a2.responseState.bootstrapChunks;
        for (c2 = 0; c2 < d.length - 1; c2++) p(b2, d[c2]);
        c2 < d.length && t(b2, d[c2]);
      }
      var f = a2.clientRenderedBoundaries, e;
      for (e = 0; e < f.length; e++) {
        var g2 = f[e];
        d = b2;
        var h = a2.responseState, m = g2.id, q = g2.errorDigest, r = g2.errorMessage, v = g2.errorComponentStack;
        p(d, h.startInlineScript);
        h.sentClientRenderFunction ? p(d, Nb) : (h.sentClientRenderFunction = true, p(
          d,
          Mb
        ));
        if (null === m) throw Error(k(395));
        p(d, m);
        p(d, Ob);
        if (q || r || v) p(d, Qb), p(d, u2(Sb(q || "")));
        if (r || v) p(d, Qb), p(d, u2(Sb(r || "")));
        v && (p(d, Qb), p(d, u2(Sb(v))));
        if (!t(d, Pb)) ;
      }
      f.splice(0, e);
      var A = a2.completedBoundaries;
      for (e = 0; e < A.length; e++) if (!jd(a2, b2, A[e])) ;
      A.splice(0, e);
      ba2(b2);
      l2 = new Uint8Array(512);
      n = 0;
      var F2 = a2.partialBoundaries;
      for (e = 0; e < F2.length; e++) {
        var G2 = F2[e];
        a: {
          f = a2;
          g2 = b2;
          var ma2 = G2.completedSegments;
          for (h = 0; h < ma2.length; h++) if (!kd(
            f,
            g2,
            G2,
            ma2[h]
          )) {
            h++;
            ma2.splice(0, h);
            var Fb = false;
            break a;
          }
          ma2.splice(0, h);
          Fb = true;
        }
        if (!Fb) {
          a2.destination = null;
          e++;
          F2.splice(0, e);
          return;
        }
      }
      F2.splice(0, e);
      var na = a2.completedBoundaries;
      for (e = 0; e < na.length; e++) if (!jd(a2, b2, na[e])) ;
      na.splice(0, e);
    } finally {
      ba2(b2), 0 === a2.allPendingTasks && 0 === a2.pingedTasks.length && 0 === a2.clientRenderedBoundaries.length && 0 === a2.completedBoundaries.length && b2.close();
    }
  }
  function ld(a2, b2) {
    try {
      var c2 = a2.abortableTasks;
      c2.forEach(function(c3) {
        return ed(c3, a2, b2);
      });
      c2.clear();
      null !== a2.destination && fd(a2, a2.destination);
    } catch (d) {
      Y2(a2, d), Vc(a2, d);
    }
  }
  reactDomServer_browser_production_min.renderToReadableStream = function(a2, b2) {
    return new Promise(function(c2, d) {
      var f, e, g2 = new Promise(function(a3, b3) {
        e = a3;
        f = b3;
      }), h = Rc(a2, za(b2 ? b2.identifierPrefix : void 0, b2 ? b2.nonce : void 0, b2 ? b2.bootstrapScriptContent : void 0, b2 ? b2.bootstrapScripts : void 0, b2 ? b2.bootstrapModules : void 0), Aa2(b2 ? b2.namespaceURI : void 0), b2 ? b2.progressiveChunkSize : void 0, b2 ? b2.onError : void 0, e, function() {
        var a3 = new ReadableStream({ type: "bytes", pull: function(a4) {
          if (1 === h.status) h.status = 2, da(a4, h.fatalError);
          else if (2 !== h.status && null === h.destination) {
            h.destination = a4;
            try {
              fd(h, a4);
            } catch (A) {
              Y2(h, A), Vc(h, A);
            }
          }
        }, cancel: function() {
          ld(h);
        } }, { highWaterMark: 0 });
        a3.allReady = g2;
        c2(a3);
      }, function(a3) {
        g2.catch(function() {
        });
        d(a3);
      }, f);
      if (b2 && b2.signal) {
        var m = b2.signal, q = function() {
          ld(h, m.reason);
          m.removeEventListener("abort", q);
        };
        m.addEventListener("abort", q);
      }
      Uc(h);
    });
  };
  reactDomServer_browser_production_min.version = "18.3.1";
  return reactDomServer_browser_production_min;
}
var hasRequiredServer_browser;
function requireServer_browser() {
  if (hasRequiredServer_browser) return server_browser;
  hasRequiredServer_browser = 1;
  var l2, s2;
  {
    l2 = requireReactDomServerLegacy_browser_production_min();
    s2 = requireReactDomServer_browser_production_min();
  }
  server_browser.version = l2.version;
  server_browser.renderToString = l2.renderToString;
  server_browser.renderToStaticMarkup = l2.renderToStaticMarkup;
  server_browser.renderToNodeStream = l2.renderToNodeStream;
  server_browser.renderToStaticNodeStream = l2.renderToStaticNodeStream;
  server_browser.renderToReadableStream = s2.renderToReadableStream;
  return server_browser;
}
var server_browserExports = requireServer_browser();
function flattenConnection(connection) {
  if (!connection) {
    const noConnectionErr = `flattenConnection(): needs a 'connection' to flatten, but received '${connection ?? ""}' instead.`;
    console.error(noConnectionErr + ` Returning an empty array`);
    return [];
  }
  if ("nodes" in connection) return connection.nodes;
  if ("edges" in connection && Array.isArray(connection.edges)) return connection.edges.map((edge) => {
    if (!(edge == null ? void 0 : edge.node)) throw new Error("flattenConnection(): Connection edges must contain nodes");
    return edge.node;
  });
  return [];
}
var SFAPI_VERSION = "2026-04";
var MOCK_SHOP_DOMAIN = "mock.shop";
var isMockShop = (domain) => domain.includes(MOCK_SHOP_DOMAIN);
function createStorefrontClient({ storeDomain, privateStorefrontToken, publicStorefrontToken, storefrontApiVersion = SFAPI_VERSION, contentType }) {
  if (!storeDomain) throw new Error(H2_PREFIX_ERROR + `\`storeDomain\` is required when creating a new Storefront client in production.`);
  if (storefrontApiVersion !== "2026-04") warnOnce(`The Storefront API version that you're using is different than the version this build of Hydrogen React is targeting.
You may run into unexpected errors if these versions don't match. Received version: "${storefrontApiVersion}"; expected version "${SFAPI_VERSION}"`);
  const getShopifyDomain = (overrideProps) => {
    const domain = (overrideProps == null ? void 0 : overrideProps.storeDomain) ?? storeDomain;
    return domain.includes("://") ? domain : `https://${domain}`;
  };
  return {
    getShopifyDomain,
    getStorefrontApiUrl(overrideProps) {
      const domain = getShopifyDomain(overrideProps);
      return `${domain + (domain.endsWith("/") ? "api" : "/api")}/${(overrideProps == null ? void 0 : overrideProps.storefrontApiVersion) ?? storefrontApiVersion}/graphql.json`;
    },
    getPrivateTokenHeaders(overrideProps) {
      if (!privateStorefrontToken && !(overrideProps == null ? void 0 : overrideProps.privateStorefrontToken) && !isMockShop(storeDomain)) throw new Error(H2_PREFIX_ERROR + "You did not pass in a `privateStorefrontToken` while using `createStorefrontClient()` or `getPrivateTokenHeaders()`");
      return {
        "content-type": ((overrideProps == null ? void 0 : overrideProps.contentType) ?? contentType) === "graphql" ? "application/graphql" : "application/json",
        "X-SDK-Variant": "hydrogen-react",
        "X-SDK-Variant-Source": "react",
        "X-SDK-Version": storefrontApiVersion,
        "Shopify-Storefront-Private-Token": (overrideProps == null ? void 0 : overrideProps.privateStorefrontToken) ?? privateStorefrontToken ?? "",
        ...(overrideProps == null ? void 0 : overrideProps.buyerIp) ? { "Shopify-Storefront-Buyer-IP": overrideProps.buyerIp } : {}
      };
    },
    getPublicTokenHeaders(overrideProps) {
      if (!publicStorefrontToken && !(overrideProps == null ? void 0 : overrideProps.publicStorefrontToken) && !isMockShop(storeDomain)) throw new Error(H2_PREFIX_ERROR + "You did not pass in a `publicStorefrontToken` while using `createStorefrontClient()` or `getPublicTokenHeaders()`");
      return getPublicTokenHeadersRaw((overrideProps == null ? void 0 : overrideProps.contentType) ?? contentType ?? "json", storefrontApiVersion, (overrideProps == null ? void 0 : overrideProps.publicStorefrontToken) ?? publicStorefrontToken ?? "");
    }
  };
}
function getPublicTokenHeadersRaw(contentType, storefrontApiVersion, accessToken) {
  return {
    "content-type": contentType === "graphql" ? "application/graphql" : "application/json",
    "X-SDK-Variant": "hydrogen-react",
    "X-SDK-Variant-Source": "react",
    "X-SDK-Version": storefrontApiVersion,
    "X-Shopify-Storefront-Access-Token": accessToken
  };
}
var warnings = /* @__PURE__ */ new Set();
var H2_PREFIX_ERROR = "[h2:error:createStorefrontClient] ";
var warnOnce = (string, type = "warn") => {
  if (!warnings.has(string)) {
    console[type](`[h2:${type}:createStorefrontClient] ` + string);
    warnings.add(string);
  }
};
var defaultShopifyContext = {
  storeDomain: "test",
  storefrontToken: "abc123",
  storefrontApiVersion: SFAPI_VERSION,
  countryIsoCode: "US",
  languageIsoCode: "EN",
  getStorefrontApiUrl() {
    return "";
  },
  getPublicTokenHeaders() {
    return {};
  },
  getShopifyDomain() {
    return "";
  }
};
var ShopifyContext = reactExports.createContext(defaultShopifyContext);
function useShop() {
  const shopContext = reactExports.useContext(ShopifyContext);
  if (!shopContext) throw new Error(`'useShop()' must be a descendent of <ShopifyProvider/>`);
  return shopContext;
}
var SHOPIFY_STOREFRONT_ID_HEADER = "Shopify-Storefront-Id";
var SHOPIFY_STOREFRONT_Y_HEADER = "Shopify-Storefront-Y";
var SHOPIFY_STOREFRONT_S_HEADER = "Shopify-Storefront-S";
var SHOPIFY_Y = "_shopify_y";
var SHOPIFY_S = "_shopify_s";
var SHOPIFY_VISIT_TOKEN_HEADER = "X-Shopify-VisitToken";
var SHOPIFY_UNIQUE_TOKEN_HEADER = "X-Shopify-UniqueToken";
var cachedTrackingValues = { current: null };
function getTrackingValues() {
  var _a2, _b, _c;
  let trackingValues;
  if (typeof window !== "undefined" && typeof window.performance !== "undefined") try {
    const resourceRE = /^https?:\/\/([^/]+)(\/api\/(?:unstable|2\d{3}-\d{2})\/graphql\.json(?=$|\?))?/;
    const entries = performance.getEntriesByType("resource");
    let matchedValues;
    for (let i2 = entries.length - 1; i2 >= 0; i2--) {
      const entry2 = entries[i2];
      if (entry2.initiatorType !== "fetch") continue;
      const currentHost = window.location.host;
      const match = entry2.name.match(resourceRE);
      if (!match) continue;
      const [, matchedHost, sfapiPath] = match;
      if (matchedHost === currentHost || sfapiPath && (matchedHost == null ? void 0 : matchedHost.endsWith(`.${currentHost}`))) {
        const values = extractFromPerformanceEntry(entry2);
        if (values) {
          matchedValues = values;
          break;
        }
      }
    }
    if (matchedValues) trackingValues = matchedValues;
    if (trackingValues) cachedTrackingValues.current = trackingValues;
    else if (cachedTrackingValues.current) trackingValues = cachedTrackingValues.current;
    if (!trackingValues) {
      const navigationEntries = performance.getEntriesByType("navigation")[0];
      trackingValues = extractFromPerformanceEntry(navigationEntries, false);
    }
  } catch {
  }
  if (!trackingValues) {
    const cookie = typeof arguments[0] === "string" ? arguments[0] : typeof document !== "undefined" ? document.cookie : "";
    trackingValues = {
      uniqueToken: ((_a2 = cookie.match(/\b_shopify_y=([^;]+)/)) == null ? void 0 : _a2[1]) || "",
      visitToken: ((_b = cookie.match(/\b_shopify_s=([^;]+)/)) == null ? void 0 : _b[1]) || "",
      consent: ((_c = cookie.match(/\b_tracking_consent=([^;]+)/)) == null ? void 0 : _c[1]) || ""
    };
  }
  return trackingValues;
}
function extractFromPerformanceEntry(entry2, isConsentRequired = true) {
  let uniqueToken = "";
  let visitToken = "";
  let consent = "";
  const serverTiming = entry2.serverTiming;
  if (serverTiming && serverTiming.length >= 3) for (let i2 = serverTiming.length - 1; i2 >= 0; i2--) {
    const { name, description } = serverTiming[i2];
    if (!name || !description) continue;
    if (name === "_y") uniqueToken = description;
    else if (name === "_s") visitToken = description;
    else if (name === "_cmp") consent = description;
    if (uniqueToken && visitToken && consent) break;
  }
  return uniqueToken && visitToken && (isConsentRequired ? consent : true) ? {
    uniqueToken,
    visitToken,
    consent
  } : void 0;
}
var AnalyticsEventName = {
  PAGE_VIEW: "PAGE_VIEW",
  ADD_TO_CART: "ADD_TO_CART",
  PAGE_VIEW_2: "PAGE_VIEW_2",
  COLLECTION_VIEW: "COLLECTION_VIEW",
  PRODUCT_VIEW: "PRODUCT_VIEW",
  SEARCH_VIEW: "SEARCH_VIEW"
};
var AnalyticsPageType = {
  collection: "collection",
  product: "product",
  search: "search"
};
var ShopifySalesChannel = {
  headless: "headless"
};
var ShopifyAppId = {
  hydrogen: "6167201",
  headless: "12875497473"
};
function schemaWrapper(schemaId, payload) {
  return {
    schema_id: schemaId,
    payload,
    metadata: { event_created_at_ms: Date.now() }
  };
}
function parseGid(gid) {
  const defaultReturn = {
    id: "",
    resource: null,
    resourceId: null,
    search: "",
    searchParams: new URLSearchParams(),
    hash: ""
  };
  if (typeof gid !== "string") return defaultReturn;
  try {
    const { search, searchParams, pathname, hash } = new URL(gid);
    const pathnameParts = pathname.split("/");
    const lastPathnamePart = pathnameParts[pathnameParts.length - 1];
    const resourcePart = pathnameParts[pathnameParts.length - 2];
    if (!lastPathnamePart || !resourcePart) return defaultReturn;
    return {
      id: `${lastPathnamePart}${search}${hash}` || "",
      resource: resourcePart ?? null,
      resourceId: lastPathnamePart || null,
      search,
      searchParams,
      hash
    };
  } catch {
    return defaultReturn;
  }
}
function addDataIf(keyValuePairs, formattedData) {
  if (typeof keyValuePairs !== "object") return {};
  Object.entries(keyValuePairs).forEach(([key, value]) => {
    if (value) formattedData[key] = value;
  });
  return formattedData;
}
function errorIfServer(fnName) {
  if (typeof document === "undefined") {
    console.error(`${fnName} should only be used within the useEffect callback or event handlers`);
    return true;
  }
  return false;
}
var tokenHash = "xxxx-4xxx-xxxx-xxxxxxxxxxxx";
function buildUUID() {
  let hash = "";
  try {
    const crypto2 = window.crypto;
    const randomValuesArray = new Uint16Array(31);
    crypto2.getRandomValues(randomValuesArray);
    let i2 = 0;
    hash = tokenHash.replace(/[x]/g, (c2) => {
      const r = randomValuesArray[i2] % 16;
      const v = c2 === "x" ? r : r & 3 | 8;
      i2++;
      return v.toString(16);
    }).toUpperCase();
  } catch (err) {
    hash = tokenHash.replace(/[x]/g, (c2) => {
      const r = Math.random() * 16 | 0;
      return (c2 === "x" ? r : r & 3 | 8).toString(16);
    }).toUpperCase();
  }
  return `${hexTime()}-${hash}`;
}
function hexTime() {
  let dateNumber = 0;
  let perfNumber = 0;
  dateNumber = (/* @__PURE__ */ new Date()).getTime() >>> 0;
  try {
    perfNumber = performance.now() >>> 0;
  } catch (err) {
    perfNumber = 0;
  }
  return Math.abs(dateNumber + perfNumber).toString(16).toLowerCase().padStart(8, "0");
}
var SCHEMA_ID$1 = "trekkie_storefront_page_view/1.4";
var OXYGEN_DOMAIN = "myshopify.dev";
function pageView$1(payload) {
  const pageViewPayload = payload;
  const { id, resource } = parseGid(pageViewPayload.resourceId);
  const resourceType = resource ? resource.toLowerCase() : void 0;
  return [schemaWrapper(SCHEMA_ID$1, addDataIf({
    pageType: pageViewPayload.pageType,
    customerId: parseInt(parseGid(pageViewPayload.customerId).id || "0"),
    resourceType,
    resourceId: parseInt(id)
  }, formatPayload$1(pageViewPayload)))];
}
function formatPayload$1(payload) {
  return {
    appClientId: payload.shopifySalesChannel ? ShopifyAppId[payload.shopifySalesChannel] : ShopifyAppId.headless,
    isMerchantRequest: isMerchantRequest(payload.url),
    hydrogenSubchannelId: payload.storefrontId || payload.hydrogenSubchannelId || "0",
    isPersistentCookie: payload.hasUserConsent,
    uniqToken: payload.uniqueToken,
    visitToken: payload.visitToken,
    microSessionId: buildUUID(),
    microSessionCount: 1,
    url: payload.url,
    path: payload.path,
    search: payload.search,
    referrer: payload.referrer,
    title: payload.title,
    shopId: parseInt(parseGid(payload.shopId).id),
    currency: payload.currency,
    contentLanguage: payload.acceptedLanguage || "en"
  };
}
function isMerchantRequest(url) {
  if (typeof url !== "string") return false;
  const hostname = new URL(url).hostname;
  if (hostname.indexOf(OXYGEN_DOMAIN) !== -1 || hostname === "localhost") return true;
  return false;
}
var SCHEMA_ID = "custom_storefront_customer_tracking/1.2";
var PAGE_RENDERED_EVENT_NAME = "page_rendered";
var COLLECTION_PAGE_RENDERED_EVENT_NAME = "collection_page_rendered";
var PRODUCT_PAGE_RENDERED_EVENT_NAME = "product_page_rendered";
var PRODUCT_ADDED_TO_CART_EVENT_NAME = "product_added_to_cart";
var SEARCH_SUBMITTED_EVENT_NAME = "search_submitted";
function prepareAdditionalPayload(payload) {
  return {
    canonical_url: payload.canonicalUrl || payload.url,
    customer_id: parseInt(parseGid(payload.customerId).id || "0")
  };
}
function pageView(payload) {
  const pageViewPayload = payload;
  const additionalPayload = prepareAdditionalPayload(pageViewPayload);
  const pageType = pageViewPayload.pageType;
  const pageViewEvents = [];
  pageViewEvents.push(schemaWrapper(SCHEMA_ID, addDataIf({
    event_name: PAGE_RENDERED_EVENT_NAME,
    ...additionalPayload
  }, formatPayload(pageViewPayload))));
  switch (pageType) {
    case AnalyticsPageType.collection:
      pageViewEvents.push(schemaWrapper(SCHEMA_ID, addDataIf({
        event_name: COLLECTION_PAGE_RENDERED_EVENT_NAME,
        ...additionalPayload,
        collection_name: pageViewPayload.collectionHandle,
        collection_id: parseInt(parseGid(pageViewPayload.collectionId).id)
      }, formatPayload(pageViewPayload))));
      break;
    case AnalyticsPageType.product:
      pageViewEvents.push(schemaWrapper(SCHEMA_ID, addDataIf({
        event_name: PRODUCT_PAGE_RENDERED_EVENT_NAME,
        ...additionalPayload,
        products: formatProductPayload(pageViewPayload.products),
        total_value: pageViewPayload.totalValue
      }, formatPayload(pageViewPayload))));
      break;
    case AnalyticsPageType.search:
      pageViewEvents.push(schemaWrapper(SCHEMA_ID, addDataIf({
        event_name: SEARCH_SUBMITTED_EVENT_NAME,
        ...additionalPayload,
        search_string: pageViewPayload.searchString
      }, formatPayload(pageViewPayload))));
      break;
  }
  return pageViewEvents;
}
function pageView2(payload) {
  const pageViewPayload = payload;
  return [schemaWrapper(SCHEMA_ID, addDataIf({
    event_name: PAGE_RENDERED_EVENT_NAME,
    ...prepareAdditionalPayload(pageViewPayload)
  }, formatPayload(pageViewPayload)))];
}
function collectionView(payload) {
  const pageViewPayload = payload;
  return [schemaWrapper(SCHEMA_ID, addDataIf({
    event_name: COLLECTION_PAGE_RENDERED_EVENT_NAME,
    ...prepareAdditionalPayload(pageViewPayload),
    collection_name: pageViewPayload.collectionHandle,
    collection_id: parseInt(parseGid(pageViewPayload.collectionId).id)
  }, formatPayload(pageViewPayload)))];
}
function productView(payload) {
  const pageViewPayload = payload;
  return [schemaWrapper(SCHEMA_ID, addDataIf({
    event_name: PRODUCT_PAGE_RENDERED_EVENT_NAME,
    ...prepareAdditionalPayload(pageViewPayload),
    products: formatProductPayload(pageViewPayload.products),
    total_value: pageViewPayload.totalValue
  }, formatPayload(pageViewPayload)))];
}
function searchView(payload) {
  const pageViewPayload = payload;
  return [schemaWrapper(SCHEMA_ID, addDataIf({
    event_name: SEARCH_SUBMITTED_EVENT_NAME,
    ...prepareAdditionalPayload(pageViewPayload),
    search_string: pageViewPayload.searchString
  }, formatPayload(pageViewPayload)))];
}
function addToCart(payload) {
  const addToCartPayload = payload;
  const cartToken = parseGid(addToCartPayload.cartId);
  return [schemaWrapper(SCHEMA_ID, addDataIf({
    event_name: PRODUCT_ADDED_TO_CART_EVENT_NAME,
    customerId: addToCartPayload.customerId,
    cart_token: (cartToken == null ? void 0 : cartToken.id) ? `${cartToken.id}` : null,
    total_value: addToCartPayload.totalValue,
    products: formatProductPayload(addToCartPayload.products),
    customer_id: parseInt(parseGid(addToCartPayload.customerId).id || "0")
  }, formatPayload(addToCartPayload)))];
}
function formatPayload(payload) {
  const payloadWithPrivacy = payload;
  return {
    source: payload.shopifySalesChannel || ShopifySalesChannel.headless,
    asset_version_id: payload.assetVersionId || "2026.4.3",
    hydrogenSubchannelId: payload.storefrontId || payload.hydrogenSubchannelId || "0",
    is_persistent_cookie: payload.hasUserConsent,
    deprecated_visit_token: payload.visitToken,
    unique_token: payload.uniqueToken,
    event_time: Date.now(),
    event_id: buildUUID(),
    event_source_url: payload.url,
    referrer: payload.referrer,
    user_agent: payload.userAgent,
    navigation_type: payload.navigationType,
    navigation_api: payload.navigationApi,
    shop_id: parseInt(parseGid(payload.shopId).id),
    currency: payload.currency,
    ccpa_enforced: payloadWithPrivacy.ccpaEnforced || false,
    gdpr_enforced: payloadWithPrivacy.gdprEnforced || false,
    gdpr_enforced_as_string: payloadWithPrivacy.gdprEnforced ? "true" : "false",
    analytics_allowed: payload.analyticsAllowed || false,
    marketing_allowed: payload.marketingAllowed || false,
    sale_of_data_allowed: payload.saleOfDataAllowed || false
  };
}
function formatProductPayload(products) {
  return products ? products.map((p) => {
    const product = addDataIf({
      variant_gid: p.variantGid,
      category: p.category,
      sku: p.sku,
      product_id: parseInt(parseGid(p.productGid).id),
      variant_id: parseInt(parseGid(p.variantGid).id)
    }, {
      product_gid: p.productGid,
      name: p.name,
      variant: p.variantName || "",
      brand: p.brand,
      price: parseFloat(p.price),
      quantity: Number(p.quantity || 0)
    });
    return JSON.stringify(product);
  }) : [];
}
function sendShopifyAnalytics(event, shopDomain) {
  const { eventName, payload } = event;
  if (!payload.hasUserConsent) return Promise.resolve();
  let events = [];
  const pageViewPayload = payload;
  if (eventName === AnalyticsEventName.PAGE_VIEW) events = events.concat(pageView$1(pageViewPayload), pageView(pageViewPayload));
  else if (eventName === AnalyticsEventName.ADD_TO_CART) events = events.concat(addToCart(payload));
  else if (eventName === AnalyticsEventName.PAGE_VIEW_2) events = events.concat(pageView$1(pageViewPayload), pageView2(pageViewPayload));
  else if (eventName === AnalyticsEventName.COLLECTION_VIEW) events = events.concat(collectionView(pageViewPayload));
  else if (eventName === AnalyticsEventName.PRODUCT_VIEW) events = events.concat(productView(pageViewPayload));
  else if (eventName === AnalyticsEventName.SEARCH_VIEW) events = events.concat(searchView(pageViewPayload));
  if (events.length) return sendToShopify(events, shopDomain);
  else return Promise.resolve();
}
function isLighthouseUserAgent() {
  if (typeof window === "undefined" || !window.navigator) return false;
  return /Chrome-Lighthouse/.test(window.navigator.userAgent);
}
var ERROR_MESSAGE = "sendShopifyAnalytics request is unsuccessful";
function sendToShopify(events, shopDomain) {
  if (isLighthouseUserAgent()) return Promise.resolve();
  const eventsToBeSent = {
    events,
    metadata: { event_sent_at_ms: Date.now() }
  };
  try {
    return fetch(shopDomain ? `https://${shopDomain}/.well-known/shopify/monorail/unstable/produce_batch` : "https://monorail-edge.shopifysvc.com/unstable/produce_batch", {
      method: "post",
      headers: { "content-type": "text/plain" },
      body: JSON.stringify(eventsToBeSent)
    }).then((response) => {
      if (!response.ok) throw new Error("Response failed");
      return response.text();
    }).then((data2) => {
      if (data2) JSON.parse(data2).result.forEach((eventResponse) => {
        if (eventResponse.status !== 200) console.error(ERROR_MESSAGE, "\n\n", eventResponse.message);
      });
    }).catch((err) => {
      console.error(ERROR_MESSAGE, err);
    });
  } catch (error) {
    return Promise.resolve();
  }
}
function getClientBrowserParameters() {
  if (errorIfServer("getClientBrowserParameters")) return {
    uniqueToken: "",
    visitToken: "",
    url: "",
    path: "",
    search: "",
    referrer: "",
    title: "",
    userAgent: "",
    navigationType: "",
    navigationApi: ""
  };
  const [navigationType, navigationApi] = getNavigationType();
  const trackingValues = getTrackingValues();
  return {
    uniqueToken: trackingValues.uniqueToken,
    visitToken: trackingValues.visitToken,
    url: location.href,
    path: location.pathname,
    search: location.search,
    referrer: document.referrer,
    title: document.title,
    userAgent: navigator.userAgent,
    navigationType,
    navigationApi
  };
}
function getNavigationTypeExperimental() {
  try {
    const navigationEntries = (performance == null ? void 0 : performance.getEntriesByType) && (performance == null ? void 0 : performance.getEntriesByType("navigation"));
    if (navigationEntries && navigationEntries[0]) {
      const rawType = window.performance.getEntriesByType("navigation")[0]["type"];
      return rawType && rawType.toString();
    }
  } catch (err) {
  }
}
function getNavigationTypeLegacy() {
  var _a2, _b;
  try {
    if (PerformanceNavigation && ((_a2 = performance == null ? void 0 : performance.navigation) == null ? void 0 : _a2.type) !== null && ((_b = performance == null ? void 0 : performance.navigation) == null ? void 0 : _b.type) !== void 0) {
      const rawType = performance.navigation.type;
      switch (rawType) {
        case PerformanceNavigation.TYPE_NAVIGATE:
          return "navigate";
        case PerformanceNavigation.TYPE_RELOAD:
          return "reload";
        case PerformanceNavigation.TYPE_BACK_FORWARD:
          return "back_forward";
        default:
          return `unknown: ${rawType}`;
      }
    }
  } catch (err) {
  }
}
function getNavigationType() {
  try {
    let navApi = "PerformanceNavigationTiming";
    let navType = getNavigationTypeExperimental();
    if (!navType) {
      navType = getNavigationTypeLegacy();
      navApi = "performance.navigation";
    }
    if (navType) return [navType, navApi];
    else return ["unknown", "unknown"];
  } catch (err) {
  }
  return ["error", "error"];
}
function useMoney(money) {
  const { countryIsoCode, languageIsoCode } = useShop();
  const locale = languageIsoCode.includes("_") ? languageIsoCode.replace("_", "-") : `${languageIsoCode}-${countryIsoCode}`;
  if (!locale) throw new Error(`useMoney(): Unable to get 'locale' from 'useShop()', which means that 'locale' was not passed to '<ShopifyProvider/>'. 'locale' is required for 'useMoney()' to work`);
  const amount = parseFloat(money.amount);
  let isCurrencySupported = true;
  try {
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: money.currencyCode
    });
  } catch (e) {
    if (e instanceof RangeError && e.message.includes("currency")) isCurrencySupported = false;
  }
  const { defaultFormatter, nameFormatter, narrowSymbolFormatter, withoutTrailingZerosFormatter, withoutCurrencyFormatter, withoutTrailingZerosOrCurrencyFormatter } = reactExports.useMemo(() => {
    const options = isCurrencySupported ? {
      style: "currency",
      currency: money.currencyCode
    } : {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };
    return {
      defaultFormatter: getLazyFormatter(locale, options),
      nameFormatter: getLazyFormatter(locale, {
        ...options,
        currencyDisplay: "name"
      }),
      narrowSymbolFormatter: getLazyFormatter(locale, {
        ...options,
        currencyDisplay: "narrowSymbol"
      }),
      withoutTrailingZerosFormatter: getLazyFormatter(locale, {
        ...options,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }),
      withoutCurrencyFormatter: getLazyFormatter(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      withoutTrailingZerosOrCurrencyFormatter: getLazyFormatter(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    };
  }, [
    money.currencyCode,
    locale,
    isCurrencySupported
  ]);
  const isPartCurrency = (part) => part.type === "currency";
  const lazyFormatters = reactExports.useMemo(() => ({
    original: () => money,
    currencyCode: () => money.currencyCode,
    localizedString: () => {
      const formatted = defaultFormatter().format(amount);
      return isCurrencySupported ? formatted : `${formatted} ${money.currencyCode}`;
    },
    parts: () => {
      const parts = defaultFormatter().formatToParts(amount);
      if (!isCurrencySupported) parts.push({
        type: "literal",
        value: " "
      }, {
        type: "currency",
        value: money.currencyCode
      });
      return parts;
    },
    withoutTrailingZeros: () => {
      const formatted = amount % 1 === 0 ? withoutTrailingZerosFormatter().format(amount) : defaultFormatter().format(amount);
      return isCurrencySupported ? formatted : `${formatted} ${money.currencyCode}`;
    },
    withoutTrailingZerosAndCurrency: () => amount % 1 === 0 ? withoutTrailingZerosOrCurrencyFormatter().format(amount) : withoutCurrencyFormatter().format(amount),
    currencyName: () => {
      var _a2;
      return ((_a2 = nameFormatter().formatToParts(amount).find(isPartCurrency)) == null ? void 0 : _a2.value) ?? money.currencyCode;
    },
    currencySymbol: () => {
      var _a2;
      return ((_a2 = defaultFormatter().formatToParts(amount).find(isPartCurrency)) == null ? void 0 : _a2.value) ?? money.currencyCode;
    },
    currencyNarrowSymbol: () => {
      var _a2;
      return ((_a2 = narrowSymbolFormatter().formatToParts(amount).find(isPartCurrency)) == null ? void 0 : _a2.value) ?? "";
    },
    amount: () => defaultFormatter().formatToParts(amount).filter((part) => [
      "decimal",
      "fraction",
      "group",
      "integer",
      "literal"
    ].includes(part.type)).map((part) => part.value).join("")
  }), [
    money,
    amount,
    isCurrencySupported,
    nameFormatter,
    defaultFormatter,
    narrowSymbolFormatter,
    withoutCurrencyFormatter,
    withoutTrailingZerosFormatter,
    withoutTrailingZerosOrCurrencyFormatter
  ]);
  return reactExports.useMemo(() => new Proxy(lazyFormatters, { get: (target, key) => {
    var _a2;
    return (_a2 = Reflect.get(target, key)) == null ? void 0 : _a2.call(null);
  } }), [lazyFormatters]);
}
var formatterCache = /* @__PURE__ */ new Map();
function getLazyFormatter(locale, options) {
  const key = JSON.stringify([locale, options]);
  return function() {
    let formatter = formatterCache.get(key);
    if (!formatter) {
      try {
        formatter = new Intl.NumberFormat(locale, options);
      } catch (error) {
        if (error instanceof RangeError && error.message.includes("currency")) {
          const fallbackOptions = { ...options };
          delete fallbackOptions.currency;
          delete fallbackOptions.currencyDisplay;
          delete fallbackOptions.currencySign;
          formatter = new Intl.NumberFormat(locale, fallbackOptions);
        } else throw error;
      }
      formatterCache.set(key, formatter);
    }
    return formatter;
  };
}
function Money({ data: data2, as: as2, withoutCurrency, withoutTrailingZeros, measurement, measurementSeparator = "/", ...passthroughProps }) {
  if (!isMoney(data2)) throw new Error(`<Money/> needs a valid 'data' prop that has 'amount' and 'currencyCode'`);
  const moneyObject = useMoney(data2);
  const Wrapper = as2 ?? "div";
  let output = moneyObject.localizedString;
  if (withoutCurrency || withoutTrailingZeros) if (withoutCurrency && !withoutTrailingZeros) output = moneyObject.amount;
  else if (!withoutCurrency && withoutTrailingZeros) output = moneyObject.withoutTrailingZeros;
  else output = moneyObject.withoutTrailingZerosAndCurrency;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Wrapper, {
    ...passthroughProps,
    children: [output, measurement && measurement.referenceUnit && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [measurementSeparator, measurement.referenceUnit] })]
  });
}
function isMoney(maybeMoney) {
  return typeof maybeMoney.amount === "string" && !!maybeMoney.amount && typeof maybeMoney.currencyCode === "string" && !!maybeMoney.currencyCode;
}
var Image = reactExports.forwardRef(({ alt, aspectRatio, crop = "center", data: data2, decoding = "async", height = "auto", loader: loader2 = shopifyLoader, loading = "lazy", sizes, src, srcSetOptions = {
  intervals: 15,
  startingWidth: 200,
  incrementSize: 200,
  placeholderWidth: 100
}, width = "100%", ...passthroughProps }, ref) => {
  const normalizedData = reactExports.useMemo(() => {
    const dataWidth = (data2 == null ? void 0 : data2.width) && (data2 == null ? void 0 : data2.height) ? data2 == null ? void 0 : data2.width : void 0;
    const dataHeight = (data2 == null ? void 0 : data2.width) && (data2 == null ? void 0 : data2.height) ? data2 == null ? void 0 : data2.height : void 0;
    return {
      width: dataWidth,
      height: dataHeight,
      unitsMatch: Boolean(unitsMatch(dataWidth, dataHeight))
    };
  }, [data2]);
  const normalizedProps = reactExports.useMemo(() => {
    const widthParts = getUnitValueParts((width || "100%").toString());
    const nWidth = `${widthParts.number}${widthParts.unit}`;
    const autoHeight = height === void 0 || height === null;
    const heightParts = autoHeight ? null : getUnitValueParts(height.toString());
    const fixedHeight = heightParts ? `${heightParts.number}${heightParts.unit}` : "";
    return {
      width: nWidth,
      height: autoHeight ? "auto" : fixedHeight,
      src: src || (data2 == null ? void 0 : data2.url),
      alt: (data2 == null ? void 0 : data2.altText) && !alt ? data2 == null ? void 0 : data2.altText : alt || "",
      aspectRatio: aspectRatio ? aspectRatio : normalizedData.unitsMatch ? [getNormalizedFixedUnit(normalizedData.width), getNormalizedFixedUnit(normalizedData.height)].join("/") : void 0
    };
  }, [
    width,
    height,
    src,
    data2,
    alt,
    aspectRatio,
    normalizedData,
    passthroughProps == null ? void 0 : passthroughProps.key
  ]);
  const { intervals, startingWidth, incrementSize, placeholderWidth } = srcSetOptions;
  const imageWidths = reactExports.useMemo(() => {
    return generateImageWidths(width, intervals, startingWidth, incrementSize);
  }, [
    width,
    intervals,
    startingWidth,
    incrementSize
  ]);
  if (isFixedWidth(normalizedProps.width)) return /* @__PURE__ */ jsxRuntimeExports.jsx(FixedWidthImage, {
    aspectRatio,
    crop,
    decoding,
    height,
    imageWidths,
    loader: loader2,
    loading,
    normalizedProps,
    passthroughProps,
    ref,
    width,
    data: data2
  });
  else return /* @__PURE__ */ jsxRuntimeExports.jsx(FluidImage, {
    aspectRatio,
    crop,
    decoding,
    imageWidths,
    loader: loader2,
    loading,
    normalizedProps,
    passthroughProps,
    placeholderWidth,
    ref,
    sizes,
    data: data2
  });
});
var FixedWidthImage = reactExports.forwardRef(({ aspectRatio, crop, decoding, height, imageWidths, loader: loader2 = shopifyLoader, loading, normalizedProps, passthroughProps, width, data: data2 }, ref) => {
  const fixed = reactExports.useMemo(() => {
    const intWidth = getNormalizedFixedUnit(width);
    const intHeight = getNormalizedFixedUnit(height);
    const fixedAspectRatio = aspectRatio ? aspectRatio : unitsMatch(normalizedProps.width, normalizedProps.height) ? [intWidth, intHeight].join("/") : normalizedProps.aspectRatio ? normalizedProps.aspectRatio : void 0;
    const sizesArray = imageWidths === void 0 ? void 0 : generateSizes(imageWidths, fixedAspectRatio, crop, {
      width: (data2 == null ? void 0 : data2.width) ?? void 0,
      height: (data2 == null ? void 0 : data2.height) ?? void 0
    });
    const fixedHeight = intHeight ? intHeight : fixedAspectRatio && intWidth ? intWidth * (parseAspectRatio(fixedAspectRatio) ?? 1) : void 0;
    return {
      width: intWidth,
      aspectRatio: fixedAspectRatio,
      height: fixedHeight,
      srcSet: generateSrcSet(normalizedProps.src, sizesArray, loader2, "density"),
      src: loader2({
        src: normalizedProps.src,
        width: intWidth,
        height: fixedHeight,
        crop: normalizedProps.height === "auto" ? void 0 : crop
      })
    };
  }, [
    aspectRatio,
    crop,
    data2,
    height,
    imageWidths,
    loader2,
    normalizedProps,
    width
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", {
    ref,
    alt: normalizedProps.alt,
    decoding,
    height: fixed.height,
    loading,
    src: fixed.src,
    srcSet: fixed.srcSet,
    width: fixed.width,
    style: {
      aspectRatio: fixed.aspectRatio,
      ...passthroughProps.style
    },
    ...passthroughProps
  });
});
var FluidImage = reactExports.forwardRef(({ crop, decoding, imageWidths, loader: loader2 = shopifyLoader, loading, normalizedProps, passthroughProps, placeholderWidth, sizes, data: data2 }, ref) => {
  const fluid = reactExports.useMemo(() => {
    const sizesArray = imageWidths === void 0 ? void 0 : generateSizes(imageWidths, normalizedProps.aspectRatio, crop, {
      width: (data2 == null ? void 0 : data2.width) ?? void 0,
      height: (data2 == null ? void 0 : data2.height) ?? void 0
    });
    const placeholderHeight = normalizedProps.aspectRatio && placeholderWidth ? placeholderWidth * (parseAspectRatio(normalizedProps.aspectRatio) ?? 1) : void 0;
    return {
      placeholderHeight,
      srcSet: generateSrcSet(normalizedProps.src, sizesArray, loader2),
      src: loader2({
        src: normalizedProps.src,
        width: placeholderWidth,
        height: placeholderHeight,
        crop
      })
    };
  }, [
    crop,
    data2,
    imageWidths,
    loader2,
    normalizedProps,
    placeholderWidth
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", {
    ref,
    alt: normalizedProps.alt,
    decoding,
    height: fluid.placeholderHeight,
    loading,
    sizes,
    src: fluid.src,
    srcSet: fluid.srcSet,
    width: placeholderWidth,
    ...passthroughProps,
    style: {
      width: normalizedProps.width,
      aspectRatio: normalizedProps.aspectRatio,
      ...passthroughProps.style
    }
  });
});
var PLACEHOLDER_DOMAIN = "https://placeholder.shopify.com";
function shopifyLoader({ src, width, height, crop }) {
  if (!src) return "";
  const url = new URL(src, PLACEHOLDER_DOMAIN);
  if (width) url.searchParams.append("width", Math.round(width).toString());
  if (height) url.searchParams.append("height", Math.round(height).toString());
  if (crop) url.searchParams.append("crop", crop);
  return url.href.replace(PLACEHOLDER_DOMAIN, "");
}
function unitsMatch(width = "100%", height = "auto") {
  return getUnitValueParts(width.toString()).unit === getUnitValueParts(height.toString()).unit;
}
function getUnitValueParts(value) {
  const unit = value.replace(/[0-9.]/g, "");
  const number = parseFloat(value.replace(unit, ""));
  return {
    unit: unit === "" ? number === void 0 ? "auto" : "px" : unit,
    number
  };
}
function getNormalizedFixedUnit(value) {
  if (value === void 0) return;
  const { unit, number } = getUnitValueParts(value.toString());
  switch (unit) {
    case "em":
      return number * 16;
    case "rem":
      return number * 16;
    case "px":
      return number;
    case "":
      return number;
    default:
      return;
  }
}
function isFixedWidth(width) {
  return typeof width === "number" || /\d(px|em|rem)$/.test(width);
}
function generateSrcSet(src, sizesArray, loader2 = shopifyLoader, descriptorType = "width") {
  if (!src) return "";
  if ((sizesArray == null ? void 0 : sizesArray.length) === 0 || !sizesArray) return src;
  return sizesArray.map((size, i2) => `${loader2({
    src,
    width: size.width,
    height: size.height,
    crop: size.crop
  })} ${descriptorType === "density" ? `${i2 + 1}x` : `${size.width ?? 0}w`}`).join(`, `);
}
function generateImageWidths(width = "100%", intervals, startingWidth, incrementSize) {
  const responsive = Array.from({ length: intervals }, (_2, i2) => i2 * incrementSize + startingWidth);
  const fixed = Array.from({ length: 3 }, (_2, i2) => (i2 + 1) * (getNormalizedFixedUnit(width) ?? 0));
  return isFixedWidth(width) ? fixed : responsive;
}
function parseAspectRatio(aspectRatio) {
  if (!aspectRatio) return;
  const [width, height] = aspectRatio.split("/");
  return 1 / (Number(width) / Number(height));
}
function generateSizes(imageWidths, aspectRatio, crop = "center", sourceDimensions) {
  if (!imageWidths) return;
  return imageWidths.map((width) => {
    return {
      width,
      height: aspectRatio ? width * (parseAspectRatio(aspectRatio) ?? 1) : void 0,
      crop
    };
  }).filter(({ width, height }) => {
    if ((sourceDimensions == null ? void 0 : sourceDimensions.width) && width > sourceDimensions.width) return false;
    if ((sourceDimensions == null ? void 0 : sourceDimensions.height) && height && height > sourceDimensions.height) return false;
    return true;
  });
}
var SCRIPTS_LOADED = {};
function loadScript(src, options) {
  const isScriptLoaded = SCRIPTS_LOADED[src];
  if (isScriptLoaded) return isScriptLoaded;
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    if (options == null ? void 0 : options.module) script.type = "module";
    else script.type = "text/javascript";
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(false);
    };
    if ((options == null ? void 0 : options.in) === "head") document.head.appendChild(script);
    else document.body.appendChild(script);
    const attributes = options == null ? void 0 : options.attributes;
    if (attributes) Object.keys(attributes).forEach((key) => {
      script.setAttribute(key, attributes[key]);
    });
  });
  SCRIPTS_LOADED[src] = promise;
  return promise;
}
function useLoadScript(url, options) {
  const [status, setStatus] = reactExports.useState("loading");
  reactExports.useEffect(() => {
    loadScript(url, options).then(() => setStatus("done")).catch(() => setStatus("error"));
  }, [url]);
  return status;
}
var g$1 = /* @__PURE__ */ new Set([
  "domain",
  "path",
  "max-age",
  "expires",
  "samesite",
  "secure",
  "httponly"
]);
function u(a2) {
  let r = {}, e, t, n = 0, m = a2.split(/;\s*/g), s2, i2;
  for (; n < m.length; n++)
    if (t = m[n], e = t.indexOf("="), ~e) {
      if (s2 = t.substring(0, e++).trim(), i2 = t.substring(e).trim(), i2[0] === '"' && (i2 = i2.substring(1, i2.length - 1)), ~i2.indexOf("%"))
        try {
          i2 = decodeURIComponent(i2);
        } catch (f) {
        }
      g$1.has(t = s2.toLowerCase()) ? t === "expires" ? r.expires = new Date(i2) : t === "max-age" ? r.maxage = +i2 : r[t] = i2 : r[s2] = i2;
    } else
      (s2 = t.trim().toLowerCase()) && (s2 === "httponly" || s2 === "secure") && (r[s2] = true);
  return r;
}
function l$1(a2, r, e = {}) {
  let t = a2 + "=" + encodeURIComponent(r);
  return e.expires && (t += "; Expires=" + new Date(e.expires).toUTCString()), e.maxage != null && e.maxage >= 0 && (t += "; Max-Age=" + (e.maxage | 0)), e.domain && (t += "; Domain=" + e.domain), e.path && (t += "; Path=" + e.path), e.samesite && (t += "; SameSite=" + e.samesite), (e.secure || e.samesite === "None") && (t += "; Secure"), e.httponly && (t += "; HttpOnly"), t;
}
var longTermLength = 3600 * 24 * 360 * 1;
var shortTermLength = 1800;
function useShopifyCookies(options) {
  const { hasUserConsent, domain = "", checkoutDomain = "", storefrontAccessToken, fetchTrackingValues, ignoreDeprecatedCookies = false } = options || {};
  const coreCookiesReady = useCoreShopifyCookies({
    storefrontAccessToken,
    fetchTrackingValues,
    checkoutDomain
  });
  reactExports.useEffect(() => {
    if (ignoreDeprecatedCookies || !coreCookiesReady) return;
    let currentDomain = domain || window.location.host;
    if (checkoutDomain) {
      const checkoutDomainParts = checkoutDomain.split(".").reverse();
      const currentDomainParts = currentDomain.split(".").reverse();
      const sameDomainParts = [];
      checkoutDomainParts.forEach((part, index) => {
        if (part === currentDomainParts[index]) sameDomainParts.push(part);
      });
      currentDomain = sameDomainParts.reverse().join(".");
    }
    if (/^localhost/.test(currentDomain)) currentDomain = "";
    const domainWithLeadingDot = currentDomain ? /^\./.test(currentDomain) ? currentDomain : `.${currentDomain}` : "";
    if (hasUserConsent) {
      const trackingValues = getTrackingValues();
      if ((trackingValues.uniqueToken || trackingValues.visitToken || "").startsWith("00000000-")) return;
      setCookie(SHOPIFY_Y, trackingValues.uniqueToken || buildUUID(), longTermLength, domainWithLeadingDot);
      setCookie(SHOPIFY_S, trackingValues.visitToken || buildUUID(), shortTermLength, domainWithLeadingDot);
    } else {
      setCookie(SHOPIFY_Y, "", 0, domainWithLeadingDot);
      setCookie(SHOPIFY_S, "", 0, domainWithLeadingDot);
    }
  }, [
    coreCookiesReady,
    hasUserConsent,
    domain,
    checkoutDomain,
    ignoreDeprecatedCookies
  ]);
  return coreCookiesReady;
}
function setCookie(name, value, maxage, domain) {
  document.cookie = l$1(name, value, {
    maxage,
    domain,
    samesite: "Lax",
    path: "/"
  });
}
async function fetchTrackingValuesFromBrowser(storefrontAccessToken, storefrontApiDomain = "") {
  const { uniqueToken, visitToken } = getTrackingValues();
  const response = await fetch(`${storefrontApiDomain.replace(/\/+$/, "")}/api/unstable/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...storefrontAccessToken && { "X-Shopify-Storefront-Access-Token": storefrontAccessToken },
      ...visitToken || uniqueToken ? {
        [SHOPIFY_VISIT_TOKEN_HEADER]: visitToken,
        [SHOPIFY_UNIQUE_TOKEN_HEADER]: uniqueToken
      } : void 0
    },
    body: JSON.stringify({ query: "query ensureCookies { consentManagement { cookies(visitorConsent:{}) { cookieDomain } } }" })
  });
  if (!response.ok) throw new Error(`Failed to fetch consent from browser: ${response.status} ${response.statusText}`);
  await response.json();
  getTrackingValues();
}
function useCoreShopifyCookies({ checkoutDomain, storefrontAccessToken, fetchTrackingValues = false }) {
  const [cookiesReady, setCookiesReady] = reactExports.useState(!fetchTrackingValues);
  const hasFetchedTrackingValues = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!fetchTrackingValues) {
      setCookiesReady(true);
      return;
    }
    if (hasFetchedTrackingValues.current) return;
    hasFetchedTrackingValues.current = true;
    fetchTrackingValuesFromBrowser(storefrontAccessToken).catch((error) => checkoutDomain ? fetchTrackingValuesFromBrowser(storefrontAccessToken, checkoutDomain) : Promise.reject(error)).catch((error) => {
      console.warn("[h2:warn:useShopifyCookies] Failed to fetch tracking values from browser: " + (error instanceof Error ? error.message : String(error)));
    }).finally(() => {
      setCookiesReady(true);
    });
  }, [
    checkoutDomain,
    fetchTrackingValues,
    storefrontAccessToken
  ]);
  return cookiesReady;
}
const CLIENT = "GraphQL Client";
const MIN_RETRIES = 0;
const MAX_RETRIES = 3;
const GQL_API_ERROR = "An error occurred while fetching from the API. Review 'graphQLErrors' for details.";
const UNEXPECTED_CONTENT_TYPE_ERROR = "Response returned unexpected Content-Type:";
const NO_DATA_OR_ERRORS_ERROR = "An unknown error has occurred. The API did not return a data object or any errors in its response.";
const CONTENT_TYPES = {
  json: "application/json",
  multipart: "multipart/mixed"
};
const SDK_VARIANT_HEADER = "X-SDK-Variant";
const SDK_VERSION_HEADER = "X-SDK-Version";
const DEFAULT_SDK_VARIANT = "shopify-graphql-client";
const DEFAULT_CLIENT_VERSION = "1.4.1";
const RETRY_WAIT_TIME = 1e3;
const RETRIABLE_STATUS_CODES = [429, 503];
const DEFER_OPERATION_REGEX = /@(defer)\b/i;
const NEWLINE_SEPARATOR = "\r\n";
const BOUNDARY_HEADER_REGEX = /boundary="?([^=";]+)"?/i;
const HEADER_SEPARATOR = NEWLINE_SEPARATOR + NEWLINE_SEPARATOR;
function formatErrorMessage(message, client = CLIENT) {
  return message.startsWith(`${client}`) ? message : `${client}: ${message}`;
}
function getErrorMessage(error) {
  return error instanceof Error ? error.message : JSON.stringify(error);
}
function getErrorCause(error) {
  return error instanceof Error && error.cause ? error.cause : void 0;
}
function combineErrors(dataArray) {
  return dataArray.flatMap(({ errors }) => {
    return errors ?? [];
  });
}
function validateRetries({ client, retries }) {
  if (retries !== void 0 && (typeof retries !== "number" || retries < MIN_RETRIES || retries > MAX_RETRIES)) {
    throw new Error(`${client}: The provided "retries" value (${retries}) is invalid - it cannot be less than ${MIN_RETRIES} or greater than ${MAX_RETRIES}`);
  }
}
function getKeyValueIfValid(key, value) {
  return value && (typeof value !== "object" || Array.isArray(value) || typeof value === "object" && Object.keys(value).length > 0) ? { [key]: value } : {};
}
function buildDataObjectByPath(path, data2) {
  if (path.length === 0) {
    return data2;
  }
  const key = path.pop();
  const newData = {
    [key]: data2
  };
  if (path.length === 0) {
    return newData;
  }
  return buildDataObjectByPath(path, newData);
}
function combineObjects(baseObject, newObject) {
  return Object.keys(newObject || {}).reduce((acc, key) => {
    if ((typeof newObject[key] === "object" || Array.isArray(newObject[key])) && baseObject[key]) {
      acc[key] = combineObjects(baseObject[key], newObject[key]);
      return acc;
    }
    acc[key] = newObject[key];
    return acc;
  }, Array.isArray(baseObject) ? [...baseObject] : { ...baseObject });
}
function buildCombinedDataObject([initialDatum, ...remainingData]) {
  return remainingData.reduce(combineObjects, { ...initialDatum });
}
function generateHttpFetch({ clientLogger, customFetchApi = fetch, client = CLIENT, defaultRetryWaitTime = RETRY_WAIT_TIME, retriableCodes = RETRIABLE_STATUS_CODES }) {
  const httpFetch = async (requestParams, count, maxRetries) => {
    const nextCount = count + 1;
    const maxTries = maxRetries + 1;
    let response;
    try {
      response = await customFetchApi(...requestParams);
      clientLogger({
        type: "HTTP-Response",
        content: {
          requestParams,
          response
        }
      });
      if (!response.ok && retriableCodes.includes(response.status) && nextCount <= maxTries) {
        throw new Error();
      }
      const deprecationNotice = (response == null ? void 0 : response.headers.get("X-Shopify-API-Deprecated-Reason")) || "";
      if (deprecationNotice) {
        clientLogger({
          type: "HTTP-Response-GraphQL-Deprecation-Notice",
          content: {
            requestParams,
            deprecationNotice
          }
        });
      }
      return response;
    } catch (error) {
      if (nextCount <= maxTries) {
        const retryAfter = response == null ? void 0 : response.headers.get("Retry-After");
        await sleep(retryAfter ? parseInt(retryAfter, 10) : defaultRetryWaitTime);
        clientLogger({
          type: "HTTP-Retry",
          content: {
            requestParams,
            lastResponse: response,
            retryAttempt: count,
            maxRetries
          }
        });
        return httpFetch(requestParams, nextCount, maxRetries);
      }
      throw new Error(formatErrorMessage(`${maxRetries > 0 ? `Attempted maximum number of ${maxRetries} network retries. Last message - ` : ""}${getErrorMessage(error)}`, client));
    }
  };
  return httpFetch;
}
async function sleep(waitTime) {
  return new Promise((resolve) => setTimeout(resolve, waitTime));
}
function createGraphQLClient({ headers, url, customFetchApi = fetch, retries = 0, logger }) {
  validateRetries({ client: CLIENT, retries });
  const config = {
    headers,
    url,
    retries
  };
  const clientLogger = generateClientLogger(logger);
  const httpFetch = generateHttpFetch({
    customFetchApi,
    clientLogger,
    defaultRetryWaitTime: RETRY_WAIT_TIME
  });
  const fetchFn = generateFetch(httpFetch, config);
  const request = generateRequest(fetchFn);
  const requestStream = generateRequestStream(fetchFn);
  return {
    config,
    fetch: fetchFn,
    request,
    requestStream
  };
}
function generateClientLogger(logger) {
  return (logContent) => {
    if (logger) {
      logger(logContent);
    }
  };
}
async function processJSONResponse(response) {
  const { errors, data: data2, extensions } = await response.json();
  return {
    ...getKeyValueIfValid("data", data2),
    ...getKeyValueIfValid("extensions", extensions),
    headers: response.headers,
    ...errors || !data2 ? {
      errors: {
        networkStatusCode: response.status,
        message: formatErrorMessage(errors ? GQL_API_ERROR : NO_DATA_OR_ERRORS_ERROR),
        ...getKeyValueIfValid("graphQLErrors", errors),
        response
      }
    } : {}
  };
}
function generateFetch(httpFetch, { url, headers, retries }) {
  return async (operation, options = {}) => {
    const { variables, headers: overrideHeaders, url: overrideUrl, retries: overrideRetries, keepalive, signal } = options;
    const body = JSON.stringify({
      query: operation,
      variables
    });
    validateRetries({ client: CLIENT, retries: overrideRetries });
    const flatHeaders = Object.entries({
      ...headers,
      ...overrideHeaders
    }).reduce((headers2, [key, value]) => {
      headers2[key] = Array.isArray(value) ? value.join(", ") : value.toString();
      return headers2;
    }, {});
    if (!flatHeaders[SDK_VARIANT_HEADER] && !flatHeaders[SDK_VERSION_HEADER]) {
      flatHeaders[SDK_VARIANT_HEADER] = DEFAULT_SDK_VARIANT;
      flatHeaders[SDK_VERSION_HEADER] = DEFAULT_CLIENT_VERSION;
    }
    const fetchParams = [
      overrideUrl ?? url,
      {
        method: "POST",
        headers: flatHeaders,
        body,
        signal,
        keepalive
      }
    ];
    return httpFetch(fetchParams, 1, overrideRetries ?? retries);
  };
}
function generateRequest(fetchFn) {
  return async (...props) => {
    if (DEFER_OPERATION_REGEX.test(props[0])) {
      throw new Error(formatErrorMessage("This operation will result in a streamable response - use requestStream() instead."));
    }
    let response = null;
    try {
      response = await fetchFn(...props);
      const { status, statusText } = response;
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        return {
          errors: {
            networkStatusCode: status,
            message: formatErrorMessage(statusText),
            response
          }
        };
      }
      if (!contentType.includes(CONTENT_TYPES.json)) {
        return {
          errors: {
            networkStatusCode: status,
            message: formatErrorMessage(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${contentType}`),
            response
          }
        };
      }
      return await processJSONResponse(response);
    } catch (error) {
      return {
        errors: {
          message: getErrorMessage(error),
          ...response == null ? {} : {
            networkStatusCode: response.status,
            response
          }
        }
      };
    }
  };
}
async function* getStreamBodyIterator(response) {
  const decoder = new TextDecoder();
  if (response.body[Symbol.asyncIterator]) {
    for await (const chunk of response.body) {
      yield decoder.decode(chunk);
    }
  } else {
    const reader = response.body.getReader();
    let readResult;
    try {
      while (!(readResult = await reader.read()).done) {
        yield decoder.decode(readResult.value);
      }
    } finally {
      reader.cancel();
    }
  }
}
function readStreamChunk(streamBodyIterator, boundary) {
  return {
    async *[Symbol.asyncIterator]() {
      try {
        let buffer = "";
        for await (const textChunk of streamBodyIterator) {
          buffer += textChunk;
          if (buffer.indexOf(boundary) > -1) {
            const lastBoundaryIndex = buffer.lastIndexOf(boundary);
            const fullResponses = buffer.slice(0, lastBoundaryIndex);
            const chunkBodies = fullResponses.split(boundary).filter((chunk) => chunk.trim().length > 0).map((chunk) => {
              const body = chunk.slice(chunk.indexOf(HEADER_SEPARATOR) + HEADER_SEPARATOR.length).trim();
              return body;
            });
            if (chunkBodies.length > 0) {
              yield chunkBodies;
            }
            buffer = buffer.slice(lastBoundaryIndex + boundary.length);
            if (buffer.trim() === `--`) {
              buffer = "";
            }
          }
        }
      } catch (error) {
        throw new Error(`Error occured while processing stream payload - ${getErrorMessage(error)}`);
      }
    }
  };
}
function createJsonResponseAsyncIterator(response) {
  return {
    async *[Symbol.asyncIterator]() {
      const processedResponse = await processJSONResponse(response);
      yield {
        ...processedResponse,
        hasNext: false
      };
    }
  };
}
function getResponseDataFromChunkBodies(chunkBodies) {
  return chunkBodies.map((value) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(`Error in parsing multipart response - ${getErrorMessage(error)}`);
    }
  }).map((payload) => {
    const { data: data2, incremental, hasNext, extensions, errors } = payload;
    if (!incremental) {
      return {
        data: data2 || {},
        ...getKeyValueIfValid("errors", errors),
        ...getKeyValueIfValid("extensions", extensions),
        hasNext
      };
    }
    const incrementalArray = incremental.map(({ data: data3, path, errors: errors2 }) => {
      return {
        data: data3 && path ? buildDataObjectByPath(path, data3) : {},
        ...getKeyValueIfValid("errors", errors2)
      };
    });
    return {
      data: incrementalArray.length === 1 ? incrementalArray[0].data : buildCombinedDataObject([
        ...incrementalArray.map(({ data: data3 }) => data3)
      ]),
      ...getKeyValueIfValid("errors", combineErrors(incrementalArray)),
      hasNext
    };
  });
}
function validateResponseData(responseErrors, combinedData) {
  if (responseErrors.length > 0) {
    throw new Error(GQL_API_ERROR, {
      cause: {
        graphQLErrors: responseErrors
      }
    });
  }
  if (Object.keys(combinedData).length === 0) {
    throw new Error(NO_DATA_OR_ERRORS_ERROR);
  }
}
function createMultipartResponseAsyncInterator(response, responseContentType) {
  var _a2, _b;
  const boundaryHeader = (responseContentType ?? "").match(BOUNDARY_HEADER_REGEX);
  const boundary = `--${boundaryHeader ? boundaryHeader[1] : "-"}`;
  if (!((_a2 = response.body) == null ? void 0 : _a2.getReader) && !((_b = response.body) == null ? void 0 : _b[Symbol.asyncIterator])) {
    throw new Error("API multipart response did not return an iterable body", {
      cause: response
    });
  }
  const streamBodyIterator = getStreamBodyIterator(response);
  let combinedData = {};
  let responseExtensions;
  return {
    async *[Symbol.asyncIterator]() {
      var _a3;
      try {
        let streamHasNext = true;
        for await (const chunkBodies of readStreamChunk(streamBodyIterator, boundary)) {
          const responseData = getResponseDataFromChunkBodies(chunkBodies);
          responseExtensions = ((_a3 = responseData.find((datum) => datum.extensions)) == null ? void 0 : _a3.extensions) ?? responseExtensions;
          const responseErrors = combineErrors(responseData);
          combinedData = buildCombinedDataObject([
            combinedData,
            ...responseData.map(({ data: data2 }) => data2)
          ]);
          streamHasNext = responseData.slice(-1)[0].hasNext;
          validateResponseData(responseErrors, combinedData);
          yield {
            ...getKeyValueIfValid("data", combinedData),
            ...getKeyValueIfValid("extensions", responseExtensions),
            hasNext: streamHasNext
          };
        }
        if (streamHasNext) {
          throw new Error(`Response stream terminated unexpectedly`);
        }
      } catch (error) {
        const cause = getErrorCause(error);
        yield {
          ...getKeyValueIfValid("data", combinedData),
          ...getKeyValueIfValid("extensions", responseExtensions),
          errors: {
            message: formatErrorMessage(getErrorMessage(error)),
            networkStatusCode: response.status,
            ...getKeyValueIfValid("graphQLErrors", cause == null ? void 0 : cause.graphQLErrors),
            response
          },
          hasNext: false
        };
      }
    }
  };
}
function generateRequestStream(fetchFn) {
  return async (...props) => {
    if (!DEFER_OPERATION_REGEX.test(props[0])) {
      throw new Error(formatErrorMessage("This operation does not result in a streamable response - use request() instead."));
    }
    try {
      const response = await fetchFn(...props);
      const { statusText } = response;
      if (!response.ok) {
        throw new Error(statusText, { cause: response });
      }
      const responseContentType = response.headers.get("content-type") || "";
      switch (true) {
        case responseContentType.includes(CONTENT_TYPES.json):
          return createJsonResponseAsyncIterator(response);
        case responseContentType.includes(CONTENT_TYPES.multipart):
          return createMultipartResponseAsyncInterator(response, responseContentType);
        default:
          throw new Error(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${responseContentType}`, { cause: response });
      }
    } catch (error) {
      return {
        async *[Symbol.asyncIterator]() {
          const response = getErrorCause(error);
          yield {
            errors: {
              message: formatErrorMessage(getErrorMessage(error)),
              ...getKeyValueIfValid("networkStatusCode", response == null ? void 0 : response.status),
              ...getKeyValueIfValid("response", response)
            },
            hasNext: false
          };
        }
      };
    }
  };
}
function buildContentSecurityPolicy({ directives }) {
  const result = [];
  const entries = directives instanceof Map ? directives.entries() : Object.entries(directives);
  const namesSeen = /* @__PURE__ */ new Set();
  for (const [rawName, rawValue] of entries) {
    const name = rawName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    if (namesSeen.has(name)) {
      throw new Error(`${rawName} is specified more than once`);
    }
    namesSeen.add(name);
    if (rawValue === true) {
      result.push(name);
      continue;
    }
    if (rawValue === false) {
      continue;
    }
    const value = typeof rawValue === "string" ? rawValue : rawValue.join(" ");
    result.push(value ? `${name} ${value}` : name);
  }
  return result.join("; ");
}
function me(e) {
  let { type: t, data: r = {}, customData: o } = e, n = useLocation(), { publish: a2, cart: s2, prevCart: i2, shop: c2, customData: u2 } = Z(), d = n.pathname + n.search, y = { ...r, customData: { ...u2, ...o }, cart: s2, prevCart: i2, shop: c2 };
  return reactExports.useEffect(() => {
    (c2 == null ? void 0 : c2.shopId) && (y = { ...y, url: window.location.href }, a2(t, y));
  }, [a2, d, c2 == null ? void 0 : c2.shopId]), null;
}
function Rr(e) {
  return jsxRuntimeExports.jsx(me, { ...e, type: "page_viewed" });
}
var G = { PAGE_VIEWED: "page_viewed", PRODUCT_VIEWED: "product_viewed", COLLECTION_VIEWED: "collection_viewed", CART_VIEWED: "cart_viewed", SEARCH_VIEWED: "search_viewed", PRODUCT_ADD_TO_CART: "product_added_to_cart" };
var Ee = "Custom-Storefront-Request-Group-ID", be = "X-Shopify-Storefront-Access-Token", Tt = "X-SDK-Variant", St = "X-SDK-Variant-Source", Pt = "X-SDK-Version", We = "X-Shopify-Client-IP", ge = "X-Shopify-Client-IP-Sig", je = "_sfapi_proxy", Ke = "_server_tracking";
function rn(e) {
  return Object.entries(e).map(([t, r]) => r ? `${t};desc=${r}` : void 0).filter(Boolean).join(", ");
}
function we(e, t) {
  let r = typeof t == "string" ? t : rn(t);
  r && e.headers.append("Server-Timing", r);
}
var on = ["_y", "_s", "_cmp"];
function xr(e) {
  let t = {};
  if (!e) return t;
  let r = new RegExp(`\\b(${on.join("|")});desc="?([^",]+)"?`, "g"), o;
  for (; (o = r.exec(e)) !== null; ) t[o[1]] = o[2];
  return t;
}
function Or(e) {
  var _a2, _b;
  if (typeof window > "u") return false;
  try {
    return !!((_b = (_a2 = window.performance.getEntriesByType("navigation")[0]) == null ? void 0 : _a2.serverTiming) == null ? void 0 : _b.some((r) => r.name === e));
  } catch {
    return false;
  }
}
function _r() {
  return Or(je);
}
function Ur() {
  return Or(Ke);
}
var dn = "https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.2/consent-tracking-api.js", pn = "https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js";
function Rt(e) {
  console.error(`[h2:error:useCustomerPrivacy] Unable to setup Customer Privacy API: Missing consent.${e} configuration.`);
}
function It(e) {
  let { withPrivacyBanner: t = false, onVisitorConsentCollected: r, onReady: o, checkoutDomain: n, storefrontAccessToken: a2, country: s2, locale: i2, sameDomainForStorefrontApi: c2 } = e, u2 = reactExports.useMemo(() => c2 ?? _r(), [c2]), d = reactExports.useMemo(() => u2 && !Ur(), [u2]), y = useShopifyCookies({ fetchTrackingValues: d, storefrontAccessToken: a2, ignoreDeprecatedCookies: true }), m = reactExports.useMemo(getTrackingValues, [y]), { revalidate: C } = useRevalidator();
  useLoadScript(t ? pn : dn, { attributes: { id: "customer-privacy-api" } });
  let { observing: p, setLoaded: l2, apisLoaded: S } = yn({ withPrivacyBanner: t }), f = reactExports.useMemo(() => {
    n || Rt("checkoutDomain"), a2 || Rt("storefrontAccessToken"), (a2.startsWith("shpat_") || a2.length !== 32) && console.error("[h2:error:useCustomerPrivacy] It looks like you passed a private access token, make sure to use the public token");
    let h = fn(n);
    return { checkoutRootDomain: u2 && typeof window < "u" ? window.location.host : n, storefrontRootDomain: h ? "." + h : void 0, storefrontAccessToken: a2, country: s2, locale: i2 };
  }, [Rt, n, a2, s2, i2]);
  reactExports.useEffect(() => {
    let h = (T) => {
      let g2 = getTrackingValues();
      if ((m.visitToken !== g2.visitToken || m.uniqueToken !== g2.uniqueToken) && C().catch(() => {
        console.warn("[h2:warn:useCustomerPrivacy] Revalidation failed after consent change.");
      }), r) {
        let R = se();
        if (R == null ? void 0 : R.shouldShowBanner()) {
          let P = R.currentVisitorConsent();
          if (P && P.marketing === "" && P.analytics === "" && P.preferences === "") return;
        }
        r(T.detail);
      }
    };
    return document.addEventListener("visitorConsentCollected", h), () => {
      document.removeEventListener("visitorConsentCollected", h);
    };
  }, [r]), reactExports.useEffect(() => {
    if (!t || p.current.privacyBanner) return;
    p.current.privacyBanner = true;
    let h = window.privacyBanner || void 0;
    Object.defineProperty(window, "privacyBanner", { configurable: true, get() {
      return h;
    }, set(g2) {
      typeof g2 == "object" && g2 !== null && "showPreferences" in g2 && "loadBanner" in g2 && (h = Vr({ privacyBanner: g2, config: f }), l2.privacyBanner());
    } });
  }, [t, f, Vr, l2.privacyBanner]), reactExports.useEffect(() => {
    if (p.current.customerPrivacy) return;
    p.current.customerPrivacy = true;
    let h = null, T = null, g2 = window.Shopify || void 0;
    Object.defineProperty(window, "Shopify", { configurable: true, get() {
      return g2;
    }, set(R) {
      typeof R == "object" && R !== null && Object.keys(R).length === 0 && (g2 = R, h = { backendConsentEnabled: true }, Object.defineProperty(window.Shopify, "customerPrivacy", { configurable: true, get() {
        return T ?? h;
      }, set(P) {
        if (typeof P == "object" && P !== null && "setTrackingConsent" in P) {
          let U = P;
          T = { ...U, setTrackingConsent: kr({ customerPrivacy: U, config: f }) }, g2 = { ...g2, customerPrivacy: T }, l2.customerPrivacy();
        }
      } }));
    } });
  }, [f, kr, l2.customerPrivacy]), reactExports.useEffect(() => {
    if (!S || !y) return;
    let h = se();
    if (h && !h.cachedConsent) {
      let T = getTrackingValues();
      T.consent && (h.cachedConsent = T.consent);
    }
    if (t) {
      let T = De();
      T && T.loadBanner(f);
    }
    ln(), o == null ? void 0 : o();
  }, [S, y]);
  let v = { customerPrivacy: se() };
  return t && (v.privacyBanner = De()), v;
}
var Lr = false;
function ln() {
  if (Lr) return;
  Lr = true;
  let e = new CustomEvent("shopifyCustomerPrivacyApiLoaded");
  document.dispatchEvent(e);
}
function yn({ withPrivacyBanner: e }) {
  let t = reactExports.useRef({ customerPrivacy: false, privacyBanner: false }), [r, o] = reactExports.useState(e ? [false, false] : [false]), n = r.every(Boolean);
  return { observing: t, setLoaded: { customerPrivacy: () => {
    o(e ? (s2) => [true, s2[1]] : () => [true]);
  }, privacyBanner: () => {
    e && o((s2) => [s2[0], true]);
  } }, apisLoaded: n };
}
function fn(e) {
  if (typeof window > "u") return;
  let t = window.location.host, r = e.split(".").reverse(), o = t.split(".").reverse(), n = [];
  return r.forEach((a2, s2) => {
    a2 === o[s2] && n.push(a2);
  }), n.reverse().join(".") || void 0;
}
function kr({ customerPrivacy: e, config: t }) {
  let r = e.setTrackingConsent, { locale: o, country: n, ...a2 } = t;
  function s2(i2, c2) {
    r({ ...a2, headlessStorefront: true, ...i2 }, c2);
  }
  return s2;
}
function Vr({ privacyBanner: e, config: t }) {
  let r = e.loadBanner, o = e.showPreferences;
  function n(s2) {
    if (typeof s2 == "object") {
      r({ ...t, ...s2 });
      return;
    }
    r(t);
  }
  function a2(s2) {
    if (typeof s2 == "object") {
      o({ ...t, ...s2 });
      return;
    }
    o(t);
  }
  return { loadBanner: n, showPreferences: a2 };
}
function se() {
  var _a2;
  try {
    let e = (_a2 = window.Shopify) == null ? void 0 : _a2.customerPrivacy;
    return e && "setTrackingConsent" in e ? e : null;
  } catch {
    return null;
  }
}
function De() {
  try {
    return window && (window == null ? void 0 : window.privacyBanner) ? window.privacyBanner : null;
  } catch {
    return null;
  }
}
var Nr = "2026.4.3";
function Tn() {
  let e = se();
  if (!e) throw new Error("Shopify Customer Privacy API not available. Must be used within a useEffect. Make sure to load the Shopify Customer Privacy API with useCustomerPrivacy() or <AnalyticsProvider>.");
  return e;
}
function Fr({ consent: e, onReady: t, domain: r }) {
  let { subscribe: o, register: n, canTrack: a2 } = Z(), [s2, i2] = reactExports.useState(false), [c2, u2] = reactExports.useState(false), [d, y] = reactExports.useState(""), m = reactExports.useRef(false), { checkoutDomain: C, storefrontAccessToken: p, language: l2 } = e, { ready: S } = n("Internal_Shopify_Analytics");
  It({ ...e, locale: l2, checkoutDomain: C || "mock.shop", storefrontAccessToken: p || "abcdefghijklmnopqrstuvwxyz123456", onReady: () => !e.withPrivacyBanner && u2(true), onVisitorConsentCollected: (v) => {
    try {
      y(JSON.stringify(v));
    } catch {
    }
    u2(true);
  } });
  let f = reactExports.useMemo(() => c2 ? a2() : true, [c2, a2, d]);
  return useShopifyCookies({ hasUserConsent: f, domain: r, checkoutDomain: C, fetchTrackingValues: false, ignoreDeprecatedCookies: !c2 }), reactExports.useEffect(() => {
    m.current || (m.current = true, o(G.PAGE_VIEWED, Pn), o(G.PRODUCT_VIEWED, vn), o(G.COLLECTION_VIEWED, Rn), o(G.SEARCH_VIEWED, In), o(G.PRODUCT_ADD_TO_CART, En), i2(true));
  }, [o]), reactExports.useEffect(() => {
    s2 && c2 && (S(), t());
  }, [s2, c2, t]), null;
}
function ze(e) {
  console.error(`[h2:error:ShopifyAnalytics] Unable to send Shopify analytics: Missing shop.${e} configuration.`);
}
function _e(e) {
  var _a2, _b, _c, _d;
  let t = Tn(), r = t.analyticsProcessingAllowed();
  if (!((_a2 = e == null ? void 0 : e.shop) == null ? void 0 : _a2.shopId)) {
    ze("shopId");
    return;
  }
  if (!((_b = e == null ? void 0 : e.shop) == null ? void 0 : _b.acceptedLanguage)) {
    ze("acceptedLanguage");
    return;
  }
  if (!((_c = e == null ? void 0 : e.shop) == null ? void 0 : _c.currency)) {
    ze("currency");
    return;
  }
  if (!((_d = e == null ? void 0 : e.shop) == null ? void 0 : _d.hydrogenSubchannelId)) {
    ze("hydrogenSubchannelId");
    return;
  }
  return { shopifySalesChannel: "hydrogen", assetVersionId: Nr, ...e.shop, hasUserConsent: r, ...getClientBrowserParameters(), analyticsAllowed: t.analyticsProcessingAllowed(), marketingAllowed: t.marketingAllowed(), saleOfDataAllowed: t.saleOfDataAllowed(), ccpaEnforced: !t.saleOfDataAllowed(), gdprEnforced: !(t.marketingAllowed() && t.analyticsProcessingAllowed()) };
}
function Sn(e, t) {
  if (t === null) return;
  let r = _e(e);
  return r ? { ...r, cartId: t.id } : void 0;
}
var ie = {};
function Pn(e) {
  let t = _e(e);
  t && (sendShopifyAnalytics({ eventName: AnalyticsEventName.PAGE_VIEW_2, payload: { ...t, ...ie } }), ie = {});
}
function vn(e) {
  let t = _e(e);
  if (t && Hr({ type: "product", products: e.products })) {
    let r = bt(e.products);
    ie = { pageType: AnalyticsPageType.product, resourceId: r[0].productGid }, t = { ...t, ...ie, products: bt(e.products) }, sendShopifyAnalytics({ eventName: AnalyticsEventName.PRODUCT_VIEW, payload: t });
  }
}
function Rn(e) {
  let t = _e(e);
  t && (ie = { pageType: AnalyticsPageType.collection, resourceId: e.collection.id }, t = { ...t, ...ie, collectionHandle: e.collection.handle, collectionId: e.collection.id }, sendShopifyAnalytics({ eventName: AnalyticsEventName.COLLECTION_VIEW, payload: t }));
}
function In(e) {
  let t = _e(e);
  t && (ie = { pageType: AnalyticsPageType.search }, t = { ...t, ...ie, searchString: e.searchTerm }, sendShopifyAnalytics({ eventName: AnalyticsEventName.SEARCH_VIEW, payload: t }));
}
function En(e) {
  let { cart: t, currentLine: r } = e, o = Sn(e, t);
  !o || !(r == null ? void 0 : r.id) || bn({ matchedLine: r, eventPayload: o });
}
function bn({ matchedLine: e, eventPayload: t }) {
  let r = { id: e.merchandise.product.id, variantId: e.merchandise.id, title: e.merchandise.product.title, variantTitle: e.merchandise.title, vendor: e.merchandise.product.vendor, price: e.merchandise.price.amount, quantity: e.quantity, productType: e.merchandise.product.productType, sku: e.merchandise.sku };
  Hr({ type: "cart", products: [r] }) && sendShopifyAnalytics({ eventName: AnalyticsEventName.ADD_TO_CART, payload: { ...t, products: bt([r]) } });
}
function pe(e, t, r, o) {
  if (e === "cart") {
    let n = `${r ? "merchandise" : "merchandise.product"}.${t}`;
    console.error(`[h2:error:ShopifyAnalytics] Can't set up cart analytics events because the \`cart.lines[].${n}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartLine on CartLine\` is defined and make sure \`${n}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L25-L56.`);
  } else {
    let n = `${o || t}`;
    console.error(`[h2:error:ShopifyAnalytics] Can't set up product view analytics events because the \`${n}\` is missing from your \`<Analytics.ProductView>\`. Make sure \`${n}\` is part of your products data prop. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/routes/products.%24handle.tsx#L159-L165.`);
  }
}
function Hr({ type: e, products: t }) {
  return !t || t.length === 0 ? (pe(e, "", false, "data.products"), false) : (t.forEach((r) => {
    if (!r.id) return pe(e, "id", false), false;
    if (!r.title) return pe(e, "title", false), false;
    if (!r.price) return pe(e, "price.amount", true, "price"), false;
    if (!r.vendor) return pe(e, "vendor", false), false;
    if (!r.variantId) return pe(e, "id", true, "variantId"), false;
    if (!r.variantTitle) return pe(e, "title", true, "variantTitle"), false;
  }), true);
}
function bt(e) {
  return e.map((t) => {
    let r = { productGid: t.id, variantGid: t.variantId, name: t.title, variantName: t.variantTitle, brand: t.vendor, price: t.price, quantity: t.quantity || 1, category: t.productType };
    return t.sku && (r.sku = t.sku), t.productType && (r.category = t.productType), r;
  });
}
function Gr(e) {
  console.error(`[h2:error:CartAnalytics] Can't set up cart analytics events because the \`cart.${e}\` value is missing from your GraphQL cart query. In your project, search for where \`fragment CartApiQuery on Cart\` is defined and make sure \`${e}\` is part of your cart query. Check the Hydrogen Skeleton template for reference: https://github.com/Shopify/hydrogen/blob/main/templates/skeleton/app/lib/fragments.ts#L59.`);
}
function Br({ cart: e, setCarts: t }) {
  let { publish: r, shop: o, customData: n, canTrack: a2, cart: s2, prevCart: i2 } = Z(), c2 = reactExports.useRef(null);
  return reactExports.useEffect(() => {
    if (e) return Promise.resolve(e).then((u2) => {
      if (u2 && u2.lines) {
        if (!u2.id) {
          Gr("id");
          return;
        }
        if (!u2.updatedAt) {
          Gr("updatedAt");
          return;
        }
      }
      t(({ cart: d, prevCart: y }) => (u2 == null ? void 0 : u2.updatedAt) !== (d == null ? void 0 : d.updatedAt) ? { cart: u2, prevCart: d } : { cart: d, prevCart: y });
    }), () => {
    };
  }, [t, e]), reactExports.useEffect(() => {
    if (!s2 || !(s2 == null ? void 0 : s2.updatedAt) || (s2 == null ? void 0 : s2.updatedAt) === (i2 == null ? void 0 : i2.updatedAt)) return;
    let u2;
    try {
      u2 = JSON.parse(localStorage.getItem("cartLastUpdatedAt") || "");
    } catch {
      u2 = null;
    }
    if (s2.id === (u2 == null ? void 0 : u2.id) && s2.updatedAt === (u2 == null ? void 0 : u2.updatedAt)) return;
    let d = { eventTimestamp: Date.now(), cart: s2, prevCart: i2, shop: o, customData: n };
    if (s2.updatedAt === c2.current) return;
    c2.current = s2.updatedAt, r("cart_updated", d), localStorage.setItem("cartLastUpdatedAt", JSON.stringify({ id: s2.id, updatedAt: s2.updatedAt }));
    let y = (i2 == null ? void 0 : i2.lines) ? flattenConnection(i2 == null ? void 0 : i2.lines) : [], m = s2.lines ? flattenConnection(s2.lines) : [];
    y == null ? void 0 : y.forEach((C) => {
      let p = m.filter((l2) => C.id === l2.id);
      if ((p == null ? void 0 : p.length) === 1) {
        let l2 = p[0];
        C.quantity < l2.quantity ? r("product_added_to_cart", { ...d, prevLine: C, currentLine: l2 }) : C.quantity > l2.quantity && r("product_removed_from_cart", { ...d, prevLine: C, currentLine: l2 });
      } else r("product_removed_from_cart", { ...d, prevLine: C });
    }), m == null ? void 0 : m.forEach((C) => {
      let p = y.filter((l2) => C.id === l2.id);
      (!p || p.length === 0) && r("product_added_to_cart", { ...d, currentLine: C });
    });
  }, [s2, i2, r, o, n, a2]), null;
}
var Un = "https://cdn.shopify.com/shopifycloud/perf-kit/shopify-perf-kit-spa.min.js";
function Qr({ shop: e }) {
  let t = reactExports.useRef(false), { subscribe: r, register: o } = Z(), { ready: n } = o("Internal_Shopify_Perf_Kit"), a2 = useLoadScript(Un, { attributes: { id: "perfkit", "data-application": "hydrogen", "data-shop-id": parseGid(e.shopId).id.toString(), "data-storefront-id": e.hydrogenSubchannelId, "data-monorail-region": "global", "data-spa-mode": "true", "data-resource-timing-sampling-rate": "100" } });
  return reactExports.useEffect(() => {
    a2 !== "done" || t.current || (t.current = true, r(G.PAGE_VIEWED, () => {
      var _a2;
      (_a2 = window.PerfKit) == null ? void 0 : _a2.navigate();
    }), r(G.PRODUCT_VIEWED, () => {
      var _a2;
      (_a2 = window.PerfKit) == null ? void 0 : _a2.setPageType("product");
    }), r(G.COLLECTION_VIEWED, () => {
      var _a2;
      (_a2 = window.PerfKit) == null ? void 0 : _a2.setPageType("collection");
    }), r(G.SEARCH_VIEWED, () => {
      var _a2;
      (_a2 = window.PerfKit) == null ? void 0 : _a2.setPageType("search");
    }), r(G.CART_VIEWED, () => {
      var _a2;
      (_a2 = window.PerfKit) == null ? void 0 : _a2.setPageType("cart");
    }), n());
  }, [r, n, a2]), null;
}
var Wr = /* @__PURE__ */ new Set(), ee = (e) => {
  Wr.has(e) || (console.warn(e), Wr.add(e));
}, jr = /* @__PURE__ */ new Set(), Dt = (e) => {
  jr.has(e) || (console.error(new Error(e)), jr.add(e));
};
var Mn = { canTrack: () => false, cart: null, customData: {}, prevCart: null, publish: () => {
}, shop: null, subscribe: () => {
}, register: () => ({ ready: () => {
} }), customerPrivacy: null, privacyBanner: null }, Zr = reactExports.createContext(Mn), Ze = /* @__PURE__ */ new Map(), Le = {};
function eo() {
  return Object.values(Le).every(Boolean);
}
function Kr(e, t) {
  var _a2;
  Ze.has(e) || Ze.set(e, /* @__PURE__ */ new Map()), (_a2 = Ze.get(e)) == null ? void 0 : _a2.set(t.toString(), t);
}
var et = /* @__PURE__ */ new Map();
function Yr(e, t) {
  if (!eo()) {
    et.set(e, t);
    return;
  }
  to(e, t);
}
function to(e, t) {
  (Ze.get(e) ?? /* @__PURE__ */ new Map()).forEach((r, o) => {
    try {
      r(t);
    } catch (n) {
      typeof n == "object" && n instanceof Error ? console.error("Analytics publish error", n.message, o, n.stack) : console.error("Analytics publish error", n, o);
    }
  });
}
function Jr(e) {
  return Le.hasOwnProperty(e) || (Le[e] = false), { ready: () => {
    Le[e] = true, eo() && et.size > 0 && (et.forEach((t, r) => {
      to(r, t);
    }), et.clear());
  } };
}
function zr() {
  var _a2, _b;
  try {
    return ((_b = (_a2 = window.Shopify.customerPrivacy) == null ? void 0 : _a2.analyticsProcessingAllowed) == null ? void 0 : _b.call(_a2)) ?? false;
  } catch {
  }
  return false;
}
function Xr(e, t) {
  return `[h2:error:Analytics.Provider] - ${e} is required. Make sure ${t} is defined in your environment variables. See https://h2o.fyi/analytics/consent to learn how to setup environment variables in the Shopify admin.`;
}
function Fn({ canTrack: e, cart: t, children: r, consent: o, customData: n = {}, shop: a2 = null, cookieDomain: s2 }) {
  var _a2;
  let { shop: i2 } = Hn(a2), [c2, u2] = reactExports.useState(!!e), [d, y] = reactExports.useState(false), [m, C] = reactExports.useState({ cart: null, prevCart: null }), [p, l2] = reactExports.useState(e ? () => e : () => zr);
  if (i2) if (/\/68817551382$/.test(i2.shopId)) ee("[h2:error:Analytics.Provider] - Mock shop is used. Analytics will not work properly.");
  else {
    if (!o.checkoutDomain) {
      let f = Xr("consent.checkoutDomain", "PUBLIC_CHECKOUT_DOMAIN");
      Dt(f);
    }
    if (!o.storefrontAccessToken) {
      let f = Xr("consent.storefrontAccessToken", "PUBLIC_STOREFRONT_API_TOKEN");
      Dt(f);
    }
    (o == null ? void 0 : o.country) || (o.country = "US"), (o == null ? void 0 : o.language) || (o.language = "EN"), o.withPrivacyBanner === void 0 && (o.withPrivacyBanner = false);
  }
  let S = reactExports.useMemo(() => ({ canTrack: p, ...m, customData: n, publish: p() ? Yr : () => {
  }, shop: i2, subscribe: Kr, register: Jr, customerPrivacy: se(), privacyBanner: De() }), [c2, p, m, (_a2 = m.cart) == null ? void 0 : _a2.updatedAt, m.prevCart, Yr, Kr, n, i2, Jr, JSON.stringify(Le), se, De]);
  return jsxRuntimeExports.jsxs(Zr.Provider, { value: S, children: [r, !!i2 && jsxRuntimeExports.jsx(Rr, {}), !!i2 && !!t && jsxRuntimeExports.jsx(Br, { cart: t, setCarts: C }), !!i2 && jsxRuntimeExports.jsx(Fr, { consent: o, onReady: () => {
    u2(true), l2(e ? () => e : () => zr), y(true);
  }, domain: s2 }), !!i2 && d && jsxRuntimeExports.jsx(Qr, { shop: i2 })] });
}
function Z() {
  let e = reactExports.useContext(Zr);
  if (!e) throw new Error("[h2:error:useAnalytics] 'useAnalytics()' must be a descendent of <AnalyticsProvider/>");
  return e;
}
function Hn(e) {
  let [t, r] = reactExports.useState(null);
  return reactExports.useEffect(() => (Promise.resolve(e).then(r), () => {
  }), [r, e]), { shop: t };
}
async function qn({ storefront: e, publicStorefrontId: t = "0" }) {
  return e.query($n, { cache: e.CacheLong() }).then(({ shop: r, localization: o }) => ({ shopId: r.id, acceptedLanguage: o.language.isoCode, currency: o.country.currency.isoCode, hydrogenSubchannelId: t }));
}
var $n = `#graphql
  query ShopData(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    shop {
      id
    }
    localization {
      country {
        currency {
          isoCode
        }
      }
      language {
        isoCode
      }
    }
  }
`, Gn = { Provider: Fn };
function Y(e, t) {
  return xt(e.headers, t);
}
function xt(e, t) {
  var _a2;
  let r = ((_a2 = e == null ? void 0 : e.get) == null ? void 0 : _a2.call(e, t)) ?? (e == null ? void 0 : e[t]);
  return typeof r == "string" ? r : null;
}
function ce(e) {
  return { requestId: e ? Y(e, "request-id") : void 0, purpose: e ? Y(e, "purpose") : void 0 };
}
function ro(e) {
  return { requestGroupId: Y(e, "request-id"), buyerIp: Y(e, "oxygen-buyer-ip"), buyerIpSig: Y(e, ge), cookie: Y(e, "cookie"), purpose: Y(e, "sec-purpose") || Y(e, "purpose") };
}
var Ot = /^\/api\/(unstable|2\d{3}-\d{2})\/graphql\.json$/, oo = /^\/api\/mcp$/, tt = (e) => {
  try {
    return new URL(e, "http://e.c").pathname;
  } catch {
    return "/";
  }
};
function ke(e, t) {
  return t.reduce((r, o) => {
    let n = e(o);
    return n && r.push([o, n]), r;
  }, []);
}
function he(e, t = {}) {
  let r = new Error(), o = (n, a2 = "Error") => {
    let s2 = (r.stack ?? "").split(`
`).slice(3 + (t.stackOffset ?? 0)).join(`
`).replace(/ at loader(\d+) \(/, (i2, c2) => i2.replace(c2, ""));
    return `${a2}: ${n}
` + s2;
  };
  return e.then((n) => {
    if ((n == null ? void 0 : n.errors) && Array.isArray(n.errors)) {
      let a2 = typeof t.logErrors == "function" ? t.logErrors : () => t.logErrors ?? false;
      n.errors.forEach((s2) => {
        s2 && (s2.stack = o(s2.message, s2.name), a2(s2) && console.error(s2));
      });
    }
    return n;
  }).catch((n) => {
    throw n && (n.stack = o(n.message, n.name)), n;
  });
}
var J = void 0;
var rt = "public", Qn = "private", _t = "no-store", no = { maxAge: "max-age", staleWhileRevalidate: "stale-while-revalidate", sMaxAge: "s-maxage", staleIfError: "stale-if-error" };
function Ve(e) {
  let t = [];
  return Object.keys(e).forEach((r) => {
    r === "mode" ? t.push(e[r]) : no[r] && t.push(`${no[r]}=${e[r]}`);
  }), t.join(", ");
}
function Ut() {
  return { mode: _t };
}
function Lt(e) {
  if ((e == null ? void 0 : e.mode) && (e == null ? void 0 : e.mode) !== rt && (e == null ? void 0 : e.mode) !== Qn) throw Error("'mode' must be either 'public' or 'private'");
}
function le(e) {
  return Lt(e), { mode: rt, maxAge: 1, staleWhileRevalidate: 9, ...e };
}
function kt(e) {
  return Lt(e), { mode: rt, maxAge: 3600, staleWhileRevalidate: 82800, ...e };
}
function Ae(e) {
  return Lt(e), { mode: rt, maxAge: 1, staleWhileRevalidate: 86399, ...e };
}
function Vt(e) {
  return e;
}
function te(e) {
  return String(e).includes("__proto__") ? JSON.parse(e, Wn) : JSON.parse(e);
}
function Wn(e, t) {
  if (e !== "__proto__") return t;
}
function ot(e, t) {
  return e && t ? { ...e, ...t } : e || Ae();
}
function Nt(e) {
  return Ve(ot(e));
}
async function jn(e, t) {
  if (!e) return;
  let r = await e.match(t);
  if (!r) {
    return;
  }
  return r;
}
async function Kn(e, t, r, o) {
  if (!e) return;
  let n = ot(o), a2 = Nt(ot(n, { maxAge: (n.maxAge || 0) + (n.staleWhileRevalidate || 0) })), s2 = Nt(ot(n));
  r.headers.set("cache-control", a2), r.headers.set("real-cache-control", s2), r.headers.set("cache-put-date", String(Date.now())), await e.put(t, r);
}
async function Yn(e, t) {
  e && await e.delete(t);
}
function Jn(e, t) {
  let r = e.headers.get("real-cache-control"), o = 0;
  if (r) {
    let a2 = r.match(/max-age=(\d*)/);
    a2 && a2.length > 1 && (o = parseFloat(a2[1]));
  }
  return [(Date.now() - Number(t)) / 1e3, o];
}
function zn(e, t) {
  let r = t.headers.get("cache-put-date");
  if (!r) return false;
  let [o, n] = Jn(t, r), a2 = o > n;
  return a2;
}
var nt = { get: jn, set: Kn, delete: Yn, generateDefaultCacheControlHeader: Nt, isStale: zn };
function Ne(e) {
  return `https://shopify.dev/?${e}`;
}
function Xn(e) {
  return e || Ae();
}
async function ao(e, t) {
  if (!e) return;
  let r = Ne(t), o = new Request(r), n = await nt.get(e, o);
  if (!n) return;
  let a2 = await n.text();
  try {
    return [te(a2), n];
  } catch {
    return [a2, n];
  }
}
async function so(e, t, r, o) {
  if (!e) return;
  let n = Ne(t), a2 = new Request(n), s2 = new Response(JSON.stringify(r));
  await nt.set(e, a2, s2, Xn(o));
}
function io(e, t) {
  return nt.isStale(new Request(Ne(e)), t);
}
function co(e) {
  let t = Array.isArray(e) ? e : [e], r = "";
  for (let o of t) o != null && (typeof o == "object" ? r += JSON.stringify(o) : r += o.toString());
  return encodeURIComponent(r);
}
var Mt = /* @__PURE__ */ new Set();
async function at(e, t, { strategy: r = le(), cacheInstance: o, shouldCacheResult: n = () => true, waitUntil: a2, debugInfo: s2 }) {
  let c2 = co([...typeof e == "string" ? [e] : e]), y = (f) => {
    var _a2, _b, _c, _d;
    ({ displayName: f.displayName, url: (_a2 = f.response) == null ? void 0 : _a2.url, responseInit: { status: ((_b = f.response) == null ? void 0 : _b.status) || 0, statusText: ((_c = f.response) == null ? void 0 : _c.statusText) || "", headers: Array.from(((_d = f.response) == null ? void 0 : _d.headers.entries()) || []) } });
  }, C = void 0;
  if (!o || !r || r.mode === _t) {
    let f = await t({ addDebugData: y });
    return f;
  }
  let p = (f) => so(o, c2, { value: f, debugInfo: void 0 }, r), l2 = await ao(o, c2);
  if (l2 && typeof l2[0] != "string") {
    let [{ value: f, debugInfo: v }, h] = l2;
    let T = io(c2, h) ? "STALE" : "HIT";
    if (!Mt.has(c2) && T === "STALE") {
      Mt.add(c2);
      let g2 = Promise.resolve().then(async () => {
        let R = Date.now();
        try {
          let P = await t({ addDebugData: y });
          n(P) && (await p(P), C == null ? void 0 : C({ result: P, cacheStatus: "PUT", overrideStartTime: R }));
        } catch (P) {
          P.message && (P.message = "SWR in sub-request failed: " + P.message), console.error(P);
        } finally {
          Mt.delete(c2);
        }
      });
      a2 == null ? void 0 : a2(g2);
    }
    return f;
  }
  let S = await t({ addDebugData: y });
  if (n(S)) {
    let f = Promise.resolve().then(async () => {
      await p(S);
    });
    a2 == null ? void 0 : a2(f);
  }
  return S;
}
var ea = ["set-cookie", "server-timing"];
function uo(e, t) {
  return [e, { status: t.status, statusText: t.statusText, headers: [...t.headers].filter(([r]) => !ea.includes(r.toLowerCase())) }];
}
function po([e, t]) {
  return [e, new Response(e, t)];
}
async function st(e, t, { cacheInstance: r, cache: o, cacheKey: n = [e, t], shouldCacheResponse: a2, waitUntil: s2, debugInfo: i2, streamConfig: c2, onRawHeaders: u2 }) {
  return !o && (!t.method || t.method === "GET") && (o = le()), at(n, async () => {
    if (c2) {
      let m = null, p = await createGraphQLClient({ url: e, customFetchApi: async (f, v) => (m = await fetch(f, v), u2 == null ? void 0 : u2(m.headers), m), headers: t.headers }).requestStream(c2.query, { variables: c2.variables }), l2, S;
      for await (let f of p) {
        let { data: v, errors: h } = f;
        l2 = v, S = (h == null ? void 0 : h.graphQLErrors) ?? h;
      }
      return (m == null ? void 0 : m.ok) ? uo({ data: l2, errors: S }, m) : m;
    }
    let d = await fetch(e, t);
    if (u2 == null ? void 0 : u2(d.headers), !d.ok) return d;
    let y = await d.text().catch(() => "");
    try {
      y && (y = te(y));
    } catch {
    }
    return uo(y, d);
  }, { cacheInstance: r, waitUntil: s2, strategy: o ?? null, debugInfo: i2, shouldCacheResult: (d) => "ok" in d ? false : a2(...po(d)) }).then((d) => "ok" in d ? [null, d] : po(d));
}
var lo = "cartFormInput";
function re({ children: e, action: t, inputs: r, route: o, fetcherKey: n }) {
  let a2 = useFetcher({ key: n });
  return jsxRuntimeExports.jsxs(a2.Form, { action: o || "", method: "post", children: [(t || r) && jsxRuntimeExports.jsx("input", { type: "hidden", name: lo, value: JSON.stringify({ action: t, inputs: r }) }), typeof e == "function" ? e(a2) : e] });
}
re.INPUT_NAME = lo;
re.ACTIONS = { AttributesUpdateInput: "AttributesUpdateInput", BuyerIdentityUpdate: "BuyerIdentityUpdate", Create: "Create", DiscountCodesUpdate: "DiscountCodesUpdate", GiftCardCodesUpdate: "GiftCardCodesUpdate", GiftCardCodesAdd: "GiftCardCodesAdd", GiftCardCodesRemove: "GiftCardCodesRemove", LinesAdd: "LinesAdd", LinesRemove: "LinesRemove", LinesUpdate: "LinesUpdate", NoteUpdate: "NoteUpdate", SelectedDeliveryOptionsUpdate: "SelectedDeliveryOptionsUpdate", MetafieldsSet: "MetafieldsSet", MetafieldDelete: "MetafieldDelete", DeliveryAddressesAdd: "DeliveryAddressesAdd", DeliveryAddressesUpdate: "DeliveryAddressesUpdate", DeliveryAddressesRemove: "DeliveryAddressesRemove", DeliveryAddressesReplace: "DeliveryAddressesReplace" };
function oa(e) {
  let t = {};
  for (let s2 of e.entries()) {
    let i2 = s2[0], c2 = e.getAll(i2);
    t[i2] = c2.length > 1 ? c2 : s2[1], t[i2] === "on" ? t[i2] = true : t[i2] === "off" && (t[i2] = false);
  }
  let { cartFormInput: r, ...o } = t, { action: n, inputs: a2 } = r ? JSON.parse(String(r)) : {};
  return { action: n, inputs: { ...a2, ...o } };
}
re.getFormInput = oa;
var Ht = (e) => {
  let t = u(xt(e, "Cookie") || "");
  return () => t.cart ? `gid://shopify/Cart/${t.cart}` : void 0;
};
var qt = (e) => (t) => {
  let r = new Headers();
  return r.append("Set-Cookie", l$1("cart", t.split("/").pop() || "", { path: "/", ...e })), r;
};
function it() {
  return typeof crypto < "u" && crypto.randomUUID ? crypto.randomUUID() : `weak-${Math.random().toString(16).substring(2)}`;
}
var Me = "2026.4.3";
function Te(e) {
  return e.replace(/\s*#.*$/gm, "").replace(/\s+/gm, " ").trim();
}
var ca = /(^|}\s)query[\s({]/im, ua = /(^|}\s)mutation[\s({]/im;
function ct(e, t) {
  if (!ca.test(e)) throw new Error(`[h2:error:${t}] Can only execute queries`);
}
function ut(e, t) {
  if (!ua.test(e)) throw new Error(`[h2:error:${t}] Can only execute mutations`);
}
var ye = class extends Error {
  constructor(t, r = {}) {
    let n = (r.clientOperation ? `[h2:error:${r.clientOperation}] ` : "") + t + (r.requestId ? ` - Request ID: ${r.requestId}` : "");
    super(n);
    __publicField(this, "locations");
    __publicField(this, "path");
    __publicField(this, "extensions");
    this.name = "GraphQLError", this.extensions = r.extensions, this.locations = r.locations, this.path = r.path, this.stack = r.stack || void 0;
    try {
      this.cause = JSON.stringify({ ...typeof r.cause == "object" ? r.cause : {}, requestId: r.requestId });
    } catch {
      r.cause && (this.cause = r.cause);
    }
  }
  get [Symbol.toStringTag]() {
    return this.name;
  }
  toString() {
    let t = `${this.name}: ${this.message}`;
    if (this.path) try {
      t += ` | path: ${JSON.stringify(this.path)}`;
    } catch {
    }
    if (this.extensions) try {
      t += ` | extensions: ${JSON.stringify(this.extensions)}`;
    } catch {
    }
    return t += `
`, this.stack && (t += `${this.stack.slice(this.stack.indexOf(`
`) + 1)}
`), t;
  }
  toJSON() {
    return { name: "Error", message: "" };
  }
};
function Fe({ url: e, response: t, errors: r, type: o, query: n, queryVariables: a2, ErrorConstructor: s2 = Error, client: i2 = "storefront" }) {
  var _a2;
  let c2 = (typeof r == "string" ? r : (_a2 = r == null ? void 0 : r.map) == null ? void 0 : _a2.call(r, (d) => d.message).join(`
`)) || `URL: ${e}
API response error: ${t.status}`, u2 = new ye(c2, { query: n, queryVariables: a2, cause: { errors: r }, clientOperation: `${i2}.${o}`, requestId: t.headers.get("x-request-id") });
  throw new s2(u2.message, { cause: u2.cause });
}
var ya = { language: "EN", country: "US" };
function Co(e) {
  var _a2, _b;
  let { storefrontHeaders: t, cache: r, waitUntil: o, i18n: n, storefrontId: a2, logErrors: s2 = true, ...i2 } = e, { getPublicTokenHeaders: u2, getPrivateTokenHeaders: d, getStorefrontApiUrl: y, getShopifyDomain: m } = createStorefrontClient(i2), p = (i2.privateStorefrontToken ? d : u2)({ contentType: "json", buyerIp: (t == null ? void 0 : t.buyerIp) || "" });
  (t == null ? void 0 : t.buyerIp) && (p[We] = t.buyerIp), (t == null ? void 0 : t.buyerIpSig) && (p[ge] = t.buyerIpSig), p[Ee] = (t == null ? void 0 : t.requestGroupId) || it(), a2 && (p[SHOPIFY_STOREFRONT_ID_HEADER] = a2), p["user-agent"] = `Hydrogen ${Me}`;
  let l2 = (t == null ? void 0 : t.cookie) ?? "";
  l2 && (p.cookie = l2);
  let S, f;
  if (!/\b_shopify_(analytics|marketing)=/.test(l2)) {
    let g2 = (_a2 = l2.match(/\b_shopify_y=([^;]+)/)) == null ? void 0 : _a2[1], R = (_b = l2.match(/\b_shopify_s=([^;]+)/)) == null ? void 0 : _b[1];
    g2 && (p[SHOPIFY_STOREFRONT_Y_HEADER] = g2), R && (p[SHOPIFY_STOREFRONT_S_HEADER] = R), S = g2 ?? it(), f = R ?? it(), p[SHOPIFY_UNIQUE_TOKEN_HEADER] = S, p[SHOPIFY_VISIT_TOKEN_HEADER] = f;
  }
  let v, h = JSON.stringify({ "content-type": p["content-type"], "user-agent": p["user-agent"], [Tt]: p[Tt], [St]: p[St], [Pt]: p[Pt], [be]: p[be] });
  async function T({ query: g2, mutation: R, variables: P, cache: U, headers: V = [], storefrontApiVersion: W, displayName: gt, stackInfo: ht }) {
    let Qe = V instanceof Headers ? Object.fromEntries(V.entries()) : Array.isArray(V) ? Object.fromEntries(V) : V, K = g2 ?? R, A = { ...P };
    n && (!(P == null ? void 0 : P.country) && /\$country/.test(K) && (A.country = n.country), !(P == null ? void 0 : P.language) && /\$language/.test(K) && (A.language = n.language));
    let E = y({ storefrontApiVersion: W }), k = JSON.stringify({ query: K, variables: A }), L = { method: "POST", headers: { ...p, ...Qe }, body: k }, Q = [E, L.method, h, L.body], ae = K.includes("@defer") ? { query: K, variables: A } : void 0, [q, j] = await st(E, L, { cacheInstance: R ? void 0 : r, cache: U || Ae(), cacheKey: Q, waitUntil: o, shouldCacheResponse: (M) => !(M == null ? void 0 : M.errors), debugInfo: { requestId: L.headers[Ee], displayName: gt, url: E, stackInfo: ht, graphql: k, purpose: t == null ? void 0 : t.purpose }, streamConfig: ae, onRawHeaders: (M) => {
      v ?? (v = { setCookie: M.getSetCookie(), serverTiming: M.get("server-timing") ?? "" });
    } }), z = { url: E, response: j, type: R ? "mutation" : "query", query: K, queryVariables: A, errors: void 0 };
    if (!j.ok) {
      let M, X = q;
      try {
        X ?? (X = await j.text()), M = te(X);
      } catch {
        M = [{ message: X ?? "Could not parse Storefront API response" }];
      }
      Fe({ ...z, errors: M });
    }
    let { data: N, errors: $ } = q;
    $ = $ ? Array.isArray($) ? $ : [$] : void 0;
    let Ie = $ == null ? void 0 : $.map(({ message: M, ...X }) => new ye(M, { ...X, clientOperation: `storefront.${z.type}`, requestId: j.headers.get("x-request-id"), queryVariables: A, query: K }));
    return I(N, Ie);
  }
  return { storefront: { query(g2, R) {
    g2 = Te(g2), ct(g2, "storefront.query");
    let P = mo == null ? void 0 : mo(g2);
    return he(T({ ...R, query: g2, stackInfo: J == null ? void 0 : J(P) }), { stackOffset: P, logErrors: s2 });
  }, mutate(g2, R) {
    g2 = Te(g2), ut(g2, "storefront.mutate");
    let P = mo == null ? void 0 : mo(g2);
    return he(T({ ...R, mutation: g2, stackInfo: J == null ? void 0 : J(P) }), { stackOffset: P, logErrors: s2 });
  }, cache: r, CacheNone: Ut, CacheLong: kt, CacheShort: le, CacheCustom: Vt, generateCacheControlHeader: Ve, getPublicTokenHeaders: u2, getPrivateTokenHeaders: d, getHeaders: () => ({ ...p }), getShopifyDomain: m, getApiUrl: y, i18n: n ?? ya, isStorefrontApiUrl(g2) {
    return Ot.test(tt(g2.url ?? ""));
  }, async forward(g2, R) {
    var _a3;
    let P = new Headers([...ke((W) => g2.headers.get(W), ["accept", "accept-encoding", "accept-language", "access-control-request-headers", "access-control-request-method", "content-type", "content-length", "cookie", "origin", "referer", "user-agent", be, SHOPIFY_UNIQUE_TOKEN_HEADER, SHOPIFY_VISIT_TOKEN_HEADER]), ...ke((W) => p[W], [We, ge, SHOPIFY_STOREFRONT_ID_HEADER, Ee])]);
    (t == null ? void 0 : t.buyerIp) && P.set("x-forwarded-for", t.buyerIp);
    let U = (R == null ? void 0 : R.storefrontApiVersion) ?? ((_a3 = tt(g2.url).match(Ot)) == null ? void 0 : _a3[1]), V = await fetch(y({ storefrontApiVersion: U }), { method: g2.method, body: g2.body, headers: P });
    return new Response(V.body, V);
  }, isMcpUrl(g2) {
    return oo.test(tt(g2.url ?? ""));
  }, async forwardMcp(g2) {
    let R = new Headers([...ke((U) => g2.headers.get(U), ["accept", "accept-encoding", "accept-language", "content-type", "cookie", "origin", "referer", "user-agent"]), ...ke((U) => p[U], [We, ge, be, Ee, SHOPIFY_STOREFRONT_ID_HEADER])]);
    (t == null ? void 0 : t.buyerIp) && R.set("x-forwarded-for", t.buyerIp);
    let P = `${m()}/api/mcp`;
    try {
      let U = await fetch(P, { method: g2.method, body: g2.body, headers: R });
      return new Response(U.body, U);
    } catch (U) {
      let W = U instanceof Error ? U.message : "Internal proxy error";
      return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32603, message: W }, id: null }), { status: 502, headers: { "content-type": "application/json" } });
    }
  }, setCollectedSubrequestHeaders: (g2) => {
    var _a3;
    if (v) for (let V of v.setCookie) g2.headers.append("Set-Cookie", V);
    let R = xr(v == null ? void 0 : v.serverTiming), P = (_a3 = g2.headers.get("content-type")) == null ? void 0 : _a3.startsWith("text/html");
    we(g2, { ...P ? { _y: S, _s: f } : void 0, ...R }), P && v && v.setCookie.length > 1 && (R == null ? void 0 : R._y) && (R == null ? void 0 : R._s) && (R == null ? void 0 : R._cmp) && we(g2, { [Ke]: "1" });
  } } };
}
var mo = void 0;
function I(e, t) {
  return { ...e, ...t && { errors: t } };
}
function b(e) {
  return (e == null ? void 0 : e.visitorConsent) !== void 0;
}
function w(e = false) {
  let t = `$country: CountryCode = ZZ
    $language: LanguageCode`;
  return e ? `${t}
    $visitorConsent: VisitorConsent` : t;
}
function D(e = false) {
  return e ? "@inContext(country: $country, language: $language, visitorConsent: $visitorConsent)" : "@inContext(country: $country, language: $language)";
}
function Gt({ storefront: e, customerAccount: t, getCartId: r, cartFragment: o }) {
  return async (n) => {
    let a2 = (n == null ? void 0 : n.cartId) ?? r();
    if (!a2) return null;
    let s2 = b(n), [i2, { cart: c2, errors: u2 }] = await Promise.all([t ? t.isLoggedIn() : false, e.query(fa(o, { includeVisitorConsent: s2 }), { variables: { cartId: a2, ...n }, cache: e.CacheNone() })]);
    if (i2 && c2 && typeof c2 == "object" && "checkoutUrl" in c2 && typeof c2.checkoutUrl == "string") {
      let d = new URL(c2.checkoutUrl);
      d.searchParams.set("logged_in", "true"), Object.assign(c2, { checkoutUrl: d.toString() });
    }
    return c2 || u2 ? I(c2, u2) : null;
  };
}
var fa = (e = ma, t = {}) => `#graphql
  query CartQuery(
    $cartId: ID!
    $numCartLines: Int = 100
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cart(id: $cartId) {
      ...CartApiQuery
    }
  }

  ${e}
`, ma = `#graphql
  fragment CartApiQuery on Cart {
    updatedAt
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              availableForSale
              compareAtPrice {
                ...CartApiMoney
              }
              price {
                ...CartApiMoney
              }
              requiresShipping
              title
              image {
                ...CartApiImage
              }
              product {
                handle
                title
                id
                vendor
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...CartApiMoney
      }
      totalAmount {
        ...CartApiMoney
      }
      totalDutyAmount {
        ...CartApiMoney
      }
      totalTaxAmount {
        ...CartApiMoney
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      applicable
      code
    }
    appliedGiftCards {
      id
      lastCharacters
      amountUsed {
        ...CartApiMoney
      }
    }
  }

  fragment CartApiMoney on MoneyV2 {
    currencyCode
    amount
  }

  fragment CartApiImage on Image {
    id
    url
    altText
    width
    height
  }
`;
var x = `#graphql
  fragment CartApiError on CartUserError {
    message
    field
    code
  }
`, O = `#graphql
  fragment CartApiMutation on Cart {
    id
    totalQuantity
    checkoutUrl
  }
`, _ = `#graphql
  fragment CartApiWarning on CartWarning {
    code
    message
    target
  }
`;
function Bt(e) {
  return async (t, r) => {
    let o = e.customerAccount ? await e.customerAccount.getBuyer() : void 0, { cartId: n, ...a2 } = r || {}, { buyerIdentity: s2, ...i2 } = t, c2 = b(r), { cartCreate: u2, errors: d } = await e.storefront.mutate(Ca(e.cartFragment, { includeVisitorConsent: c2 }), { variables: { input: { ...i2, buyerIdentity: { ...o, ...s2 } }, ...a2 } });
    return I(u2, d);
  };
}
var Ca = (e = O, t = {}) => `#graphql
  mutation cartCreate(
    $input: CartInput!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartCreate(input: $input) {
      cart {
        ...CartApiMutation
        checkoutUrl
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function Qt(e) {
  return async (t, r) => {
    let o = b(r), { cartLinesAdd: n, errors: a2 } = await e.storefront.mutate(ga(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), lines: t, ...r } });
    return I(n, a2);
  };
}
var ga = (e = O, t = {}) => `#graphql
  mutation cartLinesAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
var go = "__h_pending_";
function ho(e) {
  return go + e;
}
function dt(e) {
  return e.startsWith(go);
}
function pt(e, t) {
  if (t.some((r) => dt(typeof r == "string" ? r : r.id))) throw new Error(`Tried to perform an action on an optimistic line. Make sure to disable your "${e}" CartForm action when the line is optimistic.`);
}
function Wt(e) {
  return async (t, r) => {
    pt("updateLines", t);
    let o = b(r), { cartLinesUpdate: n, errors: a2 } = await e.storefront.mutate(ha(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), lines: t, ...r } });
    return I(n, a2);
  };
}
var ha = (e = O, t = {}) => `#graphql
  mutation cartLinesUpdate(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function jt(e) {
  return async (t, r) => {
    pt("removeLines", t);
    let o = b(r), { cartLinesRemove: n, errors: a2 } = await e.storefront.mutate(Aa(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), lineIds: t, ...r } });
    return I(n, a2);
  };
}
var Aa = (e = O, t = {}) => `#graphql
  mutation cartLinesRemove(
    $cartId: ID!
    $lineIds: [ID!]!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function Kt(e) {
  return async (t, r) => {
    let o = t.filter((i2, c2, u2) => u2.indexOf(i2) === c2), n = b(r), { cartDiscountCodesUpdate: a2, errors: s2 } = await e.storefront.mutate(Ta(e.cartFragment, { includeVisitorConsent: n }), { variables: { cartId: e.getCartId(), discountCodes: o, ...r } });
    return I(a2, s2);
  };
}
var Ta = (e = O, t = {}) => `#graphql
  mutation cartDiscountCodesUpdate(
    $cartId: ID!
    $discountCodes: [String!]!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      ... @defer {
        cart {
          ...CartApiMutation
        }
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function Yt(e) {
  return async (t, r) => {
    t.companyLocationId && e.customerAccount && e.customerAccount.setBuyer({ companyLocationId: t.companyLocationId });
    let o = e.customerAccount ? await e.customerAccount.getBuyer() : void 0, n = b(r), { cartBuyerIdentityUpdate: a2, errors: s2 } = await e.storefront.mutate(Sa(e.cartFragment, { includeVisitorConsent: n }), { variables: { cartId: e.getCartId(), buyerIdentity: { ...o, ...t }, ...r } });
    return I(a2, s2);
  };
}
var Sa = (e = O, t = {}) => `#graphql
  mutation cartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function Jt(e) {
  return async (t, r) => {
    let o = b(r), { cartNoteUpdate: n, errors: a2 } = await e.storefront.mutate(Pa(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), note: t, ...r } });
    return I(n, a2);
  };
}
var Pa = (e = O, t = {}) => `#graphql
  mutation cartNoteUpdate(
    $cartId: ID!
    $note: String!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartNoteUpdate(cartId: $cartId, note: $note) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function zt(e) {
  return async (t, r) => {
    let o = b(r), { cartSelectedDeliveryOptionsUpdate: n, errors: a2 } = await e.storefront.mutate(va(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), selectedDeliveryOptions: t, ...r } });
    return I(n, a2);
  };
}
var va = (e = O, t = {}) => `#graphql
  mutation cartSelectedDeliveryOptionsUpdate(
    $cartId: ID!
    $selectedDeliveryOptions: [CartSelectedDeliveryOptionInput!]!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartSelectedDeliveryOptionsUpdate(cartId: $cartId, selectedDeliveryOptions: $selectedDeliveryOptions) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function Xt(e) {
  return async (t, r) => {
    let o = b(r), { cartAttributesUpdate: n, errors: a2 } = await e.storefront.mutate(Ra(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: (r == null ? void 0 : r.cartId) || e.getCartId(), attributes: t, ...r } });
    return I(n, a2);
  };
}
var Ra = (e = O, t = {}) => `#graphql
  mutation cartAttributesUpdate(
    $cartId: ID!
    $attributes: [AttributeInput!]!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function Zt(e) {
  return async (t, r) => {
    let o = (r == null ? void 0 : r.cartId) || e.getCartId(), n = t.map((c2) => ({ ...c2, ownerId: o })), a2 = b(r), { cartMetafieldsSet: s2, errors: i2 } = await e.storefront.mutate(Ia({ includeVisitorConsent: a2 }), { variables: { metafields: n, ...r } });
    return I({ cart: { id: o }, ...s2 }, i2);
  };
}
var Ia = (e = {}) => `#graphql
  mutation cartMetafieldsSet(
    $metafields: [CartMetafieldsSetInput!]!
    ${w(e.includeVisitorConsent)}
  ) ${D(e.includeVisitorConsent)} {
    cartMetafieldsSet(metafields: $metafields) {
      userErrors {
        code
        elementIndex
        field
        message
      }
    }
  }
`;
function er(e) {
  return async (t, r) => {
    let o = (r == null ? void 0 : r.cartId) || e.getCartId(), n = b(r), { cartMetafieldDelete: a2, errors: s2 } = await e.storefront.mutate(Ea({ includeVisitorConsent: n }), { variables: { input: { ownerId: o, key: t }, ...r } });
    return I({ cart: { id: o }, ...a2 }, s2);
  };
}
var Ea = (e = {}) => `#graphql
  mutation cartMetafieldDelete(
    $input: CartMetafieldDeleteInput!
    ${w(e.includeVisitorConsent)}
  ) ${D(e.includeVisitorConsent)} {
    cartMetafieldDelete(input: $input) {
      userErrors {
        code
        field
        message
      }
    }
  }
`;
function tr(e) {
  return async (t, r) => {
    let o = b(r), { cartGiftCardCodesUpdate: n, errors: a2 } = await e.storefront.mutate(ba(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), giftCardCodes: t, ...r } });
    return I(n, a2);
  };
}
var ba = (e = O, t = {}) => `#graphql
  mutation cartGiftCardCodesUpdate(
    $cartId: ID!
    $giftCardCodes: [String!]!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartGiftCardCodesUpdate(cartId: $cartId, giftCardCodes: $giftCardCodes) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function rr(e) {
  return async (t, r) => {
    let { cartGiftCardCodesAdd: o, errors: n } = await e.storefront.mutate(wa(e.cartFragment), { variables: { cartId: e.getCartId(), giftCardCodes: t, ...r } });
    return I(o, n);
  };
}
var wa = (e = O) => `#graphql
  mutation cartGiftCardCodesAdd(
    $cartId: ID!
    $giftCardCodes: [String!]!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(country: $country, language: $language) {
    cartGiftCardCodesAdd(cartId: $cartId, giftCardCodes: $giftCardCodes) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function or(e) {
  return async (t, r) => {
    let o = b(r), { cartGiftCardCodesRemove: n, errors: a2 } = await e.storefront.mutate(Da(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), appliedGiftCardIds: t, ...r } });
    return I(n, a2);
  };
}
var Da = (e = O, t = {}) => `#graphql
  mutation cartGiftCardCodesRemove(
    $cartId: ID!
    $appliedGiftCardIds: [ID!]!
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartGiftCardCodesRemove(cartId: $cartId, appliedGiftCardIds: $appliedGiftCardIds) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function Ao(e) {
  return async (t, r) => {
    let o = b(r), { cartDeliveryAddressesAdd: n, errors: a2 } = await e.storefront.mutate(xa(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), addresses: t, ...r } });
    return I(n, a2);
  };
}
var xa = (e = O, t = {}) => `#graphql
  mutation cartDeliveryAddressesAdd(
    $cartId: ID!
    $addresses: [CartSelectableAddressInput!]!,
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartDeliveryAddressesAdd(addresses: $addresses, cartId: $cartId) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function To(e) {
  return async (t, r) => {
    let o = b(r), { cartDeliveryAddressesRemove: n, errors: a2 } = await e.storefront.mutate(Oa(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), addressIds: t, ...r } });
    return I(n, a2);
  };
}
var Oa = (e = O, t = {}) => `#graphql
  mutation cartDeliveryAddressesRemove(
    $cartId: ID!
    $addressIds: [ID!]!,
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartDeliveryAddressesRemove(addressIds: $addressIds, cartId: $cartId) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function So(e) {
  return async (t, r) => {
    let o = b(r), { cartDeliveryAddressesUpdate: n, errors: a2 } = await e.storefront.mutate(_a(e.cartFragment, { includeVisitorConsent: o }), { variables: { cartId: e.getCartId(), addresses: t, ...r } });
    return I(n, a2);
  };
}
var _a = (e = O, t = {}) => `#graphql
  mutation cartDeliveryAddressesUpdate(
    $cartId: ID!
    $addresses: [CartSelectableAddressUpdateInput!]!,
    ${w(t.includeVisitorConsent)}
  ) ${D(t.includeVisitorConsent)} {
    cartDeliveryAddressesUpdate(addresses: $addresses, cartId: $cartId) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function Po(e) {
  return async (t, r) => {
    let { cartDeliveryAddressesReplace: o, errors: n } = await e.storefront.mutate(Ua(e.cartFragment), { variables: { cartId: e.getCartId(), addresses: t, ...r } });
    return I(o, n);
  };
}
var Ua = (e = O) => `#graphql
  mutation cartDeliveryAddressesReplace(
    $cartId: ID!
    $addresses: [CartSelectableAddressInput!]!,
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartDeliveryAddressesReplace(addresses: $addresses, cartId: $cartId) {
      cart {
        ...CartApiMutation
      }
      userErrors {
        ...CartApiError
      }
      warnings {
        ...CartApiWarning
      }
    }
  }
  ${e}
  ${x}
  ${_}
`;
function nr(e) {
  let { getCartId: t, setCartId: r, storefront: o, customerAccount: n, cartQueryFragment: a2, cartMutateFragment: s2, buyerIdentity: i2 } = e, c2 = t(), u2 = () => c2 || t(), d = { storefront: o, getCartId: u2, cartFragment: s2, customerAccount: n }, y = Bt(d), m = async function(...p) {
    p[0].buyerIdentity = { ...i2, ...p[0].buyerIdentity };
    let l2 = await y(...p);
    if ((l2 == null ? void 0 : l2.cart) && (typeof l2.cart != "object" || !("id" in l2.cart) || typeof l2.cart.id != "string")) throw new Error("[h2:error:createCartHandler] Cart created but response is missing a valid `id` field. Ensure your cart query fragment includes the `id` field.");
    return c2 = (l2 == null ? void 0 : l2.cart) && typeof l2.cart == "object" && "id" in l2.cart && typeof l2.cart.id == "string" ? l2.cart.id : void 0, l2;
  }, C = { get: Gt({ storefront: o, customerAccount: n, getCartId: u2, cartFragment: a2 }), getCartId: u2, setCartId: r, create: m, addLines: async (p, l2) => {
    let S = p.map((f) => ({ attributes: f.attributes, quantity: f.quantity, merchandiseId: f.merchandiseId, sellingPlanId: f.sellingPlanId, parent: f.parent }));
    return c2 || (l2 == null ? void 0 : l2.cartId) ? await Qt(d)(S, l2) : await m({ lines: S, buyerIdentity: i2 }, l2);
  }, updateLines: Wt(d), removeLines: jt(d), updateDiscountCodes: async (p, l2) => c2 || (l2 == null ? void 0 : l2.cartId) ? await Kt(d)(p, l2) : await m({ discountCodes: p }, l2), updateGiftCardCodes: async (p, l2) => c2 || (l2 == null ? void 0 : l2.cartId) ? await tr(d)(p, l2) : await m({ giftCardCodes: p }, l2), addGiftCardCodes: rr(d), removeGiftCardCodes: or(d), updateBuyerIdentity: async (p, l2) => c2 || (l2 == null ? void 0 : l2.cartId) ? await Yt(d)(p, l2) : await m({ buyerIdentity: p }, l2), updateNote: async (p, l2) => c2 || (l2 == null ? void 0 : l2.cartId) ? await Jt(d)(p, l2) : await m({ note: p }, l2), updateSelectedDeliveryOption: zt(d), updateAttributes: async (p, l2) => c2 || (l2 == null ? void 0 : l2.cartId) ? await Xt(d)(p, l2) : await m({ attributes: p }, l2), setMetafields: async (p, l2) => c2 || (l2 == null ? void 0 : l2.cartId) ? await Zt(d)(p, l2) : await m({ metafields: p }, l2), deleteMetafield: er(d), addDeliveryAddresses: Ao(d), removeDeliveryAddresses: To(d), updateDeliveryAddresses: So(d), replaceDeliveryAddresses: Po(d) };
  return "customMethods" in e ? { ...C, ...e.customMethods ?? {} } : C;
}
function ka(e) {
  let t = useFetchers();
  if (!t || !t.length) return e;
  let r = (e == null ? void 0 : e.lines) ? structuredClone(e) : { lines: { nodes: [] } }, o = r.lines.nodes, n = false;
  for (let { formData: a2 } of t) {
    if (!a2) continue;
    let s2 = re.getFormInput(a2);
    if (s2.action === re.ACTIONS.LinesAdd) for (let i2 of s2.inputs.lines) {
      if (!i2.selectedVariant) {
        console.error("[h2:error:useOptimisticCart] No selected variant was passed in the cart action. Make sure to pass the selected variant if you want to use an optimistic cart");
        continue;
      }
      let c2 = o.find((u2) => {
        var _a2;
        return u2.merchandise.id === ((_a2 = i2.selectedVariant) == null ? void 0 : _a2.id);
      });
      n = true, c2 ? (c2.quantity = (c2.quantity || 1) + (i2.quantity || 1), c2.isOptimistic = true) : o.unshift({ id: ho(i2.selectedVariant.id), merchandise: i2.selectedVariant, isOptimistic: true, quantity: i2.quantity || 1 });
    }
    else if (s2.action === re.ACTIONS.LinesRemove) for (let i2 of s2.inputs.lineIds) {
      let c2 = o.findIndex((u2) => u2.id === i2);
      if (c2 !== -1) {
        if (dt(o[c2].id)) {
          console.error("[h2:error:useOptimisticCart] Tried to remove an optimistic line that has not been added to the cart yet");
          continue;
        }
        o.splice(c2, 1), n = true;
      } else console.warn(`[h2:warn:useOptimisticCart] Tried to remove line '${i2}' but it doesn't exist in the cart`);
    }
    else if (s2.action === re.ACTIONS.LinesUpdate) for (let i2 of s2.inputs.lines) {
      let c2 = o.findIndex((u2) => i2.id === u2.id);
      if (c2 > -1) {
        if (dt(o[c2].id)) {
          console.error("[h2:error:useOptimisticCart] Tried to update an optimistic line that has not been added to the cart yet");
          continue;
        }
        o[c2].quantity = i2.quantity, o[c2].quantity === 0 && o.splice(c2, 1), n = true;
      } else console.warn(`[h2:warn:useOptimisticCart] Tried to update line '${i2.id}' but it doesn't exist in the cart`);
    }
  }
  return n && (r.isOptimistic = n), r.totalQuantity = o.reduce((a2, s2) => a2 + s2.quantity, 0), r;
}
var He = createContext(), ar = createContext(), sr = createContext(), ir = createContext(), cr = createContext(), ur = createContext();
var lt = "2026-04", Pe = `Shopify Hydrogen ${Me}`, vo = "30243aa5-17c1-465a-8493-944bcc4e88aa", F = "customerAccount", ve = "buyer";
var B = class extends Response {
  constructor(t, r, o) {
    super(`Bad request: ${t}`, { status: 400, headers: o });
  }
};
function $e(e, t = {}) {
  let r = t.headers ? new Headers(t.headers) : new Headers({});
  return r.set("location", e), new Response(null, { status: t.status || 302, headers: r });
}
async function Fa({ session: e, customerAccountId: t, customerAccountTokenExchangeUrl: r, httpsOrigin: o, debugInfo: n }) {
  let a2 = new URLSearchParams(), s2 = e.get(F), i2 = s2 == null ? void 0 : s2.refreshToken, c2 = s2 == null ? void 0 : s2.idToken;
  if (!i2) throw new B("Unauthorized", "No refreshToken found in the session. Make sure your session is configured correctly and passed to `createCustomerAccountClient`.");
  a2.append("grant_type", "refresh_token"), a2.append("refresh_token", i2), a2.append("client_id", t);
  let u2 = { "content-type": "application/x-www-form-urlencoded", "User-Agent": Pe, Origin: o };
  (/* @__PURE__ */ new Date()).getTime();
  let y = r, m = await fetch(y, { method: "POST", headers: u2, body: a2 });
  if (!m.ok) {
    let S = await m.text();
    throw new Response(S, { status: m.status, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
  let { access_token: C, expires_in: p, refresh_token: l2 } = await m.json();
  if (!C || C.length === 0) throw new B("Unauthorized", "Invalid access token received.");
  e.set(F, { accessToken: C, expiresAt: new Date((/* @__PURE__ */ new Date()).getTime() + (p - 120) * 1e3).getTime() + "", refreshToken: l2, idToken: c2 });
}
function Re(e) {
  e.unset(F), e.unset(ve);
}
async function Ro({ locks: e, expiresAt: t, session: r, customerAccountId: o, customerAccountTokenExchangeUrl: n, httpsOrigin: a2, debugInfo: s2 }) {
  if (parseInt(t, 10) - 1e3 < (/* @__PURE__ */ new Date()).getTime()) try {
    e.refresh || (e.refresh = Fa({ session: r, customerAccountId: o, customerAccountTokenExchangeUrl: n, httpsOrigin: a2, debugInfo: s2 })), await e.refresh, delete e.refresh;
  } catch (i2) {
    throw Re(r), i2 && i2.status !== 401 ? i2 : new B("Unauthorized", "Login before querying the Customer Account API.");
  }
}
function Io() {
  let e = Ha();
  return bo(e);
}
async function Eo(e) {
  let t = await crypto.subtle.digest({ name: "SHA-256" }, new TextEncoder().encode(e)), r = qa(t);
  return bo(r);
}
function Ha() {
  let e = new Uint8Array(32);
  return crypto.getRandomValues(e), String.fromCharCode.apply(null, Array.from(e));
}
function bo(e) {
  return btoa(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function qa(e) {
  let t = new Uint8Array(e), r = Array.from(t);
  return String.fromCharCode(...r);
}
function wo() {
  let e = Date.now().toString(), t = Math.random().toString(36).substring(2);
  return e + t;
}
async function Do(e, t, r, o, n) {
  let a2 = t;
  if (!e) throw new B("Unauthorized", "oAuth access token was not provided during token exchange.");
  let s2 = new URLSearchParams();
  s2.append("grant_type", "urn:ietf:params:oauth:grant-type:token-exchange"), s2.append("client_id", a2), s2.append("audience", vo), s2.append("subject_token", e), s2.append("subject_token_type", "urn:ietf:params:oauth:token-type:access_token"), s2.append("scopes", "https://api.customers.com/auth/customer.graphql");
  let i2 = { "content-type": "application/x-www-form-urlencoded", "User-Agent": Pe, Origin: o };
  (/* @__PURE__ */ new Date()).getTime();
  let u2 = r, d = await fetch(u2, { method: "POST", headers: i2, body: s2 });
  let y = await d.json();
  if (y.error) throw new B(y.error_description);
  return y.access_token;
}
function xo(e) {
  return $a(e).payload.nonce;
}
function $a(e) {
  let [t, r, o] = e.split("."), n = JSON.parse(atob(t)), a2 = JSON.parse(atob(r));
  return { header: n, payload: a2, signature: o };
}
function yt() {
  return Ba(Ga());
}
function Ga() {
  try {
    return crypto.getRandomValues(new Uint8Array(16));
  } catch {
    return new Uint8Array(16).map(() => Math.random() * 255 | 0);
  }
}
function Ba(e) {
  return Array.from(e, function(t) {
    return ("0" + (t & 255).toString(16)).slice(-2);
  }).join("");
}
function ft(e) {
  if (!e) return;
  let { pathname: t, search: r } = new URL(e), o = t + r, n = new URLSearchParams(r), a2 = n.get("return_to") || n.get("redirect");
  if (a2) {
    if (_o(e, a2)) return a2;
    console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${a2}`);
  }
}
function _o(e, t) {
  try {
    return new URL(e).origin === new URL(t, e).origin;
  } catch {
    return false;
  }
}
function dr({ requestUrl: e, defaultUrl: t, redirectUrl: r }) {
  let o = e, n = Oo(e, t), a2 = r ? Oo(e, r) : n;
  return _o(e, a2.toString()) ? a2.toString() : (console.warn(`Cross-domain redirects are not supported. Tried to redirect from ${o} to ${a2}. Default url ${n} is used instead.`), n.toString());
}
function Oo(e, t) {
  return Qa(t) ? new URL(t) : new URL(t, new URL(e).origin);
}
function Qa(e) {
  try {
    return new URL(e), true;
  } catch {
    return false;
  }
}
function Uo(e, t) {
  let r = `https://shopify.com/${t}`, o = `https://shopify.com/authentication/${t}`;
  return function(a2) {
    switch (a2) {
      case "CA_BASE_URL":
        return r;
      case "CA_BASE_AUTH_URL":
        return o;
      case "GRAPHQL":
        return `${r}/account/customer/api/${e}/graphql`;
      case "AUTH":
        return `${o}/oauth/authorize`;
      case "LOGIN_SCOPE":
        return t ? "openid email customer-account-api:full" : "openid email https://api.customers.com/auth/customer.graphql";
      case "TOKEN_EXCHANGE":
        return `${o}/oauth/token`;
      case "LOGOUT":
        return `${o}/logout`;
    }
  };
}
function Wa(e, t) {
  if (!e.url) return t;
  let { pathname: r } = new URL(e.url), o = r.replace(/\.data$/, "").replace(/\/_root$/, "/").replace(/(.+)\/$/, "$1"), n = t + `?${new URLSearchParams({ return_to: o }).toString()}`;
  return $e(n);
}
function lr({ session: e, customerAccountId: t, shopId: r, customerApiVersion: o = lt, request: n, waitUntil: a2, authUrl: s2, customAuthStatusHandler: i2, logErrors: c2 = true, loginPath: u2 = "/account/login", authorizePath: d = "/account/authorize", defaultRedirectPath: y = "/account", language: m, useCustomAuthDomain: C }) {
  if (o !== lt && console.warn(`[h2:warn:createCustomerAccountClient] You are using Customer Account API version ${o} when this version of Hydrogen was built for ${lt}.`), e || console.warn("[h2:warn:createCustomerAccountClient] session is required to use Customer Account API. Ensure the session object passed in exist."), !(n == null ? void 0 : n.url)) throw new Error("[h2:error:createCustomerAccountClient] The request object does not contain a URL.");
  let p = new URL(n.url), l2 = p.protocol === "http:" ? p.origin.replace("http", "https") : p.origin, S = dr({ requestUrl: l2, defaultUrl: d, redirectUrl: s2 }), f = (A) => void 0, v = i2 || (() => (f(p.hostname), Wa(n, u2))), h = Uo(o, r), T = ja(h, t), g2 = h("GRAPHQL"), R = {};
  async function P({ query: A, type: E, variables: k = {} }) {
    let L = await W();
    if (!L) throw v();
    (/* @__PURE__ */ new Date()).getTime();
    let q = await fetch(g2, { method: "POST", headers: { "Content-Type": "application/json", "User-Agent": Pe, Origin: l2, Authorization: L }, body: JSON.stringify({ query: A, variables: k }) });
    let j = await q.text(), z = { url: g2, response: q, type: E, query: A, queryVariables: k, errors: void 0, client: "customer" };
    if (!q.ok) {
      if (q.status === 401) throw Re(e), v();
      let N;
      try {
        N = te(j);
      } catch {
        N = [{ message: j }];
      }
      Fe({ ...z, errors: N });
    }
    try {
      let N = te(j), { errors: $ } = N, Ie = $ == null ? void 0 : $.map(({ message: M, ...X }) => new ye(M, { ...X, clientOperation: `customerAccount.${z.type}`, requestId: q.headers.get("x-request-id"), queryVariables: k, query: A }));
      return { ...N, ...$ && { errors: Ie } };
    } catch {
      Fe({ ...z, errors: [{ message: j }] });
    }
  }
  async function U() {
    if (!r) return false;
    let A = e.get(F), E = A == null ? void 0 : A.accessToken, k = A == null ? void 0 : A.expiresAt;
    if (!E || !k) return false;
    let L = J == null ? void 0 : J();
    try {
      await Ro({ locks: R, expiresAt: k, session: e, customerAccountId: t, customerAccountTokenExchangeUrl: h("TOKEN_EXCHANGE"), httpsOrigin: l2, debugInfo: { waitUntil: a2, stackInfo: L, ...ce(n) } });
    } catch {
      return false;
    }
    return true;
  }
  async function V() {
    if (!await U()) throw v();
  }
  async function W() {
    var _a2;
    if (await U()) return (_a2 = e.get(F)) == null ? void 0 : _a2.accessToken;
  }
  async function gt(A, E) {
    return f(p.hostname), T(), A = Te(A), ut(A, "customer.mutate"), he(P({ query: A, type: "mutation", ...E }), { logErrors: c2 });
  }
  async function ht(A, E) {
    return f(p.hostname), T(), A = Te(A), ct(A, "customer.query"), he(P({ query: A, type: "query", ...E }), { logErrors: c2 });
  }
  function Qe(A) {
    e.set(ve, { ...e.get(ve), ...A });
  }
  async function K() {
    let A = await W();
    if (A) return { ...e.get(ve), customerAccessToken: A };
  }
  return { i18n: { language: m ?? "EN" }, login: async (A) => {
    f(p.hostname), T();
    let E = new URL(h("AUTH")), k = wo(), L = yt();
    E.searchParams.set("client_id", t), E.searchParams.set("scope", "openid email"), E.searchParams.append("response_type", "code"), E.searchParams.append("redirect_uri", S), E.searchParams.set("scope", h("LOGIN_SCOPE")), E.searchParams.append("state", k), E.searchParams.append("nonce", L);
    let Q = Ka({ contextLanguage: m ?? null, localeOverride: (A == null ? void 0 : A.locale) ?? null, uiLocalesOverride: (A == null ? void 0 : A.uiLocales) ?? null });
    Q != null && E.searchParams.append("locale", Q), (A == null ? void 0 : A.countryCode) && E.searchParams.append("region_country", A.countryCode), (A == null ? void 0 : A.acrValues) && E.searchParams.append("acr_values", A.acrValues), (A == null ? void 0 : A.loginHint) && (E.searchParams.append("login_hint", A.loginHint), (A == null ? void 0 : A.loginHintMode) && E.searchParams.append("login_hint_mode", A.loginHintMode));
    let ae = Io(), q = await Eo(ae);
    return e.set(F, { ...e.get(F), codeVerifier: ae, state: k, nonce: L, redirectPath: ft(n.url) || Y(n, "Referer") || y }), E.searchParams.append("code_challenge", q), E.searchParams.append("code_challenge_method", "S256"), $e(E.toString());
  }, logout: async (A) => {
    var _a2;
    f(p.hostname), T();
    let E = (_a2 = e.get(F)) == null ? void 0 : _a2.idToken, k = dr({ requestUrl: l2, defaultUrl: l2, redirectUrl: A == null ? void 0 : A.postLogoutRedirectUri }), L = E ? new URL(`${h("LOGOUT")}?${new URLSearchParams([["id_token_hint", E], ["post_logout_redirect_uri", k]]).toString()}`).toString() : k;
    Re(e);
    let Q = (A == null ? void 0 : A.headers) instanceof Headers ? A == null ? void 0 : A.headers : new Headers(A == null ? void 0 : A.headers);
    return (A == null ? void 0 : A.keepSession) || (e.destroy ? Q.set("Set-Cookie", await e.destroy()) : console.warn("[h2:warn:customerAccount] session.destroy is not available on your session implementation. All session data might not be cleared on logout."), e.isPending = false), $e(L, { headers: Q });
  }, isLoggedIn: U, handleAuthStatus: V, getAccessToken: W, getApiUrl: () => g2, mutate: gt, query: ht, authorize: async () => {
    var _a2, _b, _c, _d;
    f(p.hostname), T();
    let A = p.searchParams.get("code"), E = p.searchParams.get("state");
    if (!A || !E) throw Re(e), new B("Unauthorized", "No code or state parameter found in the redirect URL.");
    if (((_a2 = e.get(F)) == null ? void 0 : _a2.state) !== E) throw Re(e), new B("Unauthorized", "The session state does not match the state parameter. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");
    let k = t, L = new URLSearchParams();
    L.append("grant_type", "authorization_code"), L.append("client_id", k), L.append("redirect_uri", S), L.append("code", A);
    let Q = (_b = e.get(F)) == null ? void 0 : _b.codeVerifier;
    if (!Q) throw new B("Unauthorized", "No code verifier found in the session. Make sure that the session is configured correctly and passed to `createCustomerAccountClient`.");
    L.append("code_verifier", Q);
    let ae = { "content-type": "application/x-www-form-urlencoded", "User-Agent": Pe, Origin: l2 };
    (/* @__PURE__ */ new Date()).getTime();
    let z = h("TOKEN_EXCHANGE"), N = await fetch(z, { method: "POST", headers: ae, body: L });
    if (!N.ok) throw new Response(await N.text(), { status: N.status, headers: { "Content-Type": "text/html; charset=utf-8" } });
    let { access_token: $, expires_in: Ie, id_token: M, refresh_token: X } = await N.json(), At = (_c = e.get(F)) == null ? void 0 : _c.nonce, Pr = await xo(M);
    if (At !== Pr) throw new B("Unauthorized", `Returned nonce does not match: ${At} !== ${Pr}`);
    let vr = $;
    r || (vr = await Do($, t, h("TOKEN_EXCHANGE"), l2, { ...ce(n) }));
    let Zo = (_d = e.get(F)) == null ? void 0 : _d.redirectPath;
    return e.set(F, { accessToken: vr, expiresAt: new Date((/* @__PURE__ */ new Date()).getTime() + (Ie - 120) * 1e3).getTime() + "", refreshToken: X, idToken: M }), $e(Zo || y);
  }, setBuyer: Qe, getBuyer: K, UNSTABLE_setBuyer: (A) => {
    ee("[h2:warn:customerAccount] `customerAccount.UNSTABLE_setBuyer` is deprecated. Please use `customerAccount.setBuyer`."), Qe(A);
  }, UNSTABLE_getBuyer: () => (ee("[h2:warn:customerAccount] `customerAccount.UNSTABLE_getBuyer` is deprecated. Please use `customerAccount.getBuyer`."), K()) };
}
function ja(e, t) {
  return function() {
    try {
      if (!t) throw Error();
      new URL(e("CA_BASE_URL")), new URL(e("CA_BASE_AUTH_URL"));
    } catch {
      console.error(new Error("[h2:error:customerAccount] You do not have the valid credential to use Customer Account API.\nRun `h2 env pull` to link your store credentials."));
      let o = "Internal Server Error";
      throw new Response(o, { status: 500 });
    }
  };
}
function Ka(e) {
  return e.localeOverride != null ? pr(e.localeOverride) : e.uiLocalesOverride != null ? pr(e.uiLocalesOverride) : e.contextLanguage != null ? pr(e.contextLanguage) : null;
}
function pr(e) {
  let r = e.toLowerCase().replaceAll("_", "-").split("-"), o = r[0], n = r[1];
  return n ? `${o}-${n.toUpperCase()}` : o;
}
function Ja(e, t) {
  let { env: r, request: o, cache: n, waitUntil: a2, i18n: s2, session: i2, logErrors: c2, storefront: u2 = {}, customerAccount: d, cart: y = {}, buyerIdentity: m } = e;
  i2 || console.warn("[h2:warn:createHydrogenContext] A session object is required to create hydrogen context."), (d == null ? void 0 : d.unstableB2b) && ee("[h2:warn:createHydrogenContext] `customerAccount.unstableB2b` is now stable. Please remove the `unstableB2b` option.");
  let { storefront: C } = Co({ cache: n, waitUntil: a2, i18n: s2, logErrors: c2, storefrontHeaders: u2.headers || ro(o), storefrontApiVersion: u2.apiVersion, storefrontId: r.PUBLIC_STOREFRONT_ID, storeDomain: r.PUBLIC_STORE_DOMAIN, privateStorefrontToken: r.PRIVATE_STOREFRONT_API_TOKEN, publicStorefrontToken: r.PUBLIC_STOREFRONT_API_TOKEN }), p = lr({ session: i2, request: o, waitUntil: a2, logErrors: c2, customerApiVersion: d == null ? void 0 : d.apiVersion, authUrl: d == null ? void 0 : d.authUrl, customAuthStatusHandler: d == null ? void 0 : d.customAuthStatusHandler, useCustomAuthDomain: d == null ? void 0 : d.useCustomAuthDomain, language: s2 == null ? void 0 : s2.language, customerAccountId: r.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID, shopId: r.SHOP_ID }), l2 = nr({ getCartId: y.getId || Ht(o.headers), setCartId: y.setId || qt(), cartQueryFragment: y.queryFragment, cartMutateFragment: y.mutateFragment, ...y.customMethods && { customMethods: y.customMethods }, buyerIdentity: m, storefront: C, customerAccount: p }), S = new RouterContextProvider();
  S.set(He, C), S.set(ar, l2), S.set(sr, p), S.set(ir, r), S.set(cr, i2), a2 && S.set(ur, a2);
  let f = { storefront: C, cart: l2, customerAccount: p, env: r, session: i2, waitUntil: a2, ...t || {} };
  return new Proxy(S, { get(h, T, g2) {
    if (T in h) {
      let R = h[T];
      return typeof R == "function" ? R.bind(h) : R;
    }
    return T in f ? f[T] : Reflect.get(h, T, g2);
  }, has(h, T) {
    return T in h || T in f;
  }, ownKeys(h) {
    return [...Reflect.ownKeys(h), ...Object.keys(f)];
  }, getOwnPropertyDescriptor(h, T) {
    if (T in h) return Reflect.getOwnPropertyDescriptor(h, T);
    if (T in f) return { enumerable: true, configurable: true, writable: false, value: f[T] };
  } });
}
function Xa({ build: e, mode: t, poweredByHeader: r = true, getLoadContext: o, collectTrackingInformation: n = true }) {
  let a2 = createRequestHandler(e, t), s2 = r ? (i2) => i2.headers.append("powered-by", "Shopify, Hydrogen") : void 0;
  return async (i2) => {
    var _a2, _b;
    let c2 = i2.method;
    if ((c2 === "GET" || c2 === "HEAD") && i2.body) return new Response(`${c2} requests cannot have a body`, { status: 400 });
    let u2 = new URL(i2.url);
    if (u2.pathname.includes("//")) return new Response(null, { status: 301, headers: { location: u2.pathname.replace(/\/+/g, "/") } });
    let d = await (o == null ? void 0 : o(i2)), y = (d == null ? void 0 : d.storefront) || ((_a2 = d == null ? void 0 : d.get) == null ? void 0 : _a2.call(d, He));
    if (!y) throw new Error("[h2:createRequestHandler] Storefront instance is required in the load context. Make sure to use createHydrogenContext() or provide a storefront instance via getLoadContext.");
    if (y.isStorefrontApiUrl(i2)) {
      let p = await y.forward(i2);
      return s2 == null ? void 0 : s2(p), p;
    }
    if (y.isMcpUrl(i2)) {
      let p = await y.forwardMcp(i2);
      return s2 == null ? void 0 : s2(p), p;
    }
    let m = await a2(i2, d);
    n && y.setCollectedSubrequestHeaders(m);
    let C = i2.headers.get("sec-fetch-dest");
    return (C && C === "document" || ((_b = i2.headers.get("accept")) == null ? void 0 : _b.includes("text/html"))) && we(m, { [je]: "1" }), s2 == null ? void 0 : s2(m), m;
  };
}
var Lo = reactExports.createContext(void 0), ko = Lo.Provider, yr = () => reactExports.useContext(Lo);
function os(e) {
  let t = yt(), r = ns(t, e);
  return { nonce: t, header: r, NonceProvider: ({ children: n }) => reactExports.createElement(ko, { value: t }, n) };
}
function ns(e, t) {
  let { shop: r, ...o } = t ?? {}, n = `'nonce-${e}'`, a2 = ["'self'", "'unsafe-inline'", "https://cdn.shopify.com"], s2 = ["'self'", "https://cdn.shopify.com/", "https://monorail-edge.shopifysvc.com"];
  r && r.checkoutDomain && s2.push(`https://${r.checkoutDomain}`), r && r.storeDomain && s2.push(`https://${r.storeDomain}`);
  let c2 = { baseUri: ["'self'"], defaultSrc: ["'self'", n, "https://cdn.shopify.com", "https://shopify.com"], frameAncestors: ["'none'"], styleSrc: a2, connectSrc: s2 }, u2 = Object.assign({}, c2, o);
  for (let d in c2) {
    let y = o[d];
    d && y && (u2[d] = as(y, c2[d]));
  }
  return u2.scriptSrc instanceof Array ? u2.scriptSrc = [...u2.scriptSrc.filter((d) => !d.startsWith("'nonce")), n] : u2.defaultSrc instanceof Array && (u2.defaultSrc = [...u2.defaultSrc.filter((d) => !d.startsWith("'nonce")), n]), buildContentSecurityPolicy({ directives: u2 });
}
function as(e, t) {
  let r = typeof t == "string" ? [t] : t, o = Array.isArray(e) ? e : [String(e)];
  return Array.isArray(r) ? r.every((a2) => a2 === "'none'") ? o : [...o, ...r] : r;
}
reactExports.forwardRef((e, t) => {
  let { waitForHydration: r, src: o, ...n } = e, a2 = yr();
  return r ? jsxRuntimeExports.jsx(us, { src: o, options: n }) : jsxRuntimeExports.jsx("script", { suppressHydrationWarning: true, ...n, src: o, nonce: a2, ref: t });
});
function us({ src: e, options: t }) {
  if (!e) throw new Error("`waitForHydration` with the Script component requires a `src` prop");
  return useLoadScript(e, { attributes: t }), null;
}
function hs({ connection: e, children: t = () => (console.warn("<Pagination> requires children to work properly"), null), namespace: r = "" }) {
  let [o, n] = reactExports.useState(false), a2 = useNavigation(), s2 = useLocation();
  useNavigate();
  reactExports.useEffect(() => {
    a2.state === "idle" && n(false);
  }, [a2.state]);
  let { endCursor: c2, hasNextPage: u2, hasPreviousPage: d, nextPageUrl: y, nodes: m, previousPageUrl: C, startCursor: p } = As(e, r), l2 = reactExports.useMemo(() => {
    var _a2;
    return { ...s2.state, pagination: { ...((_a2 = s2.state) == null ? void 0 : _a2.pagination) || {}, [r]: { pageInfo: { endCursor: c2, hasPreviousPage: d, hasNextPage: u2, startCursor: p }, nodes: m } } };
  }, [c2, u2, d, p, m, r, s2.state]), S = reactExports.useMemo(() => reactExports.forwardRef(function(h, T) {
    return u2 ? reactExports.createElement(Link, { preventScrollReset: true, ...h, to: y, state: l2, replace: true, ref: T, onClick: () => n(true) }) : null;
  }), [u2, y, l2]), f = reactExports.useMemo(() => reactExports.forwardRef(function(h, T) {
    return d ? reactExports.createElement(Link, { preventScrollReset: true, ...h, to: C, state: l2, replace: true, ref: T, onClick: () => n(true) }) : null;
  }), [d, C, l2]);
  return t({ state: l2, hasNextPage: u2, hasPreviousPage: d, isLoading: o, nextPageUrl: y, nodes: m, previousPageUrl: C, NextLink: S, PreviousLink: f });
}
function mt(e, t) {
  let r = new URLSearchParams(e);
  return Object.keys((t == null ? void 0 : t.pagination) || {}).forEach((n) => {
    let a2 = n === "" ? "" : `${n}_`, s2 = `${a2}cursor`, i2 = `${a2}direction`;
    r.delete(s2), r.delete(i2);
  }), r.toString();
}
function Ge(e) {
  throw new Error(`The Pagination component requires ${"`" + e + "`"} to be a part of your query. See the guide on how to setup your query to include ${"`" + e + "`"}: https://shopify.dev/docs/custom-storefronts/hydrogen/data-fetching/pagination#setup-the-paginated-query`);
}
function As(e, t = "") {
  e.pageInfo || Ge("pageInfo"), typeof e.pageInfo.startCursor > "u" && Ge("pageInfo.startCursor"), typeof e.pageInfo.endCursor > "u" && Ge("pageInfo.endCursor"), typeof e.pageInfo.hasNextPage > "u" && Ge("pageInfo.hasNextPage"), typeof e.pageInfo.hasPreviousPage > "u" && Ge("pageInfo.hasPreviousPage");
  let r = useNavigation(), o = useNavigate(), { state: n, search: a2, pathname: s2 } = useLocation(), i2 = t ? `${t}_cursor` : "cursor", c2 = t ? `${t}_direction` : "direction", y = new URLSearchParams(a2).get(c2) === "previous", m = reactExports.useMemo(() => {
    var _a2, _b, _c;
    return !((_a2 = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : _a2.__hydrogenHydrated) || !((_c = (_b = n == null ? void 0 : n.pagination) == null ? void 0 : _b[t]) == null ? void 0 : _c.nodes) ? flattenConnection(e) : y ? [...flattenConnection(e), ...n.pagination[t].nodes || []] : [...n.pagination[t].nodes || [], ...flattenConnection(e)];
  }, [n, e, t]), C = reactExports.useMemo(() => {
    var _a2, _b, _c, _d, _e2;
    let f = (_a2 = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : _a2.__hydrogenHydrated, v = (_c = (_b = n == null ? void 0 : n.pagination) == null ? void 0 : _b[t]) == null ? void 0 : _c.pageInfo, h = !f || (v == null ? void 0 : v.startCursor) === void 0 ? e.pageInfo.startCursor : v.startCursor, T = !f || (v == null ? void 0 : v.endCursor) === void 0 ? e.pageInfo.endCursor : v.endCursor, g2 = !f || (v == null ? void 0 : v.hasPreviousPage) === void 0 ? e.pageInfo.hasPreviousPage : v.hasPreviousPage, R = !f || (v == null ? void 0 : v.hasNextPage) === void 0 ? e.pageInfo.hasNextPage : v.hasNextPage;
    return ((_e2 = (_d = n == null ? void 0 : n.pagination) == null ? void 0 : _d[t]) == null ? void 0 : _e2.nodes) && (y ? (h = e.pageInfo.startCursor, g2 = e.pageInfo.hasPreviousPage) : (T = e.pageInfo.endCursor, R = e.pageInfo.hasNextPage)), { startCursor: h, endCursor: T, hasPreviousPage: g2, hasNextPage: R };
  }, [y, n, t, e.pageInfo.hasNextPage, e.pageInfo.hasPreviousPage, e.pageInfo.startCursor, e.pageInfo.endCursor]), p = reactExports.useRef({ params: mt(a2, n), pathname: s2 });
  reactExports.useEffect(() => {
    window.__hydrogenHydrated = true;
  }, []), reactExports.useEffect(() => {
    let f = mt(a2, n), v = p.current.params;
    (s2 !== p.current.pathname || f !== v) && !(r.state === "idle" && !r.location) && (p.current = { pathname: s2, params: mt(a2, n) }, o(`${s2}?${mt(a2, n)}`, { replace: true, preventScrollReset: true, state: { nodes: void 0, pageInfo: void 0 } }));
  }, [s2, a2, n]);
  let l2 = reactExports.useMemo(() => {
    let f = new URLSearchParams(a2);
    return f.set(c2, "previous"), C.startCursor && f.set(i2, C.startCursor), `?${f.toString()}`;
  }, [a2, C.startCursor]), S = reactExports.useMemo(() => {
    let f = new URLSearchParams(a2);
    return f.set(c2, "next"), C.endCursor && f.set(i2, C.endCursor), `?${f.toString()}`;
  }, [a2, C.endCursor]);
  return { ...C, previousPageUrl: l2, nextPageUrl: S, nodes: m };
}
function Ts(e, t = { pageBy: 20 }) {
  if (typeof (e == null ? void 0 : e.url) > "u") throw new Error("getPaginationVariables must be called with the Request object passed to your loader function");
  let { pageBy: r, namespace: o = "" } = t, n = new URLSearchParams(new URL(e.url).search), a2 = o ? `${o}_cursor` : "cursor", s2 = o ? `${o}_direction` : "direction", i2 = n.get(a2) ?? void 0;
  return (n.get(s2) === "previous" ? "previous" : "next") === "previous" ? { last: r, startCursor: i2 ?? null } : { first: r, endCursor: i2 ?? null };
}
function xs({ handle: e, options: t = [], variants: r = [], productPath: o = "products", waitForNavigation: n = false, selectedVariant: a2, children: s2 }) {
  var _a2, _b;
  let i2 = t;
  ((_a2 = i2[0]) == null ? void 0 : _a2.values) && (ee("[h2:warn:VariantSelector] product.options.values is deprecated. Use product.options.optionValues instead."), i2[0] && !i2[0].optionValues && (i2 = t.map((p) => {
    var _a3;
    return { ...p, optionValues: ((_a3 = p.values) == null ? void 0 : _a3.map((l2) => ({ name: l2 }))) || [] };
  })));
  let c2 = r instanceof Array ? r : flattenConnection(r), { searchParams: u2, path: d, alreadyOnProductPage: y } = _s(e, o, n), m = i2.filter((p) => {
    var _a3;
    return ((_a3 = p == null ? void 0 : p.optionValues) == null ? void 0 : _a3.length) === 1;
  }), C = a2 ? (_b = a2 == null ? void 0 : a2.selectedOptions) == null ? void 0 : _b.reduce((p, l2) => (p[l2.name] = l2.value, p), {}) : {};
  return reactExports.createElement(reactExports.Fragment, null, ...reactExports.useMemo(() => i2.map((p) => {
    let l2, S = [];
    for (let f of p.optionValues) {
      let v = new URLSearchParams(y ? u2 : void 0);
      v.set(p.name, f.name), m.forEach((P) => {
        P.optionValues[0].name && v.set(P.name, P.optionValues[0].name);
      });
      let h = c2.find((P) => {
        var _a3;
        return (_a3 = P == null ? void 0 : P.selectedOptions) == null ? void 0 : _a3.every((U) => (v.get(U == null ? void 0 : U.name) || (C == null ? void 0 : C[U == null ? void 0 : U.name])) === (U == null ? void 0 : U.value));
      }), T = u2.get(p.name);
      !T && a2 && (T = (C == null ? void 0 : C[p.name]) || null);
      let g2 = T ? T === f.name : false;
      g2 && (l2 = f.name);
      let R = "?" + v.toString();
      S.push({ value: f.name, optionValue: f, isAvailable: h ? h.availableForSale : true, to: d + R, search: R, isActive: g2, variant: h });
    }
    return s2({ option: { name: p.name, value: l2, values: S } });
  }), [i2, c2, s2]));
}
var Os = (e) => {
  if (typeof (e == null ? void 0 : e.url) > "u") throw new TypeError(`Expected a Request instance, got ${typeof e}`);
  let t = new URL(e.url).searchParams, r = [];
  return t.forEach((o, n) => {
    r.push({ name: n, value: o });
  }), r;
};
function _s(e, t, r) {
  let { pathname: o, search: n } = useLocation(), a2 = useNavigation();
  return reactExports.useMemo(() => {
    let s2 = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(o), i2 = s2 && s2.length > 0;
    t = t.startsWith("/") ? t.substring(1) : t;
    let c2 = i2 ? `${s2[0]}${t}/${e}` : `/${t}/${e}`;
    return { searchParams: new URLSearchParams(r || a2.state !== "loading" ? n : a2.location.search), alreadyOnProductPage: c2 === o, path: c2 };
  }, [o, n, r, e, t, a2]);
}
var Wo = ".data", Cr = "_root.data", jo = "_.data";
async function Ms(e) {
  var _a2, _b, _c;
  let { storefront: t, request: r, noAdminRedirect: o, matchQueryParams: n, response: a2 = new Response("Not Found", { status: 404 }) } = e, s2 = new URL(r.url), { searchParams: i2 } = s2, { pathname: c2, isSoftNavigation: u2 } = Fs(s2.pathname);
  i2.delete("redirect"), i2.delete("return_to"), i2.delete("_routes");
  let d = (n ? `${c2}${s2.search}` : c2).toLowerCase();
  if (c2 === "/admin" && !o) return hr(`${t.getShopifyDomain()}/admin`, u2, i2, n);
  try {
    let { urlRedirects: y } = await t.query(Hs, { variables: { query: "path:" + d.replace(/\/+$/, "") } }), m = (_c = (_b = (_a2 = y == null ? void 0 : y.edges) == null ? void 0 : _a2[0]) == null ? void 0 : _b.node) == null ? void 0 : _c.target;
    if (m) return hr(m, u2, i2, n);
    let C = ft(r.url);
    if (C) return hr(C, u2, i2, n);
  } catch (y) {
    console.error(`Failed to fetch redirects from Storefront API for route ${d}`, y);
  }
  return a2;
}
var gr = "https://example.com";
function hr(e, t, r, o) {
  let n = new URL(e, gr);
  if (!o) for (let [a2, s2] of r) n.searchParams.append(a2, s2);
  return t ? new Response(null, { status: 204, headers: { "X-Remix-Redirect": n.toString().replace(gr, ""), "X-Remix-Status": "301" } }) : new Response(null, { status: 301, headers: { location: n.toString().replace(gr, "") } });
}
function Fs(e) {
  return e.endsWith(Wo) ? e.endsWith("/" + jo) ? { pathname: e.slice(0, -jo.length), isSoftNavigation: true } : e === "/" + Cr || e.endsWith("/" + Cr) ? { pathname: e.slice(0, -Cr.length) || "/", isSoftNavigation: true } : { pathname: e.slice(0, -Wo.length), isSoftNavigation: true } : { pathname: e, isSoftNavigation: false };
}
var Hs = `#graphql
  query redirects($query: String) {
    urlRedirects(first: 1, query: $query) {
      edges {
        node {
          target
        }
      }
    }
  }
`;
reactExports.lazy(() => Promise.resolve().then(() => logSeoTagsTY72EQWZ));
var ei = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`, ti = `
</sitemapindex>`, zo = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`, Xo = "</urlset>";
async function ri(e) {
  let { storefront: t, request: r, types: o = ["products", "pages", "collections", "metaObjects", "articles", "blogs"], customChildSitemaps: n = [] } = e;
  if (!r || !r.url) throw new Error("A request object is required to generate a sitemap index");
  if (!t || !t.query) throw new Error("A storefront client is required to generate a sitemap index");
  let a2 = await t.query(yi);
  if (!a2) throw console.warn("[h2:sitemap:warning] Sitemap index is available in API version 2024-10 and later"), new Response("Sitemap index not found.", { status: 404 });
  let s2 = new URL(r.url).origin, i2 = ei + o.map((c2) => {
    if (!a2[c2]) throw new Error(`[h2:sitemap:error] No data found for type ${c2}. Check types passed to \`getSitemapIndex\``);
    return ni(c2, a2[c2].pagesCount.count, s2);
  }).join(`
`) + n.map((c2) => "  <sitemap><loc>" + (s2 + (c2.startsWith("/") ? c2 : "/" + c2)) + "</loc></sitemap>").join(`
`) + ti;
  return new Response(i2, { headers: { "Content-Type": "application/xml", "Cache-Control": `max-age=${3600 * 24}` } });
}
async function oi(e) {
  var _a2, _b, _c;
  let { storefront: t, request: r, params: o, getLink: n, locales: a2 = [], getChangeFreq: s2, noItemsFallback: i2 = "/" } = e;
  if (!o) throw new Error("[h2:sitemap:error] Remix params object is required to generate a sitemap");
  if (!r || !r.url) throw new Error("A request object is required to generate a sitemap");
  if (!t || !t.query) throw new Error("A storefront client is required to generate a index");
  if (!n) throw new Error("A `getLink` function to generate each resource is required to build a sitemap");
  if (!o.type || !o.page) throw new Response("No data found", { status: 404 });
  let c2 = o.type, u2 = fi[c2];
  if (!u2) throw new Response("Not found", { status: 404 });
  let d = await t.query(u2, { variables: { page: parseInt(o.page, 10) } });
  if (!d) throw console.warn("[h2:sitemap:warning] Sitemap is available in API version 2024-10 and later"), new Response("Sitemap not found.", { status: 404 });
  let y = new URL(r.url).origin, m = "";
  return ((_c = (_b = (_a2 = d == null ? void 0 : d.sitemap) == null ? void 0 : _a2.resources) == null ? void 0 : _b.items) == null ? void 0 : _c.length) ? m = zo + d.sitemap.resources.items.map((C) => ai({ getChangeFreq: s2, url: n({ type: C.type ?? c2, baseUrl: y, handle: C.handle }), type: c2, getLink: n, updatedAt: C.updatedAt, handle: C.handle, metaobjectType: C.type, locales: a2, baseUrl: y })).join(`
`) + Xo : m = zo + `
  <url><loc>${y + i2}</loc></url>
` + Xo, new Response(m, { headers: { "Content-Type": "application/xml", "Cache-Control": `max-age=${3600 * 24}` } });
}
function ni(e, t, r) {
  let o = "";
  for (let n = 1; n <= t; n++) o += `  <sitemap><loc>${r}/sitemap/${e}/${n}.xml</loc></sitemap>
`;
  return o;
}
function ai({ url: e, updatedAt: t, locales: r, type: o, getLink: n, baseUrl: a2, handle: s2, getChangeFreq: i2, metaobjectType: c2 }) {
  return `<url>
  <loc>${e}</loc>
  <lastmod>${t}</lastmod>
  <changefreq>${i2 ? i2({ type: c2 ?? o, handle: s2 }) : "weekly"}</changefreq>
${r.map((u2) => si(n({ type: c2 ?? o, baseUrl: a2, handle: s2, locale: u2 }), u2)).join(`
`)}
</url>
  `.trim();
}
function si(e, t) {
  return `  <xhtml:link rel="alternate" hreflang="${t}" href="${e}" />`;
}
var ii = `#graphql
    query SitemapProducts($page: Int!) {
      sitemap(type: PRODUCT) {
        resources(page: $page) {
          items {
            handle
            updatedAt
          }
        }
      }
    }
`, ci = `#graphql
    query SitemapCollections($page: Int!) {
      sitemap(type: COLLECTION) {
        resources(page: $page) {
          items {
            handle
            updatedAt
          }
        }
      }
    }
`, ui = `#graphql
    query SitemapArticles($page: Int!) {
      sitemap(type: ARTICLE) {
        resources(page: $page) {
          items {
            handle
            updatedAt
          }
        }
      }
    }
`, di = `#graphql
    query SitemapPages($page: Int!) {
      sitemap(type: PAGE) {
        resources(page: $page) {
          items {
            handle
            updatedAt
          }
        }
      }
    }
`, pi = `#graphql
    query SitemapBlogs($page: Int!) {
      sitemap(type: BLOG) {
        resources(page: $page) {
          items {
            handle
            updatedAt
          }
        }
      }
    }
`, li = `#graphql
    query SitemapMetaobjects($page: Int!) {
      sitemap(type: METAOBJECT) {
        resources(page: $page) {
          items {
            handle
            updatedAt
            ... on SitemapResourceMetaobject {
              type
            }
          }
        }
      }
    }
`, yi = `#graphql
query SitemapIndex {
  products: sitemap(type: PRODUCT) {
    pagesCount {
      count
    }
  }
  collections: sitemap(type: COLLECTION) {
    pagesCount {
      count
    }
  }
  articles: sitemap(type: ARTICLE) {
    pagesCount {
      count
    }
  }
  pages: sitemap(type: PAGE) {
    pagesCount {
      count
    }
  }
  blogs: sitemap(type: BLOG) {
    pagesCount {
      count
    }
  }
  metaObjects: sitemap(type: METAOBJECT) {
    pagesCount {
      count
    }
  }
}
`, fi = { products: ii, articles: ui, collections: ci, pages: di, blogs: pi, metaObjects: li };
//! @see https://shopify.dev/docs/api/storefront/latest/queries/cart
async function handleRequest(request, responseStatusCode, responseHeaders, reactRouterContext, context) {
  const devTunnel = context.env.DEV_TUNNEL_DOMAIN;
  const { nonce, header, NonceProvider } = os({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN
    },
    ...devTunnel ? { connectSrc: [`wss://${devTunnel}:*`] } : {}
  });
  const body = await server_browserExports.renderToReadableStream(
    /* @__PURE__ */ jsxRuntimeExports.jsx(NonceProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServerRouter,
      {
        context: reactRouterContext,
        url: request.url,
        nonce
      }
    ) }),
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (isbot(request.headers.get("user-agent"))) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set("Content-Security-Policy", header);
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const favicon = "/assets/favicon-DZkC1E9c.svg";
const CART_QUERY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    currencyCode
    amount
  }
  fragment CartLine on CartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        ...Money
      }
      amountPerQuantity {
        ...Money
      }
      compareAtAmountPerQuantity {
        ...Money
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        availableForSale
        compareAtPrice {
          ...Money
        }
        price {
          ...Money
        }
        requiresShipping
        title
        image {
          id
          url
          altText
          width
          height

        }
        product {
          handle
          title
          id
          vendor
        }
        selectedOptions {
          name
          value
        }
      }
    }
    parentRelationship {
      parent {
        id
      }
    }
  }
  fragment CartLineComponent on ComponentizableCartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        ...Money
      }
      amountPerQuantity {
        ...Money
      }
      compareAtAmountPerQuantity {
        ...Money
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        availableForSale
        compareAtPrice {
          ...Money
        }
        price {
          ...Money
        }
        requiresShipping
        title
        image {
          id
          url
          altText
          width
          height
        }
        product {
          handle
          title
          id
          vendor
        }
        selectedOptions {
          name
          value
        }
      }
    }
    lineComponents {
      ...CartLine
    }
  }
  fragment CartApiQuery on Cart {
    updatedAt
    id
    appliedGiftCards {
      id
      lastCharacters
      amountUsed {
        ...Money
      }
    }
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      nodes {
        ...CartLine
        ...CartLineComponent
      }
    }
    cost {
      subtotalAmount {
        ...Money
      }
      totalAmount {
        ...Money
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
    deliveryGroups(first: 5) {
      nodes {
        id
        deliveryOptions {
          handle
          title
          code
          estimatedCost {
            amount
            currencyCode
          }
        }
        selectedDeliveryOption {
          handle
          title
          estimatedCost {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`;
const HEADER_QUERY = `#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $headerMenuHandle: String!
  ) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;
const FOOTER_QUERY = `#graphql
  query Footer(
    $footerMenuHandle: String!
  ) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;
const CUSTOMER_NAME_QUERY = `#graphql
  query CustomerName {
    customer {
      firstName
    }
  }
`;
const resetStyles = "/assets/reset-VbMojypE.css";
const appStyles = "/assets/app-BI8MWlcB.css";
function Aside({
  children,
  heading,
  type
}) {
  const { type: activeType, close } = useAside();
  const expanded = type === activeType;
  reactExports.useEffect(() => {
    const abortController = new AbortController();
    if (expanded) {
      document.addEventListener(
        "keydown",
        function handler(event) {
          if (event.key === "Escape") {
            close();
          }
        },
        { signal: abortController.signal }
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-modal": true,
      className: `overlay ${expanded ? "expanded" : ""}`,
      role: "dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-outside", onClick: close }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: heading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close reset", onClick: close, "aria-label": "Close", children: "×" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children })
        ] })
      ]
    }
  );
}
const AsideContext = reactExports.createContext(null);
Aside.Provider = function AsideProvider({ children }) {
  const [type, setType] = reactExports.useState("closed");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AsideContext.Provider,
    {
      value: {
        type,
        open: setType,
        close: () => setType("closed")
      },
      children
    }
  );
};
function useAside() {
  const aside = reactExports.useContext(AsideContext);
  if (!aside) {
    throw new Error("useAside must be used within an AsideProvider");
  }
  return aside;
}
function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
  footerBanner
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Await, { resolve: footerPromise, children: (footer) => {
    var _a2;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "footer", children: [
      footerBanner && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Await, { resolve: footerBanner, children: (bannerHtml) => bannerHtml ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "footer-banner bg-gray-900 text-white px-4 py-6 text-center",
          dangerouslySetInnerHTML: { __html: bannerHtml }
        }
      ) : null }) }),
      (footer == null ? void 0 : footer.menu) && ((_a2 = header.shop.primaryDomain) == null ? void 0 : _a2.url) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        FooterMenu,
        {
          menu: footer.menu,
          primaryDomainUrl: header.shop.primaryDomain.url,
          publicStoreDomain
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterUtilities, {})
    ] });
  } }) });
}
function FooterUtilities() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-utilities flex justify-center gap-4 px-4 py-3 text-xs text-gray-400 border-t border-gray-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/policies/privacy-policy", prefetch: "intent", children: "Privacy Policy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/policies/terms-of-service", prefetch: "intent", children: "Terms of Service" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/policies/refund-policy", prefetch: "intent", children: "Refund Policy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/policies/shipping-policy", prefetch: "intent", children: "Shipping Policy" })
  ] });
}
function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "footer-menu", role: "navigation", children: (menu || FALLBACK_FOOTER_MENU).items.map((item) => {
    if (!item.url) return null;
    const url = item.url.includes("myshopify.com") || item.url.includes(publicStoreDomain) || item.url.includes(primaryDomainUrl) ? new URL(item.url).pathname : item.url;
    const isExternal = !url.startsWith("/");
    return isExternal ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: url, rel: "noopener noreferrer", target: "_blank", children: item.title }, item.id) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      NavLink,
      {
        end: true,
        prefetch: "intent",
        style: activeLinkStyle$1,
        to: url,
        children: item.title
      },
      item.id
    );
  }) });
}
const FALLBACK_FOOTER_MENU = {
  items: [
    {
      id: "gid://shopify/MenuItem/461633060920",
      resourceId: "gid://shopify/ShopPolicy/23358046264",
      tags: [],
      title: "Privacy Policy",
      type: "SHOP_POLICY",
      url: "/policies/privacy-policy",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461633093688",
      resourceId: "gid://shopify/ShopPolicy/23358013496",
      tags: [],
      title: "Refund Policy",
      type: "SHOP_POLICY",
      url: "/policies/refund-policy",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461633126456",
      resourceId: "gid://shopify/ShopPolicy/23358111800",
      tags: [],
      title: "Shipping Policy",
      type: "SHOP_POLICY",
      url: "/policies/shipping-policy",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461633159224",
      resourceId: "gid://shopify/ShopPolicy/23358079032",
      tags: [],
      title: "Terms of Service",
      type: "SHOP_POLICY",
      url: "/policies/terms-of-service",
      items: []
    }
  ]
};
function activeLinkStyle$1({
  isActive,
  isPending
}) {
  return {
    fontWeight: isActive ? "bold" : void 0,
    color: isPending ? "grey" : "white"
  };
}
const LOCALES = [
  { country: "ZA", language: "EN", label: "South Africa (ZAR)", prefix: "" },
  { country: "NZ", language: "EN", label: "New Zealand (NZD)", prefix: "/en-nz" },
  { country: "AU", language: "EN", label: "Australia (AUD)", prefix: "/en-au" },
  { country: "US", language: "EN", label: "United States (USD)", prefix: "/en-us" }
];
function CountrySelector() {
  var _a2;
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const location2 = useLocation();
  const dropdownRef = reactExports.useRef(null);
  const fetcher = useFetcher();
  const pendingNavRef = reactExports.useRef(null);
  const currentPrefix = `/${((_a2 = location2.pathname.split("/")[1]) == null ? void 0 : _a2.toLowerCase()) ?? ""}`;
  const currentLocale = LOCALES.find((l2) => l2.prefix === currentPrefix) ?? LOCALES[0];
  reactExports.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  reactExports.useEffect(() => {
    if (fetcher.state === "idle" && pendingNavRef.current) {
      const path = pendingNavRef.current;
      pendingNavRef.current = null;
      window.location.href = path;
    }
  }, [fetcher.state]);
  function handleLocaleChange(locale) {
    setIsOpen(false);
    const pathWithoutPrefix = location2.pathname.replace(
      /^\/(en-nz|en-au|en-us|en-za)/,
      ""
    );
    const newPath = locale.prefix + (pathWithoutPrefix || "/");
    pendingNavRef.current = newPath;
    const formData = new FormData();
    formData.set(
      re.INPUT_NAME,
      JSON.stringify({
        action: re.ACTIONS.BuyerIdentityUpdate,
        inputs: { buyerIdentity: { countryCode: locale.country } }
      })
    );
    fetcher.submit(formData, { method: "POST", action: "/cart" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: dropdownRef, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "reset text-sm",
        onClick: () => setIsOpen(!isOpen),
        "aria-expanded": isOpen,
        "aria-label": "Select country",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              style: { display: "inline-block", verticalAlign: "middle", marginRight: "4px" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "10", r: "3" })
              ]
            }
          ),
          currentLocale.country
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dropdown-panel absolute top-full right-0 mt-1 z-50 min-w-[180px]", children: LOCALES.map((locale) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `block w-full text-left px-4 py-2 text-sm ${locale.country === currentLocale.country ? "font-bold" : ""}`,
        style: locale.country === currentLocale.country ? { background: "rgba(255, 255, 255, 0.15)" } : void 0,
        onClick: () => handleLocaleChange(locale),
        children: locale.label
      },
      locale.country
    )) })
  ] });
}
function Header({
  header,
  isLoggedIn,
  customerFirstName,
  cart,
  publicStoreDomain,
  isHomePage = false
}) {
  const { shop, menu } = header;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-hero", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "header site-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { prefetch: "intent", to: "/", end: true, className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/images/260601-logo_rev-02.1.svg",
          alt: shop.name,
          className: "h-auto",
          style: { width: "clamp(160px, 11.25vw, 300px)" }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HeaderMenu,
        {
          menu,
          viewport: "desktop",
          primaryDomainUrl: header.shop.primaryDomain.url,
          publicStoreDomain
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderCtas, { isLoggedIn, customerFirstName, cart })
    ] }),
    isHomePage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "header-tagline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "PROUDLY SERVING OUR CLIENTS FOR OVER 25 YEARS" }) })
  ] });
}
function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className, role: "navigation", children: [
    viewport === "mobile" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      NavLink,
      {
        end: true,
        onClick: close,
        prefetch: "intent",
        style: activeLinkStyle(),
        to: "/",
        children: "Home"
      }
    ),
    (menu || FALLBACK_HEADER_MENU).items.map((item) => {
      if (!item.url) return null;
      const url = item.url.includes("myshopify.com") || item.url.includes(publicStoreDomain) || item.url.includes(primaryDomainUrl) ? new URL(item.url).pathname : item.url;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        NavLink,
        {
          className: "header-menu-item",
          end: true,
          onClick: close,
          prefetch: "intent",
          style: activeLinkStyle(),
          to: url,
          children: item.title
        },
        item.id
      );
    })
  ] });
}
function AccountIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "7", r: "4" })
      ]
    }
  );
}
function HeaderCtas({
  isLoggedIn,
  customerFirstName,
  cart
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "header-ctas", role: "navigation", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderMenuMobileToggle, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CountrySelector, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      reactExports.Suspense,
      {
        fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { prefetch: "intent", to: "/account/login", "aria-label": "Sign in", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccountIcon, {}) }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Await, { resolve: isLoggedIn, children: (loggedIn) => loggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          NavLink,
          {
            prefetch: "intent",
            to: "/account",
            "aria-label": "Account",
            className: "header-account-link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AccountIcon, {}),
              customerFirstName && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Await, { resolve: customerFirstName, children: (name) => name ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "header-customer-name", children: name }) : null }) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { prefetch: "intent", to: "/account/login", "aria-label": "Sign in", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccountIcon, {}) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchToggle, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartToggle, { cart })
  ] });
}
function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: "header-menu-mobile-toggle reset",
      onClick: () => open("mobile"),
      "aria-label": "Menu",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
          ]
        }
      )
    }
  );
}
function SearchToggle() {
  const { open } = useAside();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "reset", onClick: () => open("search"), "aria-label": "Search", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
      ]
    }
  ) });
}
function CartBadge({ count }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = Z();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: "/cart",
      className: "cart-icon-wrapper",
      "aria-label": `Cart${count ? ` (${count} items)` : ""}`,
      onClick: (e) => {
        e.preventDefault();
        open("cart");
        publish("cart_viewed", {
          cart,
          prevCart,
          shop,
          url: window.location.href || ""
        });
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 10a4 4 0 0 1-8 0" })
            ]
          }
        ),
        count !== null && count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "cart-badge", children: count })
      ]
    }
  );
}
function CartToggle({ cart }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(CartBadge, { count: null }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Await, { resolve: cart, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartBanner, {}) }) });
}
function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = ka(originalCart);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartBadge, { count: (cart == null ? void 0 : cart.totalQuantity) ?? 0 });
}
const FALLBACK_HEADER_MENU = {
  items: [
    {
      id: "gid://shopify/MenuItem/461609500728",
      resourceId: null,
      tags: [],
      title: "Collections",
      type: "HTTP",
      url: "/collections",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461609533496",
      resourceId: null,
      tags: [],
      title: "Blog",
      type: "HTTP",
      url: "/blogs/journal",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461609566264",
      resourceId: null,
      tags: [],
      title: "Policies",
      type: "HTTP",
      url: "/policies",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461609599032",
      resourceId: "gid://shopify/Page/92591030328",
      tags: [],
      title: "About",
      type: "PAGE",
      url: "/pages/about",
      items: []
    }
  ]
};
function activeLinkStyle(viewport) {
  return ({
    isActive,
    isPending
  }) => ({
    fontWeight: isActive ? "bold" : void 0,
    color: isPending ? "rgba(255,255,255,0.6)" : "white"
  });
}
function useVariantUrl(handle, selectedOptions) {
  const { pathname } = useLocation();
  return reactExports.useMemo(() => {
    return getVariantUrl({
      handle,
      pathname,
      searchParams: new URLSearchParams(),
      selectedOptions
    });
  }, [handle, selectedOptions, pathname]);
}
function getVariantUrl({
  handle,
  pathname,
  searchParams,
  selectedOptions
}) {
  const match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname);
  const isLocalePathname = match && match.length > 0;
  const path = isLocalePathname ? `${match[0]}products/${handle}` : `/products/${handle}`;
  selectedOptions == null ? void 0 : selectedOptions.forEach((option) => {
    searchParams.set(option.name, option.value);
  });
  const searchString = searchParams.toString();
  return path + (searchString ? "?" + searchParams.toString() : "");
}
function ProductPrice({
  price,
  compareAtPrice
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "product-price", children: compareAtPrice ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "product-price-on-sale", children: [
    price ? /* @__PURE__ */ jsxRuntimeExports.jsx(Money, { data: price }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("s", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Money, { data: compareAtPrice }) })
  ] }) : price ? /* @__PURE__ */ jsxRuntimeExports.jsx(Money, { data: price }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: " " }) });
}
function CartLineItem({
  layout,
  line,
  childrenMap
}) {
  var _a2;
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "cart-line", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-line-inner", children: [
      image && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Image,
        {
          alt: title,
          aspectRatio: "1/1",
          data: image,
          height: 100,
          loading: "lazy",
          width: 100
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            prefetch: "intent",
            to: lineItemUrl,
            onClick: () => {
              if (layout === "aside") {
                close();
              }
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: product.title }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProductPrice, { price: (_a2 = line == null ? void 0 : line.cost) == null ? void 0 : _a2.totalAmount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: selectedOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
          option.name,
          ": ",
          option.value
        ] }) }, option.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartLineQuantity, { line })
      ] })
    ] }),
    lineItemChildren ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { id: childrenLabelId, className: "sr-only", children: [
        "Line items with ",
        product.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { "aria-labelledby": childrenLabelId, className: "cart-line-children", children: lineItemChildren.map((childLine) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CartLineItem,
        {
          childrenMap,
          line: childLine,
          layout
        },
        childLine.id
      )) })
    ] }) : null
  ] }, id);
}
function CartLineQuantity({ line }) {
  if (!line || typeof (line == null ? void 0 : line.quantity) === "undefined") return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));
  const inputRef = reactExports.useRef(null);
  const fetcher = useFetcher({ key: getUpdateKey([lineId]) + "-input" });
  function submitQuantity(newQty) {
    if (newQty < 1) {
      if (inputRef.current) inputRef.current.value = String(quantity);
      return;
    }
    if (newQty === quantity) return;
    const formData = new FormData();
    formData.append(
      "cartFormInput",
      JSON.stringify({
        action: re.ACTIONS.LinesUpdate,
        inputs: { lines: [{ id: lineId, quantity: newQty }] }
      })
    );
    fetcher.submit(formData, { method: "POST", action: "/cart" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-line-quantity", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-line-qty-controls", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `qty-${lineId}`, className: "sr-only", children: "Qty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartLineUpdateButton, { lines: [{ id: lineId, quantity: prevQuantity }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-label": "Decrease quantity",
          disabled: quantity <= 1 || !!isOptimistic,
          name: "decrease-quantity",
          value: prevQuantity,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "−" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: `qty-${lineId}`,
          ref: inputRef,
          type: "number",
          className: "cart-line-qty-input",
          defaultValue: quantity,
          min: 1,
          disabled: !!isOptimistic,
          "aria-label": "Quantity",
          onBlur: (e) => submitQuantity(parseInt(e.target.value, 10)),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.target.blur();
            }
          }
        },
        quantity
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartLineUpdateButton, { lines: [{ id: lineId, quantity: nextQuantity }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-label": "Increase quantity",
          name: "increase-quantity",
          value: nextQuantity,
          disabled: !!isOptimistic,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cart-line-remove", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartLineRemoveButton, { lineIds: [lineId], disabled: !!isOptimistic }) })
  ] });
}
function CartLineRemoveButton({
  lineIds,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    re,
    {
      fetcherKey: getRemoveKey(lineIds),
      route: "/cart",
      action: re.ACTIONS.LinesRemove,
      inputs: { lineIds },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled, type: "submit", children: "Remove" })
    }
  );
}
function CartLineUpdateButton({
  children,
  lines
}) {
  const lineIds = lines.map((line) => line.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    re,
    {
      fetcherKey: getUpdateKey(lineIds),
      route: "/cart",
      action: re.ACTIONS.LinesUpdate,
      inputs: { lines },
      children
    }
  );
}
function getUpdateKey(lineIds) {
  return [re.ACTIONS.LinesUpdate, ...lineIds].join("-");
}
function getRemoveKey(lineIds) {
  return [re.ACTIONS.LinesRemove, ...lineIds].join("-");
}
function CartSummary({ cart, layout, isCartUpdating }) {
  var _a2, _b, _c;
  const className = layout === "page" ? "cart-summary-page" : "cart-summary-aside";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-labelledby": "cart-summary", className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Totals" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "cart-subtotal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Subtotal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: ((_b = (_a2 = cart == null ? void 0 : cart.cost) == null ? void 0 : _a2.subtotalAmount) == null ? void 0 : _b.amount) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Money, { data: (_c = cart == null ? void 0 : cart.cost) == null ? void 0 : _c.subtotalAmount }) : "-" })
    ] }),
    layout === "page" && /* @__PURE__ */ jsxRuntimeExports.jsx(CartDiscounts, { discountCodes: cart == null ? void 0 : cart.discountCodes }),
    layout === "page" && /* @__PURE__ */ jsxRuntimeExports.jsx(CartGiftCard, { giftCardCodes: cart == null ? void 0 : cart.appliedGiftCards }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartCheckoutActions, { checkoutUrl: cart == null ? void 0 : cart.checkoutUrl, isCartUpdating })
  ] });
}
function CartCheckoutActions({
  checkoutUrl,
  isCartUpdating
}) {
  if (!checkoutUrl) return null;
  const { close } = useAside();
  const location2 = useLocation();
  const localeMatch = location2.pathname.match(/^\/(en-nz|en-au|en-us|en-za)/);
  const localePrefix = localeMatch ? localeMatch[0] : "";
  function handleCheckoutClick(e) {
    if (isCartUpdating) {
      e.preventDefault();
      return;
    }
    close();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-checkout-actions", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: `${localePrefix}/checkout`,
        onClick: handleCheckoutClick,
        className: `checkout-primary-btn${isCartUpdating ? " checkout-btn-disabled" : ""}`,
        "aria-disabled": isCartUpdating,
        style: isCartUpdating ? { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } : void 0,
        children: isCartUpdating ? "Updating cart…" : "Proceed to Checkout →"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: checkoutUrl,
        target: "_self",
        onClick: handleCheckoutClick,
        className: `checkout-skip-btn${isCartUpdating ? " checkout-btn-disabled" : ""}`,
        "aria-disabled": isCartUpdating,
        style: isCartUpdating ? { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } : void 0,
        children: "Skip to payment →"
      }
    )
  ] });
}
function CartDiscounts({
  discountCodes
}) {
  var _a2;
  const codes = ((_a2 = discountCodes == null ? void 0 : discountCodes.filter((discount) => discount.applicable)) == null ? void 0 : _a2.map(({ code }) => code)) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { hidden: !codes.length, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Discount(s)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UpdateDiscountForm, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-discount", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: codes == null ? void 0 : codes.join(", ") }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", "aria-label": "Remove discount", children: "Remove" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UpdateDiscountForm, { discountCodes: codes, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "discount-code-input", className: "sr-only", children: "Discount code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "discount-code-input",
          type: "text",
          name: "discountCode",
          placeholder: "Discount code"
        }
      ),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", "aria-label": "Apply discount code", children: "Apply" })
    ] }) })
  ] });
}
function UpdateDiscountForm({
  discountCodes,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    re,
    {
      route: "/cart",
      action: re.ACTIONS.DiscountCodesUpdate,
      inputs: {
        discountCodes: discountCodes || []
      },
      children
    }
  );
}
function CartGiftCard({
  giftCardCodes
}) {
  const giftCardCodeInput = reactExports.useRef(null);
  const giftCardAddFetcher = useFetcher({ key: "gift-card-add" });
  reactExports.useEffect(() => {
    if (giftCardAddFetcher.data) {
      giftCardCodeInput.current.value = "";
    }
  }, [giftCardAddFetcher.data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    giftCardCodes && giftCardCodes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Applied Gift Card(s)" }),
      giftCardCodes.map((giftCard) => /* @__PURE__ */ jsxRuntimeExports.jsx(RemoveGiftCardForm, { giftCardId: giftCard.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-discount", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
          "***",
          giftCard.lastCharacters
        ] }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Money, { data: giftCard.amountUsed }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", children: "Remove" })
      ] }) }, giftCard.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddGiftCardForm, { fetcherKey: "gift-card-add", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          name: "giftCardCode",
          placeholder: "Gift card code",
          ref: giftCardCodeInput
        }
      ),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: giftCardAddFetcher.state !== "idle", children: "Apply" })
    ] }) })
  ] });
}
function AddGiftCardForm({
  fetcherKey,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    re,
    {
      fetcherKey,
      route: "/cart",
      action: re.ACTIONS.GiftCardCodesAdd,
      children
    }
  );
}
function RemoveGiftCardForm({
  giftCardId,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    re,
    {
      route: "/cart",
      action: re.ACTIONS.GiftCardCodesRemove,
      inputs: {
        giftCardCodes: [giftCardId]
      },
      children
    }
  );
}
function getLineItemChildrenMap(lines) {
  var _a2;
  const children = {};
  for (const line of lines) {
    if ("parentRelationship" in line && ((_a2 = line.parentRelationship) == null ? void 0 : _a2.parent)) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ("lineComponents" in line) {
      const children2 = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(children2)) {
        if (!children2[parentId]) children2[parentId] = [];
        children2[parentId].push(...childIds);
      }
    }
  }
  return children;
}
function CartMain({ layout, cart: originalCart }) {
  var _a2, _b, _c, _d, _e2, _f;
  const cart = ka(originalCart);
  const linesCount = Boolean(((_b = (_a2 = cart == null ? void 0 : cart.lines) == null ? void 0 : _a2.nodes) == null ? void 0 : _b.length) || 0);
  const withDiscount = cart && Boolean((_d = (_c = cart == null ? void 0 : cart.discountCodes) == null ? void 0 : _c.filter((code) => code.applicable)) == null ? void 0 : _d.length);
  const className = `cart-main ${withDiscount ? "with-discount" : ""}`;
  const cartHasItems = (cart == null ? void 0 : cart.totalQuantity) ? cart.totalQuantity > 0 : false;
  const isCartUpdating = !!(cart == null ? void 0 : cart.isOptimistic);
  const childrenMap = getLineItemChildrenMap(((_e2 = cart == null ? void 0 : cart.lines) == null ? void 0 : _e2.nodes) ?? []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartEmpty, { hidden: linesCount, layout }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cart-details", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "cart-lines", className: "sr-only", children: "Line items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { "aria-labelledby": "cart-lines", children: (((_f = cart == null ? void 0 : cart.lines) == null ? void 0 : _f.nodes) ?? []).map((line) => {
        var _a3;
        if ("parentRelationship" in line && ((_a3 = line.parentRelationship) == null ? void 0 : _a3.parent)) {
          return null;
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartLineItem,
          {
            line,
            layout,
            childrenMap
          },
          line.id
        );
      }) }) }),
      cartHasItems && layout === "aside" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContinueShopping, { disabled: isCartUpdating }),
      cartHasItems && /* @__PURE__ */ jsxRuntimeExports.jsx(CartSummary, { cart, layout, isCartUpdating })
    ] })
  ] });
}
function ContinueShopping({ disabled }) {
  const { close } = useAside();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "continue-shopping", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: "continue-shopping-btn",
      onClick: close,
      disabled,
      "aria-disabled": disabled,
      children: "← Continue Shopping"
    }
  ) });
}
function CartEmpty({
  hidden = false
}) {
  const { close } = useAside();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { hidden, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Looks like you haven’t added anything yet, let’s get you started!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections", onClick: close, prefetch: "viewport", children: "Continue shopping →" })
  ] });
}
const SEARCH_ENDPOINT = "/search";
function SearchFormPredictive({
  children,
  className = "predictive-search-form",
  ...props
}) {
  const fetcher = useFetcher({ key: "search" });
  const inputRef = reactExports.useRef(null);
  const navigate = useNavigate();
  const aside = useAside();
  function resetInput(event) {
    var _a2;
    event.preventDefault();
    event.stopPropagation();
    if ((_a2 = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _a2.value) {
      inputRef.current.blur();
    }
  }
  function goToSearch() {
    var _a2;
    const term = (_a2 = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _a2.value;
    void navigate(SEARCH_ENDPOINT + (term ? `?q=${term}` : ""));
    aside.close();
  }
  function fetchResults(event) {
    void fetcher.submit(
      { q: event.target.value || "", limit: 5, predictive: true },
      { method: "GET", action: SEARCH_ENDPOINT }
    );
  }
  reactExports.useEffect(() => {
    var _a2;
    (_a2 = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _a2.setAttribute("type", "search");
  }, []);
  if (typeof children !== "function") {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(fetcher.Form, { ...props, className, onSubmit: resetInput, children: children({ inputRef, fetcher, fetchResults, goToSearch }) });
}
function getEmptyPredictiveSearchResult() {
  return {
    total: 0,
    items: {
      articles: [],
      collections: [],
      products: [],
      pages: [],
      queries: []
    }
  };
}
function urlWithTrackingParams({
  baseUrl,
  trackingParams,
  params: extraParams,
  term
}) {
  let search = new URLSearchParams({
    ...extraParams,
    q: encodeURIComponent(term)
  }).toString();
  if (trackingParams) {
    search = `${search}&${trackingParams}`;
  }
  return `${baseUrl}?${search}`;
}
function SearchResultsPredictive({
  children
}) {
  const aside = useAside();
  const { term, inputRef, fetcher, total, items } = usePredictiveSearch();
  function resetInput() {
    if (inputRef.current) {
      inputRef.current.blur();
      inputRef.current.value = "";
    }
  }
  function closeSearch() {
    resetInput();
    aside.close();
  }
  return children({
    items,
    closeSearch,
    inputRef,
    state: fetcher.state,
    term,
    total
  });
}
SearchResultsPredictive.Articles = SearchResultsPredictiveArticles;
SearchResultsPredictive.Collections = SearchResultsPredictiveCollections;
SearchResultsPredictive.Pages = SearchResultsPredictivePages;
SearchResultsPredictive.Products = SearchResultsPredictiveProducts;
SearchResultsPredictive.Queries = SearchResultsPredictiveQueries;
SearchResultsPredictive.Empty = SearchResultsPredictiveEmpty;
function SearchResultsPredictiveArticles({
  term,
  articles,
  closeSearch
}) {
  if (!articles.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { children: "Articles" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: articles.map((article) => {
      var _a2;
      const articleUrl = urlWithTrackingParams({
        baseUrl: `/blogs/${article.blog.handle}/${article.handle}`,
        trackingParams: article.trackingParameters,
        term: term.current ?? ""
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { onClick: closeSearch, to: articleUrl, children: [
        ((_a2 = article.image) == null ? void 0 : _a2.url) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            alt: article.image.altText ?? "",
            src: article.image.url,
            width: 50,
            height: 50
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: article.title }) })
      ] }) }, article.id);
    }) })
  ] }, "articles");
}
function SearchResultsPredictiveCollections({
  term,
  collections,
  closeSearch
}) {
  if (!collections.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { children: "Collections" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: collections.map((collection) => {
      var _a2;
      const collectionUrl = urlWithTrackingParams({
        baseUrl: `/collections/${collection.handle}`,
        trackingParams: collection.trackingParameters,
        term: term.current
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { onClick: closeSearch, to: collectionUrl, children: [
        ((_a2 = collection.image) == null ? void 0 : _a2.url) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            alt: collection.image.altText ?? "",
            src: collection.image.url,
            width: 50,
            height: 50
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: collection.title }) })
      ] }) }, collection.id);
    }) })
  ] }, "collections");
}
function SearchResultsPredictivePages({
  term,
  pages,
  closeSearch
}) {
  if (!pages.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { children: "Pages" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: pages.map((page) => {
      const pageUrl = urlWithTrackingParams({
        baseUrl: `/pages/${page.handle}`,
        trackingParams: page.trackingParameters,
        term: term.current
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { onClick: closeSearch, to: pageUrl, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: page.title }) }) }) }, page.id);
    }) })
  ] }, "pages");
}
function SearchResultsPredictiveProducts({
  term,
  products,
  closeSearch
}) {
  if (!products.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { children: "Products" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: products.map((product) => {
      var _a2, _b;
      const productUrl = urlWithTrackingParams({
        baseUrl: `/products/${product.handle}`,
        trackingParams: product.trackingParameters,
        term: term.current
      });
      const price = (_a2 = product == null ? void 0 : product.selectedOrFirstAvailableVariant) == null ? void 0 : _a2.price;
      const image = (_b = product == null ? void 0 : product.selectedOrFirstAvailableVariant) == null ? void 0 : _b.image;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: productUrl, onClick: closeSearch, children: [
        image && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            alt: image.altText ?? "",
            src: image.url,
            width: 50,
            height: 50
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: price && /* @__PURE__ */ jsxRuntimeExports.jsx(Money, { data: price }) })
        ] })
      ] }) }, product.id);
    }) })
  ] }, "products");
}
function SearchResultsPredictiveQueries({
  queries,
  queriesDatalistId
}) {
  if (!queries.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: queriesDatalistId, children: queries.map((suggestion) => {
    if (!suggestion) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: suggestion.text }, suggestion.text);
  }) });
}
function SearchResultsPredictiveEmpty({
  term
}) {
  if (!term.current) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
    "No results found for ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("q", { children: term.current })
  ] });
}
function usePredictiveSearch() {
  var _a2, _b;
  const fetcher = useFetcher({ key: "search" });
  const term = reactExports.useRef("");
  const inputRef = reactExports.useRef(null);
  if ((fetcher == null ? void 0 : fetcher.state) === "loading") {
    term.current = String(((_a2 = fetcher.formData) == null ? void 0 : _a2.get("q")) || "");
  }
  reactExports.useEffect(() => {
    if (!inputRef.current) {
      inputRef.current = document.querySelector('input[type="search"]');
    }
  }, []);
  const { items, total } = ((_b = fetcher == null ? void 0 : fetcher.data) == null ? void 0 : _b.result) ?? getEmptyPredictiveSearchResult();
  return { items, total, inputRef, term, fetcher };
}
function PageLayout({
  cart,
  children = null,
  footer,
  footerBanner,
  header,
  isLoggedIn,
  customerFirstName,
  publicStoreDomain
}) {
  const location2 = useLocation();
  const isHomePage = location2.pathname === "/" || /^\/(en-nz|en-au|en-us|en-za)\/?$/.test(location2.pathname);
  const isProductPage = /^(\/(en-nz|en-au|en-us|en-za))?\/products\//.test(location2.pathname);
  const isAccountPage = /^(\/(en-nz|en-au|en-us|en-za))?\/account/.test(location2.pathname);
  const isContactPage = /^(\/(en-nz|en-au|en-us|en-za|pages))?\/contact/.test(location2.pathname);
  const isCartPage = /^(\/(en-nz|en-au|en-us|en-za))?\/cart/.test(location2.pathname);
  const isCheckoutPage = /^(\/(en-nz|en-au|en-us|en-za))?\/checkout/.test(location2.pathname);
  reactExports.useEffect(() => {
    if (isHomePage) {
      document.body.classList.add("home-page");
    } else {
      document.body.classList.remove("home-page");
    }
    if (isProductPage) {
      document.body.classList.add("product-page");
    } else {
      document.body.classList.remove("product-page");
    }
    if (isAccountPage) {
      document.body.classList.add("account-page");
    } else {
      document.body.classList.remove("account-page");
    }
    if (isContactPage) {
      document.body.classList.add("contact-page");
    } else {
      document.body.classList.remove("contact-page");
    }
    if (isCartPage) {
      document.body.classList.add("cart-page");
    } else {
      document.body.classList.remove("cart-page");
    }
    if (isCheckoutPage) {
      document.body.classList.add("checkout-page");
    } else {
      document.body.classList.remove("checkout-page");
    }
    return () => {
      document.body.classList.remove("home-page");
      document.body.classList.remove("product-page");
      document.body.classList.remove("account-page");
      document.body.classList.remove("contact-page");
      document.body.classList.remove("cart-page");
      document.body.classList.remove("checkout-page");
    };
  }, [isHomePage, isProductPage, isAccountPage, isContactPage, isCartPage, isCheckoutPage]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Aside.Provider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartAside, { cart }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchAside, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileMenuAside, { header, publicStoreDomain }),
    header && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Header,
      {
        header,
        cart,
        isLoggedIn,
        customerFirstName,
        publicStoreDomain,
        isHomePage
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Footer,
      {
        footer,
        footerBanner,
        header,
        publicStoreDomain
      }
    )
  ] });
}
function CartAside({ cart }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Aside, { type: "cart", heading: "CART", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading cart ..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Await, { resolve: cart, children: (cart2) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CartMain, { cart: cart2, layout: "aside" });
  } }) }) });
}
function SearchAside() {
  const queriesDatalistId = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Aside, { type: "search", heading: "SEARCH", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "predictive-search", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchFormPredictive, { children: ({ fetchResults, goToSearch, inputRef }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          name: "q",
          onChange: fetchResults,
          onFocus: fetchResults,
          placeholder: "Search",
          ref: inputRef,
          type: "search",
          list: queriesDatalistId
        }
      ),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: goToSearch, children: "Search" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchResultsPredictive, { children: ({ items, total, term, state, closeSearch }) => {
      const { articles, collections, pages, products, queries } = items;
      if (state === "loading" && term.current) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
      }
      if (!total) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SearchResultsPredictive.Empty, { term });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SearchResultsPredictive.Queries,
          {
            queries,
            queriesDatalistId
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SearchResultsPredictive.Products,
          {
            products,
            closeSearch,
            term
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SearchResultsPredictive.Collections,
          {
            collections,
            closeSearch,
            term
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SearchResultsPredictive.Pages,
          {
            pages,
            closeSearch,
            term
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SearchResultsPredictive.Articles,
          {
            articles,
            closeSearch,
            term
          }
        ),
        term.current && total ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            onClick: closeSearch,
            to: `${SEARCH_ENDPOINT}?q=${term.current}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "View all results for ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("q", { children: term.current }),
              "  →"
            ] })
          }
        ) : null
      ] });
    } })
  ] }) });
}
function MobileMenuAside({
  header,
  publicStoreDomain
}) {
  var _a2;
  return header.menu && ((_a2 = header.shop.primaryDomain) == null ? void 0 : _a2.url) && /* @__PURE__ */ jsxRuntimeExports.jsx(Aside, { type: "mobile", heading: "MENU", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    HeaderMenu,
    {
      menu: header.menu,
      viewport: "mobile",
      primaryDomainUrl: header.shop.primaryDomain.url,
      publicStoreDomain
    }
  ) });
}
const shouldRevalidate$1 = ({
  formMethod,
  currentUrl,
  nextUrl
}) => {
  if (formMethod && formMethod !== "GET") return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};
function links() {
  return [{
    rel: "preconnect",
    href: "https://cdn.shopify.com"
  }, {
    rel: "preconnect",
    href: "https://shop.app"
  }, {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  }, {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  }, {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap"
  }, {
    rel: "icon",
    type: "image/svg+xml",
    href: favicon
  }];
}
async function loader$o(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  const {
    storefront,
    env
  } = args.context;
  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: qn({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language
    }
  };
}
async function loadCriticalData({
  context
}) {
  const {
    storefront
  } = context;
  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: "main-menu"
        // Adjust to your header menu handle
      }
    })
    // Add other queries here, so that they are loaded in parallel
  ]);
  return {
    header
  };
}
function loadDeferredData({
  context
}) {
  const {
    storefront,
    customerAccount,
    cart
  } = context;
  const expectedCountry = storefront.i18n.country;
  const cartPromise = cart.get().then(async (cartData) => {
    var _a2;
    if (!cartData) return cartData;
    const currentCountry = (_a2 = cartData.buyerIdentity) == null ? void 0 : _a2.countryCode;
    if (currentCountry && currentCountry === expectedCountry) return cartData;
    await cart.updateBuyerIdentity({
      countryCode: expectedCountry
    });
    return cart.get();
  }).catch((error) => {
    console.error("[cart] buyerIdentity reconciliation error:", error);
    return null;
  });
  const isLoggedInPromise = customerAccount.isLoggedIn();
  const customerFirstName = isLoggedInPromise.then((loggedIn) => {
    if (!loggedIn) return null;
    return customerAccount.query(CUSTOMER_NAME_QUERY).then(({
      data: data2
    }) => {
      var _a2;
      return ((_a2 = data2 == null ? void 0 : data2.customer) == null ? void 0 : _a2.firstName) ?? null;
    }).catch(() => null);
  }).catch(() => null);
  const footer = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      footerMenuHandle: "footer"
    }
  }).catch((error) => {
    console.error(error);
    return null;
  });
  const footerBanner = storefront.query(FOOTER_BANNER_QUERY, {
    cache: storefront.CacheLong()
  }).then((data2) => {
    var _a2, _b;
    return ((_b = (_a2 = data2 == null ? void 0 : data2.metaobject) == null ? void 0 : _a2.field) == null ? void 0 : _b.value) ?? null;
  }).catch(() => null);
  return {
    cart: cartPromise,
    isLoggedIn: isLoggedInPromise,
    customerFirstName,
    footer,
    footerBanner
  };
}
const FOOTER_BANNER_QUERY = `#graphql
  query FooterBanner {
    metaobject(handle: {type: "app--footer_banner", handle: "main"}) {
      field(key: "content") {
        value
      }
    }
  }
`;
function Layout({
  children
}) {
  const nonce = yr();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("head", {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("link", {
        rel: "stylesheet",
        href: resetStyles
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("link", {
        rel: "stylesheet",
        href: appStyles
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, {}), /* @__PURE__ */ jsxRuntimeExports.jsx(Links, {})]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("body", {
      children: [children, /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollRestoration, {
        nonce
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {
        nonce
      })]
    })]
  });
}
const root = withComponentProps(function App() {
  const data2 = useRouteLoaderData("root");
  if (!data2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Gn.Provider, {
    cart: data2.cart,
    shop: data2.shop,
    consent: data2.consent,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLayout, {
      ...data2,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
    })
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2() {
  var _a2;
  const error = useRouteError();
  let errorMessage = "Unknown error";
  let errorStatus = 500;
  if (isRouteErrorResponse(error)) {
    errorMessage = ((_a2 = error == null ? void 0 : error.data) == null ? void 0 : _a2.message) ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "route-error",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      children: "Oops"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      children: errorStatus
    }), errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("fieldset", {
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", {
        children: errorMessage
      })
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  loader: loader$o,
  shouldRevalidate: shouldRevalidate$1
}, Symbol.toStringTag, { value: "Module" }));
const SUPPLIER_PREFIX_LENGTH = 4;
function getSupplierFolderPrefix(supplierName) {
  const lower = supplierName.toLowerCase();
  return lower.length <= SUPPLIER_PREFIX_LENGTH ? lower : lower.slice(0, SUPPLIER_PREFIX_LENGTH);
}
function getProductCardImageSrc(supplierName, externalProductId) {
  if (!supplierName || !externalProductId) return null;
  const prefix = getSupplierFolderPrefix(supplierName);
  return `/media/suppliers/${prefix}/${externalProductId}.jpg`;
}
function getProductGalleryImageSrcs(supplierName, externalProductId, maxSuffix = 9) {
  const cardSrc = getProductCardImageSrc(supplierName, externalProductId);
  if (!cardSrc) return [];
  const prefix = getSupplierFolderPrefix(supplierName);
  const suffixed = Array.from(
    { length: maxSuffix + 1 },
    (_2, i2) => `/media/suppliers/${prefix}/${externalProductId}_${i2}.jpg`
  );
  return [cardSrc, ...suffixed];
}
function ProductCard({ product }) {
  var _a2, _b, _c, _d, _e2;
  const fetcher = useFetcher({ key: `add-to-cart-${product.id}` });
  const firstVariant = (_a2 = product.variants) == null ? void 0 : _a2.nodes[0];
  const msq = Number((_b = product.msq) == null ? void 0 : _b.value);
  const showMoqRibbon = Number.isFinite(msq) && msq > 1;
  const [localImageFailed, setLocalImageFailed] = reactExports.useState(false);
  const localImageSrc = getProductCardImageSrc(
    (_c = product.supplierName) == null ? void 0 : _c.value,
    (_d = product.externalProductId) == null ? void 0 : _d.value
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "product-card group block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/products/${product.handle}`, prefetch: "intent", className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square overflow-hidden rounded-lg bg-gray-100 moq-ribbon-wrapper", children: [
        product.featuredImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            data: product.featuredImage,
            aspectRatio: "1/1",
            sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          }
        ) : localImageSrc && !localImageFailed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: localImageSrc,
            alt: product.title,
            onError: () => setLocalImageFailed(true),
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-gray-400", children: "No image" }),
        showMoqRibbon && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "moq-ribbon", children: [
          "Minimum qty: ",
          msq
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-3",
          style: {
            background: "rgba(50, 50, 50, 0.85)",
            padding: "0.5rem 0.75rem",
            borderRadius: "6px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white group-hover:underline truncate", children: product.title }),
            ((_e2 = product.brand) == null ? void 0 : _e2.value) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-300 mt-0.5", children: product.brand.value }),
            product.productType && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: product.productType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-medium text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Money, { data: product.priceRange.minVariantPrice }) })
          ]
        }
      )
    ] }),
    firstVariant && /* @__PURE__ */ jsxRuntimeExports.jsxs(fetcher.Form, { method: "post", action: "/cart", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "hidden",
          name: re.INPUT_NAME,
          value: JSON.stringify({
            action: re.ACTIONS.LinesAdd,
            inputs: {
              lines: [
                {
                  merchandiseId: firstVariant.id,
                  quantity: 1
                }
              ]
            }
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: !firstVariant.availableForSale || fetcher.state !== "idle",
          className: "add-to-cart-btn",
          children: !firstVariant.availableForSale ? "Sold Out" : fetcher.state !== "idle" ? "Adding..." : "Add to Cart"
        }
      )
    ] })
  ] });
}
const MAX_PRODUCTS = 250;
async function loader$n(args) {
  const {
    params,
    context
  } = args;
  const {
    handle
  } = params;
  const {
    storefront
  } = context;
  if (!handle) {
    throw new Response("Collection handle is required", {
      status: 400
    });
  }
  const {
    collection
  } = await storefront.query(COLLECTION_QUERY$1, {
    variables: {
      handle,
      first: MAX_PRODUCTS
    }
  });
  if (!collection && handle === "all") {
    const {
      products
    } = await storefront.query(ALL_PRODUCTS_QUERY, {
      variables: {
        first: MAX_PRODUCTS
      }
    });
    return {
      collection: {
        id: "all",
        title: "All Products",
        handle: "all",
        description: "",
        products
      }
    };
  }
  if (!collection) {
    throw new Response("Collection not found", {
      status: 404
    });
  }
  return {
    collection
  };
}
function getSubCollection(product) {
  var _a2;
  return ((_a2 = product.subCollection) == null ? void 0 : _a2.value) || "Other";
}
function getSubCatCollection(product) {
  var _a2;
  return ((_a2 = product.subCatCollection) == null ? void 0 : _a2.value) || "Other";
}
function getBrand(product) {
  return product.vendor || "";
}
function getPrice(product) {
  var _a2, _b;
  return Number((_b = (_a2 = product.priceRange) == null ? void 0 : _a2.minVariantPrice) == null ? void 0 : _b.amount) || 0;
}
function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a2, b2) => a2.localeCompare(b2, void 0, {
    numeric: true
  }));
}
function FilterCheckboxGroup({
  title,
  options,
  selected,
  onToggle
}) {
  if (options.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "filter-group",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h4", {
      className: "font-semibold text-sm mb-1",
      children: title
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      className: "filter-group-options",
      children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", {
        className: "filter-option",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "checkbox",
          checked: selected.has(option),
          onChange: () => onToggle(option)
        }), option]
      }, option))
    })]
  });
}
function CollapsibleSection({
  title,
  count,
  children
}) {
  const [collapsed, setCollapsed] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "collection-section",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("button", {
      type: "button",
      className: "collection-section-toggle",
      onClick: () => setCollapsed((c2) => !c2),
      children: [collapsed ? "▸" : "▾", " ", title, " (", count, ")"]
    }), !collapsed && children]
  });
}
const _$locale__collections_$handle = withComponentProps(function Collection() {
  const {
    collection
  } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = collection.products.nodes;
  const selectedBrands = new Set(searchParams.getAll("brand"));
  const selectedSubCollections = new Set(searchParams.getAll("subCollection"));
  const selectedSubCatCollections = new Set(searchParams.getAll("subCatCollection"));
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const brandOptions = uniqueSorted(allProducts.map(getBrand));
  const subCollectionOptions = uniqueSorted(allProducts.map(getSubCollection));
  const subCatCollectionOptions = uniqueSorted(allProducts.map(getSubCatCollection));
  const hasFilters = selectedBrands.size > 0 || selectedSubCollections.size > 0 || selectedSubCatCollections.size > 0 || minPrice !== "" || maxPrice !== "";
  function toggleParam(key, value) {
    const next = new URLSearchParams(searchParams);
    const values = next.getAll(key);
    next.delete(key);
    if (values.includes(value)) {
      for (const v of values) if (v !== value) next.append(key, v);
    } else {
      for (const v of values) next.append(key, v);
      next.append(key, value);
    }
    setSearchParams(next, {
      preventScrollReset: true
    });
  }
  function setPrice(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, {
      preventScrollReset: true
    });
  }
  function clearFilters() {
    setSearchParams(new URLSearchParams(), {
      preventScrollReset: true
    });
  }
  const filteredProducts = allProducts.filter((product) => {
    if (selectedBrands.size > 0 && !selectedBrands.has(getBrand(product))) return false;
    if (selectedSubCollections.size > 0 && !selectedSubCollections.has(getSubCollection(product))) return false;
    if (selectedSubCatCollections.size > 0 && !selectedSubCatCollections.has(getSubCatCollection(product))) return false;
    const price = getPrice(product);
    if (minPrice !== "" && price < Number(minPrice)) return false;
    if (maxPrice !== "" && price > Number(maxPrice)) return false;
    return true;
  });
  const grouped = /* @__PURE__ */ new Map();
  for (const product of allProducts) {
    const subCollection = getSubCollection(product);
    const subCatCollection = getSubCatCollection(product);
    if (!grouped.has(subCollection)) grouped.set(subCollection, /* @__PURE__ */ new Map());
    const subMap = grouped.get(subCollection);
    if (!subMap.has(subCatCollection)) subMap.set(subCatCollection, []);
    subMap.get(subCatCollection).push(product);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "collection max-w-7xl mx-auto px-4 py-8",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      className: "text-3xl font-bold mb-2",
      children: collection.title
    }), collection.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      className: "collection-description text-gray-600 mb-6",
      children: collection.description
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "collection-layout",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("aside", {
        className: "collection-filters",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "filter-group",
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h4", {
            className: "font-semibold text-sm mb-1",
            children: "Price"
          }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "filter-price-range",
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "number",
              placeholder: "Min",
              value: minPrice,
              onChange: (e) => setPrice("minPrice", e.target.value)
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "number",
              placeholder: "Max",
              value: maxPrice,
              onChange: (e) => setPrice("maxPrice", e.target.value)
            })]
          })]
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(FilterCheckboxGroup, {
          title: "Brand",
          options: brandOptions,
          selected: selectedBrands,
          onToggle: (v) => toggleParam("brand", v)
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(FilterCheckboxGroup, {
          title: "Sub Collection",
          options: subCollectionOptions,
          selected: selectedSubCollections,
          onToggle: (v) => toggleParam("subCollection", v)
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(FilterCheckboxGroup, {
          title: "Sub-Cat Collection",
          options: subCatCollectionOptions,
          selected: selectedSubCatCollections,
          onToggle: (v) => toggleParam("subCatCollection", v)
        }), hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          type: "button",
          className: "filter-clear-btn",
          onClick: clearFilters,
          children: "Clear filters"
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "collection-results",
        children: hasFilters ? filteredProducts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
          className: "products-grid",
          children: filteredProducts.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, {
            product
          }, product.id))
        }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
          className: "text-center text-gray-500 py-8",
          children: "No products match the selected filters."
        }) : [...grouped.entries()].map(([subCollection, subCatMap]) => {
          const sectionCount = [...subCatMap.values()].reduce((sum, p) => sum + p.length, 0);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, {
            title: subCollection,
            count: sectionCount,
            children: [...subCatMap.entries()].map(([subCatCollection, products]) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, {
              title: subCatCollection,
              count: products.length,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                className: "products-grid",
                children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, {
                  product
                }, product.id))
              })
            }, subCatCollection))
          }, subCollection);
        })
      })]
    })]
  });
});
const PRODUCT_FIELDS = `#graphql
  fragment CollectionProductFields on Product {
    id
    title
    handle
    productType
    vendor
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    brand: metafield(namespace: "app", key: "brand") {
      value
    }
    subCollection: metafield(namespace: "app", key: "sub_collection") {
      value
    }
    subCatCollection: metafield(namespace: "app", key: "sub_cat_collection") {
      value
    }
    msq: metafield(namespace: "app", key: "msq") {
      value
    }
    supplierName: metafield(namespace: "app", key: "supplier_name") {
      value
    }
    externalProductId: metafield(namespace: "app", key: "external_product_id") {
      value
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
`;
const COLLECTION_QUERY$1 = `#graphql
  query Collection(
    $handle: String!
    $first: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: $first) {
        nodes {
          ...CollectionProductFields
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
`;
const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $first: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $first) {
      nodes {
        ...CollectionProductFields
      }
    }
  }
  ${PRODUCT_FIELDS}
`;
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__collections_$handle,
  loader: loader$n
}, Symbol.toStringTag, { value: "Module" }));
function CollectionCard({ collection }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      className: "collection-item",
      to: `/collections/${collection.handle}`,
      prefetch: "intent",
      children: [
        collection.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Image,
          {
            data: collection.image,
            aspectRatio: "1/1",
            sizes: "(min-width: 768px) 25vw, 50vw"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-semibold", children: collection.title })
      ]
    },
    collection.id
  );
}
async function loader$m(args) {
  const {
    context,
    request
  } = args;
  const paginationVariables = Ts(request, {
    pageBy: 8
  });
  const {
    collections
  } = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables
  });
  return {
    collections
  };
}
const _$locale__collections__index = withComponentProps(function Collections() {
  const {
    collections
  } = useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "collections max-w-7xl mx-auto px-4 py-8",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      className: "text-3xl font-bold mb-6",
      children: "Collections"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(hs, {
      connection: collections,
      children: ({
        nodes,
        isLoading,
        PreviousLink,
        NextLink
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx(PreviousLink, {
          children: isLoading ? "Loading..." : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
            children: "Load previous"
          })
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
          className: "collections-grid",
          children: nodes.map((collection) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionCard, {
            collection
          }, collection.id))
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(NextLink, {
          children: isLoading ? "Loading..." : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
            children: "Load more"
          })
        })]
      })
    })]
  });
});
const COLLECTIONS_QUERY = `#graphql
  query Collections(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__collections__index,
  loader: loader$m
}, Symbol.toStringTag, { value: "Module" }));
async function loader$l({
  request,
  context
}) {
  const url = new URL(request.url);
  const handle = url.searchParams.get("handle");
  if (!handle) {
    return {
      error: "Pass ?handle=product-handle to test availability",
      results: null
    };
  }
  const {
    storefront
  } = context;
  const {
    country,
    language
  } = storefront.i18n;
  const withContext = await storefront.query(DEBUG_QUERY_WITH_CONTEXT, {
    variables: {
      handle,
      country,
      language
    }
  });
  const withoutContext = await storefront.query(DEBUG_QUERY_WITHOUT_CONTEXT, {
    variables: {
      handle
    }
  });
  return {
    error: null,
    results: {
      handle,
      resolvedContext: {
        country,
        language
      },
      withContext: withContext.product,
      withoutContext: withoutContext.product
    }
  };
}
const _$locale__debugAvailability = withComponentProps(function DebugAvailability() {
  var _a2;
  const {
    error,
    results
  } = useLoaderData();
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        padding: "2rem",
        color: "white"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
        children: "Debug Product Availability"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: error
      })]
    });
  }
  if (!results) return null;
  const {
    handle,
    withContext,
    withoutContext
  } = results;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      padding: "2rem",
      color: "white",
      maxWidth: "900px",
      margin: "0 auto"
    },
    children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("h1", {
      style: {
        marginBottom: "1rem"
      },
      children: ["Debug: ", handle]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        marginBottom: "1rem",
        padding: "0.5rem",
        background: "rgba(0,100,255,0.15)",
        borderRadius: "8px"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("strong", {
        children: "Resolved Context:"
      }), " country=", results.resolvedContext.country, ", language=", results.resolvedContext.language]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Section, {
        title: "WITH @inContext (ZA)",
        product: withContext
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(Section, {
        title: "WITHOUT @inContext",
        product: withoutContext
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        marginTop: "2rem",
        padding: "1rem",
        background: "rgba(255,255,0,0.1)",
        borderRadius: "8px"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        children: "Diagnosis"
      }), withContext && withoutContext ? /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", {
        children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("li", {
          children: ["With ZA context: availableForSale =", " ", /* @__PURE__ */ jsxRuntimeExports.jsx("strong", {
            style: {
              color: withContext.availableForSale ? "lime" : "red"
            },
            children: String(withContext.availableForSale)
          })]
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("li", {
          children: ["Without context: availableForSale =", " ", /* @__PURE__ */ jsxRuntimeExports.jsx("strong", {
            style: {
              color: withoutContext.availableForSale ? "lime" : "red"
            },
            children: String(withoutContext.availableForSale)
          })]
        }), withContext.availableForSale !== withoutContext.availableForSale && /* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          style: {
            color: "orange",
            fontWeight: "bold"
          },
          children: "Discrepancy detected — the ZA market context is affecting availability. Check if the ZA market is in DRAFT status."
        }), !withContext.availableForSale && !withoutContext.availableForSale && /* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          style: {
            color: "red"
          },
          children: "Product is unavailable in both contexts — issue is not market-specific. Check inventory tracking and publication status in admin."
        }), withContext.availableForSale && withoutContext.availableForSale && /* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          style: {
            color: "lime"
          },
          children: "Product is available in both contexts — no issue detected."
        }), ((_a2 = withContext.selectedOrFirstAvailableVariant) == null ? void 0 : _a2.quantityAvailable) == null && /* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          style: {
            color: "orange"
          },
          children: 'quantityAvailable is null/N/A. Enable "Read inventory of assigned locations" in Shopify Admin → Settings → Apps → Headless → Storefront API permissions.'
        })]
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: "One or both queries returned null — product may not exist or not be published."
      })]
    })]
  });
});
function Section({
  title,
  product
}) {
  var _a2, _b;
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        background: "rgba(50,50,50,0.6)",
        padding: "1rem",
        borderRadius: "8px"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
        children: title
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        style: {
          color: "red"
        },
        children: "Product not found (null)"
      })]
    });
  }
  const variant = product.selectedOrFirstAvailableVariant;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      background: "rgba(50,50,50,0.6)",
      padding: "1rem",
      borderRadius: "8px"
    },
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      style: {
        marginBottom: "0.5rem"
      },
      children: title
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("table", {
      style: {
        width: "100%",
        borderCollapse: "collapse"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", {
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Row, {
          label: "Title",
          value: product.title
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(Row, {
          label: "Product availableForSale",
          value: String(product.availableForSale),
          color: product.availableForSale ? "lime" : "red"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(Row, {
          label: "Variant availableForSale",
          value: String(variant == null ? void 0 : variant.availableForSale),
          color: (variant == null ? void 0 : variant.availableForSale) ? "lime" : "red"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(Row, {
          label: "Variant quantityAvailable",
          value: String((variant == null ? void 0 : variant.quantityAvailable) ?? "N/A")
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(Row, {
          label: "Price",
          value: variant ? `${variant.price.amount} ${variant.price.currencyCode}` : "N/A"
        })]
      })
    }), ((_b = (_a2 = product.variants) == null ? void 0 : _a2.nodes) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        style: {
          marginTop: "1rem"
        },
        children: "All Variants"
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("table", {
        style: {
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.85rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("thead", {
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", {
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("th", {
              style: {
                textAlign: "left",
                padding: "4px"
              },
              children: "Title"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("th", {
              style: {
                textAlign: "left",
                padding: "4px"
              },
              children: "Available"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("th", {
              style: {
                textAlign: "left",
                padding: "4px"
              },
              children: "Qty"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("th", {
              style: {
                textAlign: "left",
                padding: "4px"
              },
              children: "Price"
            })]
          })
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", {
          children: product.variants.nodes.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", {
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("td", {
              style: {
                padding: "4px"
              },
              children: v.title
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
              style: {
                padding: "4px",
                color: v.availableForSale ? "lime" : "red"
              },
              children: String(v.availableForSale)
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
              style: {
                padding: "4px"
              },
              children: v.quantityAvailable ?? "N/A"
            }), /* @__PURE__ */ jsxRuntimeExports.jsxs("td", {
              style: {
                padding: "4px"
              },
              children: [v.price.amount, " ", v.price.currencyCode]
            })]
          }, v.id))
        })]
      })]
    })]
  });
}
function Row({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("td", {
      style: {
        padding: "4px",
        fontWeight: "bold"
      },
      children: label
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("td", {
      style: {
        padding: "4px",
        color: color || "white"
      },
      children: value
    })]
  });
}
const DEBUG_QUERY_WITH_CONTEXT = `#graphql
  query DebugProductWithContext(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      availableForSale
      selectedOrFirstAvailableVariant {
        id
        availableForSale
        quantityAvailable
        price { amount currencyCode }
      }
      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
        }
      }
    }
  }
`;
const DEBUG_QUERY_WITHOUT_CONTEXT = `#graphql
  query DebugProductWithoutContext($handle: String!) {
    product(handle: $handle) {
      id
      title
      availableForSale
      selectedOrFirstAvailableVariant {
        id
        availableForSale
        quantityAvailable
        price { amount currencyCode }
      }
      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
        }
      }
    }
  }
`;
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__debugAvailability,
  loader: loader$l
}, Symbol.toStringTag, { value: "Module" }));
async function loader$k({
  request,
  context
}) {
  var _a2;
  const url = new URL(request.url);
  const orderRef = url.searchParams.get("ref") ?? "";
  const paymentRef = url.searchParams.get("pf_payment_id") ?? "";
  try {
    const cartData = await context.cart.get();
    const lineIds = (((_a2 = cartData == null ? void 0 : cartData.lines) == null ? void 0 : _a2.nodes) ?? []).map((line) => line.id);
    if (lineIds.length > 0) {
      await context.cart.removeLines(lineIds);
    }
  } catch (err) {
    console.error("[checkout/success] Cart lines removal failed:", err);
  }
  context.session.unset("cartId");
  const cookieHeader = await context.session.commit();
  const headers = new Headers({
    "Set-Cookie": cookieHeader
  });
  return data({
    orderRef,
    paymentRef
  }, {
    headers
  });
}
const _$locale__checkout__success = withComponentProps(function CheckoutSuccess() {
  const {
    orderRef,
    paymentRef
  } = useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    className: "checkout-result-wrapper",
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-result-box",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "checkout-result-icon",
        children: "✓"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
        className: "checkout-result-title",
        children: "Order Confirmed!"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        className: "checkout-result-message",
        children: "Thank you for your order. We have received your payment and will process your order shortly. A confirmation email will be sent to you."
      }), orderRef && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        className: "checkout-result-order-ref",
        children: ["Order ref: ", orderRef]
      }), paymentRef && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        className: "checkout-result-order-ref",
        children: ["Payment ref: ", paymentRef]
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
        href: "/",
        className: "checkout-result-btn",
        children: "Continue Shopping"
      })]
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__checkout__success,
  loader: loader$k
}, Symbol.toStringTag, { value: "Module" }));
async function loader$j({
  context
}) {
  var _a2, _b, _c, _d, _e2, _f, _g;
  const {
    storefront
  } = context;
  const {
    country,
    language
  } = storefront.i18n;
  const checks = [];
  try {
    const {
      shop
    } = await storefront.query(SHOP_QUERY);
    checks.push({
      name: "Storefront API Connectivity",
      status: (shop == null ? void 0 : shop.name) ? "pass" : "fail",
      detail: (shop == null ? void 0 : shop.name) ? `Connected to "${shop.name}" (${(_a2 = shop.primaryDomain) == null ? void 0 : _a2.url})` : "Shop query returned null"
    });
  } catch (e) {
    checks.push({
      name: "Storefront API Connectivity",
      status: "fail",
      detail: `Error: ${e.message}`
    });
  }
  try {
    const {
      products
    } = await storefront.query(PRODUCTS_QUERY, {
      variables: {
        country,
        language
      }
    });
    const product = (_b = products == null ? void 0 : products.nodes) == null ? void 0 : _b[0];
    if (!product) {
      checks.push({
        name: "Product Availability",
        status: "fail",
        detail: "No products found via Storefront API. Check that products are published to the Headless channel."
      });
    } else {
      const price = (_c = product.selectedOrFirstAvailableVariant) == null ? void 0 : _c.price;
      const priceAmount = parseFloat((price == null ? void 0 : price.amount) ?? "0");
      checks.push({
        name: "Product Availability",
        status: "pass",
        detail: `Found "${product.title}" (handle: ${product.handle})`
      });
      checks.push({
        name: `Market Pricing (@inContext country=${country})`,
        status: priceAmount > 0 ? "pass" : "fail",
        detail: priceAmount > 0 ? `Price: ${price.amount} ${price.currencyCode}` : `Price is ${(price == null ? void 0 : price.amount) ?? "null"} ${(price == null ? void 0 : price.currencyCode) ?? ""} - ZA market is likely in DRAFT status. Activate it in Admin > Catalogs.`
      });
      const qty = (_d = product.selectedOrFirstAvailableVariant) == null ? void 0 : _d.quantityAvailable;
      checks.push({
        name: "Inventory Permissions",
        status: qty != null ? "pass" : "warn",
        detail: qty != null ? `quantityAvailable: ${qty}` : 'quantityAvailable is null. Enable "Read inventory of assigned locations" in Admin > Settings > Apps > Headless > Storefront API permissions.'
      });
    }
  } catch (e) {
    checks.push({
      name: "Product Availability",
      status: "fail",
      detail: `Error: ${e.message}`
    });
  }
  try {
    const data2 = await storefront.query(COLLECTION_QUERY);
    const allCollection = data2.collection;
    const collections = ((_e2 = data2.collections) == null ? void 0 : _e2.nodes) ?? [];
    checks.push({
      name: 'Collection "all" Handle',
      status: allCollection ? "pass" : "warn",
      detail: allCollection ? `"all" collection exists (id: ${allCollection.id})` : '"all" collection not found via Storefront API (this is normal - the route uses a fallback query for /collections/all)'
    });
    checks.push({
      name: "Collections Available",
      status: collections.length > 0 ? "pass" : "fail",
      detail: collections.length > 0 ? `${collections.length} collections found: ${collections.map((c2) => c2.handle).join(", ")}` : "No collections found. Check that collections are published to the Headless channel."
    });
  } catch (e) {
    checks.push({
      name: "Collection Availability",
      status: "fail",
      detail: `Error: ${e.message}`
    });
  }
  try {
    const cartData = await context.cart.get();
    if (cartData) {
      const buyerCountry = (_f = cartData.buyerIdentity) == null ? void 0 : _f.countryCode;
      const totalAmount = (_g = cartData.cost) == null ? void 0 : _g.totalAmount;
      checks.push({
        name: "Cart State",
        status: buyerCountry === country ? "pass" : "warn",
        detail: buyerCountry === country ? `Cart exists, buyerIdentity.countryCode=${buyerCountry}, total=${(totalAmount == null ? void 0 : totalAmount.amount) ?? "0"} ${(totalAmount == null ? void 0 : totalAmount.currencyCode) ?? ""}, items=${cartData.totalQuantity ?? 0}` : `Cart exists but buyerIdentity.countryCode=${buyerCountry ?? "none"} (expected ${country}). Reconciliation should fix this on next page load.`
      });
    } else {
      checks.push({
        name: "Cart State",
        status: "pass",
        detail: "No active cart (normal for new sessions). Cart will be created on first add-to-cart."
      });
    }
  } catch (e) {
    checks.push({
      name: "Cart State",
      status: "fail",
      detail: `Error: ${e.message}`
    });
  }
  return {
    checks,
    context: {
      country,
      language
    },
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
const _$locale__integrationTest = withComponentProps(function IntegrationTest() {
  const {
    checks,
    context,
    timestamp
  } = useLoaderData();
  const passCount = checks.filter((c2) => c2.status === "pass").length;
  const failCount = checks.filter((c2) => c2.status === "fail").length;
  const warnCount = checks.filter((c2) => c2.status === "warn").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      padding: "2rem",
      color: "white",
      maxWidth: "900px",
      margin: "0 auto"
    },
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      style: {
        marginBottom: "0.5rem"
      },
      children: "Integration Test Dashboard"
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
      style: {
        color: "#aaa",
        marginBottom: "1.5rem"
      },
      children: ["Context: country=", context.country, ", language=", context.language, " | ", timestamp]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, {
        label: "Pass",
        count: passCount,
        color: "lime"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, {
        label: "Fail",
        count: failCount,
        color: "red"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, {
        label: "Warn",
        count: warnCount,
        color: "orange"
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem"
      },
      children: checks.map((check, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(CheckRow, {
        check
      }, i2))
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        marginTop: "2rem",
        padding: "1rem",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "8px",
        fontSize: "0.85rem",
        color: "#aaa"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        style: {
          marginBottom: "0.5rem",
          color: "white"
        },
        children: "Manual Actions Checklist"
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", {
        style: {
          paddingLeft: "1.2rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          children: 'Activate ZA market: Admin app > Catalogs > click "Activate" next to South Africa'
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          children: 'Enable inventory permission: Settings > Apps > Headless > Storefront API permissions > "Read inventory of assigned locations"'
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          children: "Clear browser cookies for the storefront domain to eliminate stale cart sessions"
        })]
      })]
    })]
  });
});
function StatusBadge({
  label,
  count,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      padding: "0.5rem 1rem",
      background: `rgba(${color === "lime" ? "0,255,0" : color === "red" ? "255,0,0" : "255,165,0"},0.15)`,
      borderRadius: "8px",
      fontWeight: "bold",
      color
    },
    children: [count, " ", label]
  });
}
function CheckRow({
  check
}) {
  const statusIcon = check.status === "pass" ? "✅" : check.status === "fail" ? "❌" : "⚠️";
  const bgColor = check.status === "pass" ? "rgba(0,255,0,0.08)" : check.status === "fail" ? "rgba(255,0,0,0.08)" : "rgba(255,165,0,0.08)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      padding: "0.75rem 1rem",
      background: bgColor,
      borderRadius: "8px",
      borderLeft: `3px solid ${check.status === "pass" ? "lime" : check.status === "fail" ? "red" : "orange"}`
    },
    children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        fontWeight: "bold",
        marginBottom: "0.25rem"
      },
      children: [statusIcon, " ", check.name]
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: {
        fontSize: "0.85rem",
        color: "#ccc"
      },
      children: check.detail
    })]
  });
}
const SHOP_QUERY = `#graphql
  query IntegrationShop {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;
const PRODUCTS_QUERY = `#graphql
  query IntegrationProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 1) {
      nodes {
        id
        title
        handle
        availableForSale
        selectedOrFirstAvailableVariant {
          id
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
const COLLECTION_QUERY = `#graphql
  query IntegrationCollection(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: "all") {
      id
      title
    }
    collections(first: 3) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__integrationTest,
  loader: loader$j
}, Symbol.toStringTag, { value: "Module" }));
function policyHandleToFieldName(handle) {
  return handle.replace(/-([a-z])/g, (_2, m1) => m1.toUpperCase());
}
const meta$4 = ({
  data: data2
}) => {
  var _a2;
  return [{
    title: `${((_a2 = data2 == null ? void 0 : data2.policy) == null ? void 0 : _a2.title) ?? "Policy"} | Hoseworld`
  }];
};
async function loader$i({
  params,
  context
}) {
  var _a2;
  if (!params.handle) {
    throw new Response("No policy handle provided", {
      status: 400
    });
  }
  const policyName = policyHandleToFieldName(params.handle);
  const data2 = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n.language,
      country: context.storefront.i18n.country
    },
    cache: context.storefront.CacheLong()
  });
  const policy = (_a2 = data2.shop) == null ? void 0 : _a2[policyName];
  if (!policy) {
    throw new Response("Policy not found", {
      status: 404
    });
  }
  return {
    policy
  };
}
const _$locale__policies_$handle = withComponentProps(function Policy() {
  const {
    policy
  } = useLoaderData();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.5rem",
    marginBottom: "1.5rem"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: {
        marginBottom: "1rem"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        to: "/policies",
        style: {
          color: "rgba(255, 255, 255, 0.7)",
          textDecoration: "none"
        },
        children: "← Back to Policies"
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: policy.title
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: cardStyle,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        dangerouslySetInnerHTML: {
          __html: policy.body
        },
        style: {
          lineHeight: "1.6"
        }
      })
    })]
  });
});
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) { ...Policy }
      shippingPolicy @include(if: $shippingPolicy) { ...Policy }
      termsOfService @include(if: $termsOfService) { ...Policy }
      refundPolicy @include(if: $refundPolicy) { ...Policy }
    }
  }
`;
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__policies_$handle,
  loader: loader$i,
  meta: meta$4,
  policyHandleToFieldName
}, Symbol.toStringTag, { value: "Module" }));
function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quantity-selector", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "quantity-btn",
        onClick: () => onChange(Math.max(min, quantity - 1)),
        disabled: quantity <= min,
        "aria-label": "Decrease quantity",
        children: "−"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "quantity-display", children: quantity }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "quantity-btn",
        onClick: () => onChange(max ? Math.min(max, quantity + 1) : quantity + 1),
        disabled: max !== void 0 && quantity >= max,
        "aria-label": "Increase quantity",
        children: "+"
      }
    )
  ] });
}
function GalleryThumbnail({
  src,
  alt,
  wrapperClassName = "aspect-square overflow-hidden rounded bg-gray-100"
}) {
  const [failed, setFailed] = reactExports.useState(false);
  if (failed) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    className: wrapperClassName,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", {
      src,
      alt,
      onError: () => setFailed(true),
      className: "w-full h-full object-cover"
    })
  });
}
async function loader$h(args) {
  const {
    params,
    request,
    context
  } = args;
  const {
    handle
  } = params;
  const {
    storefront
  } = context;
  if (!handle) {
    throw new Response("Product handle is required", {
      status: 400
    });
  }
  const selectedOptions = Os(request);
  const {
    product
  } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions
    }
  });
  if (!product) {
    throw new Response("Product not found", {
      status: 404
    });
  }
  return {
    product
  };
}
const _$locale__products_$handle = withComponentProps(function Product() {
  var _a2, _b, _c, _d, _e2, _f, _g, _h;
  const {
    product
  } = useLoaderData();
  const {
    title,
    descriptionHtml,
    featuredImage
  } = product;
  const [quantity, setQuantity] = reactExports.useState(1);
  const dimensions = ((_a2 = product.dimensions) == null ? void 0 : _a2.value) ? JSON.parse(product.dimensions.value) : null;
  const hasDimensions = dimensions && (dimensions.length || dimensions.width || dimensions.height || dimensions.weight);
  const gallerySrcs = getProductGalleryImageSrcs((_b = product.supplierName) == null ? void 0 : _b.value, (_c = product.externalProductId) == null ? void 0 : _c.value);
  const fetcher = useFetcher({
    key: "add-to-cart"
  });
  const {
    open
  } = useAside();
  const prevFetcherState = reactExports.useRef(fetcher.state);
  reactExports.useEffect(() => {
    if (prevFetcherState.current === "loading" && fetcher.state === "idle") {
      open("cart");
    }
    prevFetcherState.current = fetcher.state;
  }, [fetcher.state, open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    style: {
      maxWidth: "80%",
      margin: "0 auto",
      background: "rgba(50, 50, 50, 0.65)",
      padding: "2rem",
      borderRadius: "12px"
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      className: "product max-w-7xl mx-auto px-4 py-8",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "grid md:grid-cols-2 gap-8",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "product-image",
          children: [featuredImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, {
            data: featuredImage,
            sizes: "(min-width: 768px) 50vw, 100vw"
          }) : gallerySrcs[0] && /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryThumbnail, {
            src: gallerySrcs[0],
            alt: title,
            wrapperClassName: "w-full aspect-square overflow-hidden rounded"
          }), gallerySrcs.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
            className: "grid grid-cols-4 gap-2 mt-2",
            children: gallerySrcs.slice(1).map((src) => /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryThumbnail, {
              src,
              alt: title
            }, src))
          })]
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "product-main",
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
            className: "text-3xl font-bold mb-4 text-white",
            children: title
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
            className: "text-white text-xl font-semibold",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductPrice, {
              price: (_d = product.selectedOrFirstAvailableVariant) == null ? void 0 : _d.price,
              compareAtPrice: (_e2 = product.selectedOrFirstAvailableVariant) == null ? void 0 : _e2.compareAtPrice
            })
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
            className: "mt-4 prose text-gray-200",
            dangerouslySetInnerHTML: {
              __html: descriptionHtml
            }
          }), hasDimensions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "mt-4 text-gray-200",
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
              className: "font-semibold mb-2 text-white",
              children: "Specifications"
            }), /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", {
              className: "text-sm space-y-1",
              children: [(dimensions == null ? void 0 : dimensions.length) && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", {
                children: ["Length: ", dimensions.length, " cm"]
              }), (dimensions == null ? void 0 : dimensions.width) && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", {
                children: ["Width: ", dimensions.width, " cm"]
              }), (dimensions == null ? void 0 : dimensions.height) && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", {
                children: ["Height: ", dimensions.height, " cm"]
              }), (dimensions == null ? void 0 : dimensions.weight) && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", {
                children: ["Weight: ", dimensions.weight, " kg"]
              })]
            })]
          }), /* @__PURE__ */ jsxRuntimeExports.jsx(xs, {
            handle: product.handle,
            options: product.options,
            variants: product.adjacentVariants,
            children: ({
              option
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              className: "mt-4",
              children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
                className: "font-semibold mb-2 text-white",
                children: option.name
              }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                className: "flex flex-wrap gap-2",
                children: option.values.map(({
                  value,
                  isAvailable,
                  to: to2,
                  isActive
                }) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
                  href: to2,
                  className: `px-3 py-1 border rounded ${isActive ? "border-white bg-white text-black" : isAvailable ? "border-gray-400 text-gray-200 hover:border-white hover:text-white" : "border-gray-600 text-gray-500 cursor-not-allowed"}`,
                  children: value
                }, value))
              })]
            }, option.name)
          }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "mt-6",
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
              className: "block text-white text-sm font-semibold mb-2",
              children: "Quantity"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx(QuantitySelector, {
              quantity,
              onChange: setQuantity
            })]
          }), /* @__PURE__ */ jsxRuntimeExports.jsxs(fetcher.Form, {
            method: "post",
            action: "/cart",
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "hidden",
              name: re.INPUT_NAME,
              value: JSON.stringify({
                action: re.ACTIONS.LinesAdd,
                inputs: {
                  lines: [{
                    merchandiseId: ((_f = product.selectedOrFirstAvailableVariant) == null ? void 0 : _f.id) ?? "",
                    quantity,
                    selectedVariant: product.selectedOrFirstAvailableVariant ? {
                      ...product.selectedOrFirstAvailableVariant,
                      product: {
                        handle: product.handle,
                        title: product.title,
                        id: product.id,
                        vendor: product.vendor
                      }
                    } : void 0
                  }]
                }
              })
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
              type: "submit",
              className: "mt-4 w-full bg-white text-black py-3 px-6 rounded hover:bg-gray-200 transition font-semibold",
              disabled: !((_g = product.selectedOrFirstAvailableVariant) == null ? void 0 : _g.availableForSale) || fetcher.state !== "idle",
              children: ((_h = product.selectedOrFirstAvailableVariant) == null ? void 0 : _h.availableForSale) ? fetcher.state !== "idle" ? "Adding..." : "Add to Cart" : "Sold Out"
            })]
          })]
        })]
      })
    })
  });
});
const PRODUCT_QUERY = `#graphql
  query Product(
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description
      descriptionHtml
      productType
      tags
      featuredImage {
        url
        altText
        width
        height
      }
      options {
        name
        optionValues {
          name
          swatch {
            color
            image {
              previewImage {
                url
              }
            }
          }
        }
      }
      selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions) {
        id
        title
        availableForSale
        requiresShipping
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
      }
      adjacentVariants(selectedOptions: $selectedOptions) {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
      brand: metafield(namespace: "app", key: "brand") {
        value
      }
      b2cDescription: metafield(namespace: "app", key: "b2c_description") {
        value
      }
      dimensions: metafield(namespace: "app", key: "dimensions") {
        value
      }
      supplierName: metafield(namespace: "app", key: "supplier_name") {
        value
      }
      externalProductId: metafield(namespace: "app", key: "external_product_id") {
        value
      }
    }
  }
`;
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__products_$handle,
  loader: loader$h
}, Symbol.toStringTag, { value: "Module" }));
const meta$3 = () => {
  return [{
    title: "Policies | Hoseworld"
  }];
};
async function loader$g({
  context
}) {
  const data2 = await context.storefront.query(POLICIES_QUERY, {
    variables: {
      language: context.storefront.i18n.language,
      country: context.storefront.i18n.country
    },
    cache: context.storefront.CacheLong()
  });
  const policies = [data2.shop.privacyPolicy, data2.shop.shippingPolicy, data2.shop.termsOfService, data2.shop.refundPolicy, data2.shop.subscriptionPolicy].filter(Boolean);
  if (policies.length === 0) {
    throw new Response("No policies found", {
      status: 404
    });
  }
  return {
    policies
  };
}
const _$locale__policies__index = withComponentProps(function Policies() {
  const {
    policies
  } = useLoaderData();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "0.75rem",
    display: "block",
    color: "white",
    textDecoration: "none"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: "Policies"
    }), policies.map((policy) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, {
      to: `/policies/${policy.handle}`,
      style: cardStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        style: {
          fontSize: "1.1rem"
        },
        children: policy.title
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        style: {
          float: "right",
          color: "rgba(255, 255, 255, 0.5)"
        },
        children: "→"
      })]
    }, policy.handle))]
  });
});
const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy { ...PolicyItem }
      shippingPolicy { ...PolicyItem }
      termsOfService { ...PolicyItem }
      refundPolicy { ...PolicyItem }
      subscriptionPolicy { id title handle }
    }
  }
`;
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__policies__index,
  loader: loader$g,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
async function loader$f({
  request,
  params,
  context: {
    storefront
  }
}) {
  const response = await oi({
    storefront,
    request,
    params,
    locales: ["EN-ZA", "EN-NZ", "EN-AU", "EN-US"],
    getLink: ({
      type,
      baseUrl,
      handle,
      locale
    }) => {
      const localePrefix = locale ? `/${locale.toLowerCase()}` : "";
      return `${baseUrl}${localePrefix}/${type}/${handle}`;
    }
  });
  response.headers.set("Cache-Control", "max-age=86400");
  return response;
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$f
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = ({
  data: data2
}) => {
  var _a2, _b, _c;
  return [{
    title: ((_b = (_a2 = data2 == null ? void 0 : data2.page) == null ? void 0 : _a2.seo) == null ? void 0 : _b.title) || ((_c = data2 == null ? void 0 : data2.page) == null ? void 0 : _c.title) || "Page"
  }];
};
async function loader$e({
  params,
  context
}) {
  if (!params.handle) {
    throw new Response("No page handle provided", {
      status: 400
    });
  }
  if (params.handle === "contact") {
    const locale = context.storefront.i18n;
    const prefix = locale.pathPrefix || "";
    throw redirect(`${prefix}/contact`);
  }
  const {
    page
  } = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
      language: context.storefront.i18n.language,
      country: context.storefront.i18n.country
    },
    cache: context.storefront.CacheLong()
  });
  if (!page) {
    throw new Response("Page not found", {
      status: 404
    });
  }
  return {
    page
  };
}
const _$locale__pages_$handle = withComponentProps(function Page() {
  const {
    page
  } = useLoaderData();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.5rem",
    marginBottom: "1.5rem"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: page.title
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: cardStyle,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        dangerouslySetInnerHTML: {
          __html: page.body
        },
        style: {
          lineHeight: "1.6"
        }
      })
    })]
  });
});
const PAGE_QUERY = `#graphql
  query Page(
    $handle: String!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      handle
      seo {
        title
        description
      }
    }
  }
`;
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__pages_$handle,
  loader: loader$e,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const CUSTOMER_FRAGMENT = `#graphql
  fragment Customer on Customer {
    id
    firstName
    lastName
    emailAddress {
      emailAddress
    }
    defaultAddress {
      ...Address
    }
    addresses(first: 6) {
      nodes {
        ...Address
      }
    }
  }
  fragment Address on CustomerAddress {
    id
    formatted
    firstName
    lastName
    company
    address1
    address2
    territoryCode
    zoneCode
    city
    zip
    phoneNumber
  }
`;
const CUSTOMER_DETAILS_QUERY = `#graphql
  query CustomerDetails($language: LanguageCode) @inContext(language: $language) {
    customer {
      ...Customer
    }
  }
  ${CUSTOMER_FRAGMENT}
`;
async function loader$d({
  context
}) {
  var _a2, _b;
  const {
    cart,
    storefront,
    customerAccount
  } = context;
  const expectedCountry = storefront.i18n.country;
  let cartData = await cart.get();
  if (cartData) {
    const currentCountry = (_a2 = cartData.buyerIdentity) == null ? void 0 : _a2.countryCode;
    if (!currentCountry || currentCountry !== expectedCountry) {
      console.log(`[checkout-loader] Syncing buyerIdentity: ${currentCountry ?? "none"} -> ${expectedCountry}`);
      await cart.updateBuyerIdentity({
        countryCode: expectedCountry
      });
      cartData = await cart.get();
    }
  }
  if (!cartData || !cartData.totalQuantity) {
    throw redirect("/cart");
  }
  let customer = null;
  let businessProfile = {
    companyName: "",
    regNumber: "",
    vatNumber: ""
  };
  try {
    const isLoggedIn = await customerAccount.isLoggedIn();
    if (isLoggedIn) {
      const {
        data: accountData
      } = await customerAccount.query(CUSTOMER_DETAILS_QUERY);
      customer = accountData.customer;
      const env = context.env;
      const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
      const internalSecret = env.INTERNAL_API_SECRET ?? "";
      const email = ((_b = customer == null ? void 0 : customer.emailAddress) == null ? void 0 : _b.emailAddress) ?? "";
      if (storefrontUiUrl && email) {
        try {
          const bpRes = await fetch(`${storefrontUiUrl}/api/customer/business?email=${encodeURIComponent(email)}`, {
            headers: {
              "X-Internal-Secret": internalSecret
            }
          });
          if (bpRes.ok) {
            businessProfile = await bpRes.json();
          }
        } catch {
        }
      }
    }
  } catch {
  }
  const paymentGateway = context.env.PUBLIC_PAYMENT_GATEWAY ?? "shopify";
  return {
    cart: cartData,
    customer,
    paymentGateway,
    businessProfile
  };
}
async function action$8({
  request,
  context
}) {
  var _a2, _b, _c, _d;
  const {
    cart
  } = context;
  const formData = await request.formData();
  const step = formData.get("step");
  let result;
  if (step === "customer-info") {
    const email = formData.get("email");
    const phone = formData.get("phone");
    const url = new URL(request.url);
    const pathPrefix = `/${((_a2 = url.pathname.split("/")[1]) == null ? void 0 : _a2.toLowerCase()) ?? ""}`;
    const localeCountryMap = {
      "/en-za": "ZA",
      "/en-nz": "NZ",
      "/en-au": "AU",
      "/en-us": "US"
    };
    const countryCode = localeCountryMap[pathPrefix] ?? "ZA";
    result = await cart.updateBuyerIdentity({
      email,
      phone: phone || void 0,
      countryCode
    });
    const isBusinessCustomer = formData.get("isBusinessCustomer") === "true";
    if (isBusinessCustomer && email) {
      const env = context.env;
      const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
      const internalSecret = env.INTERNAL_API_SECRET ?? "";
      if (storefrontUiUrl) {
        const companyName = formData.get("companyName") || "";
        const regNumber = formData.get("regNumber") || "";
        const vatNumber = formData.get("vatNumber") || "";
        try {
          let shopifyCustomerId = "";
          try {
            const isLoggedIn = await context.customerAccount.isLoggedIn();
            if (isLoggedIn) {
              const {
                data: idData
              } = await context.customerAccount.query(`#graphql query { customer { id } }`);
              shopifyCustomerId = ((_b = idData == null ? void 0 : idData.customer) == null ? void 0 : _b.id) ?? "";
            }
          } catch {
          }
          await fetch(`${storefrontUiUrl}/api/customer/business`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Internal-Secret": internalSecret
            },
            body: JSON.stringify({
              shopifyCustomerId,
              email,
              companyName,
              regNumber,
              vatNumber
            })
          });
        } catch {
        }
      }
    }
  } else if (step === "shipping-address") {
    const rawCountryCode = (_c = formData.get("countryCode")) == null ? void 0 : _c.trim().toUpperCase();
    const countryCode = /^[A-Z]{2}$/.test(rawCountryCode) ? rawCountryCode : null;
    if (!countryCode) {
      return data({
        step,
        success: false,
        errors: [{
          message: "Please select a valid country."
        }]
      }, {
        status: 422
      });
    }
    result = await cart.addDeliveryAddresses([{
      address: {
        deliveryAddress: {
          address1: formData.get("address1"),
          address2: formData.get("address2") || void 0,
          city: formData.get("city"),
          provinceCode: formData.get("provinceCode") || void 0,
          zip: formData.get("zip"),
          countryCode,
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          phone: formData.get("phone") || void 0
        }
      },
      selected: true
    }]);
  } else {
    return data({
      error: "Invalid step"
    }, {
      status: 400
    });
  }
  const userErrors = (result == null ? void 0 : result.userErrors) || [];
  if (userErrors.length > 0) {
    return data({
      step,
      success: false,
      errors: userErrors
    }, {
      status: 422
    });
  }
  const cartId = (_d = result == null ? void 0 : result.cart) == null ? void 0 : _d.id;
  const headers = cartId ? cart.setCartId(cartId) : new Headers();
  return data({
    step,
    success: true
  }, {
    status: 200,
    headers
  });
}
const _$locale__checkout = withComponentProps(function Checkout() {
  var _a2, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o2, _p, _q, _r2, _s2, _t2;
  const {
    cart,
    customer,
    paymentGateway,
    businessProfile
  } = useLoaderData();
  const fetcher = useFetcher({
    key: "checkout-step"
  });
  const revalidator = useRevalidator();
  const pendingStep3 = reactExports.useRef(false);
  const location2 = useLocation();
  const localeMatch = location2.pathname.match(/^\/(en-nz|en-au|en-us|en-za)/);
  const localePrefix = localeMatch ? localeMatch[0] : "";
  const defaultCountry = ((_b = (_a2 = localeMatch == null ? void 0 : localeMatch[1]) == null ? void 0 : _a2.split("-")[1]) == null ? void 0 : _b.toUpperCase()) ?? "ZA";
  const actionUrl = `${localePrefix}/checkout`;
  const isPreFilled = Boolean(((_c = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _c.address1) || (customer == null ? void 0 : customer.firstName));
  const isGuest = !customer;
  const requiresConfirm = isPreFilled || isGuest;
  const [prefillConfirmed, setPrefillConfirmed] = reactExports.useState(!requiresConfirm);
  const [currentStep, setCurrentStep] = reactExports.useState(1);
  const [invoiceEmailRequested, setInvoiceEmailRequested] = reactExports.useState(false);
  const [businessCustomer, setBusinessCustomer] = reactExports.useState(!!((businessProfile == null ? void 0 : businessProfile.companyName) || (businessProfile == null ? void 0 : businessProfile.regNumber) || (businessProfile == null ? void 0 : businessProfile.vatNumber)));
  const [businessDetails, setBusinessDetails] = reactExports.useState({
    companyName: (businessProfile == null ? void 0 : businessProfile.companyName) ?? "",
    vatNumber: (businessProfile == null ? void 0 : businessProfile.vatNumber) ?? "",
    regNumber: (businessProfile == null ? void 0 : businessProfile.regNumber) ?? ""
  });
  const [customerInfo, setCustomerInfo] = reactExports.useState({
    email: ((_d = cart.buyerIdentity) == null ? void 0 : _d.email) || ((_e2 = customer == null ? void 0 : customer.emailAddress) == null ? void 0 : _e2.emailAddress) || "",
    firstName: ((_g = (_f = cart.buyerIdentity) == null ? void 0 : _f.customer) == null ? void 0 : _g.firstName) || (customer == null ? void 0 : customer.firstName) || "",
    lastName: ((_i = (_h = cart.buyerIdentity) == null ? void 0 : _h.customer) == null ? void 0 : _i.lastName) || (customer == null ? void 0 : customer.lastName) || "",
    phone: ((_j = cart.buyerIdentity) == null ? void 0 : _j.phone) || ((_k = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _k.phoneNumber) || ""
  });
  const [shippingAddress, setShippingAddress] = reactExports.useState({
    firstName: ((_l = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _l.firstName) || "",
    lastName: ((_m = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _m.lastName) || "",
    address1: ((_n = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _n.address1) || "",
    address2: ((_o2 = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _o2.address2) || "",
    city: ((_p = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _p.city) || "",
    provinceCode: ((_q = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _q.zoneCode) || "",
    zip: ((_r2 = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _r2.zip) || "",
    countryCode: (() => {
      var _a3;
      const raw = ((_a3 = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _a3.territoryCode) || defaultCountry;
      return /^[A-Z]{2}$/.test(raw) ? raw : defaultCountry;
    })(),
    phone: ((_s2 = customer == null ? void 0 : customer.defaultAddress) == null ? void 0 : _s2.phoneNumber) || ""
  });
  reactExports.useEffect(() => {
    if (!shippingAddress.countryCode) {
      setShippingAddress((prev) => ({
        ...prev,
        countryCode: defaultCountry
      }));
    }
  }, [defaultCountry, shippingAddress.countryCode]);
  reactExports.useEffect(() => {
    var _a3, _b2;
    if (((_a3 = fetcher.data) == null ? void 0 : _a3.success) && fetcher.data.step === "shipping-address") {
      pendingStep3.current = true;
      revalidator.revalidate();
    } else if (((_b2 = fetcher.data) == null ? void 0 : _b2.success) && fetcher.data.step === "customer-info") {
      setCurrentStep(2);
    }
  }, [fetcher.data]);
  reactExports.useEffect(() => {
    if (revalidator.state === "idle" && pendingStep3.current) {
      pendingStep3.current = false;
      setCurrentStep(3);
    }
  }, [revalidator.state]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    className: "checkout-wrapper",
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-container",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
        className: "checkout-title",
        children: "Checkout"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, {
        currentStep
      }), ((_t2 = fetcher.data) == null ? void 0 : _t2.errors) && fetcher.data.errors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "checkout-errors",
        children: fetcher.data.errors.map((err, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
          children: err.message
        }, i2))
      }), currentStep === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerInfoStep, {
        customerInfo,
        isPreFilled,
        isGuest,
        prefillConfirmed,
        onPrefillConfirm: setPrefillConfirmed,
        onFieldChange: (field, value) => setCustomerInfo((prev) => ({
          ...prev,
          [field]: value
        })),
        businessCustomer,
        onBusinessCustomerChange: setBusinessCustomer,
        businessDetails,
        onBusinessDetailChange: (field, value) => setBusinessDetails((prev) => ({
          ...prev,
          [field]: value
        })),
        fetcher,
        actionUrl
      }), currentStep === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(ShippingAddressStep, {
        shippingAddress,
        onFieldChange: (field, value) => setShippingAddress((prev) => ({
          ...prev,
          [field]: value
        })),
        onBack: () => setCurrentStep(1),
        fetcher,
        actionUrl
      }), currentStep === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(ShippingMethodStep, {
        deliveryGroups: cart.deliveryGroups,
        localePrefix,
        onBack: () => setCurrentStep(2),
        onContinue: () => setCurrentStep(4)
      }), currentStep === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(OrderReviewStep, {
        cart,
        customerInfo,
        shippingAddress,
        paymentGateway,
        localePrefix,
        invoiceEmailRequested,
        onInvoiceEmailChange: setInvoiceEmailRequested,
        businessCustomer,
        businessDetails,
        onBack: () => setCurrentStep(3)
      })]
    })
  });
});
function StepIndicator({
  currentStep
}) {
  const steps = [{
    num: 1,
    label: "Information"
  }, {
    num: 2,
    label: "Shipping"
  }, {
    num: 3,
    label: "Method"
  }, {
    num: 4,
    label: "Review & Pay"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    className: "checkout-steps",
    children: steps.map((step, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-step-item",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: `checkout-step-circle ${currentStep >= step.num ? "active" : ""}`,
        children: step.num
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        className: `checkout-step-label ${currentStep >= step.num ? "active" : ""}`,
        children: step.label
      }), i2 < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "checkout-step-line"
      })]
    }, step.num))
  });
}
function formatRegNumber(value) {
  if (/^[a-zA-Z]/.test(value)) return value;
  if (/^\d{4}\/\d{6}\/\d{2}$/.test(value)) return value;
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 4) return digits;
  if (digits.length <= 10) return `${digits.slice(0, 4)}/${digits.slice(4)}`;
  return `${digits.slice(0, 4)}/${digits.slice(4, 10)}/${digits.slice(10, 12)}`;
}
function CustomerInfoStep({
  customerInfo,
  isPreFilled,
  isGuest,
  prefillConfirmed,
  onPrefillConfirm,
  onFieldChange,
  businessCustomer,
  onBusinessCustomerChange,
  businessDetails,
  onBusinessDetailChange,
  fetcher,
  actionUrl
}) {
  const isSubmitting = fetcher.state !== "idle";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(fetcher.Form, {
    method: "post",
    action: actionUrl,
    className: "checkout-form",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "step",
      value: "customer-info"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "isBusinessCustomer",
      value: businessCustomer ? "true" : "false"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      className: "checkout-section-title",
      children: "Contact Information"
    }), isPreFilled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-prefill-notice",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: "Your details have been pre-filled from your account. Please verify they are correct before continuing."
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("label", {
        className: "checkout-prefill-confirm-label",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "checkbox",
          checked: prefillConfirmed,
          onChange: (e) => onPrefillConfirm(e.target.checked)
        }), "I confirm these details are correct"]
      })]
    }), isGuest && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-prefill-notice",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: "You are checking out as a guest. A customer account will be created using the details below. Please confirm they are correct before continuing."
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("label", {
        className: "checkout-prefill-confirm-label",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "checkbox",
          checked: prefillConfirmed,
          onChange: (e) => onPrefillConfirm(e.target.checked)
        }), "I confirm my details are correct and agree to have an account created"]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "email",
        className: "checkout-form-label",
        children: "Email"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "email",
        name: "email",
        type: "email",
        required: true,
        className: "checkout-form-input",
        value: customerInfo.email,
        onChange: (e) => onFieldChange("email", e.target.value),
        placeholder: "your@email.com"
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form-row",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "firstName",
          className: "checkout-form-label",
          children: "First Name"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "firstName",
          name: "firstName",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: customerInfo.firstName,
          onChange: (e) => onFieldChange("firstName", e.target.value)
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "lastName",
          className: "checkout-form-label",
          children: "Last Name"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "lastName",
          name: "lastName",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: customerInfo.lastName,
          onChange: (e) => onFieldChange("lastName", e.target.value)
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "phone",
        className: "checkout-form-label",
        children: "Phone (optional)"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "phone",
        name: "phone",
        type: "tel",
        className: "checkout-form-input",
        value: customerInfo.phone,
        onChange: (e) => onFieldChange("phone", e.target.value),
        placeholder: "+27 82 000 0000"
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      className: "checkout-form-field",
      style: {
        marginTop: "0.75rem"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", {
        className: "checkout-prefill-confirm-label",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "checkbox",
          checked: businessCustomer,
          onChange: (e) => onBusinessCustomerChange(e.target.checked)
        }), "This order is for a business"]
      })
    }), businessCustomer && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "companyName",
          className: "checkout-form-label",
          children: "Company name"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "companyName",
          name: "companyName",
          type: "text",
          className: "checkout-form-input",
          value: businessDetails.companyName,
          onChange: (e) => onBusinessDetailChange("companyName", e.target.value),
          placeholder: "e.g. Acme (Pty) Ltd"
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "vatNumber",
          className: "checkout-form-label",
          children: "TAX/VAT No (SARS VAT Number)"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "vatNumber",
          name: "vatNumber",
          type: "text",
          className: "checkout-form-input",
          value: businessDetails.vatNumber,
          onChange: (e) => onBusinessDetailChange("vatNumber", e.target.value),
          placeholder: "4XXXXXXXXX"
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "regNumber",
          className: "checkout-form-label",
          children: "Reg No (Business Registration Number)"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "regNumber",
          name: "regNumber",
          type: "text",
          className: "checkout-form-input",
          value: businessDetails.regNumber,
          onChange: (e) => onBusinessDetailChange("regNumber", formatRegNumber(e.target.value)),
          placeholder: "XXXX/XXXXXX/XX"
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
      type: "submit",
      className: "checkout-submit-btn",
      disabled: isSubmitting || (isPreFilled || isGuest) && !prefillConfirmed,
      children: isSubmitting ? "Saving..." : "Continue to Shipping →"
    })]
  });
}
function ShippingAddressStep({
  shippingAddress,
  onFieldChange,
  onBack,
  fetcher,
  actionUrl
}) {
  const isSubmitting = fetcher.state !== "idle";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(fetcher.Form, {
    method: "post",
    action: actionUrl,
    className: "checkout-form",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "step",
      value: "shipping-address"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      className: "checkout-section-title",
      children: "Shipping Address"
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form-row",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "ship-firstName",
          className: "checkout-form-label",
          children: "First Name"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "ship-firstName",
          name: "firstName",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.firstName,
          onChange: (e) => onFieldChange("firstName", e.target.value)
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "ship-lastName",
          className: "checkout-form-label",
          children: "Last Name"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "ship-lastName",
          name: "lastName",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.lastName,
          onChange: (e) => onFieldChange("lastName", e.target.value)
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "address1",
        className: "checkout-form-label",
        children: "Address"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "address1",
        name: "address1",
        type: "text",
        required: true,
        className: "checkout-form-input",
        value: shippingAddress.address1,
        onChange: (e) => onFieldChange("address1", e.target.value)
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "address2",
        className: "checkout-form-label",
        children: "Apartment, suite, etc. (optional)"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "address2",
        name: "address2",
        type: "text",
        className: "checkout-form-input",
        value: shippingAddress.address2,
        onChange: (e) => onFieldChange("address2", e.target.value)
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form-row",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "city",
          className: "checkout-form-label",
          children: "City"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "city",
          name: "city",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.city,
          onChange: (e) => onFieldChange("city", e.target.value)
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "provinceCode",
          className: "checkout-form-label",
          children: "Province / State"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "provinceCode",
          name: "provinceCode",
          type: "text",
          className: "checkout-form-input",
          value: shippingAddress.provinceCode,
          onChange: (e) => onFieldChange("provinceCode", e.target.value)
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form-row",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "zip",
          className: "checkout-form-label",
          children: "Postal / Zip Code"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "zip",
          name: "zip",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.zip,
          onChange: (e) => onFieldChange("zip", e.target.value)
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "countryCode",
          className: "checkout-form-label",
          children: "Country"
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("select", {
          id: "countryCode",
          name: "countryCode",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.countryCode,
          onChange: (e) => onFieldChange("countryCode", e.target.value),
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "ZA",
            children: "South Africa (ZA)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "AU",
            disabled: true,
            children: "Australia (AU)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "BW",
            disabled: true,
            children: "Botswana (BW)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "CA",
            disabled: true,
            children: "Canada (CA)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "GB",
            disabled: true,
            children: "United Kingdom (GB)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "LS",
            disabled: true,
            children: "Lesotho (LS)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "MW",
            disabled: true,
            children: "Malawi (MW)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "MZ",
            disabled: true,
            children: "Mozambique (MZ)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "NA",
            disabled: true,
            children: "Namibia (NA)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "NZ",
            disabled: true,
            children: "New Zealand (NZ)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "SZ",
            disabled: true,
            children: "Eswatini (SZ)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "TZ",
            disabled: true,
            children: "Tanzania (TZ)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "US",
            disabled: true,
            children: "United States (US)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "ZM",
            disabled: true,
            children: "Zambia (ZM)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
            value: "ZW",
            disabled: true,
            children: "Zimbabwe (ZW)"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "ship-phone",
        className: "checkout-form-label",
        children: "Phone (optional)"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "ship-phone",
        name: "phone",
        type: "tel",
        className: "checkout-form-input",
        value: shippingAddress.phone,
        onChange: (e) => onFieldChange("phone", e.target.value)
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-nav-buttons",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("button", {
        type: "button",
        className: "checkout-back-btn",
        onClick: onBack,
        children: "← Back"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
        type: "submit",
        className: "checkout-submit-btn",
        disabled: isSubmitting,
        children: isSubmitting ? "Saving..." : "Continue to Shipping Method →"
      })]
    })]
  });
}
function ShippingMethodStep({
  deliveryGroups,
  localePrefix,
  onBack,
  onContinue
}) {
  var _a2, _b, _c;
  const shippingFetcher = useFetcher({
    key: "shipping-method"
  });
  const group = (_a2 = deliveryGroups == null ? void 0 : deliveryGroups.nodes) == null ? void 0 : _a2[0];
  const options = (group == null ? void 0 : group.deliveryOptions) ?? [];
  const [selectedHandle, setSelectedHandle] = reactExports.useState(((_b = group == null ? void 0 : group.selectedDeliveryOption) == null ? void 0 : _b.handle) ?? ((_c = options[0]) == null ? void 0 : _c.handle) ?? null);
  reactExports.useEffect(() => {
    if (!selectedHandle && options.length > 0 && group) {
      const handle = options[0].handle;
      setSelectedHandle(handle);
      shippingFetcher.submit({
        [re.INPUT_NAME]: JSON.stringify({
          action: re.ACTIONS.SelectedDeliveryOptionsUpdate,
          inputs: {
            selectedDeliveryOptions: [{
              deliveryGroupId: group.id,
              deliveryOptionHandle: handle
            }]
          }
        })
      }, {
        method: "POST",
        action: `${localePrefix}/cart`
      });
    }
  }, []);
  if (options.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-form",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
        className: "checkout-section-title",
        children: "Shipping Method"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "checkout-shipping-empty",
        children: "No shipping options are currently available for your address. Please contact us for assistance."
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-nav-buttons",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          type: "button",
          className: "checkout-back-btn",
          onClick: onBack,
          children: "← Back"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          type: "button",
          className: "checkout-submit-btn",
          onClick: onContinue,
          children: "Continue to Review →"
        })]
      })]
    });
  }
  function handleSelect(option) {
    if (!group) return;
    setSelectedHandle(option.handle);
    shippingFetcher.submit({
      [re.INPUT_NAME]: JSON.stringify({
        action: re.ACTIONS.SelectedDeliveryOptionsUpdate,
        inputs: {
          selectedDeliveryOptions: [{
            deliveryGroupId: group.id,
            deliveryOptionHandle: option.handle
          }]
        }
      })
    }, {
      method: "POST",
      action: `${localePrefix}/cart`
    });
  }
  const isFree = (amount) => parseFloat(amount) === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "checkout-form",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      className: "checkout-section-title",
      children: "Shipping Method"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      className: "checkout-shipping-options",
      children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", {
        className: "checkout-shipping-option",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "radio",
          name: "delivery",
          value: option.handle,
          checked: selectedHandle === option.handle,
          onChange: () => handleSelect(option)
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          className: "checkout-shipping-option-label",
          children: option.title
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          className: `checkout-shipping-option-cost ${isFree(option.estimatedCost.amount) ? "checkout-shipping-option-free" : ""}`,
          children: isFree(option.estimatedCost.amount) ? "Free" : /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
            data: option.estimatedCost
          })
        })]
      }, option.handle))
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-nav-buttons",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("button", {
        type: "button",
        className: "checkout-back-btn",
        onClick: onBack,
        children: "← Back"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
        type: "button",
        className: "checkout-submit-btn",
        onClick: onContinue,
        disabled: !selectedHandle || shippingFetcher.state !== "idle",
        children: shippingFetcher.state !== "idle" ? "Updating..." : "Continue to Review →"
      })]
    })]
  });
}
function OrderReviewStep({
  cart,
  customerInfo,
  shippingAddress,
  paymentGateway,
  localePrefix,
  invoiceEmailRequested,
  onInvoiceEmailChange,
  businessCustomer,
  businessDetails,
  onBack
}) {
  var _a2, _b, _c, _d, _e2;
  const deliveryGroup = (_b = (_a2 = cart.deliveryGroups) == null ? void 0 : _a2.nodes) == null ? void 0 : _b[0];
  const selectedDelivery = deliveryGroup == null ? void 0 : deliveryGroup.selectedDeliveryOption;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "checkout-review",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      className: "checkout-section-title",
      children: "Order Review"
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        children: "Contact"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: customerInfo.email
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        children: [customerInfo.firstName, " ", customerInfo.lastName]
      }), customerInfo.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: customerInfo.phone
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        children: "Ship to"
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        children: [shippingAddress.firstName, " ", shippingAddress.lastName]
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: shippingAddress.address1
      }), shippingAddress.address2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: shippingAddress.address2
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        children: [shippingAddress.city, shippingAddress.provinceCode && `, ${shippingAddress.provinceCode}`, " ", shippingAddress.zip]
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: shippingAddress.countryCode
      })]
    }), selectedDelivery && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        children: "Shipping Method"
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        children: [selectedDelivery.title, " — ", parseFloat(selectedDelivery.estimatedCost.amount) === 0 ? "Free" : /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
          data: selectedDelivery.estimatedCost
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        children: "Items"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("ul", {
        className: "checkout-review-items",
        children: (((_c = cart.lines) == null ? void 0 : _c.nodes) ?? []).map((line) => {
          const merchandise = line.merchandise;
          if (!("product" in merchandise)) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", {
            className: "checkout-review-line",
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("div", {
              className: "checkout-review-line-image",
              children: merchandise.image && /* @__PURE__ */ jsxRuntimeExports.jsx(Image, {
                data: merchandise.image,
                width: 60,
                height: 60
              })
            }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              className: "checkout-review-line-details",
              children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                className: "checkout-review-line-title",
                children: merchandise.product.title
              }), merchandise.title !== "Default Title" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                className: "checkout-review-line-variant",
                children: merchandise.title
              }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
                className: "checkout-review-line-qty",
                children: ["Qty: ", line.quantity]
              })]
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
              className: "checkout-review-line-price",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
                data: line.cost.totalAmount
              })
            })]
          }, line.id);
        })
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-review-section checkout-review-totals",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-review-total-row",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          children: "Subtotal"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          children: ((_d = cart.cost) == null ? void 0 : _d.subtotalAmount) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
            data: cart.cost.subtotalAmount
          }) : "-"
        })]
      }), selectedDelivery && parseFloat(selectedDelivery.estimatedCost.amount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-review-total-row",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          children: "Shipping"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
            data: selectedDelivery.estimatedCost
          })
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-review-total-row checkout-review-grand-total",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          children: "Total"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          children: ((_e2 = cart.cost) == null ? void 0 : _e2.totalAmount) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
            data: cart.cost.totalAmount
          }) : "-"
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        children: "Discounts & Gift Cards"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutDiscounts, {
        cart,
        localePrefix
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutGiftCard, {
        cart,
        localePrefix
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-review-section checkout-payment-info",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        children: "Payment"
      }), paymentGateway === "payfast" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: "You will be redirected to PayFast to complete your payment securely."
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: "You will be redirected to our secure payment page to complete your order."
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "checkout-payment-methods",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          className: "checkout-payment-badge",
          children: "Card"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          className: "checkout-payment-badge",
          children: "EFT"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          className: "checkout-payment-badge",
          children: "Google Pay"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          className: "checkout-payment-badge",
          children: "Apple Pay"
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-review-section",
      style: {
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "1rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("label", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: "0.6rem",
          cursor: "pointer",
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.85)"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "checkbox",
          checked: invoiceEmailRequested,
          onChange: (e) => onInvoiceEmailChange(e.target.checked),
          style: {
            marginTop: "2px",
            flexShrink: 0
          }
        }), "Email me a tax invoice for this order"]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        style: {
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.5)",
          marginTop: "0.75rem",
          lineHeight: "1.5"
        },
        children: ["By proceeding you agree to our", " ", /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
          href: "/policies/terms-of-service",
          target: "_blank",
          rel: "noreferrer",
          style: {
            color: "rgba(26,180,215,0.9)",
            textDecoration: "underline"
          },
          children: "Terms & Conditions"
        }), " ", "and", " ", /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
          href: "/policies/refund-policy",
          target: "_blank",
          rel: "noreferrer",
          style: {
            color: "rgba(26,180,215,0.9)",
            textDecoration: "underline"
          },
          children: "Return Policy"
        }), "."]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-nav-buttons",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("button", {
        type: "button",
        className: "checkout-back-btn",
        onClick: onBack,
        children: "← Back"
      }), paymentGateway === "payfast" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PayFastPaymentForm, {
        cart,
        customerInfo,
        shippingAddress,
        localePrefix,
        invoiceEmailRequested,
        businessCustomer,
        businessDetails
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
        href: cart.checkoutUrl,
        target: "_self",
        className: "checkout-pay-btn",
        children: "Proceed to Payment →"
      })]
    })]
  });
}
function CheckoutDiscounts({
  cart,
  localePrefix
}) {
  const codes = (cart.discountCodes ?? []).filter((d) => d.applicable).map((d) => d.code);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      marginBottom: "0.75rem"
    },
    children: [codes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: {
        marginBottom: "0.5rem"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(re, {
        route: `${localePrefix}/cart`,
        action: re.ACTIONS.DiscountCodesUpdate,
        inputs: {
          discountCodes: []
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("code", {
            style: {
              background: "rgba(255,255,255,0.1)",
              padding: "2px 8px",
              borderRadius: "4px"
            },
            children: codes.join(", ")
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            type: "submit",
            style: {
              background: "none",
              border: "none",
              color: "rgba(255,100,100,0.8)",
              cursor: "pointer",
              fontSize: "0.8rem",
              textDecoration: "underline",
              padding: 0
            },
            children: "Remove"
          })]
        })
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(re, {
      route: `${localePrefix}/cart`,
      action: re.ACTIONS.DiscountCodesUpdate,
      inputs: {
        discountCodes: codes
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          gap: "0.5rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "text",
          name: "discountCode",
          placeholder: "Discount code",
          className: "checkout-form-input",
          style: {
            flex: 1,
            margin: 0
          }
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          type: "submit",
          className: "checkout-back-btn",
          style: {
            margin: 0,
            whiteSpace: "nowrap"
          },
          children: "Apply"
        })]
      })
    })]
  });
}
function CheckoutGiftCard({
  cart,
  localePrefix
}) {
  const appliedCards = cart.appliedGiftCards ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [appliedCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: {
        marginBottom: "0.5rem"
      },
      children: appliedCards.map((gc) => /* @__PURE__ */ jsxRuntimeExports.jsx(re, {
        route: `${localePrefix}/cart`,
        action: re.ACTIONS.GiftCardCodesRemove,
        inputs: {
          giftCardCodes: [gc.id]
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            marginBottom: "0.25rem"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("code", {
            style: {
              background: "rgba(255,255,255,0.1)",
              padding: "2px 8px",
              borderRadius: "4px"
            },
            children: ["***", gc.lastCharacters]
          }), /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
            data: gc.amountUsed
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            type: "submit",
            style: {
              background: "none",
              border: "none",
              color: "rgba(255,100,100,0.8)",
              cursor: "pointer",
              fontSize: "0.8rem",
              textDecoration: "underline",
              padding: 0
            },
            children: "Remove"
          })]
        })
      }, gc.id))
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(re, {
      route: `${localePrefix}/cart`,
      action: re.ACTIONS.GiftCardCodesAdd,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          gap: "0.5rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "text",
          name: "giftCardCode",
          placeholder: "Gift card code",
          className: "checkout-form-input",
          style: {
            flex: 1,
            margin: 0
          }
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          type: "submit",
          className: "checkout-back-btn",
          style: {
            margin: 0,
            whiteSpace: "nowrap"
          },
          children: "Apply"
        })]
      })
    })]
  });
}
function PayFastPaymentForm({
  cart,
  customerInfo,
  shippingAddress,
  localePrefix,
  invoiceEmailRequested,
  businessCustomer,
  businessDetails
}) {
  var _a2, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o2;
  const payFetcher = useFetcher({
    key: "payfast-initiate"
  });
  const isSubmitting = payFetcher.state !== "idle";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(payFetcher.Form, {
    method: "post",
    action: `${localePrefix}/checkout/payment`,
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "cartId",
      value: cart.id
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "cartTotal",
      value: ((_b = (_a2 = cart.cost) == null ? void 0 : _a2.totalAmount) == null ? void 0 : _b.amount) ?? "0"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "cartCurrency",
      value: ((_d = (_c = cart.cost) == null ? void 0 : _c.totalAmount) == null ? void 0 : _d.currencyCode) ?? "ZAR"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "email",
      value: customerInfo.email
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "firstName",
      value: customerInfo.firstName
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "lastName",
      value: customerInfo.lastName
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "phone",
      value: customerInfo.phone
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "shipAddress1",
      value: shippingAddress.address1
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "shipAddress2",
      value: shippingAddress.address2
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "shipCity",
      value: shippingAddress.city
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "shipProvince",
      value: shippingAddress.provinceCode
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "shipZip",
      value: shippingAddress.zip
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "shipCountry",
      value: shippingAddress.countryCode
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "invoiceEmailRequested",
      value: invoiceEmailRequested ? "true" : "false"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "isBusinessCustomer",
      value: businessCustomer ? "true" : "false"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "companyName",
      value: businessDetails.companyName
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "vatNumber",
      value: businessDetails.vatNumber
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "regNumber",
      value: businessDetails.regNumber
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "lineItems",
      value: JSON.stringify((((_e2 = cart.lines) == null ? void 0 : _e2.nodes) ?? []).map((line) => {
        var _a3, _b2, _c2, _d2, _e3, _f2, _g2, _h2;
        return {
          variantId: ((_a3 = line.merchandise) == null ? void 0 : _a3.id) ?? "",
          quantity: line.quantity,
          title: ((_c2 = (_b2 = line.merchandise) == null ? void 0 : _b2.product) == null ? void 0 : _c2.title) ?? "",
          variantTitle: ((_d2 = line.merchandise) == null ? void 0 : _d2.title) ?? "",
          price: ((_f2 = (_e3 = line.cost) == null ? void 0 : _e3.amountPerQuantity) == null ? void 0 : _f2.amount) ?? "0",
          total: ((_h2 = (_g2 = line.cost) == null ? void 0 : _g2.totalAmount) == null ? void 0 : _h2.amount) ?? "0"
        };
      }))
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "shippingTitle",
      value: ((_i = (_h = (_g = (_f = cart.deliveryGroups) == null ? void 0 : _f.nodes) == null ? void 0 : _g[0]) == null ? void 0 : _h.selectedDeliveryOption) == null ? void 0 : _i.title) ?? ""
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "shippingCost",
      value: ((_n = (_m = (_l = (_k = (_j = cart.deliveryGroups) == null ? void 0 : _j.nodes) == null ? void 0 : _k[0]) == null ? void 0 : _l.selectedDeliveryOption) == null ? void 0 : _m.estimatedCost) == null ? void 0 : _n.amount) ?? "0"
    }), ((_o2 = payFetcher.data) == null ? void 0 : _o2.error) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#fc8181",
        fontSize: "0.85rem",
        marginBottom: "0.5rem"
      },
      children: payFetcher.data.error
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
      type: "submit",
      className: "checkout-pay-btn",
      disabled: isSubmitting,
      style: {
        border: "none",
        cursor: isSubmitting ? "wait" : "pointer"
      },
      children: isSubmitting ? "Redirecting to PayFast..." : "Proceed to Payment →"
    })]
  });
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$8,
  default: _$locale__checkout,
  loader: loader$d
}, Symbol.toStringTag, { value: "Module" }));
async function action$7({
  request,
  context
}) {
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  if (!storefrontUiUrl) {
    return data({
      error: "Payment service is not configured. Please try again later."
    }, {
      status: 503
    });
  }
  const formData = await request.formData();
  const orderPayload = {
    cartId: formData.get("cartId"),
    cartTotal: formData.get("cartTotal"),
    cartCurrency: formData.get("cartCurrency"),
    customer: {
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone")
    },
    shippingAddress: {
      address1: formData.get("shipAddress1"),
      address2: formData.get("shipAddress2"),
      city: formData.get("shipCity"),
      province: formData.get("shipProvince"),
      zip: formData.get("shipZip"),
      country: formData.get("shipCountry")
    },
    lineItems: (() => {
      try {
        return JSON.parse(formData.get("lineItems") ?? "[]");
      } catch {
        return [];
      }
    })(),
    invoiceEmailRequested: formData.get("invoiceEmailRequested") === "true",
    businessDetails: {
      isBusinessCustomer: formData.get("isBusinessCustomer") === "true",
      companyName: formData.get("companyName") || "",
      vatNumber: formData.get("vatNumber") || "",
      regNumber: formData.get("regNumber") || ""
    },
    shippingLine: {
      title: formData.get("shippingTitle") || "Shipping",
      cost: formData.get("shippingCost") || "0"
    }
  };
  try {
    const res = await fetch(`${storefrontUiUrl}/api/payment/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Secret": internalSecret
      },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown error");
      console.error("[checkout/payment] initiate failed:", res.status, errorText);
      return data({
        error: "Payment initiation failed. Please try again."
      }, {
        status: 502
      });
    }
    const {
      redirectUrl
    } = await res.json();
    if (!redirectUrl) {
      return data({
        error: "No payment redirect URL received. Please try again."
      }, {
        status: 502
      });
    }
    throw redirect(redirectUrl);
  } catch (err) {
    if (err instanceof Response) throw err;
    console.error("[checkout/payment] unexpected error:", err);
    return data({
      error: "An unexpected error occurred. Please try again."
    }, {
      status: 500
    });
  }
}
async function loader$c() {
  throw redirect("/checkout");
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
async function loader$b({
  request
}) {
  const url = new URL(request.url);
  const orderRef = url.searchParams.get("ref") ?? "";
  return {
    orderRef
  };
}
const _$locale__checkout_cancel = withComponentProps(function CheckoutCancel() {
  const {
    orderRef
  } = useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    className: "checkout-result-wrapper",
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      className: "checkout-result-box",
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "checkout-result-icon",
        style: {
          color: "#fc8181"
        },
        children: "✕"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
        className: "checkout-result-title",
        children: "Payment Cancelled"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        className: "checkout-result-message",
        children: "Your payment was cancelled and you have not been charged. Your cart is still intact — you can try again when you are ready."
      }), orderRef && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        className: "checkout-result-order-ref",
        children: ["Order ref: ", orderRef]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("a", {
          href: "/checkout",
          className: "checkout-result-btn",
          children: "Try Again"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
          href: "/cart",
          className: "checkout-result-btn",
          style: {
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.3)"
          },
          children: "Back to Cart"
        })]
      })]
    })
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__checkout_cancel,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
async function loader$a({
  context
}) {
  return context.customerAccount.authorize();
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [{
    title: "Contact Us | Hoseworld"
  }];
};
const _$locale__contact = withComponentProps(function ContactPage() {
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.5rem",
    marginBottom: "1.5rem"
  };
  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: "1rem",
    marginBottom: "1rem",
    boxSizing: "border-box"
  };
  const labelStyle = {
    display: "block",
    marginBottom: "0.25rem",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "0.875rem"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: "Contact Us"
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        style: {
          flex: "1 1 300px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: cardStyle,
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
            style: {
              fontSize: "1.25rem",
              marginBottom: "1rem"
            },
            children: "Get in Touch"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
            style: {
              marginBottom: "0.75rem",
              lineHeight: "1.6"
            },
            children: "Have a question about our products or need assistance with an order? We are here to help."
          }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            style: {
              marginTop: "1.5rem"
            },
            children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
              style: {
                marginBottom: "0.5rem"
              },
              children: [/* @__PURE__ */ jsxRuntimeExports.jsx("strong", {
                children: "Email:"
              }), " info@hoseworld.co.za"]
            }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
              style: {
                marginBottom: "0.5rem"
              },
              children: [/* @__PURE__ */ jsxRuntimeExports.jsx("strong", {
                children: "Phone:"
              }), " +27 (0)11 123 4567"]
            }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
              style: {
                marginBottom: "0.5rem"
              },
              children: [/* @__PURE__ */ jsxRuntimeExports.jsx("strong", {
                children: "Address:"
              }), " Johannesburg, South Africa"]
            }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
              style: {
                marginBottom: "0.5rem"
              },
              children: [/* @__PURE__ */ jsxRuntimeExports.jsx("strong", {
                children: "Hours:"
              }), " Mon-Fri 8am - 5pm SAST"]
            })]
          })]
        })
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        style: {
          flex: "1 1 300px"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: cardStyle,
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
            style: {
              fontSize: "1.25rem",
              marginBottom: "1rem"
            },
            children: "Send a Message"
          }), /* @__PURE__ */ jsxRuntimeExports.jsxs("form", {
            method: "post",
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
              style: labelStyle,
              children: "Name"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "text",
              name: "name",
              required: true,
              style: inputStyle,
              placeholder: "Your name"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("label", {
              style: labelStyle,
              children: "Email"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "email",
              name: "email",
              required: true,
              style: inputStyle,
              placeholder: "your@email.com"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("label", {
              style: labelStyle,
              children: "Message"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", {
              name: "message",
              required: true,
              rows: 5,
              style: {
                ...inputStyle,
                resize: "vertical"
              },
              placeholder: "How can we help?"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
              type: "submit",
              style: {
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                fontSize: "1rem",
                cursor: "pointer",
                width: "100%"
              },
              children: "Send Message"
            })]
          })]
        })
      })]
    })]
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__contact,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader$9(args) {
  var _a2;
  const {
    context
  } = args;
  const {
    storefront
  } = context;
  const data2 = await storefront.query(HOMEPAGE_COLLECTIONS_QUERY);
  const collections = (((_a2 = data2.collections) == null ? void 0 : _a2.nodes) ?? []).filter((col) => col.title !== "JSON Imported" && col.products.nodes.length > 0);
  return {
    collections
  };
}
const _$locale___index = withComponentProps(function Homepage() {
  const {
    collections
  } = useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "home",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("section", {
      className: "px-4 pt-8 max-w-7xl mx-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
        className: "text-2xl font-bold text-left",
        children: "Online"
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      className: "px-4 max-w-7xl mx-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {
        style: {
          border: "none",
          borderTop: "2px solid rgb(0, 0, 0)"
        }
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
      hidden: true,
      className: "px-4 py-8 max-w-7xl mx-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
        className: "text-2xl font-bold",
        children: "Instore"
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
      className: "px-4 py-8 max-w-7xl mx-auto",
      children: collections.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "collections-grid",
        children: collections.map((collection) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionCard, {
          collection
        }, collection.id))
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        className: "text-center text-gray-500 py-8",
        children: "No collections available yet."
      })
    })]
  });
});
const HOMEPAGE_COLLECTIONS_QUERY = `#graphql
  query HomepageCollections(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 20) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
        products(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
`;
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale___index,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
async function loader$8({
  request,
  context
}) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q") || "";
  const paginationVariables = Ts(request, {
    pageBy: 12
  });
  if (!searchTerm) {
    return {
      searchTerm,
      products: null
    };
  }
  const {
    search
  } = await context.storefront.query(SEARCH_QUERY, {
    variables: {
      query: searchTerm,
      ...paginationVariables
    }
  });
  return {
    searchTerm,
    products: search
  };
}
const _$locale__search = withComponentProps(function Search() {
  var _a2, _b;
  const {
    searchTerm,
    products
  } = useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "search max-w-7xl mx-auto px-4 py-8",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      className: "text-3xl font-bold mb-6",
      children: "Search"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(SearchFormPredictive, {
      children: ({
        fetchResults,
        goToSearch,
        inputRef
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "flex gap-2 mb-8",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          name: "q",
          defaultValue: searchTerm,
          onChange: fetchResults,
          onFocus: fetchResults,
          placeholder: "Search products...",
          ref: inputRef,
          type: "search",
          className: "flex-1 px-4 py-2 border border-gray-300 rounded"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          onClick: goToSearch,
          className: "px-6 py-2 bg-black text-white rounded hover:bg-gray-800",
          children: "Search"
        })]
      })
    }), searchTerm && !((_a2 = products == null ? void 0 : products.nodes) == null ? void 0 : _a2.length) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
      className: "text-gray-500",
      children: ["No results found for ", /* @__PURE__ */ jsxRuntimeExports.jsx("q", {
        children: searchTerm
      })]
    }), ((_b = products == null ? void 0 : products.nodes) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
      children: products.nodes.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, {
        to: `/products/${product.handle}`,
        prefetch: "intent",
        className: "group",
        children: [product.featuredImage && /* @__PURE__ */ jsxRuntimeExports.jsx(Image, {
          data: product.featuredImage,
          aspectRatio: "1/1",
          sizes: "(min-width: 768px) 25vw, 50vw"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
          className: "mt-2 font-semibold group-hover:underline",
          children: product.title
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
          data: product.priceRange.minVariantPrice
        })]
      }, product.id))
    }) : null]
  });
});
const SEARCH_QUERY = `#graphql
  query Search(
    $query: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    search(
      query: $query
      types: [PRODUCT]
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
    ) {
      nodes {
        ... on Product {
          id
          title
          handle
          productType
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _$locale__search,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
async function action$6({
  request,
  context
}) {
  var _a2;
  const {
    cart
  } = context;
  const formData = await request.formData();
  const {
    action: action2,
    inputs
  } = re.getFormInput(formData);
  let result;
  switch (action2) {
    case re.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case re.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case re.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case re.ACTIONS.DiscountCodesUpdate:
      result = await cart.updateDiscountCodes(inputs.discountCodes);
      break;
    case re.ACTIONS.GiftCardCodesAdd:
      result = await cart.addGiftCardCodes([inputs.giftCardCode]);
      break;
    case re.ACTIONS.GiftCardCodesRemove:
      result = await cart.removeGiftCardCodes(inputs.giftCardCodes);
      break;
    case re.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity(inputs.buyerIdentity);
      break;
    case re.ACTIONS.DeliveryAddressesAdd:
      result = await cart.addDeliveryAddresses(inputs.addresses);
      break;
    case re.ACTIONS.DeliveryAddressesReplace:
      result = await cart.replaceDeliveryAddresses(inputs.addresses);
      break;
    case re.ACTIONS.SelectedDeliveryOptionsUpdate:
      result = await cart.updateSelectedDeliveryOption(inputs.selectedDeliveryOptions);
      break;
    default:
      throw new Error(`Unknown action: ${action2}`);
  }
  const userErrors = (result == null ? void 0 : result.userErrors) || [];
  if (userErrors.length > 0) {
    console.warn("[cart] userErrors:", userErrors.map((e) => e.message).join(", "));
  }
  const cartId = (_a2 = result == null ? void 0 : result.cart) == null ? void 0 : _a2.id;
  const headers = cartId ? cart.setCartId(cartId) : new Headers();
  const status = userErrors.length > 0 ? 422 : 200;
  return data(result, {
    status,
    headers
  });
}
async function loader$7({
  context
}) {
  var _a2;
  const {
    cart,
    storefront
  } = context;
  const expectedCountry = storefront.i18n.country;
  let cartData = await cart.get();
  if (cartData) {
    const currentCountry = (_a2 = cartData.buyerIdentity) == null ? void 0 : _a2.countryCode;
    if (!currentCountry || currentCountry !== expectedCountry) {
      console.log(`[cart-loader] Syncing buyerIdentity: ${currentCountry ?? "none"} -> ${expectedCountry}`);
      await cart.updateBuyerIdentity({
        countryCode: expectedCountry
      });
      cartData = await cart.get();
    }
  }
  return {
    cart: cartData
  };
}
const _$locale__cart = withComponentProps(function Cart() {
  const {
    cart
  } = useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "cart max-w-4xl mx-auto px-4 py-8",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      className: "text-3xl font-bold mb-6",
      children: "Your Cart"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(CartMain, {
      cart,
      layout: "page"
    })]
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6,
  default: _$locale__cart,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
async function loader$6({
  context
}) {
  return context.customerAccount.login();
}
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
async function loader$5({
  request,
  context
}) {
  const response = await ri({
    storefront: context.storefront,
    request,
    types: ["products", "pages", "collections", "metaObjects"]
  });
  response.headers.set("Cache-Control", "max-age=86400");
  return response;
}
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
function generateRobotsTxt(baseUrl) {
  return ["User-agent: *", "Disallow: /admin", "Disallow: /cart", "Disallow: /checkout", "Disallow: /account", "Disallow: /search", "Allow: /", "", `Sitemap: ${baseUrl}/sitemap.xml`].join("\n");
}
async function loader$4({
  request
}) {
  const baseUrl = new URL(request.url).origin;
  const robotsTxt = generateRobotsTxt(baseUrl);
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age=86400"
    }
  });
}
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  generateRobotsTxt,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const shouldRevalidate = ({
  formMethod,
  currentUrl,
  nextUrl
}) => {
  if (formMethod && formMethod !== "GET") return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};
async function loader$3({
  context
}) {
  await context.customerAccount.handleAuthStatus();
  const {
    data: data2
  } = await context.customerAccount.query(CUSTOMER_DETAILS_QUERY);
  return {
    customer: data2.customer
  };
}
const account = withComponentProps(function AccountLayout() {
  const {
    customer
  } = useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "account-layout",
    style: {
      maxWidth: "80%",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: ["Welcome, ", customer.firstName || "there"]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx(AccountNav, {}), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        style: {
          flex: 1,
          minWidth: 0
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {
          context: {
            customer
          }
        })
      })]
    })]
  });
});
function AccountNav() {
  const navStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1rem",
    minWidth: "200px"
  };
  const linkStyle = {
    display: "block",
    padding: "0.5rem 0.75rem",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    marginBottom: "0.25rem"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", {
    style: navStyle,
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("a", {
      href: "/account",
      style: linkStyle,
      children: "Overview"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
      href: "/account/orders",
      style: linkStyle,
      children: "Orders"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
      href: "/account/profile",
      style: linkStyle,
      children: "Profile"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
      href: "/account/addresses",
      style: linkStyle,
      children: "Addresses"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
      href: "/account/management",
      style: linkStyle,
      children: "Account Management"
    })]
  });
}
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: account,
  loader: loader$3,
  shouldRevalidate
}, Symbol.toStringTag, { value: "Module" }));
const CUSTOMER_UPDATE_MUTATION = `#graphql
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $language: LanguageCode
  ) @inContext(language: $language) {
    customerUpdate(input: $customer) {
      customer {
        firstName
        lastName
        emailAddress {
          emailAddress
        }
        phoneNumber {
          phoneNumber
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;
async function action$5({
  context,
  request
}) {
  var _a2, _b, _c, _d;
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "deactivate") {
    const {
      data: data2,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_UPDATE_MUTATION, {
      variables: {
        customer: {
          firstName: "Deactivated",
          lastName: "Account"
        }
      }
    });
    if (errors == null ? void 0 : errors.length) {
      return {
        error: errors[0].message,
        intent: "deactivate"
      };
    }
    if ((_b = (_a2 = data2 == null ? void 0 : data2.customerUpdate) == null ? void 0 : _a2.userErrors) == null ? void 0 : _b.length) {
      return {
        error: data2.customerUpdate.userErrors[0].message,
        intent: "deactivate"
      };
    }
    await context.customerAccount.logout({});
    return redirect("/");
  }
  if (intent === "delete") {
    const confirmation = formData.get("confirmation");
    if (confirmation !== "DELETE") {
      return {
        error: "Please type DELETE to confirm account deletion.",
        intent: "delete"
      };
    }
    const {
      data: data2,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_UPDATE_MUTATION, {
      variables: {
        customer: {
          firstName: "Deleted",
          lastName: "User"
        }
      }
    });
    if (errors == null ? void 0 : errors.length) {
      return {
        error: errors[0].message,
        intent: "delete"
      };
    }
    if ((_d = (_c = data2 == null ? void 0 : data2.customerUpdate) == null ? void 0 : _c.userErrors) == null ? void 0 : _d.length) {
      return {
        error: data2.customerUpdate.userErrors[0].message,
        intent: "delete"
      };
    }
    await context.customerAccount.logout({});
    return redirect("/");
  }
  return {
    error: "Unknown action",
    intent: "unknown"
  };
}
const account_management = withComponentProps(function AccountManagement() {
  const actionData = useActionData();
  const [showDeactivate, setShowDeactivate] = reactExports.useState(false);
  const [showDelete, setShowDelete] = reactExports.useState(false);
  const inputStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    color: "white",
    fontSize: "0.875rem"
  };
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem"
  };
  const dangerBtnStyle = {
    background: "rgba(197, 48, 48, 0.15)",
    color: "#fc8181",
    border: "1px solid rgba(197, 48, 48, 0.4)",
    padding: "0.5rem 1.25rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem",
    marginRight: "0.5rem"
  };
  const actionError = actionData && "error" in actionData ? actionData.error : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      style: {
        fontSize: "1.25rem",
        marginBottom: "1rem",
        color: "#fc8181"
      },
      children: "Account Management"
    }), actionError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem"
      },
      children: actionError
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        ...cardStyle,
        border: "1px solid rgba(197, 48, 48, 0.3)"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          marginBottom: "1.25rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
          style: {
            fontWeight: 600,
            marginBottom: "0.25rem"
          },
          children: "Deactivate Account"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
          style: {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "0.75rem"
          },
          children: "Marks your account as deactivated. Your order history and invoicing records are retained."
        }), !showDeactivate ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          type: "button",
          style: dangerBtnStyle,
          onClick: () => setShowDeactivate(true),
          children: "Deactivate Account"
        }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            background: "rgba(197,48,48,0.08)",
            borderRadius: "6px",
            padding: "1rem",
            border: "1px solid rgba(197,48,48,0.3)"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
            style: {
              fontSize: "0.875rem",
              marginBottom: "1rem",
              color: "rgba(255,255,255,0.8)"
            },
            children: "Are you sure you want to deactivate your account? You will be logged out."
          }), /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, {
            method: "post",
            style: {
              display: "inline"
            },
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "hidden",
              name: "intent",
              value: "deactivate"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
              type: "submit",
              style: dangerBtnStyle,
              children: "Yes, Deactivate"
            })]
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            type: "button",
            style: {
              ...dangerBtnStyle,
              color: "rgba(255,255,255,0.6)",
              borderColor: "rgba(255,255,255,0.2)",
              background: "transparent"
            },
            onClick: () => setShowDeactivate(false),
            children: "Cancel"
          })]
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "1.25rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
          style: {
            fontWeight: 600,
            marginBottom: "0.25rem"
          },
          children: "Close Account & Delete Personal Information"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
          style: {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "0.75rem"
          },
          children: "Permanently removes your personal information. Your order and invoicing records are retained as required by SARS."
        }), !showDelete ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          type: "button",
          style: {
            ...dangerBtnStyle,
            borderColor: "rgba(197,48,48,0.6)"
          },
          onClick: () => setShowDelete(true),
          children: "Close Account"
        }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            background: "rgba(197,48,48,0.08)",
            borderRadius: "6px",
            padding: "1rem",
            border: "1px solid rgba(197,48,48,0.3)"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
            style: {
              fontSize: "0.875rem",
              marginBottom: "0.75rem",
              color: "rgba(255,255,255,0.8)"
            },
            children: ["This will permanently remove your personal information. Type ", /* @__PURE__ */ jsxRuntimeExports.jsx("strong", {
              children: "DELETE"
            }), " to confirm."]
          }), /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, {
            method: "post",
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "hidden",
              name: "intent",
              value: "delete"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              name: "confirmation",
              type: "text",
              placeholder: "Type DELETE to confirm",
              style: {
                ...inputStyle,
                width: "auto",
                marginBottom: "0.75rem",
                display: "block"
              }
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
              type: "submit",
              style: {
                ...dangerBtnStyle,
                borderColor: "rgba(197,48,48,0.6)"
              },
              children: "Delete My Information"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
              type: "button",
              style: {
                ...dangerBtnStyle,
                color: "rgba(255,255,255,0.6)",
                borderColor: "rgba(255,255,255,0.2)",
                background: "transparent"
              },
              onClick: () => setShowDelete(false),
              children: "Cancel"
            })]
          })]
        })]
      })]
    })]
  });
});
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  default: account_management
}, Symbol.toStringTag, { value: "Module" }));
const CUSTOMER_ADDRESS_CREATE_MUTATION = `#graphql
  mutation customerAddressCreate(
    $address: CustomerAddressInput!
    $defaultAddress: Boolean
    $language: LanguageCode
  ) @inContext(language: $language) {
    customerAddressCreate(
      address: $address
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;
const CUSTOMER_ADDRESS_UPDATE_MUTATION = `#graphql
  mutation customerAddressUpdate(
    $address: CustomerAddressInput!
    $addressId: ID!
    $defaultAddress: Boolean
    $language: LanguageCode
 ) @inContext(language: $language) {
    customerAddressUpdate(
      address: $address
      addressId: $addressId
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;
const CUSTOMER_ADDRESS_DELETE_MUTATION = `#graphql
  mutation customerAddressDelete(
    $addressId: ID!
    $language: LanguageCode
  ) @inContext(language: $language) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        code
        field
        message
      }
    }
  }
`;
async function action$4({
  context,
  request
}) {
  var _a2, _b, _c, _d, _e2, _f;
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "delete") {
    const addressId = String(formData.get("addressId"));
    const {
      data: data2,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_ADDRESS_DELETE_MUTATION, {
      variables: {
        addressId
      }
    });
    if (errors == null ? void 0 : errors.length) return {
      error: errors[0].message
    };
    if ((_b = (_a2 = data2 == null ? void 0 : data2.customerAddressDelete) == null ? void 0 : _a2.userErrors) == null ? void 0 : _b.length) {
      return {
        error: data2.customerAddressDelete.userErrors[0].message
      };
    }
    return {
      success: "Address deleted."
    };
  }
  const address = {
    firstName: String(formData.get("firstName") || ""),
    lastName: String(formData.get("lastName") || ""),
    company: String(formData.get("company") || ""),
    address1: String(formData.get("address1") || ""),
    address2: String(formData.get("address2") || ""),
    city: String(formData.get("city") || ""),
    zoneCode: String(formData.get("zoneCode") || ""),
    zip: String(formData.get("zip") || ""),
    territoryCode: String(formData.get("territoryCode") || ""),
    phoneNumber: String(formData.get("phoneNumber") || "")
  };
  const defaultAddress = formData.get("defaultAddress") === "on";
  if (intent === "update") {
    const addressId = String(formData.get("addressId"));
    const {
      data: data2,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_ADDRESS_UPDATE_MUTATION, {
      variables: {
        address,
        addressId,
        defaultAddress
      }
    });
    if (errors == null ? void 0 : errors.length) return {
      error: errors[0].message
    };
    if ((_d = (_c = data2 == null ? void 0 : data2.customerAddressUpdate) == null ? void 0 : _c.userErrors) == null ? void 0 : _d.length) {
      return {
        error: data2.customerAddressUpdate.userErrors[0].message
      };
    }
    return {
      success: "Address updated."
    };
  }
  if (intent === "create") {
    const {
      data: data2,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_ADDRESS_CREATE_MUTATION, {
      variables: {
        address,
        defaultAddress
      }
    });
    if (errors == null ? void 0 : errors.length) return {
      error: errors[0].message
    };
    if ((_f = (_e2 = data2 == null ? void 0 : data2.customerAddressCreate) == null ? void 0 : _e2.userErrors) == null ? void 0 : _f.length) {
      return {
        error: data2.customerAddressCreate.userErrors[0].message
      };
    }
    return {
      success: "Address created."
    };
  }
  return {
    error: "Unknown action."
  };
}
const account_addresses = withComponentProps(function AccountAddresses() {
  const {
    customer
  } = useOutletContext();
  const actionData = useActionData();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "0.75rem"
  };
  const buttonStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "0.35rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      style: {
        fontSize: "1.25rem",
        marginBottom: "1rem"
      },
      children: "Addresses"
    }), actionData && "success" in actionData && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem"
      },
      children: actionData.success
    }), actionData && "error" in actionData && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem"
      },
      children: actionData.error
    }), customer.addresses.nodes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: cardStyle,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        style: {
          color: "rgba(255,255,255,0.7)"
        },
        children: "No addresses saved."
      })
    }) : customer.addresses.nodes.map((address) => {
      var _a2;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        style: cardStyle,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            children: [address.formatted.map((line, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
              children: line
            }, i2)), ((_a2 = customer.defaultAddress) == null ? void 0 : _a2.id) === address.id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
              style: {
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.875rem",
                marginTop: "0.25rem"
              },
              children: "Default"
            })]
          }), /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, {
            method: "post",
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "hidden",
              name: "addressId",
              value: address.id
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "hidden",
              name: "intent",
              value: "delete"
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
              type: "submit",
              style: {
                ...buttonStyle,
                background: "rgba(229, 62, 62, 0.3)",
                border: "1px solid rgba(229, 62, 62, 0.5)"
              },
              children: "Delete"
            })]
          })]
        })
      }, address.id);
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("details", {
      style: {
        ...cardStyle,
        cursor: "pointer",
        marginTop: "1.5rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("summary", {
        style: {
          fontWeight: "bold",
          marginBottom: "1rem"
        },
        children: "Add new address"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(AddressForm, {})]
    })]
  });
});
function AddressForm() {
  const inputStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    color: "white",
    fontSize: "0.875rem"
  };
  const labelStyle = {
    display: "block",
    marginBottom: "0.25rem",
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.875rem"
  };
  const fieldStyle = {
    marginBottom: "0.75rem"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, {
    method: "post",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "hidden",
      name: "intent",
      value: "create"
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "firstName",
          style: labelStyle,
          children: "First name"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "firstName",
          name: "firstName",
          type: "text",
          style: inputStyle
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "lastName",
          style: labelStyle,
          children: "Last name"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "lastName",
          name: "lastName",
          type: "text",
          style: inputStyle
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: fieldStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "company",
        style: labelStyle,
        children: "Company"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "company",
        name: "company",
        type: "text",
        style: inputStyle
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: fieldStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "address1",
        style: labelStyle,
        children: "Address"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "address1",
        name: "address1",
        type: "text",
        style: inputStyle
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: fieldStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "address2",
        style: labelStyle,
        children: "Apartment, suite, etc."
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "address2",
        name: "address2",
        type: "text",
        style: inputStyle
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "city",
          style: labelStyle,
          children: "City"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "city",
          name: "city",
          type: "text",
          style: inputStyle
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "zoneCode",
          style: labelStyle,
          children: "Province/State"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "zoneCode",
          name: "zoneCode",
          type: "text",
          style: inputStyle
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "zip",
          style: labelStyle,
          children: "Postal/Zip code"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "zip",
          name: "zip",
          type: "text",
          style: inputStyle
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "territoryCode",
          style: labelStyle,
          children: "Country code"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "territoryCode",
          name: "territoryCode",
          type: "text",
          style: inputStyle,
          placeholder: "e.g. ZA, US, NZ"
        })]
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: fieldStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "phoneNumber",
        style: labelStyle,
        children: "Phone"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "phoneNumber",
        name: "phoneNumber",
        type: "tel",
        style: inputStyle
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        ...fieldStyle,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        id: "defaultAddress",
        name: "defaultAddress",
        type: "checkbox"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("label", {
        htmlFor: "defaultAddress",
        style: {
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.875rem"
        },
        children: "Set as default address"
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
      type: "submit",
      style: {
        background: "rgba(255, 255, 255, 0.15)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: "0.5rem 1.5rem",
        borderRadius: "6px",
        cursor: "pointer"
      },
      children: "Add address"
    })]
  });
}
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: account_addresses
}, Symbol.toStringTag, { value: "Module" }));
const CUSTOMER_EMAIL_QUERY = `#graphql
  query CustomerEmail {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
`;
async function loader$2({
  context
}) {
  var _a2, _b;
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  let businessProfile = {
    companyName: "",
    regNumber: "",
    vatNumber: ""
  };
  try {
    const isLoggedIn = await context.customerAccount.isLoggedIn();
    if (isLoggedIn && storefrontUiUrl) {
      const {
        data: data2
      } = await context.customerAccount.query(CUSTOMER_EMAIL_QUERY);
      const email = ((_b = (_a2 = data2 == null ? void 0 : data2.customer) == null ? void 0 : _a2.emailAddress) == null ? void 0 : _b.emailAddress) ?? "";
      if (email) {
        const res = await fetch(`${storefrontUiUrl}/api/customer/business?email=${encodeURIComponent(email)}`, {
          headers: {
            "X-Internal-Secret": internalSecret
          }
        });
        if (res.ok) {
          const data22 = await res.json();
          businessProfile = data22;
        }
      }
    }
  } catch {
  }
  return {
    businessProfile
  };
}
async function action$3({
  context,
  request
}) {
  var _a2, _b, _c, _d, _e2;
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "update") {
    const {
      data: data2,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_UPDATE_MUTATION, {
      variables: {
        customer: {
          firstName: String(formData.get("firstName") || ""),
          lastName: String(formData.get("lastName") || "")
        }
      }
    });
    if (errors == null ? void 0 : errors.length) {
      return {
        error: errors[0].message,
        intent
      };
    }
    if ((_b = (_a2 = data2 == null ? void 0 : data2.customerUpdate) == null ? void 0 : _a2.userErrors) == null ? void 0 : _b.length) {
      return {
        error: data2.customerUpdate.userErrors[0].message,
        intent
      };
    }
    return {
      success: true,
      intent: "update"
    };
  }
  if (intent === "update-business") {
    const env = context.env;
    const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
    const internalSecret = env.INTERNAL_API_SECRET ?? "";
    if (!storefrontUiUrl) {
      return {
        error: "Business profile service is not configured.",
        intent
      };
    }
    try {
      const {
        data: idData
      } = await context.customerAccount.query(CUSTOMER_EMAIL_QUERY);
      const email = ((_d = (_c = idData == null ? void 0 : idData.customer) == null ? void 0 : _c.emailAddress) == null ? void 0 : _d.emailAddress) ?? "";
      const shopifyCustomerId = ((_e2 = idData == null ? void 0 : idData.customer) == null ? void 0 : _e2.id) ?? "";
      if (!email) {
        return {
          error: "Could not identify customer.",
          intent
        };
      }
      const companyName = String(formData.get("companyName") || "");
      const regNumber = String(formData.get("regNumber") || "");
      const vatNumber = String(formData.get("vatNumber") || "");
      const res = await fetch(`${storefrontUiUrl}/api/customer/business`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": internalSecret
        },
        body: JSON.stringify({
          shopifyCustomerId,
          email,
          companyName,
          regNumber,
          vatNumber
        })
      });
      if (!res.ok) {
        return {
          error: "Failed to save business details.",
          intent
        };
      }
      return {
        success: true,
        intent: "update-business",
        companyName,
        regNumber,
        vatNumber
      };
    } catch {
      return {
        error: "Could not reach profile service.",
        intent
      };
    }
  }
  return {
    error: "Unknown action",
    intent: "unknown"
  };
}
const account_profile = withComponentProps(function AccountProfile() {
  const {
    customer
  } = useOutletContext();
  const {
    businessProfile
  } = useLoaderData();
  const actionData = useActionData();
  const [isBusinessCustomer, setIsBusinessCustomer] = reactExports.useState(!!(businessProfile.companyName || businessProfile.regNumber || businessProfile.vatNumber));
  const [companyName, setCompanyName] = reactExports.useState(businessProfile.companyName ?? "");
  const [regNumber, setRegNumber] = reactExports.useState(businessProfile.regNumber ?? "");
  const [vatNumber, setVatNumber] = reactExports.useState(businessProfile.vatNumber ?? "");
  actionData && "success" in actionData && actionData.intent === "update-business" ? actionData : null;
  const inputStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    color: "white",
    fontSize: "0.875rem"
  };
  const labelStyle = {
    display: "block",
    marginBottom: "0.25rem",
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.875rem"
  };
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem"
  };
  const actionError = actionData && "error" in actionData ? actionData.error : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      style: {
        fontSize: "1.25rem",
        marginBottom: "1rem"
      },
      children: "Profile"
    }), actionData && "success" in actionData && actionData.intent === "update" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem"
      },
      children: "Profile updated."
    }), actionData && "success" in actionData && actionData.intent === "update-business" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem"
      },
      children: "Business details saved."
    }), actionError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem"
      },
      children: actionError
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, {
      method: "post",
      style: {
        ...cardStyle,
        marginBottom: "1rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        type: "hidden",
        name: "intent",
        value: "update"
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          marginBottom: "1rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "firstName",
          style: labelStyle,
          children: "First name"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "firstName",
          name: "firstName",
          type: "text",
          defaultValue: customer.firstName ?? "",
          style: inputStyle
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          marginBottom: "1.5rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
          htmlFor: "lastName",
          style: labelStyle,
          children: "Last name"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          id: "lastName",
          name: "lastName",
          type: "text",
          defaultValue: customer.lastName ?? "",
          style: inputStyle
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
        type: "submit",
        style: {
          background: "rgba(255, 255, 255, 0.15)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer"
        },
        children: "Save"
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        style: {
          fontSize: "1rem",
          marginBottom: "0.75rem",
          color: "rgba(255,255,255,0.9)"
        },
        children: "Business Details"
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("label", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          marginBottom: "1rem",
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.7)"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "checkbox",
          checked: isBusinessCustomer,
          onChange: (e) => setIsBusinessCustomer(e.target.checked),
          style: {
            width: "auto",
            margin: 0
          }
        }), "This account is used for business purchases"]
      }), isBusinessCustomer && /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, {
        method: "post",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "hidden",
          name: "intent",
          value: "update-business"
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            marginBottom: "0.75rem"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
            htmlFor: "companyName",
            style: labelStyle,
            children: "Company name"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            id: "companyName",
            name: "companyName",
            type: "text",
            value: companyName,
            onChange: (e) => setCompanyName(e.target.value),
            placeholder: "e.g. Acme (Pty) Ltd",
            style: inputStyle
          })]
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            marginBottom: "0.75rem"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
            htmlFor: "bizRegNumber",
            style: labelStyle,
            children: "Business registration number"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            id: "bizRegNumber",
            name: "regNumber",
            type: "text",
            value: regNumber,
            onChange: (e) => setRegNumber(e.target.value),
            placeholder: "XXXX/XXXXXX/XX",
            style: inputStyle
          })]
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            marginBottom: "1.25rem"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
            htmlFor: "bizVatNumber",
            style: labelStyle,
            children: "VAT / Tax number (SARS VAT number)"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            id: "bizVatNumber",
            name: "vatNumber",
            type: "text",
            value: vatNumber,
            onChange: (e) => setVatNumber(e.target.value),
            placeholder: "4XXXXXXXXX",
            style: inputStyle
          })]
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          type: "submit",
          style: {
            background: "rgba(26,180,215,0.15)",
            color: "rgba(26,180,215,0.9)",
            border: "1px solid rgba(26,180,215,0.3)",
            padding: "0.5rem 1.5rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem"
          },
          children: "Save Business Details"
        })]
      })]
    })]
  });
});
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: account_profile,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function action$2({
  context
}) {
  return context.customerAccount.logout({});
}
const account__index = withComponentProps(function AccountDashboard() {
  const {
    customer
  } = useOutletContext();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "1rem"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      style: {
        fontSize: "1.25rem",
        marginBottom: "1rem"
      },
      children: "Account Overview"
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        style: {
          fontSize: "1rem",
          marginBottom: "0.5rem",
          color: "rgba(255,255,255,0.7)"
        },
        children: "Profile"
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        children: [customer.firstName, " ", customer.lastName]
      })]
    }), customer.defaultAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        style: {
          fontSize: "1rem",
          marginBottom: "0.5rem",
          color: "rgba(255,255,255,0.7)"
        },
        children: "Default Address"
      }), customer.defaultAddress.formatted.map((line, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        children: line
      }, i2))]
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(Form, {
      method: "post",
      style: {
        marginTop: "2rem"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
        type: "submit",
        style: {
          background: "rgba(250, 35, 35, 0.7)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer"
        },
        children: "Sign out"
      })
    })]
  });
});
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: account__index
}, Symbol.toStringTag, { value: "Module" }));
const account_orders = withComponentProps(function AccountOrdersLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
});
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: account_orders
}, Symbol.toStringTag, { value: "Module" }));
const ORDER_ITEM_FRAGMENT = `#graphql
  fragment OrderItem on Order {
    totalPrice {
      amount
      currencyCode
    }
    financialStatus
    fulfillmentStatus
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    id
    number
    confirmationNumber
    processedAt
  }
`;
const CUSTOMER_ORDERS_QUERY = `#graphql
  #graphql
  fragment CustomerOrders on Customer {
    orders(
      sortKey: PROCESSED_AT,
      reverse: true,
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      query: $query
    ) {
      nodes {
        ...OrderItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
  ${ORDER_ITEM_FRAGMENT}

  query CustomerOrders(
    $endCursor: String
    $first: Int
    $last: Int
    $startCursor: String
    $query: String
    $language: LanguageCode
  ) @inContext(language: $language) {
    customer {
      ...CustomerOrders
    }
  }
`;
const ORDER_QUERY = `#graphql
  fragment OrderMoney on MoneyV2 {
    amount
    currencyCode
  }
  fragment DiscountApplication on DiscountApplication {
    value {
      __typename
      ... on MoneyV2 {
        ...OrderMoney
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
  }
  fragment OrderLineItemFull on LineItem {
    id
    title
    quantity
    price {
      ...OrderMoney
    }
    discountAllocations {
      allocatedAmount {
        ...OrderMoney
      }
      discountApplication {
        ...DiscountApplication
      }
    }
    totalDiscount {
      ...OrderMoney
    }
    image {
      altText
      height
      url
      id
      width
    }
    variantTitle
  }
  fragment Order on Order {
    id
    name
    confirmationNumber
    statusPageUrl
    fulfillmentStatus
    processedAt
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    totalTax {
      ...OrderMoney
    }
    totalPrice {
      ...OrderMoney
    }
    subtotal {
      ...OrderMoney
    }
    shippingAddress {
      name
      formatted(withName: true)
      formattedArea
    }
    shippingLine {
      title
      originalPrice {
        ...OrderMoney
      }
    }
    discountApplications(first: 100) {
      nodes {
        ...DiscountApplication
      }
    }
    lineItems(first: 100) {
      nodes {
        ...OrderLineItemFull
      }
    }
  }
  query Order($orderId: ID!, $language: LanguageCode)
    @inContext(language: $language) {
    order(id: $orderId) {
      ... on Order {
        ...Order
      }
    }
  }
`;
const CUSTOMER_ID_QUERY$1 = `#graphql
  query CustomerId {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
`;
async function fetchArchivedIds$1(storefrontUiUrl, internalSecret, customerId) {
  try {
    const res = await fetch(`${storefrontUiUrl}/api/orders/archive?customerId=${encodeURIComponent(customerId)}`, {
      headers: {
        "X-Internal-Secret": internalSecret
      }
    });
    if (!res.ok) return [];
    const data2 = await res.json();
    return data2.archivedIds ?? [];
  } catch {
    return [];
  }
}
async function loader$1({
  context,
  request
}) {
  var _a2, _b, _c;
  const url = new URL(request.url);
  const view = url.searchParams.get("view") ?? "active";
  const paginationVariables = Ts(request, {
    pageBy: 20
  });
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  const [{
    data: ordersData
  }, {
    data: idData
  }] = await Promise.all([context.customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables
    }
  }), context.customerAccount.query(CUSTOMER_ID_QUERY$1)]);
  const customerId = ((_a2 = idData == null ? void 0 : idData.customer) == null ? void 0 : _a2.id) ?? "";
  const customerEmail = ((_c = (_b = idData == null ? void 0 : idData.customer) == null ? void 0 : _b.emailAddress) == null ? void 0 : _c.emailAddress) ?? "";
  const archivedIds = storefrontUiUrl ? await fetchArchivedIds$1(storefrontUiUrl, internalSecret, customerId) : [];
  return {
    orders: ordersData.customer.orders,
    archivedIds,
    view,
    customerId,
    customerEmail
  };
}
async function action$1({
  context,
  request
}) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const orderId = formData.get("orderId");
  const customerId = formData.get("customerId");
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  if (intent === "archive") {
    if (!storefrontUiUrl) {
      return {
        error: "Archive service is not configured."
      };
    }
    try {
      const res = await fetch(`${storefrontUiUrl}/api/orders/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": internalSecret
        },
        body: JSON.stringify({
          customerId,
          orderId
        })
      });
      if (!res.ok) {
        const data2 = await res.json();
        return {
          error: data2.error ?? "Failed to archive order."
        };
      }
      return {
        success: true,
        intent
      };
    } catch {
      return {
        error: "Could not reach archive service. Please try again."
      };
    }
  }
  return {
    error: "Unknown intent"
  };
}
const account_orders__index = withComponentProps(function AccountOrders() {
  var _a2;
  const {
    orders,
    archivedIds,
    view,
    customerId
  } = useLoaderData();
  const fetcher = useFetcher();
  const isArchiveView = view === "archived";
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "0.75rem"
  };
  const allOrders = orders.nodes;
  const displayedOrders = isArchiveView ? allOrders.filter((o) => archivedIds.includes(o.id)) : allOrders.filter((o) => !archivedIds.includes(o.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("h2", {
        style: {
          fontSize: "1.25rem",
          margin: 0
        },
        children: ["Order History", isArchiveView && /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          style: {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 400,
            marginLeft: "0.5rem"
          },
          children: "— Archived"
        })]
      }), isArchiveView ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        to: "/account/orders",
        style: {
          fontSize: "0.875rem",
          color: "rgba(26,180,215,0.9)"
        },
        children: "← Active Orders"
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        to: "?view=archived",
        style: {
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.5)"
        },
        children: "View Archived"
      })]
    }), ((_a2 = fetcher.data) == null ? void 0 : _a2.error) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: fetcher.data.error
    }), displayedOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: cardStyle,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        style: {
          color: "rgba(255,255,255,0.7)"
        },
        children: isArchiveView ? "No archived orders." : "No orders yet."
      })
    }) : displayedOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
            style: {
              fontWeight: "bold"
            },
            children: [/* @__PURE__ */ jsxRuntimeExports.jsxs(Link, {
              to: `/account/orders/${btoa(order.id)}`,
              style: {
                color: "white",
                textDecoration: "none"
              },
              children: ["Order #", order.number]
            }), order.confirmationNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", {
              style: {
                color: "rgba(255,255,255,0.5)",
                fontWeight: "normal",
                marginLeft: "0.5rem"
              },
              children: ["(", order.confirmationNumber, ")"]
            })]
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
            style: {
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.875rem"
            },
            children: new Date(order.processedAt).toLocaleDateString()
          })]
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            textAlign: "right"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
              data: order.totalPrice
            })
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
            style: {
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)"
            },
            children: order.fulfillmentStatus
          })]
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          gap: "0.5rem",
          marginTop: "0.75rem",
          flexWrap: "wrap",
          alignItems: "center"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
          to: `/account/orders/${btoa(order.id)}`,
          style: {
            fontSize: "0.8rem",
            color: "rgba(26,180,215,0.9)",
            textDecoration: "none"
          },
          children: "View Details"
        }), !isArchiveView && /* @__PURE__ */ jsxRuntimeExports.jsxs(fetcher.Form, {
          method: "post",
          style: {
            display: "inline"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            type: "hidden",
            name: "intent",
            value: "archive"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            type: "hidden",
            name: "orderId",
            value: order.id
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            type: "hidden",
            name: "customerId",
            value: customerId
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            type: "submit",
            style: {
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.8rem",
              cursor: "pointer",
              padding: 0
            },
            children: "Archive"
          })]
        })]
      })]
    }, order.id))]
  });
});
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: account_orders__index,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = ({
  data: data2
}) => {
  var _a2;
  return [{
    title: `Order ${((_a2 = data2 == null ? void 0 : data2.order) == null ? void 0 : _a2.name) ?? ""} | Hoseworld`
  }];
};
const CUSTOMER_ID_QUERY = `#graphql
  query CustomerId {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
`;
async function fetchArchivedIds(storefrontUiUrl, internalSecret, customerId) {
  try {
    const res = await fetch(`${storefrontUiUrl}/api/orders/archive?customerId=${encodeURIComponent(customerId)}`, {
      headers: {
        "X-Internal-Secret": internalSecret
      }
    });
    if (!res.ok) return [];
    const data2 = await res.json();
    return data2.archivedIds ?? [];
  } catch {
    return [];
  }
}
async function fetchReturnStatus(storefrontUiUrl, internalSecret, shopifyOrderId) {
  try {
    const res = await fetch(`${storefrontUiUrl}/api/returns/status?shopifyOrderId=${encodeURIComponent(shopifyOrderId)}`, {
      headers: {
        "X-Internal-Secret": internalSecret
      }
    });
    if (!res.ok) return null;
    const data2 = await res.json();
    return data2.returnRequest ?? null;
  } catch {
    return null;
  }
}
async function loader({
  params,
  context
}) {
  var _a2, _b, _c;
  if (!params.id) {
    return redirect("/account/orders");
  }
  const orderId = atob(params.id);
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  const [{
    data: data2,
    errors
  }, {
    data: idData
  }] = await Promise.all([context.customerAccount.query(ORDER_QUERY, {
    variables: {
      orderId
    }
  }), context.customerAccount.query(CUSTOMER_ID_QUERY)]);
  if ((errors == null ? void 0 : errors.length) || !(data2 == null ? void 0 : data2.order)) {
    throw new Response("Order not found", {
      status: 404
    });
  }
  const customerId = ((_a2 = idData == null ? void 0 : idData.customer) == null ? void 0 : _a2.id) ?? "";
  const customerEmail = ((_c = (_b = idData == null ? void 0 : idData.customer) == null ? void 0 : _b.emailAddress) == null ? void 0 : _c.emailAddress) ?? "";
  const [archivedIds, returnRequest] = await Promise.all([storefrontUiUrl ? fetchArchivedIds(storefrontUiUrl, internalSecret, customerId) : Promise.resolve([]), storefrontUiUrl ? fetchReturnStatus(storefrontUiUrl, internalSecret, orderId) : Promise.resolve(null)]);
  const isArchived = archivedIds.includes(orderId);
  return {
    order: data2.order,
    isArchived,
    orderId,
    customerId,
    customerEmail,
    returnRequest
  };
}
async function action({
  context,
  request
}) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const orderId = formData.get("orderId");
  const customerId = formData.get("customerId");
  if (intent === "return-request") {
    const orderNum = formData.get("orderNum");
    const customerEmail = formData.get("customerEmail");
    const reason = formData.get("reason");
    const lineItemsRaw = formData.get("lineItems");
    const env = context.env;
    const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
    const internalSecret = env.INTERNAL_API_SECRET ?? "";
    if (!storefrontUiUrl) {
      return {
        error: "Return service is not configured.",
        intent
      };
    }
    let lineItems;
    try {
      if (lineItemsRaw) lineItems = JSON.parse(lineItemsRaw);
    } catch {
    }
    try {
      const res = await fetch(`${storefrontUiUrl}/api/returns/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": internalSecret
        },
        body: JSON.stringify({
          orderId,
          orderNum,
          customerEmail,
          customerId,
          reason,
          lineItems
        })
      });
      if (!res.ok) {
        const data2 = await res.json();
        return {
          error: data2.error ?? "Failed to submit return request.",
          intent
        };
      }
      return {
        success: true,
        intent
      };
    } catch {
      return {
        error: "Could not reach return service. Please try again.",
        intent
      };
    }
  }
  if (intent === "request-invoice") {
    const env = context.env;
    const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
    const invoiceApiSecret = env.INVOICE_API_SECRET ?? "";
    if (!storefrontUiUrl || !invoiceApiSecret) {
      return {
        error: "Invoice service is not configured.",
        intent
      };
    }
    try {
      const res = await fetch(`${storefrontUiUrl}/api/xero/email-invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Invoice-Api-Secret": invoiceApiSecret
        },
        body: JSON.stringify({
          shopifyOrderId: orderId
        })
      });
      const result = await res.json();
      if (!res.ok) {
        return {
          error: result.error ?? "Failed to email invoice.",
          intent
        };
      }
      return {
        success: true,
        intent,
        alreadySent: result.alreadySent ?? false
      };
    } catch {
      return {
        error: "Could not reach invoice service. Please try again.",
        intent
      };
    }
  }
  if (intent === "archive") {
    const env = context.env;
    const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
    const internalSecret = env.INTERNAL_API_SECRET ?? "";
    if (!storefrontUiUrl) {
      return {
        error: "Archive service is not configured.",
        intent
      };
    }
    try {
      const res = await fetch(`${storefrontUiUrl}/api/orders/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": internalSecret
        },
        body: JSON.stringify({
          customerId,
          orderId
        })
      });
      if (!res.ok) {
        const data2 = await res.json();
        return {
          error: data2.error ?? "Failed to archive order.",
          intent
        };
      }
      return {
        success: true,
        intent
      };
    } catch {
      return {
        error: "Could not reach archive service. Please try again.",
        intent
      };
    }
  }
  return {
    error: "Unknown intent",
    intent
  };
}
const account_orders_$id = withComponentProps(function OrderDetail() {
  var _a2, _b;
  const {
    order,
    isArchived,
    orderId,
    customerId,
    customerEmail,
    returnRequest
  } = useLoaderData();
  const fetcher = useFetcher();
  const [returnView, setReturnView] = reactExports.useState("none");
  const [selectedItems, setSelectedItems] = reactExports.useState(/* @__PURE__ */ new Map());
  const [policyAcknowledged, setPolicyAcknowledged] = reactExports.useState(false);
  const [returnReason, setReturnReason] = reactExports.useState("");
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "1rem"
  };
  const result = fetcher.data;
  const currentlyArchived = (result == null ? void 0 : result.intent) === "archive" && (result == null ? void 0 : result.success) ? true : isArchived;
  (result == null ? void 0 : result.success) && result.intent === "return-request";
  function handleItemToggle(lineItemId, originalQty) {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      if (next.has(lineItemId)) {
        next.delete(lineItemId);
      } else {
        next.set(lineItemId, 1);
      }
      return next;
    });
  }
  function handleQtyChange(lineItemId, qty) {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      if (next.has(lineItemId)) next.set(lineItemId, qty);
      return next;
    });
  }
  function handleReturnSubmit(e) {
    e.preventDefault();
    const lineItems = order.lineItems.nodes.filter((li2) => selectedItems.has(li2.id)).map((li2) => {
      var _a3, _b2;
      return {
        title: li2.title,
        variantTitle: li2.variantTitle ?? "",
        quantity: selectedItems.get(li2.id) ?? 1,
        unitPrice: ((_a3 = li2.price) == null ? void 0 : _a3.amount) ?? "0",
        sku: li2.sku ?? "",
        variantId: ((_b2 = li2.variant) == null ? void 0 : _b2.id) ?? ""
      };
    });
    fetcher.submit({
      intent: "return-request",
      orderId,
      orderNum: order.name,
      customerId,
      customerEmail,
      reason: returnReason,
      lineItems: JSON.stringify(lineItems)
    }, {
      method: "post"
    });
    setReturnView("none");
  }
  if (returnView === "select-items") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("button", {
        type: "button",
        onClick: () => {
          setReturnView("none");
          setSelectedItems(/* @__PURE__ */ new Map());
          setPolicyAcknowledged(false);
          setReturnReason("");
        },
        style: {
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer",
          fontSize: "0.875rem",
          padding: 0,
          marginBottom: "1rem",
          display: "inline-block"
        },
        children: "← Back to Order Details"
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", {
        style: {
          fontSize: "1.1rem",
          marginBottom: "1rem"
        },
        children: ["Request Return — ", order.name]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          ...cardStyle,
          borderLeft: "3px solid rgba(255,180,100,0.5)"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
          style: {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "0.75rem"
          },
          children: ["Before proceeding, please read our", " ", /* @__PURE__ */ jsxRuntimeExports.jsx("a", {
            href: "/policies/refund-policy",
            target: "_blank",
            rel: "noreferrer",
            style: {
              color: "rgba(26,180,215,0.9)",
              textDecoration: "underline"
            },
            children: "Return Policy"
          }), ". It describes what items are eligible, the customer's obligations, and any applicable shipping costs."]
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            cursor: "pointer",
            fontSize: "0.875rem"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            type: "checkbox",
            checked: policyAcknowledged,
            onChange: (e) => setPolicyAcknowledged(e.target.checked),
            style: {
              marginTop: "2px",
              flexShrink: 0
            }
          }), "I have read and accept the Return Policy, including cost implications and obligations for both parties."]
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: cardStyle,
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
          style: {
            fontSize: "1rem",
            marginBottom: "0.75rem"
          },
          children: "Select items to return"
        }), order.lineItems.nodes.map((lineItem) => {
          const isSelected = selectedItems.has(lineItem.id);
          const selQty = selectedItems.get(lineItem.id) ?? 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              padding: "0.75rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              opacity: isSelected ? 1 : 0.6
            },
            children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "checkbox",
              checked: isSelected,
              onChange: () => handleItemToggle(lineItem.id, lineItem.quantity),
              style: {
                marginTop: "4px",
                flexShrink: 0
              }
            }), lineItem.image && /* @__PURE__ */ jsxRuntimeExports.jsx(Image, {
              data: lineItem.image,
              width: 56,
              height: 56,
              style: {
                borderRadius: "4px",
                objectFit: "cover",
                flexShrink: 0
              }
            }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              style: {
                flex: 1,
                minWidth: 0
              },
              children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                style: {
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "0.875rem"
                },
                children: lineItem.title
              }), lineItem.variantTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
                style: {
                  margin: "0.2rem 0 0",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)"
                },
                children: lineItem.variantTitle
              }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
                style: {
                  margin: "0.25rem 0 0",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)"
                },
                children: ["Ordered: ", lineItem.quantity]
              }), isSelected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                style: {
                  marginTop: "0.4rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                },
                children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
                  style: {
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.6)"
                  },
                  children: "Return qty:"
                }), /* @__PURE__ */ jsxRuntimeExports.jsx("select", {
                  value: selQty,
                  onChange: (e) => handleQtyChange(lineItem.id, Number(e.target.value)),
                  style: {
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "4px",
                    color: "white",
                    padding: "2px 6px",
                    fontSize: "0.8rem"
                  },
                  children: Array.from({
                    length: lineItem.quantity
                  }, (_2, i2) => i2 + 1).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", {
                    value: n,
                    children: n
                  }, n))
                })]
              })]
            }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
              style: {
                textAlign: "right",
                flexShrink: 0
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
                data: lineItem.price
              })
            })]
          }, lineItem.id);
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("form", {
        onSubmit: handleReturnSubmit,
        style: cardStyle,
        children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            marginBottom: "0.75rem"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("label", {
            style: {
              display: "block",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "0.4rem"
            },
            children: "Reason for return"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", {
            value: returnReason,
            onChange: (e) => setReturnReason(e.target.value),
            required: true,
            rows: 3,
            placeholder: "e.g. Item arrived damaged, wrong size received…",
            style: {
              width: "100%",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "4px",
              color: "white",
              padding: "0.5rem",
              fontSize: "0.875rem",
              resize: "vertical",
              boxSizing: "border-box"
            }
          })]
        }), (result == null ? void 0 : result.error) && result.intent === "return-request" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
          style: {
            color: "#fc8181",
            marginBottom: "0.75rem",
            fontSize: "0.875rem"
          },
          children: result.error
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            display: "flex",
            gap: "0.5rem"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            type: "submit",
            disabled: fetcher.state !== "idle" || !policyAcknowledged || selectedItems.size === 0 || !returnReason.trim(),
            style: {
              background: "rgba(255,180,100,0.15)",
              color: "rgba(255,180,100,0.9)",
              border: "1px solid rgba(255,180,100,0.3)",
              padding: "0.45rem 1.1rem",
              borderRadius: "5px",
              fontSize: "0.875rem",
              cursor: "pointer",
              opacity: !policyAcknowledged || selectedItems.size === 0 || !returnReason.trim() ? 0.5 : 1
            },
            children: fetcher.state !== "idle" ? "Submitting…" : "Submit Return Request"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            type: "button",
            onClick: () => {
              setReturnView("none");
              setSelectedItems(/* @__PURE__ */ new Map());
              setPolicyAcknowledged(false);
              setReturnReason("");
            },
            style: {
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.4)",
              padding: "0.45rem 1rem",
              borderRadius: "5px",
              fontSize: "0.875rem",
              cursor: "pointer"
            },
            children: "Cancel"
          })]
        }), (!policyAcknowledged || selectedItems.size === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
          style: {
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.4)",
            marginTop: "0.5rem"
          },
          children: [!policyAcknowledged && "Please acknowledge the Return Policy. ", selectedItems.size === 0 && "Please select at least one item to return."]
        })]
      })]
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
      to: "/account/orders",
      style: {
        color: "rgba(255, 255, 255, 0.7)",
        textDecoration: "none",
        display: "inline-block",
        marginBottom: "1rem"
      },
      children: "← Back to Orders"
    }), (result == null ? void 0 : result.error) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: result.error
    }), (result == null ? void 0 : result.success) && result.intent === "return-request" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: "Return request submitted. Our team will review it and be in touch."
    }), (result == null ? void 0 : result.success) && result.intent === "request-invoice" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: result.alreadySent ? "Invoice was already sent to your email." : "Invoice emailed to your account email address."
    }), (result == null ? void 0 : result.success) && result.intent === "archive" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: "Order archived."
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
            style: {
              fontSize: "1.25rem",
              margin: 0
            },
            children: order.name
          }), order.confirmationNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
            style: {
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.875rem",
              margin: "0.25rem 0 0"
            },
            children: ["Confirmation: ", order.confirmationNumber]
          })]
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            textAlign: "right"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
            style: {
              margin: 0,
              fontSize: "0.875rem"
            },
            children: new Date(order.processedAt).toLocaleDateString()
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
            style: {
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)"
            },
            children: order.fulfillmentStatus
          })]
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "0.75rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsxs(fetcher.Form, {
          method: "post",
          style: {
            display: "inline"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            type: "hidden",
            name: "intent",
            value: "request-invoice"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            type: "hidden",
            name: "orderId",
            value: orderId
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            type: "submit",
            disabled: fetcher.state !== "idle",
            style: {
              background: "rgba(26,180,215,0.15)",
              color: "rgba(26,180,215,0.9)",
              border: "1px solid rgba(26,180,215,0.3)",
              padding: "0.4rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.8rem"
            },
            children: fetcher.state !== "idle" && (result == null ? void 0 : result.intent) === "request-invoice" ? "Sending…" : "Email Invoice"
          })]
        }), !currentlyArchived && /* @__PURE__ */ jsxRuntimeExports.jsxs(fetcher.Form, {
          method: "post",
          style: {
            display: "inline"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            type: "hidden",
            name: "intent",
            value: "archive"
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            type: "hidden",
            name: "orderId",
            value: orderId
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
            type: "hidden",
            name: "customerId",
            value: customerId
          }), /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            type: "submit",
            disabled: fetcher.state !== "idle",
            style: {
              background: "none",
              color: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "0.4rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.8rem"
            },
            children: "Archive Order"
          })]
        }), currentlyArchived && /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          style: {
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.35)",
            padding: "0.4rem 0"
          },
          children: "Archived"
        }), !currentlyArchived && (!returnRequest || returnRequest.status === "REJECTED") && /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          type: "button",
          onClick: () => {
            setReturnView("select-items");
            setSelectedItems(/* @__PURE__ */ new Map());
            setPolicyAcknowledged(false);
            setReturnReason("");
          },
          style: {
            background: "rgba(255,180,100,0.1)",
            color: "rgba(255,180,100,0.8)",
            border: "1px solid rgba(255,180,100,0.25)",
            padding: "0.4rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "0.8rem"
          },
          children: "Request Return"
        })]
      })]
    }), returnRequest && returnRequest.status !== "REJECTED" && /* @__PURE__ */ jsxRuntimeExports.jsx(ReturnStatusCard, {
      returnRequest
    }), (returnRequest == null ? void 0 : returnRequest.status) === "REJECTED" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      style: {
        ...cardStyle,
        borderLeft: "3px solid rgba(255,100,100,0.4)",
        marginBottom: "1rem"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        style: {
          margin: 0,
          fontSize: "0.875rem",
          color: "rgba(255,150,150,0.9)"
        },
        children: "A previous return request for this order was not approved. You may submit a new request if needed."
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        style: {
          fontSize: "1.1rem",
          marginBottom: "1rem"
        },
        children: "Items"
      }), order.lineItems.nodes.map((lineItem) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          gap: "1rem",
          paddingBottom: "1rem",
          marginBottom: "1rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        },
        children: [lineItem.image && /* @__PURE__ */ jsxRuntimeExports.jsx(Image, {
          data: lineItem.image,
          width: 80,
          height: 80,
          style: {
            borderRadius: "4px",
            objectFit: "cover"
          }
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            flex: 1
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
            style: {
              margin: 0,
              fontWeight: "bold"
            },
            children: lineItem.title
          }), lineItem.variantTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
            style: {
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)"
            },
            children: lineItem.variantTitle
          }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
            style: {
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)"
            },
            children: ["Qty: ", lineItem.quantity]
          })]
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          style: {
            textAlign: "right"
          },
          children: [/* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
            data: lineItem.price
          }), lineItem.discountAllocations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
            style: {
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "#e53e3e"
            },
            children: ["-", /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
              data: lineItem.totalDiscount
            })]
          })]
        })]
      }, lineItem.id))]
    }), order.shippingAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        style: {
          fontSize: "1.1rem",
          marginBottom: "0.75rem"
        },
        children: "Shipping Address"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        style: {
          margin: 0,
          lineHeight: "1.6"
        },
        children: (_a2 = order.shippingAddress.formatted) == null ? void 0 : _a2.join(", ")
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        style: {
          fontSize: "1.1rem",
          marginBottom: "0.75rem"
        },
        children: "Order Summary"
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          style: {
            color: "rgba(255,255,255,0.7)"
          },
          children: "Subtotal"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
          data: order.subtotal
        })]
      }), order.shippingLine && parseFloat(((_b = order.shippingLine.originalPrice) == null ? void 0 : _b.amount) ?? "0") > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          style: {
            color: "rgba(255,255,255,0.7)"
          },
          children: "Shipping"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
          data: order.shippingLine.originalPrice
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          style: {
            color: "rgba(255,255,255,0.7)"
          },
          children: "Tax"
        }), (() => {
          var _a3, _b2;
          const shippingAmt = parseFloat(((_b2 = (_a3 = order.shippingLine) == null ? void 0 : _a3.originalPrice) == null ? void 0 : _b2.amount) ?? "0");
          const shippingVat = parseFloat((shippingAmt * 0.15).toFixed(2));
          const adjustedTax = {
            amount: (parseFloat(order.totalTax.amount) + shippingVat).toFixed(2),
            currencyCode: order.totalTax.currencyCode
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
            data: adjustedTax
          });
        })()]
      }), order.discountApplications.nodes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
          color: "#e53e3e"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          children: "Discounts"
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          children: order.discountApplications.nodes.map((discount, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
            children: discount.value.__typename === "MoneyV2" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
              data: discount.value
            }) : `${discount.value.percentage}%`
          }, i2))
        })]
      }), /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "0.75rem",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          fontWeight: "bold",
          fontSize: "1.1rem"
        },
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
          children: "Total"
        }), (() => {
          var _a3, _b2;
          const shippingAmt = parseFloat(((_b2 = (_a3 = order.shippingLine) == null ? void 0 : _a3.originalPrice) == null ? void 0 : _b2.amount) ?? "0");
          const shippingVat = parseFloat((shippingAmt * 0.15).toFixed(2));
          const adjustedTotal = {
            amount: (parseFloat(order.totalPrice.amount) + shippingVat).toFixed(2),
            currencyCode: order.totalPrice.currencyCode
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Money, {
            data: adjustedTotal
          });
        })()]
      })]
    })]
  });
});
function ReturnStatusCard({
  returnRequest
}) {
  const statusColors = {
    PENDING: "rgba(255,180,60,0.9)",
    APPROVED: "rgba(104,211,145,0.9)"
  };
  const borderColors = {
    PENDING: "rgba(255,180,60,0.4)",
    APPROVED: "rgba(104,211,145,0.4)"
  };
  const color = statusColors[returnRequest.status] ?? "rgba(255,255,255,0.7)";
  const border = borderColors[returnRequest.status] ?? "rgba(255,255,255,0.2)";
  let lineItems = [];
  try {
    if (returnRequest.lineItemsJson) lineItems = JSON.parse(returnRequest.lineItemsJson);
  } catch {
  }
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "1rem",
    borderLeft: `3px solid ${border}`
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    style: cardStyle,
    children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "0.75rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h3", {
        style: {
          margin: 0,
          fontSize: "1rem"
        },
        children: "Return Request"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        style: {
          fontSize: "0.75rem",
          fontWeight: 600,
          color,
          border: `1px solid ${border}`,
          borderRadius: "4px",
          padding: "2px 8px"
        },
        children: returnRequest.status
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
      style: {
        margin: "0 0 0.5rem",
        fontSize: "0.8rem",
        color: "rgba(255,255,255,0.5)"
      },
      children: ["Submitted: ", new Date(returnRequest.createdAt).toLocaleDateString()]
    }), returnRequest.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
      style: {
        margin: "0 0 0.75rem",
        fontSize: "0.875rem",
        color: "rgba(255,255,255,0.75)"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        style: {
          color: "rgba(255,255,255,0.5)"
        },
        children: "Reason: "
      }), returnRequest.reason]
    }), lineItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
      style: {
        marginBottom: "0.75rem"
      },
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        style: {
          margin: "0 0 0.4rem",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.5)"
        },
        children: "Items requested for return:"
      }), lineItems.map((item, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
        style: {
          margin: "0.2rem 0",
          fontSize: "0.875rem",
          paddingLeft: "0.75rem"
        },
        children: ["— ", item.title, item.variantTitle ? ` (${item.variantTitle})` : "", " × ", item.quantity ?? 1]
      }, i2))]
    }), returnRequest.status === "APPROVED" && returnRequest.xeroCreditNoteNum && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
      style: {
        margin: 0,
        fontSize: "0.875rem",
        color: "rgba(104,211,145,0.9)"
      },
      children: ["Credit Note: ", returnRequest.xeroCreditNoteNum]
    }), returnRequest.status === "PENDING" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      style: {
        margin: 0,
        fontSize: "0.8rem",
        color: "rgba(255,255,255,0.4)"
      },
      children: "Your return request is under review. We will be in touch once it has been processed."
    })]
  });
}
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: account_orders_$id,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CiYQWT6u.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/index-I-GCB7fn.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": true, "module": "/assets/root-Qugupo3C.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/index-I-GCB7fn.js", "/assets/Aside-WNXoZXSm.js", "/assets/CartMain-DxYckZAL.js", "/assets/SearchFormPredictive-CrKDn69o.js", "/assets/Image-XkNhEmBd.js", "/assets/Money-lXBaR0OS.js", "/assets/ProductPrice-DJuqQFfm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).collections.$handle": { "id": "routes/($locale).collections.$handle", "parentId": "root", "path": ":locale?/collections/:handle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).collections._handle-ChT9raG8.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/index-I-GCB7fn.js", "/assets/supplierImages-B2MdD-FG.js", "/assets/Image-XkNhEmBd.js", "/assets/Money-lXBaR0OS.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).collections._index": { "id": "routes/($locale).collections._index", "parentId": "root", "path": ":locale?/collections", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).collections._index-vf1RUFO2.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/index-I-GCB7fn.js", "/assets/CollectionCard-DhHd9JeB.js", "/assets/Image-XkNhEmBd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).debug-availability": { "id": "routes/($locale).debug-availability", "parentId": "root", "path": ":locale?/debug-availability", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).debug-availability-DtKl5TzR.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).checkout_.success": { "id": "routes/($locale).checkout_.success", "parentId": "root", "path": ":locale?/checkout/success", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).checkout_.success-DTAXsWI_.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).integration-test": { "id": "routes/($locale).integration-test", "parentId": "root", "path": ":locale?/integration-test", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).integration-test-C-oYMSNw.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).policies.$handle": { "id": "routes/($locale).policies.$handle", "parentId": "root", "path": ":locale?/policies/:handle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).policies._handle-BdDyvBma.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).products.$handle": { "id": "routes/($locale).products.$handle", "parentId": "root", "path": ":locale?/products/:handle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).products._handle-8m4M8lki.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/index-I-GCB7fn.js", "/assets/ProductPrice-DJuqQFfm.js", "/assets/Aside-WNXoZXSm.js", "/assets/supplierImages-B2MdD-FG.js", "/assets/Image-XkNhEmBd.js", "/assets/Money-lXBaR0OS.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).policies._index": { "id": "routes/($locale).policies._index", "parentId": "root", "path": ":locale?/policies", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).policies._index-Bp95UuAk.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/sitemap.$type.$page[.xml]": { "id": "routes/sitemap.$type.$page[.xml]", "parentId": "root", "path": "sitemap/:type/:page.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": false, "hasErrorBoundary": false, "module": "/assets/sitemap._type._page_.xml_-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).pages.$handle": { "id": "routes/($locale).pages.$handle", "parentId": "root", "path": ":locale?/pages/:handle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).pages._handle-BUmyolpH.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).checkout": { "id": "routes/($locale).checkout", "parentId": "root", "path": ":locale?/checkout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).checkout-u0YAHZD8.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/index-I-GCB7fn.js", "/assets/Money-lXBaR0OS.js", "/assets/Image-XkNhEmBd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).checkout.payment": { "id": "routes/($locale).checkout.payment", "parentId": "routes/($locale).checkout", "path": "payment", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": false, "hasErrorBoundary": false, "module": "/assets/(_locale).checkout.payment-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).checkout.cancel": { "id": "routes/($locale).checkout.cancel", "parentId": "routes/($locale).checkout", "path": "cancel", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).checkout.cancel-gXhiYW3a.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account_.authorize": { "id": "routes/account_.authorize", "parentId": "root", "path": "account/authorize", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": false, "hasErrorBoundary": false, "module": "/assets/account_.authorize-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).contact": { "id": "routes/($locale).contact", "parentId": "root", "path": ":locale?/contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).contact-DEOO1z-D.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale)._index": { "id": "routes/($locale)._index", "parentId": "root", "path": ":locale?", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale)._index-CWkHrjyt.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/CollectionCard-DhHd9JeB.js", "/assets/Image-XkNhEmBd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).search": { "id": "routes/($locale).search", "parentId": "root", "path": ":locale?/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).search-BjLdQBkO.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/SearchFormPredictive-CrKDn69o.js", "/assets/Image-XkNhEmBd.js", "/assets/Money-lXBaR0OS.js", "/assets/Aside-WNXoZXSm.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/($locale).cart": { "id": "routes/($locale).cart", "parentId": "root", "path": ":locale?/cart", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/(_locale).cart-BGTpkKzA.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/CartMain-DxYckZAL.js", "/assets/index-I-GCB7fn.js", "/assets/Aside-WNXoZXSm.js", "/assets/ProductPrice-DJuqQFfm.js", "/assets/Money-lXBaR0OS.js", "/assets/Image-XkNhEmBd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account_.login": { "id": "routes/account_.login", "parentId": "root", "path": "account/login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": false, "hasErrorBoundary": false, "module": "/assets/account_.login-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/[sitemap.xml]": { "id": "routes/[sitemap.xml]", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": false, "hasErrorBoundary": false, "module": "/assets/_sitemap.xml_-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/[robots.txt]": { "id": "routes/[robots.txt]", "parentId": "root", "path": "robots.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": false, "hasErrorBoundary": false, "module": "/assets/_robots.txt_-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account": { "id": "routes/account", "parentId": "root", "path": "account", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/account-D7xJBo_b.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account.management": { "id": "routes/account.management", "parentId": "routes/account", "path": "management", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/account.management-DB1lmOx-.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account.addresses": { "id": "routes/account.addresses", "parentId": "routes/account", "path": "addresses", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/account.addresses-6lrRrWV2.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account.profile": { "id": "routes/account.profile", "parentId": "routes/account", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/account.profile-si8YQvpa.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account._index": { "id": "routes/account._index", "parentId": "routes/account", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/account._index-BDppmtWk.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account.orders": { "id": "routes/account.orders", "parentId": "routes/account", "path": "orders", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/account.orders-CtcMNkXJ.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account.orders._index": { "id": "routes/account.orders._index", "parentId": "routes/account.orders", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/account.orders._index-DDmv-U2K.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/Money-lXBaR0OS.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/account.orders.$id": { "id": "routes/account.orders.$id", "parentId": "routes/account.orders", "path": ":id", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/account.orders._id-DqvRRhyp.js", "imports": ["/assets/chunk-6CSD65Y2-_8LZTh1s.js", "/assets/Image-XkNhEmBd.js", "/assets/Money-lXBaR0OS.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-4c94fe01.js", "version": "4c94fe01", "sri": void 0 };
const assetsBuildDirectory = "dist/client";
const basename = "/";
const future = { "unstable_optimizeDeps": true, "v8_passThroughRequests": true, "v8_trailingSlashAwareDataRequests": true, "unstable_previewServerPrerendering": false, "v8_middleware": true, "v8_splitRouteModules": true, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/($locale).collections.$handle": {
    id: "routes/($locale).collections.$handle",
    parentId: "root",
    path: ":locale?/collections/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/($locale).collections._index": {
    id: "routes/($locale).collections._index",
    parentId: "root",
    path: ":locale?/collections",
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/($locale).debug-availability": {
    id: "routes/($locale).debug-availability",
    parentId: "root",
    path: ":locale?/debug-availability",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/($locale).checkout_.success": {
    id: "routes/($locale).checkout_.success",
    parentId: "root",
    path: ":locale?/checkout/success",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/($locale).integration-test": {
    id: "routes/($locale).integration-test",
    parentId: "root",
    path: ":locale?/integration-test",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/($locale).policies.$handle": {
    id: "routes/($locale).policies.$handle",
    parentId: "root",
    path: ":locale?/policies/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/($locale).products.$handle": {
    id: "routes/($locale).products.$handle",
    parentId: "root",
    path: ":locale?/products/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/($locale).policies._index": {
    id: "routes/($locale).policies._index",
    parentId: "root",
    path: ":locale?/policies",
    index: true,
    caseSensitive: void 0,
    module: route8
  },
  "routes/sitemap.$type.$page[.xml]": {
    id: "routes/sitemap.$type.$page[.xml]",
    parentId: "root",
    path: "sitemap/:type/:page.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/($locale).pages.$handle": {
    id: "routes/($locale).pages.$handle",
    parentId: "root",
    path: ":locale?/pages/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/($locale).checkout": {
    id: "routes/($locale).checkout",
    parentId: "root",
    path: ":locale?/checkout",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/($locale).checkout.payment": {
    id: "routes/($locale).checkout.payment",
    parentId: "routes/($locale).checkout",
    path: "payment",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/($locale).checkout.cancel": {
    id: "routes/($locale).checkout.cancel",
    parentId: "routes/($locale).checkout",
    path: "cancel",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/account_.authorize": {
    id: "routes/account_.authorize",
    parentId: "root",
    path: "account/authorize",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/($locale).contact": {
    id: "routes/($locale).contact",
    parentId: "root",
    path: ":locale?/contact",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/($locale)._index": {
    id: "routes/($locale)._index",
    parentId: "root",
    path: ":locale?",
    index: true,
    caseSensitive: void 0,
    module: route16
  },
  "routes/($locale).search": {
    id: "routes/($locale).search",
    parentId: "root",
    path: ":locale?/search",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/($locale).cart": {
    id: "routes/($locale).cart",
    parentId: "root",
    path: ":locale?/cart",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/account_.login": {
    id: "routes/account_.login",
    parentId: "root",
    path: "account/login",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/[sitemap.xml]": {
    id: "routes/[sitemap.xml]",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/[robots.txt]": {
    id: "routes/[robots.txt]",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/account": {
    id: "routes/account",
    parentId: "root",
    path: "account",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/account.management": {
    id: "routes/account.management",
    parentId: "routes/account",
    path: "management",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/account.addresses": {
    id: "routes/account.addresses",
    parentId: "routes/account",
    path: "addresses",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/account.profile": {
    id: "routes/account.profile",
    parentId: "routes/account",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/account._index": {
    id: "routes/account._index",
    parentId: "routes/account",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route26
  },
  "routes/account.orders": {
    id: "routes/account.orders",
    parentId: "routes/account",
    path: "orders",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "routes/account.orders._index": {
    id: "routes/account.orders._index",
    parentId: "routes/account.orders",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route28
  },
  "routes/account.orders.$id": {
    id: "routes/account.orders.$id",
    parentId: "routes/account.orders",
    path: ":id",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  }
};
const allowedActionOrigins = false;
const serverBuild = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allowedActionOrigins,
  assets: serverManifest,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
}, Symbol.toStringTag, { value: "Module" }));
class AppSession {
  constructor(sessionStorage2, session) {
    __publicField(this, "isPending", false);
    __privateAdd(this, _sessionStorage);
    __privateAdd(this, _session);
    __privateSet(this, _sessionStorage, sessionStorage2);
    __privateSet(this, _session, session);
  }
  static async init(request, secrets) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: "session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets
      }
    });
    const session = await storage.getSession(request.headers.get("Cookie")).catch(() => storage.getSession());
    return new this(storage, session);
  }
  get has() {
    return __privateGet(this, _session).has;
  }
  get get() {
    return __privateGet(this, _session).get;
  }
  get flash() {
    return __privateGet(this, _session).flash;
  }
  get unset() {
    this.isPending = true;
    return __privateGet(this, _session).unset;
  }
  get set() {
    this.isPending = true;
    return __privateGet(this, _session).set;
  }
  destroy() {
    return __privateGet(this, _sessionStorage).destroySession(__privateGet(this, _session));
  }
  commit() {
    this.isPending = false;
    return __privateGet(this, _sessionStorage).commitSession(__privateGet(this, _session));
  }
}
_sessionStorage = new WeakMap();
_session = new WeakMap();
const DEFAULT_LOCALE = {
  language: "EN",
  country: "ZA",
  pathPrefix: ""
};
const LOCALE_MAP = {
  "/en-za": { language: "EN", country: "ZA", pathPrefix: "/en-za" },
  "/en-nz": { language: "EN", country: "NZ", pathPrefix: "/en-nz" },
  "/en-au": { language: "EN", country: "AU", pathPrefix: "/en-au" },
  "/en-us": { language: "EN", country: "US", pathPrefix: "/en-us" }
};
function getLocaleFromRequest(request) {
  var _a2;
  const url = new URL(request.url);
  const pathPrefix = `/${((_a2 = url.pathname.split("/")[1]) == null ? void 0 : _a2.toLowerCase()) ?? ""}`;
  return LOCALE_MAP[pathPrefix] ?? DEFAULT_LOCALE;
}
const additionalContext = {};
async function createHydrogenRouterContext(request, env, executionContext) {
  if (!(env == null ? void 0 : env.SESSION_SECRET)) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open("hydrogen"),
    AppSession.init(request, [env.SESSION_SECRET])
  ]);
  const locale = getLocaleFromRequest(request);
  const hydrogenContext = Ja(
    {
      env,
      request,
      cache,
      waitUntil,
      session,
      i18n: locale,
      cart: {
        queryFragment: CART_QUERY_FRAGMENT,
        numCartLines: 100
      },
      customerAccount: {
        useCustomAuthDomain: true
      },
      buyerIdentity: {
        countryCode: locale.country
      }
    },
    additionalContext
  );
  return hydrogenContext;
}
const server = {
  async fetch(request, env, executionContext) {
    try {
      const hydrogenContext = await createHydrogenRouterContext(
        request,
        env,
        executionContext
      );
      const handleRequest2 = Xa({
        build: serverBuild,
        mode: "production",
        getLoadContext: () => hydrogenContext
      });
      const response = await handleRequest2(request);
      if (hydrogenContext.session.isPending) {
        response.headers.set(
          "Set-Cookie",
          await hydrogenContext.session.commit()
        );
      }
      if (response.status === 404) {
        return Ms({
          request,
          response,
          storefront: hydrogenContext.storefront
        });
      }
      return response;
    } catch (error) {
      console.error(error);
      return new Response("An unexpected error occurred", { status: 500 });
    }
  }
};
function s({ headTags: n }) {
  return a(n), null;
}
var c = "text-transform: uppercase;", l = "text-transform: uppercase; font-weight: bold; text-transform: uppercase;font-weight: bold";
function a(n) {
  console.log(" "), console.log("%cSEO Meta Tags", `${l}`), console.log(" "), n.forEach((e) => {
    if (e.tag === "script") {
      if (console.log("%c• JSON LD ", c), e.children) try {
        console.table(JSON.parse(e.children), ["name", "content"]);
      } catch {
        console.log(e.children);
      }
    } else {
      if (console.log(`%c• ${e.tag} `, c), e.children) if (typeof e.children == "string") console.log(`↳ ${e.children}`);
      else try {
        Object.entries(JSON.parse(e.children)).map(([t, o]) => console.log(`↳ ${o}`));
      } catch {
        console.log(e.children);
      }
      if (e.props.property === "og:image:url") {
        let t = e.props.content;
        i(t).then((o) => {
          let r = `font-size: 400px; padding: 10px; background: white url(${o}) no-repeat center; background-size: contain;`;
          console.log("%c• Share image preview", c), console.log("%c  ", r), console.log(`↳ ${t}`);
        }).catch((o) => {
          console.error(o);
        });
      }
      Object.entries(e.props).map(([t, o]) => {
        console.log(`↳ ${t} → ${o}`);
      });
    }
    console.log(" ");
  });
}
async function i(n) {
  let o = await (await (await fetch(n)).blob()).arrayBuffer();
  return `data:image/png;base64,${g(o)}`;
}
function g(n) {
  let e = "", t = new Uint8Array(n), o = t.byteLength;
  for (let r = 0; r < o; r++) e += String.fromCharCode(t[r]);
  return btoa(e);
}
const logSeoTagsTY72EQWZ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: s,
  logSeoTags: a
}, Symbol.toStringTag, { value: "Module" }));
export {
  server as default
};
