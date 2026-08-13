(function () {
    "use strict";

    function showPreviewDisclosure() {
        if (document.getElementById("preview-disclosure")) return;
        const modal = document.createElement("div");
        modal.id = "preview-disclosure";
        modal.className = "preview-disclosure-overlay";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "preview-disclosure-title");
        modal.innerHTML = `<section class="preview-disclosure-card"><div class="preview-disclosure-icon"><i class="fa-solid fa-flask"></i></div><div class="preview-disclosure-copy"><div class="preview-disclosure-eyebrow">AVISO IMPORTANTE</div><h2 id="preview-disclosure-title">⚠️ Versión de vista previa</h2><p>Esta es una proyección HTML de WPC-SutilBox. Es probable que algunas funciones o elementos que veas aquí todavía no estén implementados en la aplicación real.</p><p>Para consultar la versión funcional actual y las novedades más recientes, te recomendamos visitar <a href="https://github.com/WilmerWass/WPC-SutilBox/releases" target="_blank" rel="noopener">Releases</a>.</p><div class="preview-disclosure-versions"><span><small>Versión funcional actual</small><strong>WPC-SutilBox 1.1.8</strong></span><span><small>Próxima versión</small><strong>WPC-SutilBox Beta 1</strong></span></div><p>Puedes dejar comentarios, sugerencias o solicitudes relacionadas con la evolución del proyecto.</p><button type="button" id="preview-disclosure-continue" class="preview-disclosure-button">Entendido, continuar con la vista previa</button></div></section>`;
        document.body.appendChild(modal);
        const button = document.getElementById("preview-disclosure-continue");
        button.addEventListener("click", () => { modal.classList.add("is-closing"); setTimeout(() => modal.remove(), 180); });
        button.focus();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showPreviewDisclosure, { once: true });
    else showPreviewDisclosure();
})();
