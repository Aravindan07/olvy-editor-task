import { InputWrapper, LinkInput, ButtonsDiv, ConfirmButton, CancelButton } from "./UrlInputStyles";

function UrlInput({ onURLChange, url, urlValue, onLinkInputKeyDown, confirmLink, closeUrlInput }) {
	return (
		<InputWrapper>
			<LinkInput
				onChange={onURLChange}
				ref={url}
				type="text"
				value={urlValue}
				onKeyDown={onLinkInputKeyDown}
				placeholder="Enter a Link"
			/>
			<ButtonsDiv>
				<CancelButton onClick={closeUrlInput}>Cancel</CancelButton>
				<ConfirmButton onMouseDown={confirmLink}> Confirm </ConfirmButton>
			</ButtonsDiv>
		</InputWrapper>
	);
}

export default UrlInput;
