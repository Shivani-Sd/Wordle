import { FC, useEffect, useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";

import { gameWonOrLostAtom } from "../../states/atoms";
import "./styles.css";

interface FinalModalProps {
  open: boolean;
}

const style = {
  bgcolor: "background.paper",
};

const FinalModal: FC<FinalModalProps> = ({ open }) => {
  const gameWonOrLost = useRecoilValue(gameWonOrLostAtom);

  const [seconds, setSeconds] = useState<number>(60 - new Date().getSeconds());
  const [minutes, setMinutes] = useState<number>(59 - new Date().getMinutes());
  const [hours, setHours] = useState<number>(23 - new Date().getHours());
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const timeLeft = setInterval(() => {
      setSeconds(60 - new Date().getSeconds());
      setMinutes(59 - new Date().getMinutes());
      setHours(23 - new Date().getHours());
    }, 1000);
    return () => clearInterval(timeLeft);
  }, [seconds]);

  return (
    <div>
      <Modal
        open={open && modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Box sx={style} id="modal-box">
          <HighlightOffOutlined id="cancel" onClick={handleClose} />
          {gameWonOrLost === 1 ? (
            <img src="trophy.png" alt="Trophy" id="trophy" />
          ) : (
            <img src="sad.png" alt="Sad face" id="sad-face" />
          )}
          <Typography id="modal-title" fontFamily={"Poppins"}>
            {gameWonOrLost === 1 ? "Congratulations!" : "Sorry!"}
          </Typography>
          <Typography mt={1.5} fontFamily={"Poppins"}>
            {gameWonOrLost === 1
              ? "You are good at this!"
              : "You have run out of guesses."}
          </Typography>
          <Typography fontFamily={"Poppins"}>
            🌟 Your next !wordle starts in {hours}:{minutes}:{seconds} 🌟
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default FinalModal;
