export const ContentLayout = (prop) => {
  const { title, breadcrumb, children } = prop;
  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h4>{title}</h4>
          </div>
          {prop.breadcrumb && (
            <div className="col-12 col-md-6 order-md-2 order-first">{breadcrumb}</div>
          )}
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-body">{children}</div>
        </div>
      </section>
    </div>
  );
};
