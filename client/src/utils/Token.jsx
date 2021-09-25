/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const Token = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const config = {
    headers: {
      'x-auth-token': `${user.token}`,
    },
  };

  return config;
};

export default Token;
