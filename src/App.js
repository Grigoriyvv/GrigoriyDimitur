import React, { useState, useEffect } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ComicList from './components/ComicList';
import Header from './components/Header';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data.js';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', author: '', description: '', genre: '' });
  const [editingComicId, setEditingComicId] = useState(null);
  const [comicsData, setComicsData] = useState(() => {
    const storedData = localStorage.getItem('comicsData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    localStorage.setItem('comicsData', JSON.stringify(comicsData));
  }, [comicsData]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'evgeni69@gmail.com' && password === 'tainoiskam6') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddComic = () => {
    if (!formData.title || !formData.author || !formData.description || !formData.genre) {
      alert('Please fill in all fields.');
      return;
    }

    const newComic = { id: comicsData.length + 1, ...formData };
    setComicsData([...comicsData, newComic]);
    setFormData({ title: '', author: '', description: '', genre: '' });
    setShowForm(false);
  };

  const handleEditComic = (id) => {
    const comicToEdit = comicsData.find((comic) => comic.id === id);
    setFormData(comicToEdit);
    setEditingComicId(id);
    setShowForm(true);
  };

  const handleUpdateComic = () => {
    const updatedComicsData = comicsData.map((comic) => {
      return comic.id === editingComicId ? formData : comic;
    });
    setComicsData(updatedComicsData);
    setFormData({ title: '', author: '', description: '', genre: '' });
    setEditingComicId(null);
    setShowForm(false);
  };

  const handleDeleteComic = (id) => {
    const filteredComics = comicsData.filter((comic) => comic.id !== id);
    setComicsData(filteredComics);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <Container>
          <h1 className="text-center mt-4">Comic Book Management App - Login</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Container>
      </div>
    );
  }

  return (
    <div className="App">
      <Container>
        <Header />
        <Button variant="danger" onClick={handleLogout} className="mb-3">
          Quit
        </Button>
        <Form>
          <InputGroup className="my-3">
            <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder="Search Comic Books" />
          </InputGroup>
          <Form.Group controlId="genreFilter">
            <Form.Label>Filter by Genre:</Form.Label>
            
            <Form.Control as="select" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
              <option value="">All Genres</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Comedy">Comedy</option>
              <option value="Thriller">Thriller</option>
              <option value="Sci-fi">Sci-fi</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <br />
        <Button variant="success" onClick={() => setShowForm(true)} className="mb-3">
          Add Comic
        </Button>
        {showForm && (
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" type="text" value={formData.title} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control name="author" type="text" value={formData.author} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" as="textarea" value={formData.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control name="genre" type="text" value={formData.genre} onChange={handleInputChange} />
            </Form.Group>
            {editingComicId ? (
              <Button variant="success" onClick={handleUpdateComic}>
                Update Comic
              </Button>
            ) : (
              <Button variant="success" onClick={handleAddComic}>
                Add Comic
              </Button>
            )}
          </Form>
        )}
        <br />
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comicsData
              .filter((item) => {
                const matchesSearch = search.toLowerCase() === '' || item.title.toLowerCase().includes(search);
                const matchesGenre = selectedGenre === '' || item.genre === selectedGenre;
                return matchesSearch && matchesGenre;
              })
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.description}</td>
                  <td>{item.genre}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEditComic(item.id)}>
                      Edit
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteComic(item.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
