import { useEffect, useState } from "react";

export default function useAnimations(animations: Animation[] | null | undefined, active: boolean): boolean {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (active && !mounted) setMounted(true);
		if (!active && mounted) {
			animations
				? Promise.all(
						animations.map((animation) => {
							animation.reverse();
							return animation.finished;
						})
				  ).then(() => setMounted(false))
				: setMounted(false);
		}
	}, [active, animations]);

	return mounted;
}
