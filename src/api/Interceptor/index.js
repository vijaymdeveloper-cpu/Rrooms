import api from "@api/client";
import { store } from "@store";


const Interceptor = () => {
    api.interceptors.request.use(
        (config) => {
            const state = store.getState();
            const token = state?.auth?.access_token;

            const fullUrl = `${config.baseURL || ''}${config.url || ''}`;

            // console.log("➡️ API REQUEST:", {
            //     url: fullUrl,
            //     method: config.method,
            //     data: config.data,
            //     params: config.params,
            // });

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        response => {
            // console.log("✅ API RESPONSE:", {
            //     url: response.config.url,
            //     status: response.status,
            //     data: response.data,
            // });
            return response;
        },
        (error) => {
            if (error.response?.status === 401) {

            }
            return Promise.reject(error);
        }
    );
}

export default Interceptor;






// import api from "@api/client";
// import { store } from "@store";

// const Interceptor = () => {
//   // REQUEST
//   api.interceptors.request.use(
//     config => {
//       const state = store.getState();
//       const token = state?.auth?.access_token;

//       console.log("➡️ API REQUEST:", {
//         url: config.url,
//         method: config.method,
//         data: config.data,
//         params: config.params,
//       });

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       return config;
//     },
//     error => {
//       console.log("❌ REQUEST ERROR:", error);
//       return Promise.reject(error);
//     }
//   );

//   // RESPONSE
//   api.interceptors.response.use(
//     response => {
//       console.log("✅ API RESPONSE:", {
//         url: response.config.url,
//         status: response.status,
//         data: response.data,
//       });
//       return response;
//     },
//     error => {
//       if (error.response) {
//         // console.log("❌ API ERROR RESPONSE:", {
//         //   url: error.config?.url,
//         //   status: error.response.status,
//         //   data: error.response.data,
//         // });

//         if (error.response.status === 401) {
//           // logout / refresh token
//         }
//       } else {
//         console.log("❌ NETWORK ERROR:", error.message);
//       }

//       return Promise.reject(error);
//     }
//   );
// };

// export default Interceptor;


