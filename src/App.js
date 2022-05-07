import { useCallback, useEffect, useState } from 'react';
import {BiCalendar} from 'react-icons/bi'
import Appoinment from './components/Appoinment/Appoinment';
import AppointmentInfo from './components/AppointmentInfo/AppointmentInfo';
import Search from './components/Search/Search';
function App() {
  const [appoinmentList,setAppoinmentList]=useState([]);
  const [query,setQuery]=useState("");
  const[sortBy,setSortBy]=useState("petName");
  const[orderBy,setOrderBy]=useState('asc');

  const onChangeQuery=(myQuery)=>{
   
   setQuery(myQuery);
   console.log(query);
  };
  const deleteHandler = (id)=>{
    console.log("delete button",id);
    const deletedata=appoinmentList.filter(appointment=>(appointment.id!==id))
    setAppoinmentList(deletedata);
  };
  const filteredAppoinment = appoinmentList.filter(
    item=>{
      return (
        item.petName.toLowerCase().includes(query.toLocaleLowerCase())||
        item.ownerName.toLowerCase().includes(query.toLocaleLowerCase())||
        item.aptNotes.toLowerCase().includes(query.toLocaleLowerCase())
      )
    }
  ).sort((a,b)=>{
    let order = (orderBy==='asc') ? 1 : -1;
    return (
      a[sortBy].toLocaleLowerCase() < b[sortBy].toLocaleLowerCase() 
      ? -1 * order : 1 * order

    )
  });
  const onSortChange=(mySort)=>{
    console.log("sort");

  }
  const onOrderChange = (mySort)=>{
    console.log("order")
  }
  const fetchData = useCallback(()=>{
    fetch('./data.json')
    .then(res=>res.json())
    .then(data=>setAppoinmentList(data))
  },[]);
  useEffect(()=>{
    fetchData();
  },[fetchData])
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-500 align-top" />Your Appointments</h1>
        <Appoinment></Appoinment>
        <Search query={query} 
        onChangeQuery={onChangeQuery}
        sortBy={sortBy}
        orderBy={orderBy}
        onSortChange={onSortChange}
        onOrderChange={onOrderChange}
        >

        </Search>
        <ul className="divide-y divide-gray-200">
           {
             filteredAppoinment.map(appointment => <AppointmentInfo key={appointment.id}
              deleteHandler={deleteHandler} appointment={appointment}/>)
           }
        </ul>
    </div>
  );
}

export default App;
