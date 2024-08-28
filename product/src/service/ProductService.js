import axios from "axios";

const URL_PRODUCT = "http://localhost:8080/product";
const URL_CATEGORY = "http://localhost:8080/category";

export const getAllProduct = async (name, category)=> {
    try {
        let URL = `${URL_PRODUCT}?_sort=name&_order=asc&`;
        if (name) {
            URL += `name_like=${name}&`;
        }
        if (category) {
            URL += `category=${category}&`;
        }
        const res = await axios.get(URL);
        return res.data;
    } catch (e) {
        return [];
    }
}

export const saveProduct = async (product) => {
    try {
        await  axios.post(URL_PRODUCT, product)
        return true
    } catch (e) {
        return false
    }
}

export const checkProductCodeExists = async (code) => {
    try {
        const res = await axios.get(`${URL_PRODUCT}?code=${code}`);
        return res.data.length > 0;
    } catch (error) {
        return false;
    }
};