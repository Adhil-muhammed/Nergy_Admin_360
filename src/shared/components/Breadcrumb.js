export const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="index.html">Dashboard</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Layout Default
        </li>
      </ol>
    </nav>
  );
};
