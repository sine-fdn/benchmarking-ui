export default function MpcVideo() {
  return (
    <div className="max-w-2xl">
      <video width="max" height="max" autoPlay loop>
        <source src="/mpc.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
