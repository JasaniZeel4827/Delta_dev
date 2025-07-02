(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__8a05e7._.js", {

"[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Adapted from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/dev/error-overlay/websocket.ts
__turbopack_esm__({
    "addMessageListener": (()=>addMessageListener),
    "connectHMR": (()=>connectHMR),
    "sendMessage": (()=>sendMessage)
});
let source;
const eventCallbacks = [];
// TODO: add timeout again
// let lastActivity = Date.now()
function getSocketProtocol(assetPrefix) {
    let protocol = location.protocol;
    try {
        // assetPrefix is a url
        protocol = new URL(assetPrefix).protocol;
    } catch (_) {}
    return protocol === "http:" ? "ws" : "wss";
}
function addMessageListener(cb) {
    eventCallbacks.push(cb);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
function connectHMR(options) {
    const { timeout = 5 * 1000 } = options;
    function init() {
        if (source) source.close();
        console.log("[HMR] connecting...");
        function handleOnline() {
            const connected = {
                type: "turbopack-connected"
            };
            eventCallbacks.forEach((cb)=>{
                cb(connected);
            });
            if (options.log) console.log("[HMR] connected");
        // lastActivity = Date.now()
        }
        function handleMessage(event) {
            // lastActivity = Date.now()
            const message = {
                type: "turbopack-message",
                data: JSON.parse(event.data)
            };
            eventCallbacks.forEach((cb)=>{
                cb(message);
            });
        }
        // let timer: NodeJS.Timeout
        function handleDisconnect() {
            source.close();
            setTimeout(init, timeout);
        }
        const { hostname, port } = location;
        const protocol = getSocketProtocol(options.assetPrefix || "");
        const assetPrefix = options.assetPrefix.replace(/^\/+/, "");
        let url = `${protocol}://${hostname}:${port}${assetPrefix ? `/${assetPrefix}` : ""}`;
        if (assetPrefix.startsWith("http")) {
            url = `${protocol}://${assetPrefix.split("://")[1]}`;
        }
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}
}}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_esm__({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
var __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)");
;
function connect({ // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
addMessageListener = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["addMessageListener"], // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"], onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    // TODO(WEB-1465) Remove this backwards compat fallback once
    // vercel/next.js#54586 is merged.
    if (callback === undefined) {
        callback = sendMessage;
        sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"];
    }
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/src/components/chakra-next.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "CNLink": (()=>CNLink)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$link$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/link/link.js [client] (ecmascript)");
;
;
;
const CNLink = ({ href, nextProps, children, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$link$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Link"], {
        ...props,
        asChild: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            ...nextProps,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/chakra-next.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/chakra-next.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
};
_c = CNLink;
var _c;
__turbopack_refresh__.register(_c, "CNLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/libs/configs/site.config.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "siteConfig": (()=>siteConfig)
});
const siteConfig = {
    profile: {
        name: 'Jasani Zeel',
        title: 'Software Engineer',
        avatar: '/assets/zeelpro.png',
        location: 'Junagadh, India',
        experience: 'B.Tech Computer Science',
        about: 'I am a Computer Science student from India with an interest in full stack webapp, mobile app, system design, and Generative AI.',
        keywords: [
            'Software Engineer',
            'Full Stack Developer',
            'React',
            'Node.js',
            'python'
        ]
    },
    contact: {
        email: 'jasanizeel487@gmail.com',
        phone: '+1234567890',
        emailHref: 'mailto:jasanizeel487@gmail.com',
        phoneHref: 'tel:+1234567890'
    },
    social: {
        githubHandle: 'JasaniZeel4827',
        githubHref: 'https://github.com/JasaniZeel4827',
        twitterHandle: 'Jasani  Zeel',
        twitterHref: 'https://x.com/deltapixel3777',
        linkedinHandle: '',
        linkedinHref: '#'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/libs/data/project.data.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "projectsData": (()=>projectsData)
});
const projectsData = [
    // {
    //   title: 'Task Manager App',
    //   description:
    //     'A simple task management application to create, update, and delete tasks with a clean UI.',
    //   href: '#',
    // },
    {
        title: 'URL Shortner Web App',
        description: 'A minimal MERN app to shorten URLs with custom aliases and click tracking.',
        href: '#'
    },
    {
        title: 'MasterJi - Online Learning Platform',
        description: 'MasterJi is an AI-powered online learning platform offering personalized lessons, interactive videos, and smart assessments to make education engaging and effective.',
        href: '#'
    },
    {
        title: 'Personal Portfolio Website',
        description: 'A personal portfolio website showcasing projects, skills, and experience with a modern design.',
        href: '#'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/libs/data/work.data.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// // export type Work = {
// //   company: string
// //   deliverable: string[]
// //   fromDate: string
// //   toDate: string
// // }
// // export const worksData: Work[] = [
// //   {
// //     company: 'Delta Crops Ltd.',
// //     deliverable: [
// //       'Developed a web application to manage the company’s inventory and sales.',
// //       'Implemented a barcode scanner to track inventory.',
// //     ],
// //     fromDate: '2022-04',
// //     toDate: 'Present',
// //   },
// //   {
// //     company: 'NextGen Software',
// //     deliverable: [
// //       'Developed a full-stack e-commerce platform with product listings, cart functionality, and payment integration.',
// //       'Integrated a payment gateway for seamless transactions.',
// //     ],
// //     fromDate: '2017-08',
// //     toDate: '2019-02',
// //   },
// // ]
// // export type Work = {
// //   company: string;
// //   position?: string; // Added 'position' as an optional field to better describe roles like "Intern" or "Team Lead" for hackathons.
// //   deliverable: string[];
// //   fromDate: string;
// //   toDate: string;
// // };
// // export const worksData: Work[] = [
// //   // --- Internships (2 entries) ---
// //   {
// //     company: 'Tech Rover Solutions Pvt Ltd', // Replace with actual company name
// //     position: 'Generative AI Intern',
// //     deliverable: [
// //       'Developed and fine-tuned a custom large language model (LLM) for specific industry tasks using PyTorch and Hugging Face Transformers.',
// //       'Implemented RAG (Retrieval-Augmented Generation) pipeline to enhance LLM responses with real-time data.',
// //       'Contributed to the development of a Streamlit-based prototype showcasing AI capabilities.',
// //       'Collaborated with senior researchers on optimizing model inference speed on cloud platforms.',
// //     ],
// //     fromDate: '2024-06', // Example dates: June 2024
// //     toDate: '2024-09', // Example dates: September 2024
// //   },
// //   {
// //     company: 'Noble University of Engineering', // IMPORTANT: Replace with your actual university name
// //     position: 'Software Development Intern (Academic Project)',
// //     deliverable: [
// //       'Contributed to a research project on real-time data visualization by building interactive dashboards using React and D3.js.',
// //       'Assisted in designing and implementing RESTful APIs with Flask for data backend.',
// //       'Wrote comprehensive unit and integration tests, increasing code coverage by 15%.',
// //     ],
// //     fromDate: '2023-01', // Example dates: January 2023
// //     toDate: '2023-05', // Example dates: May 2023
// //   },
// //   // --- Hackathons (4 entries, including 2 winners/runner-ups) ---
// //   // Hackathon 1 (Winner/Runner-up)
// //   {
// //     company: 'University Hackathon 2024', // Replace with actual hackathon name and year
// //     position: 'Team Lead - Runner-Up (Top 5%)', // Or 'Winner' / 'First Place'
// //     deliverable: [
// //       'Developed an AI-powered real-time sign language translator using TensorFlow and custom computer vision models in just 48 hours.',
// //       'Achieved 92% accuracy on the test set for key functionality.',
// //       'Presented solution to a panel of industry experts, receiving commendation for innovation and technical execution.',
// //     ],
// //     fromDate: '2024-03-15', // Specific start date of hackathon
// //     toDate: '2024-03-17', // Specific end date of hackathon
// //   },
// //   // Hackathon 2 (Winner/Runner-up)
// //   {
// //     company: 'CodeFest 2023', // Replace with actual hackathon name and year
// //     position: 'Participant - Winner (Best Use of Google Cloud API)', // e.g., 'Best Use of [Specific Technology/API]'
// //     deliverable: [
// //       'Built a blockchain-based supply chain tracker prototype from scratch, incorporating smart contracts on Ethereum.',
// //       'Successfully integrated Chainlink for data oracle services.',
// //       'Collaborated effectively within a team of 4 developers under tight deadlines.',
// //     ],
// //     fromDate: '2023-10-20', // Specific start date of hackathon
// //     toDate: '2023-10-22', // Specific end date of hackathon
// //   },
// //   // Hackathon 3 (General Participation)
// //   {
// //     company: 'Data Science Challenge 2023', // Replace with actual hackathon name and year
// //     position: 'Data Analyst / ML Engineer',
// //     deliverable: [
// //       'Analyzed a large dataset of customer purchasing behavior to identify key trends and predict churn risk.',
// //       'Developed predictive models using scikit-learn and performed extensive data visualization using Matplotlib.',
// //       'Contributed to the team\'s final report and presentation of insights.',
// //     ],
// //     fromDate: '2023-07-07', // Specific start date of hackathon
// //     toDate: '2023-07-09', // Specific end date of hackathon
// //   },
// //   // Hackathon 4 (General Participation)
// //   {
// //     company: 'WebDev Sprint 2022', // Replace with actual hackathon name and year
// //     position: 'Front-End Developer',
// //     deliverable: [
// //       'Designed and implemented the user interface for a local community platform using React and Chakra UI.',
// //       'Ensured responsive design across various devices and optimized for performance.',
// //       'Collaborated with backend developers to integrate API endpoints for dynamic content loading.',
// //     ],
// //     fromDate: '2022-04-01', // Specific start date of hackathon
// //     toDate: '2022-04-03', // Specific end date of hackathon
// //   },
// // ];
// // ai code testing
// export type Work = {
//   company: string;
//   position?: string;
//   deliverable: string[];
//   fromDate: string;
//   toDate: string;
// };
// export const worksData: Work[] = [
//   // --- Internships (2 entries) ---
//   {
//     company: 'Tech Rover Solutions Pvt Ltd', // Example Company (Gen AI focused, easier level)
//     position: 'Junior AI Development Intern',
//     deliverable: [
//       'Utilized OpenAI and Hugging Face APIs to build simple text generation and image recognition prototypes.',
//       'Assisted in preparing and cleaning datasets for training small custom models.',
//       'Developed basic web interfaces using Streamlit for demonstrating AI functionalities.',
//       'Explored various pre-trained models and their applications for content creation.',
//     ],
//     fromDate: '2024-06',
//     toDate: '2024-09',
//   },
//   {
//     company: 'Noble University Tech Dept.', // University Internship (Development, intermediate level)
//     position: 'Software Development Intern',
//     deliverable: [
//       'Developed and optimized backend APIs using Node.js and Express, handling moderate data loads and ensuring data integrity.',
//       'Integrated third-party services and payment gateways for a university project, managing API keys and securing transactions.',
//       'Implemented front-end components with React, focusing on reusable components and state management.',
//       'Participated in code reviews and contributed to improving team coding standards.',
//     ],
//     fromDate: '2023-01',
//     toDate: '2023-05',
//   },
//   // --- Hackathons (4 entries, including 2 winners/runner-ups) ---
//   // Hackathon 1 (Winner/Runner-up - Gen AI Easy Level)
//   {
//     company: 'AI Challenge Hackathon 2025', // e.g., 'AI Challenge Hackathon 2024'
//     position: 'Team Lead - Winner (Most Creative AI App)', // Or 'Runner-Up'
//     deliverable: [
//       'Developed a novel AI application that [briefly describe, e.g., "generates personalized bedtime stories"] using pre-trained language models and a simple prompt engineering approach.',
//       'Integrated a basic text-to-speech API to enhance user experience within the 48-hour timeframe.',
//       'Designed an intuitive user interface for easy interaction with the AI model.',
//     ],
//     fromDate: '2024-03-15',
//     toDate: '2024-03-17',
//   },
//   // Hackathon 2 (Winner/Runner-up - Development Intermediate Level)
//   {
//     company: 'Smart City Hack 2024', // e.g., 'Smart City Hack 2023'
//     position: 'Full Stack Engineer - Runner-Up (Best Solution for Urban Planning)',
//     deliverable: [
//       'Built a data visualization platform displaying real-time city data using Next.js and a Flask backend.',
//       'Implemented robust data filtering and search functionalities, handling complex queries efficiently.',
//       'Deployed the application using Docker containers, ensuring cross-platform compatibility.',
//       'Optimized database queries for PostgreSQL, achieving fast load times for large datasets.',
//     ],
//     fromDate: '2023-10-20',
//     toDate: '2023-10-22',
//   },
//    {
//     company: 'Prompt Pioneers Fest 2023',
//     position: 'AI Prompt Engineer',
//     deliverable: [
//       'Experimented with various prompting techniques, including role-playing and constraint-based prompting, to guide large language models (e.g., LLaMA 2) to generate specific marketing copy for fictional products.',
//       'Evaluated the quality and relevance of AI-generated marketing outputs based on predefined criteria like persuasiveness and clarity, improving average score by 10%.',
//       'Documented effective prompt strategies and shared a detailed guide on best practices for creative content generation with the hackathon team members.',
//     ],
//     fromDate: '2023-07-07',
//     toDate: '2023-07-09',
//   },
//   // Hackathon 4 (General Participation - Development Intermediate Level)
//   {
//     company: 'Open Source Contribution Gujarat Institute of Technology', // e.g., 'Open Source Contribution Hack 2022'
//     position: 'Software Development Intern (Academic Project)',
//     deliverable: [
//       'Developed and optimized backend APIs for an online library management system using Node.js and Express, handling up to 100 concurrent requests.',
//       'Integrated third-party services like Stripe for payment processing for a university event management platform, managing API keys securely.',
//       'Implemented responsive front-end components for a student portal with React and Chakra UI, enhancing user navigation.',
//       'Participated in daily stand-ups and contributed to improving team coding standards by documenting best practices for API design.',
//     ],
//     fromDate: '2022-04-01',
//     toDate: '2022-04-03',
//   },
// ];
// export type Work = {
//   company: string;
//   position?: string;
//   deliverable: string[];
//   fromDate: string;
//   toDate: string;
// };
__turbopack_esm__({
    "worksData": (()=>worksData)
});
const worksData = [
    {
        company: 'Tech Rover – Web Development Internship',
        position: 'Frontend Intern',
        deliverable: [
            'Worked on developing web interfaces using React and Tailwind CSS.',
            'Assisted in creating responsive UI components for real client projects.',
            'Collaborated with senior developers on improving application performance and usability.'
        ],
        fromDate: '2024-01',
        toDate: '2024-02'
    },
    {
        company: 'IIT Madras – Full Stack Web Dev with GenAI (by Coding Ninjas)',
        position: 'Full Stack Intern',
        deliverable: [
            'Completed an internship focused on building full-stack web applications with integrated GenAI features.',
            'Developed projects using React, Node.js, and MongoDB with OpenAI APIs for intelligent features.',
            'Built a chatbot module using Generative AI and prompt engineering concepts.',
            'Learned deployment practices and participated in weekly evaluations and mentorship sessions.'
        ],
        fromDate: '2023-05',
        toDate: '2026-09'
    },
    // {
    //   company: 'AI Hackathon – College Level',
    //   position: 'Hackathon Participant',
    //   deliverable: [
    //     'Participated in a 48-hour college hackathon focused on AI-powered solutions.',
    //     'Worked on a team project that used OpenAI API for generating personalized content.',
    //     'Contributed to both backend integration and frontend UI/UX design.'
    //   ],
    //   fromDate: '2025-03-15',
    //   toDate: '2025-03-17',
    // },
    {
        company: 'College Level Hackathon',
        position: 'Team Project Developer',
        deliverable: [
            'Participated in a 48-hour hackathon organized at the college level.',
            'Built a web-based educational game designed to teach the fundamental concepts of programming and visual effects.',
            'Focused on making the platform beginner-friendly and accessible to non-technical users.',
            'Collaborated with teammates to ensure engaging design, interactivity, and learning effectiveness.'
        ],
        fromDate: '2025-01-09',
        toDate: '2025-01-11'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// 'use client'
// import { CNLink } from '@/components/chakra-next'
// import { siteConfig } from '@/libs/configs/site.config'
// import { projectsData } from '@/libs/data/project.data'
// import { worksData } from '@/libs/data/work.data'
// import {
//   Box,
//   Button,
//   Center,
//   Flex,
//   Heading,
//   HStack,
//   Separator,
//   SimpleGrid,
//   Stack,
//   Text,
// } from '@chakra-ui/react'
// import { IconType } from 'react-icons'
// import { AiOutlineOpenAI } from 'react-icons/ai'
// import {
//   BiLogoFirebase,
//   BiLogoFlask,
//   BiLogoMongodb,
//   BiLogoRedux,
//   BiLogoTailwindCss,
//   BiLogoTypescript,
// } from 'react-icons/bi'
// import {
//   FaAws,
//   FaCss3,
//   FaDocker,
//   FaGitAlt,
//   FaGithub,
//   FaHtml5,
//   FaLinkedin,
//   FaNodeJs,
//   FaPython,
//   FaReact,
// } from 'react-icons/fa'
// import { FaRegCalendarDays, FaXTwitter } from 'react-icons/fa6'
// import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
// import { IoLogoJavascript } from 'react-icons/io5'
// import { RiNextjsFill } from 'react-icons/ri'
// import { SiExpress, SiMui, SiPrisma } from 'react-icons/si'
// export default function Home() {
//   return (
//     <>
//       <title>{siteConfig.profile.name}</title>
//       <meta name="description" content={siteConfig.profile.about} />
//       <meta name="keywords" content={siteConfig.profile.keywords.join(',')} />
//       <Flex
//         gap={4}
//         flexDirection={{
//           base: 'column',
//           lg: 'row',
//         }}
//       >
//         <Box
//           width={{
//             base: '100%',
//             lg: '40%',
//           }}
//         >
//           <About />
//         </Box>
//         <Stack gap={10} flex={1}>
//           <TechStack />
//           <Projects />
//           <Work />
//           <Contact />
//         </Stack>
//       </Flex>
//     </>
//   )
// }
// const About = () => {
//   const socials: {
//     Icon: IconType
//     href: string
//     title: string
//   }[] = [
//     {
//       Icon: FaGithub,
//       href: siteConfig.social.githubHref,
//       title: 'Github',
//     },
//     {
//       Icon: FaXTwitter,
//       href: siteConfig.social.twitterHref,
//       title: 'Twitter',
//     },
//     {
//       Icon: FaLinkedin,
//       href: siteConfig.social.linkedinHref,
//       title: 'LinkedIn',
//     },
//   ]
//   return (
//     <Stack
//       p={6}
//       gap={4}
//       borderWidth="1px"
//       borderColor="gray.subtel"
//       borderRadius="md"
//       height={'fit-content'}
//       position={{ md: 'sticky' }}
//       top={{ md: 24 }}
//     >
//       <Heading as={'h1'} fontSize={'xl'} color={'brand'}>
//         {siteConfig.profile.name}
//       </Heading>
//       <Text fontSize={'sm'} color={'brand.secondary'}>
//         {siteConfig.profile.about}
//       </Text>
//       <Center>
//         {socials.map((item) => (
//           <Button key={item.title} variant={'outline'} p={2} borderRadius={'full'} border={0}>
//             <CNLink href={item.href} color={'Brand'}>
//               <item.Icon />
//             </CNLink>
//           </Button>
//         ))}
//       </Center>
//       <Flex direction={'column'} gap={4} justifyContent={'space-between'}>
//         <Flex justifyContent={'space-between'} gap={2}>
//           <Flex direction="column" flex={1}>
//             <Heading as="h3" fontSize="sm" fontWeight="bold" lineHeight="short">
//               {siteConfig.profile.experience}
//             </Heading>
//             <Text fontSize="xs" color="brand.secondary">
//               Experience
//             </Text>
//           </Flex>
//           <Flex direction="column" flex={1} textAlign={'right'}>
//             <Heading as="h3" fontSize="sm" fontWeight="bold" lineHeight="short">
//               {siteConfig.profile.location}
//             </Heading>
//             <Text fontSize="xs" color="brand.secondary">
//               Location
//             </Text>
//           </Flex>
//         </Flex>
//         <Button borderRadius={'md'}>
//           <IoMdCheckmarkCircleOutline />
//           Hire me
//         </Button>
//       </Flex>
//     </Stack>
//   )
// }
// const TechStack = () => {
//   const items = [
//     { name: 'TypeScript', badge: <BiLogoTypescript /> },
//     { name: 'JavaScript', badge: <IoLogoJavascript /> },
//     { name: 'React', badge: <FaReact /> },
//     { name: 'Next', badge: <RiNextjsFill /> },
//     { name: 'Tailwind', badge: <BiLogoTailwindCss /> },
//     { name: 'Redux', badge: <BiLogoRedux /> },
//     { name: 'Flask', badge: <BiLogoFlask /> },
//     { name: 'HTML5', badge: <FaHtml5 /> },
//     { name: 'CSS3', badge: <FaCss3 /> },
//     { name: 'Node', badge: <FaNodeJs /> },
//     { name: 'Express', badge: <SiExpress /> },
//     { name: 'Python', badge: <FaPython /> },
//     { name: 'MongoDB', badge: <BiLogoMongodb /> },
//     { name: 'AWS', badge: <FaAws /> },
//     { name: 'OpenAI', badge: <AiOutlineOpenAI /> },
//     { name: 'Firebase', badge: <BiLogoFirebase /> },
//     { name: 'Git', badge: <FaGitAlt /> },
//     { name: 'Docker', badge: <FaDocker /> },
//     { name: 'Prisma', badge: <SiPrisma /> },
//     { name: 'MUI', badge: <SiMui /> },
//   ]
//   return (
//     <Stack gap={4} id="home">
//       <Heading as={'h2'} fontSize={'xl'} color={'brand'}>
//         Tech Stack
//       </Heading>
//       <SimpleGrid columns={{ base: 2, sm: 3 }} gap={4}>
//         {items.map((tech, index) => {
//           return (
//             <Button
//               key={index}
//               variant={'outline'}
//               _hover={{ bg: 'brand.muted' }}
//               color={'brand'}
//               borderColor={'gray.subtel'}
//             >
//               {tech.badge}
//               {tech.name}
//             </Button>
//           )
//         })}
//       </SimpleGrid>
//     </Stack>
//   )
// }
// const Projects = () => {
//   return (
//     <Stack gap={4} id="projects">
//       <Heading as={'h2'} fontSize={'2xl'} color={'brand'}>
//         Projects
//       </Heading>
//       {projectsData.map((project, index) => {
//         return (
//           <CNLink
//             key={index}
//             href={project.href}
//             borderWidth={'1px'}
//             borderColor={'gray.subtel'}
//             _focus={{
//               textDecoration: 'none',
//               boxShadow: 'none',
//               borderColor: 'brand.emphasized',
//               border: 'none',
//             }}
//             borderRadius={'md'}
//             p={6}
//             _hover={{ textDecoration: 'none', bgColor: 'brand.muted' }}
//             target="_blank"
//           >
//             <Stack alignItems="start">
//               <Heading as="h3" fontSize="lg" color={'brand'} fontWeight="bold" textAlign="start">
//                 {project.title}
//               </Heading>
//               <Text color="brand.secondary" fontSize={'sm'}>
//                 {project.description}
//               </Text>
//             </Stack>
//           </CNLink>
//         )
//       })}
//     </Stack>
//   )
// }
// const Work = () => {
//   return (
//     <Stack gap={4} id="work">
//       <Heading as={'h2'} fontSize={'2xl'} color={'brand'}>
//         Work
//       </Heading>
//       <Stack
//         gap={5}
//         p={6}
//         borderWidth={'1px'}
//         borderColor={'gray.subtel'}
//         borderRadius={'lg'}
//         separator={<Separator opacity={1} color={'brand'} />}
//       >
//         {worksData.map((work, index) => {
//           return (
//             <Stack gap={4} key={index} direction="column">
//               <Flex justify={'space-between'} alignItems={'end'}>
//                 <Heading as="h3" fontSize="lg" color={'brand'} fontWeight="bold" textAlign="start">
//                   {work.company}
//                 </Heading>
//                 <HStack borderWidth={'1px'} p={2} borderRadius={'lg'} borderColor={'gray.subtel'}>
//                   <FaRegCalendarDays size={14} />
//                   <Text fontSize={'xs'} color={'brand'}>
//                     {work.fromDate} - {work.toDate}
//                   </Text>
//                 </HStack>
//               </Flex>
//               <Stack
//                 fontSize={'sm'}
//                 color={'brand.secondary'}
//                 as={'ul'}
//                 listStyleType={'disc'}
//                 ml={4}
//               >
//                 {work.deliverable.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </Stack>
//             </Stack>
//           )
//         })}
//       </Stack>
//     </Stack>
//   )
// }
// const Contact = () => {
//   return (
//     <Stack gap={6} marginBottom={10} id="contact">
//       <Heading as={'h2'} fontSize={{ base: 'xl', md: '2xl' }} color={'brand'}>
//         Contact
//       </Heading>
//       <Box borderWidth={'1px'} p={5} borderRadius={'lg'} borderColor={'gray.subtel'}>
//         <Text textAlign={'center'} fontSize={'sm'} color={'brand.secondary'}>
//           Best way to reach me is through:{' '}
//           <CNLink
//             _hover={{ color: 'brand' }}
//             color={'brand.secondary'}
//             _focus={{ boxShadow: 'none' }}
//             href={siteConfig.contact.emailHref}
//           >
//             {siteConfig.contact.email}
//           </CNLink>
//         </Text>
//       </Box>
//     </Stack>
//   )
// }
// ai code testing
// 'use client'
// import { CNLink } from '@/components/chakra-next'
// import { siteConfig } from '@/libs/configs/site.config'
// import { projectsData } from '@/libs/data/project.data'
// import { worksData } from '@/libs/data/work.data'
// import {
//   Box,
//   Button,
//   Center,
//   Flex,
//   Heading,
//   HStack,
//   Separator,
//   SimpleGrid,
//   Stack,
//   Text,
// } from '@chakra-ui/react'
// import { IconType } from 'react-icons'
// import { AiOutlineOpenAI } from 'react-icons/ai'
// import {
//   BiLogoFirebase,
//   BiLogoFlask,
//   BiLogoMongodb,
//   BiLogoRedux,
//   BiLogoTailwindCss,
//   BiLogoTypescript,
// } from 'react-icons/bi'
// import {
//   FaAws,
//   FaCss3,
//   FaDocker,
//   FaGitAlt,
//   FaGithub,
//   FaHtml5,
//   FaLinkedin,
//   FaNodeJs,
//   FaPython,
//   FaReact,
// } from 'react-icons/fa'
// import { FaRegCalendarDays, FaXTwitter } from 'react-icons/fa6'
// import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
// import { IoLogoJavascript } from 'react-icons/io5'
// import { RiNextjsFill } from 'react-icons/ri'
// import {
//   SiExpress,
//   SiMui,
//   SiPrisma,
//   SiHuggingface, // Added Hugging Face icon
//   SiPytorch, // Added PyTorch icon
//   SiTensorflow, // Added TensorFlow icon
//   SiLangchain, // Added LangChain icon
// } from 'react-icons/si'
// export default function Home() {
//   return (
//     <>
//       <title>{siteConfig.profile.name}</title>
//       <meta name="description" content={siteConfig.profile.about} />
//       <meta name="keywords" content={siteConfig.profile.keywords.join(',')} />
//       <Flex
//         gap={4}
//         flexDirection={{
//           base: 'column',
//           lg: 'row',
//         }}
//       >
//         <Box
//           width={{
//             base: '100%',
//             lg: '40%',
//           }}
//         >
//           <About />
//         </Box>
//         <Stack gap={10} flex={1}>
//           <TechStack />
//           <Projects />
//           <Work />
//           <Contact />
//         </Stack>
//       </Flex>
//     </>
//   )
// }
// const About = () => {
//   const socials: {
//     Icon: IconType
//     href: string
//     title: string
//   }[] = [
//     {
//       Icon: FaGithub,
//       href: siteConfig.social.githubHref,
//       title: 'Github',
//     },
//     {
//       Icon: FaXTwitter,
//       href: siteConfig.social.twitterHref,
//       title: 'Twitter',
//     },
//     {
//       Icon: FaLinkedin,
//       href: siteConfig.social.linkedinHref,
//       title: 'LinkedIn',
//     },
//   ]
//   return (
//     <Stack
//       p={6}
//       gap={4}
//       borderWidth="1px"
//       borderColor="gray.subtel"
//       borderRadius="md"
//       height={'fit-content'}
//       position={{ md: 'sticky' }}
//       top={{ md: 24 }}
//     >
//       <Heading as={'h1'} fontSize={'xl'} color={'brand'}>
//         {siteConfig.profile.name}
//       </Heading>
//       <Text fontSize={'sm'} color={'brand.secondary'}>
//         {siteConfig.profile.about}
//       </Text>
//       <Center>
//         {socials.map((item) => (
//           <Button key={item.title} variant={'outline'} p={2} borderRadius={'full'} border={0}>
//             <CNLink href={item.href} color={'Brand'}>
//               <item.Icon />
//             </CNLink>
//           </Button>
//         ))}
//       </Center>
//       <Flex direction={'column'} gap={4} justifyContent={'space-between'}>
//         <Flex justifyContent={'space-between'} gap={2}>
//           <Flex direction="column" flex={1}>
//             <Heading as="h3" fontSize="sm" fontWeight="bold" lineHeight="short">
//               {siteConfig.profile.experience}
//             </Heading>
//             <Text fontSize="xs" color="brand.secondary">
//               Experience
//             </Text>
//           </Flex>
//           <Flex direction="column" flex={1} textAlign={'right'}>
//             <Heading as="h3" fontSize="sm" fontWeight="bold" lineHeight="short">
//               {siteConfig.profile.location}
//             </Heading>
//             <Text fontSize="xs" color="brand.secondary">
//               Location
//             </Text>
//           </Flex>
//         </Flex>
//         <Button borderRadius={'md'}>
//           <IoMdCheckmarkCircleOutline />
//           Hire me
//         </Button>
//       </Flex>
//     </Stack>
//   )
// }
// const TechStack = () => {
//   const items = [
//     { name: 'TypeScript', badge: <BiLogoTypescript /> },
//     { name: 'JavaScript', badge: <IoLogoJavascript /> },
//     { name: 'React', badge: <FaReact /> },
//     { name: 'Next', badge: <RiNextjsFill /> },
//     { name: 'Tailwind', badge: <BiLogoTailwindCss /> },
//     { name: 'Redux', badge: <BiLogoRedux /> },
//     { name: 'Flask', badge: <BiLogoFlask /> },
//     { name: 'HTML5', badge: <FaHtml5 /> },
//     { name: 'CSS3', badge: <FaCss3 /> },
//     { name: 'Node', badge: <FaNodeJs /> },
//     { name: 'Express', badge: <SiExpress /> },
//     { name: 'Python', badge: <FaPython /> },
//     { name: 'MongoDB', badge: <BiLogoMongodb /> },
//     { name: 'AWS', badge: <FaAws /> },
//     // Generative AI Tech Stack Additions
//     { name: 'OpenAI', badge: <AiOutlineOpenAI /> },
//     { name: 'Hugging Face', badge: <SiHuggingface /> },
//     { name: 'PyTorch', badge: <SiPytorch /> },
//     { name: 'TensorFlow', badge: <SiTensorflow /> },
//     { name: 'LangChain', badge: <SiLangchain /> },
//     // End Generative AI Tech Stack Additions
//     { name: 'Firebase', badge: <BiLogoFirebase /> },
//     { name: 'Git', badge: <FaGitAlt /> },
//     { name: 'Docker', badge: <FaDocker /> },
//     { name: 'Prisma', badge: <SiPrisma /> },
//     { name: 'MUI', badge: <SiMui /> },
//   ]
//   return (
//     <Stack gap={4} id="home">
//       <Heading as={'h2'} fontSize={'xl'} color={'brand'}>
//         Tech Stack
//       </Heading>
//       <SimpleGrid columns={{ base: 2, sm: 3 }} gap={4}>
//         {items.map((tech, index) => {
//           return (
//             <Button
//               key={index}
//               variant={'outline'}
//               _hover={{ bg: 'brand.muted' }}
//               color={'brand'}
//               borderColor={'gray.subtel'}
//             >
//               {tech.badge}
//               {tech.name}
//             </Button>
//           )
//         })}
//       </SimpleGrid>
//     </Stack>
//   )
// }
// const Projects = () => {
//   return (
//     <Stack gap={4} id="projects">
//       <Heading as={'h2'} fontSize={'2xl'} color={'brand'}>
//         Projects
//       </Heading>
//       {projectsData.map((project, index) => {
//         return (
//           <CNLink
//             key={index}
//             href={project.href}
//             borderWidth={'1px'}
//             borderColor={'gray.subtel'}
//             _focus={{
//               textDecoration: 'none',
//               boxShadow: 'none',
//               borderColor: 'brand.emphasized',
//               border: 'none',
//             }}
//             borderRadius={'md'}
//             p={6}
//             _hover={{ textDecoration: 'none', bgColor: 'brand.muted' }}
//             target="_blank"
//           >
//             <Stack alignItems="start">
//               <Heading as="h3" fontSize="lg" color={'brand'} fontWeight="bold" textAlign="start">
//                 {project.title}
//               </Heading>
//               <Text color="brand.secondary" fontSize={'sm'}>
//                 {project.description}
//               </Text>
//             </Stack>
//           </CNLink>
//         )
//       })}
//     </Stack>
//   )
// }
// const Work = () => {
//   return (
//     <Stack gap={4} id="work">
//       <Heading as={'h2'} fontSize={'2xl'} color={'brand'}>
//         Work
//       </Heading>
//       <Stack
//         gap={5}
//         p={6}
//         borderWidth={'1px'}
//         borderColor={'gray.subtel'}
//         borderRadius={'lg'}
//         separator={<Separator opacity={1} color={'brand'} />}
//       >
//         {worksData.map((work, index) => {
//           return (
//             <Stack gap={4} key={index} direction="column">
//               <Flex justify={'space-between'} alignItems={'end'}>
//                 <Heading as="h3" fontSize="lg" color={'brand'} fontWeight="bold" textAlign="start">
//                   {work.company}
//                 </Heading>
//                 <HStack borderWidth={'1px'} p={2} borderRadius={'lg'} borderColor={'gray.subtel'}>
//                   <FaRegCalendarDays size={14} />
//                   <Text fontSize={'xs'} color={'brand'}>
//                     {work.fromDate} - {work.toDate}
//                   </Text>
//                 </HStack>
//               </Flex>
//               <Stack
//                 fontSize={'sm'}
//                 color={'brand.secondary'}
//                 as={'ul'}
//                 listStyleType={'disc'}
//                 ml={4}
//               >
//                 {work.deliverable.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </Stack>
//             </Stack>
//           )
//         })}
//       </Stack>
//     </Stack>
//   )
// }
// const Contact = () => {
//   return (
//     <Stack gap={6} marginBottom={10} id="contact">
//       <Heading as={'h2'} fontSize={{ base: 'xl', md: '2xl' }} color={'brand'}>
//         Contact
//       </Heading>
//       <Box borderWidth={'1px'} p={5} borderRadius={'lg'} borderColor={'gray.subtel'}>
//         <Text textAlign={'center'} fontSize={'sm'} color={'brand.secondary'}>
//           Best way to reach me is through:{' '}
//           <CNLink
//             _hover={{ color: 'brand' }}
//             color={'brand.secondary'}
//             _focus={{ boxShadow: 'none' }}
//             href={siteConfig.contact.emailHref}
//           >
//             {siteConfig.contact.email}
//           </CNLink>
//         </Text>
//       </Box>
//     </Stack>
//   )
// }
// another ai code testing
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chakra$2d$next$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/chakra-next.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/libs/configs/site.config.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$data$2f$project$2e$data$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/libs/data/project.data.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$data$2f$work$2e$data$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/libs/data/work.data.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$flex$2f$flex$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/flex/flex.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$box$2f$box$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/box/box.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/stack/stack.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa6/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/typography/heading.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$text$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/typography/text.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$center$2f$center$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/center/center.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$button$2f$button$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/button/button.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/io/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/bi/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/io5/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/ri/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/si/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/ai/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$grid$2f$simple$2d$grid$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/grid/simple-grid.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$separator$2f$separator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/separator/separator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$h$2d$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@chakra-ui/react/dist/esm/components/stack/h-stack.js [client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].profile.name
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 708,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "description",
                content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].profile.about
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 709,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "keywords",
                content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].profile.keywords.join(',')
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 710,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$flex$2f$flex$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                gap: 4,
                flexDirection: {
                    base: 'column',
                    lg: 'row'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$box$2f$box$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                        width: {
                            base: '100%',
                            lg: '40%'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(About, {}, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 724,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 718,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
                        gap: 10,
                        flex: 1,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TechStack, {}, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 727,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Projects, {}, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 728,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Work, {}, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 729,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Contact, {}, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 730,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 726,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 711,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = Home;
const About = ()=>{
    const socials = [
        {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaGithub"],
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].social.githubHref,
            title: 'Github'
        },
        {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaXTwitter"],
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].social.twitterHref,
            title: 'Twitter'
        },
        {
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaLinkedin"],
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].social.linkedinHref,
            title: 'LinkedIn'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
        p: 6,
        gap: 4,
        borderWidth: "1px",
        borderColor: "gray.subtel",
        borderRadius: "md",
        height: 'fit-content',
        position: {
            md: 'sticky'
        },
        top: {
            md: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Heading"], {
                as: 'h1',
                fontSize: 'xl',
                color: 'brand',
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].profile.name
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 770,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$text$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                fontSize: 'sm',
                color: 'brand.secondary',
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].profile.about
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 773,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$center$2f$center$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Center"], {
                children: socials.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$button$2f$button$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: 'outline',
                        p: 2,
                        borderRadius: 'full',
                        border: 0,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chakra$2d$next$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CNLink"], {
                            href: item.href,
                            color: 'Brand',
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.Icon, {}, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 780,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 779,
                            columnNumber: 13
                        }, this)
                    }, item.title, false, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 778,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 776,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$flex$2f$flex$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                direction: 'column',
                gap: 4,
                justifyContent: 'space-between',
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$flex$2f$flex$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                        justifyContent: 'space-between',
                        gap: 2,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$flex$2f$flex$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                                direction: "column",
                                flex: 1,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Heading"], {
                                        as: "h3",
                                        fontSize: "sm",
                                        fontWeight: "bold",
                                        lineHeight: "short",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].profile.experience
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.tsx",
                                        lineNumber: 788,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$text$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                        fontSize: "xs",
                                        color: "brand.secondary",
                                        children: "Experience"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.tsx",
                                        lineNumber: 791,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 787,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$flex$2f$flex$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                                direction: "column",
                                flex: 1,
                                textAlign: 'right',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Heading"], {
                                        as: "h3",
                                        fontSize: "sm",
                                        fontWeight: "bold",
                                        lineHeight: "short",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].profile.location
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.tsx",
                                        lineNumber: 796,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$text$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                        fontSize: "xs",
                                        color: "brand.secondary",
                                        children: "Location"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.tsx",
                                        lineNumber: 799,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 795,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 786,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$button$2f$button$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                        borderRadius: 'md',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["IoMdCheckmarkCircleOutline"], {}, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 805,
                                columnNumber: 11
                            }, this),
                            "Hire me"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 804,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 785,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.tsx",
        lineNumber: 760,
        columnNumber: 5
    }, this);
};
_c1 = About;
const TechStack = ()=>{
    const items = [
        {
            name: 'TypeScript',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BiLogoTypescript"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 815,
                columnNumber: 34
            }, this)
        },
        {
            name: 'JavaScript',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["IoLogoJavascript"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 816,
                columnNumber: 34
            }, this)
        },
        {
            name: 'React',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaReact"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 817,
                columnNumber: 29
            }, this)
        },
        {
            name: 'Next',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["RiNextjsFill"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 818,
                columnNumber: 28
            }, this)
        },
        {
            name: 'Tailwind',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BiLogoTailwindCss"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 819,
                columnNumber: 32
            }, this)
        },
        {
            name: 'Redux',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BiLogoRedux"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 820,
                columnNumber: 29
            }, this)
        },
        {
            name: 'Flask',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BiLogoFlask"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 821,
                columnNumber: 29
            }, this)
        },
        {
            name: 'HTML5',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaHtml5"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 822,
                columnNumber: 29
            }, this)
        },
        {
            name: 'CSS3',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaCss3"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 823,
                columnNumber: 28
            }, this)
        },
        {
            name: 'Node',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaNodeJs"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 824,
                columnNumber: 28
            }, this)
        },
        {
            name: 'Express',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["SiExpress"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 825,
                columnNumber: 31
            }, this)
        },
        {
            name: 'Python',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaPython"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 826,
                columnNumber: 30
            }, this)
        },
        {
            name: 'MongoDB',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BiLogoMongodb"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 827,
                columnNumber: 31
            }, this)
        },
        {
            name: 'AWS',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaAws"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 828,
                columnNumber: 27
            }, this)
        },
        {
            name: 'Firebase',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BiLogoFirebase"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 829,
                columnNumber: 32
            }, this)
        },
        {
            name: 'Git',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaGitAlt"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 830,
                columnNumber: 27
            }, this)
        },
        {
            name: 'Docker',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaDocker"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 831,
                columnNumber: 30
            }, this)
        },
        {
            name: 'Prisma',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$si$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["SiPrisma"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 832,
                columnNumber: 30
            }, this)
        },
        // { name: 'MUI', badge: <SiMui /> },
        // New General Development Tech Stack Additions
        {
            name: 'PostgreSQL',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BiLogoPostgresql"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 835,
                columnNumber: 34
            }, this)
        },
        {
            name: 'Kubernetes',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BiLogoKubernetes"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 836,
                columnNumber: 34
            }, this)
        },
        // { name: 'GCP', badge: <SiGooglecloud /> }, // General Cloud Provider
        // Generative AI Tech Stack Additions
        {
            name: 'OpenAI',
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AiOutlineOpenAI"], {}, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 839,
                columnNumber: 30
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
        gap: 4,
        id: "home",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Heading"], {
                as: 'h2',
                fontSize: 'xl',
                color: 'brand',
                children: "Tech Stack"
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 850,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$grid$2f$simple$2d$grid$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SimpleGrid"], {
                columns: {
                    base: 2,
                    sm: 3
                },
                gap: 4,
                children: items.map((tech, index)=>{
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$button$2f$button$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: 'outline',
                        _hover: {
                            bg: 'brand.muted'
                        },
                        color: 'brand',
                        borderColor: 'gray.subtel',
                        children: [
                            tech.badge,
                            tech.name
                        ]
                    }, index, true, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 856,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 853,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.tsx",
        lineNumber: 849,
        columnNumber: 5
    }, this);
};
_c2 = TechStack;
const Projects = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
        gap: 4,
        id: "projects",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Heading"], {
                as: 'h2',
                fontSize: '2xl',
                color: 'brand',
                children: "Projects"
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 876,
                columnNumber: 7
            }, this),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$data$2f$project$2e$data$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["projectsData"].map((project, index)=>{
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chakra$2d$next$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CNLink"], {
                    href: project.href,
                    borderWidth: '1px',
                    borderColor: 'gray.subtel',
                    _focus: {
                        textDecoration: 'none',
                        boxShadow: 'none',
                        borderColor: 'brand.emphasized',
                        border: 'none'
                    },
                    borderRadius: 'md',
                    p: 6,
                    _hover: {
                        textDecoration: 'none',
                        bgColor: 'brand.muted'
                    },
                    target: "_blank",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
                        alignItems: "start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Heading"], {
                                as: "h3",
                                fontSize: "lg",
                                color: 'brand',
                                fontWeight: "bold",
                                textAlign: "start",
                                children: project.title
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 898,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$text$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                color: "brand.secondary",
                                fontSize: 'sm',
                                children: project.description
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 901,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 897,
                        columnNumber: 13
                    }, this)
                }, index, false, {
                    fileName: "[project]/src/pages/index.tsx",
                    lineNumber: 881,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.tsx",
        lineNumber: 875,
        columnNumber: 5
    }, this);
};
_c3 = Projects;
const Work = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
        gap: 4,
        id: "work",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Heading"], {
                as: 'h2',
                fontSize: '2xl',
                color: 'brand',
                children: "Work"
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 915,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
                gap: 5,
                p: 6,
                borderWidth: '1px',
                borderColor: 'gray.subtel',
                borderRadius: 'lg',
                separator: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$separator$2f$separator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Separator"], {
                    opacity: 1,
                    color: 'brand'
                }, void 0, false, {
                    fileName: "[project]/src/pages/index.tsx",
                    lineNumber: 924,
                    columnNumber: 20
                }, void 0),
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$data$2f$work$2e$data$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["worksData"].map((work, index)=>{
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
                        gap: 4,
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$flex$2f$flex$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Flex"], {
                                justify: 'space-between',
                                alignItems: 'end',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Heading"], {
                                        as: "h3",
                                        fontSize: "lg",
                                        color: 'brand',
                                        fontWeight: "bold",
                                        textAlign: "start",
                                        children: work.company
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/index.tsx",
                                        lineNumber: 930,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$h$2d$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["HStack"], {
                                        borderWidth: '1px',
                                        p: 2,
                                        borderRadius: 'lg',
                                        borderColor: 'gray.subtel',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaRegCalendarDays"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/index.tsx",
                                                lineNumber: 934,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$text$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                                                fontSize: 'xs',
                                                color: 'brand',
                                                children: [
                                                    work.fromDate,
                                                    " - ",
                                                    work.toDate
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/index.tsx",
                                                lineNumber: 935,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/index.tsx",
                                        lineNumber: 933,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 929,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
                                fontSize: 'sm',
                                color: 'brand.secondary',
                                as: 'ul',
                                listStyleType: 'disc',
                                ml: 4,
                                children: work.deliverable.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: item
                                    }, index, false, {
                                        fileName: "[project]/src/pages/index.tsx",
                                        lineNumber: 948,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/index.tsx",
                                lineNumber: 940,
                                columnNumber: 15
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/src/pages/index.tsx",
                        lineNumber: 928,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 918,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.tsx",
        lineNumber: 914,
        columnNumber: 5
    }, this);
};
_c4 = Work;
const Contact = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$stack$2f$stack$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Stack"], {
        gap: 6,
        marginBottom: 10,
        id: "contact",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$heading$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Heading"], {
                as: 'h2',
                fontSize: {
                    base: 'xl',
                    md: '2xl'
                },
                color: 'brand',
                children: "Contact"
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 962,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$box$2f$box$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Box"], {
                borderWidth: '1px',
                p: 5,
                borderRadius: 'lg',
                borderColor: 'gray.subtel',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chakra$2d$ui$2f$react$2f$dist$2f$esm$2f$components$2f$typography$2f$text$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Text"], {
                    textAlign: 'center',
                    fontSize: 'sm',
                    color: 'brand.secondary',
                    children: [
                        "Best way to reach me is through:",
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chakra$2d$next$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CNLink"], {
                            _hover: {
                                color: 'brand'
                            },
                            color: 'brand.secondary',
                            _focus: {
                                boxShadow: 'none'
                            },
                            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].contact.emailHref,
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$configs$2f$site$2e$config$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["siteConfig"].contact.email
                        }, void 0, false, {
                            fileName: "[project]/src/pages/index.tsx",
                            lineNumber: 968,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/index.tsx",
                    lineNumber: 966,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/index.tsx",
                lineNumber: 965,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.tsx",
        lineNumber: 961,
        columnNumber: 5
    }, this);
};
_c5 = Contact;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_refresh__.register(_c, "Home");
__turbopack_refresh__.register(_c1, "About");
__turbopack_refresh__.register(_c2, "TechStack");
__turbopack_refresh__.register(_c3, "Projects");
__turbopack_refresh__.register(_c4, "Work");
__turbopack_refresh__.register(_c5, "Contact");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/src/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/src/pages/index (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__8a05e7._.js.map