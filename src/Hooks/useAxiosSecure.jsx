import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL : 'https://give-life-server.vercel.app'
})

const useAxiosSecure = () => {

    const { logOut } = useAuth();
  const navigate = useNavigate();
  //request interceptor to add authorization headers for every secure api call
  axiosSecure.interceptors.request.use(
    function (config) {
      // console.log('request stopped by interceptors');
      const token = localStorage.getItem("access-token");
      // console.log('token from interceptor',token);
      config.headers.authorization = `Bearer ${token}`; //authorization spelling is important
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  //intercept 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log("status error in interceptor", status);

      //for 401 and 403 logout the user and navigate the user to the login page
      if (status === 401 || status === 403) {
        await logOut()
          .then(() => {})
          .catch((err) => {
            console.log(err);
        });
        navigate("/login");

      }
      return Promise.reject(error);
    }
  );

    return axiosSecure;
};

export default useAxiosSecure;