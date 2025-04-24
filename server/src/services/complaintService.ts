import { complaintDataAccess } from '../dataAccess/complaintDataAccess';
import Complaint from '../types/complaint';

interface ComplaintService {
  getAllComplaints(): Complaint[] | null;
  getComplaintsByUser(username: string): Complaint[] | null;
  addComplaint(complaint: Complaint): boolean;
}

const complaintService: ComplaintService = {
  getAllComplaints: (): Complaint[] | null => {
    try {
      return complaintDataAccess.getComplaints();
    } catch (error) {
      console.error('Error getting all complaints:', error);
      return null;
    }
  },
  
  getComplaintsByUser: (username: string): Complaint[] | null => {
    try {
      return complaintDataAccess.getComplaintsByUser(username);
    } catch (error) {
      console.error('Error getting complaints by user:', error);
      return null;
    }
  },
  
  addComplaint: (complaint: Complaint): boolean => {
    try {
      // Validate complaint data
      if (!complaint.owner || !complaint.text) {
        return false;
      }
      
      // Set default values if not provided
      if (!complaint.id) {
        complaint.id = Date.now().toString();
      }
      
      if (!complaint.creationDate) {
        complaint.creationDate = new Date().toISOString();
      }
      
      if (!complaint.status) {
        complaint.status = 'created';
      }
      
      return complaintDataAccess.addComplaint(complaint);
    } catch (error) {
      console.error('Error adding complaint:', error);
      return false;
    }
  }
};

export { complaintService }; 