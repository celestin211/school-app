
export default class Navigation {
  /**
   * @param {String} route
   * @param {object}  routeParameters (optionnel)
   */
  static redirigeRoute(route, routeParameters) {
    if (routeParameters === undefined) {
      routeParameters = {};
    }

    Navigation.redirige(Routing.generate(route, routeParameters));
  }

  static redirige(url) {
    window.location = url;
  }

  static actualise() {
    window.location = window.location.href;
  }

  static redirigeNouvelleFenetre(url) {
    window.open(url, "_blank");
  }
}
