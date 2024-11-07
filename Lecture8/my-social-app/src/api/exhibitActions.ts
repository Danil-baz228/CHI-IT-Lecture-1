// api/exhibitActions.ts
import axiosInstance from './axiosInstance';

export const fetchExhibits = async () => {
  const response = await axiosInstance.get('/exhibits');
  return response.data;
};

export const createExhibit = async (exhibit: { title: string; description: string; imageUrl: string }) => {
  const response = await axiosInstance.post('/exhibits', exhibit);
  return response.data;
};

export const deleteExhibit = async (exhibitId: number) => {
  const response = await axiosInstance.delete(`/exhibits/${exhibitId}`);
  return response.data;
};
