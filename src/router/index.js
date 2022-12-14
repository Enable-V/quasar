import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config  = {
  apiKey: "AIzaSyD6Krd9G1peVdozc2wYeCevuUZUhoV8Ur8",
  authDomain: "quasar--auth-5d7eb.firebaseapp.com",
  projectId: "quasar--auth-5d7eb",
  storageBucket: "quasar--auth-5d7eb.appspot.com",
  messagingSenderId: "325409937815",
  appId: "1:325409937815:web:b19e5684a1f1d04f140cd2"
};
firebase.initializeApp(config);
const app = firebase.initializeApp(config);
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};
const db = app.firestore();
const auth = firebase.auth();

export { auth, db };
export const firestore = firebase.firestore();





import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })
  Router.beforeEach(async (to, from, next) => {
    const auth = to.meta.requiresAuth
    if (auth && !await firebase.getCurrentUser()) {
      next('/');
    } else {
      next();
    }
  })

  return Router
})
