import "./branding.css";
import logo from "../../icons/leaf.png";

const Branding = () => {
  return (
    <section className="branding-container">
      <img src={logo} alt="Hello Fresh logo" />
      <h1>Hello Fresh</h1>
    </section>
  );
};

export default Branding;
