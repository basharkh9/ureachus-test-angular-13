export type InspectionResult =
  | 'No Violation Issued'
  | 'Violation Issued'
  | 'Pass'
  | 'Fail';

export interface Inspection {
  _id: string;
  inspectionNumber: number;
  inspectionId: string;
  certificate: string;
  businessName: string;
  industrySector: string;
  city: string;
  inspectionDate: Date;
  inspectionResult: InspectionResult;
  enabled: boolean;
}

// Todos :
// Move Result
// I don't think Result belongs here
export type Result = { totalitems: number; inspections: Inspection[] };
