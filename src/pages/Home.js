import { useState, useEffect } from "react";
import usePagination from "../hooks/usePagination";

const Home = () => {
  const [users, setUsers] = useState([]);
  const PER_PAGE = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await res.json();
      setUsers(json);
    };
    fetchUsers();
  }, []);

  const { next, prev, jump, currentData, currentPage, maxPage } = usePagination(
    users,
    PER_PAGE
  );

  return (
    <div className="home">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {currentData().map((user) => {
            const {
              id,
              name,
              phone,
              address: { city },
            } = user;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{city}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prev} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: maxPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => jump(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button onClick={next} disabled={currentPage === maxPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
