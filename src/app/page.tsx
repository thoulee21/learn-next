'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, FloatingLabel, Form, ListGroup, Navbar } from 'react-bootstrap';
import './page.module.css';

interface Pokemon {
  name: string;
  url: string;
}

function Page() {
  const [datas, setDatas] = useState([] as Array<Pokemon>);
  const [showDatas, setShowDatas] = useState([] as Array<Pokemon>);

  const getData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
      .then((response) => response.json())
      .then((data) => {
        setDatas(data.results)
        setShowDatas(data.results)
      });
  }

  const onSearch = (e: any) => {
    const value = e.target.value;
    let filtered = [];
    if (value !== '') {
      filtered = datas.filter((item) => {
        return item.name.includes(value);
      });
      setShowDatas(filtered);
    } else {
      setShowDatas(datas);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar variant='dark' bg='dark'>
        <Container>
          <Navbar.Brand>Pokemon</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <FloatingLabel label='Search'>
          <Form.Control
            type='text'
            id='scerchText'
            onChange={onSearch}
            placeholder='Search'
          />
        </FloatingLabel>
        <ListGroup >
          {showDatas.map((item) => {
            return (
              <ListGroup.Item
                key={item.url}
              >
                {item.name}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Container>
    </div>
  );
}

export default Page;
