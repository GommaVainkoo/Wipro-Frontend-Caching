import {createContext,useEffect,useState} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{
    let [AuthToken,setAuthTokens]=useState(()=>localStorage.getItem('AuthToken')? JSON.parse(localStorage.getItem('AuthToken')):null)
    let [user,setUser]=useState(()=>localStorage.getItem('AuthToken')? jwt_decode(localStorage.getItem('AuthToken')):null)
    let [loading,setLoading]=useState(true)

    const history=useNavigate()

    let loginUser = async (e )=> {
        e.preventDefault()
        let data = await fetch('http://localhost:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })
        let dataa= await data.json()
        if(data.status===200){
            setAuthTokens(dataa)
            setUser(jwt_decode(dataa.access))
            localStorage.setItem("AuthToken",JSON.stringify(dataa))
            history("/")
        }else{
            alert("Invalid username information")
        }
    }
    let logout=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("AuthToken")
        let url="http://127.0.0.1:3000/login"
        window.location.href = url;
        window.indexedDB.deleteDatabase('myDatabase');
        window.indexedDB.deleteDatabase('blahh');
        window.indexedDB.deleteDatabase('csv_data');
        localStorage.clear();
        history("/login")
    }

    let contextData={
        user:user,
        AuthToken:AuthToken,
        loginUser:loginUser,
        logout:logout,
    }
    let updateToken = async()=>{
        console.log("updateToken called")
        let data = await fetch('http://localhost:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({'refresh':AuthToken.refresh})
        }) 
        let dataa= await data.json()
        if(data.status===200){
            setAuthTokens(dataa)
            setUser(jwt_decode(dataa.access))
            localStorage.setItem("AuthToken",JSON.stringify(dataa))
        }else{
            logout()
        }

    }
    useEffect(()=>{
        let times=setTimeout(()=>{
            if(AuthToken){
                updateToken()
            }
        },1000 *4 * 60)
        return ()=> clearTimeout(times)
    },[AuthToken,loading])
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}