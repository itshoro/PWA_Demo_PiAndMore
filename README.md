# Pi and More: PWA Demo
Diese PWA ist als Referenz für meine Präsentation bei der Pi and More 11½ zu sehen. Sie ist inspiriert von dem [Google Codelabs PWA Projekt, bei dem eine Wetter PWA erstellt wurde.](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0) Im Vergleich zu diesem Projekt, werden hier große Teile der App Logik ausgelassen, da wir keine Elemente verändern, sondern lediglich hinzufügen oder entfernen.

Die PWA nutzt eine REST API um Daten zu empfangen, natürlich kann hier mit ein wenig Modifikation eine eigene genutzt werden ich verweise hier jedoch auf die [die auch bei der Präsentation genutzt wird.](https://github.com/itshoro/PWA_Demo_REST_API)

## Voraussetzungen
Ein [moderner Browser](https://caniuse.com/#search=ServiceWorker) mit Zugriff auf ServiceWorker, wie z.B. die Browser ab Edge 17, FireFox 44, Chrome 45 oder Safari 11.1 (11.4 für iOS).

[⚠️ Die Cache API funktioniert nicht mit iOS Safari zum derzeitigen Zeitpunkt.](https://developer.mozilla.org/en-US/docs/Web/API/Cache)