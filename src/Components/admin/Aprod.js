import Header from './Header';
import Menu from './Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useState,useEffect} from 'react';

export default function Adash(){

    var userid = localStorage.getItem('user_id');
    const [prodetails,setProdetails] = useState([]);

    const handlesubmit = async(event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = {headers:{'enctype':'multipart/form-data'}};

        await axios.post('http://localhost:3004/Productadd',datastring,config)
              .then(function(res){
                if(res.data.status === 'Inserted'){
                    alert('inserted');
                    window.location.reload();
                }
                else{
                    alert('Not inserted');
                    window.location.reload();
                }
              })
              .catch(function(err){
                alert(err);
              })

    }

    useEffect(()=>{
        var datastring = {userid:userid};
        var config = {headers:{'enctype':'multipart/form-data'}};
        axios.post('http://localhost:3004/Productdetails',datastring,config)
        .then(function(res){
            setProdetails(res.data);
        })
        .catch(function(err){
            alert(err);
        })
    })

    return(
        <>
        <Header />
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                <Menu />
                </div>
                <div className="col-lg-7">
                <form onSubmit={handlesubmit}>
                    <div className="table-responsive mt-5">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan={2}>Add Product</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Product Name</td>
                                    <td>
                                        <input type="hidden" name="userid" id="userid"
                                         value={userid}/>
                                        <input type="text" name="name" id="name" className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td><input type="text" name="descr" id="descr" className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Image</td>
                                    <td>
                                        <input type="file" name="img_file" id="img_file"
                                        className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>
                                        <button type="submit" name="data_submit" id="data_submit"
                                        value="submit" className="btn btn-primary">
                                            Create
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
                <div className="row">
                <div className="table-responsive">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product descr</th>
                            <th>Product Image</th>
                        </tr>
                    </thead>
                    <tbody>
                    {prodetails.map((value,index)=>(
                        <tr key={index}>
                            <td>{value.name}</td>
                            <td>{value.descr}</td>
                            <td><img src={'http://localhost:3000/'+value.img_path+'/'+value.img_name} alt="" width="100px" height="50px" /></td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </div>
                </div>
            </div>
            
        </div>
        </>
    );
}