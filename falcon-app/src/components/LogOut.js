const Logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/Login'; // Redirect to login page after logout
  };

  
  export default Logout;