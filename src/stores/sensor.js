// @ts-nocheck
import { createQuery, createMutation } from '@tanstack/svelte-query';
import { queryClient } from '../utils/helpers/queryClient.js';
import {
    getAllSensor,
    getSensorById,
    getLocationSensor,
    getLocationParameter,
    createSensor,
    updateSensor,
    deleteSensor
} from '../utils/endpoints/sensor.js';

export const sensorQuery = (params = { page: 1, limit: 10, search: "" }) =>
    createQuery({
        queryKey: ['sensors', params],
        queryFn: () => getAllSensor(params),
    });

export const sensorByIdQuery = (id) =>
    createQuery({
        queryKey: ['sensor', id],
        queryFn: () => getSensorById(id),
        enabled: !!id,
    });

export const locationSensorQuery = () =>
    createQuery({
        queryKey: ['sensor-locations'],
        queryFn: getLocationSensor,
    });

export const parameterSensorQuery = () =>
    createQuery({
        queryKey: ['sensor-parameters'],
        queryFn: getLocationParameter,
    });

export const createSensorMutation = () =>
    createMutation({
        mutationFn: createSensor,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sensors'] }),
    });

export const updateSensorMutation = () =>
    createMutation({
        mutationFn: ({ id, data }) => updateSensor(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sensors'] }),
    });

export const deleteSensorMutation = () =>
    createMutation({
        mutationFn: deleteSensor,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sensors'] }),
    });

