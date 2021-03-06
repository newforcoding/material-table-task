import React ,{useState,useEffect}from 'react'
import MaterialTable from 'material-table'
import './App.css'

function Data() {
    const columns =[
        // { title: 'Id', field: 'id',editable:false },
        { title: 'Name', field: 'name'},
        { title: 'Username', field: 'username'},
        { title: 'Email', field: 'email'},
        { title: 'Phone',field: 'phone'},
        { title: 'Website', field: 'website'},
      ];
    
      const [data, setData] = useState([]);
     
      useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>res.json())
        .then(res=>setData(res))
      },[])
    
    return (
        <div className='data'>
        <MaterialTable
        className='table'
       title="User Data"
       columns={columns}
       data={data}
       options={{actionsColumnIndex:-1,addRowPosition:'first'}}
       editable={{
        onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            setData([...data, newData]);
            resolve();
          }, 1000)
        console.log(newData)
        }),

        onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataUpdate = [...data];
            const index = oldData.tableData;
            dataUpdate[index] = newData;
            setData([...dataUpdate]);
            console.log('newData',newData)
            console.log('oldData',oldData)
            resolve();
          }, 1000)
        }),

        onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataDelete = [...data];
            const index = oldData.tableData;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            console.log(oldData)
            resolve();
          }, 1000)
        }),
       }}
       />
        </div>
    )
}

export default Data
