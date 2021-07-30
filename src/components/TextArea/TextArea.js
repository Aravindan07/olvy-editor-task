import React, { useRef, useState } from "react";
import { TextAreaWrap } from "./TextAreaStyles";
import {
	AtomicBlockUtils,
	CompositeDecorator,
	Editor,
	EditorState,
	Entity,
	RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { mediaBlockRenderer } from "../AddImage/AddImage";
import UrlInput from "../UrlInput/UrlInput";
import { findLinkEntities, Link } from "../utils/Links";
import StylesToolbar from "../StylesToolbar/StylesToolbar";
import "./styles.css";

function TextArea() {
	const decorator = new CompositeDecorator([
		{
			strategy: findLinkEntities,
			component: Link,
		},
	]);

	const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));
	const [showInputUrl, setShowInputUrl] = useState(false);
	const [urlValue, setUrlValue] = useState("");
	const url = useRef();

	// For handling key commands
	const handleKeyCommand = (command) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);

		if (newState) {
			setEditorState(newState);
			return "handled";
		}
		return "not-handled";
	};

	// Common Handler for inline styles
	const inlineStylesSelector = (style) => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, style));
	};

	// Add Link Handler
	const promptForLink = (e) => {
		e.preventDefault();
		const selection = editorState.getSelection();
		if (!selection.isCollapsed()) {
			const contentState = editorState.getCurrentContent();
			const startKey = editorState.getSelection().getStartKey();
			const startOffset = editorState.getSelection().getStartOffset();
			const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
			const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
			let url = "";
			if (linkKey) {
				const linkInstance = contentState.getEntity(linkKey);
				url = linkInstance.getData().url;
			}

			setShowInputUrl(true);
			setUrlValue(url);
		}
	};

	// On Change handler for Link url
	const onURLChange = (e) => setUrlValue(e.target.value);

	// Confirm Link
	const confirmLink = (e) => {
		e.preventDefault();
		if (urlValue === "") {
			return null;
		}
		const contentState = editorState.getCurrentContent();

		const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
			url: urlValue,
		});
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

		//Apply Entity
		let nextEditorState = EditorState.set(editorState, {
			currentContent: contentStateWithEntity,
		});

		//Apply Selection
		nextEditorState = RichUtils.toggleLink(
			nextEditorState,
			nextEditorState.getSelection(),
			entityKey
		);

		setEditorState(nextEditorState);
		setShowInputUrl(false);
		setUrlValue("");
	};

	const closeUrlInput = () => {
		setShowInputUrl(false);
	};

	// If user presses enter key then the confirm link function will be called
	const onLinkInputKeyDown = (e) => {
		if (e.which === 13) {
			confirmLink(e);
		}
	};

	// Remove Link
	const removeLink = (e) => {
		e.preventDefault();
		const selection = editorState.getSelection();
		if (!selection.isCollapsed()) {
			setEditorState(RichUtils.toggleLink(editorState, selection, null));
		}
	};

	// Add Media
	const addMedia = (type, use = "") => {
		if (use === "") {
			const src = window.prompt("Enter a URL");
			if (!src) {
				return editorState;
			}

			const entityKey = Entity.create(type, "IMMUTABLE", { src });
			const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, " ");
			return newState;
		} else {
			const src = "https://cataas.com/cat/cute/says/hello";
			if (!src) {
				return null;
			}

			const entityKey = Entity.create(type, "IMMUTABLE", { src });
			const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, " ");
			return newState;
		}
	};

	// Add Image
	const addImage = (type) => {
		if (type === "normal") {
			return setEditorState(addMedia("image"));
		}

		var selectionState = editorState.getSelection();
		var anchorKey = selectionState.getAnchorKey();
		var currentContent = editorState.getCurrentContent();
		var currentContentBlock = currentContent.getBlockForKey(anchorKey);
		var start = selectionState.getStartOffset();
		var end = selectionState.getEndOffset();
		var selectedText = currentContentBlock.getText().slice(start, end);

		if (selectedText === "{{cat_meme}}" && type === "meme") {
			return setEditorState(addMedia("image", "meme"));
		}
	};

	return (
		<TextAreaWrap>
			<div>
				<StylesToolbar
					inlineStylesSelector={inlineStylesSelector}
					promptForLink={promptForLink}
					removeLink={removeLink}
					addImage={addImage}
				/>
				{showInputUrl && (
					<UrlInput
						onURLChange={onURLChange}
						url={url}
						urlValue={urlValue}
						onLinkInputKeyDown={onLinkInputKeyDown}
						confirmLink={confirmLink}
						closeUrlInput={closeUrlInput}
					/>
				)}
				<Editor
					blockRendererFn={mediaBlockRenderer}
					editorState={editorState}
					handleKeyCommand={handleKeyCommand}
					onChange={setEditorState}
					placeholder="Start typing..."
				/>
			</div>
		</TextAreaWrap>
	);
}

export default TextArea;
