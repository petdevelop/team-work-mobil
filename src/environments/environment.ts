// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBq08sLbJ-FoyLB77NRZyX48fjKMMXS7Qk",
    authDomain: "team-work-8c0c0.firebaseapp.com",
    databaseURL: "https://team-work-8c0c0.firebaseio.com",
    projectId: "team-work-8c0c0",
    storageBucket: "team-work-8c0c0.appspot.com",
    messagingSenderId: "492728266730"
  },
  cloudSettings: {
    core: {
    app_id: 'a30030c0'
    }
  },
  dbKeys: {
     assignmentPaths: '/assignments',
     resourcePaths: '/resources',
     personPaths: '/persons'
  }
};

