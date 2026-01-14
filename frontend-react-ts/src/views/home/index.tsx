// import FC from react
import { FC } from 'react';

// import Link from react-router
import { Link } from 'react-router';

const Home: FC = () => {
    return (
        <div className="p-5 mb-4 bg-light rounded-5 shadow-sm">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">RENT GAME CONSOLE</h1>
                <p className="col-md-12 fs-4">A simple apps rent game console with golang and react typescript</p>
                <hr />
                <Link to="/register" className="btn btn-primary btn-lg me-3">REGISTER</Link>
                <Link to="/login" className="btn btn-secondary btn-lg">LOGIN</Link>
            </div>
        </div>
    )
}

export default Home;
