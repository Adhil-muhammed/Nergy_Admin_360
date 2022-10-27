// export const Breadcrumb = () => {
//   return (
//     <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
//       <ol className="breadcrumb">
//         <li className="breadcrumb-item">
//           <a href="index.html">Dashboard</a>
//         </li>
//         <li className="breadcrumb-item active" aria-current="page">
//           Layout Default
//         </li>
//       </ol>
//     </nav>
//   );
// };

import { Link } from "react-router-dom";

export const Breadcrumb = ({ breadcrumb }) => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/admin">Dashboard</Link>
        </li>
        {breadcrumb.map((item, idx) => {
          if (breadcrumb.length <= 1) {
            return (
              <li key={idx} className="breadcrumb-item active" aria-current="page">
                {item.label}
              </li>
            );
          }
          return (
            <li key={idx} className={`${item.location ? "" : "active"} breadcrumb-item`}>
              {item.location ? <Link to={item.location}>{item.label}</Link> : item.label}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
