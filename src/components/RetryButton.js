import React from "react";
import {StyledButton} from "./styles/StyledButton";

const StartButton = (retry) => (
    <StyledButton onClick={retry}>Retry</StyledButton>
);

export default StartButton;