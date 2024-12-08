import instance from "./index.js"

async function getAllCategories() {
    try {
      const response = await instance.get('/category');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

async function getAllRestaurants() {
    try {
      const response = await instance.get('/resturant');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

async function getRestaurantById(id) {
    try {
      const response = await instance.get(`/resturant/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

async function getRestaurantItems(id) {
    try {
      const response = await instance.get(`/restaurant/${id}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

async function getItemDetails(id) {
    try {
      const response = await instance.get(`/item/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }




  

export { getAllCategories, getAllRestaurants, getRestaurantById, getRestaurantItems, getItemDetails };
