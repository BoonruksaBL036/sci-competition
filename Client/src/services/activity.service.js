import api from "./api"
const API_URL = import.meta.env.VITE.ACTIVITY_API;

const createActivity = async (data) => {
    return await api.post(API_URL + "/", data);
};

const ActivityService = {
    createActivity,
};
export default ActivityService;