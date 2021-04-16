import {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const AddBook=({setaction,actiontype,bookid,updatetable})=>{


    useEffect(() => {fetchBook()},[]);
    
    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          bbook: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      

      const fetchBook = async () => {
          if(actiontype==='Edit'){
        const res = await fetch(`http://localhost:8080/api/book/${bookid}`)
        const data = await res.json()
         
        setname(data.name);
        setauthor(data.author);
        setpage(data.page);
      }
    }
      

      const updateBook = async (book) => {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book)
      };

        const res = await fetch(`http://localhost:8080/api/update`,requestOptions)
        res.status === 200 ? updatetable(book,'edit') : alert('Error Updating This Book')
    }
   
    const addBook = async (book) => { 
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    };

        const res = await fetch(`http://localhost:8080/api/add`,requestOptions)
        const data = await res.json()
        book.id=data.id
        res.status === 201 ? updatetable(book,'add'): alert('Error Adding This Task')
    }

        const classes = useStyles();
        const [open, setOpen] = useState(true);
      
        const handleOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
          setaction('');
        };

        const [name,setname] =useState('');
        const [author,setauthor] =useState('');
        const [page,setpage] =useState('');
;


    const onsubmitt=(e)=>{
        e.preventDefault();
        var book=({"name":name,"author":author,"page":page})

        if(actiontype==='Edit'){
        var book=({"id":bookid,"name":name,"author":author,"page":page})
        updateBook(book)
        }
        else if(actiontype==='Add'){
        addBook(book)
        }
        setname('');
        setauthor('');
        setpage('');


        setOpen(false);
        setaction();

        }



return(

<div>
<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
<Fade in={open}>



<div className={classes.paper}>
<form onSubmit={onsubmitt}>
<label>Name:</label><input  type='text' value={name}  onChange={(e)=>setname(e.target.value)}></input>
<label>Author:</label><input  type='text' value={author}  onChange={(e)=>setauthor(e.target.value)}></input>
<label>Page:</label><input  type='text' value={page} onChange={(e)=>setpage(e.target.value)}></input>


<button type='submit' >{actiontype}</button>
</form>
</div>



</Fade>
</Modal>

</div>



)
}



export default AddBook;