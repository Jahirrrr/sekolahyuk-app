/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import { toast } from 'react-toastify';

const errorHandler = ex => {
  if (ex.response && ex.response.status >= 400 && ex.response.status < 500) {
    toast.error(ex.response.data);
  }
};

export default errorHandler;
