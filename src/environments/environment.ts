// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase:  {
        apiKey: "AIzaSyBjOOAxzR_HJXViybh_kcOv78vaheUtTvo",
        authDomain: "polllab.firebaseapp.com",
        databaseURL: "https://polllab.firebaseio.com",
        projectId: "polllab",
        storageBucket: "polllab.appspot.com",
        messagingSenderId: "508528158914",
        appId: "1:508528158914:web:3f2c8cdb02bea812fb735b"
      }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
