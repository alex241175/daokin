export default {
    api_host : process.env.NODE_ENV == "development" ? "http://localhost:9000/public/api/" : "./api/",
 }