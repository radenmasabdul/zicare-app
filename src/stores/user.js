import { createQuery, createMutation } from '@tanstack/svelte-query';
import { queryClient } from '../utils/helpers/queryClient.js';
import {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../utils/endpoints/user.js';

export const userQuery = (params = { page: 1, limit: 10, search: "" }) =>
    createQuery({
        queryKey: ['users', params],
        queryFn: () => getAllUser(params),
    });

export const userByIdQuery = (id) =>
    createQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
        enabled: !!id,
    });

export const createUserMutation = createMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
});

export const updateUserMutation = createMutation({
    // @ts-ignore
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
});

export const deleteUserMutation = createMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
});
