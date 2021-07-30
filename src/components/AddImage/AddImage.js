import { Entity } from "draft-js";
import { ImageComponent } from "./AddImageStyles";

export function mediaBlockRenderer(block) {
	if (block.getType() === "atomic") {
		return {
			component: Media,
			editable: false,
		};
	}
	return null;
}

function Image(props) {
	return (
		<div>
			<ImageComponent src={props.src} alt="Adding something" />
		</div>
	);
}

const Media = (props) => {
	const entity = Entity.get(props.block.getEntityAt(0));
	const { src } = entity.getData();
	const type = entity.getType();
	let media;
	if (type === "image") {
		media = <Image src={src} />;
	}
	return media;
};

export default Image;
