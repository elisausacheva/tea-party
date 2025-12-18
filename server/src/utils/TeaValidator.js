class TeaValidator {
  static validate(tea) {
    const { name, desc } = tea;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return {
        isValid: false,
        error: "Name must be string",
      };
    }
    if (!desc || typeof desc !== "string" || desc.trim() === "") {
      return {
        isValid: false,
        error: "Desc must be string",
      };
    }
    // if (!img || typeof img !== "string" || img.trim() === "") {
    //   return {
    //     isValid: false,
    //     error: "Desc must be string",
    //   };
    // }
    
    return {
      isValid: true,
      error: null,
    };
  }
}
module.exports = TeaValidator