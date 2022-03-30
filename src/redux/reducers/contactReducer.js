const initialState = [
    {
         id:0,
         name:"Shayam Das",
         number:989794359,
         email:"abc@gmail.com",
    },
    {
      id:1,
      name:"Mohammad Nadeem",
      number:7968796989745,
      email:"xyzzz@gmail.com",
    },
];

const contactReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ADD_CONTACT":
            state = [... state,action.payload] //change the state in the state we add action.payload
            return state;
            case "UPDATE_CONTACT":
                const updateState = state.map(contact => contact.id === action.payload.id ? action.payload : contact)
                state=updateState;
                return state;
                case "DELETE_CONTACT":
                    const filterContact = state.filter(contact => contact.id !== action.payload
                        && contact);
                        state=filterContact
                        return state
        default:
             return state;
    }
}

export default contactReducer;