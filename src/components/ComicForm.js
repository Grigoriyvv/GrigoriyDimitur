// import React, { useState } from 'react';



// const AddComicForm = ({ onAdd }) => {
//     const [title, setTitle] = useState('');
//     const [author, setAuthor] = useState('');
//     const [description, setDescription] = useState('');
  
//     const handleSubmit = (event) => {
//       event.preventDefault();
//       // Create a new comic object
//       const newComic = {
//         title: title,
//         author: author,
//         description: description
//       };
//       // Call the onAdd function passed from the parent component with the new comic object
//       onAdd(newComic);
//       // Clear the form fields
//       setTitle('');
//       setAuthor('');
//       setDescription('');
//     };
  
//     return (
//       <div>
//         <h2>Add New Comic</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Title:
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </label>
//           <br />
//           <label>
//             Author:
//             <input
//               type="text"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//               required
//             />
//           </label>
//           <br />
//           <label>
//             Description:
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//           </label>
//           <br />
//           <button type="submit">Add Comic</button>
//         </form>
//       </div>
//     );
//   };
  
//   export default AddComicForm;