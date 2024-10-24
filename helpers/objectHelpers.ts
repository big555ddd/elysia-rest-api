

export function stringifyWithBigInt(obj: any) {
  return JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value // แปลง BigInt เป็น string
  );
}

// Helper function to omit specific fields from an object
export const omitFields = (data: any, fields: string[]) => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const newItem = { ...item };
      fields.forEach((field) => delete newItem[field]); // ลบฟิลด์ที่ต้องการออกจาก object
      return newItem;
    });
  } else {
    const newItem = { ...data };
    fields.forEach((field) => delete newItem[field]); // ลบฟิลด์ที่ต้องการออกจาก object
    return newItem;
  }
};
