import '../App.css'
import { useState } from 'react';
import Papa from 'papaparse';

/*
 * row 1: timestamp
 * row 2: consent
 * row 3: name
 * row 4: address
 * row 5: phone and email
 * row 6: type of cat
 * row 7: how many
 * row 8: experience
 * row 9: tell more
 * row 10: workhours
 * row 11: car
 * row 12: other
 */

const CSVFormatter = () => {
  const [formattedData, setFormattedData] = useState('');

  const formatDate = (dateString: string) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    return `${parseInt(day)}/${parseInt(month)}-${year}`;
  };

  const hasCar = (bool: string) => {
    return bool === "Ja" ? "Har bil" : "Har ej bil"
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        const formatted = result.data
          .slice(1) // Skip the headers
          .map((row) => {
            if (row.length >= 8) {
              return `<div style="margin-bottom: 20px;">
<h2 style="font-size: 18px; font-weight: bold;">${row[3]}</h2>
<p style="white-space: pre-wrap; margin: 0;">${row[2]}. Anmäld ${formatDate(row[1])}
${row[4]}
${row[5]}
${row[6]}
${row[7]}
${row[8]}
${row[9]}
${row[10]}
${hasCar(row[11])}
${row[12]}</p>
</div>`;
            }
            return '';
          })
          .join('\n');
        setFormattedData(formatted);
      },
    });
  };

  return (
    <div className="csv-formatter">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="file-input"
      />
      <div
        className="formatted-output"
        dangerouslySetInnerHTML={{ __html: formattedData }}
      />
    </div>
  );
};

export default CSVFormatter;
