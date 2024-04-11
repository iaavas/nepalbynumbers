function DataDisplay({ data }) {
  return (
    <div className="data-display">
      <h3>Data Display</h3>

      <p>Province Number: {data.provinceNumber}</p>

      <p>HDI Value: {data.hdiValue}</p>
    </div>
  );
}

export default DataDisplay;
