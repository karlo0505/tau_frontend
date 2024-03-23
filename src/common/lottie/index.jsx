import Lottie from "react-lottie";

export default function ReactLottie({ file, width, height }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: file,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={width} width={height} />;
}
