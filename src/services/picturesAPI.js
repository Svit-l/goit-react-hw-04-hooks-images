// const API_KEY = '24539365-a9ec93e41963d169f0a4900c0';

// const fetchImages = () => {
//   const { searchString, page, itemsPerPage } = this.state;
//   fetch(
//     `https://pixabay.com/api/?q=${searchString}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`
//   )
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else
//         return Promise.reject(new Error('There are no pictures for this word'));
//     })
//     .then(res => {
//       console.log(res);
//       if (res.total === 0) {
//         return toast.error('There are no pictures for this word', {
//           theme: 'colored',
//         });
//       } else
//         this.setState({
//           pictures: res.hits.map(item => ({
//             id: item.id,
//             webformatURL: item.webformatURL,
//             largeImageURL: item.largeImageURL,
//             alt: item.tags,
//           })),
//         });
//       return;
//     })
//     .catch(error => this.setState({ error }))
//     .finally(() => this.setState({ loading: false }));
// };

// const api = {
//   fetchImages,
// };

// export default fetchImages;
