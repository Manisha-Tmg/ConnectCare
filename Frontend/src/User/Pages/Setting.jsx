import "../css/Settings.css";
import Sidebaruser from "../components/Sidebaruser";
import Header from "../components/Header";

const Setting = () => {
  const navigate = useNavigate();

  const handleFindCaretaker = () => {
    const token = Cookies.get("accessToken");

    if (!token) {
      toast.error("Please Login First");

      navigate("/login");
    } else {
      navigate("/setting");
    }
  };

  return (
    <div>
      <Header />
      <div>
        <Sidebaruser />
      </div>
    </div>
  );
};
export default Setting;
