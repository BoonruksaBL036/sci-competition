import api from "./api";
const API_URL = import.meta.env.VITE_BASE_URL + "/activity";

const createActivity = async (data) => {
  return await api.post(API_URL + "/", data);
};
const getAllActivities = async () => {
  return await api.get(API_URL + "/");
};
const getActivityById = async (id) => {
  return await api.get(API_URL + "/" + id);
};
const updateActivityById = async (id,data) => {
  return await api.put(API_URL + "/" + id,data);
};
const deleteActivityById = async (id) => {
  return await api.delete(API_URL + "/" + id);
};
const ActivityService = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivityById,
  deleteActivityById,
};
export default ActivityService;
