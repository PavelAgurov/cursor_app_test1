import axios from 'axios';
import { Complaint } from '../types/complaint';


export const getComplaints = async (): Promise<Complaint[]> => {
  try {
    const response = await axios.get('/api/complaints');
    if (response.data.success) {
      return response.data.complaints;
    }
    return [];
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return [];
  }
};

export const getUserComplaints = async (username: string): Promise<Complaint[]> => {
  try {
    const response = await axios.get(`/api/complaints/user/${username}`);
    if (response.data.success) {
      return response.data.complaints;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching complaints for user ${username}:`, error);
    return [];
  }
};

export const addComplaint = async (complaint: Complaint): Promise<boolean> => {
  try {
    const response = await axios.post('/api/complaints', complaint);
    return response.data.success;
  } catch (error) {
    console.error('Error adding complaint:', error);
    return false;
  }
}; 