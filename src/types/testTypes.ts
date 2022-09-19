export interface ITestData {
  id: number;
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDisciplineId: number;
  createdAt: Date;
}

export interface ITestBody {
  id: number;
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
  createdAt: Date;
}

export type TTestData = Omit<ITestData, "id" | "createdAt">;
