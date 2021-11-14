import Foooter from 'components/Foooter';
import Navbar from 'components/Navbar';
import NavbarResponsive from 'components/NavbarResponsive';

const PublicLayout = ({children}) => {
    return (
        <header className="w-full min-h-screen bg-purple-900 font-sans relative overflow-y-scroll">
            <Navbar />
            <NavbarResponsive />
            {children}
            <Foooter />
        </header>
    )
};
export default PublicLayout;