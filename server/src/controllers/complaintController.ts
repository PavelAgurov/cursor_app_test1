import { Request, Response } from 'express';
import { complaintService } from '../services/complaintService';
import Complaint from '../types/complaint';

interface ComplaintController {
  getAllComplaints(req: Request, res: Response): void;
  getComplaintsByUser(req: Request, res: Response): void;
  addComplaint(req: Request, res: Response): void;
}

const complaintController: ComplaintController = {
  getAllComplaints: (req: Request, res: Response): void => {
    try {
      const complaints = complaintService.getAllComplaints();
      
      if (complaints) {
        res.status(200).json({
          success: true,
          complaints
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to retrieve complaints'
        });
      }
    } catch (error) {
      console.error('Error in getAllComplaints controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },
  
  getComplaintsByUser: (req: Request, res: Response): void => {
    try {
      const { username } = req.params;
      
      if (!username) {
        res.status(400).json({
          success: false,
          message: 'Username is required'
        });
        return;
      }
      
      const complaints = complaintService.getComplaintsByUser(username);
      
      if (complaints) {
        res.status(200).json({
          success: true,
          complaints
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'No complaints found for this user'
        });
      }
    } catch (error) {
      console.error('Error in getComplaintsByUser controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },
  
  addComplaint: (req: Request, res: Response): void => {
    try {
      const complaintData = req.body as Complaint;
      
      if (!complaintData.owner || !complaintData.text) {
        res.status(400).json({
          success: false,
          message: 'Owner and text are required fields'
        });
        return;
      }
      
      const success = complaintService.addComplaint(complaintData);
      
      if (success) {
        res.status(201).json({
          success: true,
          message: 'Complaint added successfully'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to add complaint'
        });
      }
    } catch (error) {
      console.error('Error in addComplaint controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

export { complaintController }; 