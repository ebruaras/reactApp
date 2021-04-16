import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useState, useEffect } from 'react'
import AddBook from '../addbook/addbook'

const Tablecomponent=()=>{

  const [books, setBooks] = useState([])

  const [actiontype, setactiontype] = useState('')

  const [bookid, setbookid] = useState(0)



  useEffect(() => {

    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const res = await fetch('http://localhost:8080/api/allBook')
    const data = await res.json()
    setBooks(data)
  }

  const deleteBook = async (id) => {
    const res = await fetch(`http://localhost:8080/api/delete/${id}`, 
    {
      method: 'DELETE',
    })
    res.status === 200 ? setBooks(books.filter((book) => book.id !== id)) : alert('Error Deleting This Book')


  }

    const editrow = (id) => {
    console.log(books);
    setbookid(id);
    setactiontype('Edit');
   }

   const updatetable= (data,tip)=>{
     if(tip==='edit')
     {
       console.log(data);
      setBooks(books.map((book) =>book.id === data.id ? { ...book, 
        name:data.name, author:data.author,page:data.page} : book )   )
     }
     else if(tip==='add')
     {
     setBooks([...books, data])
     }
   }



return (

<div>
  <div align="right"><button type='button' onClick={()=>setactiontype('Add')}>Yeni Sipariş Ekle</button> </div>

 <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell>Book ID</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Page</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { books.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.page}</TableCell>
              <TableCell>
                <button type='button' onClick={()=> editrow(row.id)}> Edit</button>
                <button type='button' onClick={() => deleteBook(row.id)}> Sil</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    { (actiontype==='Edit' || actiontype==='Add') && <AddBook setaction={()=>setactiontype('')} actiontype={actiontype} bookid={bookid} updatetable={updatetable}/>   }
    </div>







  );
}

export default Tablecomponent;
