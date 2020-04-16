import axios from 'axios';
import uuid from 'uuid';


export default class MenuModel {
  constructor(name, price, cal, imgUrl, review, rating) {
    // this._id = uuid.v1();
    this.name = name || 'Chicken Frice';
    this.price = price || 4.99;
    this.calories = cal || 345;
    this.imgUrl = imgUrl || 'http://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4114.png';
    this.review = [];
    this.rating = rating || 4.4;
  }

  static async add(menu){
    let uri = axios.defaults.baseURL + '/menu';
    let response = await axios.post(uri, menu);
    console.log(response);
    return response.data;
  }

  static async getAll(){
    let uri = axios.defaults.baseURL + '/menu';
    let response = await axios.get(uri);
    console.log(response);
    return response.data;
  }

  static async getById(id){
    let uri = axios.defaults.baseURL + '/menu/' + id;
    let response = await axios.get(uri);
    console.log(response);
    return response.data;
  }
  static async update(id, menu){
    let uri = axios.defaults.baseURL + '/menu/' + id;
    let response = await axios.put(uri, menu);
    console.log(response);
    return response.data;
  }
  static async remove(id){
    let uri = axios.defaults.baseURL + '/menu/' + id;
    let response = await axios.delete(uri);
    console.log(response);
    return response.data;
  }
}
 