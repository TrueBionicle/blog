import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

const ButtonBack = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <Button className="back" onClick={back}>
      <BackspaceIcon fontSize="large" />
    </Button>
  );
};

export default ButtonBack;
