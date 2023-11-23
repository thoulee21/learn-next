'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, FloatingLabel, Form, ListGroup, Navbar, Pagination, Spinner } from 'react-bootstrap';

const styles = {
  centerPaging: {
    display: 'flex',
    justifyContent: 'center',
  }
}

interface Pokemon {
  name: string;
  url: string;
}

function Page() {
  const [datas, setDatas] = useState([] as Array<Pokemon>);
  const [showDatas, setShowDatas] = useState([] as Array<Pokemon>);

  const [page, setPage] = useState(0);
  const [prev, setPrev] = useState('' as string | null);
  const [next, setNext] = useState('' as string | null);

  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=14');

  const onSearch = (e: any) => {
    const value: string = e.target.value;
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
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPrev(data.previous);
        setNext(data.next);
        setDatas(data.results)
        setShowDatas(data.results)
      });
  }, [url]);

  return (
    <div>
      <Navbar variant='dark' bg='dark'>
        <Container>
          <Navbar.Brand>Pokemon</Navbar.Brand>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              <Link href='/about'>
                About
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <FloatingLabel
          label='Search'
          style={{
            marginTop: '10px',
            marginBottom: '10px'
          }}
        >
          <Form.Control
            type='text'
            onChange={onSearch}
            placeholder='Search'
          />
        </FloatingLabel>

        <ListGroup >
          {showDatas.map((item) => {
            return (
              <ListGroup.Item key={item.url}>
                <a href={item.url}>
                  {item.name}
                </a>
              </ListGroup.Item>
            )
          })}
        </ListGroup>

        <Container
          hidden={!(datas.length !== 0 && showDatas.length !== 0)}
        >
          <hr />
          <Pagination style={styles.centerPaging}>
            <Pagination.Prev onClick={() => {
              if (prev) {
                setUrl(prev);
                setPage(page - 1);
              }
            }} />
            <Pagination.Item active>{page + 1}</Pagination.Item>
            <Pagination.Next onClick={() => {
              if (next) {
                setUrl(next);
                setPage(page + 1);
              }
            }} />
          </Pagination>
        </Container>
      </Container>

      <Spinner
        animation='grow'
        role='status'
        style={{
          display: 'block',
          margin: '50px auto 10px auto', // 上 右 下 左
        }}
        hidden={datas.length !== 0}
      />

      <p
        style={{
          textAlign: 'center',
          marginTop: '50px',
        }}
        hidden={!(showDatas.length === 0 && datas.length !== 0)}
      >
        :(<br />No matching Pokemon
      </p>
    </div>
  );
}

export default Page;
