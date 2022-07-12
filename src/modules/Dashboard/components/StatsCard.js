export const StatsCard = ({ iconClass, iconbg, label, value }) => {
  return (
    <>
      <div className="col-6 col-lg-3 col-md-6">
        <div className="card">
          <div className="card-body px-3 py-4-5">
            <div className="row">
              <div className="col-md-4">
                <div className="stats-icon" style={{ backgroundColor: iconbg }}>
                  <i className={iconClass}></i>
                </div>
              </div>
              <div className="col-md-8">
                <h6 className="text-muted font-semibold">{label}</h6>
                <h6 className="font-extrabold mb-0">{value}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
