import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Signin(){

    localStorage.clear();

    const handlesubmit = async(event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers:{'enctype':'multipart/form-data'}};

        await axios.post('http://localhost:3004/Signin',datastring,config)
              .then(function(res){
                    if(res.data.status === 'Query_Error'){
                      alert('Invalid data');
                      window.location.reload();  
                    }
                    else if(res.data.status === 'Invalid_Login'){
                        alert('Invalid Login');
                        window.location.reload();
                    }
                    else if(res.data.status === 'Success'){
                        let role = res.data.role;
                        let id = res.data.id;
                        if(role === 'ADMIN'){
                            alert('Admin Logined');
                            localStorage.setItem('user_id',id);
                            window.location.href="/adash";
                        }
                        else if(role === 'USER'){
                            alert('User Logined');
                            localStorage.setItem('user_id',id);
                            window.location.href="/udash";
                        }
                        else{
                            alert('Invalid Login');
                            window.location.reload();
                        }
                    }
               })
              .catch(function(err){
                alert(err);
                window.location.reload();
              })

    }

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-lg-4">&nbsp;</div>
                <div className="col-lg-4">
                <div className="table-responsive">
                    <form onSubmit={handlesubmit}>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan={2}>Signin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>
                                    <input type="text" name="username" id="username" className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type="password" name="password" id="password" className="form-control"/>
                                </td>
                            </tr>
                            <tr>
                                <td><Link to="/Signup">
                                <button type="button" name="data_send" id="data_send" value="send" className="btn btn-danger">
                                    Signup
                                </button>
                                </Link></td>
                                <td>
                                <button type="submit" name="data_submit" id="data_submit" value="submit" className="btn btn-primary">
                                    Signin
                                </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </form>
                </div>
                </div>
                <div className="col-lg-4">&nbsp;</div>
            </div>
        </div>
        </>
    );
}