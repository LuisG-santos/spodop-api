export const normalizePhoneNumber = (phone: string) => {
      const digits = phone.replace(/\D/g, "");
      return digits.startsWith("55") ? `+${digits}` : `+55${digits}`;
    };