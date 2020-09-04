import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  caption {
    font-size: 1.5em;
    margin: 0.5em 0 0.75em;
  }

  tr {
    border: 1px solid #ddd;
    padding: 0.35em;
    background: white;
    z-index: 1;
  }

  th,
  td {
    padding: 0.625em;
  }

  th {
    font-size: 0.85em;
    letter-spacing: 0.1em;
    text-align: left;
  }

  tbody tr:hover {
    background: transparent;
  }

  thead > tr > :nth-child(2) {
    text-align: right;
  }
  tbody > tr > :nth-child(2) {
    text-align: right;
  }

  @media screen and (max-width: 600px) {
    border: 0;

    caption {
      font-size: 1.3em;
    }

    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.625em;
    }

    td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: 0.8em;
      text-align: right;
    }

    td::before {
      /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    td:last-child {
      border-bottom: 0;
    }
  }
`;

const Table = ({ calls = [] }) => {
  if (!calls.length) {
    return <div>Ready 🏁</div>;
  }

  return (
    <StyledTable>
      <thead>
        <tr>
          <th scope="col">Destination</th>
          <th scope="col">Response time</th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call, i) => (
          <tr key={i}>
            <td data-label="destination">{call.url}</td>
            <td data-label="responseTime">{call.resTime} ms</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;