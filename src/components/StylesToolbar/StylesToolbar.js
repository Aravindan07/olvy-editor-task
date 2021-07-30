import { ToolbarWrapper, ButtonStyles } from "./ToolbarStyles";

function StylesToolbar({ inlineStylesSelector, promptForLink, removeLink, addImage }) {
	return (
		<ToolbarWrapper>
			<ButtonStyles onClick={() => inlineStylesSelector("BOLD")}>Bold</ButtonStyles>
			<ButtonStyles onClick={() => inlineStylesSelector("ITALIC")}>Italics</ButtonStyles>
			<ButtonStyles onClick={() => inlineStylesSelector("UNDERLINE")}>Underline</ButtonStyles>
			<ButtonStyles onMouseDown={(e) => promptForLink(e)}>Add Link</ButtonStyles>
			<ButtonStyles onMouseDown={(e) => removeLink(e)}>Remove Link</ButtonStyles>
			<ButtonStyles onMouseDown={() => addImage("normal")}>Add Image</ButtonStyles>
			<ButtonStyles onMouseDown={() => addImage("meme")}>Add Meme</ButtonStyles>
		</ToolbarWrapper>
	);
}

export default StylesToolbar;
