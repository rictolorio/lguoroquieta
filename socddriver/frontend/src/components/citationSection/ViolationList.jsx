import React, { useEffect, useState } from "react";
import { fetchViolations } from "./shared/api";

const ViolationList = () => {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    fetchViolations().then(setViolations);
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Available Violations</h2>
      <ul className="space-y-2">
        {violations.map((v) => (
          <li key={v.id} className="border p-2 rounded-lg">
            {v.or_sec_no} - {v.descriptions}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViolationList;
