import { ColumnType } from "./schedule";

export interface ChartResumes {
  apply: {
    company?: string;
    department?: string;
  };
  tag: string[];
}
export interface ChartSchedules {
  application: {
    company: string;
    department: string;
  };
  column: ColumnType;
}
