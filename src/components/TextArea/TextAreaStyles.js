import styled from "styled-components";

export const TextAreaWrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 1rem;
	margin: 2rem 0;
`;

export const TextCustomization = styled.div`
	width: 80%;
`;

export const TextAreaComponent = styled.textarea`
	max-width: 100%;
	min-height: 80vh;
	overflow: auto;
	padding: 1rem;
	border: none;
	outline: none;
	font-family: "Open Sans", sans-serif;
	font-size: 16px;
	resize: vertical;
`;
