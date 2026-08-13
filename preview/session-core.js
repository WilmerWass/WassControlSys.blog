(function () {
    "use strict";
    window.previewToast = function (message, type = "info") {
        const tone = type === "success" ? "success" : type === "warn" ? "warn" : "info";
        let host = document.getElementById("session-toast");
        if (!host) {
            host = document.createElement("div");
            host.id = "session-toast";
            host.className = "session-toast-host";
            document.body.appendChild(host);
        }
        const item = document.createElement("div");
        item.className = `session-toast ${tone}`;
        item.textContent = message;
        host.appendChild(item);
        requestAnimationFrame(() => item.classList.add("visible"));
        setTimeout(() => item.remove(), 3600);
    };
    window.previewConfirm = function (message, callback) {
        if (window.confirm(`${message}\n\nEsta acción solo se simulará en la preview.`)) callback();
    };
    window.previewDownload = function (filename, content, type = "text/plain") {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([content], { type }));
        link.download = filename;
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
        previewToast("Informe preparado para descarga.", "success");
    };
})();
