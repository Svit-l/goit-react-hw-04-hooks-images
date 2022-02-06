import axios from 'axios';

const API_KEY = '24539365-a9ec93e41963d169f0a4900c0';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchString, page, itemsPerPage) {
  const response = await axios.get(
    `${axios.defaults.baseURL}?q=${searchString}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`
  );
  return response;
}
