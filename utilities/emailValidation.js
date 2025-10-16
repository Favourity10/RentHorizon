const emailVal = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  validate(email) {
    return this.emailRegex.test(email);
  }

};

export default emailVal;

 
