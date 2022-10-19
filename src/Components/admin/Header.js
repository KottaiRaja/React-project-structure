import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

export default function Header(){

    var userid = localStorage.getItem('user_id');

    const [username, setUsername] = useState('');

    var datastring = {userid:userid};
    var config = {headers:{'enctype':'multipart/form-data'}};

    useEffect(()=>{
        axios.post('http://localhost:3004/Userdetails',datastring,config)
        .then(function(res){
            setUsername(res.data.status);
        })
        .catch(function(err){
            alert(err);
        })
    })

    return(
        <>
        <div className='container mborder'>
            <div className="row">
                <div className="col-lg-2">
                    <p>Resume Builder</p>
                </div>
                <div className="col-lg-6">&nbsp;</div>
                <div className="col-lg-2">
                    <p>{username}</p>
                </div>
                <div className="col-lg-2">
                    <Link to="/">
                        <button type="button" name="data_logout" id="data_logout"
                        className="btn btn-danger">Logout</button>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}