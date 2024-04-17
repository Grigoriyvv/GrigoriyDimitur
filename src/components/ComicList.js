// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';


// const ComicList = () => {
//     const [comics, setComics] = useState([]);
  
//     useEffect(() => {
//       fetch('/comics.json') // Assuming comics.json is in the public folder
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Failed to fetch data');
//           }
//           return response.json();
//         })
//         .then(data => {
//           setComics(data);
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//         });
//     }, []);

    
//     return (
//         <div>
//           <h2>Comics List</h2>
//           <ul>
//             {comics.map(comic => (
//               <li key={comic.id}>
//                 <strong>Title:</strong> {comic.title} <br />
//                 <strong>Author:</strong> {comic.author} <br />
//                 <strong>Description:</strong> {comic.description}
//               </li>
//             ))}
//           </ul>
//         </div>       
//       );


// };


// export default ComicList;