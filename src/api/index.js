import axios from 'axios';

export const getOftenGoods = () => {
  return axios.get('http://jspang.com/DemoApi/oftenGoods.php');
};

export const getTypeGoods = () => {
  return axios.get('http://jspang.com/DemoApi/typeGoods.php');
};


