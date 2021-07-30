import styled from "styled-components";

export const InputWrapper = styled.div`
	position: absolute;
	top: 70px;
	left: 0;
	width: 100%;
	background-color: white;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 2;
`;

export const LinkInput = styled.input`
	height: 50px;
	border-radius: 5px;
	padding: 0.5rem;
	margin: 1rem 0;
	outline: transparent;
	border: 2px solid #d2d2d2;
`;

export const ButtonsDiv = styled.div`
	display: flex;
	align-items: center;
`;

export const ConfirmButton = styled.button`
	margin: 0.5rem 1rem;
	padding: 0.4rem;
	background-color: #15b996;
	font-size: 16px;
	color: #fff;
	cursor: pointer;
	border: none;
	outline: transparent;
	border-radius: 5px;
	letter-spacing: 0.8px;
	font-weight: 600;
`;

export const CancelButton = styled(ConfirmButton)`
	background-color: red;
`;
