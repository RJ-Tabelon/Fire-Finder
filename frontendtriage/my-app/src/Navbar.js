const Navbar = () => {
    return (
        <nav className="navbar">
            <h3>FireFinder Navbar</h3>
            <div className="links">
                <a href="/" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Home</a>
                <a href="/create">New Report</a>
            </div>
        </nav>
    );
}
 
export default Navbar;