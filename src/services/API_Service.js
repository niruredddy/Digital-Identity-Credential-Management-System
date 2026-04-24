export const API_Service = {
  fetchUserData: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: userId,
          name: "Julian Alexander Thorne",
          credentialClass: "Sovereign Tier 1 (Ultra)",
          status: "Active"
        });
      }, 800);
    });
  },

  submitHash: async (hash) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = hash.length > 10;
        resolve({
          success: isValid,
          message: isValid ? "Authorized Access" : "Unauthorized",
          timestamp: new Date().toISOString()
        });
      }, 1500);
    });
  },

  issueCredential: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionHash: "0x" + Math.random().toString(16).substr(2, 40),
          timestamp: new Date().toISOString()
        });
      }, 1200);
    });
  }
};
