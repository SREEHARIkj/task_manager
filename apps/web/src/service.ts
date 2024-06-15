import { AxiosError, AxiosResponse } from 'axios';
import { api, catchErrorHandeler } from './lib/utils/axiosConfig';
import { PriorityType, StatusType, TaskType, consts } from './constants/const';

export const getAllTasks = async (): Promise<AxiosResponse<TaskType[]> | undefined> => {
  try {
    const { data } = await api().get(consts.tasks);
    return data;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const getAllPriorities = async (): Promise<AxiosResponse<PriorityType[]> | undefined> => {
  try {
    const { data } = await api().get(consts.priorities);
    return data;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const getAllStatuses = async (): Promise<AxiosResponse<StatusType[]> | undefined> => {
  try {
    const { data } = await api().get(consts.statuses);
    return data;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const getTask = async (id: string): Promise<AxiosResponse<TaskType[]> | undefined> => {
  try {
    const { data } = await api().get(`${consts.tasks}/${id}`);
    return data;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const addTask = (payload: { title: string | null; description: string | null }) => {
  try {
    const result = api().post(consts.tasks, payload);
    return result;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const updateTask = (params: { id: string; payload: Partial<TaskType> }) => {
  try {
    const result = api().put(`${consts.tasks}/${params.id}`, params.payload);
    return result;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const removeTask = (id: number) => {
  try {
    const result: Promise<AxiosResponse & { message: string }> = api().delete(`${consts.tasks}/${id}`);
    return result;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};
