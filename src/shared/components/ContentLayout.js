import { Loading } from "./Loading";

export const ContentLayout = ({ title, subtitle, breadcrumb, children, isLoading }) => {
  // const { title, subtitle, breadcrumb, children, isLoading } = prop;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="page-heading">
          <div className="page-title">
            <div className="row">
              <div className="col-12 col-md-6 order-md-1 order-last mb-4">
                <h3>{title}</h3>
              </div>
              {breadcrumb && (
                <div className="col-12 col-md-6 order-md-2 order-first">{breadcrumb}</div>
              )}
            </div>
          </div>
          <section className="section">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{subtitle}</h4>
              </div>
              <div className="card-body">{children}</div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
