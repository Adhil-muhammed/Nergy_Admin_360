import { useBatch } from ".";

export function Batch() {
  const { bartches } = useBatch();
  console.log("bartches", bartches);
  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Layout Default</h3>
            <p className="text-subtitle text-muted">The default layout </p>
          </div>
          <div className="col-12 col-md-6 order-md-2 order-first">
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
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Default Layout</h4>
          </div>
          <div className="card-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, commodi? Ullam quaerat
            similique iusto temporibus, vero aliquam praesentium, odit deserunt eaque nihil saepe
            hic deleniti? Placeat delectus quibusdam ratione ullam!
          </div>
        </div>
      </section>
    </div>
  );
}
