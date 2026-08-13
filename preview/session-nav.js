(function () {
    "use strict";

    const nav = document.querySelector(".sidebar-navigation");
    if (!nav) return;

    const current = location.pathname.split("/").pop().toLowerCase();
    const groups = [
        ["PRINCIPAL", [["fa-house", "Inicio", "../index_prev.html"]]],
        ["SISTEMA", [
            ["fa-cubes", "Aplicaciones", "aplicaciones.html"],
            ["fa-gauge-high", "Rendimiento", "rendimiento.html"],
            ["fa-arrows-rotate", "Windows Update", "windows.html"],
            ["fa-wrench", "Reparación", "windows.html#repair-view"]
        ]],
        ["SEGURIDAD", [
            ["fa-shield-halved", "Seguridad", "../index_prev.html#tab-seguridad"],
            ["fa-user-shield", "Privacidad", "../index_prev.html#tab-privacidad"]
        ]],
        ["HERRAMIENTAS", [
            ["fa-puzzle-piece", "Drivers", "../index_prev.html#tab-drivers"],
            ["fa-network-wired", "Red", "../index_prev.html#tab-red"],
            ["fa-toolbox", "Herramientas", "../index_prev.html#tab-herramientas-ext"],
            ["fa-clock-rotate-left", "Historial & Logs", "../index_prev.html#tab-historial"]
        ]],
        ["CONFIGURACIÓN", [["fa-gear", "Configuración", "configuracion.html"]]]
    ];

    nav.innerHTML = groups.map(([title, items]) => `
        <div class="nav-section">
            <div class="nav-section-title">${title}</div>
            ${items.map(([icon, label, href]) => {
                const target = href.split("#")[0].toLowerCase();
                const active = target === current || (current === "index_prev.html" && href.includes("#tab-"));
                return `<a class="nav-item${active ? " active" : ""}" href="${href}"><i class="fa-solid ${icon} nav-icon" aria-hidden="true"></i><span>${label}</span></a>`;
            }).join("")}
        </div>`).join("");
})();
