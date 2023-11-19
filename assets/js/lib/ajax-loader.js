/*
 * Propriété du CISIRH Centre Interministériel de Services Informatiques relatifs aux Ressources Humaines
 * 41 Boulevard Vincent Auriol, 75013 Paris
 * Édité en 2022
 *
 * Ce logiciel est un programme informatique servant à assurer le fonctionnement de l’applicaton SICARDI
 * «  Système d’information pour les Compétences des Agents et la Reconnaissance des Carrières Individuelles ».
 *
 * Ce logiciel est régi par la licence CeCILL-B soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL-B telle que diffusée par le CEA, le CNRS et l'INRIA
 * sur le site "http://www.cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL-B, et que vous en avez accepté les
 * termes.
 */

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
