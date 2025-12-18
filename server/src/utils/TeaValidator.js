class TeaValidator {
  static validate(tea) {
    const { title, desc, img } = tea;
    if (!title || typeof title !== "string" || title.trim() === "") {
      return {
        isValid: false,
        error: "Title must be string",
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