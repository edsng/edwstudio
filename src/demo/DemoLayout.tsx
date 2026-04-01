import { Link } from "react-router-dom";
import "./demo.css";

interface DemoLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const DemoLayout: React.FC<DemoLayoutProps> = ({ title, children }) => (
  <div className="demo-placeholder">
    <Link to="/" className="demo-back">
      &larr; Back to portfolio
    </Link>
    <h1 className="demo-title">{title}</h1>
    <p className="demo-subtitle">Demo coming soon</p>
    {children}
  </div>
);

export default DemoLayout;
