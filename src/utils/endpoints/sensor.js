import api from "../services/api";

export const getAllSensor = async (query) => {
    const res = await api.get("/sensor/all", {
        params: query,
    });
    return res.data.data;
}

export const getLocationSensor = async () => {
    const res = await api.get("/sensor/locations");
    return res.data.data;
}

export const getLocationParameter = async () => {
    const res = await api.get("/sensor/parameters");
    return res.data.data;
}

export const getSensorById = async (id) => {
    const res = await api.get(`/sensor/${id}`);
    return res.data.data;
};

export const createSensor = async (data) => {
    const res = await api.post("/sensor/create", data);
    return res.data.data;
}

export const updateSensor = async (id, data) => {
    const res = await api.put(`/sensor/update/${id}`, data);
    return res.data.data;
}

export const deleteSensor = async (id) => {
    const res = await api.delete(`/sensor/delete/${id}`);
    return res.data.data;
}