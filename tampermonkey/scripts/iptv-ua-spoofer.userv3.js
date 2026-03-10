// ==UserScript==
// @name         TV UA Faker
// @namespace    http://tampermonkey.net/
// @version      2.3.0
// @description  change browser to tv iptv. move button fix.
// @author       dev_guy
// @match        *://*/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function () {
    'use strict';

    const tvData = [
        {
            category: "Samsung",
            items: [
                { id: "s1", name: "Samsung Tizen 6.5", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 6.5) AppleWebKit/538.1 (KHTML, like Gecko) Version/6.5 NativeTV/6.5 TV Safari/538.1", platform: "Linux", res: [3840, 2160] },
                { id: "s2", name: "Samsung Tizen 5.0", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/5.0 NativeTV/5.0 TV Safari/538.1", platform: "Linux", res: [1920, 1080] },
                { id: "s3", name: "Samsung Tizen 4.0", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 4.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/4.0 NativeTV/4.0 TV Safari/538.1", platform: "Linux", res: [1920, 1080] },
                { id: "s4", name: "Samsung Tizen 3.0", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 3.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/3.0 NativeTV/3.0 TV Safari/538.1", platform: "Linux", res: [1920, 1080] },
                { id: "s5", name: "Samsung Orsay Old", ua: "Mozilla/5.0 (SmartHub; SMART-TV; U; Linux/SmartTV) AppleWebKit/531.2+ (KHTML, like Gecko) WebBrowser/1.0 SmartTV Safari/531.2+", platform: "Linux", res: [1280, 720] }
            ]
        },
        {
            category: "LG",
            items: [
                { id: "l1", name: "LG WebOS 6.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 WebAppManager", platform: "Linux", res: [3840, 2160] },
                { id: "l2", name: "LG WebOS 5.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 WebAppManager", platform: "Linux", res: [3840, 2160] },
                { id: "l3", name: "LG WebOS 4.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.34 Safari/537.36 WebAppManager", platform: "Linux", res: [1920, 1080] },
                { id: "l4", name: "LG WebOS 3.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 WebAppManager", platform: "Linux", res: [1920, 1080] },
                { id: "l5", name: "LG NetCast", ua: "Mozilla/5.0 (DirectFB; Linux; U; RV: 1.9.2.4) Gecko/20100908", platform: "Linux", res: [1280, 720] }
            ]
        },
        {
            category: "Android & Google",
            items: [
                { id: "a1", name: "Android TV 11", ua: "Mozilla/5.0 (Linux; Android 11; BRAVIA VH2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "a2", name: "Nvidia Shield", ua: "Mozilla/5.0 (Linux; Android 9; SHIELD Android TV Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "a3", name: "Sony Bravia Android", ua: "Mozilla/5.0 (Linux; Android 8.0.0; BRAVIA 4K UR2 Build/OPR2.170623.027) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "a4", name: "Xiaomi Mi Box S", ua: "Mozilla/5.0 (Linux; Android 9; MIBOX4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36", platform: "Linux armv8l", res: [1920, 1080] },
                { id: "a5", name: "Chromecast Google TV", ua: "Mozilla/5.0 (Linux; Android 10; Chromecast) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "a6", name: "TiVo Stream 4K", ua: "Mozilla/5.0 (Linux; Android 9; TiVo Stream 4K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "a7", name: "Onn 4K Pro", ua: "Mozilla/5.0 (Linux; Android 12; onn. 4K Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] }
            ]
        },
        {
            category: "Fire TV",
            items: [
                { id: "f1", name: "Fire TV Stick 4K Max", ua: "Mozilla/5.0 (Linux; Android 9; AFTKA Build/PS7273) AppleWebKit/537.36 (KHTML, like Gecko) Silk/92.2.1 like Chrome/92.0.4515.131 Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "f2", name: "Fire TV Stick 4K", ua: "Mozilla/5.0 (Linux; Android 7.1.2; AFTMM Build/NS6265) AppleWebKit/537.36 (KHTML, like Gecko) Silk/81.2.2 like Chrome/81.0.4044.138 Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "f3", name: "Fire TV Cube", ua: "Mozilla/5.0 (Linux; Android 9; AFTR Build/PS7229) AppleWebKit/537.36 (KHTML, like Gecko) Silk/86.3.20 like Chrome/86.0.4240.198 Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "f4", name: "Fire OS 5 Old", ua: "Mozilla/5.0 (Linux; Android 5.1.1; AFTT Build/LVY48F) AppleWebKit/537.36 (KHTML, like Gecko) Silk/60.2.82 like Chrome/60.0.3112.114 Safari/537.36", platform: "Linux armv7l", res: [1920, 1080] },
                { id: "f5", name: "Amazon Echo Show", ua: "Mozilla/5.0 (Linux; Android 5.1.1; Echo Show Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Silk/53.3.5 like Chrome/53.0.2785.134 Safari/537.36", platform: "Linux", res: [1280, 800] }
            ]
        },
        {
            category: "Apple TV",
            items: [
                { id: "ap1", name: "Apple TV 4K", ua: "AppleCoreMedia/1.0.0.19J346 (Apple TV; U; CPU OS 15_0 like Mac OS X; en_us)", platform: "MacIntel", res: [3840, 2160] },
                { id: "ap2", name: "Apple TV HD", ua: "AppleCoreMedia/1.0.0.18J386 (Apple TV; U; CPU OS 14_0 like Mac OS X; en_us)", platform: "MacIntel", res: [1920, 1080] },
                { id: "ap3", name: "Apple TV 3rd Gen", ua: "AppleTV/7.2.2 (AppleTV3,1)", platform: "MacIntel", res: [1920, 1080] },
                { id: "ap4", name: "Apple TV 2nd Gen", ua: "AppleTV/6.1.1 (AppleTV2,1)", platform: "MacIntel", res: [1280, 720] },
                { id: "ap5", name: "Apple TV Safari", ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15 AppleTV/tvOS", platform: "MacIntel", res: [3840, 2160] }
            ]
        },
        {
            category: "Roku",
            items: [
                { id: "r1", name: "Roku Ultra", ua: "Roku4640X/DVP-9.40 (299.40E04200A)", platform: "Linux", res: [3840, 2160] },
                { id: "r2", name: "Roku Stick+", ua: "Roku3810X/DVP-9.30 (509.30E04194A)", platform: "Linux", res: [3840, 2160] },
                { id: "r3", name: "Roku Premiere", ua: "Roku3920X/DVP-9.20 (919.20E04111A)", platform: "Linux", res: [3840, 2160] },
                { id: "r4", name: "Roku Express", ua: "Roku3900X/DVP-9.10 (519.10E04111A)", platform: "Linux", res: [1920, 1080] },
                { id: "r5", name: "Roku TV TCL", ua: "Roku8000X/DVP-10.00 (10.00E04195A)", platform: "Linux", res: [3840, 2160] }
            ]
        },
        {
            category: "Consoles",
            items: [
                { id: "c1", name: "PS5", ua: "Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15", platform: "PlayStation", res: [3840, 2160] },
                { id: "c2", name: "PS4", ua: "Mozilla/5.0 (PlayStation 4 8.03) AppleWebKit/605.1.15 (KHTML, like Gecko)", platform: "PlayStation", res: [1920, 1080] },
                { id: "c3", name: "Xbox Series X", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edge/92.0.902.67", platform: "Win32", res: [3840, 2160] },
                { id: "c4", name: "Xbox One", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 Edge/40.15063.0.0", platform: "Win32", res: [1920, 1080] }
            ]
        },
        {
            category: "IPTV Boxes",
            items: [
                { id: "i1", name: "MAG 322", ua: "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 4 rev: 2723 Mobile Safari/533.3", platform: "Linux", res: [1920, 1080] },
                { id: "i2", name: "MAG 254", ua: "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Mobile Safari/533.3", platform: "Linux", res: [1920, 1080] },
                { id: "i3", name: "Formuler Z8", ua: "Mozilla/5.0 (Linux; Android 8.0.0; Z8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36 Formuler", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "i4", name: "Enigma2", ua: "Enigma2/OpenATV/6.4 (Linux)", platform: "Linux", res: [1920, 1080] },
                { id: "i5", name: "DreamBox", ua: "Mozilla/5.0 (Linux; U; Android 4.2.2; de-de; DreamBox) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", platform: "Linux", res: [1920, 1080] },
                { id: "i6", name: "Xfinity X1", ua: "Mozilla/5.0 (Linux; x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 Xfinity/X1", platform: "Linux x86_64", res: [1920, 1080] }
            ]
        },
        {
            category: "Other TV",
            items: [
                { id: "o1", name: "Vizio SmartCast", ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 VIZIO/SmartCast", platform: "Linux x86_64", res: [3840, 2160] },
                { id: "o2", name: "Panasonic Viera", ua: "Mozilla/5.0 (X11; FreeBSD; U; Viera; en-US) AppleWebKit/537.11 (KHTML, like Gecko) Viera/3.6.4 Chrome/23.0.1271.97 Safari/537.11", platform: "FreeBSD", res: [1920, 1080] },
                { id: "o3", name: "Hisense", ua: "Mozilla/5.0 (Linux; SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.116 Safari/537.36 Hisense/VIDAA", platform: "Linux", res: [3840, 2160] },
                { id: "o4", name: "Chromecast Ultra", ua: "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 CrKey/1.49.250118", platform: "Linux aarch64", res: [3840, 2160] }
            ]
        },
        {
            category: "Players",
            items: [
                { id: "m1", name: "Kodi", ua: "Kodi/19.1 (Windows NT 10.0; Win64; x64) App_Bitness/64 Version/19.1-Git:20210508-85e05228b4", platform: "Win32", res: [1920, 1080] },
                { id: "m2", name: "VLC", ua: "VLC/3.0.16 LibVLC/3.0.16", platform: "Win32", res: [1920, 1080] },
                { id: "m3", name: "Plex", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) PlexMediaPlayer/2.58.0.2076 Chrome/80.0.3987.165 Safari/537.36", platform: "Win32", res: [1920, 1080] },
                { id: "m4", name: "Emby", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) EmbyTheater/3.0.15 Chrome/83.0.4103.122 Safari/537.36", platform: "Win32", res: [1920, 1080] }
            ]
        }
    ];

    let cfg = {
        nowId: GM_getValue('iptv_active_id', 's1'),
        myUas: GM_getValue('iptv_custom_uas', []),
        badSites: GM_getValue('iptv_disabled_sites', []),
        allOn: GM_getValue('iptv_global_enable', true),
        fakeRes: GM_getValue('iptv_spoof_resolution', true)
    };

    const host = window.location.hostname;
    const isWorking = cfg.allOn && !cfg.badSites.includes(host);

    function saveCfg() {
        GM_setValue('iptv_active_id', cfg.nowId);
        GM_setValue('iptv_custom_uas', cfg.myUas);
        GM_setValue('iptv_disabled_sites', cfg.badSites);
        GM_setValue('iptv_global_enable', cfg.allOn);
        GM_setValue('iptv_spoof_resolution', cfg.fakeRes);
    }

    function getNowUa() {
        for (let c of tvData) {
            let f = c.items.find(i => i.id === cfg.nowId);
            if (f) return f;
        }
        let f2 = cfg.myUas.find(i => i.id === cfg.nowId);
        if (f2) return f2;
        return tvData[0].items[0];
    }

    const setUa = getNowUa();

    if (isWorking) {
        const fakeVal = (obj, prop, val) => {
            try { Object.defineProperty(obj, prop, { get: () => val, configurable: true }); } catch (e) {}
        };

        fakeVal(navigator, 'userAgent', setUa.ua);
        fakeVal(navigator, 'appVersion', setUa.ua.replace(/^Mozilla\//, ''));
        fakeVal(navigator, 'platform', setUa.platform || 'Linux');

        if (cfg.fakeRes && setUa.res) {
            const [w, h] = setUa.res;
            fakeVal(screen, 'width', w);
            fakeVal(screen, 'height', h);
            fakeVal(screen, 'availWidth', w);
            fakeVal(screen, 'availHeight', h);
            fakeVal(window, 'innerWidth', w);
            fakeVal(window, 'innerHeight', h);
        }

        const oldFetch = window.fetch;
        window.fetch = async function(req, opts = {}) {
            opts.headers = opts.headers || {};
            if (opts.headers instanceof Headers) {
                opts.headers.set('User-Agent', setUa.ua);
            } else if (Array.isArray(opts.headers)) {
                const idx = opts.headers.findIndex(h => h[0].toLowerCase() === 'user-agent');
                if (idx >= 0) opts.headers[idx][1] = setUa.ua;
                else opts.headers.push(['User-Agent', setUa.ua]);
            } else {
                opts.headers['User-Agent'] = setUa.ua;
            }
            return oldFetch.call(this, req, opts);
        };

        const oldXhr = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            oldXhr.apply(this, arguments);
            try { this.setRequestHeader('User-Agent', setUa.ua); } catch(e) {}
        };
    }

    function startBox() {
        if (document.getElementById('my-tv-faker-box')) return;

        const box = document.createElement('div');
        box.id = 'my-tv-faker-box';
        box.style.cssText = 'position: fixed; z-index: 2147483647; top: 0; left: 0; width: 0; height: 0; overflow: visible;';
        document.body.appendChild(box);

        const sd = box.attachShadow({ mode: 'open' });

        const styles = `
            :host { --m: #6366f1; --bg: rgba(15, 23, 42, 0.75); --bg2: rgba(15, 23, 42, 0.95); --card: rgba(30, 41, 59, 0.8); --b: rgba(255, 255, 255, 0.1); --txt: #f8fafc; --gr: #94a3b8; --red: #ef4444; --gn: #10b981; font-family: sans-serif; }
            * { box-sizing: border-box; }
            .btn-f { position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; background: var(--bg); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid var(--b); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: grab; box-shadow: 0 4px 15px rgba(0,0,0,0.5); user-select: none; -webkit-tap-highlight-color: transparent; }
            .btn-f:active { cursor: grabbing; transform: scale(0.9); }
            .btn-f svg { width: 22px; height: 22px; fill: none; stroke: var(--m); stroke-width: 2; pointer-events: none; }
            .win { position: fixed; top: 50%; left: 50%; width: 90vw; max-width: 380px; height: 85vh; max-height: 580px; background: var(--bg2); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid var(--b); border-radius: 12px; box-shadow: 0 15px 30px rgba(0,0,0,0.6); display: flex; flex-direction: column; opacity: 0; pointer-events: none; transform: translate(-50%, -50%) scale(0.9); transition: all 0.2s; overflow: hidden; }
            .win.show { opacity: 1; pointer-events: auto; transform: translate(-50%, -50%) scale(1); }
            .top { padding: 12px; border-bottom: 1px solid var(--b); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); }
            .top h2 { margin: 0; font-size: 15px; color: var(--txt); }
            .top p { margin: 2px 0 0 0; font-size: 11px; color: var(--gr); }
            .t-btns { display: flex; gap: 10px; align-items: center; }
            .x-btn { background: none; border: none; color: var(--gr); padding: 5px; cursor: pointer; display: flex; }
            .x-btn svg { width: 18px; height: 18px; fill: currentColor; }
            .menus { display: flex; border-bottom: 1px solid var(--b); }
            .menu { flex: 1; padding: 12px 0; text-align: center; color: var(--gr); font-size: 13px; cursor: pointer; -webkit-tap-highlight-color: transparent; }
            .menu.on { color: var(--m); box-shadow: inset 0 -2px 0 var(--m); }
            .main { flex: 1; overflow-y: auto; padding-bottom: 20px; }
            .main::-webkit-scrollbar { width: 5px; }
            .main::-webkit-scrollbar-thumb { background: var(--b); }
            .page { display: none; padding: 15px; }
            .page.on { display: block; }
            .cat { font-size: 11px; color: var(--m); margin: 15px 0 5px 2px; font-weight: bold; }
            .itm { background: var(--card); border: 1px solid var(--b); border-radius: 8px; padding: 12px; margin-bottom: 8px; display: flex; flex-direction: column; gap: 5px; }
            .itm.now { border-color: var(--m); background: rgba(99, 102, 241, 0.1); }
            .i-top { display: flex; justify-content: space-between; align-items: center; }
            .i-name { font-size: 13px; color: var(--txt); cursor: pointer; flex: 1; }
            .i-btns { display: flex; gap: 5px; }
            .i-tag { font-size: 10px; color: var(--gr); display: flex; gap: 5px; }
            .tag { background: rgba(255,255,255,0.1); padding: 2px 5px; border-radius: 3px; }
            .grp { margin-bottom: 10px; }
            .grp label { display: block; font-size: 11px; color: var(--gr); margin-bottom: 3px; }
            .grp input, .grp textarea { width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--b); color: var(--txt); border-radius: 5px; padding: 10px; font-size: 16px; }
            .btn { width: 100%; padding: 12px; background: var(--m); color: #fff; border: none; border-radius: 5px; font-size: 13px; cursor: pointer; }
            .btn2 { background: none; border: 1px solid var(--b); margin-top: 8px; }
            .tog { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--card); border-radius: 8px; margin-bottom: 8px; border: 1px solid var(--b); }
            .tog span { font-size: 13px; color: var(--txt); }
            .sw { position: relative; display: inline-block; width: 40px; height: 22px; }
            .sw input { opacity: 0; width: 0; height: 0; }
            .sl { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .2s; border-radius: 20px; }
            .sl:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: #fff; transition: .2s; border-radius: 50%; }
            input:checked + .sl { background-color: var(--gn); }
            input:checked + .sl:before { transform: translateX(18px); }
            .msg-box { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; gap: 8px; pointer-events: none; z-index: 999; }
            .msg { background: var(--gn); color: #fff; padding: 8px 15px; border-radius: 20px; font-size: 12px; animation: up 0.2s forwards, out 0.2s forwards 2s; }
            @keyframes up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes out { from { opacity: 1; } to { opacity: 0; } }
            .none { text-align: center; color: var(--gr); font-size: 12px; padding: 30px 0; }
        `;

        const ics = {
            t: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`,
            x: `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
            c: `<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
            d: `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`
        };

        sd.innerHTML = `
            <style>${styles}</style>
            <div class="btn-f" id="btnf">${ics.t}</div>
            <div class="win" id="win">
                <div class="top">
                    <div>
                        <h2>TV Faker</h2>
                        <p>${isWorking ? 'Working on ' + host : 'Off on ' + host}</p>
                    </div>
                    <div class="t-btns">
                        <label class="sw"><input type="checkbox" id="tg-site" ${isWorking ? 'checked' : ''}><span class="sl"></span></label>
                        <button class="x-btn" id="btnx">${ics.x}</button>
                    </div>
                </div>
                <div class="menus">
                    <div class="menu on" data-p="p1">List</div>
                    <div class="menu" data-p="p2">My UAs</div>
                    <div class="menu" data-p="p3">Settings</div>
                </div>
                <div class="main">
                    <div class="page on" id="p1"><div id="list1"></div></div>
                    <div class="page" id="p2">
                        <div style="margin-bottom: 20px;">
                            <div class="cat">Make New</div>
                            <div class="grp"><input type="text" id="in1" placeholder="Device Name"></div>
                            <div class="grp"><textarea id="in2" rows="2" placeholder="Mozilla/5.0..."></textarea></div>
                            <div style="display:flex; gap:10px;">
                                <div class="grp" style="flex:1;"><input type="text" id="in3" placeholder="Platform"></div>
                                <div class="grp" style="flex:1;"><input type="text" id="in4" placeholder="Size (1920x1080)"></div>
                            </div>
                            <button class="btn" id="btnsave">Save My UA</button>
                        </div>
                        <div class="cat">My Saved</div>
                        <div id="list2"></div>
                    </div>
                    <div class="page" id="p3">
                        <div class="cat">Main Settings</div>
                        <div class="tog"><span>All Sites On</span><label class="sw"><input type="checkbox" id="tg-all" ${cfg.allOn ? 'checked' : ''}><span class="sl"></span></label></div>
                        <div class="tog"><span>Fake Screen Size</span><label class="sw"><input type="checkbox" id="tg-res" ${cfg.fakeRes ? 'checked' : ''}><span class="sl"></span></label></div>
                        <div class="cat">Backup</div>
                        <button class="btn btn2" id="ex">Export File</button>
                        <button class="btn btn2" id="im">Import File</button>
                        <input type="file" id="f" style="display:none;">
                    </div>
                </div>
                <div class="msg-box" id="msgb"></div>
            </div>
        `;

        const btnf = sd.getElementById('btnf');
        const win = sd.getElementById('win');
        const msgb = sd.getElementById('msgb');

        const showM = (txt) => {
            const d = document.createElement('div'); d.className = 'msg'; d.innerText = txt;
            msgb.appendChild(d); setTimeout(() => d.remove(), 2500);
        };

        const mkHtml = (o, isC) => `
            <div class="itm ${cfg.nowId === o.id ? 'now' : ''}">
                <div class="i-top">
                    <div class="i-name" data-id="${o.id}">${o.name}</div>
                    <div class="i-btns">
                        <button class="x-btn cp" data-ua="${o.ua}">${ics.c}</button>
                        ${isC ? `<button class="x-btn dl" data-id="${o.id}" style="color:var(--red)">${ics.d}</button>` : ''}
                    </div>
                </div>
                <div class="i-tag">
                    <span class="tag">${o.platform || '?'}</span>
                    ${o.res ? `<span class="tag">${o.res[0]}x${o.res[1]}</span>` : ''}
                </div>
            </div>
        `;

        sd.getElementById('list1').innerHTML = tvData.map(c => `<div class="cat">${c.category}</div>` + c.items.map(i => mkHtml(i, false)).join('')).join('');
        
        const showMy = () => {
            sd.getElementById('list2').innerHTML = cfg.myUas.length ? cfg.myUas.map(i => mkHtml(i, true)).join('') : `<div class="none">No items.</div>`;
        }; showMy();

        const clickEvt = (e) => {
            if (e.target.closest('.cp')) { navigator.clipboard.writeText(e.target.closest('.cp').dataset.ua); return showM('Copied'); }
            if (e.target.closest('.dl')) {
                const id = e.target.closest('.dl').dataset.id;
                cfg.myUas = cfg.myUas.filter(i => i.id !== id);
                if (cfg.nowId === id) cfg.nowId = 's1';
                saveCfg(); showMy(); return showM('Deleted');
            }
            if (e.target.closest('.i-name')) {
                cfg.nowId = e.target.closest('.i-name').dataset.id;
                saveCfg(); window.location.reload();
            }
        };
        sd.getElementById('list1').addEventListener('click', clickEvt);
        sd.getElementById('list2').addEventListener('click', clickEvt);

        sd.getElementById('btnsave').addEventListener('click', () => {
            const n = sd.getElementById('in1').value, u = sd.getElementById('in2').value;
            if (!n || !u) return showM('pls put name and ua!');
            let r = null, rs = sd.getElementById('in4').value;
            if (rs.includes('x')) r = [parseInt(rs.split('x')[0]), parseInt(rs.split('x')[1])];
            cfg.myUas.push({ id: 'c' + Date.now(), name: n, ua: u, platform: sd.getElementById('in3').value || 'Linux', res: r });
            saveCfg(); showMy(); showM('Saved');
            sd.getElementById('in1').value = sd.getElementById('in2').value = sd.getElementById('in3').value = sd.getElementById('in4').value = '';
        });

        const menus = sd.querySelectorAll('.menu'), pages = sd.querySelectorAll('.page');
        menus.forEach(m => m.addEventListener('click', () => {
            menus.forEach(x => x.classList.remove('on')); pages.forEach(x => x.classList.remove('on'));
            m.classList.add('on'); sd.getElementById(m.dataset.p).classList.add('on');
        }));

        const setTog = (id, k, rld = true) => sd.getElementById(id).addEventListener('change', e => {
            if (k === 'badSites') { e.target.checked ? cfg[k] = cfg[k].filter(d => d !== host) : (!cfg[k].includes(host) && cfg[k].push(host)); }
            else { cfg[k] = e.target.checked; }
            saveCfg(); if(rld) window.location.reload();
        });
        setTog('tg-site', 'badSites'); setTog('tg-all', 'allOn'); setTog('tg-res', 'fakeRes');

        let isD = false, sx, sy, bl, bt;
        const dn = (e) => {
            isD = false;
            sx = e.touches ? e.touches[0].clientX : e.clientX;
            sy = e.touches ? e.touches[0].clientY : e.clientY;
            const r = btnf.getBoundingClientRect();
            bl = r.left; bt = r.top;
            
            btnf.style.left = `${bl}px`; 
            btnf.style.top = `${bt}px`;
            btnf.style.bottom = 'auto'; 
            btnf.style.right = 'auto';

            const mv = (me) => {
                const mx = me.touches ? me.touches[0].clientX : me.clientX;
                const my = me.touches ? me.touches[0].clientY : me.clientY;
                const dx = mx - sx, dy = my - sy;
                
                if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
                    isD = true;
                    btnf.style.left = `${Math.max(0, Math.min(bl + dx, window.innerWidth - 50))}px`; 
                    btnf.style.top = `${Math.max(0, Math.min(bt + dy, window.innerHeight - 50))}px`;
                }
            };
            const up = () => {
                document.removeEventListener('mousemove', mv); document.removeEventListener('touchmove', mv);
                document.removeEventListener('mouseup', up); document.removeEventListener('touchend', up);
                if (!isD) win.classList.toggle('show');
            };
            document.addEventListener('mousemove', mv); document.addEventListener('touchmove', mv, {passive: false});
            document.addEventListener('mouseup', up); document.addEventListener('touchend', up);
        };
        
        btnf.addEventListener('mousedown', dn); btnf.addEventListener('touchstart', dn, {passive: false});
        sd.getElementById('btnx').addEventListener('click', () => win.classList.remove('show'));
    }

    function doLoad() {
        if (document.body) { startBox(); } 
        else { requestAnimationFrame(doLoad); }
    }
    doLoad();

})();
