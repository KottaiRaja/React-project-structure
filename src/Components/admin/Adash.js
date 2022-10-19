import Header from './Header';
import Menu from './Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Adash(){
    return(
        <>
        <Header />
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                <Menu />
                </div>
            </div>
        </div>
        </>
    );
}