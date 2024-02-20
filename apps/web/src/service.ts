import { AxiosError, AxiosResponse } from 'axios';
import { api, catchErrorHandeler } from './lib/utils/axiosConfig';
import { TaskType, consts } from './constants/const';

export const getAllTasks = async (): Promise<AxiosResponse<TaskType[]> | undefined> => {
  try {
    const { data } = await api().get(consts.tasks);
    return data;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const getTask = async (id: string): Promise<AxiosResponse<TaskType[]> | undefined> => {
  try {
    const { data } = await api().get(`${consts.task}/${id}`);
    return data;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const addTask = async (payload: { title: string; description: string }) => {
  try {
    const { data } = await api().post(consts.addTask, payload);
    return data;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const updateTask = async (params: { id: string; payload: Partial<TaskType> }) => {
  try {
    const { data } = await api().put(`${consts.updateTask}/${params.id}`, params.payload);
    return data;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};

export const removeTask = async (id: number) => {
  try {
    const response: AxiosResponse & { message: string } = await api().delete(`${consts.removeTask}/${id}`);
    return response?.message;
  } catch (error) {
    catchErrorHandeler(error as AxiosError);
  }
};
