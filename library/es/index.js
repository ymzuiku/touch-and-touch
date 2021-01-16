import Pop from 'vanilla-pop';
import css from 'template-css';
import aoife$1 from 'aoife';
import Message from 'vanilla-message';
import micoDb, { createMicoDb } from 'mico-db';
import mockjs from 'mockjs';
import dayjs from 'dayjs';
import Svg from 'vanilla-svg';
import localfile from 'localfile';
import waitValue from 'wait-value';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

function fixPosition(out, state) {
    if (out === void 0) { out = 30; }
    if (state.x < 0) {
        state.x = 0;
    }
    else if (state.x > window.innerWidth - out) {
        state.x = window.innerWidth - out;
    }
    if (state.y < 0) {
        state.y = 0;
    }
    else if (state.y > window.innerHeight - out) {
        state.y = window.innerHeight - out;
    }
}
var Drag = function (_a) {
    var children = _a.children, clientX = _a.clientX, clientY = _a.clientY, _b = _a.query, query = _b === void 0 ? "[tat-base-drag]" : _b, localStorageKey = _a.localStorageKey, dragPadding = _a.dragPadding, style = _a.style, rest = __rest(_a, ["children", "clientX", "clientY", "query", "localStorageKey", "dragPadding", "style"]);
    var saveTime;
    var update = function () {
        var Ele = document.querySelector(query);
        if (Ele) {
            Ele.style.left = state.x - 4 + "px";
            Ele.style.top = state.y - 20 + "px";
        }
    };
    var onMove = function (e) {
        if (state.onDrag) {
            if (e.clientX - state.startX < 20 && e.clientY - state.startY < 20) {
                return;
            }
            state.x = e.clientX - state.startX;
            state.y = e.clientY - state.startY;
            fixPosition(dragPadding, state);
            // next("[tat-drag]");
            update();
            if (localStorageKey) {
                if (saveTime) {
                    clearTimeout(saveTime);
                    saveTime = null;
                }
                saveTime = setTimeout(function () {
                    localStorage.setItem(localStorageKey, JSON.stringify(state));
                }, 500);
            }
        }
    };
    var onMoveEnd = function () {
        state.onDrag = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", function (e) {
        onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    });
    window.addEventListener("mouseup", onMoveEnd);
    window.addEventListener("touchend", onMoveEnd);
    var state = {
        onDrag: false,
        x: clientX || 0,
        y: clientY || 0,
        startX: 0,
        startY: 0,
    };
    if (localStorageKey) {
        var old = localStorage.getItem(localStorageKey);
        if (old) {
            try {
                var data = JSON.parse(old);
                state.x = data.x;
                state.y = data.y;
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    fixPosition(dragPadding, state);
    aoife.waitAppend(query).then(function (ele) {
        ele.style.position = "fixed";
        update();
    });
    return aoife("div", __assign({ "tat-base-dray": 1, style: __assign({ cursor: "move" }, style), onmousedown: function (e) {
            state.onDrag = true;
            state.startX = e.offsetX;
            state.startX = e.offsetX;
        }, ontouchstart: function (e) {
            state.onDrag = true;
            if (e.touches && e.touches[0] && e.touches[0].target) {
                state.startX = e.touches[0].target.offsetLeft;
                state.startY = e.touches[0].target.offsetHeight;
            }
        } }, rest), children);
};

var db = micoDb;
var initState = function (name) {
    db = createMicoDb(name);
    state.ui = db.sessionItem("ui", baseUI);
    state.nowCell = db.collection("nowCell");
    state.recordList = db.collection("record-list", {
        sort: { updateAt: -1 },
    });
    state.recordItems = db.collection("record-item");
    state.customEvent = db.collection("custom-event", {
        type: "sessionStorage",
    });
};
var baseUI = {
    speed: 1,
    showMouse: 0,
    lastFocus: null,
    showList: 1,
    showInputId: "",
    recording: 0,
    replaying: 0,
    replayingAll: 0,
    autoRecordId: false,
    step: 0,
    filter: [],
    waitTimeout: 5000,
};
var state = {
    onAlt: false,
    ui: db && db.sessionItem("ui", baseUI),
    nowCell: db.collection("nowCell"),
    recordList: db.collection("record-list", {
        sort: { updateAt: -1 },
    }),
    recordItems: db.collection("record-item"),
    customEvent: db.collection("custom-event", {
        type: "sessionStorage",
    }),
};

function customEvent(e) {
    if (e.detail) {
        Message.info("[TouchAndTouch] Listened: " + e.detail, {
            outTime: 1500,
            position: "bottom",
        });
        state.recordItems.insertOne({
            key: "",
            type: "customEvent",
            value: e.detail,
        });
    }
}
var recordListenCustemEvent = function () {
    window.addEventListener("tat", customEvent);
};
var recordRemoveCustemEvent = function () {
    window.removeEventListener("tat", customEvent);
};

function getHref(href) {
    var list = href.split(window.location.host);
    return list[1] || "/";
}

var recordContinue = function () { return __awaiter(void 0, void 0, void 0, function () {
    var items, isHaveHref, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                state.ui.merge({
                    recording: 1,
                    replaying: 0,
                });
                aoife$1.next(".tat-update");
                return [4 /*yield*/, state.recordItems.find()];
            case 1:
                items = _a.sent();
                isHaveHref = false;
                for (i = 0; i < items.length; i++) {
                    if (items[i].type === "href") {
                        isHaveHref = true;
                        break;
                    }
                }
                recordListenCustemEvent();
                if (!isHaveHref) {
                    state.recordItems.insertOne({
                        key: "",
                        type: "href",
                        href: getHref(window.location.href),
                    });
                }
                return [2 /*return*/];
        }
    });
}); };

var recordStop = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cell, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                recordRemoveCustemEvent();
                state.ui.merge({
                    recording: 0,
                });
                return [4 /*yield*/, state.nowCell.findOne()];
            case 1:
                cell = _a.sent();
                return [4 /*yield*/, state.recordItems.find()];
            case 2:
                items = _a.sent();
                return [4 /*yield*/, state.recordList.updateOne({ _id: cell._id }, __assign(__assign({}, cell), { items: items }))];
            case 3:
                _a.sent();
                aoife.next(".tat-update");
                return [2 /*return*/];
        }
    });
}); };

var svg = "\n<svg class=\"icon\" style=\"width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3740\"><path d=\"M796.377747 658.252171H584.209846l111.661948 271.985873c7.777996 18.855991-1.109999 39.997981-18.887991 47.997977l-98.329954 42.85398c-18.329991 7.999996-38.885982-1.141999-46.663978-19.427991l-106.105951-258.271878-173.327918 178.275916C229.458012 945.420037 192.00003 927.108045 192.00003 895.95406V36.598463C192.00003 3.798478 231.842011-12.191514 252.554002 10.886475l568.823733 585.083726c22.943989 22.35799 6.013997 62.281971-24.999988 62.28197z\" fill=\"\" p-id=\"3741\"></path></svg>\n";
var baseRoundTransform = "translate(-10px, -28px) ";
var svgEle = aoife("div", {
    style: {
        transform: "translate(-3px, -3px)",
        filter: "drop-shadow(0px 6px 3px rgba(0,0,0,0.25))",
    },
    innerHTML: svg,
});
var round = aoife("div", {
    style: {
        display: "block",
        transition: "all 0.12s cubic-bezier(0.23, 1, 0.32, 1)",
        transform: baseRoundTransform,
        width: "20px",
        height: "20px",
        borderRadius: "10px",
        background: "rgba(0,100,255,0.35)",
    },
});
var mouse = aoife("div", {
    hidden: function () { return __awaiter(void 0, void 0, void 0, function () {
        var ui;
        return __generator(this, function (_a) {
            ui = state.ui.get();
            return [2 /*return*/, !ui.showMouse];
        });
    }); },
    class: "tat-mouse",
    style: {
        fontSize: "16px",
        transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        position: "fixed",
        pointerEvents: "none",
        left: "-50px",
        top: "-50px",
        zIndex: 9900,
    },
}, svgEle, round);
document.body.append(mouse);
function mouseMove(item) {
    mouse.style.left = item.clientX + "px";
    mouse.style.top = item.clientY + "px";
}
function mouseClick(item) {
    return __awaiter(this, void 0, void 0, function () {
        var ui;
        return __generator(this, function (_a) {
            ui = state.ui.get();
            if (ui.lastFocus &&
                ui.lastFocus.nodeName &&
                document.contains(ui.lastFocus) &&
                ui.lastFocus.focus) {
                ui.lastFocus.blur();
                state.ui.merge({ lastFocus: void 0 });
            }
            mouse.style.top = item.clientY + "px";
            mouse.style.left = item.clientX + "px";
            setTimeout(function () {
                round.style.transform = baseRoundTransform + "scale(0.5, 0.5)";
                setTimeout(function () {
                    round.style.transform = baseRoundTransform + "scale(1, 1)";
                }, 80);
            }, 80);
            return [2 /*return*/];
        });
    });
}

function getEventVal(event) {
    if (typeof event === "object" && event.target) {
        var target = event.target;
        var type = target.getAttribute("type");
        if (type === "checkbox" || type === "radio") {
            return target.checked;
        }
        return event.target.value;
    }
    return event || "";
}

var recordItemAdd = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var ui, step;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ui = state.ui.get();
                if (!(ui.recording && !ui.replaying)) return [3 /*break*/, 3];
                return [4 /*yield*/, state.recordItems.insertOne(event)];
            case 1:
                _a.sent();
                return [4 /*yield*/, state.recordItems.count()];
            case 2:
                step = _a.sent();
                state.nowCell.updateOne({}, { step: step });
                aoife.next(".tat-step, .tat-step");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };

var _cache = micoDb.collection("tat-cache", { init: {} });
var cache = {
    get: function (key) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _cache.findOne()];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data[key]];
            }
        });
    }); },
    set: function (key, value) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, _cache.updateOne({}, (_a = {}, _a[key] = value, _a))];
                case 1:
                    _b.sent();
                    return [2 /*return*/, value];
            }
        });
    }); },
};

var changeSelectItem = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var cell, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.recordList.findOne({ _id: id })];
            case 1:
                cell = _a.sent();
                if (!cell) {
                    return [2 /*return*/];
                }
                items = cell.items;
                return [4 /*yield*/, state.nowCell.updateOne({}, cell)];
            case 2:
                _a.sent();
                return [4 /*yield*/, state.recordItems.set(items)];
            case 3:
                _a.sent();
                if (initOpt.onChangeSelected) {
                    initOpt.onChangeSelected(cell);
                }
                aoife.next(".tat-update");
                return [2 /*return*/];
        }
    });
}); };

function getTitle(item) {
    return item.title || dayjs(item.updateAt).format("MM/DD HH:mm");
}

var recordCellAdd = function () { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = "id" + Date.now();
                return [4 /*yield*/, state.recordList.insertOne({
                        title: dayjs(Date.now()).format("MM/DD HH:mm"),
                        _id: id,
                        updateAt: Date.now(),
                        step: 0,
                        items: [],
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, changeSelectItem(id)];
            case 2:
                _a.sent();
                aoife.next(".tat-plan");
                return [2 /*return*/];
        }
    });
}); };

var listenTags = [
    "input",
    "a",
    "button",
    "textarea",
    "select",
    "li",
    "span",
    "div",
];
var num = 0;
function getAttrAndCloseAttr(item, key) {
    var attr = item.getAttribute(key);
    if (!attr) {
        var ele = item.closest("[" + key + "]");
        if (ele) {
            attr = ele.getAttribute(key);
        }
    }
    return attr || "";
}
var attrKeys = {};
function setAttrId(ele) {
    if (initOpt.ignoreQuery && ele.closest(initOpt.ignoreQuery)) {
        return;
    }
    if (ele.closest("[tat-ignore]")) {
        return;
    }
    if (ele.getAttribute("tat-key")) {
        return;
    }
    var tag = ele.nodeName.toLocaleLowerCase();
    if (tag === "div" &&
        !ele.getAttribute("tat-btn") &&
        ele.getAttribute("role") !== "tab" &&
        ele.getAttribute("role") !== "menuitem" &&
        ele.getAttribute("role") !== "switch" &&
        ele.getAttribute("role") !== "button" &&
        ele.getAttribute("type") !== "submit" &&
        ele.getAttribute("type") !== "button" &&
        ele.getAttribute("type") !== "combobox" &&
        !ele.getAttribute("tabindex")) {
        return;
    }
    var selfId = ele.getAttribute("id");
    if (selfId) {
        ele.setAttribute("tat-key", selfId);
        return eleSetListen(ele);
    }
    // const eid = ele.getAttribute("id");
    // const tatKey = [tag, eid && "id:" + eid].filter(Boolean).join(",");
    // ele.setAttribute("tat-key", tatKey);
    if (initOpt.useAutoId) {
        var id = getAttrAndCloseAttr(ele, "id");
        var tid = getAttrAndCloseAttr(ele, "tat-id");
        var name_1 = ele.getAttribute("name");
        var tatBtn = ele.getAttribute("tat-btn");
        var cn = ele.getAttribute("class");
        var role = ele.getAttribute("role");
        var type = ele.getAttribute("type");
        var key = ele.getAttribute("key");
        var alt = ele.getAttribute("alt");
        var src = ele.getAttribute("src");
        var placeholder = ele.getAttribute("placeholder");
        var tatKey = [
            tag,
            id && "id:" + id,
            tid && "tat-id:" + tid,
            tatBtn && "tat-btn:" + tatBtn,
            name_1 && "name:" + name_1,
            cn && "class:" + cn,
            role && "role:" + role,
            type && "type:" + type,
            key && "key:" + key,
            alt && "alt:" + alt,
            src && "src:" + src,
            placeholder && "placeholder:" + placeholder,
        ]
            .filter(Boolean)
            .join(",");
        if (attrKeys[tatKey]) {
            tatKey += "_" + ele.textContent;
        }
        if (attrKeys[tatKey]) {
            num += 1;
            tatKey += "_" + num;
        }
        attrKeys[tatKey] = 1;
        ele.setAttribute("tat-key", tatKey);
    }
    eleSetListen(ele);
}
function eleSetAttr(parent) {
    parent.querySelectorAll(listenTags.join(",")).forEach(setAttrId);
}

var matchPlanMClick = {
    FORM: 1,
    HTML: 1,
    DIV: 1,
};
// 记录页面点击位置
function recordMouse(event) {
    if (matchPlanMClick[event.target.nodeName]) {
        if (initOpt.useRecordMouse) {
            recordItemAdd({
                id: "",
                key: "",
                type: "mclick",
                clientX: event.clientX,
                clientY: event.clientY,
            });
        }
    }
}
function recordDom() {
    document.body.setAttribute("tat-id", "body");
    // 初开化页面内容 recordSetAttr
    eleSetAttr(document.body);
    // 页面内容变更监听 recordSetAttr
    var onMutations = function (mutationsList) {
        for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
            var mutation = mutationsList_1[_i];
            if (mutation.type === "childList") {
                eleSetAttr(mutation.target);
            }
        }
    };
    var observer = new MutationObserver(onMutations);
    observer.observe(document.body, {
        attributes: false,
        childList: true,
        subtree: true,
    });
    // 记录鼠标点击的位置
    window.addEventListener("mousedown", recordMouse);
    window.addEventListener("touchend", recordMouse);
}

var fixFilterCell = function (cell) { return __awaiter(void 0, void 0, void 0, function () {
    var ui, filter, title, isShow;
    return __generator(this, function (_a) {
        ui = state.ui.get();
        filter = ui.filter;
        if (!filter || !filter.length) {
            return [2 /*return*/, true];
        }
        if (!cell) {
            return [2 /*return*/, false];
        }
        title = getTitle(cell);
        isShow = false;
        filter.forEach(function (f) {
            if (f && new RegExp(f).test(title)) {
                isShow = true;
            }
        });
        return [2 /*return*/, isShow];
    });
}); };

var replayAllFilter = function () { return __awaiter(void 0, void 0, void 0, function () {
    var list, items, _i, list_1, cell, isPlay;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.recordList.find()];
            case 1:
                list = _a.sent();
                items = [];
                _i = 0, list_1 = list;
                _a.label = 2;
            case 2:
                if (!(_i < list_1.length)) return [3 /*break*/, 5];
                cell = list_1[_i];
                return [4 /*yield*/, fixFilterCell(cell)];
            case 3:
                isPlay = _a.sent();
                if (isPlay) {
                    items = items.concat.apply(items, cell.items);
                }
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                state.ui.merge({ replayingAll: 1 });
                replayStart(items);
                return [2 /*return*/];
        }
    });
}); };

var initOpt = { name: "tatdb" };
window.addEventListener("keydown", function (e) {
    if (e.key === "Alt") {
        state.onAlt = true;
    }
});
window.addEventListener("keyup", function (e) {
    if (e.key === "Alt") {
        state.onAlt = false;
    }
});
var init = function (opt) { return __awaiter(void 0, void 0, void 0, function () {
    var ui, list_1, list, old, next;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Object.assign(initOpt, opt);
                initState(opt.name);
                ui = state.ui.get();
                if (!(initOpt.initData && !ui.replaying && !ui.recording)) return [3 /*break*/, 4];
                return [4 /*yield*/, initOpt.initData()];
            case 1:
                list_1 = _a.sent();
                return [4 /*yield*/, state.recordList.deleteMany()];
            case 2:
                _a.sent();
                return [4 /*yield*/, state.recordList.insertMany(list_1)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, state.recordList.find()];
            case 5:
                list = _a.sent();
                if (!(list.length === 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, recordCellAdd()];
            case 6:
                _a.sent();
                return [4 /*yield*/, state.recordList.find()];
            case 7:
                list = _a.sent();
                _a.label = 8;
            case 8: return [4 /*yield*/, state.nowCell.findOne()];
            case 9:
                old = _a.sent();
                if (!!old._id) return [3 /*break*/, 12];
                if (!(list && list[list.length - 1])) return [3 /*break*/, 11];
                return [4 /*yield*/, changeSelectItem(list[list.length - 1]._id)];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [3 /*break*/, 15];
            case 12: return [4 /*yield*/, state.nowCell.findOne()];
            case 13:
                next = _a.sent();
                return [4 /*yield*/, changeSelectItem(next._id)];
            case 14:
                _a.sent();
                _a.label = 15;
            case 15:
                aoife$1.next(".tat-update");
                state.ui.merge({
                    speed: opt.speed || 1,
                    waitTimeout: opt.waitTimeout || 5000,
                });
                recordDom();
                state.recordList.proxy.onChange = initOpt.onChangeData;
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var ui, list_2, cell;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                ui = state.ui.get();
                                if (!ui.replaying) return [3 /*break*/, 1];
                                if (ui.replayingAll) {
                                    replayAllFilter();
                                }
                                else {
                                    replayStart();
                                }
                                return [3 /*break*/, 4];
                            case 1:
                                if (!initOpt.autoPlayItem) return [3 /*break*/, 4];
                                return [4 /*yield*/, state.recordList.find()];
                            case 2:
                                list_2 = _a.sent();
                                cell = list_2.find(function (v) {
                                    var title = getTitle(v);
                                    if (title.indexOf(initOpt.autoPlayItem) > -1) {
                                        return true;
                                    }
                                });
                                if (!cell) return [3 /*break*/, 4];
                                return [4 /*yield*/, changeSelectItem(cell._id)];
                            case 3:
                                _a.sent();
                                state.ui.merge({ step: 0 });
                                replayStart();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };

var inputs = ["input"];
var submits = ["submit", "change"];
var clicks = ["mousedown", "touchend"];
var attrs = __spreadArrays(inputs, clicks, submits);
var eleSetListen = function (ele) {
    // const attrList = attrs;
    attrs.forEach(function (e) {
        if (ele["tat-" + e]) {
            return;
        }
        ele["tat-" + e] = 1;
        ele.addEventListener(e, function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var ui, value, mock, reg, baseValue, fn, key, inputEvent, err_1, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ui = state.ui.get();
                            if (ui.replaying) {
                                return [2 /*return*/];
                            }
                            // event.stopPropagation();
                            if (ele._tatIgnoreOnce &&
                                ele._tatIgnoreOnce === getEventVal(event)) {
                                return [2 /*return*/];
                            }
                            if (!(clicks.indexOf(e) > -1)) return [3 /*break*/, 1];
                            setTimeout(function () {
                                recordItemAdd({
                                    id: ele.id || "",
                                    key: ele.getAttribute("tat-key"),
                                    type: e,
                                    value: getEventVal(event),
                                });
                            }, 20);
                            return [3 /*break*/, 6];
                        case 1:
                            value = getEventVal(event);
                            mock = "";
                            reg = /!!$/;
                            if (!reg.test(value)) return [3 /*break*/, 5];
                            baseValue = value;
                            mock = value.replace(reg, "");
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            fn = new Function("mock", "set", "get", "return " + mock);
                            return [4 /*yield*/, Promise.resolve(fn(mockjs.Random, cache.set, cache.get))];
                        case 3:
                            value = _a.sent();
                            key = ele.getAttribute("tat-key");
                            recordItemAdd(__assign(__assign(__assign({}, (ele.id && { id: ele.id })), (key && { key: key })), { type: "change", value: baseValue }));
                            inputEvent = new InputEvent("change", {
                                data: value,
                                view: window,
                                bubbles: true,
                                cancelable: true,
                            });
                            ele._tatIgnoreOnce = value;
                            ele.value = value;
                            return [2 /*return*/, ele.dispatchEvent(inputEvent)];
                        case 4:
                            err_1 = _a.sent();
                            console.error(err_1);
                            return [3 /*break*/, 5];
                        case 5:
                            // 若 无useRecordInput，忽略 input 事件
                            if (initOpt.useRecordInput || e !== "input") {
                                key = ele.getAttribute("tat-key");
                                recordItemAdd(__assign(__assign(__assign({}, (ele.id && { id: ele.id })), (key && { key: key })), { type: e, value: value }));
                            }
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        });
    });
};

var replayStop = function (success) { return __awaiter(void 0, void 0, void 0, function () {
    var cell;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.customEvent.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, state.customEvent.insertOne({})];
            case 2:
                _a.sent();
                state.ui.merge({
                    recording: 0,
                    replaying: 0,
                    replayingAll: 0,
                    showMouse: 0,
                    step: 0,
                });
                aoife.next(".tat-update, .tat-mouse");
                if (!(success && initOpt.onSuccess)) return [3 /*break*/, 4];
                return [4 /*yield*/, state.nowCell.findOne()];
            case 3:
                cell = _a.sent();
                initOpt.onSuccess(cell);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };

var replayFail = function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var cell;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!initOpt.onFail) return [3 /*break*/, 2];
                return [4 /*yield*/, state.nowCell.findOne()];
            case 1:
                cell = _a.sent();
                initOpt.onFail(cell, msg);
                return [3 /*break*/, 3];
            case 2:
                Message.error(msg, { ok: "Ok", outTime: 999999 });
                _a.label = 3;
            case 3: return [4 /*yield*/, replayStop()];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var replayStart = function (items) { return __awaiter(void 0, void 0, void 0, function () {
    var cell, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!items) return [3 /*break*/, 2];
                return [4 /*yield*/, state.recordItems.find()];
            case 1:
                items = _a.sent();
                _a.label = 2;
            case 2:
                if (items.length < 2) {
                    return [2 /*return*/];
                }
                // 开始设置播放的样式
                state.ui.merge({
                    recording: 0,
                    replaying: 1,
                });
                return [4 /*yield*/, state.customEvent.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, state.customEvent.insertOne({})];
            case 4:
                _a.sent();
                aoife.next(".tat-update, .tat-mouse");
                if (!initOpt.onReplay) return [3 /*break*/, 6];
                return [4 /*yield*/, state.nowCell.findOne()];
            case 5:
                cell = _a.sent();
                initOpt.onReplay(cell);
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 10]);
                return [4 /*yield*/, startReplay(items)];
            case 7:
                _a.sent();
                return [3 /*break*/, 10];
            case 8:
                err_1 = _a.sent();
                return [4 /*yield*/, replayFail(err_1)];
            case 9:
                _a.sent();
                return [3 /*break*/, 10];
            case 10: 
            // 还原播放的样式
            return [4 /*yield*/, replayStop(true)];
            case 11:
                // 还原播放的样式
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
function scrollIntoView(el) {
    el.scrollIntoView({ block: "center", inline: "center" });
}
function emitClick(el) {
    if (initOpt.ignoreQuery && el.closest(initOpt.ignoreQuery)) {
        return;
    }
    if (el.closest("[tat-ignore]")) {
        return;
    }
    var event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    el.dispatchEvent(event);
}
function emitInput(el, item) {
    return __awaiter(this, void 0, void 0, function () {
        var nodeName, value, fn, _a, inputEvent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    item = __assign({}, item);
                    if (initOpt.ignoreQuery && el.closest(initOpt.ignoreQuery)) {
                        return [2 /*return*/];
                    }
                    if (el.closest("[tat-ignore]")) {
                        return [2 /*return*/];
                    }
                    nodeName = el.nodeName.toLocaleLowerCase();
                    if (nodeName === "input" ||
                        nodeName === "textarea" ||
                        nodeName === "button") {
                        state.ui.merge({ lastFocus: el });
                        el.focus();
                    }
                    if (!(item.value && /!!$/.test(item.value))) return [3 /*break*/, 2];
                    value = item.value.replace(/!!$/, "");
                    fn = new Function("mock", "set", "get", "return " + value);
                    _a = item;
                    return [4 /*yield*/, Promise.resolve(fn(mockjs.Random, cache.set, cache.get))];
                case 1:
                    _a.value = _b.sent();
                    _b.label = 2;
                case 2:
                    inputEvent = new InputEvent(item.type, {
                        // inputType: "insertText",
                        data: item.value,
                        view: window,
                        bubbles: true,
                        cancelable: true,
                    });
                    el.value = (item && item.value) || "";
                    el.dispatchEvent(inputEvent);
                    return [2 /*return*/];
            }
        });
    });
}
function done(e) {
    var _a;
    Message.error("[TouchAndTouch] Listened: " + e.detail, {
        outTime: 1500,
        position: "bottom",
    });
    state.customEvent.updateOne({}, (_a = {}, _a[e.detail] = 1, _a));
}
window.addEventListener("tat", done);
function waitGetCustomEvent(detail) {
    var _this = this;
    var t = Date.now();
    return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
        var custom, ui, getEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, state.customEvent.findOne()];
                case 1:
                    custom = _a.sent();
                    ui = state.ui.get();
                    getEvent = function () {
                        if (!custom[detail]) {
                            if (Date.now() - t < ui.waitTimeout) {
                                requestAnimationFrame(getEvent);
                            }
                            else {
                                rej("[TouchAndTouch] Unlistened: " + detail);
                            }
                        }
                        else {
                            res(true);
                        }
                    };
                    getEvent();
                    return [2 /*return*/];
            }
        });
    }); });
}
function waitGetElement(id, key) {
    var _this = this;
    var t = Date.now();
    return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
        var getEl;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getEl = function () { return __awaiter(_this, void 0, void 0, function () {
                        var ui, e;
                        return __generator(this, function (_a) {
                            ui = state.ui.get();
                            if (!ui.replaying) {
                                return [2 /*return*/, res(document.createElement("span"))];
                            }
                            if (ui.autoRecordId) {
                                e = document.querySelector("[tat-key=\"" + key + "\"]");
                            }
                            else {
                                e = document.getElementById(id);
                            }
                            if (!e ||
                                e.hidden ||
                                e.style.display === "none" ||
                                e.style.visibility === "hidden") {
                                if (Date.now() - t < ui.waitTimeout) {
                                    requestAnimationFrame(getEl);
                                }
                                else {
                                    rej("[TouchAndTouch Error] Find next element timeout");
                                }
                            }
                            else {
                                res(e);
                            }
                            return [2 /*return*/];
                        });
                    }); };
                    return [4 /*yield*/, getEl()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
var getEleCenter = function (el, item) {
    if (!el || !el.getBoundingClientRect) {
        return;
    }
    var rect = el.getBoundingClientRect();
    item.clientX = rect.left + rect.width / 2;
    item.clientY = rect.top + rect.height / 2;
};
function sleep(t) {
    var _this = this;
    return new Promise(function (res) { return __awaiter(_this, void 0, void 0, function () {
        var ui;
        return __generator(this, function (_a) {
            ui = state.ui.get();
            setTimeout(res, t * ui.speed);
            return [2 /*return*/];
        });
    }); });
}
var lastReloadTime = 0;
var reloadNum = 0;
var startReplay = function (items) { return __awaiter(void 0, void 0, void 0, function () {
    var i, _i, items_1, item, ui, el;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                state.ui.merge({
                    showMouse: 1,
                });
                _i = 0, items_1 = items;
                _a.label = 1;
            case 1:
                if (!(_i < items_1.length)) return [3 /*break*/, 16];
                item = items_1[_i];
                ui = state.ui.get();
                i++;
                if (!ui.replaying) {
                    return [3 /*break*/, 16];
                }
                if (i < ui.step) {
                    return [3 /*break*/, 15];
                }
                state.ui.merge({ step: i });
                aoife.next(".tat-step");
                if (item.href) {
                    if (item.href.indexOf("#/") > -1 &&
                        getHref(window.location.href) === item.href) {
                        window.location.href = item.href;
                        if (Date.now() - lastReloadTime < 100) {
                            reloadNum += 1;
                        }
                        else {
                            reloadNum = 0;
                        }
                        if (reloadNum < 3) {
                            lastReloadTime = Date.now();
                            window.location.reload();
                        }
                    }
                    else {
                        window.location.href = item.href;
                    }
                }
                if (!(item.type === "mclick")) return [3 /*break*/, 3];
                return [4 /*yield*/, sleep(120)];
            case 2:
                _a.sent();
                mouseClick(item);
                return [3 /*break*/, 15];
            case 3:
                if (!(item.type === "customEvent" && item.value)) return [3 /*break*/, 5];
                return [4 /*yield*/, waitGetCustomEvent(item.value)];
            case 4:
                _a.sent();
                return [3 /*break*/, 15];
            case 5:
                if (!item.key) return [3 /*break*/, 15];
                return [4 /*yield*/, waitGetElement(item.id, item.key)];
            case 6:
                el = _a.sent();
                if (!(el.nodeName !== "FORM" && el.nodeName !== "DIV")) return [3 /*break*/, 8];
                scrollIntoView(el);
                return [4 /*yield*/, sleep(16)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                if (!(clicks.indexOf(item.type) > -1)) return [3 /*break*/, 11];
                if (!(el.nodeName !== "DIV")) return [3 /*break*/, 10];
                getEleCenter(el, item);
                mouseClick(item);
                return [4 /*yield*/, sleep(80)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                emitClick(el);
                return [3 /*break*/, 15];
            case 11:
                if (!(state.ui.get().lastFocus !== el)) return [3 /*break*/, 13];
                if (!(el.nodeName !== "FORM")) return [3 /*break*/, 13];
                getEleCenter(el, item);
                mouseMove(item);
                return [4 /*yield*/, sleep(16)];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13:
                emitInput(el, item);
                return [4 /*yield*/, sleep(16)];
            case 14:
                _a.sent();
                _a.label = 15;
            case 15:
                _i++;
                return [3 /*break*/, 1];
            case 16: return [2 /*return*/];
        }
    });
}); };

var Step = function () {
    return aoife("div", {
        class: "tat-step",
    }, function () { return __awaiter(void 0, void 0, void 0, function () {
        var ui, cell, label;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ui = state.ui.get();
                    return [4 /*yield*/, state.nowCell.findOne()];
                case 1:
                    cell = _a.sent();
                    label = "";
                    if (ui.step) {
                        label = "Replaying: " + ui.step + "/" + cell.step;
                    }
                    else if (ui.recording) {
                        label = "Recording: " + cell.step;
                    }
                    else {
                        label = "Step: " + cell.step;
                    }
                    return [2 /*return*/, label];
            }
        });
    }); });
};
css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .tat-step {\n    // color: #fff;\n    // background: rgb(188 172 202);\n    // border-radius: 40px;\n    padding: 4px;\n    font-size: 12px !important;\n    cursor: pointer;\n    width: calc(100% - 8px);\n    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n    // margin-bottom: 2px;\n  }\n"], ["\n  .tat-step {\n    // color: #fff;\n    // background: rgb(188 172 202);\n    // border-radius: 40px;\n    padding: 4px;\n    font-size: 12px !important;\n    cursor: pointer;\n    width: calc(100% - 8px);\n    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n    // margin-bottom: 2px;\n  }\n"])));
var templateObject_1;

var CodeSvg = Svg("\n<svg t=\"1609439023623\" class=\"icon\" viewBox=\"0 0 1097 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3732\" width=\"200\" height=\"200\"><path d=\"M352.585143 799.414857l-28.562286 28.562286a18.285714 18.285714 0 0 1-26.294857 0L31.451429 561.700571a18.285714 18.285714 0 0 1 0-26.294857l266.276571-266.276571a18.285714 18.285714 0 0 1 26.294857 0l28.562286 28.562286a18.285714 18.285714 0 0 1 0 26.294857L128 548.571429l224.585143 224.585142a18.285714 18.285714 0 0 1 0 26.294858z m337.700571-609.718857l-213.138285 737.718857a18.139429 18.139429 0 0 1-22.272 12.580572l-35.437715-9.728a18.505143 18.505143 0 0 1-12.580571-22.857143L619.995429 169.691429a18.139429 18.139429 0 0 1 22.272-12.580572l35.437714 9.728a18.505143 18.505143 0 0 1 12.580571 22.857143z m375.442286 372.004571L799.451429 827.977143a18.285714 18.285714 0 0 1-26.294858 0l-28.562285-28.562286a18.285714 18.285714 0 0 1 0-26.294857l224.585143-224.585143-224.585143-224.585143a18.285714 18.285714 0 0 1 0-26.294857l28.562285-28.562286a18.285714 18.285714 0 0 1 26.294858 0l266.276571 266.276572a18.285714 18.285714 0 0 1 0 26.294857z\" fill=\"\" p-id=\"3733\"></path></svg>\n");
var DragSvg = Svg("\n<svg t=\"1608724287002\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2814\" width=\"200\" height=\"200\"><path d=\"M362.666667 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2815\"></path><path d=\"M661.333333 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2816\"></path><path d=\"M362.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2817\"></path><path d=\"M661.333333 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2818\"></path><path d=\"M362.666667 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2819\"></path><path d=\"M661.333333 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2820\"></path></svg>\n");
var EditorSvg = Svg("\n<svg t=\"1608542607404\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1140\" width=\"1em\" height=\"1em\"><path d=\"M896 801.216V864H128v-62.784h768z m-204.288-678.4l155.36 155.36-463.136 463.136-156.864 1.504 1.504-156.864L691.712 122.816z m-0.864 89.632L291.712 611.584l-0.64 67.232 67.2-0.64L757.44 279.04l-66.56-66.56z\" fill=\"#f00\" p-id=\"1141\"></path></svg>\n");
var RecordAgainSvg = Svg("<svg t=\"1609231838403\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"12509\" width=\"200\" height=\"200\"><path d=\"M511.953038 76.651228C271.156005 76.651228 75.945597 271.860432 75.945597 512.658669c0 240.794625 195.209204 436.002625 436.007441 436.002625 240.794625 0 436.002625-195.208 436.002625-436.002625C948.00985 271.860432 752.801849 76.651228 511.953038 76.651228L511.953038 76.651228zM708.138806 649.912243c16.287302 16.286098 16.287302 42.649708 0 58.93099-16.281281 16.287302-42.644892 16.287302-58.93099 0L511.732679 571.423486 374.258746 708.843233c-16.28369 16.287302-42.644892 16.287302-58.932194 0-16.282486-16.281281-16.282486-42.644892 0-58.93099l137.52812-137.473933L315.380739 375.017359c-16.282486-16.28369-16.282486-42.646096 0-58.932194 16.286098-16.282486 42.648504-16.282486 58.932194 0l137.419747 137.473933 137.473933-137.473933c16.286098-16.282486 42.649708-16.282486 58.93099 0 16.287302 16.286098 16.287302 42.648504 0 58.932194L570.71906 512.43831 708.138806 649.912243 708.138806 649.912243zM708.138806 649.912243\" p-id=\"12510\"></path></svg>", "1.1em", "1.1em");
var RecordContinueSvg = Svg("<svg t=\"1608542641961\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1886\" width=\"200px\" height=\"200px\"><path d=\"M512 1024c282.833455 0 512-229.166545 512-512S794.833455 0 512 0 0 229.166545 0 512s229.166545 512 512 512z\" fill=\"#f00\"  p-id=\"1887\"></path></svg>", "1em", "1em");
var RecordStopSvg = Svg("<svg t=\"1608738155473\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1785\" width=\"200\" height=\"200\"><path d=\"M512 0c-282.784 0-512 229.216-512 512s229.216 512 512 512 512-229.216 512-512-229.216-512-512-512zM512 928c-229.76 0-416-186.24-416-416s186.24-416 416-416 416 186.24 416 416-186.24 416-416 416zM320 320l384 0 0 384-384 0z\" p-id=\"1786\"></path></svg>");
var ReplayStopSvg = Svg("<svg t=\"1608544642733\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1144\" width=\"200\" height=\"200\"><path d=\"M32 32m160 0l640 0q160 0 160 160l0 640q0 160-160 160l-640 0q-160 0-160-160l0-640q0-160 160-160Z\" fill=\"#364F6B\" p-id=\"1145\"></path></svg>");
var ReplayAllSvg = Svg("<svg t=\"1609043479737\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5003\" width=\"200\" height=\"200\"><path d=\"M465.5 844.3V581.5L113.6 844.3V179.7l351.9 262.8V179.7l445 332.3-445 332.3z\" fill=\"\" p-id=\"5004\"></path></svg>", "1.2em", "1.2em");
var MoreSvg = Svg("<svg t=\"1609043662724\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5747\" width=\"200\" height=\"200\"><path d=\"M128.141125 383.858875C57.578831 383.858875 0 441.437707 0 512c0 70.562293 57.578831 128.141125 128.141125 128.141125 70.562293 0 128.141125-57.578831 128.141125-128.141125C256.282249 441.437707 198.703418 383.858875 128.141125 383.858875zM512 383.858875C441.437707 383.858875 383.858875 441.437707 383.858875 512c0 70.562293 57.578831 128.141125 128.141125 128.141125 70.562293 0 128.141125-57.578831 128.141125-128.141125C640.141125 441.437707 582.562293 383.858875 512 383.858875zM895.858875 383.858875c-70.562293 0-128.141125 57.578831-128.141125 128.141125 0 70.562293 57.578831 128.141125 128.141125 128.141125 70.562293 0 128.141125-57.578831 128.141125-128.141125C1024 441.437707 966.985667 383.858875 895.858875 383.858875z\" p-id=\"5748\"></path></svg>");
var ThinMoreSvg = Svg("<svg t=\"1609231381688\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"10465\" width=\"200\" height=\"200\"><path d=\"M689.777778 512c0-66.673778 54.229333-120.888889 120.888889-120.888889s120.888889 54.229333 120.888889 120.888889c0 66.659556-54.229333 120.888889-120.888889 120.888889s-120.888889-54.229333-120.888889-120.888889z m184.888889 0c0-35.285333-28.714667-64-64-64s-64 28.714667-64 64 28.714667 64 64 64 64-28.714667 64-64zM391.111111 512c0-66.673778 54.229333-120.888889 120.888889-120.888889s120.888889 54.229333 120.888889 120.888889c0 66.659556-54.229333 120.888889-120.888889 120.888889s-120.888889-54.229333-120.888889-120.888889z m184.888889 0c0-35.285333-28.714667-64-64-64s-64 28.714667-64 64 28.714667 64 64 64 64-28.714667 64-64zM92.444444 512c0-66.673778 54.229333-120.888889 120.888889-120.888889s120.888889 54.229333 120.888889 120.888889c0 66.659556-54.229333 120.888889-120.888889 120.888889S92.444444 578.659556 92.444444 512z m184.888889 0c0-35.285333-28.714667-64-64-64s-64 28.714667-64 64 28.714667 64 64 64 64-28.714667 64-64z\" fill=\"\" p-id=\"10466\"></path></svg>");
var CancelSvg = Svg("<svg t=\"1608544898326\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1760\" width=\"200\" height=\"200\"><path d=\"M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z m0 85.333333c66.133333 0 128 23.466667 179.2 59.733334L273.066667 691.2C236.8 640 213.333333 578.133333 213.333333 512c0-164.266667 134.4-298.666667 298.666667-298.666667z m0 597.333334c-66.133333 0-128-23.466667-179.2-59.733334l418.133333-418.133333C787.2 384 810.666667 445.866667 810.666667 512c0 164.266667-134.4 298.666667-298.666667 298.666667z\" fill=\"#D50000\" p-id=\"1761\"></path></svg>", "1.2em", "1.2em");
var CtrlExpendSvg = Svg("<svg t=\"1608568357635\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1893\" width=\"200\" height=\"200\"><path d=\"M512 704.412l311.598-311.598-73.226-73.226L512 557.441 273.627 319.588l-73.226 73.226L512 704.412z\" p-id=\"1894\"></path></svg>");
var DeleteSvg = Svg("<svg t=\"1608624070479\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2977\" width=\"200\" height=\"200\"><path d=\"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z\" p-id=\"2978\"></path><path d=\"M864 256H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z\" p-id=\"2979\"></path></svg>");
var PlaySvg = Svg("\n<svg t=\"1608653010083\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2669\" width=\"200\" height=\"200\"><path d=\"M254.132978 880.390231c-6.079462 0-12.155854-1.511423-17.643845-4.497431-11.828396-6.482645-19.195178-18.85851-19.195178-32.341592L217.293955 180.465165c0-13.483082 7.366781-25.898857 19.195178-32.346709 11.787464-6.483668 26.226315-5.928013 37.57478 1.363044L789.797957 481.028615c10.536984 6.77531 16.908088 18.456351 16.908088 30.979572 0 12.523221-6.371104 24.203238-16.908088 30.982642L274.063913 874.53385C267.983427 878.403994 261.060761 880.390231 254.132978 880.390231L254.132978 880.390231zM254.132978 880.390231\" p-id=\"2670\"></path></svg>", "1.2em", "1.2em");
var CopySvg = Svg("<svg t=\"1609140690840\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2475\" width=\"200\" height=\"200\"><path d=\"M571.52 909.44H280.96c-61.44 0-111.36-49.92-111.36-111.36V387.2c0-61.44 49.92-111.36 111.36-111.36h290.56c61.44 0 111.36 49.92 111.36 111.36v410.88c0 61.44-49.92 111.36-111.36 111.36z m-290.56-569.6c-26.24 0-47.36 21.12-47.36 47.36v410.88c0 26.24 21.12 47.36 47.36 47.36h290.56c26.24 0 47.36-21.12 47.36-47.36V387.2c0-26.24-21.12-47.36-47.36-47.36H280.96z\" fill=\"#515151\" p-id=\"2476\"></path><path d=\"M775.68 742.4c-17.92 0-32-14.08-32-32V333.44c0-66.56-53.76-120.32-120.32-120.32h-256c-17.92 0-32-14.08-32-32s14.08-32 32-32h256c101.76 0 184.32 82.56 184.32 184.32V710.4c0 17.28-14.08 32-32 32z\" fill=\"#515151\" p-id=\"2477\"></path></svg>", "1.2em", "1.2em");
var DownloadSvg = Svg("<svg t=\"1609045064135\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"8424\" width=\"200\" height=\"200\"><path d=\"M877.489158 381.468085 668.638503 381.468085 668.638503 68.191078 355.361497 68.191078l0 313.277006L146.509818 381.468085l365.489158 365.489158L877.489158 381.468085zM146.509818 851.382571l0 104.425328L877.489158 955.807898 877.489158 851.382571 146.509818 851.382571z\" p-id=\"8425\"></path></svg>");
var LoaclFileSvg = Svg("<svg t=\"1609045128202\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"11972\" width=\"200\" height=\"200\"><path d=\"M873.9 873.8H136.1c-20.6 0-37.4-16.7-37.4-37.4V198.3c0-29.2 23.7-52.9 52.9-52.9h187.8c10.3 0 20.1 4.2 27.1 11.7l119.6 126.1c7.1 7.4 16.9 11.7 27.1 11.7h360.6c29.2 0 52.9 23.7 52.9 52.9V821c0.1 29.1-23.6 52.8-52.8 52.8z\" p-id=\"11973\"></path></svg>");
var ShowSvg = Svg("<svg t=\"1609228844565\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5423\" width=\"200\" height=\"200\"><path d=\"M0 0 256 0 256 256 0 256zM384 64 1024 64 1024 192 384 192zM0 384 256 384 256 640 0 640zM384 448 1024 448 1024 576 384 576zM0 768 256 768 256 1024 0 1024zM384 832 1024 832 1024 960 384 960z\" p-id=\"5424\"></path></svg>");
var AutoIdSvg = Svg("<svg t=\"1609328500280\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3249\" width=\"200\" height=\"200\"><path d=\"M320 238.933333L213.333333 298.666667l59.733334-106.666667L213.333333 85.333333l106.666667 59.733334L426.666667 85.333333 366.933333 192 426.666667 298.666667 320 238.933333m512 418.133334L938.666667 597.333333l-59.733334 106.666667L938.666667 810.666667l-106.666667-59.733334L725.333333 810.666667l59.733334-106.666667L725.333333 597.333333l106.666667 59.733334M938.666667 85.333333l-59.733334 106.666667L938.666667 298.666667l-106.666667-59.733334L725.333333 298.666667l59.733334-106.666667L725.333333 85.333333l106.666667 59.733334L938.666667 85.333333m-369.493334 459.946667l104.106667-104.106667-90.453333-90.453333-104.106667 104.106667 90.453333 90.453333m43.946667-234.24l99.84 99.84c16.64 15.786667 16.64 43.52 0 60.16L215.04 968.96c-16.64 16.64-44.373333 16.64-60.16 0l-99.84-99.84c-16.64-15.786667-16.64-43.52 0-60.16L552.96 311.04c16.64-16.64 44.373333-16.64 60.16 0z\" fill=\"\" p-id=\"3250\"></path></svg>");
var NewFileSvg = Svg("<svg t=\"1609344473408\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"4741\" width=\"200\" height=\"200\"><path d=\"M826.496 32A165.504 165.504 0 0 1 992 197.504v628.992A165.504 165.504 0 0 1 826.496 992H197.504A165.504 165.504 0 0 1 32 826.496V197.504A165.504 165.504 0 0 1 197.504 32h628.992zM576 256H448v192H256v128h191.968L448 768h128V576h192V448H576V256z\" p-id=\"4742\"></path></svg>");

function exportRecord() {
    return __awaiter(this, void 0, void 0, function () {
        var list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, state.recordList.find()];
                case 1:
                    list = _a.sent();
                    localfile.download("TouchAndTouch_" + dayjs(Date.now()).format("YYYY_MM_DD_HH_mm"), JSON.stringify(list));
                    return [2 /*return*/];
            }
        });
    });
}

function importRecord() {
    return __awaiter(this, void 0, void 0, function () {
        var value, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, localfile.loadFile()];
                case 1:
                    value = (_a.sent()).value;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 7]);
                    data = JSON.parse(value);
                    data.forEach(function (item) {
                        if (!item._id) {
                            throw "File type error";
                        }
                        item._id = "_id" + Date.now() + Math.random();
                        item.updateAt = Date.now();
                    });
                    return [4 /*yield*/, Message.info("Is merge record data?", {
                            ok: "Ok",
                            cancel: "Cancel",
                            style: { zIndex: 16000 },
                        })];
                case 3:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, state.recordList.insertMany(data)];
                case 4:
                    _a.sent();
                    aoife.next(".tat-update");
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.error(err_1);
                    Message.error("[ERROR] File is not TAT");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}

var recordAgain = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.nowCell.updateOne({}, { step: 0, items: [] })];
            case 1:
                _a.sent();
                return [4 /*yield*/, state.recordItems.deleteMany()];
            case 2:
                _a.sent();
                recordContinue();
                return [2 /*return*/];
        }
    });
}); };

var showList = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ui;
    return __generator(this, function (_a) {
        ui = state.ui.get();
        state.ui.merge({
            showList: ui.showList ? 0 : 1,
        });
        aoife$1.next(".tat-update");
        return [2 /*return*/];
    });
}); };

var changeAutoRecordId = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ui;
    return __generator(this, function (_a) {
        ui = state.ui();
        state.ui({
            autoRecordId: !ui.autoRecordId,
        });
        aoife.next(".tat-update");
        return [2 /*return*/];
    });
}); };

function ThePop(_a) {
    var children = _a.children;
    return Pop({
        animation: void 0,
        placement: "top",
        zIndex: 15100,
        followCursor: "horizontal",
        children: [children[0], aoife$1("div", { class: "tat-fm" }, children[1])],
    });
}
var Ctrl = function () {
    return aoife$1("div", { class: "tat-update tat-ctrl" }, function () { return __awaiter(void 0, void 0, void 0, function () {
        var ui;
        return __generator(this, function (_a) {
            ui = state.ui.get();
            if (ui.recording) {
                return [2 /*return*/, aoife$1("span", { class: "tat-row" }, RecordStopSvg({ class: "tat-btn", onclick: recordStop }), Step())];
            }
            if (ui.replaying) {
                return [2 /*return*/, aoife$1("span", { class: "tat-row" }, ReplayStopSvg({ class: "tat-btn", onclick: function () { return replayStop(); } }), Step())];
            }
            return [2 /*return*/, aoife$1("span", { class: "tat-row" }, ThePop({
                    children: [
                        NewFileSvg({ class: "tat-btn", onclick: function () { return recordCellAdd(); } }),
                        "New item",
                    ],
                }), ThePop({
                    children: [
                        PlaySvg({ class: "tat-btn", onclick: function () { return replayStart(); } }),
                        "Play selected record",
                    ],
                }), ThePop({
                    children: [
                        ReplayAllSvg({
                            class: "tat-btn",
                            onclick: function () { return replayAllFilter(); },
                        }),
                        "Play all filter record",
                    ],
                }), ThePop({
                    children: [
                        RecordContinueSvg({
                            class: "tat-btn",
                            onclick: function () { return recordContinue(); },
                        }),
                        "Record continue",
                    ],
                }), ThePop({
                    children: [
                        RecordAgainSvg({ class: "tat-btn", onclick: function () { return recordAgain(); } }),
                        "Record again",
                    ],
                }), aoife$1("span", { style: "flex:1" }), aoife$1(AutoIdSvg, {
                    class: "tat-btn",
                    style: function () {
                        if (!initOpt.useAutoId) {
                            return { display: "none" };
                        }
                        return { opacity: state.ui.get().autoRecordId ? 1 : 0.4 };
                    },
                    onclick: function () { return changeAutoRecordId(); },
                }), ThePop({
                    children: [
                        aoife$1(AutoIdSvg, {
                            class: "tat-btn",
                            style: function () {
                                if (!initOpt.useAutoId) {
                                    return { display: "none" };
                                }
                                return { opacity: state.ui.get().autoRecordId ? 1 : 0.4 };
                            },
                            onclick: function () { return changeAutoRecordId(); },
                        }),
                        "Use auto Record Id (Not recommended)",
                    ],
                }), ThePop({
                    children: [
                        ShowSvg({
                            class: "tat-btn",
                            style: function () { return __awaiter(void 0, void 0, void 0, function () {
                                var ui;
                                return __generator(this, function (_a) {
                                    ui = state.ui.get();
                                    return [2 /*return*/, { opacity: ui.showList ? 1 : 0.4 }];
                                });
                            }); },
                            onclick: function () { return showList(); },
                        }),
                        "List show/hidden",
                    ],
                }), ThePop({
                    children: [
                        DownloadSvg({
                            class: "tat-btn",
                            onclick: exportRecord,
                        }),
                        "Download records",
                    ],
                }), ThePop({
                    children: [
                        LoaclFileSvg({ class: "tat-btn", onclick: importRecord }),
                        "Load records from file",
                    ],
                }))];
        });
    }); });
};
css(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  .tat-row {\n    display: flex;\n    width: 100%;\n    ", "\n  }\n  .tat-more-item {\n    cursor: pointer;\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    flex-direction: row;\n    height: 30px;\n    background: rgba(255, 255, 255, 0);\n    padding: 4px;\n  }\n  .tat-more-item:hover {\n    background: rgba(255, 255, 255, 0.1);\n  }\n  .tat-more-item:active {\n    background: rgba(255, 255, 255, 0.1);\n  }\n  .tat-ctrl {\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    flex-direction: row;\n    height: 30px;\n    width: 100%;\n  }\n  .tat-btn {\n    padding: 4px 4px;\n    border-radius: 2px;\n    cursor: pointer;\n    user-select: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n  }\n  .tat-btn:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-btn:active {\n    background: rgba(0, 0, 128, 0.2);\n  }\n  .tat-icon {\n    width: 16px;\n    height: 16px;\n  }\n\n  .tat-show-list-icon {\n    display: block;\n    transition: all 0.3s ease-out;\n  }\n  .tat-show-list {\n    transform: rotate(-90deg);\n  }\n"], ["\n  .tat-row {\n    display: flex;\n    width: 100%;\n    ", "\n  }\n  .tat-more-item {\n    cursor: pointer;\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    flex-direction: row;\n    height: 30px;\n    background: rgba(255, 255, 255, 0);\n    padding: 4px;\n  }\n  .tat-more-item:hover {\n    background: rgba(255, 255, 255, 0.1);\n  }\n  .tat-more-item:active {\n    background: rgba(255, 255, 255, 0.1);\n  }\n  .tat-ctrl {\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    flex-direction: row;\n    height: 30px;\n    width: 100%;\n  }\n  .tat-btn {\n    padding: 4px 4px;\n    border-radius: 2px;\n    cursor: pointer;\n    user-select: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n  }\n  .tat-btn:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-btn:active {\n    background: rgba(0, 0, 128, 0.2);\n  }\n  .tat-icon {\n    width: 16px;\n    height: 16px;\n  }\n\n  .tat-show-list-icon {\n    display: block;\n    transition: all 0.3s ease-out;\n  }\n  .tat-show-list {\n    transform: rotate(-90deg);\n  }\n"])), css.flex("row-center-center"));
var templateObject_1$1;

var changeInput = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        state.ui.merge({ showInputId: id });
        aoife.next(".tat-play-list .cell");
        return [2 /*return*/];
    });
}); };

var rename = function (id, title) { return __awaiter(void 0, void 0, void 0, function () {
    var now;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                state.ui.merge({
                    showInputId: "",
                });
                return [4 /*yield*/, state.nowCell.findOne()];
            case 1:
                now = _a.sent();
                if (!(now._id === id)) return [3 /*break*/, 3];
                return [4 /*yield*/, state.nowCell.updateOne({}, { title: title })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, state.recordList.updateOne({ _id: id }, { title: title })];
            case 4:
                _a.sent();
                aoife.next("#" + id);
                return [2 /*return*/];
        }
    });
}); };

var remove = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.recordList.findOne({ _id: id })];
            case 1:
                data = _a.sent();
                if (!!state.onAlt) return [3 /*break*/, 3];
                return [4 /*yield*/, Message.info("Is delete: [" + data.step + "]" + getTitle(data) + " ?", {
                        ok: "Ok",
                        cancel: "Cancel",
                        style: { zIndex: 16000 },
                    })];
            case 2:
                if (!(_a.sent())) {
                    return [2 /*return*/];
                }
                _a.label = 3;
            case 3: return [4 /*yield*/, state.recordList.deleteMany({ _id: id })];
            case 4:
                _a.sent();
                aoife.next(".tat-play-list");
                return [2 /*return*/];
        }
    });
}); };

var changeFilter = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        state.ui.merge({
            filter: filter
                .split(",")
                .map(function (v) { return v.trim(); })
                .filter(Boolean),
        });
        aoife.next(".tat-play-list .cell");
        return [2 /*return*/];
    });
}); };

var recordCellCopy = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var cell, nextId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.recordList.findOne({ _id: id })];
            case 1:
                cell = _a.sent();
                nextId = "id" + Date.now();
                return [4 /*yield*/, state.recordList.insertOne(__assign(__assign({}, cell), { title: dayjs(Date.now()).format("MM/DD HH:mm"), _id: nextId, updateAt: cell.updateAt + 1 }))];
            case 2:
                _a.sent();
                return [4 /*yield*/, changeSelectItem(nextId)];
            case 3:
                _a.sent();
                aoife.next(".tat-update");
                return [2 /*return*/];
        }
    });
}); };

var changeCellData = function (id, code) { return __awaiter(void 0, void 0, void 0, function () {
    var items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    items = JSON.parse(code);
                    if (Object.prototype.toString.call(items) !== "[object Array]") {
                        throw "items need a array";
                    }
                }
                catch (err) {
                    Message.error(err.toString(), { style: { zIndex: 16000 } });
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, state.recordList.updateOne({ _id: id }, { items: items })];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };

var cache$1 = {};
var iconfonts = document.createElement("style");
iconfonts.id = "iconfonts";
iconfonts.textContent = "\n.icon {\nwidth: 100%; height: 100%;\nvertical-align: -0.15em;\nfill: currentColor;\noverflow: hidden;\n}\n  ";
document.head.append(iconfonts);
var waitingCached = function (src) {
    return new Promise(function (res) {
        var relaod = function () {
            setTimeout(function () {
                if (cache$1[src] === 2) {
                    res(void 0);
                }
                else {
                    relaod();
                }
            }, 50);
        };
        relaod();
    });
};
function loadScript(href) {
    if (cache$1[href] === 1) {
        return waitingCached(href);
    }
    cache$1[href] = 1;
    return new Promise(function (res) {
        var el = document.createElement("script");
        // el.setAttribute("src", href);
        el.src = href;
        // el.setAttribute("type", "text/javascript");
        el.onload = function () {
            res(void 0);
            cache$1[href] = 2;
        };
        document.head.append(el);
    });
}
function loadScriptList() {
    var srcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        srcs[_i] = arguments[_i];
    }
    return Promise.all(srcs.map(function (src) { return loadScript(src); }));
}

loadScriptList("https://unpkg.com/prettier@2.2.1/standalone.js", "https://unpkg.com/prettier@2.2.1/standalone.js", "https://unpkg.com/prettier@2.2.1/parser-babel.js");
var changeFormat = function (code) {
    if (code === void 0) { code = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var prettier, prettierPlugins, out;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, waitValue(function () { return window.prettier; }, 1000 * 20)];
                case 1:
                    prettier = _a.sent();
                    if (!prettier) {
                        Message.error("Unload prettier, check the network, please.", {
                            style: { zIndex: 16000 },
                        });
                        return [2 /*return*/, false];
                    }
                    prettierPlugins = window.prettierPlugins;
                    try {
                        out = prettier.format(code, {
                            parser: "json",
                            plugins: prettierPlugins,
                            printWidth: 120,
                            tabWidth: 2,
                            singleQute: false,
                            trailingComma: "all",
                            jsxBracketSameLine: true,
                            singleQuote: true,
                            semi: true,
                        });
                        return [2 /*return*/, out];
                    }
                    catch (err) {
                        Message.error(err.toString(), { style: { zIndex: 16000 } });
                    }
                    return [2 /*return*/];
            }
        });
    });
};

var findCellDate = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var cell;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.recordList.findOne({ _id: id })];
            case 1:
                cell = _a.sent();
                return [2 /*return*/, JSON.stringify(cell.items, null, 2)];
        }
    });
}); };

var tabKeyDown = function (e) {
    if (e.keyCode === 9) {
        e.preventDefault();
        var indent = "  ";
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var sele = window.getSelection();
        if (sele) {
            var selected = window.getSelection().toString();
            selected = indent + selected.replace(/\n/g, "\n" + indent);
            this.value =
                this.value.substring(0, start) + selected + this.value.substring(end);
            this.setSelectionRange(start + indent.length, start + selected.length);
        }
    }
};
function formatText() {
    return __awaiter(this, void 0, void 0, function () {
        var textarea, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    textarea = document.getElementById("tat-code-plan-textarea");
                    return [4 /*yield*/, changeFormat(textarea.value)];
                case 1:
                    val = _a.sent();
                    if (!val) {
                        return [2 /*return*/, false];
                    }
                    textarea.value = val;
                    return [2 /*return*/, true];
            }
        });
    });
}
var CodePlan = (function (_a) {
    var id = _a.id;
    var ele = aoife$1("div", { id: "tat-code-plan", class: "tat-code-plan", "tat-ignore": true }, aoife$1("div", { class: "plan" }, aoife$1("div", { class: "button-plan" }, aoife$1("button", {
        onclick: formatText,
    }, "Format"), aoife$1("button", {
        onclick: function () { return __awaiter(void 0, void 0, void 0, function () {
            var isRight, textarea, done;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, formatText()];
                    case 1:
                        isRight = _a.sent();
                        if (!isRight) {
                            return [2 /*return*/];
                        }
                        textarea = document.getElementById("tat-code-plan-textarea");
                        return [4 /*yield*/, changeCellData(id, textarea.value)];
                    case 2:
                        done = _a.sent();
                        if (done) {
                            ele.remove();
                        }
                        return [2 /*return*/];
                }
            });
        }); },
    }, "Save"), aoife$1("button", {
        onclick: function () {
            ele.remove();
        },
    }, "Cancel")), aoife$1("textarea", {
        tabindex: 0,
        dir: "ltr",
        onkeydown: tabKeyDown,
        autocapitalize: "off",
        autocomplete: "off",
        autocorrect: "off",
        id: "tat-code-plan-textarea",
        spellcheck: false,
        class: "tat-textarea",
        value: function () { return findCellDate(id); },
    })));
    return ele;
});
css(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  .tat-textarea {\n    font-family: Menlo, Monaco, \"Courier New\", monospace;\n    font-size: 13px;\n  }\n  .tat-code-plan {\n    position: fixed;\n    top: 0px;\n    left: 0px;\n    width: 100vw;\n    height: 100vh;\n    z-index: 15010;\n  }\n  .tat-code-plan .plan {\n    ", "\n    height: 100%;\n  }\n  .tat-code-plan .button-plan {\n    position: fixed;\n    top: 0px;\n    right: 0px;\n    padding: 14px;\n  }\n  .tat-code-plan button {\n    ", "\n    cursor: pointer;\n    margin: 6px;\n    background: #77f;\n    color: #fff;\n    padding: 8px 16px;\n    border-radius: 4px;\n  }\n  .tat-code-plan button:hover {\n    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n  }\n  .tat-code-plan button:active {\n    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);\n    background: #55f;\n  }\n  .tat-code-plan textarea {\n    ", ";\n    box-sizing: border-box;\n    width: 100%;\n    font-size: 14px;\n    flex: 1;\n    border: none;\n    background: #fff;\n  }\n"], ["\n  .tat-textarea {\n    font-family: Menlo, Monaco, \"Courier New\", monospace;\n    font-size: 13px;\n  }\n  .tat-code-plan {\n    position: fixed;\n    top: 0px;\n    left: 0px;\n    width: 100vw;\n    height: 100vh;\n    z-index: 15010;\n  }\n  .tat-code-plan .plan {\n    ", "\n    height: 100%;\n  }\n  .tat-code-plan .button-plan {\n    position: fixed;\n    top: 0px;\n    right: 0px;\n    padding: 14px;\n  }\n  .tat-code-plan button {\n    ", "\n    cursor: pointer;\n    margin: 6px;\n    background: #77f;\n    color: #fff;\n    padding: 8px 16px;\n    border-radius: 4px;\n  }\n  .tat-code-plan button:hover {\n    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n  }\n  .tat-code-plan button:active {\n    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);\n    background: #55f;\n  }\n  .tat-code-plan textarea {\n    ", ";\n    box-sizing: border-box;\n    width: 100%;\n    font-size: 14px;\n    flex: 1;\n    border: none;\n    background: #fff;\n  }\n"])), css.flex("col-start-start"), css.clear(), css.clear());
var templateObject_1$2;

var PlayList = function () {
    return aoife("div", {
        class: "tat-update, tat-play-list",
        hidden: function () {
            var ui = state.ui.get();
            return !ui.showList || ui.recording || ui.replaying;
        },
    }, aoife("input", {
        class: "filter",
        placeholder: "FilterA, FilterB...",
        defaultValue: function () {
            var ui = state.ui.get();
            if (!ui.filter) {
                return "";
            }
            return ui.filter.join(", ");
        },
        oninput: function (e) { return changeFilter(e.target.value); },
    }), aoife("div", { class: "cells" }, function () { return __awaiter(void 0, void 0, void 0, function () {
        var list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, state.recordList.find()];
                case 1:
                    list = _a.sent();
                    return [2 /*return*/, list.map(function (item, i) {
                            return aoife("div", {
                                id: item._id,
                                classPick: function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var cell;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, state.nowCell.findOne()];
                                            case 1:
                                                cell = _a.sent();
                                                return [2 /*return*/, {
                                                        cell: 1,
                                                        "cell-selected": item._id === cell._id,
                                                    }];
                                        }
                                    });
                                }); },
                                hidden: function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var cell, show;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, state.recordList.index(i)];
                                            case 1:
                                                cell = _a.sent();
                                                return [4 /*yield*/, fixFilterCell(cell)];
                                            case 2:
                                                show = _a.sent();
                                                return [2 /*return*/, !show];
                                        }
                                    });
                                }); },
                                onclick: function () { return changeSelectItem(item._id); },
                            }, aoife("input", {
                                class: "input",
                                onclick: function (e) { return e.stopPropagation(); },
                                hidden: function (el) { return __awaiter(void 0, void 0, void 0, function () {
                                    var ui, hidden;
                                    return __generator(this, function (_a) {
                                        ui = state.ui.get();
                                        hidden = ui.showInputId !== item._id;
                                        if (!hidden) {
                                            requestAnimationFrame(function () {
                                                if (document.contains(el)) {
                                                    el.focus();
                                                }
                                            });
                                        }
                                        return [2 /*return*/, hidden];
                                    });
                                }); },
                                onblur: function () { return changeInput(""); },
                                value: function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var v;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, state.recordList.index(i)];
                                            case 1:
                                                v = _a.sent();
                                                if (!v) {
                                                    return [2 /*return*/, ""];
                                                }
                                                return [2 /*return*/, v.title || ""];
                                        }
                                    });
                                }); },
                                onchange: function (e) { return rename(item._id, e.target.value); },
                                placeholder: "请输入title",
                            }), aoife("div", {
                                class: "label",
                                ondblclick: function () {
                                    changeInput(item._id);
                                },
                                hidden: function () {
                                    var ui = state.ui.get();
                                    return ui.showInputId === item._id;
                                },
                            }, function () { return __awaiter(void 0, void 0, void 0, function () {
                                var v;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, state.recordList.index(i)];
                                        case 1:
                                            v = _a.sent();
                                            if (v) {
                                                return [2 /*return*/, "[" + v.step + "] " + getTitle(v)];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }), Pop({
                                placement: "right",
                                zIndex: 15100,
                                children: [
                                    ThinMoreSvg({ class: "edit" }),
                                    aoife("div", { class: "tat-row" }, EditorSvg({
                                        class: "tat-btn edit",
                                        onclick: function (e) {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            changeInput(item._id);
                                        },
                                    }), CodeSvg({
                                        class: "tat-btn edit",
                                        onclick: function (e) {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            document.body.append(CodePlan({ id: item._id }));
                                            // changeCellData(item._id);
                                        },
                                    }), CopySvg({
                                        class: "tat-btn edit",
                                        onclick: function (e) {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            recordCellCopy(item._id);
                                        },
                                    }), DeleteSvg({
                                        class: "tat-btn edit",
                                        onclick: function (e) {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            remove(item._id);
                                        },
                                    })),
                                ],
                            }));
                        })];
            }
        });
    }); }));
};
css(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  .tat-play-list {\n    font-size: 16px;\n    width: 250px;\n  }\n  .tat-play-list .filter {\n    height: 20px;\n    font-size: 12px;\n    margin: 4px;\n    margin-bottom: 8px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    width: calc(100% - 8px);\n    outline: none;\n  }\n  .tat-play-list .edit {\n    width: 18px;\n    height: 18px;\n    padding: 2px 2px;\n    margin-right: 2px;\n    font-size: 12px;\n    ", "\n  }\n  .tat-play-list .input {\n    height: 20px;\n    font-size: 12px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    width: 200px;\n    outline: none;\n  }\n  .tat-play-list .cells {\n    width: 100%;\n    height: 140px;\n    overflow-y: auto;\n  }\n  .tat-play-list .edit:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-play-list .label {\n    font-size: 12px;\n    border: 1px solid rgba(0, 0, 0, 0);\n    flex: 1;\n    ", "\n  }\n  .tat-play-list .cell-selected {\n    border-left: 2px solid rgba(0, 0, 0, 0.5) !important;\n    border-radius: 0px 2px 2px 0px !important;\n  }\n  .tat-play-list .cell {\n    border-left: 2px solid rgba(0, 0, 0, 0);\n    height: 20px;\n    font-size: 12px;\n    padding: 4px 0px 4px 4px;\n    border-radius: 2px;\n    cursor: pointer;\n    user-select: none;\n    ", "\n  }\n  .tat-play-list .cell:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-play-list .cell:active {\n    background: rgba(0, 0, 128, 0.2);\n  }\n"], ["\n  .tat-play-list {\n    font-size: 16px;\n    width: 250px;\n  }\n  .tat-play-list .filter {\n    height: 20px;\n    font-size: 12px;\n    margin: 4px;\n    margin-bottom: 8px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    width: calc(100% - 8px);\n    outline: none;\n  }\n  .tat-play-list .edit {\n    width: 18px;\n    height: 18px;\n    padding: 2px 2px;\n    margin-right: 2px;\n    font-size: 12px;\n    ", "\n  }\n  .tat-play-list .input {\n    height: 20px;\n    font-size: 12px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    width: 200px;\n    outline: none;\n  }\n  .tat-play-list .cells {\n    width: 100%;\n    height: 140px;\n    overflow-y: auto;\n  }\n  .tat-play-list .edit:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-play-list .label {\n    font-size: 12px;\n    border: 1px solid rgba(0, 0, 0, 0);\n    flex: 1;\n    ", "\n  }\n  .tat-play-list .cell-selected {\n    border-left: 2px solid rgba(0, 0, 0, 0.5) !important;\n    border-radius: 0px 2px 2px 0px !important;\n  }\n  .tat-play-list .cell {\n    border-left: 2px solid rgba(0, 0, 0, 0);\n    height: 20px;\n    font-size: 12px;\n    padding: 4px 0px 4px 4px;\n    border-radius: 2px;\n    cursor: pointer;\n    user-select: none;\n    ", "\n  }\n  .tat-play-list .cell:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-play-list .cell:active {\n    background: rgba(0, 0, 128, 0.2);\n  }\n"])), css.flex("row-center-center"), css.wordBreak(1), css.flex("row-start-center"));
var templateObject_1$3;

var plan = aoife$1("div", { class: "tat-plan tat-update", "tat-ignore": true }, PlayList());
var dragAndCtrl = aoife$1("div", { class: "tat-row tat-head-center", "tat-ignore": true }, Drag({
    query: ".tat-root",
    "tat-ignore": true,
    localStorageKey: "tat-drag",
    children: [DragSvg({})],
}), Ctrl());
var TouchAndTouch = function (opt) {
    init(opt);
    return aoife$1("div", { "tat-ignore": true, class: "tat tat-root" }, aoife$1("div", dragAndCtrl, plan));
};
css(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  .tat *[hidden] {\n    display: none !important;\n  }\n  .tat-head-row {\n    ", "\n  }\n  .tat-head-center {\n    ", "\n  }\n  .tat-drag-line {\n    height: 1px;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.5);\n  }\n  .tat *,\n  .tat-fm {\n    font-family: \"SF Pro SC\", \"SF Pro Display\", \"SF Pro Icons\", \"PingFang SC\",\n      \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n    font-size: 16px;\n  }\n  .tat {\n    font-size: 16px;\n    backdrop-filter: blur(9px);\n    background: rgba(255, 255, 255, 0.85);\n    color: #00;\n    z-index: 15000;\n    padding: 6px;\n    border: 1px solid rgba(0, 0, 0, 0.13);\n    // box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.06);\n    border-radius: 4px;\n  }\n  .tat-title {\n    user-select: none;\n    font-size: 11px;\n  }\n"], ["\n  .tat *[hidden] {\n    display: none !important;\n  }\n  .tat-head-row {\n    ", "\n  }\n  .tat-head-center {\n    ", "\n  }\n  .tat-drag-line {\n    height: 1px;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.5);\n  }\n  .tat *,\n  .tat-fm {\n    font-family: \"SF Pro SC\", \"SF Pro Display\", \"SF Pro Icons\", \"PingFang SC\",\n      \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n    font-size: 16px;\n  }\n  .tat {\n    font-size: 16px;\n    backdrop-filter: blur(9px);\n    background: rgba(255, 255, 255, 0.85);\n    color: #00;\n    z-index: 15000;\n    padding: 6px;\n    border: 1px solid rgba(0, 0, 0, 0.13);\n    // box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.06);\n    border-radius: 4px;\n  }\n  .tat-title {\n    user-select: none;\n    font-size: 11px;\n  }\n"])), css.flex("row-start-center"), css.flex("row-center-center"));
var templateObject_1$4;

export default TouchAndTouch;
//# sourceMappingURL=index.js.map
