// ==UserScript==
// @name         IPTV & Smart TV User-Agent Spoofer
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Forces websites to load using IPTV/Smart TV/OTT user agents with a modern draggable UI.
// @author       Gemini
// @match        *://*/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // ==========================================
    // 1. DATA: 50 Popular IPTV & Media UAs
    // ==========================================
    const uaList = [
        // Smart TVs - Samsung Tizen
        { name: "Samsung Tizen 6.5", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 6.5) AppleWebKit/538.1 (KHTML, like Gecko) Version/6.5 NativeTV/6.5 TV Safari/538.1" },
        { name: "Samsung Tizen 5.0", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/5.0 NativeTV/5.0 TV Safari/538.1" },
        { name: "Samsung Tizen 4.0", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 4.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/4.0 NativeTV/4.0 TV Safari/538.1" },
        { name: "Samsung Tizen 3.0", ua: "Mozilla/5.0 (SMART-TV; Linux; Tizen 3.0) AppleWebKit/538.1 (KHTML, like Gecko) Version/3.0 NativeTV/3.0 TV Safari/538.1" },
        { name: "Samsung Orsay (Older)", ua: "Mozilla/5.0 (SmartHub; SMART-TV; U; Linux/SmartTV) AppleWebKit/531.2+ (KHTML, like Gecko) WebBrowser/1.0 SmartTV Safari/531.2+" },
        
        // Smart TVs - LG WebOS
        { name: "LG WebOS 6.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 WebAppManager" },
        { name: "LG WebOS 5.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 WebAppManager" },
        { name: "LG WebOS 4.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.34 Safari/537.36 WebAppManager" },
        { name: "LG WebOS 3.0", ua: "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 WebAppManager" },
        { name: "LG NetCast (Older)", ua: "Mozilla/5.0 (DirectFB; Linux; U; RV: 1.9.2.4) Gecko/20100908" },

        // Android TV
        { name: "Android TV 11 (Generic)", ua: "Mozilla/5.0 (Linux; Android 11; BRAVIA VH2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36" },
        { name: "Nvidia Shield TV", ua: "Mozilla/5.0 (Linux; Android 9; SHIELD Android TV Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36" },
        { name: "Sony Bravia Android TV", ua: "Mozilla/5.0 (Linux; Android 8.0.0; BRAVIA 4K UR2 Build/OPR2.170623.027) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36" },
        { name: "Xiaomi Mi Box S", ua: "Mozilla/5.0 (Linux; Android 9; MIBOX4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36" },
        { name: "Google Chromecast w/ Google TV", ua: "Mozilla/5.0 (Linux; Android 10; Chromecast) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36" },

        // Fire TV
        { name: "Fire TV Stick 4K Max", ua: "Mozilla/5.0 (Linux; Android 9; AFTKA Build/PS7273) AppleWebKit/537.36 (KHTML, like Gecko) Silk/92.2.1 like Chrome/92.0.4515.131 Safari/537.36" },
        { name: "Fire TV Stick 4K", ua: "Mozilla/5.0 (Linux; Android 7.1.2; AFTMM Build/NS6265) AppleWebKit/537.36 (KHTML, like Gecko) Silk/81.2.2 like Chrome/81.0.4044.138 Safari/537.36" },
        { name: "Fire TV Cube", ua: "Mozilla/5.0 (Linux; Android 9; AFTR Build/PS7229) AppleWebKit/537.36 (KHTML, like Gecko) Silk/86.3.20 like Chrome/86.0.4240.198 Safari/537.36" },
        { name: "Fire OS 5 (Older)", ua: "Mozilla/5.0 (Linux; Android 5.1.1; AFTT Build/LVY48F) AppleWebKit/537.36 (KHTML, like Gecko) Silk/60.2.82 like Chrome/60.0.3112.114 Safari/537.36" },
        { name: "Amazon Echo Show", ua: "Mozilla/5.0 (Linux; Android 5.1.1; Echo Show Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Silk/53.3.5 like Chrome/53.0.2785.134 Safari/537.36" },

        // Apple TV
        { name: "Apple TV 4K (tvOS 15)", ua: "AppleCoreMedia/1.0.0.19J346 (Apple TV; U; CPU OS 15_0 like Mac OS X; en_us)" },
        { name: "Apple TV HD (tvOS 14)", ua: "AppleCoreMedia/1.0.0.18J386 (Apple TV; U; CPU OS 14_0 like Mac OS X; en_us)" },
        { name: "Apple TV (3rd Gen)", ua: "AppleTV/7.2.2 (AppleTV3,1)" },
        { name: "Apple TV (2nd Gen)", ua: "AppleTV/6.1.1 (AppleTV2,1)" },
        { name: "Apple TV Safari Fallback", ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15 AppleTV/tvOS" },

        // Roku
        { name: "Roku Ultra", ua: "Roku4640X/DVP-9.40 (299.40E04200A)" },
        { name: "Roku Streaming Stick+", ua: "Roku3810X/DVP-9.30 (509.30E04194A)" },
        { name: "Roku Premiere", ua: "Roku3920X/DVP-9.20 (919.20E04111A)" },
        { name: "Roku Express", ua: "Roku3900X/DVP-9.10 (519.10E04111A)" },
        { name: "Roku TV (TCL)", ua: "Roku8000X/DVP-10.00 (10.00E04195A)" },

        // Chromecast (Cast OS)
        { name: "Chromecast Ultra", ua: "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 CrKey/1.49.250118" },
        { name: "Chromecast Gen 3", ua: "Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 CrKey/1.49.250118" },
        
        // IPTV / STB Devices
        { name: "MAG 322", ua: "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 4 rev: 2723 Mobile Safari/533.3" },
        { name: "MAG 254", ua: "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Mobile Safari/533.3" },
        { name: "Formuler Z8", ua: "Mozilla/5.0 (Linux; Android 8.0.0; Z8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36 Formuler" },
        { name: "Enigma2 (OpenATV)", ua: "Enigma2/OpenATV/6.4 (Linux)" },
        { name: "DreamBox", ua: "Mozilla/5.0 (Linux; U; Android 4.2.2; de-de; DreamBox) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30" },

        // Consoles (often used as OTT devices)
        { name: "PlayStation 5", ua: "Mozilla/5.0 (PlayStation; PlayStation 5/2.26) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15" },
        { name: "PlayStation 4", ua: "Mozilla/5.0 (PlayStation 4 8.03) AppleWebKit/605.1.15 (KHTML, like Gecko)" },
        { name: "Xbox Series X", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edge/92.0.902.67" },
        { name: "Xbox One", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 Edge/40.15063.0.0" },
        
        // Other Smart TVs & Players
        { name: "Vizio SmartCast", ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 VIZIO/SmartCast" },
        { name: "Panasonic Viera", ua: "Mozilla/5.0 (X11; FreeBSD; U; Viera; en-US) AppleWebKit/537.11 (KHTML, like Gecko) Viera/3.6.4 Chrome/23.0.1271.97 Safari/537.11" },
        { name: "Hisense VIDAA", ua: "Mozilla/5.0 (Linux; SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.116 Safari/537.36 Hisense/VIDAA" },
        { name: "TiVo Edge", ua: "Mozilla/5.0 (Linux; Android 9; TiVo Edge) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36" },
        { name: "Comcast Xfinity X1", ua: "Mozilla/5.0 (Linux; x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 Xfinity/X1" },
        { name: "Kodi / XBMC", ua: "Kodi/19.1 (Windows NT 10.0; Win64; x64) App_Bitness/64 Version/19.1-Git:20210508-85e05228b4" },
        { name: "VLC Media Player", ua: "VLC/3.0.16 LibVLC/3.0.16" },
        { name: "Plex Media Player", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) PlexMediaPlayer/2.58.0.2076 Chrome/80.0.3987.165 Safari/537.36" },
        { name: "Emby Theater", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) EmbyTheater/3.0.15 Chrome/83.0.4103.122 Safari/537.36" },
        { name: "Jellyfin Media Player", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) JellyfinMediaPlayer/1.6.1 Chrome/87.0.4280.141 Safari/537.36" }
    ];

    // Default to the first one if none selected
    let selectedUaIndex = GM_getValue('iptv_selected_ua_index', 0);
    let currentUA = uaList[selectedUaIndex].ua;

    // ==========================================
    // 2. SPOOFING LOGIC
    // ==========================================
    
    // Spoof navigator properties
    Object.defineProperty(navigator, 'userAgent', { get: () => currentUA });
    Object.defineProperty(navigator, 'appVersion', { get: () => currentUA.replace(/^Mozilla\//, '') });
    
    // Spoof fetch
    const originalFetch = window.fetch;
    window.fetch = async function(resource, config) {
        config = config || {};
        config.headers = config.headers || {};
        
        // Try to spoof header (browser might block this, but we try)
        if (config.headers instanceof Headers) {
            config.headers.set('User-Agent', currentUA);
        } else if (Array.isArray(config.headers)) {
            const index = config.headers.findIndex(h => h[0].toLowerCase() === 'user-agent');
            if (index >= 0) config.headers[index][1] = currentUA;
            else config.headers.push(['User-Agent', currentUA]);
        } else {
            config.headers['User-Agent'] = currentUA;
        }
        return originalFetch(resource, config);
    };

    // Spoof XHR
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        originalOpen.apply(this, arguments);
        try {
            this.setRequestHeader('User-Agent', currentUA);
        } catch(e) { /* Ignore if browser strictly blocks setting UA */ }
    };

    // ==========================================
    // 3. UI INJECTION & STYLING
    // ==========================================
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectUI);
    } else {
        injectUI();
    }

    function injectUI() {
        // Prevent multiple injections
        if (document.getElementById('iptv-ua-spoofer-host')) return;

        // Create Shadow DOM container to prevent CSS bleeding
        const host = document.createElement('div');
        host.id = 'iptv-ua-spoofer-host';
        host.style.position = 'fixed';
        host.style.top = '20px';
        host.style.right = '20px';
        host.style.zIndex = '999999999';
        document.documentElement.appendChild(host);

        const shadow = host.attachShadow({ mode: 'open' });

        const styles = `
            :host {
                --primary: #4ade80;
                --bg: #1e293b;
                --bg-hover: #334155;
                --text: #f8fafc;
                --border: #475569;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            .widget-container {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            .fab {
                width: 50px;
                height: 50px;
                background: var(--bg);
                border: 2px solid var(--border);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: grab;
                box-shadow: 0 4px 12px rgba(0,0,0,0.5);
                transition: transform 0.2s, border-color 0.2s;
                user-select: none;
            }
            .fab:active { cursor: grabbing; }
            .fab:hover { border-color: var(--primary); transform: scale(1.05); }
            .fab svg { width: 24px; height: 24px; fill: var(--primary); }
            
            .panel {
                position: absolute;
                top: 60px;
                right: 0;
                width: 320px;
                background: var(--bg);
                border: 1px solid var(--border);
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                display: none;
                flex-direction: column;
                overflow: hidden;
                opacity: 0;
                transform: translateY(-10px);
                transition: opacity 0.3s, transform 0.3s;
            }
            .panel.open {
                display: flex;
                opacity: 1;
                transform: translateY(0);
            }
            
            .panel-header {
                padding: 12px;
                background: #0f172a;
                border-bottom: 1px solid var(--border);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .panel-header h3 { margin: 0; color: var(--text); font-size: 14px; }
            
            .search-box {
                padding: 10px;
                border-bottom: 1px solid var(--border);
            }
            .search-box input {
                width: 100%;
                box-sizing: border-box;
                padding: 8px;
                border-radius: 6px;
                border: 1px solid var(--border);
                background: #0f172a;
                color: var(--text);
                outline: none;
            }
            .search-box input:focus { border-color: var(--primary); }

            .current-ua {
                padding: 10px;
                background: #0f172a;
                border-bottom: 1px solid var(--border);
                font-size: 11px;
                color: #94a3b8;
                word-break: break-all;
                position: relative;
            }
            .copy-btn {
                position: absolute;
                top: 5px;
                right: 5px;
                background: var(--bg-hover);
                border: none;
                color: var(--text);
                border-radius: 4px;
                padding: 4px 8px;
                font-size: 10px;
                cursor: pointer;
            }
            .copy-btn:hover { background: var(--primary); color: #000; }

            .ua-list {
                max-height: 300px;
                overflow-y: auto;
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .ua-list::-webkit-scrollbar { width: 6px; }
            .ua-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
            
            .ua-item {
                padding: 10px 12px;
                color: var(--text);
                font-size: 13px;
                border-bottom: 1px solid var(--border);
                cursor: pointer;
                transition: background 0.2s;
                display: flex;
                align-items: center;
            }
            .ua-item:hover { background: var(--bg-hover); }
            .ua-item.active { background: rgba(74, 222, 128, 0.1); border-left: 3px solid var(--primary); }
            
            .close-btn {
                background: transparent;
                border: none;
                color: #ef4444;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            }
        `;

        const tvIcon = `<svg viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>`;

        shadow.innerHTML = `
            <style>${styles}</style>
            <div class="widget-container">
                <div class="fab" id="fabBtn" title="IPTV User Agents">${tvIcon}</div>
                <div class="panel" id="uaPanel">
                    <div class="panel-header">
                        <h3>IPTV UA Spoofer</h3>
                        <button class="close-btn" id="closeBtn">&times;</button>
                    </div>
                    <div class="current-ua">
                        <strong>Active:</strong> <span id="activeName">${uaList[selectedUaIndex].name}</span>
                        <button class="copy-btn" id="copyBtn">Copy UA</button>
                    </div>
                    <div class="search-box">
                        <input type="text" id="searchInput" placeholder="Search devices...">
                    </div>
                    <ul class="ua-list" id="listContainer"></ul>
                </div>
            </div>
        `;

        // Elements
        const fabBtn = shadow.getElementById('fabBtn');
        const uaPanel = shadow.getElementById('uaPanel');
        const closeBtn = shadow.getElementById('closeBtn');
        const listContainer = shadow.getElementById('listContainer');
        const searchInput = shadow.getElementById('searchInput');
        const copyBtn = shadow.getElementById('copyBtn');
        const activeName = shadow.getElementById('activeName');

        // Render List
        function renderList(filter = '') {
            listContainer.innerHTML = '';
            uaList.forEach((item, index) => {
                if (item.name.toLowerCase().includes(filter.toLowerCase())) {
                    const li = document.createElement('li');
                    li.className = `ua-item ${index === selectedUaIndex ? 'active' : ''}`;
                    li.textContent = item.name;
                    li.onclick = () => selectUA(index);
                    listContainer.appendChild(li);
                }
            });
        }

        function selectUA(index) {
            GM_setValue('iptv_selected_ua_index', index);
            // Reload page to apply new UA
            window.location.reload();
        }

        // Event Listeners
        searchInput.addEventListener('input', (e) => renderList(e.target.value));
        
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(uaList[selectedUaIndex].ua);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = 'Copy UA', 2000);
        });

        // Dragging Logic
        let isDragging = false;
        let dragStartX, dragStartY;
        let initialTop, initialRight;

        fabBtn.addEventListener('mousedown', (e) => {
            // Only trigger drag if we aren't clicking exactly to open
            isDragging = false;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            
            const rect = host.getBoundingClientRect();
            initialTop = rect.top;
            // Calculate right based on viewport width
            initialRight = window.innerWidth - rect.right;

            function onMouseMove(moveEvent) {
                const dx = moveEvent.clientX - dragStartX;
                const dy = moveEvent.clientY - dragStartY;
                
                // If moved more than 5px, consider it a drag
                if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                    isDragging = true;
                    host.style.top = `${initialTop + dy}px`;
                    host.style.right = `${initialRight - dx}px`; 
                }
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                
                if (!isDragging) {
                    // It was a click, toggle panel
                    uaPanel.classList.toggle('open');
                }
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        closeBtn.addEventListener('click', () => {
            uaPanel.classList.remove('open');
        });

        // Initial render
        renderList();
    }
})();
