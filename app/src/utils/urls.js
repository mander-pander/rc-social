export const getDomainName = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return "http://localhost:3000";
    } else {
        return "https://jolly-froyo-d03e7d.netlify.app";
    }
}
