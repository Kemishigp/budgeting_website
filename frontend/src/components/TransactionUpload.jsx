import Papa from "papaparse";

export default function TransactionUpload({ onUpload }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // assumes first row is column headers
      skipEmptyLines: true,
      complete: (results) => {
        onUpload(results.data);
      },
    });
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">Upload Transactions (CSV)</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="border p-2 rounded"
      />
    </div>
  );
}
