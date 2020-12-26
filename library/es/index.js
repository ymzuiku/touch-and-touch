import Pop from 'aoife-pop';
import css from 'template-css';
import dayjs from 'dayjs';
import { createMicoDb } from 'mico-db';
import aoife$1 from 'aoife';
import aoifeSvg from 'aoife-svg';

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

function fixPosition(state) {
    var out = 60;
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
    var children = _a.children, clientX = _a.clientX, clientY = _a.clientY, _b = _a.query, query = _b === void 0 ? "[tat-base-drag]" : _b, localStorageKey = _a.localStorageKey, style = _a.style, rest = __rest(_a, ["children", "clientX", "clientY", "query", "localStorageKey", "style"]);
    var saveTime;
    var update = function () {
        var Ele = document.querySelector(query);
        if (Ele) {
            Ele.style.left = state.x + "px";
            Ele.style.top = state.y + "px";
        }
    };
    var onMove = function (e) {
        if (state.onDrag) {
            if (e.clientX - state.startX < 20 && e.clientY - state.startY < 20) {
                return;
            }
            state.x = e.clientX - state.startX;
            state.y = e.clientY - state.startY;
            fixPosition(state);
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
    fixPosition(state);
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

function getTitle(item) {
    return item.title || dayjs(item.updateAt).format("MM/DD HH:mm");
}

var micoDb = createMicoDb("tat");
var state = {
    onAlt: false,
    ui: micoDb.collection("ui", {
        type: "sessionStorage",
        firstItem: {
            speed: 1,
            showMouse: 0,
            lastFocus: null,
            showList: 1,
            showPlayList: 1,
            showInputId: "",
            recording: 0,
            replaying: 0,
            step: -1,
            filter: "",
            waitTimeout: 5000,
        },
    }),
    nowCell: micoDb.collection("nowCell"),
    recordList: micoDb.collection("record-list", {
        sort: { updateAt: -1 },
    }),
    recordItems: micoDb.collection("record-item"),
};
// 初始化数据
// state.recordItems.get();
// state.recordList.get();

var recordClear = function () { return __awaiter(void 0, void 0, void 0, function () {
    var lastCell, cell;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.nowCell.findOne()];
            case 1:
                lastCell = _a.sent();
                if (lastCell.step === 0) {
                    return [2 /*return*/];
                }
                if (!state.onAlt) {
                    if (!confirm("Is clear [" + lastCell.step + "]" + getTitle(lastCell) + " steps?")) {
                        return [2 /*return*/];
                    }
                }
                state.ui.updateOne({}, {
                    recording: 0,
                    replaying: 0,
                    showList: 1,
                });
                state.recordItems.set([]);
                state.nowCell.updateOne({}, { items: [], step: 0 });
                return [4 /*yield*/, state.nowCell.findOne()];
            case 2:
                cell = _a.sent();
                return [4 /*yield*/, state.recordList.updateOne({ _id: cell._id }, cell)];
            case 3:
                _a.sent();
                aoife.next(".tat-plan");
                return [2 /*return*/];
        }
    });
}); };

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
                aoife.next(".tat-plan");
                return [2 /*return*/];
        }
    });
}); };

var recordCellAdd = function () { return __awaiter(void 0, void 0, void 0, function () {
    var items, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.recordItems.find()];
            case 1:
                items = _a.sent();
                id = "id" + Date.now();
                return [4 /*yield*/, state.recordList.insertOne({
                        title: dayjs(Date.now()).format("MM/DD HH:mm"),
                        _id: id,
                        updateAt: Date.now(),
                        step: items.length,
                        items: items,
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, changeSelectItem(id)];
            case 3:
                _a.sent();
                aoife.next(".tat-plan");
                return [2 /*return*/];
        }
    });
}); };

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
            case 0: return [4 /*yield*/, state.ui.findOne()];
            case 1:
                ui = _a.sent();
                if (!(ui.recording && !ui.replaying)) return [3 /*break*/, 4];
                return [4 /*yield*/, state.recordItems.insertOne(event)];
            case 2:
                _a.sent();
                return [4 /*yield*/, state.recordItems.count()];
            case 3:
                step = _a.sent();
                state.nowCell.updateOne({}, { step: step });
                aoife.next(".tat-step");
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };

var inputs = ["input", "submit"];
var submits = ["submit", "change"];
var clicks = ["mousedown", "touchend"];
var attrs = __spreadArrays(inputs, clicks, submits);
var eleSetListen = function (ele) {
    var attrList = attrs;
    if (ele.nodeName === "FORM") {
        attrList = ["change"];
    }
    attrList.forEach(function (e) {
        if (ele["tat-" + e]) {
            return;
        }
        ele.addEventListener(e, function (event) {
            if (clicks.indexOf(e) > -1) {
                setTimeout(function () {
                    recordItemAdd({
                        key: ele.getAttribute("tat-key"),
                        type: e,
                        value: getEventVal(event),
                    });
                }, 20);
            }
            else {
                recordItemAdd({
                    key: ele.getAttribute("tat-key"),
                    type: e,
                    value: getEventVal(event),
                });
            }
        });
    });
};

var listenTags = ["input", "a", "button", "textarea", "select", "form"];
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
var loadPageKey = function () {
    return window.location.pathname + window.location.hash.split("?")[0];
};
function setAttrId(ele) {
    if (ele.closest("[tat-ignore]")) {
        return;
    }
    if (ele.getAttribute("tat-key")) {
        return;
    }
    var pageKey = loadPageKey();
    var selfTatid = ele.getAttribute("tat-id");
    if (selfTatid) {
        ele.setAttribute("tat-key", pageKey + selfTatid);
        return eleSetListen(ele);
    }
    var selfId = ele.getAttribute("id");
    if (selfId) {
        ele.setAttribute("tat-key", pageKey + selfId);
        return eleSetListen(ele);
    }
    var tat = getAttrAndCloseAttr(ele, "tat-id");
    var id = getAttrAndCloseAttr(ele, "id");
    var key = getAttrAndCloseAttr(ele, "key");
    var placeholder = ele.getAttribute("placeholder");
    var name = ele.getAttribute("name");
    var type = ele.getAttribute("type");
    ele.setAttribute("tat-key", [
        pageKey,
        "ele:" + ele.nodeName.toLowerCase(),
        "tat-id:" + tat,
        "id:" + id,
        "name:" + name,
        "type:" + type,
        "key:" + key,
        "placeholder:" + placeholder,
    ].join(", "));
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
        recordItemAdd({
            key: "",
            type: "mclick",
            clientX: event.clientX,
            clientY: event.clientY,
        });
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
            switch (_a.label) {
                case 0: return [4 /*yield*/, state.ui.findOne()];
                case 1:
                    ui = _a.sent();
                    return [2 /*return*/, !ui.showMouse];
            }
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
            switch (_a.label) {
                case 0: return [4 /*yield*/, state.ui.findOne()];
                case 1:
                    ui = _a.sent();
                    if (!(ui.lastFocus &&
                        ui.lastFocus.nodeName &&
                        document.contains(ui.lastFocus) &&
                        ui.lastFocus.focus)) return [3 /*break*/, 3];
                    ui.lastFocus.blur();
                    return [4 /*yield*/, state.ui.updateOne({}, { lastFocus: void 0 })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    mouse.style.top = item.clientY + "px";
                    mouse.style.left = item.clientX + "px";
                    setTimeout(function () {
                        round.style.transform = baseRoundTransform + "scale(0.5, 0.5)";
                        setTimeout(function () {
                            round.style.transform = baseRoundTransform + "scale(1, 1)";
                        }, 80);
                    }, 80);
                    return [2 /*return*/];
            }
        });
    });
}

var replayStop = function (success) { return __awaiter(void 0, void 0, void 0, function () {
    var cell;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.ui.updateOne({}, {
                    recording: 0,
                    replaying: 0,
                    showMouse: 0,
                    step: -1,
                    showPlayList: 1,
                })];
            case 1:
                _a.sent();
                aoife.next(".tat-plan");
                aoife.next(".tat-mouse");
                if (!(success && initOpt.onSuccess)) return [3 /*break*/, 3];
                return [4 /*yield*/, state.nowCell.findOne()];
            case 2:
                cell = _a.sent();
                initOpt.onSuccess(cell);
                _a.label = 3;
            case 3: return [2 /*return*/];
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
                alert(msg);
                _a.label = 3;
            case 3: return [4 /*yield*/, replayStop()];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var replayStart = function () { return __awaiter(void 0, void 0, void 0, function () {
    var items, cell, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.recordItems.find()];
            case 1:
                items = _a.sent();
                // 开始设置播放的样式
                return [4 /*yield*/, state.ui.updateOne({}, {
                        recording: 0,
                        replaying: 1,
                        showPlayList: 0,
                    })];
            case 2:
                // 开始设置播放的样式
                _a.sent();
                aoife.next(".tat-plan, .tat-mouse");
                if (!initOpt.onReplay) return [3 /*break*/, 4];
                return [4 /*yield*/, state.nowCell.findOne()];
            case 3:
                cell = _a.sent();
                initOpt.onReplay(cell);
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 8]);
                return [4 /*yield*/, startReplay(items)];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6:
                err_1 = _a.sent();
                return [4 /*yield*/, replayFail(err_1)];
            case 7:
                _a.sent();
                return [3 /*break*/, 8];
            case 8: 
            // 还原播放的样式
            return [4 /*yield*/, replayStop(true)];
            case 9:
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
function emitInput(el, item, eventKey) {
    return __awaiter(this, void 0, void 0, function () {
        var nodeName, inputEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (el.closest("[tat-ignore]")) {
                        return [2 /*return*/];
                    }
                    nodeName = el.nodeName.toLocaleLowerCase();
                    if (!(nodeName === "input" ||
                        nodeName === "textarea" ||
                        nodeName === "button")) return [3 /*break*/, 2];
                    return [4 /*yield*/, state.ui.updateOne({}, { lastFocus: el })];
                case 1:
                    _a.sent();
                    el.focus();
                    _a.label = 2;
                case 2:
                    inputEvent = new InputEvent(eventKey, {
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
function waitGetElement(key) {
    var _this = this;
    var t = Date.now();
    return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
        var getEl;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getEl = function () { return __awaiter(_this, void 0, void 0, function () {
                        var e, ui;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    e = document.querySelector("[tat-key=\"" + key + "\"]");
                                    return [4 /*yield*/, state.ui.findOne()];
                                case 1:
                                    ui = _a.sent();
                                    if (!e ||
                                        e.hidden ||
                                        e.style.display === "none" ||
                                        e.style.visibility === "hidden") {
                                        if (Date.now() - t < ui.waitTimeout) {
                                            requestAnimationFrame(getEl);
                                        }
                                        else {
                                            rej("[Touch And Touch] Find next element timeout");
                                        }
                                    }
                                    else {
                                        res(e);
                                    }
                                    return [2 /*return*/];
                            }
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
            switch (_a.label) {
                case 0: return [4 /*yield*/, state.ui.findOne()];
                case 1:
                    ui = _a.sent();
                    setTimeout(res, t * ui.speed);
                    return [2 /*return*/];
            }
        });
    }); });
}
var startReplay = function (items) { return __awaiter(void 0, void 0, void 0, function () {
    var i, _i, items_1, item, ui, el;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                return [4 /*yield*/, state.ui.updateOne({}, {
                        showMouse: 1,
                    })];
            case 1:
                _a.sent();
                _i = 0, items_1 = items;
                _a.label = 2;
            case 2:
                if (!(_i < items_1.length)) return [3 /*break*/, 17];
                item = items_1[_i];
                return [4 /*yield*/, state.ui.findOne()];
            case 3:
                ui = _a.sent();
                i++;
                if (!ui.replaying) {
                    return [3 /*break*/, 17];
                }
                if (i < ui.step) {
                    return [3 /*break*/, 16];
                }
                return [4 /*yield*/, state.ui.updateOne({}, { step: i })];
            case 4:
                _a.sent();
                aoife.next(".tat-step");
                if (item.href) {
                    if (item.href.indexOf("#/") > -1 && window.location.href === item.href) {
                        window.location.href = item.href;
                        window.location.reload();
                    }
                    else {
                        window.location.href = item.href;
                    }
                }
                if (!(item.type === "mclick")) return [3 /*break*/, 6];
                return [4 /*yield*/, sleep(120)];
            case 5:
                _a.sent();
                mouseClick(item);
                return [3 /*break*/, 16];
            case 6:
                if (!item.key) return [3 /*break*/, 16];
                return [4 /*yield*/, waitGetElement(item.key)];
            case 7:
                el = _a.sent();
                if (!(el.nodeName !== "FORM")) return [3 /*break*/, 9];
                scrollIntoView(el);
                return [4 /*yield*/, sleep(16)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                if (!(clicks.indexOf(item.type) > -1)) return [3 /*break*/, 11];
                getEleCenter(el, item);
                mouseClick(item);
                return [4 /*yield*/, sleep(80)];
            case 10:
                _a.sent();
                emitClick(el);
                return [3 /*break*/, 16];
            case 11: return [4 /*yield*/, state.ui.findOne()];
            case 12:
                if (!((_a.sent()).lastFocus !== el)) return [3 /*break*/, 14];
                if (!(el.nodeName !== "FORM")) return [3 /*break*/, 14];
                getEleCenter(el, item);
                mouseMove(item);
                return [4 /*yield*/, sleep(16)];
            case 13:
                _a.sent();
                _a.label = 14;
            case 14:
                emitInput(el, item, item.type);
                return [4 /*yield*/, sleep(16)];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16:
                _i++;
                return [3 /*break*/, 2];
            case 17: return [2 /*return*/];
        }
    });
}); };

var initOpt = {};
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
var init = function (opt) {
    if (opt === void 0) { opt = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var list, old, next;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (opt.multiplePage === void 0) {
                        opt.multiplePage = true;
                    }
                    Object.assign(initOpt, opt);
                    state.recordList.proxy.onChange = initOpt.onChangeData;
                    return [4 /*yield*/, state.recordList.find()];
                case 1:
                    list = _a.sent();
                    if (!(list.length === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, recordCellAdd()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, state.recordList.find()];
                case 3:
                    list = _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, state.nowCell.findOne()];
                case 5:
                    old = _a.sent();
                    if (!!old._id) return [3 /*break*/, 8];
                    if (!(list && list[list.length - 1])) return [3 /*break*/, 7];
                    return [4 /*yield*/, changeSelectItem(list[list.length - 1]._id)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 11];
                case 8: return [4 /*yield*/, state.nowCell.findOne()];
                case 9:
                    next = _a.sent();
                    return [4 /*yield*/, changeSelectItem(next._id)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    aoife$1.next(".tat-plan");
                    return [4 /*yield*/, state.ui.updateOne({}, { speed: opt.speed || 1, waitTimeout: opt.waitTimeout || 5000 })];
                case 12:
                    _a.sent();
                    recordDom();
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var list_1, cell;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, state.ui.findOne()];
                                case 1:
                                    if (!(_a.sent()).replaying) return [3 /*break*/, 2];
                                    replayStart();
                                    return [3 /*break*/, 6];
                                case 2:
                                    if (!initOpt.autoPlayItem) return [3 /*break*/, 6];
                                    return [4 /*yield*/, state.recordList.find()];
                                case 3:
                                    list_1 = _a.sent();
                                    cell = list_1.find(function (v) {
                                        var title = getTitle(v);
                                        if (title.indexOf(initOpt.autoPlayItem) > -1) {
                                            return true;
                                        }
                                    });
                                    if (!cell) return [3 /*break*/, 6];
                                    return [4 /*yield*/, changeSelectItem(cell._id)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, state.ui.updateOne({}, { step: -1 })];
                                case 5:
                                    _a.sent();
                                    replayStart();
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
};

var recordStart = function () { return __awaiter(void 0, void 0, void 0, function () {
    var items, isHaveHref, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.ui.updateOne({}, {
                    recording: 1,
                    replaying: 0,
                    showPlayList: 0,
                })];
            case 1:
                _a.sent();
                aoife$1.next(".tat-plan");
                if (!initOpt.multiplePage) return [3 /*break*/, 3];
                return [4 /*yield*/, state.recordItems.find()];
            case 2:
                items = _a.sent();
                isHaveHref = false;
                for (i = 0; i < items.length; i++) {
                    if (items[i].type === "href") {
                        isHaveHref = true;
                        break;
                    }
                }
                if (!isHaveHref) {
                    state.recordItems.insertOne({
                        key: "",
                        type: "href",
                        href: window.location.href,
                    });
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };

var showList = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ui;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.ui.findOne()];
            case 1:
                ui = _a.sent();
                return [4 /*yield*/, state.ui.updateOne({}, {
                        showList: ui.showList ? 0 : 1,
                    })];
            case 2:
                _a.sent();
                aoife$1.next(".tat-plan");
                return [2 /*return*/];
        }
    });
}); };

var recordStop = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cell, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.ui.updateOne({}, {
                    recording: 0,
                    showPlayList: 1,
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, state.nowCell.findOne()];
            case 2:
                cell = _a.sent();
                return [4 /*yield*/, state.recordItems.find()];
            case 3:
                items = _a.sent();
                return [4 /*yield*/, state.recordList.updateOne({ _id: cell._id }, __assign(__assign({}, cell), { items: items, updateAt: Date.now() }))];
            case 4:
                _a.sent();
                aoife.next(".tat-plan");
                return [2 /*return*/];
        }
    });
}); };

var Step = function () {
    return aoife("div", {
        class: "tat-step",
        hidden: function () { return __awaiter(void 0, void 0, void 0, function () {
            var ui;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, state.ui.findOne()];
                    case 1:
                        ui = _a.sent();
                        return [2 /*return*/, !ui.showList];
                }
            });
        }); },
    }, aoife("span", "Step: "), function () { return __awaiter(void 0, void 0, void 0, function () {
        var ui, cell;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, state.ui.findOne()];
                case 1:
                    ui = _a.sent();
                    return [4 /*yield*/, state.nowCell.findOne()];
                case 2:
                    cell = _a.sent();
                    return [2 /*return*/, ui.replaying ? ui.step + "/" + cell.step : cell.step];
            }
        });
    }); });
};
css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .tat-step {\n    padding: 4px;\n    font-size: 13px;\n    cursor: pointer;\n    width: calc(100% - 8px);\n    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n    // margin-bottom: 2px;\n  }\n"], ["\n  .tat-step {\n    padding: 4px;\n    font-size: 13px;\n    cursor: pointer;\n    width: calc(100% - 8px);\n    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n    // margin-bottom: 2px;\n  }\n"])));
var templateObject_1;

var DragSvg = aoifeSvg("\n<svg t=\"1608724287002\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2814\" width=\"200\" height=\"200\"><path d=\"M362.666667 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2815\"></path><path d=\"M661.333333 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2816\"></path><path d=\"M362.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2817\"></path><path d=\"M661.333333 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2818\"></path><path d=\"M362.666667 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2819\"></path><path d=\"M661.333333 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z\" p-id=\"2820\"></path></svg>\n");
var EditorSvg = aoifeSvg("\n<svg t=\"1608542607404\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1140\" width=\"1em\" height=\"1em\"><path d=\"M896 801.216V864H128v-62.784h768z m-204.288-678.4l155.36 155.36-463.136 463.136-156.864 1.504 1.504-156.864L691.712 122.816z m-0.864 89.632L291.712 611.584l-0.64 67.232 67.2-0.64L757.44 279.04l-66.56-66.56z\" fill=\"#f00\" p-id=\"1141\"></path></svg>\n");
var RecordStartSvg = aoifeSvg("<svg t=\"1608542641961\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1886\" width=\"200px\" height=\"200px\"><path d=\"M512 1024c282.833455 0 512-229.166545 512-512S794.833455 0 512 0 0 229.166545 0 512s229.166545 512 512 512z\" fill=\"#f00\"  p-id=\"1887\"></path></svg>");
var RecordStopSvg = aoifeSvg("<svg t=\"1608738155473\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1785\" width=\"200\" height=\"200\"><path d=\"M512 0c-282.784 0-512 229.216-512 512s229.216 512 512 512 512-229.216 512-512-229.216-512-512-512zM512 928c-229.76 0-416-186.24-416-416s186.24-416 416-416 416 186.24 416 416-186.24 416-416 416zM320 320l384 0 0 384-384 0z\" p-id=\"1786\"></path></svg>");
var ReplayStopSvg = aoifeSvg("<svg t=\"1608544642733\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1144\" width=\"200\" height=\"200\"><path d=\"M32 32m160 0l640 0q160 0 160 160l0 640q0 160-160 160l-640 0q-160 0-160-160l0-640q0-160 160-160Z\" fill=\"#364F6B\" p-id=\"1145\"></path></svg>");
var RecordCancelSvg = aoifeSvg("<svg t=\"1608544898326\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1760\" width=\"200\" height=\"200\"><path d=\"M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z m0 85.333333c66.133333 0 128 23.466667 179.2 59.733334L273.066667 691.2C236.8 640 213.333333 578.133333 213.333333 512c0-164.266667 134.4-298.666667 298.666667-298.666667z m0 597.333334c-66.133333 0-128-23.466667-179.2-59.733334l418.133333-418.133333C787.2 384 810.666667 445.866667 810.666667 512c0 164.266667-134.4 298.666667-298.666667 298.666667z\" fill=\"#D50000\" p-id=\"1761\"></path></svg>", "1.2em", "1.2em");
var CtrlExpendSvg = aoifeSvg("<svg t=\"1608568357635\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1893\" width=\"200\" height=\"200\"><path d=\"M512 704.412l311.598-311.598-73.226-73.226L512 557.441 273.627 319.588l-73.226 73.226L512 704.412z\" p-id=\"1894\"></path></svg>");
var DeleteSvg = aoifeSvg("<svg t=\"1608624070479\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2977\" width=\"200\" height=\"200\"><path d=\"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z\" p-id=\"2978\"></path><path d=\"M864 256H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z\" p-id=\"2979\"></path></svg>");
var PlaySvg = aoifeSvg("\n<svg t=\"1608653010083\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2669\" width=\"200\" height=\"200\"><path d=\"M254.132978 880.390231c-6.079462 0-12.155854-1.511423-17.643845-4.497431-11.828396-6.482645-19.195178-18.85851-19.195178-32.341592L217.293955 180.465165c0-13.483082 7.366781-25.898857 19.195178-32.346709 11.787464-6.483668 26.226315-5.928013 37.57478 1.363044L789.797957 481.028615c10.536984 6.77531 16.908088 18.456351 16.908088 30.979572 0 12.523221-6.371104 24.203238-16.908088 30.982642L274.063913 874.53385C267.983427 878.403994 261.060761 880.390231 254.132978 880.390231L254.132978 880.390231zM254.132978 880.390231\" p-id=\"2670\"></path></svg>", "1.2em", "1.2em");
var CopySvg = aoifeSvg("<svg t=\"1608656646797\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1759\" width=\"200\" height=\"200\"><path d=\"M808.768 197.312c10.432 0 17.408 6.912 17.408 17.344l0 485.568c0 10.368-6.976 17.344-17.408 17.344l-87.296 0c-19.136 0-34.944 15.552-34.944 34.624 0 19.136 15.808 34.688 34.944 34.688l104.768 0c38.464 0 69.824-31.168 69.824-69.312l0-520.32C896 159.168 864.64 128 826.176 128l-384 0c-38.4 0-69.824 31.232-69.824 69.312l0 34.688c0 19.072 15.68 34.688 34.88 34.688 19.2 0 34.88-15.616 34.88-34.688L442.112 214.656c0-10.432 6.976-17.344 17.408-17.344L808.768 197.312z\" p-id=\"1760\"></path><path d=\"M128 363.968l0 469.376C128 867.84 160.32 896 199.808 896l394.944 0c39.488 0 71.872-28.16 71.872-62.656L666.624 363.968c0-34.432-32.384-62.592-71.872-62.592L199.808 301.376C160.32 301.376 128 329.536 128 363.968z\" p-id=\"1761\"></path></svg>", "1.2em", "1.2em");

function ThePop(_a) {
    var children = _a.children;
    return Pop({
        animation: void 0,
        placement: "top",
        followCursor: "horizontal",
        children: [children[0], aoife("div", { class: "tat-fm" }, children[1])],
    });
}
var Ctrl = function () {
    return aoife("div", { class: "tat-ctrl" }, function () { return __awaiter(void 0, void 0, void 0, function () {
        var ui;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, state.ui.findOne()];
                case 1:
                    ui = _a.sent();
                    if (ui.recording) {
                        return [2 /*return*/, aoife("span", { class: "tat-row" }, RecordStopSvg({ class: "tat-btn", onclick: recordStop }), Step())];
                    }
                    if (ui.replaying) {
                        return [2 /*return*/, aoife("span", { class: "tat-row" }, ReplayStopSvg({ class: "tat-btn", onclick: function () { return replayStop(); } }), Step())];
                    }
                    return [2 /*return*/, aoife("span", { class: "tat-row" }, ThePop({
                            children: [
                                PlaySvg({ class: "tat-btn", onclick: replayStart }),
                                "Play now record",
                            ],
                        }), ThePop({
                            children: [
                                RecordStartSvg({ class: "tat-btn", onclick: recordStart }),
                                "Start Record",
                            ],
                        }), ThePop({
                            children: [
                                RecordCancelSvg({ class: "tat-btn", onclick: recordClear }),
                                "Clear marks",
                            ],
                        }), ThePop({
                            children: [
                                CopySvg({ class: "tat-btn", onclick: recordCellAdd }),
                                "Copy record to new item",
                            ],
                        }), aoife("div", { style: "flex:1" }), aoife("div", {
                            class: "tat-btn",
                            hidden: function () { return __awaiter(void 0, void 0, void 0, function () {
                                var ui;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, state.ui.findOne()];
                                        case 1:
                                            ui = _a.sent();
                                            return [2 /*return*/, ui.recording || ui.replaying];
                                    }
                                });
                            }); },
                            onclick: showList,
                        }, CtrlExpendSvg({
                            class: function () { return __awaiter(void 0, void 0, void 0, function () {
                                var ui;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, state.ui.findOne()];
                                        case 1:
                                            ui = _a.sent();
                                            return [2 /*return*/, "tat-show-list-icon " + (ui.showList && "tat-show-list")];
                                    }
                                });
                            }); },
                        })))];
            }
        });
    }); });
};
css(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  .tat-row {\n    display: flex;\n    ", "\n  }\n  .tat-ctrl {\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    flex-direction: row;\n    height: 30px;\n    width: 100%;\n  }\n  .tat-btn {\n    padding: 4px 4px;\n    border-radius: 2px;\n    cursor: pointer;\n    user-select: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n  }\n  .tat-btn:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-btn:active {\n    background: rgba(0, 0, 128, 0.2);\n  }\n  .tat-icon {\n    width: 16px;\n    height: 16px;\n  }\n\n  .tat-show-list-icon {\n    display: block;\n    transition: all 0.3s ease-out;\n  }\n  .tat-show-list {\n    transform: rotate(-90deg);\n  }\n"], ["\n  .tat-row {\n    display: flex;\n    ", "\n  }\n  .tat-ctrl {\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    flex-direction: row;\n    height: 30px;\n    width: 100%;\n  }\n  .tat-btn {\n    padding: 4px 4px;\n    border-radius: 2px;\n    cursor: pointer;\n    user-select: none;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n  }\n  .tat-btn:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-btn:active {\n    background: rgba(0, 0, 128, 0.2);\n  }\n  .tat-icon {\n    width: 16px;\n    height: 16px;\n  }\n\n  .tat-show-list-icon {\n    display: block;\n    transition: all 0.3s ease-out;\n  }\n  .tat-show-list {\n    transform: rotate(-90deg);\n  }\n"])), css.flex("row-center-center"));
var templateObject_1$1;

var changeInput = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.ui.updateOne({}, { showInputId: id })];
            case 1:
                _a.sent();
                aoife.next(".tat-play-list .cell");
                return [2 /*return*/];
        }
    });
}); };

var rename = function (id, title) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                state.ui.updateOne({}, {
                    showInputId: "",
                });
                return [4 /*yield*/, state.recordList.updateOne({ _id: id }, { title: title })];
            case 1:
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
                if (!state.onAlt) {
                    if (!confirm("Is delete: [" + data.step + "]" + getTitle(data) + " ?")) {
                        return [2 /*return*/];
                    }
                }
                return [4 /*yield*/, state.recordList.deleteMany({ _id: id })];
            case 2:
                _a.sent();
                aoife.next(".tat-play-list");
                return [2 /*return*/];
        }
    });
}); };

var changeFilter = function (filter) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, state.ui.updateOne({}, { filter: filter })];
            case 1:
                _a.sent();
                aoife.next(".tat-play-list .cell");
                return [2 /*return*/];
        }
    });
}); };

var PlayList = function () {
    return aoife("div", {
        class: "tat-play-list",
        hidden: function () { return __awaiter(void 0, void 0, void 0, function () {
            var ui;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, state.ui.findOne()];
                    case 1:
                        ui = _a.sent();
                        return [2 /*return*/, !ui.showPlayList || !ui.showList];
                }
            });
        }); },
    }, aoife("input", {
        class: "filter",
        placeholder: "Filter",
        oninput: function (e) { return changeFilter(e.target.value); },
    }), 
    // <div class="cells">
    aoife("div", { class: "cells" }, function () { return __awaiter(void 0, void 0, void 0, function () {
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
                                    var ui, filter, item, title;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, state.ui.findOne()];
                                            case 1:
                                                ui = _a.sent();
                                                filter = ui.filter;
                                                if (!filter) {
                                                    return [2 /*return*/, false];
                                                }
                                                return [4 /*yield*/, state.recordList.index(i)];
                                            case 2:
                                                item = _a.sent();
                                                if (!item) {
                                                    return [2 /*return*/, true];
                                                }
                                                title = getTitle(item);
                                                return [2 /*return*/, title.indexOf(ui.filter) < 0];
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
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, state.ui.findOne()];
                                            case 1:
                                                ui = _a.sent();
                                                hidden = ui.showInputId !== item._id;
                                                if (!hidden) {
                                                    requestAnimationFrame(function () {
                                                        if (document.contains(el)) {
                                                            el.focus();
                                                        }
                                                    });
                                                }
                                                return [2 /*return*/, hidden];
                                        }
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
                                hidden: function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var ui;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, state.ui.findOne()];
                                            case 1:
                                                ui = _a.sent();
                                                return [2 /*return*/, ui.showInputId === item._id];
                                        }
                                    });
                                }); },
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
                            }); }), EditorSvg({
                                class: "edit",
                                onclick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    changeInput(item._id);
                                },
                            }), DeleteSvg({
                                class: "edit",
                                onclick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    remove(item._id);
                                },
                            }));
                        })];
            }
        });
    }); }));
};
css(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  .tat-play-list {\n    width: 100%;\n  }\n  .tat-play-list .filter {\n    height: 20px;\n    font-size: 12px;\n    margin: 4px;\n    margin-bottom: 8px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    width: calc(100% - 13px);\n    outline: none;\n  }\n  .tat-play-list .edit {\n    width: 18px;\n    height: 18px;\n    padding: 2px 2px;\n    margin-right: 2px;\n    ", "\n  }\n  .tat-play-list .input {\n    height: 20px;\n    font-size: 12px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    width: 95px;\n    outline: none;\n  }\n  .tat-play-list .cells {\n    width: 100%;\n    height: 200px;\n    overflow-y: auto;\n  }\n  .tat-play-list .edit:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-play-list .label {\n    width: 100px;\n    ", "\n  }\n  .tat-play-list .cell-selected {\n    border-left: 2px solid rgba(0, 0, 0, 0.5) !important;\n    border-radius: 0px 2px 2px 0px !important;\n  }\n  .tat-play-list .cell {\n    border-left: 2px solid rgba(0, 0, 0, 0);\n    height: 20px;\n    font-size: 12px;\n    padding: 4px 0px 4px 4px;\n    border-radius: 2px;\n    cursor: pointer;\n    user-select: none;\n    ", "\n  }\n  .tat-play-list .cell:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-play-list .cell:active {\n    background: rgba(0, 0, 128, 0.2);\n  }\n"], ["\n  .tat-play-list {\n    width: 100%;\n  }\n  .tat-play-list .filter {\n    height: 20px;\n    font-size: 12px;\n    margin: 4px;\n    margin-bottom: 8px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    width: calc(100% - 13px);\n    outline: none;\n  }\n  .tat-play-list .edit {\n    width: 18px;\n    height: 18px;\n    padding: 2px 2px;\n    margin-right: 2px;\n    ", "\n  }\n  .tat-play-list .input {\n    height: 20px;\n    font-size: 12px;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    width: 95px;\n    outline: none;\n  }\n  .tat-play-list .cells {\n    width: 100%;\n    height: 200px;\n    overflow-y: auto;\n  }\n  .tat-play-list .edit:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-play-list .label {\n    width: 100px;\n    ", "\n  }\n  .tat-play-list .cell-selected {\n    border-left: 2px solid rgba(0, 0, 0, 0.5) !important;\n    border-radius: 0px 2px 2px 0px !important;\n  }\n  .tat-play-list .cell {\n    border-left: 2px solid rgba(0, 0, 0, 0);\n    height: 20px;\n    font-size: 12px;\n    padding: 4px 0px 4px 4px;\n    border-radius: 2px;\n    cursor: pointer;\n    user-select: none;\n    ", "\n  }\n  .tat-play-list .cell:hover {\n    background: rgba(0, 0, 0, 0.1);\n  }\n  .tat-play-list .cell:active {\n    background: rgba(0, 0, 128, 0.2);\n  }\n"])), css.flex("row-center-center"), css.wordBreak(1), css.flex("row-start-center"));
var templateObject_1$2;

var TouchAndTouch = function (opt) {
    init(opt);
    return aoife("div", { "tat-drag-ctrl": true, "tat-ignore": true, class: "tat" }, aoife("div", { class: "tat-plan" }, aoife("div", { class: "tat-head-row" }, Drag({
        class: "tat-head-center",
        query: "[tat-drag-ctrl]",
        "tat-ignore": true,
        localStorageKey: "tat-drag",
        children: [DragSvg({})],
    }), Ctrl()), PlayList()));
};
css(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  .tat *[hidden] {\n    display: none !important;\n  }\n  .tat-head-row {\n    ", "\n  }\n  .tat-head-center {\n    ", "\n  }\n  .tat-drag-line {\n    height: 1px;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.5);\n  }\n  .tat *,\n  .tat-fm {\n    font-family: \"SF Pro SC\", \"SF Pro Display\", \"SF Pro Icons\", \"PingFang SC\",\n      \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n    font-size: 16px;\n  }\n  .tat {\n    font-size: 16px;\n    backdrop-filter: blur(9px);\n    background: rgba(255, 255, 255, 0.85);\n    color: #00;\n    z-index: 9000;\n    padding: 6px;\n    width: 160px;\n    border: 1px solid rgba(0, 0, 0, 0.13);\n    // box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.06);\n    border-radius: 4px;\n  }\n  .tat-title {\n    user-select: none;\n    font-size: 11px;\n  }\n"], ["\n  .tat *[hidden] {\n    display: none !important;\n  }\n  .tat-head-row {\n    ", "\n  }\n  .tat-head-center {\n    ", "\n  }\n  .tat-drag-line {\n    height: 1px;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.5);\n  }\n  .tat *,\n  .tat-fm {\n    font-family: \"SF Pro SC\", \"SF Pro Display\", \"SF Pro Icons\", \"PingFang SC\",\n      \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n    font-size: 16px;\n  }\n  .tat {\n    font-size: 16px;\n    backdrop-filter: blur(9px);\n    background: rgba(255, 255, 255, 0.85);\n    color: #00;\n    z-index: 9000;\n    padding: 6px;\n    width: 160px;\n    border: 1px solid rgba(0, 0, 0, 0.13);\n    // box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.06);\n    border-radius: 4px;\n  }\n  .tat-title {\n    user-select: none;\n    font-size: 11px;\n  }\n"])), css.flex("row-start-center"), css.flex("row-center-center"));
var templateObject_1$3;

export default TouchAndTouch;
//# sourceMappingURL=index.js.map
