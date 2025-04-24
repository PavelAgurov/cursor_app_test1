export type ComplaintStatus = 'created' | 'in progress' | 'done';

export default interface Complaint {
  id: string;
  owner: string;
  creationDate: string;
  status: ComplaintStatus;
  text: string;
}

export interface ComplaintData {
  complaints: Complaint[];
} 