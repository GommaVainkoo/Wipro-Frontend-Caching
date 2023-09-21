import React,{useContext,useState,useEffect} from 'react'
import './module.css'
import axios from 'axios';
import AuthContext from '../context/AuthContext'
import { openDB } from 'idb';
let formattedDataArray =[]
let connected= true;
let count=1;
const functionKey = 'hasFunctionRun';
const functionKey1 = 'hasFunctionRun1';
const functionKey2 = 'hasFunctionRun2';

const HomePage = () => {
    let {user,AuthToken}=useContext(AuthContext)
    let [Hobbiess, setNotes] = useState([])
    const [tableData, setTableData] = useState([]);
    const [tableData1, setTableData1] = useState([]);

    

    useEffect(()=>{
        
        function getNotesAndTable() {
            try {
                if (count === 1){
                        getNotes()
                        getTable()
                        getTableIndex()
                        console.log("it comes here")
                        count = count +1
                }
            } catch (error) {
                connected=false
                fetchData()
                console.error('Error:', error);
            }
        }

        getNotesAndTable()
    },[])


        async function getNotes(){
            try{const response = await fetch('http://localhost:8000/api/hobbies', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(AuthToken.access)
                }
            });
           
                if (response.status === 200) {
                    const data = await response.json();
                    setNotes(data);
                    const hasFunctionRun = localStorage.getItem(functionKey);
                    if(!hasFunctionRun){
                        localStorage.setItem(functionKey, true)
                        console.log("bro1")
                        return store_hobbie(data)
                    }
                        
                } else {
                    throw new Error('Request failed');
                }
            }catch(error){
                console.log("error:",error)
            }
        }
        
        
        function store_hobbie(data){
            const request = indexedDB.open('myDatabase', 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                var objectStore = db.createObjectStore('UserData', { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex('username', 'username', { unique: false });
                objectStore.createIndex('password', 'password', { unique: false });
                objectStore.createIndex('hobbies', 'hobbies', { unique: false });   
                
             }
             request.onsuccess =(event)=>{
                const db = event.target.result;
                const transaction = db.transaction('UserData', 'readwrite');
                const objectStore = transaction.objectStore('UserData');
                data.forEach(item => {
                    let Userdata={'username': user.username, 'password': user.Email_ID,'hobbies': [item.body]}
                    objectStore.add(Userdata);
                });
                db.close();
               
            }
        };

        function getTable (){

                try{return axios.get('http://localhost:8000/api/table').then
                (response =>{
                            const hasFunctionRun1 = localStorage.getItem(functionKey1);
                            if(!hasFunctionRun1){
                                localStorage.setItem(functionKey1, true)
                                storeDataInDB(response.data)
                            }
                            setTableData1(response.data)
                            })
                .catch (error=> {
                console.error('Error fetching data:', error);
                connected=false
                fetchData();
            })}catch(error){
                console.log("Error2:",error)
            }
    
        }



        function getTableIndex (){

            try{return axios.get('http://localhost:8000/api/index').then
            (response =>{
                        const hasFunctionRun2 = localStorage.getItem(functionKey2);
                        if(!hasFunctionRun2){
                            localStorage.setItem(functionKey2, true)
                            storeDataIndex(response.data)
                        }
                        })
            .catch (error=> {
            console.error('Error fetching data:', error);
        })}catch(error){
            console.log("Error2:",error)
        }

    }

    function storeDataIndex(data){
        const request = indexedDB.open('csv_data', 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            var objectStore = db.createObjectStore('TableData', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('Period', 'period', { unique: false });
            objectStore.createIndex('InstSector', 'inst_sector', { unique: false });
            objectStore.createIndex('InstSectorCode', 'inst_sector_code', { unique: false });
            objectStore.createIndex('Descriptor', 'descriptor', { unique: false });
            objectStore.createIndex('SNA08Trans', 'sna08trans', { unique: false });
            objectStore.createIndex('AssetLiabilityCode', 'asset_liability_code', { unique: false });
         }
        request.onsuccess = event => {
            const db = event.target.result;
            const transaction = db.transaction("TableData", "readwrite");
            const objectStore1 = transaction.objectStore("TableData");
            data.forEach(item => {
                let Userdata={'Period':item.period,'InstSector':item.inst_sector ,'InstSectorCode':item.inst_sector_code,
                'Descriptor':item.descriptor,'SNA08Trans':item.sna08trans,'AssetLiabilityCode':item.asset_liability_code}
                objectStore1.add(Userdata);
            });

          };
         
          
        }

    function storeDataInDB(data){
        const request = indexedDB.open('blahh', 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            var objectStore1 = db.createObjectStore('TableData', { keyPath: 'id', autoIncrement: true });
            objectStore1.createIndex('Version', 'Version', { unique: false });
            objectStore1.createIndex('Released', 'Released', { unique: false });
            objectStore1.createIndex('EOS', 'EOS', { unique: false });
            objectStore1.createIndex('Latest', 'Latest', { unique: false });
         }
        request.onsuccess = event => {
            const db = event.target.result;
            const transaction = db.transaction("TableData", "readwrite");
            const objectStore1 = transaction.objectStore("TableData");
            data.forEach(item => {
                let Userdata={'Version':item.version,'Released':item.released ,'EOS':item.eos,'Latest':item.latest}
                objectStore1.add(Userdata);
            });

          };
         
          
        }
        async function  fetchData ()  {
            const db =  await openDB('blahh', 1);
            const transaction1 = db.transaction('TableData', 'readonly');
            const objectStore = transaction1.objectStore('TableData');
            const data = await objectStore.getAll();
            formattedDataArray = data.map((item) => ({
                id: item.id,
                version: item.Version,
                released: item.Released,
                eos: item.EOS,
                latest: item.Latest
            }));
              
              setTableData(formattedDataArray);
        }

  return (
    
    <div>
        <form>
            <p>You are logged in to the home page!</p>
            <p><u>Username</u>: {user.username}</p>
            <p><u>Email ID</u>: {user.Email_ID}</p>
            <h2><u>Hobbies:</u></h2>
            <p>
            <ul>
                {Hobbiess.map(Hobbiess => (
                    <li key={Hobbiess.id} >{Hobbiess.body}</li>
                ))}
            </ul>
            </p>
            <h2><u>Table Data:</u></h2>
            <table className='data-table'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Version</td>
                        <td>Released</td>
                        <td>EOS</td>
                        <td>Latest</td>
                    </tr>
                </thead>
                <tbody>
                    {connected? tableData1.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.version}</td>
                            <td>{item.released || "N/A"}</td>
                            <td>{item.eos}</td>
                            <td>{item.latest}</td>
                        </tr>
                    )):tableData.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.version}</td>
                            <td>{item.released || "N/A"}</td>
                            <td>{item.eos}</td>
                            <td>{item.latest}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            
        </form>
    </div>
  )
}

export default HomePage