// ==UserScript==
// @name         Pro IPTV & Media Device UA Spoofer
// @namespace    http://tampermonkey.net/
// @version      2.2.0
// @description  Fixed Mobile-friendly User-Agent Spoofer. Features touch-draggable UI, custom UAs, per-site toggles, and resolution/platform spoofing.
// @author       Gemini
// @match        *://*/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function () {
    'use strict';

    // ==========================================
    // 1. DATA: Categorized Predefined UAs (50 Total)
    // ==========================================
    const PRESETS = [
        {
            category: "Smart TVs - Samsung Tizen",
            items: [
                { id: "p_sam_1", name: "Samsung Tizen 6.5", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 6.5) AppleWebKit/538.1 (KHTML, like Gecko) Version/6.5 NativeTV/6.5 TV Safari/538.1", platform: "Linux", res: [3840, 2160] },
                { id: "p_sam_2", name: "Samsung Tizen 5.0", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/5.0 NativeTV/5.0 TV Safari/538.1", platform: "Linux", res: [1920, 1080] },
                { id: "p_sam_3", name: "Samsung Tizen 4.0", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 4.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/4.0 NativeTV/4.0 TV Safari/538.1", platform: "Linux", res: [1920, 1080] },
                { id: "p_sam_4", name: "Samsung Tizen 3.0", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 3.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/3.0 NativeTV/3.0 TV Safari/538.1", platform: "Linux", res: [1920, 1080] },
                { id: "p_sam_5", name: "Samsung Orsay (Older)", ua: "Mozilla/5.0 (SmartHub; SMART-TV; U; Linux/SmartTV) AppleWebKit/531.2+ (KHTML, like Gecko) WebBrowser/1.0 SmartTV Safari/531.2+", platform: "Linux", res: [1280, 720] }
            ]
        },
        {
            category: "Smart TVs - LG WebOS",
            items: [
                { id: "p_lg_1", name: "LG WebOS 6.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 WebAppManager", platform: "Linux", res: [3840, 2160] },
                { id: "p_lg_2", name: "LG WebOS 5.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 WebAppManager", platform: "Linux", res: [3840, 2160] },
                { id: "p_lg_3", name: "LG WebOS 4.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.34 Safari/537.36 WebAppManager", platform: "Linux", res: [1920, 1080] },
                { id: "p_lg_4", name: "LG WebOS 3.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 WebAppManager", platform: "Linux", res: [1920, 1080] },
                { id: "p_lg_5", name: "LG NetCast", ua: "Mozilla/5.0 (DirectFB; Linux; U; RV: 1.9.2.4) Gecko/20100908", platform: "Linux", res: [1280, 720] }
            ]
        },
        {
            category: "Android TV & Google TV",
            items: [
                { id: "p_and_1", name: "Android TV 11 (Generic)", ua: "Mozilla/5.0 (Linux; Android 11; BRAVIA VH2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "p_and_2", name: "Nvidia Shield TV", ua: "Mozilla/5.0 (Linux; Android 9; SHIELD Android TV Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "p_and_3", name: "Sony Bravia Android TV", ua: "Mozilla/5.0 (Linux; Android 8.0.0; BRAVIA 4K UR2 Build/OPR2.170623.027) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "p_and_4", name: "Xiaomi Mi Box S", ua: "Mozilla/5.0 (Linux; Android 9; MIBOX4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36", platform: "Linux armv8l", res: [1920, 1080] },
                { id: "p_and_5", name: "Chromecast w/ Google TV", ua: "Mozilla/5.0 (Linux; Android 10; Chromecast) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "p_and_6", name: "TiVo Stream 4K", ua: "Mozilla/5.0 (Linux; Android 9; TiVo Stream 4K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "p_and_7", name: "Onn. 4K Pro", ua: "Mozilla/5.0 (Linux; Android 12; onn. 4K Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] }
            ]
        },
        {
            category: "Amazon Fire TV",
            items: [
                { id: "p_aft_1", name: "Fire TV Stick 4K Max", ua: "Mozilla/5.0 (Linux; Android 9; AFTKA Build/PS7273) AppleWebKit/537.36 (KHTML, like Gecko) Silk/92.2.1 like Chrome/92.0.4515.131 Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "p_aft_2", name: "Fire TV Stick 4K", ua: "Mozilla/5.0 (Linux; Android 7.1.2; AFTMM Build/NS6265) AppleWebKit/537.36 (KHTML, like Gecko) Silk/81.2.2 like Chrome/81.0.4044.138 Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "p_aft_3", name: "Fire TV Cube", ua: "Mozilla/5.0 (Linux; Android 9; AFTR Build/PS7229) AppleWebKit/537.36 (KHTML, like Gecko) Silk/86.3.20 like Chrome/86.0.4240.198 Safari/537.36", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "p_aft_4", name: "Fire OS 5 (Older)", ua: "Mozilla/5.0 (Linux; Android 5.1.1; AFTT Build/LVY48F) AppleWebKit/537.36 (KHTML, like Gecko) Silk/60.2.82 like Chrome/60.0.3112.114 Safari/537.36", platform: "Linux armv7l", res: [1920, 1080] },
                { id: "p_aft_5", name: "Amazon Echo Show", ua: "Mozilla/5.0 (Linux; Android 5.1.1; Echo Show Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Silk/53.3.5 like Chrome/53.0.2785.134 Safari/537.36", platform: "Linux", res: [1280, 800] }
            ]
        },
        {
            category: "Apple TV",
            items: [
                { id: "p_apl_1", name: "Apple TV 4K (tvOS 15)", ua: "AppleCoreMedia/1.0.0.19J346 (Apple TV; U; CPU OS 15_0 like Mac OS X; en_us)", platform: "MacIntel", res: [3840, 2160] },
                { id: "p_apl_2", name: "Apple TV HD (tvOS 14)", ua: "AppleCoreMedia/1.0.0.18J386 (Apple TV; U; CPU OS 14_0 like Mac OS X; en_us)", platform: "MacIntel", res: [1920, 1080] },
                { id: "p_apl_3", name: "Apple TV (3rd Gen)", ua: "AppleTV/7.2.2 (AppleTV3,1)", platform: "MacIntel", res: [1920, 1080] },
                { id: "p_apl_4", name: "Apple TV (2nd Gen)", ua: "AppleTV/6.1.1 (AppleTV2,1)", platform: "MacIntel", res: [1280, 720] },
                { id: "p_apl_5", name: "Apple TV Safari Fallback", ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15 AppleTV/tvOS", platform: "MacIntel", res: [3840, 2160] }
            ]
        },
        {
            category: "Roku",
            items: [
                { id: "p_rok_1", name: "Roku Ultra", ua: "Roku4640X/DVP-9.40 (299.40E04200A)", platform: "Linux", res: [3840, 2160] },
                { id: "p_rok_2", name: "Roku Streaming Stick+", ua: "Roku3810X/DVP-9.30 (509.30E04194A)", platform: "Linux", res: [3840, 2160] },
                { id: "p_rok_3", name: "Roku Premiere", ua: "Roku3920X/DVP-9.20 (919.20E04111A)", platform: "Linux", res: [3840, 2160] },
                { id: "p_rok_4", name: "Roku Express", ua: "Roku3900X/DVP-9.10 (519.10E04111A)", platform: "Linux", res: [1920, 1080] },
                { id: "p_rok_5", name: "Roku TV (TCL)", ua: "Roku8000X/DVP-10.00 (10.00E04195A)", platform: "Linux", res: [3840, 2160] }
            ]
        },
        {
            category: "Consoles (OTT Platform)",
            items: [
                { id: "p_con_1", name: "PlayStation 5", ua: "Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15", platform: "PlayStation", res: [3840, 2160] },
                { id: "p_con_2", name: "PlayStation 4", ua: "Mozilla/5.0 (PlayStation 4 8.03) AppleWebKit/605.1.15 (KHTML, like Gecko)", platform: "PlayStation", res: [1920, 1080] },
                { id: "p_con_3", name: "Xbox Series X", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edge/92.0.902.67", platform: "Win32", res: [3840, 2160] },
                { id: "p_con_4", name: "Xbox One", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 Edge/40.15063.0.0", platform: "Win32", res: [1920, 1080] }
            ]
        },
        {
            category: "Set-Top Boxes & IPTV",
            items: [
                { id: "p_stb_1", name: "MAG 322", ua: "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 4 rev: 2723 Mobile Safari/533.3", platform: "Linux", res: [1920, 1080] },
                { id: "p_stb_2", name: "MAG 254", ua: "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Mobile Safari/533.3", platform: "Linux", res: [1920, 1080] },
                { id: "p_stb_3", name: "Formuler Z8", ua: "Mozilla/5.0 (Linux; Android 8.0.0; Z8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36 Formuler", platform: "Linux armv8l", res: [3840, 2160] },
                { id: "p_stb_4", name: "Enigma2 (OpenATV)", ua: "Enigma2/OpenATV/6.4 (Linux)", platform: "Linux", res: [1920, 1080] },
                { id: "p_stb_5", name: "DreamBox", ua: "Mozilla/5.0 (Linux; U; Android 4.2.2; de-de; DreamBox) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", platform: "Linux", res: [1920, 1080] },
                { id: "p_stb_6", name: "Comcast Xfinity X1", ua: "Mozilla/5.0 (Linux; x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 Xfinity/X1", platform: "Linux x86_64", res: [1920, 1080] }
            ]
        },
        {
            category: "Other Smart TVs",
            items: [
                { id: "p_oth_1", name: "Vizio SmartCast", ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 VIZIO/SmartCast", platform: "Linux x86_64", res: [3840, 2160] },
                { id: "p_oth_2", name: "Panasonic Viera", ua: "Mozilla/5.0 (X11; FreeBSD; U; Viera; en-US) AppleWebKit/537.11 (KHTML, like Gecko) Viera/3.6.4 Chrome/23.0.1271.97 Safari/537.11", platform: "FreeBSD", res: [1920, 1080] },
                { id: "p_oth_3", name: "Hisense VIDAA", ua: "Mozilla/5.0 (Linux; SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.116 Safari/537.36 Hisense/VIDAA", platform: "Linux", res: [3840, 2160] },
                { id: "p_oth_4", name: "Chromecast Ultra", ua: "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 CrKey/1.49.250118", platform: "Linux aarch64", res: [3840, 2160] }
            ]
        },
        {
            category: "Media Players & HTPC",
            items: [
                { id: "p_med_1", name: "Kodi / XBMC", ua: "Kodi/19.1 (Windows NT 10.0; Win64; x64) App_Bitness/64 Version/19.1-Git:20210508-85e05228b4", platform: "Win32", res: [1920, 1080] },
                { id: "p_med_2", name: "VLC Media Player", ua: "VLC/3.0.16 LibVLC/3.0.16", platform: "Win32", res: [1920, 1080] },
                { id: "p_med_3", name: "Plex Media Player", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) PlexMediaPlayer/2.58.0.2076 Chrome/80.0.3987.165 Safari/537.36", platform: "Win32", res: [1920, 1080] },
                { id: "p_med_4", name: "Emby Theater", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) EmbyTheater/3.0.15 Chrome/83.0.4103.122 Safari/537.36", platform: "Win32", res: [1920, 1080] }
            ]
        }
    ];

    // ==========================================
    // 2. STATE MANAGEMENT
    // ==========================================
    let state = {
        activeId: GM_getValue('iptv_active_id', 'p_sam_1'),
        customUAs: GM_getValue('iptv_custom_uas', []),
        disabledSites: GM_getValue('iptv_disabled_sites', []),
        globalEnable: GM_getValue('iptv_global_enable', true),
        spoofResolution: GM_getValue('iptv_spoof_resolution', true)
    };

    const currentDomain = window.location.hostname;
    const isEnabledForSite = state.globalEnable && !state.disabledSites.includes(currentDomain);

    function saveState() {
        GM_setValue('iptv_active_id', state.activeId);
        GM_setValue('iptv_custom_uas', state.customUAs);
        GM_setValue('iptv_disabled_sites', state.disabledSites);
        GM_setValue('iptv_global_enable', state.globalEnable);
        GM_setValue('iptv_spoof_resolution', state.spoofResolution);
    }

    function getActiveUAData() {
        for (let cat of PRESETS) {
            let found = cat.items.find(i => i.id === state.activeId);
            if (found) return found;
        }
        let customFound = state.customUAs.find(i => i.id === state.activeId);
        if (customFound) return customFound;
        return PRESETS[0].items[0];
    }

    const activeUA = getActiveUAData();

    // ==========================================
    // 3. SPOOFING ENGINE (Runs Immediately)
    // ==========================================
    if (isEnabledForSite) {
        const spoofProp = (obj, prop, value) => {
            try { Object.defineProperty(obj, prop, { get: () => value, configurable: true }); } catch (e) {}
        };

        spoofProp(navigator, 'userAgent', activeUA.ua);
        spoofProp(navigator, 'appVersion', activeUA.ua.replace(/^Mozilla\//, ''));
        spoofProp(navigator, 'platform', activeUA.platform || 'Linux');

        if (state.spoofResolution && activeUA.res) {
            const [w, h] = activeUA.res;
            spoofProp(screen, 'width', w);
            spoofProp(screen, 'height', h);
            spoofProp(screen, 'availWidth', w);
            spoofProp(screen, 'availHeight', h);
            spoofProp(window, 'innerWidth', w);
            spoofProp(window, 'innerHeight', h);
        }

        const originalFetch = window.fetch;
        window.fetch = async function(resource, config = {}) {
            config.headers = config.headers || {};
            if (config.headers instanceof Headers) {
                config.headers.set('User-Agent', activeUA.ua);
            } else if (Array.isArray(config.headers)) {
                const index = config.headers.findIndex(h => h[0].toLowerCase() === 'user-agent');
                if (index >= 0) config.headers[index][1] = activeUA.ua;
                else config.headers.push(['User-Agent', activeUA.ua]);
            } else {
                config.headers['User-Agent'] = activeUA.ua;
            }
            return originalFetch.call(this, resource, config);
        };

        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            originalOpen.apply(this, arguments);
            try { this.setRequestHeader('User-Agent', activeUA.ua); } catch(e) {}
        };
    }

    // ==========================================
    // 4. SAFELY INJECT UI WHEN BODY IS READY
    // ==========================================
    function initUI() {
        if (document.getElementById('iptv-ua-pro-host')) return;

        const host = document.createElement('div');
        host.id = 'iptv-ua-pro-host';
        host.style.cssText = 'position: fixed; z-index: 2147483647; top: 0; left: 0; width: 0; height: 0; overflow: visible;';
        document.body.appendChild(host);

        const shadow = host.attachShadow({ mode: 'open' });

        const CSS = `
            :host {
                --p-color: #6366f1;
                --p-hover: #4f46e5;
                --bg: rgba(15, 23, 42, 0.75);
                --panel-bg: rgba(15, 23, 42, 0.95);
                --card-bg: rgba(30, 41, 59, 0.8);
                --border: rgba(255, 255, 255, 0.1);
                --text: #f8fafc;
                --text-muted: #94a3b8;
                --danger: #ef4444;
                --success: #10b981;
                font-family: system-ui, -apple-system, sans-serif;
            }
            * { box-sizing: border-box; }
            
            /* Floating Button - Safe fixed fallback */
            .fab {
                position: fixed;
                bottom: 20px; right: 20px; /* Safe starting position */
                width: 52px; height: 52px;
                background: var(--bg);
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid var(--border); border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                cursor: grab; box-shadow: 0 8px 32px rgba(0,0,0,0.5);
                transition: transform 0.2s, border-color 0.2s;
                user-select: none; -webkit-tap-highlight-color: transparent;
            }
            .fab:active { cursor: grabbing; transform: scale(0.95); }
            .fab svg { width: 24px; height: 24px; fill: none; stroke: var(--p-color); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; pointer-events: none;}
            
            /* Modal Panel */
            .panel {
                position: fixed; top: 50%; left: 50%;
                width: 90vw; max-width: 400px;
                height: 85vh; max-height: 600px;
                background: var(--panel-bg);
                backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
                border: 1px solid var(--border); border-radius: 16px;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);
                display: flex; flex-direction: column;
                opacity: 0; pointer-events: none;
                transform: translate(-50%, -50%) scale(0.95);
                transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                overflow: hidden;
            }
            .panel.open { opacity: 1; pointer-events: auto; transform: translate(-50%, -50%) scale(1); }
            
            /* Structure Classes */
            .header { padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.3); }
            .header-titles h2 { margin: 0; font-size: 16px; color: var(--text); font-weight: 600; }
            .header-titles p { margin: 4px 0 0 0; font-size: 11px; color: var(--text-muted); }
            .header-controls { display: flex; gap: 12px; align-items: center; }
            .btn-icon { background: transparent; border: none; padding: 6px; border-radius: 6px; cursor: pointer; color: var(--text-muted); display:flex; align-items:center; justify-content:center;}
            .btn-icon:hover { background: rgba(255,255,255,0.1); color: var(--text); }
            .btn-icon svg { width: 20px; height: 20px; fill: currentColor; }
            .tabs { display: flex; border-bottom: 1px solid var(--border); background: rgba(0,0,0,0.1); }
            .tab { flex: 1; padding: 14px 0; text-align: center; color: var(--text-muted); font-size: 13px; font-weight: 600; cursor: pointer; -webkit-tap-highlight-color: transparent;}
            .tab:hover { color: var(--text); }
            .tab.active { color: var(--p-color); box-shadow: inset 0 -3px 0 var(--p-color); }
            .content { flex: 1; overflow-y: auto; position: relative; padding-bottom: 20px; }
            .content::-webkit-scrollbar { width: 6px; }
            .content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
            .tab-pane { display: none; padding: 16px; }
            .tab-pane.active { display: block; animation: fadeIn 0.2s ease; }
            @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
            .category-title { font-size: 12px; text-transform: uppercase; color: var(--p-color); margin: 20px 0 10px 4px; font-weight: 700; }
            .ua-item { background: var(--card-bg); border: 1px solid var(--border); border-radius: 10px; padding: 14px; margin-bottom: 10px; display: flex; flex-direction: column; gap: 8px; }
            .ua-item.active { border-color: var(--p-color); background: rgba(99, 102, 241, 0.15); }
            .ua-header { display: flex; justify-content: space-between; align-items: center; }
            .ua-name { font-size: 14px; font-weight: 600; color: var(--text); cursor: pointer; flex: 1; }
            .ua-actions { display: flex; gap: 4px; }
            .ua-meta { font-size: 11px; color: var(--text-muted); display: flex; gap: 8px; flex-wrap: wrap;}
            .badge { background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 4px; }
            .form-group { margin-bottom: 14px; }
            .form-group label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
            .form-group input, .form-group textarea { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); color: var(--text); border-radius: 8px; padding: 12px; font-size: 16px; }
            .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--p-color); }
            .btn { width: 100%; padding: 14px; background: var(--p-color); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
            .btn:active { background: var(--p-hover); }
            .btn-outline { background: transparent; border: 1px solid var(--border); margin-top: 10px; }
            .toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 14px; background: var(--card-bg); border-radius: 10px; margin-bottom: 10px; border: 1px solid var(--border); }
            .toggle-label { font-size: 14px; color: var(--text); }
            .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.2); transition: .4s; border-radius: 24px; }
            .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
            input:checked + .slider { background-color: var(--success); }
            input:checked + .slider:before { transform: translateX(20px); }
            .toast-container { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; gap: 10px; pointer-events: none; z-index: 9999; }
            .toast { background: var(--success); color: white; padding: 10px 20px; border-radius: 30px; font-size: 13px; font-weight: 600; box-shadow: 0 8px 16px rgba(0,0,0,0.3); animation: slideUp 0.3s forwards, fadeOut 0.3s forwards 2.5s; }
            @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
            .empty-state { text-align: center; color: var(--text-muted); font-size: 13px; padding: 40px 0; }
        `;

        const ICONS = {
            tv: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`,
            close: `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
            copy: `<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
            trash: `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`
        };

        shadow.innerHTML = `
            <style>${CSS}</style>
            <div class="fab" id="fab">${ICONS.tv}</div>
            <div class="panel" id="panel">
                <div class="header">
                    <div class="header-titles">
                        <h2>UA Spoofer Pro</h2>
                        <p id="statusText">${isEnabledForSite ? 'Active on ' + currentDomain : 'Disabled on ' + currentDomain}</p>
                    </div>
                    <div class="header-controls">
                        <label class="switch"><input type="checkbox" id="siteToggle" ${isEnabledForSite ? 'checked' : ''}><span class="slider"></span></label>
                        <button class="btn-icon" id="closeBtn">${ICONS.close}</button>
                    </div>
                </div>
                <div class="tabs">
                    <div class="tab active" data-target="pane-presets">Presets</div>
                    <div class="tab" data-target="pane-custom">Custom UAs</div>
                    <div class="tab" data-target="pane-settings">Settings</div>
                </div>
                <div class="content">
                    <div class="tab-pane active" id="pane-presets"><div id="presetsList"></div></div>
                    <div class="tab-pane" id="pane-custom">
                        <div style="margin-bottom: 24px;">
                            <h3 class="category-title" style="margin-top:0;">Add Custom UA</h3>
                            <div class="form-group"><input type="text" id="cName" placeholder="Device Name (e.g. My Smart TV)"></div>
                            <div class="form-group"><textarea id="cUa" rows="3" placeholder="Mozilla/5.0..."></textarea></div>
                            <div style="display:flex; gap:12px;">
                                <div class="form-group" style="flex:1;"><input type="text" id="cPlatform" placeholder="Platform (e.g. Linux)"></div>
                                <div class="form-group" style="flex:1;"><input type="text" id="cRes" placeholder="Res (e.g. 1920x1080)"></div>
                            </div>
                            <button class="btn" id="saveCustomBtn">Save Custom UA</button>
                        </div>
                        <h3 class="category-title">Saved Custom UAs</h3>
                        <div id="customList"></div>
                    </div>
                    <div class="tab-pane" id="pane-settings">
                        <h3 class="category-title" style="margin-top:0;">General Settings</h3>
                        <div class="toggle-row"><span class="toggle-label">Global Enable</span><label class="switch"><input type="checkbox" id="globalToggle" ${state.globalEnable ? 'checked' : ''}><span class="slider"></span></label></div>
                        <div class="toggle-row"><span class="toggle-label">Spoof Resolution</span><label class="switch"><input type="checkbox" id="resToggle" ${state.spoofResolution ? 'checked' : ''}><span class="slider"></span></label></div>
                        <h3 class="category-title">Data Management</h3>
                        <button class="btn btn-outline" id="exportBtn">Export Config (JSON)</button>
                        <button class="btn btn-outline" id="importBtn">Import Config</button>
                        <input type="file" id="importFile" accept=".json" style="display:none;">
                    </div>
                </div>
                <div class="toast-container" id="toastContainer"></div>
            </div>
        `;

        const fab = shadow.getElementById('fab');
        const panel = shadow.getElementById('panel');
        const toastContainer = shadow.getElementById('toastContainer');

        const showToast = (msg) => {
            const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
            toastContainer.appendChild(t); setTimeout(() => t.remove(), 3000);
        };

        const buildItemHTML = (item, isCustom) => `
            <div class="ua-item ${state.activeId === item.id ? 'active' : ''}">
                <div class="ua-header">
                    <div class="ua-name" data-id="${item.id}">${item.name}</div>
                    <div class="ua-actions">
                        <button class="btn-icon copy-btn" data-ua="${item.ua}">${ICONS.copy}</button>
                        ${isCustom ? `<button class="btn-icon del-btn" data-id="${item.id}" style="color:var(--danger)">${ICONS.trash}</button>` : ''}
                    </div>
                </div>
                <div class="ua-meta">
                    <span class="badge">${item.platform || 'Unknown'}</span>
                    ${item.res ? `<span class="badge">${item.res[0]}x${item.res[1]}</span>` : ''}
                </div>
            </div>
        `;

        shadow.getElementById('presetsList').innerHTML = PRESETS.map(cat => `<div class="category-title">${cat.category}</div>` + cat.items.map(i => buildItemHTML(i, false)).join('')).join('');
        
        const renderCustoms = () => {
            shadow.getElementById('customList').innerHTML = state.customUAs.length ? state.customUAs.map(i => buildItemHTML(i, true)).join('') : `<div class="empty-state">No custom UAs saved.</div>`;
        }; renderCustoms();

        const handleListClick = (e) => {
            if (e.target.closest('.copy-btn')) { navigator.clipboard.writeText(e.target.closest('.copy-btn').dataset.ua); return showToast('Copied'); }
            if (e.target.closest('.del-btn')) {
                const id = e.target.closest('.del-btn').dataset.id;
                state.customUAs = state.customUAs.filter(i => i.id !== id);
                if (state.activeId === id) state.activeId = 'p_sam_1';
                saveState(); renderCustoms(); return showToast('Deleted');
            }
            if (e.target.closest('.ua-name')) {
                state.activeId = e.target.closest('.ua-name').dataset.id;
                saveState(); window.location.reload();
            }
        };
        shadow.getElementById('presetsList').addEventListener('click', handleListClick);
        shadow.getElementById('customList').addEventListener('click', handleListClick);

        shadow.getElementById('saveCustomBtn').addEventListener('click', () => {
            const name = shadow.getElementById('cName').value.trim(), ua = shadow.getElementById('cUa').value.trim();
            if (!name || !ua) return showToast('Name & UA required!');
            let res = null, resStr = shadow.getElementById('cRes').value.trim();
            if (resStr.includes('x')) res = [parseInt(resStr.split('x')[0]), parseInt(resStr.split('x')[1])];
            state.customUAs.push({ id: 'c_' + Date.now(), name, ua, platform: shadow.getElementById('cPlatform').value.trim() || 'Linux', res });
            saveState(); renderCustoms(); showToast('Saved');
            shadow.getElementById('cName').value = shadow.getElementById('cUa').value = shadow.getElementById('cPlatform').value = shadow.getElementById('cRes').value = '';
        });

        const tabs = shadow.querySelectorAll('.tab'), panes = shadow.querySelectorAll('.tab-pane');
        tabs.forEach(tab => tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active')); panes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active'); shadow.getElementById(tab.dataset.target).classList.add('active');
        }));

        const handleToggle = (id, key, reload = true) => shadow.getElementById(id).addEventListener('change', e => {
            if (key === 'disabledSites') { e.target.checked ? state[key] = state[key].filter(d => d !== currentDomain) : (!state[key].includes(currentDomain) && state[key].push(currentDomain)); }
            else { state[key] = e.target.checked; }
            saveState(); if(reload) window.location.reload();
        });
        handleToggle('siteToggle', 'disabledSites'); handleToggle('globalToggle', 'globalEnable'); handleToggle('resToggle', 'spoofResolution');

        // Robust Drag Logic adapting from initial CSS positioning
        let isDragging = false, startX, startY, btnStartLeft, btnStartTop;
        const dragStart = (e) => {
            isDragging = false;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            startX = clientX; startY = clientY;
            
            // Get exact current position before converting to absolute left/top coordinates
            const rect = fab.getBoundingClientRect();
            btnStartLeft = rect.left;
            btnStartTop = rect.top;
            
            // Apply coordinates so it continues from exactly where it is being dragged
            fab.style.left = `${btnStartLeft}px`; 
            fab.style.top = `${btnStartTop}px`;
            fab.style.bottom = 'auto'; 
            fab.style.right = 'auto';

            const onMove = (me) => {
                const mX = me.touches ? me.touches[0].clientX : me.clientX;
                const mY = me.touches ? me.touches[0].clientY : me.clientY;
                const dx = mX - startX, dy = mY - startY;
                
                if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                    isDragging = true;
                    let newLeft = Math.max(0, Math.min(btnStartLeft + dx, window.innerWidth - 52));
                    let newTop = Math.max(0, Math.min(btnStartTop + dy, window.innerHeight - 52));
                    fab.style.left = `${newLeft}px`; fab.style.top = `${newTop}px`;
                }
            };
            const onEnd = () => {
                document.removeEventListener('mousemove', onMove); document.removeEventListener('touchmove', onMove);
                document.removeEventListener('mouseup', onEnd); document.removeEventListener('touchend', onEnd);
                if (!isDragging) panel.classList.toggle('open');
            };
            document.addEventListener('mousemove', onMove); document.addEventListener('touchmove', onMove, {passive: false});
            document.addEventListener('mouseup', onEnd); document.addEventListener('touchend', onEnd);
        };
        
        fab.addEventListener('mousedown', dragStart); fab.addEventListener('touchstart', dragStart, {passive: false});
        shadow.getElementById('closeBtn').addEventListener('click', () => panel.classList.remove('open'));
    }

    // Wait until document body is reliably available before attaching UI to prevent errors
    function safeInject() {
        if (document.body) { initUI(); } 
        else { requestAnimationFrame(safeInject); }
    }
    safeInject();

})();
