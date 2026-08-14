import api, { getApiErrorMessage } from "./client";

export type EducationLevelVariant = {
  id: number;
  department: string | null;
};

export type EducationLevel = {
  name: string;
  variants: EducationLevelVariant[];
};

export type Language = {
  id: number;
  name: string;
  code: string;
};

export async function getEducationLevels(): Promise<EducationLevel[]> {
  try {
    const response = await api.get("/education-levels");
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch education levels"));
  }
}

export async function getLanguages(): Promise<Language[]> {
  try {
    const response = await api.get("/languages");
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to load languages"));
  }
}
