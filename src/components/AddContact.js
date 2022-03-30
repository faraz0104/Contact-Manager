import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import {useSelector,useDispatch       } from "react-redux"
import {toast} from "react-toastify"

const AddContact = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[number,setNumber]=useState("");


  const contacts =useSelector((state)=>state)// return state because state contain array of   object
  console.log("usestate data" ,contacts)
  const dispatch = useDispatch();

  let navigate = useNavigate();
  
  const handleSubmit = (e)=>{                                                            
    e.preventDefault();
     
    //To Check is contact is already present or not 
    const checkEmail =   contacts.find((contact)=>contact.email === email && contact) 
    const checkNumber= contacts.find((contact)=>contact.number === parseInt(number) )    

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
      id:contacts[contacts.length-1].id+1, //to get new id last element+1 id        
      name,
      email,
      number,
    }
   dispatch({type:"ADD_CONTACT",payload:data});
   toast.success("Details Added Successfully")
   navigate("/")
  }

  return (
    <div className="container">
        <h1 className="display-3 my-5 text-center">
          Add Employee Details
        </h1>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
              <div className='form-group'>
                  <input type="text" placeholder='Name' className='form-control'
                    value={name} onChange={(e)=>setName(e.target.value)}
                  />
              </div>
              <div className='form-group'>
                  <input type="email" placeholder='Email' className='form-control'
                   value={email} onChange={(e)=>setEmail(e.target.value)}
                  />
              </div>
              <div className='form-group'>
                  <input type="number" placeholder='Phone number' className='form-control'
                    value={number} onChange={(e)=>setNumber(e.target.value)}
                  />
              </div>
              <div className='form-group'>
                  <input type="submit" value="Add Detail" className='btn btn-primary btn-lg btn-block'  />
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddContact