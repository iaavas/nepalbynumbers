// eslint-disable-next-line react/prop-types
function DataDisplay({ data }) {
  return (
    <div className="data-display">
      <h3>Data Display</h3>
      {/* eslint-disable-next-line react/prop-types */}
      <p>Province Number: {data.provinceNumber}</p>
      {/* eslint-disable-next-line react/prop-types */}
      <p>HDI Value: {data.hdiValue}</p>
    </div>
  );
}

export default DataDisplay;
