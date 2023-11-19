

/**
 * Affiche et enlève l'attente AJAX.
 */
export default class AjaxLoader {
  /**
   * Affiche l'attente AJAX.
   *
   * @param {HTMLElement|null} container (optionnel) Le panneau dans lequel sera affichée l'attente AJAX (body si aucun paramètre)
   */
  static show(container) {
    let $container = $(typeof container === "undefined" ? "body" : container);
    container = $container.get(0);

    const top =
        container.clientTop - parseInt($container.css("paddingTop")) + "px",
      left =
        container.clientLeft - parseInt($container.css("paddingLeft")) + "px";
    let height = container.clientHeight,
      width = container.clientWidth;

    if (height === 0) {
      height = $container.height();
    }

    if (width === 0) {
      width = $container.width();
    }

    container.insertAdjacentHTML(
      "afterbegin",
      '<div class="theme-loader-container" style="display: none;"><div class="theme-loader" style="position: absolute;top: ' +
        top +
        ";left: " +
        left +
        ";height: " +
        height +
        "px;width: " +
        width +
        'px;">' +
        '<div class="ball-scale' +
        (height < 60 || width < 60 ? " petit" : "") +
        '">' +
        '<div class="contain"><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div></div>' +
        "</div>" +
        "</div></div>"
    );
    $container.find(".theme-loader-container").fadeIn("slow");
  }

  /**
   * Enlève l'attente AJAX.
   *
   * @param {HTMLElement|null} container (optionnel) Le panneau dans lequel enlever l'attente AJAX (toutes si aucun paramètre)
   */
  static hide(container) {
    let $themeLoader = null;
    if (typeof container === "undefined") {
      $themeLoader = $(".theme-loader");
    } else {
      $themeLoader = $(container).find(".theme-loader");
    }

    $themeLoader.fadeOut("fast", () => {
      $themeLoader.closest(".theme-loader-container").remove();
    });
  }
}
