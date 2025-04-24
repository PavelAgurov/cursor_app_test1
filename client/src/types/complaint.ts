export type ComplaintStatus = 'created' | 'in progress' | 'done';

export interface Complaint {
  id: string;
  owner: string;
  creationDate: string;
  status: ComplaintStatus;
  text: string;
}

export interface ComplaintFormData {
  text: string;
} 