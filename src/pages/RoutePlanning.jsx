import MapView from "../components/MapView/MapView";

function RoutePlanning() {
  return (
    <div>
      <h1>Route Planning</h1>
      <MapView center={[51.505, -0.09]} zoom={13} markers={[]} />
    </div>
  );
}

export default RoutePlanning;
