import api from "../services/api";

export const getAllUser = async (query) => {
    const res = await api.get("/user/all", {
        params: query,
    });
    return res.data;
};

export const getUserById = async (id) => {
    const res = await api.get(`/user/${id}`);
    return res.data;
};

export const createUser = async (data) => {
    const res = await api.post("/user/create", data);
    return res.data;
}

export const updateUser = async (id, data) => {
    const res = await api.put(`/user/update/${id}`, data);
    return res.data;
}

export const deleteUser = async (id) => {
    const res = await api.delete(`/user/delete/${id}`);
    return res.data;
}