export interface BcrbReport {
  id: number;
  processId: string;
  reportType: string;
  reportName: string;
  fileName: string;
  createdAt: string;
  status: 'Processing' | 'Completed' | 'Failed';
}
