import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Signup(){

    const handlesubmit = async(event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers:{'enctype':'multipart/form-data'}};

        await axios.post('http://localhost:3004/Signup',datastring,config)
              .then(function(res){
                if(res.data.status === 'Inserted'){
                    alert('Created');
                    window.location.href="/";
                }
                else{
                    alert('Error');
                    window.location.reload();
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
                                    <th colSpan={2}>Signup</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                        <input type="hidden" name="role" id="role" value="USER"/>
                                        <input type="text" name="name" id="name" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <input type="text" name="email" id="email" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>
                                        <input type="text" name="phone" id="phone" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Password</td>
                                    <td>
                                        <input type="password" name="password" id="password" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to="/">
                                            <button type="button" name="data_send" id="data_send" value="send" className="btn btn-danger">
                                                Signin
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button type="submit" name="data_submit" id="data_submit" value="submit" className="btn btn-primary">
                                            Signup
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