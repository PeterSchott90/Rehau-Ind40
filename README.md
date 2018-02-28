# Rehau Industrie 4.0

Eine mobile Applikation zum Wissenstransfer im Bereich der Industrie 4.0

## Getting Started

Diese Anleitung beschreibt die notwendigen Voraussetzungen um die Anwendung installieren und lokal entwickeln zu können.

### Voraussetzungen

* Dieses Repository clonen
* Lokale Java 8 Installation
* Lokale Node Installation für npm
* [Google App Engine - Maven](https://cloud.google.com/appengine/docs/standard/java/tools/using-maven)

### Installation

#### Server Deployment

```
cd fau-rehau-admin-war
mvn appengine:deploy
```

#### Admin Installation

```
cd fau-rehau-admin
npm install
```

#### App Installation

```
cd fau-rehau-service-war
npm install
```

Anschließend die gewünschten Clients hinzufügen

```
ionic cordova platform add ios
ionic cordova platform add android
```

## Starten der App und des Admin Clients

#### Admin starten

```
cd fau-rehau-admin
ng serve
```

Anschließend ist der Client über [http://localhost:4200](http://localhost:4200) erreichbar

#### App starten

```
cd fau-rehau-service-war
ionic serve
```
Startet einen lokalen dev Server, der über den Browser erreichbar ist.

```
ionic cordova run ios -l -c -s --debug
```
Startet einen dev Server auf einem verbundenen iOS Gerät. Wichtig ist, dass das Gerät entsperrt ist.



## Built With

* [JAVA](http://www.java.com) - Web Server
* [Maven](https://maven.apache.org/) - Dependency Management
* [Google App Engine - Maven](https://cloud.google.com/appengine/docs/standard/java/tools/using-maven) - Webserver hosting
* [Node](https://nodejs.org/en/) - Node Package Management für Clients
* [Angular CLI](https://github.com/angular/angular-cli) - Admin Client
* [Ionic CLI](https://ionicframework.com/docs/cli/) - Mobiler Client
