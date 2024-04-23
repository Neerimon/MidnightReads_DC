import React from 'react';
import './MyFavoritesTable.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MyFavoritesTable = ({ bookDetails }) => {
  return (
    <div className="my-favorites-container">
      <p className="favorites-heading">Liked Books</p>
      <table className="favorites-table">
        <thead>
          <tr>
            <th className="sr-no2">Sr. No.</th>
            <th className="cover3">Cover</th>
            <th className="name2">Title</th>
          </tr>
        </thead>
        <tbody>
          {bookDetails.map((book, index) => (
            <tr key={book.id}>
              <td className="sr-no2">{index + 1}</td>
              <td className="cover2">
                {/* Wrap the img element with Link */}
                <Link to={`/book/${book.id}`}>
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book Cover" />
                </Link>
              </td>
              <td className="name2">{book.volumeInfo.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFavoritesTable;
