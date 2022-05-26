export type InspectionResult = "No Violation Issued" | "Violation Issued" | "Pass" | "Fail";

export interface Inspection { 
    inspectionNumber: number,
    inspectionId: string,
    certificate: number,
    businessName: string
    industrySector: string,
    city: string,
    inspectionDate: Date,
    inspectionResult: InspectionResult,
    enabled: boolean,
  }

  // Todos : 
  // Move Result
  // I don't think Result belongs here
  export type Result = {totalitems: number, inspections: Inspection[]};