import { useEffect, useState } from "react";
import { api, getCsrf } from "./lib/api";

const sample = {
  sales: [
    { employee_code: "BE001", position: "BE", sale_amount: 1000, sale_date: "2026-02-23" },
    { employee_code: "BM010", position: "BM", sale_amount: 5000, sale_date: "2026-02-23" }
  ]
};

export default function HrSales() {
  const [jsonText, setJsonText] = useState(JSON.stringify(sample, null, 2));
  const [sales, setSales] = useState([]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const load = async () => {
    const res = await api.get("/api/hr/sales");
    setSales(res.data.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    setMsg(""); setErr("");
    try {
      await getCsrf();
      const payload = JSON.parse(jsonText);
      const res = await api.post("/api/hr/sales/bulk", payload);
      setMsg(`${res.data.message} (${res.data.count})`);
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>HR Sales Import (JSON MVP)</h2>

      {msg && <p style={{ color: "limegreen" }}>{msg}</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <textarea
        style={{ width: "100%", height: 220 }}
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={submit}>Import Sales</button>
        <button onClick={load} style={{ marginLeft: 8 }}>Refresh</button>
      </div>

      <h3 style={{ marginTop: 24 }}>Latest Sales</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Position</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.employee_code}</td>
              <td>{s.position}</td>
              <td>{s.sale_amount}</td>
              <td>{s.sale_date}</td>
              <td>{s.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}