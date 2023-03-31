import Navbar from '../Navbar';
const AppLayout = ({ children }) => {
  return (
    <div className="parent">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
