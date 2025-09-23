import { GradientDots } from "@/components/ui/gradient-dots";

export default function GradientDotsDemo() {
	return (
		<main className="relative flex size-full min-h-screen w-full items-center justify-center">
			<GradientDots duration={20} />
			<h1 className="text-6xl text-center font-extrabold z-10 text-white">
				Gradient Dots
			</h1>
		</main>
	);
}
