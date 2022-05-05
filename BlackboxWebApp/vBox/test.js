import e, {Component as t} from "react";
import o from "prop-types";
import n from "react-dom";
import r from "eventemitter3";
import {Loader as i} from "@googlemaps/js-api-loader";
import s from "@mapbox/point-geometry";

function a() {
    return (a = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var o = arguments[t];
            for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n])
        }
        return e
    }).apply(this, arguments)
}

function p(e, t) {
    e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
}

function l(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
}

var u = {width: "100%", height: "100%", left: 0, top: 0, margin: 0, padding: 0, position: "absolute"},
    h = function (t) {
        function o() {
            return t.apply(this, arguments) || this
        }

        p(o, t);
        var n = o.prototype;
        return n.shouldComponentUpdate = function () {
            return !1
        }, n.render = function () {
            return e.createElement("div", {ref: this.props.registerChild, style: u})
        }, o
    }(t), c = function (e) {
        function t(t) {
            var o;
            return (o = e.call(this) || this).gmapInstance = t, o
        }

        p(t, e);
        var o = t.prototype;
        return o.getChildren = function () {
            return this.gmapInstance.props.children
        }, o.getMousePosition = function () {
            return this.gmapInstance.mouse_
        }, o.getUpdateCounter = function () {
            return this.gmapInstance.updateCounter_
        }, o.dispose = function () {
            this.gmapInstance = null, this.removeAllListeners()
        }, t
    }(r), d = function (e, t) {
        for (var o = a({}, e), n = 0; n < t.length; n++) {
            var r = t[n];
            r in o && delete o[r]
        }
        return o
    }, m = Object.prototype.hasOwnProperty;

function g(e, t) {
    return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t
}

function _(e, t) {
    if (g(e, t)) return !0;
    if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
    var o = Object.keys(e), n = Object.keys(t);
    if (o.length !== n.length) return !1;
    for (var r = 0; r < o.length; r++) if (!m.call(t, o[r]) || !g(e[o[r]], t[o[r]])) return !1;
    return !0
}

var f = {width: "100%", height: "100%", left: 0, top: 0, margin: 0, padding: 0, position: "absolute"},
    v = {width: 0, height: 0, left: 0, top: 0, backgroundColor: "transparent", position: "absolute"}, M = function (t) {
        function o(o) {
            var n;
            return (n = t.call(this, o) || this)._getState = function () {
                return {children: n.props.dispatcher.getChildren(), updateCounter: n.props.dispatcher.getUpdateCounter()}
            }, n._onChangeHandler = function () {
                if (n.dimensionsCache_) {
                    var e = (n.state.children || []).length, t = n._getState();
                    n.setState(t, function () {
                        return (t.children || []).length !== e && n._onMouseChangeHandler()
                    })
                }
            }, n._onChildClick = function () {
                n.props.onChildClick && n.hoverChildProps_ && n.props.onChildClick(n.hoverKey_, n.hoverChildProps_)
            }, n._onChildMouseDown = function () {
                n.props.onChildMouseDown && n.hoverChildProps_ && n.props.onChildMouseDown(n.hoverKey_, n.hoverChildProps_)
            }, n._onChildMouseEnter = function (e, t) {
                n.dimensionsCache_ && (n.props.onChildMouseEnter && n.props.onChildMouseEnter(e, t), n.hoverChildProps_ = t, n.hoverKey_ = e, n.setState({hoverKey: e}))
            }, n._onChildMouseLeave = function () {
                if (n.dimensionsCache_) {
                    var e = n.hoverKey_;
                    null != e && (n.props.onChildMouseLeave && n.props.onChildMouseLeave(e, n.hoverChildProps_), n.hoverKey_ = null, n.hoverChildProps_ = null, n.setState({hoverKey: null}))
                }
            }, n._onMouseAllow = function (e) {
                e || n._onChildMouseLeave(), n.allowMouse_ = e
            }, n._onMouseChangeHandler = function () {
                n.allowMouse_ && n._onMouseChangeHandlerRaf()
            }, n._onMouseChangeHandlerRaf = function () {
                if (n.dimensionsCache_) {
                    var t = n.props.dispatcher.getMousePosition();
                    if (t) {
                        var o = [], r = n.props.getHoverDistance();
                        if (e.Children.forEach(n.state.children, function (e, i) {
                            if (e && (void 0 !== e.props.latLng || void 0 !== e.props.lat || void 0 !== e.props.lng)) {
                                var s = null != e.key ? e.key : i,
                                    a = n.props.distanceToMouse(n.dimensionsCache_[s], t, e.props);
                                a < r && o.push({key: s, dist: a, props: e.props})
                            }
                        }), o.length) {
                            o.sort(function (e, t) {
                                return e.dist - t.dist
                            });
                            var i = o[0].key, s = o[0].props;
                            n.hoverKey_ !== i && (n._onChildMouseLeave(), n._onChildMouseEnter(i, s))
                        } else n._onChildMouseLeave()
                    } else n._onChildMouseLeave()
                }
            }, n._getDimensions = function (e) {
                return n.dimensionsCache_[e]
            }, n.dimensionsCache_ = {}, n.hoverKey_ = null, n.hoverChildProps_ = null, n.allowMouse_ = !0, n.state = a({}, n._getState(), {hoverKey: null}), n
        }

        p(o, t);
        var n = o.prototype;
        return n.componentDidMount = function () {
            this.props.dispatcher.on("kON_CHANGE", this._onChangeHandler), this.props.dispatcher.on("kON_MOUSE_POSITION_CHANGE", this._onMouseChangeHandler), this.props.dispatcher.on("kON_CLICK", this._onChildClick), this.props.dispatcher.on("kON_MDOWN", this._onChildMouseDown)
        }, n.shouldComponentUpdate = function (e, t) {
            return !0 === this.props.experimental ? !_(this.props, e) || !_(d(this.state, ["hoverKey"]), d(t, ["hoverKey"])) : !_(this.props, e) || !_(this.state, t)
        }, n.componentWillUnmount = function () {
            this.props.dispatcher.removeListener("kON_CHANGE", this._onChangeHandler), this.props.dispatcher.removeListener("kON_MOUSE_POSITION_CHANGE", this._onMouseChangeHandler), this.props.dispatcher.removeListener("kON_CLICK", this._onChildClick), this.props.dispatcher.removeListener("kON_MDOWN", this._onChildMouseDown), this.dimensionsCache_ = null
        }, n.render = function () {
            var t = this, o = this.props.style || f;
            this.dimensionsCache_ = {};
            var n = e.Children.map(this.state.children, function (o, n) {
                if (o) {
                    if (void 0 === o.props.latLng && void 0 === o.props.lat && void 0 === o.props.lng) return e.cloneElement(o, {
                        $geoService: t.props.geoService,
                        $onMouseAllow: t._onMouseAllow,
                        $prerender: t.props.prerender
                    });
                    var r = void 0 !== o.props.latLng ? o.props.latLng : {lat: o.props.lat, lng: o.props.lng},
                        i = t.props.insideMapPanes ? t.props.geoService.fromLatLngToDivPixel(r) : t.props.geoService.fromLatLngToCenterPixel(r),
                        s = {left: i.x, top: i.y};
                    if (void 0 !== o.props.seLatLng || void 0 !== o.props.seLat && void 0 !== o.props.seLng) {
                        var p = void 0 !== o.props.seLatLng ? o.props.seLatLng : {lat: o.props.seLat, lng: o.props.seLng},
                            l = t.props.insideMapPanes ? t.props.geoService.fromLatLngToDivPixel(p) : t.props.geoService.fromLatLngToCenterPixel(p);
                        s.width = l.x - i.x, s.height = l.y - i.y
                    }
                    var u = t.props.geoService.fromLatLngToContainerPixel(r), h = null != o.key ? o.key : n;
                    return t.dimensionsCache_[h] = a({x: u.x, y: u.y}, r), e.createElement("div", {
                        key: h,
                        style: a({}, v, s),
                        className: o.props.$markerHolderClassName
                    }, e.cloneElement(o, {
                        $hover: h === t.state.hoverKey,
                        $getDimensions: t._getDimensions,
                        $dimensionKey: h,
                        $geoService: t.props.geoService,
                        $onMouseAllow: t._onMouseAllow,
                        $prerender: t.props.prerender
                    }))
                }
            });
            return e.createElement("div", {style: o}, n)
        }, o
    }(t);
M.propTypes = {
    geoService: o.any,
    style: o.any,
    distanceToMouse: o.func,
    dispatcher: o.any,
    onChildClick: o.func,
    onChildMouseDown: o.func,
    onChildMouseLeave: o.func,
    onChildMouseEnter: o.func,
    getHoverDistance: o.func,
    insideMapPanes: o.bool,
    prerender: o.bool
}, M.defaultProps = {insideMapPanes: !1, prerender: !1};
var y = {width: "50%", height: "50%", left: "50%", top: "50%", margin: 0, padding: 0, position: "absolute"};

function C(t) {
    return e.createElement("div", {style: y}, e.createElement(M, a({}, t, {prerender: !0})))
}

var w, L, b, D = new Promise(function (e) {
    b = e
}), z = function (e, t) {
    if (!e) return D;
    if (L) return L;
    e.libraries || (e.libraries = []);
    var o = [].concat(e.libraries);
    if (t && (0 !== o.length && o.includes("visualization") || o.push("visualization"), console.warn("heatmapLibrary will be deprecated in the future. Please use { libraries: ['visualization'] } in bootstrapURLKeys property instead")), "production" !== process.env.NODE_ENV && Object.keys(e).indexOf("callback") > -1) {
        var n = '"callback" key in bootstrapURLKeys is not allowed,\n                      use onGoogleApiLoaded property instead';
        throw console.error(n), new Error(n)
    }
    if ("undefined" == typeof window) throw new Error("google map cannot be loaded outside browser env");
    var r = e.key, s = function (e, t) {
        if (null == e) return {};
        var o, n, r = {}, i = Object.keys(e);
        for (n = 0; n < i.length; n++) t.indexOf(o = i[n]) >= 0 || (r[o] = e[o]);
        return r
    }(e, ["key"]);
    return w || (w = new i(a({apiKey: r || ""}, s, {libraries: o}))), L = w.load().then(function () {
        return b(window.google.maps), window.google.maps
    }), b(L), L
};

function k(e, t, o) {
    var n = o - t;
    return e === o ? e : ((e - t) % n + n) % n + t
}

var O = function () {
    function e(e, t) {
        if (isNaN(e) || isNaN(t)) throw new Error("Invalid LatLng object: (" + e + ", " + t + ")");
        this.lat = +e, this.lng = +t
    }

    return e.prototype.wrap = function () {
        return new e(this.lat, k(this.lng, -180, 180))
    }, e
}();
O.convert = function (e) {
    return e instanceof O ? e : Array.isArray(e) ? new O(e[0], e[1]) : "lng" in e && "lat" in e ? new O(e.lat, e.lng) : e
};
var x = function () {
    function e(e, t, o) {
        this.tileSize = e || 512, this._minZoom = t || 0, this._maxZoom = o || 52, this.latRange = [-85.05113, 85.05113], this.width = 0, this.height = 0, this.zoom = 0, this.center = new O(0, 0), this.angle = 0
    }

    var t, o = e.prototype;
    return o.zoomScale = function (e) {
        return Math.pow(2, e)
    }, o.scaleZoom = function (e) {
        return Math.log(e) / Math.LN2
    }, o.project = function (e, t) {
        return new s(this.lngX(e.lng, t), this.latY(e.lat, t))
    }, o.unproject = function (e, t) {
        return new O(this.yLat(e.y, t), this.xLng(e.x, t))
    }, o.lngX = function (e, t) {
        return (180 + e) * (t || this.worldSize) / 360
    }, o.latY = function (e, t) {
        return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + e * Math.PI / 360))) * (t || this.worldSize) / 360
    }, o.xLng = function (e, t) {
        return 360 * e / (t || this.worldSize) - 180
    }, o.yLat = function (e, t) {
        return 360 / Math.PI * Math.atan(Math.exp((180 - 360 * e / (t || this.worldSize)) * Math.PI / 180)) - 90
    }, o.locationPoint = function (e) {
        var t = this.project(e);
        return this.centerPoint._sub(this.point._sub(t)._rotate(this.angle))
    }, o.pointLocation = function (e) {
        var t = this.centerPoint._sub(e)._rotate(-this.angle);
        return this.unproject(this.point.sub(t))
    }, (t = [{
        key: "minZoom", get: function () {
            return this._minZoom
        }, set: function (e) {
            this._minZoom = e, this.zoom = Math.max(this.zoom, e)
        }
    }, {
        key: "maxZoom", get: function () {
            return this._maxZoom
        }, set: function (e) {
            this._maxZoom = e, this.zoom = Math.min(this.zoom, e)
        }
    }, {
        key: "worldSize", get: function () {
            return this.tileSize * this.scale
        }
    }, {
        key: "centerPoint", get: function () {
            return new s(0, 0)
        }
    }, {
        key: "size", get: function () {
            return new s(this.width, this.height)
        }
    }, {
        key: "bearing", get: function () {
            return -this.angle / Math.PI * 180
        }, set: function (e) {
            this.angle = -k(e, -180, 180) * Math.PI / 180
        }
    }, {
        key: "zoom", get: function () {
            return this._zoom
        }, set: function (e) {
            var t = Math.min(Math.max(e, this.minZoom), this.maxZoom);
            this._zoom = t, this.scale = this.zoomScale(t), this.tileZoom = Math.floor(t), this.zoomFraction = t - this.tileZoom
        }
    }, {
        key: "x", get: function () {
            return this.lngX(this.center.lng)
        }
    }, {
        key: "y", get: function () {
            return this.latY(this.center.lat)
        }
    }, {
        key: "point", get: function () {
            return new s(this.x, this.y)
        }
    }]) && function (e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }(e.prototype, t), e
}(), T = function () {
    function e(e) {
        this.hasSize_ = !1, this.hasView_ = !1, this.transform_ = new x(e || 512)
    }

    var t = e.prototype;
    return t.setView = function (e, t, o) {
        this.transform_.center = O.convert(e), this.transform_.zoom = +t, this.transform_.bearing = +o, this.hasView_ = !0
    }, t.setViewSize = function (e, t) {
        this.transform_.width = e, this.transform_.height = t, this.hasSize_ = !0
    }, t.setMapCanvasProjection = function (e, t) {
        this.maps_ = e, this.mapCanvasProjection_ = t
    }, t.canProject = function () {
        return this.hasSize_ && this.hasView_
    }, t.hasSize = function () {
        return this.hasSize_
    }, t.fromLatLngToCenterPixel = function (e) {
        return this.transform_.locationPoint(O.convert(e))
    }, t.fromLatLngToDivPixel = function (e) {
        if (this.mapCanvasProjection_) {
            var t = new this.maps_.LatLng(e.lat, e.lng);
            return this.mapCanvasProjection_.fromLatLngToDivPixel(t)
        }
        return this.fromLatLngToCenterPixel(e)
    }, t.fromLatLngToContainerPixel = function (e) {
        if (this.mapCanvasProjection_) {
            var t = new this.maps_.LatLng(e.lat, e.lng);
            return this.mapCanvasProjection_.fromLatLngToContainerPixel(t)
        }
        var o = this.fromLatLngToCenterPixel(e);
        return o.x -= this.transform_.worldSize * Math.round(o.x / this.transform_.worldSize), o.x += this.transform_.width / 2, o.y += this.transform_.height / 2, o
    }, t.fromContainerPixelToLatLng = function (e) {
        if (this.mapCanvasProjection_) {
            var t = this.mapCanvasProjection_.fromContainerPixelToLatLng(e);
            return {lat: t.lat(), lng: t.lng()}
        }
        var o = a({}, e);
        o.x -= this.transform_.width / 2, o.y -= this.transform_.height / 2;
        var n = this.transform_.pointLocation(s.convert(o));
        return n.lng -= 360 * Math.round(n.lng / 360), n
    }, t.getWidth = function () {
        return this.transform_.width
    }, t.getHeight = function () {
        return this.transform_.height
    }, t.getZoom = function () {
        return this.transform_.zoom
    }, t.getCenter = function () {
        return this.transform_.pointLocation({x: 0, y: 0})
    }, t.getBounds = function (e, t) {
        var o = e && e[0] || 0, n = e && e[1] || 0, r = e && e[2] || 0, i = e && e[3] || 0;
        if (this.getWidth() - n - i > 0 && this.getHeight() - o - r > 0) {
            var a = this.transform_.pointLocation(s.convert({x: i - this.getWidth() / 2, y: o - this.getHeight() / 2})),
                p = this.transform_.pointLocation(s.convert({x: this.getWidth() / 2 - n, y: this.getHeight() / 2 - r})),
                l = [a.lat, a.lng, p.lat, p.lng, p.lat, a.lng, a.lat, p.lng];
            return t && (l = l.map(function (e) {
                return Math.round(e * t) / t
            })), l
        }
        return [0, 0, 0, 0]
    }, e
}();

function S(e) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(e);
    var t = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    return t ? t(e) : window.setTimeout(e, 1e3 / 60)
}

var E = Math.log2 ? Math.log2 : function (e) {
    return Math.log(e) / Math.LN2
};

function P(e, t) {
    return Object.keys(e).reduce(function (o, n) {
        return t(e[n]) && (o[n] = e[n]), o
    }, {})
}

var A = function (e) {
    if (null !== e && "object" == typeof e) {
        if (0 === Object.keys(e).length) return !0
    } else if (null == e || "" === e) return !0;
    return !1
}, I = Object.prototype.toString;

function N(e) {
    return "number" == typeof e || function (e) {
        return !!e && "object" == typeof e
    }(e) && "[object Number]" === I.call(e)
}

var Z = null;

function j() {
    if (Z) return Z;
    if ("undefined" != typeof navigator) {
        var e = navigator.userAgent.indexOf("MSIE") > -1, t = navigator.userAgent.indexOf("Firefox") > -1,
            o = navigator.userAgent.toLowerCase().indexOf("op") > -1, n = navigator.userAgent.indexOf("Chrome") > -1,
            r = navigator.userAgent.indexOf("Safari") > -1;
        return n && r && (r = !1), n && o && (n = !1), Z = {
            isExplorer: e,
            isFirefox: t,
            isOpera: o,
            isChrome: n,
            isSafari: r
        }
    }
    return Z = {isChrome: !0, isExplorer: !1, isFirefox: !1, isOpera: !1, isSafari: !1}
}

var U = function (e) {
    return Function.prototype.toString.call(e)
};

function H(e) {
    if (!e || "object" != typeof e) return !1;
    var t = "function" == typeof e.constructor ? Object.getPrototypeOf(e) : Object.prototype;
    if (null === t) return !0;
    var o = t.constructor;
    return "function" == typeof o && o instanceof o && U(o) === U(Object)
}

function K(e, t, o, n) {
    e.addEventListener(t, o, function () {
        var e = !1;
        try {
            var t = Object.defineProperty({}, "passive", {
                get: function () {
                    e = !0
                }
            });
            window.addEventListener("test", t, t), window.removeEventListener("test", t, t)
        } catch (t) {
            e = !1
        }
        return e
    }() ? {capture: n, passive: !0} : n)
}

var R, G = !("undefined" == typeof window || !window.document || !window.document.createElement);
R = G ? window : "undefined" != typeof self ? self : void 0;
var B, W = "undefined" != typeof document && document.attachEvent, V = !1;
if (G && !W) {
    var F = function () {
            var e = R.requestAnimationFrame || R.mozRequestAnimationFrame || R.webkitRequestAnimationFrame || function (e) {
                return R.setTimeout(e, 20)
            };
            return function (t) {
                return e(t)
            }
        }(),
        $ = (B = R.cancelAnimationFrame || R.mozCancelAnimationFrame || R.webkitCancelAnimationFrame || R.clearTimeout, function (e) {
            return B(e)
        }), q = function (e) {
            var t = e.__resizeTriggers__, o = t.firstElementChild, n = t.lastElementChild, r = o.firstElementChild;
            n.scrollLeft = n.scrollWidth, n.scrollTop = n.scrollHeight, r.style.width = o.offsetWidth + 1 + "px", r.style.height = o.offsetHeight + 1 + "px", o.scrollLeft = o.scrollWidth, o.scrollTop = o.scrollHeight
        }, Y = function (e) {
            var t = this;
            q(this), this.__resizeRAF__ && $(this.__resizeRAF__), this.__resizeRAF__ = F(function () {
                (function (e) {
                    return e.offsetWidth != e.__resizeLast__.width || e.offsetHeight != e.__resizeLast__.height
                })(t) && (t.__resizeLast__.width = t.offsetWidth, t.__resizeLast__.height = t.offsetHeight, t.__resizeListeners__.forEach(function (o) {
                    o.call(t, e)
                }))
            })
        }, X = !1, J = "", Q = "animationstart", ee = "Webkit Moz O ms".split(" "),
        te = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" ");
    if (G) {
        var oe = document.createElement("fakeelement");
        if (void 0 !== oe.style.animationName && (X = !0), !1 === X) for (var ne = 0; ne < ee.length; ne++) if (void 0 !== oe.style[ee[ne] + "AnimationName"]) {
            J = "-" + ee[ne].toLowerCase() + "-", Q = te[ne], X = !0;
            break
        }
    }
    var re = "resizeanim", ie = "@" + J + "keyframes " + re + " { from { opacity: 0; } to { opacity: 0; } } ",
        se = J + "animation: 1ms " + re + "; "
}
var ae = void 0 !== n.createPortal, pe = ae ? n.createPortal : n.unstable_renderSubtreeIntoContainer,
    le = function (e) {
        return H(e) ? e : {lat: e[0], lng: e[1]}
    }, ue = function (e, t) {
        return "production" !== process.env.NODE_ENV && e < t && console.warn("GoogleMap: minZoom option is less than recommended minZoom option for your map sizes.\noverrided to value " + t), t < e ? e : t
    }, he = function (t) {
        function o(o) {
            var r;
            if ((r = t.call(this, o) || this)._getMinZoom = function () {
                if (r.geoService_.getWidth() > 0 || r.geoService_.getHeight() > 0) {
                    var e = Math.ceil(r.geoService_.getWidth() / 256) + 2,
                        t = Math.ceil(r.geoService_.getHeight() / 256) + 2, o = Math.max(e, t);
                    return Math.ceil(E(o))
                }
                return 3
            }, r._computeMinZoom = function (e) {
                return A(e) ? r._getMinZoom() : e
            }, r._mapDomResizeCallback = function () {
                if (r.resetSizeOnIdle_ = !0, r.maps_) {
                    var e = r.props.center || r.props.defaultCenter, t = r.map_.getCenter();
                    r.maps_.event.trigger(r.map_, "resize"), r.map_.setCenter(r.props.resetBoundsOnResize ? e : t)
                }
            }, r._setLayers = function (e) {
                e.forEach(function (e) {
                    r.layers_[e] = new r.maps_[e], r.layers_[e].setMap(r.map_)
                })
            }, r._renderPortal = function () {
                return e.createElement(M, {
                    experimental: r.props.experimental,
                    onChildClick: r._onChildClick,
                    onChildMouseDown: r._onChildMouseDown,
                    onChildMouseEnter: r._onChildMouseEnter,
                    onChildMouseLeave: r._onChildMouseLeave,
                    geoService: r.geoService_,
                    insideMapPanes: !0,
                    distanceToMouse: r.props.distanceToMouse,
                    getHoverDistance: r._getHoverDistance,
                    dispatcher: r.markersDispatcher_
                })
            }, r._initMap = function () {
                if (!r.initialized_) {
                    r.initialized_ = !0;
                    var e = le(r.props.center || r.props.defaultCenter);
                    r.geoService_.setView(e, r.props.zoom || r.props.defaultZoom, 0), r._onBoundsChanged();
                    var t = a({}, r.props.apiKey && {key: r.props.apiKey}, r.props.bootstrapURLKeys);
                    r.props.googleMapLoader(t, r.props.heatmapLibrary).then(function (e) {
                        if (r.mounted_) {
                            var t, o, i = r.geoService_.getCenter(),
                                s = {zoom: r.props.zoom || r.props.defaultZoom, center: new e.LatLng(i.lat, i.lng)};
                            r.props.heatmap.positions && (Object.assign(l(r), {
                                heatmap: (t = e, o = r.props.heatmap, new t.visualization.HeatmapLayer({
                                    data: o.positions.reduce(function (e, o) {
                                        var n = o.weight, r = void 0 === n ? 1 : n;
                                        return e.push({location: new t.LatLng(o.lat, o.lng), weight: r}), e
                                    }, [])
                                }))
                            }), function (e, t) {
                                var o = t.options, n = void 0 === o ? {} : o;
                                Object.keys(n).map(function (t) {
                                    return e.set(t, n[t])
                                })
                            }(r.heatmap, r.props.heatmap));
                            var p = P(e, H),
                                u = "function" == typeof r.props.options ? r.props.options(p) : r.props.options,
                                h = !A(r.props.draggable) && {draggable: r.props.draggable},
                                c = r._computeMinZoom(u.minZoom);
                            r.minZoom_ = c;
                            var d = a({}, {
                                overviewMapControl: !1,
                                streetViewControl: !1,
                                rotateControl: !0,
                                mapTypeControl: !1,
                                styles: [{featureType: "poi", elementType: "labels", stylers: [{visibility: "off"}]}],
                                minZoom: 3
                            }, {minZoom: c}, u, s);
                            r.defaultDraggableOption_ = A(d.draggable) ? r.defaultDraggableOption_ : d.draggable;
                            var m = a({}, d, h);
                            m.minZoom = ue(m.minZoom, c);
                            var g = new e.Map(n.findDOMNode(r.googleMapDom_), m);
                            r.map_ = g, r.maps_ = e, r._setLayers(r.props.layerTypes);
                            var _ = e.version.match(/^3\.(\d+)\./), f = _ && Number(_[1]), v = l(r),
                                M = Object.assign(new e.OverlayView, {
                                    onAdd: function () {
                                        var t = "undefined" != typeof screen ? screen.width + "px" : "2000px",
                                            o = "undefined" != typeof screen ? screen.height + "px" : "2000px",
                                            n = document.createElement("div");
                                        if (n.style.backgroundColor = "transparent", n.style.position = "absolute", n.style.left = "0px", n.style.top = "0px", n.style.width = t, n.style.height = o, v.props.overlayViewDivStyle) {
                                            var r = v.props.overlayViewDivStyle;
                                            "object" == typeof r && Object.keys(r).forEach(function (e) {
                                                n.style[e] = r[e]
                                            })
                                        }
                                        this.getPanes().overlayMouseTarget.appendChild(n), v.geoService_.setMapCanvasProjection(e, M.getProjection()), ae ? v.setState({overlay: n}) : pe(v, v._renderPortal(), n, function () {
                                            return v.setState({overlay: n})
                                        })
                                    }, onRemove: function () {
                                        var e = v.state.overlay;
                                        e && !ae && n.unmountComponentAtNode(e), v.setState({overlay: null})
                                    }, draw: function () {
                                        if (v.updateCounter_++, v._onBoundsChanged(g, e, !v.props.debounced), v.googleApiLoadedCalled_ || (v._onGoogleApiLoaded({
                                            map: g,
                                            maps: e,
                                            ref: v.googleMapDom_
                                        }), v.googleApiLoadedCalled_ = !0), v.mouse_) {
                                            var t = v.geoService_.fromContainerPixelToLatLng(v.mouse_);
                                            v.mouse_.lat = t.lat, v.mouse_.lng = t.lng
                                        }
                                        v._onChildMouseMove(), v.markersDispatcher_ && (v.markersDispatcher_.emit("kON_CHANGE"), v.fireMouseEventOnIdle_ && v.markersDispatcher_.emit("kON_MOUSE_POSITION_CHANGE"))
                                    }
                                });
                            r.overlay_ = M, M.setMap(g), r.props.heatmap.positions && r.heatmap.setMap(g), r.props.onTilesLoaded && e.event.addListener(g, "tilesloaded", function () {
                                v._onTilesLoaded()
                            }), e.event.addListener(g, "zoom_changed", function () {
                                v.geoService_.getZoom() !== g.getZoom() && (v.zoomAnimationInProgress_ || (v.zoomAnimationInProgress_ = !0, v._onZoomAnimationStart(g.zoom)), f < 32) && ((new Date).getTime() - r.zoomControlClickTime_ < 300 ? S(function () {
                                    return S(function () {
                                        v.updateCounter_++, v._onBoundsChanged(g, e)
                                    })
                                }) : (v.updateCounter_++, v._onBoundsChanged(g, e)))
                            }), e.event.addListener(g, "idle", function () {
                                if (r.resetSizeOnIdle_) {
                                    r._setViewSize();
                                    var t = r._computeMinZoom(u.minZoom);
                                    t !== r.minZoom_ && (r.minZoom_ = t, g.setOptions({minZoom: t})), r.resetSizeOnIdle_ = !1
                                }
                                v.zoomAnimationInProgress_ && (v.zoomAnimationInProgress_ = !1, v._onZoomAnimationEnd(g.zoom)), v.updateCounter_++, v._onBoundsChanged(g, e), v.dragTime_ = 0, v.markersDispatcher_ && v.markersDispatcher_.emit("kON_CHANGE")
                            }), e.event.addListener(g, "mouseover", function () {
                                v.mouseInMap_ = !0
                            }), e.event.addListener(g, "click", function () {
                                v.mouseInMap_ = !0
                            }), e.event.addListener(g, "mouseout", function () {
                                v.mouseInMap_ = !1, v.mouse_ = null, v.markersDispatcher_.emit("kON_MOUSE_POSITION_CHANGE")
                            }), e.event.addListener(g, "drag", function () {
                                v.dragTime_ = (new Date).getTime(), v._onDrag(g)
                            }), e.event.addListener(g, "dragend", function () {
                                var t = e.event.addListener(g, "idle", function () {
                                    e.event.removeListener(t), v._onDragEnd(g)
                                })
                            }), e.event.addListener(g, "maptypeid_changed", function () {
                                v._onMapTypeIdChange(g.getMapTypeId())
                            })
                        }
                    }).catch(function (e) {
                        throw r._onGoogleApiLoaded({map: null, maps: null, ref: r.googleMapDom_}), console.error(e), e
                    })
                }
            }, r._onGoogleApiLoaded = function () {
                var e;
                r.props.onGoogleApiLoaded && ("production" !== process.env.NODE_ENV && !0 !== r.props.yesIWantToUseGoogleMapApiInternals && console.warn("GoogleMap: Usage of internal api objects is dangerous and can cause a lot of issues.\nTo hide this warning add yesIWantToUseGoogleMapApiInternals={true} to <GoogleMap instance"), (e = r.props).onGoogleApiLoaded.apply(e, arguments))
            }, r._getHoverDistance = function () {
                return r.props.hoverDistance
            }, r._onDrag = function () {
                var e;
                return r.props.onDrag && (e = r.props).onDrag.apply(e, arguments)
            }, r._onDragEnd = function () {
                var e;
                return r.props.onDragEnd && (e = r.props).onDragEnd.apply(e, arguments)
            }, r._onMapTypeIdChange = function () {
                var e;
                return r.props.onMapTypeIdChange && (e = r.props).onMapTypeIdChange.apply(e, arguments)
            }, r._onZoomAnimationStart = function () {
                var e;
                return r.props.onZoomAnimationStart && (e = r.props).onZoomAnimationStart.apply(e, arguments)
            }, r._onZoomAnimationEnd = function () {
                var e;
                return r.props.onZoomAnimationEnd && (e = r.props).onZoomAnimationEnd.apply(e, arguments)
            }, r._onTilesLoaded = function () {
                return r.props.onTilesLoaded && r.props.onTilesLoaded()
            }, r._onChildClick = function () {
                var e;
                if (r.props.onChildClick) return (e = r.props).onChildClick.apply(e, arguments)
            }, r._onChildMouseDown = function (e, t) {
                r.childMouseDownArgs_ = [e, t], r.props.onChildMouseDown && r.props.onChildMouseDown(e, t, a({}, r.mouse_))
            }, r._onChildMouseUp = function () {
                var e;
                r.childMouseDownArgs_ && (r.props.onChildMouseUp && (e = r.props).onChildMouseUp.apply(e, r.childMouseDownArgs_.concat([a({}, r.mouse_)])), r.childMouseDownArgs_ = null, r.childMouseUpTime_ = (new Date).getTime())
            }, r._onChildMouseMove = function () {
                var e;
                r.childMouseDownArgs_ && r.props.onChildMouseMove && (e = r.props).onChildMouseMove.apply(e, r.childMouseDownArgs_.concat([a({}, r.mouse_)]))
            }, r._onChildMouseEnter = function () {
                var e;
                if (r.props.onChildMouseEnter) return (e = r.props).onChildMouseEnter.apply(e, arguments)
            }, r._onChildMouseLeave = function () {
                var e;
                if (r.props.onChildMouseLeave) return (e = r.props).onChildMouseLeave.apply(e, arguments)
            }, r._setViewSize = function () {
                if (r.mounted_) {
                    if (document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) r.geoService_.setViewSize(window.innerWidth, window.innerHeight); else {
                        var e = n.findDOMNode(r.googleMapDom_);
                        r.geoService_.setViewSize(e.clientWidth, e.clientHeight)
                    }
                    r._onBoundsChanged()
                }
            }, r._onWindowResize = function () {
                r.resetSizeOnIdle_ = !0
            }, r._onMapMouseMove = function (e) {
                if (r.mouseInMap_) {
                    var t = (new Date).getTime();
                    t - r.mouseMoveTime_ > 50 && (r.boundingRect_ = e.currentTarget.getBoundingClientRect()), r.mouseMoveTime_ = t;
                    var o = e.clientX - r.boundingRect_.left, n = e.clientY - r.boundingRect_.top;
                    r.mouse_ || (r.mouse_ = {x: 0, y: 0, lat: 0, lng: 0}), r.mouse_.x = o, r.mouse_.y = n;
                    var i = r.geoService_.fromContainerPixelToLatLng(r.mouse_);
                    r.mouse_.lat = i.lat, r.mouse_.lng = i.lng, r._onChildMouseMove(), t - r.dragTime_ < 100 ? r.fireMouseEventOnIdle_ = !0 : (r.markersDispatcher_.emit("kON_MOUSE_POSITION_CHANGE"), r.fireMouseEventOnIdle_ = !1)
                }
            }, r._onClick = function () {
                var e;
                return r.props.onClick && !r.childMouseDownArgs_ && (new Date).getTime() - r.childMouseUpTime_ > 300 && 0 === r.dragTime_ && (e = r.props).onClick.apply(e, arguments)
            }, r._onMapClick = function (e) {
                r.markersDispatcher_ && (r._onMapMouseMove(e), (new Date).getTime() - r.dragTime_ > 100 && (r.mouse_ && r._onClick(a({}, r.mouse_, {event: e})), r.markersDispatcher_.emit("kON_CLICK", e)))
            }, r._onMapMouseDownNative = function (e) {
                r.mouseInMap_ && r._onMapMouseDown(e)
            }, r._onMapMouseDown = function (e) {
                r.markersDispatcher_ && (new Date).getTime() - r.dragTime_ > 100 && (r._onMapMouseMove(e), r.markersDispatcher_.emit("kON_MDOWN", e))
            }, r._onMapMouseDownCapture = function () {
                j().isChrome && (r.zoomControlClickTime_ = (new Date).getTime())
            }, r._onKeyDownCapture = function () {
                j().isChrome && (r.zoomControlClickTime_ = (new Date).getTime())
            }, r._isCenterDefined = function (e) {
                return e && (H(e) && N(e.lat) && N(e.lng) || 2 === e.length && N(e[0]) && N(e[1]))
            }, r._onBoundsChanged = function (e, t, o) {
                if (e) {
                    var n = e.getCenter();
                    r.geoService_.setView([n.lat(), n.lng()], e.getZoom(), 0)
                }
                if ((r.props.onChange || r.props.onBoundsChange) && r.geoService_.canProject()) {
                    var i = r.geoService_.getZoom(), s = r.geoService_.getBounds(), p = r.geoService_.getCenter();
                    if (!function (e, t, o) {
                        if (e && t) {
                            for (var n = 0; n !== e.length; ++n) if (Math.abs(e[n] - t[n]) > 1e-5) return !1;
                            return !0
                        }
                        return !1
                    }(s, r.prevBounds_) && !1 !== o) {
                        var l = r.geoService_.getBounds(r.props.margin);
                        r.props.onBoundsChange && r.props.onBoundsChange(r.centerIsObject_ ? a({}, p) : [p.lat, p.lng], i, s, l), r.props.onChange && r.props.onChange({
                            center: a({}, p),
                            zoom: i,
                            bounds: {
                                nw: {lat: s[0], lng: s[1]},
                                se: {lat: s[2], lng: s[3]},
                                sw: {lat: s[4], lng: s[5]},
                                ne: {lat: s[6], lng: s[7]}
                            },
                            marginBounds: {
                                nw: {lat: l[0], lng: l[1]},
                                se: {lat: l[2], lng: l[3]},
                                sw: {lat: l[4], lng: l[5]},
                                ne: {lat: l[6], lng: l[7]}
                            },
                            size: r.geoService_.hasSize() ? {
                                width: r.geoService_.getWidth(),
                                height: r.geoService_.getHeight()
                            } : {width: 0, height: 0}
                        }), r.prevBounds_ = s
                    }
                }
            }, r._registerChild = function (e) {
                r.googleMapDom_ = e
            }, r.mounted_ = !1, r.initialized_ = !1, r.googleApiLoadedCalled_ = !1, r.map_ = null, r.maps_ = null, r.prevBounds_ = null, r.heatmap = null, r.layers_ = {}, r.mouse_ = null, r.mouseMoveTime_ = 0, r.boundingRect_ = null, r.mouseInMap_ = !0, r.dragTime_ = 0, r.fireMouseEventOnIdle_ = !1, r.updateCounter_ = 0, r.markersDispatcher_ = new c(l(r)), r.geoService_ = new T(256), r.centerIsObject_ = H(r.props.center), r.minZoom_ = 3, r.defaultDraggableOption_ = !0, r.zoomControlClickTime_ = 0, r.childMouseDownArgs_ = null, r.childMouseUpTime_ = 0, r.googleMapDom_ = null, "production" !== process.env.NODE_ENV && (r.props.apiKey && console.warn("GoogleMap: apiKey is deprecated, use bootstrapURLKeys={{key: YOUR_API_KEY}} instead."), r.props.onBoundsChange && console.warn("GoogleMap: onBoundsChange is deprecated, use onChange({center, zoom, bounds, ...other}) instead."), A(r.props.center) && A(r.props.defaultCenter) && console.warn("GoogleMap: center or defaultCenter property must be defined"), A(r.props.zoom) && A(r.props.defaultZoom) && console.warn("GoogleMap: zoom or defaultZoom property must be defined")), r._isCenterDefined(r.props.center || r.props.defaultCenter)) {
                var i = le(r.props.center || r.props.defaultCenter);
                r.geoService_.setView(i, r.props.zoom || r.props.defaultZoom, 0)
            }
            return r.zoomAnimationInProgress_ = !1, r.state = {overlay: null}, r
        }

        p(o, t);
        var r = o.prototype;
        return r.componentDidMount = function () {
            var e = this;
            this.mounted_ = !0, K(window, "resize", this._onWindowResize, !1), K(window, "keydown", this._onKeyDownCapture, !0);
            var t = n.findDOMNode(this.googleMapDom_);
            t && K(t, "mousedown", this._onMapMouseDownNative, !0), K(window, "mouseup", this._onChildMouseUp, !1);
            var o = a({}, this.props.apiKey && {key: this.props.apiKey}, this.props.bootstrapURLKeys);
            this.props.googleMapLoader(o, this.props.heatmapLibrary), setTimeout(function () {
                e._setViewSize(), e._isCenterDefined(e.props.center || e.props.defaultCenter) && e._initMap()
            }, 0, this), this.props.resetBoundsOnResize && function (e, t) {
                if (void 0 === e.parentNode) {
                    var o = document.createElement("div");
                    e.parentNode = o
                }
                e = e.parentNode, W ? e.attachEvent("onresize", t) : (e.__resizeTriggers__ || ("static" == getComputedStyle(e).position && (e.style.position = "relative"), function () {
                    if (!V) {
                        var e = (ie || "") + ".resize-triggers { " + (se || "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
                            t = document.head || document.getElementsByTagName("head")[0],
                            o = document.createElement("style");
                        o.type = "text/css", o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e)), t.appendChild(o), V = !0
                    }
                }(), e.__resizeLast__ = {}, e.__resizeListeners__ = [], (e.__resizeTriggers__ = document.createElement("div")).className = "resize-triggers", e.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>', e.appendChild(e.__resizeTriggers__), q(e), K(e, "scroll", Y, !0), Q && e.__resizeTriggers__.addEventListener(Q, function (t) {
                    t.animationName == re && q(e)
                })), e.__resizeListeners__.push(t))
            }(t, this._mapDomResizeCallback)
        }, r.shouldComponentUpdate = function (e, t) {
            return !_(d(this.props, ["draggable"]), d(e, ["draggable"])) || !_(this.state, t)
        }, r.componentDidUpdate = function (e) {
            var t = this;
            if ("production" !== process.env.NODE_ENV && (_(e.defaultCenter, this.props.defaultCenter) || console.warn("GoogleMap: defaultCenter prop changed. You can't change default props."), _(e.defaultZoom, this.props.defaultZoom) || console.warn("GoogleMap: defaultZoom prop changed. You can't change default props.")), !this._isCenterDefined(e.center) && this._isCenterDefined(this.props.center) && setTimeout(function () {
                return t._initMap()
            }, 0), this.map_) {
                var o = this.geoService_.getCenter();
                if (this._isCenterDefined(this.props.center)) {
                    var n = le(this.props.center), r = this._isCenterDefined(e.center) ? le(e.center) : null;
                    (!r || Math.abs(n.lat - r.lat) + Math.abs(n.lng - r.lng) > 1e-5) && Math.abs(n.lat - o.lat) + Math.abs(n.lng - o.lng) > 1e-5 && this.map_.panTo({
                        lat: n.lat,
                        lng: n.lng
                    })
                }
                if (A(this.props.zoom) || Math.abs(this.props.zoom - e.zoom) > 0 && this.map_.setZoom(this.props.zoom), !A(e.draggable) && A(this.props.draggable) ? this.map_.setOptions({draggable: this.defaultDraggableOption_}) : _(e.draggable, this.props.draggable) || this.map_.setOptions({draggable: this.props.draggable}), !A(this.props.options) && !_(e.options, this.props.options)) {
                    var i = P(this.maps_, H),
                        s = "function" == typeof this.props.options ? this.props.options(i) : this.props.options;
                    if ("minZoom" in (s = d(s, ["zoom", "center", "draggable"]))) {
                        var a = this._computeMinZoom(s.minZoom);
                        s.minZoom = ue(s.minZoom, a)
                    }
                    this.map_.setOptions(s)
                }
                _(this.props.layerTypes, e.layerTypes) || (Object.keys(this.layers_).forEach(function (e) {
                    t.layers_[e].setMap(null), delete t.layers_[e]
                }), this._setLayers(this.props.layerTypes)), this.heatmap && !_(this.props.heatmap.positions, e.heatmap.positions) && this.heatmap.setData(this.props.heatmap.positions.map(function (e) {
                    return {location: new t.maps_.LatLng(e.lat, e.lng), weight: e.weight}
                })), this.heatmap && !_(this.props.heatmap.options, e.heatmap.options) && Object.keys(this.props.heatmap.options).forEach(function (e) {
                    t.heatmap.set(e, t.props.heatmap.options[e])
                })
            }
            this.markersDispatcher_.emit("kON_CHANGE"), _(this.props.hoverDistance, e.hoverDistance) || this.markersDispatcher_.emit("kON_MOUSE_POSITION_CHANGE")
        }, r.componentWillUnmount = function () {
            this.mounted_ = !1;
            var e, t, o = n.findDOMNode(this.googleMapDom_);
            o && o.removeEventListener("mousedown", this._onMapMouseDownNative, !0), window.removeEventListener("resize", this._onWindowResize), window.removeEventListener("keydown", this._onKeyDownCapture), window.removeEventListener("mouseup", this._onChildMouseUp, !1), this.props.resetBoundsOnResize && (t = this._mapDomResizeCallback, e = (e = o).parentNode, W ? e.detachEvent("onresize", t) : (e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t), 1), e.__resizeListeners__.length || (e.removeEventListener("scroll", Y), e.__resizeTriggers__ = !e.removeChild(e.__resizeTriggers__)))), this.overlay_ && this.overlay_.setMap(null), this.maps_ && this.map_ && this.props.shouldUnregisterMapOnUnmount && (this.map_.setOptions({scrollwheel: !1}), this.maps_.event.clearInstanceListeners(this.map_)), this.props.shouldUnregisterMapOnUnmount && (this.map_ = null, this.maps_ = null), this.markersDispatcher_.dispose(), this.resetSizeOnIdle_ = !1, this.props.shouldUnregisterMapOnUnmount && (delete this.map_, delete this.markersDispatcher_)
        }, r.render = function () {
            var t = this.state.overlay, o = t ? null : e.createElement(C, {
                experimental: this.props.experimental,
                onChildClick: this._onChildClick,
                onChildMouseDown: this._onChildMouseDown,
                onChildMouseEnter: this._onChildMouseEnter,
                onChildMouseLeave: this._onChildMouseLeave,
                geoService: this.geoService_,
                insideMapPanes: !1,
                distanceToMouse: this.props.distanceToMouse,
                getHoverDistance: this._getHoverDistance,
                dispatcher: this.markersDispatcher_
            });
            return e.createElement("div", {
                style: this.props.style,
                onMouseMove: this._onMapMouseMove,
                onMouseDownCapture: this._onMapMouseDownCapture,
                onClick: this._onMapClick
            }, e.createElement(h, {registerChild: this._registerChild}), ae && t && pe(this._renderPortal(), t), o)
        }, o
    }(t);

function ce(e) {
    var t = e.lng, o = Math.sin(e.lat * Math.PI / 180), n = t / 360 + .5,
        r = .5 - .25 * Math.log((1 + o) / (1 - o)) / Math.PI;
    return {x: n, y: r = r < 0 ? 0 : r > 1 ? 1 : r}
}

function de(e) {
    var t = e.x, o = Math.PI - 2 * Math.PI * e.y;
    return {lat: 180 / Math.PI * Math.atan(.5 * (Math.exp(o) - Math.exp(-o))), lng: 360 * t - 180}
}

function me(e, t, o, n) {
    var r = ce(e), i = ce(t), s = r.x < i.x ? i.x - r.x : 1 - r.x + i.x, a = i.y - r.y;
    if (s <= 0 && a <= 0) return null;
    var p = E(o / 256 / Math.abs(s)), l = E(n / 256 / Math.abs(a)), u = Math.floor(1e-9 + Math.min(p, l)), h = {
            x: r.x < i.x ? .5 * (r.x + i.x) : r.x + i.x - 1 > 0 ? .5 * (r.x + i.x - 1) : .5 * (1 + r.x + i.x),
            y: .5 * (r.y + i.y)
        }, c = Math.pow(2, u), d = o / c / 256 / 2, m = n / c / 256 / 2, g = de({x: h.x - d, y: h.y - m}),
        _ = de({x: h.x + d, y: h.y + m});
    return {center: de(h), zoom: u, newBounds: {nw: g, se: _}}
}

function ge(e) {
    var t = e.ne, o = e.sw;
    return {nw: {lat: t.lat, lng: o.lng}, se: {lat: o.lat, lng: t.lng}}
}

function _e(e) {
    var t = e.nw, o = e.se;
    return {ne: {lat: t.lat, lng: o.lng}, sw: {lat: o.lat, lng: t.lng}}
}

function fe(e, t) {
    var o, n = e.nw, r = e.se, i = e.ne, s = e.sw, p = t.width, l = t.height;
    if (n && r) o = me(n, r, p, l); else {
        var u = ge({ne: i, sw: s});
        o = me(u.nw, u.se, p, l)
    }
    return a({}, o, {newBounds: a({}, o.newBounds, _e(o.newBounds))})
}

function ve(e, t, o) {
    var n = function (e, t) {
        var o = function (e, t) {
            var o, n = t.lat, r = t.lng, i = (o = n * Math.PI / 180, {
                metersPerLatDegree: 111132.92 - 559.82 * Math.cos(2 * o) + 1.175 * Math.cos(4 * o) - .0023 * Math.cos(6 * o),
                metersPerLngDegree: 111412.84 * Math.cos(o) - 93.5 * Math.cos(3 * o) + .118 * Math.cos(5 * o)
            }), s = .5 * e / i.metersPerLatDegree, a = .5 * e / i.metersPerLngDegree;
            return {nw: {lat: n - s, lng: r - a}, se: {lat: n + s, lng: r + a}}
        }(e, {lat: t.lat, lng: t.lng}), n = o.se, r = ce(o.nw), i = ce(n);
        return {w: Math.abs(i.x - r.x), h: Math.abs(i.y - r.y)}
    }(e, {lat: t.lat, lng: t.lng}), r = n.w, i = n.h, s = Math.pow(2, o);
    return {w: r * s * 256, h: i * s * 256}
}

function Me(e, t) {
    var o = e.x, n = Math.PI - 2 * Math.PI * e.y / Math.pow(2, t);
    return {lat: 180 / Math.PI * Math.atan(.5 * (Math.exp(n) - Math.exp(-n))), lng: o / Math.pow(2, t) * 360 - 180}
}

function ye(e, t) {
    var o = ce({lat: e.lat, lng: e.lng}), n = Math.pow(2, t);
    return {x: Math.floor(o.x * n), y: Math.floor(o.y * n)}
}

function Ce(e, t) {
    for (var o = e.from, n = e.to, r = Math.pow(2, t), i = [], s = o.x; s !== (n.x + 1) % r; s = (s + 1) % r) for (var a = o.y; a !== (n.y + 1) % r; a = (a + 1) % r) i.push([t, s, a]);
    return i
}

he.propTypes = {
    apiKey: o.string,
    bootstrapURLKeys: o.any,
    defaultCenter: o.oneOfType([o.array, o.shape({lat: o.number, lng: o.number})]),
    center: o.oneOfType([o.array, o.shape({lat: o.number, lng: o.number})]),
    defaultZoom: o.number,
    zoom: o.number,
    onBoundsChange: o.func,
    onChange: o.func,
    onClick: o.func,
    onChildClick: o.func,
    onChildMouseDown: o.func,
    onChildMouseUp: o.func,
    onChildMouseMove: o.func,
    onChildMouseEnter: o.func,
    onChildMouseLeave: o.func,
    onZoomAnimationStart: o.func,
    onZoomAnimationEnd: o.func,
    onDrag: o.func,
    onDragEnd: o.func,
    onMapTypeIdChange: o.func,
    onTilesLoaded: o.func,
    options: o.any,
    distanceToMouse: o.func,
    hoverDistance: o.number,
    debounced: o.bool,
    margin: o.array,
    googleMapLoader: o.any,
    onGoogleApiLoaded: o.func,
    yesIWantToUseGoogleMapApiInternals: o.bool,
    draggable: o.bool,
    style: o.any,
    resetBoundsOnResize: o.bool,
    layerTypes: o.arrayOf(o.string),
    shouldUnregisterMapOnUnmount: o.bool
}, he.defaultProps = {
    distanceToMouse: function (e, t) {
        return Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y))
    },
    hoverDistance: 30,
    debounced: !0,
    options: function () {
        return {
            overviewMapControl: !1,
            streetViewControl: !1,
            rotateControl: !0,
            mapTypeControl: !1,
            styles: [{featureType: "poi", elementType: "labels", stylers: [{visibility: "off"}]}],
            minZoom: 3
        }
    },
    googleMapLoader: z,
    yesIWantToUseGoogleMapApiInternals: !1,
    style: {width: "100%", height: "100%", margin: 0, padding: 0, position: "relative"},
    layerTypes: [],
    heatmap: {},
    heatmapLibrary: !1,
    shouldUnregisterMapOnUnmount: !0
}, he.googleMapLoader = z;
export default he;
export {
    ge as convertNeSwToNwSe,
    _e as convertNwSeToNeSw,
    fe as fitBounds,
    Ce as getTilesIds,
    ye as latLng2Tile,
    ve as meters2ScreenPixels,
    Me as tile2LatLng
};
//# sourceMappingURL=index.modern.js.map
