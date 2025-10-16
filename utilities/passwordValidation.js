
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

const passwordVal = {
  validatePassword(password) {
    return passwordRegex.test(password); 
  }
};

export default passwordVal;
