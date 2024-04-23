import React from 'react';
import './YourLibraryTable.css'; // Import the CSS file

const YourLibraryTable = ({ books }) => {
  return (
    <div className="your-library-container">
      <table className="your-library-table">
        <thead>
          <tr>
            <th className="sr-no">Sr. No.</th>
            <th className="title">Title</th>
            <th className="score">Score</th>
            <th className="chapters">Chapters</th>
            <th className="volumes">Volumes</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td className="sr-no">{index + 1}</td>
              <td className="title">{book.title}</td>
              <td className="score">{book.score}</td>
              <td className="chapters">{book.chapters}</td>
              <td className="volumes">{book.volumes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourLibraryTable;
