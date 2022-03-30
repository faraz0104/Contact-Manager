import React, { useState , useEffect} from 'react'
import {useSelector} from "react-redux"
import { Link,useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import {toast} from "react-toastify"
import {useDispatch       } from "react-redux"

const EditContact = () => {    
  const dispatch = useDispatch();

  let navigate = useNavigate();
  
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[number,setNumber]=useState("");                       
    const {id} =useParams();
const contacts = useSelector(state=>state)
const currentContact = contacts.find(contact=>contact.id === parseInt(id))

useEffect(()=>{
if(currentContact){
  setName(currentContact.name)
  setEmail(currentContact.email)
  setNumber(currentContact.number)
}
},[currentContact])
const handleSubmit = (e)=>{                                                            
  e.preventDefault();
   
  //To Check is contact is already present or not 
  const checkEmail =   contacts.find((contact)=>contact.id!== parseInt(id)  && contact.email === email ) 
  const checkNumber= contacts.find((contact)=>contact.id!== parseInt(id)  &&  contact.number === parseInt(number) )    

  if(!email || !number || !name){ // if it is not present
    return toast.warning("Please fill in all fields")

  }
  if(checkEmail){
    return toast.error("Email is Already Exists")
  }
  if(checkNumber){
    return toast.error("Number is Already Exists")
  }

  const data ={ //contcts we are getting from redux
    id:parseInt(id), //to get new id last element+1 id        
    name,
    email,
    number,
  }
 dispatch({type:"UPDATE_CONTACT",payload:data});
 toast.success("Details Updated Successfully")
 navigate("/")
}



  return (
    <div className="container">      
    {
         currentContact? ( <>
          <h1 className="display-3 my-5 text-center">
          Edit Student {id}
        </h1>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}> 
              <div className='form-group'>
                  <input type="text" placeholder='Name' className='form-control' value={name} onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className='form-group'>
                  <input type="email" placeholder='Email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className='form-group'>
                  <input type="number" placeholder='Phone number' className='form-control' value={number} onChange={(e)=>setNumber(e.target.value)} />
              </div>
              <div className='form-group'>
                  <input type="submit"
                   value="Update Student" 
                   className='btn  btn-dark'/>
                   <Link to="/"
                   className='btn  btn-danger ml-3'>
                   Cancel</Link>
              </div>
          </form>
        </div>
      </div>
      </>

         ):(
          <h1 className="display-3 my-5 text-center">
      Contact Detail with id  {id} is not Found
        </h1>
         )
    }   
        
    </div>
  )
}

export default EditContact