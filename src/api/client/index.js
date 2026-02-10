import axios from "axios";

 const stagingUrl = "https://rrooms.co.in/rrooms/";

 const prodUrl = "https://rrooms.in/rrooms/";

 export const finalBaseUrl = prodUrl


const api = axios.create({
  // baseURL: `${prodUrl}api/`,
  baseURL: `${finalBaseUrl}api/`,
});
export default api;

export const baseUrl = `${finalBaseUrl}api/`; // need to change according to production and staging
export const baseImgUrl = `${finalBaseUrl}uploads/`;

export const apiKey = "AIzaSyA74KcvlNTTWtDOekk9RlHbuUneSZV7UJw";
export const authDomain = "rrooms-4acba.firebaseapp.com";
export const projectId = "rrooms-4acba";
export const storageBucket = "rrooms-4acba.appspot.com";
export const messagingSenderId = "612761860432";
export const appId = "1:612761860432:web:64f9cf6850162c4441d455";
export const measurementId = "G-S9FK919WJH";
export const vapidKey = "BHQVlnqJn3jEIJORFmNP5080nMil7eY0yQbFJqR_LQMi1RA-U_xw7bG590LBuXf5PzBog9LYU-pqw0bnm_OlHtg"

export const serverKey = "AAAAjqtz-VA:APA91bGUVmTDJLDb07cG0L39CYOLdXh8ZtYH5_ZJvIM9A23svjsCturLxSteD3AVaLpNstEc_LIyENB2Yvrn-c0g1KnaUS_OeBD_wvQiMg-Ede5ghiQkXWvJre7S2dBhGm2ClVa8ek7-"
