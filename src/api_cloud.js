import axios from 'axios';

export default axios.create({
  baseURL: `http://clinicaqp.itperu.one:6969/`
});