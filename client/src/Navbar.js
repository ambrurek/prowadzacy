const Navbar = () => {
    const Login = {Imie: 'Imie', Nazwisko: 'Nazwisko'}
    return ( 
        <div className="navbar">
            
            <h1>{Login.Imie}</h1>
            <h1>{Login.Nazwisko}</h1>
        </div>
     );
}
 
export default Navbar;