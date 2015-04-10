/*
 RequireJS 2.1.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs, require, define;
(function (k)
{
    function h(h) { return "[object Function]" === ga.call(h) } function ha(h) { return "[object Array]" === ga.call(h) } function R(h, g) { if (h) { var p; for (p = 0; p < h.length && (!h[p] || !g(h[p], p, h)) ; p += 1); } } function U(h, g) { if (h) { var p; for (p = h.length - 1; -1 < p && (!h[p] || !g(h[p], p, h)) ; p -= 1); } } function X(h, g) { for (var p in h) if (h.hasOwnProperty(p) && g(h[p], p)) break } function Y(h, g, p, k) { g && X(g, function (g, z) { if (p || !ia.call(h, z)) k && "string" !== typeof g ? (h[z] || (h[z] = {}), Y(h[z], g, p, k)) : h[z] = g }); return h } function P(h, g)
    {
        return function ()
        {
            return g.apply(h,
            arguments)
        }
    } function Ja(h) { if (!h) return h; var g = k; R(h.split("."), function (h) { g = g[h] }); return g } function ja(h, g, p, k) { g = Error(g + "\nhttp://requirejs.org/docs/errors.html#" + h); g.requireType = h; g.requireModules = k; p && (g.originalError = p); return g } function Pa(g)
    {
        function z(b, h, g)
        {
            var l, B, m, q, k, p, ca, z = h && h.split("/"); l = z; var y = A.map, t = y && y["*"]; if (b && "." === b.charAt(0)) if (h)
            {
                l = A.pkgs[h] ? z = [h] : z.slice(0, z.length - 1); h = b = l.concat(b.split("/")); for (l = 0; h[l]; l += 1) if (B = h[l], "." === B) h.splice(l, 1), l -= 1; else if (".." ===
                B) if (1 === l && (".." === h[2] || ".." === h[0])) break; else 0 < l && (h.splice(l - 1, 2), l -= 2); l = A.pkgs[h = b[0]]; b = b.join("/"); l && b === h + "/" + l.main && (b = h)
            } else 0 === b.indexOf("./") && (b = b.substring(2)); if (g && (z || t) && y) { h = b.split("/"); for (l = h.length; 0 < l; l -= 1) { m = h.slice(0, l).join("/"); if (z) for (B = z.length; 0 < B; B -= 1) if (g = y[z.slice(0, B).join("/")]) if (g = g[m]) { q = g; k = l; break } if (q) break; !p && (t && t[m]) && (p = t[m], ca = l) } !q && p && (q = p, k = ca); q && (h.splice(0, k, q), b = h.join("/")) } return b
        } function p(b)
        {
            C && R(document.getElementsByTagName("script"),
            function (h) { if (h.getAttribute("data-requiremodule") === b && h.getAttribute("data-requirecontext") === v.contextName) return h.parentNode.removeChild(h), !0 })
        } function s(b) { var h = A.paths[b]; if (h && ha(h) && 1 < h.length) return p(b), h.shift(), v.require.undef(b), v.require([b]), !0 } function t(b) { var h, g = b ? b.indexOf("!") : -1; -1 < g && (h = b.substring(0, g), b = b.substring(g + 1, b.length)); return [h, b] } function O(b, h, g, l)
        {
            var B, m, q = null, k = h ? h.name : null, p = b, ca = !0, s = ""; b || (ca = !1, b = "_@r" + (ma += 1)); b = t(b); q = b[0]; b = b[1]; q && (q = z(q, k, l),
            m = L[q]); b && (q ? s = m && m.normalize ? m.normalize(b, function (b) { return z(b, k, l) }) : z(b, k, l) : (s = z(b, k, l), b = t(s), q = b[0], s = b[1], g = !0, B = v.nameToUrl(s))); g = q && !m && !g ? "_unnormalized" + (Aa += 1) : ""; return { prefix: q, name: s, parentMap: h, unnormalized: !!g, url: B, originalName: p, isDefine: ca, id: (q ? q + "!" + s : s) + g }
        } function K(b) { var h = b.id, g = I[h]; g || (g = I[h] = new v.Module(b)); return g } function M(b, h, g) { var l = b.id, B = I[l]; if (ia.call(L, l) && (!B || B.defineEmitComplete)) "defined" === h && g(L[l]); else K(b).on(h, g) } function b(b, h)
        {
            var g = b.requireModules,
            l = !1; if (h) h(b); else if (R(g, function (h) { if (h = I[h]) h.error = b, h.events.error && (l = !0, h.emit("error", b)) }), !l) E.onError(b)
        } function Q() { Ba.length && (Ta.apply(V, [V.length - 1, 0].concat(Ba)), Ba = []) } function U(b, h, g) { var l = b.map.id; b.error ? b.emit("error", b.error) : (h[l] = !0, R(b.depMaps, function (l, m) { var q = l.id, k = I[q]; k && (!b.depMatched[m] && !g[q]) && (h[q] ? (b.defineDep(m, L[q]), b.check()) : U(k, h, g)) }), g[l] = !0) } function Z()
        {
            var h, g, H, l, B = (H = 1E3 * A.waitSeconds) && v.startTime + H < (new Date).getTime(), m = [], q = [], k = !1, ca = !0;
            if (!$) { $ = !0; X(I, function (b) { h = b.map; g = h.id; if (b.enabled && (h.isDefine || q.push(b), !b.error)) if (!b.inited && B) s(g) ? k = l = !0 : (m.push(g), p(g)); else if (!b.inited && (b.fetched && h.isDefine) && (k = !0, !h.prefix)) return ca = !1 }); if (B && m.length) return H = ja("timeout", "Load timeout for modules: " + m, null, m), H.contextName = v.contextName, b(H); ca && R(q, function (b) { U(b, {}, {}) }); if ((!B || l) && k) if ((C || qa) && !ga) ga = setTimeout(function () { ga = 0; Z() }, 50); $ = !1 }
        } function S(b) { K(O(b[0], null, !0)).init(b[1], b[2]) } function da(b)
        {
            var b = b.currentTarget ||
            b.srcElement, h = v.onScriptLoad; b.detachEvent && !Ca ? b.detachEvent("onreadystatechange", h) : b.removeEventListener("load", h, !1); h = v.onScriptError; (!b.detachEvent || Ca) && b.removeEventListener("error", h, !1); return { node: b, id: b && b.getAttribute("data-requiremodule") }
        } var $, ea, v, ra, ga, A = { waitSeconds: 7, baseUrl: "./", paths: {}, pkgs: {}, shim: {} }, I = {}, ka = {}, V = [], L = {}, sa = {}, ma = 1, Aa = 1; ra = {
            require: function (b) { return b.require ? b.require : b.require = v.makeRequire(b.map) }, exports: function (b)
            {
                b.usingExports = !0; if (b.map.isDefine) return b.exports ?
                b.exports : b.exports = L[b.map.id] = {}
            }, module: function (b) { return b.module ? b.module : b.module = { id: b.map.id, uri: b.map.url, config: function () { return A.config && A.config[b.map.id] || {} }, exports: L[b.map.id] } }
        }; ea = function (b) { this.events = ka[b.id] || {}; this.map = b; this.shim = A.shim[b.id]; this.depExports = []; this.depMaps = []; this.depMatched = []; this.pluginMaps = {}; this.depCount = 0 }; ea.prototype = {
            init: function (b, h, g, l)
            {
                l = l || {}; if (!this.inited)
                {
                    this.factory = h; if (g) this.on("error", g); else this.events.error && (g = P(this, function (b)
                    {
                        this.emit("error",
                        b)
                    })); this.depMaps = b && b.slice(0); this.errback = g; this.inited = !0; this.ignore = l.ignore; l.enabled || this.enabled ? this.enable() : this.check()
                }
            }, defineDep: function (b, h) { this.depMatched[b] || (this.depMatched[b] = !0, this.depCount -= 1, this.depExports[b] = h) }, fetch: function ()
            {
                if (!this.fetched)
                {
                    this.fetched = !0; v.startTime = (new Date).getTime(); var b = this.map; if (this.shim) v.makeRequire(this.map, { enableBuildCallback: !0 })(this.shim.deps || [], P(this, function () { return b.prefix ? this.callPlugin() : this.load() })); else return b.prefix ?
                    this.callPlugin() : this.load()
                }
            }, load: function () { var b = this.map.url; sa[b] || (sa[b] = !0, v.load(this.map.id, b)) }, check: function ()
            {
                if (this.enabled && !this.enabling)
                {
                    var g, k, H = this.map.id; k = this.depExports; var l = this.exports, B = this.factory; if (this.inited) if (this.error) this.emit("error", this.error); else
                    {
                        if (!this.defining)
                        {
                            this.defining = !0; if (1 > this.depCount && !this.defined)
                            {
                                if (h(B))
                                {
                                    if (this.events.error) try { l = v.execCb(H, B, k, l) } catch (m) { g = m } else l = v.execCb(H, B, k, l); this.map.isDefine && ((k = this.module) && void 0 !==
                                    k.exports && k.exports !== this.exports ? l = k.exports : void 0 === l && this.usingExports && (l = this.exports)); if (g) return g.requireMap = this.map, g.requireModules = [this.map.id], g.requireType = "define", b(this.error = g)
                                } else l = B; this.exports = l; if (this.map.isDefine && !this.ignore && (L[H] = l, E.onResourceLoad)) E.onResourceLoad(v, this.map, this.depMaps); delete I[H]; this.defined = !0
                            } this.defining = !1; this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else this.fetch()
                }
            },
            callPlugin: function ()
            {
                var h = this.map, g = h.id, k = O(h.prefix); this.depMaps.push(k); M(k, "defined", P(this, function (l)
                {
                    var k, m; m = this.map.name; var q = this.map.parentMap ? this.map.parentMap.name : null, H = v.makeRequire(h.parentMap, { enableBuildCallback: !0, skipMap: !0 }); if (this.map.unnormalized)
                    {
                        if (l.normalize && (m = l.normalize(m, function (b) { return z(b, q, !0) }) || ""), l = O(h.prefix + "!" + m, this.map.parentMap), M(l, "defined", P(this, function (b) { this.init([], function () { return b }, null, { enabled: !0, ignore: !0 }) })), m = I[l.id])
                        {
                            this.depMaps.push(l);
                            if (this.events.error) m.on("error", P(this, function (b) { this.emit("error", b) })); m.enable()
                        }
                    } else k = P(this, function (b) { this.init([], function () { return b }, null, { enabled: !0 }) }), k.error = P(this, function (h) { this.inited = !0; this.error = h; h.requireModules = [g]; X(I, function (b) { 0 === b.map.id.indexOf(g + "_unnormalized") && delete I[b.map.id] }); b(h) }), k.fromText = P(this, function (b, g)
                    {
                        var l = h.name, m = O(l), q = ta; g && (b = g); q && (ta = !1); K(m); try { E.exec(b) } catch (p) { throw Error("fromText eval for " + l + " failed: " + p); } q && (ta = !0); this.depMaps.push(m);
                        v.completeLoad(l); H([l], k)
                    }), l.load(h.name, H, k, A)
                })); v.enable(k, this); this.pluginMaps[k.id] = k
            }, enable: function ()
            {
                this.enabling = this.enabled = !0; R(this.depMaps, P(this, function (b, h)
                {
                    var g, l; if ("string" === typeof b) { b = O(b, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap); this.depMaps[h] = b; if (g = ra[b.id]) { this.depExports[h] = g(this); return } this.depCount += 1; M(b, "defined", P(this, function (b) { this.defineDep(h, b); this.check() })); this.errback && M(b, "error", this.errback) } g = b.id; l = I[g]; !ra[g] && (l && !l.enabled) &&
                    v.enable(b, this)
                })); X(this.pluginMaps, P(this, function (b) { var h = I[b.id]; h && !h.enabled && v.enable(b, this) })); this.enabling = !1; this.check()
            }, on: function (b, h) { var g = this.events[b]; g || (g = this.events[b] = []); g.push(h) }, emit: function (b, h) { R(this.events[b], function (b) { b(h) }); "error" === b && delete this.events[b] }
        }; v = {
            config: A, contextName: g, registry: I, defined: L, urlFetched: sa, defQueue: V, Module: ea, makeModuleMap: O, nextTick: E.nextTick, configure: function (b)
            {
                b.baseUrl && "/" !== b.baseUrl.charAt(b.baseUrl.length - 1) && (b.baseUrl +=
                "/"); var h = A.pkgs, g = A.shim, l = A.paths, k = A.map; Y(A, b, !0); A.paths = Y(l, b.paths, !0); b.map && (A.map = Y(k || {}, b.map, !0, !0)); b.shim && (X(b.shim, function (b, h) { ha(b) && (b = { deps: b }); b.exports && !b.exportsFn && (b.exportsFn = v.makeShimExports(b)); g[h] = b }), A.shim = g); b.packages && (R(b.packages, function (b) { b = "string" === typeof b ? { name: b } : b; h[b.name] = { name: b.name, location: b.location || b.name, main: (b.main || "main").replace(Ua, "").replace(ua, "") } }), A.pkgs = h); X(I, function (b, h) { !b.inited && !b.map.unnormalized && (b.map = O(h)) }); if (b.deps ||
                b.callback) v.require(b.deps || [], b.callback)
            }, makeShimExports: function (b) { return function () { var h; b.init && (h = b.init.apply(k, arguments)); return h || Ja(b.exports) } }, makeRequire: function (k, p)
            {
                function H(l, B, m)
                {
                    var q, z; p.enableBuildCallback && (B && h(B)) && (B.__requireJsBuild = !0); if ("string" === typeof l)
                    {
                        if (h(B)) return b(ja("requireargs", "Invalid require call"), m); if (k && ra[l]) return ra[l](I[k.id]); if (E.get) return E.get(v, l, k); q = O(l, k, !1, !0); q = q.id; return !ia.call(L, q) ? b(ja("notloaded", 'Module name "' + q + '" has not been loaded yet for context: ' +
                        g + (k ? "" : ". Use require([])"))) : L[q]
                    } for (Q() ; V.length;) { q = V.shift(); if (null === q[0]) return b(ja("mismatch", "Mismatched anonymous define() module: " + q[q.length - 1])); S(q) } v.nextTick(function () { z = K(O(null, k)); z.skipMap = p.skipMap; z.init(l, B, m, { enabled: !0 }); Z() }); return H
                } p = p || {}; Y(H, {
                    isBrowser: C, toUrl: function (b) { var h = b.lastIndexOf("."), g = null; -1 !== h && (g = b.substring(h, b.length), b = b.substring(0, h)); return v.nameToUrl(z(b, k && k.id, !0), g) }, defined: function (b) { b = O(b, k, !1, !0).id; return ia.call(L, b) }, specified: function (b)
                    {
                        b =
                        O(b, k, !1, !0).id; return ia.call(L, b) || ia.call(I, b)
                    }
                }); k || (H.undef = function (b) { Q(); var h = O(b, k, !0), g = I[b]; delete L[b]; delete sa[h.url]; delete ka[b]; g && (g.events.defined && (ka[b] = g.events), delete I[b]) }); return H
            }, enable: function (b) { I[b.id] && K(b).enable() }, completeLoad: function (h)
            {
                var g, k, l = A.shim[h] || {}, p = l.exports; for (Q() ; V.length;) { k = V.shift(); if (null === k[0]) { k[0] = h; if (g) break; g = !0 } else k[0] === h && (g = !0); S(k) } k = I[h]; if (!g && !L[h] && k && !k.inited)
                {
                    if (A.enforceDefine && (!p || !Ja(p))) return s(h) ? void 0 : b(ja("nodefine",
                    "No define call for " + h, null, [h])); S([h, l.deps || [], l.exportsFn])
                } Z()
            }, nameToUrl: function (b, h)
            {
                var g, k, p, m, q, z; if (E.jsExtRegExp.test(b)) m = b + (h || ""); else { g = A.paths; k = A.pkgs; m = b.split("/"); for (q = m.length; 0 < q; q -= 1) if (z = m.slice(0, q).join("/"), p = k[z], z = g[z]) { ha(z) && (z = z[0]); m.splice(0, q, z); break } else if (p) { g = b === p.name ? p.location + "/" + p.main : p.location; m.splice(0, q, g); break } m = m.join("/"); m += h || (/\?/.test(m) ? "" : ".js"); m = ("/" === m.charAt(0) || m.match(/^[\w\+\.\-]+:/) ? "" : A.baseUrl) + m } return A.urlArgs ? m + ((-1 ===
                m.indexOf("?") ? "?" : "&") + A.urlArgs) : m
            }, load: function (b, h) { E.load(v, b, h) }, execCb: function (b, h, g, k) { return h.apply(k, g) }, onScriptLoad: function (b) { if ("load" === b.type || Va.test((b.currentTarget || b.srcElement).readyState)) la = null, b = da(b), v.completeLoad(b.id) }, onScriptError: function (h) { var g = da(h); if (!s(g.id)) return b(ja("scripterror", "Script error", h, [g.id])) }
        }; v.require = v.makeRequire(); return v
    } var E, M, S, da, K, $, la, ea, ka, ma, Ka = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, Wa = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    ua = /\.js$/, Ua = /^\.\//; M = Object.prototype; var ga = M.toString, ia = M.hasOwnProperty, Ta = Array.prototype.splice, C = !!("undefined" !== typeof window && navigator && document), qa = !C && "undefined" !== typeof importScripts, Va = C && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, Ca = "undefined" !== typeof opera && "[object Opera]" === opera.toString(), Q = {}, g = {}, Ba = [], ta = !1; if ("undefined" === typeof define)
    {
        if ("undefined" !== typeof requirejs) { if (h(requirejs)) return; g = requirejs; requirejs = void 0 } "undefined" !==
        typeof require && !h(require) && (g = require, require = void 0); E = requirejs = function (h, g, k, s) { var t, C = "_"; !ha(h) && "string" !== typeof h && (t = h, ha(g) ? (h = g, g = k, k = s) : h = []); t && t.context && (C = t.context); (s = Q[C]) || (s = Q[C] = E.s.newContext(C)); t && s.configure(t); return s.require(h, g, k) }; E.config = function (h) { return E(h) }; E.nextTick = "undefined" !== typeof setTimeout ? function (h) { setTimeout(h, 4) } : function (h) { h() }; require || (require = E); E.version = "2.1.0"; E.jsExtRegExp = /^\/|:|\?|\.js$/; E.isBrowser = C; M = E.s = { contexts: Q, newContext: Pa };
        E({}); R(["toUrl", "undef", "defined", "specified"], function (h) { E[h] = function () { var g = Q._; return g.require[h].apply(g, arguments) } }); if (C && (S = M.head = document.getElementsByTagName("head")[0], da = document.getElementsByTagName("base")[0])) S = M.head = da.parentNode; E.onError = function (h) { throw h; }; E.load = function (h, g, k)
        {
            var s = h && h.config || {}, t; if (C) return t = s.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), t.type = s.scriptType || "text/javascript", t.charset =
            "utf-8", t.async = !0, t.setAttribute("data-requirecontext", h.contextName), t.setAttribute("data-requiremodule", g), t.attachEvent && !(t.attachEvent.toString && 0 > t.attachEvent.toString().indexOf("[native code")) && !Ca ? (ta = !0, t.attachEvent("onreadystatechange", h.onScriptLoad)) : (t.addEventListener("load", h.onScriptLoad, !1), t.addEventListener("error", h.onScriptError, !1)), t.src = k, ea = t, da ? S.insertBefore(t, da) : S.appendChild(t), ea = null, t; qa && (importScripts(k), h.completeLoad(g))
        }; C && U(document.getElementsByTagName("script"),
        function (h) { S || (S = h.parentNode); if (K = h.getAttribute("data-main")) return g.baseUrl || ($ = K.split("/"), ka = $.pop(), ma = $.length ? $.join("/") + "/" : "./", g.baseUrl = ma, K = ka), K = K.replace(ua, ""), g.deps = g.deps ? g.deps.concat(K) : [K], !0 }); define = function (g, k, p)
        {
            var s, t; "string" !== typeof g && (p = k, k = g, g = null); ha(k) || (p = k, k = []); !k.length && h(p) && p.length && (p.toString().replace(Ka, "").replace(Wa, function (h, g) { k.push(g) }), k = (1 === p.length ? ["require"] : ["require", "exports", "module"]).concat(k)); if (ta)
            {
                if (!(s = ea)) la && "interactive" ===
                la.readyState || U(document.getElementsByTagName("script"), function (h) { if ("interactive" === h.readyState) return la = h }), s = la; s && (g || (g = s.getAttribute("data-requiremodule")), t = Q[s.getAttribute("data-requirecontext")])
            } (t ? t.defQueue : Ba).push([g, k, p])
        }; define.amd = { jQuery: !0 }; E.exec = function (h) { return eval(h) }; E(g)
    }
})(this);
(function (k, h)
{
    function ha(a, c, d) { if (d === h && 1 === a.nodeType) if (d = "data-" + c.replace(Fc, "-$1").toLowerCase(), d = a.getAttribute(d), "string" === typeof d) { try { d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : Ec.test(d) ? b.parseJSON(d) : d } catch (e) { } b.data(a, c, d) } else d = h; return d } function R(a) { for (var c in a) if (!("data" === c && b.isEmptyObject(a[c])) && "toJSON" !== c) return !1; return !0 } function U() { return !1 } function X() { return !0 } function Y(a) { return !a || !a.parentNode || 11 === a.parentNode.nodeType } function P(a,
    c) { do a = a[c]; while (a && 1 !== a.nodeType); return a } function Ja(a, c, d) { c = c || 0; if (b.isFunction(c)) return b.grep(a, function (a, b) { return !!c.call(a, b, a) === d }); if (c.nodeType) return b.grep(a, function (a) { return a === c === d }); if ("string" === typeof c) { var e = b.grep(a, function (a) { return 1 === a.nodeType }); if (Gc.test(c)) return b.filter(c, e, !d); c = b.filter(c, e) } return b.grep(a, function (a) { return 0 <= b.inArray(a, c) === d }) } function ja(a)
    {
        var c = Mb.split("|"), a = a.createDocumentFragment(); if (a.createElement) for (; c.length;) a.createElement(c.pop());
        return a
    } function Pa(a, c) { if (1 === c.nodeType && b.hasData(a)) { var d, e, f; e = b._data(a); var i = b._data(c, e), j = e.events; if (j) for (d in delete i.handle, i.events = {}, j) { e = 0; for (f = j[d].length; e < f; e++) b.event.add(c, d, j[d][e]) } i.data && (i.data = b.extend({}, i.data)) } } function E(a, c)
    {
        var d; 1 === c.nodeType && (c.clearAttributes && c.clearAttributes(), c.mergeAttributes && c.mergeAttributes(a), d = c.nodeName.toLowerCase(), "object" === d ? (c.parentNode && (c.outerHTML = a.outerHTML), b.support.html5Clone && (a.innerHTML && !b.trim(c.innerHTML)) &&
        (c.innerHTML = a.innerHTML)) : "input" === d && Nb.test(a.type) ? (c.defaultChecked = c.checked = a.checked, c.value !== a.value && (c.value = a.value)) : "option" === d ? c.selected = a.defaultSelected : "input" === d || "textarea" === d ? c.defaultValue = a.defaultValue : "script" === d && c.text !== a.text && (c.text = a.text), c.removeAttribute(b.expando))
    } function M(a) { return "undefined" !== typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" !== typeof a.querySelectorAll ? a.querySelectorAll("*") : [] } function S(a)
    {
        Nb.test(a.type) && (a.defaultChecked =
        a.checked)
    } function da(a, c) { if (c in a) return c; for (var b = c.charAt(0).toUpperCase() + c.slice(1), e = c, f = Ob.length; f--;) if (c = Ob[f] + b, c in a) return c; return e } function K(a, c) { a = c || a; return "none" === b.css(a, "display") || !b.contains(a.ownerDocument, a) } function $(a, c)
    {
        for (var d, e, f = [], i = 0, j = a.length; i < j; i++) d = a[i], d.style && (f[i] = b._data(d, "olddisplay"), c ? (!f[i] && "none" === d.style.display && (d.style.display = ""), "" === d.style.display && K(d) && (f[i] = b._data(d, "olddisplay", ma(d.nodeName)))) : (e = N(d, "display"), !f[i] &&
        "none" !== e && b._data(d, "olddisplay", e))); for (i = 0; i < j; i++) if (d = a[i], d.style && (!c || "none" === d.style.display || "" === d.style.display)) d.style.display = c ? f[i] || "" : "none"; return a
    } function la(a, c, b) { return (a = Hc.exec(c)) ? Math.max(0, a[1] - (b || 0)) + (a[2] || "px") : c } function ea(a, c, d, e)
    {
        for (var c = d === (e ? "border" : "content") ? 4 : "width" === c ? 1 : 0, f = 0; 4 > c; c += 2) "margin" === d && (f += b.css(a, d + va[c], !0)), e ? ("content" === d && (f -= parseFloat(N(a, "padding" + va[c])) || 0), "margin" !== d && (f -= parseFloat(N(a, "border" + va[c] + "Width")) || 0)) : (f +=
        parseFloat(N(a, "padding" + va[c])) || 0, "padding" !== d && (f += parseFloat(N(a, "border" + va[c] + "Width")) || 0)); return f
    } function ka(a, c, d) { var e = "width" === c ? a.offsetWidth : a.offsetHeight, f = !0, i = b.support.boxSizing && "border-box" === b.css(a, "boxSizing"); if (0 >= e || null == e) { e = N(a, c); if (0 > e || null == e) e = a.style[c]; if (Xa.test(e)) return e; f = i && (b.support.boxSizingReliable || e === a.style[c]); e = parseFloat(e) || 0 } return e + ea(a, c, d || (i ? "border" : "content"), f) + "px" } function ma(a)
    {
        if (pb[a]) return pb[a]; var c = b("<" + a + ">").appendTo(g.body),
        d = c.css("display"); c.remove(); if ("none" === d || "" === d) { Da = g.body.appendChild(Da || b.extend(g.createElement("iframe"), { frameBorder: 0, width: 0, height: 0 })); if (!Ea || !Da.createElement) Ea = (Da.contentWindow || Da.contentDocument).document, Ea.write("<!doctype html><html><body>"), Ea.close(); c = Ea.body.appendChild(Ea.createElement(a)); d = N(c, "display"); g.body.removeChild(Da) } return pb[a] = d
    } function Ka(a, c, d, e)
    {
        var f; if (b.isArray(c)) b.each(c, function (c, b)
        {
            d || Ic.test(a) ? e(a, b) : Ka(a + "[" + ("object" === typeof b ? c : "") + "]",
            b, d, e)
        }); else if (!d && "object" === b.type(c)) for (f in c) Ka(a + "[" + f + "]", c[f], d, e); else e(a, c)
    } function Wa(a) { return function (c, d) { "string" !== typeof c && (d = c, c = "*"); var e, f, i = c.toLowerCase().split(Z), j = 0, h = i.length; if (b.isFunction(d)) for (; j < h; j++) e = i[j], (f = /^\+/.test(e)) && (e = e.substr(1) || "*"), e = a[e] = a[e] || [], e[f ? "unshift" : "push"](d) } } function ua(a, c, b, e, f, i)
    {
        f = f || c.dataTypes[0]; i = i || {}; i[f] = !0; for (var j, f = a[f], w = 0, r = f ? f.length : 0, g = a === qb; w < r && (g || !j) ; w++) j = f[w](c, b, e), "string" === typeof j && (!g || i[j] ? j = h :
        (c.dataTypes.unshift(j), j = ua(a, c, b, e, j, i))); if ((g || !j) && !i["*"]) j = ua(a, c, b, e, "*", i); return j
    } function Ua(a, c) { var d, e, f = b.ajaxSettings.flatOptions || {}; for (d in c) c[d] !== h && ((f[d] ? a : e || (e = {}))[d] = c[d]); e && b.extend(!0, a, e) } function ga() { try { return new k.XMLHttpRequest } catch (a) { } } function ia() { setTimeout(function () { Ya = h }, 0); return Ya = b.now() } function Ta(a, c, d)
    {
        var e, f = 0, i = Za.length, j = b.Deferred().always(function () { delete h.elem }), h = function ()
        {
            for (var c = Ya || ia(), c = Math.max(0, r.startTime + r.duration - c),
            b = 1 - (c / r.duration || 0), d = 0, e = r.tweens.length; d < e; d++) r.tweens[d].run(b); j.notifyWith(a, [r, b, c]); if (1 > b && e) return c; j.resolveWith(a, [r]); return !1
        }, r = j.promise({
            elem: a, props: b.extend({}, c), opts: b.extend(!0, { specialEasing: {} }, d), originalProperties: c, originalOptions: d, startTime: Ya || ia(), duration: d.duration, tweens: [], createTween: function (c, d) { var e = b.Tween(a, r.opts, c, d, r.opts.specialEasing[c] || r.opts.easing); r.tweens.push(e); return e }, stop: function (c)
            {
                for (var b = 0, d = c ? r.tweens.length : 0; b < d; b++) r.tweens[b].run(1);
                c ? j.resolveWith(a, [r, c]) : j.rejectWith(a, [r, c]); return this
            }
        }), c = r.props, d = r.opts.specialEasing, g, x, n, k; for (e in c) if (g = b.camelCase(e), x = d[g], n = c[e], b.isArray(n) && (x = n[1], n = c[e] = n[0]), e !== g && (c[g] = n, delete c[e]), (k = b.cssHooks[g]) && "expand" in k) for (e in n = k.expand(n), delete c[g], n) e in c || (c[e] = n[e], d[e] = x); else d[g] = x; for (; f < i; f++) if (e = Za[f].call(r, a, c, r.opts)) return e; var l = r; b.each(c, function (a, c) { for (var b = (La[a] || []).concat(La["*"]), d = 0, e = b.length; d < e && !b[d].call(l, a, c) ; d++); }); b.isFunction(r.opts.start) &&
        r.opts.start.call(a, r); b.fx.timer(b.extend(h, { anim: r, queue: r.opts.queue, elem: a })); return r.progress(r.opts.progress).done(r.opts.done, r.opts.complete).fail(r.opts.fail).always(r.opts.always)
    } function C(a, c, b, e, f) { return new C.prototype.init(a, c, b, e, f) } function qa(a, c) { for (var b, e = { height: a }, f = 0, c = c ? 1 : 0; 4 > f; f += 2 - c) b = va[f], e["margin" + b] = e["padding" + b] = a; c && (e.opacity = e.width = a); return e } function Va(a) { return b.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1 } var Ca, Q, g = k.document, Ba = k.location,
    ta = k.navigator, ca = k.jQuery, z = k.$, p = Array.prototype.push, s = Array.prototype.slice, t = Array.prototype.indexOf, O = Object.prototype.toString, nb = Object.prototype.hasOwnProperty, ob = String.prototype.trim, b = function (a, c) { return new b.fn.init(a, c, Ca) }, Sa = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, yc = /\S/, Z = /\s+/, Ac = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, Bc = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, Lb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Cc = /^[\],:{}\s]*$/, v = /(?:^|:|,)(?:\s*\[)+/g, ra = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    zc = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, A = /^-ms-/, I = /-([\da-z])/gi, Dc = function (a, c) { return (c + "").toUpperCase() }, V = function () { g.addEventListener ? (g.removeEventListener("DOMContentLoaded", V, !1), b.ready()) : "complete" === g.readyState && (g.detachEvent("onreadystatechange", V), b.ready()) }, L = {}; b.fn = b.prototype = {
        constructor: b, init: function (a, c, d)
        {
            var e; if (!a) return this; if (a.nodeType) return this.context = this[0] = a, this.length = 1, this; if ("string" === typeof a)
            {
                if ((e = "<" === a.charAt(0) &&
                ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : Bc.exec(a)) && (e[1] || !c)) { if (e[1]) return a = (c = c instanceof b ? c[0] : c) && c.nodeType ? c.ownerDocument || c : g, a = b.parseHTML(e[1], a, !0), Lb.test(e[1]) && b.isPlainObject(c) && this.attr.call(a, c, !0), b.merge(this, a); if ((c = g.getElementById(e[2])) && c.parentNode) { if (c.id !== e[2]) return d.find(a); this.length = 1; this[0] = c } this.context = g; this.selector = a; return this } return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
            } if (b.isFunction(a)) return d.ready(a); a.selector !==
            h && (this.selector = a.selector, this.context = a.context); return b.makeArray(a, this)
        }, selector: "", jquery: "1.8.2", length: 0, size: function () { return this.length }, toArray: function () { return s.call(this) }, get: function (a) { return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a] }, pushStack: function (a, c, d) { a = b.merge(this.constructor(), a); a.prevObject = this; a.context = this.context; "find" === c ? a.selector = this.selector + (this.selector ? " " : "") + d : c && (a.selector = this.selector + "." + c + "(" + d + ")"); return a }, each: function (a,
        c) { return b.each(this, a, c) }, ready: function (a) { b.ready.promise().done(a); return this }, eq: function (a) { a = +a; return -1 === a ? this.slice(a) : this.slice(a, a + 1) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, slice: function () { return this.pushStack(s.apply(this, arguments), "slice", s.call(arguments).join(",")) }, map: function (a) { return this.pushStack(b.map(this, function (c, b) { return a.call(c, b, c) })) }, end: function () { return this.prevObject || this.constructor(null) }, push: p, sort: [].sort, splice: [].splice
    };
    b.fn.init.prototype = b.fn; b.extend = b.fn.extend = function () { var a, c, d, e, f, i = arguments[0] || {}, j = 1, w = arguments.length, r = !1; "boolean" === typeof i && (r = i, i = arguments[1] || {}, j = 2); "object" !== typeof i && !b.isFunction(i) && (i = {}); w === j && (i = this, --j); for (; j < w; j++) if (null != (a = arguments[j])) for (c in a) d = i[c], e = a[c], i !== e && (r && e && (b.isPlainObject(e) || (f = b.isArray(e))) ? (f ? (f = !1, d = d && b.isArray(d) ? d : []) : d = d && b.isPlainObject(d) ? d : {}, i[c] = b.extend(r, d, e)) : e !== h && (i[c] = e)); return i }; b.extend({
        noConflict: function (a)
        {
            k.$ ===
            b && (k.$ = z); a && k.jQuery === b && (k.jQuery = ca); return b
        }, isReady: !1, readyWait: 1, holdReady: function (a) { a ? b.readyWait++ : b.ready(!0) }, ready: function (a) { if (!(!0 === a ? --b.readyWait : b.isReady)) { if (!g.body) return setTimeout(b.ready, 1); b.isReady = !0; !0 !== a && 0 < --b.readyWait || (Q.resolveWith(g, [b]), b.fn.trigger && b(g).trigger("ready").off("ready")) } }, isFunction: function (a) { return "function" === b.type(a) }, isArray: Array.isArray || function (a) { return "array" === b.type(a) }, isWindow: function (a) { return null != a && a == a.window }, isNumeric: function (a)
        {
            return !isNaN(parseFloat(a)) &&
            isFinite(a)
        }, type: function (a) { return null == a ? String(a) : L[O.call(a)] || "object" }, isPlainObject: function (a) { if (!a || "object" !== b.type(a) || a.nodeType || b.isWindow(a)) return !1; try { if (a.constructor && !nb.call(a, "constructor") && !nb.call(a.constructor.prototype, "isPrototypeOf")) return !1 } catch (c) { return !1 } for (var d in a); return d === h || nb.call(a, d) }, isEmptyObject: function (a) { for (var c in a) return !1; return !0 }, error: function (a) { throw Error(a); }, parseHTML: function (a, c, d)
        {
            var e; if (!a || "string" !== typeof a) return null;
            "boolean" === typeof c && (d = c, c = 0); c = c || g; if (e = Lb.exec(a)) return [c.createElement(e[1])]; e = b.buildFragment([a], c, d ? null : []); return b.merge([], (e.cacheable ? b.clone(e.fragment) : e.fragment).childNodes)
        }, parseJSON: function (a) { if (!a || "string" !== typeof a) return null; a = b.trim(a); if (k.JSON && k.JSON.parse) return k.JSON.parse(a); if (Cc.test(a.replace(ra, "@").replace(zc, "]").replace(v, ""))) return (new Function("return " + a))(); b.error("Invalid JSON: " + a) }, parseXML: function (a)
        {
            var c, d; if (!a || "string" !== typeof a) return null;
            try { k.DOMParser ? (d = new DOMParser, c = d.parseFromString(a, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(a)) } catch (e) { c = h } (!c || !c.documentElement || c.getElementsByTagName("parsererror").length) && b.error("Invalid XML: " + a); return c
        }, noop: function () { }, globalEval: function (a) { a && yc.test(a) && (k.execScript || function (a) { k.eval.call(k, a) })(a) }, camelCase: function (a) { return a.replace(A, "ms-").replace(I, Dc) }, nodeName: function (a, c) { return a.nodeName && a.nodeName.toLowerCase() === c.toLowerCase() },
        each: function (a, c, d) { var e, f = 0, i = a.length, j = i === h || b.isFunction(a); if (d) if (j) for (e in a) { if (!1 === c.apply(a[e], d)) break } else for (; f < i && !1 !== c.apply(a[f++], d) ;); else if (j) for (e in a) { if (!1 === c.call(a[e], e, a[e])) break } else for (; f < i && !1 !== c.call(a[f], f, a[f++]) ;); return a }, trim: ob && !ob.call("\ufeff\u00a0") ? function (a) { return null == a ? "" : ob.call(a) } : function (a) { return null == a ? "" : (a + "").replace(Ac, "") }, makeArray: function (a, c)
        {
            var d, e = c || []; null != a && (d = b.type(a), null == a.length || "string" === d || "function" ===
            d || "regexp" === d || b.isWindow(a) ? p.call(e, a) : b.merge(e, a)); return e
        }, inArray: function (a, c, b) { var e; if (c) { if (t) return t.call(c, a, b); e = c.length; for (b = b ? 0 > b ? Math.max(0, e + b) : b : 0; b < e; b++) if (b in c && c[b] === a) return b } return -1 }, merge: function (a, c) { var b = c.length, e = a.length, f = 0; if ("number" === typeof b) for (; f < b; f++) a[e++] = c[f]; else for (; c[f] !== h;) a[e++] = c[f++]; a.length = e; return a }, grep: function (a, c, b) { for (var e, f = [], i = 0, j = a.length, b = !!b; i < j; i++) e = !!c(a[i], i), b !== e && f.push(a[i]); return f }, map: function (a, c, d)
        {
            var e,
            f, i = [], j = 0, w = a.length; if (a instanceof b || w !== h && "number" === typeof w && (0 < w && a[0] && a[w - 1] || 0 === w || b.isArray(a))) for (; j < w; j++) e = c(a[j], j, d), null != e && (i[i.length] = e); else for (f in a) e = c(a[f], f, d), null != e && (i[i.length] = e); return i.concat.apply([], i)
        }, guid: 1, proxy: function (a, c) { var d, e; "string" === typeof c && (d = a[c], c = a, a = d); if (!b.isFunction(a)) return h; e = s.call(arguments, 2); d = function () { return a.apply(c, e.concat(s.call(arguments))) }; d.guid = a.guid = a.guid || b.guid++; return d }, access: function (a, c, d, e, f, i, j)
        {
            var w,
            r = null == d, g = 0, k = a.length; if (d && "object" === typeof d) { for (g in d) b.access(a, c, g, d[g], 1, i, e); f = 1 } else if (e !== h) { w = j === h && b.isFunction(e); r && (w ? (w = c, c = function (a, c, d) { return w.call(b(a), d) }) : (c.call(a, e), c = null)); if (c) for (; g < k; g++) c(a[g], d, w ? e.call(a[g], g, c(a[g], d)) : e, j); f = 1 } return f ? a : r ? c.call(a) : k ? c(a[0], d) : i
        }, now: function () { return (new Date).getTime() }
    }); b.ready.promise = function (a)
    {
        if (!Q) if (Q = b.Deferred(), "complete" === g.readyState) setTimeout(b.ready, 1); else if (g.addEventListener) g.addEventListener("DOMContentLoaded",
        V, !1), k.addEventListener("load", b.ready, !1); else { g.attachEvent("onreadystatechange", V); k.attachEvent("onload", b.ready); var c = !1; try { c = null == k.frameElement && g.documentElement } catch (d) { } c && c.doScroll && function f() { if (!b.isReady) { try { c.doScroll("left") } catch (a) { return setTimeout(f, 50) } b.ready() } }() } return Q.promise(a)
    }; b.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, c) { L["[object " + c + "]"] = c.toLowerCase() }); Ca = b(g); var sa = {}; b.Callbacks = function (a)
    {
        var c; if ("string" ===
        typeof a) { if (!(c = sa[a])) { c = a; var d = sa[c] = {}; b.each(c.split(Z), function (a, c) { d[c] = !0 }); c = d } } else c = b.extend({}, a); var a = c, e, f, i, j, w, r, g = [], k = !a.once && [], n = function (c) { e = a.memory && c; f = !0; r = j || 0; j = 0; w = g.length; for (i = !0; g && r < w; r++) if (!1 === g[r].apply(c[0], c[1]) && a.stopOnFalse) { e = !1; break } i = !1; g && (k ? k.length && n(k.shift()) : e ? g = [] : l.disable()) }, l = {
            add: function ()
            {
                if (g)
                {
                    var c = g.length; (function Jc(c)
                    {
                        b.each(c, function (c, d)
                        {
                            var e = b.type(d); "function" === e && (!a.unique || !l.has(d)) ? g.push(d) : d && (d.length && "string" !==
                            e) && Jc(d)
                        })
                    })(arguments); i ? w = g.length : e && (j = c, n(e))
                } return this
            }, remove: function () { g && b.each(arguments, function (a, c) { for (var d; -1 < (d = b.inArray(c, g, d)) ;) g.splice(d, 1), i && (d <= w && w--, d <= r && r--) }); return this }, has: function (a) { return -1 < b.inArray(a, g) }, empty: function () { g = []; return this }, disable: function () { g = k = e = h; return this }, disabled: function () { return !g }, lock: function () { k = h; e || l.disable(); return this }, locked: function () { return !k }, fireWith: function (a, c)
            {
                c = c || []; c = [a, c.slice ? c.slice() : c]; if (g && (!f || k)) i ?
                k.push(c) : n(c); return this
            }, fire: function () { l.fireWith(this, arguments); return this }, fired: function () { return !!f }
        }; return l
    }; b.extend({
        Deferred: function (a)
        {
            var c = [["resolve", "done", b.Callbacks("once memory"), "resolved"], ["reject", "fail", b.Callbacks("once memory"), "rejected"], ["notify", "progress", b.Callbacks("memory")]], d = "pending", e = {
                state: function () { return d }, always: function () { f.done(arguments).fail(arguments); return this }, then: function ()
                {
                    var a = arguments; return b.Deferred(function (d)
                    {
                        b.each(c, function (c,
                        e) { var h = e[0], g = a[c]; f[e[1]](b.isFunction(g) ? function () { var a = g.apply(this, arguments); if (a && b.isFunction(a.promise)) a.promise().done(d.resolve).fail(d.reject).progress(d.notify); else d[h + "With"](this === f ? d : this, [a]) } : d[h]) }); a = null
                    }).promise()
                }, promise: function (a) { return null != a ? b.extend(a, e) : e }
            }, f = {}; e.pipe = e.then; b.each(c, function (a, b) { var h = b[2], g = b[3]; e[b[1]] = h.add; g && h.add(function () { d = g }, c[a ^ 1][2].disable, c[2][2].lock); f[b[0]] = h.fire; f[b[0] + "With"] = h.fireWith }); e.promise(f); a && a.call(f, f); return f
        },
        when: function (a) { var c = 0, d = s.call(arguments), e = d.length, f = 1 !== e || a && b.isFunction(a.promise) ? e : 0, i = 1 === f ? a : b.Deferred(), j = function (a, c, b) { return function (d) { c[a] = this; b[a] = 1 < arguments.length ? s.call(arguments) : d; b === h ? i.notifyWith(c, b) : --f || i.resolveWith(c, b) } }, h, g, k; if (1 < e) { h = Array(e); g = Array(e); for (k = Array(e) ; c < e; c++) d[c] && b.isFunction(d[c].promise) ? d[c].promise().done(j(c, k, d)).fail(i.reject).progress(j(c, g, h)) : --f } f || i.resolveWith(k, d); return i.promise() }
    }); var xc = b, Aa; var J, Qa, H, l, B, m, q, Ra, mb,
    za, Kb, y = g.createElement("div"); y.setAttribute("className", "t"); y.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"; Qa = y.getElementsByTagName("*"); H = y.getElementsByTagName("a")[0]; H.style.cssText = "top:1px;float:left;opacity:.5"; if (!Qa || !Qa.length) Aa = {}; else
    {
        l = g.createElement("select"); B = l.appendChild(g.createElement("option")); m = y.getElementsByTagName("input")[0]; J = {
            leadingWhitespace: 3 === y.firstChild.nodeType, tbody: !y.getElementsByTagName("tbody").length, htmlSerialize: !!y.getElementsByTagName("link").length,
            style: /top/.test(H.getAttribute("style")), hrefNormalized: "/a" === H.getAttribute("href"), opacity: /^0.5/.test(H.style.opacity), cssFloat: !!H.style.cssFloat, checkOn: "on" === m.value, optSelected: B.selected, getSetAttribute: "t" !== y.className, enctype: !!g.createElement("form").enctype, html5Clone: "<:nav></:nav>" !== g.createElement("nav").cloneNode(!0).outerHTML, boxModel: "CSS1Compat" === g.compatMode, submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1,
            reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1
        }; m.checked = !0; J.noCloneChecked = m.cloneNode(!0).checked; l.disabled = !0; J.optDisabled = !B.disabled; try { delete y.test } catch (Ld) { J.deleteExpando = !1 } !y.addEventListener && (y.attachEvent && y.fireEvent) && (y.attachEvent("onclick", Kb = function () { J.noCloneEvent = !1 }), y.cloneNode(!0).fireEvent("onclick"), y.detachEvent("onclick", Kb)); m = g.createElement("input"); m.value = "t"; m.setAttribute("type", "radio"); J.radioValue = "t" === m.value; m.setAttribute("checked",
        "checked"); m.setAttribute("name", "t"); y.appendChild(m); q = g.createDocumentFragment(); q.appendChild(y.lastChild); J.checkClone = q.cloneNode(!0).cloneNode(!0).lastChild.checked; J.appendChecked = m.checked; q.removeChild(m); q.appendChild(y); if (y.attachEvent) for (mb in { submit: !0, change: !0, focusin: !0 }) Ra = "on" + mb, za = Ra in y, za || (y.setAttribute(Ra, "return;"), za = "function" === typeof y[Ra]), J[mb + "Bubbles"] = za; b(function ()
        {
            var a, c, b, e = g.getElementsByTagName("body")[0]; e && (a = g.createElement("div"), a.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
            e.insertBefore(a, e.firstChild), c = g.createElement("div"), a.appendChild(c), c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", b = c.getElementsByTagName("td"), b[0].style.cssText = "padding:0;margin:0;border:0;display:none", za = 0 === b[0].offsetHeight, b[0].style.display = "", b[1].style.display = "none", J.reliableHiddenOffsets = za && 0 === b[0].offsetHeight, c.innerHTML = "", c.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
            J.boxSizing = 4 === c.offsetWidth, J.doesNotIncludeMarginInBodyOffset = 1 !== e.offsetTop, k.getComputedStyle && (J.pixelPosition = "1%" !== (k.getComputedStyle(c, null) || {}).top, J.boxSizingReliable = "4px" === (k.getComputedStyle(c, null) || { width: "4px" }).width, b = g.createElement("div"), b.style.cssText = c.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;", b.style.marginRight = b.style.width = "0", c.style.width = "1px", c.appendChild(b), J.reliableMarginRight = !parseFloat((k.getComputedStyle(b, null) || {}).marginRight)),
            "undefined" !== typeof c.style.zoom && (c.innerHTML = "", c.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1", J.inlineBlockNeedsLayout = 3 === c.offsetWidth, c.style.display = "block", c.style.overflow = "visible", c.innerHTML = "<div></div>", c.firstChild.style.width = "5px", J.shrinkWrapBlocks = 3 !== c.offsetWidth, a.style.zoom = 1), e.removeChild(a))
        }); q.removeChild(y); Qa = H = l = B = m = q = y = null; Aa = J
    } xc.support = Aa; var Ec = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, Fc = /([A-Z])/g;
    b.extend({
        cache: {}, deletedIds: [], uuid: 0, expando: "jQuery" + (b.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function (a) { a = a.nodeType ? b.cache[a[b.expando]] : a[b.expando]; return !!a && !R(a) }, data: function (a, c, d, e)
        {
            if (b.acceptData(a))
            {
                var f = b.expando, i = "string" === typeof c, j = a.nodeType, w = j ? b.cache : a, g = j ? a[f] : a[f] && f; if (g && w[g] && (e || w[g].data) || !(i && d === h))
                {
                    g || (j ? a[f] = g = b.deletedIds.pop() || b.guid++ : g = f); w[g] || (w[g] = {}, j || (w[g].toJSON =
                    b.noop)); if ("object" === typeof c || "function" === typeof c) e ? w[g] = b.extend(w[g], c) : w[g].data = b.extend(w[g].data, c); a = w[g]; e || (a.data || (a.data = {}), a = a.data); d !== h && (a[b.camelCase(c)] = d); i ? (d = a[c], null == d && (d = a[b.camelCase(c)])) : d = a; return d
                }
            }
        }, removeData: function (a, c, d)
        {
            if (b.acceptData(a))
            {
                var e, f, i, j = a.nodeType, h = j ? b.cache : a, g = j ? a[b.expando] : b.expando; if (h[g])
                {
                    if (c && (e = d ? h[g] : h[g].data))
                    {
                        b.isArray(c) || (c in e ? c = [c] : (c = b.camelCase(c), c = c in e ? [c] : c.split(" "))); f = 0; for (i = c.length; f < i; f++) delete e[c[f]];
                        if (!(d ? R : b.isEmptyObject)(e)) return
                    } if (!d && (delete h[g].data, !R(h[g]))) return; j ? b.cleanData([a], !0) : b.support.deleteExpando || h != h.window ? delete h[g] : h[g] = null
                }
            }
        }, _data: function (a, c, d) { return b.data(a, c, d, !0) }, acceptData: function (a) { var c = a.nodeName && b.noData[a.nodeName.toLowerCase()]; return !c || !0 !== c && a.getAttribute("classid") === c }
    }); b.fn.extend({
        data: function (a, c)
        {
            var d, e, f, i, j, g = this[0], r = 0, k = null; if (a === h)
            {
                if (this.length && (k = b.data(g), 1 === g.nodeType && !b._data(g, "parsedAttrs")))
                {
                    f = g.attributes;
                    for (j = f.length; r < j; r++) i = f[r].name, i.indexOf("data-") || (i = b.camelCase(i.substring(5)), ha(g, i, k[i])); b._data(g, "parsedAttrs", !0)
                } return k
            } if ("object" === typeof a) return this.each(function () { b.data(this, a) }); d = a.split(".", 2); d[1] = d[1] ? "." + d[1] : ""; e = d[1] + "!"; return b.access(this, function (c)
            {
                if (c === h) return k = this.triggerHandler("getData" + e, [d[0]]), k === h && g && (k = b.data(g, a), k = ha(g, a, k)), k === h && d[1] ? this.data(d[0]) : k; d[1] = c; this.each(function ()
                {
                    var f = b(this); f.triggerHandler("setData" + e, d); b.data(this, a,
                    c); f.triggerHandler("changeData" + e, d)
                })
            }, null, c, 1 < arguments.length, null, !1)
        }, removeData: function (a) { return this.each(function () { b.removeData(this, a) }) }
    }); b.extend({
        queue: function (a, c, d) { var e; if (a) return c = (c || "fx") + "queue", e = b._data(a, c), d && (!e || b.isArray(d) ? e = b._data(a, c, b.makeArray(d)) : e.push(d)), e || [] }, dequeue: function (a, c)
        {
            var c = c || "fx", d = b.queue(a, c), e = d.length, f = d.shift(), i = b._queueHooks(a, c), j = function () { b.dequeue(a, c) }; "inprogress" === f && (f = d.shift(), e--); f && ("fx" === c && d.unshift("inprogress"),
            delete i.stop, f.call(a, j, i)); !e && i && i.empty.fire()
        }, _queueHooks: function (a, c) { var d = c + "queueHooks"; return b._data(a, d) || b._data(a, d, { empty: b.Callbacks("once memory").add(function () { b.removeData(a, c + "queue", !0); b.removeData(a, d, !0) }) }) }
    }); b.fn.extend({
        queue: function (a, c) { var d = 2; "string" !== typeof a && (c = a, a = "fx", d--); return arguments.length < d ? b.queue(this[0], a) : c === h ? this : this.each(function () { var d = b.queue(this, a, c); b._queueHooks(this, a); "fx" === a && "inprogress" !== d[0] && b.dequeue(this, a) }) }, dequeue: function (a)
        {
            return this.each(function ()
            {
                b.dequeue(this,
                a)
            })
        }, delay: function (a, c) { a = b.fx ? b.fx.speeds[a] || a : a; return this.queue(c || "fx", function (c, b) { var f = setTimeout(c, a); b.stop = function () { clearTimeout(f) } }) }, clearQueue: function (a) { return this.queue(a || "fx", []) }, promise: function (a, c) { var d, e = 1, f = b.Deferred(), i = this, j = this.length, g = function () { --e || f.resolveWith(i, [i]) }; "string" !== typeof a && (c = a, a = h); for (a = a || "fx"; j--;) if ((d = b._data(i[j], a + "queueHooks")) && d.empty) e++, d.empty.add(g); g(); return f.promise(c) }
    }); var na, Pb, Qb, Rb = /[\t\r\n]/g, Kc = /\r/g, Lc = /^(?:button|input)$/i,
    Mc = /^(?:button|input|object|select|textarea)$/i, Nc = /^a(?:rea|)$/i, Sb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Tb = b.support.getSetAttribute; b.fn.extend({
        attr: function (a, c) { return b.access(this, b.attr, a, c, 1 < arguments.length) }, removeAttr: function (a) { return this.each(function () { b.removeAttr(this, a) }) }, prop: function (a, c) { return b.access(this, b.prop, a, c, 1 < arguments.length) }, removeProp: function (a)
        {
            a = b.propFix[a] || a; return this.each(function ()
            {
                try
                {
                    this[a] =
                    h, delete this[a]
                } catch (c) { }
            })
        }, addClass: function (a) { var c, d, e, f, i, j, h; if (b.isFunction(a)) return this.each(function (c) { b(this).addClass(a.call(this, c, this.className)) }); if (a && "string" === typeof a) { c = a.split(Z); d = 0; for (e = this.length; d < e; d++) if (f = this[d], 1 === f.nodeType) if (!f.className && 1 === c.length) f.className = a; else { i = " " + f.className + " "; j = 0; for (h = c.length; j < h; j++) 0 > i.indexOf(" " + c[j] + " ") && (i += c[j] + " "); f.className = b.trim(i) } } return this }, removeClass: function (a)
        {
            var c, d, e, f, i, j, g; if (b.isFunction(a)) return this.each(function (c)
            {
                b(this).removeClass(a.call(this,
                c, this.className))
            }); if (a && "string" === typeof a || a === h) { c = (a || "").split(Z); j = 0; for (g = this.length; j < g; j++) if (e = this[j], 1 === e.nodeType && e.className) { d = (" " + e.className + " ").replace(Rb, " "); f = 0; for (i = c.length; f < i; f++) for (; 0 <= d.indexOf(" " + c[f] + " ") ;) d = d.replace(" " + c[f] + " ", " "); e.className = a ? b.trim(d) : "" } } return this
        }, toggleClass: function (a, c)
        {
            var d = typeof a, e = "boolean" === typeof c; return b.isFunction(a) ? this.each(function (d) { b(this).toggleClass(a.call(this, d, this.className, c), c) }) : this.each(function ()
            {
                if ("string" ===
                d) for (var f, i = 0, j = b(this), h = c, g = a.split(Z) ; f = g[i++];) h = e ? h : !j.hasClass(f), j[h ? "addClass" : "removeClass"](f); else if ("undefined" === d || "boolean" === d) this.className && b._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : b._data(this, "__className__") || ""
            })
        }, hasClass: function (a) { for (var a = " " + a + " ", c = 0, b = this.length; c < b; c++) if (1 === this[c].nodeType && 0 <= (" " + this[c].className + " ").replace(Rb, " ").indexOf(a)) return !0; return !1 }, val: function (a)
        {
            var c, d, e, f = this[0]; if (arguments.length) return e =
            b.isFunction(a), this.each(function (d) { var f = b(this); if (1 === this.nodeType && (d = e ? a.call(this, d, f.val()) : a, null == d ? d = "" : "number" === typeof d ? d += "" : b.isArray(d) && (d = b.map(d, function (a) { return null == a ? "" : a + "" })), c = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()], !c || !("set" in c) || c.set(this, d, "value") === h)) this.value = d }); if (f)
            {
                if ((c = b.valHooks[f.type] || b.valHooks[f.nodeName.toLowerCase()]) && "get" in c && (d = c.get(f, "value")) !== h) return d; d = f.value; return "string" === typeof d ? d.replace(Kc, "") : null ==
                d ? "" : d
            }
        }
    }); b.extend({
        valHooks: {
            option: { get: function (a) { var c = a.attributes.value; return !c || c.specified ? a.value : a.text } }, select: {
                get: function (a)
                {
                    var c, d, e = a.selectedIndex, f = [], i = a.options, j = "select-one" === a.type; if (0 > e) return null; a = j ? e : 0; for (d = j ? e + 1 : i.length; a < d; a++) if (c = i[a], c.selected && (b.support.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !b.nodeName(c.parentNode, "optgroup"))) { c = b(c).val(); if (j) return c; f.push(c) } return j && !f.length && i.length ? b(i[e]).val() :
                    f
                }, set: function (a, c) { var d = b.makeArray(c); b(a).find("option").each(function () { this.selected = 0 <= b.inArray(b(this).val(), d) }); d.length || (a.selectedIndex = -1); return d }
            }
        }, attrFn: {}, attr: function (a, c, d, e)
        {
            var f, i, j = a.nodeType; if (a && !(3 === j || 8 === j || 2 === j))
            {
                if (e && b.isFunction(b.fn[c])) return b(a)[c](d); if ("undefined" === typeof a.getAttribute) return b.prop(a, c, d); if (e = 1 !== j || !b.isXMLDoc(a)) c = c.toLowerCase(), i = b.attrHooks[c] || (Sb.test(c) ? Pb : na); if (d !== h) if (null === d) b.removeAttr(a, c); else
                {
                    if (i && "set" in i && e &&
                    (f = i.set(a, d, c)) !== h) return f; a.setAttribute(c, d + ""); return d
                } else { if (i && "get" in i && e && null !== (f = i.get(a, c))) return f; f = a.getAttribute(c); return null === f ? h : f }
            }
        }, removeAttr: function (a, c) { var d, e, f, i, j = 0; if (c && 1 === a.nodeType) for (e = c.split(Z) ; j < e.length; j++) if (f = e[j]) d = b.propFix[f] || f, (i = Sb.test(f)) || b.attr(a, f, ""), a.removeAttribute(Tb ? f : d), i && d in a && (a[d] = !1) }, attrHooks: {
            type: {
                set: function (a, c)
                {
                    if (Lc.test(a.nodeName) && a.parentNode) b.error("type property can't be changed"); else if (!b.support.radioValue &&
                    "radio" === c && b.nodeName(a, "input")) { var d = a.value; a.setAttribute("type", c); d && (a.value = d); return c }
                }
            }, value: { get: function (a, c) { return na && b.nodeName(a, "button") ? na.get(a, c) : c in a ? a.value : null }, set: function (a, c, d) { if (na && b.nodeName(a, "button")) return na.set(a, c, d); a.value = c } }
        }, propFix: {
            tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, prop: function (a, c, d) { var e, f, i; i = a.nodeType; if (a && !(3 === i || 8 === i || 2 === i)) { if (i = 1 !== i || !b.isXMLDoc(a)) c = b.propFix[c] || c, f = b.propHooks[c]; return d !== h ? f && "set" in f && (e = f.set(a, d, c)) !== h ? e : a[c] = d : f && "get" in f && null !== (e = f.get(a, c)) ? e : a[c] } }, propHooks: { tabIndex: { get: function (a) { var c = a.getAttributeNode("tabindex"); return c && c.specified ? parseInt(c.value, 10) : Mc.test(a.nodeName) || Nc.test(a.nodeName) && a.href ? 0 : h } } }
    }); Pb = {
        get: function (a, c)
        {
            var d, e = b.prop(a, c); return !0 ===
            e || "boolean" !== typeof e && (d = a.getAttributeNode(c)) && !1 !== d.nodeValue ? c.toLowerCase() : h
        }, set: function (a, c, d) { !1 === c ? b.removeAttr(a, d) : (c = b.propFix[d] || d, c in a && (a[c] = !0), a.setAttribute(d, d.toLowerCase())); return d }
    }; Tb || (Qb = { name: !0, id: !0, coords: !0 }, na = b.valHooks.button = { get: function (a, c) { var b; return (b = a.getAttributeNode(c)) && (Qb[c] ? "" !== b.value : b.specified) ? b.value : h }, set: function (a, c, b) { var e = a.getAttributeNode(b); e || (e = g.createAttribute(b), a.setAttributeNode(e)); return e.value = c + "" } }, b.each(["width",
    "height"], function (a, c) { b.attrHooks[c] = b.extend(b.attrHooks[c], { set: function (a, b) { if ("" === b) return a.setAttribute(c, "auto"), b } }) }), b.attrHooks.contenteditable = { get: na.get, set: function (a, c, b) { "" === c && (c = "false"); na.set(a, c, b) } }); b.support.hrefNormalized || b.each(["href", "src", "width", "height"], function (a, c) { b.attrHooks[c] = b.extend(b.attrHooks[c], { get: function (a) { a = a.getAttribute(c, 2); return null === a ? h : a } }) }); b.support.style || (b.attrHooks.style = {
        get: function (a)
        {
            return a.style.cssText.toLowerCase() ||
            h
        }, set: function (a, c) { return a.style.cssText = c + "" }
    }); b.support.optSelected || (b.propHooks.selected = b.extend(b.propHooks.selected, { get: function (a) { if (a = a.parentNode) a.selectedIndex, a.parentNode && a.parentNode.selectedIndex; return null } })); b.support.enctype || (b.propFix.enctype = "encoding"); b.support.checkOn || b.each(["radio", "checkbox"], function () { b.valHooks[this] = { get: function (a) { return null === a.getAttribute("value") ? "on" : a.value } } }); b.each(["radio", "checkbox"], function ()
    {
        b.valHooks[this] = b.extend(b.valHooks[this],
        { set: function (a, c) { if (b.isArray(c)) return a.checked = 0 <= b.inArray(b(a).val(), c) } })
    }); var rb = /^(?:textarea|input|select)$/i, Ub = /^([^\.]*|)(?:\.(.+)|)$/, Oc = /(?:^|\s)hover(\.\S+|)\b/, Pc = /^key/, Qc = /^(?:mouse|contextmenu)|click/, Vb = /^(?:focusinfocus|focusoutblur)$/, Wb = function (a) { return b.event.special.hover ? a : a.replace(Oc, "mouseenter$1 mouseleave$1") }; b.event = {
        add: function (a, c, d, e, f)
        {
            var i, j, g, r, k, x, n, l, m; if (!(3 === a.nodeType || 8 === a.nodeType || !c || !d || !(i = b._data(a))))
            {
                d.handler && (n = d, d = n.handler, f = n.selector);
                d.guid || (d.guid = b.guid++); g = i.events; g || (i.events = g = {}); j = i.handle; j || (i.handle = j = function (a) { return "undefined" !== typeof b && (!a || b.event.triggered !== a.type) ? b.event.dispatch.apply(j.elem, arguments) : h }, j.elem = a); c = b.trim(Wb(c)).split(" "); for (i = 0; i < c.length; i++)
                {
                    r = Ub.exec(c[i]) || []; k = r[1]; x = (r[2] || "").split(".").sort(); m = b.event.special[k] || {}; k = (f ? m.delegateType : m.bindType) || k; m = b.event.special[k] || {}; r = b.extend({
                        type: k, origType: r[1], data: e, handler: d, guid: d.guid, selector: f, needsContext: f && b.expr.match.needsContext.test(f),
                        namespace: x.join(".")
                    }, n); l = g[k]; if (!l && (l = g[k] = [], l.delegateCount = 0, !m.setup || !1 === m.setup.call(a, e, x, j))) a.addEventListener ? a.addEventListener(k, j, !1) : a.attachEvent && a.attachEvent("on" + k, j); m.add && (m.add.call(a, r), r.handler.guid || (r.handler.guid = d.guid)); f ? l.splice(l.delegateCount++, 0, r) : l.push(r); b.event.global[k] = !0
                } a = null
            }
        }, global: {}, remove: function (a, c, d, e, f)
        {
            var i, j, h, g, k, l, n, m, p, q, t = b.hasData(a) && b._data(a); if (t && (n = t.events))
            {
                c = b.trim(Wb(c || "")).split(" "); for (i = 0; i < c.length; i++) if (j = Ub.exec(c[i]) ||
                [], h = g = j[1], j = j[2], h)
                {
                    m = b.event.special[h] || {}; h = (e ? m.delegateType : m.bindType) || h; p = n[h] || []; k = p.length; j = j ? RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null; for (l = 0; l < p.length; l++) if (q = p[l], (f || g === q.origType) && (!d || d.guid === q.guid) && (!j || j.test(q.namespace)) && (!e || e === q.selector || "**" === e && q.selector)) p.splice(l--, 1), q.selector && p.delegateCount--, m.remove && m.remove.call(a, q); 0 === p.length && k !== p.length && ((!m.teardown || !1 === m.teardown.call(a, j, t.handle)) && b.removeEvent(a,
                    h, t.handle), delete n[h])
                } else for (h in n) b.event.remove(a, h + c[i], d, e, !0); b.isEmptyObject(n) && (delete t.handle, b.removeData(a, "events", !0))
            }
        }, customEvent: { getData: !0, setData: !0, changeData: !0 }, trigger: function (a, c, d, e)
        {
            if (!d || !(3 === d.nodeType || 8 === d.nodeType))
            {
                var f, i, j, w, r, l, x = a.type || a; j = []; if (!Vb.test(x + b.event.triggered) && (0 <= x.indexOf("!") && (x = x.slice(0, -1), f = !0), 0 <= x.indexOf(".") && (j = x.split("."), x = j.shift(), j.sort()), d && !b.event.customEvent[x] || b.event.global[x])) if (a = "object" === typeof a ? a[b.expando] ?
                        a : new b.Event(x, a) : new b.Event(x), a.type = x, a.isTrigger = !0, a.exclusive = f, a.namespace = j.join("."), a.namespace_re = a.namespace ? RegExp("(^|\\.)" + j.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, j = 0 > x.indexOf(":") ? "on" + x : "", d)
                {
                    if (a.result = h, a.target || (a.target = d), c = null != c ? b.makeArray(c) : [], c.unshift(a), w = b.event.special[x] || {}, !(w.trigger && !1 === w.trigger.apply(d, c)))
                    {
                        l = [[d, w.bindType || x]]; if (!e && !w.noBubble && !b.isWindow(d))
                        {
                            r = w.delegateType || x; f = Vb.test(r + x) ? d : d.parentNode; for (i = d; f; f = f.parentNode) l.push([f, r]),
                            i = f; if (i === (d.ownerDocument || g)) l.push([i.defaultView || i.parentWindow || k, r])
                        } for (i = 0; i < l.length && !a.isPropagationStopped() ; i++) f = l[i][0], a.type = l[i][1], (r = (b._data(f, "events") || {})[a.type] && b._data(f, "handle")) && r.apply(f, c), (r = j && f[j]) && (b.acceptData(f) && r.apply && !1 === r.apply(f, c)) && a.preventDefault(); a.type = x; if (!e && !a.isDefaultPrevented() && (!w._default || !1 === w._default.apply(d.ownerDocument, c)) && !("click" === x && b.nodeName(d, "a")) && b.acceptData(d)) if (j && d[x] && ("focus" !== x && "blur" !== x || 0 !== a.target.offsetWidth) &&
                        !b.isWindow(d)) (i = d[j]) && (d[j] = null), b.event.triggered = x, d[x](), b.event.triggered = h, i && (d[j] = i); return a.result
                    }
                } else for (i in d = b.cache, d) d[i].events && d[i].events[x] && b.event.trigger(a, c, d[i].handle.elem, !0)
            }
        }, dispatch: function (a)
        {
            var a = b.event.fix(a || k.event), c, d, e, f, i, j, g = (b._data(this, "events") || {})[a.type] || [], r = g.delegateCount, l = s.call(arguments), x = !a.exclusive && !a.namespace, n = b.event.special[a.type] || {}, m = []; l[0] = a; a.delegateTarget = this; if (!(n.preDispatch && !1 === n.preDispatch.call(this, a)))
            {
                if (r &&
                !(a.button && "click" === a.type)) for (d = a.target; d != this; d = d.parentNode || this) if (!0 !== d.disabled || "click" !== a.type) { f = {}; i = []; for (c = 0; c < r; c++) e = g[c], j = e.selector, f[j] === h && (f[j] = e.needsContext ? 0 <= b(j, this).index(d) : b.find(j, this, null, [d]).length), f[j] && i.push(e); i.length && m.push({ elem: d, matches: i }) } g.length > r && m.push({ elem: this, matches: g.slice(r) }); for (c = 0; c < m.length && !a.isPropagationStopped() ; c++)
                {
                    f = m[c]; a.currentTarget = f.elem; for (d = 0; d < f.matches.length && !a.isImmediatePropagationStopped() ; d++) if (e = f.matches[d],
                    x || !a.namespace && !e.namespace || a.namespace_re && a.namespace_re.test(e.namespace)) a.data = e.data, a.handleObj = e, e = ((b.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, l), e !== h && (a.result = e, !1 === e && (a.preventDefault(), a.stopPropagation()))
                } n.postDispatch && n.postDispatch.call(this, a); return a.result
            }
        }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {},
        keyHooks: { props: ["char", "charCode", "key", "keyCode"], filter: function (a, c) { null == a.which && (a.which = null != c.charCode ? c.charCode : c.keyCode); return a } }, mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, c)
            {
                var b, e, f = c.button, i = c.fromElement; null == a.pageX && null != c.clientX && (b = a.target.ownerDocument || g, e = b.documentElement, b = b.body, a.pageX = c.clientX + (e && e.scrollLeft || b && b.scrollLeft || 0) - (e && e.clientLeft || b && b.clientLeft ||
                0), a.pageY = c.clientY + (e && e.scrollTop || b && b.scrollTop || 0) - (e && e.clientTop || b && b.clientTop || 0)); !a.relatedTarget && i && (a.relatedTarget = i === a.target ? c.toElement : i); !a.which && f !== h && (a.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0); return a
            }
        }, fix: function (a)
        {
            if (a[b.expando]) return a; var c, d, e = a, f = b.event.fixHooks[a.type] || {}, i = f.props ? this.props.concat(f.props) : this.props, a = b.Event(e); for (c = i.length; c;) d = i[--c], a[d] = e[d]; a.target || (a.target = e.srcElement || g); 3 === a.target.nodeType && (a.target = a.target.parentNode); a.metaKey =
            !!a.metaKey; return f.filter ? f.filter(a, e) : a
        }, special: { load: { noBubble: !0 }, focus: { delegateType: "focusin" }, blur: { delegateType: "focusout" }, beforeunload: { setup: function (a, c, d) { b.isWindow(this) && (this.onbeforeunload = d) }, teardown: function (a, c) { this.onbeforeunload === c && (this.onbeforeunload = null) } } }, simulate: function (a, c, d, e) { a = b.extend(new b.Event, d, { type: a, isSimulated: !0, originalEvent: {} }); e ? b.event.trigger(a, null, c) : b.event.dispatch.call(c, a); a.isDefaultPrevented() && d.preventDefault() }
    }; b.event.handle =
    b.event.dispatch; b.removeEvent = g.removeEventListener ? function (a, c, b) { a.removeEventListener && a.removeEventListener(c, b, !1) } : function (a, c, b) { c = "on" + c; a.detachEvent && ("undefined" === typeof a[c] && (a[c] = null), a.detachEvent(c, b)) }; b.Event = function (a, c)
    {
        if (!(this instanceof b.Event)) return new b.Event(a, c); a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? X : U) : this.type = a; c && b.extend(this, c); this.timeStamp =
        a && a.timeStamp || b.now(); this[b.expando] = !0
    }; b.Event.prototype = { preventDefault: function () { this.isDefaultPrevented = X; var a = this.originalEvent; a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1) }, stopPropagation: function () { this.isPropagationStopped = X; var a = this.originalEvent; a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0) }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = X; this.stopPropagation() }, isDefaultPrevented: U, isPropagationStopped: U, isImmediatePropagationStopped: U };
    b.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (a, c) { b.event.special[a] = { delegateType: c, bindType: c, handle: function (a) { var e, f = a.relatedTarget, i = a.handleObj; if (!f || f !== this && !b.contains(this, f)) a.type = i.origType, e = i.handler.apply(this, arguments), a.type = c; return e } } }); b.support.submitBubbles || (b.event.special.submit = {
        setup: function ()
        {
            if (b.nodeName(this, "form")) return !1; b.event.add(this, "click._submit keypress._submit", function (a)
            {
                a = a.target; if ((a = b.nodeName(a, "input") || b.nodeName(a, "button") ?
                a.form : h) && !b._data(a, "_submit_attached")) b.event.add(a, "submit._submit", function (a) { a._submit_bubble = !0 }), b._data(a, "_submit_attached", !0)
            })
        }, postDispatch: function (a) { a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && b.event.simulate("submit", this.parentNode, a, !0)) }, teardown: function () { if (b.nodeName(this, "form")) return !1; b.event.remove(this, "._submit") }
    }); b.support.changeBubbles || (b.event.special.change = {
        setup: function ()
        {
            if (rb.test(this.nodeName))
            {
                if ("checkbox" === this.type ||
                "radio" === this.type) b.event.add(this, "propertychange._change", function (a) { "checked" === a.originalEvent.propertyName && (this._just_changed = !0) }), b.event.add(this, "click._change", function (a) { this._just_changed && !a.isTrigger && (this._just_changed = !1); b.event.simulate("change", this, a, !0) }); return !1
            } b.event.add(this, "beforeactivate._change", function (a)
            {
                a = a.target; rb.test(a.nodeName) && !b._data(a, "_change_attached") && (b.event.add(a, "change._change", function (a)
                {
                    this.parentNode && (!a.isSimulated && !a.isTrigger) &&
                    b.event.simulate("change", this.parentNode, a, !0)
                }), b._data(a, "_change_attached", !0))
            })
        }, handle: function (a) { var c = a.target; if (this !== c || a.isSimulated || a.isTrigger || "radio" !== c.type && "checkbox" !== c.type) return a.handleObj.handler.apply(this, arguments) }, teardown: function () { b.event.remove(this, "._change"); return !rb.test(this.nodeName) }
    }); b.support.focusinBubbles || b.each({ focus: "focusin", blur: "focusout" }, function (a, c)
    {
        var d = 0, e = function (a) { b.event.simulate(c, a.target, b.event.fix(a), !0) }; b.event.special[c] =
        { setup: function () { 0 === d++ && g.addEventListener(a, e, !0) }, teardown: function () { 0 === --d && g.removeEventListener(a, e, !0) } }
    }); b.fn.extend({
        on: function (a, c, d, e, f)
        {
            var i, j; if ("object" === typeof a) { "string" !== typeof c && (d = d || c, c = h); for (j in a) this.on(j, c, d, a[j], f); return this } null == d && null == e ? (e = c, d = c = h) : null == e && ("string" === typeof c ? (e = d, d = h) : (e = d, d = c, c = h)); if (!1 === e) e = U; else if (!e) return this; 1 === f && (i = e, e = function (a) { b().off(a); return i.apply(this, arguments) }, e.guid = i.guid || (i.guid = b.guid++)); return this.each(function ()
            {
                b.event.add(this,
                a, e, d, c)
            })
        }, one: function (a, c, b, e) { return this.on(a, c, b, e, 1) }, off: function (a, c, d) { var e; if (a && a.preventDefault && a.handleObj) return e = a.handleObj, b(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this; if ("object" === typeof a) { for (e in a) this.off(e, c, a[e]); return this } if (!1 === c || "function" === typeof c) d = c, c = h; !1 === d && (d = U); return this.each(function () { b.event.remove(this, a, d, c) }) }, bind: function (a, c, b) { return this.on(a, null, c, b) }, unbind: function (a, c)
        {
            return this.off(a,
            null, c)
        }, live: function (a, c, d) { b(this.context).on(a, this.selector, c, d); return this }, die: function (a, c) { b(this.context).off(a, this.selector || "**", c); return this }, delegate: function (a, c, b, e) { return this.on(c, a, b, e) }, undelegate: function (a, c, b) { return 1 === arguments.length ? this.off(a, "**") : this.off(c, a || "**", b) }, trigger: function (a, c) { return this.each(function () { b.event.trigger(a, c, this) }) }, triggerHandler: function (a, c) { if (this[0]) return b.event.trigger(a, c, this[0], !0) }, toggle: function (a)
        {
            var c = arguments, d =
            a.guid || b.guid++, e = 0, f = function (d) { var f = (b._data(this, "lastToggle" + a.guid) || 0) % e; b._data(this, "lastToggle" + a.guid, f + 1); d.preventDefault(); return c[f].apply(this, arguments) || !1 }; for (f.guid = d; e < c.length;) c[e++].guid = d; return this.click(f)
        }, hover: function (a, c) { return this.mouseenter(a).mouseleave(c || a) }
    }); b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
    function (a, c) { b.fn[c] = function (a, b) { null == b && (b = a, a = null); return 0 < arguments.length ? this.on(c, null, a, b) : this.trigger(c) }; Pc.test(c) && (b.event.fixHooks[c] = b.event.keyHooks); Qc.test(c) && (b.event.fixHooks[c] = b.event.mouseHooks) }); var Rc = k, u = function (a, c, b, e)
    {
        var b = b || [], c = c || aa, f, i, j, h, g = c.nodeType; if (!a || "string" !== typeof a) return b; if (1 !== g && 9 !== g) return []; j = $a(c); if (!j && !e && (f = Sc.exec(a))) if (h = f[1]) if (9 === g) if ((i = c.getElementById(h)) && i.parentNode) { if (i.id === h) return b.push(i), b } else return b; else
        {
            if (c.ownerDocument &&
            (i = c.ownerDocument.getElementById(h)) && Xb(c, i) && i.id === h) return b.push(i), b
        } else { if (f[2]) return Fa.apply(b, Ga.call(c.getElementsByTagName(a), 0)), b; if ((h = f[3]) && Yb && c.getElementsByClassName) return Fa.apply(b, Ga.call(c.getElementsByClassName(h), 0)), b } return sb(a.replace(ab, "$1"), c, b, e, j)
    }, Ma = function (a) { return function (c) { return "input" === c.nodeName.toLowerCase() && c.type === a } }, Zb = function (a) { return function (c) { var b = c.nodeName.toLowerCase(); return ("input" === b || "button" === b) && c.type === a } }, wa = function (a)
    {
        return ba(function (c)
        {
            c =
            +c; return ba(function (b, e) { for (var f, i = a([], b.length, c), j = i.length; j--;) if (b[f = i[j]]) b[f] = !(e[f] = b[f]) })
        })
    }, bb = function (a, c, b) { if (a === c) return b; for (a = a.nextSibling; a;) { if (a === c) return -1; a = a.nextSibling } return 1 }, db = function (a, c)
    {
        var b, e, f, i, j, h, g; if (j = $b[G][a]) return c ? 0 : j.slice(0); j = a; h = []; for (g = F.preFilter; j;)
        {
            if (!b || (e = Tc.exec(j))) e && (j = j.slice(e[0].length)), h.push(f = []); b = !1; if (e = Uc.exec(j)) f.push(b = new ac(e.shift())), j = j.slice(b.length), b.type = e[0].replace(ab, " "); for (i in F.filter) if ((e = cb[i].exec(j)) &&
            (!g[i] || (e = g[i](e, aa, !0)))) f.push(b = new ac(e.shift())), j = j.slice(b.length), b.type = i, b.matches = e; if (!b) break
        } return c ? j.length : j ? u.error(a) : $b(a, h).slice(0)
    }, ub = function (a, c, b)
    {
        var e = c.dir, f = b && "parentNode" === c.dir, i = Vc++; return c.first ? function (c, b, d) { for (; c = c[e];) if (f || 1 === c.nodeType) return a(c, b, d) } : function (c, b, d)
        {
            if (d) for (; c = c[e];) { if ((f || 1 === c.nodeType) && a(c, b, d)) return c } else for (var h, g = Na + " " + i + " ", k = g + tb; c = c[e];) if (f || 1 === c.nodeType)
            {
                if ((h = c[G]) === k) return c.sizset; if ("string" === typeof h &&
                0 === h.indexOf(g)) { if (c.sizset) return c } else { c[G] = k; if (a(c, b, d)) return c.sizset = !0, c; c.sizset = !1 }
            }
        }
    }, vb = function (a) { return 1 < a.length ? function (c, b, e) { for (var f = a.length; f--;) if (!a[f](c, b, e)) return !1; return !0 } : a[0] }, eb = function (a, c, b, e, f) { for (var i, j = [], h = 0, g = a.length, k = null != c; h < g; h++) if (i = a[h]) if (!b || b(i, e, f)) j.push(i), k && c.push(h); return j }, wb = function (a, c, b, e, f, i)
    {
        e && !e[G] && (e = wb(e)); f && !f[G] && (f = wb(f, i)); return ba(function (i, h, g, k)
        {
            if (!i || !f)
            {
                var l, n, m = [], p = [], q = h.length; if (!(n = i))
                {
                    n = c || "*"; var t =
                    g.nodeType ? [g] : g, s = []; l = 0; for (var z = t.length; l < z; l++) u(n, t[l], s, i); n = s
                } t = a && (i || !c) ? eb(n, m, a, g, k) : n; s = b ? f || (i ? a : q || e) ? [] : h : t; b && b(t, s, g, k); if (e) { n = eb(s, p); e(n, [], g, k); for (g = n.length; g--;) if (l = n[g]) s[p[g]] = !(t[p[g]] = l) } if (i) for (g = a && s.length; g--;) { if (l = s[g]) i[m[g]] = !(h[m[g]] = l) } else s = eb(s === h ? s.splice(q, s.length) : s), f ? f(null, h, s, k) : Fa.apply(h, s)
            }
        })
    }, xb = function (a)
    {
        var c, b, e, f = a.length, i = F.relative[a[0].type]; b = i || F.relative[" "]; for (var j = i ? 1 : 0, h = ub(function (a) { return a === c }, b, !0), g = ub(function (a)
        {
        return -1 <
        bc.call(c, a)
        }, b, !0), k = [function (a, b, d) { return !i && (d || b !== fb) || ((c = b).nodeType ? h(a, b, d) : g(a, b, d)) }]; j < f; j++) if (b = F.relative[a[j].type]) k = [ub(vb(k), b)]; else { b = F.filter[a[j].type].apply(null, a[j].matches); if (b[G]) { for (e = ++j; e < f && !F.relative[a[e].type]; e++); return wb(1 < j && vb(k), 1 < j && a.slice(0, j - 1).join("").replace(ab, "$1"), b, j < e && xb(a.slice(j, e)), e < f && xb(a = a.slice(e)), e < f && a.join("")) } k.push(b) } return vb(k)
    }, sb = function (a, c, b, e, f)
    {
        var i, j, h, g, k = db(a); if (!e && 1 === k.length)
        {
            j = k[0] = k[0].slice(0); if (2 < j.length &&
            "ID" === (h = j[0]).type && 9 === c.nodeType && !f && F.relative[j[1].type]) { c = F.find.ID(h.matches[0].replace(xa, ""), c, f)[0]; if (!c) return b; a = a.slice(j.shift().length) } for (i = cb.POS.test(a) ? -1 : j.length - 1; 0 <= i; i--) { h = j[i]; if (F.relative[g = h.type]) break; if (g = F.find[g]) if (e = g(h.matches[0].replace(xa, ""), yb.test(j[0].type) && c.parentNode || c, f)) { j.splice(i, 1); a = e.length && j.join(""); if (!a) return Fa.apply(b, Ga.call(e, 0)), b; break } }
        } zb(a, k)(e, c, f, b, yb.test(a)); return b
    }, cc = function () { }, tb, Ab, F, gb, $a, Xb, zb, Bb, Oa, fb, dc = !0,
    G = ("sizcache" + Math.random()).replace(".", ""), ac = String, aa = Rc.document, W = aa.documentElement, Na = 0, Vc = 0, Wc = [].pop, Fa = [].push, Ga = [].slice, bc = [].indexOf || function (a) { for (var c = 0, b = this.length; c < b; c++) if (this[c] === a) return c; return -1 }, ba = function (a, c) { a[G] = null == c || c; return a }, Cb = function () { var a = {}, c = []; return ba(function (b, e) { c.push(b) > F.cacheLength && delete a[c.shift()]; return a[b] = e }, a) }, ec = Cb(), $b = Cb(), fc = Cb(), gc = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
    "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]", Db = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + gc + ")|[^:]|\\\\.)*|.*))\\)|)", ab = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"), Tc = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, Uc = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/, Xc = RegExp(Db), Sc = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, yb = /[\x20\t\r\n\f]*[+~]/, Yc = /h\d/i, Zc = /input|select|textarea|button/i,
    xa = /\\(?!\\)/g, cb = {
        ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/, CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/, NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/, TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"), ATTR: RegExp("^" + gc), PSEUDO: RegExp("^" + Db), POS: /:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i, CHILD: RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
        "i"), needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
    }, oa = function (a) { var c = aa.createElement("div"); try { return a(c) } catch (b) { return !1 } finally { } }, $c = oa(function (a) { a.appendChild(aa.createComment("")); return !a.getElementsByTagName("*").length }), ad = oa(function (a) { a.innerHTML = "<a href='#'></a>"; return a.firstChild && "undefined" !== typeof a.firstChild.getAttribute && "#" === a.firstChild.getAttribute("href") }),
    bd = oa(function (a) { a.innerHTML = "<select></select>"; a = typeof a.lastChild.getAttribute("multiple"); return "boolean" !== a && "string" !== a }), Yb = oa(function (a) { a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>"; if (!a.getElementsByClassName || !a.getElementsByClassName("e").length) return !1; a.lastChild.className = "e"; return 2 === a.getElementsByClassName("e").length }), cd = oa(function (a)
    {
        a.id = G + 0; a.innerHTML = "<a name='" + G + "'></a><div name='" + G + "'></div>"; W.insertBefore(a, W.firstChild); var c = aa.getElementsByName &&
        aa.getElementsByName(G).length === 2 + aa.getElementsByName(G + 0).length; Ab = !aa.getElementById(G); W.removeChild(a); return c
    }); try { Ga.call(W.childNodes, 0)[0].nodeType } catch (Md) { Ga = function (a) { for (var c, b = []; c = this[a]; a++) b.push(c); return b } } u.matches = function (a, b) { return u(a, null, null, b) }; u.matchesSelector = function (a, b) { return 0 < u(b, null, null, [a]).length }; gb = u.getText = function (a)
    {
        var b, d = "", e = 0; if (b = a.nodeType) if (1 === b || 9 === b || 11 === b)
        {
            if ("string" === typeof a.textContent) return a.textContent; for (a = a.firstChild; a; a =
            a.nextSibling) d += gb(a)
        } else
        { if (3 === b || 4 === b) return a.nodeValue } else for (; b = a[e]; e++) d += gb(b); return d
    }; $a = u.isXML = function (a) { return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1 }; Xb = u.contains = W.contains ? function (a, b) { var d = 9 === a.nodeType ? a.documentElement : a, e = b && b.parentNode; return a === e || !(!e || !(1 === e.nodeType && d.contains && d.contains(e))) } : W.compareDocumentPosition ? function (a, b) { return b && !!(a.compareDocumentPosition(b) & 16) } : function (a, b)
    {
        for (; b = b.parentNode;) if (b === a) return !0;
        return !1
    }; u.attr = function (a, b) { var d, e = $a(a); e || (b = b.toLowerCase()); return (d = F.attrHandle[b]) ? d(a) : e || bd ? a.getAttribute(b) : (d = a.getAttributeNode(b)) ? "boolean" === typeof a[b] ? a[b] ? b : null : d.specified ? d.value : null : null }; F = u.selectors = {
        cacheLength: 50, createPseudo: ba, match: cb, attrHandle: ad ? {} : { href: function (a) { return a.getAttribute("href", 2) }, type: function (a) { return a.getAttribute("type") } }, find: {
            ID: Ab ? function (a, b, d)
            {
                if ("undefined" !== typeof b.getElementById && !d) return (a = b.getElementById(a)) && a.parentNode ?
                [a] : []
            } : function (a, b, d) { if ("undefined" !== typeof b.getElementById && !d) return (b = b.getElementById(a)) ? b.id === a || "undefined" !== typeof b.getAttributeNode && b.getAttributeNode("id").value === a ? [b] : void 0 : [] }, TAG: $c ? function (a, b) { if ("undefined" !== typeof b.getElementsByTagName) return b.getElementsByTagName(a) } : function (a, b) { var d = b.getElementsByTagName(a); if ("*" === a) { for (var e, f = [], i = 0; e = d[i]; i++) 1 === e.nodeType && f.push(e); return f } return d }, NAME: cd && function (a, b) { if ("undefined" !== typeof b.getElementsByName) return b.getElementsByName(name) },
            CLASS: Yb && function (a, b, d) { if ("undefined" !== typeof b.getElementsByClassName && !d) return b.getElementsByClassName(a) }
        }, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: {
            ATTR: function (a) { a[1] = a[1].replace(xa, ""); a[3] = (a[4] || a[5] || "").replace(xa, ""); "~=" === a[2] && (a[3] = " " + a[3] + " "); return a.slice(0, 4) }, CHILD: function (a)
            {
                a[1] = a[1].toLowerCase(); "nth" === a[1] ? (a[2] || u.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ("even" ===
                a[2] || "odd" === a[2])), a[4] = +(a[6] + a[7] || "odd" === a[2])) : a[2] && u.error(a[0]); return a
            }, PSEUDO: function (a) { var b, d; if (cb.CHILD.test(a[0])) return null; if (a[3]) a[2] = a[3]; else if (b = a[4]) { if (Xc.test(b) && (d = db(b, !0)) && (d = b.indexOf(")", b.length - d) - b.length)) b = b.slice(0, d), a[0] = a[0].slice(0, d); a[2] = b } return a.slice(0, 3) }
        }, filter: {
            ID: Ab ? function (a) { a = a.replace(xa, ""); return function (b) { return b.getAttribute("id") === a } } : function (a)
            {
                a = a.replace(xa, ""); return function (b)
                {
                    return (b = "undefined" !== typeof b.getAttributeNode &&
                    b.getAttributeNode("id")) && b.value === a
                }
            }, TAG: function (a) { if ("*" === a) return function () { return !0 }; a = a.replace(xa, "").toLowerCase(); return function (b) { return b.nodeName && b.nodeName.toLowerCase() === a } }, CLASS: function (a) { var b = ec[G][a]; b || (b = ec(a, RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)"))); return function (a) { return b.test(a.className || "undefined" !== typeof a.getAttribute && a.getAttribute("class") || "") } }, ATTR: function (a, b, d)
            {
                return function (e)
                {
                    e = u.attr(e, a); if (null == e) return "!=" === b; if (!b) return !0;
                    e += ""; return "=" === b ? e === d : "!=" === b ? e !== d : "^=" === b ? d && 0 === e.indexOf(d) : "*=" === b ? d && -1 < e.indexOf(d) : "$=" === b ? d && e.substr(e.length - d.length) === d : "~=" === b ? -1 < (" " + e + " ").indexOf(d) : "|=" === b ? e === d || e.substr(0, d.length + 1) === d + "-" : !1
                }
            }, CHILD: function (a, b, d, e)
            {
                return "nth" === a ? function (a) { var b, c; b = a.parentNode; if (1 === d && 0 === e) return !0; if (b) { c = 0; for (b = b.firstChild; b && !(1 === b.nodeType && (c++, a === b)) ; b = b.nextSibling); } c -= e; return c === d || 0 === c % d && 0 <= c / d } : function (b)
                {
                    var c = b; switch (a)
                    {
                        case "only": case "first": for (; c =
                        c.previousSibling;) if (1 === c.nodeType) return !1; if ("first" === a) return !0; c = b; case "last": for (; c = c.nextSibling;) if (1 === c.nodeType) return !1; return !0
                    }
                }
            }, PSEUDO: function (a, b) { var d, e = F.pseudos[a] || F.setFilters[a.toLowerCase()] || u.error("unsupported pseudo: " + a); return e[G] ? e(b) : 1 < e.length ? (d = [a, a, "", b], F.setFilters.hasOwnProperty(a.toLowerCase()) ? ba(function (a, d) { for (var j, h = e(a, b), g = h.length; g--;) j = bc.call(a, h[g]), a[j] = !(d[j] = h[g]) }) : function (a) { return e(a, 0, d) }) : e }
        }, pseudos: {
            not: ba(function (a)
            {
                var b = [],
                d = [], e = zb(a.replace(ab, "$1")); return e[G] ? ba(function (a, b, c, d) { for (var d = e(a, null, d, []), h = a.length; h--;) if (c = d[h]) a[h] = !(b[h] = c) }) : function (a, i, j) { b[0] = a; e(b, null, j, d); return !d.pop() }
            }), has: ba(function (a) { return function (b) { return 0 < u(a, b).length } }), contains: ba(function (a) { return function (b) { return -1 < (b.textContent || b.innerText || gb(b)).indexOf(a) } }), enabled: function (a) { return !1 === a.disabled }, disabled: function (a) { return !0 === a.disabled }, checked: function (a)
            {
                var b = a.nodeName.toLowerCase(); return "input" ===
                b && !!a.checked || "option" === b && !!a.selected
            }, selected: function (a) { a.parentNode && a.parentNode.selectedIndex; return !0 === a.selected }, parent: function (a) { return !F.pseudos.empty(a) }, empty: function (a) { for (var b, a = a.firstChild; a;) { if ("@" < a.nodeName || 3 === (b = a.nodeType) || 4 === b) return !1; a = a.nextSibling } return !0 }, header: function (a) { return Yc.test(a.nodeName) }, text: function (a) { var b, d; return "input" === a.nodeName.toLowerCase() && "text" === (b = a.type) && (null == (d = a.getAttribute("type")) || d.toLowerCase() === b) }, radio: Ma("radio"),
            checkbox: Ma("checkbox"), file: Ma("file"), password: Ma("password"), image: Ma("image"), submit: Zb("submit"), reset: Zb("reset"), button: function (a) { var b = a.nodeName.toLowerCase(); return "input" === b && "button" === a.type || "button" === b }, input: function (a) { return Zc.test(a.nodeName) }, focus: function (a) { var b = a.ownerDocument; return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && !(!a.type && !a.href) }, active: function (a) { return a === a.ownerDocument.activeElement }, first: wa(function () { return [0] }), last: wa(function (a, b)
            {
                return [b -
                1]
            }), eq: wa(function (a, b, d) { return [0 > d ? d + b : d] }), even: wa(function (a, b) { for (var d = 0; d < b; d += 2) a.push(d); return a }), odd: wa(function (a, b) { for (var d = 1; d < b; d += 2) a.push(d); return a }), lt: wa(function (a, b, d) { for (b = 0 > d ? d + b : d; 0 <= --b;) a.push(b); return a }), gt: wa(function (a, b, d) { for (d = 0 > d ? d + b : d; ++d < b;) a.push(d); return a })
        }
    }; Bb = W.compareDocumentPosition ? function (a, b) { return a === b ? (Oa = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1 } : function (a,
    b) { if (a === b) return Oa = !0, 0; if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex; var d, e, f = [], i = []; d = a.parentNode; e = b.parentNode; var j = d; if (d === e) return bb(a, b); if (d) { if (!e) return 1 } else return -1; for (; j;) f.unshift(j), j = j.parentNode; for (j = e; j;) i.unshift(j), j = j.parentNode; d = f.length; e = i.length; for (j = 0; j < d && j < e; j++) if (f[j] !== i[j]) return bb(f[j], i[j]); return j === d ? bb(a, i[j], -1) : bb(f[j], b, 1) };[0, 0].sort(Bb); dc = !Oa; u.uniqueSort = function (a)
    {
        var b, d = 1; Oa = dc; a.sort(Bb); if (Oa) for (; b = a[d]; d++) b ===
        a[d - 1] && a.splice(d--, 1); return a
    }; u.error = function (a) { throw Error("Syntax error, unrecognized expression: " + a); }; zb = u.compile = function (a, b)
    {
        var d, e = [], f = [], i = fc[G][a]; if (!i)
        {
            b || (b = db(a)); for (d = b.length; d--;) i = xb(b[d]), i[G] ? e.push(i) : f.push(i); var j = 0 < e.length, h = 0 < f.length, g = function (a, b, c, d, i)
            {
                var k, l, m = [], p = 0, q = "0", s = a && [], t = null != i, D = fb, z = a || h && F.find.TAG("*", i && b.parentNode || b), B = Na += null == D ? 1 : Math.E; t && (fb = b !== aa && b, tb = g.el); for (; null != (i = z[q]) ; q++)
                {
                    if (h && i)
                    {
                        for (k = 0; l = f[k]; k++) if (l(i, b, c))
                        {
                            d.push(i);
                            break
                        } t && (Na = B, tb = ++g.el)
                    } j && ((i = !l && i) && p--, a && s.push(i))
                } p += q; if (j && q !== p) { for (k = 0; l = e[k]; k++) l(s, m, b, c); if (a) { if (0 < p) for (; q--;) !s[q] && !m[q] && (m[q] = Wc.call(d)); m = eb(m) } Fa.apply(d, m); t && (!a && 0 < m.length && 1 < p + e.length) && u.uniqueSort(d) } t && (Na = B, fb = D); return s
            }; g.el = 0; d = j ? ba(g) : g; i = fc(a, d)
        } return i
    }; if (aa.querySelectorAll)
    {
        var hc, dd = sb, ed = /'|\\/g, fd = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, fa = [":focus"], hb = [":active", ":focus"], ib = W.matchesSelector || W.mozMatchesSelector || W.webkitMatchesSelector ||
        W.oMatchesSelector || W.msMatchesSelector; oa(function (a) { a.innerHTML = "<select><option selected=''></option></select>"; a.querySelectorAll("[selected]").length || fa.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)"); a.querySelectorAll(":checked").length || fa.push(":checked") }); oa(function (a)
        {
            a.innerHTML = "<p test=''></p>"; a.querySelectorAll("[test^='']").length && fa.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')"); a.innerHTML = "<input type='hidden'/>"; a.querySelectorAll(":enabled").length ||
            fa.push(":enabled", ":disabled")
        }); fa = RegExp(fa.join("|")); sb = function (a, b, d, e, f)
        {
            if (!e && !f && (!fa || !fa.test(a))) { var i, j, h = !0, g = G; j = b; i = 9 === b.nodeType && a; if (1 === b.nodeType && "object" !== b.nodeName.toLowerCase()) { i = db(a); (h = b.getAttribute("id")) ? g = h.replace(ed, "\\$&") : b.setAttribute("id", g); g = "[id='" + g + "'] "; for (j = i.length; j--;) i[j] = g + i[j].join(""); j = yb.test(a) && b.parentNode || b; i = i.join(",") } if (i) try { return Fa.apply(d, Ga.call(j.querySelectorAll(i), 0)), d } catch (k) { } finally { h || b.removeAttribute("id") } } return dd(a,
            b, d, e, f)
        }; ib && (oa(function (a) { hc = ib.call(a, "div"); try { ib.call(a, "[test!='']:sizzle"), hb.push("!=", Db) } catch (b) { } }), hb = RegExp(hb.join("|")), u.matchesSelector = function (a, b) { b = b.replace(fd, "='$1']"); if (!$a(a) && !hb.test(b) && (!fa || !fa.test(b))) try { var d = ib.call(a, b); if (d || hc || a.document && 11 !== a.document.nodeType) return d } catch (e) { } return 0 < u(b, null, null, [a]).length })
    } F.pseudos.nth = F.pseudos.eq; F.filters = cc.prototype = F.pseudos; F.setFilters = new cc; u.attr = b.attr; b.find = u; b.expr = u.selectors; b.expr[":"] = b.expr.pseudos;
    b.unique = u.uniqueSort; b.text = u.getText; b.isXMLDoc = u.isXML; b.contains = u.contains; var gd = /Until$/, hd = /^(?:parents|prev(?:Until|All))/, Gc = /^.[^:#\[\.,]*$/, ic = b.expr.match.needsContext, id = { children: !0, contents: !0, next: !0, prev: !0 }; b.fn.extend({
        find: function (a)
        {
            var c, d, e, f, i, j, h = this; if ("string" !== typeof a) return b(a).filter(function () { c = 0; for (d = h.length; c < d; c++) if (b.contains(h[c], this)) return !0 }); j = this.pushStack("", "find", a); c = 0; for (d = this.length; c < d; c++) if (e = j.length, b.find(a, this[c], j), 0 < c) for (f = e; f <
            j.length; f++) for (i = 0; i < e; i++) if (j[i] === j[f]) { j.splice(f--, 1); break } return j
        }, has: function (a) { var c, d = b(a, this), e = d.length; return this.filter(function () { for (c = 0; c < e; c++) if (b.contains(this, d[c])) return !0 }) }, not: function (a) { return this.pushStack(Ja(this, a, !1), "not", a) }, filter: function (a) { return this.pushStack(Ja(this, a, !0), "filter", a) }, is: function (a) { return !!a && ("string" === typeof a ? ic.test(a) ? 0 <= b(a, this.context).index(this[0]) : 0 < b.filter(a, this).length : 0 < this.filter(a).length) }, closest: function (a, c)
        {
            for (var d,
            e = 0, f = this.length, i = [], j = ic.test(a) || "string" !== typeof a ? b(a, c || this.context) : 0; e < f; e++) for (d = this[e]; d && d.ownerDocument && d !== c && 11 !== d.nodeType;) { if (j ? -1 < j.index(d) : b.find.matchesSelector(d, a)) { i.push(d); break } d = d.parentNode } i = 1 < i.length ? b.unique(i) : i; return this.pushStack(i, "closest", a)
        }, index: function (a) { return !a ? this[0] && this[0].parentNode ? this.prevAll().length : -1 : "string" === typeof a ? b.inArray(this[0], b(a)) : b.inArray(a.jquery ? a[0] : a, this) }, add: function (a, c)
        {
            var d = "string" === typeof a ? b(a, c) : b.makeArray(a &&
            a.nodeType ? [a] : a), e = b.merge(this.get(), d); return this.pushStack(Y(d[0]) || Y(e[0]) ? e : b.unique(e))
        }, addBack: function (a) { return this.add(null == a ? this.prevObject : this.prevObject.filter(a)) }
    }); b.fn.andSelf = b.fn.addBack; b.each({
        parent: function (a) { return (a = a.parentNode) && 11 !== a.nodeType ? a : null }, parents: function (a) { return b.dir(a, "parentNode") }, parentsUntil: function (a, c, d) { return b.dir(a, "parentNode", d) }, next: function (a) { return P(a, "nextSibling") }, prev: function (a) { return P(a, "previousSibling") }, nextAll: function (a)
        {
            return b.dir(a,
            "nextSibling")
        }, prevAll: function (a) { return b.dir(a, "previousSibling") }, nextUntil: function (a, c, d) { return b.dir(a, "nextSibling", d) }, prevUntil: function (a, c, d) { return b.dir(a, "previousSibling", d) }, siblings: function (a) { return b.sibling((a.parentNode || {}).firstChild, a) }, children: function (a) { return b.sibling(a.firstChild) }, contents: function (a) { return b.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : b.merge([], a.childNodes) }
    }, function (a, c)
    {
        b.fn[a] = function (d, e)
        {
            var f = b.map(this, c, d); gd.test(a) ||
            (e = d); e && "string" === typeof e && (f = b.filter(e, f)); f = 1 < this.length && !id[a] ? b.unique(f) : f; 1 < this.length && hd.test(a) && (f = f.reverse()); return this.pushStack(f, a, s.call(arguments).join(","))
        }
    }); b.extend({
        filter: function (a, c, d) { d && (a = ":not(" + a + ")"); return 1 === c.length ? b.find.matchesSelector(c[0], a) ? [c[0]] : [] : b.find.matches(a, c) }, dir: function (a, c, d) { for (var e = [], a = a[c]; a && 9 !== a.nodeType && (d === h || 1 !== a.nodeType || !b(a).is(d)) ;) 1 === a.nodeType && e.push(a), a = a[c]; return e }, sibling: function (a, b)
        {
            for (var d = []; a; a =
            a.nextSibling) 1 === a.nodeType && a !== b && d.push(a); return d
        }
    }); var Mb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", jd = / jQuery\d+="(?:null|\d+)"/g, Eb = /^\s+/, jc = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, kc = /<([\w:]+)/, kd = /<tbody/i, ld = /<|&#?\w+;/, md = /<(?:script|style|link)/i, nd = /<(?:script|object|embed|option|style)/i, Fb = RegExp("<(?:" + Mb + ")[\\s/>]", "i"), Nb = /^(?:checkbox|radio)$/,
    lc = /checked\s*(?:[^=]|=\s*.checked.)/i, od = /\/(java|ecma)script/i, pd = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, T = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] }, mc = ja(g), Gb = mc.appendChild(g.createElement("div")); T.optgroup =
    T.option; T.tbody = T.tfoot = T.colgroup = T.caption = T.thead; T.th = T.td; b.support.htmlSerialize || (T._default = [1, "X<div>", "</div>"]); b.fn.extend({
        text: function (a) { return b.access(this, function (a) { return a === h ? b.text(this) : this.empty().append((this[0] && this[0].ownerDocument || g).createTextNode(a)) }, null, a, arguments.length) }, wrapAll: function (a)
        {
            if (b.isFunction(a)) return this.each(function (c) { b(this).wrapAll(a.call(this, c)) }); if (this[0])
            {
                var c = b(a, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && c.insertBefore(this[0]);
                c.map(function () { for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild; return a }).append(this)
            } return this
        }, wrapInner: function (a) { return b.isFunction(a) ? this.each(function (c) { b(this).wrapInner(a.call(this, c)) }) : this.each(function () { var c = b(this), d = c.contents(); d.length ? d.wrapAll(a) : c.append(a) }) }, wrap: function (a) { var c = b.isFunction(a); return this.each(function (d) { b(this).wrapAll(c ? a.call(this, d) : a) }) }, unwrap: function ()
        {
            return this.parent().each(function ()
            {
                b.nodeName(this, "body") ||
                b(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () { return this.domManip(arguments, !0, function (a) { (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(a) }) }, prepend: function () { return this.domManip(arguments, !0, function (a) { (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(a, this.firstChild) }) }, before: function ()
        {
            if (!Y(this[0])) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this) }); if (arguments.length)
            {
                var a = b.clean(arguments); return this.pushStack(b.merge(a,
                this), "before", this.selector)
            }
        }, after: function () { if (!Y(this[0])) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this.nextSibling) }); if (arguments.length) { var a = b.clean(arguments); return this.pushStack(b.merge(this, a), "after", this.selector) } }, remove: function (a, c) { for (var d, e = 0; null != (d = this[e]) ; e++) if (!a || b.filter(a, [d]).length) !c && 1 === d.nodeType && (b.cleanData(d.getElementsByTagName("*")), b.cleanData([d])), d.parentNode && d.parentNode.removeChild(d); return this }, empty: function ()
        {
            for (var a,
            c = 0; null != (a = this[c]) ; c++) for (1 === a.nodeType && b.cleanData(a.getElementsByTagName("*")) ; a.firstChild;) a.removeChild(a.firstChild); return this
        }, clone: function (a, c) { a = null == a ? !1 : a; c = null == c ? a : c; return this.map(function () { return b.clone(this, a, c) }) }, html: function (a)
        {
            return b.access(this, function (a)
            {
                var d = this[0] || {}, e = 0, f = this.length; if (a === h) return 1 === d.nodeType ? d.innerHTML.replace(jd, "") : h; if ("string" === typeof a && !md.test(a) && (b.support.htmlSerialize || !Fb.test(a)) && (b.support.leadingWhitespace || !Eb.test(a)) &&
                !T[(kc.exec(a) || ["", ""])[1].toLowerCase()]) { a = a.replace(jc, "<$1></$2>"); try { for (; e < f; e++) d = this[e] || {}, 1 === d.nodeType && (b.cleanData(d.getElementsByTagName("*")), d.innerHTML = a); d = 0 } catch (i) { } } d && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function (a)
        {
            if (!Y(this[0]))
            {
                if (b.isFunction(a)) return this.each(function (c) { var d = b(this), e = d.html(); d.replaceWith(a.call(this, c, e)) }); "string" !== typeof a && (a = b(a).detach()); return this.each(function ()
                {
                    var c = this.nextSibling, d = this.parentNode; b(this).remove();
                    c ? b(c).before(a) : b(d).append(a)
                })
            } return this.length ? this.pushStack(b(b.isFunction(a) ? a() : a), "replaceWith", a) : this
        }, detach: function (a) { return this.remove(a, !0) }, domManip: function (a, c, d)
        {
            var a = [].concat.apply([], a), e, f, i, j = 0, g = a[0], k = [], l = this.length; if (!b.support.checkClone && 1 < l && "string" === typeof g && lc.test(g)) return this.each(function () { b(this).domManip(a, c, d) }); if (b.isFunction(g)) return this.each(function (e) { var f = b(this); a[0] = g.call(this, e, c ? f.html() : h); f.domManip(a, c, d) }); if (this[0])
            {
                e = b.buildFragment(a,
                this, k); i = e.fragment; f = i.firstChild; 1 === i.childNodes.length && (i = f); if (f) { c = c && b.nodeName(f, "tr"); for (e = e.cacheable || l - 1; j < l; j++) d.call(c && b.nodeName(this[j], "table") ? this[j].getElementsByTagName("tbody")[0] || this[j].appendChild(this[j].ownerDocument.createElement("tbody")) : this[j], j === e ? i : b.clone(i, !0, !0)) } i = f = null; k.length && b.each(k, function (a, c)
                {
                    c.src ? b.ajax ? b.ajax({ url: c.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) : b.error("no ajax") : b.globalEval((c.text || c.textContent || c.innerHTML ||
                    "").replace(pd, "")); c.parentNode && c.parentNode.removeChild(c)
                })
            } return this
        }
    }); b.buildFragment = function (a, c, d) { var e, f, i, j = a[0], c = c || g, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c; if (1 === a.length && "string" === typeof j && 512 > j.length && c === g && "<" === j.charAt(0) && !nd.test(j) && (b.support.checkClone || !lc.test(j)) && (b.support.html5Clone || !Fb.test(j))) f = !0, e = b.fragments[j], i = e !== h; e || (e = c.createDocumentFragment(), b.clean(a, c, e, d), f && (b.fragments[j] = i && e)); return { fragment: e, cacheable: f } }; b.fragments = {}; b.each({
        appendTo: "append",
        prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"
    }, function (a, c) { b.fn[a] = function (d) { var e, f = 0, i = [], d = b(d), j = d.length; e = 1 === this.length && this[0].parentNode; if ((null == e || e && 11 === e.nodeType && 1 === e.childNodes.length) && 1 === j) return d[c](this[0]), this; for (; f < j; f++) e = (0 < f ? this.clone(!0) : this).get(), b(d[f])[c](e), i = i.concat(e); return this.pushStack(i, a, d.selector) } }); b.extend({
        clone: function (a, c, d)
        {
            var e, f, i, j; b.support.html5Clone || b.isXMLDoc(a) || !Fb.test("<" + a.nodeName +
            ">") ? j = a.cloneNode(!0) : (Gb.innerHTML = a.outerHTML, Gb.removeChild(j = Gb.firstChild)); if ((!b.support.noCloneEvent || !b.support.noCloneChecked) && (1 === a.nodeType || 11 === a.nodeType) && !b.isXMLDoc(a)) { E(a, j); e = M(a); f = M(j); for (i = 0; e[i]; ++i) f[i] && E(e[i], f[i]) } if (c && (Pa(a, j), d)) { e = M(a); f = M(j); for (i = 0; e[i]; ++i) Pa(e[i], f[i]) } return j
        }, clean: function (a, c, d, e)
        {
            var f, i, j, h, k, l, m = c === g && mc, n = []; if (!c || "undefined" === typeof c.createDocumentFragment) c = g; for (f = 0; null != (j = a[f]) ; f++) if ("number" === typeof j && (j += ""), j)
            {
                if ("string" ===
                typeof j) if (ld.test(j))
                {
                    m = m || ja(c); l = c.createElement("div"); m.appendChild(l); j = j.replace(jc, "<$1></$2>"); i = (kc.exec(j) || ["", ""])[1].toLowerCase(); h = T[i] || T._default; k = h[0]; for (l.innerHTML = h[1] + j + h[2]; k--;) l = l.lastChild; if (!b.support.tbody) { k = kd.test(j); h = "table" === i && !k ? l.firstChild && l.firstChild.childNodes : "<table>" === h[1] && !k ? l.childNodes : []; for (i = h.length - 1; 0 <= i; --i) b.nodeName(h[i], "tbody") && !h[i].childNodes.length && h[i].parentNode.removeChild(h[i]) } !b.support.leadingWhitespace && Eb.test(j) && l.insertBefore(c.createTextNode(Eb.exec(j)[0]),
                    l.firstChild); j = l.childNodes; l.parentNode.removeChild(l)
                } else j = c.createTextNode(j); j.nodeType ? n.push(j) : b.merge(n, j)
            } l && (j = l = m = null); if (!b.support.appendChecked) for (f = 0; null != (j = n[f]) ; f++) b.nodeName(j, "input") ? S(j) : "undefined" !== typeof j.getElementsByTagName && b.grep(j.getElementsByTagName("input"), S); if (d)
            {
                a = function (a) { if (!a.type || od.test(a.type)) return e ? e.push(a.parentNode ? a.parentNode.removeChild(a) : a) : d.appendChild(a) }; for (f = 0; null != (j = n[f]) ; f++) if (!b.nodeName(j, "script") || !a(j)) d.appendChild(j),
                "undefined" !== typeof j.getElementsByTagName && (j = b.grep(b.merge([], j.getElementsByTagName("script")), a), n.splice.apply(n, [f + 1, 0].concat(j)), f += j.length)
            } return n
        }, cleanData: function (a, c) { for (var d, e, f, i, h = 0, g = b.expando, k = b.cache, l = b.support.deleteExpando, m = b.event.special; null != (f = a[h]) ; h++) if (c || b.acceptData(f)) if (d = (e = f[g]) && k[e]) { if (d.events) for (i in d.events) m[i] ? b.event.remove(f, i) : b.removeEvent(f, i, d.handle); k[e] && (delete k[e], l ? delete f[g] : f.removeAttribute ? f.removeAttribute(g) : f[g] = null, b.deletedIds.push(e)) } }
    });
    var jb, pa; b.uaMatch = function (a) { a = a.toLowerCase(); a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || []; return { browser: a[1] || "", version: a[2] || "0" } }; jb = b.uaMatch(ta.userAgent); pa = {}; jb.browser && (pa[jb.browser] = !0, pa.version = jb.version); pa.chrome ? pa.webkit = !0 : pa.webkit && (pa.safari = !0); b.browser = pa; b.sub = function ()
    {
        function a(b, c)
        {
            return new a.fn.init(b,
            c)
        } b.extend(!0, a, this); a.superclass = this; a.fn = a.prototype = this(); a.fn.constructor = a; a.sub = this.sub; a.fn.init = function (d, e) { e && (e instanceof b && !(e instanceof a)) && (e = a(e)); return b.fn.init.call(this, d, e, c) }; a.fn.init.prototype = a.fn; var c = a(g); return a
    }; var N, Da, Ea, Hb = /alpha\([^)]*\)/i, qd = /opacity=([^)]*)/, rd = /^(top|right|bottom|left)$/, sd = /^(none|table(?!-c[ea]).+)/, nc = /^margin/, Hc = RegExp("^(" + Sa + ")(.*)$", "i"), Xa = RegExp("^(" + Sa + ")(?!px)[a-z%]+$", "i"), td = RegExp("^([-+])=(" + Sa + ")", "i"), pb = {}, ud = {
        position: "absolute",
        visibility: "hidden", display: "block"
    }, oc = { letterSpacing: 0, fontWeight: 400 }, va = ["Top", "Right", "Bottom", "Left"], Ob = ["Webkit", "O", "Moz", "ms"], vd = b.fn.toggle; b.fn.extend({
        css: function (a, c) { return b.access(this, function (a, c, f) { return f !== h ? b.style(a, c, f) : b.css(a, c) }, a, c, 1 < arguments.length) }, show: function () { return $(this, !0) }, hide: function () { return $(this) }, toggle: function (a, c)
        {
            var d = "boolean" === typeof a; return b.isFunction(a) && b.isFunction(c) ? vd.apply(this, arguments) : this.each(function ()
            {
                (d ? a : K(this)) ? b(this).show() :
                b(this).hide()
            })
        }
    }); b.extend({
        cssHooks: { opacity: { get: function (a, b) { if (b) { var d = N(a, "opacity"); return "" === d ? "1" : d } } } }, cssNumber: { fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": b.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (a, c, d, e)
        {
            if (a && !(3 === a.nodeType || 8 === a.nodeType || !a.style))
            {
                var f, i, j, g = b.camelCase(c), k = a.style, c = b.cssProps[g] || (b.cssProps[g] = da(k, g)); j = b.cssHooks[c] || b.cssHooks[g]; if (d !== h)
                {
                    i = typeof d; if ("string" ===
                    i && (f = td.exec(d))) d = (f[1] + 1) * f[2] + parseFloat(b.css(a, c)), i = "number"; if (!(null == d || "number" === i && isNaN(d))) if ("number" === i && !b.cssNumber[g] && (d += "px"), !j || !("set" in j) || (d = j.set(a, d, e)) !== h) try { k[c] = d } catch (l) { }
                } else return j && "get" in j && (f = j.get(a, !1, e)) !== h ? f : k[c]
            }
        }, css: function (a, c, d, e)
        {
            var f, i; i = b.camelCase(c); c = b.cssProps[i] || (b.cssProps[i] = da(a.style, i)); (i = b.cssHooks[c] || b.cssHooks[i]) && "get" in i && (f = i.get(a, !0, e)); f === h && (f = N(a, c)); "normal" === f && c in oc && (f = oc[c]); return d || e !== h ? (a = parseFloat(f),
            d || b.isNumeric(a) ? a || 0 : f) : f
        }, swap: function (a, b, d) { var e, f = {}; for (e in b) f[e] = a.style[e], a.style[e] = b[e]; d = d.call(a); for (e in b) a.style[e] = f[e]; return d }
    }); k.getComputedStyle ? N = function (a, c) { var d, e, f, i, h = k.getComputedStyle(a, null), g = a.style; h && (d = h[c], "" === d && !b.contains(a.ownerDocument, a) && (d = b.style(a, c)), Xa.test(d) && nc.test(c) && (e = g.width, f = g.minWidth, i = g.maxWidth, g.minWidth = g.maxWidth = g.width = d, d = h.width, g.width = e, g.minWidth = f, g.maxWidth = i)); return d } : g.documentElement.currentStyle && (N = function (a,
    b) { var d, e, f = a.currentStyle && a.currentStyle[b], i = a.style; null == f && (i && i[b]) && (f = i[b]); if (Xa.test(f) && !rd.test(b)) { d = i.left; if (e = a.runtimeStyle && a.runtimeStyle.left) a.runtimeStyle.left = a.currentStyle.left; i.left = "fontSize" === b ? "1em" : f; f = i.pixelLeft + "px"; i.left = d; e && (a.runtimeStyle.left = e) } return "" === f ? "auto" : f }); b.each(["height", "width"], function (a, c)
    {
        b.cssHooks[c] = {
            get: function (a, e, f) { if (e) return 0 === a.offsetWidth && sd.test(N(a, "display")) ? b.swap(a, ud, function () { return ka(a, c, f) }) : ka(a, c, f) }, set: function (a,
            e, f) { return la(a, e, f ? ea(a, c, f, b.support.boxSizing && "border-box" === b.css(a, "boxSizing")) : 0) }
        }
    }); b.support.opacity || (b.cssHooks.opacity = {
        get: function (a, b) { return qd.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : "" }, set: function (a, c)
        {
            var d = a.style, e = a.currentStyle, f = b.isNumeric(c) ? "alpha(opacity=" + 100 * c + ")" : "", i = e && e.filter || d.filter || ""; d.zoom = 1; if (1 <= c && ("" === b.trim(i.replace(Hb, "")) && d.removeAttribute) && (d.removeAttribute("filter"), e && !e.filter)) return;
            d.filter = Hb.test(i) ? i.replace(Hb, f) : i + " " + f
        }
    }); b(function () { b.support.reliableMarginRight || (b.cssHooks.marginRight = { get: function (a, c) { return b.swap(a, { display: "inline-block" }, function () { if (c) return N(a, "marginRight") }) } }); !b.support.pixelPosition && b.fn.position && b.each(["top", "left"], function (a, c) { b.cssHooks[c] = { get: function (a, e) { if (e) { var f = N(a, c); return Xa.test(f) ? b(a).position()[c] + "px" : f } } } }) }); b.expr && b.expr.filters && (b.expr.filters.hidden = function (a)
    {
        return 0 === a.offsetWidth && 0 === a.offsetHeight ||
        !b.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || N(a, "display"))
    }, b.expr.filters.visible = function (a) { return !b.expr.filters.hidden(a) }); b.each({ margin: "", padding: "", border: "Width" }, function (a, c) { b.cssHooks[a + c] = { expand: function (b) { for (var e = "string" === typeof b ? b.split(" ") : [b], f = {}, b = 0; 4 > b; b++) f[a + va[b] + c] = e[b] || e[b - 2] || e[0]; return f } }; nc.test(a) || (b.cssHooks[a + c].set = la) }); var wd = /%20/g, Ic = /\[\]$/, pc = /\r?\n/g, xd = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    yd = /^(?:select|textarea)/i; b.fn.extend({ serialize: function () { return b.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { return this.elements ? b.makeArray(this.elements) : this }).filter(function () { return this.name && !this.disabled && (this.checked || yd.test(this.nodeName) || xd.test(this.type)) }).map(function (a, c) { var d = b(this).val(); return null == d ? null : b.isArray(d) ? b.map(d, function (a) { return { name: c.name, value: a.replace(pc, "\r\n") } }) : { name: c.name, value: d.replace(pc, "\r\n") } }).get() } });
    b.param = function (a, c) { var d, e = [], f = function (a, c) { c = b.isFunction(c) ? c() : null == c ? "" : c; e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(c) }; c === h && (c = b.ajaxSettings && b.ajaxSettings.traditional); if (b.isArray(a) || a.jquery && !b.isPlainObject(a)) b.each(a, function () { f(this.name, this.value) }); else for (d in a) Ka(d, a[d], c, f); return e.join("&").replace(wd, "+") }; var Ha, ya, zd = /#.*$/, Ad = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Bd = /^(?:GET|HEAD)$/, Cd = /^\/\//, qc = /\?/, Dd = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    Ed = /([?&])_=[^&]*/, rc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, sc = b.fn.load, qb = {}, tc = {}, uc = ["*/"] + ["*"]; try { ya = Ba.href } catch (Nd) { ya = g.createElement("a"), ya.href = "", ya = ya.href } Ha = rc.exec(ya.toLowerCase()) || []; b.fn.load = function (a, c, d)
    {
        if ("string" !== typeof a && sc) return sc.apply(this, arguments); if (!this.length) return this; var e, f, i, j = this, g = a.indexOf(" "); 0 <= g && (e = a.slice(g, a.length), a = a.slice(0, g)); b.isFunction(c) ? (d = c, c = h) : c && "object" === typeof c && (f = "POST"); b.ajax({
            url: a, type: f, dataType: "html",
            data: c, complete: function (a, b) { d && j.each(d, i || [a.responseText, b, a]) }
        }).done(function (a) { i = arguments; j.html(e ? b("<div>").append(a.replace(Dd, "")).find(e) : a) }); return this
    }; b.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, c) { b.fn[c] = function (a) { return this.on(c, a) } }); b.each(["get", "post"], function (a, c) { b[c] = function (a, e, f, i) { b.isFunction(e) && (i = i || f, f = e, e = h); return b.ajax({ type: c, url: a, data: e, success: f, dataType: i }) } }); b.extend({
        getScript: function (a, c)
        {
            return b.get(a,
            h, c, "script")
        }, getJSON: function (a, c, d) { return b.get(a, c, d, "json") }, ajaxSetup: function (a, c) { c ? Ua(a, b.ajaxSettings) : (c = a, a = b.ajaxSettings); Ua(a, c); return a }, ajaxSettings: {
            url: ya, isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(Ha[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": uc }, contents: {
                xml: /xml/,
                html: /html/, json: /json/
            }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": k.String, "text html": !0, "text json": b.parseJSON, "text xml": b.parseXML }, flatOptions: { context: !0, url: !0 }
        }, ajaxPrefilter: Wa(qb), ajaxTransport: Wa(tc), ajax: function (a, c)
        {
            function d(a, c, d, i)
            {
                var l, r, p, x, v = c; if (2 !== C)
                {
                    C = 2; k && clearTimeout(k); g = h; f = i || ""; D.readyState = 0 < a ? 4 : 0; if (d)
                    {
                        x = n; var i = D, y, u, A, E, H = x.contents, F = x.dataTypes, I = x.responseFields; for (u in I) u in d && (i[I[u]] = d[u]); for (; "*" === F[0];) F.shift(),
                        y === h && (y = x.mimeType || i.getResponseHeader("content-type")); if (y) for (u in H) if (H[u] && H[u].test(y)) { F.unshift(u); break } if (F[0] in d) A = F[0]; else { for (u in d) { if (!F[0] || x.converters[u + " " + F[0]]) { A = u; break } E || (E = u) } A = A || E } A ? (A !== F[0] && F.unshift(A), x = d[A]) : x = void 0
                    } if (200 <= a && 300 > a || 304 === a) if (n.ifModified && ((d = D.getResponseHeader("Last-Modified")) && (b.lastModified[e] = d), (d = D.getResponseHeader("Etag")) && (b.etag[e] = d)), 304 === a) v = "notmodified", l = !0; else
                    {
                        a: {
                            r = n; p = x; var G, J, v = r.dataTypes.slice(); y = v[0]; u = {};
                            A = 0; r.dataFilter && (p = r.dataFilter(p, r.dataType)); if (v[1]) for (G in r.converters) u[G.toLowerCase()] = r.converters[G]; for (; d = v[++A];) if ("*" !== d) { if ("*" !== y && y !== d) { G = u[y + " " + d] || u["* " + d]; if (!G) for (J in u) if (l = J.split(" "), l[1] === d && (G = u[y + " " + l[0]] || u["* " + l[0]])) { !0 === G ? G = u[J] : !0 !== u[J] && (d = l[0], v.splice(A--, 0, d)); break } if (!0 !== G) if (G && r["throws"]) p = G(p); else try { p = G(p) } catch (K) { l = { state: "parsererror", error: G ? K : "No conversion from " + y + " to " + d }; break a } } y = d } l = { state: "success", data: p }
                        } v = l.state; r = l.data;
                        p = l.error; l = !p
                    } else if (p = v, !v || a) v = "error", 0 > a && (a = 0); D.status = a; D.statusText = (c || v) + ""; l ? t.resolveWith(q, [r, v, D]) : t.rejectWith(q, [D, v, p]); D.statusCode(B); B = h; m && s.trigger("ajax" + (l ? "Success" : "Error"), [D, n, l ? r : p]); z.fireWith(q, [D, v]); m && (s.trigger("ajaxComplete", [D, n]), --b.active || b.event.trigger("ajaxStop"))
                }
            } "object" === typeof a && (c = a, a = h); var c = c || {}, e, f, i, g, k, l, m, p, n = b.ajaxSetup({}, c), q = n.context || n, s = q !== n && (q.nodeType || q instanceof b) ? b(q) : b.event, t = b.Deferred(), z = b.Callbacks("once memory"),
            B = n.statusCode || {}, v = {}, y = {}, C = 0, u = "canceled", D = { readyState: 0, setRequestHeader: function (a, b) { if (!C) { var c = a.toLowerCase(), a = y[c] = y[c] || a; v[a] = b } return this }, getAllResponseHeaders: function () { return 2 === C ? f : null }, getResponseHeader: function (a) { var b; if (2 === C) { if (!i) for (i = {}; b = Ad.exec(f) ;) i[b[1].toLowerCase()] = b[2]; b = i[a.toLowerCase()] } return b === h ? null : b }, overrideMimeType: function (a) { C || (n.mimeType = a); return this }, abort: function (a) { a = a || u; g && g.abort(a); d(0, a); return this } }; t.promise(D); D.success = D.done;
            D.error = D.fail; D.complete = z.add; D.statusCode = function (a) { if (a) { var b; if (2 > C) for (b in a) B[b] = [B[b], a[b]]; else b = a[D.status], D.always(b) } return this }; n.url = ((a || n.url) + "").replace(zd, "").replace(Cd, Ha[1] + "//"); n.dataTypes = b.trim(n.dataType || "*").toLowerCase().split(Z); null == n.crossDomain && (l = rc.exec(n.url.toLowerCase()) || !1, n.crossDomain = l && l.join(":") + (l[3] ? "" : "http:" === l[1] ? 80 : 443) !== Ha.join(":") + (Ha[3] ? "" : "http:" === Ha[1] ? 80 : 443)); n.data && (n.processData && "string" !== typeof n.data) && (n.data = b.param(n.data,
            n.traditional)); ua(qb, n, c, D); if (2 === C) return D; m = n.global; n.type = n.type.toUpperCase(); n.hasContent = !Bd.test(n.type); m && 0 === b.active++ && b.event.trigger("ajaxStart"); if (!n.hasContent && (n.data && (n.url += (qc.test(n.url) ? "&" : "?") + n.data, delete n.data), e = n.url, !1 === n.cache)) { l = b.now(); var A = n.url.replace(Ed, "$1_=" + l); n.url = A + (A === n.url ? (qc.test(n.url) ? "&" : "?") + "_=" + l : "") } (n.data && n.hasContent && !1 !== n.contentType || c.contentType) && D.setRequestHeader("Content-Type", n.contentType); n.ifModified && (e = e || n.url,
            b.lastModified[e] && D.setRequestHeader("If-Modified-Since", b.lastModified[e]), b.etag[e] && D.setRequestHeader("If-None-Match", b.etag[e])); D.setRequestHeader("Accept", n.dataTypes[0] && n.accepts[n.dataTypes[0]] ? n.accepts[n.dataTypes[0]] + ("*" !== n.dataTypes[0] ? ", " + uc + "; q=0.01" : "") : n.accepts["*"]); for (p in n.headers) D.setRequestHeader(p, n.headers[p]); if (n.beforeSend && (!1 === n.beforeSend.call(q, D, n) || 2 === C)) return D.abort(); u = "abort"; for (p in { success: 1, error: 1, complete: 1 }) D[p](n[p]); if (g = ua(tc, n, c, D))
            {
                D.readyState =
                1; m && s.trigger("ajaxSend", [D, n]); n.async && 0 < n.timeout && (k = setTimeout(function () { D.abort("timeout") }, n.timeout)); try { C = 1, g.send(v, d) } catch (E) { if (2 > C) d(-1, E); else throw E; }
            } else d(-1, "No Transport"); return D
        }, active: 0, lastModified: {}, etag: {}
    }); var vc = [], Fd = /\?/, kb = /(=)\?(?=&|$)|\?\?/, Gd = b.now(); b.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var a = vc.pop() || b.expando + "_" + Gd++; this[a] = !0; return a } }); b.ajaxPrefilter("json jsonp", function (a, c, d)
    {
        var e, f, i, g = a.data, l = a.url, r = !1 !== a.jsonp, m = r && kb.test(l),
        p = r && !m && "string" === typeof g && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && kb.test(g); if ("jsonp" === a.dataTypes[0] || m || p) return e = a.jsonpCallback = b.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, f = k[e], m ? a.url = l.replace(kb, "$1" + e) : p ? a.data = g.replace(kb, "$1" + e) : r && (a.url += (Fd.test(l) ? "&" : "?") + a.jsonp + "=" + e), a.converters["script json"] = function () { i || b.error(e + " was not called"); return i[0] }, a.dataTypes[0] = "json", k[e] = function () { i = arguments }, d.always(function ()
        {
            k[e] =
            f; a[e] && (a.jsonpCallback = c.jsonpCallback, vc.push(e)); i && b.isFunction(f) && f(i[0]); i = f = h
        }), "script"
    }); b.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function (a) { b.globalEval(a); return a } } }); b.ajaxPrefilter("script", function (a) { a.cache === h && (a.cache = !1); a.crossDomain && (a.type = "GET", a.global = !1) }); b.ajaxTransport("script", function (a)
    {
        if (a.crossDomain)
        {
            var b, d =
            g.head || g.getElementsByTagName("head")[0] || g.documentElement; return { send: function (e, f) { b = g.createElement("script"); b.async = "async"; a.scriptCharset && (b.charset = a.scriptCharset); b.src = a.url; b.onload = b.onreadystatechange = function (a, e) { if (e || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload = b.onreadystatechange = null, d && b.parentNode && d.removeChild(b), b = h, e || f(200, "success") }; d.insertBefore(b, d.firstChild) }, abort: function () { if (b) b.onload(0, 1) } }
        }
    }); var Ia, Ib = k.ActiveXObject ? function ()
    {
        for (var a in Ia) Ia[a](0,
        1)
    } : !1, Hd = 0; b.ajaxSettings.xhr = k.ActiveXObject ? function () { var a; if (!(a = !this.isLocal && ga())) a: { try { a = new k.ActiveXObject("Microsoft.XMLHTTP"); break a } catch (b) { } a = void 0 } return a } : ga; var Jb = b.ajaxSettings.xhr(); b.extend(b.support, { ajax: !!Jb, cors: !!Jb && "withCredentials" in Jb }); b.support.ajax && b.ajaxTransport(function (a)
    {
        if (!a.crossDomain || b.support.cors)
        {
            var c; return {
                send: function (d, e)
                {
                    var f, i, g = a.xhr(); a.username ? g.open(a.type, a.url, a.async, a.username, a.password) : g.open(a.type, a.url, a.async); if (a.xhrFields) for (i in a.xhrFields) g[i] =
                    a.xhrFields[i]; a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType); !a.crossDomain && !d["X-Requested-With"] && (d["X-Requested-With"] = "XMLHttpRequest"); try { for (i in d) g.setRequestHeader(i, d[i]) } catch (l) { } g.send(a.hasContent && a.data || null); c = function (d, i)
                    {
                        var k, l, m, p, w; try
                        {
                            if (c && (i || 4 === g.readyState)) if (c = h, f && (g.onreadystatechange = b.noop, Ib && delete Ia[f]), i) 4 !== g.readyState && g.abort(); else
                            {
                                k = g.status; m = g.getAllResponseHeaders(); p = {}; if ((w = g.responseXML) && w.documentElement) p.xml = w; try
                                {
                                    p.text =
                                    g.responseText
                                } catch (q) { } try { l = g.statusText } catch (s) { l = "" } !k && a.isLocal && !a.crossDomain ? k = p.text ? 200 : 404 : 1223 === k && (k = 204)
                            }
                        } catch (t) { i || e(-1, t) } p && e(k, l, p, m)
                    }; a.async ? 4 === g.readyState ? setTimeout(c, 0) : (f = ++Hd, Ib && (Ia || (Ia = {}, b(k).unload(Ib)), Ia[f] = c), g.onreadystatechange = c) : c()
                }, abort: function () { c && c(0, 1) }
            }
        }
    }); var Ya, lb, Id = /^(?:toggle|show|hide)$/, Jd = RegExp("^(?:([-+])=|)(" + Sa + ")([a-z%]*)$", "i"), Kd = /queueHooks$/, Za = [function (a, c, d)
    {
        var e, f, i, g, h, k, l = this, m = a.style, n = {}, p = [], q = a.nodeType && K(a); d.queue ||
        (h = b._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, k = h.empty.fire, h.empty.fire = function () { h.unqueued || k() }), h.unqueued++, l.always(function () { l.always(function () { h.unqueued--; b.queue(a, "fx").length || h.empty.fire() }) })); if (1 === a.nodeType && ("height" in c || "width" in c)) d.overflow = [m.overflow, m.overflowX, m.overflowY], "inline" === b.css(a, "display") && "none" === b.css(a, "float") && (!b.support.inlineBlockNeedsLayout || "inline" === ma(a.nodeName) ? m.display = "inline-block" : m.zoom = 1); d.overflow && (m.overflow = "hidden",
        b.support.shrinkWrapBlocks || l.done(function () { m.overflow = d.overflow[0]; m.overflowX = d.overflow[1]; m.overflowY = d.overflow[2] })); for (e in c) f = c[e], Id.exec(f) && (delete c[e], f !== (q ? "hide" : "show") && p.push(e)); if (f = p.length)
        {
            i = b._data(a, "fxshow") || b._data(a, "fxshow", {}); q ? b(a).show() : l.done(function () { b(a).hide() }); l.done(function () { var c; b.removeData(a, "fxshow", !0); for (c in n) b.style(a, c, n[c]) }); for (e = 0; e < f; e++) c = p[e], g = l.createTween(c, q ? i[c] : 0), n[c] = i[c] || b.style(a, c), c in i || (i[c] = g.start, q && (g.end = g.start,
            g.start = "width" === c || "height" === c ? 1 : 0))
        }
    }], La = { "*": [function (a, c) { var d, e, f = this.createTween(a, c), i = Jd.exec(c), g = f.cur(), h = +g || 0, k = 1, l = 20; if (i) { d = +i[2]; e = i[3] || (b.cssNumber[a] ? "" : "px"); if ("px" !== e && h) { h = b.css(f.elem, a, !0) || d || 1; do k = k || ".5", h /= k, b.style(f.elem, a, h + e); while (k !== (k = f.cur() / g) && 1 !== k && --l) } f.unit = e; f.start = h; f.end = i[1] ? h + (i[1] + 1) * d : d } return f }] }; b.Animation = b.extend(Ta, {
        tweener: function (a, c)
        {
            b.isFunction(a) ? (c = a, a = ["*"]) : a = a.split(" "); for (var d, e = 0, f = a.length; e < f; e++) d = a[e], La[d] = La[d] ||
            [], La[d].unshift(c)
        }, prefilter: function (a, b) { b ? Za.unshift(a) : Za.push(a) }
    }); b.Tween = C; C.prototype = {
        constructor: C, init: function (a, c, d, e, f, i) { this.elem = a; this.prop = d; this.easing = f || "swing"; this.options = c; this.start = this.now = this.cur(); this.end = e; this.unit = i || (b.cssNumber[d] ? "" : "px") }, cur: function () { var a = C.propHooks[this.prop]; return a && a.get ? a.get(this) : C.propHooks._default.get(this) }, run: function (a)
        {
            var c, d = C.propHooks[this.prop]; this.pos = this.options.duration ? c = b.easing[this.easing](a, this.options.duration *
            a, 0, 1, this.options.duration) : c = a; this.now = (this.end - this.start) * c + this.start; this.options.step && this.options.step.call(this.elem, this.now, this); d && d.set ? d.set(this) : C.propHooks._default.set(this); return this
        }
    }; C.prototype.init.prototype = C.prototype; C.propHooks = {
        _default: {
            get: function (a) { if (null != a.elem[a.prop] && (!a.elem.style || null == a.elem.style[a.prop])) return a.elem[a.prop]; a = b.css(a.elem, a.prop, !1, ""); return !a || "auto" === a ? 0 : a }, set: function (a)
            {
                if (b.fx.step[a.prop]) b.fx.step[a.prop](a); else a.elem.style &&
                (null != a.elem.style[b.cssProps[a.prop]] || b.cssHooks[a.prop]) ? b.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }; C.propHooks.scrollTop = C.propHooks.scrollLeft = { set: function (a) { a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now) } }; b.each(["toggle", "show", "hide"], function (a, c) { var d = b.fn[c]; b.fn[c] = function (e, f, i) { return null == e || "boolean" === typeof e || !a && b.isFunction(e) && b.isFunction(f) ? d.apply(this, arguments) : this.animate(qa(c, !0), e, f, i) } }); b.fn.extend({
        fadeTo: function (a, b, d, e)
        {
            return this.filter(K).css("opacity",
            0).show().end().animate({ opacity: b }, a, d, e)
        }, animate: function (a, c, d, e) { var f = b.isEmptyObject(a), i = b.speed(c, d, e), c = function () { var c = Ta(this, b.extend({}, a), i); f && c.stop(!0) }; return f || !1 === i.queue ? this.each(c) : this.queue(i.queue, c) }, stop: function (a, c, d)
        {
            var e = function (a) { var b = a.stop; delete a.stop; b(d) }; "string" !== typeof a && (d = c, c = a, a = h); c && !1 !== a && this.queue(a || "fx", []); return this.each(function ()
            {
                var c = !0, i = null != a && a + "queueHooks", h = b.timers, g = b._data(this); if (i) g[i] && g[i].stop && e(g[i]); else for (i in g) g[i] &&
                (g[i].stop && Kd.test(i)) && e(g[i]); for (i = h.length; i--;) if (h[i].elem === this && (null == a || h[i].queue === a)) h[i].anim.stop(d), c = !1, h.splice(i, 1); (c || !d) && b.dequeue(this, a)
            })
        }
    }); b.each({ slideDown: qa("show"), slideUp: qa("hide"), slideToggle: qa("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, c) { b.fn[a] = function (a, b, f) { return this.animate(c, a, b, f) } }); b.speed = function (a, c, d)
    {
        var e = a && "object" === typeof a ? b.extend({}, a) : {
            complete: d || !d && c || b.isFunction(a) && a, duration: a,
            easing: d && c || c && !b.isFunction(c) && c
        }; e.duration = b.fx.off ? 0 : "number" === typeof e.duration ? e.duration : e.duration in b.fx.speeds ? b.fx.speeds[e.duration] : b.fx.speeds._default; if (null == e.queue || !0 === e.queue) e.queue = "fx"; e.old = e.complete; e.complete = function () { b.isFunction(e.old) && e.old.call(this); e.queue && b.dequeue(this, e.queue) }; return e
    }; b.easing = { linear: function (a) { return a }, swing: function (a) { return 0.5 - Math.cos(a * Math.PI) / 2 } }; b.timers = []; b.fx = C.prototype.init; b.fx.tick = function ()
    {
        for (var a, c = b.timers,
        d = 0; d < c.length; d++) a = c[d], !a() && c[d] === a && c.splice(d--, 1); c.length || b.fx.stop()
    }; b.fx.timer = function (a) { a() && (b.timers.push(a) && !lb) && (lb = setInterval(b.fx.tick, b.fx.interval)) }; b.fx.interval = 13; b.fx.stop = function () { clearInterval(lb); lb = null }; b.fx.speeds = { slow: 600, fast: 200, _default: 400 }; b.fx.step = {}; b.expr && b.expr.filters && (b.expr.filters.animated = function (a) { return b.grep(b.timers, function (b) { return a === b.elem }).length }); var wc = /^(?:body|html)$/i; b.fn.offset = function (a)
    {
        if (arguments.length) return a ===
        h ? this : this.each(function (c) { b.offset.setOffset(this, a, c) }); var c, d, e, f, i, g = { top: 0, left: 0 }; if (e = (f = this[0]) && f.ownerDocument) { if ((d = e.body) === f) return b.offset.bodyOffset(f); c = e.documentElement; if (!b.contains(c, f)) return g; "undefined" !== typeof f.getBoundingClientRect && (g = f.getBoundingClientRect()); e = Va(e); f = c.clientTop || d.clientTop || 0; d = c.clientLeft || d.clientLeft || 0; i = e.pageYOffset || c.scrollTop; c = e.pageXOffset || c.scrollLeft; return { top: g.top + i - f, left: g.left + c - d } }
    }; b.offset = {
        bodyOffset: function (a)
        {
            var c =
            a.offsetTop, d = a.offsetLeft; b.support.doesNotIncludeMarginInBodyOffset && (c += parseFloat(b.css(a, "marginTop")) || 0, d += parseFloat(b.css(a, "marginLeft")) || 0); return { top: c, left: d }
        }, setOffset: function (a, c, d)
        {
            var e = b.css(a, "position"); "static" === e && (a.style.position = "relative"); var f = b(a), i = f.offset(), g = b.css(a, "top"), h = b.css(a, "left"), k = {}, l = {}; ("absolute" === e || "fixed" === e) && -1 < b.inArray("auto", [g, h]) ? (l = f.position(), e = l.top, h = l.left) : (e = parseFloat(g) || 0, h = parseFloat(h) || 0); b.isFunction(c) && (c = c.call(a, d,
            i)); null != c.top && (k.top = c.top - i.top + e); null != c.left && (k.left = c.left - i.left + h); "using" in c ? c.using.call(a, k) : f.css(k)
        }
    }; b.fn.extend({
        position: function () { if (this[0]) { var a = this[0], c = this.offsetParent(), d = this.offset(), e = wc.test(c[0].nodeName) ? { top: 0, left: 0 } : c.offset(); d.top -= parseFloat(b.css(a, "marginTop")) || 0; d.left -= parseFloat(b.css(a, "marginLeft")) || 0; e.top += parseFloat(b.css(c[0], "borderTopWidth")) || 0; e.left += parseFloat(b.css(c[0], "borderLeftWidth")) || 0; return { top: d.top - e.top, left: d.left - e.left } } },
        offsetParent: function () { return this.map(function () { for (var a = this.offsetParent || g.body; a && !wc.test(a.nodeName) && "static" === b.css(a, "position") ;) a = a.offsetParent; return a || g.body }) }
    }); b.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, c) { var d = /Y/.test(c); b.fn[a] = function (e) { return b.access(this, function (a, e, g) { var k = Va(a); if (g === h) return k ? c in k ? k[c] : k.document.documentElement[e] : a[e]; k ? k.scrollTo(!d ? g : b(k).scrollLeft(), d ? g : b(k).scrollTop()) : a[e] = g }, a, e, arguments.length, null) } });
    b.each({ Height: "height", Width: "width" }, function (a, c)
    {
        b.each({ padding: "inner" + a, content: c, "": "outer" + a }, function (d, e)
        {
            b.fn[e] = function (e, g)
            {
                var j = arguments.length && (d || "boolean" !== typeof e), k = d || (!0 === e || !0 === g ? "margin" : "border"); return b.access(this, function (c, d, e) { return b.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (d = c.documentElement, Math.max(c.body["scroll" + a], d["scroll" + a], c.body["offset" + a], d["offset" + a], d["client" + a])) : e === h ? b.css(c, d, e, k) : b.style(c, d, e, k) }, c, j ? e : h, j,
                null)
            }
        })
    }); k.jQuery = k.$ = b; "function" === typeof define && (define.amd && define.amd.jQuery) && define("jquery", [], function () { return b })
})(window);