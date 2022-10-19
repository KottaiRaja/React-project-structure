import {Link} from 'react-router-dom';

export default function Menu(){
    return(
        <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Menu Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><Link to="/Adash">Dashboard</Link></td></tr>
                                <tr><td><Link to="/Aprod">Add Product</Link></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}