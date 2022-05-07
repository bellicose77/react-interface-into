import { useCallback, useEffect, useState } from 'react';
import {BiCalendar} from 'react-icons/bi'
import Appoinment from './components/Appoinment/Appoinment';
import AppointmentInfo from './components/AppointmentInfo/AppointmentInfo';
import Search from './components/Search/Search';
function App() {
  const [appoinmentList,setAppoinmentList]=useState([]);
  const deleteHandler = ()=>{
    console.log("delete button");
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
        <Search></Search>
        <ul className="divide-y divide-gray-200">
           {
             appoinmentList.map(appointment => <AppointmentInfo key={appointment.id}
              deleteHandler={deleteHandler} appointment={appointment}/>)
           }
        </ul>
    </div>
  );
}

export default App;
