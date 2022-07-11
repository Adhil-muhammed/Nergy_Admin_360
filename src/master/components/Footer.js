import appInfo from "../../../package.json";

export function Footer() {
  return (
    <footer>
      <div className="footer clearfix mb-0 text-muted">
        <div className="float-start">
          <p>2022 © Nergy India Pvt Ltd</p>
        </div>
        <div className="float-end">
          <p>v{appInfo.version}</p>
        </div>
      </div>
    </footer>
  );
}
