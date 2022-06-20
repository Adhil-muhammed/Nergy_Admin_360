export const DashboardLayout = (prop) => {
  const { title, breadcrumb, children } = prop;
  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last mb-4">
            <h3>{title}</h3>
          </div>
          {prop.breadcrumb && (
            <div className="col-12 col-md-6 order-md-2 order-first">{breadcrumb}</div>
          )}
        </div>
      </div>
      <section className="row">
        <div className="col-12">
          {children}
        </div>
      </section>
    </div>
  );
};